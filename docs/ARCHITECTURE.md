# Architecture

Static Java code-kata site. No backend, no server-side execution. Everything —
kata discovery, rendering, answer checking, and Java compilation/execution —
runs in the visitor's browser. Deployed as a Vite build to GitHub Pages.

## Components

| Component | File(s) | Responsibility |
|---|---|---|
| Router + shell | `src/main.ts` | Hash routing (`#/` list, `#/kata/<id>`), wires views |
| Kata loader | `src/kata/load.ts` | Discovers `katas/*.md` at build time |
| Kata parser | `src/kata/parse.ts` | Frontmatter + body + template extraction |
| Shared types | `src/kata/types.ts` | `Kata`, `Check`, `JavaValue`, etc. |
| Text/stdout matching | `src/check/normalize.ts` | Normalization + comparison for text/stdout |
| Import validator | `src/check/imports.ts` | Static whitelist/FQN/ban-list check on submitted source |
| Locked regions | `src/editor/regions.ts` | Template segmentation, re-validation of locked code |
| Editor | `src/editor/editor.ts` | CodeMirror 6 with locked ranges |
| Views | `src/ui/views/*.ts` | Per-type task UI (text, choice, code), hints, progress |
| Runner API | `src/runner/runner.ts`, `src/runner/protocol.ts` | Main-thread ↔ iframe contract |
| Sandbox | `public/sandbox.html`, `public/sandbox.js` | Thin relay iframe; owns the run timeout and hard-kills the Worker |
| Sandbox worker | `public/sandbox-worker.js` | Dedicated Worker; CheerpJ compile/run happens here |
| Verdict | `src/check/verify.ts` | Compares `RunResult` against `Check[]`, builds diff data |
| Markdown | `src/ui/markdown.ts` | `marked` + `highlight.js` rendering |

## Kata discovery and data flow

Kata files live in `katas/*.md`. `src/kata/load.ts` uses Vite's
`import.meta.glob` (eager, as raw strings) to enumerate every `katas/*.md`
file **at build time** — there is no manifest file to maintain. Adding a new
task is: drop a `.md` file into `katas/`, commit, push. The GitHub Actions
workflow (`deploy.yml`) rebuilds the site on every push to `main`, so the new
glob result (and thus the new kata) is picked up automatically on the next
build. There is no runtime file-system scan and no way to add a kata without
a rebuild — this is a static site, not a CMS.

Pipeline for a single kata, list view to render:

1. `load.ts` returns the raw text of every matched file, keyed by path.
2. `parse.ts` splits YAML frontmatter (via `js-yaml`) from the Markdown body,
   validates/defaults fields per `type`, and — for `code` katas — extracts the
   fenced `` ```java template ``` `` block from the body (removed from the
   body that gets rendered as the task description) into `CodeKata.template`.
3. The result is a typed `Kata` (`TextKata | ChoiceKata | CodeKata`, see
   `src/kata/types.ts`) consumed by `main.ts`'s router and the per-type view
   in `src/ui/views/`.
4. The list view renders id, title, difficulty, tags, and a solved badge read
   from `localStorage` (`kata-progress:v1`).
5. The task view renders the Markdown body (`ui/markdown.ts`), hints (revealed
   incrementally, persisted), and the type-specific interaction (text input,
   choice list, or code editor).

Progress (`solved`, `attempts`, `hintsRevealed` per kata id) is pure
client-side state in `localStorage`; there is no server and no cross-device
sync.

## Code-task execution path

This is the most involved path in the system. High level, for one Run:

```
editor (locked regions enforced live)
  -> reassemble full source from editable + locked segments
  -> re-validate locked segments verbatim (regions.ts)
  -> static import/FQN whitelist validation (imports.ts)
  -> if clean: postMessage to sandboxed iframe (thin relay)
  -> iframe spawns a dedicated Worker and forwards the run request to it
  -> worker: loads CheerpJ, writes source to virtual FS, compiles with javac
     (via CheerpJ), runs a generated KataRunner harness
  -> harness captures stdout (System.setOut redirect) + per-case return
     values, printed between sentinel markers, which the worker parses back
     out of CheerpJ's console output
  -> worker posts RunResult to the iframe, iframe relays it to main thread
  -> verify.ts compares RunResult against the kata's Check[]
  -> result/diff UI renders pass/fail per check
```

