---
id: "1.4"
category: 03-ein-ausgabe
title: Combining Text and Values
type: code
difficulty: medium
tags: [output, concatenation, operators]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      4 apples and 3 pears are 7 fruits.
hints:
  - "The plus sign joins text and numbers from left to right into a single piece of text."
  - "Once there's already text to the left of a `+`, anything to the right just gets appended instead of computed."
  - "Put the calculation `apples + pears` in parentheses so it is computed first and only then appended."
---

Create two variables `int apples = 4;` and `int pears = 3;`. Using a **single** `println` call, print the following sentence — the total number of fruits must be **computed** from the variables, not hard-coded in the text:

```
4 apples and 3 pears are 7 fruits.
```

Watch out for parentheses: without them, something other than `7` would appear, because Java reads the expression from left to right and a `+` next to text just glues things together instead of computing.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
