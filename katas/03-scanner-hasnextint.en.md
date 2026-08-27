---
id: "3.4"
category: 03-ein-ausgabe
title: "Scanner: Checking Input Robustly"
type: code
difficulty: medium
tags: [input, scanner]
mainClass: Main
allowedImports: [java.util.Scanner]
timeoutMs: 5000
checks:
  - type: stdout
    label: "Input 21"
    stdin: "21\n"
    expected: |
      How old are you?
      Input is a whole number: true
  - type: stdout
    label: "Input twenty-one"
    stdin: "twenty-one\n"
    expected: |
      How old are you?
      Input is a whole number: false
hints:
  - "`sc.hasNextInt()` checks whether a whole number comes next, without reading it."
  - "The result of `hasNextInt()` is a `boolean` — store it in a variable."
  - "Don't read the number yet, just print the result of the check."
---

Write a program that prints `How old are you?` to ask for the age and, **before** actually reading it, uses `sc.hasNextInt()` to check whether a whole number is really there. Store the result in a `boolean` variable and print it:

```
How old are you?
Input is a whole number: true
```

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: use hasNextInt() to check whether a whole number is next
    }
    // END EDIT
}
```
