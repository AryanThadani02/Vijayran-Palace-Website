import { Link } from 'react-router'
import { ChequerBand, Skyline } from './Ornaments.jsx'
import { SITE } from '../content/site.js'
import { ROOMS } from '../content/rooms.js'

export default function Footer() {
  return (
    <footer className="footer">
      <ChequerBand />
      <div className="footer__inner">
        <div className="footer__brand">
          <img src="/crest-mark.png" alt="Royal Quest Resorts crest" width="110" height="97" loading="lazy" />
          <p className="footer__padharo"><span lang="hi">पधारो म्हारे देस</span>Welcome to our land.</p>
          <p className="footer__small">{SITE.address.full}</p>
          <p className="footer__coords">27°01′ N · 75°53′ E</p>
          <p className="footer__small"><a href={SITE.mapsLink} target="_blank" rel="noopener">Get directions →</a></p>
        </div>
        <div>
          <h2 className="footer__h">Stay</h2>
          <ul className="footer__list">
            {ROOMS.map(r => <li key={r.slug}><Link viewTransition to={`/accommodation/${r.slug}`}>{r.name}</Link></li>)}
          </ul>
        </div>
        <div>
          <h2 className="footer__h">Discover</h2>
          <ul className="footer__list">
            <li><Link viewTransition to="/about">Our Story</Link></li>
            <li><Link viewTransition to="/experiences/activities">Activities</Link></li>
            <li><Link viewTransition to="/experiences/dining">Dining</Link></li>
            <li><Link viewTransition to="/experiences/attractions">Around Jaipur</Link></li>
            <li><Link viewTransition to="/weddings">Weddings</Link></li>
            <li><Link viewTransition to="/day-outing">Day Outing</Link></li>
            <li><Link viewTransition to="/offers">Offers</Link></li>
            <li><Link viewTransition to="/gallery">Gallery</Link></li>
            <li><Link viewTransition to="/blog">Journal</Link></li>
          </ul>
        </div>
        <div>
          <h2 className="footer__h">Reservations</h2>
          <p><a href={`tel:${SITE.phones.reservations.tel}`}>{SITE.phones.reservations.label}</a><br /><a href={`mailto:${SITE.emails.reservations}`}>{SITE.emails.reservations}</a></p>
          <h2 className="footer__h">Weddings &amp; Events</h2>
          <p><a href={`tel:${SITE.phones.weddings.tel}`}>{SITE.phones.weddings.label}</a><br /><a href={`mailto:${SITE.emails.sales}`}>{SITE.emails.sales}</a></p>
          <p className="footer__social">
            {Object.entries(SITE.social).map(([k, v]) => <a key={k} href={v} target="_blank" rel="noopener">{k}</a>)}
          </p>
        </div>
      </div>
      <Skyline />
      <div className="footer__legal">
        <span>© 2026 The Vijayran Palace by Royal Quest Resorts</span>
        <span><Link viewTransition to="/faq">FAQ</Link> · <Link viewTransition to="/careers">Careers</Link> · <Link viewTransition to="/terms">Terms &amp; Conditions</Link> · <Link viewTransition to="/contact">Contact</Link></span>
      </div>
    </footer>
  )
}
