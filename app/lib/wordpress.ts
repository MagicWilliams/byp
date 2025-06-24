// WordPress API integration stubs
// These functions will be implemented to fetch data from WordPress REST API

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
  author: number;
  featured_media: number;
  categories: number[];
  tags: number[];
  jetpack_featured_media_url?: string;
  _embedded?: {
    author: {
      name: string;
      description: string;
      [key: string]: any;
    }[];
    'wp:term': (WordPressCategory[] | WordPressTag[])[];
  };
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

// WordPress API configuration
const WORDPRESS_API_URL =
  process.env.WORDPRESS_API_URL ||
  'https://blackyouthproject.com/wp-json/wp/v2';

/**
 * Fetch posts from WordPress API
 * @param params - Query parameters for posts
 * @returns Promise<WordPressPost[]>
 */
export async function fetchPosts(
  params: {
    per_page?: number;
    page?: number;
    categories?: number[];
    tags?: number[];
    search?: string;
    _embed?: boolean;
  } = {}
): Promise<WordPressPost[]> {
  try {
    const searchParams = new URLSearchParams();

    if (params.per_page)
      searchParams.append('per_page', params.per_page.toString());
    if (params.page) searchParams.append('page', params.page.toString());
    if (params.categories)
      searchParams.append('categories', params.categories.join(','));
    if (params.tags) searchParams.append('tags', params.tags.join(','));
    if (params.search) searchParams.append('search', params.search);

    const response = await fetch(
      `${WORDPRESS_API_URL}/posts?${searchParams.toString()}`
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching posts:', error);
    // Return mock data for development
    return getMockPosts();
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
    if (Array.isArray(posts)) {
      return posts.length > 0 ? posts[0] : null;
    }

    // When fetching by ID, the API returns a single object.
    return posts;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
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
 * Get featured image URL for a post
 * @param mediaId - WordPress media ID
 * @returns Promise<string | null>
 */
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

// Mock data for development
function getMockPosts(): WordPressPost[] {
  return [
    {
      id: 1,
      title: { rendered: 'Welcome to BYP' },
      content: {
        rendered:
          '<p>This is a sample post content that would be loaded from WordPress.</p>',
      },
      excerpt: { rendered: 'A brief excerpt of the post content...' },
      date: new Date().toISOString(),
      modified: new Date().toISOString(),
      slug: 'welcome-to-byp',
      author: 1,
      featured_media: 0,
      categories: [1],
      tags: [1, 2],
    },
    {
      id: 2,
      title: { rendered: 'Getting Started with Content Creation' },
      content: {
        rendered:
          '<p>Learn how to create engaging content for our platform.</p>',
      },
      excerpt: { rendered: 'Tips and tricks for creating great content...' },
      date: new Date().toISOString(),
      modified: new Date().toISOString(),
      slug: 'getting-started-with-content-creation',
      author: 1,
      featured_media: 0,
      categories: [2],
      tags: [3, 4],
    },
  ];
}
