// Jahr
document.querySelectorAll('#year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Mobile Nav
const navToggle = document.getElementById('navToggle');
const mainNav   = document.getElementById('mainNav');
if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
  mainNav.querySelectorAll('a').forEach(l => l.addEventListener('click', () => mainNav.classList.remove('open')));
}

// Scroll Reveal
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 60);
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.06 });
  revealEls.forEach(el => obs.observe(el));
}

// Ticker doppeln
document.querySelectorAll('.tape-inner').forEach(t => {
  t.innerHTML += t.innerHTML;
});

// Lightbox
const lightbox  = document.getElementById('lightbox');
const lbImg     = document.getElementById('lbImg');
const lbClose   = document.getElementById('lbClose');
const lbPrev    = document.getElementById('lbPrev');
const lbNext    = document.getElementById('lbNext');
const lbCounter = document.getElementById('lbCounter');

let imgs = [];
let idx  = 0;

if (lightbox) {
  imgs = Array.from(document.querySelectorAll('.img-item img'));

  // data-index Attribute setzen
  document.querySelectorAll('.img-item').forEach((item, i) => {
    item.setAttribute('data-index', String(i + 1).padStart(2, '0'));
  });

  const show = (i) => {
    idx = (i + imgs.length) % imgs.length;
    lbImg.src = imgs[idx].src;
    lbImg.alt = imgs[idx].alt;
    if (lbCounter) lbCounter.textContent = `${String(idx+1).padStart(2,'0')} / ${String(imgs.length).padStart(2,'0')}`;
  };

  const open = (i) => {
    show(i);
    lightbox.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  const close = () => {
    lightbox.classList.remove('open');
    document.body.style.overflow = '';
  };

  imgs.forEach((img, i) => img.parentElement.addEventListener('click', () => open(i)));

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click',  () => show(idx - 1));
  lbNext.addEventListener('click',  () => show(idx + 1));
  lightbox.addEventListener('click', e => { if (e.target === lightbox) close(); });

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('open')) return;
    if (e.key === 'Escape')      close();
    if (e.key === 'ArrowLeft')   show(idx - 1);
    if (e.key === 'ArrowRight')  show(idx + 1);
  });
}
