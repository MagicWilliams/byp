import Link from 'next/link';

export default function Submissions() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Submit Your Content
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Submission Guidelines
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              We welcome submissions from creators, writers, and contributors
              who want to share their work with our community. Please review our
              guidelines before submitting your content.
            </p>
            <p className="text-gray-600 leading-relaxed">
              All submissions are reviewed by our editorial team and must meet
              our quality standards and community guidelines.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Content Types We Accept
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Articles
                </h3>
                <p className="text-gray-600">
                  Well-researched articles on topics relevant to our community.
                  Word count: 500-2000 words.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Opinion Pieces
                </h3>
                <p className="text-gray-600">
                  Thoughtful commentary and analysis on current events or
                  industry trends.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Creative Writing
                </h3>
                <p className="text-gray-600">
                  Short stories, poetry, and other creative content that
                  resonates with our audience.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Visual Content
                </h3>
                <p className="text-gray-600">
                  Infographics, illustrations, and other visual content that
                  enhances our platform.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Submission Requirements
            </h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>
                  Content must be original and not previously published
                  elsewhere
                </li>
                <li>All sources must be properly cited and referenced</li>
                <li>
                  Content should be well-written, engaging, and relevant to our
                  audience
                </li>
                <li>
                  Images and media must be properly licensed or original work
                </li>
                <li>Submissions must comply with our community guidelines</li>
                <li>Include a brief author bio with your submission</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Submission Process
            </h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Prepare Your Content
                  </h3>
                  <p className="text-gray-600">
                    Ensure your content meets our guidelines and is ready for
                    submission.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Submit Online
                  </h3>
                  <p className="text-gray-600">
                    Use our online submission form to upload your content and
                    provide necessary information.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Review Process
                  </h3>
                  <p className="text-gray-600">
                    Our editorial team will review your submission and provide
                    feedback within 2-3 weeks.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">
                    Publication
                  </h3>
                  <p className="text-gray-600">
                    If approved, your content will be published on our platform
                    with proper attribution.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Submission Form
            </h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                Our submission form will be integrated here. This will allow
                users to submit their content directly through the website.
              </p>
              <div className="bg-white rounded p-4 border-2 border-dashed border-gray-300">
                <p className="text-sm text-gray-500 text-center">
                  Submission form coming soon...
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Questions?
            </h2>
            <p className="text-gray-600 leading-relaxed">
              If you have any questions about our submission process or
              guidelines, please don't hesitate to contact us at
              submissions@byp.com. We're here to help you share your work with
              our community.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}
