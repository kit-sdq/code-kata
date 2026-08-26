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

Drop a new `.md` file into `katas/`. That's it — kata discovery uses Vite's
`import.meta.glob` at build time, so there is no manifest to edit or register
the file in. On the next `npm run dev` reload, or the next push to `main`
(the included GitHub Actions workflow rebuilds and redeploys automatically),
the new kata appears in the list.

The Markdown format (frontmatter fields, matching modes, code-check syntax,
locked-region template syntax) is fully specified in
[`docs/TASK_FORMAT.md`](docs/TASK_FORMAT.md), including three complete
example files (text, choice, code).

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
