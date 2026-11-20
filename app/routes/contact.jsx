import { PageHero, SectionHead, EnquiryForm } from '../components/UI.jsx'
import Mausam from '../components/Mausam.jsx'
import { reveal } from '../lib/motion.js'
import { seo, breadcrumbLd, resortLd } from '../lib/seo.js'
import { SITE, waLink } from '../content/site.js'

export const meta = () => seo({
  title: 'Contact & Directions',
  description: 'Contact The Vijayran Palace, NH-8, Kukas, Jaipur. Reservations +91 99998 22609 · resv@royalquestresorts.com. Directions from Jaipur Airport, Amer and the railway station.',
  path: '/contact',
  jsonLd: [resortLd(), breadcrumbLd([['Contact', '/contact']])],
})

export default function Contact() {
  return (
    <>
      <PageHero img="main-gate" hi="पधारो" eyebrow="Contact" title="We await your arrival" crumbs={[['Contact', '/contact']]} compact />
      <section className="sec sec--ivory">
        <div className="contact">
          <div className="contact__info" data-reveal ref={reveal}>
            <h2 className="contact__h">The Vijayran Palace</h2>
            <p>{SITE.address.full}</p>
            <dl className="contact__dl">
              <div><dt>Reservations</dt><dd><a href={`tel:${SITE.phones.reservations.tel}`}>{SITE.phones.reservations.label}</a><br /><a href={`mailto:${SITE.emails.reservations}`}>{SITE.emails.reservations}</a></dd></div>
              <div><dt>Weddings &amp; events</dt><dd><a href={`tel:${SITE.phones.weddings.tel}`}>{SITE.phones.weddings.label}</a><br /><a href={`mailto:${SITE.emails.sales}`}>{SITE.emails.sales}</a></dd></div>
              <div><dt>Packages &amp; sales</dt><dd><a href={`tel:${SITE.phones.sales.tel}`}>{SITE.phones.sales.label}</a></dd></div>
              <div><dt>WhatsApp</dt><dd><a href={waLink()} target="_blank" rel="noopener">Message us</a></dd></div>
            </dl>
            <h3 className="contact__h3">Getting here</h3>
            <ul className="contact__dist">{SITE.distances.map(([k, v]) => <li key={k}><span>{k}</span><span>{v}</span></li>)}</ul>
            <p className="note note--inline">After dark, the approach from the highway is unlit. Call us and we will guide you in.</p>
          </div>
          <EnquiryForm kind="Stay" title="Write to us" />
        </div>
      </section>
      <section className="map" aria-label="Map">
        <iframe title="Map showing The Vijayran Palace" src={SITE.mapsEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </section>
      <Mausam num={1} />
    </>
  )
}
