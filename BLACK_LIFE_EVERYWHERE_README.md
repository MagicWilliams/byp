# Black Life Everywhere System

This document describes the implementation of the Black Life Everywhere (BLE) system for grouping articles under issues in a Next.js 14 application connected to WordPress.

## Overview

The system dynamically displays grouped articles under each "Black Life Everywhere" Issue using a simplified approach:

- **WordPress Posts** are filtered to only include those that have any "Issue" field populated
- **WordPress Custom Post Type (CPT)** called "issue" holds issue metadata (title, featured image, letter from the editor)
- **Issue Identification**: Issues with titles starting with "BLE Issue:" are considered valid BLE issues
- The system extracts issue numbers from titles and groups posts with issue fields accordingly

## Architecture

### Core Functions (`app/lib/wordpress.ts`)

#### 1. `fetchIssues()`

Fetches all issue CPTs from WordPress REST API.

```typescript
export async function fetchIssues(): Promise<WordPressIssue[]>;
```

**Endpoint:** `GET /wp-json/wp/v2/issue?per_page=100`

#### 2. `fetchBLETags()`

Fetches issue CPTs and filters for those with titles starting with "BLE Issue:".

```typescript
export async function fetchBLETags(): Promise<BLETag[]>;
```

**Process:**

- Fetches all issues from `/wp-json/wp/v2/issue`
- Filters for titles matching `/^BLE Issue:\s*\d+/i`
- Converts to BLETag format for consistency

#### 3. `fetchPostsByTagId(tagId: number)`

Fetches posts filtered by a specific tag ID.

```typescript
export async function fetchPostsByTagId(
  tagId: number
): Promise<WordPressPost[]>;
```

**Endpoint:** `GET /wp-json/wp/v2/posts?issue={tagId}&per_page=100`

#### 4. `fetchBlackLifeEverywhereData()`

Main utility function that processes BLE issues and groups posts with issue fields.

```typescript
export async function fetchBlackLifeEverywhereData(): Promise<IssueGroup[]>;
```

**Process:**

1. Fetches all issues from WordPress
2. Filters for issues with titles starting with "BLE Issue:"
3. Extracts issue numbers from titles
4. Fetches all posts and filters for those with any tags (indicating issue fields)
5. Groups posts by issue number

**Returns:** Array of `IssueGroup` objects with the structure:

```typescript
interface IssueGroup {
  issueNumber: string;
  issuePost: WordPressIssue;
  posts: WordPressPost[];
}
```

### Data Types

#### WordPressIssue

```typescript
interface WordPressIssue {
  id: number;
  title: { rendered: string };
  content: { rendered: string };
  excerpt: { rendered: string };
  slug: string;
  date: string;
  modified: string;
  featured_media: number;
}
```

#### BLETag

```typescript
interface BLETag {
  id: number;
  name: string;
  slug: string;
  description: string;
  count: number;
  taxonomy: 'issue'; // Custom taxonomy for BLE issues
}
```

#### IssueGroup

```typescript
interface IssueGroup {
  issueNumber: string;
  issuePost: WordPressIssue;
  posts: WordPressPost[];
}
```

## State Management (Zustand Store)

### Store Structure (`app/lib/store.ts`)

The Zustand store manages the following state:

```typescript
interface SiteState {
  // Data
  issueGroups: IssueGroup[];
  bleTags: BLETag[];
  issues: WordPressIssue[];

  // Loading states
  blackLifeEverywhereLoading: boolean;
  bleTagsLoading: boolean;
  issuesLoading: boolean;

  // Error states
  blackLifeEverywhereError: string | null;
  bleTagsError: string | null;
  issuesError: string | null;

  // Actions
  fetchBlackLifeEverywhereData: () => Promise<void>;
  fetchBLETags: () => Promise<void>;
  fetchIssues: () => Promise<void>;
}
```

### React Hooks (`app/lib/hooks.ts`)

#### `useBlackLifeEverywhere()`

Main hook for Black Life Everywhere functionality:

```typescript
const {
  issueGroups,
  blackLifeEverywhereLoading,
  blackLifeEverywhereError,
  fetchBlackLifeEverywhereData,
} = useBlackLifeEverywhere();
```

#### `useBLETags()`

Hook for BLE tags functionality:

```typescript
const { bleTags, bleTagsLoading, bleTagsError, fetchBLETags } = useBLETags();
```

#### `useIssues()`

Hook for issues functionality:

