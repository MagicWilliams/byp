// WordPress API integration stubs
// These functions will be implemented to fetch data from WordPress REST API

export interface WordPressUser {
  id: number;
  name: string;
  username: string;
  description: string;
  avatar_urls?: {
    24?: string;
    48?: string;
    96?: string;
  };
  url?: string;
  link?: string;
  slug?: string;
  // Social media fields (if available via ACF or custom fields)
  twitter?: string;
  instagram?: string;
  linkedin?: string;
  website?: string;
}

export interface WordPressPost {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  date: string;
  modified: string;
  slug: string;
  // WordPress core returns a numeric author ID unless expanded.
  author: number | WordPressUser;
  featured_media: number;
  categories: number[];
  tags: number[];
  jetpack_featured_media_url?: string;
  _embedded?: {
    author: {
      name: string;
      id: number;
      description: string;
    }[];
    'wp:term': (WordPressCategory[] | WordPressTag[])[];
  };
  // New hero media fields
  hero_media?: {
    source?: string | null;
    id?: number | null;
    url?: string | null;
    external_url?: string | null;
    embed_html?: string | null;
  } | null;
  // Top-level fallbacks from REST for convenience
  hero_media_url?: string | null;
  hero_media_embed_html?: string | null;
  hero_media_external_url?: string | null;
  post_name: string;
  post_title: string;
  post_excerpt: string;
  post_content: string;
  post_date: string;
  post_modified: string;
  post_author: number;
  post_parent: number;
  post_type: string;
}

export interface WordPressPage {
  id: number;
  title: {
    rendered: string;
  };
  content: {
    rendered: string;
  };
  slug: string;
  date: string;
  modified: string;
  acf?: Record<string, unknown>;
}

// ACF types for static pages (Contact, About, Submissions, Get Involved)

export interface ContactPageACF {
  page_title?: string;
  get_in_touch_heading?: string;
  get_in_touch_text?: string;
  contact_email?: string;
  contact_info_heading?: string;
  address_lines?: string | string[];
  faq_items?: Array<{ question?: string; answer?: string }>;
}

export interface AboutTeamMember {
  name?: string;
  bio?: string;
  image?: { url?: string; id?: number } | string;
}

export interface AboutHistorySection {
  title?: string;
  content?: string;
}

export interface AboutPageACF {
  hero_title?: string;
  hero_subtitle?: string;
  main_content?: string;
  hero_image?: { url?: string; id?: number } | string;
  team_members?: AboutTeamMember[];
  history_sections?: AboutHistorySection[];
  history_cta_text?: string;
  history_cta_url?: string;
}

export interface SubmissionsContentType {
  type_name?: string;
  description?: string;
}

export interface SubmissionsProcessStep {
  step_number?: number;
  title?: string;
  description?: string;
}

export interface SubmissionsPageACF {
  page_title?: string;
  guidelines_heading?: string;
  guidelines_text?: string;
  content_types?: SubmissionsContentType[];
  requirements?: string | string[];
  process_steps?: SubmissionsProcessStep[];
  contact_heading?: string;
  contact_email?: string;
  contact_text?: string;
}

export interface GetInvolvedPageACF {
  page_title?: string;
  hero_image?: { url?: string; id?: number } | string;
  intro_heading?: string;
  intro_text?: string;
  pitch_heading?: string;
  pitch_text?: string;
  pitch_email?: string;
  republish_heading?: string;
  republish_text?: string;
  republish_email?: string;
  submissions_link?: string;
}

export interface WordPressCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  taxonomy: 'category';
}

export interface WordPressTag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  taxonomy: 'post_tag';
}

/** BLE tag slugs and category slug used to identify Black Life Everywhere content */
const BLE_TAG_SLUGS = ['ble', 'black-life-everywhere'];
const BLE_CATEGORY_SLUG = 'blacklifeeverywhere';

/**
 * Returns true if the post is tagged with BLE or Black Life Everywhere (tag or category).
 * Used to exclude these posts from the main homepage.
 */
