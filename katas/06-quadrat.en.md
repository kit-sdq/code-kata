---
id: 1.3
category: 06-funktionen-rekursion
title: "Method square"
type: code
difficulty: easy
tags: [functions, parameters, return-value]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: square
    cases:
      - args: [0]
        expected: 0
      - args: [1]
        expected: 1
      - args: [3]
        expected: 9
      - args: [-4]
        expected: 16
      - args: [12]
        expected: 144
hints:
  - "The body only needs a single `return` statement."
  - "The square of a number is the number multiplied by itself."
  - "Note that the signature is already given — change only the body."
---

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
