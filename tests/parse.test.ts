import { describe, expect, it, vi } from 'vitest';
import { parseKata, parseMultilingualKata } from '../src/kata/parse.ts';
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

describe('parseMultilingualKata — frontmatter localization', () => {
  it('resolves plain (non-map) values identically for both languages', () => {
    const raw = `---
id: 1
category: basics
title: Shared title
type: text
difficulty: easy
answers: ["x"]
tags: [foo]
hints: ["h1"]
---
Shared body.
`;
    const { de, en } = parseMultilingualKata(raw, 'shared');
    expect(de.title).toBe('Shared title');
    expect(en.title).toBe('Shared title');
    expect(de.tags).toEqual(['foo']);
    expect(en.tags).toEqual(['foo']);
    expect(de.hints).toEqual(['h1']);
    expect(en.hints).toEqual(['h1']);
  });

  it('resolves {de, en} maps for title, hints, answers, tags', () => {
    const raw = `---
id: 1
category: basics
title: {de: Deutscher Titel, en: English title}
type: text
difficulty: easy
answers: {de: ["ja"], en: ["yes"]}
tags: {de: [schluessel], en: [keyword]}
hints: {de: ["Hinweis"], en: ["hint"]}
---
Body.
`;
    const { de, en } = parseMultilingualKata(raw, 'localized');
    expect(de.title).toBe('Deutscher Titel');
    expect(en.title).toBe('English title');
    expect((de as TextKata).answers).toEqual(['ja']);
    expect((en as TextKata).answers).toEqual(['yes']);
    expect(de.tags).toEqual(['schluessel']);
    expect(en.tags).toEqual(['keyword']);
    expect(de.hints).toEqual(['Hinweis']);
    expect(en.hints).toEqual(['hint']);
  });

  it('resolves localized options[].text and choice.correct stays shared', () => {
    const raw = `---
id: 1
category: basics
title: T
type: choice
difficulty: easy
options:
  - text: {de: "richtig", en: "correct"}
    correct: true
  - text: {de: "falsch", en: "wrong"}
    correct: false
---
Body.
`;
    const { de, en } = parseMultilingualKata(raw, 'choice-loc');
    expect((de as ChoiceKata).options[0]).toEqual({ text: 'richtig', correct: true });
    expect((en as ChoiceKata).options[0]).toEqual({ text: 'correct', correct: true });
  });

  it('resolves localized stdout expected/label, shared stdin', () => {
    const raw = `---
id: 1
category: basics
title: T
type: code
difficulty: easy
allowedImports: []
checks:
  - type: stdout
    label: {de: "Fall 1", en: "Case 1"}
    stdin: "shared\\n"
    expected: {de: "10", en: "10"}
---
Body.

\`\`\`java template
public class Main {}
\`\`\`
`;
    const { de, en } = parseMultilingualKata(raw, 'stdout-loc');
    expect((de as CodeKata).checks[0]).toEqual({ type: 'stdout', label: 'Fall 1', stdin: 'shared\n', expected: '10' });
    expect((en as CodeKata).checks[0]).toEqual({ type: 'stdout', label: 'Case 1', stdin: 'shared\n', expected: '10' });
  });

  it('throws when a localized map is missing the "en" key, naming the field', () => {
    const raw = `---
id: 1
category: basics
title: {de: "Nur Deutsch"}
type: text
difficulty: easy
answers: ["x"]
---
Body.
`;
    expect(() => parseMultilingualKata(raw, 'missing-en')).toThrow(/title/);
  });
});

describe('parseMultilingualKata — body sections', () => {
  it('treats content before any marker as shared', () => {
    const raw = `---
id: 1
category: basics
title: T
type: text
difficulty: easy
answers: ["x"]
---
Shared intro.
`;
    const { de, en } = parseMultilingualKata(raw, 'shared-body');
    expect(de.body.trim()).toBe('Shared intro.');
    expect(en.body.trim()).toBe('Shared intro.');
  });

  it('assembles interleaved de/en/all sections in document order, stripping markers', () => {
    const raw = `---
id: 1
category: basics
title: T
type: text
difficulty: easy
answers: ["x"]
---
Intro shared.
<!-- de -->
Deutscher Absatz.
<!-- en -->
English paragraph.
<!-- all -->
Outro shared.
`;
    const { de, en } = parseMultilingualKata(raw, 'interleaved-body');
    expect(de.body).not.toContain('<!--');
    expect(en.body).not.toContain('<!--');
    expect(de.body).toContain('Intro shared.');
    expect(de.body).toContain('Deutscher Absatz.');
    expect(de.body).not.toContain('English paragraph.');
    expect(de.body).toContain('Outro shared.');
    expect(en.body).toContain('Intro shared.');
    expect(en.body).toContain('English paragraph.');
    expect(en.body).not.toContain('Deutscher Absatz.');
    expect(en.body).toContain('Outro shared.');
  });
});

describe('parseMultilingualKata — code template', () => {
  it('shares a single template defined in an "all" section', () => {
    const raw = `---
id: 1
category: basics
title: T
type: code
difficulty: easy
allowedImports: []
checks:
  - type: stdout
    expected: "1"
---
Shared body.

\`\`\`java template
public class Main {}
\`\`\`
`;
    const { de, en } = parseMultilingualKata(raw, 'shared-template');
    expect((de as CodeKata).template).toContain('public class Main');
    expect((en as CodeKata).template).toBe((de as CodeKata).template);
  });

  it('supports a per-language template in each language section', () => {
    const raw = `---
id: 1
category: basics
title: T
type: code
difficulty: easy
allowedImports: []
checks:
  - type: stdout
    expected: "1"
---
<!-- de -->
Deutsche Beschreibung.

\`\`\`java template
public class Main {
    // BEGIN EDIT
    // DE
    // END EDIT
}
\`\`\`
<!-- en -->
English description.

\`\`\`java template
public class Main {
    // BEGIN EDIT
    // EN
    // END EDIT
}
\`\`\`
`;
    const { de, en } = parseMultilingualKata(raw, 'per-lang-template');
    expect((de as CodeKata).template).toContain('// DE');
    expect((en as CodeKata).template).toContain('// EN');
  });

  it('throws when only one language defines a template', () => {
    const raw = `---
id: 1
category: basics
title: T
type: code
difficulty: easy
allowedImports: []
checks:
  - type: stdout
    expected: "1"
---
<!-- de -->
Deutsche Beschreibung.

\`\`\`java template
public class Main {}
\`\`\`
<!-- en -->
English description, no template here.
`;
    expect(() => parseMultilingualKata(raw, 'missing-one-template')).toThrow();
  });
});
