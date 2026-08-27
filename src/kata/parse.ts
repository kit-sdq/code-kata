import yaml from 'js-yaml';
import type { Check, ChoiceKata, CodeKata, Difficulty, JavaValue, Kata, Lang, Match, TextKata } from './types.ts';

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const TEMPLATE_RE = /```java template\r?\n([\s\S]*?)```/;
const MARKER_RE = /^<!--\s*(de|en|all)\s*-->$/;

/** Parse a single-language kata file: a `<slug>.<lang>.md` file, or a legacy bare
 * `<slug>.md` file predating the multilingual format (treated as `de` by the caller).
 * `lang` only matters if the frontmatter happens to contain a `{de, en}` localized map
 * (not required for single-language files, but resolved the same way if present). */
export function parseKata(raw: string, slug: string, lang: Lang = 'de'): Kata {
  const { fm, id, category, rawBody } = parseFrontmatter(raw, slug);
  return buildKata(fm, rawBody, slug, id, category, lang);
}

/** Parse a bare multilingual `<slug>.md` file (no language suffix) into both language
 * variants. Localizable frontmatter fields (title, hints, answers, tags, options[].text,
 * stdout checks' expected/label) may be a plain value (shared) or a `{de, en}` map. The
 * body is split into per-language sections via `<!-- de -->` / `<!-- en -->` / `<!-- all -->`
 * markers on their own line. */
export function parseMultilingualKata(raw: string, slug: string): { de: Kata; en: Kata } {
  const { fm, id, category, rawBody } = parseFrontmatter(raw, slug);
  const de = buildKata(fm, rawBody, slug, id, category, 'de');
  const en = buildKata(fm, rawBody, slug, id, category, 'en');
  if (de.type === 'code' && en.type === 'code') {
    const hasDe = de.template.length > 0;
    const hasEn = en.template.length > 0;
    if (hasDe !== hasEn) {
      throw new Error(`${id}: code kata template must be defined for both languages or neither (found only "${hasDe ? 'de' : 'en'}")`);
    }
  }
  return { de, en };
}

function parseFrontmatter(raw: string, slug: string): { fm: Record<string, unknown>; id: string; category: string; rawBody: string } {
  const fmMatch = raw.match(FRONTMATTER_RE);
  if (!fmMatch) throw new Error(`${slug}: missing YAML frontmatter (expected leading "---" block)`);

  const parsed = yaml.load(fmMatch[1]);
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error(`${slug}: frontmatter must be a YAML mapping`);
  }
  const fm = parsed as Record<string, unknown>;
  const rawBody = raw.slice(fmMatch[0].length);

  if (fm.id === undefined || fm.id === null || fm.id === '' || (typeof fm.id !== 'string' && typeof fm.id !== 'number')) {
    throw new Error(`${slug}: missing required field "id"`);
  }
  const id = String(fm.id);

  let category: string;
  if (typeof fm.category === 'string' && fm.category) {
    category = fm.category;
  } else {
    console.warn(`${slug}: missing "category", defaulting to "uncategorized"`);
    category = 'uncategorized';
  }

  return { fm, id, category, rawBody };
}

/** Resolves a body's per-language content: content before any marker (or under
 * `<!-- all -->`) is shared, `<!-- de -->`/`<!-- en -->` sections apply to that language
 * only, markers themselves are stripped. A no-op when the body has no markers. */
function assembleBody(rawBody: string, lang: Lang): string {
  const lines = rawBody.split(/\r?\n/);
  let audience: Lang | 'all' = 'all';
  const out: string[] = [];
  for (const line of lines) {
    const m = line.trim().match(MARKER_RE);
    if (m) {
      audience = m[1] as Lang | 'all';
      continue;
    }
    if (audience === 'all' || audience === lang) out.push(line);
  }
  return out.join('\n');
}

