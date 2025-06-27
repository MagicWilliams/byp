import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Contact() {
  return (
    <div className="min-h-screen bg-white w-full">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg">
          <section className="mb-8 text-black flex flex-col gap-8">
            <h1
              className="text-3xl font-medium mb-8 py-8"
              style={{ fontFamily: 'Gill Sans' }}
            >
              Contact Us
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Get in Touch
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                We&apos;d love to hear from you! Whether you have a question,
                feedback, or just want to say hello, we&apos;re here to help.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Contact Information
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Email
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    info@byp.com
                  </p>
                </div>
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Phone
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    +1 (555) 123-4567
                  </p>
                </div>
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Address
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    123 Main Street
                    <br />
                    City, State 12345
                    <br />
                    United States
                  </p>
                </div>
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Business Hours
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Monday - Friday: 9:00 AM - 6:00 PM
                    <br />
                    Saturday: 10:00 AM - 4:00 PM
                    <br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Contact Form
              </h3>
              <div className="bg-gray-100 rounded-lg p-6">
                <p className="text-xl mb-4" style={{ fontFamily: 'Playfair' }}>
                  Our contact form will be integrated here. This will allow
                  users to send us messages directly through the website.
                </p>
                <div className="bg-white rounded p-4 border-2 border-dashed border-gray-300">
                  <p className="text-sm text-gray-500 text-center">
                    Contact form coming soon...
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Frequently Asked Questions
              </h3>
              <div className="space-y-4">
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    How can I submit content?
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Visit our Submissions page to learn more about how to
                    contribute content to our platform.
                  </p>
                </div>
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    What are your response times?
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    We typically respond to inquiries within 24-48 hours during
                    business days.
                  </p>
                </div>
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Do you offer support?
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Yes, we provide comprehensive support for all our users and
                    partners.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
