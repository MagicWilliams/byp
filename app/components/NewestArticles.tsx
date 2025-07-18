'use client';

import { useEffect, useRef, useState } from 'react';
import { useSiteStore } from '../lib/store';
import ArticlePreview from './ArticlePreview';
import Image from 'next/image';

interface NewestArticlesProps {
  page?: string;
}

// Skeleton component for article previews
function ArticlePreviewSkeleton({ isBle = false }: { isBle?: boolean }) {
  const bgColor = isBle
    ? 'from-gray-300 via-gray-200 to-gray-300'
    : 'from-gray-700 via-gray-600 to-gray-700';

  return (
    <div className="flex-shrink-0 w-80 w-full max-w-sm">
      <div className="flex flex-col overflow-hidden">
        {/* Image skeleton */}
        <div className="relative w-full aspect-[16/9] mb-2">
          <div
            className={`w-full h-full bg-gradient-to-r ${bgColor} animate-pulse rounded-md`}
          ></div>
        </div>
        {/* Title skeleton */}
        <div className="mb-2">
          <div
            className={`h-6 bg-gradient-to-r ${bgColor} animate-pulse rounded mb-2`}
          ></div>
          <div
            className={`h-4 bg-gradient-to-r ${bgColor} animate-pulse rounded w-3/4`}
          ></div>
        </div>
        {/* Excerpt skeleton */}
        <div className="space-y-2">
          <div
            className={`h-4 bg-gradient-to-r ${bgColor} animate-pulse rounded`}
          ></div>
          <div
            className={`h-4 bg-gradient-to-r ${bgColor} animate-pulse rounded w-5/6`}
          ></div>
          <div
            className={`h-4 bg-gradient-to-r ${bgColor} animate-pulse rounded w-4/5`}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default function NewestArticles({ page }: NewestArticlesProps) {
  const { posts, postsLoading, postsError, fetchPostsByCategoryName } =
    useSiteStore();

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // If page is "ble", fetch posts in the "blacklifeeverywhere" category
    if (page === 'ble') {
      fetchPostsByCategoryName('blacklifeeverywhere', { per_page: 5, page: 1 });
    }
    // For standard behavior, we don't need to fetch posts here
    // The main page already fetches all posts, and we'll slice them on the frontend
  }, [fetchPostsByCategoryName, page]);

  const startScrolling = () => {
    if (!scrollContainerRef.current) return;

    setIsScrolling(true);
    scrollIntervalRef.current = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft += 10; // Smooth scroll speed
      }
    }, 16); // ~60fps
  };

  const stopScrolling = () => {
    setIsScrolling(false);
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const handleArrowClick = () => {
    if (!scrollContainerRef.current) return;

    // Scroll by a fixed amount (e.g., 300px) when clicked
    scrollContainerRef.current.scrollLeft += 300;
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (scrollIntervalRef.current) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, []);

  return (
    <section
      className={`py-8 border-t-2 ${
        page === 'ble'
          ? 'bg-white text-black px-4 sm:px-6 lg:px-8 py-12'
          : 'border-white'
      }`}
    >
      <h2
        className={`text-2xl text-left mb-8 font-medium ${
          page === 'ble' ? 'text-black' : 'text-white'
        }`}
        style={{ fontFamily: 'Gill Sans' }}
      >
        Newest Articles
      </h2>
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto space-x-8 pb-4 scroll-smooth"
      >
        {postsLoading ? (
          // Show skeleton loaders while loading
          Array.from({ length: 5 }).map((_, index) => (
            <ArticlePreviewSkeleton key={index} isBle={page === 'ble'} />
          ))
        ) : postsError ? (
          <div>Error loading articles: {postsError}</div>
        ) : (
          // Show actual articles when loaded
          posts.slice(0, 5).map(post => (
            <div
              className="w-[66%] md:w-[32%] max-w-sm flex-shrink-0"
              key={post.id}
            >
              <ArticlePreview post={post} isBle={page === 'ble'} />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-end">
        <Image
          src={page === 'ble' ? '/img/arrow-black.svg' : '/img/arrow.svg'}
          alt="Scroll to the right for additional articles."
          width={50}
          height={33}
          className={`cursor-pointer transition-opacity duration-200 ${
            isScrolling ? 'opacity-70' : 'opacity-100'
          }`}
          onMouseEnter={startScrolling}
          onMouseLeave={stopScrolling}
          onClick={handleArrowClick}
        />
      </div>
    </section>
  );
}
