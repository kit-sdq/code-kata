#!/bin/sh
# Copy lecture reading variants into public/lectures and regenerate its index.
# Usage: scripts/sync-lectures.sh [path/to/invertedclassroom/lectures]
set -eu
src="${1:-../invertedclassroom/lectures}"
out="$(dirname "$0")/../public/lectures"
rm -rf "$out"; mkdir -p "$out"
idx="$out/index.html"
cat > "$idx" <<'HTML'
<!doctype html>
<html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light dark">
<title>Vorlesungen — Lesefassungen</title>
<style>
body{font-family:system-ui,sans-serif;max-width:40rem;margin:0 auto;padding:1.5rem 1rem;line-height:1.6;color:#1f2328;background:#fff}
a{color:#4f46e5}
ol{list-style:none;padding:0}
li a{display:block;padding:.6rem .9rem;margin:.4rem 0;border:1px solid #767676;border-radius:10px;text-decoration:none}
li a:hover{background:#f6f8fa}
@media(prefers-color-scheme:dark){body{color:#e6edf3;background:#0d1117}a{color:#818cf8}li a:hover{background:#161b22}}
</style>
</head><body>
<a href="../"><img src="../img/sdq-logo.svg" alt="SDQ" height="32"></a>
<h1>Vorlesungen — Lesefassungen</h1>
<ol>
HTML
for f in "$src"/*/*-Lesefassung.html; do
  name=$(basename "$f")
  cp "$f" "$out/$name"
  title=$(sed -n 's:.*<title>\(.*\) — Lesefassung</title>.*:\1:p' "$f" | head -1)
  echo "<li><a href=\"$name\">$title</a></li>" >> "$idx"
done
echo '</ol><p><a href="../">Code Katas</a></p></body></html>' >> "$idx"
