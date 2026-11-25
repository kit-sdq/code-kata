#!/bin/sh
# Checks public/override-check.jar with the local javac (--release 8): each fixture in
# test/ok must compile, each fixture in test/fail must be rejected with the course message.
set -e
here=$(cd "$(dirname "$0")" && pwd)
jar="$here/../../public/override-check.jar"
status=0
for f in "$here"/test/ok/*.java "$here"/test/fail/*.java; do
  out=$(mktemp -d)
  cp "$f" "$out/Main.java"
  if msg=$(cd "$out" && javac -encoding UTF-8 -Xlint:-options --release 8 -processorpath "$jar" -processor OverrideCheck -d . Main.java 2>&1); then
    result=compiles
  else
    result=rejected
  fi
  case "$f" in
    */ok/*) want=compiles ;;
    *) want=rejected ;;
  esac
  if [ "$result" = "$want" ] && { [ "$want" = compiles ] || echo "$msg" | grep -q "In diesem Kurs bekommt jede überschreibende Methode @Override"; }; then
    echo "PASS $(basename "$f") ($result)"
  else
    echo "FAIL $(basename "$f"): $result, expected $want"; echo "$msg"; status=1
  fi
  rm -rf "$out"
done
exit $status
