import { parseKata } from './parse.ts';
import type { Kata, Lang } from './types.ts';
import { getLang } from '../ui/i18n.ts';

const modules = import.meta.glob('../../katas/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

const FILENAME_RE = /^(.+)\.(de|en)\.md$/;

/** Parses a kata filename into its language-independent slug and language. A filename
 * ending `.<lang>.md` (lang = de|en) is that language's variant; a bare `<slug>.md`
 * (no language suffix) counts as `de`, for backward compat with pre-i18n filenames. */
export function parseFilename(filename: string): { slug: string; lang: Lang } {
  const m = filename.match(FILENAME_RE);
  if (m) return { slug: m[1], lang: m[2] as Lang };
  return { slug: filename.replace(/\.md$/, ''), lang: 'de' };
}

export type Variants = Partial<Record<Lang, Kata>>;

function loadAll(): Map<string, Variants> {
  const bySlug = new Map<string, Variants>();
  for (const [path, raw] of Object.entries(modules)) {
    const filename = path.split('/').pop() ?? path;
    const { slug, lang } = parseFilename(filename);
    try {
      const kata = parseKata(raw, slug);
      const variants = bySlug.get(slug) ?? {};
      variants[lang] = kata;
      bySlug.set(slug, variants);
    } catch (err) {
      console.error(`Failed to parse kata "${filename}":`, err);
    }
  }
  return bySlug;
}

const bySlug = loadAll();

/** Resolves a slug's variants to a single Kata for `lang`, falling back to the other
 * language (and marking `langFallback`) when `lang`'s file doesn't exist. */
export function resolveVariant(variants: Variants, lang: Lang): Kata | undefined {
  const primary = variants[lang];
  if (primary) return primary;
  const other: Lang = lang === 'de' ? 'en' : 'de';
  const fallback = variants[other];
  return fallback ? { ...fallback, langFallback: true } : undefined;
}

export function getKatas(): Kata[] {
  const lang = getLang();
  const katas: Kata[] = [];
  for (const variants of bySlug.values()) {
    const k = resolveVariant(variants, lang);
    if (k) katas.push(k);
  }
  return katas.sort((a, b) => a.title.localeCompare(b.title));
}

export function getKata(slug: string): Kata | undefined {
  const variants = bySlug.get(slug);
  return variants && resolveVariant(variants, getLang());
}
