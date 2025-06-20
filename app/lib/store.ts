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

  postsLoading: boolean;
  categoriesLoading: boolean;
  tagsLoading: boolean;

  postsError: string | null;
  categoriesError: string | null;
  tagsError: string | null;

  fetchPosts: (params?: {
    per_page?: number;
    page?: number;
    categories?: number[];
    tags?: number[];
    search?: string;
  }) => Promise<void>;

  fetchCategories: () => Promise<void>;
  fetchTags: () => Promise<void>;

  hydrateFromServer: (
    data: Partial<Pick<SiteState, 'posts' | 'categories' | 'tags'>>
  ) => void;

  clearPosts: () => void;
  clearCategories: () => void;
  clearTags: () => void;
  clearErrors: () => void;
}

export const useSiteStore = create<SiteState>(set => ({
  posts: [],
  categories: [],
  tags: [],

  postsLoading: false,
  categoriesLoading: false,
  tagsLoading: false,

  postsError: null,
  categoriesError: null,
  tagsError: null,

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

  hydrateFromServer: data => {
    set(state => ({
      posts: data.posts ?? state.posts,
      categories: data.categories ?? state.categories,
      tags: data.tags ?? state.tags,
    }));
  },

  clearPosts: () => set({ posts: [], postsError: null }),
  clearCategories: () => set({ categories: [], categoriesError: null }),
  clearTags: () => set({ tags: [], tagsError: null }),
  clearErrors: () =>
    set({
      postsError: null,
      categoriesError: null,
      tagsError: null,
    }),
}));
