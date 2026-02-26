import { NextResponse } from 'next/server';
import { fetchBlackLifeEverywhereIssues } from '../../lib/wordpress';

// Cache for 1 minute (60 seconds) - shorter cache for frequently updated content
export const revalidate = 60;

export async function GET() {
  try {
    const issues = await fetchBlackLifeEverywhereIssues();
    return NextResponse.json({ issues });
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
