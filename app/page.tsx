import Link from 'next/link';
import PostsSection from './components/PostsSection';
import Header from './components/Header';
import Footer from './components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to BYP
          </h2>
          <p className="text-xl text-gray-600">
            Your platform for content and community
          </p>
        </div>

        <PostsSection />

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Submit Your Content
            </h3>
            <p className="text-gray-600 mb-4">
              Share your stories, articles, and creative work with our
              community.
            </p>
            <Link
              href="/submissions"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Learn More
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              Get in Touch
            </h3>
            <p className="text-gray-600 mb-4">
              Have questions or feedback? We'd love to hear from you.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