Locked regions exist so a kata can ship boilerplate (class declaration, a
fixed `main`, helper scaffolding) that the learner cannot delete or break.
`editor/regions.ts` parses the `java template` fenced block into alternating
`{ text, editable }` segments (its `// BEGIN EDIT` / `// END EDIT` markers are
stripped from what the learner sees), and `editor/editor.ts` enforces this
live in CodeMirror 6 via a transaction/change filter that keeps locked ranges
read-only as the document is edited. Client-side enforcement is a UX
convenience, not a security boundary, so before every run the full
reassembled source is **re-validated**: `validateLocked` checks that the
original locked segments still appear verbatim, in order, and
non-overlapping in the submitted text. This defends against out-of-band
tampering (e.g. driving CodeMirror via devtools) — a run is refused if it
fails, exactly as if the static import check had failed.

The import/FQN validator (`check/imports.ts`) then strips comments, string,
char, and text-block literals from the source, checks every `import`
(including `static`) against the kata's `allowedImports` whitelist, scans for
fully-qualified-name bypasses (e.g. `new java.io.File(...)` with no import
statement), and enforces a hard-coded ban list that no whitelist can lift
(reflection, `ClassLoader`, `Runtime`/`ProcessBuilder`, `System.exit`,
`Unsafe`, ad hoc `Thread`/`Executors` creation, etc. — see
`docs/TASK_FORMAT.md` for the full list). Only source that passes both checks
is ever sent to the sandbox.

### Sandbox and harness

`public/sandbox.html` is loaded into a dedicated iframe
(`sandbox="allow-scripts allow-same-origin"` — CheerpJ needs same-origin
access to its own worker/caching machinery to function; see "Sandboxing"
below for what this does and does not buy). `sandbox.js`, its only script,
is a thin relay: on a `run` message from the parent it creates a `Worker`
(`sandbox-worker.js`) and forwards the request. All CheerpJ work — loading
the runtime, compiling, running — happens inside that Worker, not on the
iframe's own thread. This split exists because a tight/non-yielding infinite
loop in learner-submitted Java (e.g. `while(true){}`) froze the whole tab
when CheerpJ ran on the iframe's main thread: with nothing left to yield to
the browser, even the parent page's own timers stopped firing, so the
planned "tear down the iframe on timeout" kill could not be relied on to
actually run. Moving CheerpJ into a Worker keeps the iframe's thread
responsive (so its own timer reliably fires) and lets `worker.terminate()`
hard-kill the runaway code from outside, regardless of what it's doing; the
parent's iframe-removal timer remains as a backstop in case that somehow
doesn't happen.

`sandbox-worker.js` pulls in CheerpJ via
`importScripts('https://cjrtnc.leaningtech.com/4.3/loader.js')` (CheerpJ
3.0+ supports running inside a Worker this way), calls `cheerpjInit()`,
writes the validated source into CheerpJ's virtual filesystem
(`cheerpOSAddStringFile`/`cheerpjAddStringFile`, under `/str/`), and invokes
the Java compiler (`cheerpjRunMain("com.sun.tools.javac.Main", ...)`) with
output directed to `/files/`. In-browser `javac` needs a JDK 8 `tools.jar` on
the classpath; this project ships one at `public/tools.jar` (~18 MB, from
OpenJDK, GPLv2 with the Classpath Exception — see "License compatibility"
below for why bundling this file is not the same thing as self-hosting the
CheerpJ runtime).

Rather than running the learner's `main` directly, the sandbox generates a
`KataRunner.java` harness from the kata's `Check[]` (JS→Java codegen, done
per run):

- For a `stdout` check: the harness redirects `System.out` to an in-memory
  buffer for the duration of the call, invokes `Main.main(new String[0])`,
  restores `System.out`, and prints the captured buffer back out wrapped in
  sentinel markers.
