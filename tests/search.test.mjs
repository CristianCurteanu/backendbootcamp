import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prepare, search, tokenize, normalize, facetCounts, highlightSegments, snippet } from '../assets/js/lib/search.js';

const docs = [
  { t: 'Try-Except Blocks in Python', u: '/a/', d: 'Handle errors gracefully.', k: 'Lesson', g: 'Python Fundamentals', l: 'Beginner', h: ['Catching specific exceptions'], x: 'An exception disrupts the normal flow of a program.' },
  { t: 'Error Handling', u: '/b/', d: 'Exceptions, logging and failing well.', k: 'Module', g: 'Python Fundamentals', l: 'Beginner', h: [], x: 'Overview of try, except and finally.' },
  { t: 'Why your cache is lying to you', u: '/c/', d: 'Stale reads are a missing decision.', k: 'Blog post', g: 'Blog', l: '', h: ['Delete on write'], x: 'A TTL is a guess. Handle the race.', n: 5 },
  { t: 'Regex Tester', u: '/d/', d: 'Coming soon', k: 'Tool', g: 'Tools', l: '', h: [], x: '' },
];
const index = prepare(docs);

test('normalize folds case and diacritics', () => {
  assert.equal(normalize('Résumé'), 'resume');
  assert.deepEqual(tokenize('try/except, C++!'), ['try', 'except', 'c++']);
});

test('title matches outrank body matches', () => {
  const { results } = search(index, 'error');
  assert.equal(results[0].doc.u, '/b/');
});

test('every term must match (AND)', () => {
  assert.equal(search(index, 'cache lying').results.length, 1);
  assert.equal(search(index, 'cache regex').results.length, 0);
});

test('the last term matches as a prefix while typing', () => {
  assert.equal(search(index, 'exce').results.length >= 2, true);
  assert.equal(search(index, 'exce cach').results.length, 0);
});

test('empty and whitespace queries return nothing', () => {
  assert.deepEqual(search(index, '   ').results, []);
});

test('filters by kind, group and level', () => {
  assert.equal(search(index, 'handle', { kinds: new Set(['Blog post']) }).results.length, 1);
  assert.equal(search(index, 'exception', { groups: new Set(['Python Fundamentals']) }).results.length, 2);
  assert.equal(search(index, 'exception', { levels: new Set(['Advanced']) }).results.length, 0);
});

test('sorts by title and by date', () => {
  const byTitle = search(index, 'handle', { sort: 'title' }).results.map((r) => r.doc.t);
  assert.deepEqual(byTitle, [...byTitle].sort((a, b) => a.localeCompare(b)));
  assert.equal(search(index, 'handle', { sort: 'date' }).results[0].doc.u, '/c/');
});

test('facet counts ignore their own filter', () => {
  const counts = facetCounts(index, 'handle', 'k', { kinds: new Set(['Lesson']) });
  assert.deepEqual(Object.fromEntries(counts), { Lesson: 1, 'Blog post': 1 });
});

test('highlightSegments marks hits without touching the text', () => {
  const segs = highlightSegments('Handle errors without hiding them', ['error']);
  assert.equal(segs.map((s) => s.text).join(''), 'Handle errors without hiding them');
  assert.deepEqual(segs.filter((s) => s.hit).map((s) => s.text), ['error']);
});

test('snippet centres on the match', () => {
  const s = snippet({ d: '', x: `${'lorem '.repeat(40)}needle ${'ipsum '.repeat(40)}` }, ['needle']);
  assert.match(s, /needle/);
  assert.ok(s.length < 200);
});
