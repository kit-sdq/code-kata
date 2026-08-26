# Kata Task Format

Formal specification of `katas/*.md`. Each file is YAML frontmatter followed
by a Markdown body. This document derives from and must stay consistent with
`src/kata/types.ts` (the authoritative TypeScript shape) — if they disagree,
the code in `docs/CONTRACT.md` / `types.ts` wins.

## File and common fields

- Filename: `katas/<id>.md`. `id` defaults to the filename (without `.md`)
  if not given explicitly in frontmatter.
- Body: everything after the frontmatter, rendered as Markdown (task
  description, shown to the learner). For `code` katas, the trailing
  template code block (see below) is extracted out of the body before
  rendering — it does not appear as prose.

| Field | Type | Required | Default | Notes |
|---|---|---|---|---|
| `id` | string | no | filename without `.md` | Must be unique across `katas/` |
| `title` | string | yes | — | Shown in list + task view |
| `type` | `'text' \| 'choice' \| 'code'` | yes | — | Selects the rest of the schema |
| `difficulty` | `'easy' \| 'medium' \| 'hard'` | yes | — | Shown as a badge |
| `tags` | string[] | no | `[]` | Free-form, shown as badges, filterable |
| `hints` | string[] | no | `[]` | Ordered; revealed one at a time on request |

Hints behavior: on an incorrect submission, the attempt counter increments;
once `attempts >= 1` and unrevealed hints remain, a "Reveal hint" button
appears. Each click reveals exactly the next hint in list order (never
random, never more than one at a time). Revealed count, attempt count, and
solved state persist per kata `id` in `localStorage` under `kata-progress:v1`
as `{ [id]: { solved: boolean; attempts: number; hintsRevealed: number } }`.

## `type: text`

```yaml
answers: ["final", "the final keyword"]   # required, non-empty; any match = correct
match:                                     # optional
  mode: normalized                         # normalized | exact | regex (default: normalized)
  caseSensitive: false                     # default: false
```

| Field | Type | Required | Default |
|---|---|---|---|
| `answers` | string[] | yes | — |
| `match.mode` | `'normalized' \| 'exact' \| 'regex'` | no | `normalized` |
| `match.caseSensitive` | boolean | no | `false` |

Matching modes (`src/check/normalize.ts`):

- **`normalized`**: both the learner's input and each candidate answer are
  trimmed, internal whitespace runs collapsed to a single space, and
  lowercased unless `caseSensitive: true`. Correct if any answer's normalized
  form equals the input's normalized form.
- **`exact`**: raw string equality after trimming only leading/trailing
  whitespace (no case folding, no internal whitespace collapsing) — unless
  `caseSensitive: false` is set, which folds case but still does not collapse
  internal whitespace.
- **`regex`**: each entry of `answers` is treated as a regular expression and
  full-matched (anchored start to end, not `.search()`) against the trimmed
  learner input. `caseSensitive: false` (the default) applies the `i` flag.

A submission is correct if it matches **any** entry in `answers` under the
configured mode.

## `type: choice`

```yaml
multiple: false      # optional, default false: single- vs multi-select
shuffle: true         # optional, default true: shuffle option order per render
options:              # required, at least one option must have correct: true
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

Semantics:

- `multiple: false` (single-select): exactly one option may be selected;
  correct iff the selected option's `correct` is `true`. Exactly one option
  should have `correct: true`.
- `multiple: true`: any number of options may be selected (checkboxes);
  correct **iff the set of selected options exactly equals the set of options
  with `correct: true`** — no partial credit, extra selections and missed
  selections both count as incorrect.
- `shuffle: true` (default): option display order is randomized on each
  render (each visit/attempt), independent of frontmatter order — do not
  depend on option order for anything (e.g. don't say "the first option" in
  the task body).

## `type: code`

```yaml
mainClass: Main             # optional, default: Main
allowedImports:              # required; whitelist of imports the submission may use
  - java.util.*               # trailing ".*" = package wildcard
  - java.util.Scanner          # or an exact class
timeoutMs: 5000               # optional, default: 5000 (run timeout, ms)
checks:                       # required, at least one check
  - type: stdout
    expected: |
      1
      2
      Fizz
  - type: return
    method: add                # static method on mainClass
    cases:
      - args: [1, 2]
        expected: 3
      - args: [{type: long, value: 9007199254740993}]
        expected: {type: long, value: 9007199254740994}
