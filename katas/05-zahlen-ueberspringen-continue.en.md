---
id: 5.1
category: 05-kontrollfluss-schleifen
title: "Skipping numbers with continue"
type: code
difficulty: medium
tags: [continue, for-loop, control-flow]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      1
      2
      3
      5
      6
      7
      9
      10
      11
      13
      14
      15
      17
      18
      19
hints:
  - "Count from 1 to 20 with a `for` loop."
  - "Use `i % 4 == 0` to check whether a number is divisible by 4."
  - "`continue` only skips the rest of the current pass — so the number 20 itself must not be printed, but the loop keeps running."
---

Print the numbers from 1 to 20, one per line, but skip all numbers that are divisible by 4 (i.e. 4, 8, 12, 16, and 20). Use `continue` for this.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
