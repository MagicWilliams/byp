import Link from 'next/link';

export default function Contact() {
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
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Contact Us</h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We&apos;d love to hear from you! Whether you have a question,
              feedback, or just want to say hello, we&apos;re here to help.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Information
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Email
                </h3>
                <p className="text-gray-600">info@byp.com</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Phone
                </h3>
                <p className="text-gray-600">+1 (555) 123-4567</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Address
                </h3>
                <p className="text-gray-600">
                  123 Main Street
                  <br />
                  City, State 12345
                  <br />
                  United States
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Business Hours
                </h3>
                <p className="text-gray-600">
                  Monday - Friday: 9:00 AM - 6:00 PM
                  <br />
                  Saturday: 10:00 AM - 4:00 PM
                  <br />
                  Sunday: Closed
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Contact Form
            </h2>
            <div className="bg-gray-100 rounded-lg p-6">
              <p className="text-gray-600 mb-4">
                Our contact form will be integrated here. This will allow users
                to send us messages directly through the website.
              </p>
              <div className="bg-white rounded p-4 border-2 border-dashed border-gray-300">
                <p className="text-sm text-gray-500 text-center">
                  Contact form coming soon...
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  How can I submit content?
                </h3>
                <p className="text-gray-600">
                  Visit our Submissions page to learn more about how to
                  contribute content to our platform.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  What are your response times?
                </h3>
                <p className="text-gray-600">
                  We typically respond to inquiries within 24-48 hours during
                  business days.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  Do you offer support?
                </h3>
                <p className="text-gray-600">
                  Yes, we provide comprehensive support for all our users and
                  partners.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
