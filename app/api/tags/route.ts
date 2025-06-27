// app/api/tags/route.ts

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // Build query string
    const queryParams = new URLSearchParams();
    if (slug) {
      queryParams.append('slug', slug);
    }

    const wpRes = await fetch(
      `https://blackyouthproject.com/wp-json/wp/v2/tags?${queryParams.toString()}`
    );

    if (!wpRes.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch tags' },
        { status: wpRes.status }
      );
    }

    const data = await wpRes.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error in tags API:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
