# Code Kata

A static, backend-free code-kata site for practicing Java. Text-answer,
multiple-choice, and real compile-and-run Java coding exercises, graded
entirely in the browser and deployable as a plain static site (GitHub Pages).

## Features

- Three kata types: short-answer text, single/multi-select choice, and Java
  code exercises with real compilation and execution.
- Java code runs client-side via [CheerpJ](https://cheerpj.com/) (a
  WebAssembly JVM) — no server, no submission of code anywhere.
- CodeMirror 6 editor with locked (read-only) boilerplate regions for code
  katas, so a task can ship a fixed class/method scaffold around the part
  the learner actually writes.
- stdout and return-value checks, with a line-level diff / per-case table on
  failure.
- Hints, revealed incrementally on incorrect attempts.
- Progress (solved / attempts / hints revealed) persisted locally
  (`localStorage`) — no accounts, no server, no tracking.
- Katas are plain Markdown files; adding one is adding one file.

## Running locally

Requires Node.js (see CI config for the exact version, currently 22).

```sh
npm install
npm run dev      # local dev server with hot reload
npm test         # vitest run — unit test suite
npm run build    # tsc --noEmit && vite build -> dist/
```

## Adding a new kata

Drop a new `katas/<slug>.de.md` (or `.en.md`) file into `katas/`. That's it —
kata discovery uses Vite's `import.meta.glob` at build time, so there is no
manifest to edit or register the file in. On the next `npm run dev` reload,
or the next push to `main` (the included GitHub Actions workflow rebuilds
and redeploys automatically), the new kata appears in the list.

The Markdown format (frontmatter fields, matching modes, code-check syntax,
locked-region template syntax) is fully specified in
[`docs/TASK_FORMAT.md`](docs/TASK_FORMAT.md), including three complete
example files (text, choice, code).

## Adding a category

Categories are defined in `katas/categories.yaml`, a flat list of
`{ id, name, description?, order }` entries (`name`/`description` may be a
plain string or a `{de, en}` map — see Localization below). A kata joins a category by
setting its frontmatter `category` to a manifest `id`. To add a new category:
add an entry to `categories.yaml` with a unique `id` and an `order` (ascending
front-page section position), then point kata(s) at it via `category: <id>`.
Categories with no katas are omitted from the front page; katas with a
missing or unrecognized `category` land in a synthetic "Uncategorized"
section at the end (and log a console warning naming the kata and the
unrecognized category).

Within a category, katas are ordered by their frontmatter `id` — a
dotted-numeric string (`1`, `2`, `2.1`, `10`, ...) compared segment-by-segment
as numbers, not as plain strings, so `id: 10` sorts after `id: 3`, not before
`id: 2`. Full semantics (duplicate-id/unknown-category warnings, comparison
rules) are in [`docs/TASK_FORMAT.md`](docs/TASK_FORMAT.md).

## Localization

The UI is available in German and English. The header's language toggle (a
button showing the *target* language — "EN" while German is active, "DE"
while English is active) switches the whole UI live, persists the choice in
`localStorage['lang']`, and updates the `<html lang>` attribute; with no
stored choice, the browser's language (`navigator.language`) picks the
default.

Kata content is per-language. The recommended format is a **single**
`katas/<slug>.md` file holding both languages: localizable frontmatter
fields (`title`, `hints`, `answers`, `tags`, `options[].text`, stdout checks'
`expected`/`label`) are either a plain value (shared) or a `{de, en}` map,
and the body uses `<!-- de -->` / `<!-- en -->` / `<!-- all -->` markers to
switch which language subsequent lines belong to — this avoids the drift
risk of hand-keeping two files in sync. The older alternative — a separate
`katas/<slug>.de.md` / `katas/<slug>.en.md` pair (a bare `katas/<slug>.md`
with no localized maps is treated as `de`-only, for pre-existing files) —
still works unchanged. Either way, all variants of a kata share the same
slug, so routing and solved/progress state don't care which language was
used to solve a kata; if only one language exists, the site falls back to it
automatically and shows a small note that the task isn't translated yet. If
both a multilingual `<slug>.md` and a suffixed `<slug>.<lang>.md` exist for
the same slug/language, the suffixed file wins (and a warning is logged).
Full details in [`docs/TASK_FORMAT.md`](docs/TASK_FORMAT.md).

