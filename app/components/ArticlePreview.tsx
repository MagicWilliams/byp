import Link from 'next/link';
import Image from 'next/image';

export interface ArticlePreviewProps {
  post: {
    id: number;
    slug: string;
    jetpack_featured_media_url?: string;
    title: {
      rendered: string;
    };
    excerpt: {
      rendered: string;
    };
  };
  isBle?: boolean;
}

export default function ArticlePreview({
  post,
  isBle = false,
}: ArticlePreviewProps) {
  const excerptColor = isBle ? 'text-gray-700' : 'text-[#ddd]';
  const titleColor = isBle ? 'text-black' : 'text-white';

  return (
    <div className="flex-shrink-0 w-80 w-full group">
      <Link
        href={`/article/${post.slug}`}
        className="transition-opacity duration-200 hover:opacity-80"
      >
        <div className="flex flex-col overflow-hidden">
          {post.jetpack_featured_media_url && (
            <div className="relative w-full aspect-[16/9] mb-2">
              <Image
                src={post.jetpack_featured_media_url}
                alt={post.title.rendered}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200"></div>
            </div>
          )}
          <div className="">
            <h3
              className={`font-medium text-xl my-2 ${titleColor}`}
              style={{ fontFamily: 'Gill Sans' }}
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
              className={`text-md ${excerptColor}`}
              style={{ fontFamily: 'Playfair' }}
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
