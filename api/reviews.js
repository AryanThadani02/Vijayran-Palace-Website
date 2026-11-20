// Vercel serverless function: GET /api/reviews
// Fetches live Google reviews with the Places API (New) and caches them at the edge for 6 hours.
// Env vars (Vercel → Settings → Environment Variables):
//   GOOGLE_PLACES_API_KEY  – a key restricted to the Places API (New)
//   GOOGLE_PLACE_ID        – The Vijayran Palace's Place ID (find it with Places Text Search)
// Google's terms require showing author attribution and not storing review content long-term.

export default async function handler(req, res) {
  const key = process.env.GOOGLE_PLACES_API_KEY
  const id = process.env.GOOGLE_PLACE_ID
  if (!key || !id) return res.status(503).json({ error: 'reviews not configured' })
  try {
    const r = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(id)}?languageCode=en`, {
      headers: { 'X-Goog-Api-Key': key, 'X-Goog-FieldMask': 'rating,userRatingCount,reviews,googleMapsUri' },
    })
    if (!r.ok) return res.status(502).json({ error: `places ${r.status}` })
    const d = await r.json()
    const reviews = (d.reviews || [])
      .filter(v => v.rating >= 4 && (v.text?.text || v.originalText?.text))
      .map(v => ({
        rating: v.rating,
        text: v.text?.text || v.originalText?.text,
        author: v.authorAttribution?.displayName || 'Google user',
        url: v.authorAttribution?.uri,
        when: v.relativePublishTimeDescription,
      }))
    res.setHeader('Cache-Control', 's-maxage=21600, stale-while-revalidate=86400')
    return res.status(200).json({ rating: d.rating, count: d.userRatingCount, url: d.googleMapsUri, reviews })
  } catch {
    return res.status(500).json({ error: 'failed' })
  }
}
