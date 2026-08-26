import { parseKata } from './parse.ts';
import type { Kata } from './types.ts';

const modules = import.meta.glob('../../katas/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function loadAll(): Kata[] {
  const katas: Kata[] = [];
  for (const [path, raw] of Object.entries(modules)) {
    const filename = path.split('/').pop() ?? path;
    const slug = filename.replace(/\.md$/, '');
    try {
      katas.push(parseKata(raw, slug));
    } catch (err) {
      console.error(`Failed to parse kata "${filename}":`, err);
    }
  }
  return katas.sort((a, b) => a.title.localeCompare(b.title));
}

const katas = loadAll();

export function getKatas(): Kata[] {
  return katas;
}

export function getKata(slug: string): Kata | undefined {
  return katas.find((k) => k.slug === slug);
}
