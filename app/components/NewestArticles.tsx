'use client';

import { useEffect } from 'react';
import { useSiteStore } from '../lib/store';
import ArticlePreview from './ArticlePreview';

export default function NewestArticles() {
  const { posts, postsLoading, postsError, fetchPosts } = useSiteStore();

  useEffect(() => {
    fetchPosts({ per_page: 5, page: 1 });
  }, [fetchPosts]);

  if (postsLoading) {
    return <div>Loading newest articles...</div>;
  }

  if (postsError) {
    return <div>Error loading articles: {postsError}</div>;
  }

  return (
    <section className="py-12 border-t-2 border-white">
      <h2
        className="text-2xl font-bold text-left mb-8 font-medium"
        style={{ fontFamily: 'Gill Sans' }}
      >
        NEWEST ARTICLES
      </h2>
      <div className="flex overflow-x-auto space-x-8 pb-4">
        {posts.slice(0, 5).map(post => (
          <ArticlePreview key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
