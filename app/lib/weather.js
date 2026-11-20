import { useEffect, useState } from 'react'

// The Vijayran Palace, Kukas (approx. — confirm from the Google Maps pin)
export const LAT = 27.03
export const LON = 75.89

const URL =
  `https://api.open-meteo.com/v1/forecast?latitude=${LAT}&longitude=${LON}` +
  '&current=temperature_2m,weather_code,is_day,relative_humidity_2m,wind_speed_10m' +
  '&daily=weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset' +
  '&timezone=Asia%2FKolkata&forecast_days=4'

let cache = null
function load() {
  if (!cache) {
    cache = fetch(URL)
      .then(r => (r.ok ? r.json() : Promise.reject(new Error(r.status))))
      .catch(err => { cache = null; throw err })
  }
  return cache
}

export function useWeather() {
  const [state, setState] = useState({ data: null, error: null })
  useEffect(() => {
    let alive = true
    load().then(d => alive && setState({ data: d, error: null }))
      .catch(e => alive && setState({ data: null, error: e }))
    return () => { alive = false }
  }, [])
  return state
}

// Open-Meteo returns local IST strings without an offset.
export const ist = s => new Date(`${s}:00+05:30`)

export function istClock(date = new Date()) {
  return date.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', timeZone: 'Asia/Kolkata' })
}

/** WMO code → simple condition */
export function condition(code) {
  if (code === 0) return { key: 'clear', label: 'Clear skies' }
  if (code <= 2) return { key: 'partly', label: 'Partly cloudy' }
  if (code === 3) return { key: 'cloud', label: 'Overcast' }
  if (code === 45 || code === 48) return { key: 'fog', label: 'Morning haze' }
  if (code >= 51 && code <= 67) return { key: 'rain', label: 'Light rain' }
  if (code >= 80 && code <= 82) return { key: 'rain', label: 'Monsoon showers' }
  if (code >= 95) return { key: 'storm', label: 'Thunderstorm' }
  return { key: 'cloud', label: 'Cloudy' }
}

export const PEHAR = {
  prabhat: { en: 'Dawn', hi: 'प्रभात' },
  dopahar: { en: 'Day', hi: 'दोपहर' },
  godhuli: { en: 'Dusk', hi: 'गोधूलि' },
  raat: { en: 'Night', hi: 'रात' },
}

/** Which of the four pehars is it at the palace right now? */
export function currentPehar(data, now = new Date()) {
  if (!data) {
    const h = Number(now.toLocaleString('en-US', { hour: 'numeric', hour12: false, timeZone: 'Asia/Kolkata' }))
    return h < 5 || h >= 19 ? 'raat' : h < 8 ? 'prabhat' : h < 17 ? 'dopahar' : 'godhuli'
  }
  const rise = ist(data.daily.sunrise[0]).getTime()
  const set = ist(data.daily.sunset[0]).getTime()
  const t = now.getTime(), m = 60_000
  if (t >= rise - 40 * m && t < rise + 90 * m) return 'prabhat'
  if (t >= rise + 90 * m && t < set - 60 * m) return 'dopahar'
  if (t >= set - 60 * m && t < set + 35 * m) return 'godhuli'
  return 'raat'
}

/** A line in the palace's voice, for the pehar and the weather. */
export function royalLine(pehar, temp, condKey) {
  if (condKey === 'rain' || condKey === 'storm')
    return 'Rain over the Aravallis. Chai and pakoras are being served in the Haveli Chowk.'
  switch (pehar) {
    case 'prabhat': return 'The Aravallis wake in gold. Morning yoga awaits on the lawns.'
    case 'dopahar': return temp >= 30
      ? 'A bright Rajputana noon. Ambar Taal awaits, Hukum.'
      : 'A gentle noon, perfect for a carriage ride around the estate.'
    case 'godhuli': return 'Godhuli: the sun sets between the palaces. Make your way to the terrace.'
    default: return temp <= 18
      ? 'A cool desert night. The bonfire is lit and the folk musicians have begun.'
      : 'Starlight over the chhatris. Dinner is laid out under the open sky.'
  }
}
