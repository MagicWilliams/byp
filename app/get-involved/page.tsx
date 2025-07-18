import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function GetInvolved() {
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
              Get Involved
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Welcome to Our Jobs Page!
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                We are a team of 18-35 year old writers, storytellers, artists,
                activists, and scholars who focus on the intersections of
                current events, race, gender, and class.
                <br />
                <br />
                Periodically, we have writing and social media coordinator
                positions available on our staff.
                <br />
                <br />
                There are no currently available positions at this time.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Pitch an Original Article
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                We love to host content from new and emerging millennial voices
                on pop culture, LGBTQIA+ issues, politics, feminism, and many
                other topics. Pitches should include an estimated word count and
                summary about how the piece aligns with BYP’s mission and voice.
                <br />
                <br />
                All pitches should be sent to{' '}
                <Link
                  className="underline hover:no-underline"
                  href="mailto:info@blackyouthproject.com"
                >
                  info@blackyouthproject.com
                </Link>
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Republished Content
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                If interested in republishing content you have already written,
                you should follow a traditional pitching approach and write a
                brief summary to help us understand how your content aligns with
                BYP’s voice and mission. Your submission should include a link
                to the content on a platform you own (or have authority to grant
                reposting permission for). You should also include an author
                bio.
                <br />
                <br />
                All submissions should be sent to{' '}
                <Link
                  className="underline hover:no-underline"
                  href="mailto:info@blackyouthproject.com"
                >
                  info@blackyouthproject.com
                </Link>
                <br />
                <br />
                Learn more about submitting to BYP on our official submissions
                page.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
