# Search visibility and technical SEO

## What is implemented

ARMMATE has 12 complete, crawlable HTML pages: the three homepages below and three localized families for online travel assistance, personal companionship in Yerevan and contact details.

| Language | Canonical URL          |
| -------- | ---------------------- |
| Armenian | https://armmate.am/    |
| Russian  | https://armmate.am/ru/ |
| English  | https://armmate.am/en/ |

Each page contains its translated service descriptions, pricing explanation, inspiration cards and FAQ in the initial HTML. Search engines and visitors do not need JavaScript to read them. WhatsApp, Telegram and email links are present in the initial HTML and work without JavaScript. There is no enquiry form or calling option.

Each language has a descriptive title, meta description, self-referencing canonical URL, reciprocal `hreflang` links, `html[lang]`, Open Graph locale and localized social image, plus Twitter large-image metadata. Language selectors are real links and continue working without JavaScript. Each page family's Armenian page is its own `x-default` destination.

The public root always opens in Armenian; explicit `/ru/` and `/en/` paths take precedence over stored preferences. This gives each URL stable language content. The older `?lang=hy|ru|en` links still work with JavaScript and normalize to the new paths while keeping the section anchor and other query parameters. New internal links and the sitemap use only canonical paths.

`seo.js` is shared by the static generator and the browser. It keeps metadata and JSON-LD consistent when switching languages while preserving the contact section and selected filters.

The JSON-LD graph describes the ARMMATE organization, website, localized page, personal assistance service in Armenia and the visible FAQ. Its contact point leads to the three contact links and includes the owner-supplied email address. No telephone contact, invented prices, reviews, ratings, business addresses or opening hours are included. The FAQ markup matches the visible questions and answers; it does not imply eligibility for Google's FAQ rich results, which are restricted to particular types of sites.

The sitemap lists all 12 canonical pages with reciprocal alternatives within each page family. Service and contact pages also include visible breadcrumbs and matching BreadcrumbList markup. Contact pages use ContactPage markup, and the organization points to the owner-supplied Telegram profile and email address. `404.html` carries `noindex, follow` and offers links back to the language homepages. Images have translated alt text, responsive WebP sources and reserved layout dimensions. The hero has matching responsive preload hints. Fonts are local WOFF2 files with `font-display: swap` and language-specific preload hints. Original photo attribution and licences apply to the derivative images too.

## Updating the pages

The Armenian `index.html` is the shared homepage structure. Edit homepage copy in `translations.js`, detailed service/contact content in `scripts/search-content.cjs`, the static content renderer in `scripts/build-content-pages.cjs`, metadata and route families in `seo.js`, and verified contacts in `site-config.js`. Homepages link visibly to each service and contact family; language switches on detailed pages navigate to the corresponding localized page.

```sh
npm run format
npm run build
npm run check:generated
npm run check:format
npm test
```

`npm run build` regenerates all 12 HTML pages, `sitemap.xml` and `robots.txt`. Commit the generated files. The existing branch-based GitHub Pages deployment still serves static files directly; no server or paid service is needed. CI rejects stale generated pages.

Update `seo.js`'s `updated` date only when page content meaningfully changes. Do not bump sitemap dates on unrelated builds. When changing the domain or project path, update `baseUrl` in `seo.js`, rebuild, and update the hardcoded return links in `404.html`.

To recreate the committed responsive images, social cards and WOFF2 fonts, install Python's `Pillow`, `fonttools` and `brotli` packages and run `python scripts/optimize-assets.py`. These dependencies are needed only to regenerate assets, not to serve the site or regenerate HTML. Original TTF/WebP files are retained as sources.

## Custom domain and crawling

The active domain is `armmate.am`, configured in `CNAME` and GitHub Pages. HTTPS is enforced, and `www.armmate.am` redirects to the apex domain. `https://armmate.am/robots.txt` is served from the host root and references `https://armmate.am/sitemap.xml`.

## Remaining work outside the repository

- Complete the Google Search Console and Yandex Webmaster ownership steps in `docs/SEARCH-SETUP.md`. The build supports real account-issued verification meta tags from `site-config.js`; empty values do not produce fake verification tags. No account-based verification or indexing request is claimed without completing it.
- Manually confirm the supplied WhatsApp account, the Telegram username @armmate_support and that armmate.support@gmail.com receives email. Automated checks inspect links without sending messages or authenticating to accounts.
- Once the business has verified public business details and a location it is entitled to represent, decide whether a business profile or additional local-business markup is appropriate. Do not invent an address to obtain local search placement.
- Build useful, original destination/service content and legitimate references as the business develops. Avoid purchased links, repeated keyword pages and fabricated reviews.
- Monitor real indexing and field performance data after launch. A Lighthouse score is a technical check, not a ranking or indexing guarantee. Search visibility also depends on content, site reputation, actual demand and search-engine decisions.

Yandex IndexNow notifications are available through `npm run notify:yandex` after the public ownership file is deployed. This sends new/changed canonical URLs, not messages to customers, and does not guarantee crawling, indexing or ranking. It does not authenticate to a Webmaster account. No analytics, tracking cookies, fabricated ownership claims, paid SEO tools or third-party accounts are added.
