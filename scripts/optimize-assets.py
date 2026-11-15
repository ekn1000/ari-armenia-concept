"""Regenerate committed image/font assets. Requires Pillow, fonttools and brotli."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
import json

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
for name in ['manrope-regular', 'manrope-bold', 'armenian-regular', 'armenian-bold']:
    font = TTFont(ASSETS / (name + '.ttf'), recalcTimestamp=False)
    font.flavor = 'woff2'
    font.save(ASSETS / (name + '.woff2'))

for name in ['ararat', 'yerevan', 'garni', 'dilijan']:
    image = Image.open(ASSETS / (name + '.webp')).convert('RGB')
    widths = [480, 800, 1200] if name == 'ararat' else [480, 800]
    for width in widths:
        if name == 'ararat':
            resized = ImageOps.fit(image, (width, width), method=Image.Resampling.LANCZOS, centering=(.47, .5))
        else:
            resized = image.copy()
            resized.thumbnail((width, 2000), Image.Resampling.LANCZOS)
        resized.save(ASSETS / f'{name}-{width}.webp', quality=82, method=6)

copy = {
    'en':(['Explore Armenia.', "We've got your back."], 'Your personal assistant in Armenia'),
    'ru':(['Открывай Армению.', 'Мы рядом.'], 'Твой персональный ассистент в Армении'),
    'hy':(['Բացահայտիր Հայաստանը։', 'Մենք քո կողքին ենք։'], 'Քո անձնական ասիստենտը Հայաստանում'),
}
for language, (lines, subtitle) in copy.items():
    canvas = Image.new('RGB', (1200, 630), '#f7f6f0')
    draw = ImageDraw.Draw(canvas)
    family = 'armenian' if language == 'hy' else 'manrope'
    draw.text((80, 47), 'ari.', font=ImageFont.truetype(str(ASSETS/'manrope-bold.ttf'), 105), fill='#243f35')
    for index, line in enumerate(lines):
        size = 64
        while True:
            font = ImageFont.truetype(str(ASSETS/f'{family}-bold.ttf'), size)
            if draw.textlength(line, font=font) <= 1030: break
            size -= 1
        draw.text((80, 225 + index*104), line, font=font, fill='#243f35' if index == 0 else '#be4e2d')
    draw.text((82, 491), subtitle, font=ImageFont.truetype(str(ASSETS/f'{family}-regular.ttf'), 29), fill='#52624f')
    draw.rectangle((0, 597, 1200, 630), fill='#244a3b')
    canvas.save(ASSETS/f'social-{language}.png', optimize=True)

for size in [48, 180]:
    scale = size * 4 / 64
    icon = Image.new('RGB', (size*4, size*4), '#f7f6f0')
    draw = ImageDraw.Draw(icon)
    for a,b in [((32,12),(32,52)),((12,32),(52,32)),((18,18),(46,46)),((18,46),(46,18))]:
        draw.line(tuple(round(v*scale) for point in [a,b] for v in point), fill='#be4e2d', width=round(7*scale))
    icon.resize((size,size),Image.Resampling.LANCZOS).save(ASSETS/f'icon-{size}.png',optimize=True)

credits = json.loads((ASSETS/'credits.json').read_text(encoding='utf-8'))
for credit in credits:
    name = Path(credit['image']).stem
    credit['variants'] = [p.name for p in sorted(ASSETS.glob(name+'-*.webp'))]
    credit['changes'] = 'Resized, converted to WebP; responsive derivatives resized and, for the hero, cropped. Displayed with cropping. Derivatives retain the original image licence.'
(ASSETS/'credits.json').write_text(json.dumps(credits, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print('Generated WOFF2 fonts, responsive photographs and three social cards.')
