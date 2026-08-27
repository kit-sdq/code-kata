---
id: 4.1
category: 05-kontrollfluss-schleifen
title: "Star triangle (nested loops)"
type: code
difficulty: medium
tags: [nested-loops, for-loop, control-flow]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      *
      **
      ***
      ****
      *****
hints:
  - "Use two nested `for` loops: the outer one counts the row, the inner one the stars in that row."
  - "In row `row` (from 1 to 5), exactly `row` stars are printed."
  - "Print the stars with `System.out.print(\"*\")` without a line break, and only print a line break with `System.out.println()` at the end of each row."
---

Using two nested `for` loops, print the following pattern of five lines:

```
*
**
***
****
*****
```

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
