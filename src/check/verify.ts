// Compares a completed RunResult against a CodeKata's checks. The harness (src/runner/harness.ts)
// encodes return values using the same {type,value} wrapper shape as JavaValue (see kata/types.ts)
// for long/float/char, and bare JSON otherwise, so both "expected" (from the kata YAML) and
// "actual" (parsed from the runner's JSON) can be compared with the same unwrap logic.
import type { CodeKata, JavaValue } from '../kata/types.ts';
import type { RunResult } from '../runner/runner.ts';
import { normalizeStdout } from './normalize.ts';

export interface ReturnCaseOutcome {
  args: JavaValue[];
  expected: JavaValue;
  actual: unknown;
  pass: boolean;
}

export type CheckOutcome =
  | { type: 'stdout'; pass: boolean; expected: string; actual: string; stdin?: string; label?: string }
  | { type: 'return'; pass: boolean; method: string; cases: ReturnCaseOutcome[] };

export interface Verdict {
  solved: boolean;
  checks: CheckOutcome[];
  failure?: { status: string; message?: string };
}

const EPS = 1e-9;

function parseActual(json: string): unknown {
  try {
    return JSON.parse(json);
  } catch {
    return undefined;
  }
}

function unwrapExpected(v: JavaValue): { kind: string; value: unknown } {
  if (v !== null && typeof v === 'object' && !Array.isArray(v)) return { kind: v.type, value: v.value };
  return { kind: 'plain', value: v };
}

function isLongTagged(v: unknown): v is { type: 'long'; value: string } {
  return typeof v === 'object' && v !== null && (v as { type?: unknown }).type === 'long';
}

function compareJavaValue(actual: unknown, expected: JavaValue): boolean {
  if (expected === null) return actual === null;
  if (Array.isArray(expected)) {
    if (!Array.isArray(actual) || actual.length !== expected.length) return false;
    return expected.every((e, i) => compareJavaValue(actual[i], e));
  }

  const { kind, value } = unwrapExpected(expected);

  if (kind === 'long') {
    const actualStr = isLongTagged(actual) ? actual.value : String(actual);
    return actualStr === String(value);
  }
  if (kind === 'float' || kind === 'double') {
    const a = typeof actual === 'number' ? actual : Number(actual);
    return Number.isFinite(a) && Math.abs(a - Number(value)) <= EPS;
  }
  if (kind === 'char') {
    const aCode = typeof actual === 'string' ? actual.codePointAt(0) : typeof actual === 'number' ? actual : undefined;
    const eCode = typeof value === 'string' ? value.codePointAt(0) : Number(value);
    return aCode === eCode;
  }
  if (kind === 'int') {
    return Number(actual) === Number(value);
  }
  // plain bare number/string/boolean — a non-integer number implies double/float, use epsilon
  if (typeof value === 'number') {
    if (!Number.isInteger(value)) {
      const a = typeof actual === 'number' ? actual : Number(actual);
      return Number.isFinite(a) && Math.abs(a - value) <= EPS;
    }
    return Number(actual) === value;
  }
  return actual === value;
}

/** Verifies a completed run against a kata's checks. Non-'ok' statuses carry no per-check data. */
export function verifyResult(result: RunResult, kata: CodeKata): Verdict {
  if (result.status !== 'ok') {
    return {
      solved: false,
      checks: [],
      failure: { status: result.status, message: 'message' in result ? result.message : undefined },
    };
  }

  const checks: CheckOutcome[] = [];
  let returnIdx = 0;
  let stdoutIdx = 0;
  for (const check of kata.checks) {
    if (check.type === 'stdout') {
      const expected = normalizeStdout(check.expected);
      const raw = result.stdouts[stdoutIdx++];
      const actual = normalizeStdout(raw ?? '');
      checks.push({
        type: 'stdout',
        pass: raw !== undefined && expected === actual,
        expected,
        actual,
        stdin: check.stdin,
        label: check.label,
      });
    } else {
      const cases = check.cases.map((c) => {
        const raw = result.returns[returnIdx++];
        const actual = raw ? parseActual(raw.json) : undefined;
        const pass = raw !== undefined && compareJavaValue(actual, c.expected);
        return { args: c.args, expected: c.expected, actual, pass };
      });
      checks.push({ type: 'return', pass: cases.every((c) => c.pass), method: check.method, cases });
    }
  }

  return { solved: checks.every((c) => c.pass), checks };
}
