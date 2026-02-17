import Image from 'next/image';
import Link from 'next/link';
import Header from '../components/Header';
import Footer from '../components/Footer';
import {
  fetchPageBySlug,
  type AboutPageACF,
  type AboutTeamMember,
} from '../lib/wordpress';
import { sanitizeHtmlWithBreaks, stripHtml } from '../lib/sanitize';

const ABOUT_FALLBACK: AboutPageACF = {
  hero_title: 'About Us',
  hero_subtitle:
    'The Black Youth Project was founded in 2005 by Black feminist scholar Professor Cathy Cohen to center the lives, struggles, and visions of Black youth. What began as a national research study has grown into an ecosystem that makes Black youth knowledge, culture, and resistance impossible to ignore.',
  main_content: `Through our research arm, GenForward, we produce survey data on young people of color nationwide. One of our anchor projects, Black Life Everywhere, aims to reflect the insights of this data into analysis, media, art, and curricula that amplify Black Gen Z and millennial voices—equipping organizers, educators, journalists, academics and young adults themselves with tools for understanding and liberation.

In the multiple forms of expression found throughout the projects of the Black Youth Project, the audiences will see how Black youth confront the ongoing failures of American democracy: policing, health inequities, economic abandonment, sexual politics, and more. Our work exposes what institutions refuse to admit: Black youth are not only shaped by these crises—they are shaping the responses, strategies, and visions that will define our collective future. BYP is both archive and arsenal. We publish commentary, cultural analysis, political surveys, and art that highlight the diversity and brilliance of Black people.

At its core, the Black Youth Project is a refusal: to let Black people, especially young adults, be pathologized, ignored, or reduced to stereotypes. We affirm them as producers of knowledge, architects of culture, and leaders shaping politics and resistance in real time.`,
  team_members: [
    {
      name: 'Cathy Cohen',
      bio: 'Cathy J. Cohen is the D. Gale Johnson Distinguished Service Professor of Political Science and inaugural Chair of the Department of Race, Diaspora, and Indigeneity. She has served as the Deputy Provost for Graduate Education and is the Director of the Center for the Study of Race, Politics, and Culture. Cohen is the author of two books: Democracy Remixed: Black Youth and the Future of American Politics (Oxford University Press 2010) and The Boundaries of Blackness: AIDS and the Breakdown of Black Politics (University of Chicago Press 1999), and co-editor with Kathleen Jones and Joan Tronto of Women Transforming Politics: An Alternative Reader (New York University 1997). Cohen is also the author of the article "Punks, Bulldaggers and Welfare Queens: The Radical Potential of Queer Politics?" and her work has been published in numerous journals and edited volumes including the American Political Science Review, GLQ, NOMOS, and Social Text. Her general field of specialization is American politics, although her research interests include African-American politics, women and politics, lesbian and gay politics, and social movements. She is also the founder and Director of the Black Youth Project and the GenForward Survey.',
      image: '/img/cathy.jpg',
    },
    {
      name: 'Jenn M. Jackson, PhD',
      bio: "Jenn M. Jackson (they/them) is a genderflux androgynous Black woman, a lesbian, an abolitionist, a lover of all Black people, and an Assistant Professor at Syracuse University in the Department of Political Science. Jackson's primary research is in Black Politics with a focus on racial threat and trauma, gender and sexuality, political behavior, policing, and social movements. Jackson holds affiliate positions in African American Studies, Women's and Gender Studies, and LGBT Studies. They are a Senior Research Associate at The Campbell Public Affairs Institute at the Maxwell School at Syracuse University, as well. Jackson is the author of the book BLACK WOMEN TAUGHT US: AN INTIMATE HISTORY OF BLACK FEMINISM (Random House Press, 2024). The book is an intimate intellectual and political history of Black women's activism, movement organizing, and philosophical work that explores how women from Harriet Jacobs to Audre Lorde to the members of the Combahee River Collective, among others, have for centuries taught us how to fight for justice and radically reimagine a more just world for us all. Jackson's first academic book project POLICING BLACKNESS: THE POLITICAL STAKES OF INTERSECTIONAL THREAT (expected 2026) investigates the role of racial threat in influencing Black Americans' political behavior. Methodologically, they utilize quantitative analyses of survey data and experiments as well as qualitative analysis of 100 in-depth interviews with young Black Americans ages 18 to 35 to investigate both intergroup and intragroup differences in responses to and ideas about racial threat. Jackson finds that Black women are most likely to express concerns about police-based and intragroup threat. Comparatively, Black men vary drastically in their responses to threat depending on their sexual orientation, gender expression, and vulnerability to stereotypes. As a recipient of many prestigious honors and awards, Jackson is a 2020 recipient of the Tenth Decade grant ($20,000) and the CUSE Seed Grant ($5,000) funding their book research.",
      image: '/img/jenn.jpg',
    },
    {
      name: 'Amber Butts',
      bio: "Amber Butts is a Black mama, abolitionist, and advocate for collective freedom and self-determination. Rooted in Oakland, she moves through worlds of play and repair, treating tenderness, nuance, and joy as abolitionist strategies of survival and transformation. Her role as an organizer is guided by expansive, nuanced visions of Blackness that refuse constriction and one-dimensionality. Her work—through cultural strategy, storytelling, and grief practice—carries forward traditions of mutual aid, imagination, and struggle across generations. Amber's favorite freedom practice is observing how non-human beings organize to confront power and protect one another, lessons that shape her abolitionist commitments and her vision for interdependent futures.",
      image: '/img/amber.jpg',
    },
    {
      name: 'Everic White',
      bio: "Everic White is a digital journalist and social media strategist currently serving as lead curation editor for BBC Studios, where he manages the team programming the BBC.com homepage and app. Previously, he was a senior platform editor at the Wall Street Journal, leading nightside homepage, app, and alert production and strategy. Before that, he was deputy social media director at Forbes, where he supervised the social media team and developed social-first content for flagship lists, events, and editorial programming. From 2018 to 2021, he was a social media editor for Bloomberg Quicktake, creating enterprise, live, and breaking news content for social, digital, and OTT audiences. He has also held social and digital production roles at The Guardian US, NY1 News, POLITICO, FiOS1 News, and CNBC. Before journalism, Everic worked as a social media manager and digital strategist for brands including eBay, Samsung, Unilever, IZOD, AXE, AND1, American Idol, Cap'n Crunch, and BET, creating online customer support portals, curating user-generated content, and designing social media programs for live events. He studied at the Craig Newmark Graduate School of Journalism at CUNY (concentrating in urban reporting and specializing in interactive journalism), Drexel University in 2011, and Rye Country Day School in 2006. Born in Mount Vernon, New York, he wrote for his personal site Dear Whoever in college—a collection of open letters directed at figures in hip-hop, sports, politics, and Black culture.",
      image: '/img/everic.jpg',
    },
  ],
  history_sections: [
    {
      title: 'The Black Youth Project',
      content:
        'The Black Youth Project started as a national research project in 2005 to examine and highlight the attitudes, resources, and culture of African American youth ages 15 to 25. The focus of the work was on exploring the political and civic attitudes, actions and culture of African American youth, examining how these factors and others influence their decision-making and normative assessments in critical domains such as sex and politics, and using those insights to develop creative and effective ways to facilitate the political and civic empowerment of young black people and other young people of color. Understanding the need to make this data available to a wider constituency beyond the academy Professor Cathy Cohen, the Black Youth Project\'s founder and principal investigator, decided to create an online hub for Black young adults where scholars, educators, community activists, allies, and youth could access the study\'s research summaries as well as have access to a plethora of resources concerning the empowerment and development of Black youth.',
    },
    {
      title: 'Continued',
      content:
        'Over the years the website has significantly increased its reach and impact. We have developed one of the only platforms on the internet where the voices of black youth and young adults are accurately represented without censorship. Within the website, visitors can access research summaries, read blogs about and by black youth, search an extensive rap database, access black youth social justice organizations, and download social justice curricula to teach. We believe the BYP website is one of a small number of new media sites that black youth can truly call their own. Thus, the BYP stands as an example of a project working to expand the human and social capital of young African Americans and facilitating their full participation in the democratic process.',
    },
  ],
  history_cta_text: 'Visit Black Life Everywhere',
  history_cta_url: '/black-life-everywhere',
};

