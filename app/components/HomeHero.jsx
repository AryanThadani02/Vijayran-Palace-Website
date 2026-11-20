import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { archAt } from './Ornaments.jsx'
import { useScrollProgress, easeOut, reducedMotion } from '../lib/motion.js'
import { FilmButton } from './Signature.jsx'

// Shot captions, synced to public/video/hero.mp4 (see scripts/video.mjs for the cut list).
const SHOTS = [
  [0, 'The palace at dusk'], [2.8, 'Ambar Taal, the pool'], [6.0, 'The haveli courtyard'],
  [10.6, 'In the Aravalli foothills'], [12.4, 'The palace by night'],
]
const TITLE = ['The', 'Vijayran', 'Palace']
const VB_W = 1600, VB_H = 900

/** Gold miniature-painting corner ornament. */
function Corner({ className }) {
  return (
    <svg className={`h2-corner ${className}`} viewBox="0 0 80 80" aria-hidden="true">
      <path d="M2 78V2h76" />
      <path d="M10 78V10h68" opacity=".55" />
      <path d="M2 30c10 0 18-6 20-16M30 2c0 10-6 18-16 20" />
      <circle cx="18" cy="18" r="3" />
      <path d="M22 22c6 2 10 6 12 12M22 22c2 6 6 10 12 12" opacity=".7" />
    </svg>
  )
}

/**
 * Home hero: full-bleed palace film inside a gold miniature-painting frame.
 * On scroll, the film closes into the palace's own cusped jharokha arch.
 */
export default function HomeHero() {
  const [aspect, setAspect] = useState(1.6)
  const [shot, setShot] = useState(0)
  const [paused, setPaused] = useState(false)
  const sectionRef = useRef(null), videoRef = useRef(null), maskRef = useRef(null), groupRef = useRef(null)
  const copyRef = useRef(null), chromeRef = useRef(null), endRef = useRef(null)

  useEffect(() => {
    const on = () => setAspect(window.innerWidth / window.innerHeight)
    on(); window.addEventListener('resize', on)
    const v = videoRef.current
    if (v && reducedMotion()) { v.pause(); setPaused(true) }
    return () => window.removeEventListener('resize', on)
  }, [])

  const portrait = aspect < 1
  const h = portrait ? 380 : 600, w = h * 0.66
  const cx = 800, cy = portrait ? 400 : 470

  const onProgress = useCallback(p => {
    const close = easeOut(Math.min(1, Math.max(0, (p - 0.08) / 0.7)))
    const s = reducedMotion() ? 1 : 1 + (1 - close) * 8
    groupRef.current?.setAttribute('transform', `translate(${cx} ${cy}) scale(${s}) translate(${-cx} ${-cy})`)
    if (maskRef.current) maskRef.current.style.opacity = p > 0.02 ? '1' : '0'
    if (copyRef.current) { copyRef.current.style.opacity = String(Math.max(0, 1 - p * 3.2)); copyRef.current.style.transform = `translateY(${-p * 80}px)` }
    if (chromeRef.current) chromeRef.current.style.opacity = String(Math.max(0, 1 - p * 4))
    if (endRef.current) {
      const t = Math.min(1, Math.max(0, (p - 0.6) / 0.25))
      endRef.current.style.opacity = String(t)
      endRef.current.style.transform = `translateY(${(1 - t) * 24}px)`
    }
  }, [cy])
  useScrollProgress(sectionRef, onProgress)

  const onTime = e => {
    const t = e.currentTarget.currentTime
    let i = 0
    SHOTS.forEach(([s], k) => { if (t >= s) i = k })
    if (i !== shot) setShot(i)
  }
  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) { v.play(); setPaused(false) } else { v.pause(); setPaused(true) }
  }

  const x0 = cx - w / 2, y0 = cy - h / 2
  const hole = archAt(x0, y0, w, h)
  const inner = archAt(x0 + 12, y0 + 18, w - 24, h - 18)
  const cover = `M-8000 -8000 H9600 V9000 H-8000 Z ${hole}`
  let n = 0

  return (
    <section className="h2" ref={sectionRef} aria-label="Welcome to The Vijayran Palace">
      <div className="h2__sticky">
        <video
          ref={videoRef} className="h2__video" autoPlay muted loop playsInline preload="auto"
          poster="/video/hero-poster.jpg" onTimeUpdate={onTime} aria-hidden="true"
        >
          <source src="/video/hero-sm.mp4" type="video/mp4" media="(max-width: 760px)" />
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
        <div className="h2__shade" aria-hidden="true" />

        <svg ref={maskRef} className="h2__mask" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <pattern id="h2-jaali" width="36" height="36" patternUnits="userSpaceOnUse">
              <path d="M18 2C22 10 26 14 34 18 26 22 22 26 18 34 14 26 10 22 2 18 10 14 14 10 18 2Z" fill="none" stroke="#EBC86B" strokeWidth=".7" />
              <circle cx="18" cy="18" r="2" fill="none" stroke="#EBC86B" strokeWidth=".7" />
            </pattern>
          </defs>
          <g ref={groupRef} transform={`translate(${cx} ${cy}) scale(9) translate(${-cx} ${-cy})`}>
            <path fillRule="evenodd" fill="#180A0A" d={cover} />
            <path fillRule="evenodd" fill="url(#h2-jaali)" opacity=".07" d={cover} />
            <path d={hole} fill="none" stroke="#B9822B" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
            <path d={inner} fill="none" stroke="#EBC86B" strokeOpacity=".55" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          </g>
        </svg>

        <div className="h2__chrome" ref={chromeRef}>
          <div className="h2__frame" aria-hidden="true">
            <Corner className="h2-corner--tl" /><Corner className="h2-corner--tr" />
            <Corner className="h2-corner--bl" /><Corner className="h2-corner--br" />
          </div>
          <div className="h2__shot" aria-live="off">
            <button className="h2__pause" onClick={togglePlay} aria-label={paused ? 'Play background video' : 'Pause background video'}>
              {paused ? '▶' : '❚❚'}
            </button>
            <span key={shot} className="h2__shotname">{SHOTS[shot][1]}</span>
          </div>
          <div className="h2__film"><FilmButton /></div>
        </div>

        <div className="h2__copy" ref={copyRef}>
          <p className="h2__eyebrow"><span>Heritage Meets Opulence</span></p>
          <h1 className="h2__title">
            {TITLE.map((word, wi) => (
              <span key={word} className={`h2__word h2__word--${wi}`}>
                {[...word].map(ch => <span key={n} className="h2__ch" style={{ '--i': n++ }}>{ch}</span>)}
              </span>
            ))}
          </h1>
          <div className="h2__ctas">
            <Link viewTransition className="h2__explore" to="/accommodation">Explore the palace</Link>
          </div>
        </div>

        <div className="h2__end" ref={endRef} aria-hidden="true">
          <div className="h2__end-l">
            <span lang="hi">पधारो म्हारे देस</span>
            <p>Where the Aravallis keep watch</p>
          </div>
          <div className="h2__end-r">
            <p>Carved jharokhas, sandstone courtyards and lawns that turn gold at sunset.</p>
            <Link viewTransition to="/about" className="link-u link-u--light" tabIndex={-1}>Our story →</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
