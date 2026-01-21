// app/api/posts/route.ts

import { NextRequest, NextResponse } from 'next/server';

// Cache for 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Build query string from search params
    const queryParams = new URLSearchParams();

    // Add all search params to the query
    searchParams.forEach((value, key) => {
      queryParams.append(key, value);
    });

    // Add _embed to get author and term information
    queryParams.append('_embed', '1');

    const wpRes = await fetch(
      `https://wp.blackyouthproject.com/wp-json/wp/v2/posts?${queryParams.toString()}`,
      {
        next: { revalidate: 300 }, // Cache for 5 minutes
      }
    );

    if (!wpRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch posts' },
        { status: wpRes.status }
      );
    }

    const data = await wpRes.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in posts API:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
