import Link from 'next/link';
import Image from 'next/image';

export interface FeaturedPostProps {
  featuredPost?: {
    slug: string;
    jetpack_featured_media_url?: string;
    title: {
      rendered: string;
    };
    date: string;
    excerpt: {
      rendered: string;
    };
    _embedded?: {
      author?: Array<{
        name: string;
      }>;
    };
  };
  loading?: boolean;
}

// Skeleton component for featured post
function FeaturedPostSkeleton() {
  return (
    <section className="relative text-white overflow-hidden">
      <div className="relative h-[50vh] md:h-[75vh] m-4 md:m-8">
        {/* Image skeleton */}
        <div className="w-full h-full bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded-md"></div>
      </div>

      <div className="relative z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid md:grid-cols-1 gap-8 items-center w-full">
            <div>
              {/* Date skeleton */}
              <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded mb-4 w-48"></div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2 mb-8">
                {/* Featured Article label - keep this visible */}
                <p
                  className="font-gillsans text-lg font-bold text-[#EEB03E]"
                  style={{ fontFamily: 'Gill Sans' }}
                >
                  Featured Article
                </p>
                {/* Author skeleton */}
                <div className="h-5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded w-32"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Title skeleton */}
                <div className="space-y-4">
                  <div className="h-12 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded"></div>
                  <div className="h-8 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded w-3/4"></div>
                  <div className="h-6 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded w-1/2"></div>
                </div>
                {/* Excerpt skeleton */}
                <div className="space-y-3 sm:text-right">
                  <div className="h-5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded"></div>
                  <div className="h-5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded w-5/6 ml-auto"></div>
                  <div className="h-5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded w-4/5 ml-auto"></div>
                  <div className="h-5 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse rounded w-3/4 ml-auto"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function FeaturedPost({
  featuredPost,
  loading = false,
}: FeaturedPostProps) {
  if (loading || !featuredPost) {
    return <FeaturedPostSkeleton />;
  }

  const author = featuredPost._embedded?.author?.[0] || {
    name: 'Example Author (HC)',
  };

  return (
    <section className="relative text-white overflow-hidden">
      <Link href={`/article/${featuredPost.slug}`} className="block h-full">
        <div className="relative h-[50vh] md:h-[75vh] m-4 md:m-8">
          {featuredPost.jetpack_featured_media_url && (
            <>
              <Image
                src={featuredPost.jetpack_featured_media_url}
                alt={featuredPost.title.rendered}
                fill
                className="object-cover"
              />
            </>
          )}
        </div>
      </Link>

      <div className="relative z-10">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div className="grid md:grid-cols-1 gap-8 items-center w-full">
            {/* Left Column */}
            <div>
              <p
                className="font-gillsans uppercase"
                style={{ fontFamily: 'Gill Sans' }}
              >
                {new Date(featuredPost.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 sm:gap-2">
                <p
                  className="font-gillsans text-lg font-bold text-[#EEB03E]"
                  style={{ fontFamily: 'Gill Sans' }}
                >
                  Featured Article
                </p>
                {author && (
                  <p
                    className="text-md italic mb-4"
                    style={{ fontFamily: 'Playfair Display' }}
                  >
                    by {author.name || 'Contributors'}
                  </p>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <h3
                  className="text-4xl md:text-5xl font-black mt-2 w-full"
                  style={{ fontFamily: 'Playfair Display' }}
                  dangerouslySetInnerHTML={{
                    __html: featuredPost.title.rendered,
                  }}
                />
                <div
                  className="text-lg sm:text-right"
                  style={{ fontFamily: 'Playfair' }}
                  dangerouslySetInnerHTML={{
                    __html: featuredPost.excerpt.rendered,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
