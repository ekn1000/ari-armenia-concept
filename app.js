"use strict";

const translations = window.ARMMATE_TRANSLATIONS;
const seo = window.ARMMATE_SEO;
// Resolve shared resources before a language switch changes the visible URL.
const siteRoot = new URL(
  ".",
  document.querySelector('script[src*="app.js"]').src,
);
const assetUrl = (filename) => new URL("assets/" + filename, siteRoot).href;
const languageUrl = (lang) => new URL(seo.paths[lang], siteRoot);
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"/></svg>`;
const escapeHtml = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {}
  },
};
const supportedLanguages = ["hy", "ru", "en"];
const queryLanguage = new URLSearchParams(location.search).get("lang");
let language = supportedLanguages.includes(queryLanguage)
  ? queryLanguage
  : document.documentElement.lang;
let activeFilter = "all";
let lastRequest;
let lastDialogTrigger;
let toastTimeout;
let creditsData;
const dialog = $("#detail-dialog");
const form = $("#offer-form");
const localDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
const locale = () => ({ hy: "hy-AM", ru: "ru-RU", en: "en-GB" })[language];

function getContacts(message = "") {
  const config = window.ARMMATE_CONTACT || {};
  const contacts = [];
  const whatsapp =
    typeof config.whatsapp === "string" ? config.whatsapp.trim() : "";
  const telegram =
    typeof config.telegram === "string" ? config.telegram.trim() : "";
  if (/^[1-9]\d{6,14}$/.test(whatsapp)) {
    const url = new URL(`https://wa.me/${whatsapp}`);
    if (message) url.searchParams.set("text", message);
    contacts.push({ id: "whatsapp", label: "WhatsApp", url: url.href });
  }
  if (/^[A-Za-z][A-Za-z0-9_]{4,31}$/.test(telegram)) {
    const url = new URL(`https://t.me/${telegram}`);
    if (message) url.searchParams.set("text", message);
    contacts.push({ id: "telegram", label: "Telegram", url: url.href });
  }
  return contacts;
}

function closeMenu() {
  $(".menu-toggle").setAttribute("aria-expanded", "false");
  $("#navigation").classList.remove("open");
}

function renderList(selector, items) {
  $(selector).innerHTML = items
    .map((item) => `<li>${icon("check")}<span>${item}</span></li>`)
    .join("");
}

function updateLanguageUrl() {
  const url = languageUrl(language);
  url.search = location.search;
  url.searchParams.delete("lang");
  url.hash = location.hash;
  history.replaceState({}, "", url);
}

function setLanguage(next, updateUrl = true) {
  if (!supportedLanguages.includes(next)) return;
  language = next;
  const t = translations[language];
  seo.updateDocument(document, language, t);
  $$("[data-t]").forEach((el) => {
    el.textContent = t[el.dataset.t];
  });
  $$("[data-html]").forEach((el) => {
    el.innerHTML = t[el.dataset.html];
  });
  $$("[data-placeholder]").forEach((el) => {
    el.placeholder = t[el.dataset.placeholder];
  });
  $$("[data-alt]").forEach((el) => {
    el.alt = t[el.dataset.alt];
  });
  $$("[data-label]").forEach((el) =>
    el.setAttribute("aria-label", t[el.dataset.label]),
  );
  $$("[data-lang]").forEach((el) => {
    el.href = languageUrl(el.dataset.lang).href;
    if (el.dataset.lang === language) el.setAttribute("aria-current", "page");
    else el.removeAttribute("aria-current");
  });
  $("#navigation").setAttribute("aria-label", t.mainNav);
  $("#languages").setAttribute("aria-label", t.languageLabel);
  $(".menu-toggle").setAttribute("aria-label", t.menu);
  $(".filters").setAttribute("aria-label", t.categoriesLabel);
  $("#support-categories").innerHTML = t.categories
    .map(([title, text]) => `<div><h4>${title}</h4><p>${text}</p></div>`)
    .join("");
  renderList("#companion-list", t.companionItems);
  renderList("#pricing-factors", t.pricingFactors);
  renderList("#included-list", t.includedItems);
  renderList("#agreed-list", t.agreedItems);
  renderExperiences();
  renderFaq();
  renderContactChannels();
  storage.set("armmate-language", language);
  if (updateUrl || supportedLanguages.includes(queryLanguage)) {
    updateLanguageUrl();
  }
  $$("input").forEach((el) => el.setCustomValidity(""));
  closeMenu();
}

