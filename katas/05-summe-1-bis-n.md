---
id: 3.1
category: 05-kontrollfluss-schleifen
title: "Summe von 1 bis n"
type: code
difficulty: easy
tags: [for-schleife, kontrollfluss]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: summeBisN
    cases:
      - args: [0]
        expected: 0
      - args: [1]
        expected: 1
      - args: [5]
        expected: 15
      - args: [10]
        expected: 55
      - args: [-3]
        expected: 0
hints:
  - "Nutzen Sie eine `for`-Schleife, die von 1 bis `n` (einschließlich) zählt und dabei aufsummiert."
  - "Für `n <= 0` gibt es keine Zahlen zum Aufsummieren – geben Sie in diesem Fall direkt 0 zurück."
---

Schreiben Sie eine Methode `summeBisN`, die für eine ganze Zahl `n` die Summe aller ganzen Zahlen von 1 bis `n` (einschließlich) mit einer Schleife berechnet und zurückgibt. Ist `n` kleiner oder gleich 0, geben Sie 0 zurück.

```java template
public class Main {
    // BEGIN EDIT
    public static int summeBisN(int n) {
        // TODO
        return 0;
    }
    // END EDIT
}
```
