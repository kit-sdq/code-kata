export interface Segment { text: string; editable: boolean }

const BEGIN = '// BEGIN EDIT';
const END = '// END EDIT';

/** Splits a template on `// BEGIN EDIT` / `// END EDIT` marker lines (stripped from the result). */
export function parseTemplate(template: string): Segment[] {
  const lines = template.split('\n');
  const kept: { text: string; editable: boolean }[] = [];
  let editable = false;
  let sawMarker = false;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed === BEGIN) { editable = true; sawMarker = true; continue; }
    if (trimmed === END) { editable = false; sawMarker = true; continue; }
    kept.push({ text: line, editable });
  }
  if (!sawMarker) return [{ text: template, editable: true }];

  const segments: Segment[] = [];
  let current: string[] = [];
  let curEditable = kept.length > 0 ? kept[0].editable : false;
  for (const l of kept) {
    if (l.editable !== curEditable) {
      segments.push({ text: current.join('\n'), editable: curEditable });
      current = [];
      curEditable = l.editable;
    }
    current.push(l.text);
  }
  segments.push({ text: current.join('\n'), editable: curEditable });
  return segments;
}

/** Reassembles the segments back into the document the editor starts with. */
export function initialDoc(segments: Segment[]): string {
  return segments.map((s) => s.text).join('\n');
}

/** Locked segments must appear verbatim, in order, non-overlapping in the submitted source. */
export function validateLocked(source: string, segments: Segment[]): boolean {
  let pos = 0;
  for (const seg of segments) {
    if (seg.editable) continue;
    const idx = source.indexOf(seg.text, pos);
    if (idx === -1) return false;
    pos = idx + seg.text.length;
  }
  return true;
}