function renderContactChannels() {
  const t = translations[language];
  const contacts = getContacts();
  $("#channel-links").hidden = contacts.length === 0;
  $("#channel-links").innerHTML = contacts
    .map(
      (contact) =>
        `<a class="button button-secondary" href="${escapeHtml(contact.url)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${contact.label}${icon("diagonal")}</a>`,
    )
    .join("");
  $("#contact-availability").textContent = contacts.length
    ? t.contactAvailable
    : t.contactUnavailable;
}

function renderExperiences() {
  const t = translations[language];
  const ids = ["all", "city", "culture", "nature"];
  $(".filters").innerHTML = t.filters
    .map(
      (label, index) =>
        `<button type="button" data-filter="${ids[index]}" aria-pressed="${activeFilter === ids[index]}">${label}</button>`,
    )
    .join("");
  $("#experience-grid").innerHTML = t.cards
    .filter((card) => activeFilter === "all" || card.id === activeFilter)
    .map(
      (card) => `
    <button class="experience-card" type="button" data-card="${card.id}">
      <div class="card-image"><img src="${assetUrl(card.image + "-800.webp")}" srcset="${assetUrl(card.image + "-480.webp")} 480w, ${assetUrl(card.image + "-800.webp")} 800w, ${assetUrl(card.image + ".webp")} 1200w" sizes="(max-width: 650px) calc(100vw - 42px), (max-width: 900px) 30vw, 400px" width="1200" height="800" alt="${escapeHtml(card.alt)}" loading="lazy" decoding="async"><span class="card-tag"><span></span>${card.tag}</span></div>
      <div class="card-content"><span class="card-kicker">${icon("pin")}${card.location}</span><h3>${card.title}</h3><p>${card.text}</p><div class="card-bottom"><span>${t.cardMore}</span><span class="card-arrow">${icon("diagonal")}</span></div></div>
    </button>`,
    )
    .join("");
}

function renderFaq() {
  const openIndexes = $$("#faq-list details").flatMap((el, index) =>
    el.open ? [index] : [],
  );
  $("#faq-list").innerHTML = translations[language].faq
    .map(
      ([q, a], index) =>
        `<details${openIndexes.includes(index) ? " open" : ""}><summary>${q}</summary><p>${a}</p></details>`,
    )
    .join("");
}

function openDialog(html, { experience = false } = {}) {
  lastDialogTrigger = document.activeElement;
  dialog.classList.toggle("dialog-experience", experience);
  $("#dialog-body").innerHTML = html;
  $("#dialog-body h2").id = "dialog-title";
  dialog.setAttribute("aria-labelledby", "dialog-title");
  dialog.showModal();
  if (experience) {
    dialog.focus({ preventScroll: true });
    dialog.scrollTop = 0;
  }
  document.body.style.overflow = "hidden";
}

function showExperience(id) {
  const t = translations[language];
  const card = t.cards.find((item) => item.id === id);
  if (!card) return;
  openDialog(
    `<img src="${assetUrl(card.image + "-800.webp")}" alt="${escapeHtml(card.alt)}"><span class="eyebrow">${card.location}</span><h2>${card.title}</h2><p>${card.detail}</p><p class="demo-notice">${t.ideaNote}</p><button class="button" type="button" data-discuss>${t.choose}${icon("diagonal")}</button>`,
    { experience: true },
  );
}

function formatDate(date) {
  return new Intl.DateTimeFormat(locale(), {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date + "T12:00:00"));
}

