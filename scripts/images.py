"""Builds optimised WebP images for the site from the extracted media library.
Run from the site folder:  python scripts/images.py
Source: ../media/uploads  ->  public/images/<key>-<width>.webp  +  app/content/images.json
"""
import glob, json, os
from PIL import Image

SRC = os.path.join('..', 'media', 'uploads')
OUT = os.path.join('public', 'images')
WIDTHS = [640, 1280, 1920]

IMAGES = {
    # estate
    'hero-aerial': '2023/05/banner-01-1.jpg', 'estate-aerial': '2023/05/banner-02-2.jpg',
    'estate-view': '2021/05/inner-slider-01.jpg', 'hall-interior': '2023/05/banner.jpg',
    'facade': '2023/05/courtyard-banner.jpg', 'main-gate': '2021/06/Main-Gate.jpg',
    'pool-infinity': '2021/06/ambertallpool-img.jpg', 'pool-view': '2021/04/LUCK7602.jpg',
    'pool-main': '2021/06/The-Vijaran-Swimming-Pool-1-scaled.jpg', 'corridor': '2021/06/g9.jpg',
    'teal-suite': '2021/06/g6.jpg', 'chequer-hall': '2021/05/wedding-02.jpg', 'signage': '2021/06/g3.jpg',
    # rooms
    'villa-1': '2021/06/Villa-Swimming-Pool-7-2048x1151.jpg', 'villa-2': '2021/04/Villa-Master-Room.jpg',
    'villa-3': '2021/05/pv-03.png', 'villa-4': '2021/05/pv05.png', 'villa-5': '2021/05/pv04.png',
    'terrace-1': '*/*/Haveli-Terrace--2048x1365.jpg', 'terrace-2': '2021/05/tr-01.jpg',
    'terrace-3': '2021/05/tr-02.jpg', 'terrace-4': '2021/05/ter03.png',
    'courtyard-1': '2021/06/courtyard-06.jpg', 'courtyard-2': '2021/05/cou-01.jpg',
    'courtyard-3': '2021/05/cou-02.jpg', 'courtyard-4': '2021/05/courtyard4.png',
    'balcony-1': '2023/05/balcony-banner.jpg', 'balcony-2': '2021/04/Balcony-Haveli-Suites.jpg', 'balcony-3': '2021/05/bl-03.jpg',
    'jharokha-1': '2021/05/Jharoka4.png', 'jharokha-2': '2021/05/jslide1.jpg',
    'jharokha-3': '2021/05/jslide22.jpg', 'jharokha-4': '2021/04/Jharoka-Haveli-Suites.jpg',
    'twin-1': '2021/06/twin-bed.jpg', 'twin-2': '2021/04/Haveli-Room-with-Twin-Bed.jpg', 'twin-3': '2021/05/havali.jpg',
    # experiences & dining
    'horse': '2021/06/horse-img.jpg', 'riding': '2021/06/riding.jpg', 'folk': '2021/05/rajfolk.jpg',
    'dining-1': '2021/05/dining-01.jpg', 'dining-2': '2021/05/dining-02.jpg', 'dining-3': '2021/05/dining-3.jpg',
    'dining-4': '2021/05/dining-04.jpg', 'dining-5': '2021/05/dining-05.jpg',
    # weddings
    'haldi': '2023/05/KV_0546-2048x1365.jpg', 'petals': '2023/05/IMG_1852-2048x1365.jpeg',
    'decor-night': '2023/04/Final.jpg', 'prewed-1': '2023/05/pre-wedding11.jpg', 'prewed-2': '2023/05/pre-wedding12.jpg',
    'prewed-3': '2021/06/g10.jpg', 'prewed-4': '2021/06/g11.jpg', 'prewed-5': '2021/06/g8.jpg',
    'ceremony': '2023/05/destination-wedding-banner.jpg', 'music-night': '2021/06/music-night-3-2.jpg',
    'music-night-2': '2021/06/music-night-3-5.jpg', 'mehendi': '2021/05/wedding01.jpg', 'decor-1': '2021/06/g2.jpg',
    'decor-2': '2021/06/g4.jpg', 'party': '2021/06/g5.jpg', 'banquet': '2021/12/meetin-events.webp',
    'teal-couple': '2021/05/wedding03.jpg',
    # attractions (from the current site; confirm licensing)
    'amber-fort': '2021/05/AmberFort.jpg', 'hawa-mahal': '2021/05/HawaMahal.jpg', 'city-palace': '2021/05/CityPalace.jpg',
    'birla-mandir': '2021/05/NarayanTemple.jpg', 'gaitore': '2021/05/Gaitore.jpg',
}

def find(pattern):
    hits = glob.glob(os.path.join(SRC, pattern))
    if not hits:
        raise SystemExit(f'missing source: {pattern}')
    return hits[0]

def main():
    os.makedirs(OUT, exist_ok=True)
    manifest = {}
    for key, pattern in IMAGES.items():
        im = Image.open(find(pattern)).convert('RGB')
        w0, h0 = im.size
        widths = [w for w in WIDTHS if w < w0] + [min(w0, WIDTHS[-1])]
        srcs = []
        for w in sorted(set(widths)):
            h = round(h0 * w / w0)
            name = f'{key}-{w}.webp'
            path = os.path.join(OUT, name)
            if not os.path.exists(path):
                im.resize((w, h), Image.LANCZOS).save(path, 'WEBP', quality=78, method=6)
            srcs.append([f'/images/{name}', w])
        manifest[key] = {'w': w0, 'h': h0, 'srcs': srcs}
    # Open Graph image (1200x630 JPEG)
    og = Image.open(find(IMAGES['hero-aerial'])).convert('RGB')
    r = max(1200 / og.width, 630 / og.height)
    og = og.resize((round(og.width * r), round(og.height * r)), Image.LANCZOS)
    l, t = (og.width - 1200) // 2, (og.height - 630) // 2
    og.crop((l, t, l + 1200, t + 630)).save(os.path.join(OUT, 'og-default.jpg'), quality=82)
    os.makedirs(os.path.join('app', 'content'), exist_ok=True)
    with open(os.path.join('app', 'content', 'images.json'), 'w') as f:
        json.dump(manifest, f, indent=1)
    total = sum(os.path.getsize(os.path.join(OUT, x)) for x in os.listdir(OUT))
    print(f'{len(manifest)} images, {len(os.listdir(OUT))} files, {total/1e6:.1f} MB')

if __name__ == '__main__':
    main()
