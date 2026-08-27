import yaml from 'js-yaml';
import type { Category, Kata, Lang, Localized } from './types.ts';

const modules = import.meta.glob('../../katas/categories.yaml', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

export interface KataGroup { category: Category | 'uncategorized'; katas: Kata[] }

/** A category's `name`/`description` is either a plain string (all languages) or a
 * `{de, en}` map. Throws if `value` is neither. */
function parseLocalized(value: unknown, field: string, i: number): Localized {
  if (typeof value === 'string' && value) return value;
  if (typeof value === 'object' && value !== null) {
    const v = value as Record<string, unknown>;
    if (typeof v.de === 'string' && v.de && typeof v.en === 'string' && v.en) {
      return { de: v.de, en: v.en };
    }
  }
  throw new Error(`category ${i}: "${field}" must be a string or a {de, en} map`);
}

/** Resolves a Localized value to a plain string for `lang` (plain strings are used as-is
 * for every language). */
export function resolveLocalized(value: Localized, lang: Lang): string {
  return typeof value === 'string' ? value : value[lang];
}

/** Loads katas/categories.yaml, sorted by `order`. Malformed manifest → console.error + []. */
export function loadCategories(): Category[] {
  const raw = Object.values(modules)[0];
  if (raw === undefined) {
    console.error('katas/categories.yaml not found');
    return [];
  }
  try {
    const parsed = yaml.load(raw);
    if (!Array.isArray(parsed)) throw new Error('categories.yaml must be a YAML list');
    const categories = parsed.map((entry, i) => {
      if (typeof entry !== 'object' || entry === null) throw new Error(`category ${i} malformed`);
      const c = entry as Record<string, unknown>;
      if (typeof c.id !== 'string' || !c.id) throw new Error(`category ${i}: missing "id"`);
      if (c.name === undefined) throw new Error(`category ${i}: missing "name"`);
      if (typeof c.order !== 'number') throw new Error(`category ${i}: missing "order"`);
      const category: Category = { id: c.id, name: parseLocalized(c.name, 'name', i), order: c.order };
      if (c.description !== undefined) category.description = parseLocalized(c.description, 'description', i);
      return category;
    });
    return categories.sort((a, b) => a.order - b.order);
  } catch (err) {
    console.error('Failed to parse katas/categories.yaml:', err);
    return [];
  }
}

const warnedNonNumericIds = new Set<string>();

/** Natural dotted-numeric compare: split on '.', compare segments numerically, shorter prefix first.
 * A non-numeric segment falls back to string compare for that segment (warns once per id). */
export function compareIds(a: string, b: string): number {
  const as = a.split('.');
  const bs = b.split('.');
  const len = Math.max(as.length, bs.length);
  for (let i = 0; i < len; i++) {
    const av = as[i];
    const bv = bs[i];
    if (av === undefined) return -1;
    if (bv === undefined) return 1;
    const an = Number(av);
    const bn = Number(bv);
    const aNumeric = av !== '' && !Number.isNaN(an);
    const bNumeric = bv !== '' && !Number.isNaN(bn);
    if (aNumeric && bNumeric) {
      if (an !== bn) return an - bn;
      continue;
    }
    if (!aNumeric && !warnedNonNumericIds.has(a)) {
      warnedNonNumericIds.add(a);
      console.warn(`compareIds: non-numeric id segment "${av}" in "${a}" — falling back to string compare`);
    }
    if (!bNumeric && !warnedNonNumericIds.has(b)) {
      warnedNonNumericIds.add(b);
      console.warn(`compareIds: non-numeric id segment "${bv}" in "${b}" — falling back to string compare`);
    }
    const cmp = av.localeCompare(bv);
    if (cmp !== 0) return cmp;
  }
  return 0;
}

function warnDuplicateIds(katas: Kata[], categoryLabel: string): void {
  const seenSlugById = new Map<string, string>();
  for (const k of katas) {
    const existingSlug = seenSlugById.get(k.id);
    if (existingSlug) {
      console.warn(`Duplicate id "${k.id}" in category "${categoryLabel}": "${existingSlug}" and "${k.slug}"`);
    } else {
      seenSlugById.set(k.id, k.slug);
    }
  }
}

/** Groups katas by category in designer order (by `order`), katas sorted by compareIds.
 * Katas whose category doesn't match a known category land in a synthetic 'uncategorized'
 * group, always last. Empty categories are omitted. */
export function groupKatas(katas: Kata[], categories: Category[]): KataGroup[] {
  const knownIds = new Set(categories.map((c) => c.id));
  const byCategory = new Map<string, Kata[]>();
  const uncategorized: Kata[] = [];

  for (const kata of katas) {
    if (knownIds.has(kata.category)) {
      const list = byCategory.get(kata.category) ?? [];
      list.push(kata);
      byCategory.set(kata.category, list);
    } else {
      console.warn(`Kata "${kata.slug}": unknown category "${kata.category}" — placed in Uncategorized`);
      uncategorized.push(kata);
    }
  }

  const groups: KataGroup[] = [];
  for (const category of categories) {
    const list = byCategory.get(category.id);
    if (!list || list.length === 0) continue;
    list.sort((a, b) => compareIds(a.id, b.id));
    warnDuplicateIds(list, category.id);
    groups.push({ category, katas: list });
  }

  if (uncategorized.length > 0) {
    uncategorized.sort((a, b) => compareIds(a.id, b.id));
    warnDuplicateIds(uncategorized, 'uncategorized');
    groups.push({ category: 'uncategorized', katas: uncategorized });
  }

  return groups;
}