function requestText() {
  const t = translations[language];
  const support = {
    online: t.supportOnline,
    companion: t.supportCompanion,
    discuss: t.supportDiscuss,
  };
  const lines = [
    t.messageGreeting,
    "",
    `${t.messageName}: ${lastRequest.name}`,
    `${t.messageArrival}: ${formatDate(lastRequest.arrival)}`,
    `${t.messageDeparture}: ${formatDate(lastRequest.departure)}`,
    `${t.messageTravellers}: ${lastRequest.travellers}`,
    `${t.messageSupport}: ${support[lastRequest.support]}`,
  ];
  if (lastRequest.support === "companion" && lastRequest.companionTime)
    lines.push(`${t.messageCompanion}: ${lastRequest.companionTime}`);
  if (lastRequest.needs)
    lines.push("", `${t.messageNeeds}: ${lastRequest.needs}`);
  lines.push(
    "",
    `${t.messageLanguage}: ${t.messageLanguageValue}`,
    "",
    t.messageClosing,
  );
  return lines.join("\n");
}

function showRequest() {
  const t = translations[language];
  const message = requestText();
  const contacts = getContacts(message);
  openDialog(
    `<span class="eyebrow">${t.requestLabel}</span><h2>${t.requestTitle}</h2><p>${t.requestIntro}</p><label class="request-preview-label" for="request-preview">${t.requestPreviewLabel}</label><textarea id="request-preview" class="request-preview" readonly rows="10"></textarea><p class="demo-notice">${contacts.length ? t.sendNotice : t.contactUnavailable}</p><div class="messenger-actions">${contacts.map((contact) => `<a class="button messenger-link" data-channel="${contact.id}" href="${escapeHtml(contact.url)}" target="_blank" rel="noopener noreferrer" referrerpolicy="no-referrer">${contact.id === "whatsapp" ? t.sendWhatsapp : t.sendTelegram}${icon("diagonal")}</a>`).join("")}</div><div class="dialog-actions"><button type="button" class="button button-secondary" data-copy>${t.copy}</button><button type="button" class="button button-secondary" data-download>${t.download}${icon("arrow")}</button></div>`,
  );
  // User-entered text is assigned as a value, never parsed as HTML.
  $("#request-preview").value = message;
}

function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(
    () => $("#toast").classList.remove("visible"),
    3500,
  );
}

function updateCompanionField() {
  $("#companion-field").hidden = $("#support-type").value !== "companion";
  $("#companion-time").disabled = $("#support-type").value !== "companion";
}

function syncDates() {
  $("#arrival").min = localDate(new Date());
  $("#departure").min = $("#arrival").value || $("#arrival").min;
  $("#arrival").setCustomValidity("");
  $("#departure").setCustomValidity("");
}

function validateRequest() {
  const t = translations[language];
  $$("input").forEach((el) => el.setCustomValidity(""));
  if (!$("#request-name").value.trim())
    $("#request-name").setCustomValidity(t.invalidName);
  if ($("#arrival").value && $("#arrival").value < localDate(new Date()))
    $("#arrival").setCustomValidity(t.invalidArrival);
  if ($("#departure").value && $("#departure").value < $("#arrival").value)
    $("#departure").setCustomValidity(t.invalidDates);
  const count = Number($("#travellers").value);
  if (!Number.isInteger(count) || count < 1 || count > 100)
    $("#travellers").setCustomValidity(t.invalidTravellers);
  return form.reportValidity();
}

