---
id: "1.4"
category: 02-datentypen-variablen
title: Quotient and Remainder as a Method
type: code
difficulty: medium
tags: [data-types, int, methods]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: divisionAndRemainder
    cases:
      - args: [17, 5]
        expected: [3, 2]
      - args: [20, 4]
        expected: [5, 0]
      - args: [7, 2]
        expected: [3, 1]
hints:
  - "Create two `int` variables inside the method for the quotient and the remainder."
  - "`total / groups` gives the quotient, `total % groups` gives the remainder."
  - "Return both values as an `int[]` using `new int[] {quotient, remainder}`."
---

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
