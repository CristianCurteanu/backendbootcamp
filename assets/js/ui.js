// Small progressive enhancements: theme, nav, code copy, scrollspy, filters.

export function initTheme() {
  const btn = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  const sync = () => {
    const dark = root.classList.contains('dark');
    if (btn) {
      btn.setAttribute('aria-pressed', String(dark));
      const label = btn.querySelector('[data-theme-label]');
      if (label) label.textContent = dark ? 'Dark theme' : 'Light theme';
    }
  };
  btn?.addEventListener('click', () => {
    const dark = root.classList.toggle('dark');
    try {
      localStorage.setItem('bb:theme', dark ? 'dark' : 'light');
    } catch {
      /* private mode: theme just won't persist */
    }
    sync();
  });
  sync();
}

export function initNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('hidden', !open);
    nav.classList.toggle('flex', open);
  });
  const kbd = document.querySelector('[data-kbd]');
  if (kbd && /Mac|iPhone|iPad/.test(navigator.platform)) kbd.textContent = '⌘ K';
}

async function copy(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = Object.assign(document.createElement('textarea'), { value: text });
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.append(area);
    area.select();
    const ok = document.execCommand('copy');
    area.remove();
    return ok;
  }
}

function flash(button, text) {
  const original = button.dataset.label ?? button.textContent;
  button.dataset.label = original;
  button.textContent = text;
  clearTimeout(button._t);
  button._t = setTimeout(() => (button.textContent = original), 1600);
}

export function initCopy() {
  document.addEventListener('click', async (event) => {
    const codeBtn = event.target.closest('[data-copy-code]');
    if (codeBtn) {
      const code = codeBtn.closest('[data-codebox]')?.querySelector('pre');
      if (code) flash(codeBtn, (await copy(code.innerText.replace(/\n$/, ''))) ? 'Copied' : 'Press Ctrl C');
      return;
    }
    const linkBtn = event.target.closest('[data-copy-link]');
    if (linkBtn) {
      flash(linkBtn, (await copy(location.href.split('#')[0])) ? 'Link copied' : 'Copy failed');
      return;
    }
    const share = event.target.closest('[data-share]');
    if (share) {
      const data = { title: share.dataset.title ?? document.title, url: location.href.split('#')[0] };
      if (navigator.share) navigator.share(data).catch(() => {});
      else flash(share, (await copy(data.url)) ? 'Link copied' : 'Copy failed');
    }
  });
}

/** Highlight the TOC entry for the section in view. */
export function initScrollSpy() {
  const links = [...document.querySelectorAll('[data-toc] a[href^="#"]')];
  if (!links.length || !('IntersectionObserver' in window)) return;
  const byId = new Map(links.map((a) => [decodeURIComponent(a.getAttribute('href').slice(1)), a]));
  const targets = [...byId.keys()].map((id) => document.getElementById(id)).filter(Boolean);
  const visible = new Set();
  const update = () => {
    const first = targets.find((t) => visible.has(t));
    links.forEach((a) => a.removeAttribute('aria-current'));
    if (first) byId.get(first.id)?.setAttribute('aria-current', 'true');
  };
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) e.isIntersecting ? visible.add(e.target) : visible.delete(e.target);
    update();
  }, { rootMargin: '0px 0px -70% 0px' });
  targets.forEach((t) => io.observe(t));
  links.forEach((a) => a.classList.add('toc-link'));
}

export function initExpandAll() {
  const btn = document.querySelector('[data-expand-all]');
  if (!btn) return;
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-pressed') !== 'true';
    document.querySelectorAll('[data-outline] details').forEach((d) => (d.open = open));
    btn.setAttribute('aria-pressed', String(open));
    btn.textContent = open ? 'Collapse all modules' : 'Expand all modules';
  });
}

export function initPostFilter() {
  const root = document.querySelector('[data-post-filter]');
  if (!root) return;
  const buttons = [...root.querySelectorAll('[data-filter]')];
  const cards = [...root.querySelectorAll('[data-cat]')];
  const empty = root.querySelector('[data-empty]');
  const apply = (value) => {
    let shown = 0;
    for (const card of cards) {
      const match = value === 'all' || card.dataset.cat.split(' ').includes(value);
      card.hidden = !match;
      if (match) shown += 1;
    }
    buttons.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.filter === value)));
    empty?.classList.toggle('hidden', shown > 0);
  };
  buttons.forEach((b) => b.addEventListener('click', () => apply(b.dataset.filter)));
}
