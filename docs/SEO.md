# Search visibility and technical SEO

## What is implemented

ARMMATE has three complete, crawlable HTML pages:

| Language | Canonical URL                         |
| -------- | ------------------------------------- |
| Armenian | https://ekn1000.github.io/armmate/    |
| Russian  | https://ekn1000.github.io/armmate/ru/ |
| English  | https://ekn1000.github.io/armmate/en/ |

Each page contains its translated service descriptions, pricing explanation, inspiration cards and FAQ in the initial HTML. Search engines and visitors do not need JavaScript to read them. The enquiry form remains inert until JavaScript has initialized; it never falls back to sending personal data in a GET request.

Each language has a descriptive title, meta description, self-referencing canonical URL, reciprocal `hreflang` links, `html[lang]`, Open Graph locale and localized social image, plus Twitter large-image metadata. Language selectors are real links and continue working without JavaScript. The Armenian homepage is the `x-default` destination.

The public root always opens in Armenian; explicit `/ru/` and `/en/` paths take precedence over stored preferences. This gives each URL stable language content. The older `?lang=hy|ru|en` links still work with JavaScript and normalize to the new paths while keeping the section anchor and other query parameters. New internal links and the sitemap use only canonical paths.

`seo.js` is shared by the static generator and the browser. It keeps metadata and JSON-LD consistent when switching languages without losing an in-progress enquiry.

The JSON-LD graph describes the ARMMATE organization, website, localized page, personal assistance service in Armenia and the visible FAQ. It contains no invented prices, reviews, ratings, business addresses, phone numbers or opening hours. The FAQ markup matches the visible questions and answers; it does not imply eligibility for Google's FAQ rich results, which are restricted to particular types of sites.

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

## GitHub Pages robots.txt limitation

The standard robots file is **https://ekn1000.github.io/robots.txt**, at the host root. A project-site file at `/armmate/robots.txt` does not control crawling. The host-root file returned HTTP 404 at the time of this update, which does not disallow crawling.

The repository includes a permissive robots file with the sitemap URL for a future domain-root deployment. Effective host-root robots rules would have to be managed by the owner of the separate root site. This task does not modify other repositories or domain-wide crawling rules.

## Remaining work outside the repository

- Verify the URL-prefix property for `https://ekn1000.github.io/armmate/` in Google Search Console and submit its `sitemap.xml`. Verification and indexing requests require the owner's account; no verification tokens are fabricated or claimed to have been submitted.
- Add the real business WhatsApp/Telegram contacts before accepting enquiries. The site clearly remains a preview until operational setup is complete.
- Once the business has verified public business details and a location it is entitled to represent, decide whether a business profile or additional local-business markup is appropriate. Do not invent an address to obtain local search placement.
- Build useful, original destination/service content and legitimate references as the business develops. Avoid purchased links, repeated keyword pages and fabricated reviews.
- Monitor real indexing and field performance data after launch. A Lighthouse score is a technical check, not a ranking or indexing guarantee. Search visibility also depends on content, site reputation, actual demand and search-engine decisions.

No analytics, tracking cookies, Search Console ownership claims, paid SEO tools or third-party accounts are added by this implementation.
