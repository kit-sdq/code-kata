---
id: 3.2
category: 05-kontrollfluss-schleifen
title:
  de: Fakultät iterativ
  en: Factorial iteratively
type: code
difficulty: medium
tags:
  de:
    - while-schleife
    - kontrollfluss
  en:
    - while-loop
    - control-flow
hints:
  de:
    - Die Fakultät von 0 und von 1 ist jeweils 1 – starten Sie das Ergebnis mit 1.
    - Multiplizieren Sie das Ergebnis in einer Schleife nacheinander mit 2, 3, 4, ... bis `n`.
    - Eine `while`- oder `for`-Schleife funktioniert beide, ohne Rekursion.
  en:
    - The factorial of 0 and of 1 is 1 each — start the result at 1.
    - Multiply the result in a loop successively by 2, 3, 4, ... up to `n`.
    - Either a `while` or a `for` loop works, without recursion.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: factorial
    cases:
      - args:
          - 0
        expected: 1
      - args:
          - 1
        expected: 1
      - args:
          - 5
        expected: 120
      - args:
          - 7
        expected: 5040
      - args:
          - 10
        expected: 3628800
---

<!-- de -->
Schreiben Sie eine Methode `factorial`, die für eine nicht-negative ganze Zahl `n` die Fakultät `n!` mit einer Schleife (nicht rekursiv) berechnet und zurückgibt. Es gilt `0! = 1` und `1! = 1`.

<!-- en -->
Write a method `factorial` that computes and returns the factorial `n!` of a non-negative integer `n` using a loop (not recursion). `0! = 1` and `1! = 1`.

<!-- all -->

```java template
public class Main {
    // BEGIN EDIT
    public static int factorial(int n) {
        // TODO
        return 0;
    }
    // END EDIT
}
```
