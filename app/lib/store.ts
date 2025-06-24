import { create } from 'zustand';

export type WordPressPost = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  modified: string;
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  jetpack_featured_media_url?: string;
};

export type WordPressCategory = {
  id: number;
  name: string;
  slug: string;
};

export type WordPressTag = {
  id: number;
  name: string;
  slug: string;
};

export type WordPressIssue = {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  slug: string;
  date: string;
  modified: string;
  // Add any other fields you need from the issue object
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

async function fetchBlackLifeEverywherePosts(): Promise<WordPressPost[]> {
  const res = await fetch('/api/black-life-everywhere');
  if (!res.ok) throw new Error('Failed to fetch Black Life Everywhere posts');
  return await res.json();
}

async function fetchIssues(): Promise<WordPressIssue[]> {
  const res = await fetch('/api/issues');
  if (!res.ok) throw new Error('Failed to fetch issues');
  return await res.json();
}

interface SiteState {
  posts: WordPressPost[];
  categories: WordPressCategory[];
  tags: WordPressTag[];
  blackLifeEverywherePosts: WordPressPost[];
  issues: WordPressIssue[];

  postsLoading: boolean;
  categoriesLoading: boolean;
  tagsLoading: boolean;
  blackLifeEverywhereLoading: boolean;
  issuesLoading: boolean;

  postsError: string | null;
  categoriesError: string | null;
  tagsError: string | null;
  blackLifeEverywhereError: string | null;
  issuesError: string | null;

  fetchPosts: (params?: {
    per_page?: number;
    page?: number;
    categories?: number[];
    tags?: number[];
    search?: string;
  }) => Promise<void>;

  fetchCategories: () => Promise<void>;
  fetchTags: () => Promise<void>;
  fetchBlackLifeEverywherePosts: () => Promise<void>;
  fetchIssues: () => Promise<void>;

  hydrateFromServer: (
    data: Partial<
      Pick<
        SiteState,
        'posts' | 'categories' | 'tags' | 'blackLifeEverywherePosts' | 'issues'
      >
    >
  ) => void;

  clearPosts: () => void;
  clearCategories: () => void;
  clearTags: () => void;
  clearBlackLifeEverywherePosts: () => void;
  clearIssues: () => void;
  clearErrors: () => void;
}

export const useSiteStore = create<SiteState>(set => ({
  posts: [],
  categories: [],
  tags: [],
  blackLifeEverywherePosts: [],
  issues: [],

  postsLoading: false,
  categoriesLoading: false,
  tagsLoading: false,
  blackLifeEverywhereLoading: false,
  issuesLoading: false,

  postsError: null,
  categoriesError: null,
  tagsError: null,
  blackLifeEverywhereError: null,
  issuesError: null,

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

  fetchBlackLifeEverywherePosts: async () => {
    set({ blackLifeEverywhereLoading: true, blackLifeEverywhereError: null });

    try {
      const posts = await fetchBlackLifeEverywherePosts();
      set({
        blackLifeEverywherePosts: posts,
        blackLifeEverywhereLoading: false,
      });
    } catch (error) {
      set({
        blackLifeEverywhereError:
          error instanceof Error
            ? error.message
            : 'Failed to fetch Black Life Everywhere posts',
        blackLifeEverywhereLoading: false,
      });
    }
  },

  fetchIssues: async () => {
    set({ issuesLoading: true, issuesError: null });
    try {
      const issues = await fetchIssues();
      set({ issues, issuesLoading: false });
    } catch (error) {
      set({
        issuesError:
          error instanceof Error ? error.message : 'Failed to fetch issues',
        issuesLoading: false,
      });
    }
  },

  hydrateFromServer: data => {
    set(state => ({
      posts: data.posts ?? state.posts,
      categories: data.categories ?? state.categories,
      tags: data.tags ?? state.tags,
      blackLifeEverywherePosts:
        data.blackLifeEverywherePosts ?? state.blackLifeEverywherePosts,
      issues: data.issues ?? state.issues,
    }));
  },

  clearPosts: () => set({ posts: [], postsError: null }),
  clearCategories: () => set({ categories: [], categoriesError: null }),
  clearTags: () => set({ tags: [], tagsError: null }),
  clearBlackLifeEverywherePosts: () =>
    set({ blackLifeEverywherePosts: [], blackLifeEverywhereError: null }),
  clearIssues: () => set({ issues: [], issuesError: null }),
  clearErrors: () =>
    set({
      postsError: null,
      categoriesError: null,
      tagsError: null,
      blackLifeEverywhereError: null,
      issuesError: null,
    }),
}));
