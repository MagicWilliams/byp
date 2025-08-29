import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
export default function GetInvolved() {
  return (
    <div className="min-h-screen w-full bg-[url('/img/bkg.png')] bg-fixed bg-cover bg-center bg-no-repeat">
      <Header />
      <div className="w-full h-[500px] relative">
        <Image
          src="/img/get_involved.jpg"
          alt="Get Involved"
          fill
          objectFit="cover"
        />
      </div>
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-lg">
          <section className="mb-8 text-white flex flex-col gap-8">
            <h1
              className="text-3xl font-medium py-8"
              style={{ fontFamily: 'Playfair' }}
            >
              Get Involved
            </h1>
            <div className="flex flex-col gap-4 mb-8 sm:mb-12 w-[70%]">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Playfair' }}
              >
                Welcome to Our Jobs Page!
              </h3>
              <p
                className="text-xl text-white"
                style={{ fontFamily: 'Playfair' }}
              >
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
            <div className="flex flex-col sm:flex-row gap-8 mb-8 bg-black/50 p-8 rounded-lg">
              <div className="flex flex-col gap-4 flex-1">
                <h3
                  className="text-xl font-medium"
                  style={{ fontFamily: 'Playfair' }}
                >
                  Pitch an Original Article
                </h3>
                <p
                  className="text-xl text-white"
                  style={{ fontFamily: 'Playfair' }}
                >
                  We love to host content from new and emerging millennial
                  voices on pop culture, LGBTQIA+ issues, politics, feminism,
                  and many other topics. Pitches should include an estimated
                  word count and summary about how the piece aligns with
                  BYP&apos;s mission and voice.
                  <br />
                  <br />
                  All pitches should be sent to{' '}
                  <Link
                    className="underline hover:no-underline text-blue-300 hover:text-blue-200"
                    href="mailto:info@blackyouthproject.com"
                  >
                    info@blackyouthproject.com
                  </Link>
                </p>
              </div>
              <div className="flex flex-col gap-4 flex-1">
                <h3
                  className="text-xl font-medium"
                  style={{ fontFamily: 'Playfair' }}
                >
                  Republished Content
                </h3>
                <p
                  className="text-xl text-white"
                  style={{ fontFamily: 'Playfair' }}
                >
                  If interested in republishing content you have already
                  written, you should follow a traditional pitching approach and
                  write a brief summary to help us understand how your content
                  aligns with BYP&apos;s voice and mission. Your submission
                  should include a link to the content on a platform you own (or
                  have authority to grant reposting permission for). You should
                  also include an author bio.
                  <br />
                  <br />
                  All submissions should be sent to{' '}
                  <Link
                    className="underline hover:no-underline text-blue-300 hover:text-blue-200"
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
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
