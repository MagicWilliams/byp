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

// Hook for issues
export const useIssues = () => {
  const {
    issues,
    bleIssuesLoading,
    bleIssuesError,
    fetchBlackLifeEverywhereIssues,
    clearIssues,
  } = useSiteStore();

  return {
    issues,
    bleIssuesLoading,
    bleIssuesError,
    fetchBlackLifeEverywhereIssues,
    clearIssues,
  };
};

// Hook for BLE tags
export const useBLETags = () => {
  const { bleTags, bleTagsLoading, bleTagsError, fetchBLETags } =
    useSiteStore();

  return {
    bleTags,
    bleTagsLoading,
    bleTagsError,
    fetchBLETags,
  };
};

// Hook for Black Life Everywhere data
export const useBlackLifeEverywhere = () => {
  const {
    bleIssues,
    bleIssuesLoading,
    bleIssuesError,
    fetchBlackLifeEverywhereIssues,
  } = useSiteStore();

  // Function to force refresh by clearing cache and refetching
  const refreshData = async () => {
    await fetchBlackLifeEverywhereIssues();
  };

  return {
    bleIssues,
    bleIssuesLoading,
    bleIssuesError,
    fetchBlackLifeEverywhereIssues,
    refreshData,
  };
};

// Hook for all site data
export const useSiteData = () => {
  const {
    posts,
    categories,
    tags,
    bleTags,
    bleIssues,
    bleIssuesLoading,
    bleIssuesError,
    bleTagsLoading,
    postsLoading,
    categoriesLoading,
    tagsLoading,
    postsError,
    categoriesError,
    tagsError,
    bleTagsError,
    fetchPosts,
    fetchCategories,
    fetchTags,
    fetchBLETags,
    fetchBlackLifeEverywhereIssues,
    clearPosts,
    clearCategories,
    clearTags,
    clearIssues,
    clearErrors,
  } = useSiteStore();

  return {
    posts,
    categories,
    tags,
    bleTags,
    bleIssues,
    bleIssuesLoading,
    bleIssuesError,
    bleTagsLoading,
    postsLoading,
    categoriesLoading,
    tagsLoading,
    postsError,
    categoriesError,
    tagsError,
    bleTagsError,
    fetchPosts,
    fetchCategories,
    fetchTags,
    fetchBLETags,
    fetchBlackLifeEverywhereIssues,
    clearPosts,
    clearCategories,
    clearTags,
    clearIssues,
    clearErrors,
    // Computed values
    isLoading:
      postsLoading ||
      categoriesLoading ||
      tagsLoading ||
      bleTagsLoading ||
      bleIssuesLoading,
    hasErrors: !!(
      postsError ||
      categoriesError ||
      tagsError ||
      bleTagsError ||
      bleIssuesError
    ),
  };
};
