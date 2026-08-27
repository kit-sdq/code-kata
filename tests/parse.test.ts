import { describe, expect, it, vi } from 'vitest';
import { parseKata } from '../src/kata/parse.ts';
import type { ChoiceKata, CodeKata, TextKata } from '../src/kata/types.ts';

describe('parseKata — text', () => {
  it('parses a valid text kata with defaults', () => {
    const raw = `---
id: 1
category: basics
title: The final keyword
type: text
difficulty: easy
tags: [keywords]
answers: ["final"]
hints: ["hint one"]
---
What keyword?
`;
    const k = parseKata(raw, 'keyword-final') as TextKata;
    expect(k.slug).toBe('keyword-final');
    expect(k.id).toBe('1');
    expect(k.category).toBe('basics');
    expect(k.type).toBe('text');
    expect(k.title).toBe('The final keyword');
    expect(k.answers).toEqual(['final']);
    expect(k.match).toEqual({ mode: 'normalized', caseSensitive: false });
    expect(k.body.trim()).toBe('What keyword?');
  });

  it('normalizes a numeric YAML id to a string', () => {
    const raw = `---
id: 2
category: basics
title: T
type: text
difficulty: easy
answers: ["x"]
---
body
`;
    const k = parseKata(raw, 'fallback');
    expect(k.id).toBe('2');
    expect(typeof k.id).toBe('string');
  });

  it('throws on missing id', () => {
    const raw = `---
category: basics
title: T
type: text
difficulty: easy
answers: ["x"]
---
body
`;
    expect(() => parseKata(raw, 'id')).toThrow();
  });

  it('defaults missing category to uncategorized and warns', () => {
    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const raw = `---
id: 1
title: T
type: text
difficulty: easy
answers: ["x"]
---
body
`;
    const k = parseKata(raw, 'id');
    expect(k.category).toBe('uncategorized');
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it('throws on missing answers', () => {
    const raw = `---
id: 1
category: basics
title: T
type: text
difficulty: easy
---
body
`;
    expect(() => parseKata(raw, 'id')).toThrow();
  });

  it('throws on missing frontmatter', () => {
    expect(() => parseKata('just some text', 'id')).toThrow();
  });

  it('throws on missing title', () => {
    const raw = `---
id: 1
category: basics
type: text
difficulty: easy
answers: ["x"]
---
body
`;
    expect(() => parseKata(raw, 'id')).toThrow();
  });
});

describe('parseKata — choice', () => {
  it('parses options and defaults', () => {
    const raw = `---
id: 1
category: basics
title: Primitives
type: choice
difficulty: easy
options:
  - text: "\`int\`"
    correct: true
  - text: "\`String\`"
    correct: false
---
Pick one.
`;
    const k = parseKata(raw, 'primitives') as ChoiceKata;
    expect(k.multiple).toBe(false);
    expect(k.shuffle).toBe(true);
    expect(k.options).toHaveLength(2);
    expect(k.options[0]).toEqual({ text: '`int`', correct: true });
  });

  it('throws when no option is correct', () => {
    const raw = `---
id: 1
category: basics
title: Primitives
type: choice
difficulty: easy
options:
  - text: "a"
    correct: false
---
body
`;
    expect(() => parseKata(raw, 'id')).toThrow();
  });
});

describe('parseKata — code', () => {
  it('extracts the template and removes it from the body', () => {
    const raw = `---
id: 1
category: basics
title: FizzBuzz
type: code
difficulty: medium
allowedImports: []
checks:
  - type: stdout
    expected: |
      1
---
Do the thing.

\`\`\`java template
public class Main {
    public static void main(String[] args) {
        // BEGIN EDIT
        // your code here
        // END EDIT
    }
}
\`\`\`
`;
    const k = parseKata(raw, 'fizzbuzz') as CodeKata;
    expect(k.type).toBe('code');
    expect(k.mainClass).toBe('Main');
    expect(k.template).toContain('// BEGIN EDIT');
    expect(k.template).toContain('public class Main');
    expect(k.body).not.toContain('```');
    expect(k.body.trim()).toBe('Do the thing.');
    expect(k.checks).toEqual([{ type: 'stdout', expected: '1\n' }]);
  });

  it('parses return checks with nested array args', () => {
    const raw = `---
id: 1
category: arrays
title: Sum
type: code
difficulty: easy
allowedImports: []
checks:
  - type: return
    method: sum
    cases:
      - args: [[1, 2, 3]]
        expected: 6
---
Body text.

\`\`\`java template
public class Main {
    public static int sum(int[] numbers) {
        // BEGIN EDIT
        // END EDIT
    }
}
\`\`\`
`;
    const k = parseKata(raw, 'sum-array') as CodeKata;
    expect(k.checks).toEqual([
      { type: 'return', method: 'sum', cases: [{ args: [[1, 2, 3]], expected: 6 }] },
    ]);
  });

  it('parses stdin and label on stdout checks, and supports multiple stdout checks', () => {
    const raw = `---
id: 1
category: basics
title: Sum two ints
type: code
difficulty: easy
allowedImports: [java.util.Scanner]
checks:
  - type: stdout
    label: small numbers
    stdin: "1 2\\n"
    expected: |
      3
  - type: stdout
    expected: |
      30
---
Body.

\`\`\`java template
public class Main {
    public static void main(String[] args) {}
}
\`\`\`
`;
    const k = parseKata(raw, 'sum-stdin') as CodeKata;
    expect(k.checks).toEqual([
      { type: 'stdout', label: 'small numbers', stdin: '1 2\n', expected: '3\n' },
      { type: 'stdout', expected: '30\n' },
    ]);
  });

  it('throws when a code kata has no template', () => {
    const raw = `---
id: 1
category: arrays
title: Sum
type: code
difficulty: easy
checks:
  - type: stdout
    expected: "1"
---
Body text, no template.
`;
    expect(() => parseKata(raw, 'id')).toThrow();
  });

  it('throws on missing checks', () => {
    const raw = `---
id: 1
category: arrays
title: Sum
type: code
difficulty: easy
---
Body.

\`\`\`java template
public class Main {}
\`\`\`
`;
    expect(() => parseKata(raw, 'id')).toThrow();
  });
});
