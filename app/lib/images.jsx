import manifest from '../content/images.json'

/** Responsive WebP image from the generated manifest (scripts/images.py). */
export function Img({ name, alt = '', sizes = '100vw', className = '', eager = false, ...rest }) {
  const m = manifest[name]
  if (!m) return null
  const srcs = m.srcs
  const fallback = srcs[Math.min(1, srcs.length - 1)][0]
  return (
    <img
      src={fallback}
      srcSet={srcs.map(([s, w]) => `${s} ${w}w`).join(', ')}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      fetchPriority={eager ? 'high' : undefined}
      className={className}
      {...rest}
    />
  )
}

export const imgUrl = (name, prefer = 1280) => {
  const m = manifest[name]
  if (!m) return '/images/og-default.jpg'
  return (m.srcs.find(([, w]) => w >= prefer) || m.srcs[m.srcs.length - 1])[0]
}
