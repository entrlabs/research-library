(() => {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav.dataset.open = String(!open);
  });

  const rows = [...document.querySelectorAll('[data-paper]')];
  const search = document.querySelector('#paper-search');
  const filter = document.querySelector('#category-filter');
  const status = document.querySelector('#filter-status');
  const empty = document.querySelector('#no-results');
  rows.forEach((row, index) => row.style.setProperty('--row', index));

  const applyFilters = () => {
    const query = (search?.value || '').trim().toLowerCase();
    const category = filter?.value || 'all';
    let visible = 0;
    rows.forEach((row) => {
      const matchText = !query || row.dataset.search.includes(query);
      const matchCategory = category === 'all' || row.dataset.category === category;
      row.hidden = !(matchText && matchCategory);
      if (!row.hidden) visible += 1;
    });
    if (status) status.textContent = `Showing ${visible} of ${rows.length} articles.`;
    if (empty) empty.hidden = visible !== 0;
  };

  search?.addEventListener('input', applyFilters);
  filter?.addEventListener('change', applyFilters);
  document.querySelectorAll('[data-category-link]').forEach((link) => {
    link.addEventListener('click', () => {
      if (filter) filter.value = link.dataset.categoryLink;
      applyFilters();
    });
  });
})();

