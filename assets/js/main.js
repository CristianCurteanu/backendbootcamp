import { createStore, pickBackend } from './lib/store.js';
import { initConsent } from './consent.js';
import { initProgress } from './progress.js';
import { initSearchDialog, initSearchPage } from './search-ui.js';
import { initCopy, initExpandAll, initNav, initPostFilter, initScrollSpy, initTheme } from './ui.js';

const script = document.querySelector('script[data-search-index]');
const indexUrl = script?.dataset.searchIndex ?? '/search-index.json';
const store = createStore(pickBackend(script?.dataset.storage === 'local' ? 'local' : 'session'));

const boot = () => {
  initConsent(script?.dataset.ga ?? '');
  initTheme();
  initNav();
  initCopy();
  initScrollSpy();
  initExpandAll();
  initPostFilter();
  initProgress(store);
  initSearchDialog(indexUrl);
  initSearchPage(indexUrl);
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
else boot();
