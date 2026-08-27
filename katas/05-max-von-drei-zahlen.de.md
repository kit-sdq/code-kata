---
id: 1.2
category: 05-kontrollfluss-schleifen
title: "Maximum von drei Zahlen"
type: code
difficulty: medium
tags: [if-else, kontrollfluss]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: maxVonDrei
    cases:
      - args: [1, 2, 3]
        expected: 3
      - args: [3, 2, 1]
        expected: 3
      - args: [2, 3, 1]
        expected: 3
      - args: [5, 5, 5]
        expected: 5
      - args: [-1, -2, -3]
        expected: -1
      - args: [0, 0, -5]
        expected: 0
hints:
  - "Merken Sie sich den bisher größten Wert in einer eigenen Variablen, z. B. beginnend mit `a`."
  - "Vergleichen Sie danach nacheinander mit `b` und mit `c` und aktualisieren Sie die Variable bei Bedarf."
  - "Eine lange `if`-`else if`-Kette mit allen Kombinationen ist nicht nötig – zwei einfache Vergleiche reichen."
---

Schreiben Sie eine Methode `maxVonDrei`, die drei ganze Zahlen `a`, `b` und `c` entgegennimmt und die größte davon zurückgibt.

```java template
public class Main {
    // BEGIN EDIT
    public static int maxVonDrei(int a, int b, int c) {
        // TODO
        return 0;
    }
    // END EDIT
}
```
