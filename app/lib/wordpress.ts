// WordPress API integration stubs
// These functions will be implemented to fetch data from WordPress REST API

export interface WordPressUser {
  id: number;
  name: string;
  description: string;
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
  author: WordPressUser;
  featured_media: number;
  categories: number[];
  tags: number[];
  jetpack_featured_media_url?: string;
  _embedded?: {
    author: {
      name: string;
      description: string;
    }[];
    'wp:term': (WordPressCategory[] | WordPressTag[])[];
  };
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
  author: WordPressUser;
}

export interface PageResults {
  per_page?: number;
  page?: number;
  _embed?: boolean;
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
  acf: {
    associated_posts: BLEAssociatedPost[];
  };
}

// WordPress API configuration
const WORDPRESS_API_URL =
  process.env.WP_API_URL || 'https://blackyouthproject.com/wp-json/wp/v2';

const getAuthHeader = () => {
  const username = process.env.WP_USER;
  const password = process.env.WP_APP_PASSWORD;
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
      `${WORDPRESS_API_URL}/issue?acf_format=standard&_t=${timestamp}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const issues: BLEIssue[] = await response.json();
    const issuesWithImages = await Promise.all(
      issues.map(async issue => {
        let featured_image_url: string | null = null;
        if (issue.featured_media) {
          featured_image_url = await getFeaturedImageUrl(issue.featured_media);
        }
        if (issue.acf && Array.isArray(issue.acf.associated_posts)) {
          issue.acf.associated_posts = await Promise.all(
            issue.acf.associated_posts.map(async (post: BLEAssociatedPost) => {
              try {
                const wpPostRes = await fetch(
                  `${WORDPRESS_API_URL}/posts/${post.ID}`
                );
                if (!wpPostRes.ok) throw new Error('Post fetch failed');
                const wpPost = await wpPostRes.json();
                let authorDetails = null;
                if (wpPost.author) {
                  const authorRes = await fetch(
                    `${WORDPRESS_API_URL}/users/${wpPost.author}`,
                    {
                      headers: {
                        Authorization: getAuthHeader(),
                      },
                    }
                  );
                  if (authorRes.ok) {
                    authorDetails = await authorRes.json();
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
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/media/${mediaId}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const media = await response.json();
    return media.source_url || null;
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
    const response = await fetch(`${WORDPRESS_API_URL}/tags`);

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
 * Fetch categories from WordPress API
 * @returns Promise<WordPressCategory[]>
 */
export async function fetchCategories(): Promise<WordPressCategory[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories`);

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
      `${WORDPRESS_API_URL}/pages?${searchParams.toString()}`
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
 * Fetch a single post by ID or slug
 * @param identifier - Post ID or slug
 * @returns Promise<WordPressPost | null>
 */
export async function fetchPost(
  identifier: string | number
): Promise<WordPressPost | null> {
  try {
    let response;
    if (typeof identifier === 'string') {
      // Fetching by slug
      response = await fetch(
        `${WORDPRESS_API_URL}/posts?slug=${identifier}&_embed`
      );
    } else {
      // Fetching by ID
      response = await fetch(`${WORDPRESS_API_URL}/posts/${identifier}?_embed`);
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();

    // When fetching by slug, the API returns an array.
    let post = Array.isArray(posts)
      ? posts.length > 0
        ? posts[0]
        : null
      : posts;

    if (!post) {
      return null;
    }

    // Extract author information from embedded data
    if (
      post._embedded &&
      post._embedded.author &&
      post._embedded.author.length > 0
    ) {
      const authorData = post._embedded.author[0];
      post.author = {
        id: authorData.id || post.post_author,
        name: authorData.name || '',
        description: authorData.description || '',
      };
    } else if (post.post_author) {
      // Fallback: fetch author information separately if not embedded
      try {
        const authorResponse = await fetch(
          `${WORDPRESS_API_URL}/users/${post.post_author}`,
          {
            headers: {
              Authorization: getAuthHeader(),
            },
          }
        );
        if (authorResponse.ok) {
          const authorData = await authorResponse.json();
          post.author = {
            id: authorData.id,
            name: authorData.name,
            description: authorData.description,
          };
        }
      } catch (authorError) {
        console.error('Error fetching author information:', authorError);
        // Set a default author object if we can't fetch the author
        post.author = {
          id: post.post_author,
          name: 'Unknown Author',
          description: '',
        };
      }
    }

    return post;
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
    _embed: '1',
    tags: String(tagIds[0]),
    per_page: '3',
  });
  if (excludePostId) {
    params.append('exclude', excludePostId.toString());
  }
  const res = await fetch(`${WORDPRESS_API_URL}/posts?${params.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch related articles');
  return res.json();
}
