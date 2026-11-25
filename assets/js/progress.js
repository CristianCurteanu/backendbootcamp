// Hydrates progress UI from the session store. All markup is server-rendered
// and works without JS; this layer only adds state.
import { normalizeUrl } from './lib/store.js';

const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

export function initProgress(store) {
  const lessonPage = document.querySelector('[data-lesson-page]');
  if (lessonPage) trackLesson(store, lessonPage);

  render(store);
  store.subscribe(() => render(store));

  document.addEventListener('click', (event) => {
    const mark = event.target.closest('[data-mark-complete]');
    if (mark && lessonPage) {
      store.toggleDone(lessonPage.dataset.lesson);
      return;
    }
    const reset = event.target.closest('[data-progress-reset]');
    if (reset) {
      const card = reset.closest('[data-progress-card]');
      if (card && window.confirm('Reset your progress for this tutorial?')) store.reset(card.dataset.tutorial);
    }
  });
}

function trackLesson(store, page) {
  const { lesson, lessonTitle, tutorial, tutorialTitle } = page.dataset;
  store.setLast(tutorial, { url: lesson, title: lessonTitle, tutorialTitle });
  restoreInteractive(store, lesson);
}

/** Checkbox task lists, checklists and quizzes inside a lesson. */
function restoreInteractive(store, lessonUrl) {
  const checks = store.getChecks(lessonUrl);
  const boxes = $$('[data-lesson-body] input[type="checkbox"], [data-check]');
  boxes.forEach((box, i) => {
    const id = box.dataset.check ?? `task-${i}`;
    box.disabled = false;
    box.checked = Boolean(checks[id]);
    box.addEventListener('change', () => store.setCheck(lessonUrl, id, box.checked));
  });

  const answers = store.getQuiz(lessonUrl);
  for (const quiz of $$('[data-quiz]')) {
    const id = quiz.dataset.quiz;
    const show = (value) => {
      const result = quiz.querySelector('[data-quiz-result]');
      const correct = String(value) === quiz.dataset.answer;
      result.hidden = false;
      result.classList.remove('hidden');
      result.className = `mt-2 rounded-lg px-3 py-2.5 text-[15px] ${correct ? 'bg-ok-bg text-ok' : 'bg-bad-bg text-bad'}`;
      const explain = result.dataset.explain ? ` ${result.dataset.explain}` : '';
      result.textContent = correct ? `Correct.${explain}` : `Not quite. Try another option.${correct ? '' : ''}`;
    };
    if (answers[id]) {
      const radio = quiz.querySelector(`input[value="${CSS.escape(String(answers[id]))}"]`);
      if (radio) radio.checked = true;
      show(answers[id]);
    }
    quiz.addEventListener('change', (event) => {
      if (event.target.matches('input[type="radio"]')) {
        store.setQuiz(lessonUrl, id, event.target.value);
        show(event.target.value);
      }
    });
  }
}

