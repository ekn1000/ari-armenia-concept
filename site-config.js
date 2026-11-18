"use strict";

// Public business contacts supplied by the owner. Never put secrets here.
(function (global) {
  const phone = "+37491110799";
  const digits = phone.slice(1);
  const contact = Object.freeze({
    phone,
    displayPhone: "+374 91 110799",
    channels: Object.freeze([
      Object.freeze({
        id: "whatsapp",
        label: "WhatsApp",
        href: `https://wa.me/${digits}`,
        icon: "chat",
      }),
      Object.freeze({
        id: "telegram",
        label: "Telegram",
        href: `https://t.me/${phone}`,
        icon: "send",
      }),
      Object.freeze({
        id: "viber",
        label: "Viber",
        href: `viber://chat?number=${encodeURIComponent(phone)}`,
        icon: "phone",
      }),
    ]),
  });
  if (typeof module !== "undefined" && module.exports) module.exports = contact;
  else global.ARMMATE_CONTACT = contact;
})(typeof window !== "undefined" ? window : globalThis);