/** Resolves a localizable frontmatter field: a plain value (used for every language) or
 * a `{de, en}` map (both keys required, validated by `isValid`, or an error naming
 * `field`). `isValid` also identifies plain values, so it must reject `{de, en}` maps. */
function resolveLocalized(value: unknown, lang: Lang, field: string, id: string, isValid: (v: unknown) => boolean): unknown {
  if (value === undefined || isValid(value)) return value;
  if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
    const m = value as Record<string, unknown>;
    if (!isValid(m.de) || !isValid(m.en)) {
      throw new Error(`${id}: "${field}" localized map requires both "de" and "en" values`);
    }
    return m[lang];
  }
  return value;
}

function buildKata(fm: Record<string, unknown>, rawBody: string, slug: string, id: string, category: string, lang: Lang): Kata {
  const title = resolveLocalized(fm.title, lang, 'title', id, (v) => typeof v === 'string');
  if (typeof title !== 'string' || !title) throw new Error(`${id}: missing required field "title"`);

  const type = fm.type;
  if (type !== 'text' && type !== 'choice' && type !== 'code') {
    throw new Error(`${id}: "type" must be one of text|choice|code`);
  }

  const difficulty = fm.difficulty;
  if (difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard') {
    throw new Error(`${id}: "difficulty" must be one of easy|medium|hard`);
  }

  const tags = parseStringArray(resolveLocalized(fm.tags, lang, 'tags', id, Array.isArray), id, 'tags');
  const hints = parseStringArray(resolveLocalized(fm.hints, lang, 'hints', id, Array.isArray), id, 'hints');

  let body = assembleBody(rawBody, lang);
  const templateMatch = body.match(TEMPLATE_RE);
  let template = '';
  if (templateMatch && templateMatch.index !== undefined) {
    template = templateMatch[1].replace(/\n$/, '');
    body = (body.slice(0, templateMatch.index) + body.slice(templateMatch.index + templateMatch[0].length)).trim();
  }

  const base = { slug, id, category, title, difficulty: difficulty as Difficulty, tags, hints, body };

  if (type === 'text') return parseTextKata(fm, base, id, lang);
  if (type === 'choice') return parseChoiceKata(fm, base, id, lang);
  return parseCodeKata(fm, base, id, template, lang);
}

function parseStringArray(value: unknown, id: string, field: string): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || !value.every((v) => typeof v === 'string')) {
    throw new Error(`${id}: "${field}" must be an array of strings`);
  }
  return value;
}

function parseTextKata(fm: Record<string, unknown>, base: Omit<TextKata, 'type' | 'answers' | 'match'>, id: string, lang: Lang): TextKata {
  const answers = resolveLocalized(fm.answers, lang, 'answers', id, Array.isArray);
  if (!Array.isArray(answers) || answers.length === 0 || !answers.every((a) => typeof a === 'string')) {
    throw new Error(`${id}: text kata requires a non-empty "answers" array of strings`);
  }
  const matchRaw = (fm.match ?? {}) as Record<string, unknown>;
  if (typeof matchRaw !== 'object' || matchRaw === null) throw new Error(`${id}: "match" must be a mapping`);
  const mode = matchRaw.mode ?? 'normalized';
  if (mode !== 'normalized' && mode !== 'exact' && mode !== 'regex') {
    throw new Error(`${id}: "match.mode" must be one of normalized|exact|regex`);
  }
  const match: Match = { mode, caseSensitive: matchRaw.caseSensitive === true };
  return { ...base, type: 'text', answers, match };
}

