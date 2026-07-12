/* ============================================================
   ISRAP — script.js
   Handles:
     1. Mobile hamburger navigation (open/close, a11y)
     2. Close mobile nav when a link is clicked
     3. Scroll-reveal animations (Intersection Observer)
     4. Events gallery lightbox
     5. Auto-update footer year
   Smooth scrolling for anchor links is handled in CSS
   (html { scroll-behavior: smooth }).
   ============================================================ */
(function () {
  "use strict";

  /* Mark that JS is active so the scroll-reveal hidden state applies.
     If this script never runs, content stays visible (see styles.css). */
  document.documentElement.classList.add("js");

  /* ---------- 1. MOBILE NAV ---------- */
  var navToggle = document.getElementById("navToggle");
  var navMenu = document.getElementById("navMenu");

  function closeNav() {
    navMenu.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  }

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", function () {
      var isOpen = navMenu.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    /* 2. Close the menu after tapping a link (mobile) */
    navMenu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    /* Close on Escape */
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* ---------- 3. SCROLL-REVEAL ---------- */
  var revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target); // reveal once
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    /* Fallback: just show everything */
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- 4. LIGHTBOX ---------- */
  var lightbox = document.getElementById("lightbox");
  var lightboxImg = document.getElementById("lightboxImg");
  var lightboxCaption = document.getElementById("lightboxCaption");
  var lightboxClose = document.getElementById("lightboxClose");
  var galleryItems = document.querySelectorAll(".gallery__item");
  var lastFocused = null;

  function openLightbox(img, caption) {
    lastFocused = document.activeElement;
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightboxCaption.textContent = caption || "";
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    lightboxImg.src = "";
    if (lastFocused) lastFocused.focus();
  }

  galleryItems.forEach(function (item) {
    var img = item.querySelector("img");
    var cap = item.querySelector("figcaption");
    var captionText = cap ? cap.textContent : "";

    /* Make gallery items keyboard-accessible */
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "View image: " + (img ? img.alt : ""));

    item.addEventListener("click", function () { openLightbox(img, captionText); });
    item.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox(img, captionText);
      }
    });
  });

  if (lightbox) {
    lightboxClose.addEventListener("click", closeLightbox);
    /* Click the dark backdrop (not the image) to close */
    lightbox.addEventListener("click", function (e) {
      if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
    });
  }

  /* ---------- 4b. IMAGE FALLBACKS ---------- */
  /* If a local project photo hasn't been added yet, show a labeled
     placeholder instead of a broken-image icon. Once the real file
     exists in /assets/images/, the placeholder never triggers. */
  document.querySelectorAll("img[data-fallback]").forEach(function (img) {
    img.addEventListener("error", function handleError() {
      img.removeEventListener("error", handleError); // avoid loops
      img.src = img.getAttribute("data-fallback");
    });
  });

  /* ---------- 5. FOOTER YEAR ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
