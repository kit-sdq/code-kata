import type { CodeKata, JavaValue } from '../../kata/types.ts';
import { createKataEditor } from '../../editor/editor.ts';
import { parseTemplate, validateLocked } from '../../editor/regions.ts';
import { validateImports, type ImportViolation } from '../../check/imports.ts';
import { runJava, stop, type RunResult } from '../../runner/runner.ts';
import { verifyResult, type Verdict, type CheckOutcome, type ReturnCaseOutcome } from '../../check/verify.ts';
import { setupFeedback } from '../hints.ts';

const PHASE_TEXT: Record<'loading' | 'compiling' | 'running', string> = {
  loading: 'Loading Java runtime…',
  compiling: 'Compiling…',
  running: 'Running…',
};

export function renderCodeView(container: HTMLElement, kata: CodeKata): void {
  const segments = parseTemplate(kata.template);

  const editorContainer = document.createElement('div');
  editorContainer.className = 'code-editor-container';
  container.appendChild(editorContainer);

  let editor = createKataEditor(editorContainer, kata.template);
  function resetEditor(): void {
    editor.destroy();
    editorContainer.innerHTML = '';
    editor = createKataEditor(editorContainer, kata.template);
  }

  const controls = document.createElement('div');
  controls.className = 'code-controls';
  controls.innerHTML = `
    <button type="button" class="run-btn">Run</button>
    <button type="button" class="stop-btn" disabled>Stop</button>
  `;
  container.appendChild(controls);
  const runBtn = controls.querySelector('.run-btn') as HTMLButtonElement;
  const stopBtn = controls.querySelector('.stop-btn') as HTMLButtonElement;

  const phaseEl = document.createElement('p');
  phaseEl.className = 'phase-indicator';
  phaseEl.setAttribute('aria-live', 'polite');
  container.appendChild(phaseEl);

  const resultContainer = document.createElement('div');
  resultContainer.className = 'result-panel';
  container.appendChild(resultContainer);

  const feedback = setupFeedback(container, kata.id, kata.hints);

  function showLockedError(): void {
    resultContainer.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'feedback feedback-incorrect';
    p.textContent = 'Locked code was modified — reset or fix.';
    resultContainer.appendChild(p);

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.textContent = 'Reset';
    resetBtn.addEventListener('click', () => {
      resetEditor();
      resultContainer.innerHTML = '';
    });
    resultContainer.appendChild(resetBtn);
  }

  function showViolations(violations: ImportViolation[]): void {
    resultContainer.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'feedback feedback-incorrect';
    p.textContent = `Disallowed code (${violations.length}):`;
    resultContainer.appendChild(p);

    const list = document.createElement('ul');
    list.className = 'violations-list';
    for (const v of violations) {
      const li = document.createElement('li');
      li.textContent = `Line ${v.line}: ${v.reason} (${v.token})`;
      list.appendChild(li);
    }
    resultContainer.appendChild(list);
  }

  async function onRun(): Promise<void> {
    const source = editor.getSource();

    if (!validateLocked(source, segments)) {
      showLockedError();
      return;
    }

    const violations = validateImports(source, kata.allowedImports);
    if (violations.length > 0) {
      showViolations(violations);
      feedback.report(false);
      return;
    }

    runBtn.disabled = true;
    stopBtn.disabled = false;
    resultContainer.innerHTML = '';
    phaseEl.textContent = '';

    try {
      const result = await runJava(
        { source, mainClass: kata.mainClass, checks: kata.checks, timeoutMs: kata.timeoutMs },
        (phase) => { phaseEl.textContent = PHASE_TEXT[phase]; },
      );
      phaseEl.textContent = '';
      const verdict = showResult(resultContainer, result, kata);
      if (verdict) feedback.report(verdict.solved);
    } finally {
      runBtn.disabled = false;
      stopBtn.disabled = true;
    }
  }

  runBtn.addEventListener('click', () => { void onRun(); });
  stopBtn.addEventListener('click', () => { stop(); });
}

const FAILURE_LABEL: Record<string, string> = {
  'compile-error': 'Compilation failed:',
  'runtime-error': 'Runtime error:',
  timeout: 'Timed out — check for infinite loops or long-running code.',
  stopped: 'Stopped.',
  error: 'Something went wrong running your code:',
};

/** Renders a RunResult (compile/verify it first if 'ok') and returns the Verdict so the caller
 * can report solved/attempts via the hints controller — undefined for non-'ok' statuses. */
export function showResult(container: HTMLElement, result: RunResult, kata: CodeKata): Verdict | undefined {
  container.innerHTML = '';
  if (result.status !== 'ok') {
    renderFailure(container, result);
    return undefined;
  }
  const verdict = verifyResult(result, kata);
  renderVerdict(container, verdict);
  return verdict;
}

