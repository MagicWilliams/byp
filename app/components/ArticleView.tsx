'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styles from '../styles/ArticleView.module.css';

import {
  fetchPost,
  WordPressPost,
  WordPressTag,
  fetchPostsByTags,
  fetchTagsByIds,
  WordPressUser,
} from '../lib/wordpress';
import Header from './Header';
import Tag from './Tag';
import RelatedArticles from './RelatedArticles';

interface ArticleViewProps {
  slug: string;
}

export default function ArticleView({ slug }: ArticleViewProps) {
  const [post, setPost] = useState<WordPressPost | null>(null);
  const [related, setRelated] = useState<WordPressPost[]>([]);
  const [tags, setTags] = useState<WordPressTag[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPost = async () => {
      try {
        setLoading(true);
        setError(null);
        const postData = await fetchPost(slug);
        setPost(postData);
        if (postData) {
          const tagIds = Array.isArray(postData.tags) ? postData.tags : [];
          if (tagIds.length > 0) {
            const [relatedPosts, tagList] = await Promise.all([
              fetchPostsByTags(tagIds, postData.id),
              fetchTagsByIds(tagIds),
            ]);
            setRelated(relatedPosts);
            setTags(tagList);
          } else {
            setRelated([]);
            setTags([]);
          }
        } else {
          setRelated([]);
          setTags([]);
        }
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

  const author =
    post && typeof post.author === 'object'
      ? (post.author as WordPressUser)
      : null;

  return (
    <div className="min-h-screen bg-white pb-1">
      <Header />

      {post.hero_media?.source === 'external' && post.hero_media_embed_html ? (
        <div className="w-full">
          <div className={styles.heroEmbed}>
            <div className={styles.heroEmbedRatio}>
              <div
                className={styles.heroEmbedContent}
                dangerouslySetInnerHTML={{
                  __html: post.hero_media_embed_html || '',
                }}
              />
            </div>
          </div>
        </div>
      ) : post.hero_media_url ? (
        <div className="w-full">
          <video
            src={post.hero_media_url}
            className="w-full h-auto max-h-[80vh] object-cover"
            controls
            playsInline
            preload="metadata"
          />
        </div>
      ) : post.jetpack_featured_media_url ? (
        <div className="w-full">
          <Image
            src={post.jetpack_featured_media_url}
            alt={post.title.rendered}
            className="w-full h-auto max-h-[80vh] object-cover"
            width={1000}
            height={1000}
          />
        </div>
      ) : null}

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 md:py-12 py-4">
        <article>
          <header className="text-center mb-12">
            <h1
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />

            {tags.length > 0 && (
              <div className="flex justify-center items-center flex-wrap gap-2 mb-6">
                {tags.map(tag => (
                  <Tag
                    key={tag.id}
                    label={tag.name.toUpperCase()}
                    slug={tag.slug}
                  />
                ))}
              </div>
            )}

            <div className="text-center text-md text-gray-500">
              {author && (
                <p style={{ fontFamily: 'Playfair', fontWeight: '100' }}>
                  by {author.name || 'Contributors'}
                </p>
              )}
              <time dateTime={post.date} style={{ fontFamily: 'Playfair' }}>
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            </div>
          </header>

          {author && author.description && (
            <footer className="mt-16 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-base text-gray-600">{author.description}</p>
              </div>
            </footer>
          )}

          <div className="w-full">
            <div
              className={
                styles.article +
                ' max-w-7xl mx-auto text-xl text-black border-b-0 article-content'
              }
              style={{ fontFamily: 'Playfair' }}
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            />
          </div>
        </article>
      </main>

      {/* Related Articles Section */}
      <div className="max-w-7xl mx-auto mb-16 px-4 sm:px-6 lg:px-8">
        <RelatedArticles articles={related} />
      </div>
    </div>
  );
}
