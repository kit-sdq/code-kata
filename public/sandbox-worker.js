// Runs CheerpJ inside a dedicated Worker (CheerpJ 3.0+ supports this via importScripts — see
// https://labs.leaningtech.com/blog/cheerpj-3-deep-dive — "full applications can now be run
// within Workers ... simply call importScripts to include the CheerpJ loader"). This is why the
// worker exists at all: a tight/empty infinite loop in the compiled Java (e.g. `while(true){}`)
// runs synchronously with no yield point, and running it on the sandbox iframe's own main thread
// would wedge the very thread that has to notice the timeout and report back. A Worker can
// always be hard-stopped with terminate() from outside, regardless of what it's doing, so
// public/sandbox.js (the iframe's main thread, which stays responsive) owns the actual timeout.
//
// There is no DOM here (no #console element), so CheerpJ's stdout/stderr instead land on the
// worker's own `console.log`/`console.error` — confirmed against a leaningtech Discord report
// ("Trying webworker sample" thread on answeroverflow.com/m/1267926283413749791: the worker's
// own console shows the Java program's println output). We intercept those to capture it.
importScripts('https://cjrtnc.leaningtech.com/4.3/loader.js');

// Keep these in sync with src/runner/harness.ts (this file is a plain static asset, not built
// by Vite/TS, so the sentinel strings are duplicated by hand rather than imported).
const OUT_BEGIN_PREFIX = '___KATA_OUT_BEGIN_';
const OUT_END_PREFIX = '___KATA_OUT_END_';
const OUT_SUFFIX = '___';
const DONE = '___KATA_DONE___';
const RET_PREFIX = '___KATA_RET___';
const ERR_PREFIX = '___KATA_ERR___';
const CLASSPATH = '/str/tools.jar:/files/';

let initPromise = null;
let captured = '';

for (const method of ['log', 'error', 'warn', 'info']) {
  const original = console[method] ? console[method].bind(console) : null;
  console[method] = (...args) => {
    captured += args.map(String).join(' ') + '\n';
    if (original) original(...args);
  };
}

function addStringFile(path, text) {
  const bytes = new TextEncoder().encode(text);
  const add = typeof cheerpOSAddStringFile === 'function' ? cheerpOSAddStringFile : cheerpjAddStringFile;
  add(path, bytes);
}

async function ensureInit() {
  if (!initPromise) {
    initPromise = (async () => {
      await cheerpjInit({ status: 'none' });
      // CheerpJ's /app/ mount always points at the root of the web server's origin (per
      // https://cheerpj.com/docs/guides/filesystem — "Read-only mount that points to the root
      // of your web server"), not at this file's own directory. On a site served from a subpath
      // (e.g. GitHub Pages project pages at https://host/repo/) that makes /app/tools.jar 404
      // ("Could not find or load main class com.sun.tools.javac.Main"), since tools.jar
      // actually lives at https://host/repo/tools.jar, not https://host/tools.jar. Fetch it
      // ourselves, resolved relative to this worker script's own URL (which is correct under
      // any subpath), and load it into /str/ instead — the one mount cheerpOSAddStringFile can
      // actually write to (/files/ is Java-write-only, /app/ is HTTP-read-only from Java; see
      // https://cheerpj.com/docs/explanation/File-System-support).
      const toolsJarUrl = new URL('tools.jar', self.location.href).href;
      const response = await fetch(toolsJarUrl);
      if (!response.ok) {
        throw new Error('Failed to load tools.jar from ' + toolsJarUrl + ': HTTP ' + response.status);
      }
      const bytes = new Uint8Array(await response.arrayBuffer());
      const add = typeof cheerpOSAddStringFile === 'function' ? cheerpOSAddStringFile : cheerpjAddStringFile;
      add('/str/tools.jar', bytes);
    })();
  }
  return initPromise;
}

self.onmessage = async (event) => {
  const { source, mainClass, harnessSource } = event.data;
  try {
    postMessage({ type: 'phase', phase: 'loading' });
    await ensureInit();

    postMessage({ type: 'phase', phase: 'compiling' });
    captured = '';
    addStringFile('/str/' + mainClass + '.java', source);
    addStringFile('/str/KataRunner.java', harnessSource);
    const srcMain = '/str/' + mainClass + '.java';
    const srcHarness = '/str/KataRunner.java';
    const compileExit = await cheerpjRunMain('com.sun.tools.javac.Main', CLASSPATH, srcMain, srcHarness, '-d', '/files/');
    if (compileExit !== 0) {
      postMessage({ type: 'result', result: { status: 'compile-error', message: captured.trim() || 'Compilation failed.' } });
      return;
    }

    postMessage({ type: 'phase', phase: 'running' });
    captured = '';
    const runExit = await cheerpjRunMain('KataRunner', CLASSPATH);

    const out = captured;
    const errIdx = out.indexOf(ERR_PREFIX);
    if (errIdx !== -1) {
      postMessage({ type: 'result', result: { status: 'runtime-error', message: out.slice(errIdx + ERR_PREFIX.length).split('\n')[0] } });
      return;
    }

    const doneIdx = out.indexOf(DONE);
    const stdouts = [];
    if (doneIdx !== -1) {
      for (let i = 0; ; i++) {
        const beginTag = OUT_BEGIN_PREFIX + i + OUT_SUFFIX;
        const endTag = OUT_END_PREFIX + i + OUT_SUFFIX;
        const b = out.indexOf(beginTag);
        const e = out.indexOf(endTag);
        if (b === -1 || e === -1) break;
        // Strip *all* leading/trailing blank lines, not just one: CheerpJ's console bridge can
        // flush print() vs println() into a different number of underlying writes than Java calls
        // made, so the exact newline count around the captured block isn't reliable — only the
        // sentinel positions are.
        stdouts.push(out.slice(b + beginTag.length, e).replace(/^\n+/, '').replace(/\n+$/, ''));
      }
    }

    const returns = [];
    const retRe = new RegExp(RET_PREFIX + '(.*)', 'g');
    let m;
    while ((m = retRe.exec(out)) !== null) returns.push({ json: m[1] });

    if (runExit !== 0 && doneIdx === -1) {
      postMessage({ type: 'result', result: { status: 'runtime-error', message: out.trim() || 'Program exited with code ' + runExit } });
      return;
    }

    postMessage({ type: 'result', result: { status: 'ok', stdouts, returns } });
  } catch (e) {
    postMessage({ type: 'result', result: { status: 'error', message: String((e && e.message) || e) } });
  }
};