```

| Field | Type | Required | Default |
|---|---|---|---|
| `mainClass` | string | no | `Main` |
| `allowedImports` | string[] | yes | — (empty array `[]` = no imports allowed at all) |
| `timeoutMs` | number (ms) | no | `5000` |
| `checks` | `Check[]`, non-empty | yes | — |
| template block | see below | no | if absent, entire editor doc is editable |

### `allowedImports` semantics

Validated by `src/check/imports.ts` against the full reassembled submitted
source, **after** stripping comments, string/char literals, and text blocks
(so a banned token inside a comment or a string literal never triggers a
violation — only real code tokens do).

- An entry with no trailing `.*` is an **exact class** match, e.g.
  `java.util.Scanner` allows only that one class, not `java.util.*`.
- An entry ending in `.*` is a **package wildcard** and covers only classes
  declared directly in that package — **not subpackages**. `java.util.*`
  allows `java.util.List` but does **not** allow `java.util.concurrent.Executor`
  (different package).
- `java.lang` needs no import and is **always implicitly allowed** (it's
  implicit in Java itself), except for the specific `java.lang.*` members on
  the hard-ban list below (e.g. `java.lang.Runtime`,
  `java.lang.reflect.*`), which remain banned regardless.
- Every `import` statement (including `import static`) in the submission
  must match the whitelist (exact class or covering wildcard) or the
  submission is rejected before compilation — `kind: 'import'` violation.
- Independently, the source is scanned for **fully-qualified name (FQN)
  bypass**: any dotted token starting with `java.`, `javax.`, `jakarta.`,
  `sun.`, `jdk.`, `com.`, `org.`, `net.`, or `io.` must also match the
  whitelist, even with no corresponding `import` statement (catches e.g.
  `new java.io.File(...)` used inline) — `kind: 'fqn'` violation.
- `allowedImports: []` (empty list) means the submission may use no imports
  and no FQN references outside `java.lang` at all — appropriate for
  self-contained katas (e.g. `fizzbuzz`, `sum-array`) that only need core
  language features.

### Hard ban list (no whitelist entry can override)

Regardless of what's in `allowedImports`, the following are always rejected
(`kind: 'banned'`) — these exist to keep submissions inside a plain,
side-effect-free JVM-in-WASM sandbox and cannot be re-enabled by a kata
author:

- `java.lang.reflect` (and any use of it)
- `Class.forName`
- `ClassLoader`
- `MethodHandles`
- `Runtime.getRuntime`
- `ProcessBuilder`, `ProcessHandle`
- `System.exit`, `System.load`
- `Unsafe`
- Ad hoc thread/executor creation: `new Thread`, `Executors`
- Whole packages: `java.io`, `java.net`, `java.nio`, `javax.*`, `sun.*`, `jdk.*`

A kata's `allowedImports` can never re-permit these — the ban list wins over
the whitelist unconditionally for this specific core set (reflection,
`Runtime`, `ProcessBuilder`, `System.exit`/`load`, `Unsafe`, `ClassLoader`).

### Checks

Two check types, evaluated by `src/check/verify.ts` against the sandbox's
`RunResult`:

**`stdout`**: `expected` is compared to the program's captured
`System.out` output from calling `Main.main(new String[0])`, both sides
normalized by `normalizeStdout` (`src/check/normalize.ts`): CRLF → LF, each
line's trailing whitespace stripped, and trailing blank lines at the end of
the whole output stripped. Comparison is otherwise exact (whitespace *within*
a line, and blank lines in the middle of output, are significant). On
mismatch, the diff UI renders a line-level diff of expected vs. actual.

**`return`**: `method` names a `static` method on `mainClass`, invoked
directly (not via `main`) once per entry in `cases`, bypassing `main`
entirely. Each case's `args` is a list of `JavaValue` and `expected` is a
single `JavaValue`; the harness code-generates a literal, typed Java call
(e.g. `Main.add(1, 2)`) and compares its JSON-serialized return value to the
case's `expected`, one pass/fail per case, shown as a table.

`JavaValue` (see `src/kata/types.ts`) is:

```ts
type JavaValue =
  | number | boolean | string | null
  | JavaValue[]
  | { type: 'long' | 'float' | 'char' | 'double' | 'int'; value: number | string }
