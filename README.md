# BYP - Your Platform for Content and Community

A Next.js application for content management and community engagement with WordPress API integration and Zustand state management.

## Features

- **Clean, Modern UI**: Built with Next.js 14 and Tailwind CSS
- **WordPress Integration**: Stubbed API functions for content retrieval
- **State Management**: Zustand store for managing WordPress data
- **Dynamic Articles**: Individual article pages with dynamic routing
- **Responsive Design**: Mobile-friendly interface
- **Content Pages**: About, Contact, Terms, and Submissions pages
- **Navigation**: Consistent header navigation across all pages

## Pages

- **Home** (`/`): Welcome page with featured content from WordPress
- **Articles** (`/article/[slug]`): Individual article pages with dynamic routing
- **About** (`/about`): Company information and mission
- **Contact** (`/contact`): Contact information and FAQ
- **Submissions** (`/submissions`): Content submission guidelines and process
- **Terms** (`/terms`): Terms of service and legal information

## State Management with Zustand

The application uses Zustand for state management with the following structure:

### Store (`app/lib/store.ts`)

- **Posts**: WordPress posts with loading and error states
- **Categories**: WordPress categories with loading and error states
- **Tags**: WordPress tags with loading and error states
- **Actions**: Fetch functions for each data type
- **Utility Actions**: Clear functions for managing state

### Custom Hooks (`app/lib/hooks.ts`)

- `usePosts()` - Hook for posts data and actions
- `useCategories()` - Hook for categories data and actions
- `useTags()` - Hook for tags data and actions
- `useSiteData()` - Hook for all site data with computed values

### Components

- `PostsSection` - Displays WordPress posts using the store
- `CategoriesSection` - Displays WordPress categories using the store
- `ArticleView` - Client component for displaying individual articles

## WordPress API Integration

The application includes stubbed WordPress API functions in `app/lib/wordpress.ts`:

- `fetchPosts()` - Retrieve blog posts
- `fetchPost()` - Get single post by ID or slug
- `fetchPages()` - Retrieve pages
- `fetchCategories()` - Get post categories
- `fetchTags()` - Get post tags
- `getFeaturedImageUrl()` - Get featured image URLs

### Environment Variables

Set up your WordPress API URL in your environment:

```env
WORDPRESS_API_URL=https://blackyouthproject.com/wp-json/wp/v2
```

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Development

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom prose styles
- **Language**: TypeScript
- **State Management**: Zustand
- **API**: WordPress REST API integration

## Project Structure

```
byp/
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── submissions/
│   │   └── page.tsx
│   ├── terms/
│   │   └── page.tsx
│   ├── article/
│   │   └── [slug]/
│   │       └── page.tsx
│   ├── components/
│   │   ├── PostsSection.tsx
│   │   ├── CategoriesSection.tsx
│   │   └── ArticleView.tsx
│   ├── lib/
│   │   ├── wordpress.ts
│   │   ├── store.ts
│   │   └── hooks.ts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
└── README.md
```

## Using the Store

### Basic Usage

```tsx
'use client';
import { usePosts } from '../lib/hooks';

export default function MyComponent() {
  const { posts, postsLoading, fetchPosts } = usePosts();

  useEffect(() => {
    fetchPosts({ per_page: 5 });
  }, [fetchPosts]);

  // Component logic...
}
```

### Advanced Usage

```tsx
'use client';
import { useSiteData } from '../lib/hooks';

export default function MyComponent() {
  const {
    posts,
    categories,
    isLoading,
    hasErrors,
    fetchPosts,
    fetchCategories,
  } = useSiteData();

  // Component logic...
}
```

## Article Pages

The application supports dynamic article pages at `/article/[slug]`:

### Features

- **Dynamic Routing**: Articles are accessible via their slug
- **SEO Friendly**: Proper meta tags and structured content
- **Responsive Design**: Optimized for all device sizes
- **Typography**: Custom prose styles for better readability
- **Navigation**: Easy navigation back to home page
- **Error Handling**: Graceful 404 handling for missing articles

### Usage

```tsx
// Navigate to an article
<Link href={`/article/${post.slug}`}>Read Article</Link>

// The article page will automatically fetch and display the content
```

## Next Steps

1. **Configure WordPress API**: Update the `WORDPRESS_API_URL` environment variable
2. **Implement Forms**: Add contact and submission forms
3. **Add Authentication**: Implement user authentication if needed
4. **Enhance Content**: Add more dynamic content and features
5. **SEO Optimization**: Add meta tags and structured data
6. **Add More Store Features**: Implement caching, pagination, and search
7. **Related Articles**: Implement related articles functionality
8. **Comments System**: Add commenting functionality to articles

## License

This project is licensed under the MIT License.
