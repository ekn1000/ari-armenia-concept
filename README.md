# ARI — Your person in Armenia

A responsive, three-language website concept for a personal travel and leisure assistant in Armenia.

## Open and edit

No build step or framework is needed. Serve this folder with any static web server, for example `python -m http.server 4173`, then visit `http://localhost:4173`.

- `index.html`: page structure
- `styles.css`: responsive layout and visual design
- `app.js`: Armenian, Russian and English copy, filters, dialogs and sample day planner
- `assets/`: local photographs, fonts, favicon and photo attribution

Armenian is the default language. Use `?lang=hy`, `?lang=ru` or `?lang=en` for direct language links. The selected language is remembered on the visitor's device.

## Demo behaviour

The day planner creates an example itinerary in the browser. It supports downloading or copying the plan. It does not transmit form data, create reservations or accept payments. Connect a real enquiry endpoint and replace the demo notices when developing the business site. ARI is a working brand name; replace it as needed.

## Credits

Photos are from Wikimedia Commons. Authors, original image links, licences and modification details are in [`assets/credits.json`](assets/credits.json) and available through the website footer. Photos have been resized, converted to WebP and are displayed with cropping.

Manrope and Noto Sans Armenian fonts are distributed under the SIL Open Font License 1.1. See the font licence files in `assets/`.

The static site is suitable for GitHub Pages and other free static hosting providers.
