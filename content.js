"use strict";

// Shared controls on the fully rendered service and contact pages.
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#navigation");
const contactWidget = document.querySelector("#contact-widget");

function closeMenu() {
  menuToggle.setAttribute("aria-expanded", "false");
  navigation.classList.remove("open");
}
function closeContacts(restoreFocus = false) {
  if (!contactWidget.open) return;
  contactWidget.open = false;
  if (restoreFocus)
    contactWidget.querySelector("summary").focus({ preventScroll: true });
}
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") !== "true";
  menuToggle.setAttribute("aria-expanded", String(open));
  navigation.classList.toggle("open", open);
});
navigation
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeMenu();
    closeContacts(true);
  }
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".header")) closeMenu();
  if (!event.target.closest("#contact-widget")) closeContacts();
});
document.addEventListener("focusin", (event) => {
  if (!contactWidget.contains(event.target)) closeContacts();
});
contactWidget.addEventListener("click", (event) => {
  if (event.target.closest("[data-quick-channel]")) closeContacts(true);
});
