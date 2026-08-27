---
id: 3.3
category: 06-funktionen-rekursion
title: "Digit Sum (recursive)"
type: code
difficulty: medium
tags: [recursion, base-case]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: digitSum
    cases:
      - args: [7]
        expected: 7
      - args: [1234]
        expected: 10
      - args: [999]
        expected: 27
      - args: [100]
        expected: 1
      - args: [50000]
        expected: 5
hints:
  - "`n % 10` gives the last digit of `n`, `n / 10` cuts off that last digit."
  - "The base case is reached when the number has only one digit left, i.e. `n < 10` — then the digit sum is the number itself."
  - "Implement the method **recursively**: `digitSum(n)` is the last digit plus `digitSum` of the rest."
---

Implement the method `digitSum` **recursively**. It computes the digit sum of a non-negative integer `n`, i.e. the sum of its digits. For example, the digit sum of `1234` is `1 + 2 + 3 + 4 = 10`. The signature `public static int digitSum(int n)` is given.

```java template
public class Main {
    // BEGIN EDIT
    public static int digitSum(int n) {
        // TODO: recursively compute the digit sum of n
        return n;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(digitSum(1234));
    }
}
```
