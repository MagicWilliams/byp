import { NextResponse } from 'next/server';
import { fetchTags } from '../../lib/wordpress';

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
