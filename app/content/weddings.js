// Venues and capacities from the current wedding page (royalquestresorts.com) and WedMeGood.
// TO CONFIRM: the main pool is "Trantal" on the wedding page but "Ambar Taal" on the activities page.

export const CEREMONIES = ['Welcome', 'Haldi', 'Mehendi', 'Sangeet', 'Pheras', 'Reception']

export const VENUES = [
  { name: 'Vijayran Mahal Bagh', kind: 'Front lawn · mountain views', seat: 1000, cap: 1500, for: ['Pheras', 'Reception', 'Sangeet'] },
  { name: 'Rang Mahal', kind: 'Built-in stage · heritage backdrop & gardens', seat: 400, cap: 500, for: ['Reception', 'Sangeet'] },
  { name: 'Raj Mahal', kind: 'Air-conditioned banquet hall', seat: 250, cap: 300, for: ['Sangeet', 'Reception', 'Welcome'] },
  { name: 'Char Bagh', kind: 'Fountain square', seat: 200, cap: 250, for: ['Pheras', 'Mehendi', 'Welcome'] },
  { name: 'Trantal', kind: 'Main pool area', seat: 150, cap: 200, for: ['Haldi', 'Mehendi', 'Sangeet'] },
  { name: 'Haveli Chowk', kind: 'Central haveli courtyard', seat: 100, cap: 150, for: ['Mehendi', 'Haldi', 'Welcome'] },
  { name: 'Royal Courtyard', kind: 'Banquet hall · fountain area', seat: 100, cap: 150, for: ['Welcome', 'Haldi'] },
  { name: 'Swarn Mahal', kind: 'Restaurant · intimate dinners', seat: 100, cap: 120, for: ['Welcome'] },
]

export const WEDDING_MOMENTS = [
  { title: 'Haldi by the pool', img: 'haldi', text: 'Marigolds, turmeric and laughter in the open air, beside the water.' },
  { title: 'Mehendi in the aangan', img: 'mehendi', text: 'Henna and folk songs in a royal courtyard-style aangan.' },
  { title: 'A musical night', img: 'music-night', text: 'A DJ or live band beside the pool, under a sky of lights.' },
  { title: 'Pheras at sunset', img: 'ceremony', text: 'Vows exchanged against the Aravallis as the sun goes down.' },
]

export const WEDDING_SERVICES = [
  ['Themes & décor', 'Awe-inspiring themes designed and curated by our in-house creative team. Outside decorators are welcome too.'],
  ['Every tradition', 'Traditional Hindu ceremonies, Christian weddings and Nikaah, each woven with care.'],
  ['Cultural show', 'An exclusive folk performance for your guests, with Rajasthani songs, dances and the much-loved Ghoomar.'],
  ['Feasts', 'Our chefs work closely with you on menus spanning Rajasthani, Hyderabadi, Awadhi and Kashmiri classics, plus Italian and French dishes.'],
  ['Stay', 'Heritage suites and private-pool villas for the family, with full-buyout packages on request.'],
  ['Photography', 'Jharokhas, painted halls, arched corridors and mountain sunsets make the palace a natural set.'],
]
