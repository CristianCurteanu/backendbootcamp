import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createStore, memoryBackend, normalizeUrl, pickBackend } from '../assets/js/lib/store.js';

test('normalizeUrl makes keys comparable', () => {
  assert.equal(normalizeUrl('/python/a'), '/python/a/');
  assert.equal(normalizeUrl('https://backendbootcamp.online/python/a/#x'), '/python/a/');
  assert.equal(normalizeUrl('/python/a/index.html'), '/python/a/');
  assert.equal(normalizeUrl(''), '');
});

test('marks lessons done and counts them', () => {
  const s = createStore(memoryBackend());
  s.setDone('/python/f/01/a/');
  s.setDone('/python/f/01/b');
  assert.equal(s.isDone('/python/f/01/a'), true);
  assert.equal(s.countDone(['/python/f/01/a/', '/python/f/01/b/', '/python/f/01/c/']), 2);
  assert.equal(s.countDoneUnder('/python/f/'), 2);
  assert.equal(s.toggleDone('/python/f/01/a/'), false);
  assert.equal(s.countDoneUnder('/python/f/'), 1);
});

test('persists across store instances sharing a backend', () => {
  const backend = memoryBackend();
  createStore(backend).setDone('/x/y/');
  assert.equal(createStore(backend).isDone('/x/y/'), true);
});

test('recovers from corrupt storage', () => {
  const backend = memoryBackend();
  backend.setItem('bb:progress:v1', '{not json');
  const s = createStore(backend);
  assert.equal(s.countDone(['/a/']), 0);
  s.setDone('/a/');
  assert.equal(s.isDone('/a/'), true);
});

test('stores checks and quiz answers per lesson', () => {
  const s = createStore(memoryBackend());
  s.setCheck('/l/1/', 'ship-0', true);
  s.setCheck('/l/1/', 'ship-1', true);
  s.setCheck('/l/1/', 'ship-0', false);
  assert.deepEqual(s.getChecks('/l/1'), { 'ship-1': true });
  s.setQuiz('/l/1/', 'q1', '3');
  assert.deepEqual(s.getQuiz('/l/1/'), { q1: '3' });
});

test('remembers the last lesson per tutorial and overall', () => {
  const s = createStore(memoryBackend());
  s.setLast('/python/f/', { url: '/python/f/08/02/', title: 'Try', tutorialTitle: 'F' });
  assert.equal(s.getLast('/python/f').url, '/python/f/08/02/');
  assert.equal(s.getLastAny().title, 'Try');
});

test('reset by prefix leaves other tutorials alone', () => {
  const s = createStore(memoryBackend());
  s.setDone('/python/f/01/a/');
  s.setDone('/python/s/01/a/');
  s.reset('/python/f/');
  assert.equal(s.isDone('/python/f/01/a/'), false);
  assert.equal(s.isDone('/python/s/01/a/'), true);
  s.reset();
  assert.equal(s.isDone('/python/s/01/a/'), false);
});

test('notifies subscribers and supports unsubscribe', () => {
  const s = createStore(memoryBackend());
  let calls = 0;
  const off = s.subscribe(() => (calls += 1));
  s.setDone('/a/');
  off();
  s.setDone('/b/');
  assert.equal(calls, 1);
});

test('falls back to memory when storage throws', () => {
  const win = { sessionStorage: { setItem() { throw new Error('blocked'); } } };
  const backend = pickBackend('session', win);
  const s = createStore(backend);
  s.setDone('/a/');
  assert.equal(s.isDone('/a/'), true);
});
