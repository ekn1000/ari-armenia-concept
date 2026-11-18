# Search visibility and technical SEO

## What is implemented

ARMMATE has three complete, crawlable HTML pages:

| Language | Canonical URL          |
| -------- | ---------------------- |
| Armenian | https://armmate.am/    |
| Russian  | https://armmate.am/ru/ |
| English  | https://armmate.am/en/ |

Each page contains its translated service descriptions, pricing explanation, inspiration cards and FAQ in the initial HTML. Search engines and visitors do not need JavaScript to read them. WhatsApp, Telegram and Viber links are present in the initial HTML and work without JavaScript. There is no enquiry form or calling option.

Each language has a descriptive title, meta description, self-referencing canonical URL, reciprocal `hreflang` links, `html[lang]`, Open Graph locale and localized social image, plus Twitter large-image metadata. Language selectors are real links and continue working without JavaScript. The Armenian homepage is the `x-default` destination.

The public root always opens in Armenian; explicit `/ru/` and `/en/` paths take precedence over stored preferences. This gives each URL stable language content. The older `?lang=hy|ru|en` links still work with JavaScript and normalize to the new paths while keeping the section anchor and other query parameters. New internal links and the sitemap use only canonical paths.

`seo.js` is shared by the static generator and the browser. It keeps metadata and JSON-LD consistent when switching languages while preserving the contact section and selected filters.

The JSON-LD graph describes the ARMMATE organization, website, localized page, personal assistance service in Armenia and the visible FAQ. Its contact point leads to the three messenger links. No telephone contact, invented prices, reviews, ratings, business addresses or opening hours are included. The FAQ markup matches the visible questions and answers; it does not imply eligibility for Google's FAQ rich results, which are restricted to particular types of sites.

The sitemap lists only the three canonical language pages with reciprocal alternatives. `404.html` carries `noindex, follow` and offers links back to the language homepages. Images have translated alt text, responsive WebP sources and reserved layout dimensions. The hero has matching responsive preload hints. Fonts are local WOFF2 files with `font-display: swap` and language-specific preload hints. Original photo attribution and licences apply to the derivative images too.

## Updating the pages

The Armenian `index.html` is the shared page structure. Edit layout there, text in `translations.js`, metadata/schema logic in `seo.js`, and verified contacts in `site-config.js`.

```sh
npm run format
npm run build
npm run check:generated
npm run check:format
npm test
```

`npm run build` regenerates the root Armenian page, Russian/English HTML, `sitemap.xml` and `robots.txt`. Commit the generated files. The existing branch-based GitHub Pages deployment still serves static files directly; no server or paid service is needed. CI rejects stale generated pages.

Update `seo.js`'s `updated` date only when page content meaningfully changes. Do not bump sitemap dates on unrelated builds. When changing the domain or project path, update `baseUrl` in `seo.js`, rebuild, and update the hardcoded return links in `404.html`.

To recreate the committed responsive images, social cards and WOFF2 fonts, install Python's `Pillow`, `fonttools` and `brotli` packages and run `python scripts/optimize-assets.py`. These dependencies are needed only to regenerate assets, not to serve the site or regenerate HTML. Original TTF/WebP files are retained as sources.

## Custom domain and crawling

The active domain is `armmate.am`, configured in `CNAME` and GitHub Pages. HTTPS is enforced, and `www.armmate.am` redirects to the apex domain. `https://armmate.am/robots.txt` is served from the host root and references `https://armmate.am/sitemap.xml`.

## Remaining work outside the repository

- Verify the URL-prefix property for `https://armmate.am/` in Google Search Console and submit its `sitemap.xml`. Verification and indexing requests require the owner's account; no verification tokens are fabricated or claimed to have been submitted.
- Manually confirm the supplied number opens the intended accounts in WhatsApp, Telegram and Viber. No automated check sends messages or authenticates to messenger accounts.
- Once the business has verified public business details and a location it is entitled to represent, decide whether a business profile or additional local-business markup is appropriate. Do not invent an address to obtain local search placement.
- Build useful, original destination/service content and legitimate references as the business develops. Avoid purchased links, repeated keyword pages and fabricated reviews.
- Monitor real indexing and field performance data after launch. A Lighthouse score is a technical check, not a ranking or indexing guarantee. Search visibility also depends on content, site reputation, actual demand and search-engine decisions.

No analytics, tracking cookies, Search Console ownership claims, paid SEO tools or third-party accounts are added by this implementation.
