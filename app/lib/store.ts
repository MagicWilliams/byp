import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  WordPressPost,
  WordPressCategory,
  WordPressTag,
  BLEIssue,
  fetchBlackLifeEverywhereIssues,
} from './wordpress';

export type IssueMapItem = {
  issue: BLEIssue;
  tag: WordPressTag | null;
  posts: WordPressPost[];
  postCount: number;
};

async function fetchPosts(
  params: {
    per_page?: number;
    page?: number;
    categories?: number[];
    tags?: number[];
    search?: string;
  } = {}
): Promise<WordPressPost[]> {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => query.append(key, String(v)));
    } else if (value !== undefined) {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`/api/posts?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch posts');
  return await res.json();
}

async function fetchPostsByTagName(
  tagName: string,
  params: {
    per_page?: number;
    page?: number;
  } = {}
): Promise<WordPressPost[]> {
  // Convert tag name to slug format (lowercase, hyphenated)
  const slugifiedName = tagName.toLowerCase().replace(/\s+/g, '-');

  // First, fetch the specific tag by slug
  const tagRes = await fetch(
    `/api/tags?slug=${encodeURIComponent(slugifiedName)}`
  );
  if (!tagRes.ok) throw new Error('Failed to fetch tag');
  const tags = await tagRes.json();

  const targetTag = tags.find(
    (tag: WordPressTag) => tag.slug === slugifiedName
  );

  if (!targetTag) {
    console.warn(`Tag with slug "${slugifiedName}" not found`);
    return [];
  }

  // Now fetch posts with the tag ID
  const query = new URLSearchParams();
  query.append('tags', String(targetTag.id));

  // Add other params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`/api/posts?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch posts by tag');
  return await res.json();
}

