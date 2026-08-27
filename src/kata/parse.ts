import yaml from 'js-yaml';
import type { Check, ChoiceKata, CodeKata, Difficulty, JavaValue, Kata, Match, TextKata } from './types.ts';

const FRONTMATTER_RE = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
const TEMPLATE_RE = /```java template\r?\n([\s\S]*?)```/;

/** Parse a raw .md string into a Kata. `slug` is the filename-derived routing/progress key. */
export function parseKata(raw: string, slug: string): Kata {
  const fmMatch = raw.match(FRONTMATTER_RE);
  if (!fmMatch) throw new Error(`${slug}: missing YAML frontmatter (expected leading "---" block)`);

  const parsed = yaml.load(fmMatch[1]);
  if (typeof parsed !== 'object' || parsed === null) {
    throw new Error(`${slug}: frontmatter must be a YAML mapping`);
  }
  const fm = parsed as Record<string, unknown>;
  let body = raw.slice(fmMatch[0].length);

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

  const title = fm.title;
  if (typeof title !== 'string' || !title) throw new Error(`${id}: missing required field "title"`);

  const type = fm.type;
  if (type !== 'text' && type !== 'choice' && type !== 'code') {
    throw new Error(`${id}: "type" must be one of text|choice|code`);
  }

  const difficulty = fm.difficulty;
  if (difficulty !== 'easy' && difficulty !== 'medium' && difficulty !== 'hard') {
    throw new Error(`${id}: "difficulty" must be one of easy|medium|hard`);
  }

  const tags = parseStringArray(fm.tags, id, 'tags');
  const hints = parseStringArray(fm.hints, id, 'hints');

  const templateMatch = body.match(TEMPLATE_RE);
  let template = '';
  if (templateMatch && templateMatch.index !== undefined) {
    template = templateMatch[1].replace(/\n$/, '');
    body = (body.slice(0, templateMatch.index) + body.slice(templateMatch.index + templateMatch[0].length)).trim();
  }

  const base = { slug, id, category, title, difficulty: difficulty as Difficulty, tags, hints, body };

  if (type === 'text') return parseTextKata(fm, base, id);
  if (type === 'choice') return parseChoiceKata(fm, base, id);
  return parseCodeKata(fm, base, id, template);
}

function parseStringArray(value: unknown, id: string, field: string): string[] {
  if (value === undefined) return [];
  if (!Array.isArray(value) || !value.every((v) => typeof v === 'string')) {
    throw new Error(`${id}: "${field}" must be an array of strings`);
  }
  return value;
}

function parseTextKata(fm: Record<string, unknown>, base: Omit<TextKata, 'type' | 'answers' | 'match'>, id: string): TextKata {
  const answers = fm.answers;
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

function parseChoiceKata(fm: Record<string, unknown>, base: Omit<ChoiceKata, 'type' | 'multiple' | 'shuffle' | 'options'>, id: string): ChoiceKata {
  const optionsRaw = fm.options;
  if (!Array.isArray(optionsRaw) || optionsRaw.length === 0) {
    throw new Error(`${id}: choice kata requires a non-empty "options" array`);
  }
  const options = optionsRaw.map((o, i) => {
    if (typeof o !== 'object' || o === null || typeof (o as Record<string, unknown>).text !== 'string' || typeof (o as Record<string, unknown>).correct !== 'boolean') {
      throw new Error(`${id}: option ${i} malformed — requires "text" (string) and "correct" (boolean)`);
    }
    const opt = o as Record<string, unknown>;
    return { text: opt.text as string, correct: opt.correct as boolean };
  });
  if (!options.some((o) => o.correct)) throw new Error(`${id}: choice kata requires at least one correct option`);
  const multiple = fm.multiple === true;
  const shuffle = fm.shuffle !== false;
  return { ...base, type: 'choice', multiple, shuffle, options };
}

function parseCodeKata(fm: Record<string, unknown>, base: Omit<CodeKata, 'type' | 'mainClass' | 'allowedImports' | 'timeoutMs' | 'template' | 'checks'>, id: string, template: string): CodeKata {
  if (!template) throw new Error(`${id}: code kata requires a fenced \`\`\`java template block in the body`);
  const mainClass = typeof fm.mainClass === 'string' && fm.mainClass ? fm.mainClass : 'Main';
  const allowedImports = parseStringArray(fm.allowedImports, id, 'allowedImports');
  const timeoutMs = typeof fm.timeoutMs === 'number' && fm.timeoutMs > 0 ? fm.timeoutMs : 5000;
  const checks = parseChecks(fm.checks, id);
  return { ...base, type: 'code', mainClass, allowedImports, timeoutMs, template, checks };
}

function parseChecks(raw: unknown, id: string): Check[] {
  if (!Array.isArray(raw) || raw.length === 0) throw new Error(`${id}: code kata requires a non-empty "checks" array`);
  return raw.map((c, i) => {
    if (typeof c !== 'object' || c === null) throw new Error(`${id}: check ${i} malformed`);
    const check = c as Record<string, unknown>;
    if (check.type === 'stdout') {
      if (typeof check.expected !== 'string') throw new Error(`${id}: stdout check ${i} requires "expected" (string)`);
      if (check.stdin !== undefined && typeof check.stdin !== 'string') {
        throw new Error(`${id}: stdout check ${i} "stdin" must be a string`);
      }
      if (check.label !== undefined && typeof check.label !== 'string') {
        throw new Error(`${id}: stdout check ${i} "label" must be a string`);
      }
      const result: Check = { type: 'stdout', expected: check.expected };
      if (check.stdin !== undefined) result.stdin = check.stdin;
      if (check.label !== undefined) result.label = check.label;
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