function getTeamMemberImageUrl(
  img: AboutTeamMember['image']
): string {
  if (!img) return '/img/community.jpg';
  if (typeof img === 'string') return img;
  return img.url ?? '/img/community.jpg';
}

function getHeroImageUrl(
  img: AboutPageACF['hero_image']
): string {
  if (!img) return '/img/community.jpg';
  if (typeof img === 'string') return img;
  return img.url ?? '/img/community.jpg';
}

export default async function About() {
  const wpPage = await fetchPageBySlug('about-us', { acf_format: 'standard' });
  const acf = wpPage?.acf as AboutPageACF | undefined;
  const data: AboutPageACF = acf
    ? { ...ABOUT_FALLBACK, ...acf }
    : ABOUT_FALLBACK;

  const heroImageUrl = getHeroImageUrl(data.hero_image);

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
              {stripHtml(data.hero_title) || 'About Us'}
            </h1>
            <h3 className="w-[90%] mx-auto max-w-7xl text-[2rem] mb-8 text-center text-white">
              {stripHtml(data.hero_subtitle)}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:mb-8">
              <div className="sm:border-r sm:border-gray-600 sm:pr-4">
                <div
                  className="text-lg text-white [&_a]:text-blue-300 [&_a:hover]:text-blue-200 [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                  style={{ fontFamily: 'Playfair' }}
                  dangerouslySetInnerHTML={{
                    __html: sanitizeHtmlWithBreaks(data.main_content),
                  }}
                />
              </div>
              <div className="w-full sm:pl-4">
                <div className="relative w-full aspect-square">
                  <Image
                    src={heroImageUrl}
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
                {(data.team_members ?? []).map((member, i) => (
                  <div key={i}>
                    <div className="relative w-full aspect-square mb-4">
                      <Image
                        src={getTeamMemberImageUrl(member.image)}
                        alt={member.name ?? 'Team member'}
                        fill
                        className="object-cover object-top"
                        sizes="(min-width: 768px) 50vw, 100vw"
                      />
                    </div>
                    <h3
                      className="text-2xl mb-2 text-white"
                      style={{ fontFamily: 'Playfair' }}
                    >
                      {stripHtml(member.name)}
                    </h3>
                    <div
                      className="text-lg text-white [&_a]:text-blue-300 [&_a:hover]:text-blue-200 [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                      style={{ fontFamily: 'Playfair' }}
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtmlWithBreaks(member.bio),
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-8 bg-black/50 p-8 rounded-lg">
              <h3 className="text-[2rem]" style={{ fontFamily: 'Playfair' }}>
                Our History
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.history_sections ?? []).map((section, i) => (
                  <div key={i} className="flex flex-col gap-4">
                    <h4
                      className="text-[1.5rem] font-medium"
                      style={{
                        fontFamily: 'Playfair',
                        color:
                          stripHtml(section.title) === 'Continued'
                            ? 'transparent'
                            : undefined,
                      }}
                    >
                      {stripHtml(section.title)}
                    </h4>
                    <div
                      className="text-lg text-white [&_a]:text-blue-300 [&_a:hover]:text-blue-200 [&_a]:underline [&_p]:mb-4 [&_p:last-child]:mb-0"
                      style={{ fontFamily: 'Playfair' }}
                      dangerouslySetInnerHTML={{
                        __html: sanitizeHtmlWithBreaks(section.content),
                      }}
                    />
                    {i === 1 &&
                      data.history_cta_text &&
                      data.history_cta_url && (
                        <Link
                          className="text-lg underline text-blue-300 hover:text-blue-200"
                          href={data.history_cta_url}
                          style={{ fontFamily: 'Playfair' }}
                        >
                          {data.history_cta_text} →
                        </Link>
                      )}
                  </div>
                ))}
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
