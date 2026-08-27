type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStored(): Theme | null {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'light' || v === 'dark' ? v : null;
}

// Clicking switches away from the active theme, so the sun (→ light) shows while dark
// is active and the moon (→ dark) shows while light is active.
const SUN_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="1" y1="12" x2="4" y2="12"/><line x1="20" y1="12" x2="23" y2="12"/><line x1="4.5" y1="4.5" x2="6.6" y2="6.6"/><line x1="17.4" y1="17.4" x2="19.5" y2="19.5"/><line x1="4.5" y1="19.5" x2="6.6" y2="17.4"/><line x1="17.4" y1="6.6" x2="19.5" y2="4.5"/></svg>';
const MOON_ICON =
  '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>';

function apply(theme: Theme, toggle: HTMLButtonElement): void {
  document.documentElement.setAttribute('data-theme', theme);
  toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
  toggle.setAttribute('aria-label', label);
  toggle.setAttribute('title', label);
  const icon = toggle.querySelector('.theme-toggle-icon');
  if (icon) icon.innerHTML = theme === 'dark' ? SUN_ICON : MOON_ICON;
}

/** Wires the header theme toggle: click overrides + persists; OS changes apply live
 * only while no explicit override is stored (initial theme is already set by the
 * pre-paint inline script in index.html). */
export function initTheme(): void {
  const toggle = document.getElementById('theme-toggle') as HTMLButtonElement | null;
  if (!toggle) return;

  const current = (document.documentElement.getAttribute('data-theme') as Theme | null) ?? systemTheme();
  apply(current, toggle);

  toggle.addEventListener('click', () => {
    const next: Theme = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, next);
    apply(next, toggle);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (getStored()) return;
    apply(e.matches ? 'dark' : 'light', toggle);
  });
}
