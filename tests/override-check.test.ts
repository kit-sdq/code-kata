import { describe, it, expect } from 'vitest';
import { parseKata } from '../src/kata/parse.ts';
import type { CodeKata } from '../src/kata/types.ts';

// Opt-in @Override check (tools/override-check, public/override-check.jar). The processor
// itself is tested with javac by tools/override-check/test.sh; this file covers the wiring.

const katas = import.meta.glob('../katas/10-*.md', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const statics = import.meta.glob(['../public/sandbox-worker.js', '../public/sandbox.js', '../src/runner/runner.ts'], { query: '?raw', import: 'default', eager: true }) as Record<string, string>;
const jar = import.meta.glob('../public/override-check.jar');
const readFileSync = (path: string): string => {
  const text = katas['../' + path] ?? statics['../' + path];
  if (text === undefined) throw new Error('not loaded: ' + path);
  return text;
};

function codeKata(extra: string): string {
  return `---
id: 1
title: T
type: code
difficulty: easy
${extra}checks:
  - type: stdout
    expected: "1"
---
Body.

\`\`\`java template
public class Main {
    public static void main(String[] args) {
        System.out.println(1);
    }
}
\`\`\`
`;
}

describe('requireOverride frontmatter', () => {
  it('defaults to false', () => {
    expect((parseKata(codeKata(''), 'k') as CodeKata).requireOverride).toBe(false);
  });

  it('is true when set to true', () => {
    expect((parseKata(codeKata('requireOverride: true\n'), 'k') as CodeKata).requireOverride).toBe(true);
  });

  it('rejects a non-boolean value', () => {
    expect(() => parseKata(codeKata('requireOverride: "yes"\n'), 'k')).toThrow(/requireOverride/);
  });
});

describe('inheritance katas that ask for an override opt in', () => {
  for (const slug of ['10-describe-ueberschreiben', '10-abstrakte-klasse', '10-typpruefung-ersetzen']) {
    it(slug, () => {
      const kata = parseKata(readFileSync(`katas/${slug}.md`), slug) as CodeKata;
      expect(kata.requireOverride).toBe(true);
    });
  }

  it('the Magazine kata (no override written by the student) does not opt in', () => {
    const kata = parseKata(readFileSync('katas/10-unterklasse-magazine.md'), '10-unterklasse-magazine') as CodeKata;
    expect(kata.requireOverride).toBe(false);
  });
});

describe('sandbox wiring', () => {
  const worker = readFileSync('public/sandbox-worker.js');
  const sandbox = readFileSync('public/sandbox.js');
  const runner = readFileSync('src/runner/runner.ts');

  it('ships the processor jar', () => {
    expect(Object.keys(jar)).toEqual(['../public/override-check.jar']);
  });

  it('passes requireOverride from the runner through the iframe to the worker', () => {
    expect(runner).toMatch(/requireOverride: req\.requireOverride === true/);
    expect(sandbox).toMatch(/requireOverride: msg\.requireOverride === true/);
    expect(worker).toMatch(/const \{ source, mainClass, harnessSource, requireOverride \} = event\.data/);
  });

  it('adds the processor arguments to javac only when requested', () => {
    expect(worker).toContain("['-processorpath', OVERRIDE_CHECK_JAR, '-processor', 'OverrideCheck']");
    expect(worker).toMatch(/requireOverride \? OVERRIDE_CHECK_ARGS\.concat\(\[srcMain, srcHarness\]\) : \[srcMain, srcHarness\]/);
  });
});
