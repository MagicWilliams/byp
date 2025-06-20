import { create } from 'zustand';
import {
  fetchPosts,
  fetchCategories,
  fetchTags,
  WordPressPost,
  WordPressCategory,
  WordPressTag,
} from './wordpress';

interface SiteState {
  // Data
  posts: WordPressPost[];
  categories: WordPressCategory[];
  tags: WordPressTag[];

  // Loading states
  postsLoading: boolean;
  categoriesLoading: boolean;
  tagsLoading: boolean;

  // Error states
  postsError: string | null;
  categoriesError: string | null;
  tagsError: string | null;

  // Actions
  fetchPosts: (params?: {
    per_page?: number;
    page?: number;
    categories?: number[];
    tags?: number[];
    search?: string;
  }) => Promise<void>;

  fetchCategories: () => Promise<void>;
  fetchTags: () => Promise<void>;

  // Utility actions
  clearPosts: () => void;
  clearCategories: () => void;
  clearTags: () => void;
  clearErrors: () => void;
}

export const useSiteStore = create<SiteState>((set, get) => ({
  // Initial state
  posts: [],
  categories: [],
  tags: [],

  postsLoading: false,
  categoriesLoading: false,
  tagsLoading: false,

  postsError: null,
  categoriesError: null,
  tagsError: null,

  // Actions
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

  // Utility actions
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
