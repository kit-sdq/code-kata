import { describe, expect, it } from 'vitest';
import { parseFilename, resolveVariant } from '../src/kata/load.ts';
import type { TextKata } from '../src/kata/types.ts';

function kata(overrides: Partial<TextKata> = {}): TextKata {
  return {
    slug: 'slug', id: '1', category: 'basics', title: 't', difficulty: 'easy', tags: [], hints: [], body: '',
    type: 'text', answers: ['x'], match: { mode: 'normalized', caseSensitive: false },
    ...overrides,
  };
}

describe('parseFilename', () => {
  it('parses a <slug>.<lang>.md filename', () => {
    expect(parseFilename('hello-world.en.md')).toEqual({ slug: 'hello-world', lang: 'en' });
    expect(parseFilename('hello-world.de.md')).toEqual({ slug: 'hello-world', lang: 'de' });
  });

  it('treats a bare <slug>.md filename as the de variant (backward compat)', () => {
    expect(parseFilename('hello-world.md')).toEqual({ slug: 'hello-world', lang: 'de' });
  });

  it('keeps dots in the slug itself intact', () => {
    expect(parseFilename('01.5-intro.en.md')).toEqual({ slug: '01.5-intro', lang: 'en' });
  });
});

describe('resolveVariant', () => {
  it('returns the requested language when present, without a fallback flag', () => {
    const de = kata({ title: 'Deutsch' });
    const en = kata({ title: 'English' });
    const result = resolveVariant({ de, en }, 'en');
    expect(result?.title).toBe('English');
    expect(result?.langFallback).toBeUndefined();
  });

  it('falls back to the other language and marks langFallback when the requested one is missing', () => {
    const de = kata({ title: 'Deutsch' });
    const result = resolveVariant({ de }, 'en');
    expect(result?.title).toBe('Deutsch');
    expect(result?.langFallback).toBe(true);
  });

  it('returns undefined when neither language variant exists', () => {
    expect(resolveVariant({}, 'en')).toBeUndefined();
  });
});
