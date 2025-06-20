'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchPost, WordPressPost } from '../lib/wordpress';
import { useSiteStore } from '../lib/store';
import Header from './Header';

interface ArticleViewProps {
  slug: string;
}

export default function ArticleView({ slug }: ArticleViewProps) {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { posts, postsLoading, postsError, fetchPosts } = useSiteStore();

  console.log('Posts: ', posts);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const postData = await fetchPost(slug);
        setPost(postData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load article');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'The article you are looking for does not exist.'}
          </p>
          <Link
            href="/"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  console.log('Post: ', post);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {post.jetpack_featured_media_url && (
            <img
              src={post.jetpack_featured_media_url}
              alt={post.title.rendered}
              className="w-full h-auto object-cover"
            />
          )}
          {/* Article Header */}
          <div className="p-8 border-b border-gray-200">
            <div className="mb-4">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                ← Back to Home
              </Link>
            </div>

            <h1
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            <div className="flex items-center text-sm text-gray-500 space-x-4">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>
                Updated:{' '}
                {new Date(post.modified).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
            </div>
          </div>

          {/* Article Content */}
          <div className="p-8">
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>

          {/* Article Footer */}
          <div className="p-8 bg-gray-50 border-t border-gray-200">
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Categories:</span>
                <div className="flex space-x-2">
                  {post.categories.map((categoryId: number) => (
                    <span
                      key={categoryId}
                      className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      Category {categoryId}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">Tags:</span>
                <div className="flex space-x-2">
                  {post.tags.map((tagId: number) => (
                    <span
                      key={tagId}
                      className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                    >
                      Tag {tagId}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </article>

        {/* Related Articles Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Related Articles
          </h2>
          <div className="bg-white rounded-lg shadow p-6">
            <p className="text-gray-600 text-center">
              Related articles functionality coming soon...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
