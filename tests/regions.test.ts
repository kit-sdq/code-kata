import { describe, it, expect } from 'vitest';
import { parseTemplate, initialDoc, validateLocked } from '../src/editor/regions.ts';

const TEMPLATE = [
  'public class Main {',
  '    public static void main(String[] args) {',
  '        // BEGIN EDIT',
  '        // your code here',
  '        // END EDIT',
  '    }',
  '}',
].join('\n');

describe('parseTemplate', () => {
  it('splits on markers, stripping the marker lines, with correct editable flags', () => {
    const segments = parseTemplate(TEMPLATE);
    expect(segments.map((s) => s.editable)).toEqual([false, true, false]);
    expect(segments[0].text).toBe('public class Main {\n    public static void main(String[] args) {');
    expect(segments[1].text).toBe('        // your code here');
    expect(segments[2].text).toBe('    }\n}');
    // no marker text should survive anywhere
    for (const s of segments) {
      expect(s.text).not.toContain('BEGIN EDIT');
      expect(s.text).not.toContain('END EDIT');
    }
  });

  it('treats a template with no markers as a single fully-editable segment', () => {
    const plain = 'public class Main {\n}';
    const segments = parseTemplate(plain);
    expect(segments).toEqual([{ text: plain, editable: true }]);
  });

  it('reassembles via initialDoc to the template minus marker lines', () => {
    const segments = parseTemplate(TEMPLATE);
    expect(initialDoc(segments)).toBe(
      [
        'public class Main {',
        '    public static void main(String[] args) {',
        '        // your code here',
        '    }',
        '}',
      ].join('\n'),
    );
  });
});

describe('validateLocked', () => {
  const segments = parseTemplate(TEMPLATE);

  it('accepts untouched locked code with edited editable parts', () => {
    const source = [
      'public class Main {',
      '    public static void main(String[] args) {',
      '        System.out.println("hi");',
      '    }',
      '}',
    ].join('\n');
    expect(validateLocked(source, segments)).toBe(true);
  });

  it('rejects a deleted locked segment', () => {
    const source = ['        System.out.println("hi");', '    }', '}'].join('\n');
    expect(validateLocked(source, segments)).toBe(false);
  });

  it('rejects a modified locked segment', () => {
    const source = [
      'public class Main {',
      '    public static void main(String[] argv) {', // renamed param — locked text changed
      '        System.out.println("hi");',
      '    }',
      '}',
    ].join('\n');
    expect(validateLocked(source, segments)).toBe(false);
  });

  it('rejects reordered locked segments', () => {
    const source = [
      '    }',
      '}',
      'public class Main {',
      '    public static void main(String[] args) {',
      '        System.out.println("hi");',
    ].join('\n');
    expect(validateLocked(source, segments)).toBe(false);
  });

  it('is a no-op (always true) for a fully-editable, marker-less template', () => {
    const plainSegments = parseTemplate('anything goes');
    expect(validateLocked('completely different text', plainSegments)).toBe(true);
  });
});
