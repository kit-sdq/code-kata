---
id: 1.3
category: 06-funktionen-rekursion
title:
  de: Methode square
  en: Method square
type: code
difficulty: easy
tags:
  de:
    - funktionen
    - parameter
    - rückgabewert
  en:
    - functions
    - parameters
    - return-value
hints:
  de:
    - Der Rumpf braucht nur eine einzige `return`-Anweisung.
    - Das Quadrat einer Zahl ist die Zahl multipliziert mit sich selbst.
    - Achten Sie darauf, dass die Signatur bereits vorgegeben ist – ändern Sie nur den Rumpf.
  en:
    - The body only needs a single `return` statement.
    - The square of a number is the number multiplied by itself.
    - Note that the signature is already given — change only the body.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: square
    cases:
      - args:
          - 0
        expected: 0
      - args:
          - 1
        expected: 1
      - args:
          - 3
        expected: 9
      - args:
          - -4
        expected: 16
      - args:
          - 12
        expected: 144
---

<!-- de -->
Vervollständigen Sie die Methode `square`. Sie bekommt eine ganze Zahl als Parameter und gibt deren Quadrat zurück. Die Signatur `public static int square(int zahl)` ist bereits vorgegeben und darf nicht verändert werden.

```java template
public class Main {
    // BEGIN EDIT
    public static int square(int zahl) {
        // TODO: Quadrat von zahl zurückgeben
        return 0;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(square(5));
    }
}
```

<!-- en -->
Complete the method `square`. It receives an integer as a parameter and returns its square. The signature `public static int square(int zahl)` is already given and must not be changed.

```java template
public class Main {
    // BEGIN EDIT
    public static int square(int zahl) {
        // TODO: return the square of zahl
        return 0;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(square(5));
    }
}
```
