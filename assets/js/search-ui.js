import { prepare, search, facetCounts, highlightSegments, snippet } from './lib/search.js';

let indexPromise;

/** Fetch and prepare the index once; later callers share the same promise. */
export function loadIndex(url) {
  indexPromise ??= fetch(url, { credentials: 'same-origin' })
    .then((r) => {
      if (!r.ok) throw new Error(`search index ${r.status}`);
      return r.json();
    })
    .then(prepare)
    .catch((err) => {
      indexPromise = undefined;
      throw err;
    });
  return indexPromise;
}

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === 'class') node.className = v;
    else if (k === 'text') node.textContent = v;
    else node.setAttribute(k, v);
  }
  for (const child of children) if (child) node.append(child);
  return node;
}

function highlighted(text, terms) {
  const span = document.createElement('span');
  for (const seg of highlightSegments(text, terms)) {
    if (seg.hit) span.append(el('mark', { class: 'rounded-sm bg-[#fbd4be] px-0.5 text-[#16181d]', text: seg.text }));
    else span.append(seg.text);
  }
  return span;
}

const KIND_FILL = { Lesson: 'part-code', Module: 'part-ops', Tutorial: 'part-concept', 'Blog post': 'part-impact' };

function resultNode(doc, terms, { id, compact = false } = {}) {
  const path = [doc.g, doc.k].filter(Boolean).join(' › ');
  const link = el('a', { href: doc.u, class: 'flex flex-col gap-1 rounded-xl px-3.5 py-3 text-ink no-underline hover:bg-chip aria-selected:bg-chip', role: 'option', id: id ?? '' });
  const top = el('span', { class: 'flex flex-wrap items-center gap-2' },
    el('span', { class: `on-part rounded-full px-2 py-px font-mono text-[11px] uppercase tracking-[0.08em] ${KIND_FILL[doc.k] ?? 'bg-chip text-ink'}`, text: doc.k }),
    el('span', { class: 'text-xs text-muted', text: doc.g || '' }));
  const title = el('strong', { class: compact ? 'text-base' : 'font-display text-xl font-extrabold tracking-[-0.02em]' }, highlighted(doc.t, terms));
  link.append(top, title);
  const text = snippet(doc, terms, compact ? 110 : 190);
  if (text) link.append(el('span', { class: 'text-sm text-ink2' }, highlighted(text, terms)));
  if (!compact && path) link.append(el('span', { class: 'font-mono text-xs text-muted', text: [doc.l, path].filter(Boolean).join(' · ') }));
  return link;
}

/* ------------------------------------------------------------------ */
/* Command-palette dialog                                              */
/* ------------------------------------------------------------------ */
export function initSearchDialog(indexUrl) {
  const dialog = document.getElementById('search-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const input = dialog.querySelector('[data-search-input]');
  const list = dialog.querySelector('[data-search-results]');
  const all = dialog.querySelector('[data-search-all]');
  let active = -1;

  const items = () => [...list.querySelectorAll('[role="option"]')];
  const setActive = (i) => {
    const nodes = items();
    if (!nodes.length) return;
    active = (i + nodes.length) % nodes.length;
    nodes.forEach((n, k) => n.setAttribute('aria-selected', String(k === active)));
    input.setAttribute('aria-activedescendant', nodes[active].id);
    nodes[active].scrollIntoView({ block: 'nearest' });
  };

  const render = async () => {
    const q = input.value.trim();
    all.setAttribute('href', `/search/?q=${encodeURIComponent(q)}`);
    list.replaceChildren();
    active = -1;
    if (!q) {
      list.append(el('p', { class: 'px-3.5 py-6 text-sm text-muted', text: 'Start typing to search tutorials, lessons, tools and posts.' }));
      return;
    }
    try {
      const index = await loadIndex(indexUrl);
      if (input.value.trim() !== q) return;
      const { terms, results } = search(index, q, { limit: 8 });
      if (!results.length) {
        list.append(el('p', { class: 'px-3.5 py-6 text-sm text-ink2', text: `No results for "${q}". Try a shorter or more general term.` }));
        return;
      }
      results.forEach(({ doc }, i) => list.append(resultNode(doc, terms, { id: `sr-${i}`, compact: true })));
      setActive(0);
    } catch {
      list.append(el('p', { class: 'px-3.5 py-6 text-sm text-bad', text: 'Search is unavailable right now. Reload the page and try again.' }));
    }
  };

  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(render, 80);
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') (e.preventDefault(), setActive(active + 1));
    else if (e.key === 'ArrowUp') (e.preventDefault(), setActive(active - 1));
    else if (e.key === 'Enter') {
      e.preventDefault();
      const target = items()[Math.max(active, 0)];
      if (target) window.location.assign(target.getAttribute('href'));
      else if (input.value.trim()) window.location.assign(all.getAttribute('href'));
    }
  });

  const open = () => {
    if (!dialog.open) dialog.showModal();
    input.focus();
    input.select();
    loadIndex(indexUrl).catch(() => {});
    render();
  };
  const close = () => dialog.open && dialog.close();

  dialog.querySelector('[data-search-close]')?.addEventListener('click', close);
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) close();
  });
  list.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) dialog.close();
  });

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-search-open]');
    if (trigger && !document.querySelector('[data-search-page]')) {
      e.preventDefault();
      open();
    }
  });
  document.addEventListener('keydown', (e) => {
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      open();
    } else if (e.key === '/' && !typing && !dialog.open) {
      e.preventDefault();
      open();
    }
  });
}

