#!/bin/sh
# Rebuilds public/override-check.jar from OverrideCheck.java (Java 8 class files, so the
# JDK 8 javac that the site runs in the browser can load the processor).
set -e
here=$(cd "$(dirname "$0")" && pwd)
out=$(mktemp -d)
javac -encoding UTF-8 -Xlint:-options --release 8 -d "$out" "$here/OverrideCheck.java"
(cd "$out" && jar cf "$here/../../public/override-check.jar" ./*.class)
rm -rf "$out"
echo "built public/override-check.jar"
