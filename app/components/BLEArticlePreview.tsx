'use client';

import Image from 'next/image';
import Link from 'next/link';
import { BLEAssociatedPost } from '../lib/wordpress';

export type ArticleSize = 'cover' | 'featured' | 'standard' | 'compact';

interface BLEArticlePreviewProps {
  post: BLEAssociatedPost;
  idx: number;
  size: ArticleSize;
}

const colSpanClasses: Record<ArticleSize, string> = {
  cover: 'md:col-span-12',
  featured: 'md:col-span-6',
  standard: 'md:col-span-4',
  compact: 'md:col-span-3',
};

export default function BLEArticlePreview({
  post,
  idx,
  size,
}: BLEArticlePreviewProps) {
  // Helper to get excerpt by word count
  const getExcerpt = (html: string, maxWords = 25) => {
    const text = html.replace(/<[^>]+>/g, '');
    const words = text.split(/\s+/).slice(0, maxWords).join(' ');
    return words + (text.split(/\s+/).length > maxWords ? '...' : '');
  };

  const authorName = post.author?.name || 'Unknown Author';
  const slug = post.post_name;

  if (size === 'cover') {
    return (
      <Link
        href={`/article/${slug}`}
        className={`block group cursor-pointer ${colSpanClasses.cover}`}
      >
        <div className="flex flex-col overflow-hidden">
          <span
            className="text-xs uppercase tracking-[0.2em] text-gray-500 mb-2"
            style={{ fontFamily: 'Gill Sans' }}
          >
            Cover Story
          </span>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-start">
            {post.jetpack_featured_media_url && (
              <div className="relative w-full aspect-[16/10] lg:aspect-[4/3] overflow-hidden order-2 lg:order-1">
                <Image
                  src={post.jetpack_featured_media_url}
                  alt={post.post_title}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                  width={1200}
                  height={900}
                />
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity bg-white" />
              </div>
            )}
            <div className="flex flex-col justify-center order-1 lg:order-2">
              <span
                className="text-3xl md:text-4xl text-black group-hover:text-gray-600 transition-colors"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {idx + 1}.
              </span>
              <h3
                className="text-2xl md:text-3xl font-bold text-black group-hover:text-gray-600 transition-colors mt-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {post.post_title}
              </h3>
              <div
                className="text-base text-black group-hover:text-gray-600 transition-colors mt-1"
                style={{ fontFamily: 'Gill Sans' }}
              >
                by {authorName}
              </div>
              {post.post_content && (
                <p
                  className="text-lg text-black group-hover:text-gray-600 transition-colors mt-4"
                  style={{ fontFamily: 'Playfair Display' }}
                >
                  {getExcerpt(post.post_content, 40)}
                </p>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Featured, standard, compact: vertical card layout (image on top)
  const excerptWords = size === 'featured' ? 30 : size === 'standard' ? 20 : 12;
  const titleSize =
    size === 'featured'
      ? 'text-xl md:text-2xl'
      : size === 'standard'
        ? 'text-lg md:text-xl'
        : 'text-base md:text-lg';

  return (
    <Link
      href={`/article/${slug}`}
      className={`block group cursor-pointer ${colSpanClasses[size]}`}
    >
      <div className="flex flex-col h-full overflow-hidden">
        {/* Image on top */}
        {post.jetpack_featured_media_url && (
          <div
            className={`relative w-full overflow-hidden ${
              size === 'featured'
                ? 'aspect-[16/10]'
                : size === 'standard'
                  ? 'aspect-[4/3]'
                  : 'aspect-square'
            }`}
          >
            <Image
              src={post.jetpack_featured_media_url}
              alt={post.post_title}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
              width={800}
              height={600}
            />
            <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity bg-white" />
          </div>
        )}
        {/* Content below */}
        <div className="flex flex-col flex-1 pt-4">
          <span
            className={`text-black group-hover:text-gray-500 transition-colors ${
              size === 'compact' ? 'text-lg' : 'text-2xl'
            }`}
            style={{ fontFamily: 'Gill Sans' }}
          >
            {idx + 1}.
          </span>
          <h3
            className={`${titleSize} font-medium text-black group-hover:text-gray-600 transition-colors mt-1`}
            style={{ fontFamily: 'Gill Sans', fontWeight: 500 }}
          >
            {post.post_title}
          </h3>
          <div
            className={`text-black group-hover:text-gray-600 transition-colors ${
              size === 'compact' ? 'text-sm' : 'text-base'
            }`}
            style={{ fontFamily: 'Gill Sans' }}
          >
            by {authorName}
          </div>
          {post.post_content && (
            <p
              className="text-black group-hover:text-gray-600 transition-colors mt-2 text-sm"
              style={{ fontFamily: 'Playfair Display' }}
            >
              {getExcerpt(post.post_content, excerptWords)}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
