import { create } from 'zustand';
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

  fetchPosts: (params?: {
    per_page?: number;
    page?: number;
    categories?: number[];
    tags?: number[];
    search?: string;
  }) => Promise<void>;

  fetchCategories: () => Promise<void>;
  fetchTags: () => Promise<void>;
  fetchBlackLifeEverywhereIssues: () => Promise<void>;
  fetchBLETags: () => Promise<void>;

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
}

export const useSiteStore = create<SiteState>(set => ({
  posts: [],
  categories: [],
  tags: [],
  issues: [],
  bleIssues: [],
  bleTags: [],
  totalIssues: 0,
  totalPosts: 0,

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

  fetchPosts: async (params = {}) => {
    set({ postsLoading: true, postsError: null });

    try {
      const posts = await fetchPosts(params);
      set({ posts, postsLoading: false });
    } catch (error) {
      set({
        postsError:
          error instanceof Error ? error.message : 'Failed to fetch posts',
        postsLoading: false,
      });
    }
  },

  fetchCategories: async () => {
    set({ categoriesLoading: true, categoriesError: null });

    try {
      const categories = await fetchCategories();
      set({ categories, categoriesLoading: false });
    } catch (error) {
      set({
        categoriesError:
          error instanceof Error ? error.message : 'Failed to fetch categories',
        categoriesLoading: false,
      });
    }
  },

  fetchTags: async () => {
    set({ tagsLoading: true, tagsError: null });

    try {
      const tags = await fetchTags();
      set({ tags, tagsLoading: false });
    } catch (error) {
      set({
        tagsError:
          error instanceof Error ? error.message : 'Failed to fetch tags',
        tagsLoading: false,
      });
    }
  },

  fetchBlackLifeEverywhereIssues: async () => {
    set({ bleIssuesLoading: true, bleIssuesError: null });
    try {
      const bleIssues = await fetchBlackLifeEverywhereIssues();
      set({ bleIssues, bleIssuesLoading: false });
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

  fetchBLETags: async () => {
    set({ bleTagsLoading: true, bleTagsError: null });
    try {
      const bleTags = await fetchTags();
      set({ bleTags, bleTagsLoading: false });
    } catch (error) {
      set({
        bleTagsError:
          error instanceof Error ? error.message : 'Failed to fetch BLE tags',
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

  clearPosts: () => set({ posts: [], postsError: null }),
  clearCategories: () => set({ categories: [], categoriesError: null }),
  clearTags: () => set({ tags: [], tagsError: null }),
  clearIssues: () => set({ issues: [], bleIssues: [], bleIssuesError: null }),
  clearErrors: () =>
    set({
      postsError: null,
      categoriesError: null,
      tagsError: null,
      bleIssuesError: null,
      bleTagsError: null,
    }),
}));
