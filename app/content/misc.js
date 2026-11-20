// Offers, FAQ, testimonials and gallery.

// From the current Offers / Day Outing pages. Spa inclusions on the old site are removed because the
// spa is marked "currently non-operational" there. TO CONFIRM current prices & validity.
export const OFFERS = [
  {
    slug: 'summer-splash', title: 'Summer Splash', kind: 'Day outing', img: 'pool-view',
    price: '₹2,500++ per person', timing: '2:00 PM – 9:00 PM',
    includes: ['Swimming pool access', 'High tea', 'Dinner (set menu)', 'Horse riding & light music at the pool (per person)'],
    note: 'Add a room for the night from ₹5,000 + taxes.',
  },
  {
    slug: 'family-fiesta', title: 'Family Fiesta', kind: 'Stay package', img: 'courtyard-2',
    includes: ['Breakfast and one additional meal daily at Swarn Mahal', 'Elephant experience in the Aravalli hills with transfers', 'Daily supervised kids’ hour with goodies'],
  },
  {
    slug: 'royal-stables', title: 'Royal Stables Escape', kind: 'Stay package', img: 'riding',
    includes: ['Daily supervised horse riding on the estate', 'Hotel services credit of ₹2,500 per room', 'Daily kids’ hour with games & goodies'],
  },
  {
    slug: 'elephant-safari', title: 'Elephant Safari', kind: 'Stay package', img: 'estate-aerial',
    includes: ['Breakfast and one additional meal daily at Swarn Mahal', 'Round-trip transfers from Jaipur Airport', 'Elephant experience near the Aravalli hills with transfers'],
  },
]

// Written from confirmed facts; items flagged TO CONFIRM are drawn from public listings.
export const FAQ = [
  ['Where is The Vijayran Palace?', 'We are on NH-8 at Village Kacherawala, Kukas, on the northern edge of Jaipur against the Aravalli hills. Amer Fort is about 19 km away, Jaipur International Airport about 30 km and Jaipur Junction about 27 km.'],
  ['What are the check-in and check-out times?', 'Check-in is from 2:00 PM and check-out is by 11:00 AM. Early check-in and late check-out are subject to availability, so please ask us when you book.'], // TO CONFIRM
  ['Do you arrange airport or railway transfers?', 'Yes. We can arrange transfers from Jaipur Airport or the railway station on request, and some packages include round-trip airport transfers.'],
  ['Can you host destination weddings?', 'Yes. We host more than 100 celebrations a year across seven spaces, from courtyards for 100 guests to the Vijayran Mahal Bagh lawn for up to 1,500. We host Hindu, Christian and Nikaah ceremonies.'],
  ['Do you offer day-outing packages?', 'Yes. The Summer Splash day outing runs from 2:00 PM to 9:00 PM and includes pool access, high tea and a set dinner. See Offers for the latest packages.'],
  ['Can you cater to Jain or other dietary preferences?', 'Our kitchen regularly prepares Jain meals and can accommodate most dietary needs. Please let us know in advance.'],
  ['Is the resort family friendly?', 'Very. There is a kids’ club and play area, a games room, pony rides and a large pool. Family rooms and suites are available.'],
  ['Is there Wi-Fi and parking?', 'Complimentary Wi-Fi is available, along with free on-site parking.'],
  ['How do I get the best rate?', 'Book directly on this website or call reservations on +91 99998 22609 for our best available rates and current offers.'],
]

// Testimonials published on the current site. Replaced at runtime by live Google reviews when /api/reviews is configured.
export const TESTIMONIALS = [
  { title: 'Great experience at Vijayran Palace', author: 'Amandeep Kaur', rating: 5,
    text: 'Staff was very helpful and well-behaved! The swimming pool was also amazing. The room was spacious and has a very beautiful view of hilly areas.' },
  { title: 'An amazing weekend', author: 'Noopur Sharma', rating: 5,
    text: 'Beautiful property, helpful staff, and amazing food. A Presidential Villa with a private swimming pool and lawn is icing on the cake.' },
  { title: 'Superb place for any type of visit', author: 'Aditya G.', rating: 5,
    text: 'I visited with my family for one day, but with all the services provided I extended my stay for two nights. The Jain food preparation was so good.' },
  { title: 'Venue for the destination marriage', author: 'Nidhi B.', rating: 5,
    text: 'Beautiful lawns, well-appointed rooms and the old traditional look of the building with all the modern amenities make it a great choice to celebrate.' },
]

export const GALLERY = [
  ['hero-aerial', 'Palace', 'Aerial view of The Vijayran Palace and its domes'],
  ['facade', 'Palace', 'The saffron façade with chhatris and jaali balconies'],
  ['corridor', 'Palace', 'An arched corridor of cusped arches'],
  ['main-gate', 'Palace', 'The main gate of the palace'],
  ['estate-aerial', 'Palace', 'The estate and villas from above'],
  ['pool-infinity', 'Palace', 'The palace reflected in the pool'],
  ['estate-view', 'Palace', 'The estate against the Aravalli hills'],
  ['signage', 'Palace', 'The palace by night'],
  ['villa-1', 'Rooms', 'Presidential Villa with private pool'],
  ['villa-2', 'Rooms', 'Presidential Villa master bedroom'],
  ['jharokha-1', 'Rooms', 'Jharokha Haveli Suite with painted ceiling'],
  ['terrace-2', 'Rooms', 'Terrace Haveli Suite terrace'],
  ['courtyard-2', 'Rooms', 'Courtyard Haveli Suite'],
  ['teal-suite', 'Rooms', 'A hand-painted teal hall'],
  ['decor-night', 'Weddings', 'Wedding décor lit at night'],
  ['haldi', 'Weddings', 'A Haldi celebration'],
  ['petals', 'Weddings', 'Petals showered at a Haldi'],
  ['prewed-1', 'Weddings', 'Pre-wedding shoot on the palace terrace'],
  ['prewed-2', 'Weddings', 'Pre-wedding portrait under a chandelier'],
  ['prewed-3', 'Weddings', 'A couple in the palace courtyard'],
  ['teal-couple', 'Weddings', 'A couple in the painted hall'],
  ['chequer-hall', 'Weddings', 'A bride on the chequered marble floor'],
  ['decor-1', 'Weddings', 'Floral mandap décor'],
  ['music-night', 'Weddings', 'A musical night at the palace'],
  ['party', 'Weddings', 'An evening celebration by the pool'],
  ['dining-1', 'Dining', 'Swarn Mahal restaurant'],
  ['dining-3', 'Dining', 'Poolside dinner setting'],
  ['dining-4', 'Dining', 'A painted dining hall'],
  ['riding', 'Experiences', 'Horse riding at the palace'],
  ['folk', 'Experiences', 'A Rajasthani folk dancer'],
]
