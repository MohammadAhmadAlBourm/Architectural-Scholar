/* ---- State ---- */
let currentLang = 'en';

/* ---- Language Toggle ---- */
function toggleLang() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    const html = document.documentElement;
    const isAr = currentLang === 'ar';

    html.setAttribute('lang', currentLang);
    html.setAttribute('dir', isAr ? 'rtl' : 'ltr');

    // Update all lang-btn text
    document.querySelectorAll('#lang-toggle, #lang-toggle-mobile').forEach(btn => {
        btn.textContent = isAr ? 'EN' : 'عربي';
    });

    // Update RTL-dependent badge position
    const badge = document.getElementById('years-badge');
    if (badge) {
        badge.style.right = isAr ? 'auto' : '-2rem';
        badge.style.left = isAr ? '-2rem' : 'auto';
    }

    // Update all data-en / data-ar elements
    document.querySelectorAll('[data-en]').forEach(el => {
        const txt = el.getAttribute(isAr ? 'data-ar' : 'data-en');
        if (txt) el.innerHTML = txt;
    });

    // Update placeholder attributes
    document.querySelectorAll('[data-placeholder-en]').forEach(el => {
        el.placeholder = el.getAttribute(isAr ? 'data-placeholder-ar' : 'data-placeholder-en');
    });

    // Update details div text (FAQ answers stored in data-en / data-ar)
    document.querySelectorAll('details > div[data-en]').forEach(el => {
        el.textContent = el.getAttribute(isAr ? 'data-ar' : 'data-en');
    });

    // font-family tweak for body
    document.body.style.fontFamily = isAr
        ? '"Noto Kufi Arabic", sans-serif'
        : '"Inter", sans-serif';
}

/* ---- Scroll helpers ---- */
function scrollToEnroll() {
    document.getElementById('pricing').scrollIntoView({ behavior: 'smooth' });
}
function scrollToContact() {
    document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
}
function closeMobileMenu() {
    document.getElementById('mobile-menu').classList.remove('open');
}

/* ---- Scroll-to-top visibility ---- */
const scrollTopBtn = document.getElementById('scroll-top');
window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

/* ---- Nav scroll effects ---- */
const nav = document.getElementById('main-nav');
const navLinks = document.querySelectorAll('a.nav-link');
const sections = ['home', 'curriculum', 'instructors', 'pricing', 'reviews', 'faq', 'contact', 'cta'].map(id => document.getElementById(id)).filter(Boolean);

window.addEventListener('scroll', () => {
    // scrolled class
    nav.classList.toggle('scrolled', window.scrollY > 10);

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
        if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
    });
    navLinks.forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}, { passive: true });

/* ---- Reveal on scroll ---- */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObserver.unobserve(e.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ---- Countdown timer (reset daily at midnight UTC) ---- */
function updateCountdown() {
    const now = new Date();
    const midnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1));
    const diff = midnight - now;
    const h = Math.floor(diff / 3600000);
    const m = Math.floor((diff % 3600000) / 60000);
    const s = Math.floor((diff % 60000) / 1000);
    const pad = n => String(n).padStart(2, '0');
    document.getElementById('cd-hours').textContent = pad(h);
    document.getElementById('cd-mins').textContent = pad(m);
    document.getElementById('cd-secs').textContent = pad(s);
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ---- Form submit (demo) ---- */
function handleFormSubmit(e) {
    e.preventDefault();
    const success = document.getElementById('form-success');
    const btn = e.target.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.style.opacity = '.6';
    setTimeout(() => {
        success.classList.remove('hidden');
        e.target.reset();
        btn.disabled = false;
        btn.style.opacity = '1';
        setTimeout(() => success.classList.add('hidden'), 5000);
    }, 800);
}

/* ---- Smooth scroll for all anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const id = a.getAttribute('href').slice(1);
        if (!id) return;
        const target = document.getElementById(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});