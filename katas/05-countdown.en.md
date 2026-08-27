---
id: 3.3
category: 05-kontrollfluss-schleifen
title: "Countdown"
type: code
difficulty: easy
tags: [loops, control-flow]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      5
      4
      3
      2
      1
      Start!
hints:
  - "Use a loop to count down from 5 to 1, e.g. with `i--`."
  - "After the loop ends, print `Start!` once more."
---

Using a loop, print the numbers 5, 4, 3, 2, 1 counting down, each on its own line, and then `Start!` on another line.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
