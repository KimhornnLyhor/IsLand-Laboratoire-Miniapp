/**
 * ═══════════════════════════════════════════════════════════
 *  ISLAND LABORATOIRE — UNIVERSAL TRANSLATION LAYER
 *  Supports: English ↔ Khmer
 *  Engine:   Google Translate (free, no API key)
 *  Usage:    Add ONE line to any page, before </body>:
 *            <script src="translation.js"></script>
 * ═══════════════════════════════════════════════════════════
 */

(function () {
  'use strict';

  // ── CONFIG ──────────────────────────────────────────────
  const CONFIG = {
    defaultLang:    'en',
    supportedLangs: ['en', 'km'],
    storageKey:     'il_lang',
    labels: {
      en: { flag: '🇬🇧', label: 'English',  short: 'EN' },
      km: { flag: '🇰🇭', label: 'ភាសាខ្មែរ', short: 'ខ្មែរ' },
    },
  };

  // ── DETECT LANGUAGE ─────────────────────────────────────
  function detectInitialLang() {
    // 1. Check saved preference first
    const saved = localStorage.getItem(CONFIG.storageKey);
    if (saved && CONFIG.supportedLangs.includes(saved)) return saved;

    // 2. Detect from browser language
    const browser = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
    if (browser.startsWith('km') || browser.startsWith('kh')) return 'km';

    return CONFIG.defaultLang;
  }

  // ── INJECT GOOGLE TRANSLATE SCRIPT ──────────────────────
  function injectGoogleTranslate() {
    // Add Google Translate init function
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage:       'en',
          includedLanguages:  'km,en',
          autoDisplay:        false,
          // Layout: SIMPLE — no iframe header, clean integration
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    // Load the Google Translate script
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    script.onerror = () => console.warn('[IL Translation] Google Translate failed to load.');
    document.head.appendChild(script);
  }

  // ── HIDE GOOGLE'S DEFAULT UI ─────────────────────────────
  // Google injects a banner/iframe that breaks layouts.
  // We suppress it and use our own toggle button instead.
  function suppressGoogleUI() {
    const style = document.createElement('style');
    style.textContent = `
      /* Hide Google's default top banner */
      .goog-te-banner-frame,
      .goog-te-banner-frame.skiptranslate,
      #goog-gt-tt,
      .goog-te-balloon-frame,
      .goog-tooltip,
      .goog-tooltip:hover { display: none !important; }

      /* Remove the top margin Google adds to body */
      body { top: 0 !important; }

      /* Hide the default Google translate dropdown we don't use */
      #google_translate_element { display: none !important; }

      /* Prevent Google from showing its own popup tooltips */
      .goog-te-menu-value:hover { text-decoration: none; }

      /* Language toggle button styles */
      #il-lang-toggle {
        position: fixed;
        bottom: 24px;
        right: 16px;
        z-index: 9999;
        display: flex;
        align-items: center;
        gap: 7px;
        background: #00B5AD;
        color: #ffffff;
        border: none;
        border-radius: 99px;
        padding: 10px 16px 10px 12px;
        font-family: 'DM Sans', 'Kantumruy Pro', sans-serif;
        font-size: 13px;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 4px 20px rgba(0, 181, 173, 0.45);
        transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
        letter-spacing: 0.03em;
        user-select: none;
        -webkit-tap-highlight-color: transparent;
      }

      #il-lang-toggle:hover {
        background: #008F88;
        transform: translateY(-2px);
        box-shadow: 0 6px 28px rgba(0, 181, 173, 0.55);
      }

      #il-lang-toggle:active {
        transform: scale(0.97);
      }

      #il-lang-toggle .lt-flag {
        font-size: 16px;
        line-height: 1;
      }

      #il-lang-toggle .lt-short {
        font-size: 13px;
        font-weight: 700;
      }

      #il-lang-toggle .lt-divider {
        width: 1px;
        height: 14px;
        background: rgba(255, 255, 255, 0.4);
        margin: 0 2px;
      }

      #il-lang-toggle .lt-other {
        font-size: 12px;
        color: rgba(255, 255, 255, 0.75);
        font-weight: 500;
      }

      /* Telegram Mini App adjustments — button goes above bottom nav */
      body.tg-app #il-lang-toggle {
        bottom: 70px;
      }

      /* Khmer font support */
      :lang(km), .il-km {
        font-family: 'Kantumruy Pro', 'Khmer OS', 'Battambang', sans-serif !important;
        line-height: 1.8 !important;
      }

      /* Loading state */
      #il-lang-toggle.il-loading {
        opacity: 0.7;
        pointer-events: none;
      }

      #il-lang-toggle .lt-spinner {
        width: 14px;
        height: 14px;
        border: 2px solid rgba(255,255,255,0.3);
        border-top-color: #fff;
        border-radius: 50%;
        animation: il-spin 0.7s linear infinite;
        display: none;
      }

      #il-lang-toggle.il-loading .lt-spinner { display: block; }
      #il-lang-toggle.il-loading .lt-flag,
      #il-lang-toggle.il-loading .lt-short { display: none; }

      @keyframes il-spin { to { transform: rotate(360deg); } }

      /* Toast notification */
      #il-toast {
        position: fixed;
        bottom: 90px;
        right: 16px;
        z-index: 10000;
        background: #0A2E2C;
        color: #fff;
        padding: 9px 16px;
        border-radius: 99px;
        font-family: 'DM Sans', sans-serif;
        font-size: 12px;
        font-weight: 500;
        opacity: 0;
        pointer-events: none;
        transform: translateY(8px);
        transition: opacity 0.3s, transform 0.3s;
        white-space: nowrap;
      }
      #il-toast.show {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  // ── BUILD TOGGLE BUTTON ──────────────────────────────────
  function buildToggleButton(currentLang) {
    // Remove existing if present
    const existing = document.getElementById('il-lang-toggle');
    if (existing) existing.remove();

    const other = currentLang === 'en' ? 'km' : 'en';
    const curr  = CONFIG.labels[currentLang];
    const otherL = CONFIG.labels[other];

    const btn = document.createElement('button');
    btn.id = 'il-lang-toggle';
    btn.setAttribute('aria-label', `Switch language to ${otherL.label}`);
    btn.innerHTML = `
      <span class="lt-spinner"></span>
      <span class="lt-flag">${curr.flag}</span>
      <span class="lt-short">${curr.short}</span>
      <span class="lt-divider"></span>
      <span class="lt-other">${otherL.flag} ${otherL.short}</span>
    `;
    btn.addEventListener('click', () => switchLanguage(other));
    document.body.appendChild(btn);

    // Also create hidden Google Translate container (required by API)
    let gtEl = document.getElementById('google_translate_element');
    if (!gtEl) {
      gtEl = document.createElement('div');
      gtEl.id = 'google_translate_element';
      document.body.appendChild(gtEl);
    }

    // Toast element
    if (!document.getElementById('il-toast')) {
      const toast = document.createElement('div');
      toast.id = 'il-toast';
      document.body.appendChild(toast);
    }
  }

  // ── SWITCH LANGUAGE ──────────────────────────────────────
  function switchLanguage(targetLang) {
    const btn = document.getElementById('il-lang-toggle');
    if (btn) btn.classList.add('il-loading');

    localStorage.setItem(CONFIG.storageKey, targetLang);

    if (targetLang === 'en') {
      // Switch back to English — use Google's restore function
      restoreEnglish();
      setTimeout(() => {
        buildToggleButton('en');
        showToast('🇬🇧 Switched to English');
        applyKhmerFont(false);
      }, 400);
    } else {
      // Switch to Khmer via Google Translate
      translateToKhmer();
    }
  }

  // ── TRANSLATE TO KHMER ───────────────────────────────────
  function translateToKhmer() {
    // Method: programmatically trigger Google Translate's language selection
    // We poll until the Google Translate cookie/select is available
    let attempts = 0;
    const maxAttempts = 40;

    const tryTranslate = () => {
      attempts++;

      // Try using the Google Translate combo element
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = 'km';
        select.dispatchEvent(new Event('change'));
        setTimeout(() => {
          buildToggleButton('km');
          showToast('🇰🇭 បានប្តូរទៅភាសាខ្មែរ');
          applyKhmerFont(true);
        }, 800);
        return;
      }

      // Alternative: use Google's cookie method
      if (window.google && window.google.translate) {
        try {
          const instance = window.google.translate.TranslateElement.getInstance
            ? window.google.translate.TranslateElement.getInstance()
            : null;
          if (instance) {
            // Force language switch via cookie
            setCookie('googtrans', '/en/km');
            location.reload();
            return;
          }
        } catch (e) {}
      }

      // Cookie fallback — most reliable method
      setCookie('googtrans', '/en/km');

      if (attempts < maxAttempts) {
        setTimeout(tryTranslate, 150);
      } else {
        // Final fallback: set cookie and reload
        setCookie('googtrans', '/en/km');
        location.reload();
      }
    };

    // First try: if Google Translate is already loaded
    tryTranslate();
  }

  // ── RESTORE ENGLISH ──────────────────────────────────────
  function restoreEnglish() {
    // Remove Google Translate cookies
    deleteCookie('googtrans');
    deleteCookie('googtrans', location.hostname);
    deleteCookie('googtrans', '.' + location.hostname);

    // Try using Google's built-in restore
    try {
      const iframe = document.querySelector('.goog-te-banner-frame');
      if (iframe) {
        const iDoc = iframe.contentDocument || iframe.contentWindow.document;
        const restoreBtn = iDoc.querySelector('.goog-te-banner-close-button') ||
                           iDoc.querySelector('[id*="restore"]');
        if (restoreBtn) { restoreBtn.click(); return; }
      }
    } catch (e) {}

    // Reload without translation cookie
    location.reload();
  }

  // ── COOKIE HELPERS ───────────────────────────────────────
  function setCookie(name, value, days = 1) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value};expires=${expires};path=/`;
  }

  function deleteCookie(name, domain) {
    const domainStr = domain ? `;domain=${domain}` : '';
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/${domainStr}`;
  }

  function getCookie(name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  }

  // ── KHMER FONT ENHANCEMENT ───────────────────────────────
  // Load Khmer font from Google Fonts when needed
  function applyKhmerFont(enable) {
    const id = 'il-khmer-font';
    if (enable && !document.getElementById(id)) {
      const link = document.createElement('link');
      link.id   = id;
      link.rel  = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Kantumruy+Pro:wght@300;400;500;600;700&display=swap';
      document.head.appendChild(link);
      document.documentElement.setAttribute('lang', 'km');
    } else if (!enable) {
      document.documentElement.setAttribute('lang', 'en');
    }
  }

  // ── TOAST ────────────────────────────────────────────────
  function showToast(msg) {
    const toast = document.getElementById('il-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
  }

  // ── AUTO-DETECT ON PAGE LOAD ─────────────────────────────
  function checkAutoTranslate() {
    // If Google Translate cookie is already set to Khmer, update button
    const gtCookie = getCookie('googtrans');
    if (gtCookie && gtCookie.includes('/km')) {
      // Page was already translated — show correct button state
      buildToggleButton('km');
      applyKhmerFont(true);
      return true;
    }
    return false;
  }

  // ── TELEGRAM MINI APP DETECTION ──────────────────────────
  function detectTelegramApp() {
    if (window.Telegram?.WebApp || document.body.classList.contains('tg-app')) {
      document.body.classList.add('tg-app');
    }
  }

  // ── MAIN INIT ────────────────────────────────────────────
  function init() {
    detectTelegramApp();
    suppressGoogleUI();
    injectGoogleTranslate();

    const initialLang = detectInitialLang();

    // Check if page is already translated (e.g. after reload)
    const alreadyTranslated = checkAutoTranslate();

    if (!alreadyTranslated) {
      // Build button for detected/saved language
      buildToggleButton(initialLang);

      // If Khmer is detected, auto-translate after Google loads
      if (initialLang === 'km') {
        applyKhmerFont(true);
        // Wait for Google Translate to initialise then translate
        let waited = 0;
        const autoTranslateInterval = setInterval(() => {
          waited += 200;
          const select = document.querySelector('.goog-te-combo');
          if (select || waited > 5000) {
            clearInterval(autoTranslateInterval);
            if (select) {
              setCookie('googtrans', '/en/km');
              select.value = 'km';
              select.dispatchEvent(new Event('change'));
              setTimeout(() => buildToggleButton('km'), 600);
            } else {
              setCookie('googtrans', '/en/km');
              // Don't auto-reload — just set cookie for next full load
            }
          }
        }, 200);
      }
    }
  }

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
