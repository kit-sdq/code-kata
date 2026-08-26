import { describe, it, expect } from 'vitest';

/** WCAG 2.x relative luminance + contrast ratio, computed from the literal hex values in
 * src/styles.css. Kept in sync manually — if a token changes, update it here too. */
function srgbToLinear(c: number): number {
  const v = c / 255;
  return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function luminance(hex: string): number {
  const n = hex.replace('#', '');
  const r = parseInt(n.slice(0, 2), 16);
  const g = parseInt(n.slice(2, 4), 16);
  const b = parseInt(n.slice(4, 6), 16);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function contrastRatio(a: string, b: string): number {
  const l1 = luminance(a);
  const l2 = luminance(b);
  const [hi, lo] = l1 > l2 ? [l1, l2] : [l2, l1];
  return (hi + 0.05) / (lo + 0.05);
}

interface Theme {
  bg: string;
  surface: string;
  text: string;
  textMuted: string;
  accent: string;
  accentHover: string;
  accentContrast: string;
  accentSoft: string;
  border: string;
  success: string;
  successBg: string;
  error: string;
  errorBg: string;
  focus: string;
  syntax: Record<string, string>;
}

const light: Theme = {
  bg: '#ffffff',
  surface: '#f6f8fa',
  text: '#1f2328',
  textMuted: '#59636e',
  accent: '#4f46e5',
  accentHover: '#4338ca',
  accentContrast: '#ffffff',
  accentSoft: '#dfdff7',
  border: '#767676',
  success: '#1a7f37',
  successBg: '#eef4f3',
  error: '#d1242f',
  errorBg: '#f5f0f2',
  focus: '#4f46e5',
  syntax: {
    keyword: '#a626a4',
    string: '#40803f',
    number: '#986801',
    comment: '#6b7280',
    type: '#0e7490',
    function: '#2867f0',
    variable: '#d72f20',
    punctuation: '#383a42',
  },
};

const dark: Theme = {
  bg: '#0d1117',
  surface: '#161b22',
  text: '#e6edf3',
  textMuted: '#9198a1',
  accent: '#818cf8',
  accentHover: '#a5b4fc',
  accentContrast: '#0d1117',
  accentSoft: '#23293c',
  border: '#7a828e',
  success: '#3fb950',
  successBg: '#1d372a',
  error: '#f85149',
  errorBg: '#2a2026',
  focus: '#818cf8',
  syntax: {
    keyword: '#ff7b72',
    string: '#a5d6ff',
    number: '#79c0ff',
    comment: '#8b949e',
    type: '#ffa657',
    function: '#d2a8ff',
    variable: '#7ee787',
    punctuation: '#c9d1d9',
  },
};

const TEXT_MIN = 4.5;
const UI_MIN = 3;

function describeTheme(name: string, t: Theme): void {
  describe(name, () => {
    it.each([
      ['text on bg', t.text, t.bg],
      ['text on surface', t.text, t.surface],
      ['muted on bg', t.textMuted, t.bg],
      ['muted on surface', t.textMuted, t.surface],
      ['accent (link) on bg', t.accent, t.bg],
      ['accent (link) on surface', t.accent, t.surface],
      ['accent-contrast on accent (button text)', t.accentContrast, t.accent],
      ['accent-contrast on accent-hover', t.accentContrast, t.accentHover],
      ['accent on accent-soft (medium badge)', t.accent, t.accentSoft],
      ['success on bg', t.success, t.bg],
      ['success on surface', t.success, t.surface],
      ['success on success-bg (badge/check-pass)', t.success, t.successBg],
      ['error on bg', t.error, t.bg],
      ['error on surface', t.error, t.surface],
      ['error on error-bg (badge/check-fail)', t.error, t.errorBg],
    ])('%s ≥ 4.5:1', (_label, fg, bg) => {
      expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(TEXT_MIN);
    });

    it.each(Object.entries(t.syntax).map(([token, color]) => [`syntax-${token} on surface`, color, t.surface]))(
      '%s ≥ 4.5:1',
      (_label, fg, bg) => {
        expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(TEXT_MIN);
      },
    );

    it.each([
      ['border on bg', t.border, t.bg],
      ['border on surface', t.border, t.surface],
      ['border on success-bg', t.border, t.successBg],
      ['border on error-bg', t.border, t.errorBg],
      ['border on accent-soft', t.border, t.accentSoft],
      ['focus ring on bg', t.focus, t.bg],
      ['focus ring on surface', t.focus, t.surface],
    ])('%s ≥ 3:1', (_label, fg, bg) => {
      expect(contrastRatio(fg, bg)).toBeGreaterThanOrEqual(UI_MIN);
    });
  });
}

describeTheme('light theme', light);
describeTheme('dark theme', dark);