export function isBLEPost(
  post: WordPressPost,
  context?: {
    categories?: WordPressCategory[];
    tags?: WordPressTag[];
  }
): boolean {
  // Prefer embedded terms from API (_embed=true)
  const embedded = post._embedded?.['wp:term'];
  if (Array.isArray(embedded)) {
    const terms = embedded.flat() as Array<{ slug?: string; taxonomy?: string }>;
    const hasBLETag = terms.some(
      t => t.taxonomy === 'post_tag' && t.slug && BLE_TAG_SLUGS.includes(t.slug)
    );
    const hasBLECategory = terms.some(
      t =>
        t.taxonomy === 'category' &&
        t.slug === BLE_CATEGORY_SLUG
    );
    if (hasBLETag || hasBLECategory) return true;
  }

  // Fallback: use store categories/tags to resolve IDs
  if (context?.categories) {
    const bleCategory = context.categories.find(
      c => c.slug === BLE_CATEGORY_SLUG
    );
    if (bleCategory && post.categories?.includes(bleCategory.id)) return true;
  }
  if (context?.tags) {
    const bleTagIds = context.tags
      .filter(t => t.slug && BLE_TAG_SLUGS.includes(t.slug))
      .map(t => t.id);
    if (bleTagIds.length && post.tags?.some(id => bleTagIds.includes(id)))
      return true;
  }

  return false;
}

// New types for BLE Issue with associated posts
export interface BLEAssociatedPost {
  ID: number;
  post_title: string;
  post_excerpt: string;
  post_content: string;
  post_date: string;
  post_modified: string;
  post_name: string;
  guid: string;
  jetpack_featured_media_url: string;
  author: WordPressUser | null;
}

export interface PageResults {
  per_page?: number;
  page?: number;
  _embed?: boolean;
}

export interface PostsWithTotal {
  posts: WordPressPost[];
  total: number;
}

export interface BLEIssue {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  modified: string;
  featured_media: number;
  featured_image_url: string | null;
  /** Caption from the featured image in WordPress Media Library. */
  featured_image_caption: string | null;
  acf: {
    associated_posts: BLEAssociatedPost[];
    gradientstart: string;
    gradientend: string;
    /** When true, use white text in the "About this issue" section (for dark gradient backgrounds). */
    invert_text?: boolean;
  };
}

// WordPress API configuration
const WORDPRESS_API_URL =
  process.env.WP_API_URL || 'https://wp.blackyouthproject.com/wp-json/wp/v2';

const getAuthHeader = () => {
  const username = process.env.WP_USER;
  const password = process.env.NEW_WP_APP_PW;
  if (!username || !password) {
    throw new Error(
      'Missing WP_USER or WP_APP_PASSWORD in environment variables'
    );
  }
  const encoded = Buffer.from(`${username}:${password}`).toString('base64');
  return `Basic ${encoded}`;
};

/**
 * Fetch all BLE issues with associated posts from the WordPress REST API
 * @returns Promise<BLEIssue[]>
 */
