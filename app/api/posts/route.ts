// app/api/posts/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const wpRes = await fetch(
      'https://blackyouthproject.com/wp-json/wp/v2/posts'
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
