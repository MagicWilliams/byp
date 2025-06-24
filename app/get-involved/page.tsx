import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function GetInvolved() {
  const exampleTeam = [
    { name: 'John Doe', title: 'CEO', image: '/img/person.png' },
    { name: 'Jane Doe', title: 'CTO', image: '/img/person.png' },
    { name: 'Jim Doe', title: 'CFO', image: '/img/person.png' },
  ];
  return (
    <div className="min-h-screen bg-white w-full">
      <Header />
      <main className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-lg">
          <section className="mb-8 text-black">
            <h1
              className="text-3xl font-medium mb-8"
              style={{ fontFamily: 'Gill Sans' }}
            >
              Get Involved
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-lg font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Mission Statement
              </h3>
              <p className="text-lg" style={{ fontFamily: 'Playfair' }}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-lg font-medium"
                style={{ fontFamily: 'Gill Sans' }}
              >
                Our History
              </h3>
              <p className="text-lg" style={{ fontFamily: 'Playfair' }}>
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                sunt in culpa qui officia deserunt mollit anim id est laborum."
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_3fr] gap-4 mb-8">
              <h3
                className="text-lg font-medium"
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