export async function fetchBlackLifeEverywhereIssues(): Promise<BLEIssue[]> {
  try {
    const timestamp = Date.now();
    const response = await fetch(
      `${WORDPRESS_API_URL}/issue?acf_format=standard&_t=${timestamp}`,
      {
        next: { revalidate: 60 }, // Cache for 1 minute
      }
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const issues: BLEIssue[] = await response.json();
    const issuesWithImages = await Promise.all(
      issues.map(async issue => {
        let featured_image_url: string | null = null;
        let featured_image_caption: string | null = null;
        if (issue.featured_media) {
          const details = await getFeaturedImageDetails(issue.featured_media);
          if (details) {
            featured_image_url = details.url;
            featured_image_caption = details.caption;
          }
        }
        if (issue.acf && Array.isArray(issue.acf.associated_posts)) {
          issue.acf.associated_posts = await Promise.all(
            issue.acf.associated_posts.map(async (post: BLEAssociatedPost) => {
              try {
                const wpPostRes = await fetch(
                  `${WORDPRESS_API_URL}/posts/${post.ID}?_embed=author`,
                  {
                    next: { revalidate: 300 }, // Cache for 5 minutes
                  }
                );
                if (!wpPostRes.ok)
                  throw new Error(
                    `Post ${(post.ID, post.post_title)} fetch failed: ${
                      wpPostRes.status
                    }`
                  );
                const wpPost = await wpPostRes.json();
                let authorDetails: WordPressUser | null = null;

                // Prefer PublishPress Multi-Authors (ppma_author) - authors are in wpPost.authors
                const ppmaAuthors = wpPost.authors;
                if (
                  Array.isArray(ppmaAuthors) &&
                  ppmaAuthors.length > 0 &&
                  ppmaAuthors[0]?.display_name
                ) {
                  const a = ppmaAuthors[0];
                  authorDetails = {
                    id: a.user_id ?? 0,
                    name: a.display_name,
                    username: a.slug ?? '',
                    description: a.description ?? '',
                    avatar_urls: a.avatar_url
                      ? { 96: a.avatar_url }
                      : undefined,
                  };
                }

                // Fallback: standard _embedded.author (often blocked by Wordfence)
                if (!authorDetails) {
                  const embedded =
                    wpPost._embedded?.author?.[0] ?? null;
                  const isErrorObject =
                    embedded &&
                    typeof embedded === 'object' &&
                    'code' in embedded;
                  if (!isErrorObject && embedded?.name) {
                    authorDetails = embedded as WordPressUser;
                  }
                }

                // Last resort: try authenticated users API (may also 404)
                if (!authorDetails) {
                  const authorId =
                    wpPost.author ?? wpPost.post_author;
                  if (authorId) {
                    try {
                      const authorRes = await fetch(
                        `${WORDPRESS_API_URL}/users/${authorId}`,
                        {
                          headers: {
                            Authorization: getAuthHeader(),
                          },
                          next: { revalidate: 300 },
                        }
                      );
                      if (authorRes.ok) {
                        authorDetails = await authorRes.json();
                      }
                    } catch {
                      /* ignore */
                    }
                  }
                }
                return {
                  ...post,
                  jetpack_featured_media_url:
                    wpPost.jetpack_featured_media_url || null,
                  author: authorDetails,
                };
              } catch (err) {
                console.error('Error fetching associated post or author:', err);
                return {
                  ...post,
                  jetpack_featured_media_url: null,
                  author: null,
                };
              }
            })
          );
        }
        return {
          ...issue,
          featured_image_url,
          featured_image_caption,
        };
      })
    );
    return issuesWithImages;
  } catch (error) {
    console.error('Error fetching BLE issues:', error);
    return [];
  }
}

// (The rest of your file, including fetchPosts, fetchPost, fetchPages, etc., stays unchanged from your original input. You can paste it below if you'd like me to refactor those too.)

export async function getFeaturedImageUrl(
  mediaId: number
): Promise<string | null> {
  const details = await getFeaturedImageDetails(mediaId);
  return details?.url ?? null;
}

/**
 * Fetch featured image URL and caption from WordPress media.
 * Used for BLE issue hero images where the caption is displayed.
 */
export async function getFeaturedImageDetails(
  mediaId: number
): Promise<{ url: string; caption: string | null } | null> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/media/${mediaId}`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(
        `HTTP error! status: ${response.status}, mediaId: ${mediaId}`
      );
    }

    const media = await response.json();
    const url = media.source_url || null;
    if (!url) return null;

    // caption.rendered is HTML; caption.raw is plain (edit context). Strip HTML for display.
    const captionObj = media.caption;
    let caption: string | null = null;
    if (captionObj) {
      const raw = captionObj.raw;
      const rendered = captionObj.rendered;
      if (typeof raw === 'string' && raw.trim()) {
        caption = raw.trim();
      } else if (typeof rendered === 'string' && rendered.trim()) {
        caption = rendered.replace(/<[^>]+>/g, '').trim();
      }
    }

    return { url, caption };
  } catch (error) {
    console.error('Error fetching featured image:', error);
    return null;
  }
}

/**
 * Fetch tags from WordPress API
 * @returns Promise<WordPressTag[]>
 */
export async function fetchTags(): Promise<WordPressTag[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/tags`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}

