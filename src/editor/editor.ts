import { basicSetup } from 'codemirror';
import { EditorState, StateField, RangeSetBuilder } from '@codemirror/state';
import { EditorView, Decoration, type DecorationSet, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { java } from '@codemirror/lang-java';
import { HighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { parseTemplate, initialDoc, type Segment } from './regions.ts';

// Editor chrome themed via CSS custom properties, so it follows [data-theme] live
// without rebuilding the editor.
const editorTheme = EditorView.theme({
  '&': { color: 'var(--color-text)', backgroundColor: 'var(--color-surface)' },
  '.cm-content': { caretColor: 'var(--color-accent)' },
  '.cm-cursor, .cm-dropCursor': { borderLeftColor: 'var(--color-accent)' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': {
    backgroundColor: 'var(--color-accent-soft)',
  },
  '.cm-activeLine': { backgroundColor: 'var(--color-accent-soft)' },
  '.cm-activeLineGutter': { backgroundColor: 'var(--color-accent-soft)' },
  '.cm-gutters': {
    backgroundColor: 'var(--color-surface)',
    color: 'var(--color-text-muted)',
    borderRight: '1px solid var(--color-border)',
  },
  '&.cm-focused': { outline: 'none' },
});

// ~8 syntax token colors, verified ≥4.5:1 on --color-surface in both themes (see
// tests/contrast.test.ts).
const syntaxTheme = HighlightStyle.define([
  { tag: t.keyword, color: 'var(--syntax-keyword)' },
  { tag: [t.string, t.special(t.string), t.character], color: 'var(--syntax-string)' },
  { tag: [t.number, t.bool, t.null], color: 'var(--syntax-number)' },
  { tag: [t.comment, t.lineComment, t.blockComment], color: 'var(--syntax-comment)', fontStyle: 'italic' },
  { tag: [t.typeName, t.className], color: 'var(--syntax-type)' },
  { tag: [t.function(t.variableName), t.function(t.propertyName)], color: 'var(--syntax-function)' },
  { tag: [t.variableName, t.propertyName], color: 'var(--syntax-variable)' },
  { tag: [t.punctuation, t.bracket, t.operator], color: 'var(--syntax-punctuation)' },
]);

interface LockedRange { from: number; to: number }

function computeLockedRanges(segments: Segment[]): LockedRange[] {
  const ranges: LockedRange[] = [];
  let offset = 0;
  segments.forEach((seg, i) => {
    const len = seg.text.length;
    if (!seg.editable) ranges.push({ from: offset, to: offset + len });
    offset += len;
    if (i < segments.length - 1) offset += 1; // '\n' joiner between segments
  });
  return ranges;
}

// Insertions exactly at a locked range's boundary are allowed (they extend the adjacent
// editable text, not the lock); anything touching the interior is blocked.
function overlapsInterior(aFrom: number, aTo: number, bFrom: number, bTo: number): boolean {
  if (aFrom === aTo) return aFrom > bFrom && aFrom < bTo;
  return aFrom < bTo && aTo > bFrom;
}

// Locked ranges, mapped through every doc change (insertions at a locked boundary push the
// range's edges outward via mapPos bias so the locked text itself never shifts into new content).
const lockedRangesField = StateField.define<LockedRange[]>({
  create: () => [],
  update(ranges, tr) {
    if (!tr.docChanged) return ranges;
    return ranges.map(({ from, to }) => ({
      from: tr.changes.mapPos(from, 1),
      to: tr.changes.mapPos(to, -1),
    }));
  },
});

function buildDecorations(ranges: LockedRange[]): DecorationSet {
  const builder = new RangeSetBuilder<Decoration>();
  for (const r of ranges) {
    if (r.from >= r.to) continue;
    builder.add(r.from, r.to, Decoration.mark({ class: 'cm-locked-range' }));
  }
  return builder.finish();
}

const lockedDecorationsField = StateField.define<DecorationSet>({
  create: (state) => buildDecorations(state.field(lockedRangesField)),
  update: (_deco, tr) => buildDecorations(tr.state.field(lockedRangesField)),
  provide: (f) => EditorView.decorations.from(f),
});

const lockedTransactionFilter = EditorState.transactionFilter.of((tr) => {
  if (!tr.docChanged) return tr;
  const locked = tr.startState.field(lockedRangesField);
  let blocked = false;
  tr.changes.iterChangedRanges((fromA, toA) => {
    for (const r of locked) {
      if (overlapsInterior(fromA, toA, r.from, r.to)) blocked = true;
    }
  });
  return blocked ? [] : tr;
});

// Escape blurs the editor so a subsequent Tab press moves focus on to the next
// focusable element instead of indentWithTab capturing it — without this, Tab
// can never leave the editor (a keyboard trap). Must be registered before
// indentWithTab in the keymap for Escape to take effect over CodeMirror's default
// (Escape has no built-in binding in basicSetup, but ordering keeps this robust).
const escapeToBlurKeymap = keymap.of([
  { key: 'Escape', run: (view) => { view.contentDOM.blur(); return true; } },
  indentWithTab,
]);

export function createKataEditor(parent: HTMLElement, template: string, describedById?: string): { getSource(): string; destroy(): void } {
  const segments = parseTemplate(template);
  const doc = initialDoc(segments);
  const lockedRanges = computeLockedRanges(segments);

  const state = EditorState.create({
    doc,
    extensions: [
      basicSetup,
      java(),
      editorTheme,
      syntaxHighlighting(syntaxTheme),
      escapeToBlurKeymap,
      ...(describedById ? [EditorView.contentAttributes.of({ 'aria-describedby': describedById })] : []),
      lockedRangesField.init(() => lockedRanges),
      lockedDecorationsField,
      lockedTransactionFilter,
    ],
  });

  const view = new EditorView({ state, parent });

  return {
    getSource: () => view.state.doc.toString(),
    destroy: () => view.destroy(),
  };
}
