// Activities, attractions and dining, from the current site's pages.
// Stock photography on the old site (yoga, elephant, camel, jeep, birding) is NOT used; those
// activities use illustrated glyphs until the resort supplies its own photos.

export const SIGNATURE = [
  { title: 'The Royal Stables', hi: 'अस्तबल', img: 'riding', href: '/experiences/activities#horse-riding',
    text: 'Our horses live and train on the estate. Choose a pony ride for the little ones, a carriage at dusk, or a ride out towards the hills.' },
  { title: 'From Our Gardens to Your Thali', hi: 'थाली', img: 'dining-3', href: '/experiences/dining',
    text: 'Fresh spices, herbs and vegetables from our own organic kitchen gardens, cooked into Rajasthani classics and dishes from around the world.' },
  { title: 'Evenings of Ghoomar', hi: 'घूमर', img: 'folk', href: '/experiences/activities#folk-music',
    text: 'Ravanhatha strings, Kalbeliya and Ghoomar dancers and a crackling bonfire, beneath a sky full of stars.' },
]

export const ACTIVITIES = [
  { id: 'horse-riding', title: 'Horse Riding & Carriage Rides', glyph: 'horse', img: 'horse',
    text: 'Our friendly, well-trained horses make every ride fun and safe for young and old alike. Choose a pony ride for the children or a romantic carriage ride for two, an experience you will remember for years.' },
  { id: 'folk-music', title: 'Rajasthani Folk Evenings', glyph: 'music', img: 'folk',
    text: 'Rajasthan is the land of the Ravanhatha, of Kalbeliya and Ghoomar. Spend an evening of music, dance and festivity with traditional folk artists by the fire.' },
  { id: 'pool', title: 'Ambar Taal, the Pool', glyph: 'water', img: 'pool-infinity',
    text: 'Start the day with an early swim, or enjoy a late-evening game of water volleyball. One of the largest pools in Jaipur reflects the palace at sunset.' },
  { id: 'elephant', title: 'Elephant Experience with Lunch or Dinner', glyph: 'elephant',
    text: 'A short drive from the palace, we take you through the scenic beauty of Amer. After the welcome you can feed the elephants, then ride through the hills, spotting birds along the way, before a meal of local delicacies.' },
  { id: 'yoga', title: 'Morning Yoga', glyph: 'lotus',
    text: 'Guided morning yoga in our outdoor spaces, with birdsong, the Aravallis and the soft light of dawn.' },
  { id: 'camel', title: 'Camel Ride in the Aravallis', glyph: 'camel',
    text: 'Discover the land the way the caravans did, on a camel ride through the Aravalli foothills.' },
  { id: 'jeep-safari', title: 'Open Jeep Safari', glyph: 'jeep',
    text: 'Head off-road in an open jeep to encounter the wildlife and birds of Rajasthan.' },
  { id: 'village-walk', title: 'Heritage & Village Walks', glyph: 'chhatri',
    text: "Walk into the region's culture and traditions. Amer Fort, Nahargarh and the old villages of the Aravallis are all within easy reach." },
  { id: 'birding', title: 'Bird Watching', glyph: 'bird',
    text: 'More than 150 varieties of birds can be seen in their natural habitat around the estate and the hills.' },
  { id: 'games', title: 'Games Room & Kids Club', glyph: 'games',
    text: "Billiards, table tennis, air hockey and darts, plus a supervised kids' club and play area that keep the whole family happy." },
]

export const ATTRACTIONS = [
  { title: 'Amer Fort', img: 'amber-fort', distance: '19 km',
    text: 'The Rajput citadel above Maota Lake, and the perfect picture of ancient Indian architecture. Learn about the Kachhwaha rulers and the old hunting traditions of the kings.' },
  { title: 'Hawa Mahal', img: 'hawa-mahal', distance: '~35 km',
    text: "The ‘palace of winds’: a five-storey façade of 953 jharokhas in the shape of a crown, and Jaipur's most famous landmark." },
  { title: 'City Palace', img: 'city-palace', distance: '~35 km',
    text: 'A fusion of Mughal and Rajput architecture covering almost a seventh of the walled city, with a museum worth an unhurried afternoon.' },
  { title: 'Birla Lakshmi Narayan Temple', img: 'birla-mandir', distance: '~40 km',
    text: 'A temple of white marble that dominates the skyline of south Jaipur, at its most beautiful when lit at dusk.' },
  { title: 'Gaitore Cenotaphs', img: 'gaitore', distance: '~28 km',
    text: 'The royal cenotaphs of the Kachhwaha kings in a narrow valley on the Jaipur–Amer road. The chhatri of Sawai Jai Singh II deserves a special mention.' },
]

export const DINING = [
  { title: 'Fine Dining', hi: 'स्वर्ण महल', img: 'dining-1',
    text: 'Dine at Swarn Mahal, where the bygone regal era comes alive through tasteful interiors, fine tapestry and exquisite miniature artwork, one of Rajasthan’s finest gifts to art.' },
  { title: 'Dinner Under the Sky', hi: 'तारों तले', img: 'dining-5',
    text: 'A magical evening under the open sky, with a lavish spread and the scent of evening primroses on the breeze.' },
  { title: 'Poolside Dinner', hi: 'ताल किनारे', img: 'dining-3',
    text: 'A laid-back dinner by the pool with the people you love, and the wind caressing your senses.' },
  { title: 'Romantic Dinner for Two', hi: 'प्रेम', img: 'dining-2',
    text: 'Tell us a day ahead and we will set a table sprawled with roses and lit by aromatic candles, for an evening with a Mughal-e-Azam feel.' },
  { title: 'Dining in Your Room', hi: 'कक्ष में', img: 'dining-4',
    text: 'After a long day of sightseeing, pick from the menu, call the kitchen, and a lavish dinner arrives at your door.' },
]
