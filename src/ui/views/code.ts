import type { CodeKata, JavaValue } from '../../kata/types.ts';
import { createKataEditor } from '../../editor/editor.ts';
import { parseTemplate, validateLocked } from '../../editor/regions.ts';
import { validateImports, type ImportViolation } from '../../check/imports.ts';
import { runJava, stop, type RunResult } from '../../runner/runner.ts';
import { verifyResult, type Verdict, type CheckOutcome, type ReturnCaseOutcome } from '../../check/verify.ts';
import { setupFeedback } from '../hints.ts';
import { t } from '../i18n.ts';

const PHASE_KEY: Record<'loading' | 'compiling' | 'running', string> = {
  loading: 'code.phase.loading',
  compiling: 'code.phase.compiling',
  running: 'code.phase.running',
};

export function renderCodeView(container: HTMLElement, kata: CodeKata): void {
  const segments = parseTemplate(kata.template);

  const editorHintId = `editor-kbd-hint-${kata.slug}`;
  const editorHint = document.createElement('p');
  editorHint.id = editorHintId;
  editorHint.className = 'sr-only';
  editorHint.textContent = t('editor.escapeHint');
  container.appendChild(editorHint);

  const editorContainer = document.createElement('div');
  editorContainer.className = 'code-editor-container';
  container.appendChild(editorContainer);

  let editor = createKataEditor(editorContainer, kata.template, editorHintId);
  function resetEditor(): void {
    editor.destroy();
    editorContainer.innerHTML = '';
    editor = createKataEditor(editorContainer, kata.template, editorHintId);
  }

  const controls = document.createElement('div');
  controls.className = 'code-controls';
  controls.innerHTML = `
    <button type="button" class="run-btn">${t('code.run')}</button>
    <button type="button" class="stop-btn" disabled>${t('code.stop')}</button>
  `;
  container.appendChild(controls);
  const runBtn = controls.querySelector('.run-btn') as HTMLButtonElement;
  const stopBtn = controls.querySelector('.stop-btn') as HTMLButtonElement;

  const phaseEl = document.createElement('p');
  phaseEl.className = 'phase-indicator';
  phaseEl.setAttribute('role', 'status');
  phaseEl.setAttribute('aria-live', 'polite');
  container.appendChild(phaseEl);

  // Persistent live region: this node itself is never removed/recreated, only its
  // contents are replaced by showResult/showLockedError/showViolations, so screen
  // readers reliably pick up the change (a brand-new aria-live node with content
  // already set is not consistently announced).
  const resultContainer = document.createElement('div');
  resultContainer.className = 'result-panel';
  resultContainer.setAttribute('role', 'status');
  resultContainer.setAttribute('aria-live', 'polite');
  container.appendChild(resultContainer);

  const feedback = setupFeedback(container, kata.slug, kata.hints);

  function showLockedError(): void {
    resultContainer.innerHTML = '';
    const p = document.createElement('p');
    p.className = 'feedback feedback-incorrect';
    p.textContent = t('code.lockedError');
    resultContainer.appendChild(p);

    const resetBtn = document.createElement('button');
    resetBtn.type = 'button';
    resetBtn.textContent = t('code.reset');
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
    p.textContent = t('code.violationsIntro', { n: violations.length });
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
        (phase) => { phaseEl.textContent = t(PHASE_KEY[phase]); },
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

const FAILURE_KEY: Record<string, string> = {
  'compile-error': 'code.failure.compile-error',
  'runtime-error': 'code.failure.runtime-error',
  timeout: 'code.failure.timeout',
  stopped: 'code.failure.stopped',
  error: 'code.failure.error',
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
  p.textContent = FAILURE_KEY[result.status] ? t(FAILURE_KEY[result.status]) : result.status;
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
  summary.textContent = verdict.solved ? t('code.allPassed') : t('code.somePassed');
  container.appendChild(summary);

  const stdoutTotal = verdict.checks.filter((c) => c.type === 'stdout').length;
  let stdoutIdx = 0;
  for (const outcome of verdict.checks) {
    container.appendChild(
      outcome.type === 'stdout' ? renderStdoutCheck(outcome, ++stdoutIdx, stdoutTotal) : renderReturnCheck(outcome),
    );
  }
}

function renderStdoutCheck(outcome: Extract<CheckOutcome, { type: 'stdout' }>, caseNum: number, total: number): HTMLElement {
  const wrap = document.createElement('div');
  wrap.className = `check-block ${outcome.pass ? 'check-pass' : 'check-fail'}`;

  const label = outcome.label ?? (total > 1 ? t('code.case', { n: caseNum }) : undefined);
  const header = document.createElement('p');
  header.className = 'check-header';
  const matchKey = outcome.pass ? 'code.outputMatches' : 'code.outputDiffers';
  header.textContent = label
    ? `${outcome.pass ? '✓' : '✗'} ${label}: ${t(matchKey + '.inline')}`
    : `${outcome.pass ? '✓' : '✗'} ${t(matchKey)}`;
  wrap.appendChild(header);

  if (outcome.stdin) {
    const stdinHeading = document.createElement('h4');
    stdinHeading.textContent = t('code.input');
    wrap.appendChild(stdinHeading);
    const stdinPre = document.createElement('pre');
    stdinPre.className = 'stdin-panel';
    stdinPre.textContent = outcome.stdin;
    wrap.appendChild(stdinPre);
  }

  if (!outcome.pass) {
    const expectedLines = outcome.expected.split('\n');
    const actualLines = outcome.actual.split('\n');
    const max = Math.max(expectedLines.length, actualLines.length);
    const panel = document.createElement('div');
    panel.className = 'diff-panel';
    panel.appendChild(renderDiffColumn(t('code.expected'), expectedLines, actualLines, max));
    panel.appendChild(renderDiffColumn(t('code.actual'), actualLines, expectedLines, max));
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
  for (const label of [t('code.args'), t('code.expected'), t('code.actual'), '']) {
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