/**
 * Fetch tags by their numeric IDs
 */
export async function fetchTagsByIds(ids: number[]): Promise<WordPressTag[]> {
  if (!ids || ids.length === 0) return [];
  try {
    const params = new URLSearchParams({
      include: ids.join(','),
      per_page: String(ids.length),
      _fields: 'id,name,slug,description,count,taxonomy',
    });
    const response = await fetch(
      `${WORDPRESS_API_URL}/tags?${params.toString()}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Error fetching tags by IDs:', error);
    return [];
  }
}

/**
 * Fetch a single tag by slug from WordPress API
 * @param slug - Tag slug (e.g. "justice")
 * @returns Promise<WordPressTag | null>
 */
export async function fetchTagBySlug(slug: string): Promise<WordPressTag | null> {
  if (!slug?.trim()) return null;
  try {
    const params = new URLSearchParams({
      slug: slug.trim(),
      per_page: '1',
      _fields: 'id,name,slug,description,count,taxonomy',
    });
    const response = await fetch(
      `${WORDPRESS_API_URL}/tags?${params.toString()}`,
      { next: { revalidate: 300 } }
    );
    if (!response.ok) return null;
    const list = await response.json();
    return Array.isArray(list) && list.length > 0 ? (list[0] as WordPressTag) : null;
  } catch (error) {
    console.error('Error fetching tag by slug:', error);
    return null;
  }
}

/**
 * Fetch posts that have a given tag (by slug)
 */
export async function fetchPostsByTagSlug(
  slug: string,
  params: { per_page?: number; page?: number } = {}
): Promise<PostsWithTotal> {
  const tag = await fetchTagBySlug(slug);
  if (!tag) return { posts: [], total: 0 };
  const { per_page = 12, page = 1 } = params;
  const searchParams = new URLSearchParams({
    tags: String(tag.id),
    per_page: String(per_page),
    page: String(page),
    orderby: 'date',
    order: 'desc',
    _fields: [
      'id',
      'slug',
      'title.rendered',
      'excerpt.rendered',
      'date',
      'jetpack_featured_media_url',
      'author',
      'categories',
      'tags',
      'hero_media',
      'hero_media_url',
      'hero_media_embed_html',
      'hero_media_external_url',
    ].join(','),
  });
  const res = await fetch(`${WORDPRESS_API_URL}/posts?${searchParams.toString()}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return { posts: [], total: 0 };
  const posts = await res.json();
  const total = parseInt(res.headers.get('X-WP-Total') ?? '0', 10) || posts.length;
  return { posts, total };
}

/**
 * Search posts by text (title, content, excerpt) via WordPress REST API
 */
export async function fetchPostsSearch(
  query: string,
  params: { per_page?: number; page?: number } = {}
): Promise<PostsWithTotal> {
  if (!query?.trim()) return { posts: [], total: 0 };
  const { per_page = 12, page = 1 } = params;
  const searchParams = new URLSearchParams({
    search: query.trim(),
    per_page: String(per_page),
    page: String(page),
    orderby: 'relevance',
    _fields: [
      'id',
      'slug',
      'title.rendered',
      'excerpt.rendered',
      'date',
      'jetpack_featured_media_url',
      'author',
      'categories',
      'tags',
      'hero_media',
      'hero_media_url',
      'hero_media_embed_html',
      'hero_media_external_url',
    ].join(','),
  });
  const res = await fetch(`${WORDPRESS_API_URL}/posts?${searchParams.toString()}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return { posts: [], total: 0 };
  const posts = await res.json();
  const total = parseInt(res.headers.get('X-WP-Total') ?? '0', 10) || posts.length;
  return { posts, total };
}

/**
 * Fetch posts that match both a tag (by slug) and a text search
 */
export async function fetchPostsSearchWithTag(
  tagSlug: string,
  query: string,
  params: { per_page?: number; page?: number } = {}
): Promise<PostsWithTotal> {
  const tag = await fetchTagBySlug(tagSlug);
  if (!tag || !query?.trim()) return { posts: [], total: 0 };
  const { per_page = 12, page = 1 } = params;
  const searchParams = new URLSearchParams({
    tags: String(tag.id),
    search: query.trim(),
    per_page: String(per_page),
    page: String(page),
    orderby: 'relevance',
    _fields: [
      'id',
      'slug',
      'title.rendered',
      'excerpt.rendered',
      'date',
      'jetpack_featured_media_url',
      'author',
      'categories',
      'tags',
      'hero_media',
      'hero_media_url',
      'hero_media_embed_html',
      'hero_media_external_url',
    ].join(','),
  });
  const res = await fetch(`${WORDPRESS_API_URL}/posts?${searchParams.toString()}`, {
    next: { revalidate: 300 },
  });
  if (!res.ok) return { posts: [], total: 0 };
  const posts = await res.json();
  const total = parseInt(res.headers.get('X-WP-Total') ?? '0', 10) || posts.length;
  return { posts, total };
}

/**
 * Fetch categories from WordPress API
 * @returns Promise<WordPressCategory[]>
 */
export async function fetchCategories(): Promise<WordPressCategory[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch pages from WordPress API
 * @param params - Query parameters for pages
 * @returns Promise<WordPressPage[]>
 */
export async function fetchPages(
  params: {
    per_page?: number;
    page?: number;
    search?: string;
  } = {}
): Promise<WordPressPage[]> {
  try {
    const searchParams = new URLSearchParams();

    if (params.per_page)
      searchParams.append('per_page', params.per_page.toString());
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.search) searchParams.append('search', params.search);

    const response = await fetch(
      `${WORDPRESS_API_URL}/pages?${searchParams.toString()}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching pages:', error);
    return [];
  }
}

/**
 * Fetch a single page by slug from WordPress API (with ACF support)
 * @param slug - Page slug (e.g. "contact", "about", "submissions", "get-involved")
 * @param options - Optional fetch options (acf_format for ACF fields)
 * @returns Promise<WordPressPage | null>
 */
export async function fetchPageBySlug(
  slug: string,
  options?: { acf_format?: 'standard' }
): Promise<WordPressPage | null> {
  if (!slug?.trim()) return null;
  try {
    const searchParams = new URLSearchParams({
      slug: slug.trim(),
      per_page: '1',
    });
    if (options?.acf_format === 'standard') {
      searchParams.append('acf_format', 'standard');
    }
    const response = await fetch(
      `${WORDPRESS_API_URL}/pages?${searchParams.toString()}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );
    if (!response.ok) return null;
    const pages: WordPressPage[] = await response.json();
    return Array.isArray(pages) && pages.length > 0 ? pages[0] : null;
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return null;
  }
}

/**
 * Fetch a single post by ID or slug
 * @param identifier - Post ID or slug
 * @returns Promise<WordPressPost | null>
 */
export async function fetchPost(
  identifier: string | number
): Promise<WordPressPost | null> {
  try {
    const fields = [
      'id',
      'date',
      'modified',
      'slug',
      'title.rendered',
      'content.rendered',
      'excerpt.rendered',
      'author',
      'categories',
      'tags',
      'featured_media',
      'jetpack_featured_media_url',
      'hero_media',
      'hero_media_url',
      'hero_media_embed_html',
      'hero_media_external_url',
    ].join(',');

    let response;
    if (typeof identifier === 'string') {
      response = await fetch(
        `${WORDPRESS_API_URL}/posts?slug=${encodeURIComponent(
          identifier
        )}&per_page=1&_fields=${fields}`,
        {
          next: { revalidate: 300 }, // Cache for 5 minutes
        }
      );
    } else {
      response = await fetch(
        `${WORDPRESS_API_URL}/posts/${identifier}?_fields=${fields}`,
        {
          next: { revalidate: 300 }, // Cache for 5 minutes
        }
      );
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();
    const post: WordPressPost = Array.isArray(posts) ? posts[0] ?? null : posts;
    if (!post) return null;

    return post as WordPressPost;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

export async function fetchPostsByTags(
  tagIds: number[],
  excludePostId?: number
): Promise<WordPressPost[]> {
  if (!tagIds || tagIds.length === 0) return [];
  // Only use the first tag for matching
  const params = new URLSearchParams({
    tags: String(tagIds[0]),
    per_page: '3',
    _fields: [
      'id',
      'slug',
      'title.rendered',
      'jetpack_featured_media_url',
      'author',
      'categories',
      'tags',
      'hero_media',
      'hero_media_url',
      'hero_media_embed_html',
      'hero_media_external_url',
    ].join(','),
  });
  if (excludePostId) {
    params.append('exclude', excludePostId.toString());
  }
  const res = await fetch(`${WORDPRESS_API_URL}/posts?${params.toString()}`, {
    next: { revalidate: 300 }, // Cache for 5 minutes
  });
  if (!res.ok) throw new Error('Failed to fetch related articles');
  return res.json();
}

/**
 * Fetch all authors/users from WordPress API
 * @returns Promise<WordPressUser[]>
 */
export async function fetchAuthors(): Promise<WordPressUser[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/users?_embed`, {
      headers: {
        Authorization: getAuthHeader(),
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users: WordPressUser[] = await response.json();

    // Filter out users who haven't published any posts (optional)
    // You can remove this filter if you want to show all users
    return users.filter(user => user.slug && user.name);
  } catch (error) {
    console.error('Error fetching authors:', error);
    return [];
  }
}

/**
 * Fetch a single author by username
 * @param username - WordPress username
 * @returns Promise<WordPressUser | null>
 */
export async function fetchAuthorByUsername(
  username: string
): Promise<WordPressUser | null> {
  try {
    const response = await fetch(
      `https://wp.blackyouthproject.com/wp-json/byp/v1/author/${encodeURIComponent(
        username
      )}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data) {
      return null;
    }

    const mappedUser: WordPressUser = {
      id: data.id,
      name: data.name || data.slug || '',
      username: data.slug || username,
      description: data.bio || '',
      avatar_urls: data.avatar ? { 96: data.avatar } : undefined,
      slug: data.slug,
    };

    return mappedUser;
  } catch (error) {
    console.error('Error fetching author by username:', error);
    return null;
  }
}

/**
 * Fetch posts by author username
 * @param username - WordPress username
 * @param params - Query parameters
 * @returns Promise<WordPressPost[]>
 */
export async function fetchPostsByAuthor(
  username: string,
  params: {
    per_page?: number;
    page?: number;
  } = {}
): Promise<WordPressPost[]> {
  console.log('fetching posts by author', username);
  try {
    // First get the author to get their username/slug and numeric ID
    const author = await fetchAuthorByUsername(username);
    console.log('author', author);
    if (!author || !author.username || !author.id) {
      return [];
    }

    // Build query preferring author_name but also including author ID for extra safety
    const searchParams = new URLSearchParams({
      author_name: author.username,
      _embed: '1',
      per_page: (params.per_page || 10).toString(),
      orderby: 'date',
      order: 'desc',
    });

    if (params.page) {
      searchParams.append('page', params.page.toString());
    }

    console.log(`${WORDPRESS_API_URL}/posts?${searchParams.toString()}`);
    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const postsJson: WordPressPost[] = await response.json();

    // Ensure only posts authored by the resolved author ID are returned
    const filtered = Array.isArray(postsJson)
      ? postsJson.filter(post => {
          let postAuthorId: number | null = null;
          if (typeof post.author === 'number') {
            postAuthorId = post.author;
          } else if (
            post &&
            typeof post.author === 'object' &&
            post.author &&
            typeof post.author.id === 'number'
          ) {
            postAuthorId = post.author.id;
          } else if (typeof post.post_author === 'number') {
            postAuthorId = post.post_author;
          } else if (
            post &&
            post._embedded &&
            post._embedded.author &&
            Array.isArray(post._embedded.author) &&
            post._embedded.author.length > 0 &&
            typeof post._embedded.author[0]?.id === 'number'
          ) {
            postAuthorId = post._embedded.author[0].id;
          }
          return postAuthorId === author.id;
        })
      : [];

    return filtered as unknown as WordPressPost[];
  } catch (error) {
    console.error('Error fetching posts by author:', error);
    return [];
  }
}
