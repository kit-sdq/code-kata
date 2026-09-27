---
id: 2.1
category: 06-methoden
title:
  de: Methode isEven
  en: Method isEven
type: code
difficulty: easy
tags:
  de:
    - methoden
    - parameter
    - rückgabewert
    - boolean
  en:
    - methods
    - parameters
    - return-value
    - boolean
hints:
  de:
    - Der Modulo-Operator `%` liefert den Rest einer Division.
    - Eine Zahl ist genau dann gerade, wenn der Rest bei Division durch 2 gleich 0 ist.
    - "Denken Sie auch an negative Zahlen: `-4 % 2` ist in Java `0`."
  en:
    - The modulo operator `%` gives the remainder of a division.
    - A number is even exactly when the remainder of division by 2 is 0.
    - "Also think about negative numbers: in Java, `-4 % 2` is `0`."
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: isEven
    cases:
      - args:
          - 0
        expected: true
      - args:
          - 1
        expected: false
      - args:
          - 4
        expected: true
      - args:
          - 7
        expected: false
      - args:
          - -4
        expected: true
      - args:
          - -3
        expected: false
---

<!-- de -->
Vervollständigen Sie die Methode `isEven`. Sie bekommt eine ganze Zahl als Parameter und gibt genau dann `true` zurück, wenn diese Zahl gerade ist. Die Signatur `public static boolean isEven(int zahl)` ist vorgegeben.

```java template
public class Main {
    // BEGIN EDIT
    public static boolean isEven(int zahl) {
        // TODO: true, falls zahl gerade ist, sonst false
        return false;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(isEven(4));
    }
}
```

<!-- en -->
Complete the method `isEven`. It receives an integer as a parameter and returns `true` exactly when that number is even. The signature `public static boolean isEven(int zahl)` is given.

```java template
public class Main {
    // BEGIN EDIT
    public static boolean isEven(int zahl) {
        // TODO: true if zahl is even, false otherwise
        return false;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(isEven(4));
    }
}
```
