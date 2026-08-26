// Sandbox iframe controller — runs inside public/sandbox.html, talks to the parent page
// (src/runner/runner.ts) via postMessage per the shapes in src/runner/protocol.ts (mirrored
// here in plain JS since this file ships unbundled).
//
// The actual CheerpJ work happens in public/sandbox-worker.js, a dedicated Worker. That's the
// point of this split: this file's own thread must stay responsive so its setTimeout can fire
// and its worker.terminate() call can actually run even if the Java program is a tight infinite
// loop that never yields (see the comment at the top of sandbox-worker.js for why that matters
// and how it's confirmed to work).

let worker = null;
let run = null; // { requestId, timer }

function post(msg) {
  window.parent.postMessage(msg, '*');
}

function finish(result) {
  if (!run) return;
  clearTimeout(run.timer);
  const requestId = run.requestId;
  run = null;
  if (worker) {
    worker.terminate();
    worker = null;
  }
  post({ type: 'result', requestId, result });
}

window.addEventListener('message', (event) => {
  if (event.source !== window.parent) return; // only accept messages from our host page
  const msg = event.data;
  if (!msg || typeof msg !== 'object') return;

  if (msg.type === 'run') {
    if (run) return; // one run at a time
    run = { requestId: msg.requestId, timer: null };
    worker = new Worker('./sandbox-worker.js');

    worker.onmessage = (e) => {
      const m = e.data;
      if (!run) return;
      if (m.type === 'phase') {
        post({ type: 'phase', requestId: run.requestId, phase: m.phase });
        if (m.phase === 'running') {
          clearTimeout(run.timer);
          run.timer = setTimeout(() => finish({ status: 'timeout' }), msg.timeoutMs);
        }
      } else if (m.type === 'result') {
        finish(m.result);
      }
    };
    worker.onerror = (e) => {
      finish({ status: 'error', message: e.message || 'worker error' });
    };

    worker.postMessage({ source: msg.source, mainClass: msg.mainClass, harnessSource: msg.harnessSource });
  } else if (msg.type === 'stop') {
    if (run && run.requestId === msg.requestId) finish({ status: 'stopped' });
  }
});
