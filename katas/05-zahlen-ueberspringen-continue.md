---
id: 5.1
category: 05-kontrollfluss-schleifen
title:
  de: Zahlen überspringen mit continue
  en: Skipping numbers with continue
type: code
difficulty: medium
tags:
  de:
    - continue
    - for-schleife
    - kontrollfluss
  en:
    - continue
    - for-loop
    - control-flow
hints:
  de:
    - Zählen Sie mit einer `for`-Schleife von 1 bis 20.
    - Prüfen Sie mit `i % 4 == 0`, ob eine Zahl durch 4 teilbar ist.
    - Mit `continue` überspringen Sie nur den Rest des aktuellen Durchlaufs – die Zahl 20 selbst darf also nicht ausgegeben werden, die Schleife läuft aber weiter.
  en:
    - Count from 1 to 20 with a `for` loop.
    - Use `i % 4 == 0` to check whether a number is divisible by 4.
    - "`continue` only skips the rest of the current pass — so the number 20 itself must not be printed, but the loop keeps running."
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      1
      2
      3
      5
      6
      7
      9
      10
      11
      13
      14
      15
      17
      18
      19
---

<!-- de -->
Geben Sie die Zahlen von 1 bis 20 aus, eine pro Zeile, überspringen Sie dabei aber alle Zahlen, die durch 4 teilbar sind (also 4, 8, 12, 16 und 20). Setzen Sie dafür `continue` ein.

<!-- en -->
Print the numbers from 1 to 20, one per line, but skip all numbers that are divisible by 4 (i.e. 4, 8, 12, 16, and 20). Use `continue` for this.

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
