import { Link } from 'react-router'
import { PageHero, Feature, CtaBand } from '../components/UI.jsx'
import { seo, breadcrumbLd } from '../lib/seo.js'
import { ATTRACTIONS } from '../content/experiences.js'

export const meta = () => seo({
  title: 'Places to Visit near the Palace: Amer, Hawa Mahal & City Palace',
  description: 'Explore Jaipur from The Vijayran Palace: Amer Fort 19 km away, Hawa Mahal, City Palace, Birla Mandir and the royal cenotaphs of Gaitore.',
  path: '/experiences/attractions',
  jsonLd: [breadcrumbLd([['Experiences', '/experiences'], ['Around Jaipur', '/experiences/attractions']])],
})

export default function Attractions() {
  return (
    <>
      <PageHero img="estate-view" hi="जयपुर" eyebrow="Around Jaipur" title="The land of the Maharajas" crumbs={[['Experiences', '/experiences'], ['Around Jaipur', '/experiences/attractions']]}
        lead="Fairytale palaces, colourful temples, historic monuments and splendid havelis, all within easy reach of the palace." />
      <section className="sec sec--ivory">
        <div className="features">
          {ATTRACTIONS.map((a, i) => (
            <Feature key={a.title} img={a.img} eyebrow={`${a.distance} from the palace`} title={a.title} flip={i % 2 === 1}><p>{a.text}</p></Feature>
          ))}
        </div>
        <p className="center mt-48">Planning a city day? Read our <Link className="link-u link-u--gold" to="/blog/places-to-visit-in-jaipur">guide to Jaipur</Link></p>
      </section>
      <CtaBand title="Return to calm after the city" />
    </>
  )
}
