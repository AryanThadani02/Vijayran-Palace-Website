import { Link, useParams } from 'react-router'
import { PageHero, SectionHead, RoomCard, CtaBand } from '../components/UI.jsx'
import { Slider } from '../components/Signature.jsx'
import { Lotus } from '../components/Ornaments.jsx'
import { reveal } from '../lib/motion.js'
import { imgUrl } from '../lib/images.jsx'
import { seo, breadcrumbLd, abs } from '../lib/seo.js'
import { ROOMS, roomBySlug } from '../content/rooms.js'
import { SITE } from '../content/site.js'
import NotFound from './not-found.jsx'

export const meta = ({ params }) => {
  const r = roomBySlug(params.slug)
  if (!r) return seo({ title: 'Not found', description: '', path: '/404', noindex: true })
  const path = `/accommodation/${r.slug}`
  return seo({
    title: r.seoTitle,
    description: r.seoDescription,
    path,
    image: imgUrl(r.images[0], 1280),
    jsonLd: [
      breadcrumbLd([['Accommodation', '/accommodation'], [r.name, path]]),
      {
        '@context': 'https://schema.org', '@type': 'HotelRoom', name: r.name, description: r.intro.join(' '), url: abs(path),
        image: r.images.slice(0, 3).map(n => abs(imgUrl(n, 1280))),
        bed: { '@type': 'BedDetails', typeOfBed: r.bed },
        amenityFeature: r.highlights.map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
        containedInPlace: { '@id': abs('/#resort') },
      },
    ],
  })
}

export default function Room() {
  const { slug } = useParams()
  const r = roomBySlug(slug)
  if (!r) return <NotFound />
  const others = ROOMS.filter(o => o.slug !== r.slug).slice(0, 3)
  return (
    <>
      <PageHero img={r.images[0]} hi={r.hi} eyebrow={r.tier === 'Villa' ? 'Villa' : r.tier === 'Suite' ? 'Haveli Suite' : 'Haveli Room'} title={r.name}
        lead={r.tagline} crumbs={[['Accommodation', '/accommodation'], [r.name, `/accommodation/${r.slug}`]]} />

      <section className="sec sec--ivory">
        <div className="roomd">
          <div className="prose" data-reveal ref={reveal}>
            {r.intro.map((p, i) => <p key={i} className={i === 0 ? 'dropcap' : ''}>{p}</p>)}
          </div>
          <aside className="roomd__card" data-reveal ref={reveal} style={{ '--d': '120ms' }}>
            <dl>
              <div><dt>Size</dt><dd>{r.size}</dd></div>
              <div><dt>Bed</dt><dd>{r.bed}</dd></div>
              <div><dt>Outlook</dt><dd>{r.view}</dd></div>
              <div><dt>Check-in / out</dt><dd>2 PM / 11 AM</dd></div>
            </dl>
            <a className="btn btn--gold btn--block" href={SITE.bookingUrl} target="_blank" rel="noopener"><span>Check availability</span></a>
            <p className="roomd__call">or call <a href={`tel:${SITE.phones.reservations.tel}`}>{SITE.phones.reservations.label}</a></p>
          </aside>
        </div>
        <ul className="amen" data-reveal ref={reveal}>
          {r.highlights.map(h => <li key={h}><Lotus size={14} />{h}</li>)}
        </ul>
      </section>

      <section className="sec sec--sand">
        <SectionHead num={1} eyebrow="Gallery" title={`Inside the ${r.name}`} />
        <Slider images={r.images} label={r.name} />
      </section>

      <section className="sec sec--ivory">
        <SectionHead num={2} eyebrow="Also at the palace" title="Other stays" />
        <div className="rooms">{others.map((o, i) => <RoomCard key={o.slug} room={o} i={i} />)}</div>
        <p className="center mt-48"><Link viewTransition to="/accommodation" className="link-u link-u--gold">All accommodation</Link></p>
      </section>
      <CtaBand title={`Reserve the ${r.name}`} img={r.images[1] || 'pool-infinity'} />
    </>
  )
}