function parseChoiceKata(fm: Record<string, unknown>, base: Omit<ChoiceKata, 'type' | 'multiple' | 'shuffle' | 'options'>, id: string, lang: Lang): ChoiceKata {
  const optionsRaw = fm.options;
  if (!Array.isArray(optionsRaw) || optionsRaw.length === 0) {
    throw new Error(`${id}: choice kata requires a non-empty "options" array`);
  }
  const options = optionsRaw.map((o, i) => {
    if (typeof o !== 'object' || o === null) {
      throw new Error(`${id}: option ${i} malformed — requires "text" (string) and "correct" (boolean)`);
    }
    const opt = o as Record<string, unknown>;
    const text = resolveLocalized(opt.text, lang, `options[${i}].text`, id, (v) => typeof v === 'string');
    if (typeof text !== 'string' || typeof opt.correct !== 'boolean') {
      throw new Error(`${id}: option ${i} malformed — requires "text" (string) and "correct" (boolean)`);
    }
    return { text, correct: opt.correct as boolean };
  });
  if (!options.some((o) => o.correct)) throw new Error(`${id}: choice kata requires at least one correct option`);
  const multiple = fm.multiple === true;
  const shuffle = fm.shuffle !== false;
  return { ...base, type: 'choice', multiple, shuffle, options };
}

function parseCodeKata(fm: Record<string, unknown>, base: Omit<CodeKata, 'type' | 'mainClass' | 'allowedImports' | 'timeoutMs' | 'template' | 'checks'>, id: string, template: string, lang: Lang): CodeKata {
  if (!template) throw new Error(`${id}: code kata requires a fenced \`\`\`java template block in the body`);
  const mainClass = typeof fm.mainClass === 'string' && fm.mainClass ? fm.mainClass : 'Main';
  const allowedImports = parseStringArray(fm.allowedImports, id, 'allowedImports');
  const timeoutMs = typeof fm.timeoutMs === 'number' && fm.timeoutMs > 0 ? fm.timeoutMs : 5000;
  const checks = parseChecks(fm.checks, id, lang);
  return { ...base, type: 'code', mainClass, allowedImports, timeoutMs, template, checks };
}

function parseChecks(raw: unknown, id: string, lang: Lang): Check[] {
  if (!Array.isArray(raw) || raw.length === 0) throw new Error(`${id}: code kata requires a non-empty "checks" array`);
  return raw.map((c, i) => {
    if (typeof c !== 'object' || c === null) throw new Error(`${id}: check ${i} malformed`);
    const check = c as Record<string, unknown>;
    if (check.type === 'stdout') {
      const expected = resolveLocalized(check.expected, lang, `checks[${i}].expected`, id, (v) => typeof v === 'string');
      if (typeof expected !== 'string') throw new Error(`${id}: stdout check ${i} requires "expected" (string)`);
      if (check.stdin !== undefined && typeof check.stdin !== 'string') {
        throw new Error(`${id}: stdout check ${i} "stdin" must be a string`);
      }
      const label = resolveLocalized(check.label, lang, `checks[${i}].label`, id, (v) => typeof v === 'string');
      if (check.label !== undefined && typeof label !== 'string') {
        throw new Error(`${id}: stdout check ${i} "label" must be a string`);
      }
      const result: Check = { type: 'stdout', expected };
      if (check.stdin !== undefined) result.stdin = check.stdin;
      if (label !== undefined) result.label = label as string;
      return result;
    }
    if (check.type === 'return') {
      if (typeof check.method !== 'string' || !check.method) {
        throw new Error(`${id}: return check ${i} requires "method" (string)`);
      }
      if (!Array.isArray(check.cases) || check.cases.length === 0) {
        throw new Error(`${id}: return check ${i} requires a non-empty "cases" array`);
      }
      const cases = check.cases.map((cs, j) => {
        if (typeof cs !== 'object' || cs === null || !Array.isArray((cs as Record<string, unknown>).args)) {
          throw new Error(`${id}: return check ${i} case ${j} malformed — requires "args" array and "expected"`);
        }
        const c2 = cs as Record<string, unknown>;
        return { args: c2.args as JavaValue[], expected: c2.expected as JavaValue };
      });
      return { type: 'return', method: check.method, cases };
    }
    throw new Error(`${id}: check ${i} has unknown "type" (expected stdout|return)`);
  });
}
