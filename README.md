# The Vijayran Palace: Website V1

A multi-page website for The Vijayran Palace by Royal Quest Resorts, built in a royal Rajasthani style.
**Stack:** Vite + React with React Router v8 in framework mode. **Every page is pre-rendered to static HTML** at build time for SEO, then hydrated for the animations.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # → build/client (static files + sitemap.xml + 404.html)
npm run images     # re-generate WebP images from ../media/uploads (needs Python + Pillow)
```

## Pages (27 prerendered URLs + 404)
| Area | Routes |
|---|---|
| Home | `/` (welcome intro, opening-jharokha hero, rooms, experiences, Ambar Taal, venue finder, live weather, reviews, journal) |
| Story | `/about` |
| Stay | `/accommodation`, `/accommodation/{presidential-villas, terrace-haveli-suites, courtyard-haveli-suites, balcony-haveli-suites, jharokha-haveli-suites, haveli-room-twin}` |
| Experiences | `/experiences`, `/experiences/activities`, `/experiences/attractions`, `/experiences/dining`, `/gallery` |
| Weddings | `/weddings` (venue finder, capacity ledger, enquiry), `/weddings/pre-wedding-shoots`, `/weddings/meetings-events` |
| Packages | `/day-outing`, `/offers` |
| Journal | `/blog`, `/blog/{slug}`, written as Markdown files in `app/content/blog/` |
| Info | `/contact`, `/faq`, `/careers`, `/terms`, plus a royal 404 page |

## Navigation
- **Desktop:**
  - A slim info bar (live Jaipur time and weather, Tripadvisor rating, phone) that collapses on scroll.
  - The main bar has three links, the centred crest and name, three more links and Book Now.
  - **Mega menus** with arch-framed photo cards for Stay, Experiences and Weddings.
  - The header hides on scroll-down and returns on scroll-up. A gold lotus marks the active section, and a Devanagari label appears on hover.
- **Mobile:** a full-screen menu with accordion groups and photo cards, plus a fixed **Call · WhatsApp · Book Now** bar at the bottom.

## SEO built in
- Unique `<title>`, description, canonical link, Open Graph and Twitter tags on every page (`app/lib/seo.js`).
- JSON-LD structured data:
  - `Resort` (with address, geo and amenities)
  - `HotelRoom`, `BreadcrumbList`, `FAQPage`, `BlogPosting`, `Blog`, `Restaurant`, `ImageGallery`, `ItemList`
- `sitemap.xml` (generated at build) and `robots.txt`.
- **301 redirects from every old WordPress URL** (46 of them): `public/_redirects` for Netlify/Cloudflare and `vercel.json` for Vercel.
- Responsive WebP images (640/1280/1920 widths) with width and height set to prevent layout shift. The hero image is preloaded and everything else is lazy-loaded.
- Semantic headings (one H1 per page), breadcrumbs, `lang` attributes on Devanagari text, a skip link, and reduced-motion support.

## Configuration
Copy `.env.example` to `.env`:
- `VITE_SITE_URL`: the production domain, used for canonical links and the sitemap.
- `VITE_FORM_ENDPOINT` (optional): a Formspree, Web3Forms or similar endpoint. If it's empty, forms open a pre-filled email to reservations or sales.

**Live Google reviews** (`api/reviews.js`, a Vercel function): set `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` in the hosting environment. Until then, the reviews section shows the testimonials from the current site.

**Booking engine:** every "Book" button uses `SITE.bookingUrl` (SwiftBook) in `app/content/site.js`. Swap in the integrated engine there later.

## Deploy
- **Vercel (recommended):** import this repo (no root-directory setting needed). `vercel.json` already sets the build command, output folder, redirects and cache headers, and the `/api/reviews` function deploys automatically.
- **Netlify / Cloudflare Pages:** build command `npm run build`, publish folder `build/client`. Redirects come from `public/_redirects`.

## Editing content
All copy lives in `app/content/`:
- `site.js`: contacts, address, social links, booking URL
- `rooms.js`, `experiences.js`, `weddings.js`, `misc.js` (offers, FAQ, testimonials, gallery)
- `blog/*.md`: blog posts with frontmatter (title, description, date, category, cover image key)

## To confirm with the client before launch
1. **Facts:**
   - Room sizes and counts (from public listings)
   - Check-in at 2 PM and check-out at 11 AM
   - Exact map coordinates (for the weather widget and schema)
   - The **WhatsApp number** (currently uses the reservations number)
2. **Main pool name:** "Trantal" on the old wedding page, "Ambar Taal" on the activities page.
3. **Spa:** the old site marks the Rang Mahal spa as *non-operational*, so V1 makes no spa claims. Spa lines were also removed from the old offers.
4. **Offers:** current prices and validity.
5. **Photos:**
   - Many have the crest watermark baked in, and some carry photographer watermarks.
   - Supply clean high-resolution originals.
   - Attraction photos (Amer, Hawa Mahal and others) came from the old site, so confirm their licence.
   - Stock photos on the old site (yoga, elephant, camel, jeep, birding) are not used.
6. **Blog:** two posts are new drafts (`draft: true`) for the client to review. The Jaipur guide was ported with corrections.
7. **Terms page:** ported from the old site. Their legal team should review it. A privacy policy page still needs content from them.
8. **Hero video:** done. `node scripts/video.mjs` cuts a 14-second silent loop of the cleanest shots from the 86 MB resort film into `public/video/`: `hero.mp4` (1600×900, 3.3 MB), `hero-sm.mp4` (960×540, 1.6 MB, used on phones) and `hero-poster.jpg`. Burned-in captions and posed or car shots were left out. Edit `CUTS` in the script to change the shots, and keep the captions in `HomeHero.jsx` in sync. A new film shot without burned-in text would allow a longer loop.
