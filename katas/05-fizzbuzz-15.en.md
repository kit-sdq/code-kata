---
id: 3.4
category: 05-kontrollfluss-schleifen
title: "FizzBuzz (1 to 15)"
type: code
difficulty: medium
tags: [for-loop, if-else, control-flow]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      1
      2
      Fizz
      4
      Buzz
      Fizz
      7
      8
      Fizz
      Buzz
      11
      Fizz
      13
      14
      FizzBuzz
hints:
  - "Count from 1 to 15 with a `for` loop."
  - "Check divisibility by **both** numbers (3 and 5) first, only then the individual cases."
  - "The condition `i % 3 == 0 && i % 5 == 0` detects a number that is divisible by 15."
---

Print the numbers from 1 to 15, one per line. For numbers divisible by 3, print `Fizz` instead of the number; for numbers divisible by 5, print `Buzz`; and for numbers divisible by both 3 **and** 5, print `FizzBuzz`.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