```

Plain JS values (`number`, `boolean`, `string`, `null`, and JS arrays of
these) are used directly when the JS/JSON representation is unambiguous
(`int`, `double`, `boolean`, `String`, `null`, and 1-D arrays of those). The
**wrapper form** `{ type, value }` is required whenever plain JSON/JS numbers
would be ambiguous or lossy:

- `long`: JS numbers lose precision above 2^53; use
  `{type: long, value: 9007199254740993}` (value may be given as a number or
  as a numeric string to preserve full precision).
- `float`: to force 32-bit float semantics instead of Java `double`, e.g.
  `{type: float, value: 3.14}`.
- `char`: JSON has no character type; e.g. `{type: char, value: "a"}` (or a
  numeric code point).
- `int`/`double` wrapper forms are also accepted (mostly for symmetry /
  explicitness) but are not required since plain JSON numbers already map to
  them unambiguously in typical ranges.

1-D arrays of any of the above are supported as a JS array whose elements
are plain values or wrapper objects, e.g. `args: [[1, 2, 3]]` for an
`int[]` parameter, or `[[{type: long, value: "10000000000"}, {type: long, value: "2"}]]`
for a `long[]`. Multi-dimensional arrays are not supported.

## Code template block, locked regions, and re-validation

An optional fenced code block with info string `` java template `` at the
end of the body supplies starter code for the editor:

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

- Lines that are exactly `// BEGIN EDIT` / `// END EDIT` delimit an editable
  region; everything else in the block is a **locked** (read-only) segment.
  Regions may alternate freely (locked, editable, locked, editable, ...);
  BEGIN/END pairs must be balanced and non-nested.
- The marker lines themselves are stripped before the learner ever sees the
  code — they are pure authoring syntax, not part of the visible template.
- If the template has **no markers at all**, the entire document is
  editable (no locked segments).
- The editor (`src/editor/editor.ts`, CodeMirror 6) enforces locked ranges
  live via a transaction/change filter that tracks locked ranges through
  edits, so a learner cannot type into or delete a locked segment through
  normal editor interaction.
- Because client-side editor enforcement can be bypassed out-of-band, the
  reassembled full source is **re-validated before every run**:
  `validateLocked(source, segments)` requires that every original locked
  segment's text still occurs verbatim, in order, and without overlap inside
  the submitted source. If this fails, the run is refused with an error —
  identical treatment to a failed import check — and nothing is sent to the
  sandbox.
- Template authors should keep locked segments minimal and exact — any
  incidental whitespace/comment inside a locked segment becomes part of the
  verbatim string that must reappear unchanged.

## Complete example: text kata (`keyword-final.md`)

```markdown
---
title: The final keyword
type: text
difficulty: easy
tags: [language-basics]
answers: ["final", "the final keyword"]
hints:
  - "It's a modifier you put on a variable declaration."
  - "It also happens to be used for classes that cannot be subclassed."
---

Which Java keyword, applied to a local variable or field, makes it
unassignable after it has been given its initial value?
```

## Complete example: choice kata (`primitives.md`)

```markdown
---
title: Primitive types
type: choice
difficulty: easy
tags: [language-basics, types]
multiple: true
shuffle: true
options:
  - text: "`int`"
    correct: true
  - text: "`boolean`"
    correct: true
  - text: "`char`"
    correct: true
  - text: "`String`"
    correct: false
  - text: "`double`"
    correct: true
hints:
  - "There are exactly 8 primitive types in Java."
  - "`String` is a class, not a primitive — it's a common trap."
---

Select **all** of the following that are Java primitive types.
```

## Complete example: code kata (`fizzbuzz.md`)

````markdown
---
title: FizzBuzz
type: code
difficulty: easy
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
hints:
  - "Use the modulo operator `%` to test divisibility."
  - "Check divisibility by 15 (or by both 3 and 5) before checking 3 or 5 alone."
  - "Print one line per number from 1 to 5, inclusive."
---

Print the numbers from 1 to 5, one per line. For multiples of 3, print
`Fizz` instead of the number; for multiples of 5, print `Buzz`; for
multiples of both, print `FizzBuzz`.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: implement FizzBuzz for 1..5
    }
    // END EDIT
}
```
````
