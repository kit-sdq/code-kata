---
id: "3.1"
category: 02-datentypen-variablen
title: First Declare, Then Assign
type: code
difficulty: easy
tags: [variables, declaration, assignment]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      85
      92
hints:
  - "Declare `points` with `int points;` – without a value after it."
  - "An assignment no longer needs a type before it, just `points = 85;`."
  - "Declare `points` only once in the whole method."
---

Declare a variable `points` of type `int`, initially **without** a value. Then assign it the value `85` and print it. After that, assign it the value `92` and print it again. Declare `points` only once.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: declare points, set it to 85 and print it, then set it to 92 and print it
    }
    // END EDIT
}
```
