import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ArticlePreview from '../components/ArticlePreview';
import {
  fetchTagBySlug,
  fetchPostsByTagSlug,
  fetchPostsSearch,
  fetchPostsSearchWithTag,
  WordPressPost,
  WordPressTag,
} from '../lib/wordpress';

const PER_PAGE = 12;

interface SearchPageProps {
  searchParams: Promise<{ q?: string; tag?: string; page?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps) {
  const { q, tag } = await searchParams;
  if (tag && !q) {
    const t = await fetchTagBySlug(tag);
    const title = t ? `Tag: ${t.name}` : 'Search';
    return { title: `${title} | Black Youth Project` };
  }
  if (q) {
    return {
      title: `Search: ${q} | Black Youth Project`,
      description: `Articles matching "${q}"`,
    };
  }
  return { title: 'Search | Black Youth Project' };
}

function buildSearchUrl(params: { q?: string; tag?: string; page?: number }) {
  return `/search?${new URLSearchParams({
    ...(params.q && { q: params.q }),
    ...(params.tag && { tag: params.tag }),
    ...(params.page && params.page > 1 && { page: String(params.page) }),
  }).toString()}`;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q, tag, page } = await searchParams;
  const pageNum = Math.max(1, parseInt(String(page), 10) || 1);
  const qTrim = q?.trim();
  const tagTrim = tag?.trim();

  let posts: WordPressPost[] = [];
  let total = 0;
  let tagInfo: WordPressTag | null = null;
  let tagNotFound = false;

  if (tagTrim) {
    tagInfo = await fetchTagBySlug(tagTrim);
    if (!tagInfo) {
      tagNotFound = true;
    }
  }

  if (tagNotFound) {
    posts = [];
    total = 0;
  } else if (tagTrim && qTrim) {
    const result = await fetchPostsSearchWithTag(tagTrim, qTrim, {
      per_page: PER_PAGE,
      page: pageNum,
    });
    posts = result.posts;
    total = result.total;
  } else if (tagTrim && tagInfo) {
    const result = await fetchPostsByTagSlug(tagTrim, {
      per_page: PER_PAGE,
      page: pageNum,
    });
    posts = result.posts;
    total = result.total;
  } else if (qTrim) {
    const result = await fetchPostsSearch(qTrim, {
      per_page: PER_PAGE,
      page: pageNum,
    });
    posts = result.posts;
    total = result.total;
  }

  const hasQuery = Boolean(qTrim || tagTrim);
  const isEmpty = hasQuery && posts.length === 0;
  const showResults = hasQuery && !tagNotFound && posts.length > 0;

  const totalPages = Math.ceil(total / PER_PAGE);
  const nextPage = pageNum < totalPages ? pageNum + 1 : null;
  const prevPage = pageNum > 1 ? pageNum - 1 : null;

  const displayTerm = qTrim || tagInfo?.name || tagTrim || '';

  return (
    <div className="min-h-screen w-full bg-black">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1
          className="text-3xl font-bold text-white mb-8"
          style={{ fontFamily: 'Playfair' }}
        >
          {hasQuery
            ? `${total} Search result${total !== 1 ? 's' : ''} for "${displayTerm}"`
            : 'Search'}
        </h1>

        <form
          method="get"
          action="/search"
          className="mb-12 w-full"
        >
          {tagTrim && (
            <input type="hidden" name="tag" value={tagTrim} />
          )}
          <label htmlFor="search-q" className="sr-only">
            Search articles
          </label>
          <div className="flex w-full border-b border-white/30 focus-within:border-white/60 transition-colors">
            <input
              id="search-q"
              type="search"
              name="q"
              defaultValue={qTrim ?? ''}
              placeholder="Search by title or content..."
              className="w-full bg-transparent text-white placeholder-white/50 text-lg md:text-xl py-4 outline-none border-0"
              style={{ fontFamily: 'Gill Sans' }}
            />
            <button
              type="submit"
              className="text-white/80 hover:text-white p-2 transition-colors shrink-0"
              aria-label="Search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>

        {tagNotFound && (
          <div
            className="rounded-lg border border-white/20 bg-white/5 text-white px-4 py-6 text-center"
            style={{ fontFamily: 'Playfair' }}
          >
            <p className="text-lg">
              No tag found for &ldquo;{tagTrim}&rdquo;. Try a different tag or search by text above.
            </p>
            <Link
              href="/search"
              className="mt-4 inline-block text-white hover:underline font-medium"
            >
              Clear and search again
            </Link>
          </div>
        )}

        {!hasQuery && (
          <div
            className="rounded-lg border border-white/20 bg-white/5 text-white/80 px-4 py-8 text-center"
            style={{ fontFamily: 'Playfair' }}
          >
            <p className="text-lg">
              Enter a search term above or click a tag on any article to see results.
            </p>
          </div>
        )}

        {isEmpty && !tagNotFound && (
          <div
            className="rounded-lg border border-white/20 bg-white/5 text-white/80 px-4 py-8 text-center"
            style={{ fontFamily: 'Playfair' }}
          >
            <p className="text-lg">
              No articles found for {tagTrim && qTrim ? 'this tag and search' : tagTrim ? 'this tag' : 'your search'}.
              Try a different search or tag.
            </p>
          </div>
        )}

        {showResults && (
          <>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 list-none p-0 m-0">
              {posts.map((post) => (
                <li key={post.id}>
                  <ArticlePreview post={post} darkBg />
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <nav
                className="mt-12 flex justify-center items-center gap-2 flex-wrap"
                aria-label="Search results pagination"
              >
                {prevPage !== null && (
                  <Link
                    href={buildSearchUrl({ q: qTrim ?? undefined, tag: tagTrim ?? undefined, page: prevPage })}
                    className="text-white hover:text-white/80 px-3 py-1 text-sm transition-colors"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Previous
                  </Link>
                )}
                <span className="flex items-center gap-1 mx-4">
                  {(() => {
                    const items: (number | 'ellipsis')[] = [];
                    if (totalPages <= 7) {
                      for (let i = 1; i <= totalPages; i++) items.push(i);
                    } else {
                      items.push(1);
                      if (pageNum > 3) items.push('ellipsis');
                      const start = Math.max(2, pageNum - 1);
                      const end = Math.min(totalPages - 1, pageNum + 1);
                      for (let i = start; i <= end; i++) items.push(i);
                      if (pageNum < totalPages - 2) items.push('ellipsis');
                      if (totalPages > 1) items.push(totalPages);
                    }
                    return items.map((n, idx) =>
                      n === 'ellipsis' ? (
                        <span key={`e-${idx}`} className="text-white/50 px-1" aria-hidden>…</span>
                      ) : n === pageNum ? (
                        <span
                          key={n}
                          className="w-8 h-8 flex items-center justify-center text-black bg-white text-sm font-medium"
                          style={{ fontFamily: 'Gill Sans' }}
                        >
                          {n}
                        </span>
                      ) : (
                        <Link
                          key={n}
                          href={buildSearchUrl({ q: qTrim ?? undefined, tag: tagTrim ?? undefined, page: n })}
                          className="w-8 h-8 flex items-center justify-center text-white hover:text-white/80 text-sm transition-colors"
                          style={{ fontFamily: 'Gill Sans' }}
                        >
                          {n}
                        </Link>
                      )
                    );
                  })()}
                </span>
                {nextPage !== null && (
                  <Link
                    href={buildSearchUrl({ q: qTrim ?? undefined, tag: tagTrim ?? undefined, page: nextPage })}
                    className="text-white hover:text-white/80 px-3 py-1 text-sm transition-colors"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Next
                  </Link>
                )}
              </nav>
            )}
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
