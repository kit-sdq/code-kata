import { basicSetup } from 'codemirror';
import { EditorState, StateField, RangeSetBuilder } from '@codemirror/state';
import { EditorView, Decoration, type DecorationSet, keymap } from '@codemirror/view';
import { indentWithTab } from '@codemirror/commands';
import { java } from '@codemirror/lang-java';
import { parseTemplate, initialDoc, type Segment } from './regions.ts';

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

export function createKataEditor(parent: HTMLElement, template: string): { getSource(): string; destroy(): void } {
  const segments = parseTemplate(template);
  const doc = initialDoc(segments);
  const lockedRanges = computeLockedRanges(segments);

  const state = EditorState.create({
    doc,
    extensions: [
      basicSetup,
      java(),
      keymap.of([indentWithTab]),
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
