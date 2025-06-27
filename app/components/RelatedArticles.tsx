import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost } from '../lib/wordpress';

interface RelatedArticlesProps {
  articles: WordPressPost[];
}

export default function RelatedArticles({ articles }: RelatedArticlesProps) {
  if (!articles || articles.length === 0) return null;
  return (
    <div className="h-full">
      <h2 className="text-2xl font-medium text-gray-900 mb-6 text-center">
        Related Articles
      </h2>
      <div className="flex flex-col md:flex-row gap-6 justify-center items-stretch h-full">
        {articles.map(article => (
          <Link
            key={article.id}
            href={`/article/${article.slug}`}
            className="flex-1 mx-auto group w-full"
          >
            {article.jetpack_featured_media_url && (
              <div className="w-full aspect-[4/3] relative mb-4">
                <Image
                  src={article.jetpack_featured_media_url}
                  alt={article.title.rendered}
                  fill
                  className="object-cover group-hover:opacity-75 transition-opacity duration-200"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-200 pointer-events-none" />
              </div>
            )}
            <div
              className="text-lg text-black group-hover:text-gray-600 transition-colors duration-200 text-left"
              style={{ fontFamily: 'Playfair Display' }}
              dangerouslySetInnerHTML={{ __html: article.title.rendered }}
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
