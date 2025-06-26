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
}

export default function ArticlePreview({ post }: ArticlePreviewProps) {
  return (
    <div className="flex-shrink-0 w-80 w-full max-w-sm">
      <Link href={`/article/${post.slug}`}>
        <div className="flex flex-col overflow-hidden">
          {post.jetpack_featured_media_url && (
            <div className="relative w-full aspect-[4/3] mb-2">
              <Image
                src={post.jetpack_featured_media_url}
                alt={post.title.rendered}
                className="object-cover"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          )}
          <div className="">
            <h3
              className="font-medium text-xl mb-2"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <div
              className="text-[#ddd] text-md"
              style={{ fontFamily: 'Playfair' }}
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
          </div>
        </div>
      </Link>
    </div>
  );
}
