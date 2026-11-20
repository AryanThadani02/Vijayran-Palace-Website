// Signature interactions inspired by Awwwards hotel winners (see research/AWWWARDS-REFERENCES.md),
// adapted to a restrained royal Rajasthani language.
import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router'
import { Img } from '../lib/images.jsx'
import { reveal, reducedMotion, useScrollProgress } from '../lib/motion.js'
import { deva } from './UI.jsx'
import { Lotus, VineDivider } from './Ornaments.jsx'

/** Words of a title rise out of a mask one after another (Velaa / Vander). */
export function SplitTitle({ text, as: H = 'h2', className = '' }) {
  if (typeof text !== 'string') return <H className={`${className} split-fallback`}>{text}</H>
  const words = text.split(' ')
  return (
    <H className={`${className} split`} aria-label={text}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="split__w" aria-hidden="true"><span style={{ '--w': i }}>{w}</span></span>
          {i < words.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </H>
  )
}

/** Slow editorial ticker with ✦ separators (Villa Aurelia). */
export function Marquee({ items, dark = false }) {
  const row = items.map((t, i) => <span key={i} className="marq__item">{t}<i aria-hidden="true">✦</i></span>)
  return (
    <div className={`marq ${dark ? 'marq--dark' : ''}`} aria-label={items.join(', ')}>
      <div className="marq__track" aria-hidden="true">{row}{row}</div>
    </div>
  )
}

/** One grand serif testimonial (Velaa). */
export function PullQuote({ quote, author, meta }) {
  return (
    <section className="pq">
      <figure className="pq__fig" data-reveal ref={reveal}>
        <span className="pq__mark" aria-hidden="true">“</span>
        <blockquote className="pq__q">{quote}</blockquote>
        <figcaption className="pq__by"><Lotus size={14} /> {author}{meta && <span> · {meta}</span>}</figcaption>
      </figure>
    </section>
  )
}

/** "Ek Shahi Din": a pinned horizontal day-in-the-life sequence (Terreno's "24 hours"). */
export function RoyalDay({ moments }) {
  const sectionRef = useRef(null), trackRef = useRef(null), barRef = useRef(null)
  const [active, setActive] = useState(0)
  const onProgress = useCallback(p => {
    const track = trackRef.current
    if (!track || window.innerWidth < 900 || reducedMotion()) { if (track) track.style.transform = ''; return }
    const max = track.scrollWidth - window.innerWidth
    track.style.transform = `translate3d(${-max * p}px,0,0)`
    if (barRef.current) barRef.current.style.transform = `scaleX(${p})`
    setActive(Math.min(moments.length - 1, Math.round(p * (moments.length - 1))))
  }, [moments.length])
  useScrollProgress(sectionRef, onProgress)
  return (
    <section className="day" ref={sectionRef} style={{ '--n': moments.length }} aria-label="A royal day at the palace">
      <div className="day__sticky">
        <header className="day__head">
          <p className="eyebrow eyebrow--light">Ek Shahi Din · <span lang="hi">एक शाही दिन</span></p>
          <h2 className="day__title">A royal day, hour by hour</h2>
          <p className="day__clock" aria-hidden="true"><span>{moments[active].time}</span> / {moments[moments.length - 1].time}</p>
        </header>
        <ol className="day__track" ref={trackRef}>
          {moments.map((m, i) => (
            <li key={m.time} className={`day__card ${i === active ? 'is-active' : ''}`}>
              <div className="day__img arch-clip"><Img name={m.img} alt={m.title} sizes="(max-width: 900px) 80vw, 28vw" /></div>
              <p className="day__time">{m.time}<span lang="hi" aria-hidden="true"> {deva(String(i + 1).padStart(2, '0'))}</span></p>
              <h3>{m.title}</h3>
              <p className="day__text">{m.text}</p>
              {m.href && <Link viewTransition to={m.href} className="link-u link-u--light" viewTransition>Discover</Link>}
            </li>
          ))}
        </ol>
        <div className="day__bar" aria-hidden="true"><i ref={barRef} /></div>
      </div>
    </section>
  )
}

/** Venue names that swap the photograph on hover or focus (Velaa's dining module). */
export function HoverList({ items, eyebrow, title }) {
  const [i, setI] = useState(0)
  return (
    <div className="hl">
      <div className="hl__media" aria-hidden="true">
        {items.map((it, k) => (
          <div key={it.title} className={`hl__img arch-clip ${k === i ? 'is-on' : ''}`}><Img name={it.img} alt="" sizes="(max-width: 900px) 90vw, 40vw" /></div>
        ))}
      </div>
      <div className="hl__list">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        {title && <h2 className="hl__title">{title}</h2>}
        <VineDivider className="hl__vine" />
        <ul>
          {items.map((it, k) => (
            <li key={it.title} className={k === i ? 'is-on' : ''}>
              <button onMouseEnter={() => setI(k)} onFocus={() => setI(k)} onClick={() => setI(k)} aria-pressed={k === i}>
                <span className="hl__num">{String(k + 1).padStart(2, '0')}</span>
                <span className="hl__name">{it.title}</span>
                {it.hi && <span className="hl__hi" lang="hi">{it.hi}</span>}
              </button>
              <div className="hl__body"><div><Img name={it.img} alt={it.title} sizes="90vw" className="hl__mimg" /><p>{it.text}</p></div></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

/** Room gallery slider with a "01 / 05" counter, arrows, keys and swipe (Villa Aurelia). */
export function Slider({ images, label }) {
  const [i, setI] = useState(0)
  const n = images.length
  const go = d => setI(v => (v + d + n) % n)
  const start = useRef(null)
  return (
    <div className="slider" role="region" aria-roledescription="carousel" aria-label={label}
      onKeyDown={e => { if (e.key === 'ArrowRight') go(1); if (e.key === 'ArrowLeft') go(-1) }} tabIndex={0}
      onPointerDown={e => { start.current = e.clientX }}
      onPointerUp={e => { if (start.current != null && Math.abs(e.clientX - start.current) > 40) go(e.clientX < start.current ? 1 : -1); start.current = null }}>
      <div className="slider__stage">
        {images.map((name, k) => (
          <div key={name} className={`slider__slide ${k === i ? 'is-on' : ''}`} aria-hidden={k !== i}>
            <Img name={name} alt={`${label}, photo ${k + 1}`} sizes="(max-width: 900px) 100vw, 80vw" />
          </div>
        ))}
      </div>
      <div className="slider__ui">
        <span className="slider__count"><b>{String(i + 1).padStart(2, '0')}</b> / {String(n).padStart(2, '0')}</span>
        <span className="slider__dots">{images.map((_, k) => <button key={k} className={k === i ? 'is-on' : ''} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} />)}</span>
        <span className="slider__arrows">
          <button onClick={() => go(-1)} aria-label="Previous photo">←</button>
          <button onClick={() => go(1)} aria-label="Next photo">→</button>
        </span>
      </div>
    </div>
  )
}

/** "Watch the film": full resort film in a lightbox, with sound, only on request (Tengile / White Desert). */
export function FilmButton({ className = '' }) {
  const [open, setOpen] = useState(false)
  const vRef = useRef(null)
  useEffect(() => {
    if (!open) return
    const on = e => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', on)
    document.documentElement.classList.add('is-locked'); window.__lenis?.stop()
    vRef.current?.play().catch(() => {})
    return () => { window.removeEventListener('keydown', on); document.documentElement.classList.remove('is-locked'); window.__lenis?.start() }
  }, [open])
  return (
    <>
      <button className={`film-btn ${className}`} onClick={() => setOpen(true)}>
        <span className="film-btn__ring" aria-hidden="true"><svg viewBox="0 0 24 24" width="12" height="12"><path d="M8 5v14l11-7z" fill="currentColor" /></svg></span>
        <span className="film-btn__txt">Watch the film <em>1:57</em></span>
      </button>
      {open && createPortal(
        <div className="film" role="dialog" aria-modal="true" aria-label="The Vijayran Palace film" onClick={() => setOpen(false)}>
          <button className="film__close" onClick={() => setOpen(false)} aria-label="Close film">✕</button>
          <video ref={vRef} className="film__video" src="/video/film.mp4" poster="/video/hero-poster.jpg" controls playsInline onClick={e => e.stopPropagation()} />
        </div>,
        document.body,
      )}
    </>
  )
}
