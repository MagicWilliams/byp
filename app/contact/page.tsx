import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import {
  fetchPageBySlug,
  type ContactPageACF,
} from '../lib/wordpress';
import { sanitizeHtmlWithBreaks, stripHtml } from '../lib/sanitize';

const CONTACT_FALLBACK: ContactPageACF = {
  page_title: 'Contact Us',
  get_in_touch_heading: 'Get in Touch',
  get_in_touch_text:
    'If you have suggestions, comments, or questions about this website and its contents, please feel free to contact us by emailing',
  contact_email: 'info@blackyouthproject.com',
  contact_info_heading: 'Contact Information',
  address_lines: [
    'Black Youth Project',
    'University of Chicago',
    'Center for the Study of Race, Politics and Culture',
    '5733 South University Avenue',
    'Chicago, IL 60637',
  ],
  faq_items: [
    {
      question: 'How can I submit content?',
      answer:
        'Visit our Submissions page to learn more about how to contribute content to our platform.',
    },
    {
      question: 'What are your response times?',
      answer:
        'We typically respond to inquiries within 24-48 hours during business days.',
    },
  ],
};

function normalizeAddressLines(
  address_lines?: string | string[]
): string[] {
  if (!address_lines) return [];
  if (Array.isArray(address_lines)) return address_lines;
  return address_lines.split(/\n/).map((s) => s.trim()).filter(Boolean);
}

export default async function Contact() {
  const wpPage = await fetchPageBySlug('contact-us', { acf_format: 'standard' });
  const acf = wpPage?.acf as ContactPageACF | undefined;
  const data: ContactPageACF = acf
    ? { ...CONTACT_FALLBACK, ...acf }
    : CONTACT_FALLBACK;

  const addressLines = normalizeAddressLines(data.address_lines);

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
              {stripHtml(data.page_title) || 'Contact Us'}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                {stripHtml(data.get_in_touch_heading) || 'Get in Touch'}
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                <span
                  className="[&_p]:mb-4 [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtmlWithBreaks(data.get_in_touch_text),
                  }}
                />{' '}
                <Link
                  className="underline hover:no-underline"
                  href={`mailto:${data.contact_email ?? 'info@blackyouthproject.com'}`}
                >
                  {data.contact_email ?? 'info@blackyouthproject.com'}
                </Link>
                .
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                {stripHtml(data.contact_info_heading) || 'Contact Information'}
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
                      href={`mailto:${data.contact_email ?? 'info@blackyouthproject.com'}`}
                    >
                      {data.contact_email ?? 'info@blackyouthproject.com'}
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
                    {addressLines.length > 0 ? (
                      <>
                        {addressLines.slice(0, 3).map((line, i) => (
                          <span key={i}>
                            {stripHtml(line)}
                            <br />
                          </span>
                        ))}
                        <span className="font-normal">
                          {addressLines.slice(3).map((line, i) => (
                            <span key={i}>
                              {stripHtml(line)}
                              <br />
                            </span>
                          ))}
                        </span>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
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
                {(data.faq_items ?? []).map((item, i) => (
                  <div key={i}>
                    <h4
                      className="text-xl font-medium mb-2"
                      style={{ fontFamily: 'Gill Sans' }}
                    >
                      {stripHtml(item.question)}
                    </h4>
                    <div
                      className="text-xl [&_a]:underline [&_a:hover]:no-underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                      style={{ fontFamily: 'Playfair' }}
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtmlWithBreaks(item.answer),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