- For a `return` check: the harness emits one direct, statically-typed call
  per case — e.g. `Main.add(1, 2)` — with `args`/`expected` values
  code-generated as Java literals from the kata's `JavaValue` values
  (`int`, `long`, `double`, `float`, `boolean`, `char`, `String`, `null`, and
  1-D arrays thereof; the `{type, value}` wrapper form disambiguates `long`,
  `float`, and `char` literals, which JSON/JS numbers can't represent
  unambiguously). Each result is printed as one `___KATA_RET___<json>` line.

There is no DOM inside a Worker (no `#console` element for CheerpJ to write
to), so CheerpJ's stdout/stderr surface on the Worker's own
`console.log`/`console.error` instead. `sandbox-worker.js` intercepts
`console.log`/`error`/`warn`/`info` for the duration of each run to capture
that text, then parses the sentinel-delimited stdout and the
`___KATA_RET___` lines back out of it into a `RunResult` (stripping leading/
trailing blank lines around the captured stdout block, since CheerpJ's
console bridge doesn't preserve an exact newline count). That `RunResult` is
posted up through the iframe to the main thread, where `check/verify.ts`
compares it against the kata's `Check[]`.

### Timeouts and teardown

- Init/compile budget: 90s (first CheerpJ load per session fetches and
  JIT/AOT-warms a JVM-in-WASM runtime from the CDN; this is slow — the UI
  shows a "Loading Java runtime…" phase so this isn't mistaken for a hang).
- Run budget: the kata's `timeoutMs` (default 5000).
- On timeout, or when the learner clicks Stop: `sandbox.js` calls
  `worker.terminate()` (a hard kill — there is no cooperative cancellation
  inside the JVM-in-WASM, but a Worker can always be stopped from outside
  regardless of what it's doing), and the pending run promise resolves
  `{ status: 'stopped' }` (Stop) or `{ status: 'timeout' }`. The main thread
  (`runner.ts`) then tears down and removes the iframe from the DOM
  regardless — both to force a clean CheerpJ session for the next run (see
  below) and as a backstop kill in case the iframe's own timer/terminate call
  somehow didn't run. A fresh iframe is created lazily on the next run.
- Memory: there is no portable way to cap a WebAssembly linear memory once
  running arbitrary user code from the browser's main JS APIs in a way that
  produces a clean, catchable error. This is **not** enforced beyond the
  timeout + Worker-termination/iframe-teardown backstop; see the Known
  Limitations section in `README.md`.

### Sandboxing properties

"Sandboxed iframe" here means: the Java code runs inside a JVM implemented
in WebAssembly, itself running inside a dedicated Worker, itself running
inside a browser iframe. Concretely:

- The JVM-in-WASM has no access to the host filesystem or OS processes; Java
  `File`/process APIs either don't resolve to anything real or are blocked
  outright by the import/FQN ban list before the code is ever compiled.
- Network access from Java code, if reachable at all, is limited to what the
  browser's own fetch/XHR stack permits from that origin — no raw sockets.
- This is defense in depth, not a security boundary against a determined
  local attacker: the code still runs in the visitor's own browser, under
  their own OS user, so there is nothing to protect them *from* except
  runaway/misbehaving kata submissions (infinite loops, huge allocations) —
  handled by the timeout, `worker.terminate()`, and the iframe-teardown
  backstop — and there is no cross-visitor or server-side data at risk
  because there is no server.
- The static import/FQN/ban-list check is the first line of defense (stops
  most misuse before compilation); the sandbox and teardown are the backstop
  for anything that check doesn't catch or for resource exhaustion, which a
  static check can't fully prevent in general (e.g. `while(true){}`).

## Sequence diagram: code-task submission

```mermaid
sequenceDiagram
    participant U as Learner
    participant V as code.ts (view)
    participant R as regions.ts
    participant I as imports.ts
    participant RN as runner.ts (main thread)
    participant SB as sandbox.js (iframe, relay)
    participant W as sandbox-worker.js (Worker, CheerpJ)
    participant VF as verify.ts

    U->>V: Click "Run"
    V->>V: Reassemble full source (editable + locked segments)
    V->>R: validateLocked(source, segments)
    alt locked region tampered
        R-->>V: false
        V-->>U: Reject, show error (no run)
    else locked regions intact
        R-->>V: true
        V->>I: validateImports(source, allowedImports)
        alt import/FQN/ban violation
            I-->>V: ImportViolation[]
            V-->>U: Reject, show violation(s) (no run)
        else clean
            I-->>V: []
            V->>RN: runJava({source, mainClass, checks, timeoutMs})
            RN->>SB: postMessage (fresh iframe created/loaded)
            SB->>W: new Worker(); postMessage(run request)
            W-->>SB: phase: loading
            SB-->>RN: phase: loading
            RN-->>V: onPhase('loading')
            W->>W: importScripts(loader.js), cheerpjInit(), write source to virtual FS
            W->>W: compile via javac (CheerpJ, with tools.jar on classpath)
            alt compile error
                W-->>SB: postMessage {status: 'compile-error', message}
                SB-->>RN: postMessage {status: 'compile-error', message}
            else compiled
                W-->>SB: phase: running
                SB-->>RN: phase: running
                RN-->>V: onPhase('compiling') / onPhase('running')
                W->>W: run generated KataRunner (console capture, typed return calls)
                W-->>SB: postMessage {status:'ok', stdout, returns} (or timeout/stopped)
                SB->>W: worker.terminate()
                SB-->>RN: postMessage {status:'ok', stdout, returns} (or timeout/stopped)
            end
            RN-->>V: RunResult
            V->>VF: verify(runResult, checks)
            VF-->>V: per-check verdicts + diff data
            V-->>U: Render result panel (pass/fail, expected-vs-actual diff)
        end
    end
```

## Java execution engine decision

**Chosen: CheerpJ.** CheerpJ compiles/interprets standard JVM bytecode inside
a WebAssembly + JavaScript runtime built on OpenJDK, loaded from Leaning
Technologies' CDN. It is the only realistic option that lets us both compile
*and* run arbitrary, learner-submitted Java source entirely client-side.

Alternatives considered and rejected:

- **DoppioJVM** — MIT-licensed, but unmaintained since roughly 2018, only
  partial Java 8 support, and reported to be very slow (pure-JS interpreter,
  no WASM). Dead project for a 2026 build; ruled out on maintenance and
  performance grounds alone, license aside.
- **TeaVM** — compiles Java to JS/WASM ahead-of-time, at *build* time. It has
  no facility for compiling and running Java source submitted by a user at
  *runtime* in the browser, which is the entire point of this app. Not
  applicable to the code-task use case (it would be a fit if the site itself
  were a Java app being cross-compiled, not for grading learner-submitted
  Java).
- **JS-based Java interpreters** (small hobby/toy projects implementing a
  Java-like syntax in JS) — implement small subsets of the language and
  standard library, not full Java semantics; unsuitable for open-ended kata
  submissions that may use arbitrary standard-library classes.

### License compatibility

CheerpJ's **Community License** (free tier) explicitly covers free/open-source
and non-commercial educational projects that are publicly accessible, and
grants "unlimited, unmetered use of CheerpJ from the `cjrtnc.leaningtech.com`
domain" — i.e. exactly the deployment shape here: a public, non-commercial,
open-source GitHub Pages site loading the CheerpJ runtime from Leaning
Technologies' CDN at runtime. See
<https://cheerpj.com/docs/licensing.html> and <https://cheerpj.com/licensing/>.

Constraints to be aware of: the Community License does **not** permit
self-hosting the CheerpJ runtime or redistributing it — this app must
continue loading it live from `cjrtnc.leaningtech.com` (already the design;
see Stack in `docs/CONTRACT.md`). If this project's usage ever becomes
commercial, or self-hosting/offline use is required, a Commercial License
would be needed instead (see `README.md` Known Limitations for the honest
trade-off and fallback).

The `public/tools.jar` file this project *does* ship (the JDK 8 `tools.jar`
needed for in-browser `javac`, see "Sandbox and harness" above) is a
separate matter: it's an OpenJDK build artifact (GPLv2 with the Classpath
Exception), not part of the CheerpJ runtime, so bundling it is not
self-hosting CheerpJ and doesn't touch the Community License restriction
above. Leaning Technologies' own JavaFiddle ships the same file for the same
reason.

### Bundle / load characteristics

- The CheerpJ *loader* script, pulled into `sandbox-worker.js` via
  `importScripts` and pinned to a specific version
  (`https://cjrtnc.leaningtech.com/4.3/loader.js`), is small.
- The actual JVM-in-WASM *runtime* is fetched lazily from the CDN only when a
  learner first runs a code kata, and is cached by the browser afterwards —
  so the first code-task run in a session is slow (budgeted at up to 90s;
  surfaced to the user as a "Loading Java runtime…" phase), subsequent runs
  in the same session/browser are fast.
- `public/tools.jar` (~18 MB, needed for in-browser `javac`) is served as a
  static asset and is likewise a one-time, browser-cached download.
- This CDN dependency means the app requires network access to
  `cjrtnc.leaningtech.com` for code tasks to work at all; text/choice katas
  have no such dependency.
- Pinning the loader to a specific version means there's no Subresource
  Integrity (SRI) hash pinning it further: `importScripts` inside a Worker
  doesn't support an `integrity` attribute the way a `<script>` tag would, so
  this dependency is trusted at the URL/version level, not hash-verified.

### Java language level

CheerpJ 4.x has full, production-ready support for **Java 8 and Java 11**,
with partial (also production-supported) Java 17 support, and legacy Java
6/7 support via older LTS builds. This project targets **Java 8/11 language
features** for kata solutions and templates to stay solidly inside the
fully-supported range; avoid relying on Java 17-only syntax
(e.g. records, sealed classes, pattern matching for `switch`) in kata
templates or expected solutions. See <https://cheerpj.com/compatibility/>.

### stdout / return capture

Confirmed feasible and is exactly what the harness does: stdout capture via
`System.setOut` redirection around the `Main.main` call, and return-value
capture via direct typed static-method invocation with JSON-serialized
results, both printed back out between sentinel markers. No engine-level API
for "grading" exists — this is bespoke codegen per kata, generated fresh for
each run from that kata's `Check[]`. The harness's own output isn't read via
a file API; running inside a Worker with no DOM, CheerpJ's stdout/stderr
land on the Worker's `console.log`/`console.error`, which
`sandbox-worker.js` intercepts to capture and then parse (see "Sandbox and
harness" above).

### Cross-origin isolation (COOP/COEP) and GitHub Pages

CheerpJ's own documentation (getting-started, basic server setup, FAQ) does
not require `Cross-Origin-Opener-Policy` / `Cross-Origin-Embedder-Policy`
headers or `SharedArrayBuffer`-based cross-origin isolation to function; its
stated server requirement is HTTP **Range request** support (for chunked JAR
downloads) plus HTTPS in production, not custom cross-origin headers.
GitHub Pages serves static assets over HTTPS with Range support, so no
COOP/COEP is needed for CheerpJ itself with the current engine choice.

This is documented explicitly, independent of whether it currently applies,
because it's a real constraint of the hosting platform: **GitHub Pages does
not allow setting custom response headers** (no `_headers` file support, no
per-response config) since it is 100% static hosting. If a future engine
upgrade (a CheerpJ major version, or a different engine) ever required
cross-origin isolation (e.g. for `SharedArrayBuffer`/WASM threads), GitHub
Pages could not satisfy it directly — the workaround is
[`coi-serviceworker`](https://github.com/gzuidhof/coi-serviceworker), a
drop-in service worker that intercepts the page's own requests and injects
the COOP/COEP headers client-side, making a page functionally
cross-origin-isolated on hosts (like Pages) that can't set headers
server-side. Not needed today; noted here so a future engine change doesn't
silently break on Pages.
