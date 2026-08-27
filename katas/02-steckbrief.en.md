---
id: "3.3"
category: 02-datentypen-variablen
title: Profile with Four Variables
type: code
difficulty: easy
tags: [variables, data-types]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      19
      1.75
      true
      A
hints:
  - "Choose the matching type for each value: `int`, `double`, `boolean` and `char`."
  - "A `char` value always stands in single quotes, e.g. `'A'`."
  - "Print the four variables in exactly this order with `System.out.println`."
---

Declare and initialize four variables with descriptive camelCase names in `main`:

- an age of `19` (whole number)
- a height of `1.75` meters (floating-point number)
- the value `true` for "is a student" (boolean)
- the initial letter `'A'` of a first name (single character)

Print all four variables in this order with `System.out.println`.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: create the four variables and print them
    }
    // END EDIT
}
```
