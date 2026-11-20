import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { ArchFrame, Lotus, VineDivider } from './Ornaments.jsx'
import { Img } from '../lib/images.jsx'
import { reveal } from '../lib/motion.js'
import { SITE } from '../content/site.js'
import { CEREMONIES, VENUES } from '../content/weddings.js'
import { TESTIMONIALS } from '../content/misc.js'

const DEVA = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९']
export const deva = n => String(n).split('').map(d => DEVA[+d] ?? d).join('')

export function SectionHead({ num, eyebrow, title, children, light = false, as = 'h2', align = 'center' }) {
  const H = as
  return (
    <header className={`shead shead--${align} ${light ? 'shead--light' : ''}`} data-reveal ref={reveal}>
      {num != null && <span className="shead__num" lang="hi" aria-hidden="true">{deva(num)}</span>}
      {eyebrow && <p className={`eyebrow ${light ? 'eyebrow--light' : ''}`}>{eyebrow}</p>}
      <H className="shead__title">{title}</H>
      <VineDivider />
      {children && <p className="shead__lead">{children}</p>}
    </header>
  )
}

export function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        <li><Link to="/">Home</Link></li>
        {items.map(([name, path], i) => (
          <li key={path}>{i === items.length - 1 ? <span aria-current="page">{name}</span> : <Link to={path}>{name}</Link>}</li>
        ))}
      </ol>
    </nav>
  )
}

/** Inner-page hero: full-bleed photo, arch-framed title block, breadcrumbs. */
export function PageHero({ img, eyebrow, title, hi, lead, crumbs, compact = false }) {
  return (
    <section className={`phero ${compact ? 'phero--compact' : ''}`}>
      <Img name={img} alt="" eager className="phero__img" sizes="100vw" />
      <div className="phero__shade" />
      <div className="phero__inner">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <div className="phero__card">
          <ArchFrame className="phero__frame" inset={10} />
          {hi && <span className="phero__hi" lang="hi" aria-hidden="true">{hi}</span>}
          {eyebrow && <p className="eyebrow eyebrow--light">{eyebrow}</p>}
          <h1 className="phero__title">{title}</h1>
          {lead && <p className="phero__lead">{lead}</p>}
        </div>
      </div>
    </section>
  )
}

export function TrustRibbon() {
  const items = SITE.trust
  return (
    <div className="ribbon" aria-label="Awards and ratings">
      <div className="ribbon__track">
        {[...items, ...items].map((t, i) => (
          <span key={i} aria-hidden={i >= items.length || undefined}>{t}<Lotus size={12} className="ribbon__dot" /></span>
        ))}
      </div>
    </div>
  )
}

export function CtaBand({ title = 'Your palace awaits', text = 'Book direct for our best rates, or speak with our reservations team.', img = 'pool-infinity' }) {
  return (
    <section className="cta">
      <Img name={img} alt="" className="cta__img" sizes="100vw" />
      <div className="cta__shade" />
      <div className="cta__inner" data-reveal ref={reveal}>
        <p className="eyebrow eyebrow--light" lang="hi">पधारो म्हारे देस</p>
        <h2 className="cta__title">{title}</h2>
        <p className="cta__text">{text}</p>
        <div className="cta__btns">
          <a className="btn btn--gold" href={SITE.bookingUrl} target="_blank" rel="noopener"><span>Book Your Stay</span></a>
          <a className="btn btn--ghost" href={`tel:${SITE.phones.reservations.tel}`}><span>{SITE.phones.reservations.label}</span></a>
        </div>
      </div>
    </section>
  )
}

export function RoomCard({ room, i = 0 }) {
  return (
    <article className="room" data-reveal ref={reveal} style={{ '--d': `${(i % 3) * 90}ms` }}>
      <Link to={`/accommodation/${room.slug}`} className="room__link">
        <div className="room__media">
          <div className="room__img arch-clip"><Img name={room.images[0]} alt={room.name} sizes="(max-width: 600px) 90vw, 33vw" /></div>
          <div className="room__parda arch-clip" aria-hidden="true"><span /><span /></div>
          <ArchFrame className="room__frame" />
          <span className="room__tier">{room.tier}</span>
        </div>
        <h3 className="room__name">{room.name}</h3>
        <p className="room__meta">{room.tagline}</p>
      </Link>
      <div className="room__actions">
        <Link to={`/accommodation/${room.slug}`} className="link-u">Explore</Link>
        <a href={SITE.bookingUrl} target="_blank" rel="noopener" className="link-u link-u--gold">Book</a>
      </div>
    </article>
  )
}

