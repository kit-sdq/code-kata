import { describe, expect, it } from 'vitest';
import { verifyResult } from '../src/check/verify.ts';
import type { CodeKata, Check } from '../src/kata/types.ts';
import type { RunResult } from '../src/runner/runner.ts';

function codeKata(checks: Check[]): CodeKata {
  return {
    id: 'k', title: 'k', difficulty: 'easy', tags: [], hints: [], body: '',
    type: 'code', mainClass: 'Main', allowedImports: [], timeoutMs: 5000, template: '',
    checks,
  };
}

function ok(stdout: string, returns: { json: string }[] = []): RunResult {
  return { status: 'ok', stdout, returns };
}

describe('verifyResult — non-ok statuses', () => {
  it('marks unsolved with no checks and carries the failure status/message', () => {
    const kata = codeKata([{ type: 'stdout', expected: '1\n' }]);
    const verdict = verifyResult({ status: 'compile-error', message: 'boom' }, kata);
    expect(verdict.solved).toBe(false);
    expect(verdict.checks).toEqual([]);
    expect(verdict.failure).toEqual({ status: 'compile-error', message: 'boom' });
  });

  it('handles timeout/stopped which carry no message', () => {
    const kata = codeKata([{ type: 'stdout', expected: '1\n' }]);
    expect(verifyResult({ status: 'timeout' }, kata).failure).toEqual({ status: 'timeout', message: undefined });
    expect(verifyResult({ status: 'stopped' }, kata).failure).toEqual({ status: 'stopped', message: undefined });
  });
});

describe('verifyResult — stdout checks', () => {
  const kata = codeKata([{ type: 'stdout', expected: '1\n2\nFizz\n' }]);

  it('passes on exact match', () => {
    const v = verifyResult(ok('1\n2\nFizz\n'), kata);
    expect(v.solved).toBe(true);
    expect(v.checks[0]).toMatchObject({ type: 'stdout', pass: true });
  });

  it('tolerates trailing newline/whitespace differences and CRLF', () => {
    expect(verifyResult(ok('1\n2\nFizz'), kata).solved).toBe(true);
    expect(verifyResult(ok('1\r\n2\r\nFizz\r\n'), kata).solved).toBe(true);
    expect(verifyResult(ok('1 \n2\nFizz\n\n'), kata).solved).toBe(true);
  });

  it('fails on a real mismatch', () => {
    const v = verifyResult(ok('1\n2\nBuzz\n'), kata);
    expect(v.solved).toBe(false);
    expect(v.checks[0].pass).toBe(false);
  });
});

describe('verifyResult — return checks', () => {
  it('compares ints exactly', () => {
    const kata = codeKata([{ type: 'return', method: 'sum', cases: [{ args: [1, 2], expected: 3 }] }]);
    expect(verifyResult(ok('', [{ json: '3' }]), kata).solved).toBe(true);
    expect(verifyResult(ok('', [{ json: '4' }]), kata).solved).toBe(false);
  });

  it('compares long-wrapper values exactly, tolerating precision beyond 2^53', () => {
    const kata = codeKata([{
      type: 'return', method: 'echo',
      cases: [{ args: [{ type: 'long', value: '9007199254740993' }], expected: { type: 'long', value: '9007199254740994' } }],
    }]);
    const good = ok('', [{ json: '{"type":"long","value":"9007199254740994"}' }]);
    const bad = ok('', [{ json: '{"type":"long","value":"9007199254740993"}' }]);
    expect(verifyResult(good, kata).solved).toBe(true);
    expect(verifyResult(bad, kata).solved).toBe(false);
  });

  it('compares doubles/floats with epsilon tolerance', () => {
    const kata = codeKata([{
      type: 'return', method: 'half',
      cases: [{ args: [1], expected: { type: 'double', value: 0.5 } }],
    }]);
    expect(verifyResult(ok('', [{ json: '0.5000000001' }]), kata).solved).toBe(true);
    expect(verifyResult(ok('', [{ json: '0.51' }]), kata).solved).toBe(false);
  });

  it('compares arrays element-wise', () => {
    const kata = codeKata([{
      type: 'return', method: 'ids',
      cases: [{ args: [], expected: [1, 2, 3] }],
    }]);
    expect(verifyResult(ok('', [{ json: '[1,2,3]' }]), kata).solved).toBe(true);
    expect(verifyResult(ok('', [{ json: '[1,2,4]' }]), kata).solved).toBe(false);
    expect(verifyResult(ok('', [{ json: '[1,2]' }]), kata).solved).toBe(false);
  });

  it('unwraps {type,value} wrappers on the expected side for char', () => {
    const kata = codeKata([{
      type: 'return', method: 'upper',
      cases: [{ args: [{ type: 'char', value: 'a' }], expected: { type: 'char', value: 'A' } }],
    }]);
    expect(verifyResult(ok('', [{ json: '"A"' }]), kata).solved).toBe(true);
    expect(verifyResult(ok('', [{ json: '"a"' }]), kata).solved).toBe(false);
  });

  it('a mixed pass/fail set of cases is not solved, but reports each case individually', () => {
    const kata = codeKata([{
      type: 'return', method: 'sum',
      cases: [{ args: [1, 2], expected: 3 }, { args: [2, 2], expected: 4 }],
    }]);
    const v = verifyResult(ok('', [{ json: '3' }, { json: '5' }]), kata);
    expect(v.solved).toBe(false);
    const cases = v.checks[0].type === 'return' ? v.checks[0].cases : [];
    expect(cases.map((c) => c.pass)).toEqual([true, false]);
  });
});
