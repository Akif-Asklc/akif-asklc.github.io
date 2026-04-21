/* =============================================
   BORN'UP ELEC – JAVASCRIPT
   ============================================= */

// ─── CONFIG ───────────────────────────────────
const PHONE = '0607734718';
const PHONE_DISPLAY = '06 07 73 47 18';
const WHATSAPP_URL = `https://wa.me/33607734718`;
const EMAIL = 'bornup.elec@gmail.com';

// ─── NAVIGATION ───────────────────────────────
const navItems = document.querySelectorAll('[data-page]');
const pages = document.querySelectorAll('.page');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

function showPage(pageId) {
  pages.forEach(p => p.classList.remove('active'));
  navItems.forEach(i => i.classList.remove('active'));

  const target = document.getElementById('page-' + pageId);
  if (target) target.classList.add('active');

  navItems.forEach(i => {
    if (i.dataset.page === pageId) i.classList.add('active');
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
  if (mobileMenu.classList.contains('open')) closeMobileMenu();
  history.replaceState(null, '', '#' + pageId);

  // Trigger counters if on accueil
  if (pageId === 'accueil') setTimeout(animateCounters, 400);
  // Reinit reveal
  setTimeout(initReveal, 100);
}

navItems.forEach(item => {
  item.addEventListener('click', () => showPage(item.dataset.page));
});

// Mobile menu
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Navbar scroll
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 20) navbar.classList.add('scrolled');
  else navbar.classList.remove('scrolled');
});

// ─── COUNTERS ─────────────────────────────────
let countersAnimated = false;
function animateCounters() {
  if (countersAnimated) return;
  countersAnimated = true;
  document.querySelectorAll('.counter-num').forEach(el => {
    const target = parseInt(el.dataset.target || el.innerText);
    const suffix = el.dataset.suffix || '';
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.innerText = target + suffix;
        clearInterval(timer);
      } else {
        el.innerText = Math.floor(current) + suffix;
      }
    }, 25);
  });
}

// ─── SCROLL ANIMATIONS ────────────────────────
function initReveal() {
  const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
  if (!reveals.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('revealed');
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
  reveals.forEach(el => observer.observe(el));
}

// ─── SIMULATOR ────────────────────────────────
function calculateQuote() {
  const type = document.getElementById('sim-type')?.value || '7';
  const cable = document.getElementById('sim-cable')?.value || '0';
  const panel = document.getElementById('sim-panel')?.value || 'non';
  const phase = document.getElementById('sim-phase')?.value || 'mono';

  // Base prices by charger type
  const basePrices = { '7': 850, '11': 1250, '22': 1800 };
  // Cable add-ons
  const cableAdd = { '0': 450, '15': 650 };
  // Panel add-on
  const panelAdd = panel === 'oui' ? 280 : 0;
  // Phase add-on
  const phaseAdd = phase === 'tri' && type === '7' ? 150 : 0;

  const total = (basePrices[type] || 850) + (cableAdd[cable] || 0) + panelAdd + phaseAdd;
  const display = document.getElementById('sim-price');
  if (display) {
    display.innerText = total.toLocaleString('fr-FR') + ' €';
    display.parentElement.style.display = 'block';
  }
}

// Auto-recalculate (services page)
['sim-type', 'sim-cable', 'sim-panel', 'sim-phase'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', calculateQuote);
});

// ─── SIMULATOR (accueil page) ──────────────────
function calculateQuoteHome() {
  const type = document.getElementById('sim-type-home')?.value || '7';
  const cable = document.getElementById('sim-cable-home')?.value || '0';
  const panel = document.getElementById('sim-panel-home')?.value || 'non';
  const phase = document.getElementById('sim-phase-home')?.value || 'mono';

  const basePrices = { '7': 850, '11': 1250, '22': 1800 };
  const cableAdd = { '0': 450, '15': 650 };
  const panelAdd = panel === 'oui' ? 280 : 0;
  const phaseAdd = phase === 'tri' && type === '7' ? 150 : 0;

  const total = (basePrices[type] || 850) + (cableAdd[cable] || 0) + panelAdd + phaseAdd;
  const display = document.getElementById('sim-price-home');
  if (display) {
    display.innerText = total.toLocaleString('fr-FR') + ' €';
    display.parentElement.style.display = 'block';
  }
}

['sim-type-home', 'sim-cable-home', 'sim-panel-home', 'sim-phase-home'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.addEventListener('change', calculateQuoteHome);
});

// Initial calc for both
setTimeout(() => { calculateQuote(); calculateQuoteHome(); }, 500);

// ─── GALLERY FILTER ───────────────────────────
document.querySelectorAll('.gallery-filter').forEach(btn => {
  btn.addEventListener('click', function () {
    document.querySelectorAll('.gallery-filter').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    const filter = this.dataset.filter;
    document.querySelectorAll('.gallery-item').forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.style.display = '';
        item.style.opacity = '0';
        setTimeout(() => { item.style.opacity = '1'; item.style.transition = 'opacity 0.4s ease'; }, 10);
      } else {
        item.style.display = 'none';
      }
    });
  });
});

// ─── CONTACT FORM ─────────────────────────────
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    setTimeout(() => {
      this.style.display = 'none';
      if (success) success.style.display = 'block';
    }, 1500);
  });
}

// ─── DEVIS FORM ───────────────────────────────
const devisForm = document.getElementById('devis-form');
if (devisForm) {
  devisForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const success = document.getElementById('devis-success');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
    setTimeout(() => {
      this.style.display = 'none';
      if (success) success.style.display = 'block';
    }, 1500);
  });
}

// ─── RDV FORM ─────────────────────────────────
const rdvForm = document.getElementById('rdv-form');
if (rdvForm) {
  rdvForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const success = document.getElementById('rdv-success');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Confirmation...';
    setTimeout(() => {
      this.style.display = 'none';
      if (success) success.style.display = 'block';
    }, 1500);
  });
}

// ─── MOBILE CTA ACTIONS ───────────────────────
document.getElementById('cta-call')?.addEventListener('click', () => {
  window.location.href = `tel:${PHONE}`;
});
document.getElementById('cta-wa')?.addEventListener('click', () => {
  window.open(WHATSAPP_URL, '_blank');
});
document.getElementById('cta-devis')?.addEventListener('click', () => {
  showPage('contact');
});

// ─── WA FLOAT ─────────────────────────────────
document.getElementById('wa-float')?.addEventListener('click', () => {
  window.open(WHATSAPP_URL, '_blank');
});

// ─── MIN DATE for RDV ─────────────────────────
const rdvDate = document.getElementById('rdv-date');
if (rdvDate) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate() + 1).padStart(2, '0');
  rdvDate.min = `${yyyy}-${mm}-${dd}`;
}

// ─── INIT ─────────────────────────────────────
function init() {
  // Show page from hash or default
  const hash = window.location.hash.replace('#', '');
  const validPages = ['accueil', 'services', 'realisations', 'apropos', 'contact', 'marques', 'particuliers', 'professionnels'];
  if (hash && validPages.includes(hash)) {
    showPage(hash);
  } else {
    showPage('accueil');
  }
  initReveal();
}

document.addEventListener('DOMContentLoaded', init);
