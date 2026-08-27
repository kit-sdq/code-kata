---
id: 2.2
category: 06-funktionen-rekursion
title: "Method largestDivisor"
type: code
difficulty: medium
tags: [functions, parameters, return-value, loops]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: largestDivisor
    cases:
      - args: [2]
        expected: 1
      - args: [12]
        expected: 6
      - args: [17]
        expected: 1
      - args: [100]
        expected: 50
      - args: [9]
        expected: 3
hints:
  - "Loop through all numbers from `n - 1` down to `1`."
  - "The first divisor you find this way (i.e. the largest one) is already the answer — return it immediately."
  - "A number `i` divides `n` exactly when `n % i == 0`."
---

Complete the method `largestDivisor`. It receives an integer `n` with `n >= 2` as a parameter and returns the largest divisor of `n` that is **not** `n` itself. For a prime number like `17`, the result is therefore `1`. The signature `public static int largestDivisor(int n)` is given.

```java template
public class Main {
    // BEGIN EDIT
    public static int largestDivisor(int n) {
        // TODO: return the largest divisor of n that is not n itself
        return 1;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(largestDivisor(12));
    }
}
```
