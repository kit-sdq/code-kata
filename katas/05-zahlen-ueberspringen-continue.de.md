---
id: 5.1
category: 05-kontrollfluss-schleifen
title: "Zahlen überspringen mit continue"
type: code
difficulty: medium
tags: [continue, for-schleife, kontrollfluss]
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
hints:
  - "Zählen Sie mit einer `for`-Schleife von 1 bis 20."
  - "Prüfen Sie mit `i % 4 == 0`, ob eine Zahl durch 4 teilbar ist."
  - "Mit `continue` überspringen Sie nur den Rest des aktuellen Durchlaufs – die Zahl 20 selbst darf also nicht ausgegeben werden, die Schleife läuft aber weiter."
---

Geben Sie die Zahlen von 1 bis 20 aus, eine pro Zeile, überspringen Sie dabei aber alle Zahlen, die durch 4 teilbar sind (also 4, 8, 12, 16 und 20). Setzen Sie dafür `continue` ein.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
