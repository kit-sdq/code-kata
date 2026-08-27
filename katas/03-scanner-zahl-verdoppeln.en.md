---
id: "3.1"
category: 03-ein-ausgabe
title: "Scanner: Doubling a Number"
type: code
difficulty: easy
tags: [input, scanner]
mainClass: Main
allowedImports: [java.util.Scanner]
timeoutMs: 5000
checks:
  - type: stdout
    label: "Input 5"
    stdin: "5\n"
    expected: |
      10
  - type: stdout
    label: "Input -3"
    stdin: "-3\n"
    expected: |
      -6
hints:
  - "Create a `Scanner` with `new Scanner(System.in)` — don't forget `import java.util.Scanner;`."
  - "Read the number with `sc.nextInt()`."
  - "Print only the doubled number, nothing else."
---

Use a `Scanner` to read a whole number from standard input and print its double.

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: read the number, print its double
    }
    // END EDIT
}
```
