import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import EmailSubscribe from '../components/EmailSubscribe';

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
                If you have suggestions, comments, or questions about this
                website and its contents, please feel free to contact us by
                emailing{' '}
                <Link
                  className="underline hover:no-underline"
                  href="mailto:info@blackyouthproject.com"
                >
                  info@blackyouthproject.com
                </Link>
                .
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
                    <Link
                      className="underline hover:no-underline"
                      href="mailto:info@blackyouthproject.com"
                    >
                      info@blackyouthproject.com
                    </Link>
                  </p>
                </div>
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Address
                  </h4>
                  <p
                    className="text-xl font-bold"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Black Youth Project
                    <br />
                    University of Chicago
                    <br />
                    Center for the Study of Race, Politics and Culture
                    <br />
                    <span className="font-normal">
                      5733 South University Avenue
                      <br />
                      Chicago, IL 60637
                    </span>
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
                    className="text-xl font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    How can I submit content?
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Visit our{' '}
                    <Link
                      className="underline hover:no-underline"
                      href="/submissions"
                    >
                      Submissions
                    </Link>{' '}
                    page to learn more about how to contribute content to our
                    platform.
                  </p>
                </div>
                <div>
                  <h4
                    className="text-xl font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    What are your response times?
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    We typically respond to inquiries within 24-48 hours during
                    business days.
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