/** Small line glyphs for activities that don't have their own photography yet. */
export function Glyph({ k, size = 44 }) {
  const p = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.2, strokeLinecap: 'round', strokeLinejoin: 'round' }
  const g = {
    horse: <path {...p} d="M14 40V28c-4-2-6-6-5-10l6-8 4 3 4-5 3 6c5 2 8 7 8 13v13M22 40V30M30 40V31M15 18h3" />,
    music: <><path {...p} d="M12 38c8-2 10-10 10-16V8l14 4v18" /><circle {...p} cx="10" cy="38" r="3" /><circle {...p} cx="34" cy="32" r="3" /></>,
    water: <path {...p} d="M6 18c4-3 7-3 10 0s6 3 10 0 7-3 10 0 6 3 8 1M6 26c4-3 7-3 10 0s6 3 10 0 7-3 10 0 6 3 8 1M6 34c4-3 7-3 10 0s6 3 10 0 7-3 10 0 6 3 8 1" />,
    elephant: <path {...p} d="M8 34V22c0-7 6-12 13-12h6c7 0 11 5 11 11v13M8 26c-3 0-4 4-2 7M38 22c3 1 5 5 3 9-1 3-4 3-4 6M15 34v6M30 34v6M22 18h1" />,
    lotus: <><path {...p} d="M24 10c4 5 4 13 0 20-4-7-4-15 0-20Z" /><path {...p} d="M8 18c7 1 12 6 14 13-7 0-12-5-14-13ZM40 18c-7 1-12 6-14 13 7 0 12-5 14-13Z" /><path {...p} d="M10 36c9 4 19 4 28 0" /></>,
    camel: <path {...p} d="M8 40V28c0-3 2-5 5-5 2-6 6-8 9-4 2-4 7-4 9 1l3 4 4-6 3 2-2 6c-1 3-4 4-6 4v18M14 40V30M29 40V30" />,
    jeep: <><path {...p} d="M6 32V22l6-8h16l4 8h10v10H6ZM12 14v8h20" /><circle {...p} cx="14" cy="33" r="4" /><circle {...p} cx="34" cy="33" r="4" /></>,
    chhatri: <path {...p} d="M8 40h32M12 40V26M36 40V26M20 40V30q4-4 8 0v10M8 26h32M12 26q0-12 12-14 12 2 12 14M24 12V6" />,
    bird: <path {...p} d="M6 26c6-1 10-4 13-9 2 6 6 9 12 9l8-6-2 8c-3 6-9 9-16 9-6 0-11-4-15-11ZM22 32l-3 8M27 33l1 7" />,
    games: <><rect {...p} x="8" y="14" width="32" height="20" rx="3" /><circle {...p} cx="18" cy="24" r="2" /><circle {...p} cx="30" cy="24" r="2" /><path {...p} d="M8 30h32" /></>,
  }
  return <svg viewBox="0 0 48 48" width={size} height={size} aria-hidden="true" className="glyph">{g[k] || g.lotus}</svg>
}

/** Guest reviews: live Google reviews via /api/reviews when configured, else the site's testimonials. */
export function Reviews({ title = 'Chronicles of the court', num }) {
  const [live, setLive] = useState(null)
  useEffect(() => {
    let alive = true
    fetch('/api/reviews').then(r => (r.ok ? r.json() : null)).then(d => {
      if (alive && d?.reviews?.length) setLive(d)
    }).catch(() => {})
    return () => { alive = false }
  }, [])
  const list = live
    ? live.reviews.slice(0, 4).map(r => ({ title: r.when, author: r.author, text: r.text, rating: r.rating, url: r.url }))
    : TESTIMONIALS
  return (
    <section className="sec sec--ivory" id="reviews">
      <SectionHead num={num} eyebrow="Words from our guests" title={title} />
      <div className="rating" data-reveal ref={reveal}>
        <div className="rating__score">{live ? live.rating.toFixed(1) : '4.8'}</div>
        <div>
          <div className="rating__stars" aria-hidden="true">{Array.from({ length: 5 }, (_, i) => <Lotus key={i} size={20} />)}</div>
          <p>{live ? `Google · ${live.count.toLocaleString('en-IN')} reviews` : "Tripadvisor · 481 reviews · Travellers' Choice 2026"}</p>
          <p><a className="link-u link-u--gold" href={live ? live.url : SITE.tripadvisor} target="_blank" rel="noopener">Read all reviews</a></p>
        </div>
      </div>
      <div className="farmans">
        {list.map((r, i) => (
          <figure key={r.author + i} className="farman" data-reveal ref={reveal} style={{ '--d': `${i * 90}ms` }}>
            <div className="farman__stars" aria-label={`${r.rating} out of 5`}>{Array.from({ length: r.rating }, (_, k) => <Lotus key={k} size={14} />)}</div>
            {r.title && <h3>{r.title}</h3>}
            <blockquote>“{r.text.length > 260 ? r.text.slice(0, 257).trimEnd() + '…' : r.text}”</blockquote>
            <figcaption>{r.author}</figcaption>
            <span className="farman__seal" aria-hidden="true">VP</span>
          </figure>
        ))}
      </div>
      {live && <p className="note">Reviews from Google</p>}
    </section>
  )
}

