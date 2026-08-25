document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('#primary-nav');
  if (toggle && nav) toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.classList.toggle('is-open', !open);
  });

  const tbody = document.querySelector('#paper-table-body');
  const sort = document.querySelector('#paper-sort');
  const viewAll = document.querySelector('#view-all-papers');
  if (tbody && sort) sort.addEventListener('change', () => {
    const rows = [...tbody.querySelectorAll('.paper-record')];
    rows.sort((a, b) => {
      if (sort.value === 'year-desc') return Number(b.dataset.year) - Number(a.dataset.year);
      if (sort.value === 'year-asc') return Number(a.dataset.year) - Number(b.dataset.year);
      if (sort.value === 'title') return a.dataset.title.localeCompare(b.dataset.title);
      return Number(a.dataset.rank) - Number(b.dataset.rank);
    });
    rows.forEach(row => tbody.appendChild(row));
  });
  if (tbody && viewAll) viewAll.addEventListener('click', () => {
    const expanded = viewAll.getAttribute('aria-expanded') === 'true';
    tbody.classList.toggle('show-all', !expanded);
    viewAll.setAttribute('aria-expanded', String(!expanded));
    viewAll.textContent = expanded ? 'View all 25 articles' : 'Show first 5 articles';
  });

  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if ('IntersectionObserver' in window && !reduced) {
      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
      revealEls.forEach((el) => io.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add('is-visible'));
    }
  }
});
