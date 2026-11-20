import { Link } from 'react-router'
import Intro from '../components/Intro.jsx'
import HomeHero from '../components/HomeHero.jsx'
import { RoomCard } from '../components/UI.jsx'
import { RoyalDay, PullQuote } from '../components/Signature.jsx'
import { Img } from '../lib/images.jsx'
import { reveal } from '../lib/motion.js'
import { seo, resortLd, abs } from '../lib/seo.js'
import { roomBySlug } from '../content/rooms.js'
import { ROYAL_DAY } from '../content/experiences.js'
import { SITE } from '../content/site.js'

export const links = () => [{ rel: 'preload', as: 'image', href: '/video/hero-poster.jpg', fetchPriority: 'high' }]

export const meta = () => seo({
  title: 'The Vijayran Palace | Heritage Palace Resort in Jaipur near Amer',
  description: 'A Rajput haveli-style palace resort in the Aravalli foothills, 19 km from Amer Fort. Heritage suites, private-pool villas, destination weddings and day outings in Jaipur.',
  path: '/',
  image: '/video/hero-poster.jpg',
  jsonLd: [resortLd(), { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: abs('/') }],
})

const FEATURED = ['presidential-villas', 'courtyard-haveli-suites', 'jharokha-haveli-suites'].map(roomBySlug)

export default function Home() {
  return (
    <>
      <Intro />
      <HomeHero />

      {/* 1. Statement */}
      <section className="statement">
        <div className="statement__grid">
          <p className="eyebrow" data-reveal ref={reveal}>The palace</p>
          <div data-reveal ref={reveal} style={{ '--d': '120ms' }}>
            <p className="statement__text">
              Set against the Aravalli hills near Amer, The Vijayran Palace is a Rajput haveli of carved jharokhas,
              sandstone courtyards and lawns that turn gold at sunset: a place <em>where you are the king</em>.
            </p>
            <ul className="statement__facts">
              <li><strong>19 km</strong>from Amer Fort</li>
              <li><strong>7</strong>celebration spaces</li>
              <li><strong>4.8</strong>Tripadvisor · Travellers' Choice 2026</li>
            </ul>
            <p className="mt-48"><Link viewTransition to="/about" className="link-u link-u--gold">Our story</Link></p>
          </div>
        </div>
      </section>

      {/* 2. Editorial image pair */}
      <section className="collage" aria-label="The palace">
        <div className="collage__grid" data-reveal ref={reveal}>
          <div className="collage__a"><Img name="estate-aerial" alt="The palace and its villas in the Aravalli foothills" sizes="(max-width: 760px) 100vw, 60vw" /></div>
          <div className="collage__b"><Img name="corridor" alt="A corridor of cusped arches" sizes="35vw" /></div>
          <p className="collage__cap">The estate and its private-pool villas, with Amer twenty minutes away.</p>
        </div>
      </section>

      {/* 3. Stay */}
      <section className="sec sec--sand">
        <header className="rowhead" data-reveal ref={reveal}>
          <div><p className="eyebrow">Stay</p><h2>Suites &amp; villas</h2></div>
          <Link viewTransition to="/accommodation" className="link-u link-u--gold">All accommodation</Link>
        </header>
        <div className="stay3">{FEATURED.map((r, i) => <RoomCard key={r.slug} room={r} i={i} />)}</div>
      </section>

      {/* 4. A royal day */}
      <RoyalDay moments={ROYAL_DAY} />

      {/* 5. Weddings */}
      <section className="bleed" aria-label="Weddings">
        <Img name="decor-night" alt="Wedding décor lit at night in the palace courtyard" className="bleed__img" sizes="100vw" />
        <div className="bleed__shade" />
        <div className="bleed__inner" data-reveal ref={reveal}>
          <div>
            <p className="eyebrow eyebrow--light">Weddings</p>
            <h2 className="bleed__title">A royal wedding<br />in Jaipur</h2>
          </div>
          <div>
            <p className="bleed__text">Seven celebration spaces for 100 to 1,500 guests, from fountain courtyards to the great lawn beneath the Aravallis.</p>
            <Link viewTransition to="/weddings" className="btn btn--gold"><span>Plan your celebration</span></Link>
          </div>
        </div>
      </section>

      {/* 6. A guest's words */}
      <PullQuote
        quote="I visited with my family for one day, but with all the services provided, I extended my stay for two nights."
        author="Aditya G." meta="Guest" />

      {/* 7. Dining & experiences */}
      <section className="sec sec--ivory" style={{ paddingTop: 0 }}>
        <div className="duo">
          <Link viewTransition to="/experiences/dining" className="duo__item" data-reveal ref={reveal}>
            <div className="duo__img"><Img name="dining-1" alt="Swarn Mahal restaurant" sizes="(max-width: 760px) 100vw, 45vw" /></div>
            <p className="eyebrow mt-24">Dining</p>
            <h3>Swarn Mahal &amp; dinners under the sky</h3>
            <p>Rajasthani classics and dishes from around the world, with produce from our own kitchen gardens.</p>
            <span className="link-u link-u--gold">Discover</span>
          </Link>
          <Link viewTransition to="/experiences/activities" className="duo__item" data-reveal ref={reveal} style={{ '--d': '120ms' }}>
            <div className="duo__img"><Img name="riding" alt="Horse riding at the palace" sizes="(max-width: 760px) 100vw, 45vw" /></div>
            <p className="eyebrow mt-24">Experiences</p>
            <h3>The royal stables &amp; folk evenings</h3>
            <p>Carriage rides at dusk, Ghoomar by the bonfire, and the forts of Amer a short drive away.</p>
            <span className="link-u link-u--gold">Discover</span>
          </Link>
        </div>
      </section>

      {/* 8. Closing */}
      <section className="closing">
        <div data-reveal ref={reveal}>
          <span className="closing__deva" lang="hi">पधारो म्हारे देस</span>
          <h2 className="closing__title">Your palace in the Aravallis awaits</h2>
          <div className="closing__btns">
            <a className="btn btn--gold" href={SITE.bookingUrl} target="_blank" rel="noopener"><span>Book your stay</span></a>
            <a className="btn btn--ghost btn--dark" href={`tel:${SITE.phones.reservations.tel}`}><span>{SITE.phones.reservations.label}</span></a>
          </div>
          <p className="closing__note">Best rates when you book direct.</p>
        </div>
      </section>
    </>
  )
}
