// Dependency-free ranked search over the Hugo-generated index.
// Doc keys: t title, u url, d description, k kind, g group, l level, h headings[], x body, n date.

/** Lowercase and strip diacritics so "résumé" matches "resume". */
export function normalize(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();
}

export function tokenize(query) {
  return normalize(query)
    .split(/[^\p{L}\p{N}_#+]+/u)
    .filter(Boolean);
}

/** Precompute normalised fields once per session. */
export function prepare(docs) {
  return docs.map((doc) => ({
    doc,
    title: normalize(doc.t),
    heads: normalize((doc.h ?? []).join(' \n ')),
    desc: normalize(doc.d),
    body: normalize(doc.x),
    kind: doc.k ?? '',
  }));
}

const KIND_BOOST = { Lesson: 1.15, Tutorial: 1.2, 'Blog post': 1.1, Module: 1.05 };

function countOccurrences(haystack, needle, cap = 5) {
  let count = 0;
  let from = 0;
  while (count < cap) {
    const i = haystack.indexOf(needle, from);
    if (i === -1) break;
    count += 1;
    from = i + needle.length;
  }
  return count;
}

function scoreTerm(entry, term, isLast) {
  let score = 0;
  const wordInTitle = new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegex(term)}([^\\p{L}\\p{N}]|$)`, 'u');
  if (wordInTitle.test(entry.title)) score += 12;
  else if (entry.title.includes(term)) score += 8;
  if (entry.heads.includes(term)) score += 5;
  if (entry.desc.includes(term)) score += 3;
  const inBody = countOccurrences(entry.body, term);
  score += inBody;
  // The last term is often still being typed: allow it to match a prefix of any word.
  if (score === 0 && isLast && term.length >= 2) {
    const prefix = new RegExp(`(^|[^\\p{L}\\p{N}])${escapeRegex(term)}`, 'u');
    if (prefix.test(entry.title)) score += 6;
    else if (prefix.test(entry.heads) || prefix.test(entry.desc)) score += 3;
    else if (prefix.test(entry.body)) score += 1;
  }
  return score;
}

export function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * @param {ReturnType<typeof prepare>} index
 * @param {string} query
 * @param {{kinds?: Set<string>|null, groups?: Set<string>|null, levels?: Set<string>|null, sort?: 'relevance'|'title'|'date', limit?: number}} [opts]
 */
export function search(index, query, opts = {}) {
  const terms = tokenize(query);
  if (terms.length === 0) return { terms, results: [] };
  const phrase = normalize(query).trim();
  const results = [];
  for (const entry of index) {
    if (opts.kinds?.size && !opts.kinds.has(entry.kind)) continue;
    if (opts.groups?.size && !opts.groups.has(entry.doc.g)) continue;
    if (opts.levels?.size && !opts.levels.has(entry.doc.l)) continue;
    let total = 0;
    let all = true;
    for (let i = 0; i < terms.length; i += 1) {
      const s = scoreTerm(entry, terms[i], i === terms.length - 1);
      if (s === 0) {
        all = false;
        break;
      }
      total += s;
    }
    if (!all) continue;
    if (terms.length > 1 && entry.title.includes(phrase)) total += 10;
    total *= KIND_BOOST[entry.kind] ?? 1;
    results.push({ doc: entry.doc, score: total });
  }
  const sorters = {
    relevance: (a, b) => b.score - a.score || a.doc.t.localeCompare(b.doc.t),
    title: (a, b) => a.doc.t.localeCompare(b.doc.t),
    date: (a, b) => (b.doc.n ?? 0) - (a.doc.n ?? 0) || b.score - a.score,
  };
  results.sort(sorters[opts.sort ?? 'relevance'] ?? sorters.relevance);
  return { terms, results: opts.limit ? results.slice(0, opts.limit) : results };
}

/** Count results per facet value, ignoring that facet's own filter. */
export function facetCounts(index, query, field, opts = {}) {
  const without = { ...opts, [{ k: 'kinds', g: 'groups', l: 'levels' }[field]]: null };
  const { results } = search(index, query, without);
  const counts = new Map();
  for (const { doc } of results) {
    const value = doc[field];
    if (value) counts.set(value, (counts.get(value) ?? 0) + 1);
  }
  return [...counts].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
}

/** Split text into [{text, hit}] runs so callers can highlight without innerHTML. */
export function highlightSegments(text, terms) {
  const source = String(text ?? '');
  if (!terms.length || !source) return [{ text: source, hit: false }];
  const folded = normalize(source);
  // NFD folding can change length; only highlight when positions line up.
  if (folded.length !== source.length) return [{ text: source, hit: false }];
  const ranges = [];
  for (const term of terms) {
    let from = 0;
    for (;;) {
      const i = folded.indexOf(term, from);
      if (i === -1) break;
      ranges.push([i, i + term.length]);
      from = i + term.length;
    }
  }
  ranges.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (const r of ranges) {
    const last = merged.at(-1);
    if (last && r[0] <= last[1]) last[1] = Math.max(last[1], r[1]);
    else merged.push([...r]);
  }
  const out = [];
  let cursor = 0;
  for (const [a, b] of merged) {
    if (a > cursor) out.push({ text: source.slice(cursor, a), hit: false });
    out.push({ text: source.slice(a, b), hit: true });
    cursor = b;
  }
  if (cursor < source.length) out.push({ text: source.slice(cursor), hit: false });
  return out;
}

/** A ~160 character excerpt centred on the first match in the description or body. */
export function snippet(doc, terms, length = 160) {
  const pool = [doc.d, doc.x].filter(Boolean);
  for (const text of pool) {
    const folded = normalize(text);
    if (folded.length !== text.length) continue;
    const hit = terms.map((t) => folded.indexOf(t)).filter((i) => i >= 0).sort((a, b) => a - b)[0];
    if (hit === undefined) continue;
    const start = Math.max(0, hit - 50);
    const end = Math.min(text.length, start + length);
    return `${start > 0 ? '…' : ''}${text.slice(start, end).trim()}${end < text.length ? '…' : ''}`;
  }
  return (doc.d || doc.x || '').slice(0, length);
}
