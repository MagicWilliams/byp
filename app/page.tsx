import Link from 'next/link';
import PostsSection from './components/PostsSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">BYP</h1>
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-900 hover:text-gray-600">
                Home
              </Link>
              <Link href="/about" className="text-gray-900 hover:text-gray-600">
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-900 hover:text-gray-600"
              >
                Contact
              </Link>
              <Link
                href="/submissions"
                className="text-gray-900 hover:text-gray-600"
              >
                Submissions
              </Link>
              <Link href="/terms" className="text-gray-900 hover:text-gray-600">
                Terms
              </Link>
            </nav>
          </div>
        </div>
      </header>

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
    </div>
  );
}
