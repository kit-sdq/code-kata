---
id: 3.1
category: 05-kontrollfluss-schleifen
title:
  de: Summe von 1 bis n
  en: Sum from 1 to n
type: code
difficulty: easy
tags:
  de:
    - for-schleife
    - kontrollfluss
  en:
    - for-loop
    - control-flow
hints:
  de:
    - Nutzen Sie eine `for`-Schleife, die von 1 bis `n` (einschließlich) zählt und dabei aufsummiert.
    - Für `n <= 0` gibt es keine Zahlen zum Aufsummieren – geben Sie in diesem Fall direkt 0 zurück.
  en:
    - Use a `for` loop that counts from 1 to `n` (inclusive) while summing.
    - For `n <= 0` there are no numbers to sum — return 0 directly in that case.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: sumUpTo
    cases:
      - args:
          - 0
        expected: 0
      - args:
          - 1
        expected: 1
      - args:
          - 5
        expected: 15
      - args:
          - 10
        expected: 55
      - args:
          - -3
        expected: 0
---

<!-- de -->
Schreiben Sie eine Methode `sumUpTo`, die für eine ganze Zahl `n` die Summe aller ganzen Zahlen von 1 bis `n` (einschließlich) mit einer Schleife berechnet und zurückgibt. Ist `n` kleiner oder gleich 0, geben Sie 0 zurück.

<!-- en -->
Write a method `sumUpTo` that computes and returns the sum of all integers from 1 to `n` (inclusive) for an integer `n`, using a loop. If `n` is less than or equal to 0, return 0.

<!-- all -->

```java template
public class Main {
    // BEGIN EDIT
    public static int sumUpTo(int n) {
        // TODO
        return 0;
    }
    // END EDIT
}
```
