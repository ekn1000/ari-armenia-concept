# ARMMATE identity

ARMMATE combines **ARM** (Armenia) and **MATE** (friend or companion). Keep both letters **m** in the name. Use `ARMMATE` in prose and metadata, and the lowercase `armmate` wordmark in the logo.

## Slogan

| Language | Slogan                  |
| -------- | ----------------------- |
| Armenian | Քո ընկերը Հայաստանում։  |
| Russian  | Твой друг в Армении.    |
| English  | Your friend in Armenia. |

The supporting description is “Your personal assistant in Armenia”, localized in the website. Online assistance remains the primary service, with optional personal accompaniment and individual pricing.

## Logo and colours

The user's supplied reference is redrawn as a clean, symmetric vector: two people form a letter **m** and a mountain-like path, with a terracotta sun above. The same mark appears in the header, footer, favicon, social cards and decorative details. The large empty background of the reference is excluded from production assets.

- `assets/logo.svg`: standalone wordmark with vector outlines; no installed font required.
- `assets/logo.png`: transparent horizontal wordmark at 3× resolution.
- `assets/logo-stacked.svg`: stacked lockup with “your friend in armenia”, matching the reference; use where the subtitle remains readable.
- `assets/brand-mark.svg`, `assets/brand-mark.png`: symbol without text; the PNG has a transparent background.
- `assets/favicon.svg`, `assets/favicon.ico`, `assets/icon-16.png`, `assets/icon-32.png`, `assets/icon-48.png`: browser icons. The ICO contains actual 16, 32 and 48 pixel versions.
- `assets/icon-180.png`, `assets/icon-192.png`, `assets/icon-512.png`: home-screen/profile icons.
- `assets/social-armmate-friends-hy.png`, `assets/social-armmate-friends-ru.png`, `assets/social-armmate-friends-en.png`: 1200 × 630 localized social cards.
- Logo green: `#3d6d4e`; logo sun: `#c77944`; paper: `#f7f6f0`. Text and buttons retain darker `#243f35` and `#be4e2d` shades for contrast.
- Manrope and Noto Sans Armenian are bundled under their included SIL Open Font Licenses.

Regenerate these files with `python scripts/optimize-assets.py`. The page generator reads the generated `brand-mark.svg` into the inline symbol, so the site and downloadable files share the same geometry. After changing assets, the page, translations or metadata, run `npm run build`.

In the navigation use the horizontal symbol + name without the tiny subtitle. Small favicons use only the symbol on a cream background, keeping the two heads and sun recognizable in light and dark browser chrome. The larger footer and social cards show the localized slogan separately. Cache versions and new social filenames prevent the previous arch icon from being reused as the new identity.

## Publishing address

The active site is **https://ekn1000.github.io/ari-armenia-concept/**. The repository slug and existing language URLs remain the publishing addresses. The new brand name does not establish ownership of `armmate.am`.

If the owner registers and connects `armmate.am`, configure GitHub Pages and DNS, verify HTTPS, update `baseUrl` in `seo.js` and the return links in `404.html`, then regenerate the language pages, canonical/hreflang links, social URLs, sitemap and robots file. Confirm the custom domain works before advertising it as the live address. Search Console verification and sitemap submission belong to the verified domain owner.
