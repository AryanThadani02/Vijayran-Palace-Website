import { useState } from 'react'
import { Link } from 'react-router'
import Intro from '../components/Intro.jsx'
import HomeHero from '../components/HomeHero.jsx'
import Mausam from '../components/Mausam.jsx'
import { ArchFrame, ChequerBand } from '../components/Ornaments.jsx'
import { SectionHead, TrustRibbon, RoomCard, Reviews, VenueFinder, CtaBand } from '../components/UI.jsx'
import { Img } from '../lib/images.jsx'
import { reveal } from '../lib/motion.js'
import { seo, resortLd, abs } from '../lib/seo.js'
import { POSTS, formatDate } from '../lib/blog.js'
import { ROOMS } from '../content/rooms.js'
import { SIGNATURE } from '../content/experiences.js'
import { SITE } from '../content/site.js'

export const links = () => [{ rel: 'preload', as: 'image', href: '/video/hero-poster.jpg', fetchPriority: 'high' }]

export const meta = () => seo({
  title: 'The Vijayran Palace | Heritage Palace Resort in Jaipur near Amer',
  description: 'A Rajput haveli-style palace resort in the Aravalli foothills, 19 km from Amer Fort. Heritage suites, private-pool villas, destination weddings and day outings in Jaipur.',
  path: '/',
  image: '/video/hero-poster.jpg',
  jsonLd: [resortLd(), { '@context': 'https://schema.org', '@type': 'WebSite', name: SITE.name, url: abs('/') }],
})

function RoomsPreview() {
  const [tab, setTab] = useState('All')
  const list = tab === 'All' ? ROOMS : ROOMS.filter(r => r.tier === tab)
  return (
    <section className="sec sec--sand" id="rooms">
      <SectionHead num={2} eyebrow="Accommodation · कक्ष" title="Suites framed by jharokhas">
        Every room has a carved jharokha. Choose a villa with its own pool, a suite opening onto a private courtyard or terrace, or a classic haveli room.
      </SectionHead>
      <div className="tabs" role="tablist" aria-label="Filter rooms">
        {['All', 'Villa', 'Suite', 'Room'].map(t => (
          <button key={t} role="tab" aria-selected={tab === t} className={`tab ${tab === t ? 'is-on' : ''}`} onClick={() => setTab(t)}>{t === 'All' ? 'All stays' : `${t}s`}</button>
        ))}
      </div>
      <div className="rooms">{list.map((r, i) => <RoomCard key={r.slug} room={r} i={i} />)}</div>
      <p className="center mt-48"><Link className="btn btn--dark btn--ghost" to="/accommodation"><span>Compare all stays</span></Link></p>
    </section>
  )
}

export default function Home() {
  return (
    <>
      <Intro />
      <HomeHero />
      <TrustRibbon />

      <section className="sec sec--ivory">
        <SectionHead num={1} eyebrow="5-Star Heritage Resort in Jaipur" title={<>A palace where <em>you</em> are the king</>}>
          Set against the Aravalli hills near Amer, The Vijayran Palace brings together old-world Rajput grandeur and modern comfort: carved jharokhas,
          sandstone courtyards, fountain squares and lawns that turn gold at sunset.
        </SectionHead>
        <dl className="stats" data-reveal ref={reveal}>
          <div><dt>7</dt><dd>Wedding &amp; event venues</dd></div>
          <div><dt>1,500</dt><dd>Guests on the Mahal Bagh</dd></div>
          <div><dt>19 km</dt><dd>To Amer Fort</dd></div>
          <div><dt>4.9</dt><dd>Tripadvisor rating for rooms</dd></div>
        </dl>
        <p className="center mt-48"><Link to="/about" className="link-u link-u--gold">Our story</Link></p>
      </section>

      <ChequerBand />
      <RoomsPreview />

      <section className="sec sec--ivory" id="experiences">
        <SectionHead num={3} eyebrow="Signature Experiences · अनुभव" title="A day in the life of the palace" />
        <div className="exps">
          {SIGNATURE.map((e, i) => (
            <article key={e.title} className="exp" data-reveal ref={reveal} style={{ '--d': `${i * 120}ms` }}>
              <Link to={e.href} className="exp__media">
                <div className="exp__img arch-clip"><Img name={e.img} alt={e.title} sizes="(max-width: 900px) 90vw, 30vw" /></div>
                <ArchFrame className="exp__frame" />
              </Link>
              <div className="exp__body">
                <span className="exp__hi" lang="hi" aria-hidden="true">{e.hi}</span>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
                <Link to={e.href} className="link-u link-u--gold">Discover</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="taal" aria-label="Ambar Taal">
        <Img name="pool-infinity" alt="The palace reflected in the infinity pool" className="taal__img" sizes="100vw" />
        <div className="taal__shade" />
        <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
          <filter id="ripple">
            <feTurbulence type="fractalNoise" baseFrequency="0.012 0.09" numOctaves="2" seed="3">
              <animate attributeName="baseFrequency" dur="14s" values="0.012 0.09;0.014 0.11;0.012 0.09" repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" scale="9" />
          </filter>
        </svg>
        <div className="taal__copy" data-reveal ref={reveal}>
          <p className="eyebrow eyebrow--light">The Pool · <span lang="hi">अम्बर ताल</span></p>
          <h2 className="taal__title">Ambar Taal</h2>
          <p className="taal__reflect" aria-hidden="true">Ambar Taal</p>
          <p className="taal__sub">One of the largest pools in Jaipur. At sunset, watch the light fall between the palaces from the water.</p>
        </div>
      </section>

      <section className="sec sec--ink weddings">
        <div className="toran" aria-hidden="true">{Array.from({ length: 28 }, (_, i) => <i key={i} />)}</div>
        <SectionHead num={4} light eyebrow="Shahi Shaadi · शाही शादी" title="A wedding across seven royal spaces">
          From a Haldi by the pool to Pheras against the mountains at sunset. Tell us the ceremony and the number of guests, and we will show you where it belongs.
        </SectionHead>
        <div className="wed">
          <div className="wed__photos" data-reveal ref={reveal}>
            <div className="wed__ph wed__ph--a arch-clip"><Img name="haldi" alt="A Haldi celebration at the palace" sizes="40vw" /></div>
            <div className="wed__ph wed__ph--b arch-clip"><Img name="decor-night" alt="Wedding décor lit at night" sizes="30vw" /></div>
          </div>
          <div>
            <VenueFinder />
            <p className="mt-24"><Link to="/weddings" className="link-u link-u--light">Explore weddings at the palace →</Link></p>
          </div>
        </div>
      </section>

      <Mausam num={5} />
      <Reviews num={6} />

      <section className="sec sec--sand">
        <SectionHead num={7} eyebrow="The Vijayran Diaries · डायरी" title="From the journal" />
        <div className="posts">
          {POSTS.slice(0, 3).map((p, i) => (
            <article key={p.slug} className="post" data-reveal ref={reveal} style={{ '--d': `${i * 90}ms` }}>
              <Link to={`/blog/${p.slug}`} className="post__img arch-clip"><Img name={p.cover} alt="" sizes="(max-width: 900px) 90vw, 30vw" /></Link>
              <p className="post__meta">{p.category} · {p.readMinutes} min read</p>
              <h3 className="post__title"><Link to={`/blog/${p.slug}`}>{p.title}</Link></h3>
              <p className="post__date">{formatDate(p.date)}</p>
            </article>
          ))}
        </div>
      </section>

      <CtaBand />
    </>
  )
}
