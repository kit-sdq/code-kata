# Test Plan

Two layers: automated unit tests (Vitest, run in CI on every push via
`npm test`) for pure logic, and manual/integration checks for anything that
needs a real browser + the live CheerpJ CDN runtime (not practical to run
headlessly in CI for this project).

## Unit tests (`npm test` = `vitest run`, files under `tests/*.test.ts`)

| Area | Test | Type | File / procedure |
|---|---|---|---|
| Text normalization | `normalizeText` trims, collapses internal whitespace runs, lowercases | unit | `tests/normalize.test.ts` |
| Text matching | `matchText` — `normalized` mode: case/whitespace-insensitive match | unit | `tests/normalize.test.ts` |
| Text matching | `matchText` — `exact` mode: whitespace/case sensitive, only outer trim | unit | `tests/normalize.test.ts` |
| Text matching | `matchText` — `regex` mode: full-match anchoring, `caseSensitive` toggles `i` flag | unit | `tests/normalize.test.ts` |
| Text matching | `matchText` — correct if *any* of multiple `answers` matches | unit | `tests/normalize.test.ts` |
| Stdout normalization | `normalizeStdout` — CRLF to LF | unit | `tests/normalize.test.ts` |
| Stdout normalization | `normalizeStdout` — strips trailing whitespace per line | unit | `tests/normalize.test.ts` |
| Stdout normalization | `normalizeStdout` — strips trailing blank lines at end of output only (not mid-output) | unit | `tests/normalize.test.ts` |
| Task parsing | Frontmatter parsed for each of `text`/`choice`/`code`; defaults applied (`id` from filename, `tags: []`, `hints: []`, `match.mode: normalized`, `match.caseSensitive: false`, `multiple: false`, `shuffle: true`, `mainClass: Main`, `timeoutMs: 5000`) | unit | `tests/parse.test.ts` |
| Task parsing | `code` kata: `java template` fenced block extracted from body; body no longer contains it | unit | `tests/parse.test.ts` |
| Task parsing | `code` kata: `// BEGIN EDIT` / `// END EDIT` markers stripped, segmented correctly | unit | `tests/parse.test.ts`, `tests/regions.test.ts` |
| Task parsing | Missing required field (e.g. `title`, `answers`, `checks`) surfaces a clear parse error | unit | `tests/parse.test.ts` |
| Import validator | Allowed import (exact class) passes | unit | `tests/imports.test.ts` |
| Import validator | Allowed import (package wildcard `pkg.*`) passes for a class directly in `pkg` | unit | `tests/imports.test.ts` |
| Import validator | Disallowed import (not in whitelist) is rejected — `kind: 'import'` | unit | `tests/imports.test.ts` |
| Import validator | Wildcard boundary: `java.util.*` does **not** cover `java.util.concurrent.X` (subpackage) | unit | `tests/imports.test.ts` |
| Import validator | FQN bypass without an `import` statement (e.g. inline `new java.io.File(...)`) is caught — `kind: 'fqn'` | unit | `tests/imports.test.ts` |
| Import validator | Banned token (e.g. `Runtime.getRuntime`, `ProcessBuilder`, `Class.forName`, `new Thread`) rejected even when whitelisted/attempted — `kind: 'banned'` | unit | `tests/imports.test.ts` |
| Import validator | Banned/disallowed token inside a comment does **not** trigger a violation | unit | `tests/imports.test.ts` |
| Import validator | Banned/disallowed token inside a string or char literal (incl. text blocks) does **not** trigger a violation | unit | `tests/imports.test.ts` |
| Import validator | `java.lang` classes usable with no import and are not flagged | unit | `tests/imports.test.ts` |
| Import validator | `allowedImports: []` rejects any non-`java.lang` import/FQN | unit | `tests/imports.test.ts` |
| Locked regions | `parseTemplate` produces correct alternating `Segment[]` from markers; markers stripped | unit | `tests/regions.test.ts` |
| Locked regions | `parseTemplate` with no markers: whole template is one editable segment | unit | `tests/regions.test.ts` |
| Locked regions | `initialDoc` reconstructs the starter document from segments | unit | `tests/regions.test.ts` |
| Locked regions | `validateLocked` accepts source with locked segments reproduced verbatim, in order | unit | `tests/regions.test.ts` |
| Locked regions | `validateLocked` rejects source where a locked segment was altered, reordered, removed, or made to overlap | unit | `tests/regions.test.ts` |
| Choice matching | Single-select: correct iff selected option's `correct` is true | unit | `tests/choice.test.ts` (or colocated with view logic) |
| Choice matching | Multi-select: correct iff selected set exactly equals correct set (no partial credit) | unit | `tests/choice.test.ts` |

## Manual / integration checks

These require a real browser (loads CheerpJ live from
`cjrtnc.leaningtech.com`) and are run against a built preview
(`npm run build` + serve `dist/`, or `npm run dev`) before a release, and
whenever the runner/sandbox code changes.

| Area | Test | Type | Procedure |
|---|---|---|---|
| Timeout | Kata whose submitted code runs an infinite loop | manual | Submit an infinite-loop program (e.g. `while(true){}`) against a kata with a short `timeoutMs`; confirm the sandbox iframe's tab stays responsive throughout (it must, to fire its own timer and `terminate()` the Worker), status ends as `timeout` within roughly `timeoutMs` + teardown overhead, and the UI shows a clear timeout message, not a hang |
| Stop button | Long-running or infinite-loop submission | manual | Click Run, then click Stop before it finishes; confirm the Worker is terminated and the iframe is torn down, the pending promise resolves `{status:'stopped'}`, and the UI returns to an idle/re-runnable state (a subsequent Run works, recreating the iframe) |
| Compile error surfacing | Submission with a syntax error | manual | Submit deliberately invalid Java; confirm `status: 'compile-error'` with a usable message is shown to the learner, not a silent failure or raw stack dump |
| Runtime error surfacing | Submission that throws (e.g. unhandled exception, `ArrayIndexOutOfBoundsException`) | manual | Confirm `status: 'runtime-error'` is surfaced distinctly from `compile-error` and from a check failure |
| Return-value checks | `return` check cases across supported types | manual | Exercise `int`, `long` (incl. values > 2^53 via wrapper form), `double`, `float` (wrapper form), `boolean`, `char` (wrapper form), `String`, `null`, and 1-D arrays of each; confirm per-case pass/fail table is correct |
| Stdout diff UI | Kata with a stdout mismatch | manual | Submit output that differs from `expected` by one line; confirm the line-level diff highlights the differing line(s) and normalization (trailing whitespace/newline/CRLF) does not cause false mismatches |
| First-run load phase | Fresh browser session, no CheerpJ cache | manual | Confirm "Loading Java runtime…" phase is shown during the slow first CDN fetch, and does not appear to hang past the documented 90s init/compile budget under normal network conditions |
| Locked-region tamper (live) | Attempt to edit a locked region via devtools/direct DOM manipulation, then submit | manual | Confirm the pre-run re-validation in `regions.ts` rejects the tampered source with an error, and no run is sent to the sandbox |
| Import bypass (live) | Submission using a banned API not caught by editor affordances | manual | Confirm rejection happens before any network/iframe activity (i.e. the static check runs first and short-circuits) |
| Progress persistence | Solve a kata, reveal hints, reload the page | manual | Confirm `kata-progress:v1` in `localStorage` persists `solved`/`attempts`/`hintsRevealed` across reloads |
| Accessibility | Submit result announcement, keyboard-only navigation | manual | Confirm result is announced via `aria-live="polite"`, all interactive controls are real `<button>`s reachable and operable by keyboard with visible focus |
