export interface ImportViolation { kind: 'import' | 'fqn' | 'banned'; token: string; line: number; reason: string }

// Package prefixes that trigger the FQN scan (usage without import, e.g. `new java.io.File(...)`).
const FQN_PREFIXES = ['java', 'javax', 'jakarta', 'sun', 'jdk', 'com', 'org', 'net', 'io'];
const FQN_RE = new RegExp(`\\b(?:${FQN_PREFIXES.join('|')})(?:\\.[A-Za-z_$][\\w$]*)+\\b`, 'g');
const IMPORT_RE = /^[ \t]*import\s+(static\s+)?([\w.]+(?:\.\*)?)\s*;/gm;

// Identifier/call patterns banned outright, independent of any FQN prefix.
const BANNED_PATTERNS: { source: string; reason: string }[] = [
  { source: String.raw`\bClass\.forName\b`, reason: 'reflection (Class.forName) is not allowed' },
  { source: String.raw`\bClassLoader\b`, reason: 'ClassLoader is not allowed' },
  { source: String.raw`\bMethodHandles\b`, reason: 'MethodHandles is not allowed' },
  { source: String.raw`\bRuntime\.getRuntime\b`, reason: 'Runtime.getRuntime is not allowed' },
  { source: String.raw`\bProcessBuilder\b`, reason: 'ProcessBuilder is not allowed' },
  { source: String.raw`\bProcessHandle\b`, reason: 'ProcessHandle is not allowed' },
  { source: String.raw`\bSystem\.exit\b`, reason: 'System.exit is not allowed' },
  { source: String.raw`\bSystem\.load\b`, reason: 'System.load is not allowed' },
  { source: String.raw`\bUnsafe\b`, reason: 'Unsafe is not allowed' },
  { source: String.raw`\bnew\s+Thread\b`, reason: 'creating threads is not allowed' },
  { source: String.raw`\bExecutors\b`, reason: 'Executors is not allowed' },
];

// Package-prefix bans, checked against import targets and FQN tokens.
function bannedPrefixReason(token: string): string | null {
  if (token.startsWith('java.lang.reflect')) return 'java.lang.reflect (reflection) is not allowed';
  if (token.startsWith('java.io')) return 'java.io is not allowed';
  if (token.startsWith('java.net')) return 'java.net is not allowed';
  if (token.startsWith('java.nio')) return 'java.nio is not allowed';
  if (token.startsWith('javax.')) return 'javax.* is not allowed';
  if (token.startsWith('sun.')) return 'sun.* is not allowed';
  if (token.startsWith('jdk.')) return 'jdk.* is not allowed';
  return null;
}

// Strip line comments, block comments, string literals, char literals and text blocks,
// replacing removed content with spaces (newlines preserved) so line numbers stay correct.
function stripNonCode(source: string): string {
  let out = '';
  let i = 0;
  const n = source.length;
  while (i < n) {
    const c = source[i];
    const c2 = source[i + 1];

    if (c === '/' && c2 === '/') {
      while (i < n && source[i] !== '\n') { out += ' '; i++; }
      continue;
    }
    if (c === '/' && c2 === '*') {
      out += '  '; i += 2;
      while (i < n && !(source[i] === '*' && source[i + 1] === '/')) {
        out += source[i] === '\n' ? '\n' : ' ';
        i++;
      }
      if (i < n) { out += '  '; i += 2; }
      continue;
    }
    if (c === '"' && c2 === '"' && source[i + 2] === '"') {
      out += '   '; i += 3;
      while (i < n && !(source[i] === '"' && source[i + 1] === '"' && source[i + 2] === '"')) {
        out += source[i] === '\n' ? '\n' : ' ';
        i++;
      }
      if (i < n) { out += '   '; i += 3; }
      continue;
    }
    if (c === '"') {
      out += ' '; i++;
      while (i < n && source[i] !== '"' && source[i] !== '\n') {
        if (source[i] === '\\' && i + 1 < n) { out += '  '; i += 2; continue; }
        out += ' '; i++;
      }
      if (i < n && source[i] === '"') { out += ' '; i++; }
      continue;
    }
    if (c === "'") {
      out += ' '; i++;
      while (i < n && source[i] !== "'" && source[i] !== '\n') {
        if (source[i] === '\\' && i + 1 < n) { out += '  '; i += 2; continue; }
        out += ' '; i++;
      }
      if (i < n && source[i] === "'") { out += ' '; i++; }
      continue;
    }
    out += c;
    i++;
  }
  return out;
}

