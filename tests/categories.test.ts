import { describe, expect, it, vi } from 'vitest';
import { compareIds, groupKatas } from '../src/kata/categories.ts';
import type { Category, TextKata } from '../src/kata/types.ts';

function kata(overrides: Partial<TextKata> = {}): TextKata {
  return {
    slug: 'slug', id: '1', category: 'basics', title: 't', difficulty: 'easy', tags: [], hints: [], body: '',
    type: 'text', answers: ['x'], match: { mode: 'normalized', caseSensitive: false },
    ...overrides,
  };
}

describe('compareIds', () => {
  it('compares numerically, not lexically (2 < 10)', () => {
    expect(compareIds('2', '10')).toBeLessThan(0);
  });

  it('shorter prefix sorts first (2 < 2.1)', () => {
    expect(compareIds('2', '2.1')).toBeLessThan(0);
  });

  it('compares dotted segments numerically (2.2 < 2.10)', () => {
    expect(compareIds('2.2', '2.10')).toBeLessThan(0);
  });

  it('returns 0 for equal ids', () => {
    expect(compareIds('2.1', '2.1')).toBe(0);
  });

  it('falls back to string compare for non-numeric segments', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    expect(compareIds('1.a', '1.b')).toBeLessThan(0);
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });
});

describe('groupKatas', () => {
  const categories: Category[] = [
    { id: 'basics', name: 'Java Basics', order: 1 },
    { id: 'arrays', name: 'Arrays', order: 2 },
  ];

  it('groups katas in designer order and sorts within a category by id', () => {
    const katas = [
      kata({ slug: 'b', id: '2', category: 'basics' }),
      kata({ slug: 'a', id: '1', category: 'basics' }),
      kata({ slug: 'c', id: '1', category: 'arrays' }),
    ];
    const groups = groupKatas(katas, categories);
    expect(groups).toHaveLength(2);
    expect(groups[0].category).toEqual(categories[0]);
    expect(groups[0].katas.map((k) => k.slug)).toEqual(['a', 'b']);
    expect(groups[1].category).toEqual(categories[1]);
  });

  it('puts unknown-category katas into a synthetic uncategorized group last', () => {
    const katas = [
      kata({ slug: 'a', id: '1', category: 'basics' }),
      kata({ slug: 'z', id: '1', category: 'nonexistent' }),
    ];
    const groups = groupKatas(katas, categories);
    expect(groups).toHaveLength(2);
    expect(groups[groups.length - 1].category).toBe('uncategorized');
    expect(groups[groups.length - 1].katas.map((k) => k.slug)).toEqual(['z']);
  });

  it('warns naming the kata slug and unknown category for an unmatched category', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const katas = [kata({ slug: 'mystery-kata', id: '1', category: 'nonexistent' })];
    groupKatas(katas, categories);
    const message = warnSpy.mock.calls.map((c) => c.join(' ')).join('\n');
    expect(message).toContain('mystery-kata');
    expect(message).toContain('nonexistent');
    warnSpy.mockRestore();
  });

  it('omits categories with no katas', () => {
    const katas = [kata({ slug: 'a', id: '1', category: 'basics' })];
    const groups = groupKatas(katas, categories);
    expect(groups).toHaveLength(1);
    expect(groups[0].category).toEqual(categories[0]);
  });

  it('warns on duplicate id within the same category, naming both slugs', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const katas = [
      kata({ slug: 'a', id: '1', category: 'basics' }),
      kata({ slug: 'b', id: '1', category: 'basics' }),
    ];
    groupKatas(katas, categories);
    const message = warnSpy.mock.calls.map((c) => c.join(' ')).join('\n');
    expect(message).toContain('"a"');
    expect(message).toContain('"b"');
    warnSpy.mockRestore();
  });
});
