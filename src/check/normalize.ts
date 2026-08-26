import type { TextKata } from '../kata/types.ts';

/** trim, collapse internal whitespace runs to one space, lowercase */
export function normalizeText(s: string): string {
  return s.trim().replace(/\s+/g, ' ').toLowerCase();
}

export function matchText(input: string, k: TextKata): boolean {
  const mode = k.match.mode;
  const caseSensitive = k.match.caseSensitive;

  if (mode === 'exact') {
    const trimmed = input.trim();
    return k.answers.some((a) => (caseSensitive ? a === trimmed : a.toLowerCase() === trimmed.toLowerCase()));
  }

  if (mode === 'regex') {
    const trimmed = input.trim();
    const flags = caseSensitive ? '' : 'i';
    return k.answers.some((pattern) => {
      const re = new RegExp(`^(?:${pattern})$`, flags);
      return re.test(trimmed);
    });
  }

  // normalized
  const normInput = caseSensitive
    ? input.trim().replace(/\s+/g, ' ')
    : normalizeText(input);
  return k.answers.some((a) => {
    const normAnswer = caseSensitive ? a.trim().replace(/\s+/g, ' ') : normalizeText(a);
    return normAnswer === normInput;
  });
}

/** \r\n->\n, strip trailing whitespace per line, strip trailing newlines */
export function normalizeStdout(s: string): string {
  return s
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map((line) => line.replace(/[ \t]+$/, ''))
    .join('\n')
    .replace(/\n+$/, '');
}
