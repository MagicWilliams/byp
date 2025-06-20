import Link from 'next/link';

export default function About() {
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

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg shadow p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">About Us</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Values
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Innovation
                </h3>
                <p className="text-gray-600">
                  We believe in pushing boundaries and exploring new
                  possibilities in everything we do.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Community
                </h3>
                <p className="text-gray-600">
                  Building strong connections and fostering meaningful
                  relationships is at our core.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Quality
                </h3>
                <p className="text-gray-600">
                  We maintain the highest standards in all our content and
                  services.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Integrity
                </h3>
                <p className="text-gray-600">
                  Honesty and transparency guide every decision we make.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Our Team
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Our dedicated team of professionals works tirelessly to bring you
              the best experience possible. Each member brings unique expertise
              and passion to our mission of creating meaningful content and
              fostering community engagement.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