Category names/descriptions in `katas/categories.yaml` can be a plain string
(shown for every language) or a `{de, en}` map.

## Theming

The site follows the OS color scheme (`prefers-color-scheme`) by default. The
header's "Dark mode" toggle (a real `<button>` with `aria-pressed` reflecting
the current state) overrides this and persists the choice in `localStorage`;
once overridden, the site stops following OS changes until the toggle is used
again. Theme is applied before first paint (an inline script in
`index.html`'s `<head>` sets `data-theme` from storage-or-OS before the
stylesheet loads), so there's no flash of the wrong theme on load. Both
themes cover the whole UI, including the CodeMirror editor and
`highlight.js`-rendered code blocks in kata bodies, which restyle live via
CSS custom properties with no editor rebuild. See
[`docs/DESIGN.md`](docs/DESIGN.md) for the palette, measured contrast ratios,
and theming mechanics in detail.

## Accessibility

Target conformance: **WCAG 2.2 AA**. What was actually tested, and how:

- **Color contrast** (light and dark themes): computed automatically in
  `tests/contrast.test.ts` from the literal color values in `src/styles.css`
  — every text/background and UI-component/background pair used in the app,
  asserted against the 4.5:1 (text) / 3:1 (large text, UI components, focus
  indicators) thresholds. Measured values are recorded in
  [`docs/DESIGN.md`](docs/DESIGN.md).
- **Keyboard-only pass**: manually walked the full kata workflow (list → open
  a kata → wrong answer → reveal hint → correct answer, for a text/choice
  kata and for the FizzBuzz code kata including writing and running a
  solution) using only the keyboard, in a real browser. The code editor's one
  custom keyboard surface — Tab is captured for indentation — has an
  `Escape` binding that blurs the editor, releasing Tab so it moves focus on;
  this is documented both as a visually-hidden hint attached to the editor
  via `aria-describedby` and here: **press Escape, then Tab, to leave the
  code editor.**
- **Reflow**: checked at 320px viewport width and at a 200%-zoom-equivalent
  viewport — no page-level horizontal scrolling (the code editor and long
  code/diff lines scroll internally, which is the standard exception for
  two-dimensional content).
- **Semantics / live regions**: verified one `<h1>` per page, `<label>`s on
  the text input and every choice option, `<fieldset>`/`<legend>` on choice
  questions, and that correct/incorrect feedback, revealed hints, run-phase
  changes, and execution errors are all announced via persistent
  `role="status" aria-live="polite"` containers (present in the DOM before
  their content changes, not recreated on each update).

Full criterion-by-criterion mapping and known limitations:
[`docs/A11Y-CHECKLIST.md`](docs/A11Y-CHECKLIST.md). Headline limitations: no
real screen-reader session was performed (verification was structural/
computational plus a sighted keyboard-only pass, not an NVDA/JAWS/VoiceOver
run); no automated accessibility linter (e.g. axe) was run; the CheerpJ
first-load phase indicator is text-only, with no numeric progress bar.

## Configuring allowed imports

Each `code` kata declares its own `allowedImports` whitelist in frontmatter
(a package wildcard like `java.util.*`, or an exact class name). `java.lang`
is always implicitly available. A fixed set of dangerous APIs (reflection,
`ClassLoader`, `Runtime`/`ProcessBuilder`, `System.exit`/`load`, `Unsafe`,
ad hoc thread creation, `java.io`/`java.net`/`java.nio`) is **always**
banned and cannot be re-enabled by any kata's whitelist. This is enforced
statically before compilation by `src/check/imports.ts`. Full semantics
(wildcard scope, FQN-bypass detection, the exact ban list) are in
[`docs/TASK_FORMAT.md`](docs/TASK_FORMAT.md).

