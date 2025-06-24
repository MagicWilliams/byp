'use client';

import { useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useSiteStore } from '../lib/store';

export default function BlackLifeEverywhere() {
  const {
    blackLifeEverywherePosts,
    blackLifeEverywhereLoading,
    blackLifeEverywhereError,
    issues,
    fetchIssues,
    issuesLoading,
    issuesError,
    fetchBlackLifeEverywherePosts,
  } = useSiteStore();

  useEffect(() => {
    // Fetch Black Life Everywhere posts
    if (!blackLifeEverywherePosts.length) {
      fetchBlackLifeEverywherePosts();
    }
  }, [fetchBlackLifeEverywherePosts, blackLifeEverywherePosts.length]);

  useEffect(() => {
    // Fetch issues
    if (!issues.length) {
      fetchIssues();
    }
  }, [fetchIssues, issues.length]);

  // Log the posts and issues to console
  useEffect(() => {
    if (blackLifeEverywherePosts.length > 0) {
      console.log('Black Life Everywhere Posts:', blackLifeEverywherePosts);
    }
  }, [blackLifeEverywherePosts]);

  useEffect(() => {
    if (issues.length > 0) {
      console.log('Issues:', issues);
    }
  }, [issues]);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <main>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-4xl font-bold text-white mb-8">
            Black Life Everywhere
          </h1>

          {/* Posts Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Posts</h2>
            {blackLifeEverywhereLoading && (
              <div className="text-white">
                Loading Black Life Everywhere posts...
              </div>
            )}

            {blackLifeEverywhereError && (
              <div className="text-red-500">
                Error: {blackLifeEverywhereError}
              </div>
            )}

            {!blackLifeEverywhereLoading && !blackLifeEverywhereError && (
              <div className="text-white">
                <p>Found {blackLifeEverywherePosts.length} posts</p>
                <p>Check the console for post details</p>
              </div>
            )}
          </div>

          {/* Issues Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">Issues</h2>
            {issuesLoading && (
              <div className="text-white">Loading issues...</div>
            )}

            {issuesError && (
              <div className="text-red-500">Error: {issuesError}</div>
            )}

            {!issuesLoading && !issuesError && (
              <div className="text-white">
                <p>Found {issues.length} issues</p>
                <p>Check the console for issue details</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
