import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Fetch all posts
    const postsRes = await fetch(
      'https://blackyouthproject.com/wp-json/wp/v2/posts?per_page=100&_embed'
    );

    if (!postsRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: postsRes.status }
      );
    }

    const posts = await postsRes.json();

    // Only keep posts with a non-empty issue array
    const filteredPosts = posts.filter(
      (post: any) => Array.isArray(post.issue) && post.issue.length > 0
    );

    // Collect all unique issue IDs
    const issueIds = Array.from(
      new Set(filteredPosts.flatMap((post: any) => post.issue))
    );

    // Fetch all issue term objects in one request (if possible)
    let issuesMap: Record<number, any> = {};
    if (issueIds.length > 0) {
      const issuesRes = await fetch(
        `https://blackyouthproject.com/wp-json/wp/v2/issue?include=${issueIds.join(
          ','
        )}&per_page=100`
      );
      if (issuesRes.ok) {
        const issues = await issuesRes.json();
        issuesMap = Object.fromEntries(
          issues.map((issue: any) => [issue.id, issue])
        );
      }
    }

    // Replace the issue array of IDs with the full term objects
    const enrichedPosts = filteredPosts.map((post: any) => ({
      ...post,
      issue: Array.isArray(post.issue)
        ? post.issue.map((id: number) => issuesMap[id] || { id })
        : [],
    }));

    return NextResponse.json(enrichedPosts);
  } catch (error) {
    console.error('Error in black-life-everywhere API:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
