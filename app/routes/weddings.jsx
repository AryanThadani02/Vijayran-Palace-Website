import { Link } from 'react-router'
import { PageHero, SectionHead, VenueFinder, EnquiryForm, Reviews, Feature } from '../components/UI.jsx'
import { ArchFrame } from '../components/Ornaments.jsx'
import { Img } from '../lib/images.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd } from '../lib/seo.js'
import { VENUES, WEDDING_MOMENTS, WEDDING_SERVICES } from '../content/weddings.js'
import { SITE } from '../content/site.js'

export const meta = () => seo({
  title: 'Destination Weddings in Jaipur: Seven Royal Venues',
  description: 'Plan a palace wedding in Jaipur for 100 to 1,500 guests across seven venues, from courtyards and fountain squares to the Vijayran Mahal Bagh lawn. Décor, feasts and folk shows included.',
  path: '/weddings',
  image: '/images/decor-night-960.webp',
  jsonLd: [breadcrumbLd([['Weddings', '/weddings']])],
})

export default function Weddings() {
  return (
    <>
      <PageHero img="decor-night" hi="शाही शादी" eyebrow="Shahi Shaadi" title="A royal wedding in Jaipur" crumbs={[['Weddings', '/weddings']]}
        lead="Medieval interiors, rustic gardens, jharokhas and mountain sunsets. The palace is more beautiful than its photographs." />

      <section className="sec sec--ivory">
        <div className="prose prose--center" data-reveal ref={reveal}>
          <p className="dropcap">A wedding at The Vijayran Palace stays in your guests’ memories for years. Our creative team designs awe-inspiring themes and décor, and the palace’s splendid architecture does the rest. Whether you plan a modern celebration, a traditional Hindu wedding, a Christian ceremony or a Nikaah, we weave it with care.</p>
        </div>
      </section>

      <section className="sec sec--ink weddings">
        <div className="toran" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} />)}</div>
        <SectionHead num={1} light eyebrow="Venues" title="Seven royal spaces, one palace">
          Choose a ceremony and your guest count, and we will suggest the space that fits.
        </SectionHead>
        <div className="wed">
          <div className="wed__photos" data-reveal ref={reveal}>
            <div className="wed__ph wed__ph--a arch-clip"><Img name="ceremony" alt="Wedding guests at the palace" sizes="40vw" /></div>
            <div className="wed__ph wed__ph--b arch-clip"><Img name="petals" alt="Petals showered at a Haldi" sizes="30vw" /></div>
          </div>
          <VenueFinder />
        </div>
        <div className="ledger-wrap ledger-wrap--dark mt-64" data-reveal ref={reveal}>
          <table className="ledger ledger--dark">
            <caption className="sr">Wedding venues and capacities</caption>
            <thead><tr><th scope="col">Venue</th><th scope="col">Setting</th><th scope="col">Seated – floating</th></tr></thead>
            <tbody>{VENUES.map(v => <tr key={v.name}><th scope="row">{v.name}</th><td>{v.kind}</td><td>{v.seat}–{v.cap}</td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className="sec sec--sand">
        <SectionHead num={2} eyebrow="Celebrations" title="Every ceremony, its own setting" />
        <div className="moments">
          {WEDDING_MOMENTS.map((m, i) => (
            <figure key={m.title} className="moment" data-reveal ref={reveal} style={{ '--d': `${i * 90}ms` }}>
              <div className="moment__img arch-clip"><Img name={m.img} alt={m.title} sizes="(max-width: 900px) 45vw, 22vw" /></div>
              <ArchFrame className="moment__frame" />
              <figcaption><strong>{m.title}</strong>{m.text}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="sec sec--ivory">
        <SectionHead num={3} eyebrow="What we take care of" title="Your wedding, woven with care" />
        <dl className="services" data-reveal ref={reveal}>
          {WEDDING_SERVICES.map(([t, d]) => <div key={t}><dt>{t}</dt><dd>{d}</dd></div>)}
        </dl>
        <div className="features mt-64">
          <Feature img="prewed-1" eyebrow="Pre-wedding" title="Shoots in jharokhas & painted halls">
            <p>Imagine portraits of a royal queen in a jharokha, with her prince stealing glances beside her.</p>
            <p><Link className="link-u link-u--gold" to="/weddings/pre-wedding-shoots">Pre-wedding shoots</Link></p>
          </Feature>
          <Feature img="banquet" eyebrow="Meetings & events" title="Banquets, offsites & celebrations" flip>
            <p>The air-conditioned Raj Mahal and our courtyards host conferences, birthdays and corporate retreats.</p>
            <p><Link className="link-u link-u--gold" to="/weddings/meetings-events">Meetings & events</Link></p>
          </Feature>
        </div>
      </section>

      <Reviews title="Couples remember" />

      <section className="sec sec--sand">
        <EnquiryForm kind="Wedding" to={SITE.emails.sales} title="Request an Audience" fields={['name', 'email', 'phone', 'event', 'dates', 'guests', 'message']} />
        <p className="center mt-24">Prefer to talk? Call our wedding team on <a className="link-u link-u--gold" href={`tel:${SITE.phones.weddings.tel}`}>{SITE.phones.weddings.label}</a></p>
      </section>
    </>
  )
}
