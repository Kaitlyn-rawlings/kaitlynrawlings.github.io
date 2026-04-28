/* ================================================
   Kaitlyn Rawlings Portfolio — main.js
   ================================================ */

/* ---------- NAVBAR SCROLL BEHAVIOR ---------- */
const nav = document.getElementById('main-nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

/* ---------- MOBILE NAV TOGGLE ---------- */
const navToggle  = document.getElementById('nav-toggle');
const navLinks   = document.getElementById('nav-links');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close mobile nav when a link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ---------- SCROLL ANIMATIONS ---------- */
const fadeEls = document.querySelectorAll(
  '.skill-card, .project-card, .map-card, .resume-item, .fact-card, .about-text, .carto-intro, .contact-text, .contact-right'
);

fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
});

fadeEls.forEach(el => observer.observe(el));

const sections = document.querySelectorAll('section[id]');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.nav-links a').forEach(a => {
        a.style.color = '';
      });
      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (activeLink) activeLink.style.color = 'var(--sand)';
    }
  });
}, {
  threshold: 0.4
});

sections.forEach(s => navObserver.observe(s));
