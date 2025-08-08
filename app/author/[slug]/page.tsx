import { notFound } from 'next/navigation';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import AuthorBody from '../../components/AuthorBody';
import { fetchAuthorByUsername, fetchPostsByAuthor } from '../../lib/wordpress';

interface AuthorPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  try {
    // Fetch author data on the server
    const author = await fetchAuthorByUsername(slug);
    if (!author) {
      notFound();
    }

    // Fetch posts by author on the server
    const posts = await fetchPostsByAuthor(slug, { per_page: 10 });

    return (
      <div className="min-h-screen bg-[#111] w-full">
        <Header />
        <AuthorBody author={author} posts={posts} />
        <Footer />
      </div>
    );
  } catch (error) {
    console.error('Error fetching author data:', error);
    notFound();
  }
}
