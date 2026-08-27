---
id: "1.4"
category: 02-datentypen-variablen
title:
  de: Quotient und Rest als Methode
  en: Quotient and Remainder as a Method
type: code
difficulty: medium
tags:
  de:
    - datentypen
    - int
    - methoden
  en:
    - data-types
    - int
    - methods
hints:
  de:
    - Legen Sie in der Methode zwei `int`-Variablen für Quotient und Rest an.
    - "`gesamt / gruppen` liefert den Quotienten, `gesamt % gruppen` den Rest."
    - Geben Sie beide Werte als `int[]` mit `new int[] {quotient, rest}` zurück.
  en:
    - Create two `int` variables inside the method for the quotient and the remainder.
    - "`total / groups` gives the quotient, `total % groups` gives the remainder."
    - Return both values as an `int[]` using `new int[] {quotient, remainder}`.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: divisionAndRemainder
    cases:
      - args:
          - 17
          - 5
        expected:
          - 3
          - 2
      - args:
          - 20
          - 4
        expected:
          - 5
          - 0
      - args:
          - 7
          - 2
        expected:
          - 3
          - 1
---

<!-- de -->
Vervollständigen Sie die statische Methode `divisionAndRemainder`. Sie erhält zwei `int`-Parameter `gesamt` und `gruppen` und soll ein `int[]` mit genau zwei Werten zurückgeben: zuerst den Quotienten `gesamt / gruppen`, dann den Rest `gesamt % gruppen`.

```java template
public class Main {
    // BEGIN EDIT
    public static int[] divisionAndRemainder(int gesamt, int gruppen) {
        // TODO: Quotient und Rest berechnen und als int[] zurückgeben
        return null;
    }
    // END EDIT
}
```

<!-- en -->
Complete the static method `divisionAndRemainder`. It receives two `int` parameters `total` and `groups` and should return an `int[]` with exactly two values: first the quotient `total / groups`, then the remainder `total % groups`.

```java template
public class Main {
    // BEGIN EDIT
    public static int[] divisionAndRemainder(int total, int groups) {
        // TODO: compute quotient and remainder and return them as int[]
        return null;
    }
    // END EDIT
}
```
