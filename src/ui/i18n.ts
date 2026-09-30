import type { Lang } from '../kata/types.ts';

const STORAGE_KEY = 'lang';

type Dict = Record<string, string>;

const de: Dict = {
  'nav.previous': 'Vorherige Aufgabe',
  'nav.next': 'Nächste Aufgabe',
  'nav.all': 'Alle Aufgaben',
  'lang.choose': 'Sprache wählen',
  notFound: 'Aufgabe "{slug}" nicht gefunden.',
  uncategorized: 'Unkategorisiert',
  'difficulty.easy': 'leicht',
  'difficulty.medium': 'mittel',
  'difficulty.hard': 'schwer',
  solvedBadge: '✓ Gelöst',
  'kata.onlyEnglish': 'Diese Aufgabe ist bisher nur auf Englisch verfügbar.',
  'kata.onlyGerman': 'Diese Aufgabe ist bisher nur auf Deutsch verfügbar.',
  yourAnswer: 'Ihre Antwort',
  submit: 'Absenden',
  selectOne: 'Wählen Sie eine Option',
  selectAll: 'Wählen Sie alle zutreffenden Antworten aus',
  'hint.reveal': 'Hinweis anzeigen',
  'hint.item': 'Hinweis {n}',
  'hint.announced': 'Hinweis {n} angezeigt',
  'feedback.correct': '✓ Richtig!',
  'feedback.incorrect': '✗ Falsch, versuchen Sie es erneut.',
  'feedback.solved': '✓ Gelöst',
  'theme.toLight': 'Zu hellem Modus wechseln',
  'theme.toDark': 'Zu dunklem Modus wechseln',
  'code.run': 'Ausführen',
  'code.stop': 'Stopp',
  'code.phase.loading': 'Java-Laufzeitumgebung wird geladen…',
  'code.phase.compiling': 'Wird kompiliert…',
  'code.phase.running': 'Wird ausgeführt…',
  'code.lockedError': 'Gesperrter Code wurde verändert — zurücksetzen oder korrigieren.',
  'code.reset': 'Zurücksetzen',
  'code.violationsIntro': 'Nicht erlaubter Code ({n}):',
  'code.allPassed': '✓ Alle Prüfungen bestanden!',
  'code.somePassed': '✗ Einige Prüfungen sind fehlgeschlagen.',
  'code.outputMatches': 'Ausgabe stimmt überein',
  'code.outputMatches.inline': 'Ausgabe stimmt überein',
  'code.outputDiffers': 'Ausgabe stimmt nicht überein',
  'code.outputDiffers.inline': 'Ausgabe stimmt nicht überein',
  'code.case': 'Fall {n}',
  'code.input': 'Eingabe',
  'code.expected': 'Erwartet',
  'code.actual': 'Tatsächlich',
  'code.args': 'Argumente',
  'code.failure.compile-error': 'Kompilierung fehlgeschlagen:',
  'code.failure.runtime-error': 'Laufzeitfehler:',
  'code.failure.timeout': 'Zeitüberschreitung — auf Endlosschleifen oder lang laufenden Code prüfen.',
  'code.failure.stopped': 'Gestoppt.',
  'code.failure.error': 'Beim Ausführen Ihres Codes ist ein Fehler aufgetreten:',
  'editor.escapeHint': 'Code-Editor. Escape und dann Tab drücken, um ihn zu verlassen.',
  'footer.source': 'Quelle',
  'header.lectures': 'Vorlesungen (Lesefassungen)',
  'category.copyLink': 'Link zu diesem Kapitel kopieren',
  'category.linkCopied': 'Link kopiert',
};

const en: Dict = {
  'nav.previous': 'Previous kata',
  'nav.next': 'Next kata',
  'nav.all': 'All katas',
  'lang.choose': 'Choose language',
  notFound: 'Kata "{slug}" not found.',
  uncategorized: 'Uncategorized',
  'difficulty.easy': 'easy',
  'difficulty.medium': 'medium',
  'difficulty.hard': 'hard',
  solvedBadge: '✓ Solved',
  'kata.onlyEnglish': 'This task is only available in English so far.',
  'kata.onlyGerman': 'This task is only available in German so far.',
  yourAnswer: 'Your answer',
  submit: 'Submit',
  selectOne: 'Select one',
  selectAll: 'Select all that apply',
  'hint.reveal': 'Reveal hint',
  'hint.item': 'Hint {n}',
  'hint.announced': 'Hint {n} revealed',
  'feedback.correct': '✓ Correct!',
  'feedback.incorrect': '✗ Incorrect, try again.',
  'feedback.solved': '✓ Solved',
  'theme.toLight': 'Switch to light mode',
  'theme.toDark': 'Switch to dark mode',
  'code.run': 'Run',
  'code.stop': 'Stop',
  'code.phase.loading': 'Loading Java runtime…',
  'code.phase.compiling': 'Compiling…',
  'code.phase.running': 'Running…',
  'code.lockedError': 'Locked code was modified — reset or fix.',
  'code.reset': 'Reset',
  'code.violationsIntro': 'Disallowed code ({n}):',
  'code.allPassed': '✓ All checks passed!',
  'code.somePassed': '✗ Some checks failed.',
  'code.outputMatches': 'Output matches',
  'code.outputMatches.inline': 'output matches',
  'code.outputDiffers': 'Output does not match',
  'code.outputDiffers.inline': 'output does not match',
  'code.case': 'Case {n}',
  'code.input': 'Input',
  'code.expected': 'Expected',
  'code.actual': 'Actual',
  'code.args': 'Args',
  'code.failure.compile-error': 'Compilation failed:',
  'code.failure.runtime-error': 'Runtime error:',
  'code.failure.timeout': 'Timed out — check for infinite loops or long-running code.',
  'code.failure.stopped': 'Stopped.',
  'code.failure.error': 'Something went wrong running your code:',
  'editor.escapeHint': 'Code editor. Press Escape then Tab to leave it.',
  'footer.source': 'Source',
  'header.lectures': 'Lectures (reading versions, German)',
  'category.copyLink': 'Copy link to this category',
  'category.linkCopied': 'Link copied',
};

