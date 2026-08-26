type Theme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function getStored(): Theme | null {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === 'light' || v === 'dark' ? v : null;
}

function apply(theme: Theme, toggle: HTMLButtonElement): void {
  document.documentElement.setAttribute('data-theme', theme);
  toggle.setAttribute('aria-pressed', String(theme === 'dark'));
  const icon = toggle.querySelector('.theme-toggle-icon');
  if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
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
