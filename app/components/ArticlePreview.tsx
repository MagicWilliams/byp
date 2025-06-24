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
    <div className="flex-shrink-0 w-80 w-full">
      <Link href={`/article/${post.slug}`}>
        <div className="flex flex-col rounded-lg shadow-lg overflow-hidden">
          {post.jetpack_featured_media_url && (
            <Image
              src={post.jetpack_featured_media_url}
              alt={post.title.rendered}
              className="w-full h-48 mb-2 object-cover"
              width={450}
              height={180}
            />
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