const dicts: Record<Lang, Dict> = { de, en };

// Guarded against a non-browser environment (e.g. Vitest's default node
// environment) so modules that transitively import this one stay testable
// without a DOM.
function detectDefault(): Lang {
  const language = typeof navigator !== 'undefined' ? navigator.language : '';
  return language.toLowerCase().startsWith('de') ? 'de' : 'en';
}

function getStored(): Lang | null {
  if (typeof localStorage === 'undefined') return null;
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'de' || v === 'en' ? v : null;
}

let currentLang: Lang = getStored() ?? detectDefault();
if (typeof document !== 'undefined') document.documentElement.lang = currentLang;

const listeners = new Set<() => void>();

export function getLang(): Lang {
  return currentLang;
}

export function setLang(lang: Lang): void {
  if (lang === currentLang) return;
  currentLang = lang;
  if (typeof localStorage !== 'undefined') localStorage.setItem(STORAGE_KEY, lang);
  if (typeof document !== 'undefined') document.documentElement.lang = lang;
  listeners.forEach((fn) => fn());
}

/** Registers a callback to run after the language changes (e.g. re-rendering the current route). */
export function onLangChange(fn: () => void): void {
  listeners.add(fn);
}

/** Looks up `key` in the current language dict (falling back to English), substituting any
 * `{name}` placeholders from `vars`. Falls back to the key itself if missing entirely. */
export function t(key: string, vars?: Record<string, string | number>): string {
  let text = dicts[currentLang][key] ?? dicts.en[key] ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}

const GLOBE_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><line x1="3" y1="12" x2="21" y2="12"/></svg>';
const CHECK_ICON =
  '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';

// Native, untranslated names: each language names itself.
const LANG_NAMES: Record<Lang, string> = { de: 'Deutsch', en: 'English' };
const LANG_ORDER: Lang[] = ['de', 'en'];

/** Wires the header language menu: a globe button opens a small menu of native language
 * names; picking one calls setLang. Full menu keyboard support (Arrow keys, Enter/Space,
 * Escape, click-outside). Same overall wiring pattern as initTheme in theme.ts. */
export function initLangToggle(): void {
  const btn = document.getElementById('lang-toggle') as HTMLButtonElement | null;
  const menu = document.getElementById('lang-menu') as HTMLUListElement | null;
  if (!btn || !menu) return;

  btn.innerHTML = GLOBE_ICON;

  const items = LANG_ORDER.map((lang) => {
    const li = document.createElement('li');
    li.setAttribute('role', 'none');
    const item = document.createElement('button');
    item.type = 'button';
    item.className = 'lang-menu-item';
    item.setAttribute('role', 'menuitemradio');
    item.setAttribute('tabindex', '-1');
    const check = document.createElement('span');
    check.className = 'lang-menu-check';
    check.setAttribute('aria-hidden', 'true');
    const label = document.createElement('span');
    label.textContent = LANG_NAMES[lang];
    item.append(check, label);
    item.addEventListener('click', () => {
      setLang(lang);
      close({ focusButton: true });
    });
    li.appendChild(item);
    menu.appendChild(li);
    return { lang, item, check };
  });

  function applySelection(): void {
    for (const { lang, item, check } of items) {
      const selected = lang === currentLang;
      item.setAttribute('aria-checked', String(selected));
      check.innerHTML = selected ? CHECK_ICON : '';
    }
  }

  function applyLabel(): void {
    if (!btn) return;
    const label = t('lang.choose');
    btn.setAttribute('aria-label', label);
    btn.setAttribute('title', label);
  }

  function isOpen(): boolean {
    return !menu!.hidden;
  }

  function focusItem(index: number): void {
    const i = (index + items.length) % items.length;
    items.forEach(({ item }, idx) => item.setAttribute('tabindex', idx === i ? '0' : '-1'));
    items[i].item.focus();
  }

  function open(): void {
    menu!.hidden = false;
    btn!.setAttribute('aria-expanded', 'true');
    const selectedIndex = items.findIndex(({ lang }) => lang === currentLang);
    focusItem(selectedIndex === -1 ? 0 : selectedIndex);
    document.addEventListener('click', onDocumentClick);
  }

  function close(opts?: { focusButton?: boolean }): void {
    menu!.hidden = true;
    btn!.setAttribute('aria-expanded', 'false');
    document.removeEventListener('click', onDocumentClick);
    if (opts?.focusButton) btn!.focus();
  }

  function onDocumentClick(e: MouseEvent): void {
    if (!(e.target instanceof Node)) return;
    if (btn!.contains(e.target) || menu!.contains(e.target)) return;
    close();
  }

  btn.addEventListener('click', () => (isOpen() ? close() : open()));

  btn.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      open();
    }
  });

  menu.addEventListener('keydown', (e) => {
    const focusedIndex = items.findIndex(({ item }) => item === document.activeElement);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      focusItem(focusedIndex + 1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      focusItem(focusedIndex - 1);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close({ focusButton: true });
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (focusedIndex !== -1) items[focusedIndex].item.click();
    } else if (e.key === 'Tab') {
      close();
    }
  });

  applySelection();
  applyLabel();
  close();
  onLangChange(() => {
    applySelection();
    applyLabel();
  });
}
