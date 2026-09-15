/* ==========================================================================
   Rhemroyal Services — Shared site JavaScript
   No build step required. Loaded on every page via <script src="/js/main.js">
   ========================================================================== */

/* ---------------------------------------------------------------------
   SITE CONFIG — edit these three values to switch on real contact
   details once you have them. See README.md for full setup notes.
   --------------------------------------------------------------------- */
const RHEMROYAL_CONFIG = {
  // WhatsApp number in international format, no spaces or plus sign, e.g. "447123456789"
  whatsappNumber: "REPLACE_WITH_WHATSAPP_NUMBER",
  whatsappMessage: "Hello Rhemroyal Services, I'd like to find out more about your consultancy support.",
  // Formspree (or similar) endpoint for the contact/booking form. Sign up free at formspree.io
  contactFormEndpoint: "https://formspree.io/f/REPLACE_WITH_FORM_ID",
  // Separate endpoint for the newsletter signup form (can be the same service, a different form ID)
  newsletterFormEndpoint: "https://formspree.io/f/REPLACE_WITH_NEWSLETTER_FORM_ID"
};

document.addEventListener("DOMContentLoaded", function () {
  initMobileNav();
  initActiveNavLink();
  initFooterYear();
  initWhatsAppButton();
  initForms();
  initCookieBanner();
});

/* ---------- Mobile navigation ---------- */
function initMobileNav() {
  const btn = document.querySelector(".menu-btn");
  const nav = document.querySelector(".nav");
  if (!btn || !nav) return;

  btn.addEventListener("click", function () {
    const open = nav.classList.toggle("open");
    btn.setAttribute("aria-expanded", open);
  });

  nav.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      nav.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

/* ---------- Highlight current page in nav ---------- */
function initActiveNavLink() {
  const path = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a[href]").forEach(function (a) {
    const href = a.getAttribute("href").split("/").pop();
    if (href === path) a.classList.add("active");
  });
}

/* ---------- Footer year ---------- */
function initFooterYear() {
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });
}

/* ---------- WhatsApp floating button ---------- */
function initWhatsAppButton() {
  const link = document.querySelector("[data-whatsapp-link]");
  if (!link) return;
  const number = RHEMROYAL_CONFIG.whatsappNumber;
  const message = encodeURIComponent(RHEMROYAL_CONFIG.whatsappMessage);
  link.href = "https://wa.me/" + number + "?text=" + message;
}

/* ---------- Forms: contact/booking + newsletter ----------
   Submits via fetch() to a Formspree-style endpoint so the site works
   with zero backend. Falls back to a clear message if the endpoint
   hasn't been configured yet (still shows "REPLACE_WITH" placeholder).
------------------------------------------------------------------- */
function initForms() {
  document.querySelectorAll("form[data-remote-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      handleRemoteFormSubmit(form);
    });
  });
}

function handleRemoteFormSubmit(form) {
  const statusEl = form.querySelector(".form-status");
  const submitBtn = form.querySelector('button[type="submit"]');
  const endpointKey = form.getAttribute("data-remote-form");
  const endpoint = RHEMROYAL_CONFIG[endpointKey];

  if (!endpoint || endpoint.indexOf("REPLACE_WITH") !== -1) {
    showFormStatus(statusEl, "error",
      "Form isn't connected yet — add a Formspree endpoint in js/main.js (see README.md) to start receiving submissions. Meanwhile, feel free to email hello@rhemroyalservices.com directly."
    );
    return;
  }

  const data = new FormData(form);
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = "Sending…"; }

  fetch(endpoint, {
    method: "POST",
    body: data,
    headers: { Accept: "application/json" }
  })
    .then(function (response) {
      if (response.ok) {
        showFormStatus(statusEl, "success", form.getAttribute("data-success-message") || "Thanks — we've received your message and will be in touch soon.");
        form.reset();
      } else {
        showFormStatus(statusEl, "error", "Something went wrong sending that. Please try again or email hello@rhemroyalservices.com.");
      }
    })
    .catch(function () {
      showFormStatus(statusEl, "error", "We couldn't reach the server. Please check your connection and try again.");
    })
    .finally(function () {
      if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = form.getAttribute("data-submit-label") || "Send"; }
    });
}

function showFormStatus(el, type, message) {
  if (!el) return;
  el.textContent = message;
  el.classList.remove("success", "error");
  el.classList.add(type);
}

/* ---------- Cookie consent banner ---------- */
function initCookieBanner() {
  const banner = document.querySelector("[data-cookie-banner]");
  if (!banner) return;
  const KEY = "rhemroyal_cookie_consent";

  if (!localStorage.getItem(KEY)) {
    banner.classList.add("show");
  }

  banner.querySelectorAll("[data-cookie-accept], [data-cookie-decline]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const choice = btn.hasAttribute("data-cookie-accept") ? "accepted" : "declined";
      localStorage.setItem(KEY, choice);
      banner.classList.remove("show");
    });
  });
}
