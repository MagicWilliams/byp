import { NextRequest, NextResponse } from 'next/server';

// Cache for 5 minutes (300 seconds)
export const revalidate = 300;

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
      // Fetch extra to compensate for excluded categories (Video, Guest Post)
      queryParams.append('per_page', '15');
      queryParams.append('orderby', 'count');
      queryParams.append('order', 'desc');
      queryParams.append('hide_empty', 'true');
    }

    const wpApiUrl = `https://wp.blackyouthproject.com/wp-json/wp/v2/categories?${queryParams.toString()}`;
    const response = await fetch(wpApiUrl, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch categories' },
        { status: response.status }
      );
    }

    let categories = await response.json();

    // Exclude Video and Guest Post from the categories section (no content)
    if (!slug) {
      const excludedNames = ['Video', 'Guest Post'];
      categories = categories.filter(
        (cat: { name?: string }) =>
          !excludedNames.includes(cat.name ?? '')
      );
    }

    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
