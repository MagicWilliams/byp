import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
export default function About() {
  return (
    <div className="min-h-screen w-full bg-[url('/img/bkg.png')] bg-cover bg-no-repeat bg-attachment-fixed">
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
              The Black Youth Project was founded in 2005 by Black feminist
              scholar Professor Cathy Cohen to center the lives, struggles, and
              visions of Black youth. What began as a national research study
              has grown into an ecosystem that makes Black youth knowledge,
              culture, and resistance impossible to ignore.
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:mb-8">
              <div className="sm:border-r sm:border-gray-600 sm:pr-4">
                <p
                  className="text-lg text-white"
                  style={{ fontFamily: 'Playfair' }}
                >
                  Through our research arm, GenForward, we produce survey data
                  on young people of color nationwide. One of our anchor
                  projects, Black Life Everywhere, aims to reflect the insights
                  of this data into analysis, media, art, and curricula that
                  amplify Black Gen Z and millennial voices—equipping
                  organizers, educators, journalists, academics and young adults
                  themselves with tools for understanding and liberation.
                  <br />
                  <br />
                  In the multiple forms of expression found throughout the
                  projects of the Black Youth Project, the audiences will see
                  how Black youth confront the ongoing failures of American
                  democracy: policing, health inequities, economic abandonment,
                  sexual politics, and more. Our work exposes what institutions
                  refuse to admit: Black youth are not only shaped by these
                  crises—they are shaping the responses, strategies, and visions
                  that will define our collective future. BYP is both archive
                  and arsenal. We publish commentary, cultural analysis,
                  political surveys, and art that highlight the diversity and
                  brilliance of Black people.
                  <br />
                  <br />
                  At its core, the Black Youth Project is a refusal: to let
                  Black people, especially young adults, be pathologized,
                  ignored, or reduced to stereotypes. We affirm them as
                  producers of knowledge, architects of culture, and leaders
                  shaping politics and resistance in real time.
                </p>
              </div>
              <div className="w-full sm:pl-4">
                <div className="relative w-full aspect-square">
                  <Image
                    src="/img/community.jpg"
                    alt="Black Youth Project"
                    fill
                    className="object-cover"
                    sizes="(min-width: 640px) 50vw, 100vw"
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-8 mb-12 bg-black/50 p-8 rounded-lg">
              <h3 className="text-[2rem]" style={{ fontFamily: 'Playfair' }}>
                Our Team
              </h3>
              <div className="grid md:grid-cols-2 gap-16">
                <div>
                  <div className="relative w-full aspect-square mb-4">
                    <Image
                      src="/img/cathy.jpg"
                      alt="Cathy Cohen"
                      fill
                      className="object-cover object-top"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <h3
                    className="text-2xl mb-2 text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Cathy Cohen
                  </h3>
                  <p
                    className="text-lg text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Cathy J. Cohen is the D. Gale Johnson Distinguished Service
                    Professor of Political Science and inaugural Chair of the
                    Department of Race, Diaspora, and Indigeneity. She has
                    served as the Deputy Provost for Graduate Education and is
                    the Director of the Center for the Study of Race, Politics,
                    and Culture. Cohen is the author of two books:{' '}
                    <Link
                      className="text-blue-300 hover:text-blue-200 underline"
                      href="https://global.oup.com/academic/product/democracy-remixed-9780199896264"
                      target="_blank"
                    >
                      Democracy Remixed: Black Youth and the Future of American
                      Politics
                    </Link>{' '}
                    (Oxford University Press 2010) and{' '}
                    <Link
                      className="text-blue-300 hover:text-blue-200 underline"
                      href="https://press.uchicago.edu/ucp/books/book/chicago/B/bo3630260.html"
                      target="_blank"
                    >
                      The Boundaries of Blackness: AIDS and the Breakdown of
                      Black Politics
                    </Link>{' '}
                    (University of Chicago Press 1999), and co-editor with
                    Kathleen Jones and Joan Tronto of{' '}
                    <Link
                      className="text-blue-300 hover:text-blue-200 underline"
                      href="https://nyupress.org/9780814715581/women-transforming-politics/"
                      target="_blank"
                    >
                      Women Transforming Politics: An Alternative Reader
                    </Link>{' '}
                    (New York University 1997). Cohen is also the author of the
                    article &quot;Punks, Bulldaggers and Welfare Queens: The
                    Radical Potential of Queer Politics?&quot; and her work has
                    been published in numerous journals and edited volumes
                    including the American Political Science Review, GLQ, NOMOS,
                    and Social Text. Her general field of specialization is
                    American politics, although her research interests include
                    African-American politics, women and politics, lesbian and
                    gay politics, and social movements. She is also the founder
                    and Director of the Black Youth Project and the GenForward
                    Survey. Blackness: AIDS and the Breakdown of Black Politics
                    (University of Chicago Press 1999), and co-editor with
                    Kathleen Jones and Joan Tronto of Women Transforming
                    Politics: An Alternative Reader (New York University 1997).
                    Cohen is also the author of the article &quot;Punks,
                    Bulldaggers and Welfare Queens: The Radical Potential of
                    Queer Politics?&quot; and her work has been published in
                    numerous journals and edited volumes including the American
                    Political Science Review, GLQ, NOMOS, and Social Text. Her
                    general field of specialization is American politics,
                    although her research interests include African-American
                    politics, women and politics, lesbian and gay politics, and
                    social movements. She is also the founder and Director of
                    the Black Youth Project and the GenForward Survey.
                  </p>
                </div>
                <div>
                  <div className="relative w-full aspect-square mb-4">
                    <Image
                      src="/img/taji.jpg"
                      alt="Taji Chesimet"
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <h3
                    className="text-2xl mb-2 text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Taji Chesimet
                  </h3>
                  <p
                    className="text-lg text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Taji is a writer, performer, and community organizer. A 2024
                    graduate of the University of Chicago with a Bachelors in
                    Race, Diaspora, and Indigeneity, he concentrated on carceral
                    studies, social movements, and film. Originally from
                    Portland, OR he has been engaged in politics and community
                    building since high school. He was one of the former Chairs
                    of the Portland Committee on Community Engaged-Policing,
                    appointed by the Mayor of Portland. He was one of the
                    Directors/Founders of the youth-run organization Raising
                    Justice. Taji previously served on the Board of the
                    Restorative Justice Coalition of Oregon, the Local Public
                    Safety Coordinating Committee. He has supported the work of
                    Parole Illinois, Prison Neighborhood Arts+Education Project,
                    the ACLU of Oregon, Race Talks PDX, Pennsylvania Innocence
                    Project, Impact-Justice, Senator Akasha Lawrence-Spence (OR
                    D-18), and he advised on the mayoral campaign of Sarah
                    Iannarone, the 2020 Public Safety Task Force. With a
                    particular interest in community building, Taji aims to work
                    at the intersections of Performance, Abolition, and
                    Political Mobilization to fight for transformative justice
                    and end the systems of oppression impacting our communities.
                  </p>
                </div>
                <div>
                  <div className="relative w-full aspect-square mb-4">
                    <Image
                      src="/img/amber.jpg"
                      alt="Amber Butts"
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <h3
                    className="text-2xl mb-2 text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Amber Butts
                  </h3>
                  <p
                    className="text-lg text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Amber Butts is a Black mama, abolitionist, and advocate for
                    collective freedom and self-determination. Rooted in
                    Oakland, she moves through worlds of play and repair,
                    treating tenderness, nuance, and joy as abolitionist
                    strategies of survival and transformation. Her role as an
                    organizer is guided by expansive, nuanced visions of
                    Blackness that refuse constriction and one-dimensionality.
                    Her work—through cultural strategy, storytelling, and grief
                    practice—carries forward traditions of mutual aid,
                    imagination, and struggle across generations. Amber&apos;s
                    favorite freedom practice is observing how non-human beings
                    organize to confront power and protect one another, lessons
                    that shape her abolitionist commitments and her vision for
                    interdependent futures.
                  </p>
                </div>
                <div>
                  <div className="relative w-full aspect-square mb-4">
                    <Image
                      src="/img/jonathan.png"
                      alt="Jonathan Lykes"
                      fill
                      className="object-cover"
                      sizes="(min-width: 768px) 50vw, 100vw"
                    />
                  </div>
                  <h3
                    className="text-2xl mb-2 text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Jonathan Lykes
                  </h3>
                  <p
                    className="text-lg text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Jonathan Lykes is a Black queer artist, activist and
                    academic. His interdisciplinary approach to art, activism
                    and anti-oppression work, merges policy change, artistic
                    expression and activism. Combining these forms of social
                    transformation—and harnessing their synergy—Jonathan works
                    to create awareness, promote personal healing, surmount
                    institutional barriers and generate systemic change.
                    Jonathan&apos;s current position as Founder/Executive
                    Director of Liberation House merges his multidisciplinary
                    artistic background with public policy reform, community
                    engagement and systems change work to teach liberation
                    praxis by pushing the revolutionary edge of radical
                    transformative movement work. Lykes is also the Director of
                    Policy and Programs for Black Youth Project/GenForward
                    Survey. Lykes is also a co-founder of Black Youth Project
                    100 (BYP100), a movement of young adults using a Black Queer
                    Feminist lens to advocate for community and institutional
                    change. Through BYP100, Jonathan curated a freedom song and
                    chant album, The Black Joy Experience, helping to teach
                    holistic energy through the Black radical tradition. He
                    earned his bachelor&apos;s degree from the University of
                    Chicago, where he also received his master&apos;s degree
                    from the Crown School for Social Work and Policy. For more
                    info visit:{' '}
                    <Link
                      className="text-blue-300 hover:text-blue-200 underline"
                      href="https://liberationhouse.org"
                      target="_blank"
                    >
                      LiberationHouse.org
                    </Link>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-8 bg-black/50 p-8 rounded-lg">
              <h3 className="text-[2rem]" style={{ fontFamily: 'Playfair' }}>
                Our History
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    The Black Youth Project started as a national research
                    project in 2005 to examine and highlight the attitudes,
                    resources, and culture of African American youth ages 15 to
                    25. The focus of the work was on exploring the political and
                    civic attitudes, actions and culture of African American
                    youth, examining how these factors and others influence
                    their decision-making and normative assessments in critical
                    domains such as sex and politics, and using those insights
                    to develop creative and effective ways to facilitate the
                    political and civic empowerment of young black people and
                    other young people of color. Understanding the need to make
                    this data available to a wider constituency beyond the
                    academy Professor Cathy Cohen, the Black Youth Project’s
                    founder and principal investigator, decided to create an
                    online hub for Black young adults where scholars, educators,
                    community activists, allies, and youth could access the
                    study’s research summaries as well as have access to a
                    plethora of resources concerning the empowerment and
                    development of Black youth.
                  </p>
                </div>
                <div className="flex flex-col gap-4">
                  <h4
                    className="text-[1.5rem] font-medium"
                    style={{ color: 'transparent', fontFamily: 'Playfair' }}
                  >
                    Continued
                  </h4>
                  <p
                    className="text-lg text-white"
                    style={{ fontFamily: 'Playfair' }}
                  >
                    Over the years the website has significantly increased its
                    reach and impact. We have developed one of the only
                    platforms on the internet where the voices of black youth
                    and young adults are accurately represented without
                    censorship. Within the website, visitors can access research
                    summaries, read blogs about and by black youth, search an
                    extensive rap database, access black youth social justice
                    organizations, and download social justice curricula to
                    teach. We believe the BYP website is one of a small number
                    of new media sites that black youth can truly call their
                    own. Thus, the BYP stands as an example of a project working
                    to expand the human and social capital of young African
                    Americans and facilitating their full participation in the
                    democratic process.
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
