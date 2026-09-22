(() => {
  const search = document.getElementById('nav-query');
  const items = [...document.querySelectorAll('[data-nav-item]')];
  const groups = [...document.querySelectorAll('[data-nav-group]')];
  const result = document.getElementById('nav-result');
  if (!search || !result) return;
  const apply = () => {
    const term = search.value.trim().toLocaleLowerCase();
    for (const item of items) item.hidden = !item.textContent.toLocaleLowerCase().includes(term);
    for (const group of groups) group.hidden = ![...group.querySelectorAll('[data-nav-item]')].some(item => !item.hidden);
    result.textContent = `${items.filter(item => !item.hidden).length} / ${items.length} 文書`;
  };
  search.addEventListener('input', apply);
  document.getElementById('nav-reset').addEventListener('click', () => {search.value = ''; apply();});
  const reveal = () => {
    let id;
    try {id = decodeURIComponent(location.hash.slice(1));} catch {return;}
    const target = document.getElementById(id);
    if (!target) return;
    let parent = target.parentElement;
    while (parent) {if (parent.tagName === 'DETAILS') parent.open = true; parent = parent.parentElement;}
    target.scrollIntoView();
  };
  window.addEventListener('hashchange', reveal);
  document.addEventListener('click', event => {
    const link = event.target.closest('a[href]');
    if (link && new URL(link.href).href === location.href) reveal();
  });
  // Print all examples without changing the reader's open/closed state afterwards.
  let closed = [];
  window.addEventListener('beforeprint', () => {closed = [...document.querySelectorAll('details:not([open])')]; closed.forEach(el => {el.open = true;});});
  window.addEventListener('afterprint', () => {closed.forEach(el => {el.open = false;}); closed = [];});
  apply(); reveal();
})();
