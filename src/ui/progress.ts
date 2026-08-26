const STORAGE_KEY = 'kata-progress:v1';

export interface KataProgress { solved: boolean; attempts: number; hintsRevealed: number }
type ProgressMap = Record<string, KataProgress>;

function readAll(): ProgressMap {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as ProgressMap) : {};
  } catch {
    return {};
  }
}

function writeAll(map: ProgressMap): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export function getProgress(id: string): KataProgress {
  return readAll()[id] ?? { solved: false, attempts: 0, hintsRevealed: 0 };
}

export function setProgress(id: string, progress: KataProgress): void {
  const all = readAll();
  all[id] = progress;
  writeAll(all);
}
