'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSiteStore } from '../lib/store';
import ArticlePreview from './ArticlePreview';
import { WordPressCategory, PageResults } from '../lib/wordpress';

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
  const { posts, postsLoading, postsError, fetchPosts } = useSiteStore();
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    // Fetch a larger number of posts to get a good variety of categories
    fetchPosts({
      per_page: 100,
      page: 1,
      _embed: true,
    } as unknown as PageResults);
  }, [fetchPosts]);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) {
      return posts;
    }
    return posts.filter(post => post.categories.includes(selectedCategory));
  }, [posts, selectedCategory]);

  return (
    <section className="py-4 md:py-12 border-t-2 border-white">
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
            <ul className="flex md:flex-col flex-row flex-wrap gap-2 md:gap-0">
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
            {postsLoading ? (
              // Show skeleton loaders while loading
              Array.from({ length: 9 }).map((_, index) => (
                <ArticlePreviewSkeleton key={index} />
              ))
            ) : postsError ? (
              <div>Error loading posts for categories: {postsError}</div>
            ) : (
              // Show actual articles when loaded
              filteredPosts.map((post, index) => {
                if (index > 9) return null;
                return (
                  <div key={post.id} className="w-full">
                    <ArticlePreview post={post} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
