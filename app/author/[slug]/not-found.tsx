import Link from 'next/link';
import Header from '../../components/Header';
import Footer from '../../components/Footer';

export default function AuthorNotFound() {
  return (
    <div className="min-h-screen bg-[#111] w-full">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-[#111] rounded-lg">
          <section className="mb-8 text-white flex flex-col gap-8">
            <div className="text-center py-16">
              <h1
                className="text-4xl font-medium mb-4"
                style={{ fontFamily: 'Playfair' }}
              >
                Author Not Found
              </h1>
              <p className="text-lg mb-8" style={{ fontFamily: 'Playfair' }}>
                The author you're looking for doesn't exist or has been removed.
              </p>
              <Link
                href="/"
                className="text-blue-300 hover:text-blue-200 underline text-lg"
                style={{ fontFamily: 'Playfair' }}
              >
                Return to Home
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
