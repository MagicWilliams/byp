import { NextRequest, NextResponse } from 'next/server';
import { fetchAuthors, fetchAuthorByUsername } from '../../lib/wordpress';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const username = searchParams.get('username');

    if (username) {
      // Fetch specific author by username
      const author = await fetchAuthorByUsername(username);
      if (!author) {
        return NextResponse.json(
          { error: 'Author not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(author);
    } else {
      // Fetch all authors
      const authors = await fetchAuthors();
      return NextResponse.json(authors);
    }
  } catch (error) {
    console.error('Error fetching authors:', error);
    return NextResponse.json(
      { error: 'Failed to fetch authors' },
      { status: 500 }
    );
  }
}
