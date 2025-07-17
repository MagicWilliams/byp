import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Submissions() {
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
              Submit Your Content
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Submission Guidelines
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                We welcome submissions from creators, writers, and contributors
                who want to share their work with our community. Please review
                our guidelines before submitting your content. All submissions
                are reviewed by our editorial team and must meet our quality
                standards and community guidelines.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Content Types We Accept
              </h3>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Articles
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Well-researched articles on topics relevant to our
                    community. Word count: 500-2000 words.
                  </p>
                </div>
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Opinion Pieces
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Thoughtful commentary and analysis on current events or
                    industry trends.
                  </p>
                </div>
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Creative Writing
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Short stories, poetry, and other creative content that
                    resonates with our audience.
                  </p>
                </div>
                <div>
                  <h4
                    className="text-lg font-medium mb-2"
                    style={{ fontFamily: 'Gill Sans' }}
                  >
                    Visual Content
                  </h4>
                  <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Infographics, illustrations, and other visual content that
                    enhances our platform.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Submission Requirements
              </h3>
              <div className="bg-gray-100 rounded-lg p-6">
                <ul className="list-disc list-inside space-y-2">
                  <li className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Content must be original and not previously published
                    elsewhere
                  </li>
                  <li className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    All sources must be properly cited and referenced
                  </li>
                  <li className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Content should be well-written, engaging, and relevant to
                    our audience
                  </li>
                  <li className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Images and media must be properly licensed or original work
                  </li>
                  <li className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Submissions must comply with our community guidelines
                  </li>
                  <li className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Include a brief author bio with your submission
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Submission Process
              </h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4
                      className="text-lg font-medium mb-1"
                      style={{ fontFamily: 'Gill Sans' }}
                    >
                      Prepare Your Content
                    </h4>
                    <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                      Ensure your content meets our guidelines and is ready for
                      submission.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4
                      className="text-lg font-medium mb-1"
                      style={{ fontFamily: 'Gill Sans' }}
                    >
                      Submit Online
                    </h4>
                    <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                      Use our online submission form to upload your content and
                      provide necessary information.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4
                      className="text-lg font-medium mb-1"
                      style={{ fontFamily: 'Gill Sans' }}
                    >
                      Review Process
                    </h4>
                    <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                      Our editorial team will review your submission and provide
                      feedback within 2-3 weeks.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4
                      className="text-lg font-medium mb-1"
                      style={{ fontFamily: 'Gill Sans' }}
                    >
                      Publication
                    </h4>
                    <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                      If approved, your content will be published on our
                      platform with proper attribution.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Questions?
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                If you have any questions about our submission process or
                guidelines, please don&apos;t hesitate to contact us at
                submissions@byp.com. We&apos;re here to help you share your work
                with our community.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
