import ArticleView from '../../components/ArticleView';
import Footer from '../../components/Footer';

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;

  return (
    <>
      <ArticleView slug={slug} />
      <Footer />
    </>
  );
}
