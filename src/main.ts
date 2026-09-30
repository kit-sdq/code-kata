import { getKata, getKatas } from './kata/load.ts';
import { groupKatas, loadCategories, resolveLocalized } from './kata/categories.ts';
import type { Kata } from './kata/types.ts';
import { renderMarkdown } from './ui/markdown.ts';
import { renderTextView } from './ui/views/text.ts';
import { renderChoiceView } from './ui/views/choice.ts';
import { renderCodeView } from './ui/views/code.ts';
import { getProgress } from './ui/progress.ts';
import { initTheme } from './ui/theme.ts';
import { getLang, initLangToggle, onLangChange, t } from './ui/i18n.ts';

const app = document.getElementById('app') as HTMLElement;
const titleSlot = document.getElementById('site-title-slot') as HTMLElement;

const SITE_TITLE = 'Java Code Katas';

const LEFT_ARROW_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>';
const RIGHT_ARROW_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
const OVERVIEW_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="19" x2="12" y2="5"/><polyline points="5 12 12 5 19 12"/></svg>';
const LINK_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>';
const CHECK_ICON =
  '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

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
  difficulty.textContent = t(`difficulty.${kata.difficulty}`);
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
    badge.textContent = t('solvedBadge');
    card.appendChild(badge);
  }

  li.appendChild(card);
  return li;
}

/** Copies `url` to the clipboard (falling back to a hidden textarea when the async
 * Clipboard API is unavailable), then shows a brief checkmark + status-message confirmation
 * on `btn`. Silently does nothing on failure. */
function copyViaTextarea(url: string): void {
  const ta = document.createElement('textarea');
  ta.value = url;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
}

async function copyCategoryLink(url: string, btn: HTMLButtonElement, status: HTMLElement): Promise<void> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      copyViaTextarea(url);
    }
  } catch {
    try {
      copyViaTextarea(url);
    } catch {
      return;
    }
  }
  btn.innerHTML = CHECK_ICON;
  status.textContent = t('category.linkCopied');
  setTimeout(() => {
    btn.innerHTML = LINK_ICON;
  }, 1500);
}

function renderListView(): void {
  const groups = groupKatas(getKatas(), loadCategories());
  const wrapper = document.createElement('div');
  wrapper.className = 'kata-categories';

  const copyStatus = document.createElement('p');
  copyStatus.className = 'sr-only';
  copyStatus.setAttribute('role', 'status');
  copyStatus.setAttribute('aria-live', 'polite');
  wrapper.appendChild(copyStatus);

  for (const group of groups) {
    const slug = group.category === 'uncategorized' ? 'uncategorized' : group.category.id;
    const section = document.createElement('section');
    section.className = 'category';
    section.id = `category-${slug}`;

    const lang = getLang();
    const headingRow = document.createElement('div');
    headingRow.className = 'category-heading';

    const heading = document.createElement('h2');
    heading.textContent = group.category === 'uncategorized' ? t('uncategorized') : resolveLocalized(group.category.name, lang);
    headingRow.appendChild(heading);

    const copyLinkLabel = t('category.copyLink');
    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = 'icon-link category-copy-link';
    copyBtn.setAttribute('aria-label', copyLinkLabel);
    copyBtn.setAttribute('title', copyLinkLabel);
    copyBtn.innerHTML = LINK_ICON;
    copyBtn.addEventListener('click', () => {
      const url = `${location.origin}${location.pathname}#/category/${slug}`;
      void copyCategoryLink(url, copyBtn, copyStatus);
    });
    headingRow.appendChild(copyBtn);

    section.appendChild(headingRow);

    if (group.category !== 'uncategorized' && group.category.description) {
      const desc = document.createElement('p');
      desc.className = 'category-description';
      desc.textContent = resolveLocalized(group.category.description, lang);
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
    prevLink.setAttribute('aria-label', `${t('nav.previous')}: ${prev.title}`);
    prevLink.setAttribute('title', `${t('nav.previous')}: ${prev.title}`);
    prevLink.innerHTML = LEFT_ARROW_ICON;
    nav.appendChild(prevLink);
  } else {
    nav.appendChild(document.createElement('span'));
  }

  const overview = document.createElement('a');
  overview.href = '#/';
  overview.className = 'icon-link';
  overview.setAttribute('aria-label', t('nav.all'));
  overview.setAttribute('title', t('nav.all'));
  overview.innerHTML = OVERVIEW_ICON;
  nav.appendChild(overview);

  if (next) {
    const nextLink = document.createElement('a');
    nextLink.href = `#/kata/${next.slug}`;
    nextLink.className = 'icon-link';
    nextLink.setAttribute('aria-label', `${t('nav.next')}: ${next.title}`);
    nextLink.setAttribute('title', `${t('nav.next')}: ${next.title}`);
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

  if (kata.langFallback) {
    const note = document.createElement('p');
    note.className = 'lang-fallback-note';
    note.textContent = t(getLang() === 'de' ? 'kata.onlyEnglish' : 'kata.onlyGerman');
    app.appendChild(note);
  }

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
  p.textContent = t('notFound', { slug });
  app.appendChild(p);
}

function setFooterText(): void {
  const link = document.getElementById('footer-source-link');
  if (link) link.textContent = t('footer.source');
  const lectures = document.getElementById('lectures-link');
  lectures?.setAttribute('aria-label', t('header.lectures'));
  lectures?.setAttribute('title', t('header.lectures'));
}

function route(): void {
  const hash = location.hash;
  const kataMatch = hash.match(/^#\/kata\/(.+)$/);
  const categoryMatch = hash.match(/^#\/category\/(.+)$/);
  setHeaderTitle(!kataMatch);
  if (kataMatch) {
    const kata = getKata(decodeURIComponent(kataMatch[1]));
    if (kata) renderTaskView(kata);
    else renderNotFound(kataMatch[1]);
    return;
  }
  renderListView();
  if (categoryMatch) {
    const section = document.getElementById(`category-${decodeURIComponent(categoryMatch[1])}`);
    section?.scrollIntoView({ block: 'start', behavior: 'auto' });
  }
}

initTheme();
initLangToggle();
setFooterText();
onLangChange(() => {
  setFooterText();
  route();
});
window.addEventListener('hashchange', route);
route();
