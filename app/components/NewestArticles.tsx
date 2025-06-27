'use client';

import { useEffect } from 'react';
import { useSiteStore } from '../lib/store';
import ArticlePreview from './ArticlePreview';

// Skeleton component for article previews
function ArticlePreviewSkeleton() {
  return (
    <div className="flex-shrink-0 w-80 w-full max-w-sm">
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

export default function NewestArticles() {
  const { posts, postsLoading, postsError, fetchPosts } = useSiteStore();

  useEffect(() => {
    // The store will automatically check cache and only fetch if needed
    fetchPosts({ per_page: 5, page: 1 });
  }, [fetchPosts]);

  return (
    <section className="py-12 border-t-2 border-white">
      <h2
        className="text-2xl font-bold text-left mb-8 font-medium"
        style={{ fontFamily: 'Gill Sans' }}
      >
        NEWEST ARTICLES
      </h2>
      <div className="flex overflow-x-auto space-x-8 pb-4">
        {postsLoading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 5 }).map((_, index) => (
            <ArticlePreviewSkeleton key={index} />
          ))
        ) : postsError ? (
          <div>Error loading articles: {postsError}</div>
        ) : (
          // Show actual articles when loaded
          posts
            .slice(0, 5)
            .map(post => <ArticlePreview key={post.id} post={post} />)
        )}
      </div>
    </section>
  );
}
