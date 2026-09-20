// Lightbox galleria — condiviso tra pizzeria.html e ristorante.html
// Si attiva su qualsiasi contenitore con [data-gallery] e usa il markup
// #lightbox presente nella pagina.

(function () {
  const gallery = document.querySelector('[data-gallery]');
  const lightbox = document.getElementById('lightbox');
  if (!gallery || !lightbox) return;

  const lbImg = document.getElementById('lightbox-img');
  const lbClose = document.getElementById('lightbox-close');
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');
  const lbCounter = document.getElementById('lightbox-counter');

  let images = [];
  let current = 0;
  let lastFocused = null;

  function refresh() {
    images = Array.from(gallery.querySelectorAll('img'));
  }

  function render() {
    const img = images[current];
    if (!img) return;
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    lbCounter.textContent = (current + 1) + ' / ' + images.length;
  }

  function open(index) {
    refresh();
    if (!images.length) return;
    lastFocused = document.activeElement;
    current = index;
    render();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    lbClose.focus();
  }

  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lbImg.src = '';
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  function prev() {
    current = (current - 1 + images.length) % images.length;
    render();
  }

  function next() {
    current = (current + 1) % images.length;
    render();
  }

  // Apertura: delega sul contenitore, funziona anche con immagini
  // aggiunte dopo il caricamento della pagina.
  gallery.addEventListener('click', function (e) {
    const img = e.target.closest('img');
    if (!img || !gallery.contains(img)) return;
    refresh();
    open(images.indexOf(img));
  });

  lbClose.addEventListener('click', close);
  lbPrev.addEventListener('click', prev);
  lbNext.addEventListener('click', next);

  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener('keydown', function (e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  });

  // Swipe su mobile
  let touchStartX = null;
  lightbox.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  lightbox.addEventListener('touchend', function (e) {
    if (touchStartX === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) { delta > 0 ? prev() : next(); }
    touchStartX = null;
  }, { passive: true });

  refresh();
})();