function lineOf(source: string, index: number): number {
  let line = 1;
  for (let i = 0; i < index; i++) if (source.charCodeAt(i) === 10) line++;
  return line;
}

function isWhitelisted(token: string, allowed: string[]): boolean {
  if (token.startsWith('java.lang.') && !token.startsWith('java.lang.reflect')) return true;
  for (const rule of allowed) {
    if (rule.endsWith('.*')) {
      const pkg = rule.slice(0, -2);
      if (token.startsWith(pkg + '.') && !token.slice(pkg.length + 1).includes('.')) return true;
    } else if (rule === token) {
      return true;
    }
  }
  return false;
}

/**
 * Whitelist/ban validator for kata source code. Ban list wins unconditionally over the
 * whitelist (a security backstop against sandbox escapes) — see docs/CONTRACT.md.
 */
export function validateImports(source: string, allowed: string[]): ImportViolation[] {
  const violations: ImportViolation[] = [];
  const masked = stripNonCode(source);

  // 1. Import statements — checked, reported, then blanked out so the FQN/banned scans
  // below don't double-report the same token.
  let codeOnly = masked;
  IMPORT_RE.lastIndex = 0;
  let m: RegExpExecArray | null;
  while ((m = IMPORT_RE.exec(masked))) {
    const isStatic = !!m[1];
    const target = m[2];
    const line = lineOf(masked, m.index);

    const checkTarget = isStatic
      ? (target.endsWith('.*') ? target.slice(0, -2) : target.slice(0, target.lastIndexOf('.')))
      : target;

    const banReason = bannedPrefixReason(checkTarget) ?? BANNED_PATTERNS.find((b) => new RegExp(b.source).test(target))?.reason;
    if (banReason) {
      violations.push({ kind: 'banned', token: target, line, reason: banReason });
    } else if (!checkTarget.endsWith('.*') ? !isWhitelisted(checkTarget, allowed) : !allowed.includes(checkTarget)) {
      violations.push({ kind: 'import', token: target, line, reason: `import "${target}" is not in the allowed imports whitelist` });
    }

    codeOnly = codeOnly.slice(0, m.index) + ' '.repeat(m[0].length) + codeOnly.slice(m.index + m[0].length);
  }

  // 2. FQN usage (no import needed to trigger, e.g. `new java.io.File(...)`).
  FQN_RE.lastIndex = 0;
  while ((m = FQN_RE.exec(codeOnly))) {
    const token = m[0];
    const line = lineOf(codeOnly, m.index);
    const banReason = bannedPrefixReason(token);
    if (banReason) {
      violations.push({ kind: 'banned', token, line, reason: banReason });
    } else if (!isWhitelisted(token, allowed)) {
      violations.push({ kind: 'fqn', token, line, reason: `"${token}" is not in the allowed imports whitelist` });
    }
  }

  // 3. Banned identifiers/calls that aren't dotted FQNs (new Thread, ProcessBuilder, ...).
  for (const b of BANNED_PATTERNS) {
    const re = new RegExp(b.source, 'g');
    while ((m = re.exec(codeOnly))) {
      violations.push({ kind: 'banned', token: m[0], line: lineOf(codeOnly, m.index), reason: b.reason });
    }
  }

  return violations.sort((a, b) => a.line - b.line);
}
