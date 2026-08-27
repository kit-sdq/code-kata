---
id: 3.2
category: 05-kontrollfluss-schleifen
title: "Factorial iteratively"
type: code
difficulty: medium
tags: [while-loop, control-flow]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: factorial
    cases:
      - args: [0]
        expected: 1
      - args: [1]
        expected: 1
      - args: [5]
        expected: 120
      - args: [7]
        expected: 5040
      - args: [10]
        expected: 3628800
hints:
  - "The factorial of 0 and of 1 is 1 each — start the result at 1."
  - "Multiply the result in a loop successively by 2, 3, 4, ... up to `n`."
  - "Either a `while` or a `for` loop works, without recursion."
---

Write a method `factorial` that computes and returns the factorial `n!` of a non-negative integer `n` using a loop (not recursion). `0! = 1` and `1! = 1`.

```java template
public class Main {
    // BEGIN EDIT
    public static int factorial(int n) {
        // TODO
        return 0;
    }
    // END EDIT
}
```