$$("[data-lang]").forEach((link) =>
  link.addEventListener("click", (event) => {
    if (
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0
    )
      return;
    event.preventDefault();
    setLanguage(link.dataset.lang);
  }),
);
$(".menu-toggle").addEventListener("click", () => {
  const open = $(".menu-toggle").getAttribute("aria-expanded") !== "true";
  $(".menu-toggle").setAttribute("aria-expanded", String(open));
  $("#navigation").classList.toggle("open", open);
});
$$("#navigation a").forEach((link) =>
  link.addEventListener("click", closeMenu),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", (event) => {
  const choice = event.target.closest("[data-support-choice]");
  if (choice) {
    $("#support-type").value = choice.dataset.supportChoice;
    updateCompanionField();
  }
  if (!event.target.closest(".header")) closeMenu();
});
$(".filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  renderExperiences();
  $(`.filters [data-filter="${activeFilter}"]`).focus({ preventScroll: true });
});
$("#experience-grid").addEventListener("click", (event) => {
  const card = event.target.closest("[data-card]");
  if (card) showExperience(card.dataset.card);
});
$(".dialog-close").addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) return;
  const rect = dialog.getBoundingClientRect();
  if (
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.style.overflow = "";
  if (lastDialogTrigger?.isConnected)
    lastDialogTrigger.focus({ preventScroll: true });
});
dialog.addEventListener("click", async (event) => {
  if (event.target.closest("[data-discuss]")) {
    lastDialogTrigger = $("#request-name");
    dialog.close();
    $("#plan").scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    $("#request-name").focus({ preventScroll: true });
  }
  if (event.target.closest("[data-download]")) {
    const blob = new Blob(["\uFEFF" + requestText()], {
      type: "text/plain;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `ARMMATE-enquiry-${lastRequest.arrival}-${language}.txt`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  if (event.target.closest("[data-copy]")) {
    try {
      await navigator.clipboard.writeText(requestText());
      toast(translations[language].copied);
    } catch {
      toast(translations[language].copyError);
    }
  }
});
$("#support-type").addEventListener("change", updateCompanionField);
$("#arrival").addEventListener("input", syncDates);
$("#departure").addEventListener("input", () =>
  $("#departure").setCustomValidity(""),
);
$("#request-name").addEventListener("input", () =>
  $("#request-name").setCustomValidity(""),
);
$("#travellers").addEventListener("input", () =>
  $("#travellers").setCustomValidity(""),
);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!validateRequest()) return;
  lastRequest = {
    name: $("#request-name").value.trim(),
    arrival: $("#arrival").value,
    departure: $("#departure").value,
    travellers: $("#travellers").value,
    support: $("#support-type").value,
    companionTime: $("#companion-time").value.trim(),
    needs: $("#request-needs").value.trim(),
  };
  showRequest();
});
$("#credits-button").addEventListener("click", async () => {
  const t = translations[language];
  try {
    if (!creditsData) {
      const response = await fetch(assetUrl("credits.json"));
      if (!response.ok) throw new Error("Photo credits unavailable");
      creditsData = await response.json();
    }
    openDialog(
      `<span class="eyebrow">ARMMATE / CREDITS</span><h2>${t.creditsTitle}</h2><p>${t.creditsNote}</p><div class="credits-list">${creditsData.map((item) => `<div><strong>${escapeHtml(item.image.replace("assets/", ""))}</strong><p>${escapeHtml(item.author)} · <a href="${escapeHtml(item.licenseUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.license)}</a></p><a href="${escapeHtml(item.source)}" target="_blank" rel="noopener noreferrer">${t.source} ↗</a></div>`).join("")}<p>${t.fontCredits}</p></div>`,
    );
  } catch {
    toast(t.creditsError);
  }
});
syncDates();
updateCompanionField();
const hero = $(".hero-image");
hero.src = assetUrl("ararat-800.webp");
hero.srcset = [480, 800, 1200]
  .map((size) => `${assetUrl(`ararat-${size}.webp`)} ${size}w`)
  .join(", ");
// Keep the complete static HTML on a normal load. Re-render only when an old
// query-string link requests a different language, or the visitor switches it.
if (language === document.documentElement.lang) {
  renderContactChannels();
  storage.set("armmate-language", language);
  if (supportedLanguages.includes(queryLanguage)) updateLanguageUrl();
} else setLanguage(language, false);
// The static fallback remains inert if scripts fail; it cannot submit personal
// details through the browser's default GET form behaviour.
form.inert = false;
form.querySelector('[type="submit"]').disabled = false;
