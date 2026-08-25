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

  const canvas = document.querySelector('#library-map');
  const tooltip = document.querySelector('#library-map-tooltip');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    const domains = [
      { name: 'Foundations & Theory', count: 5, x: .18, y: .30 },
      { name: 'Reviews & Meta-Analyses', count: 4, x: .50, y: .18 },
      { name: 'Design & Reflection', count: 5, x: .80, y: .31 },
      { name: 'Reciprocity & Justice', count: 5, x: .30, y: .74 },
      { name: 'Outcomes & Institutional Practice', count: 6, x: .70, y: .72 }
    ];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let selected = -1;
    let frame = 0;
    let width = 0;
    let height = 0;

    const drawMap = () => {
      ctx.clearRect(0, 0, width, height);
      const center = { x: width * .5, y: height * .5 };
      domains.forEach((domain, index) => {
        const x = width * domain.x;
        const y = height * domain.y;
        const active = selected === index;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(x, y);
        ctx.strokeStyle = active ? 'rgba(91,140,255,.9)' : 'rgba(91,140,255,.22)';
        ctx.lineWidth = active ? 1.5 : 1;
        ctx.stroke();
        for (let paper = 0; paper < domain.count; paper += 1) {
          const angle = ((Math.PI * 2) / domain.count) * paper + index * .7;
          const orbit = 38 + (paper % 2) * 12;
          const pulse = reducedMotion ? 0 : Math.sin(frame * .018 + paper + index) * 1.2;
          const px = x + Math.cos(angle) * orbit;
          const py = y + Math.sin(angle) * orbit;
          ctx.beginPath();
          ctx.arc(px, py, (active ? 4.4 : 3.2) + pulse * .18, 0, Math.PI * 2);
          ctx.fillStyle = active ? '#DCE5FB' : '#5B8CFF';
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(x, y, active ? 13 : 10, 0, Math.PI * 2);
        ctx.fillStyle = active ? '#F4F6FB' : '#2E5BD0';
        ctx.fill();
        ctx.strokeStyle = '#5B8CFF';
        ctx.lineWidth = 2;
        ctx.stroke();
      });
      ctx.beginPath();
      ctx.arc(center.x, center.y, 21, 0, Math.PI * 2);
      ctx.fillStyle = '#131C32';
      ctx.fill();
      ctx.strokeStyle = '#5B8CFF';
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.fillStyle = '#EEF1FB';
      ctx.font = '600 11px "Archivo", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('EntrSL', center.x, center.y);
    };

    const resizeMap = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      drawMap();
    };
    const hitDomain = (event) => {
      const rect = canvas.getBoundingClientRect();
      const px = event.clientX - rect.left;
      const py = event.clientY - rect.top;
      return domains.findIndex(domain => Math.hypot(px - width * domain.x, py - height * domain.y) < 58);
    };
    canvas.addEventListener('pointermove', event => {
      selected = hitDomain(event);
      canvas.style.cursor = selected >= 0 ? 'pointer' : 'default';
      if (tooltip) {
        if (selected >= 0) {
          const domain = domains[selected];
          tooltip.textContent = domain.name + ' · ' + domain.count + ' papers';
          tooltip.style.left = (event.offsetX + 18) + 'px';
          tooltip.style.top = (event.offsetY + 18) + 'px';
          tooltip.setAttribute('aria-hidden', 'false');
        } else tooltip.setAttribute('aria-hidden', 'true');
      }
      drawMap();
    });
    canvas.addEventListener('pointerleave', () => {
      selected = -1;
      if (tooltip) tooltip.setAttribute('aria-hidden', 'true');
      drawMap();
    });
    document.querySelectorAll('[data-map-domain]').forEach(item => {
      item.addEventListener('pointerenter', () => { selected = Number(item.dataset.mapDomain); drawMap(); });
      item.addEventListener('pointerleave', () => { selected = -1; drawMap(); });
    });
    window.addEventListener('resize', resizeMap);
    resizeMap();
    if (!reducedMotion) {
      const animate = () => {
        frame += 1;
        if (frame % 2 === 0) drawMap();
        requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }
});
