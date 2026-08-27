---
id: "3.2"
category: 03-ein-ausgabe
title: "Scanner: The nextInt Trap"
type: code
difficulty: hard
tags: [input, scanner, pitfall]
mainClass: Main
allowedImports: [java.util.Scanner]
timeoutMs: 5000
checks:
  - type: stdout
    label: "Input 42 / Am Fasanengarten"
    stdin: "42\nAm Fasanengarten\n"
    expected: |
      House number:
      Street:
      Address: Am Fasanengarten 42
  - type: stdout
    label: "Input 7 / Hauptstraße"
    stdin: "7\nHauptstraße\n"
    expected: |
      House number:
      Street:
      Address: Hauptstraße 7
hints:
  - "Read the house number with `sc.nextInt()` and the street name with `sc.nextLine()`."
  - "`nextInt()` only reads the digits — the line break from pressing Enter is left behind afterward."
  - "Call an extra `sc.nextLine()` right after `sc.nextInt()` to consume just that leftover line break. Otherwise the following `sc.nextLine()` for the street immediately reads an empty line."
---

Write a program that first prints `House number:` to ask for a house number and reads it with `sc.nextInt()`, then prints `Street:` to ask for a street name and reads it with `sc.nextLine()`. Then print the full address.

Example run for the inputs `42` and `Am Fasanengarten`:

```
House number:
Street:
Address: Am Fasanengarten 42
```

Watch out — this is where the most famous Scanner pitfall lurks: without an extra measure, the street appears to be skipped and stays empty.

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: read house number and street, print the address
    }
    // END EDIT
}
```
