// Global facts about the property. Values marked TO CONFIRM must be checked with the client before launch.

export const SITE_URL = (import.meta.env?.VITE_SITE_URL || 'https://www.royalquestresorts.com').replace(/\/$/, '')

export const SITE = {
  name: 'The Vijayran Palace',
  brand: 'Royal Quest Resorts',
  tagline: 'Heritage Meets Opulence',
  description:
    'A Rajput haveli-style palace resort in the Aravalli foothills at Kukas, Jaipur, 19 km from Amer Fort, with heritage suites, private-pool villas and seven wedding venues.',
  address: {
    street: 'NH-8, Village Kacherawala, Kukas',
    city: 'Jaipur',
    region: 'Rajasthan',
    postcode: '302028',
    country: 'IN',
    full: 'NH-8, Kukas, Village Kacherawala, Jaipur, Rajasthan 302028',
  },
  geo: { lat: 27.03, lon: 75.89 }, // TO CONFIRM from the Google Maps pin
  phones: {
    reservations: { label: '+91 99998 22609', tel: '+919999822609' },
    weddings: { label: '+91 99991 63809', tel: '+919999163809' },
    sales: { label: '+91 99997 66809', tel: '+919999766809' },
  },
  whatsapp: '919999822609', // TO CONFIRM: no WhatsApp number on the current site; using reservations
  emails: {
    reservations: 'resv@royalquestresorts.com',
    sales: 'sales@royalquestresorts.com',
  },
  checkIn: '14:00', // TO CONFIRM (from public listings)
  checkOut: '11:00', // TO CONFIRM
  bookingUrl:
    'https://www.swiftbook.io/inst/#home?propertyId=622MTqtrrTvISYL6ULEQBTI2zhv8o6h6TcrQI2OTA=&JDRN=Y',
  mapsEmbed:
    'https://maps.google.com/maps?q=The%20Vijayran%20Palace%2C%20NH-8%20KACHERA%20WALA%2C%20Kukas%2C%20Rajasthan%20302028&t=m&z=11&output=embed&iwloc=near',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=The+Vijayran+Palace+Kukas+Jaipur',
  tripadvisor:
    'https://www.tripadvisor.in/Hotel_Review-g2555901-d13485799-Reviews-The_Vijayran_Palace_by_Royal_Quest_Resorts-Kookas_Jaipur_District_Rajasthan.html',
  social: {
    Instagram: 'https://www.instagram.com/vijayranresorts/',
    Facebook: 'https://www.facebook.com/vijayranresorts/',
    YouTube: 'https://www.youtube.com/channel/UCkOLuu3C4PpCjX_KS8nZ5zg',
    Pinterest: 'https://in.pinterest.com/vijayranresorts/',
    X: 'https://x.com/vijayranresorts',
  },
  distances: [
    ['Amer Fort', '19 km'],
    ['Jaipur International Airport', '30 km'],
    ['Jaipur Junction railway station', '27 km'],
    ['Delhi (NH-48)', '~250 km'],
  ],
  trust: [
    "Travellers' Choice 2026",
    '4.8 ★ Tripadvisor · 481 reviews',
    '5.0 ★ WedMeGood · Handpicked',
    '100+ weddings a year',
    'Est. 2018 · Kukas, Jaipur',
  ],
}

export const waLink = (text = 'Hello, I would like to enquire about a stay at The Vijayran Palace.') =>
  `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`
