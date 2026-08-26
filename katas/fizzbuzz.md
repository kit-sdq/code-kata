---
title: FizzBuzz
type: code
difficulty: medium
tags: [loops, conditionals]
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
  - "Loop from 1 to 15 (inclusive) with a `for` loop."
  - "Check divisibility by 15 first (or check both 3 and 5), otherwise `Fizz`/`Buzz` alone will print for the wrong numbers."
  - "Use `System.out.println` for each line — the number if neither condition applies."
---

Implement the classic **FizzBuzz** kata.

Print the numbers from 1 to 15, one per line, except:

- for multiples of 3, print `Fizz` instead of the number,
- for multiples of 5, print `Buzz` instead of the number,
- for multiples of both 3 and 5, print `FizzBuzz` instead of the number.

Write your solution inside the editable region of `main`. No imports are
needed (and none are allowed) for this task.

```java template
public class Main {
    public static void main(String[] args) {
        // BEGIN EDIT
        // your code here
        // END EDIT
    }
}
```
