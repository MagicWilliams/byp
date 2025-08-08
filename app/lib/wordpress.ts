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
    gradientstart: string;
    gradientend: string;
  };
}

// WordPress API configuration
const WORDPRESS_API_URL =
  process.env.WP_API_URL || 'https://blackyouthproject.com/wp-json/wp/v2';

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
                if (!wpPostRes.ok)
                  throw new Error(
                    `Post ${(post.ID, post.post_title)} fetch failed: ${
                      wpPostRes.status
                    }`
                  );
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
      throw new Error(
        `HTTP error! status: ${response.status}, mediaId: ${mediaId}`
      );
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
    const post = Array.isArray(posts)
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
      `https://blackyouthproject.com/wp-json/byp/v1/author/${encodeURIComponent(
        username
      )}`
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

    const postsJson: any[] = await response.json();

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
