"use strict";

(function (global) {
  const baseUrl = "https://ekn1000.github.io/ari-armenia-concept/";
  const locales = { hy: "hy_AM", ru: "ru_RU", en: "en_GB" };
  const paths = { hy: "", ru: "ru/", en: "en/" };
  const languages = Object.keys(paths);
  const updated = "2026-11-15";

  function pageUrl(language) {
    return new URL(paths[language], baseUrl).href;
  }

  function structuredData(language, copy) {
    const url = pageUrl(language);
    const organization = baseUrl + "#organization";
    const website = baseUrl + "#website";
    const service = baseUrl + "#service";
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          "@id": organization,
          name: "ARI",
          url: baseUrl,
          logo: { "@type": "ImageObject", url: baseUrl + "assets/logo.svg" },
        },
        {
          "@type": "WebSite",
          "@id": website,
          name: "ARI",
          url: baseUrl,
          publisher: { "@id": organization },
          inLanguage: languages,
        },
        {
          "@type": "WebPage",
          "@id": url + "#webpage",
          url,
          name: copy.title,
          description: copy.description,
          inLanguage: language,
          isPartOf: { "@id": website },
          about: { "@id": service },
          primaryImageOfPage: {
            "@type": "ImageObject",
            url: baseUrl + `assets/social-${language}.png`,
            width: 1200,
            height: 630,
          },
        },
        {
          "@type": "Service",
          "@id": service,
          name: copy.heroLabel,
          description: copy.description,
          serviceType: "Personal travel assistance",
          areaServed: { "@type": "Country", name: "Armenia" },
          provider: { "@id": organization },
          url,
        },
        {
          "@type": "FAQPage",
          "@id": url + "#faq",
          url: url + "#faq",
          inLanguage: language,
          isPartOf: { "@id": url + "#webpage" },
          mainEntity: copy.faq.map(([question, answer]) => ({
            "@type": "Question",
            name: question,
            acceptedAnswer: { "@type": "Answer", text: answer },
          })),
        },
      ],
    };
  }

  function updateDocument(document, language, copy) {
    const head = document.head;
    head
      .querySelectorAll(
        'meta[name="description"], meta[name="robots"], meta[property^="og:"], meta[name^="twitter:"], link[rel="canonical"], link[rel="alternate"][hreflang], link[rel="sitemap"], #structured-data',
      )
      .forEach((element) => element.remove());
    function meta(attribute, name, content) {
      let element = head.querySelector(`meta[${attribute}="${name}"]`);
      if (!element) {
        element = document.createElement("meta");
        element.setAttribute(attribute, name);
        head.append(element);
      }
      element.setAttribute("content", content);
    }
    function link(rel, href, attributes = {}) {
      let element = head.querySelector(
        `link[rel="${rel}"]${attributes.hreflang ? `[hreflang="${attributes.hreflang}"]` : ""}`,
      );
      if (!element) {
        element = document.createElement("link");
        head.append(element);
      }
      element.setAttribute("rel", rel);
      element.setAttribute("href", href);
      for (const [key, value] of Object.entries(attributes))
        element.setAttribute(key, value);
    }
    document.documentElement.lang = language;
    document.title = copy.title;
    meta("name", "description", copy.description);
    meta("name", "robots", "index, follow, max-image-preview:large");
    meta("property", "og:type", "website");
    meta("property", "og:site_name", "ARI");
    meta("property", "og:title", copy.title);
    meta("property", "og:description", copy.description);
    meta("property", "og:url", pageUrl(language));
    meta("property", "og:locale", locales[language]);
    meta("property", "og:image", baseUrl + `assets/social-${language}.png`);
    meta("property", "og:image:type", "image/png");
    meta("property", "og:image:width", "1200");
    meta("property", "og:image:height", "630");
    meta("property", "og:image:alt", copy.footerTag);
    head
      .querySelectorAll('meta[property="og:locale:alternate"]')
      .forEach((el) => el.remove());
    for (const other of languages.filter((lang) => lang !== language)) {
      const element = document.createElement("meta");
      element.setAttribute("property", "og:locale:alternate");
      element.setAttribute("content", locales[other]);
      head.append(element);
    }
    meta("name", "twitter:card", "summary_large_image");
    meta("name", "twitter:title", copy.title);
    meta("name", "twitter:description", copy.description);
    meta("name", "twitter:image", baseUrl + `assets/social-${language}.png`);
    meta("name", "twitter:image:alt", copy.footerTag);
    link("canonical", pageUrl(language));
    for (const other of languages)
      link("alternate", pageUrl(other), { hreflang: other });
    link("alternate", baseUrl, { hreflang: "x-default" });
    link("sitemap", baseUrl + "sitemap.xml", { type: "application/xml" });
    let schema = head.querySelector("#structured-data");
    if (!schema) {
      schema = document.createElement("script");
      schema.id = "structured-data";
      schema.type = "application/ld+json";
      head.append(schema);
    }
    schema.textContent = JSON.stringify(structuredData(language, copy)).replace(
      /</g,
      "\\u003c",
    );
  }

  const api = {
    baseUrl,
    locales,
    paths,
    languages,
    updated,
    pageUrl,
    structuredData,
    updateDocument,
  };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else global.ARI_SEO = api;
})(typeof window !== "undefined" ? window : globalThis);
