import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Terms() {
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
              Terms of Service
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Acceptance of Terms
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement. If you do
                not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Use License
              </h3>
              <div>
                <p className="text-xl mb-4" style={{ fontFamily: 'Playfair' }}>
                  Permission is granted to temporarily download one copy of the
                  materials (information or software) on BYP&apos;s website for
                  personal, non-commercial transitory viewing only.
                </p>
                <p className="text-xl mb-2" style={{ fontFamily: 'Playfair' }}>
                  This is the grant of a license, not a transfer of title, and
                  under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-1">
                  <li className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Modify or copy the materials
                  </li>
                  <li className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Use the materials for any commercial purpose or for any
                    public display
                  </li>
                  <li className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Attempt to reverse engineer any software contained on the
                    website
                  </li>
                  <li className="text-xl" style={{ fontFamily: 'Playfair' }}>
                    Remove any copyright or other proprietary notations from the
                    materials
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                User Content
              </h3>
              <div>
                <p className="text-xl mb-4" style={{ fontFamily: 'Playfair' }}>
                  Users may submit content to our platform. By submitting
                  content, you grant us a worldwide, non-exclusive, royalty-free
                  license to use, reproduce, modify, and distribute your
                  content.
                </p>
                <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                  You are responsible for ensuring that your content does not
                  violate any third-party rights or applicable laws.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Privacy Policy
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                Your privacy is important to us. Please review our Privacy
                Policy, which also governs your use of the Service, to
                understand our practices regarding the collection and use of
                your personal information.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Disclaimers
              </h3>
              <div>
                <p className="text-xl mb-4" style={{ fontFamily: 'Playfair' }}>
                  The materials on BYP&apos;s website are provided on an
                  &apos;as is&apos; basis. BYP makes no warranties, expressed or
                  implied, and hereby disclaims and negates all other warranties
                  including without limitation, implied warranties or conditions
                  of merchantability, fitness for a particular purpose, or
                  non-infringement of intellectual property or other violation
                  of rights.
                </p>
                <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                  Further, BYP does not warrant or make any representations
                  concerning the accuracy, likely results, or reliability of the
                  use of the materials on its website or otherwise relating to
                  such materials or on any sites linked to this site.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Limitations
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                In no event shall BYP or its suppliers be liable for any damages
                (including, without limitation, damages for loss of data or
                profit, or due to business interruption) arising out of the use
                or inability to use the materials on BYP&apos;s website, even if
                BYP or a BYP authorized representative has been notified orally
                or in writing of the possibility of such damage.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Revisions and Errata
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                The materials appearing on BYP&apos;s website could include
                technical, typographical, or photographic errors. BYP does not
                warrant that any of the materials on its website are accurate,
                complete, or current. BYP may make changes to the materials
                contained on its website at any time without notice.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Contact Information
              </h3>
              <p className="text-xl" style={{ fontFamily: 'Playfair' }}>
                If you have any questions about these Terms of Service, please
                contact us at info@blackyouthproject.com.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
