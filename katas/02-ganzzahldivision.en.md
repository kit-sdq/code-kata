---
id: "1.3"
category: 02-datentypen-variablen
title: Integer Division and Floating-Point Division
type: code
difficulty: medium
tags: [data-types, int, double, operators]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      3
      2
      3.4
hints:
  - "When dividing two `int` values, Java truncates the decimal places."
  - "Use `%` to get the remainder of an integer division."
  - "For `17.0 / 5` to be computed with decimal places, at least one of the two values must be a floating-point number."
---

Create two `int` variables `total = 17` and `groups = 5` and print, in this order:

1. the result of `total / groups`
2. the remainder `total % groups`
3. the result of `17.0 / 5` stored in a `double` variable

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: create total, groups and print the three values
    }
    // END EDIT
}
```
