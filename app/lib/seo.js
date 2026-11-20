import { SITE, SITE_URL } from '../content/site.js'

/** Builds a React Router meta() array: title, description, canonical, Open Graph, Twitter, JSON-LD. */
export function seo({ title, description, path = '/', image = '/images/og-default.jpg', type = 'website', jsonLd = [], noindex = false }) {
  const fullTitle = path === '/' ? title : `${title} | ${SITE.name}`
  const url = SITE_URL + (path === '/' ? '/' : path)
  const img = image.startsWith('http') ? image : SITE_URL + image
  const tags = [
    { title: fullTitle },
    { name: 'description', content: description },
    { tagName: 'link', rel: 'canonical', href: url },
    { property: 'og:site_name', content: `${SITE.name} by ${SITE.brand}` },
    { property: 'og:type', content: type },
    { property: 'og:title', content: fullTitle },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: img },
    { property: 'og:locale', content: 'en_IN' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: '@vijayranresorts' },
    { name: 'twitter:title', content: fullTitle },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: img },
  ]
  if (noindex) tags.push({ name: 'robots', content: 'noindex' })
  for (const ld of jsonLd) tags.push({ 'script:ld+json': ld })
  return tags
}

export const abs = p => SITE_URL + p

export function breadcrumbLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map(([name, path], i) => ({ '@type': 'ListItem', position: i + 1, name, item: abs(path) })),
  }
}

export function resortLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Resort',
    '@id': abs('/#resort'),
    name: SITE.name,
    alternateName: `${SITE.name} by ${SITE.brand}`,
    description: SITE.description,
    url: abs('/'),
    image: [abs('/images/og-default.jpg'), abs('/images/facade-1280.webp'), abs('/images/pool-infinity-960.webp')],
    logo: abs('/crest-mark.png'),
    telephone: SITE.phones.reservations.tel,
    email: SITE.emails.reservations,
    priceRange: '₹₹₹',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.street,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postcode,
      addressCountry: SITE.address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: SITE.geo.lat, longitude: SITE.geo.lon },
    hasMap: SITE.mapsLink,
    checkinTime: SITE.checkIn,
    checkoutTime: SITE.checkOut,
    amenityFeature: ['Outdoor swimming pool', 'Private pool villas', 'Restaurant', 'Free Wi-Fi', 'Free parking', 'Horse riding', "Kids' club", 'Banquet & wedding venues', 'Airport transfers']
      .map(name => ({ '@type': 'LocationFeatureSpecification', name, value: true })),
    sameAs: Object.values(SITE.social),
  }
}
