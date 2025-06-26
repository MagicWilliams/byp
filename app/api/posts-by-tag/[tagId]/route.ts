import { NextResponse } from 'next/server';
import { fetchPostsByTagId } from '../../../lib/wordpress';

export async function GET(
  request: Request,
  { params }: { params: { tagId: string } }
) {
  try {
    const tagId = parseInt(params.tagId, 10);

    if (isNaN(tagId)) {
      return NextResponse.json({ error: 'Invalid tag ID' }, { status: 400 });
    }

    const posts = await fetchPostsByTagId(tagId);
    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error in posts-by-tag API:', error);
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
