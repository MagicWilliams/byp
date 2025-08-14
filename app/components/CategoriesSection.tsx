'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSiteStore } from '../lib/store';
import ArticlePreview from './ArticlePreview';
import { WordPressCategory } from '../lib/wordpress';

// Skeleton component for article previews in grid layout
function ArticlePreviewSkeleton() {
  return (
    <div className="w-full">
      <div className="flex flex-col overflow-hidden">
        {/* Image skeleton */}
        <div className="relative w-full aspect-[4/3] mb-2">
          <div className="w-full h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded-md"></div>
        </div>
        {/* Title skeleton */}
        <div className="mb-2">
          <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded mb-2"></div>
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded w-3/4"></div>
        </div>
        {/* Excerpt skeleton */}
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded"></div>
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded w-5/6"></div>
          <div className="h-4 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded w-4/5"></div>
        </div>
      </div>
    </div>
  );
}

export default function CategoriesSection({
  categories,
}: {
  categories: WordPressCategory[];
}) {
  const {
    posts,
    postsLoading,
    postsError,
    categoryPosts,
    categoryPostsLoading,
    categoryPostsError,
    fetchPostsByCategoryId,
    fetchLatestPostsPage,
    generalPostsByPage,
    generalPostsLoadingByPage,
    generalPostsErrorByPage,
  } = useSiteStore();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [page, setPage] = useState<number>(1);
  console.log(categories);
  useEffect(() => {
    // Fetch posts when a category is selected
    if (selectedCategory) {
      fetchPostsByCategoryId(selectedCategory);
    } else {
      // For "All" we fetch by page beyond page 1 as needed
      if (page > 1) {
        fetchLatestPostsPage({ page, per_page: 15 });
      }
    }
  }, [selectedCategory, page, fetchPostsByCategoryId, fetchLatestPostsPage]);

  // Reset to page 1 when switching categories
  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) {
      // All categories: use page 1 from main posts; subsequent pages from cache
      if (page === 1) return posts;
      return generalPostsByPage[page] || [];
    }
    return categoryPosts[selectedCategory] || [];
  }, [posts, selectedCategory, categoryPosts, page, generalPostsByPage]);

  const isLoading = selectedCategory
    ? categoryPostsLoading[selectedCategory] || false
    : page === 1
    ? postsLoading
    : generalPostsLoadingByPage[page] || false;

  const error = selectedCategory
    ? categoryPostsError[selectedCategory] || null
    : page === 1
    ? postsError
    : generalPostsErrorByPage[page] || null;

  return (
    <section className="py-4 pt-8 md:pt-12md:py-12 border-t-2 border-white">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories column */}
        <div className="w-full md:w-1/4 flex-shrink-0">
          <div className="rounded-lg md:p-6 mb-4 md:mb-0 md:pt-0">
            <h3
              className="text-2xl font-medium mb-4 text-white"
              style={{ fontFamily: 'Gill Sans' }}
            >
              Categories
            </h3>
            <ul
              style={{ alignItems: 'first baseline' }}
              className="flex md:flex-col flex-row flex-wrap gap-2 md:gap-0"
            >
              <li>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left py-1 rounded transition-colors ${
                    selectedCategory === null
                      ? 'text-white font-bold'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  All
                </button>
              </li>
              {categories.map(category => (
                <li key={category.id}>
                  <button
                    onClick={() => setSelectedCategory(category.id)}
                    style={{ fontFamily: 'Gill Sans' }}
                    className={`w-full text-left py-1 rounded transition-colors ${
                      selectedCategory === category.id
                        ? 'text-white font-bold'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {category.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        {/* Articles grid */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
            {isLoading ? (
              // Show skeleton loaders while loading
              Array.from({ length: 9 }).map((_, index) => (
                <ArticlePreviewSkeleton key={index} />
              ))
            ) : error ? (
              <div>Error loading posts for categories: {error}</div>
            ) : (
              // Show actual articles when loaded
              filteredPosts.slice(0, 15).map(post => (
                <div key={post.id} className="w-full">
                  <ArticlePreview post={post} />
                </div>
              ))
            )}
          </div>

          {/* Pagination for All Categories only */}
          {!selectedCategory && (
            <div className="flex items-center justify-center gap-4 mt-10">
              <button
                className={`px-4 py-2 border rounded text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
              >
                Previous
              </button>
              <span className="text-gray-300">Page {page}</span>
              <button
                className={`px-4 py-2 border rounded text-white disabled:opacity-50 disabled:cursor-not-allowed`}
                onClick={() => setPage(p => p + 1)}
                disabled={isLoading}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
