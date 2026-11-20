import { Link } from 'react-router'
import { PageHero, SectionHead, Feature, Reviews, CtaBand } from '../components/UI.jsx'
import { ChequerBand } from '../components/Ornaments.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd, resortLd } from '../lib/seo.js'
import { SITE } from '../content/site.js'

export const meta = () => seo({
  title: 'Our Story',
  description: 'The Vijayran Palace by Royal Quest Resorts: a heritage haveli-style palace resort in the Aravalli foothills near Amer, where Rajput culture meets modern luxury.',
  path: '/about',
  jsonLd: [resortLd(), breadcrumbLd([['Our Story', '/about']])],
})

export default function About() {
  return (
    <>
      <PageHero img="facade" hi="परिचय" eyebrow="Our Story" title="Where you are the king" crumbs={[['Our Story', '/about']]}
        lead="A fortress of solitude and magnificence in the lap of the Aravallis." />

      <section className="sec sec--ivory">
        <div className="prose prose--center" data-reveal ref={reveal}>
          <p className="dropcap">Ever wondered what an escape from the demands of busy life would feel like, right in the lap of nature, showered with gracious service? At The Vijayran Palace, that dream of a holiday where <em>you</em> are the king comes true.</p>
          <p>Royal Quest Resorts created The Vijayran Palace with a single idea: an experience laden with luxury, world-class service and an atmosphere of solitude. The palace is where old-world grandeur meets the modern age, an amalgamation of culture, tradition and contemporary comfort, framed by spectacular views of the Aravallis.</p>
          <p>We await every guest with open arms, and with hospitality in the spirit of <em>atithi devo bhava</em>: the guest is God.</p>
        </div>
      </section>

      <ChequerBand />

      <section className="sec sec--sand">
        <SectionHead num={1} eyebrow="The Palace" title="Built in the language of Rajputana" />
        <div className="features">
          <Feature img="corridor" eyebrow="Architecture" title="Arches, jharokhas & jaali" hi="स्थापत्य">
            <p>Saffron façades crowned with white chhatris, colonnades of cusped arches, carved jharokhas and pink sandstone jaali balconies. Inside are chequered marble floors and hand-painted ceilings.</p>
          </Feature>
          <Feature img="estate-view" eyebrow="Setting" title="In the lap of the Aravallis" hi="अरावली" flip>
            <p>India’s oldest mountain range rises behind the palace. Gardens, lawns and courtyards open onto hill views, and the sunsets between the palace buildings are a guest favourite.</p>
            <p><Link viewTransition to="/experiences/attractions" className="link-u link-u--gold">Around Jaipur</Link></p>
          </Feature>
          <Feature img="dining-4" eyebrow="Hospitality" title="Warmth, by name" hi="आतिथ्य">
            <p>Our guests remember our people. Reviews thank our team by name again and again, for check-ins that feel effortless, special requests remembered, and meals cooked just the way the children like them.</p>
          </Feature>
        </div>
      </section>

      <section className="sec sec--ivory">
        <SectionHead num={2} eyebrow="Getting here" title="Close to Amer, far from the noise" />
        <div className="distances" data-reveal ref={reveal}>
          {SITE.distances.map(([k, v]) => <div key={k}><dt>{v}</dt><dd>{k}</dd></div>)}
        </div>
        <p className="center mt-24">{SITE.address.full} · <a className="link-u link-u--gold" href={SITE.mapsLink} target="_blank" rel="noopener">Directions</a></p>
      </section>

      <Reviews num={3} />
      <CtaBand />
    </>
  )
}
