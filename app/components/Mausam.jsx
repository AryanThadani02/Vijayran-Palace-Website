import { useEffect, useState } from 'react'
import { archAt, ArchFrame } from './Ornaments.jsx'
import { SectionHead } from './UI.jsx'
import { reveal } from '../lib/motion.js'
import { useWeather, condition, currentPehar, royalLine, PEHAR, ist, istClock } from '../lib/weather.js'

const SKY = {
  prabhat: ['#F1E6D2', '#F3D79A', '#EBC86B'],
  dopahar: ['#FBF7EF', '#F7EEDC', '#F1E6D2'],
  godhuli: ['#2A1A14', '#9A5E22', '#EBC86B'],
  raat: ['#0B0505', '#180A0A', '#2A1A14'],
}
const SUN = { prabhat: [70, 236], dopahar: [150, 120], godhuli: [232, 236], raat: [218, 104] }

function RajputSun({ x, y, night }) {
  if (night) {
    return (
      <g>
        <circle cx={x} cy={y} r="22" fill="#FBF7EF" opacity=".95" />
        <circle cx={x + 9} cy={y - 6} r="20" fill="#180A0A" />
      </g>
    )
  }
  const rays = Array.from({ length: 16 }, (_, i) => {
    const a = (i / 16) * Math.PI * 2, r1 = 30, r2 = i % 2 ? 40 : 48
    const a1 = a - 0.09, a2 = a + 0.09
    return <path key={i} d={`M${x + Math.cos(a1) * r1} ${y + Math.sin(a1) * r1} L${x + Math.cos(a) * r2} ${y + Math.sin(a) * r2} L${x + Math.cos(a2) * r1} ${y + Math.sin(a2) * r1}Z`} />
  })
  return (
    <g className="msun" style={{ transformOrigin: `${x}px ${y}px` }}>
      <g fill="#B9822B" opacity=".85">{rays}</g>
      <circle cx={x} cy={y} r="26" fill="#EDB904" />
      <circle cx={x} cy={y} r="20" fill="none" stroke="#FBF7EF" strokeOpacity=".6" />
    </g>
  )
}

function Stars() {
  const pts = [[40, 70], [90, 40], [130, 90], [180, 52], [250, 70], [62, 140], [270, 150], [110, 170], [200, 160], [160, 30]]
  return <g fill="#EBC86B">{pts.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={i % 3 ? 1.2 : 1.8} className="twinkle" style={{ animationDelay: `${i * 0.4}s` }} />)}</g>
}

function Glyph({ k }) {
  const c = 'currentColor'
  if (k === 'clear') return <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill={c} />{Array.from({ length: 8 }, (_, i) => { const a = i * Math.PI / 4; return <line key={i} x1={12 + Math.cos(a) * 7} y1={12 + Math.sin(a) * 7} x2={12 + Math.cos(a) * 10} y2={12 + Math.sin(a) * 10} stroke={c} strokeWidth="1.3" strokeLinecap="round" /> })}</svg>
  const cloud = <path d="M7 18h10a4 4 0 0 0 0-8 5.5 5.5 0 0 0-10.6 1.6A3.3 3.3 0 0 0 7 18Z" fill="none" stroke={c} strokeWidth="1.3" />
  if (k === 'rain' || k === 'storm') return <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><g transform="translate(0 -3)">{cloud}</g><path d="M9 18l-1 3M13 18l-1 3M17 18l-1 3" stroke={c} strokeWidth="1.3" strokeLinecap="round" /></svg>
  if (k === 'fog') return <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 9h16M6 13h12M4 17h16" stroke={c} strokeWidth="1.3" strokeLinecap="round" /></svg>
  return <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><circle cx="9" cy="9" r="3.2" fill={c} opacity=".7" />{cloud}</svg>
}

