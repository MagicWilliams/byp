'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  fetchPost,
  WordPressPost,
  WordPressTag,
  WordPressCategory,
} from '../lib/wordpress';
import { useSiteStore } from '../lib/store';
import Header from './Header';
import Tag from './Tag';

interface ArticleViewProps {
  slug: string;
}

export default function ArticleView({ slug }: ArticleViewProps) {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { posts, postsLoading, postsError, fetchPosts } = useSiteStore();

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
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h1>
          <p className="text-gray-600 mb-6">
            {error || 'The article you are looking for does not exist.'}
          </p>
          <Link
            href="/"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 transition-colors"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const author = post._embedded?.author?.[0];
  const terms = post._embedded?.['wp:term'] || [];
  const tags = terms
    .flat()
    .filter(term => term.taxonomy === 'post_tag') as WordPressTag[];

  console.log(post);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {post.jetpack_featured_media_url && (
        <div className="w-full">
          <img
            src={post.jetpack_featured_media_url}
            alt={post.title.rendered}
            className="w-full h-auto max-h-[75vh] object-cover"
          />
        </div>
      )}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <article>
          <header className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {tags.length > 0 && (
              <div className="flex justify-center items-center flex-wrap gap-2 mb-6">
                {tags.map(tag => (
                  <Tag key={tag.id} label={tag.name.toUpperCase()} />
                ))}
              </div>
            )}

            <div className="text-center text-sm text-gray-500">
              {author && <p className="font-medium">by {author.name}</p>}
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          <div
            className="prose prose-lg max-w-7xl mx-auto"
            dangerouslySetInnerHTML={{ __html: post.content.rendered }}
          />

          {author && author.description && (
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-base text-gray-600">{author.description}</p>
              </div>
            </footer>
          )}
        </article>

        {/* Related Articles Section */}
        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Related Articles
          </h2>
          <div className="bg-white p-6">
            <p className="text-gray-600 text-center">
              Related articles functionality coming soon...
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
