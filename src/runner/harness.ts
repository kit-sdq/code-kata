// Generates the Java source for `KataRunner.java`, the harness class that CheerpJ compiles
// alongside the user's `<mainClass>.java` and runs to execute a kata's checks.
//
// Design: rather than reflecting on the checked method's return type at codegen time, we lean
// on Java overload resolution — `toJson(...)` has one overload per primitive/array type, and
// javac picks the right one for whatever `<mainClass>.<method>(...)` statically returns. So the
// TS side only needs to turn `args` (JavaValue) into Java literals; it never needs to know the
// target parameter/return types.
import type { Check, JavaValue } from '../kata/types.ts';

export const OUT_BEGIN = '___KATA_OUT_BEGIN___';
export const OUT_END = '___KATA_OUT_END___';
export const RET_PREFIX = '___KATA_RET___';
export const ERR_PREFIX = '___KATA_ERR___';

type JType = 'int' | 'long' | 'double' | 'float' | 'boolean' | 'char' | 'String';

function isWrapper(v: JavaValue): v is { type: 'long' | 'float' | 'char' | 'double' | 'int'; value: number | string } {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

/** Escapes a JS string into the body of a Java string/char literal (already inside the quotes). */
function escapeJavaChars(s: string): string {
  let out = '';
  for (let i = 0; i < s.length; i++) {
    const code = s.charCodeAt(i);
    const ch = s[i];
    if (ch === '\\') out += '\\\\';
    else if (ch === '"') out += '\\"';
    else if (ch === '\n') out += '\\n';
    else if (ch === '\r') out += '\\r';
    else if (ch === '\t') out += '\\t';
    else if (code < 0x20 || code > 0x7e) out += '\\u' + code.toString(16).padStart(4, '0');
    else out += ch;
  }
  return out;
}

function javaStringLiteral(s: string): string {
  return '"' + escapeJavaChars(s) + '"';
}

function charJavaLiteral(v: number | string): string {
  const code = typeof v === 'number' ? v : (v.codePointAt(0) ?? 0);
  if (code === 0x27) return "'\\''";
  if (code === 0x5c) return "'\\\\'";
  if (code === 0x0a) return "'\\n'";
  if (code === 0x0d) return "'\\r'";
  if (code === 0x09) return "'\\t'";
  if (code >= 0x20 && code <= 0x7e) return `'${String.fromCharCode(code)}'`;
  return `'\\u${code.toString(16).padStart(4, '0')}'`;
}

function elementJavaType(v: JavaValue): JType {
  if (typeof v === 'boolean') return 'boolean';
  if (typeof v === 'string') return 'String';
  if (typeof v === 'number') return 'int';
  if (v === null) throw new Error('cannot infer array element type from null');
  if (Array.isArray(v)) throw new Error('nested arrays are not supported (1-D arrays only)');
  if (isWrapper(v)) {
    switch (v.type) {
      case 'long': return 'long';
      case 'float': return 'float';
      case 'double': return 'double';
      case 'int': return 'int';
      case 'char': return 'char';
    }
  }
  throw new Error('unsupported array element: ' + JSON.stringify(v));
}

/** A Java literal for a scalar (non-array) JavaValue, used both standalone and as array elements. */
function scalarLiteral(v: JavaValue): string {
  if (v === null) return 'null';
  if (typeof v === 'boolean') return String(v);
  if (typeof v === 'string') return javaStringLiteral(v);
  if (typeof v === 'number') return String(v);
  if (Array.isArray(v)) throw new Error('scalarLiteral called with an array');
  if (isWrapper(v)) {
    const val = v.value;
    switch (v.type) {
      case 'long': return String(val) + 'L';
      case 'float': return String(val) + 'f';
      case 'int': return String(val);
      case 'char': return charJavaLiteral(val);
      case 'double': {
        const s = String(val);
        return /[.eE]/.test(s) ? s : s + '.0';
      }
    }
  }
  throw new Error('unsupported JavaValue: ' + JSON.stringify(v));
}

function arrayLiteral(arr: JavaValue[], hint?: JType): string {
  let type: JType | undefined = hint;
  for (const el of arr) {
    if (el === null || Array.isArray(el)) continue;
    type = elementJavaType(el);
    break;
  }
  if (!type) type = 'int'; // ponytail: no non-empty sibling case to infer from — default to int[]
  const elems = arr.map((el) => scalarLiteral(el));
  return `new ${type}[]{${elems.join(', ')}}`;
}

/** Java literal for one argument, given the same argument's value across every case (to infer
 * an empty array's element type from a sibling case when the array itself carries no elements). */
function literalForArg(v: JavaValue, siblings: JavaValue[]): string {
  if (!Array.isArray(v)) return scalarLiteral(v);
  if (v.length > 0) return arrayLiteral(v);
  let hint: JType | undefined;
  for (const sib of siblings) {
    if (Array.isArray(sib) && sib.length > 0) {
      hint = elementJavaType(sib.find((e) => e !== null) ?? sib[0]);
      break;
    }
  }
  return arrayLiteral(v, hint);
}

function indent(lines: string[], depth: number): string {
  const pad = '    '.repeat(depth);
  return lines.map((l) => pad + l).join('\n');
}

/** Generates the full source of `KataRunner.java` for the given main class and checks. */
export function generateHarness(mainClass: string, checks: Check[]): string {
  const body: string[] = [];
  for (const check of checks) {
    if (check.type === 'stdout') {
      body.push(`${mainClass}.main(new String[0]);`);
    } else {
      for (const kase of check.cases) {
        const args = kase.args.map((a, i) => literalForArg(a, check.cases.map((c) => c.args[i])));
        body.push(`rets.add(toJson(${mainClass}.${check.method}(${args.join(', ')})));`);
      }
    }
  }

  return `import java.io.*;
import java.util.*;

public class KataRunner {
    public static void main(String[] args) throws Exception {
        PrintStream real = System.out;
        ByteArrayOutputStream buf = new ByteArrayOutputStream();
        PrintStream captured = new PrintStream(buf, true, "UTF-8");
        List<String> rets = new ArrayList<String>();
        String errMsg = null;
        try {
            System.setOut(captured);
${indent(body, 3)}
        } catch (Throwable t) {
            StackTraceElement[] st = t.getStackTrace();
            errMsg = t.toString() + (st.length > 0 ? (" at " + st[0]) : "");
        } finally {
            System.setOut(real);
        }
        real.println("${OUT_BEGIN}");
        real.print(buf.toString("UTF-8"));
        real.println();
        real.println("${OUT_END}");
        for (String r : rets) real.println("${RET_PREFIX}" + r);
        if (errMsg != null) real.println("${ERR_PREFIX}" + errMsg);
    }

    static String jsonEscape(String s) {
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < s.length(); i++) {
            char c = s.charAt(i);
            switch (c) {
                case '\\\\': sb.append("\\\\\\\\"); break;
                case '"': sb.append("\\\\\\""); break;
                case '\\n': sb.append("\\\\n"); break;
                case '\\r': sb.append("\\\\r"); break;
                case '\\t': sb.append("\\\\t"); break;
                default:
                    if (c < 0x20 || c > 0x7e) sb.append(String.format("\\\\u%04x", (int) c));
                    else sb.append(c);
            }
        }
        return sb.toString();
    }

    static String toJson(int v) { return Integer.toString(v); }
    static String toJson(long v) { return "{\\"type\\":\\"long\\",\\"value\\":\\"" + v + "\\"}"; }
    static String toJson(double v) { return Double.toString(v); }
    static String toJson(float v) { return Float.toString(v); }
    static String toJson(boolean v) { return Boolean.toString(v); }
    static String toJson(char v) { return "\\"" + jsonEscape(String.valueOf(v)) + "\\""; }
    static String toJson(String v) { return v == null ? "null" : "\\"" + jsonEscape(v) + "\\""; }
    static String toJson(Object v) { return v == null ? "null" : String.valueOf(v); }

    static String toJson(int[] v) { StringBuilder sb = new StringBuilder("["); for (int i = 0; i < v.length; i++) { if (i > 0) sb.append(","); sb.append(toJson(v[i])); } return sb.append("]").toString(); }
    static String toJson(long[] v) { StringBuilder sb = new StringBuilder("["); for (int i = 0; i < v.length; i++) { if (i > 0) sb.append(","); sb.append(toJson(v[i])); } return sb.append("]").toString(); }
    static String toJson(double[] v) { StringBuilder sb = new StringBuilder("["); for (int i = 0; i < v.length; i++) { if (i > 0) sb.append(","); sb.append(toJson(v[i])); } return sb.append("]").toString(); }
    static String toJson(float[] v) { StringBuilder sb = new StringBuilder("["); for (int i = 0; i < v.length; i++) { if (i > 0) sb.append(","); sb.append(toJson(v[i])); } return sb.append("]").toString(); }
    static String toJson(boolean[] v) { StringBuilder sb = new StringBuilder("["); for (int i = 0; i < v.length; i++) { if (i > 0) sb.append(","); sb.append(toJson(v[i])); } return sb.append("]").toString(); }
    static String toJson(char[] v) { StringBuilder sb = new StringBuilder("["); for (int i = 0; i < v.length; i++) { if (i > 0) sb.append(","); sb.append(toJson(v[i])); } return sb.append("]").toString(); }
    static String toJson(String[] v) { StringBuilder sb = new StringBuilder("["); for (int i = 0; i < v.length; i++) { if (i > 0) sb.append(","); sb.append(toJson(v[i])); } return sb.append("]").toString(); }
}
`;
}