```typescript
const { issues, issuesLoading, issuesError, fetchIssues } = useIssues();
```

## API Routes

### `/api/black-life-everywhere`

Returns grouped Black Life Everywhere data.

**Response:**

```json
{
  "issueGroups": IssueGroup[],
  "totalIssues": number,
  "totalPosts": number,
  "summary": {
    "issuesWithTags": number,
    "issuesWithPosts": number,
    "totalAssociatedPosts": number
  }
}
```

### `/api/issues`

Returns all issue CPTs.

### `/api/ble-tags`

Returns all BLE tags (BLE-Issue-{number} pattern).

### `/api/posts-by-tag/[tagId]`

Returns posts filtered by tag ID.

## Component Implementation

### Black Life Everywhere Page (`app/black-life-everywhere/page.tsx`)

The main page component features:

- **Hero Section**: Large title and description
- **Loading State**: Spinner with loading message
- **Error State**: Error display with retry capability
- **Issues Grid**: Beautiful card-based layout for each issue
- **Articles Display**: Responsive grid of articles within each issue
- **Empty State**: Message when no issues are found

#### Key Features:

- Responsive design with Tailwind CSS
- Modern card-based UI with gradients and hover effects
- Loading and error states
- Article count display
- Formatted dates
- Featured image support (placeholder)

## Usage Example

```typescript
'use client';

import { useEffect } from 'react';
import { useBlackLifeEverywhere } from '../lib/hooks';

export default function BlackLifeEverywherePage() {
  const {
    issueGroups,
    blackLifeEverywhereLoading,
    blackLifeEverywhereError,
    fetchBlackLifeEverywhereData,
  } = useBlackLifeEverywhere();

  useEffect(() => {
    if (issueGroups.length === 0) {
      fetchBlackLifeEverywhereData();
    }
  }, [fetchBlackLifeEverywhereData, issueGroups.length]);

  if (blackLifeEverywhereLoading) {
    return <div>Loading...</div>;
  }

  if (blackLifeEverywhereError) {
    return <div>Error: {blackLifeEverywhereError}</div>;
  }

  return (
    <div>
      {issueGroups.map(group => (
        <div key={group.issueNumber}>
          <h2>Issue {group.issueNumber}</h2>
          <h3>{group.issuePost.title.rendered}</h3>
          <div>
            {group.posts.map(post => (
              <div key={post.id}>
                <h4>{post.title.rendered}</h4>
                <p>{post.excerpt.rendered}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

## WordPress Setup Requirements

### Custom Post Type: "issue"

Register a custom post type called "issue" in WordPress with:

- Title (must start with "BLE Issue:" for valid BLE issues)
- Content (for letter from editor)
- Excerpt
- Featured image
- Custom fields as needed

### Issue Naming Convention

- Create issues with titles starting with: `BLE Issue: {number}`
- Examples: `BLE Issue: 6`, `BLE Issue: 7`, etc.
- The system will extract the number and use it for grouping

### Post Issue Fields

- Posts must have some form of issue field populated
- Currently, the system filters for posts with any tags (as a placeholder)
- You can adjust the filter logic in `fetchBlackLifeEverywhereData()` based on your actual post structure

### REST API Endpoints

Ensure the following endpoints are available:

- `GET /wp-json/wp/v2/issue` - For issue CPTs
- `GET /wp-json/wp/v2/posts` - For posts (with issue field filtering)

## Development Notes

### Mock Data

The system includes mock data for development when the WordPress API is unavailable:

- Mock issues with titles like "BLE Issue: 6"
- Mock posts with tags (indicating issue fields)
- Mock BLE tags following the naming convention

### Error Handling

- Graceful fallback to mock data
- Comprehensive error states in UI
- Console logging for debugging

### Performance

- Efficient filtering of issues by title pattern
- Post filtering based on issue field presence
- Caching through Zustand store

### Debugging

The system includes console logging to help debug:

- Number of issues fetched
- BLE issues found and their titles
- Posts processed for each issue
- Final issue groups structure

## Future Enhancements

1. **Accurate Post Filtering**: Implement proper filtering based on actual issue field structure
2. **Pagination**: Add pagination for large numbers of issues/posts
3. **Search**: Add search functionality across issues and articles
4. **Filtering**: Add filtering by date, author, or other criteria
5. **Caching**: Implement more sophisticated caching strategies
6. **SEO**: Add meta tags and structured data for better SEO
7. **Analytics**: Add tracking for issue and article views
