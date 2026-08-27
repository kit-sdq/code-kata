import type { Check } from '../kata/types.ts';
import type { RunRequestMessage, SandboxMessage } from './protocol.ts';
import { generateHarness } from './harness.ts';

export interface RunRequest {
  source: string;        // full reassembled user source (already validated)
  mainClass: string;
  checks: Check[];       // runner executes; verify.ts compares
  timeoutMs: number;
}

export type RunResult =
  | { status: 'ok'; stdouts: string[]; returns: { json: string }[] }
  | { status: 'compile-error' | 'runtime-error' | 'error'; message: string }
  | { status: 'timeout' }
  | { status: 'stopped' };

// Budget for loading CheerpJ + compiling (first load is slow); the run phase gets its own
// budget (req.timeoutMs) once the sandbox reports it has started running the harness.
const INIT_BUDGET_MS = 90_000;

interface Active {
  requestId: string;
  timeoutMs: number;
  onPhase?: (p: 'loading' | 'compiling' | 'running') => void;
  resolve: (r: RunResult) => void;
  budgetTimer: ReturnType<typeof setTimeout>;
}

let iframe: HTMLIFrameElement | null = null;
let requestCounter = 0;
let active: Active | null = null;

function teardownIframe(): void {
  if (iframe) {
    iframe.remove();
    iframe = null;
  }
}

function createIframe(): HTMLIFrameElement {
  const f = document.createElement('iframe');
  f.setAttribute('sandbox', 'allow-scripts allow-same-origin');
  f.style.display = 'none';
  f.src = './sandbox.html';
  document.body.appendChild(f);
  return f;
}

function finish(result: RunResult): void {
  if (!active) return;
  clearTimeout(active.budgetTimer);
  const resolve = active.resolve;
  active = null;
  // ponytail: always tear down and rebuild the iframe rather than reusing the CheerpJ session —
  // reusing it risks the JVM's classloader serving a stale `Main`/`KataRunner` class from a
  // previous run under the same class names. Upgrade path: reuse the iframe across runs once
  // CheerpJ's per-call class (re)loading behavior is confirmed safe, to skip repeat init cost.
  teardownIframe();
  resolve(result);
}

function handleMessage(event: MessageEvent): void {
  if (!iframe || event.source !== iframe.contentWindow) return;
  const msg = event.data as SandboxMessage;
  if (!active || !msg || msg.requestId !== active.requestId) return;

  if (msg.type === 'phase') {
    active.onPhase?.(msg.phase);
    if (msg.phase === 'running') {
      clearTimeout(active.budgetTimer);
      active.budgetTimer = setTimeout(() => finish({ status: 'timeout' }), active.timeoutMs);
    }
    return;
  }
  if (msg.type === 'result') {
    finish(msg.result);
  }
}

window.addEventListener('message', handleMessage);

export async function runJava(
  req: RunRequest,
  onPhase?: (p: 'loading' | 'compiling' | 'running') => void,
): Promise<RunResult> {
  if (active) {
    return { status: 'error', message: 'a run is already in progress' };
  }

  teardownIframe();
  iframe = createIframe();
  const requestId = String(++requestCounter);

  return new Promise<RunResult>((resolve) => {
    const budgetTimer = setTimeout(() => finish({ status: 'timeout' }), INIT_BUDGET_MS);
    active = { requestId, timeoutMs: req.timeoutMs, onPhase, resolve, budgetTimer };

    iframe!.addEventListener(
      'load',
      () => {
        if (!active || active.requestId !== requestId) return; // already finished/stopped
        const msg: RunRequestMessage = {
          type: 'run',
          requestId,
          source: req.source,
          mainClass: req.mainClass,
          checks: req.checks,
          timeoutMs: req.timeoutMs,
          harnessSource: generateHarness(req.mainClass, req.checks),
        };
        iframe!.contentWindow!.postMessage(msg, '*');
      },
      { once: true },
    );
  });
}

export function stop(): void {
  if (!active) {
    teardownIframe();
    return;
  }
  finish({ status: 'stopped' });
}
