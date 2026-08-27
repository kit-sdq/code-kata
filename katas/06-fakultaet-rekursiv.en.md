---
id: 3.2
category: 06-funktionen-rekursion
title: "Factorial (recursive)"
type: code
difficulty: medium
tags: [recursion, base-case]
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
      - args: [10]
        expected: 3628800
hints:
  - "The base case: for `n <= 1`, the factorial is `1`."
  - "The recursive step: `factorial(n)` is `n * factorial(n - 1)`."
  - "Implement the method **recursively**, i.e. with a call to `factorial` in its own body, not with a loop."
---

Implement the method `factorial` **recursively**. For a non-negative integer `n`, it computes the factorial `n! = n · (n-1) · … · 1`, with `0! = 1`. The signature `public static int factorial(int n)` is given.

Stick to small values of `n` (up to `10`) so the result fits into an `int`.

```java template
public class Main {
    // BEGIN EDIT
    public static int factorial(int n) {
        // TODO: recursively compute the factorial of n
        return 1;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(factorial(5));
    }
}
```
