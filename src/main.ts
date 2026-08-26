import { getKata, getKatas } from './kata/load.ts';
import type { Kata } from './kata/types.ts';
import { renderMarkdown } from './ui/markdown.ts';
import { renderTextView } from './ui/views/text.ts';
import { renderChoiceView } from './ui/views/choice.ts';
import { renderCodeView } from './ui/views/code.ts';
import { getProgress } from './ui/progress.ts';

const app = document.getElementById('app') as HTMLElement;

function renderListView(): void {
  const katas = getKatas();
  const grid = document.createElement('div');
  grid.className = 'kata-grid';

  for (const kata of katas) {
    const solved = getProgress(kata.id).solved;
    const card = document.createElement('a');
    card.className = 'kata-card';
    card.href = `#/kata/${kata.id}`;

    const title = document.createElement('h2');
    title.textContent = kata.title;
    if (solved) {
      const badge = document.createElement('span');
      badge.className = 'solved-badge';
      badge.textContent = '✓ Solved';
      title.appendChild(badge);
    }

    const meta = document.createElement('div');
    meta.className = 'kata-meta';

    const difficulty = document.createElement('span');
    difficulty.className = `difficulty difficulty-${kata.difficulty}`;
    difficulty.textContent = kata.difficulty;
    meta.appendChild(difficulty);

    for (const tag of kata.tags) {
      const tagEl = document.createElement('span');
      tagEl.className = 'tag';
      tagEl.textContent = tag;
      meta.appendChild(tagEl);
    }

    card.appendChild(title);
    card.appendChild(meta);
    grid.appendChild(card);
  }

  app.innerHTML = '';
  app.appendChild(grid);
}

function renderTaskView(kata: Kata): void {
  app.innerHTML = '';

  const back = document.createElement('a');
  back.href = '#/';
  back.className = 'back-link';
  back.textContent = '← All katas';
  app.appendChild(back);

  const header = document.createElement('h2');
  header.textContent = kata.title;
  app.appendChild(header);

  const body = document.createElement('div');
  body.className = 'kata-body';
  body.innerHTML = renderMarkdown(kata.body);
  app.appendChild(body);

  const answerSection = document.createElement('section');
  answerSection.className = 'kata-answer';
  app.appendChild(answerSection);

  if (kata.type === 'text') renderTextView(answerSection, kata);
  else if (kata.type === 'choice') renderChoiceView(answerSection, kata);
  else renderCodeView(answerSection, kata);
}

function renderNotFound(id: string): void {
  app.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = `Kata "${id}" not found.`;
  app.appendChild(p);
}

function route(): void {
  const hash = location.hash;
  const kataMatch = hash.match(/^#\/kata\/(.+)$/);
  if (kataMatch) {
    const kata = getKata(decodeURIComponent(kataMatch[1]));
    if (kata) renderTaskView(kata);
    else renderNotFound(kataMatch[1]);
    return;
  }
  renderListView();
}

window.addEventListener('hashchange', route);
route();
