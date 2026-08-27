---
id: 1.2
category: 05-kontrollfluss-schleifen
title: "Maximum of three numbers"
type: code
difficulty: medium
tags: [if-else, control-flow]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: maxOfThree
    cases:
      - args: [1, 2, 3]
        expected: 3
      - args: [3, 2, 1]
        expected: 3
      - args: [2, 3, 1]
        expected: 3
      - args: [5, 5, 5]
        expected: 5
      - args: [-1, -2, -3]
        expected: -1
      - args: [0, 0, -5]
        expected: 0
hints:
  - "Keep track of the largest value seen so far in its own variable, e.g. starting with `a`."
  - "Then compare it with `b` and with `c` in turn, updating the variable as needed."
  - "A long `if`-`else if` chain covering every combination isn't necessary — two simple comparisons are enough."
---

Write a method `maxOfThree` that takes three integers `a`, `b`, and `c` and returns the largest of them.

```java template
public class Main {
    // BEGIN EDIT
    public static int maxOfThree(int a, int b, int c) {
        // TODO
        return 0;
    }
    // END EDIT
}
```
