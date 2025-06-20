'use client';

import { useEffect } from 'react';
import { usePosts } from '../lib/hooks';

export default function PostsSection() {
  const { posts, postsLoading, postsError, fetchPosts } = usePosts();

  useEffect(() => {
    // Fetch posts when component mounts
    fetchPosts({ per_page: 3 });
  }, [fetchPosts]);

  if (postsLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Featured Content from WordPress
        </h3>
        <div className="flex justify-center items-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Loading posts...</span>
        </div>
      </div>
    );
  }

  if (postsError) {
    return (
      <div className="bg-white rounded-lg shadow p-8 mb-8">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">
          Featured Content from WordPress
        </h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-center">
            Error loading posts: {postsError}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-8 mb-8">
      <h3 className="text-2xl font-semibold text-gray-900 mb-6">
        Featured Content from WordPress
      </h3>
      {posts.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <article
              key={post.id}
              className="border rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-2">
                {post.title.rendered}
              </h4>
              <p className="text-gray-600 text-sm mb-3">
                {post.excerpt.rendered.replace(/<[^>]*>/g, '')}
              </p>
              <div className="text-xs text-gray-500">
                {new Date(post.date).toLocaleDateString()}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="bg-gray-100 rounded p-4">
          <p className="text-sm text-gray-500 text-center">
            No posts available. WordPress API integration coming soon...
          </p>
        </div>
      )}
    </div>
  );
}
