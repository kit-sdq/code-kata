import { describe, expect, it } from 'vitest';
import { matchText, normalizeStdout, normalizeText } from '../src/check/normalize.ts';
import type { TextKata } from '../src/kata/types.ts';

function textKata(overrides: Partial<TextKata> = {}): TextKata {
  return {
    id: 'k', title: 'k', difficulty: 'easy', tags: [], hints: [], body: '',
    type: 'text',
    answers: ['final'],
    match: { mode: 'normalized', caseSensitive: false },
    ...overrides,
  };
}

describe('normalizeText', () => {
  it('trims, collapses whitespace, and lowercases', () => {
    expect(normalizeText('  The   Final   Keyword  ')).toBe('the final keyword');
  });
});

describe('matchText', () => {
  it('normalized mode ignores case and extra whitespace by default', () => {
    const k = textKata({ answers: ['the final keyword'] });
    expect(matchText('  THE   final    keyword ', k)).toBe(true);
    expect(matchText('other', k)).toBe(false);
  });

  it('normalized mode respects caseSensitive', () => {
    const k = textKata({ answers: ['Final'], match: { mode: 'normalized', caseSensitive: true } });
    expect(matchText('Final', k)).toBe(true);
    expect(matchText('final', k)).toBe(false);
  });

  it('exact mode only trims leading/trailing whitespace', () => {
    const k = textKata({ answers: ['final'], match: { mode: 'exact', caseSensitive: true } });
    expect(matchText('  final  ', k)).toBe(true);
    expect(matchText('Final', k)).toBe(false);
    expect(matchText('fi nal', k)).toBe(false);
  });

  it('exact mode caseSensitive:false ignores case', () => {
    const k = textKata({ answers: ['final'], match: { mode: 'exact', caseSensitive: false } });
    expect(matchText('Final', k)).toBe(true);
  });

  it('regex mode full-matches trimmed input', () => {
    const k = textKata({ answers: ['fin(a|e)l'], match: { mode: 'regex', caseSensitive: false } });
    expect(matchText('  final  ', k)).toBe(true);
    expect(matchText('finel', k)).toBe(true);
    expect(matchText('xfinaly', k)).toBe(false);
  });

  it('regex mode caseSensitive maps to the i flag', () => {
    const k = textKata({ answers: ['final'], match: { mode: 'regex', caseSensitive: true } });
    expect(matchText('final', k)).toBe(true);
    expect(matchText('FINAL', k)).toBe(false);
  });

  it('any matching answer counts as correct', () => {
    const k = textKata({ answers: ['final', 'the final keyword'] });
    expect(matchText('the final keyword', k)).toBe(true);
  });
});

describe('normalizeStdout', () => {
  it('converts CRLF to LF', () => {
    expect(normalizeStdout('a\r\nb\r\n')).toBe('a\nb');
  });

  it('strips trailing whitespace per line', () => {
    expect(normalizeStdout('a  \nb\t\n')).toBe('a\nb');
  });

  it('strips trailing newlines but keeps internal blank lines', () => {
    expect(normalizeStdout('a\n\nb\n\n\n')).toBe('a\n\nb');
  });
});
