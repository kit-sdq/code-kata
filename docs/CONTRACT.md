# Internal Build Contract (agent coordination — authoritative spec)

Static Java code-kata site for GitHub Pages. No backend. All execution client-side.

## Stack

- Vite + vanilla TypeScript, hash-based routing (`#/` list, `#/kata/<id>` task). `base: './'` in vite config.
- CodeMirror 6 (`codemirror`, `@codemirror/lang-java`) for the editor.
- `marked` for Markdown, `highlight.js` for code blocks, `js-yaml` for frontmatter.
- Vitest for unit tests.
- Java execution: CheerpJ (loader from `https://cjrtnc.leaningtech.com/`), running inside a dedicated iframe (`public/sandbox.html`) controlled via `postMessage`.

## File layout (ownership per agent noted)

```
index.html, package.json, tsconfig.json, vite.config.ts, .gitignore   [A1]
katas/*.md                     4 example katas                        [A1]
src/main.ts                    router + list view + task view shell   [A1]
src/styles.css                                                        [A1]
src/kata/types.ts              shared types (below)                   [A1]
src/kata/parse.ts              frontmatter + body + template parsing  [A1]
src/kata/load.ts               import.meta.glob loader                [A1]
src/check/normalize.ts         text/stdout normalization + compare    [A1]
src/ui/markdown.ts             marked + hljs setup                    [A1]
src/ui/views/*.ts              text/choice question views, hints,     [A1]
                               progress (localStorage)
src/check/imports.ts           import/FQN whitelist validator         [A2]
src/editor/regions.ts          template segmentation + re-validation  [A2]
src/editor/editor.ts           CM6 editor with locked regions         [A2]
src/ui/views/code.ts           code-task view (editor, Run/Stop,      [A2]
                               result/diff panel)
src/runner/runner.ts           main-thread runner API (stub by A2,    [A2 stub, A4 real]
                               real impl by A4)
src/runner/protocol.ts         postMessage message types              [A2]
src/check/verify.ts            RunResult vs checks comparison + diff  [A4]
public/sandbox.html + sandbox JS  CheerpJ side                        [A4]
tests/*.test.ts                vitest                                 [A1, A2, A4]
docs/ARCHITECTURE.md, docs/TASK_FORMAT.md, docs/TESTPLAN.md           [A3]
README.md, .github/workflows/deploy.yml                               [A3]
```

## Task file format (authoritative)

`katas/<id>.md` = YAML frontmatter + Markdown body.

Common frontmatter: `id` (defaults to filename), `title`, `type: text|choice|code`,
`difficulty: easy|medium|hard`, `tags: [..]`, `hints: [..]` (ordered, optional).

**text**:

```yaml
answers: ["final", "the final keyword"]   # any match = correct
match:            # optional, defaults shown
  mode: normalized   # normalized | exact | regex
  caseSensitive: false
```

- `normalized`: trim, collapse internal whitespace runs to one space, lowercase unless `caseSensitive`.
- `exact`: raw string equality (trim only leading/trailing whitespace).
- `regex`: each entry in `answers` is a regex, full-match against trimmed input; `caseSensitive` maps to `i` flag.

**choice**:

```yaml
multiple: false      # single vs multi select
shuffle: true        # shuffle option order per render
options:
  - text: "`int` is a primitive"   # inline markdown allowed
    correct: true
  - text: "..."
    correct: false
```

Multi-select correct iff selected set == correct set.

**code**:

```yaml
mainClass: Main            # default Main
allowedImports:            # whitelist; java.lang implicit; empty list = no imports allowed
  - java.util.*            # trailing .* = package wildcard, else exact class
timeoutMs: 5000            # run timeout, default 5000
checks:
  - type: stdout
    expected: |
      1
      2
      Fizz
  - type: return
    method: add            # static method on mainClass
    cases:
      - args: [1, 2]
        expected: 3
      - args: [{type: long, value: 9007199254740993}]   # wrapper form for long/float/char
        expected: {type: long, value: 9007199254740994}
```

Body = task description (Markdown). Optional trailing sections:
- Code template: fenced block with info string `java template`. Inside it, lines
  `// BEGIN EDIT` / `// END EDIT` delimit editable regions; everything outside is locked.
  Marker lines are stripped from what the user sees; locked segments are read-only in the
  editor AND re-validated before execution (locked segments must appear verbatim, in order,
  in the submitted source).

## Shared types (`src/kata/types.ts` — exact shape)

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
export type JavaValue =
  | number | boolean | string | null
  | JavaValue[]
  | { type: 'long' | 'float' | 'char' | 'double' | 'int'; value: number | string };
export type Check =
  | { type: 'stdout'; expected: string }
  | { type: 'return'; method: string; cases: { args: JavaValue[]; expected: JavaValue }[] };
export interface CodeKata extends KataBase {
  type: 'code'; mainClass: string; allowedImports: string[];
  timeoutMs: number; template: string; checks: Check[];
}
export type Kata = TextKata | ChoiceKata | CodeKata;
```

## Runner API (`src/runner/runner.ts` — exact shape; A2 ships a stub returning status 'error', message 'runner not implemented yet'; A4 replaces)

```ts
export interface RunRequest {
  source: string;        // full reassembled user source (already validated)
  mainClass: string;
  checks: Check[];       // runner executes; verify.ts compares
  timeoutMs: number;
}
export type RunResult =
  | { status: 'ok'; stdout: string; returns: { json: string }[] }  // returns: raw JSON per return-case, in order
  | { status: 'compile-error' | 'runtime-error' | 'error'; message: string }
  | { status: 'timeout' }
  | { status: 'stopped' };
