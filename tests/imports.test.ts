import { describe, it, expect } from 'vitest';
import { validateImports } from '../src/check/imports.ts';

describe('validateImports', () => {
  it('allows an exact whitelisted import', () => {
    const v = validateImports('import java.util.List;\nclass Main {}', ['java.util.List']);
    expect(v).toEqual([]);
  });

  it('allows a wildcard-whitelisted import', () => {
    const v = validateImports('import java.util.List;\nclass Main {}', ['java.util.*']);
    expect(v).toEqual([]);
  });

  it('wildcard does not cover a subpackage', () => {
    const v = validateImports('import java.util.concurrent.atomic.AtomicInteger;\nclass Main {}', ['java.util.*']);
    expect(v.length).toBe(1);
    expect(v[0].kind).toBe('import');
    expect(v[0].line).toBe(1);
  });

  it('rejects a disallowed import', () => {
    const v = validateImports('import java.util.List;\nclass Main {}', []);
    expect(v).toEqual([{ kind: 'import', token: 'java.util.List', line: 1, reason: expect.stringContaining('java.util.List') }]);
  });

  it('handles import static, checking the owning class against the whitelist', () => {
    const ok = validateImports('import static java.lang.Math.PI;\nclass Main {}', []);
    expect(ok).toEqual([]); // java.lang implicit

    const rejected = validateImports('import static java.util.Arrays.asList;\nclass Main {}', []);
    expect(rejected.length).toBe(1);
    expect(rejected[0].kind).toBe('import');
  });

  it('rejects FQN usage without an import', () => {
    const v = validateImports('class Main { void f() { new java.io.File("x"); } }', []);
    expect(v.some((x) => x.kind === 'banned' && x.token.startsWith('java.io'))).toBe(true);
  });

  it('allows FQN usage of a whitelisted class', () => {
    const v = validateImports('class Main { java.util.List<String> l; }', ['java.util.List']);
    expect(v).toEqual([]);
  });

  it('rejects banned tokens even when whitelisted', () => {
    const allowed = ['java.lang.Runtime', 'java.lang.ProcessBuilder', 'java.lang.System', 'java.lang.Class', 'java.lang.Thread'];
    const cases = [
      'class Main { void f() { Runtime.getRuntime().exec("x"); } }',
      'class Main { void f() { new ProcessBuilder("x").start(); } }',
      'class Main { void f() { System.exit(1); } }',
      'class Main { void f() { Class.forName("x"); } }',
      'class Main { void f() { new Thread(() -> {}).start(); } }',
    ];
    for (const src of cases) {
      const v = validateImports(src, allowed);
      expect(v.some((x) => x.kind === 'banned')).toBe(true);
    }
  });

  it('does not trigger on occurrences inside string literals', () => {
    const v = validateImports('class Main { String s = "import java.io.File; Runtime.getRuntime()"; }', []);
    expect(v).toEqual([]);
  });

  it('does not trigger on occurrences inside char literals', () => {
    const v = validateImports("class Main { char c = 'x'; }", []);
    expect(v).toEqual([]);
  });

  it('does not trigger on occurrences inside text blocks', () => {
    const src = 'class Main { String s = """\n    import java.io.File;\n    Runtime.getRuntime()\n    """; }';
    const v = validateImports(src, []);
    expect(v).toEqual([]);
  });

  it('does not trigger on occurrences inside line comments', () => {
    const v = validateImports('class Main { // import java.io.File; Runtime.getRuntime()\n void f() {} }', []);
    expect(v).toEqual([]);
  });

  it('does not trigger on occurrences inside block comments', () => {
    const v = validateImports('class Main { /* import java.io.File;\n Runtime.getRuntime() */ void f() {} }', []);
    expect(v).toEqual([]);
  });

  it('reports correct line numbers', () => {
    const src = ['class Main {', '  void f() {', '    Runtime.getRuntime();', '  }', '}'].join('\n');
    const v = validateImports(src, []);
    expect(v.find((x) => x.reason.includes('Runtime.getRuntime'))?.line).toBe(3);
  });

  it('allows java.lang usage without a whitelist entry', () => {
    const v = validateImports('class Main { void f() { java.lang.String s = null; } }', []);
    expect(v).toEqual([]);
  });
});
