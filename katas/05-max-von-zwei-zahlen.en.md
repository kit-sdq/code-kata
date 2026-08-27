---
id: 1.1
category: 05-kontrollfluss-schleifen
title: "Maximum of two numbers"
type: code
difficulty: easy
tags: [if-else, control-flow]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: maxOfTwo
    cases:
      - args: [3, 5]
        expected: 5
      - args: [5, 3]
        expected: 5
      - args: [4, 4]
        expected: 4
      - args: [-2, -7]
        expected: -2
      - args: [0, -1]
        expected: 0
hints:
  - "A single `if` condition with `else` is already enough here."
  - "If both are equal, returning either one is fine — just return one of the two."
---

Write a method `maxOfTwo` that takes two integers `a` and `b` and returns the larger of the two. If they are equal, return that value.

```java template
public class Main {
    // BEGIN EDIT
    public static int maxOfTwo(int a, int b) {
        // TODO
        return 0;
    }
    // END EDIT
}
```
