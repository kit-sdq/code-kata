import { getKata, getKatas } from './kata/load.ts';
import { groupKatas, loadCategories } from './kata/categories.ts';
import type { Kata } from './kata/types.ts';
import { renderMarkdown } from './ui/markdown.ts';
import { renderTextView } from './ui/views/text.ts';
import { renderChoiceView } from './ui/views/choice.ts';
import { renderCodeView } from './ui/views/code.ts';
import { getProgress } from './ui/progress.ts';
import { initTheme } from './ui/theme.ts';

const app = document.getElementById('app') as HTMLElement;
const titleSlot = document.getElementById('site-title-slot') as HTMLElement;

const SITE_TITLE = 'Java Code Katas';

const LEFT_ARROW_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
const RIGHT_ARROW_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const OVERVIEW_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/></svg>';

/** Flat kata order matching the front page (categories in designer order, katas by
 * compareIds within each, uncategorized last). Used to find the "next kata" link. */
function getOrderedKatas(): Kata[] {
  return groupKatas(getKatas(), loadCategories()).flatMap((group) => group.katas);
}

/** Front page: header title is the page's h1. Kata page: h1 lives on the kata title in
 * <main>, so the header title becomes a plain (non-heading) link — one h1 per page. */
function setHeaderTitle(isHome: boolean): void {
  titleSlot.innerHTML = isHome
    ? `<h1 class="site-title"><a href="#/">${SITE_TITLE}</a></h1>`
    : `<a href="#/" class="site-title">${SITE_TITLE}</a>`;
}

function renderKataRow(kata: Kata): HTMLElement {
  const solved = getProgress(kata.slug).solved;
  const li = document.createElement('li');
  li.className = 'kata-row';

  const card = document.createElement('a');
  card.className = 'kata-card';
  card.href = `#/kata/${kata.slug}`;

  const idBadge = document.createElement('span');
  idBadge.className = 'kata-id';
  idBadge.textContent = kata.id;
  card.appendChild(idBadge);

  const title = document.createElement('span');
  title.className = 'kata-title';
  title.textContent = kata.title;
  card.appendChild(title);

  const meta = document.createElement('span');
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
  card.appendChild(meta);

  if (solved) {
    const badge = document.createElement('span');
    badge.className = 'solved-badge';
    badge.textContent = '✓ Solved';
    card.appendChild(badge);
  }

  li.appendChild(card);
  return li;
}

function renderListView(): void {
  const groups = groupKatas(getKatas(), loadCategories());
  const wrapper = document.createElement('div');
  wrapper.className = 'kata-categories';

  for (const group of groups) {
    const section = document.createElement('section');
    section.className = 'category';

    const heading = document.createElement('h2');
    heading.textContent = group.category === 'uncategorized' ? 'Uncategorized' : group.category.name;
    section.appendChild(heading);

    if (group.category !== 'uncategorized' && group.category.description) {
      const desc = document.createElement('p');
      desc.className = 'category-description';
      desc.textContent = group.category.description;
      section.appendChild(desc);
    }

    const list = document.createElement('ul');
    list.className = 'kata-list';
    for (const kata of group.katas) {
      list.appendChild(renderKataRow(kata));
    }
    section.appendChild(list);

    wrapper.appendChild(section);
  }

  app.innerHTML = '';
  app.appendChild(wrapper);
}

function renderTaskView(kata: Kata): void {
  app.innerHTML = '';

  const nav = document.createElement('div');
  nav.className = 'kata-nav';

  const ordered = getOrderedKatas();
  const index = ordered.findIndex((k) => k.slug === kata.slug);
  const prev = ordered[index - 1];
  const next = ordered[index + 1];

  if (prev) {
    const prevLink = document.createElement('a');
    prevLink.href = `#/kata/${prev.slug}`;
    prevLink.className = 'icon-link';
    prevLink.setAttribute('aria-label', `Previous kata: ${prev.title}`);
    prevLink.setAttribute('title', `Previous kata: ${prev.title}`);
    prevLink.innerHTML = LEFT_ARROW_ICON;
    nav.appendChild(prevLink);
  } else {
    nav.appendChild(document.createElement('span'));
  }

  const overview = document.createElement('a');
  overview.href = '#/';
  overview.className = 'icon-link';
  overview.setAttribute('aria-label', 'All katas');
  overview.setAttribute('title', 'All katas');
  overview.innerHTML = OVERVIEW_ICON;
  nav.appendChild(overview);

  if (next) {
    const nextLink = document.createElement('a');
    nextLink.href = `#/kata/${next.slug}`;
    nextLink.className = 'icon-link';
    nextLink.setAttribute('aria-label', `Next kata: ${next.title}`);
    nextLink.setAttribute('title', `Next kata: ${next.title}`);
    nextLink.innerHTML = RIGHT_ARROW_ICON;
    nav.appendChild(nextLink);
  } else {
    nav.appendChild(document.createElement('span'));
  }

  app.appendChild(nav);

  const header = document.createElement('h1');
  header.className = 'kata-title-heading';
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

function renderNotFound(slug: string): void {
  app.innerHTML = '';
  const p = document.createElement('p');
  p.textContent = `Kata "${slug}" not found.`;
  app.appendChild(p);
}

function route(): void {
  const hash = location.hash;
  const kataMatch = hash.match(/^#\/kata\/(.+)$/);
  setHeaderTitle(!kataMatch);
  if (kataMatch) {
    const kata = getKata(decodeURIComponent(kataMatch[1]));
    if (kata) renderTaskView(kata);
    else renderNotFound(kataMatch[1]);
    return;
  }
  renderListView();
}

initTheme();
window.addEventListener('hashchange', route);
route();
