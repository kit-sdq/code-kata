import { describe, expect, it } from 'vitest';
import { generateHarness, OUT_BEGIN, OUT_END, RET_PREFIX, ERR_PREFIX } from '../src/runner/harness.ts';
import type { Check } from '../src/kata/types.ts';

describe('generateHarness', () => {
  it('emits Main.main(new String[0]) for a stdout check and the output sentinels', () => {
    const src = generateHarness('Main', [{ type: 'stdout', expected: 'x' }]);
    expect(src).toContain('Main.main(new String[0]);');
    expect(src).toContain(OUT_BEGIN);
    expect(src).toContain(OUT_END);
    expect(src).toContain(RET_PREFIX);
    expect(src).toContain(ERR_PREFIX);
    expect(src).toContain('public class KataRunner');
  });

  it('generates a typed method call for a return check', () => {
    const checks: Check[] = [{ type: 'return', method: 'sum', cases: [{ args: [[1, 2, 3]], expected: 6 }] }];
    const src = generateHarness('Main', checks);
    expect(src).toContain('rets.add(toJson(Main.sum(new int[]{1, 2, 3})));');
  });

  it('infers an empty array element type from a sibling case', () => {
    const checks: Check[] = [{
      type: 'return', method: 'sum',
      cases: [{ args: [[1, 2]], expected: 3 }, { args: [[]], expected: 0 }],
    }];
    const src = generateHarness('Main', checks);
    expect(src).toContain('Main.sum(new int[]{})');
  });

  it('defaults an all-empty-array argument to int[]', () => {
    const checks: Check[] = [{ type: 'return', method: 'sum', cases: [{ args: [[]], expected: 0 }] }];
    const src = generateHarness('Main', checks);
    expect(src).toContain('Main.sum(new int[]{})');
  });

  it('applies the L suffix for long-wrapper args', () => {
    const checks: Check[] = [{
      type: 'return', method: 'echo',
      cases: [{ args: [{ type: 'long', value: '9007199254740993' }], expected: { type: 'long', value: 9007199254740994 } }],
    }];
    const src = generateHarness('Main', checks);
    expect(src).toContain('Main.echo(9007199254740993L)');
  });

  it('applies the f suffix for float-wrapper args', () => {
    const checks: Check[] = [{ type: 'return', method: 'echo', cases: [{ args: [{ type: 'float', value: '3.5' }], expected: { type: 'float', value: 3.5 } }] }];
    const src = generateHarness('Main', checks);
    expect(src).toContain('Main.echo(3.5f)');
  });

  it('generates a char literal for char-wrapper args', () => {
    const checks: Check[] = [{ type: 'return', method: 'upper', cases: [{ args: [{ type: 'char', value: 'a' }], expected: { type: 'char', value: 'A' } }] }];
    const src = generateHarness('Main', checks);
    expect(src).toContain("Main.upper('a')");
  });

  it('generates a boolean and null literal', () => {
    const checks: Check[] = [{
      type: 'return', method: 'echo',
      cases: [{ args: [true], expected: true }, { args: [null], expected: null }],
    }];
    const src = generateHarness('Main', checks);
    expect(src).toContain('Main.echo(true)');
    expect(src).toContain('Main.echo(null)');
  });

  it('escapes strings: quotes, backslash, newline, and unicode', () => {
    const checks: Check[] = [{
      type: 'return', method: 'echo',
      cases: [{ args: ['he said "hi"\n\\ünïcode'], expected: 'x' }],
    }];
    const src = generateHarness('Main', checks);
    expect(src).toContain('Main.echo("he said \\"hi\\"\\n\\\\\\u00fcn\\u00efcode")');
  });

  it('generates method calls in the order checks/cases appear (for RunResult.returns ordering)', () => {
    const checks: Check[] = [{
      type: 'return', method: 'sum',
      cases: [{ args: [1, 2], expected: 3 }, { args: [2, 2], expected: 4 }],
    }];
    const src = generateHarness('Main', checks);
    const first = src.indexOf('Main.sum(1, 2)');
    const second = src.indexOf('Main.sum(2, 2)');
    expect(first).toBeGreaterThan(-1);
    expect(second).toBeGreaterThan(first);
  });
});
