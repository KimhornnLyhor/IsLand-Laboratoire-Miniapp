// ═══════════════════════════════════════
// ISLAND LABORATOIRE — SHARED JS
// ═══════════════════════════════════════

// ── NAV HTML injected into every page ──
const NAV_HTML = `
<nav>
  <a class="nav-logo" href="index.html">
    <svg width="38" height="38" viewBox="0 0 100 100" fill="none">
      <rect x="40" y="8" width="20" height="84" rx="3" fill="#00B5AD"/>
      <rect x="28" y="8" width="44" height="12" rx="3" fill="#00B5AD"/>
      <rect x="28" y="80" width="44" height="12" rx="3" fill="#00B5AD"/>
      <ellipse cx="50" cy="54" rx="28" ry="14" stroke="#00B5AD" stroke-width="4" fill="none"/>
      <path d="M50 18 C63 30 65 44 56 56 C50 64 44 68 44 80" stroke="#2DD4CC" stroke-width="5" fill="none" stroke-linecap="round"
            style="stroke-dasharray:120;stroke-dashoffset:120;animation:drawSnake 1.5s 1s ease forwards"/>
      <circle cx="57" cy="19" r="5" fill="#2DD4CC" style="opacity:0;animation:popIn .3s 2.4s ease forwards"/>
    </svg>
    <div>
      <span class="lt-brand">IsLAnD</span>
      <span class="lt-sub">Laboratoire</span>
    </div>
  </a>
  <ul class="nav-links">
    <li><a href="index.html"     data-page="index">Home</a></li>
    <li><a href="about.html"     data-page="about">About Us</a></li>
    <li><a href="catalogue.html" data-page="catalogue">Products</a></li>
    <li><a href="news.html"      data-page="news">News</a></li>
    <li><a href="careers.html"   data-page="careers">Careers</a></li>
    <li><a href="contact.html"   data-page="contact" class="nav-cta">Contact Us</a></li>
  </ul>
  <button class="nav-hamburger" onclick="toggleMobileMenu()" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="index.html">Home</a>
  <a href="about.html">About Us</a>
  <a href="catalogue.html">Products</a>
  <a href="news.html">News</a>
  <a href="careers.html">Careers</a>
  <a href="contact.html">Contact Us</a>
</div>`;

// ── FOOTER HTML ──
const FOOTER_HTML = `
<div class="marquee-wrap">
  <div class="marquee-track">
    <span>Antibiotics</span><span>Cardiovascular</span><span>Antidiabetics</span><span>CNS / Neurological</span><span>Analgesics</span><span>Gastrointestinal</span><span>Respiratory</span><span>Antihistamines</span><span>Corticosteroids</span><span>Lipid-Lowering</span><span>Topical Dermatology</span><span>Vitamins &amp; Supplements</span>
    <span>Antibiotics</span><span>Cardiovascular</span><span>Antidiabetics</span><span>CNS / Neurological</span><span>Analgesics</span><span>Gastrointestinal</span><span>Respiratory</span><span>Antihistamines</span><span>Corticosteroids</span><span>Lipid-Lowering</span><span>Topical Dermatology</span><span>Vitamins &amp; Supplements</span>
  </div>
</div>
<footer>
  <div class="footer-grid">
    <div class="footer-brand-col">
      <div class="fb-name">IsLAnD Laboratoire</div>
      <p>Your trusted pharmaceutical manufacturing partner — delivering quality medicines across 12 therapeutic categories.</p>
    </div>
    <div class="footer-col">
      <h4>Pages</h4>
      <a href="index.html">Home</a>
      <a href="about.html">About Us</a>
      <a href="catalogue.html">Products</a>
      <a href="news.html">News</a>
      <a href="careers.html">Careers</a>
      <a href="contact.html">Contact</a>
    </div>
    <div class="footer-col">
      <h4>Therapeutic Areas</h4>
      <a href="catalogue.html">Antibiotics</a>
      <a href="catalogue.html">Cardiovascular</a>
      <a href="catalogue.html">Antidiabetics</a>
      <a href="catalogue.html">CNS / Neurological</a>
      <a href="catalogue.html">Gastrointestinal</a>
    </div>
    <div class="footer-col">
      <h4>Professional</h4>
      <a href="catalogue.html">Product Catalogue</a>
      <a href="contact.html">Enquiries</a>
      <a href="contact.html">Distribution</a>
      <a href="contact.html">Regulatory Docs</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2024 Island Laboratoire. All rights reserved.</p>
    <p class="footer-disclaimer">For professional use only — pharmacies, hospitals and licensed medical practitioners. Not for direct consumer use.</p>
  </div>
</footer>`;

// ── INJECT & INIT ──
document.addEventListener('DOMContentLoaded', () => {
  // Inject nav
  const navMount = document.getElementById('nav-mount');
  if (navMount) navMount.innerHTML = NAV_HTML;

  // Inject footer
  const footerMount = document.getElementById('footer-mount');
  if (footerMount) footerMount.innerHTML = FOOTER_HTML;

  // Mark active nav link
  const page = document.body.dataset.page;
  document.querySelectorAll('[data-page]').forEach(a => {
    if (a.dataset.page === page) a.classList.add('active');
  });

  // Scroll reveal
  const obs = new IntersectionObserver(entries =>
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
    { threshold: 0.08 }
  );
  document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
});

function toggleMobileMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
