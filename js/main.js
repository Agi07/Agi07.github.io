// Mobile menu: open and close with the hamburger button
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__menu');

toggle.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('open');
  toggle.classList.toggle('open', isOpen);
  toggle.setAttribute('aria-expanded', isOpen);
});

// Close the menu after tapping a link
menu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menu.classList.remove('open');
    toggle.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Hero name: letters grow bolder near the pointer
(function () {
  const words = document.querySelectorAll('.hero__name .word');
  const letters = [];

  words.forEach((word) => {
    const text = word.textContent;
    word.textContent = '';
    for (const ch of text) {
      const span = document.createElement('span');
      span.textContent = ch;
      word.appendChild(span);
      letters.push(span);
    }
  });

  // Respect people who prefer less motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function update(x, y) {
    letters.forEach((l) => {
      const r = l.getBoundingClientRect();
      const d = Math.hypot(x - (r.left + r.width / 2), y - (r.top + r.height / 2));
      const t = Math.max(0, 1 - d / 260);
      l.style.fontVariationSettings =
        "'wght' " + Math.round(300 + 500 * t) + ", 'wdth' " + Math.round(80 + 20 * t);
    });
  }

  window.addEventListener('pointermove', (e) => update(e.clientX, e.clientY));
  window.addEventListener('pointerleave', () => update(-999, -999));
})();

// Cards fade in as they scroll into view
(function () {
  document.documentElement.classList.add('js');

  const items = document.querySelectorAll('.reveal');

  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('visible'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  items.forEach((el) => observer.observe(el));
})();

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();