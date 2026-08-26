---
type: concept
title: Kata Task Format
description: Authoritative reference for the katas/*.md format — YAML frontmatter schema per task type (text/choice/code), the java template block with BEGIN/END EDIT locked regions, allowedImports whitelist semantics, and stdout/return checks with the JavaValue wrapper form.
tags: [kata-format, frontmatter, yaml, task-schema, java-template, locked-regions, allowedImports, checks, java-value]
verified:
  - by: openwiki/0.4.0
    at: 2026-08-26T15:48:44.789Z
sources:
  - id: openwiki-source-eb5a1d137ac29811903e4260
    resource: repo://docs/CONTRACT.md
  - id: openwiki-source-3b60e9b0c1c49930bb475848
    resource: repo://docs/TASK_FORMAT.md
  - id: openwiki-source-d9e73824739975a9c338495e
    resource: repo://katas/sum-array.md
  - id: openwiki-source-9fbb08b35449890bfbb8ae22
    resource: repo://src/check/imports.ts
  - id: openwiki-source-55a6927c4cf6776b9e36ca0a
    resource: repo://src/check/normalize.ts
  - id: openwiki-source-3e6e3f27f99c251c5238a95a
    resource: repo://src/editor/regions.ts
  - id: openwiki-source-28cf1793f71c4de8ab3f0467
    resource: repo://src/kata/load.ts
  - id: openwiki-source-f31a6c84aa9763f62effdf8d
    resource: repo://src/kata/parse.ts
  - id: openwiki-source-0a53048ec6b70f2b3a035c55
    resource: repo://src/kata/types.ts
generated: {by: "openwiki/0.4.0", at: "2026-08-26T15:48:44.789Z"}
---

# Kata Task Format

A **kata** is a single exercise file living at `katas/<id>.md`. Each file is a
YAML frontmatter block followed by a Markdown body. The frontmatter selects one
of three task types — `text`, `choice`, or `code` — and supplies the grading
data for that type; the body is the prose shown to the learner (with, for code
katas, a trailing starter-code block extracted out before rendering).

This page is the format reference an author reads to **add or modify a kata**.
The long-form human spec is
[`docs/TASK_FORMAT.md`](../../docs/TASK_FORMAT.md); this page mirrors it but
keeps the code as the source of truth. When the prose docs and the code
disagree, **the code wins**: the authoritative TypeScript shape is
[`src/kata/types.ts`](../../src/kata/types.ts) and the authoritative
parsing/validation/defaults are in [`src/kata/parse.ts`](../../src/kata/parse.ts).

<!-- openwiki: mermaid parse failed and this diagram was converted to a text fence so it does not break rendering. Fix the diagram source and restore the mermaid fence. Parser error: Lexical error on line 5. Unrecognized text. ...emoved)"] P ->|"```java template```"| -->
```text
flowchart TD
  R["katas/<id>.md (raw text)"] --> P["parseKata(raw, fallbackId)"]
  P -->|"YAML frontmatter"| FM["js-yaml.load"]
  P -->|"body"| B["Markdown body (template removed)"]
  P -->|"```java template```"| T["template string → CodeKata.template"]
  FM --> D{"type"}
  D -->|text| TX["TextKata: answers + match"]
  D -->|choice| CH["ChoiceKata: options + multiple + shuffle"]
  D -->|code| CO["CodeKata: mainClass + allowedImports + checks"]
  TX --> K["Kata"]
  CH --> K
  CO --> K
```

*One file → one `Kata`. `parseKata` loads the frontmatter with js-yaml, splits
the trailing `java template` block out of the body, then dispatches on `type`
to a per-type parser that validates and applies defaults.*

## The shared `Kata` type

Every parsed kata is one of three interfaces, all extending `KataBase`
([`src/kata/types.ts`](../../src/kata/types.ts)):

```ts
export type Difficulty = 'easy' | 'medium' | 'hard';
export interface Match { mode: 'normalized' | 'exact' | 'regex'; caseSensitive: boolean }
export interface KataBase {
  id: string; title: string; difficulty: Difficulty; tags: string[];
  hints: string[]; body: string;           // markdown, template block removed
}
export interface TextKata extends KataBase { type: 'text'; answers: string[]; match: Match }
export interface ChoiceKata extends KataBase {
  type: 'choice'; multiple: boolean; shuffle: boolean;
  options: { text: string; correct: boolean }[];
}
export interface CodeKata extends KataBase {
  type: 'code'; mainClass: string; allowedImports: string[];
  timeoutMs: number; template: string; checks: Check[];
}
export type Kata = TextKata | ChoiceKata | CodeKata;
```

The parsed `Kata` is the in-memory shape the rest of the app consumes; the UI
does not re-read the raw `.md`. A validation error anywhere in `parseKata`
throws with a message prefixed by the kata `id`, and the loader
([`src/kata/load.ts`](../../src/kata/load.ts)) logs the failure and **skips
that kata** rather than crashing the build — so a malformed kata disappears
from the list instead of breaking the site.

## Parsing pipeline

`parseKata(raw, fallbackId)` ([`src/kata/parse.ts`](../../src/kata/parse.ts))
runs a fixed sequence:

1. **Frontmatter** — match `^---\r?\n([\s\S]*?)\r?\n---\r?\n` at the very start
   of the file. Missing leading `---` block throws "missing YAML frontmatter".
   The captured YAML is loaded with `js-yaml` and must parse to a mapping.
2. **Common fields** — `id`, `title`, `type`, `difficulty`, `tags`, `hints`
   (see table below).
3. **Template extraction** — *before* dispatching on `type`, the body is
   scanned for the ` ```java template ` fenced block (see
   [Code template block](#code-template-block-locked-regions-and-re-validation)).
   If found it is captured into `template` and **removed from `body`**; `body`
   is then trimmed.
4. **Type dispatch** — `text`/`choice`/`code` route to the per-type parser,
   which validates type-specific fields, applies defaults, and returns the
   fully-formed `Kata`.

The template is extracted in the common phase, so the `body` handed to all
types is already template-free — but only `code` katas actually use `template`
(and a code kata with no template block is a hard error).

## Common frontmatter fields

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `id` | string | no | filename without `.md` | `fallbackId` passed by the loader; unique across `katas/` |
| `title` | string | yes | — | Shown in list + task view |
| `type` | `'text' \| 'choice' \| 'code'` | yes | — | Selects the rest of the schema |
| `difficulty` | `'easy' \| 'medium' \| 'hard'` | yes | — | Shown as a badge; **not optional** — a missing/invalid value throws |
| `tags` | string[] | no | `[]` | Free-form badges, filterable |
| `hints` | string[] | no | `[]` | Ordered; revealed one at a time on request |

Defaulting and validation details (from `parse.ts`):

- `id` uses `fallbackId` unless frontmatter gives a non-empty string. The
  loader ([`src/kata/load.ts`](../../src/kata/load.ts)) derives `fallbackId`
  as `filename.replace(/\.md$/, '')` — i.e. the basename minus extension — so a
  file at `katas/fizzbuzz.md` defaults to `id: "fizzbuzz"`.
- `title` is strictly required: a missing or empty string throws
  `<id>: missing required field "title"`.
- `type` is strictly required and must be exactly `text`, `choice`, or `code`.
- `difficulty` is **required** in the code (unlike `tags`/`hints`, it has no
  `[]` default): any value other than the three allowed literals throws
  `<id>: "difficulty" must be one of easy|medium|hard`.
- `tags` and `hints` default to `[]` when absent; if present they must be
  arrays of strings (`parseStringArray`), else they throw.

### Hints and progress persistence

Hints are an ordered list revealed incrementally. On an incorrect submission
the attempt counter increments; once `attempts >= 1` and unrevealed hints
remain, a "Reveal hint" button appears. Each click reveals exactly the next
hint in list order (never random, never more than one at a time). Revealed
count, attempt count, and solved state persist per kata `id` in `localStorage`
under `kata-progress:v1` as
`{ [id]: { solved: boolean; attempts: number; hintsRevealed: number } }`.
Because `shuffle` randomizes option order on every render, **never refer to
option position in a task body** (e.g. "the first option") — refer to option
text instead.

## `type: text`

A free-text answer graded against a candidate list.

```yaml
answers: ["final", "the final keyword"]   # required, non-empty; any match = correct
match:                                     # optional
  mode: normalized                         # normalized | exact | regex (default: normalized)
  caseSensitive: false                     # default: false
```

| Field | Type | Required | Default |
|---|---|---|---|
| `answers` | string[] (non-empty) | yes | — |
| `match.mode` | `'normalized' \| 'exact' \| 'regex'` | no | `normalized` |
| `match.caseSensitive` | boolean | no | `false` |

Validation (`parseTextKata`): `answers` must be a non-empty array of strings,
else `<id>: text kata requires a non-empty "answers" array of strings`. `match`
defaults to `{}` and must be a mapping; `mode` defaults to `'normalized'` and
must be one of the three literals; `caseSensitive` is `true` only when
explicitly `true` (so any falsy/absent value is `false`).

A submission is correct if it matches **any** entry in `answers` under the
configured mode. Matching is implemented in
[`src/check/normalize.ts`](../../src/check/normalize.ts) `matchText`:

- **`normalized`** — trim, collapse internal whitespace runs to a single space,
  and lowercase (unless `caseSensitive: true`, which skips the lowercasing but
  still trims/collapses). Correct iff any answer's normalized form equals the
  input's normalized form.
- **`exact`** — raw string equality after trimming only leading/trailing
  whitespace. `caseSensitive: false` folds case but does **not** collapse
  internal whitespace; `caseSensitive: true` compares verbatim.
- **`regex`** — each `answers` entry is a regular expression **full-matched**
  (anchored `^(?:pattern)$`, not `.search()`) against the trimmed input.
  `caseSensitive: false` (the default) applies the `i` flag.

## `type: choice`

A multiple-choice / multi-select question.

```yaml
multiple: false      # optional, default false: single- vs multi-select
shuffle: true        # optional, default true: shuffle option order per render
options:             # required, non-empty, at least one with correct: true
  - text: "`int` is a primitive"   # inline Markdown allowed
    correct: true
  - text: "`String` is a primitive"
    correct: false
```

| Field | Type | Required | Default |
|---|---|---|---|
| `multiple` | boolean | no | `false` |
| `shuffle` | boolean | no | `true` |
| `options[].text` | string (inline Markdown) | yes | — |
| `options[].correct` | boolean | yes | — |

Validation (`parseChoiceKata`):

- `options` must be a non-empty array.
- Each option **must** have both `text` (string) and `correct` (boolean), else
  `<id>: option <i> malformed — requires "text" (string) and "correct" (boolean)`.
- At least one option must have `correct: true`, else
  `<id>: choice kata requires at least one correct option`.
- `multiple` defaults to `false` (`fm.multiple === true`); `shuffle` defaults
  to `true` (`fm.shuffle !== false`, so only an explicit `false` disables it).

Grading semantics:

- **`multiple: false`** (single-select): exactly one option may be selected;
  correct iff the selected option's `correct` is `true`. Exactly one option
  should carry `correct: true`.
- **`multiple: true`** (multi-select): any number of options may be selected;
  correct **iff the set of selected options exactly equals the set of options
  with `correct: true`** — no partial credit. Extra selections and missed
  selections both count as incorrect.
- **`shuffle: true`** (default): option display order is randomized on each
  render, independent of frontmatter order.

## `type: code`

A Java programming task graded by compiling and running the learner's code in
the browser and comparing output / return values against `checks`.

```yaml
mainClass: Main             # optional, default: Main
allowedImports:              # whitelist; java.lang implicit; empty list = no imports
  - java.util.*              # trailing .* = package wildcard
  - java.util.Scanner        # or exact class
timeoutMs: 5000              # optional, default: 5000 (run timeout, ms)
checks:                      # required, non-empty
  - type: stdout
    expected: |
      1
      2
      Fizz
  - type: return
    method: add              # static method on mainClass
    cases:
      - args: [1, 2]
        expected: 3
      - args: [{type: long, value: 9007199254740993}]
        expected: {type: long, value: 9007199254740994}
```

| Field | Type | Required | Default |
|---|---|---|---|
| `mainClass` | string | no | `Main` |
| `allowedImports` | string[] | no | `[]` (empty = no imports allowed) |
| `timeoutMs` | number (ms) | no | `5000` |
| `checks` | `Check[]` (non-empty) | yes | — |
| template block | ` ```java template ` | yes (for code) | — |

Validation (`parseCodeKata`):

- A code kata **requires** a fenced ` ```java template ` block in the body —
  `!template` throws
  `<id>: code kata requires a fenced \`\`\`java template block in the body`.
  This is the one type-specific hard requirement on the body.
- `mainClass` defaults to `'Main'` (any non-empty string overrides).
- `allowedImports` is parsed with `parseStringArray`, so it **defaults to `[]`
  when absent** — note this is more lenient than the prose docs, which call it
  "required"; the code treats an absent list as "no imports allowed at all".
- `timeoutMs` defaults to `5000`; a supplied value must be a number `> 0` or it
  falls back to `5000`.
- `checks` must be a non-empty array; each check is validated by `parseChecks`.

### `checks`

Two check types, defined by the `Check` union in
[`src/kata/types.ts`](../../src/kata/types.ts):

```ts
export type Check =
  | { type: 'stdout'; expected: string }
  | { type: 'return'; method: string; cases: { args: JavaValue[]; expected: JavaValue }[] };
```

**`stdout`** — `expected` (a string, required) is compared to the program's
captured `System.out` output from calling `Main.main(new String[0])`. Both
sides are normalized by `normalizeStdout`
([`src/check/normalize.ts`](../../src/check/normalize.ts)): CRLF → LF, each
line's trailing whitespace stripped, and trailing blank lines at the end of the
whole output stripped. Comparison is otherwise exact — whitespace *within* a
line and blank lines in the middle of output are significant. A check of
unknown `type` throws `<id>: check <i> has unknown "type" (expected stdout|return)`.

**`return`** — `method` names a `static` method on `mainClass`, invoked
directly (not via `main`) once per entry in `cases`, bypassing `main`
entirely. `method` must be a non-empty string; `cases` must be a non-empty
array; each case must have an `args` array and an `expected` value. The
harness code-generates a typed Java call (e.g. `Main.add(1, 2)`) and compares
its JSON-serialized return value to the case's `expected`, one pass/fail per
case. Each case's `args` is a list of `JavaValue` and `expected` is a single
`JavaValue`.

The grading pipeline that consumes these checks (harness codegen, CheerpJ
compile/run, sentinel parsing, `verifyResult`) is documented in
[/openwiki/concepts/harness-codegen.md](harness-codegen.md).

### `JavaValue` wrapper form

`args` and `expected` values are `JavaValue`
([`src/kata/types.ts`](../../src/kata/types.ts)):

```ts
export type JavaValue =
  | number | boolean | string | null
  | JavaValue[]
  | { type: 'long' | 'float' | 'char' | 'double' | 'int'; value: number | string };
```

Plain JS/JSON values are used directly when the representation is unambiguous
(`int`, `double`, `boolean`, `String`, `null`, and 1-D arrays of those). The
**wrapper form** `{ type, value }` is required whenever a plain JSON number
would be ambiguous or lossy:

- **`long`** — JS numbers lose precision above 2^53. Use
  `{type: long, value: 9007199254740993}`; `value` may be a number or a numeric
  string to preserve full precision.
- **`float`** — to force 32-bit float semantics instead of Java `double`, e.g.
  `{type: float, value: 3.14}`.
- **`char`** — JSON has no character type, e.g. `{type: char, value: "a"}` (or
  a numeric code point).
- **`int`/`double`** wrapper forms are also accepted (for symmetry /
  explicitness) but not required, since plain JSON numbers map to them
  unambiguously in typical ranges.

**1-D arrays** of any of the above are supported as a JS array whose elements
are plain values or wrapper objects — e.g. `args: [[1, 2, 3]]` for an `int[]`
parameter, or `[[{type: long, value: "10000000000"}, {type: long, value: "2"}]]`
for a `long[]`. Multi-dimensional arrays are **not** supported.

For a worked `return` check with arrays, see the `sum-array` example below.

### `allowedImports` semantics

The whitelist is enforced by `src/check/imports.ts` against the **full
reassembled submitted source**, after stripping comments, string/char literals,
and text blocks — so a banned token inside a comment or string literal never
triggers a violation; only real code tokens do.

- An entry with no trailing `.*` is an **exact class** match
  (`java.util.Scanner` allows only that class).
- An entry ending in `.*` is a **package wildcard** covering only classes
  declared directly in that package — **not subpackages**. `java.util.*` allows
  `java.util.List` but not `java.util.concurrent.Executor`.
- `java.lang` needs no import and is **always implicitly allowed**, except for
  the specific hard-banned members below.
- Every `import` (including `import static`) must match the whitelist
  (`kind: 'import'` violation) and, independently, any dotted FQN token
  starting `java.`, `javax.`, `jakarta.`, `sun.`, `jdk.`, `com.`, `org.`, `net.`,
  or `io.` must also match it even with no `import` statement (`kind: 'fqn'`
  violation, catching e.g. `new java.io.File(...)` used inline).
- `allowedImports: []` (or omitted, which defaults to `[]`) means **no imports
  and no FQN references** outside `java.lang` at all — appropriate for
  self-contained katas (`fizzbuzz`, `sum-array`) that only need core language
  features.

A **hard ban list** is always enforced regardless of `allowedImports`, to keep
submissions inside the side-effect-free JVM-in-WASM sandbox: `java.lang.reflect`,
`Class.forName`, `ClassLoader`, `MethodHandles`, `Runtime.getRuntime`,
`ProcessBuilder`/`ProcessHandle`, `System.exit`/`System.load`, `Unsafe`, ad-hoc
thread/executor creation (`new Thread`, `Executors`), and the whole packages
`java.io`, `java.net`, `java.nio`, `javax.*`, `sun.*`, `jdk.*`. The ban list
wins over the whitelist unconditionally for its core set (reflection, `Runtime`,
`ProcessBuilder`, `System.exit`/`load`, `Unsafe`, `ClassLoader`); a kata author
cannot re-permit these. The import/FQN validator and the broader sandbox safety
model are covered in
[/openwiki/concepts/safety-model.md](safety-model.md).

## Code template block, locked regions, and re-validation

An optional fenced block with the **exact** info string ` ```java template `
supplies starter code for the editor. It is matched by
`/```java template\r?\n([\s\S]*?)```/` (so the info string is precisely
`java template`, three backticks immediately followed by `java template`). The
captured inner text becomes `CodeKata.template` and is **removed from `body`**
before rendering — it never appears as prose to the learner.

````
```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
````

Inside the template, lines that trim to exactly `// BEGIN EDIT` and
`// END EDIT` delimit an **editable region**; everything else is a **locked**
(read-only) segment. Segmentation is done by
[`src/editor/regions.ts`](../../src/editor/regions.ts) `parseTemplate`:

- Marker lines (`// BEGIN EDIT` / `// END EDIT`) are **stripped** from the
  result — they are pure authoring syntax, never visible to the learner.
- Regions may alternate freely (locked, editable, locked, editable, …); the
  parser walks line-by-line, flipping an `editable` flag at each marker, then
  coalesces consecutive same-mode lines into segments.
- If the template has **no markers at all**, `parseTemplate` returns a single
  editable segment covering the whole template — i.e. the entire document is
  editable.
- `initialDoc(segments)` reassembles the segments into the editor's starting
  document (segments joined with `\n`).

The editor (CodeMirror 6, [`src/editor/editor.ts`](../../src/editor/editor.ts))
enforces locked ranges live via a transaction/change filter that tracks locked
ranges through edits, so a learner cannot type into or delete a locked segment
through normal interaction. Because client-side enforcement can be bypassed
out-of-band, the reassembled full source is **re-validated before every run**
by `validateLocked(source, segments)`: every locked segment's text must still
occur verbatim, **in order, and non-overlapping** in the submitted source (it
uses `indexOf(seg.text, pos)` with a moving cursor). If this fails, the run is
refused with an error — identical treatment to a failed import check — and
nothing is sent to the sandbox.

> **Authoring tip:** keep locked segments minimal and exact. Any incidental
> whitespace or comment inside a locked segment becomes part of the verbatim
> string that must reappear unchanged in the submission.

The template also drives the editor segmentation and the harness codegen; see
[/openwiki/concepts/harness-codegen.md](harness-codegen.md) for how the
reassembled source is fed to the runner, and
[/openwiki/workflows/kata-lifecycle.md](../workflows/kata-lifecycle.md) for the
full author → build → deploy flow.

## Complete minimal examples

These mirror [`docs/TASK_FORMAT.md`](../../docs/TASK_FORMAT.md) and match the
real katas in `katas/`.

### `text` — `keyword-final.md`

````markdown
---
title: The final keyword
type: text
difficulty: easy
tags: [keywords, basics]
answers: ["final", "the final keyword"]
match:
  mode: normalized
  caseSensitive: false
hints:
  - "The keyword also applies to classes (preventing subclassing) and methods (preventing overriding)."
  - "It starts with the letter f and has 5 letters."
---

Which Java keyword, when applied to a local variable or field, makes it
unassignable after it has been initialized once?

Type the keyword in the box below.
````

### `choice` — `primitives.md`

````markdown
---
title: Primitive types
type: choice
difficulty: easy
tags: [types, basics]
multiple: true
shuffle: true
options:
  - text: "`int`"
    correct: true
  - text: "`boolean`"
    correct: true
  - text: "`double`"
    correct: true
  - text: "`char`"
    correct: true
  - text: "`String`"
    correct: false
  - text: "`Integer`"
    correct: false
hints:
  - "Java has exactly eight primitive types: byte, short, int, long, float, double, boolean, char."
  - "`String` and `Integer` are classes (reference types), not primitives — that's why they can be `null`."
---

Select **all** of the following that are Java primitive types (as opposed to
reference types).
````

### `code` — `fizzbuzz.md` (stdout check) and `sum-array.md` (return check)

`fizzbuzz.md` is a `stdout`-check code kata with an empty whitelist and a
template that locks the class/method scaffold and leaves only the method body
editable:

````markdown
---
title: FizzBuzz
type: code
difficulty: medium
tags: [loops, conditionals]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      1
      2
      Fizz
      4
      Buzz
      Fizz
      7
      8
      Fizz
      Buzz
      11
      Fizz
      13
      14
      FizzBuzz
hints:
  - "Loop from 1 to 15 (inclusive) with a `for` loop."
  - "Check divisibility by 15 first (or check both 3 and 5), otherwise `Fizz`/`Buzz` alone will print for the wrong numbers."
  - "Use `System.out.println` for each line — the number if neither condition applies."
---

Implement the classic **FizzBuzz** kata.

Print the numbers from 1 to 15, one per line, except:

- for multiples of 3, print `Fizz` instead of the number,
- for multiples of 5, print `Buzz` instead of the number,
- for multiples of both 3 and 5, print `FizzBuzz` instead of the number.

Write your solution inside the editable region of `main`. No imports are
needed (and none are allowed) for this task.

```java template
public class Main {
    public static void main(String[] args) {
        // BEGIN EDIT
        // your code here
        // END EDIT
    }
}
```
````

`sum-array.md` shows a `return` check whose `args` use a 1-D array literal —
`args: [[1, 2, 3]]` passes an `int[]`, and `expected` is a plain number:

````markdown
---
title: Sum an array
type: code
difficulty: easy
tags: [arrays, methods]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: sum
    cases:
      - args: [[1, 2, 3]]
        expected: 6
      - args: [[]]
        expected: 0
      - args: [[-1, 1]]
        expected: 0
      - args: [[10, 20, 30, 40]]
        expected: 100
hints:
  - "Start with a running total of 0 and add each element in a loop."
  - "An empty array should sum to 0 — make sure your loop handles zero elements correctly."
---

Implement the static method `sum` so that it returns the sum of all elements
in the given `int[]` array. An empty array should return `0`.

Only the method body needs to change; the class and method signature are
fixed. No imports are needed (and none are allowed) for this task.

```java template
public class Main {
    public static int sum(int[] numbers) {
        // BEGIN EDIT
        // your code here
        // END EDIT
    }
}
```
````

## Related pages

- [/openwiki/architecture/overview.md](../architecture/overview.md) — system map
  and the kata-discovery → render and submission → grade data flows.
- [/openwiki/concepts/harness-codegen.md](harness-codegen.md) — how `Check[]`
  drives per-run `KataRunner.java` codegen, sentinel capture, and
  `verifyResult` comparison.
- [/openwiki/concepts/safety-model.md](safety-model.md) — the sandbox, import
  ban list, and locked-region enforcement that gate code kata execution.
- [/openwiki/quickstart.md](../quickstart.md) — adding and running katas.
- [/openwiki/workflows/kata-lifecycle.md](../workflows/kata-lifecycle.md) —
  author → build → deploy lifecycle for a kata file.
