// === DARK / LIGHT MODE ===
const html       = document.documentElement;
const iconSun    = document.getElementById('iconSun');
const iconMoon   = document.getElementById('iconMoon');
const themeLabel = document.getElementById('themeLabel');

function setTheme(t) {
  html.setAttribute('data-theme', t);
  localStorage.setItem('necsa-theme', t);
  const dark = t === 'dark';
  iconSun.style.display    = dark ? 'block' : 'none';
  iconMoon.style.display   = dark ? 'none'  : 'block';
  themeLabel.textContent   = dark ? 'Modo claro' : 'Modo oscuro';
}

const saved = localStorage.getItem('necsa-theme');
if (saved) {
  setTheme(saved);
} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  setTheme('dark');
} else {
  setTheme('light');
}

document.getElementById('themeToggle').addEventListener('click', () => {
  setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
});

// === HAMBURGER ===
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  mobileNav.classList.toggle('open');
});
mobileNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  mobileNav.classList.remove('open');
}));

// === SCROLL REVEAL ===
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// === FORM (solo en contacto.html) ===
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (!this.checkValidity()) { this.reportValidity(); return; }
    this.style.display = 'none';
    const msg = document.getElementById('successMsg');
    msg.classList.add('show');
    msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}
