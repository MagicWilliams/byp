import Header from '../components/Header';
import Footer from '../components/Footer';
import { fetchBlackLifeEverywhereIssues } from '../lib/wordpress';
import IssuesGrid from '../components/IssuesGrid';
import NewestArticles from '../components/NewestArticles';
import BLEHero from '../components/BLEHero';

export default async function BlackLifeEverywhere() {
  const bleIssues = await fetchBlackLifeEverywhereIssues();

  return (
    <div className="min-h-screen bg-black w-full">
      <Header slug="BLE" />

      <main>
        {/* Magazine Cover Hero */}
        {bleIssues.length > 0 && <BLEHero issue={bleIssues[0]} />}

        {/* Issues Grid (Client Component) */}
        {bleIssues.length > 0 && <IssuesGrid issues={bleIssues} />}

        {/* Empty State */}
        {bleIssues.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-500 text-2xl mb-4">No issues found</div>
            <p className="text-gray-600 max-w-md mx-auto">
              Black Life Everywhere issues will appear here once they&apos;re
              published.
            </p>
          </div>
        )}

        <div className="w-full mx-auto">
          <NewestArticles page="ble" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
