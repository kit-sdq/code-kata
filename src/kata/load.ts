import { parseKata } from './parse.ts';
import type { Kata } from './types.ts';

const modules = import.meta.glob('../../katas/*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function loadAll(): Kata[] {
  const katas: Kata[] = [];
  for (const [path, raw] of Object.entries(modules)) {
    const filename = path.split('/').pop() ?? path;
    const fallbackId = filename.replace(/\.md$/, '');
    try {
      katas.push(parseKata(raw, fallbackId));
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

export function getKata(id: string): Kata | undefined {
  return katas.find((k) => k.id === id);
}