/* ------------------------------------------------------------------ */
/* /search/ page with facets and sorting                               */
/* ------------------------------------------------------------------ */
export function initSearchPage(indexUrl) {
  const root = document.querySelector('[data-search-page]');
  if (!root) return;
  const input = root.querySelector('[data-search-page-input]');
  const form = root.querySelector('[data-search-page-form]');
  const out = root.querySelector('[data-search-page-results]');
  const count = root.querySelector('[data-search-count]');
  const facetsEl = root.querySelector('[data-search-facets]');
  const sortEl = root.querySelector('[data-search-sort]');
  const filters = { k: new Set(), g: new Set(), l: new Set() };
  const FACETS = [
    ['k', 'Type', 'kinds'],
    ['g', 'Collection', 'groups'],
    ['l', 'Level', 'levels'],
  ];
  const optsOf = () => ({ kinds: filters.k, groups: filters.g, levels: filters.l, sort: sortEl.value });

  const params = new URLSearchParams(location.search);
  input.value = params.get('q') ?? '';

  const renderFacets = (index, q) => {
    facetsEl.replaceChildren();
    for (const [field, label] of FACETS) {
      const counts = facetCounts(index, q, field, optsOf());
      if (!counts.length) continue;
      const set = el('fieldset', { class: 'flex flex-col' }, el('legend', { class: 'eyebrow pb-1.5 text-[11px]', text: label }));
      for (const [value, n] of counts) {
        const box = el('input', { type: 'checkbox', class: 'size-5 accent-[var(--ink)]', value });
        box.checked = filters[field].has(value);
        box.addEventListener('change', () => {
          if (box.checked) filters[field].add(value);
          else filters[field].delete(value);
          run();
        });
        set.append(el('label', { class: 'flex min-h-11 cursor-pointer items-center gap-3 border-t border-line-soft text-[15px]' }, box, el('span', { class: 'flex-1', text: value }), el('span', { class: 'text-[13px] text-muted', text: String(n) })));
      }
      facetsEl.append(set);
    }
  };

  const run = async () => {
    const q = input.value.trim();
    const url = new URL(location.href);
    if (q) url.searchParams.set('q', q);
    else url.searchParams.delete('q');
    history.replaceState(null, '', url);
    out.replaceChildren();
    if (!q) {
      count.textContent = 'Type to search';
      facetsEl.replaceChildren();
      return;
    }
    try {
      const index = await loadIndex(indexUrl);
      const { terms, results } = search(index, q, optsOf());
      count.textContent = `${results.length} ${results.length === 1 ? 'result' : 'results'} for "${q}"`;
      renderFacets(index, q);
      if (!results.length) {
        out.append(el('li', { class: 'panel p-6 text-ink2', text: 'Nothing matched. Remove a filter, check the spelling, or try a broader term like "errors" instead of "exception handling".' }));
        return;
      }
      for (const { doc } of results.slice(0, 50)) out.append(el('li', { class: 'panel' }, resultNode(doc, terms)));
    } catch {
      count.textContent = 'Search is unavailable right now. Reload the page and try again.';
    }
  };

  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(run, 120);
  });
  form.addEventListener('submit', (e) => (e.preventDefault(), run()));
  sortEl.addEventListener('change', run);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') (input.value = '', run());
  });
  root.querySelectorAll('[data-suggestion]').forEach((a) =>
    a.addEventListener('click', (e) => {
      e.preventDefault();
      input.value = a.textContent.trim();
      run();
    }));
  run();
}
