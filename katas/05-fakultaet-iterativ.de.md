---
id: 3.2
category: 05-kontrollfluss-schleifen
title: "Fakultät iterativ"
type: code
difficulty: medium
tags: [while-schleife, kontrollfluss]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: fakultaet
    cases:
      - args: [0]
        expected: 1
      - args: [1]
        expected: 1
      - args: [5]
        expected: 120
      - args: [7]
        expected: 5040
      - args: [10]
        expected: 3628800
hints:
  - "Die Fakultät von 0 und von 1 ist jeweils 1 – starten Sie das Ergebnis mit 1."
  - "Multiplizieren Sie das Ergebnis in einer Schleife nacheinander mit 2, 3, 4, ... bis `n`."
  - "Eine `while`- oder `for`-Schleife funktioniert beide, ohne Rekursion."
---

Schreiben Sie eine Methode `fakultaet`, die für eine nicht-negative ganze Zahl `n` die Fakultät `n!` mit einer Schleife (nicht rekursiv) berechnet und zurückgibt. Es gilt `0! = 1` und `1! = 1`.

```java template
public class Main {
    // BEGIN EDIT
    public static int fakultaet(int n) {
        // TODO
        return 0;
    }
    // END EDIT
}
```
