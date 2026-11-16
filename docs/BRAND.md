# ARMMATE identity

ARMMATE combines **ARM** (Armenia) and **MATE** (friend or companion). Keep both letters **m** in the name. Use `ARMMATE` in prose and metadata, and the lowercase `armmate.` wordmark in the logo.

## Slogan

| Language | Slogan                  |
| -------- | ----------------------- |
| Armenian | Քո մարդը Հայաստանում։   |
| Russian  | Твой человек в Армении. |
| English  | Your person in Armenia. |

The supporting description is “Your personal assistant in Armenia”, localized in the website. Online assistance remains the primary service, with optional personal accompaniment and individual pricing.

## Logo and colours

Two connected arches represent a traveller and their local assistant. The same mark appears in the header, footer, favicon, social cards and decorative details.

- `assets/logo.svg`: standalone wordmark with vector outlines; no installed font required.
- `assets/brand-mark.svg`: standalone mark.
- `assets/favicon.svg`, `assets/icon-48.png`, `assets/icon-180.png`: browser and home-screen icons.
- `assets/social-armmate-hy.png`, `assets/social-armmate-ru.png`, `assets/social-armmate-en.png`: 1200 × 630 localized social cards.
- Forest: `#243f35`; terracotta: `#be4e2d`; paper: `#f7f6f0`.
- Manrope and Noto Sans Armenian are bundled under their included SIL Open Font Licenses.

Regenerate these files with `python scripts/optimize-assets.py`; the inline mark in `index.html` uses the same path geometry. After changing the page, translations or metadata, run `npm run build`.

## Publishing address

The active site is **https://ekn1000.github.io/ari-armenia-concept/**. The repository slug and existing language URLs remain the publishing addresses. The new brand name does not establish ownership of `armmate.am`.

If the owner registers and connects `armmate.am`, configure GitHub Pages and DNS, verify HTTPS, update `baseUrl` in `seo.js` and the return links in `404.html`, then regenerate the language pages, canonical/hreflang links, social URLs, sitemap and robots file. Confirm the custom domain works before advertising it as the live address. Search Console verification and sitemap submission belong to the verified domain owner.