## Deployment

Deployment is GitHub Pages via the included workflow,
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): every push to
`main` builds the site and publishes `dist/`. To enable it on a fork/new
repo:

1. Repo Settings -> Pages -> **Source: GitHub Actions** (not "Deploy from a
   branch").
2. Push to `main`; the workflow builds and deploys automatically.

## Browser support

Current versions of Chrome, Firefox, and Safari (desktop). Code execution
requires WebAssembly support (present in all of the above); text/choice
katas have no such requirement. Mobile browsers are not a primary target for
code katas given the editor and CheerpJ's load time, though they should
mostly work.

## Known limitations

- **First-load runtime download**: the CheerpJ Java runtime is fetched from
  Leaning Technologies' CDN (`cjrtnc.leaningtech.com`) the first time a
  learner runs a code kata in a session, and is a non-trivial download —
  budgeted up to 90s for init+compile on that first run (shown to the user as
  a loading phase). This first run also downloads a bundled JDK 8
  `tools.jar` (`public/tools.jar`, ~18 MB) needed for in-browser `javac`.
  Subsequent runs in the same browser session are fast (browser-cached).
- **No true memory guard**: there is no portable way to cap memory used by a
  running submission from browser JS. The run timeout, which terminates the
  Worker running CheerpJ and tears down the iframe (on timeout or Stop), is
  the only backstop against a runaway submission — a submission that
  allocates aggressively but finishes within its timeout will not be stopped
  early.
- **CheerpJ CDN dependency**: code-kata execution requires network access to
  `cjrtnc.leaningtech.com`; it will not work fully offline. This app uses
  CheerpJ's free Community License, which requires loading the runtime from
  that CDN — self-hosting the runtime instead requires a Commercial License
  from Leaning Technologies (see `docs/ARCHITECTURE.md` for the license
  research and citations). Text/choice katas work fully offline.
- **Sandbox is defense-in-depth, not a security boundary**: the "sandboxed"
  iframe + Worker running CheerpJ protects against nothing that the
  learner's own browser doesn't already protect them from — it is their own
  machine, running under their own OS user, executing code they wrote themselves.
  The static import/FQN/ban-list check plus the sandbox plus the timeout
  exist to stop runaway or ill-behaved *submissions* from hanging the tab
  or misusing browser-reachable APIs — none of this is a security barrier
  against a user attacking their own machine, nor does it protect other
  users, since there is no server or shared state to attack.
- **GitHub Pages cannot set custom response headers.** The current engine
  (CheerpJ) does not require cross-origin isolation
  (`Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy`) to run, so
  this is not currently a blocker. It's noted because it *would* be one for
  an engine that needed `SharedArrayBuffer`/WASM threads — the workaround in
  that case is [`coi-serviceworker`](https://github.com/gzuidhof/coi-serviceworker),
  a client-side service worker that injects those headers on a host that
  can't set them itself. See `docs/ARCHITECTURE.md`.
- **Java language level**: code katas target Java 8/11 language features,
  CheerpJ's fully production-supported levels. Java 17-only syntax (records,
  sealed classes, pattern-matching `switch`, etc.) should be avoided in kata
  templates and reference solutions.

## License

This project's own code and kata content are licensed under the
[GNU General Public License v3.0 or later](LICENSE) (GPL-3.0-or-later).

Third-party components have their own licenses:

- **`public/tools.jar`** — the OpenJDK 8 compiler, redistributed verbatim.
  Licensed under GPLv2 with the Classpath Exception. It is aggregated as a
  separate file, not linked into this project's code.
- **CheerpJ runtime** — proprietary (Leaning Technologies). It is *not*
  distributed with this project; browsers load it at runtime from the
  official CDN under CheerpJ's free Community License (see Known limitations).
- Bundled npm dependencies (CodeMirror, marked, highlight.js, js-yaml, Vite)
  are MIT/BSD licensed, all GPL-compatible.
