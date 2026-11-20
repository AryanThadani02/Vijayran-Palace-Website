import { Link } from 'react-router'
import { PageHero, SectionHead, Feature, CtaBand } from '../components/UI.jsx'
import Mausam from '../components/Mausam.jsx'
import { seo, breadcrumbLd } from '../lib/seo.js'

export const meta = () => seo({
  title: 'Experiences at the Palace',
  description: 'Horse riding from the royal stables, Rajasthani folk evenings, dining under the stars, the pool and the forts of Amer: experiences at The Vijayran Palace, Jaipur.',
  path: '/experiences',
  jsonLd: [breadcrumbLd([['Experiences', '/experiences']])],
})

export default function Experiences() {
  return (
    <>
      <PageHero img="riding" hi="अनुभव" eyebrow="Experiences" title="A day in the life of the palace" crumbs={[['Experiences', '/experiences']]}
        lead="Built within a culturally vibrant landscape, the palace introduces its guests to the real Rajasthan." />
      <section className="sec sec--ivory">
        <div className="features">
          <Feature img="folk" eyebrow="Activities" title="Stables, folk evenings & the open hills" hi="क्रीड़ा">
            <p>Ride from our own stables, take a camel through the Aravallis, spend an evening of Ghoomar by the bonfire, or start the day with yoga as the hills wake up.</p>
            <p><Link className="link-u link-u--gold" to="/experiences/activities">All activities</Link></p>
          </Feature>
          <Feature img="dining-5" eyebrow="Dining" title="Swarn Mahal & dinners under the sky" hi="भोजन" flip>
            <p>Fresh produce from our organic kitchen gardens, Rajasthani classics and dishes from around the world, served in the restaurant, by the pool or beneath the stars.</p>
            <p><Link className="link-u link-u--gold" to="/experiences/dining">Dining at the palace</Link></p>
          </Feature>
          <Feature img="amber-fort" eyebrow="Around Jaipur" title="Amer, Hawa Mahal & the Pink City" hi="जयपुर">
            <p>Amer Fort is 19 km away. Spend the morning among the forts and bazaars, and return to calm for the evening.</p>
            <p><Link className="link-u link-u--gold" to="/experiences/attractions">Places to visit</Link></p>
          </Feature>
          <Feature img="corridor" eyebrow="Gallery" title="The palace in pictures" hi="चित्रशाला" flip>
            <p>Arched corridors, painted halls, jharokhas and celebrations by night.</p>
            <p><Link className="link-u link-u--gold" to="/gallery">Open the gallery</Link></p>
          </Feature>
        </div>
      </section>
      <Mausam num={1} />
      <CtaBand />
    </>
  )
}
