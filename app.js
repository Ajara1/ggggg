// =====================
// Lightbox for gallery
// =====================
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const closeLb = () => lb.classList.remove('open');
if (document.getElementById('closeLightbox')) {
  document.getElementById('closeLightbox').addEventListener('click', closeLb);
}

document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLb(); });
const gallery = document.getElementById('gallery');
if (gallery) {
  gallery.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    e.preventDefault();
    lbImg.src = a.getAttribute('href');
    lb.classList.add('open');
  });
}

// =====================
// Typewriter letter
// =====================
const tw = document.getElementById('typewriter');
let twTimer;
function typeLetter() {
  clearInterval(twTimer);
  if (!tw) return;
  tw.textContent = '';
  const txt = tw.dataset.text || '';
  let i = 0;
  twTimer = setInterval(() => {
    tw.textContent = txt.slice(0, i++);
    if (i > txt.length) clearInterval(twTimer);
  }, 22);
}
const retypeBtn = document.getElementById('retype');
if (retypeBtn) retypeBtn.addEventListener('click', typeLetter);
window.addEventListener('load', () => setTimeout(typeLetter, 400));

// =====================
// Hearts confetti
// =====================
const heartField = document.getElementById('heartField');
function spawnHeart(x, y) {
  if (!heartField) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const h = document.createElement('div');
  h.className = 'heart';
  const size = 12 + Math.random() * 16;
  h.style.width = size + 'px';
  h.style.height = size + 'px';
  const left = Math.max(0, Math.min(window.innerWidth - size, x - size / 2));
  const top = Math.max(0, Math.min(window.innerHeight - size, y - size / 2));
  h.style.left = left + 'px';
  h.style.top = top + 'px';
  h.style.animation = `floatUp ${800 + Math.random()*900}ms ease-out forwards`;
  heartField.appendChild(h);
  setTimeout(() => h.remove(), 1800);
}
const confettiBtn = document.getElementById('confettiBtn');
if (confettiBtn) {
  confettiBtn.addEventListener('click', () => {
    const { width, height } = heartField.getBoundingClientRect();
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      spawnHeart(x, y);
    }
  });
}

document.addEventListener('click', (e) => {
  if (e.target.closest && e.target.closest('#confettiBtn')) return; // already handled
  spawnHeart(e.clientX, e.clientY);
});