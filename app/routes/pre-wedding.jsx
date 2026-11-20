import { PageHero, SectionHead, Gallery, EnquiryForm } from '../components/UI.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd } from '../lib/seo.js'
import { SITE } from '../content/site.js'

export const meta = () => seo({
  title: 'Pre-Wedding Shoots in Jaipur',
  description: 'A palace pre-wedding shoot in Jaipur: carved jharokhas, painted teal halls, chequered marble floors, arched corridors and Aravalli sunsets at The Vijayran Palace.',
  path: '/weddings/pre-wedding-shoots',
  jsonLd: [breadcrumbLd([['Weddings', '/weddings'], ['Pre-wedding Shoots', '/weddings/pre-wedding-shoots']])],
})

const SETS = [
  ['prewed-1', 'Sets', 'The palace terrace at golden hour'], ['teal-couple', 'Sets', 'The hand-painted teal hall'],
  ['prewed-2', 'Sets', 'Under the chandeliers'], ['chequer-hall', 'Sets', 'Chequered marble and tall doors'],
  ['corridor', 'Sets', 'The arched corridor'], ['prewed-3', 'Sets', 'The palace courtyard'],
  ['prewed-4', 'Sets', 'A carved doorway'], ['prewed-5', 'Sets', 'Lantern-lit pathways at night'],
]

export default function PreWedding() {
  return (
    <>
      <PageHero img="prewed-2" hi="चित्र" eyebrow="Pre-wedding Shoots" title="Be the queen in the jharokha" crumbs={[['Weddings', '/weddings'], ['Pre-wedding Shoots', '/weddings/pre-wedding-shoots']]} />
      <section className="sec sec--ivory">
        <div className="prose prose--center" data-reveal ref={reveal}>
          <p className="dropcap">Beautiful architecture, lush greenery, jharokhas, a rugged mountain backdrop and sunsets by the pool. The Vijayran Palace is one of Jaipur’s most photogenic settings for couples. Imagine portraits of a royal queen standing in a jharokha, with her prince charming beside her.</p>
        </div>
      </section>
      <section className="sec sec--sand">
        <SectionHead num={1} eyebrow="Sets around the palace" title="A palace of backdrops" />
        <Gallery items={SETS} filters={false} />
      </section>
      <section className="sec sec--ivory">
        <EnquiryForm kind="Pre-wedding shoot" to={SITE.emails.sales} title="Book your shoot" fields={['name', 'email', 'phone', 'dates', 'message']} />
      </section>
    </>
  )
}
