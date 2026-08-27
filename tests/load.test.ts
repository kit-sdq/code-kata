import { describe, expect, it, vi } from 'vitest';
import { buildIndex, parseFilename, resolveVariant } from '../src/kata/load.ts';
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

function multilingualSrc(id: string): string {
  return `---
id: ${id}
category: basics
title: {de: Titel ${id}, en: Title ${id}}
type: text
difficulty: easy
answers: ["x"]
---
Body.
`;
}

function suffixedSrc(id: string, lang: string): string {
  return `---
id: ${id}
category: basics
title: Suffixed ${lang}
type: text
difficulty: easy
answers: ["x"]
---
Body.
`;
}

describe('buildIndex', () => {
  it('registers both language variants from a bare multilingual file', () => {
    const modules = { '/katas/greet.md': multilingualSrc('1') };
    const bySlug = buildIndex(modules);
    const variants = bySlug.get('greet');
    expect(variants?.de?.title).toBe('Titel 1');
    expect(variants?.en?.title).toBe('Title 1');
  });

  it('suffixed file wins over a multilingual file for the same slug/language, with a warning', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const modules = {
      '/katas/greet.md': multilingualSrc('1'),
      '/katas/greet.en.md': suffixedSrc('1', 'en'),
    };
    const bySlug = buildIndex(modules);
    const variants = bySlug.get('greet');
    expect(variants?.de?.title).toBe('Titel 1');
    expect(variants?.en?.title).toBe('Suffixed en');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('precedence is order-independent (suffixed file listed before the multilingual one)', () => {
    const modules = {
      '/katas/greet.de.md': suffixedSrc('1', 'de'),
      '/katas/greet.md': multilingualSrc('1'),
    };
    const bySlug = buildIndex(modules);
    const variants = bySlug.get('greet');
    expect(variants?.de?.title).toBe('Suffixed de');
    expect(variants?.en?.title).toBe('Title 1');
  });
});