function renderFailure(container: HTMLElement, result: RunResult): void {
  const p = document.createElement('p');
  p.className = 'feedback feedback-incorrect';
  p.setAttribute('aria-live', 'polite');
  p.textContent = FAILURE_LABEL[result.status] ?? result.status;
  container.appendChild(p);
  if ('message' in result && result.message) {
    const pre = document.createElement('pre');
    pre.className = 'compiler-output';
    pre.textContent = result.message;
    container.appendChild(pre);
  }
}

function renderVerdict(container: HTMLElement, verdict: Verdict): void {
  const summary = document.createElement('p');
  summary.className = `feedback ${verdict.solved ? 'feedback-correct' : 'feedback-incorrect'}`;
  summary.setAttribute('aria-live', 'polite');
  summary.textContent = verdict.solved ? '✓ All checks passed!' : '✗ Some checks failed.';
  container.appendChild(summary);

  for (const outcome of verdict.checks) {
    container.appendChild(outcome.type === 'stdout' ? renderStdoutCheck(outcome) : renderReturnCheck(outcome));
  }
}

function renderStdoutCheck(outcome: Extract<CheckOutcome, { type: 'stdout' }>): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = `check-block ${outcome.pass ? 'check-pass' : 'check-fail'}`;

  const header = document.createElement('p');
  header.className = 'check-header';
  header.textContent = outcome.pass ? '✓ Output matches' : '✗ Output does not match';
  wrap.appendChild(header);

  if (!outcome.pass) {
    const expectedLines = outcome.expected.split('\n');
    const actualLines = outcome.actual.split('\n');
    const max = Math.max(expectedLines.length, actualLines.length);
    const panel = document.createElement('div');
    panel.className = 'diff-panel';
    panel.appendChild(renderDiffColumn('Expected', expectedLines, actualLines, max));
    panel.appendChild(renderDiffColumn('Actual', actualLines, expectedLines, max));
    wrap.appendChild(panel);
  }
  return wrap;
}

function renderDiffColumn(label: string, lines: string[], otherLines: string[], max: number): HTMLElement {
  const col = document.createElement('div');
  col.className = 'diff-column';
  const h = document.createElement('h4');
  h.textContent = label;
  col.appendChild(h);
  const pre = document.createElement('pre');
  for (let i = 0; i < max; i++) {
    const line = lines[i] ?? '';
    const other = otherLines[i] ?? '';
    const lineEl = document.createElement('div');
    lineEl.className = line === other ? 'diff-line' : 'diff-line diff-line-mismatch';
    lineEl.textContent = line.length > 0 ? line : ' ';
    pre.appendChild(lineEl);
  }
  col.appendChild(pre);
  return col;
}

function formatValue(v: unknown): string {
  if (v === null || v === undefined) return 'null';
  if (Array.isArray(v)) return `[${v.map(formatValue).join(', ')}]`;
  if (typeof v === 'object' && 'type' in (v as Record<string, unknown>)) {
    return String((v as { value: unknown }).value);
  }
  return String(v);
}

function formatArgs(args: JavaValue[]): string {
  return args.map(formatValue).join(', ');
}

function addCell(tr: HTMLTableRowElement, text: string): void {
  const td = document.createElement('td');
  td.textContent = text;
  tr.appendChild(td);
}

function renderReturnCheck(outcome: Extract<CheckOutcome, { type: 'return' }>): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = `check-block ${outcome.pass ? 'check-pass' : 'check-fail'}`;

  const header = document.createElement('p');
  header.className = 'check-header';
  header.textContent = `${outcome.pass ? '✓' : '✗'} ${outcome.method}(…)`;
  wrap.appendChild(header);

  const table = document.createElement('table');
  table.className = 'cases-table';
  const thead = document.createElement('thead');
  const headRow = document.createElement('tr');
  for (const label of ['Args', 'Expected', 'Actual', '']) {
    const th = document.createElement('th');
    th.textContent = label;
    headRow.appendChild(th);
  }
  thead.appendChild(headRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  for (const c of outcome.cases as ReturnCaseOutcome[]) {
    const tr = document.createElement('tr');
    tr.className = c.pass ? 'case-pass' : 'case-fail';
    addCell(tr, formatArgs(c.args));
    addCell(tr, formatValue(c.expected));
    addCell(tr, formatValue(c.actual));
    addCell(tr, c.pass ? '✓' : '✗');
    tbody.appendChild(tr);
  }
  table.appendChild(tbody);
  wrap.appendChild(table);
  return wrap;
}
