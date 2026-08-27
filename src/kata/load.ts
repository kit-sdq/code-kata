import { parseKata, parseMultilingualKata } from './parse.ts';
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

/** Builds the slug → variants index from a filename → raw-content map (as produced by
 * `import.meta.glob`). Exported for testing without needing a real `katas/` glob.
 * A bare `<slug>.md` is multilingual and registers both `de` and `en` variants; a
 * suffixed `<slug>.<lang>.md` registers just that language. If both exist for the same
 * slug/language, the suffixed file takes precedence (console.warn). */
export function buildIndex(modules: Record<string, string>): Map<string, Variants> {
  const bySlug = new Map<string, Variants>();
  const multilingualLangs = new Map<string, Set<Lang>>();

  for (const [path, raw] of Object.entries(modules)) {
    const filename = path.split('/').pop() ?? path;
    if (FILENAME_RE.test(filename)) continue;
    const slug = filename.replace(/\.md$/, '');
    try {
      const { de, en } = parseMultilingualKata(raw, slug);
      bySlug.set(slug, { de, en });
      multilingualLangs.set(slug, new Set<Lang>(['de', 'en']));
    } catch (err) {
      console.error(`Failed to parse kata "${filename}":`, err);
    }
  }

  for (const [path, raw] of Object.entries(modules)) {
    const filename = path.split('/').pop() ?? path;
    const m = filename.match(FILENAME_RE);
    if (!m) continue;
    const slug = m[1];
    const lang = m[2] as Lang;
    try {
      const kata = parseKata(raw, slug, lang);
      if (multilingualLangs.get(slug)?.has(lang)) {
        console.warn(`Kata "${slug}": both a multilingual "${slug}.md" and a suffixed "${filename}" exist for "${lang}" — the suffixed file wins`);
      }
      const variants = bySlug.get(slug) ?? {};
      variants[lang] = kata;
      bySlug.set(slug, variants);
    } catch (err) {
      console.error(`Failed to parse kata "${filename}":`, err);
    }
  }

  return bySlug;
}

const bySlug = buildIndex(modules);

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
