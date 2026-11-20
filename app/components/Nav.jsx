import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router'
import { SITE, waLink } from '../content/site.js'
import { ROOMS } from '../content/rooms.js'
import { Img } from '../lib/images.jsx'
import { useWeather, condition, istClock } from '../lib/weather.js'
import { Lotus } from './Ornaments.jsx'

const MENUS = {
  stay: {
    label: 'Stay', hi: 'कक्ष', to: '/accommodation',
    intro: { title: 'Suites framed by jharokhas', text: 'Private-pool villas, courtyard and terrace suites, and classic haveli rooms.', cta: 'All accommodation' },
    cards: ROOMS.map(r => ({ to: `/accommodation/${r.slug}`, img: r.images[0], title: r.name, meta: r.tagline })),
  },
  experiences: {
    label: 'Experiences', hi: 'अनुभव', to: '/experiences',
    intro: { title: 'A day in the life of the palace', text: 'Royal stables, folk evenings, dining under the stars and the forts of Amer.', cta: 'All experiences' },
    cards: [
      { to: '/experiences/activities', img: 'riding', title: 'Activities', meta: 'Horses, folk music, pool & more' },
      { to: '/experiences/dining', img: 'dining-1', title: 'Dining', meta: 'Swarn Mahal & dinners under the sky' },
      { to: '/experiences/attractions', img: 'amber-fort', title: 'Around Jaipur', meta: 'Amer, Hawa Mahal, City Palace' },
      { to: '/gallery', img: 'corridor', title: 'Gallery', meta: 'The palace in pictures' },
    ],
  },
  weddings: {
    label: 'Weddings', hi: 'शाही शादी', to: '/weddings',
    intro: { title: 'Shahi Shaadi', text: 'Seven royal spaces for 100 to 1,500 guests, with décor, feasts and folk performances.', cta: 'Plan your wedding' },
    cards: [
      { to: '/weddings', img: 'decor-night', title: 'Destination Weddings', meta: 'Venues & venue finder' },
      { to: '/weddings/pre-wedding-shoots', img: 'prewed-1', title: 'Pre-wedding Shoots', meta: 'Jharokhas, halls & terraces' },
      { to: '/weddings/meetings-events', img: 'banquet', title: 'Meetings & Events', meta: 'Banquets, offsites & celebrations' },
    ],
  },
}
const LEFT = ['stay', 'experiences', 'weddings']
const RIGHT = [
  { label: 'Day Outing', hi: 'सैर', to: '/day-outing' },
  { label: 'Offers', hi: 'उपहार', to: '/offers' },
  { label: 'Journal', hi: 'डायरी', to: '/blog' },
]

function UtilityBar() {
  const { data } = useWeather()
  const [now, setNow] = useState('')
  useEffect(() => { setNow(istClock()); const id = setInterval(() => setNow(istClock()), 30_000); return () => clearInterval(id) }, [])
  const c = data ? condition(data.current.weather_code) : null
  const [season, setSeason] = useState('')
  useEffect(() => {
    const m = Number(new Date().toLocaleString('en-US', { month: 'numeric', timeZone: 'Asia/Kolkata' }))
    setSeason(m >= 10 || m <= 3 ? 'Peak season · Oct – Mar' : m <= 6 ? 'Summer · Pool season' : 'Monsoon · Green Aravallis')
  }, [])
  return (
    <div className="util">
      <span className="util__l">
        <span>Jaipur {now && `· ${now}`}</span>
        {data && <span>{Math.round(data.current.temperature_2m)}°C · {c.label}</span>}
      </span>
      <a className="util__c" href={SITE.tripadvisor} target="_blank" rel="noopener">
        <Lotus size={11} /> Travellers' Choice 2026 · 4.8 on Tripadvisor
      </a>
      <span className="util__r">
        {season && <span className="util__season">{season}</span>}
        <a href={`tel:${SITE.phones.reservations.tel}`}>{SITE.phones.reservations.label}</a>
        <Link viewTransition to="/contact">Contact</Link>
      </span>
    </div>
  )
}

