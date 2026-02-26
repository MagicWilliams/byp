import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import {
  WordPressPost,
  WordPressCategory,
  WordPressTag,
  WordPressUser,
  BLEIssue,
  fetchBlackLifeEverywhereIssues,
  fetchPostsByAuthor,
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
    _embed?: boolean;
    orderby?: string;
    order?: 'asc' | 'desc' | string;
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

/** Fetch posts that have ANY of the given tag slugs. Merges, dedupes, sorts by date desc. */
async function fetchPostsByTagSlugs(
  tagSlugs: string[],
  params: { per_page?: number } = {}
): Promise<WordPressPost[]> {
  const { per_page = 10 } = params;
  const seenIds = new Set<number>();
  const allPosts: WordPressPost[] = [];

  for (const slug of tagSlugs) {
    const slugified = slug.toLowerCase().replace(/\s+/g, '-');
    const tagRes = await fetch(
      `/api/tags?slug=${encodeURIComponent(slugified)}`
    );
    if (!tagRes.ok) continue;
    const tags = await tagRes.json();
    const targetTag = tags.find(
      (t: WordPressTag) => t.slug === slugified
    );
    if (!targetTag) continue;

    const query = new URLSearchParams();
    query.append('tags', String(targetTag.id));
    query.append('per_page', String(per_page * 2)); // Fetch extra to account for overlap
    query.append('orderby', 'date');
    query.append('order', 'desc');
    query.append('_embed', '1');

    const res = await fetch(`/api/posts?${query.toString()}`);
    if (!res.ok) continue;
    const posts: WordPressPost[] = await res.json();
    for (const post of posts) {
      if (!seenIds.has(post.id)) {
        seenIds.add(post.id);
        allPosts.push(post);
      }
    }
  }

  // Sort by date desc
  allPosts.sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  return allPosts.slice(0, per_page);
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

async function fetchAuthors(): Promise<WordPressUser[]> {
  const res = await fetch('/api/authors');
  if (!res.ok) throw new Error('Failed to fetch authors');
  return await res.json();
}

async function fetchAuthorByUsername(
  username: string
): Promise<WordPressUser | null> {
  const res = await fetch(
    `/api/authors?username=${encodeURIComponent(username)}`
  );
  if (!res.ok) {
    if (res.status === 404) return null;
    throw new Error('Failed to fetch author');
  }
  return await res.json();
}

interface SiteState {
  posts: WordPressPost[];
  categories: WordPressCategory[];
  tags: WordPressTag[];
  authors: WordPressUser[];
  issues: BLEIssue[];
  bleIssues: BLEIssue[];
  bleTags: WordPressTag[];
  totalIssues: number;
  totalPosts: number;

  // Category-specific posts storage
  categoryPosts: Record<number, WordPressPost[]>;
  categoryPostsLoading: Record<number, boolean>;
  categoryPostsError: Record<number, string | null>;

  // General latest posts by page (for All Categories pagination)
  generalPostsByPage: Record<number, WordPressPost[]>;
  generalPostsLoadingByPage: Record<number, boolean>;
  generalPostsErrorByPage: Record<number, string | null>;

  // Author-specific posts storage
  authorPosts: Record<string, WordPressPost[]>;
  authorPostsLoading: Record<string, boolean>;
  authorPostsError: Record<string, string | null>;

  // BLE "More from BLE" - posts tagged with BLE or Black Life Everywhere
  bleMorePosts: WordPressPost[];
  bleMorePostsLoading: boolean;
  bleMorePostsError: string | null;
  bleMorePostsLastFetched: number | null;

  postsLoading: boolean;
  categoriesLoading: boolean;
  tagsLoading: boolean;
  authorsLoading: boolean;
  bleIssuesLoading: boolean;
  bleTagsLoading: boolean;

  postsError: string | null;
  categoriesError: string | null;
  tagsError: string | null;
  authorsError: string | null;
  bleIssuesError: string | null;
  bleTagsError: string | null;

  // Cache timestamps for data freshness
  postsLastFetched: number | null;
  categoriesLastFetched: number | null;
  tagsLastFetched: number | null;
  authorsLastFetched: number | null;
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

  fetchLatestPostsPage: (params?: {
    per_page?: number;
    page?: number;
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

  fetchPostsByAuthor: (
    username: string,
    params?: {
      per_page?: number;
      page?: number;
      force?: boolean;
    }
  ) => Promise<void>;

  fetchCategories: (force?: boolean) => Promise<void>;
  fetchTags: (force?: boolean) => Promise<void>;
  fetchAuthors: (force?: boolean) => Promise<void>;
  fetchAuthorByUsername: (
    username: string,
    force?: boolean
  ) => Promise<WordPressUser | null>;
  fetchBlackLifeEverywhereIssues: (force?: boolean) => Promise<void>;
  fetchBLETags: (force?: boolean) => Promise<void>;
  fetchBLEMorePosts: (params?: {
    per_page?: number;
    force?: boolean;
  }) => Promise<void>;

  hydrateFromServer: (
    data: Partial<
      Pick<
        SiteState,
        | 'posts'
        | 'categories'
        | 'tags'
        | 'authors'
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
  clearAuthors: () => void;
  clearIssues: () => void;
  clearErrors: () => void;
  clearCache: () => void;
  clearCategoryPosts: (categoryId?: number) => void;
  clearAuthorPosts: (username?: string) => void;
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
      authors: [],
      issues: [],
      bleIssues: [],
      bleTags: [],
      totalIssues: 0,
      totalPosts: 0,

      // Category-specific posts storage
      categoryPosts: {},
      categoryPostsLoading: {},
      categoryPostsError: {},

      // Author-specific posts storage
      authorPosts: {},
      authorPostsLoading: {},
      authorPostsError: {},

      bleMorePosts: [],
      bleMorePostsLoading: false,
      bleMorePostsError: null,
      bleMorePostsLastFetched: null,

      postsLoading: false,
      categoriesLoading: false,
      tagsLoading: false,
      authorsLoading: false,
      bleIssuesLoading: false,
      bleTagsLoading: false,

      postsError: null,
      categoriesError: null,
      tagsError: null,
      authorsError: null,
      bleIssuesError: null,
      bleTagsError: null,

      // Cache timestamps
      postsLastFetched: null,
      categoriesLastFetched: null,
      tagsLastFetched: null,
      authorsLastFetched: null,
      bleIssuesLastFetched: null,
      bleTagsLastFetched: null,

      // Cache key for posts to handle different parameter combinations
      postsCacheKey: null,

      // General latest posts by page (for pagination in "All Categories")
      generalPostsByPage: {},
      generalPostsLoadingByPage: {},
      generalPostsErrorByPage: {},

      fetchPosts: async (params = {}) => {
        const { force = false, ...fetchParams } = params;
        const state = get();

        // Standardize parameters to always fetch 15 posts with _embed
        const standardizedParams = {
          per_page: 15,
          _embed: true,
          orderby: 'date',
          order: 'desc',
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
          return; // Use cached data
        }

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

      fetchLatestPostsPage: async (params = {}) => {
        const {
          force = false,
          page = 1,
          per_page = 15,
        } = params as {
          force?: boolean;
          page?: number;
          per_page?: number;
        };
        const state = get();

        // Page 1 is already handled by posts; only fetch if forced or missing/stale
        if (
          page === 1 &&
          !force &&
          state.posts.length > 0 &&
          !isDataStale(state.postsLastFetched)
        ) {
          return;
        }

        // If we already have this page cached and fresh, skip unless forced
        const existing = state.generalPostsByPage[page] || [];
        if (
          !force &&
          existing.length > 0 &&
          !isDataStale(state.postsLastFetched)
        ) {
          return;
        }

        // Set loading state for this page
        set(state => ({
          generalPostsLoadingByPage: {
            ...state.generalPostsLoadingByPage,
            [page]: true,
          },
          generalPostsErrorByPage: {
            ...state.generalPostsErrorByPage,
            [page]: null,
          },
        }));

        try {
          const posts = await fetchPosts({
            per_page,
            page,
            _embed: true,
            orderby: 'date',
            order: 'desc',
          });
          set(state => ({
            generalPostsByPage: {
              ...state.generalPostsByPage,
              [page]: posts,
            },
            generalPostsLoadingByPage: {
              ...state.generalPostsLoadingByPage,
              [page]: false,
            },
            postsLastFetched: Date.now(),
          }));
        } catch (error) {
          set(state => ({
            generalPostsErrorByPage: {
              ...state.generalPostsErrorByPage,
              [page]:
                error instanceof Error
                  ? error.message
                  : 'Failed to fetch posts',
            },
            generalPostsLoadingByPage: {
              ...state.generalPostsLoadingByPage,
              [page]: false,
            },
          }));
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
          return; // Use cached data
        }

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

      fetchAuthors: async (force = false) => {
        const state = get();

        // Check if we have cached data and it's not stale
        if (
          !force &&
          state.authors.length > 0 &&
          !isDataStale(state.authorsLastFetched)
        ) {
          return; // Use cached data
        }

        set({ authorsLoading: true, authorsError: null });

        try {
          const authors = await fetchAuthors();
          set({
            authors,
            authorsLoading: false,
            authorsLastFetched: Date.now(),
          });
        } catch (error) {
          set({
            authorsError:
              error instanceof Error
                ? error.message
                : 'Failed to fetch authors',
            authorsLoading: false,
          });
        }
      },

      fetchAuthorByUsername: async (username, force = false) => {
        const state = get();

        // Check if we have cached data and it's not stale
        if (
          !force &&
          state.authors.length > 0 &&
          !isDataStale(state.authorsLastFetched)
        ) {
          // Return the author from cache if found
          const cachedAuthor = state.authors.find(
            author => author.username === username
          );
          return cachedAuthor || null;
        }

        set({ authorsLoading: true, authorsError: null });

        try {
          const author = await fetchAuthorByUsername(username);
          set({
            authors: author ? [author] : [],
            authorsLoading: false,
            authorsLastFetched: Date.now(),
          });
          return author;
        } catch (error) {
          set({
            authorsError:
              error instanceof Error ? error.message : 'Failed to fetch author',
            authorsLoading: false,
          });
          return null;
        }
      },

      fetchPostsByAuthor: async (username, params = {}) => {
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
          const posts = await fetchPostsByAuthor(username, fetchParams);
          set({
            posts,
            postsLoading: false,
            postsLastFetched: Date.now(),
          });
        } catch (error) {
          set({
            postsError:
              error instanceof Error
                ? error.message
                : 'Failed to fetch posts by author',
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

      fetchBLEMorePosts: async (params = {}) => {
        const { force = false, per_page = 6 } = params;
        const state = get();

        if (
          !force &&
          state.bleMorePosts.length > 0 &&
          !isDataStale(state.bleMorePostsLastFetched)
        ) {
          return;
        }

        set({ bleMorePostsLoading: true, bleMorePostsError: null });
        try {
          let posts = await fetchPostsByTagSlugs(
            ['ble', 'black-life-everywhere'],
            { per_page }
          );
          // Fallback to category if no tag results
          if (posts.length === 0) {
            posts = await fetchPostsByCategoryName('blacklifeeverywhere', {
              per_page,
              page: 1,
            });
          }
          set({
            bleMorePosts: posts,
            bleMorePostsLoading: false,
            bleMorePostsError: null,
            bleMorePostsLastFetched: Date.now(),
          });
        } catch (error) {
          set({
            bleMorePostsError:
              error instanceof Error
                ? error.message
                : 'Failed to fetch BLE articles',
            bleMorePostsLoading: false,
          });
        }
      },

      hydrateFromServer: data => {
        set(state => ({
          posts: data.posts ?? state.posts,
          categories: data.categories ?? state.categories,
          tags: data.tags ?? state.tags,
          authors: data.authors ?? state.authors,
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
      clearAuthors: () =>
        set({
          authors: [],
          authorsError: null,
          authorsLastFetched: null,
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
          authorsError: null,
          bleIssuesError: null,
          bleTagsError: null,
          bleMorePostsError: null,
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
      clearAuthorPosts: (username?: string) => {
        if (username) {
          // Clear specific author posts
          set(state => ({
            authorPosts: {
              ...state.authorPosts,
              [username]: [],
            },
            authorPostsLoading: {
              ...state.authorPostsLoading,
              [username]: false,
            },
            authorPostsError: {
              ...state.authorPostsError,
              [username]: null,
            },
          }));
        } else {
          // Clear all author posts
          set({
            authorPosts: {},
            authorPostsLoading: {},
            authorPostsError: {},
          });
        }
      },

      clearCache: () =>
        set({
          postsLastFetched: null,
          postsCacheKey: null,
          categoriesLastFetched: null,
          tagsLastFetched: null,
          authorsLastFetched: null,
          bleIssuesLastFetched: null,
          bleTagsLastFetched: null,
        }),
    }),
    {
      name: 'byp-store', // unique name for localStorage key
      storage: createJSONStorage(() => {
        // Check if we're in a browser environment
        const isClient = typeof window !== 'undefined';

        return {
          getItem: (name: string) => {
            if (!isClient) return null;
            try {
              return localStorage.getItem(name);
            } catch {
              return null;
            }
          },
          setItem: (name: string, value: string) => {
            if (!isClient) return;
            try {
              localStorage.setItem(name, value);
            } catch {
              // Clear some data to make space
              try {
                localStorage.clear();
                localStorage.setItem(name, value);
              } catch {
                // Silently fail
              }
            }
          },
          removeItem: (name: string) => {
            if (!isClient) return;
            try {
              localStorage.removeItem(name);
            } catch {
              // Silently fail
            }
          },
        };
      }),
      // Only persist data, not loading states or errors
      // Note: categoryPosts is not persisted to avoid localStorage quota issues
      partialize: state => ({
        posts: state.posts,
        categories: state.categories,
        tags: state.tags,
        authors: state.authors,
        issues: state.issues,
        bleIssues: state.bleIssues,
        bleTags: state.bleTags,
        totalIssues: state.totalIssues,
        totalPosts: state.totalPosts,
        postsLastFetched: state.postsLastFetched,
        postsCacheKey: state.postsCacheKey,
        categoriesLastFetched: state.categoriesLastFetched,
        tagsLastFetched: state.tagsLastFetched,
        authorsLastFetched: state.authorsLastFetched,
        bleIssuesLastFetched: state.bleIssuesLastFetched,
        bleTagsLastFetched: state.bleTagsLastFetched,
      }),
    }
  )
);
