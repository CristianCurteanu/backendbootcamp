// Consent state and Google Analytics gating. Nothing from Google Analytics is
// loaded or set until the visitor opts in.

export const CONSENT_KEY = 'bb:consent:v1';
/** Bump when the privacy policy changes in a way that needs fresh consent. */
export const CONSENT_VERSION = 1;

export const CONSENT_COOKIE = 'bb_consent';

/**
 * Storage for the consent record: localStorage first, with a one-year
 * first-party cookie as a backup so the choice survives blocked or cleared
 * localStorage and the banner is not shown again.
 */
export function createConsentStorage(win = globalThis, doc = globalThis.document) {
  const readCookie = () => {
    const hit = String(doc?.cookie ?? '')
      .split(';')
      .map((c) => c.trim())
      .find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
    if (!hit) return null;
    try {
      return decodeURIComponent(hit.slice(CONSENT_COOKIE.length + 1));
    } catch {
      return null;
    }
  };
  return {
    getItem(key) {
      try {
        const value = win.localStorage.getItem(key);
        if (value !== null) return value;
      } catch {
        /* blocked: fall through to the cookie */
      }
      return readCookie();
    },
    setItem(key, value) {
      try {
        win.localStorage.setItem(key, value);
      } catch {
        /* blocked: cookie below still records the choice */
      }
      if (doc) {
        const secure = win.location?.protocol === 'https:' ? '; Secure' : '';
        doc.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; Max-Age=31536000; path=/; SameSite=Lax${secure}`;
      }
    },
  };
}

/** @returns {{v:number, analytics:boolean, at:number}|null} */
export function readConsent(storage) {
  try {
    const parsed = JSON.parse(storage.getItem(CONSENT_KEY) ?? 'null');
    if (parsed?.v !== CONSENT_VERSION || typeof parsed.analytics !== 'boolean') return null;
    return parsed;
  } catch {
    return null;
  }
}

export function saveConsent(storage, analytics, now = Date.now()) {
  const record = { v: CONSENT_VERSION, analytics: Boolean(analytics), at: now };
  try {
    storage.setItem(CONSENT_KEY, JSON.stringify(record));
  } catch {
    /* storage blocked: choice applies to this page view only */
  }
  return record;
}

/** Names of Google Analytics cookies for a measurement id such as "G-ABC123". */
export function gaCookieNames(id, cookieString) {
  const suffix = String(id ?? '').replace(/^G-/, '');
  return cookieString
    .split(';')
    .map((c) => c.split('=')[0].trim())
    .filter((name) => name === '_ga' || name === `_ga_${suffix}` || name === '_gid' || name === '_gat' || name.startsWith('_ga_'));
}

/** Expire GA cookies on this host and each parent domain. */
export function clearGaCookies(id, doc = document, host = location.hostname) {
  const parts = host.split('.');
  const domains = [undefined, ...parts.map((_, i) => `.${parts.slice(i).join('.')}`).filter((d) => d.split('.').length > 2)];
  for (const name of gaCookieNames(id, doc.cookie)) {
    for (const domain of domains) {
      doc.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${domain ? `; domain=${domain}` : ''}`;
    }
  }
}

/** Inject gtag.js once. Safe to call repeatedly. */
export function enableAnalytics(id, win = window, doc = document) {
  if (!id) return false;
  win[`ga-disable-${id}`] = false;
  if (win.__bbGa) return true;
  win.__bbGa = true;
  win.dataLayer = win.dataLayer || [];
  win.gtag = function gtag() {
    win.dataLayer.push(arguments);
  };
  win.gtag('js', new Date());
  win.gtag('config', id, { anonymize_ip: true });
  const tag = doc.createElement('script');
  tag.async = true;
  tag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  doc.head.append(tag);
  return true;
}

export function disableAnalytics(id, win = window, doc = document) {
  if (id) win[`ga-disable-${id}`] = true;
  clearGaCookies(id, doc);
}