function Brand({ onClick }) {
  return (
    <Link viewTransition to="/" className="brand" aria-label={`${SITE.name}, home`} onClick={onClick}>
      <img src="/crest-mark.png" alt="" width="44" height="39" className="brand__crest" />
      <span className="brand__text">
        <span className="brand__name">The Vijayran Palace</span>
        <span className="brand__by">by Royal Quest Resorts</span>
      </span>
    </Link>
  )
}

function Mega({ id, open, onClose }) {
  const m = MENUS[id]
  return (
    <div className={`mega ${open ? 'is-open' : ''}`} id={`mega-${id}`} role="region" aria-label={m.label} aria-hidden={!open}>
      <div className="mega__inner">
        <div className="mega__intro">
          <p className="eyebrow eyebrow--light">{m.label} · <span lang="hi">{m.hi}</span></p>
          <p className="mega__title">{m.intro.title}</p>
          <p className="mega__text">{m.intro.text}</p>
          <Link viewTransition to={m.to} className="link-u link-u--light" onClick={onClose} tabIndex={open ? 0 : -1}>{m.intro.cta} →</Link>
        </div>
        <div className={`mega__cards mega__cards--${m.cards.length}`}>
          {m.cards.map((c, i) => (
            <Link viewTransition key={c.to + c.title} to={c.to} className="mcard" onClick={onClose} tabIndex={open ? 0 : -1} style={{ '--i': i }}>
              <span className="mcard__img arch-clip"><Img name={c.img} alt="" sizes="200px" /></span>
              <span className="mcard__title">{c.title}</span>
              <span className="mcard__meta">{c.meta}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function Nav() {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [mega, setMega] = useState(null)
  const [drawer, setDrawer] = useState(false)
  const [acc, setAcc] = useState(null)
  const lastY = useRef(0)
  const closeTimer = useRef()

  useEffect(() => {
    const on = () => {
      const y = window.scrollY
      setScrolled(y > 40)
      setHidden(y > 320 && y > lastY.current + 4)
      if (y < lastY.current - 4) setHidden(false)
      lastY.current = y
    }
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  useEffect(() => { setMega(null); setDrawer(false) }, [pathname])

  useEffect(() => {
    document.documentElement.classList.toggle('is-locked', drawer)
    if (window.__lenis) drawer ? window.__lenis.stop() : window.__lenis.start()
  }, [drawer])

  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') { setMega(null); setDrawer(false) } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const openMega = id => { clearTimeout(closeTimer.current); setMega(id) }
  const leave = () => { closeTimer.current = setTimeout(() => setMega(null), 160) }
  const section = '/' + pathname.split('/')[1]
  const isActive = id => (id === 'stay' ? section === '/accommodation' : id === 'experiences' ? section === '/experiences' || section === '/gallery' : section === '/weddings')

  return (
    <>
      <header className={`nav ${scrolled || mega ? 'is-solid' : ''} ${hidden && !mega ? 'is-hidden' : ''}`} onMouseLeave={leave}>
        {pathname !== '/' && <UtilityBar />}
        <div className="nav__bar">
          <button className="nav__burger" onClick={() => setDrawer(true)} aria-label="Open menu" aria-expanded={drawer}>
            <span /><span /><span />
          </button>

          <nav className="nav__links nav__links--l" aria-label="Main">
            {LEFT.map(id => (
              <div key={id} className="nav__item" onMouseEnter={() => openMega(id)}>
                <Link
                  to={MENUS[id].to}
                  className={`nav__link ${isActive(id) ? 'is-active' : ''}`}
                  aria-expanded={mega === id}
                  aria-controls={`mega-${id}`}
                  onFocus={() => openMega(id)}
                >
                  <span className="nav__en-wrap"><span className="nav__clip"><span className="nav__en">{MENUS[id].label}</span></span><i className="nav__caret" aria-hidden="true" /></span>
                  <span className="nav__hi" lang="hi" aria-hidden="true">{MENUS[id].hi}</span>
                  <Lotus size={10} className="nav__mark" />
                </Link>
              </div>
            ))}
          </nav>

          <Brand />

          <nav className="nav__links nav__links--r" aria-label="More">
            {RIGHT.map(l => (
              <NavLink viewTransition key={l.to} to={l.to} className={({ isActive: a }) => `nav__link ${a ? 'is-active' : ''}`} onMouseEnter={() => setMega(null)} onFocus={() => setMega(null)}>
                <span className="nav__clip"><span className="nav__en">{l.label}</span></span>
                <span className="nav__hi" lang="hi" aria-hidden="true">{l.hi}</span>
                <Lotus size={10} className="nav__mark" />
              </NavLink>
            ))}
            <a className="btn btn--gold nav__book" href={SITE.bookingUrl} target="_blank" rel="noopener"><span>Book Now</span></a>
          </nav>

          <a className="nav__book-sm" href={SITE.bookingUrl} target="_blank" rel="noopener">Book</a>
        </div>

        {LEFT.map(id => (
          <div key={id} onMouseEnter={() => openMega(id)}>
            <Mega id={id} open={mega === id} onClose={() => setMega(null)} />
          </div>
        ))}
      </header>
      <div className={`mega-scrim ${mega ? 'is-on' : ''}`} onMouseEnter={() => setMega(null)} aria-hidden="true" />

      {/* Mobile drawer */}
      <div className={`drawer ${drawer ? 'is-open' : ''}`} role="dialog" aria-modal="true" aria-label="Menu" aria-hidden={!drawer}>
        <div className="drawer__top">
          <Brand onClick={() => setDrawer(false)} />
          <button className="drawer__close" onClick={() => setDrawer(false)} aria-label="Close menu">✕</button>
        </div>
        <ul className="drawer__list">
          {LEFT.map((id, k) => (
            <li key={id} className={acc === id ? 'is-open' : ''}>
              <button className="drawer__group" onClick={() => setAcc(acc === id ? null : id)} aria-expanded={acc === id} tabIndex={drawer ? 0 : -1}>
                <em className="drawer__num">{String(k + 1).padStart(2, '0')}</em>{MENUS[id].label}<span lang="hi">{MENUS[id].hi}</span><i aria-hidden="true">+</i>
              </button>
              <div className="drawer__sub"><div>
                <div className="drawer__cards">
                  {MENUS[id].cards.map(c => (
                    <Link viewTransition key={c.to + c.title} to={c.to} className="mcard" tabIndex={acc === id ? 0 : -1}>
                      <span className="mcard__img arch-clip"><Img name={c.img} alt="" sizes="40vw" /></span>
                      <span className="mcard__title">{c.title}</span>
                    </Link>
                  ))}
                </div>
                <Link viewTransition to={MENUS[id].to} className="link-u link-u--light" tabIndex={acc === id ? 0 : -1}>{MENUS[id].intro.cta} →</Link>
              </div></div>
            </li>
          ))}
          {[...RIGHT, { label: 'About', hi: 'परिचय', to: '/about' }, { label: 'Contact', hi: 'पधारो', to: '/contact' }].map((l, k) => (
            <li key={l.to}><Link viewTransition to={l.to} className="drawer__group" tabIndex={drawer ? 0 : -1}><em className="drawer__num">{String(k + 4).padStart(2, '0')}</em>{l.label}<span lang="hi">{l.hi}</span></Link></li>
          ))}
        </ul>
        <div className="drawer__foot">
          <a className="btn btn--gold" href={SITE.bookingUrl} target="_blank" rel="noopener" tabIndex={drawer ? 0 : -1}><span>Book Your Stay</span></a>
          <p><a href={`tel:${SITE.phones.reservations.tel}`}>{SITE.phones.reservations.label}</a> · <a href={`mailto:${SITE.emails.reservations}`}>{SITE.emails.reservations}</a></p>
        </div>
      </div>

      {/* Mobile action bar */}
      <div className="actionbar" role="navigation" aria-label="Quick actions">
        <a href={`tel:${SITE.phones.reservations.tel}`}>Call</a>
        <a href={waLink()} target="_blank" rel="noopener">WhatsApp</a>
        <a href={SITE.bookingUrl} target="_blank" rel="noopener" className="is-gold">Book Now</a>
      </div>
    </>
  )
}
