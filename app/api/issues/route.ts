import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch(
      'https://blackyouthproject.com/wp-json/wp/v2/issue?per_page=100'
    );
    if (!res.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch issues' },
        { status: res.status }
      );
    }
    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
