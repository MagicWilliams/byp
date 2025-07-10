'use client';

import { useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NewestArticles from './components/NewestArticles';
import CategoriesSection from './components/CategoriesSection';
import FeaturedPost from './components/FeaturedPost';
import { useSiteStore } from './lib/store';
import { PageResults, WordPressPost } from './lib/wordpress';

export default function Home() {
  const { posts, postsLoading, categories, fetchPosts, fetchCategories } =
    useSiteStore();

  useEffect(() => {
    // Fetch data only if we don't have it or if it's stale
    // The store will automatically check cache and only fetch if needed
    fetchPosts({ per_page: 100, _embed: true } as unknown as PageResults);
    fetchCategories();
  }, [fetchPosts, fetchCategories]);

  const featuredPost = posts[0] as WordPressPost | undefined;

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundImage: featuredPost?.jetpack_featured_media_url
          ? `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.9)), url(${featuredPost.jetpack_featured_media_url})`
          : 'none',
        backgroundColor: 'black',
        backgroundSize: 'fill',
        backgroundPosition: 'center',
      }}
    >
      <Header />

      <main>
        <FeaturedPost featuredPost={featuredPost} loading={postsLoading} />

        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <NewestArticles />
          <CategoriesSection categories={categories} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
