---
id: 3.3
category: 05-kontrollfluss-schleifen
title: Countdown
type: code
difficulty: easy
tags:
  de:
    - schleifen
    - kontrollfluss
  en:
    - loops
    - control-flow
hints:
  de:
    - Zählen Sie mit einer Schleife von 5 rückwärts bis 1 herunter, z. B. mit `i--`.
    - Nach dem Ende der Schleife geben Sie noch einmal `Start!` aus.
  en:
    - Use a loop to count down from 5 to 1, e.g. with `i--`.
    - After the loop ends, print `Start!` once more.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      5
      4
      3
      2
      1
      Start!
---

<!-- de -->
Geben Sie mit einer Schleife die Zahlen 5, 4, 3, 2, 1 herunterzählend aus, jede auf einer eigenen Zeile, und danach `Start!` auf einer weiteren Zeile.

<!-- en -->
Using a loop, print the numbers 5, 4, 3, 2, 1 counting down, each on its own line, and then `Start!` on another line.

<!-- all -->

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
