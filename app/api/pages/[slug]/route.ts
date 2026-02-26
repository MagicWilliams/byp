import { NextRequest, NextResponse } from 'next/server';
import { fetchPageBySlug } from '../../../lib/wordpress';

export const revalidate = 300;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    if (!slug) {
      return NextResponse.json({ error: 'Slug required' }, { status: 400 });
    }

    const page = await fetchPageBySlug(slug, { acf_format: 'standard' });

    if (!page) {
      return NextResponse.json({ error: 'Page not found' }, { status: 404 });
    }

    return NextResponse.json(page);
  } catch {
    return NextResponse.json(
      { error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
