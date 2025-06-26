import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchBlackLifeEverywhereIssues } from '../lib/wordpress';
import IssuesGrid from '../components/IssuesGrid';

export default async function BlackLifeEverywhere() {
  const bleIssues = await fetchBlackLifeEverywhereIssues();

  return (
    <div className="min-h-screen bg-black w-full">
      <Header slug="BLE" />

      <main>
        {/* Hero Section */}
        {bleIssues.length > 0 && (
          <section className="relative overflow-hidden md:py-12 lg:py-16">
            {/* Background Image with Overlay */}
            {bleIssues[0].featured_image_url && (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${bleIssues[0].featured_image_url})`,
                  }}
                />
                <div className="absolute inset-0 bg-black/80" />
              </>
            )}

            {/* Content */}
            <div className="relative z-10 p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                {/* Right Column (Image) - appears first on mobile */}
                {bleIssues[0].featured_image_url && (
                  <div className="flex-1 flex items-center justify-center order-1 lg:order-2 mb-6 lg:mb-0">
                    <img
                      src={bleIssues[0].featured_image_url}
                      alt={bleIssues[0].title.rendered}
                      className="shadow-lg object-cover w-full h-96 max-h-[28rem]"
                      style={{ background: '#222' }}
                    />
                  </div>
                )}
                {/* Left Column - appears after image on mobile */}
                <div className="flex-1 flex flex-col justify-center order-2 lg:order-1">
                  <span
                    className="text-gray-400 text-lg mb-2 font-serif"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    Latest Edition
                  </span>
                  <h1
                    className="text-3xl md:text-4xl font-bold mb-2"
                    style={{
                      fontFamily:
                        'Gill Sans, GillSans, Gill Sans MT, Calibri, sans-serif',
                      fontWeight: 'bold',
                    }}
                  >
                    {bleIssues[0].title.rendered}
                  </h1>
                  <span
                    className="text-gray-400 text-base mb-4 font-serif"
                    style={{ fontFamily: 'Playfair Display, serif' }}
                  >
                    {new Date(bleIssues[0].date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                  <div
                    className="text-white text-base mb-6 w-[80%]"
                    dangerouslySetInnerHTML={{
                      __html: bleIssues[0].content.rendered,
                    }}
                  />
                  <button className="bg-purple-700 hover:bg-purple-800 text-white px-6 py-2 rounded font-medium transition-colors w-fit">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Issues Grid (Client Component) */}
        {bleIssues.length > 0 && <IssuesGrid issues={bleIssues} />}

        {/* Empty State */}
        {bleIssues.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-500 text-2xl mb-4">No issues found</div>
            <p className="text-gray-600 max-w-md mx-auto">
              Black Life Everywhere issues will appear here once they're
              published.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
