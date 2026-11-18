# ARMMATE — Your friend in Armenia.

A responsive Armenian, Russian and English website for a personal travel assistance service in Armenia. The primary service is a personal local assistant over WhatsApp, Telegram or Viber. In-person companionship is optional and agreed separately. Every customer receives an individual offer; there are no fixed packages, public prices or automatic price calculations.

**Live site:** https://armmate.am/

**Business specification:** [docs/BUSINESS_CONCEPT.md](docs/BUSINESS_CONCEPT.md)

**Brand and logo:** [docs/BRAND.md](docs/BRAND.md). Slogan: “Քո ընկերը Հայաստանում։ / Твой друг в Армении. / Your friend in Armenia.”

## Run locally

The website serves committed static files and has no runtime dependencies. To preview it with Python 3:

```sh
python scripts/serve.py
```

Open http://127.0.0.1:4187. Armenian is at `/`, Russian at `/ru/`, and English at `/en/`. Each URL contains the complete translated HTML, including without JavaScript. Legacy `?lang=hy|ru|en` links still work with JavaScript. The original `#plan` anchor leads to direct contact links.

## Files

| File                                | Purpose                                                          |
| ----------------------------------- | ---------------------------------------------------------------- |
| `index.html`                        | Shared structure and fully rendered Armenian content             |
| `ru/index.html`, `en/index.html`    | Generated Russian and English pages                              |
| `styles.css`                        | Responsive layout, brand styling and accessibility states        |
| `translations.js`                   | All Armenian, Russian and English content                        |
| `app.js`                            | Language switching, filters and experience/credit dialogs        |
| `site-config.js`                    | Public phone, WhatsApp, Telegram and Viber destinations          |
| `seo.js`, `scripts/build-pages.cjs` | Shared metadata/schema and static language-page generator        |
| `sitemap.xml`, `robots.txt`         | Canonical URL discovery on armmate.am                            |
| `assets/`                           | Local photos, fonts, favicon and attribution                     |
| `tests/`                            | Browser tests for business rules, direct contacts and navigation |

## Direct business contacts

The owner-supplied business number is **+374 91 110799**. `site-config.js` is shared by the page generator and SEO markup and contains the public number and its WhatsApp, Telegram and Viber links. Update it and rebuild to change the destinations.

The contact section contains a `tel:` link, `https://wa.me/37491110799`, `https://t.me/+37491110799` and `viber://chat?number=%2B37491110799`. These are ordinary links in the initial HTML and work without JavaScript. Viber needs its app; Telegram phone links depend on the recipient's phone-number discovery settings. If Telegram does not resolve the account, enable discovery for this number or replace that destination with the verified public username.

There is no enquiry form, generated draft, clipboard/download workflow, booking or online payment. Visitors choose a messenger and write their own message. Requirements, prices and terms are discussed personally. No message is sent automatically. Automated checks inspect the destinations without contacting recipients.

The website stores only the language preference in local storage. Public contact configuration must never contain passwords or credentials.

## Checks

Node.js 22+ is used for development checks only:

```sh
npm ci
npx playwright install chromium
npm test
npm run check:generated
npm run check:format
```

The browser suite checks all three translations, pricing rules, direct messenger/phone links, experience-to-contact navigation, mobile navigation, responsive layout and photo credits. It does not contact messenger recipients. Use `npm run format` after edits.

It also checks the complete HTML without JavaScript, canonical/hreflang consistency, JSON-LD against visible FAQs, legacy language URLs, sitemap destinations, optimized fonts and the noindex error page. After editing layout, translations, contacts or SEO metadata, run `npm run build` and commit the generated pages. See [docs/SEO.md](docs/SEO.md) for details and Search Console setup that remains outside this repository.

## Publishing and collaboration

GitHub Pages serves the `main` branch from `/`. `.nojekyll` keeps the site static. Merging or pushing reviewed changes to `main` triggers the existing Pages deployment. There is no paid hosting dependency.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) for the remaining operational decisions.

## Credits

Photo authors, source links, licences and modification details are in [assets/credits.json](assets/credits.json) and the footer dialog. Photos were resized, converted to WebP and are displayed with cropping. Their original licences continue to apply.

Manrope, Noto Sans Armenian and Outfit use SIL Open Font License 1.1; licence files are included in `assets/`. The logo wordmark uses a locally hosted Outfit subset; page headings retain the original sans-serif fonts.