export function runJava(req: RunRequest, onPhase?: (p: 'loading'|'compiling'|'running') => void): Promise<RunResult>;
export function stop(): void;   // hard-kills the sandbox iframe; pending promise resolves {status:'stopped'}
```

## Execution design (A4)

- `public/sandbox.html` loads CheerpJ loader, `cheerpjInit`, writes source files to virtual FS
  (`cheerpOSAddStringFile` under `/str/`), compiles via the Java compiler CheerpJ ships
  (research current CheerpJ 3.x/4.x docs — e.g. `cheerpjRunMain("com.sun.tools.javac.Main", ...)`
  with `-d /files/`), then runs a generated harness class.
- Harness `KataRunner.java` (JS codegen from checks): redirects `System.setOut` to a buffer,
  invokes `Main.main(new String[0])` for stdout checks and direct typed calls
  (`Main.add(1, 2)`) for return checks (args/expected code-generated as Java literals from
  JavaValue; supports int, long, double, float, boolean, char, String, null, and 1-D arrays
  of those). After execution it restores stdout and prints captured user output between
  sentinel markers plus one `___KATA_RET___<json>` line per return case; JS parses sentinels
  out. Read output via CheerpJ file APIs or captured console — whichever the researched API
  supports cleanly; file-based (`/files/` + `cjFileBlob`) preferred.
- Timeouts: init/compile budget 90s (first CheerpJ load is slow; show phase to user), run
  timeout per task (`timeoutMs`). On timeout/Stop: remove iframe (hard kill), recreate lazily
  on next run. Memory guard: not portably enforceable in-browser — document as limitation;
  timeout + iframe teardown is the backstop.
- Iframe: `sandbox="allow-scripts allow-same-origin"` (CheerpJ needs workers/caching;
  isolation comes from the JVM-in-WASM itself + static checks + hard teardown). Document.

## Import/FQN validator (`src/check/imports.ts`)

```ts
export interface ImportViolation { kind: 'import' | 'fqn' | 'banned'; token: string; line: number; reason: string }
export function validateImports(source: string, allowed: string[]): ImportViolation[];
```

- Strip line/block comments, string and char literals, and text blocks first.
- Every `import` (incl. `static`) must match the whitelist (exact class or `pkg.*` wildcard,
  wildcard covers only that package, not subpackages).
- FQN scan: any dotted token starting `java.` `javax.` `jakarta.` `sun.` `jdk.` `com.` `org.`
  `net.` `io.` must match whitelist too (catches `new java.io.File(...)` without import).
- Always-banned regardless of whitelist (kind 'banned'): `java.lang.reflect`, `Class.forName`,
  `ClassLoader`, `MethodHandles`, `Runtime.getRuntime`, `ProcessBuilder`, `ProcessHandle`,
  `System.exit`, `System.load`, `Unsafe`, `Thread` creation (`new Thread`,
  `Executors`), `java.io`, `java.net`, `java.nio`, `javax.`, `sun.`, `jdk.`.
  (Ban list wins over whitelist except entries the task explicitly whitelists AND that are
  not in the hard-ban core: reflect/Runtime/ProcessBuilder/exit/load/Unsafe/ClassLoader are
  never allowed.)
- `java.lang` needs no import and is always allowed (except `java.lang.reflect`, `Runtime`, etc. above).

## Normalization (`src/check/normalize.ts`)

```ts
export function normalizeText(s: string): string;                 // trim, collapse ws, lowercase
export function matchText(input: string, k: TextKata): boolean;
export function normalizeStdout(s: string): string;               // \r\n->\n, strip trailing ws per line, strip trailing newlines
```

## Locked regions (`src/editor/regions.ts`)

```ts
export interface Segment { text: string; editable: boolean }
export function parseTemplate(template: string): Segment[];        // strips marker lines
export function initialDoc(segments: Segment[]): string;
export function validateLocked(source: string, segments: Segment[]): boolean;
  // locked segments appear verbatim, in order, non-overlapping in source
```

Editor enforces via CM6 `EditorState.changeFilter` / transaction filter with locked-range
tracking (ranges mapped through changes). If template has no markers, entire doc editable.

## UX rules

- Submit gives immediate correct/incorrect (aria-live polite). Wrong answer increments
  attempt count; once attempts ≥ 1 and hints remain, show "Reveal hint" button; each click
  reveals next hint. Revealed hints + attempts + solved persist in localStorage key
  `kata-progress:v1` as `{ [id]: { solved: boolean; attempts: number; hintsRevealed: number } }`.
- Code tasks: phases shown while running ("Loading Java runtime…", "Compiling…", "Running…"),
  Stop button, result panel with per-check pass/fail and expected-vs-actual side-by-side
  (line-level diff highlighting for stdout; per-case table for return checks).
- Keyboard accessible, visible focus, buttons are `<button>`, list view shows solved badge,
  difficulty, tags.

## Example katas (A1 writes all 4)

1. `keyword-final.md` — text. "Which keyword makes a variable unassignable after initialization?" answers final; 2 hints.
2. `primitives.md` — choice, multiple, shuffle. Pick all primitive types from list incl. `String` distractor; 2 hints.
3. `fizzbuzz.md` — code, stdout check, template with locked class/method scaffold + editable body, `allowedImports: []`; 3 hints.
4. `sum-array.md` — code, return check (`method: sum`, int[] arg cases), `allowedImports: []`; 2 hints.

## Conventions

- TypeScript strict. No default exports. ES modules. 2-space indent.
- Tests colocated in `tests/`. `npm test` = `vitest run`, `npm run build` = `tsc --noEmit && vite build`.
- Keep dependencies to the ones listed. No UI framework.
