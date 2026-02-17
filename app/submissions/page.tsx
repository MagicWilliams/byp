import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  fetchPageBySlug,
  type SubmissionsPageACF,
} from '../lib/wordpress';
import { sanitizeHtmlWithBreaks, stripHtml } from '../lib/sanitize';

const SUBMISSIONS_FALLBACK: SubmissionsPageACF = {
  page_title: 'Submit Your Content',
  guidelines_heading: 'Submission Guidelines',
  guidelines_text:
    'We welcome submissions from creators, writers, and contributors who want to share their work with our community. Please review our guidelines before submitting your content. All submissions are reviewed by our editorial team and must meet our quality standards and community guidelines.',
  content_types: [
    {
      type_name: 'Articles',
      description:
        'Well-researched articles on topics relevant to our community. Word count: 500-2000 words.',
    },
    {
      type_name: 'Opinion Pieces',
      description:
        'Thoughtful commentary and analysis on current events or industry trends.',
    },
    {
      type_name: 'Creative Writing',
      description:
        'Short stories, poetry, and other creative content that resonates with our audience.',
    },
    {
      type_name: 'Visual Content',
      description:
        'Infographics, illustrations, and other visual content that enhances our platform.',
    },
  ],
  requirements: [
    'Content must be original and not previously published elsewhere',
    'All sources must be properly cited and referenced',
    'Content should be well-written, engaging, and relevant to our audience',
    'Images and media must be properly licensed or original work',
    'Submissions must comply with our community guidelines',
    'Include a brief author bio with your submission',
  ],
  process_steps: [
    {
      step_number: 1,
      title: 'Prepare Your Content',
      description:
        'Ensure your content meets our guidelines and is ready for submission.',
    },
    {
      step_number: 2,
      title: 'Submit Online',
      description:
        'Use our online submission form to upload your content and provide necessary information.',
    },
    {
      step_number: 3,
      title: 'Review Process',
      description:
        'Our editorial team will review your submission and provide feedback within 2-3 weeks.',
    },
    {
      step_number: 4,
      title: 'Publication',
      description:
        'If approved, your content will be published on our platform with proper attribution.',
    },
  ],
  contact_heading: 'Questions?',
  contact_email: 'submissions@byp.com',
  contact_text:
    "If you have any questions about our submission process or guidelines, please don't hesitate to contact us at submissions@byp.com. We're here to help you share your work with our community.",
};

function normalizeRequirements(
  requirements?: string | string[]
): string[] {
  if (!requirements) return [];
  if (Array.isArray(requirements)) return requirements;
  return requirements
    .split(/\n/)
    .map((s) => s.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);
}

export default async function Submissions() {
  const wpPage = await fetchPageBySlug('submissions', {
    acf_format: 'standard',
  });
  const acf = wpPage?.acf as SubmissionsPageACF | undefined;
  const data: SubmissionsPageACF = acf
    ? { ...SUBMISSIONS_FALLBACK, ...acf }
    : SUBMISSIONS_FALLBACK;

  const requirements = normalizeRequirements(data.requirements);

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
              {stripHtml(data.page_title) || 'Submit Your Content'}
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                {stripHtml(data.guidelines_heading) || 'Submission Guidelines'}
              </h3>
              <div
                className="text-xl [&_a]:underline [&_a:hover]:no-underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                style={{ fontFamily: 'Playfair' }}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtmlWithBreaks(data.guidelines_text),
                }}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Content Types We Accept
              </h3>
              <div className="grid grid-cols-2 gap-8">
                {(data.content_types ?? []).map((ct, i) => (
                  <div key={i}>
                    <h4
                      className="text-lg font-medium mb-2"
                      style={{ fontFamily: 'Gill Sans' }}
                    >
                      {stripHtml(ct.type_name)}
                    </h4>
                    <div
                      className="text-xl [&_a]:underline [&_a:hover]:no-underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                      style={{ fontFamily: 'Playfair' }}
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtmlWithBreaks(ct.description),
                      }}
                    />
                  </div>
                ))}
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
                  {requirements.map((item, i) => (
                    <li
                      key={i}
                      className="text-xl"
                      style={{ fontFamily: 'Playfair' }}
                    >
                      {stripHtml(item)}
                    </li>
                  ))}
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
                {(data.process_steps ?? []).map((step, i) => (
                  <div
                    key={i}
                    className="flex items-start space-x-4"
                  >
                    <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {step.step_number ?? i + 1}
                    </div>
                    <div>
                      <h4
                        className="text-lg font-medium mb-1"
                        style={{ fontFamily: 'Gill Sans' }}
                      >
                        {stripHtml(step.title)}
                      </h4>
                      <div
                        className="text-xl [&_a]:underline [&_a:hover]:no-underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                        style={{ fontFamily: 'Playfair' }}
                        dangerouslySetInnerHTML={{
                          __html: sanitizeHtmlWithBreaks(step.description),
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                {stripHtml(data.contact_heading) || 'Questions?'}
              </h3>
              <div
                className="text-xl [&_a]:underline [&_a:hover]:no-underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                style={{ fontFamily: 'Playfair' }}
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtmlWithBreaks(data.contact_text),
                }}
              />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
