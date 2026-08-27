---
id: 2.1
category: 06-funktionen-rekursion
title: "Method isEven"
type: code
difficulty: easy
tags: [functions, parameters, return-value, boolean]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: isEven
    cases:
      - args: [0]
        expected: true
      - args: [1]
        expected: false
      - args: [4]
        expected: true
      - args: [7]
        expected: false
      - args: [-4]
        expected: true
      - args: [-3]
        expected: false
hints:
  - "The modulo operator `%` gives the remainder of a division."
  - "A number is even exactly when the remainder of division by 2 is 0."
  - "Also think about negative numbers: in Java, `-4 % 2` is `0`."
---

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
