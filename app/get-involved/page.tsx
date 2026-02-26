import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import {
  fetchPageBySlug,
  type GetInvolvedPageACF,
} from '../lib/wordpress';
import { sanitizeHtmlWithBreaks, stripHtml } from '../lib/sanitize';

const GET_INVOLVED_FALLBACK: GetInvolvedPageACF = {
  page_title: 'Get Involved',
  intro_heading: 'Welcome to Our Jobs Page!',
  intro_text: `We are a team of 18-35 year old writers, storytellers, artists,
activists, and scholars who focus on the intersections of
current events, race, gender, and class.

Periodically, we have writing and social media coordinator
positions available on our staff.

There are no currently available positions at this time.`,
  pitch_heading: 'Pitch an Original Article',
  pitch_text: `We love to host content from new and emerging millennial
voices on pop culture, LGBTQIA+ issues, politics, feminism,
and many other topics. Pitches should include an estimated
word count and summary about how the piece aligns with
BYP's mission and voice.

All pitches should be sent to`,
  pitch_email: 'info@blackyouthproject.com',
  republish_heading: 'Republished Content',
  republish_text: `If interested in republishing content you have already
written, you should follow a traditional pitching approach and
write a brief summary to help us understand how your content
aligns with BYP's voice and mission. Your submission
should include a link to the content on a platform you own (or
have authority to grant reposting permission for). You should
also include an author bio.

All submissions should be sent to`,
  republish_email: 'info@blackyouthproject.com',
  submissions_link: '/submissions',
};

function getImageUrl(
  img: { url?: string; id?: number } | string | undefined
): string | null {
  if (!img) return null;
  if (typeof img === 'string') return img;
  return img.url ?? null;
}

export default async function GetInvolved() {
  const wpPage = await fetchPageBySlug('get-involved', {
    acf_format: 'standard',
  });
  const acf = wpPage?.acf as GetInvolvedPageACF | undefined;
  const data: GetInvolvedPageACF = acf
    ? { ...GET_INVOLVED_FALLBACK, ...acf }
    : GET_INVOLVED_FALLBACK;

  const heroImageUrl = getImageUrl(data.hero_image);

  return (
    <div className="min-h-screen w-full bg-[url('/img/bkg.png')] bg-fixed bg-cover bg-center bg-no-repeat">
      <Header />
      <div className="w-full h-[500px] relative">
        <Image
          src={heroImageUrl ?? '/img/get_involved.jpg'}
          alt="Get Involved"
          fill
          className="object-cover"
        />
      </div>
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-lg">
          <section className="mb-8 text-white flex flex-col gap-8">
            <h1
              className="text-3xl font-medium py-8"
              style={{ fontFamily: 'Playfair' }}
            >
              {stripHtml(data.page_title) || 'Get Involved'}
            </h1>
            <div className="flex flex-col gap-4 mb-8 sm:mb-12 w-[70%]">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Playfair' }}
              >
                {stripHtml(data.intro_heading) || 'Welcome to Our Jobs Page!'}
              </h3>
              <div
                className="text-xl text-white [&_a]:text-blue-300 [&_a:hover]:text-blue-200 [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                style={{ fontFamily: 'Playfair' }}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtmlWithBreaks(data.intro_text),
                }}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-8 mb-8 bg-black/50 p-8 rounded-lg">
              <div className="flex flex-col gap-4 flex-1">
                <h3
                  className="text-xl font-medium"
                  style={{ fontFamily: 'Playfair' }}
                >
                  {stripHtml(data.pitch_heading) || 'Pitch an Original Article'}
                </h3>
                <div
                  className="text-xl text-white [&_a]:text-blue-300 [&_a:hover]:text-blue-200 [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                  style={{ fontFamily: 'Playfair' }}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtmlWithBreaks(data.pitch_text),
                  }}
                />
                {' '}
                <Link
                  className="text-xl underline hover:no-underline text-blue-300 hover:text-blue-200"
                  href={`mailto:${data.pitch_email ?? 'info@blackyouthproject.com'}`}
                  style={{ fontFamily: 'Playfair' }}
                >
                  {data.pitch_email ?? 'info@blackyouthproject.com'}
                </Link>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <h3
                  className="text-xl font-medium"
                  style={{ fontFamily: 'Playfair' }}
                >
                  {stripHtml(data.republish_heading) || 'Republished Content'}
                </h3>
                <div
                  className="text-xl text-white [&_a]:text-blue-300 [&_a:hover]:text-blue-200 [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                  style={{ fontFamily: 'Playfair' }}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtmlWithBreaks(data.republish_text),
                  }}
                />
                {' '}
                <Link
                  className="text-xl underline hover:no-underline text-blue-300 hover:text-blue-200"
                  href={`mailto:${data.republish_email ?? 'info@blackyouthproject.com'}`}
                  style={{ fontFamily: 'Playfair' }}
                >
                  {data.republish_email ?? 'info@blackyouthproject.com'}
                </Link>
                <br />
                <br />
                <span className="text-xl text-white" style={{ fontFamily: 'Playfair' }}>
                  Learn more about submitting to BYP on our official{' '}
                  <Link
                    className="underline hover:no-underline text-blue-300 hover:text-blue-200"
                    href={data.submissions_link ?? '/submissions'}
                  >
                    submissions page
                  </Link>
                </span>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
