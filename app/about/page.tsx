import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function About() {
  const exampleTeam = [
    { name: 'John Doe', title: 'CEO', image: '/img/person.png' },
    { name: 'Jane Doe', title: 'CTO', image: '/img/person.png' },
    { name: 'Jim Doe', title: 'CFO', image: '/img/person.png' },
  ];
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
              About Us
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4  mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Mission Statement
              </h3>
              <p className="text-lg" style={{ fontFamily: 'Playfair' }}>
                The Black Youth Project will examine the attitudes, resources,
                and culture of the young, urban black millennial, exploring how
                these factors and others influence their decision-making, norms,
                and behavior in critical domains such as sex, health, and
                politics. Arguably more than any other subgroup of Americans,
                African American youth reflect the challenges of inclusion and
                empowerment in the post–civil rights period. At the core of this
                project will be an exploration of what young black Americans
                think about the political, cultural, and sexual choices and
                challenges confronting them and their peer group. We are
                especially interested in understanding what new factors help to
                shape or contribute to the social and political attitudes and
                behaviors of African American youth.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Our Guiding Principles
              </h3>
              <div>
                <p className="text-lg mb-4" style={{ fontFamily: 'Playfair' }}>
                  We are committed to producing research about the ideas,
                  attitudes, decision making, and lived experiences of black
                  youth, especially as it relates to their political and civic
                  engagement.
                </p>
                <p className="text-lg mb-4" style={{ fontFamily: 'Playfair' }}>
                  Unlike any other organization, we amplify the perspectives of
                  young black people daily without censorship or control. We
                  have built a space on the Internet where black youth can speak
                  for themselves about the issues that concern them.
                </p>
                <p className="text-lg mb-4" style={{ fontFamily: 'Playfair' }}>
                  Informed with culturally-specific knowledge, we will work to
                  mobilize black youth and their allies to make positive change
                  and build the world within which they want to live.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-xl font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Our Team
              </h3>
              <div className="grid grid-cols-2 gap-8">
                {exampleTeam.map(person => (
                  <div key={person.name}>
                    <Image
                      className="mb-2"
                      src={person.image}
                      alt={person.name}
                      width={400}
                      height={400}
                    />
                    <p className="text-lg" style={{ fontFamily: 'Playfair' }}>
                      {person.name}
                    </p>
                    <p className="text-lg" style={{ fontFamily: 'Playfair' }}>
                      {person.title}
                    </p>
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
