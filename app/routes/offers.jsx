import { PageHero, CtaBand } from '../components/UI.jsx'
import { ArchFrame, Lotus } from '../components/Ornaments.jsx'
import { Img } from '../lib/images.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd } from '../lib/seo.js'
import { OFFERS } from '../content/misc.js'
import { SITE } from '../content/site.js'

export const meta = () => seo({
  title: 'Offers & Packages',
  description: 'Stay packages and day outings at The Vijayran Palace, Jaipur: Summer Splash, Family Fiesta, Royal Stables Escape and Elephant Safari.',
  path: '/offers',
  jsonLd: [breadcrumbLd([['Offers', '/offers']])],
})

export default function Offers() {
  return (
    <>
      <PageHero img="courtyard-2" hi="उपहार" eyebrow="Offers & Packages" title="Sealed invitations" crumbs={[['Offers', '/offers']]} compact />
      <section className="sec sec--ivory">
        <div className="offers">
          {OFFERS.map((o, i) => (
            <article key={o.slug} className="offer" id={o.slug} data-reveal ref={reveal} style={{ '--d': `${(i % 2) * 100}ms` }}>
              <div className="offer__media"><div className="offer__img arch-clip"><Img name={o.img} alt="" sizes="(max-width: 900px) 90vw, 30vw" /></div><ArchFrame className="offer__frame" /></div>
              <div className="offer__body">
                <p className="eyebrow">{o.kind}</p>
                <h2 className="offer__title">{o.title}</h2>
                {o.price && <p className="offer__price">{o.price}{o.timing && <span> · {o.timing}</span>}</p>}
                <ul>{o.includes.map(x => <li key={x}><Lotus size={13} />{x}</li>)}</ul>
                {o.note && <p className="note note--inline">{o.note}</p>}
                <p className="offer__ctas">
                  <a className="btn btn--gold" href={`tel:${SITE.phones.sales.tel}`}><span>Call to book</span></a>
                  <a className="link-u link-u--gold" href={`mailto:${SITE.emails.sales}?subject=${encodeURIComponent(o.title + ' enquiry')}`}>Email us</a>
                </p>
              </div>
              <span className="offer__seal" aria-hidden="true">VP</span>
            </article>
          ))}
        </div>
        <p className="note">Packages are subject to availability, season and applicable taxes. Please call {SITE.phones.sales.label} or email {SITE.emails.sales} to confirm current rates.</p>
      </section>
      <CtaBand />
    </>
  )
}
