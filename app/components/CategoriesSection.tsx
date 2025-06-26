'use client';

import { useEffect, useState, useMemo } from 'react';
import { useSiteStore } from '../lib/store';
import ArticlePreview from './ArticlePreview';
import { WordPressCategory, PageResults } from '../lib/wordpress';

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

  if (postsLoading) {
    return <div>Loading categories...</div>;
  }

  if (postsError) {
    return <div>Error loading posts for categories: {postsError}</div>;
  }

  return (
    <section className="py-4 md:py-12 border-t-2 border-white">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Categories column */}
        <div className="w-full md:w-1/4 flex-shrink-0">
          <div className=" rounded-lg md:p-6 mb-4 md:mb-0">
            <h3
              className="text-2xl font-medium mb-4 text-white"
              style={{ fontFamily: 'Gill Sans' }}
            >
              CATEGORIES
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
            {filteredPosts.map(post => (
              <div key={post.id} className="w-full">
                <ArticlePreview post={post} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
