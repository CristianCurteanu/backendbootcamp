// Learner progress kept in the browser. No network, no cookies.
// Default backend is sessionStorage (cleared when the tab closes); the
// `progressStorage: local` site param switches to localStorage.

const KEY = 'bb:progress:v1';

/** Normalise a URL or path to "/path/to/page/" so keys match across links. */
export function normalizeUrl(input) {
  if (typeof input !== 'string' || input === '') return '';
  let path = input;
  try {
    path = new URL(input, 'https://x.invalid').pathname;
  } catch {
    /* keep raw input */
  }
  path = path.replace(/index\.html$/, '');
  return path.endsWith('/') ? path : `${path}/`;
}

/** In-memory Storage stand-in, used when the browser blocks real storage. */
export function memoryBackend() {
  const data = new Map();
  return {
    getItem: (k) => (data.has(k) ? data.get(k) : null),
    setItem: (k, v) => void data.set(k, String(v)),
    removeItem: (k) => void data.delete(k),
  };
}

/** @param {'session'|'local'} kind @param {object} [win] */
export function pickBackend(kind = 'session', win = globalThis) {
  try {
    const storage = kind === 'local' ? win.localStorage : win.sessionStorage;
    const probe = '__bb_probe__';
    storage.setItem(probe, probe);
    storage.removeItem(probe);
    return storage;
  } catch {
    return memoryBackend();
  }
}

const emptyState = () => ({ v: 1, done: {}, checks: {}, quiz: {}, last: {}, lastAny: null });

/**
 * @param {Storage|ReturnType<typeof memoryBackend>} backend
 */
export function createStore(backend = memoryBackend()) {
  const listeners = new Set();

  const load = () => {
    try {
      const parsed = JSON.parse(backend.getItem(KEY) ?? 'null');
      return parsed?.v === 1 ? { ...emptyState(), ...parsed } : emptyState();
    } catch {
      return emptyState();
    }
  };

  let state = load();

  const commit = () => {
    try {
      backend.setItem(KEY, JSON.stringify(state));
    } catch {
      /* quota or blocked: keep working in memory */
    }
    for (const fn of listeners) fn(state);
  };

  return {
    snapshot: () => structuredClone(state),

    isDone: (url) => normalizeUrl(url) in state.done,
    setDone(url, value = true) {
      const key = normalizeUrl(url);
      if (!key) return;
      if (value) state.done[key] = Date.now();
      else delete state.done[key];
      commit();
    },
    toggleDone(url) {
      const next = !(normalizeUrl(url) in state.done);
      this.setDone(url, next);
      return next;
    },
    /** How many of `urls` are done. */
    countDone: (urls) => urls.reduce((n, u) => n + (normalizeUrl(u) in state.done ? 1 : 0), 0),
    /** Done lessons whose URL sits under `prefix`. */
    countDoneUnder(prefix) {
      const p = normalizeUrl(prefix);
      return Object.keys(state.done).filter((u) => u.startsWith(p) && u !== p).length;
    },

    getChecks: (url) => ({ ...(state.checks[normalizeUrl(url)] ?? {}) }),
    setCheck(url, id, value) {
      const key = normalizeUrl(url);
      const bucket = (state.checks[key] ??= {});
      if (value) bucket[id] = true;
      else delete bucket[id];
      commit();
    },

    getQuiz: (url) => ({ ...(state.quiz[normalizeUrl(url)] ?? {}) }),
    setQuiz(url, id, answer) {
      (state.quiz[normalizeUrl(url)] ??= {})[id] = answer;
      commit();
    },

    setLast(tutorial, entry) {
      const record = { url: normalizeUrl(entry.url), title: String(entry.title ?? ''), tutorial: normalizeUrl(tutorial), tutorialTitle: String(entry.tutorialTitle ?? ''), at: Date.now() };
      state.last[normalizeUrl(tutorial)] = record;
      state.lastAny = record;
      commit();
    },
    getLast: (tutorial) => state.last[normalizeUrl(tutorial)] ?? null,
    getLastAny: () => state.lastAny,

    /** Clear everything, or only entries under a tutorial prefix. */
    reset(prefix) {
      if (!prefix) {
        state = emptyState();
      } else {
        const p = normalizeUrl(prefix);
        for (const bucket of ['done', 'checks', 'quiz', 'last']) {
          for (const key of Object.keys(state[bucket])) if (key.startsWith(p)) delete state[bucket][key];
        }
        if (state.lastAny?.url?.startsWith(p)) state.lastAny = null;
      }
      commit();
    },

    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
