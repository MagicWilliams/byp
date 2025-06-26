// app/api/tags/route.ts

import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const wpRes = await fetch(
      'https://blackyouthproject.com/wp-json/wp/v2/tags'
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
