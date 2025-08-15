import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function About() {
  const exampleTeam = [
    { name: 'John Doe', title: 'CEO', image: '/img/person.png' },
    { name: 'Jane Doe', title: 'CTO', image: '/img/person.png' },
    { name: 'Jim Doe', title: 'CFO', image: '/img/person.png' },
    { name: 'Janet Doe', title: 'CEO', image: '/img/person.png' },
    { name: 'Jamie Doe', title: 'CTO', image: '/img/person.png' },
    { name: 'Jill Doe', title: 'CFO', image: '/img/person.png' },
  ];
  return (
    <div className="min-h-screen w-full bg-[url('/img/bkg.png')] bg-fixed bg-cover bg-center bg-no-repeat">
      <Header />
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="rounded-lg">
          <section className="mb-8 text-white flex flex-col gap-8">
            <h1
              className="text-3xl font-medium py-8 text-center"
              style={{ fontFamily: 'Playfair Display' }}
            >
              About Us
            </h1>
            <h3 className="w-[90%] mx-auto max-w-7xl text-[2rem] mb-8 text-center text-white">
              The Black Youth Project will examine the attitudes, resources, and
              culture of the young, urban black millennial, exploring how these
              factors and others influence their decision-making, norms, and
              behavior in critical domains such as sex, health, and politics.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:mb-8">
              <div className="sm:border-r sm:border-gray-600 sm:pr-4">
                <p
                  className="text-lg text-white"
                  style={{ fontFamily: 'Playfair' }}
                >
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur.
                </p>
              </div>
              <div className="w-full h-full flex justify-center items-center sm:pl-4">
                <Image
                  src="/img/community.png"
                  alt="Black Youth Project"
                  width={500}
                  height={500}
                />
              </div>
            </div>
            <div className="flex flex-col gap-8 mb-12 bg-black/50 p-8 rounded-lg">
              <h3 className="text-[2rem]" style={{ fontFamily: 'Playfair' }}>
                Our Team
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                {exampleTeam.map(person => (
                  <div key={person.name}>
                    <Image
                      className="mb-2"
                      src={person.image}
                      alt={person.name}
                      width={400}
                      height={400}
                    />
                    <p
                      className="text-lg text-white"
                      style={{ fontFamily: 'Playfair' }}
                    >
                      {person.name}
                    </p>
                    <p
                      className="text-lg text-white"
                      style={{ fontFamily: 'Playfair' }}
                    >
                      {person.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8 bg-black/50 p-8 rounded-lg">
              <h3 className="text-[2rem]" style={{ fontFamily: 'Playfair' }}>
                Our Programs
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-4">
                  <h4
                    className="text-[1.5rem] font-medium"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    The Black Youth Project
                  </h4>
                  <p
                    className="text-lg text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p
                    className="text-lg text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h4
                    className="text-[1.5rem] font-medium"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Black Life Everywhere
                  </h4>
                  <p
                    className="text-lg text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <Link
                    className="text-lg underline text-blue-300 hover:text-blue-200"
                    href="/black-life-everywhere"
                    style={{
                      fontFamily: 'Playfair',
                    }}
                  >
                    Visit Black Life Everywhere →
                  </Link>
                </div>
                <div></div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
