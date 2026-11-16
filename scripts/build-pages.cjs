const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const { parseHTML, DOMParser } = require("linkedom");
const prettier = require("prettier");
const seo = require("../seo.js");

const root = path.resolve(__dirname, "..");
const sandbox = { window: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(root, "translations.js"), "utf8"),
  sandbox,
);
vm.runInNewContext(
  fs.readFileSync(path.join(root, "site-config.js"), "utf8"),
  sandbox,
);
const translations = sandbox.window.ARMMATE_TRANSLATIONS;
const contacts = sandbox.window.ARMMATE_CONTACT || {};
const source = fs.readFileSync(path.join(root, "index.html"), "utf8");
const brand = new DOMParser().parseFromString(
  fs.readFileSync(path.join(root, "assets/brand-mark.svg"), "utf8"),
  "image/svg+xml",
).documentElement;
brand.querySelector("title").remove();
const check = process.argv.includes("--check");
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;

function output(filename, value) {
  const file = path.join(root, filename);
  if (check) {
    if (
      !fs.existsSync(file) ||
      fs.readFileSync(file, "utf8").replace(/\r\n/g, "\n") !== value
    )
      throw new Error(
        `Generated file is stale: ${filename}. Run npm run build.`,
      );
  } else {
    fs.mkdirSync(path.dirname(file), { recursive: true });
    fs.writeFileSync(file, value);
  }
}