function render(store) {
  const state = store.snapshot();
  const isDone = (url) => normalizeUrl(url) in state.done;

  // Lesson links: tree, outline, card lists.
  for (const link of $$('a[data-lesson]')) {
    const done = isDone(link.dataset.lesson);
    link.dataset.done = String(done);
    link.querySelector('[data-lesson-check]')?.classList.toggle('hidden', !done);
    link.querySelector('[data-lesson-arrow]')?.classList.toggle('hidden', done);
    const status = link.querySelector('[data-lesson-status]');
    if (status) {
      status.dataset.default ??= status.textContent;
      status.textContent = done ? 'Done' : status.dataset.default;
      status.classList.toggle('font-semibold', done);
    }
  }

  // Module counters and badges.
  for (const mod of $$('[data-module]')) {
    const links = $$('a[data-lesson]', mod).filter((a) => !a.hasAttribute('data-cards-link'));
    const total = Number(mod.dataset.moduleTotal) || links.length;
    const done = links.filter((a) => isDone(a.dataset.lesson)).length;
    mod.querySelectorAll('[data-module-count]').forEach((n) => (n.textContent = String(done)));
    const badge = mod.querySelector('[data-module-badge]');
    if (badge) {
      const complete = total > 0 && done >= total;
      badge.dataset.state = complete ? 'done' : done > 0 ? 'current' : 'todo';
      badge.querySelector('[data-badge-n]')?.classList.toggle('hidden', complete);
      badge.querySelector('[data-badge-check]')?.classList.toggle('hidden', !complete);
    }
  }

  // Per-tutorial progress meters (outline card, tree).
  for (const bar of $$('[data-progress-bar]')) {
    const tutorial = bar.dataset.tutorial ?? bar.closest('[data-tutorial]')?.dataset.tutorial;
    if (!tutorial) continue;
    const scope = bar.closest('[data-progress-card]') ?? document;
    const lessonLinks = $$(`a[data-lesson][href^="${CSS.escape(tutorial)}"]`, document);
    const total = Number(bar.closest('[data-progress-card]')?.dataset.totalLessons) || new Set(lessonLinks.map((a) => a.dataset.lesson)).size;
    const done = store.countDoneUnder(tutorial);
    const pct = total ? Math.min(100, Math.round((done / total) * 100)) : 0;
    bar.setAttribute('aria-valuemax', String(total));
    bar.setAttribute('aria-valuenow', String(done));
    bar.setAttribute('aria-valuetext', `${done} of ${total} lessons complete`);
    const fill = bar.firstElementChild;
    if (fill) fill.style.width = `${pct}%`;
    void scope;
  }

  // Outline sidebar card.
  const card = document.querySelector('[data-progress-card]');
  if (card) {
    const tutorial = card.dataset.tutorial;
    const mods = $$('[data-outline] [data-module]');
    const completeMods = mods.filter((m) => m.querySelector('[data-module-badge]')?.dataset.state === 'done').length;
    card.querySelector('[data-progress-done]').textContent = String(completeMods);
    const any = store.countDoneUnder(tutorial) > 0;
    card.querySelector('[data-progress-reset]')?.toggleAttribute('hidden', !any);
    const note = card.querySelector('[data-progress-note]');
    if (note) note.textContent = any ? 'Saved in this browser session.' : 'Progress is saved in this browser session.';
  }

  // Resume buttons.
  for (const cta of $$('[data-resume-cta]')) {
    const last = store.getLast(cta.dataset.tutorial);
    if (last) {
      cta.setAttribute('href', last.url);
      cta.textContent = `Continue with ${last.title}`;
    } else {
      cta.setAttribute('href', cta.dataset.start);
    }
  }

  // Home: resume banner.
  const resume = document.querySelector('[data-resume]');
  if (resume) {
    const last = store.getLastAny();
    resume.hidden = !last;
    resume.classList.toggle('hidden', !last);
    if (last) {
      resume.querySelector('[data-resume-link]').setAttribute('href', last.url);
      resume.querySelector('[data-resume-title]').textContent = `${last.tutorialTitle ? `${last.tutorialTitle}: ` : ''}${last.title}`;
    }
  }

  // Tutorial cards: "3 of 42 done".
  for (const cardEl of $$('[data-tutorial-card]')) {
    const label = cardEl.querySelector('[data-progress-label]');
    if (!label) continue;
    const done = store.countDoneUnder(cardEl.dataset.tutorial);
    label.hidden = done === 0;
    label.textContent = done ? `${done} of ${cardEl.dataset.total} lessons done` : '';
  }

  // Lesson completion buttons.
  const lessonPage = document.querySelector('[data-lesson-page]');
  if (lessonPage) {
    const done = isDone(lessonPage.dataset.lesson);
    for (const holder of $$('[data-completion], [data-completion-side]')) holder.dataset.done = String(done);
    for (const btn of $$('[data-mark-complete]')) btn.setAttribute('aria-pressed', String(done));
  }

  // Module overview summary.
  const summary = document.querySelector('[data-module-summary]');
  if (summary) {
    const urls = $$('[data-cards] a[data-lesson]').map((a) => a.dataset.lesson);
    summary.querySelector('[data-module-done]').textContent = String(store.countDone(urls));
  }
}