export function MausamWindow({ pehar }) {
  const sky = SKY[pehar]
  const [sx, sy] = SUN[pehar]
  const night = pehar === 'raat'
  const ink = night ? '#2A1A14' : pehar === 'godhuli' ? '#3A2116' : '#B9822B'
  return (
    <div className="mwin">
      <svg viewBox="0 0 300 400" className="mwin__svg" role="img" aria-label={`The sky over the palace at ${PEHAR[pehar].en.toLowerCase()}`}>
        <defs>
          <linearGradient id={`sky-${pehar}`} x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor={sky[0]} /><stop offset=".6" stopColor={sky[1]} /><stop offset="1" stopColor={sky[2]} />
          </linearGradient>
          <clipPath id={`mclip-${pehar}`}><path d={archAt(0, 0, 300, 400)} /></clipPath>
        </defs>
        <g clipPath={`url(#mclip-${pehar})`}>
          <rect width="300" height="400" fill={`url(#sky-${pehar})`} />
          {night && <Stars />}
          <RajputSun x={sx} y={sy} night={night} />
          <path d="M0 300 C50 262 90 280 140 254 C190 230 240 270 300 246 V400 H0Z" fill={ink} opacity=".35" />
          <path d="M0 324 C60 300 110 316 160 296 C210 278 250 306 300 292 V400 H0Z" fill={ink} opacity=".55" />
          {/* palace silhouette */}
          <g fill={night ? '#0B0505' : '#2A1A14'} opacity={night ? 1 : 0.85}>
            <rect x="40" y="330" width="220" height="70" />
            {[[70, 14], [110, 12], [150, 22], [190, 12], [230, 14]].map(([x, r]) => (
              <g key={x}>
                <rect x={x - r} y={330 - r * 1.1} width={r * 2} height={r * 1.1} />
                <path d={`M${x - r} ${330 - r * 1.1} Q${x - r} ${330 - r * 2.6} ${x} ${330 - r * 2.8} Q${x + r} ${330 - r * 2.6} ${x + r} ${330 - r * 1.1}Z`} />
                <rect x={x - 0.8} y={330 - r * 2.8 - 9} width="1.6" height="9" />
              </g>
            ))}
            {night && [60, 100, 140, 180, 220].map(x => <rect key={x} x={x} y="350" width="8" height="12" fill="#EBC86B" opacity=".75" />)}
          </g>
        </g>
      </svg>
      <ArchFrame className="mwin__frame" inset={8} />
    </div>
  )
}

/** Mausam-e-Jaipur: live weather at the palace (Open-Meteo, no key), in the pehar of the day. */
export default function Mausam({ num, previews = false }) {
  const { data, error } = useWeather()
  const [override, setOverride] = useState(null)
  const [, tick] = useState(0)
  useEffect(() => { const id = setInterval(() => tick(t => t + 1), 60_000); return () => clearInterval(id) }, [])

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])
  const live = mounted ? currentPehar(data) : 'godhuli'
  const pehar = override || live
  const temp = data ? Math.round(data.current.temperature_2m) : null
  const cond = data ? condition(data.current.weather_code) : { key: 'clear', label: '—' }
  const days = data ? data.daily.time.slice(1, 4).map((d, i) => ({
    day: new Date(`${d}T12:00:00+05:30`).toLocaleDateString('en-IN', { weekday: 'short', timeZone: 'Asia/Kolkata' }),
    c: condition(data.daily.weather_code[i + 1]),
    hi: Math.round(data.daily.temperature_2m_max[i + 1]),
    lo: Math.round(data.daily.temperature_2m_min[i + 1]),
  })) : []
  const t = s => istClock(ist(s))
  const fmtDay = d => new Date(`${d}T12:00:00+05:30`).toLocaleDateString('en-IN', { weekday: 'short', timeZone: 'Asia/Kolkata' })

  return (
    <section className={`sec mausam mausam--${pehar}`} id="mausam">
      <SectionHead num={num} light={pehar === 'raat' || pehar === 'godhuli'} eyebrow="Mausam-e-Jaipur · मौसम" title="The sky over the palace, right now" />
      <div className="mausam__grid">
        <MausamWindow pehar={pehar} />
        <div className="mausam__panel" data-reveal ref={reveal}>
          <p className="mausam__pehar"><span lang="hi">{PEHAR[pehar].hi}</span> {PEHAR[pehar].en}{override && ' (preview)'}</p>
          <div className="mausam__now">
            <span className="mausam__temp">{temp ?? '—'}<sup>°C</sup></span>
            <span className="mausam__cond"><Glyph k={cond.key} />{cond.label}</span>
          </div>
          <p className="mausam__line">{royalLine(pehar, temp ?? 25, cond.key)}</p>
          {data && (
            <dl className="mausam__sun">
              <div><dt>Sunrise</dt><dd>{t(data.daily.sunrise[0])}</dd></div>
              <div><dt>Sunset</dt><dd>{t(data.daily.sunset[0])}</dd></div>
              <div><dt>Humidity</dt><dd>{data.current.relative_humidity_2m}%</dd></div>
            </dl>
          )}
          {days.length > 0 && (
            <ul className="mausam__days">
              {days.map(d => <li key={d.day}><span>{d.day}</span><Glyph k={d.c.key} /><span>{d.hi}° / {d.lo}°</span></li>)}
            </ul>
          )}
          {error && <p className="note">Couldn't reach the live weather service. Showing the time-of-day sky only.</p>}
          {previews && <div className="mausam__preview" role="group" aria-label="Preview pehar">
            <span>Preview:</span>
            {Object.keys(PEHAR).map(k => (
              <button key={k} className={`chip chip--sm ${pehar === k ? 'is-on' : ''}`} onClick={() => setOverride(k === live ? null : k)}>{PEHAR[k].en}</button>
            ))}
          </div>}
        </div>
      </div>
    </section>
  )
}