export function VenueFinder() {
  const [ceremony, setCeremony] = useState('Sangeet')
  const [guests, setGuests] = useState(250)
  const matches = useMemo(() => VENUES.filter(v => v.cap >= guests && v.for.includes(ceremony)), [ceremony, guests])
  const best = matches.slice().sort((a, b) => a.cap - b.cap)[0]
  return (
    <div className="finder" data-reveal ref={reveal}>
      <p className="eyebrow eyebrow--light">Venue finder</p>
      <div className="finder__chips" role="radiogroup" aria-label="Ceremony">
        {CEREMONIES.map(c => (
          <button key={c} role="radio" aria-checked={ceremony === c} className={`chip ${ceremony === c ? 'is-on' : ''}`} onClick={() => setCeremony(c)}>{c}</button>
        ))}
      </div>
      <label className="finder__range">
        <span>Guests <strong>{guests.toLocaleString('en-IN')}</strong></span>
        <input type="range" min="50" max="1500" step="50" value={guests} onChange={e => setGuests(Number(e.target.value))} />
      </label>
      <ul className="venues">
        {VENUES.map(v => (
          <li key={v.name} className={`venue ${matches.includes(v) ? 'is-ok' : ''} ${best === v ? 'is-best' : ''}`}>
            <span className="venue__name">{v.name}{best === v && <em> · Our suggestion</em>}</span>
            <span className="venue__kind">{v.kind}</span>
            <span className="venue__cap">{v.seat}–{v.cap}</span>
          </li>
        ))}
      </ul>
      {!matches.length && <p className="finder__none">For a celebration of this size, we combine spaces. Our wedding team will design it with you.</p>}
      <a className="btn btn--gold" href="#enquire"><span>Request an Audience</span></a>
    </div>
  )
}

export function Gallery({ items, filters = true }) {
  const cats = ['All', ...new Set(items.map(i => i[1]))]
  const [cat, setCat] = useState('All')
  const [open, setOpen] = useState(-1)
  const list = cat === 'All' ? items : items.filter(i => i[1] === cat)
  useEffect(() => {
    if (open < 0) return
    const on = e => {
      if (e.key === 'Escape') setOpen(-1)
      if (e.key === 'ArrowRight') setOpen(o => (o + 1) % list.length)
      if (e.key === 'ArrowLeft') setOpen(o => (o - 1 + list.length) % list.length)
    }
    window.addEventListener('keydown', on)
    document.documentElement.classList.add('is-locked'); window.__lenis?.stop()
    return () => { window.removeEventListener('keydown', on); document.documentElement.classList.remove('is-locked'); window.__lenis?.start() }
  }, [open, list.length])
  return (
    <>
      {filters && (
        <div className="tabs" role="tablist" aria-label="Filter gallery">
          {cats.map(c => <button key={c} role="tab" aria-selected={cat === c} className={`tab ${cat === c ? 'is-on' : ''}`} onClick={() => setCat(c)}>{c}</button>)}
        </div>
      )}
      <div className="masonry">
        {list.map(([name, , alt], i) => (
          <button key={name} className="masonry__item" onClick={() => setOpen(i)} aria-label={`Open image: ${alt}`}>
            <Img name={name} alt={alt} sizes="(max-width: 700px) 50vw, 33vw" />
          </button>
        ))}
      </div>
      {open >= 0 && list[open] && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={list[open][2]} onClick={() => setOpen(-1)}>
          <button className="lightbox__close" onClick={() => setOpen(-1)} aria-label="Close">✕</button>
          <button className="lightbox__nav lightbox__nav--l" onClick={e => { e.stopPropagation(); setOpen((open - 1 + list.length) % list.length) }} aria-label="Previous">‹</button>
          <figure onClick={e => e.stopPropagation()}>
            <Img name={list[open][0]} alt={list[open][2]} sizes="90vw" eager />
            <figcaption>{list[open][2]} <span>{open + 1} / {list.length}</span></figcaption>
          </figure>
          <button className="lightbox__nav lightbox__nav--r" onClick={e => { e.stopPropagation(); setOpen((open + 1) % list.length) }} aria-label="Next">›</button>
        </div>
      )}
    </>
  )
}

