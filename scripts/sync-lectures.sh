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
<title>Vorlesungen — Lesefassungen</title>
<style>body{font-family:system-ui,sans-serif;max-width:40rem;margin:2rem auto;padding:0 1rem;line-height:1.6}</style>
</head><body><h1>Vorlesungen — Lesefassungen</h1><ul>
HTML
for f in "$src"/*/*-Lesefassung.html; do
  name=$(basename "$f")
  cp "$f" "$out/$name"
  title=$(sed -n 's:.*<title>\(.*\) — Lesefassung</title>.*:\1:p' "$f" | head -1)
  echo "<li><a href=\"$name\">$title</a></li>" >> "$idx"
done
echo '</ul><p><a href="../">Code Katas</a></p></body></html>' >> "$idx"
