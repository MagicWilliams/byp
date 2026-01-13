import { NextResponse } from 'next/server';
import { fetchTags } from '../../lib/wordpress';

// Cache for 5 minutes (300 seconds)
export const revalidate = 300;

export async function GET() {
  try {
    const bleTags = await fetchTags();
    return NextResponse.json(bleTags);
  } catch (error) {
    console.error('Error in BLE tags API:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