async function fetchPostsByCategoryName(
  categoryName: string,
  params: {
    per_page?: number;
    page?: number;
  } = {}
): Promise<WordPressPost[]> {
  // Convert category name to slug format (lowercase, hyphenated)
  const slugifiedName = categoryName.toLowerCase().replace(/\s+/g, '-');

  // First, fetch the specific category by slug
  const categoryRes = await fetch(
    `/api/categories?slug=${encodeURIComponent(slugifiedName)}`
  );
  if (!categoryRes.ok) throw new Error('Failed to fetch category');
  const categories = await categoryRes.json();

  const targetCategory = categories.find(
    (category: WordPressCategory) => category.slug === slugifiedName
  );

  if (!targetCategory) {
    console.warn(`Category with slug "${slugifiedName}" not found`);
    return [];
  }

  // Now fetch posts with the category ID, ordered by date (latest first)
  const query = new URLSearchParams();
  query.append('categories', String(targetCategory.id));
  query.append('orderby', 'date');
  query.append('order', 'desc');

  // Add other params
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      query.append(key, String(value));
    }
  });

  const res = await fetch(`/api/posts?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch posts by category');
  return await res.json();
}

async function fetchCategories(): Promise<WordPressCategory[]> {
  const res = await fetch('/api/categories');
  if (!res.ok) throw new Error('Failed to fetch categories');
  return await res.json();
}

async function fetchTags(): Promise<WordPressTag[]> {
  const res = await fetch('/api/tags');
  if (!res.ok) throw new Error('Failed to fetch tags');
  return await res.json();
}

interface SiteState {
  posts: WordPressPost[];
  categories: WordPressCategory[];
  tags: WordPressTag[];
  issues: BLEIssue[];
  bleIssues: BLEIssue[];
  bleTags: WordPressTag[];
  totalIssues: number;
  totalPosts: number;

  // Category-specific posts storage
  categoryPosts: Record<number, WordPressPost[]>;
  categoryPostsLoading: Record<number, boolean>;
  categoryPostsError: Record<number, string | null>;

  postsLoading: boolean;
  categoriesLoading: boolean;
  tagsLoading: boolean;
  bleIssuesLoading: boolean;
  bleTagsLoading: boolean;

  postsError: string | null;
  categoriesError: string | null;
  tagsError: string | null;
  bleIssuesError: string | null;
  bleTagsError: string | null;

  // Cache timestamps for data freshness
  postsLastFetched: number | null;
  categoriesLastFetched: number | null;
  tagsLastFetched: number | null;
  bleIssuesLastFetched: number | null;
  bleTagsLastFetched: number | null;

  // Cache key for posts to handle different parameter combinations
  postsCacheKey: string | null;

  fetchPosts: (params?: {
    per_page?: number;
    page?: number;
    categories?: number[];
    tags?: number[];
    search?: string;
    force?: boolean;
  }) => Promise<void>;

  fetchPostsByCategoryId: (
    categoryId: number,
    params?: {
      per_page?: number;
      page?: number;
      force?: boolean;
    }
  ) => Promise<void>;

  fetchPostsByTagName: (
    tagName: string,
    params?: {
      per_page?: number;
      page?: number;
      force?: boolean;
    }
  ) => Promise<void>;

  fetchPostsByCategoryName: (
    categoryName: string,
    params?: {
      per_page?: number;
      page?: number;
      force?: boolean;
    }
  ) => Promise<void>;

  fetchCategories: (force?: boolean) => Promise<void>;
  fetchTags: (force?: boolean) => Promise<void>;
  fetchBlackLifeEverywhereIssues: (force?: boolean) => Promise<void>;
  fetchBLETags: (force?: boolean) => Promise<void>;

  hydrateFromServer: (
    data: Partial<
      Pick<
        SiteState,
        | 'posts'
        | 'categories'
        | 'tags'
        | 'issues'
        | 'bleIssues'
        | 'bleTags'
        | 'totalIssues'
        | 'totalPosts'
      >
    >
  ) => void;

  clearPosts: () => void;
  clearCategories: () => void;
  clearTags: () => void;
  clearIssues: () => void;
  clearErrors: () => void;
  clearCache: () => void;
  clearCategoryPosts: (categoryId?: number) => void;
}

// Cache duration in milliseconds (5 minutes)
const CACHE_DURATION = 5 * 60 * 1000;

// Helper function to check if data is stale
function isDataStale(lastFetched: number | null): boolean {
  if (!lastFetched) return true;
  return Date.now() - lastFetched > CACHE_DURATION;
}

export const useSiteStore = create<SiteState>()(
  persist(
    (set, get) => ({
      posts: [],
      categories: [],
      tags: [],
      issues: [],
      bleIssues: [],
      bleTags: [],
      totalIssues: 0,
      totalPosts: 0,

      // Category-specific posts storage
      categoryPosts: {},
      categoryPostsLoading: {},
      categoryPostsError: {},

      postsLoading: false,
      categoriesLoading: false,
      tagsLoading: false,
      bleIssuesLoading: false,
      bleTagsLoading: false,

      postsError: null,
      categoriesError: null,
      tagsError: null,
      bleIssuesError: null,
      bleTagsError: null,

      // Cache timestamps
      postsLastFetched: null,
      categoriesLastFetched: null,
      tagsLastFetched: null,
      bleIssuesLastFetched: null,
      bleTagsLastFetched: null,

      // Cache key for posts to handle different parameter combinations
      postsCacheKey: null,

      fetchPosts: async (params = {}) => {
        const { force = false, ...fetchParams } = params;
        const state = get();

        // Standardize parameters to always fetch 100 posts with _embed
        const standardizedParams = {
          per_page: 100,
          _embed: true,
          ...fetchParams,
        };

        // Create cache key based on parameters
        const cacheKey = JSON.stringify(standardizedParams);

        // Check if we have cached data for these exact parameters and it's not stale
        if (
          !force &&
          state.posts.length > 0 &&
          state.postsCacheKey === cacheKey &&
          !isDataStale(state.postsLastFetched)
        ) {
          console.log('Using cached posts data');
          return; // Use cached data
        }

        console.log('Fetching posts with parameters:', standardizedParams);

        set({ postsLoading: true, postsError: null });

        try {
          const posts = await fetchPosts(standardizedParams);
          set({
            posts,
            postsLoading: false,
            postsLastFetched: Date.now(),
            postsCacheKey: cacheKey,
          });
        } catch (error) {
          set({
            postsError:
              error instanceof Error ? error.message : 'Failed to fetch posts',
            postsLoading: false,
          });
        }
      },

      fetchPostsByTagName: async (tagName, params = {}) => {
        const { force = false, ...fetchParams } = params;
        const state = get();

        // Check if we have cached data and it's not stale
        if (
          !force &&
          state.posts.length > 0 &&
          !isDataStale(state.postsLastFetched)
        ) {
          return; // Use cached data
        }

        set({ postsLoading: true, postsError: null });

        try {
          const posts = await fetchPostsByTagName(tagName, fetchParams);
          set({
            posts,
            postsLoading: false,
            postsLastFetched: Date.now(),
          });
        } catch (error) {
          set({
            postsError:
              error instanceof Error ? error.message : 'Failed to fetch posts',
            postsLoading: false,
          });
        }
      },

      fetchPostsByCategoryId: async (categoryId, params = {}) => {
        const { force = false, ...fetchParams } = params;
        const state = get();

        // Standardize parameters to fetch 10 posts with _embed
        const standardizedParams = {
          per_page: 10,
          _embed: true,
          categories: [categoryId],
          orderby: 'date',
          order: 'desc',
          ...fetchParams,
        };

        // Check if we have cached data for this category and it's not stale
        const categoryPosts = state.categoryPosts[categoryId] || [];
        const categoryPostsLastFetched = state.postsLastFetched; // Using posts timestamp for now

        if (
          !force &&
          categoryPosts.length > 0 &&
          !isDataStale(categoryPostsLastFetched)
        ) {
          console.log(`Using cached posts for category ${categoryId}`);
          return; // Use cached data
        }

        console.log(
          `Fetching posts for category ${categoryId} with parameters:`,
          standardizedParams
        );

        // Set loading state for this specific category
        set(state => ({
          categoryPostsLoading: {
            ...state.categoryPostsLoading,
            [categoryId]: true,
          },
          categoryPostsError: {
            ...state.categoryPostsError,
            [categoryId]: null,
          },
        }));

        try {
          const posts = await fetchPosts(standardizedParams);
          set(state => ({
            categoryPosts: {
              ...state.categoryPosts,
              [categoryId]: posts,
            },
            categoryPostsLoading: {
              ...state.categoryPostsLoading,
              [categoryId]: false,
            },
            postsLastFetched: Date.now(),
          }));
        } catch (error) {
          console.error(
            `Error fetching posts for category ${categoryId}:`,
            error
          );
          set(state => ({
            categoryPostsError: {
              ...state.categoryPostsError,
              [categoryId]:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch posts',
            },
            categoryPostsLoading: {
              ...state.categoryPostsLoading,
              [categoryId]: false,
            },
          }));
        }
      },

      fetchPostsByCategoryName: async (categoryName, params = {}) => {
        const { force = false, ...fetchParams } = params;
        const state = get();

        // Check if we have cached data and it's not stale
        if (
          !force &&
          state.posts.length > 0 &&
          !isDataStale(state.postsLastFetched)
        ) {
          return; // Use cached data
        }

        set({ postsLoading: true, postsError: null });

        try {
          const posts = await fetchPostsByCategoryName(
            categoryName,
            fetchParams
          );
          set({
            posts,
            postsLoading: false,
            postsLastFetched: Date.now(),
          });
        } catch (error) {
          set({
            postsError:
              error instanceof Error ? error.message : 'Failed to fetch posts',
            postsLoading: false,
          });
        }
      },

      fetchCategories: async (force = false) => {
        const state = get();

        // Check if we have cached data and it's not stale
        if (
          !force &&
          state.categories.length > 0 &&
          !isDataStale(state.categoriesLastFetched)
        ) {
          return; // Use cached data
        }

        set({ categoriesLoading: true, categoriesError: null });

        try {
          const categories = await fetchCategories();
          set({
            categories,
            categoriesLoading: false,
            categoriesLastFetched: Date.now(),
          });
        } catch (error) {
          set({
            categoriesError:
              error instanceof Error
                ? error.message
                : 'Failed to fetch categories',
            categoriesLoading: false,
          });
        }
      },

      fetchTags: async (force = false) => {
        const state = get();

        // Check if we have cached data and it's not stale
        if (
          !force &&
          state.tags.length > 0 &&
          !isDataStale(state.tagsLastFetched)
        ) {
          return; // Use cached data
        }

        set({ tagsLoading: true, tagsError: null });

        try {
          const tags = await fetchTags();
          set({
            tags,
            tagsLoading: false,
            tagsLastFetched: Date.now(),
          });
        } catch (error) {
          set({
            tagsError:
              error instanceof Error ? error.message : 'Failed to fetch tags',
            tagsLoading: false,
          });
        }
      },

      fetchBlackLifeEverywhereIssues: async (force = false) => {
        const state = get();

        // Check if we have cached data and it's not stale
        if (
          !force &&
          state.bleIssues.length > 0 &&
          !isDataStale(state.bleIssuesLastFetched)
        ) {
          return; // Use cached data
        }

        set({ bleIssuesLoading: true, bleIssuesError: null });
        try {
          const bleIssues = await fetchBlackLifeEverywhereIssues();
          set({
            bleIssues,
            bleIssuesLoading: false,
            bleIssuesLastFetched: Date.now(),
          });
        } catch (error) {
          set({
            bleIssuesError:
              error instanceof Error
                ? error.message
                : 'Failed to fetch Black Life Everywhere issues',
            bleIssuesLoading: false,
          });
        }
      },

      fetchBLETags: async (force = false) => {
        const state = get();

        // Check if we have cached data and it's not stale
        if (
          !force &&
          state.bleTags.length > 0 &&
          !isDataStale(state.bleTagsLastFetched)
        ) {
          return; // Use cached data
        }

        set({ bleTagsLoading: true, bleTagsError: null });
        try {
          const bleTags = await fetchTags();
          set({
            bleTags,
            bleTagsLoading: false,
            bleTagsLastFetched: Date.now(),
          });
        } catch (error) {
          set({
            bleTagsError:
              error instanceof Error
                ? error.message
                : 'Failed to fetch BLE tags',
            bleTagsLoading: false,
          });
        }
      },

      hydrateFromServer: data => {
        set(state => ({
          posts: data.posts ?? state.posts,
          categories: data.categories ?? state.categories,
          tags: data.tags ?? state.tags,
          issues: data.issues ?? state.issues,
          bleIssues: data.bleIssues ?? state.bleIssues,
          bleTags: data.bleTags ?? state.bleTags,
          totalIssues: data.totalIssues ?? state.totalIssues,
          totalPosts: data.totalPosts ?? state.totalPosts,
        }));
      },

      clearPosts: () =>
        set({
          posts: [],
          postsError: null,
          postsLastFetched: null,
          postsCacheKey: null,
        }),
      clearCategories: () =>
        set({
          categories: [],
          categoriesError: null,
          categoriesLastFetched: null,
        }),
      clearTags: () =>
        set({
          tags: [],
          tagsError: null,
          tagsLastFetched: null,
        }),
      clearIssues: () =>
        set({
          issues: [],
          bleIssues: [],
          bleIssuesError: null,
          bleIssuesLastFetched: null,
        }),
      clearErrors: () =>
        set({
          postsError: null,
          categoriesError: null,
          tagsError: null,
          bleIssuesError: null,
          bleTagsError: null,
        }),
      clearCategoryPosts: (categoryId?: number) => {
        if (categoryId) {
          // Clear specific category posts
          set(state => ({
            categoryPosts: {
              ...state.categoryPosts,
              [categoryId]: [],
            },
            categoryPostsLoading: {
              ...state.categoryPostsLoading,
              [categoryId]: false,
            },
            categoryPostsError: {
              ...state.categoryPostsError,
              [categoryId]: null,
            },
          }));
        } else {
          // Clear all category posts
          set({
            categoryPosts: {},
            categoryPostsLoading: {},
            categoryPostsError: {},
          });
        }
      },

      clearCache: () =>
        set({
          postsLastFetched: null,
          postsCacheKey: null,
          categoriesLastFetched: null,
          tagsLastFetched: null,
          bleIssuesLastFetched: null,
          bleTagsLastFetched: null,
        }),
    }),
    {
      name: 'byp-store', // unique name for localStorage key
      storage: createJSONStorage(() => ({
        getItem: (name: string) => {
          try {
            return localStorage.getItem(name);
          } catch (error) {
            console.warn('Failed to read from localStorage:', error);
            return null;
          }
        },
        setItem: (name: string, value: string) => {
          try {
            localStorage.setItem(name, value);
          } catch (error) {
            console.warn(
              'Failed to write to localStorage (quota exceeded):',
              error
            );
            // Clear some data to make space
            try {
              localStorage.clear();
              localStorage.setItem(name, value);
            } catch (clearError) {
              console.error('Failed to clear localStorage:', clearError);
            }
          }
        },
        removeItem: (name: string) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.warn('Failed to remove from localStorage:', error);
          }
        },
      })),
      // Only persist data, not loading states or errors
      // Note: categoryPosts is not persisted to avoid localStorage quota issues
      partialize: state => ({
        posts: state.posts,
        categories: state.categories,
        tags: state.tags,
        issues: state.issues,
        bleIssues: state.bleIssues,
        bleTags: state.bleTags,
        totalIssues: state.totalIssues,
        totalPosts: state.totalPosts,
        postsLastFetched: state.postsLastFetched,
        postsCacheKey: state.postsCacheKey,
        categoriesLastFetched: state.categoriesLastFetched,
        tagsLastFetched: state.tagsLastFetched,
        bleIssuesLastFetched: state.bleIssuesLastFetched,
        bleTagsLastFetched: state.bleTagsLastFetched,
      }),
    }
  )
);
