import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    // Build query string
    const queryParams = new URLSearchParams();
    if (slug) {
      queryParams.append('slug', slug);
    } else {
      // Default behavior when no slug is provided
      queryParams.append('per_page', '10');
      queryParams.append('orderby', 'count');
      queryParams.append('order', 'desc');
      queryParams.append('hide_empty', 'true');
    }

    const wpApiUrl = `https://blackyouthproject.com/wp-json/wp/v2/categories?${queryParams.toString()}`;
    const response = await fetch(wpApiUrl);

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: response.status }
      );
    }

    const categories = await response.json();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
