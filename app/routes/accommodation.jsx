import { Link } from 'react-router'
import { PageHero, SectionHead, RoomCard, CtaBand } from '../components/UI.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd, abs } from '../lib/seo.js'
import { ROOMS } from '../content/rooms.js'
import { SITE } from '../content/site.js'

export const meta = () => seo({
  title: 'Rooms, Suites & Private-Pool Villas',
  description: 'Heritage haveli suites with courtyards, terraces and carved jharokhas, plus Presidential Villas with private pools, at The Vijayran Palace, Jaipur.',
  path: '/accommodation',
  jsonLd: [
    breadcrumbLd([['Accommodation', '/accommodation']]),
    { '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: ROOMS.map((r, i) => ({ '@type': 'ListItem', position: i + 1, url: abs(`/accommodation/${r.slug}`), name: r.name })) },
  ],
})

export default function Accommodation() {
  return (
    <>
      <PageHero img="jharokha-2" hi="कक्ष" eyebrow="Accommodation" title="Suites framed by jharokhas" crumbs={[['Accommodation', '/accommodation']]}
        lead="Villas with private pools, haveli suites with courtyards and terraces, and classic heritage rooms." />
      <section className="sec sec--sand">
        <div className="rooms">{ROOMS.map((r, i) => <RoomCard key={r.slug} room={r} i={i} />)}</div>
      </section>
      <section className="sec sec--ivory">
        <SectionHead num={1} eyebrow="At a glance" title="Compare our stays" />
        <div className="ledger-wrap" data-reveal ref={reveal}>
          <table className="ledger">
            <thead><tr><th scope="col">Stay</th><th scope="col">Signature</th><th scope="col">Bed</th><th scope="col">Size*</th><th scope="col"><span className="sr">Book</span></th></tr></thead>
            <tbody>
              {ROOMS.map(r => (
                <tr key={r.slug}>
                  <th scope="row"><Link viewTransition to={`/accommodation/${r.slug}`}>{r.name}</Link></th>
                  <td>{r.tagline}</td><td>{r.bed}</td><td>{r.size.replace('approx. ', '')}</td>
                  <td><a href={SITE.bookingUrl} target="_blank" rel="noopener" className="link-u link-u--gold">Book</a></td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="note">*Approximate. Every stay includes air conditioning, Wi-Fi and in-room dining. Check-in from 2 PM, check-out by 11 AM.</p>
        </div>
      </section>
      <CtaBand title="Book direct, stay royal" />
    </>
  )
}
