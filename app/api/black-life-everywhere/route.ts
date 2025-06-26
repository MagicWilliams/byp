import { NextResponse } from 'next/server';
import { fetchBlackLifeEverywhereIssues } from '../../lib/wordpress';

export async function GET() {
  try {
    const issues = await fetchBlackLifeEverywhereIssues();
    const response = NextResponse.json({ issues });
    response.headers.set(
      'Cache-Control',
      'no-store, no-cache, must-revalidate, proxy-revalidate'
    );
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
    return response;
  } catch (error) {
    console.error('Error in black-life-everywhere API:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
