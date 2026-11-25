import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createConsentStorage, CONSENT_KEY, CONSENT_VERSION, clearGaCookies, enableAnalytics, gaCookieNames, readConsent, saveConsent } from '../assets/js/lib/consent.js';

const mem = () => {
  const m = new Map();
  return { getItem: (k) => (m.has(k) ? m.get(k) : null), setItem: (k, v) => void m.set(k, String(v)) };
};

test('no stored choice means no consent', () => {
  assert.equal(readConsent(mem()), null);
});

test('saves and reads a choice', () => {
  const s = mem();
  saveConsent(s, true, 123);
  assert.deepEqual(readConsent(s), { v: CONSENT_VERSION, analytics: true, at: 123 });
  saveConsent(s, false, 456);
  assert.equal(readConsent(s).analytics, false);
});

test('ignores corrupt or outdated records', () => {
  const s = mem();
  s.setItem(CONSENT_KEY, '{oops');
  assert.equal(readConsent(s), null);
  s.setItem(CONSENT_KEY, JSON.stringify({ v: 0, analytics: true }));
  assert.equal(readConsent(s), null);
});

test('finds only Google Analytics cookies', () => {
  assert.deepEqual(gaCookieNames('G-ABC123', '_ga=1; theme=x; _ga_ABC123=2; other=3'), ['_ga', '_ga_ABC123']);
});

test('clears GA cookies on host and parent domains', () => {
  const writes = [];
  const doc = { get cookie() { return '_ga=1; _ga_XYZ=2'; }, set cookie(v) { writes.push(v); } };
  clearGaCookies('G-XYZ', doc, 'www.backendbootcamp.online');
  assert.ok(writes.some((w) => w.startsWith('_ga=;') && w.includes('Max-Age=0')));
  assert.ok(writes.some((w) => w.includes('domain=.backendbootcamp.online')));
});

test('enableAnalytics injects gtag once and not without an id', () => {
  const appended = [];
  const doc = { createElement: () => ({}), head: { append: (n) => appended.push(n) } };
  const win = {};
  assert.equal(enableAnalytics('', win, doc), false);
  assert.equal(appended.length, 0);
  assert.equal(enableAnalytics('G-1', win, doc), true);
  enableAnalytics('G-1', win, doc);
  assert.equal(appended.length, 1);
  assert.match(appended[0].src, /googletagmanager\.com\/gtag\/js\?id=G-1/);
});

const fakeEnv = ({ blockLocal = false } = {}) => {
  const jar = new Map();
  const doc = {
    get cookie() { return [...jar].map(([k, v]) => `${k}=${v}`).join('; '); },
    set cookie(v) { const [pair] = v.split(';'); const i = pair.indexOf('='); jar.set(pair.slice(0, i), pair.slice(i + 1)); },
  };
  const ls = new Map();
  const win = { location: { protocol: 'https:' }, localStorage: blockLocal ? { getItem() { throw new Error('x'); }, setItem() { throw new Error('x'); } } : { getItem: (k) => (ls.has(k) ? ls.get(k) : null), setItem: (k, v) => void ls.set(k, v) } };
  return { win, doc, ls, jar };
};

test('consent survives a reload via localStorage', () => {
  const { win, doc } = fakeEnv();
  saveConsent(createConsentStorage(win, doc), true);
  assert.equal(readConsent(createConsentStorage(win, doc)).analytics, true);
});

test('consent falls back to the cookie when localStorage is blocked', () => {
  const { win, doc } = fakeEnv({ blockLocal: true });
  saveConsent(createConsentStorage(win, doc), false);
  assert.equal(readConsent(createConsentStorage(win, doc)).analytics, false);
});

test('cookie restores consent after localStorage is cleared', () => {
  const { win, doc, ls } = fakeEnv();
  saveConsent(createConsentStorage(win, doc), true);
  ls.clear();
  assert.equal(readConsent(createConsentStorage(win, doc)).analytics, true);
});
