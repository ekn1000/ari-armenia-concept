"""Regenerate committed image/font assets. Requires Pillow, fonttools and brotli."""
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageFont
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
import json

ROOT = Path(__file__).resolve().parents[1]
ASSETS = ROOT / 'assets'
INK = '#243f35'
ORANGE = '#be4e2d'
PAPER = '#f7f6f0'
MARK = (
    'M9 114V61C9 2 82 2 82 61V114',
    'M82 114V61C82 2 155 2 155 61V114',
)


def mark_svg(primary=INK, accent=ORANGE):
    return ''.join(
        f'<path d="{path}" stroke="{color}" stroke-width="17" '
        'stroke-linecap="round" fill="none"/>'
        for path, color in zip(MARK, [primary, accent])
    )


def draw_mark(canvas, x, y, width, primary=INK, accent=ORANGE):
    # Supersample the curves so social cards stay as smooth as the SVG logo.
    resolution = 4
    mark_width = round(width)
    mark_height = round(width * 124 / 164)
    layer = Image.new('RGBA', (mark_width * resolution, mark_height * resolution))
    scale = mark_width * resolution / 164
    draw = ImageDraw.Draw(layer)
    line_width = max(1, round(17 * scale))
    for offset, color in [(0, primary), (73, accent)]:
        points = [(9 + offset, 114), (9 + offset, 61)]
        for step in range(1, 61):
            t = step / 60
            points.append((
                (1-t)**3 * 9 + 3*(1-t)**2*t*9 + 3*(1-t)*t*t*82 + t**3*82 + offset,
                (1-t)**3 * 61 + 3*(1-t)**2*t*2 + 3*(1-t)*t*t*2 + t**3*61,
            ))
        points.append((82 + offset, 114))
        scaled = [(round(px * scale), round(py * scale)) for px, py in points]
        draw.line(scaled, fill=color, width=line_width, joint='curve')
        radius = line_width / 2
        for px, py in [scaled[0], scaled[-1]]:
            draw.ellipse((px-radius, py-radius, px+radius, py+radius), fill=color)
    layer = layer.resize((mark_width, mark_height), Image.Resampling.LANCZOS)
    canvas.paste(layer, (round(x), round(y)), layer)


# Vector outlines keep the standalone wordmark independent of installed fonts.
font = TTFont(ASSETS / 'manrope-bold.ttf', recalcTimestamp=False)
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
scale = 98 / font['head'].unitsPerEm
cursor = 206
word_paths = []
for character in 'armmate.':
    glyph = cmap[ord(character)]
    pen = SVGPathPen(glyphs)
    glyphs[glyph].draw(TransformPen(pen, (scale, 0, 0, -scale, cursor, 111)))
    word_paths.append(f'<path d="{pen.getCommands()}" fill="{ORANGE if character == "." else INK}"/>')
    cursor += font['hmtx'][glyph][0] * scale - 3
logo_width = round(cursor + 20)
(ASSETS / 'logo.svg').write_text(
    f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {logo_width} 144" '
    'role="img" aria-labelledby="title"><title id="title">ARMMATE</title>'
    f'<g transform="translate(8 8)">{mark_svg()}</g>{"".join(word_paths)}</svg>\n',
    encoding='utf-8',
)
(ASSETS / 'brand-mark.svg').write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 164 124" '
    'role="img" aria-labelledby="title"><title id="title">ARMMATE</title>'
    f'{mark_svg()}</svg>\n', encoding='utf-8',
)
(ASSETS / 'favicon.svg').write_text(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
    f'<rect width="64" height="64" rx="16" fill="{INK}"/>'
    f'<g transform="translate(9 14) scale(.28)">{mark_svg(PAPER, "#e19a73")}</g></svg>\n',
    encoding='utf-8',
)
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
    'en':(['Your person', 'in Armenia.'], 'Your personal assistant in Armenia'),
    'ru':(['Твой человек', 'в Армении.'], 'Твой персональный ассистент в Армении'),
    'hy':(['Քո մարդը', 'Հայաստանում։'], 'Քո անձնական ասիստենտը Հայաստանում'),
}
for language, (lines, subtitle) in copy.items():
    canvas = Image.new('RGB', (1200, 630), PAPER)
    draw = ImageDraw.Draw(canvas)
    family = 'armenian' if language == 'hy' else 'manrope'
    draw_mark(canvas, 80, 65, 112)
    brand_font = ImageFont.truetype(str(ASSETS/'manrope-bold.ttf'), 100)
    draw.text((225, 55), 'armmate', font=brand_font, fill=INK)
    draw.text((225 + draw.textlength('armmate', font=brand_font), 55), '.', font=brand_font, fill=ORANGE)
    for index, line in enumerate(lines):
        size = 64
        while True:
            font = ImageFont.truetype(str(ASSETS/f'{family}-bold.ttf'), size)
            if draw.textlength(line, font=font) <= 1030: break
            size -= 1
        draw.text((80, 225 + index*104), line, font=font, fill=INK if index == 0 else ORANGE)
    draw.text((82, 491), subtitle, font=ImageFont.truetype(str(ASSETS/f'{family}-regular.ttf'), 29), fill='#52624f')
    draw.rectangle((0, 597, 1200, 630), fill='#244a3b')
    canvas.save(ASSETS/f'social-armmate-{language}.png', optimize=True)

for size in [48, 180]:
    icon = Image.new('RGB', (size*4, size*4), INK)
    draw_mark(icon, size*4*.14, size*4*.22, size*4*.72, PAPER, '#e19a73')
    icon.resize((size,size),Image.Resampling.LANCZOS).save(ASSETS/f'icon-{size}.png',optimize=True)

credits = json.loads((ASSETS/'credits.json').read_text(encoding='utf-8'))
for credit in credits:
    name = Path(credit['image']).stem
    credit['variants'] = [p.name for p in sorted(ASSETS.glob(name+'-*.webp'))]
    credit['changes'] = 'Resized, converted to WebP; responsive derivatives resized and, for the hero, cropped. Displayed with cropping. Derivatives retain the original image licence.'
(ASSETS/'credits.json').write_text(json.dumps(credits, ensure_ascii=False, indent=2)+'\n', encoding='utf-8')
print('Generated ARMMATE vector logos, icons, social cards, WOFF2 fonts and responsive photographs.')
