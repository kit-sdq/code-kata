---
id: "2.2"
category: 02-datentypen-variablen
title: Concatenating a Greeting
type: code
difficulty: easy
tags: [string, concatenation]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      Hello Anna from Karlsruhe!
      4
hints:
  - "Use `+` to join several strings (and the variables between them)."
  - "`firstName.length()` gives you the number of characters in the string."
---

Create a `String` variable `firstName = "Anna"` and a `String` variable `city = "Karlsruhe"`. Use `+` to build a variable `sentence` that contains exactly `Hello Anna from Karlsruhe!`, and print it. Then print the length of `firstName`.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: create firstName, city and sentence, then print both
    }
    // END EDIT
}
```
