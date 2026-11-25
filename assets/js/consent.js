import { clearGaCookies, createConsentStorage, disableAnalytics, enableAnalytics, readConsent, saveConsent } from './lib/consent.js';

/** Consent banner. The choice itself is stored in localStorage ("bb:consent:v1"). */
export function initConsent(gaId) {
  const banner = document.getElementById('consent-banner');
  if (!banner) return;
  const storage = createConsentStorage(window, document);

  const panel = banner.querySelector('[data-consent-panel]');
  const analyticsBox = banner.querySelector('[data-consent-analytics]');
  const show = (customize = false) => {
    const current = readConsent(storage);
    analyticsBox.checked = current?.analytics ?? false;
    banner.hidden = false;
    panel.hidden = !customize;
    banner.querySelector('[data-consent-customize]').setAttribute('aria-expanded', String(customize));
    (customize ? analyticsBox : banner.querySelector('[data-consent-accept]')).focus({ preventScroll: true });
  };
  const hide = () => {
    banner.hidden = true;
  };
  const apply = (analytics) => {
    const previous = readConsent(storage);
    saveConsent(storage, analytics);
    if (analytics) enableAnalytics(gaId);
    else if (previous?.analytics || gaId) {
      disableAnalytics(gaId);
      clearGaCookies(gaId);
    }
    hide();
  };

  const existing = readConsent(storage);
  if (existing?.analytics) enableAnalytics(gaId);
  if (!existing) show(false);

  banner.addEventListener('click', (e) => {
    if (e.target.closest('[data-consent-accept]')) apply(true);
    else if (e.target.closest('[data-consent-reject]')) apply(false);
    else if (e.target.closest('[data-consent-save]')) apply(analyticsBox.checked);
    else if (e.target.closest('[data-consent-customize]')) {
      const open = panel.hidden;
      panel.hidden = !open;
      e.target.closest('[data-consent-customize]').setAttribute('aria-expanded', String(open));
    }
  });
  banner.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && readConsent(storage)) hide();
  });
  document.addEventListener('click', (e) => {
    const opener = e.target.closest('[data-consent-open]');
    if (opener) {
      e.preventDefault();
      show(true);
    }
  });
}
