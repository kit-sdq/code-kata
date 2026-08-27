---
id: 3.1
category: 05-kontrollfluss-schleifen
title: "Sum from 1 to n"
type: code
difficulty: easy
tags: [for-loop, control-flow]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: sumUpTo
    cases:
      - args: [0]
        expected: 0
      - args: [1]
        expected: 1
      - args: [5]
        expected: 15
      - args: [10]
        expected: 55
      - args: [-3]
        expected: 0
hints:
  - "Use a `for` loop that counts from 1 to `n` (inclusive) while summing."
  - "For `n <= 0` there are no numbers to sum — return 0 directly in that case."
---

Write a method `sumUpTo` that computes and returns the sum of all integers from 1 to `n` (inclusive) for an integer `n`, using a loop. If `n` is less than or equal to 0, return 0.

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
