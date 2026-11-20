import { PageHero, SectionHead, Feature, CtaBand } from '../components/UI.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd, abs } from '../lib/seo.js'
import { DINING } from '../content/experiences.js'
import { SITE } from '../content/site.js'

export const meta = () => seo({
  title: 'Dining: Swarn Mahal, Poolside & Dinners Under the Sky',
  description: 'Fine dining at Swarn Mahal, poolside dinners, romantic candlelit tables and in-room dining, with produce from our own organic kitchen gardens.',
  path: '/experiences/dining',
  jsonLd: [
    breadcrumbLd([['Experiences', '/experiences'], ['Dining', '/experiences/dining']]),
    { '@context': 'https://schema.org', '@type': 'Restaurant', name: 'Swarn Mahal at The Vijayran Palace', servesCuisine: ['Rajasthani', 'North Indian', 'Mughlai', 'Continental'], telephone: SITE.phones.reservations.tel, address: { '@type': 'PostalAddress', streetAddress: SITE.address.street, addressLocality: 'Jaipur', postalCode: SITE.address.postcode, addressCountry: 'IN' }, containedInPlace: { '@id': abs('/#resort') } },
  ],
})

export default function Dining() {
  return (
    <>
      <PageHero img="dining-1" hi="भोजन" eyebrow="Dining" title="A paradise for gourmands" crumbs={[['Experiences', '/experiences'], ['Dining', '/experiences/dining']]}
        lead="The warmth of cuisines from around the world, with fresh spices, herbs and vegetables from our own organic kitchen gardens." />
      <section className="sec sec--ivory">
        <div className="prose prose--center" data-reveal ref={reveal}>
          <p className="dropcap">Our Executive Chef and team bring together the flavours of Rajasthan and the world, from Hyderabadi biryani, Lucknowi kebabs and Kashmiri dum aloo to French risotto and Italian ravioli. Jain and other dietary preferences are prepared with care.</p>
        </div>
      </section>
      <section className="sec sec--sand">
        <SectionHead num={1} eyebrow="Where to dine" title="Five ways to dine like royalty" />
        <div className="features">
          {DINING.map((d, i) => <Feature key={d.title} img={d.img} title={d.title} hi={d.hi} flip={i % 2 === 1}><p>{d.text}</p></Feature>)}
        </div>
      </section>
      <CtaBand title="Reserve a table under the stars" text={`Call ${SITE.phones.reservations.label} a day ahead for romantic and private dinners.`} img="dining-5" />
    </>
  )
}
