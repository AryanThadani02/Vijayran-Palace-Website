/* Ornament system, drawn from The Vijayran Palace's own architecture:
   the cusped arch of its colonnades, the jaali of its balconies,
   the painted vines of its suite ceilings and its chhatri roofline. */

// Cusped (scalloped) Rajput arch in a 0–1 unit box.
export const ARCH_PATH =
  'M0,1 L0,0.40 Q-0.008,0.322 0.05,0.27 Q0.074,0.189 0.15,0.16 Q0.207,0.09 0.3,0.075 ' +
  'Q0.37,0.025 0.45,0.035 L0.5,0 L0.55,0.035 Q0.63,0.025 0.7,0.075 Q0.793,0.09 0.85,0.16 ' +
  'Q0.926,0.189 0.95,0.27 Q1.008,0.322 1,0.40 L1,1 Z'

// Same arch without the base line, for frames.
export const ARCH_OPEN = ARCH_PATH.replace(' L1,1 Z', ' L1,1')

/** Scale the unit arch into absolute coordinates. */
export function archAt(x, y, w, h) {
  return ARCH_PATH.replace(/(-?\d*\.?\d+),(-?\d*\.?\d+)/g, (_, a, b) =>
    `${(x + parseFloat(a) * w).toFixed(2)},${(y + parseFloat(b) * h).toFixed(2)}`)
}

/** Global SVG defs: arch clip-path usable from CSS as clip-path:url(#vp-arch). */
export function OrnamentDefs() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
      <defs>
        <clipPath id="vp-arch" clipPathUnits="objectBoundingBox">
          <path d={ARCH_PATH} />
        </clipPath>
      </defs>
    </svg>
  )
}

/** Double gold hairline arch frame; stretches to its container. */
export function ArchFrame({ className = '', inset = 10 }) {
  return (
    <span className={`arch-frame ${className}`} aria-hidden="true">
      <svg viewBox="0 0 1 1" preserveAspectRatio="none">
        <path d={ARCH_OPEN} vectorEffect="non-scaling-stroke" />
      </svg>
      <svg viewBox="0 0 1 1" preserveAspectRatio="none" style={{ top: inset, left: inset, width: `calc(100% - ${inset * 2}px)`, height: `calc(100% - ${inset}px)` }}>
        <path d={ARCH_OPEN} vectorEffect="non-scaling-stroke" />
      </svg>
    </span>
  )
}

/** Lotus mark: used for ratings and as the centre of dividers. */
export function Lotus({ size = 18, className = '', filled = true }) {
  return (
    <svg className={className} width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"
      fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={filled ? 0 : 1}>
      <path d="M12 3C14.6 6.2 14.6 11 12 15.2 9.4 11 9.4 6.2 12 3Z" />
      <path d="M2.8 8.2C7 8.7 10.2 11.6 11.5 15.6 7 15.6 4 12.6 2.8 8.2Z" />
      <path d="M21.2 8.2C17 8.7 13.8 11.6 12.5 15.6 17 15.6 20 12.6 21.2 8.2Z" />
      <path d="M4.5 17.4C9 19.6 15 19.6 19.5 17.4 15 18.4 9 18.4 4.5 17.4Z" />
    </svg>
  )
}

/** Painted-vine divider: from the hand-painted ceiling borders of the suites. */
export function VineDivider({ className = '' }) {
  const half = (
    <g>
      <path d="M4 16 H96" />
      <path d="M96 16 c6 0 9 -5 6 -8 c-3 -3 -7 0 -5 3" />
      <path d="M28 16 q6 -9 15 -7 q-6 7 -15 7Z" className="leaf" />
      <path d="M54 16 q6 9 15 7 q-6 -7 -15 -7Z" className="leaf" />
      <path d="M78 16 q5 -7 12 -6 q-5 6 -12 6Z" className="leaf" />
      <circle cx="12" cy="16" r="1.6" className="leaf" />
    </g>
  )
  return (
    <svg className={`vine ${className}`} viewBox="0 0 240 32" aria-hidden="true">
      {half}
      <g transform="translate(240 0) scale(-1 1)">{half}</g>
      <g transform="translate(108 3) scale(1)">
        <path className="leaf" d="M12 3C14.6 6.2 14.6 11 12 15.2 9.4 11 9.4 6.2 12 3Z" />
        <path className="leaf" d="M2.8 8.2C7 8.7 10.2 11.6 11.5 15.6 7 15.6 4 12.6 2.8 8.2Z" />
        <path className="leaf" d="M21.2 8.2C17 8.7 13.8 11.6 12.5 15.6 17 15.6 20 12.6 21.2 8.2Z" />
        <path className="leaf" d="M4.5 17.4C9 19.6 15 19.6 19.5 17.4 15 18.4 9 18.4 4.5 17.4Z" />
      </g>
    </svg>
  )
}

/** Chequer band: from the black-and-white marble verandas. */
export function ChequerBand({ className = '' }) {
  return <div className={`chequer ${className}`} role="presentation" />
}

/** One chhatri (domed pavilion) in line art. */
function Chhatri({ x, base, w, h }) {
  const l = x - w / 2, r = x + w / 2, top = base - h
  const domeTop = top - w * 0.95
  return (
    <g>
      <path d={`M${l} ${base} V${top} M${r} ${base} V${top}`} />
      <path d={`M${l + w * 0.18} ${base} V${top + h * 0.45} Q${x} ${top + h * 0.05} ${r - w * 0.18} ${top + h * 0.45} V${base}`} />
      <path d={`M${l - 6} ${top} H${r + 6}`} />
      <path d={`M${l} ${top} Q${l} ${domeTop + w * 0.1} ${x} ${domeTop} Q${r} ${domeTop + w * 0.1} ${r} ${top}`} />
      <path d={`M${x} ${domeTop} V${domeTop - 12}`} />
      <circle cx={x} cy={domeTop - 14} r="2" />
    </g>
  )
}

/** Palace roofline + Aravalli ridge, used in the footer. Original line drawing. */
export function Skyline({ className = '' }) {
  const chhatris = [
    [430, 30, 26], [520, 26, 22], [610, 38, 34], [700, 30, 26],
    [800, 64, 58], [900, 30, 26], [990, 38, 34], [1080, 26, 22], [1170, 30, 26],
  ]
  const baseY = 150
  const arches = []
  for (let x = 380; x < 1220; x += 40) {
    arches.push(<path key={x} d={archAt(x + 8, 166, 24, 40)} />)
  }
  return (
    <svg className={`skyline ${className}`} viewBox="0 0 1600 220" preserveAspectRatio="xMidYMax meet" aria-hidden="true">
      <path className="ridge" d="M0 120 C120 70 240 96 360 64 C480 30 600 92 740 58 C880 22 1020 86 1160 50 C1300 18 1460 80 1600 56" />
      <path className="ridge faint" d="M0 150 C160 116 300 136 460 110 C640 84 760 130 920 108 C1080 88 1240 128 1600 100" />
      <path d={`M360 ${baseY} H1240 M360 ${baseY} V220 M1240 ${baseY} V220 M340 ${baseY} H1260`} />
      {arches}
      {chhatris.map(([x, h, w]) => <Chhatri key={x} x={x} base={baseY} w={w} h={h} />)}
      <path d="M0 219 H1600" />
    </svg>
  )
}
