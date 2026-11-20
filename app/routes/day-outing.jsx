import { Link } from 'react-router'
import { PageHero, SectionHead, Feature, CtaBand } from '../components/UI.jsx'
import Mausam from '../components/Mausam.jsx'
import { Lotus } from '../components/Ornaments.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd } from '../lib/seo.js'
import { OFFERS } from '../content/misc.js'
import { SITE } from '../content/site.js'

export const meta = () => seo({
  title: 'Day Outing Resort near Jaipur',
  description: 'A day outing near Jaipur at The Vijayran Palace: pool access, high tea, dinner, horse riding and light music from 2 PM to 9 PM. Perfect for families and couples.',
  path: '/day-outing',
  jsonLd: [breadcrumbLd([['Day Outing', '/day-outing']])],
})

export default function DayOuting() {
  const o = OFFERS[0]
  return (
    <>
      <PageHero img="pool-view" hi="सैर" eyebrow="Day Outing" title="A royal day, close to the city" crumbs={[['Day Outing', '/day-outing']]}
        lead="Escape Jaipur for an afternoon and evening of water, high tea, horses and music." />
      <section className="sec sec--ivory">
        <div className="offerx" data-reveal ref={reveal}>
          <div className="offerx__head">
            <p className="eyebrow">{o.kind}</p>
            <h2 className="offerx__title">{o.title}</h2>
            <p className="offerx__price">{o.price}<span>{o.timing}</span></p>
          </div>
          <ul className="offerx__list">{o.includes.map(x => <li key={x}><Lotus size={14} />{x}</li>)}</ul>
          <p className="note note--inline">{o.note} Prices subject to change; call to confirm availability.</p>
          <div className="offerx__ctas">
            <a className="btn btn--gold" href={`tel:${SITE.phones.sales.tel}`}><span>Call {SITE.phones.sales.label}</span></a>
            <Link viewTransition className="btn btn--ghost btn--dark" to="/offers"><span>All offers</span></Link>
          </div>
        </div>
      </section>
      <section className="sec sec--sand">
        <SectionHead num={1} eyebrow="Your afternoon" title="What to enjoy" />
        <div className="features">
          <Feature img="pool-infinity" title="The pool"><p>Spend the afternoon in one of Jaipur’s largest pools, with the palace reflected in the water.</p></Feature>
          <Feature img="horse" title="Horse riding" flip><p>Pony rides for children and gentle rides for grown-ups, with horses from our own stables.</p></Feature>
          <Feature img="dining-5" title="High tea & dinner"><p>High tea in the afternoon and a set dinner as the lights come on across the palace.</p></Feature>
        </div>
      </section>
      <Mausam num={2} />
      <CtaBand title="Make a day of it" />
    </>
  )
}
