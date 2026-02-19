'use client';

import { useMemo, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import NewestArticles from './components/NewestArticles';
import CategoriesSection from './components/CategoriesSection';
import FeaturedPost from './components/FeaturedPost';
import { useSiteStore } from './lib/store';
import { WordPressCategory, WordPressPost, isBLEPost } from './lib/wordpress';

export default function Home() {
  const {
    posts,
    postsLoading,
    categories,
    tags,
    fetchPosts,
    fetchCategories,
    fetchTags,
  } = useSiteStore();

  useEffect(() => {
    // Fetch data only if we don't have it or if it's stale
    fetchPosts({ per_page: 15, page: 1 });
    fetchCategories();
    fetchTags();
  }, [fetchPosts, fetchCategories, fetchTags]);

  // Exclude BLE / Black Life Everywhere posts from the homepage
  const homePosts = useMemo(
    () =>
      posts.filter(
        post => !isBLEPost(post, { categories, tags })
      ) as WordPressPost[],
    [posts, categories, tags]
  );

  const featuredCategory = categories.find(
    category => category.name === 'Featured'
  ) as WordPressCategory | undefined;

  const featuredPosts = homePosts.filter(post =>
    post.categories.includes(featuredCategory?.id || 0)
  ) as WordPressPost[] | undefined;

  const featuredPost = featuredPosts?.[0] as WordPressPost | undefined;

  return (
    <div
      className="min-h-screen bg-fixed bg-cover"
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
          <NewestArticles postsOverride={homePosts} />
          <CategoriesSection
            categories={categories}
            allPostsOverride={homePosts}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}
