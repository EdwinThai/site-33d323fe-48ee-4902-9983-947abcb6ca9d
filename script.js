// =========================================
// LEVEO BYGG AB — Vanilla JS
// - Mobile nav toggle
// - Fade-in-on-scroll via IntersectionObserver
// =========================================

(function () {
  'use strict';

  var toggle = document.querySelector('.nav-toggle');
  var navList = document.querySelector('.nav-list');

  if (toggle && navList) {
    toggle.addEventListener('click', function () {
      var isOpen = navList.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    navList.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navList.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealEls = document.querySelectorAll('.reveal');

  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ---- OFFERT-FORMULÄR: enkel bekräftelse vid inskick ---- */
  var form = document.querySelector('.offert-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var nameVal = form.querySelector('#name').value.trim();
      var telVal = form.querySelector('#tel').value.trim();
      if (!nameVal || !telVal) {
        alert('Fyll i ditt namn och telefonnummer så kontaktar vi dig.');
        return;
      }
      var confirmation = document.createElement('div');
      confirmation.className = 'form-confirmation';
      confirmation.innerHTML =
        '<p class="form-confirmation-title">Tack! Vi återkommer inom öppettid.</p>' +
        '<p class="form-confirmation-note">Ring gärna direkt på <a href="tel:0768898904">076-889 89 04</a> om det är bråttom.</p>';
      form.replaceWith(confirmation);
    });
  }

})();
