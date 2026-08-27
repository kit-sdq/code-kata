---
id: "1.2"
category: 03-ein-ausgabe
title: Business Card
type: code
difficulty: easy
tags: [output, println]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      Jane Doe
      Computer Science

      Favorite number: 7
hints:
  - "Every `println` call automatically moves to a new line afterward."
  - "A `println()` with no content produces exactly one empty line."
  - "You need exactly four `println` calls."
---

Write a program that uses `println` calls to print a name, field of study, and favorite number, one below the other. Between the field of study and the favorite number there should be an empty line, produced with an empty `println()`.

Produce exactly this output:

```
Jane Doe
Computer Science

Favorite number: 7
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
