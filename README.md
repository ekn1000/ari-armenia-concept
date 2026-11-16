# ARMMATE — Your person in Armenia.

A responsive Armenian, Russian and English website for a personal travel assistance service in Armenia. The primary service is a personal local assistant over WhatsApp or Telegram. In-person companionship is optional and agreed separately. Every customer receives an individual offer; there are no fixed packages, public prices or automatic price calculations.

**Live site:** https://ekn1000.github.io/ari-armenia-concept/

**Business specification:** [docs/BUSINESS_CONCEPT.md](docs/BUSINESS_CONCEPT.md)

**Brand and logo:** [docs/BRAND.md](docs/BRAND.md). Slogan: “Քո մարդը Հայաստանում։ / Твой человек в Армении. / Your person in Armenia.”

## Run locally

The website serves committed static files and has no runtime dependencies. To preview it with Python 3:

```sh
python scripts/serve.py
```

Open http://127.0.0.1:4187. Armenian is at `/`, Russian at `/ru/`, and English at `/en/`. Each URL contains the complete translated HTML, including without JavaScript. Legacy `?lang=hy|ru|en` links still work with JavaScript. The original `#plan` enquiry anchor remains available.

## Files

| File                                | Purpose                                                              |
| ----------------------------------- | -------------------------------------------------------------------- |
| `index.html`                        | Shared structure and fully rendered Armenian content                 |
| `ru/index.html`, `en/index.html`    | Generated Russian and English pages                                  |
| `styles.css`                        | Responsive layout, brand styling and accessibility states            |
| `translations.js`                   | All Armenian, Russian and English content                            |
| `app.js`                            | Language switching, filters, dialogs, validation and enquiry drafts  |
| `site-config.js`                    | Public, verified WhatsApp and Telegram destinations                  |
| `seo.js`, `scripts/build-pages.cjs` | Shared metadata/schema and static language-page generator            |
| `sitemap.xml`, `robots.txt`         | Canonical URL discovery; see the host-root limitation in docs/SEO.md |
| `assets/`                           | Local photos, fonts, favicon and attribution                         |
| `tests/`                            | Browser tests for the business rules and enquiry flow                |

## Contact configuration and current limitation

**Official ARMMATE contact details have not been provided.** Both destinations in `site-config.js` are intentionally empty. The published preview says so, never invents a destination and never claims that a request was sent.

Once verified business contacts are available, edit:

```js
window.ARMMATE_CONTACT = Object.freeze({
  whatsapp: "", // International number, digits only, without + or spaces.
  telegram: "", // Business username, without @ or https://t.me/.
});
```

Only valid destination formats produce contact buttons. WhatsApp opens `https://wa.me/<number>` and Telegram opens `https://t.me/<username>`. The enquiry dialog adds the encoded draft as the `text` parameter. Messenger support for prefilling may vary; copying and downloading remain available.

The form prepares a message containing the visitor's name, travel dates, group size, desired support, optional companion hours and needs. It does not send a network request with these details. Nothing is submitted automatically. Visitors review the text, choose a configured messenger and confirm sending there. Without a configured contact, they can only copy or download the draft.

Enquiries are not bookings or payments. ARMMATE discusses requirements and pricing manually before confirmation. No backend, payment processor, automatic assistant assignment or pricing engine is implemented.

The site stores only the language preference in local storage. Form details are not persisted. Opening a messenger transfers the draft to that external service; public contact information must never contain secrets or personal credentials.

## Checks

Node.js 22+ is used for development checks only:

```sh
npm ci
npx playwright install chromium
npm test
npm run check:generated
npm run check:format
```

The browser suite checks all three translations, pricing rules, date/count validation, optional companion input, safe request rendering, clipboard/download, messenger configuration, mobile navigation, layout widths and photo credits. It does not contact messenger recipients. Use `npm run format` after edits.

It also checks the complete HTML without JavaScript, canonical/hreflang consistency, JSON-LD against visible FAQs, legacy language URLs, sitemap destinations, optimized fonts and the noindex error page. After editing layout, translations, contacts or SEO metadata, run `npm run build` and commit the generated pages. See [docs/SEO.md](docs/SEO.md) for details and Search Console setup that remains outside this repository.

## Publishing and collaboration

GitHub Pages serves the `main` branch from `/`. `.nojekyll` keeps the site static. Merging or pushing reviewed changes to `main` triggers the existing Pages deployment. There is no paid hosting dependency.

See [CONTRIBUTING.md](CONTRIBUTING.md) for the development workflow and [docs/LAUNCH_CHECKLIST.md](docs/LAUNCH_CHECKLIST.md) for the remaining operational decisions.

## Credits

Photo authors, source links, licences and modification details are in [assets/credits.json](assets/credits.json) and the footer dialog. Photos were resized, converted to WebP and are displayed with cropping. Their original licences continue to apply.

Manrope and Noto Sans Armenian use SIL Open Font License 1.1; licence files are included in `assets/`.