async function build() {
  for (const language of seo.languages) {
    const { document } = parseHTML(source);
    const t = translations[language];
    const prefix = language === "hy" ? "" : "../";
    const $ = (selector) => document.querySelector(selector);
    $("#i-brand").setAttribute("viewBox", brand.getAttribute("viewBox"));
    $("#i-brand").replaceChildren(
      ...[...brand.children].map((node) => document.importNode(node, true)),
    );
    document.head.childNodes.forEach((node) => {
      if (node.nodeType === 3 && !node.textContent.trim()) node.remove();
    });
    document.querySelectorAll("[data-t]").forEach((el) => {
      if (typeof t[el.dataset.t] !== "string")
        throw new Error(`Missing ${language}:${el.dataset.t}`);
      el.textContent = t[el.dataset.t];
    });
    document.querySelectorAll("[data-html]").forEach((el) => {
      el.innerHTML = t[el.dataset.html];
    });
    for (const [data, attribute] of [
      ["placeholder", "placeholder"],
      ["alt", "alt"],
      ["label", "aria-label"],
    ]) {
      document
        .querySelectorAll(`[data-${data}]`)
        .forEach((el) => el.setAttribute(attribute, t[el.dataset[data]]));
    }
    $("#navigation").setAttribute("aria-label", t.mainNav);
    $("#languages").setAttribute("aria-label", t.languageLabel);
    $(".menu-toggle").setAttribute("aria-label", t.menu);
    $(".filters").setAttribute("aria-label", t.categoriesLabel);
    document.querySelectorAll("[data-lang]").forEach((el) => {
      const lang = el.dataset.lang;
      const anchor = document.createElement("a");
      anchor.setAttribute("data-lang", lang);
      anchor.setAttribute("lang", lang);
      anchor.setAttribute("hreflang", lang);
      anchor.setAttribute("href", prefix + seo.paths[lang] || "./");
      anchor.setAttribute(
        "aria-label",
        el.textContent.trim() +
          " — " +
          { hy: "Հայերեն", ru: "Русский", en: "English" }[lang],
      );
      if (lang === language) anchor.setAttribute("aria-current", "page");
      anchor.textContent = el.textContent;
      el.replaceWith(anchor);
    });
    $("#support-categories").innerHTML = t.categories
      .map(([heading, text]) => `<div><h4>${heading}</h4><p>${text}</p></div>`)
      .join("");
    for (const [selector, key] of [
      ["#companion-list", "companionItems"],
      ["#pricing-factors", "pricingFactors"],
      ["#included-list", "includedItems"],
      ["#agreed-list", "agreedItems"],
    ]) {
      $(selector).innerHTML = t[key]
        .map((item) => `<li>${icon("check")}<span>${item}</span></li>`)
        .join("");
    }
    $(".filters").innerHTML = t.filters
      .map(
        (label, index) =>
          `<button type="button" data-filter="${["all", "city", "culture", "nature"][index]}" aria-pressed="${index === 0}">${label}</button>`,
      )
      .join("");
    $("#experience-grid").innerHTML = t.cards
      .map(
        (card) =>
          `<button class="experience-card" type="button" data-card="${card.id}"><div class="card-image"><img src="${prefix}assets/${card.image}-800.webp" srcset="${prefix}assets/${card.image}-480.webp 480w, ${prefix}assets/${card.image}-800.webp 800w, ${prefix}assets/${card.image}.webp 1200w" sizes="(max-width: 650px) calc(100vw - 42px), (max-width: 900px) 30vw, 400px" width="1200" height="800" alt="${escape(card.alt)}" loading="lazy" decoding="async"><span class="card-tag"><span></span>${card.tag}</span></div><div class="card-content"><span class="card-kicker">${icon("pin")}${card.location}</span><h3>${card.title}</h3><p>${card.text}</p><div class="card-bottom"><span>${t.cardMore}</span><span class="card-arrow">${icon("diagonal")}</span></div></div></button>`,
      )
      .join("");
    $("#faq-list").innerHTML = t.faq
      .map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`)
      .join("");
    $("#contact-availability").textContent =
      /^[1-9]\d{6,14}$/.test(contacts.whatsapp) ||
      /^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(contacts.telegram)
        ? t.contactAvailable
        : t.contactUnavailable;
    // Interactivity stays unavailable until app.js initializes successfully.
    $("#offer-form").setAttribute("inert", "");
    $("#offer-form [type=submit]").setAttribute("disabled", "");
    $("#companion-field").setAttribute("hidden", "");
    $("#companion-time").setAttribute("disabled", "");
    $("#channel-links").setAttribute("hidden", "");
    $("#channel-links").innerHTML = "";
    const sizes =
      "(max-width: 650px) calc(100vw - 40px), (max-width: 1150px) 50vw, 640px";
    const heroSrcset = [480, 800, 1200]
      .map((size) => `${prefix}assets/ararat-${size}.webp ${size}w`)
      .join(", ");
    $(".hero-image").setAttribute("src", prefix + "assets/ararat-800.webp");
    $(".hero-image").setAttribute("srcset", heroSrcset);
    $(".hero-image").setAttribute("sizes", sizes);
    $(".hero-image").setAttribute("width", "1200");
    $(".hero-image").setAttribute("height", "1200");
    const preload = $('link[rel="preload"][as="image"]');
    preload.setAttribute("href", prefix + "assets/ararat-800.webp");
    preload.setAttribute("imagesrcset", heroSrcset);
    preload.setAttribute("imagesizes", sizes);
    preload.setAttribute("type", "image/webp");
    $('link[rel="icon"]').setAttribute(
      "href",
      prefix + "assets/favicon.svg?v=friends-1",
    );
    $('link[rel="icon"][type="image/svg+xml"]').setAttribute("sizes", "any");
    let legacyIcon = $('link[rel="shortcut icon"]');
    if (!legacyIcon) {
      legacyIcon = document.createElement("link");
      document.head.append(legacyIcon);
    }
    legacyIcon.setAttribute("rel", "shortcut icon");
    legacyIcon.setAttribute("type", "image/x-icon");
    legacyIcon.setAttribute("href", prefix + "assets/favicon.ico?v=friends-1");
    for (const [rel, filename, size] of [
      ["icon", "icon-48.png", "48x48"],
      ["apple-touch-icon", "icon-180.png", "180x180"],
    ]) {
      let element = document.head.querySelector(
        `link[rel="${rel}"][sizes="${size}"]`,
      );
      if (!element) {
        element = document.createElement("link");
        document.head.append(element);
      }
      element.setAttribute("rel", rel);
      element.setAttribute(
        "href",
        prefix + "assets/" + filename + "?v=friends-1",
      );
      element.setAttribute("sizes", size);
      element.setAttribute("type", "image/png");
    }
    $('link[rel="stylesheet"]').setAttribute("href", prefix + "styles.css");
    if (!$('script[src$="seo.js"]')) {
      const script = document.createElement("script");
      script.setAttribute("defer", "");
      script.setAttribute("src", prefix + "seo.js");
      $('script[src$="app.js"]').before(script);
    }
    document
      .querySelectorAll("script[src]")
      .forEach((el) =>
        el.setAttribute(
          "src",
          prefix + path.posix.basename(el.getAttribute("src")),
        ),
      );
    document
      .querySelectorAll('link[rel="preload"][as="font"]')
      .forEach((el) => el.remove());
    for (const weight of ["regular", "bold"]) {
      const font = document.createElement("link");
      font.setAttribute("rel", "preload");
      font.setAttribute("as", "font");
      font.setAttribute("type", "font/woff2");
      font.setAttribute("crossorigin", "anonymous");
      font.setAttribute(
        "href",
        `${prefix}assets/${language === "hy" ? "armenian" : "manrope"}-${weight}.woff2`,
      );
      document.head.append(font);
    }
    const headingFont = document.createElement("link");
    headingFont.setAttribute("rel", "preload");
    headingFont.setAttribute("as", "font");
    headingFont.setAttribute("type", "font/woff2");
    headingFont.setAttribute("crossorigin", "anonymous");
    headingFont.setAttribute(
      "href",
      `${prefix}assets/${language === "hy" ? "armenian-serif" : "lora"}-heading.woff2`,
    );
    document.head.append(headingFont);
    $(".noscript").textContent = {
      hy: "Բովանդակությունը կարող ես կարդալ առանց JavaScript-ի։ Հարցում պատրաստելու և ֆիլտրերն օգտագործելու համար միացրու JavaScript-ը։",
      ru: "Содержание доступно без JavaScript. Включите JavaScript, чтобы подготовить запрос и пользоваться фильтрами.",
      en: "You can read all content without JavaScript. Enable it to prepare an enquiry and use the filters.",
    }[language];
    seo.updateDocument(document, language, t);
    const filename = (language === "hy" ? "" : language + "/") + "index.html";
    output(
      filename,
      await prettier.format(document.toString(), {
        ...(await prettier.resolveConfig(path.join(root, filename))),
        filepath: path.join(root, filename),
      }),
    );
  }
  const alternates = [
    ...seo.languages.map((lang) => ({ lang, url: seo.pageUrl(lang) })),
    { lang: "x-default", url: seo.baseUrl },
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${seo.languages.map((lang) => `  <url>\n    <loc>${seo.pageUrl(lang)}</loc>\n    <lastmod>${seo.updated}</lastmod>\n${alternates.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.url}" />`).join("\n")}\n  </url>`).join("\n")}\n</urlset>\n`;
  output("sitemap.xml", sitemap);
  output(
    "robots.txt",
    `# For a GitHub project site, only robots.txt at the host root governs crawling.\n# This file is ready for a domain-root deployment; see docs/SEO.md.\nUser-agent: *\nAllow: /\n\nSitemap: ${seo.baseUrl}sitemap.xml\n`,
  );
  console.log(
    check
      ? "Generated language pages and sitemap are current."
      : "Generated Armenian, Russian and English HTML pages, sitemap and robots.txt.",
  );
}
build().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
