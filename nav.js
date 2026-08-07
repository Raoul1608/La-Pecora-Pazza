// Shared navigation logic

(function () {
  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconMenu = document.getElementById('icon-menu');
  const iconClose = document.getElementById('icon-close');

  // Scroll behaviour
  function onScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      iconMenu.style.display = isOpen ? 'none' : 'block';
      iconClose.style.display = isOpen ? 'block' : 'none';
    });
  }

  // Close mobile menu on link click
  document.querySelectorAll('.mobile-nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      iconMenu.style.display = 'block';
      iconClose.style.display = 'none';
    });
  });
})();
