import { useSiteStore } from './store';

// Hook for posts
export const usePosts = () => {
  const { posts, postsLoading, postsError, fetchPosts, clearPosts } =
    useSiteStore();

  return {
    posts,
    postsLoading,
    postsError,
    fetchPosts,
    clearPosts,
  };
};

// Hook for categories
export const useCategories = () => {
  const {
    categories,
    categoriesLoading,
    categoriesError,
    fetchCategories,
    clearCategories,
  } = useSiteStore();

  return {
    categories,
    categoriesLoading,
    categoriesError,
    fetchCategories,
    clearCategories,
  };
};

// Hook for tags
export const useTags = () => {
  const { tags, tagsLoading, tagsError, fetchTags, clearTags } = useSiteStore();

  return {
    tags,
    tagsLoading,
    tagsError,
    fetchTags,
    clearTags,
  };
};

// Hook for all site data
export const useSiteData = () => {
  const {
    posts,
    categories,
    tags,
    postsLoading,
    categoriesLoading,
    tagsLoading,
    postsError,
    categoriesError,
    tagsError,
    fetchPosts,
    fetchCategories,
    fetchTags,
    clearPosts,
    clearCategories,
    clearTags,
    clearErrors,
  } = useSiteStore();

  return {
    posts,
    categories,
    tags,
    postsLoading,
    categoriesLoading,
    tagsLoading,
    postsError,
    categoriesError,
    tagsError,
    fetchPosts,
    fetchCategories,
    fetchTags,
    clearPosts,
    clearCategories,
    clearTags,
    clearErrors,
    // Computed values
    isLoading: postsLoading || categoriesLoading || tagsLoading,
    hasErrors: !!(postsError || categoriesError || tagsError),
  };
};
