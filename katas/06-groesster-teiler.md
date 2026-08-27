---
id: 2.2
category: 06-funktionen-rekursion
title:
  de: Methode largestDivisor
  en: Method largestDivisor
type: code
difficulty: medium
tags:
  de:
    - funktionen
    - parameter
    - rückgabewert
    - schleifen
  en:
    - functions
    - parameters
    - return-value
    - loops
hints:
  de:
    - Gehen Sie mit einer Schleife alle Zahlen von `n - 1` abwärts bis `1` durch.
    - Der erste Teiler, den Sie dabei finden (also der größte), ist bereits das gesuchte Ergebnis – geben Sie ihn sofort zurück.
    - Eine Zahl `i` teilt `n` genau dann, wenn `n % i == 0` gilt.
  en:
    - Loop through all numbers from `n - 1` down to `1`.
    - The first divisor you find this way (i.e. the largest one) is already the answer — return it immediately.
    - A number `i` divides `n` exactly when `n % i == 0`.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: largestDivisor
    cases:
      - args:
          - 2
        expected: 1
      - args:
          - 12
        expected: 6
      - args:
          - 17
        expected: 1
      - args:
          - 100
        expected: 50
      - args:
          - 9
        expected: 3
---

<!-- de -->
Vervollständigen Sie die Methode `largestDivisor`. Sie bekommt eine ganze Zahl `n` mit `n >= 2` als Parameter und gibt den größten Teiler von `n` zurück, der **nicht** `n` selbst ist. Für eine Primzahl wie `17` ist das Ergebnis also `1`. Die Signatur `public static int largestDivisor(int n)` ist vorgegeben.

```java template
public class Main {
    // BEGIN EDIT
    public static int largestDivisor(int n) {
        // TODO: größten Teiler von n zurückgeben, der nicht n selbst ist
        return 1;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(largestDivisor(12));
    }
}
```

<!-- en -->
Complete the method `largestDivisor`. It receives an integer `n` with `n >= 2` as a parameter and returns the largest divisor of `n` that is **not** `n` itself. For a prime number like `17`, the result is therefore `1`. The signature `public static int largestDivisor(int n)` is given.

```java template
public class Main {
    // BEGIN EDIT
    public static int largestDivisor(int n) {
        // TODO: return the largest divisor of n that is not n itself
        return 1;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(largestDivisor(12));
    }
}
```
