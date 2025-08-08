'use client';

import Image from 'next/image';
import Link from 'next/link';
import { WordPressUser, WordPressPost } from '../lib/wordpress';

interface AuthorBodyProps {
  author: WordPressUser;
  posts: WordPressPost[];
}

export default function AuthorBody({ author, posts }: AuthorBodyProps) {
  return (
    <div className="min-h-screen bg-[#111] w-full">
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#111] rounded-lg">
          <section className="mb-8 text-white flex flex-col gap-8">
            {/* Author Header */}
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              <div className="flex-shrink-0">
                {author.avatar_urls?.[96] ? (
                  <Image
                    src={author.avatar_urls[96]}
                    alt={author.name}
                    width={120}
                    height={120}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-30 h-30 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-2xl text-gray-400">
                      {author.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h1
                  className="text-3xl font-medium mb-4"
                  style={{ fontFamily: 'Playfair' }}
                >
                  {author.name}
                </h1>

                {author.description && (
                  <p
                    className="text-lg mb-6"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    {author.description}
                  </p>
                )}

                {/* Social Links */}
                {(author.twitter ||
                  author.instagram ||
                  author.linkedin ||
                  author.website) && (
                  <div className="flex gap-4 mb-6">
                    {author.twitter && (
                      <a
                        href={author.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-200 underline"
                      >
                        Twitter
                      </a>
                    )}
                    {author.instagram && (
                      <a
                        href={author.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-200 underline"
                      >
                        Instagram
                      </a>
                    )}
                    {author.linkedin && (
                      <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-200 underline"
                      >
                        LinkedIn
                      </a>
                    )}
                    {author.website && (
                      <a
                        href={author.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-300 hover:text-blue-200 underline"
                      >
                        Website
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Author's Posts */}
            <div className="mt-12">
              <h2
                className="text-2xl font-medium mb-6"
                style={{ fontFamily: 'Playfair' }}
              >
                Recent Posts by {author.name}
              </h2>

              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-lg">No posts found for this author.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {posts.map(post => (
                    <article
                      key={post.id}
                      className="bg-gray-800 rounded-lg p-6"
                    >
                      {post.jetpack_featured_media_url && (
                        <div className="mb-4">
                          <Image
                            src={post.jetpack_featured_media_url}
                            alt={post.title.rendered}
                            width={400}
                            height={250}
                            className="w-full h-48 object-cover rounded"
                          />
                        </div>
                      )}

                      <h3
                        className="text-xl font-medium mb-2"
                        style={{ fontFamily: 'Playfair' }}
                      >
                        <Link
                          href={`/article/${post.slug}`}
                          className="text-white hover:text-blue-300 transition-colors"
                        >
                          {post.title.rendered}
                        </Link>
                      </h3>

                      {post.excerpt?.rendered && (
                        <div
                          className="text-gray-300 mb-4"
                          style={{ fontFamily: 'Playfair' }}
                          dangerouslySetInnerHTML={{
                            __html: post.excerpt.rendered,
                          }}
                        />
                      )}

                      <div className="text-sm text-gray-400">
                        {new Date(post.date).toLocaleDateString()}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
