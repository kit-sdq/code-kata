---
id: 3.5
category: 05-kontrollfluss-schleifen
title: "Repeat input (do-while)"
type: code
difficulty: medium
tags: [do-while, scanner, control-flow]
mainClass: Main
allowedImports: [java.util.Scanner]
timeoutMs: 5000
checks:
  - type: stdout
    label: "valid number on the first try"
    stdin: "5\n"
    expected: |
      Please enter a number from 1 to 10:
      Your number: 5
  - type: stdout
    label: "one invalid input before"
    stdin: "15\n3\n"
    expected: |
      Please enter a number from 1 to 10:
      Please enter a number from 1 to 10:
      Your number: 3
  - type: stdout
    label: "two invalid inputs before"
    stdin: "0\n-5\n10\n"
    expected: |
      Please enter a number from 1 to 10:
      Please enter a number from 1 to 10:
      Please enter a number from 1 to 10:
      Your number: 10
hints:
  - "The input must be read at least once before you can even check it — that argues for `do-while` instead of `while`."
  - "Before each read, print the line `Please enter a number from 1 to 10:` and then read with `scanner.nextInt()`."
  - "Repeat the body as long as the number read is less than 1 or greater than 10."
---

Write a program that uses `Scanner` to keep reading an integer until a number between 1 and 10 (inclusive) has been entered. Before **each** read, print the line

```
Please enter a number from 1 to 10:
```

Once a valid number has been entered, finally print `Your number: ` followed by the number (no further prompt).

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
