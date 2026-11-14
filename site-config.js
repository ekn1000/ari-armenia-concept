"use strict";

// Public business contacts only. This file is delivered to every visitor.
// WhatsApp: international number, digits only, without +, spaces or punctuation.
// Telegram: business username only, without @ or https://t.me/.
// Leave empty until ARI's verified business contacts are available.
// Empty or invalid contacts never produce an outgoing messenger link.
window.ARI_CONTACT = Object.freeze({
  whatsapp: "",
  telegram: "",
});
