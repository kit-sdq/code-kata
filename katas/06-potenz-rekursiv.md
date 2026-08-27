---
id: 3.4
category: 06-funktionen-rekursion
title:
  de: Potenz (rekursiv)
  en: Power (recursive)
type: code
difficulty: medium
tags:
  de:
    - rekursion
    - basisfall
  en:
    - recursion
    - base-case
hints:
  de:
    - "Der Basisfall: `basis` hoch `0` ist immer `1`."
    - "Der Rekursionsschritt: `basis` hoch `exponent` ist `basis * (basis hoch (exponent - 1))`."
    - Implementieren Sie die Methode **rekursiv**, ohne Schleife.
  en:
    - "The base case: `basis` to the power of `0` is always `1`."
    - "The recursive step: `basis` to the power of `exponent` is `basis * (basis to the power of (exponent - 1))`."
    - Implement the method **recursively**, without a loop.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: power
    cases:
      - args:
          - 2
          - 0
        expected: 1
      - args:
          - 2
          - 10
        expected: 1024
      - args:
          - 3
          - 4
        expected: 81
      - args:
          - 5
          - 3
        expected: 125
      - args:
          - 10
          - 0
        expected: 1
---

<!-- de -->
Implementieren Sie die Methode `power` **rekursiv**. Sie berechnet `basis` hoch `exponent` für einen nicht-negativen Exponenten. Die Signatur `public static int power(int basis, int exponent)` ist vorgegeben.

```java template
public class Main {
    // BEGIN EDIT
    public static int power(int basis, int exponent) {
        // TODO: rekursiv basis hoch exponent berechnen
        return 1;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(power(2, 10));
    }
}
```

<!-- en -->
Implement the method `power` **recursively**. It computes `basis` to the power of `exponent` for a non-negative exponent. The signature `public static int power(int basis, int exponent)` is given.

```java template
public class Main {
    // BEGIN EDIT
    public static int power(int basis, int exponent) {
        // TODO: recursively compute basis to the power of exponent
        return 1;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(power(2, 10));
    }
}
```
