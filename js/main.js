/* ================================================
   Kaitlyn Rawlings Portfolio — main.js
   ================================================ */

/* ---------- PASSWORD GATE ---------- */
// Change this to whatever password you want
const SITE_PASSWORD = 'watershed2027';

function checkPassword() {
  const input = document.getElementById('pw-input');
  const error = document.getElementById('pw-error');
  const gate  = document.getElementById('gate');

  if (input.value === SITE_PASSWORD) {
    gate.classList.add('hidden');
    // Remove gate from DOM after transition
    setTimeout(() => gate.remove(), 700);
    // Store in session so refresh doesn't require re-entry
    sessionStorage.setItem('portfolio_unlocked', 'true');
  } else {
    error.textContent = 'Incorrect password. Try again.';
    input.value = '';
    input.focus();
    // Shake animation
    input.style.borderColor = '#C07060';
    setTimeout(() => {
      input.style.borderColor = '';
    }, 1200);
  }
}

// Allow Enter key in password field
document.getElementById('pw-input').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') checkPassword();
});

// Skip gate if already unlocked this session
if (sessionStorage.getItem('portfolio_unlocked') === 'true') {
  const gate = document.getElementById('gate');
  gate.style.display = 'none';
}

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

/* ---------- LIGHTBOX ---------- */
(function() {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  const img = document.createElement('img');
  const close = document.createElement('span');
  close.className = 'lightbox-close';
  close.innerHTML = '&times;';
  overlay.appendChild(img);
  overlay.appendChild(close);
  document.body.appendChild(overlay);

  function openLightbox(src, alt) {
    img.src = src;
    img.alt = alt || '';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  close.addEventListener('click', closeLightbox);
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closeLightbox();
  });
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeLightbox();
  });

  document.querySelectorAll('.zoomable').forEach(function(el) {
    el.addEventListener('click', function() {
      openLightbox(el.src, el.alt);
    });
  });
})();

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
