import { NextResponse } from 'next/server';
import { fetchBlackLifeEverywhereIssues } from '../../lib/wordpress';

export async function GET() {
  try {
    const issues = await fetchBlackLifeEverywhereIssues();

    // Create response with cache control headers to prevent caching
    const response = NextResponse.json(issues);
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');

    return response;
  } catch (error) {
    console.error('Error in issues API:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
