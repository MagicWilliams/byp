'use client';

import Image from 'next/image';
import Link from 'next/link';

interface BLEArticlePreviewProps {
  post: any;
  idx: number;
}

export default function BLEArticlePreview({
  post,
  idx,
}: BLEArticlePreviewProps) {
  // Helper to get a 25-word excerpt
  const getExcerpt = (html: string) => {
    const text = html.replace(/<[^>]+>/g, '');
    const words = text.split(/\s+/).slice(0, 25).join(' ');
    return words + (text.split(/\s+/).length > 25 ? '...' : '');
  };

  const authorName = post.author?.name || 'Unknown Author';
  const slug = post.post_name;

  return (
    <Link href={`/article/${slug}`} className="block group cursor-pointer">
      <div className="flex flex-row gap-4 items-start bg-white">
        {/* Index */}
        <div className="flex items-start pr-4 w-[1.5rem] justify-center">
          <span
            className="text-2xl text-black group-hover:text-gray-500 transition-colors"
            style={{ fontFamily: 'Gill Sans' }}
          >
            {idx + 1}.
          </span>
        </div>
        {/* Content Section: 2 columns */}
        <div className="flex-1 grid grid-cols-5 gap-4 items-start">
          {/* Left: Title, byline, excerpt */}
          <div className="col-span-3 flex flex-col justify-between">
            <div>
              <div
                className="text-xl text-black group-hover:text-gray-500 transition-colors"
                style={{ fontFamily: 'Gill Sans' }}
              >
                {post.post_title}
              </div>
              <div
                className="text-base text-black group-hover:text-gray-500 transition-colors"
                style={{ fontFamily: 'Gill Sans' }}
              >
                by {authorName}
              </div>
              {post.post_content && (
                <div
                  className="text-sm text-black group-hover:text-gray-500 transition-colors"
                  style={{ fontFamily: 'Playfair Display' }}
                >
                  {getExcerpt(post.post_content)}
                </div>
              )}
            </div>
          </div>
          {/* Right: 4:3 Image */}
          <div className="col-span-2 flex items-center justify-end relative">
            {post.jetpack_featured_media_url && (
              <div className="w-full aspect-[4/3] overflow-hidden flex items-start justify-start relative">
                <Image
                  src={post.jetpack_featured_media_url}
                  alt={post.post_title}
                  className="object-cover w-full h-full"
                  width={1000}
                  height={1000}
                />
                {/* White overlay on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-60 transition-opacity bg-white" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
