const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
toggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(isOpen));
  toggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  navLinks.classList.remove('open');
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Open navigation');
}));
document.getElementById('year').textContent = new Date().getFullYear();
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  status.className = 'form-status';
  if (name.length < 2 || !emailValid || message.length < 10) {
    status.textContent = 'Please enter your name, a valid email, and a message of at least 10 characters.';
    status.classList.add('error');
    return;
  }
  status.textContent = 'Demo validation successful! No message was sent.';
  status.classList.add('success');
});


// ==================================
// BREWHOUSE - SCROLL EFFECTS
// ==================================

// Cambiar apariencia del encabezado
const header = document.querySelector(".site-header");

function updateHeader() {
  header.classList.toggle(
    "scrolled",
    window.scrollY > 50
  );
}

window.addEventListener("scroll", updateHeader, {
  passive: true
});

updateHeader();

// Animaciones al aparecer en pantalla
const animatedElements = document.querySelectorAll(
  ".about .split, .menu-card, .location-split, .contact-wrap"
);

const reducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  animatedElements.forEach((element) => {
    element.classList.add("reveal");
    observer.observe(element);

    // Activar transición después de registrar el elemento
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!element.classList.contains("visible")) {
          element.classList.add("reveal-ready");
        }
      });
    });
  });
}