/** Enquiry form. Posts JSON to VITE_FORM_ENDPOINT if set; otherwise opens a pre-filled email. */
export function EnquiryForm({ kind = 'Stay', to = SITE.emails.reservations, fields = ['name', 'email', 'phone', 'dates', 'guests', 'message'], title = 'Request an Audience', id = 'enquire' }) {
  const [state, setState] = useState('idle')
  const labels = { name: 'Your name', email: 'Email', phone: 'Phone', dates: 'Preferred dates', guests: 'Number of guests', message: 'Your message', event: 'Occasion', role: 'Position applying for' }
  async function submit(e) {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(e.currentTarget))
    const endpoint = import.meta.env.VITE_FORM_ENDPOINT
    setState('sending')
    try {
      if (endpoint) {
        const r = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify({ kind, ...data }) })
        if (!r.ok) throw new Error(String(r.status))
      } else {
        const body = Object.entries(data).map(([k, v]) => `${labels[k] || k}: ${v}`).join('\n')
        window.location.href = `mailto:${to}?subject=${encodeURIComponent(`${kind} enquiry · ${data.name || ''}`)}&body=${encodeURIComponent(body)}`
      }
      setState('sealed')
    } catch {
      setState('error')
    }
  }
  return (
    <form className={`enq ${state === 'sealed' ? 'is-sealed' : ''}`} id={id} onSubmit={submit} data-reveal ref={reveal}>
      <ArchFrame className="enq__frame" inset={10} />
      <p className="eyebrow">{kind} enquiry</p>
      <h2 className="enq__title">{title}</h2>
      <div className="enq__grid">
        {fields.map(f => (
          <label key={f} className={`field ${f === 'message' ? 'field--wide' : ''}`}>
            <span>{labels[f] || f}</span>
            {f === 'message'
              ? <textarea name={f} rows="4" />
              : f === 'event'
                ? <select name={f} defaultValue="Wedding"><option>Wedding</option><option>Ring ceremony</option><option>Reception</option><option>Pre-wedding shoot</option><option>Corporate event</option><option>Other</option></select>
                : <input name={f} type={f === 'email' ? 'email' : f === 'phone' ? 'tel' : f === 'guests' ? 'number' : 'text'} required={f === 'name' || f === 'email' || f === 'phone'} min={f === 'guests' ? 1 : undefined} autoComplete={f === 'name' ? 'name' : f === 'email' ? 'email' : f === 'phone' ? 'tel' : 'off'} />}
          </label>
        ))}
      </div>
      <button className="btn btn--gold" type="submit" disabled={state === 'sending'}><span>{state === 'sending' ? 'Sending…' : 'Send with our seal'}</span></button>
      {state === 'error' && <p className="enq__err" role="alert">Something went wrong. Please call {SITE.phones.reservations.label}.</p>}
      <div className="enq__sealed" aria-live="polite">
        {state === 'sealed' && (<>
          <span className="enq__wax" aria-hidden="true">VP</span>
          <p className="enq__thanks">Your request has been sealed and sent.</p>
          <p>Our team will reply within a day. For anything urgent, call {SITE.phones.reservations.label}.</p>
        </>)}
      </div>
    </form>
  )
}

export function Faq({ items }) {
  return (
    <div className="faq">
      {items.map(([q, a]) => (
        <details key={q} className="faq__item" data-reveal ref={reveal}>
          <summary>{q}<i aria-hidden="true" /></summary>
          <p>{a}</p>
        </details>
      ))}
    </div>
  )
}

/** Two-column editorial block: arch photo + text. */
export function Feature({ img, eyebrow, title, children, flip = false, hi, id }) {
  return (
    <div className={`feature ${flip ? 'feature--flip' : ''}`} id={id}>
      <div className="feature__media" data-reveal ref={reveal}>
        <div className="feature__img arch-clip"><Img name={img} alt={title} sizes="(max-width: 900px) 90vw, 45vw" /></div>
        <ArchFrame className="feature__frame" />
      </div>
      <div className="feature__body" data-reveal ref={reveal} style={{ '--d': '120ms' }}>
        {hi && <span className="feature__hi" lang="hi" aria-hidden="true">{hi}</span>}
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h3 className="feature__title">{title}</h3>
        {children}
      </div>
    </div>
  )
}
