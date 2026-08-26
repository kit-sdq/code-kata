---
title: Sum an array
type: code
difficulty: easy
tags: [arrays, methods]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: sum
    cases:
      - args: [[1, 2, 3]]
        expected: 6
      - args: [[]]
        expected: 0
      - args: [[-1, 1]]
        expected: 0
      - args: [[10, 20, 30, 40]]
        expected: 100
hints:
  - "Start with a running total of 0 and add each element in a loop."
  - "An empty array should sum to 0 — make sure your loop handles zero elements correctly."
---

Implement the static method `sum` so that it returns the sum of all elements
in the given `int[]` array. An empty array should return `0`.

Only the method body needs to change; the class and method signature are
fixed. No imports are needed (and none are allowed) for this task.

```java template
public class Main {
    public static int sum(int[] numbers) {
        // BEGIN EDIT
        // your code here
        // END EDIT
    }
}
```
