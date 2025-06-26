import { NextResponse } from 'next/server';
import { fetchBLETags } from '../../lib/wordpress';

export async function GET() {
  try {
    const bleTags = await fetchBLETags();
    return NextResponse.json(bleTags);
  } catch (error) {
    console.error('Error in BLE tags API:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
