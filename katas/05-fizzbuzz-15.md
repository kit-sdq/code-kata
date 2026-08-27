---
id: 3.4
category: 05-kontrollfluss-schleifen
title: "FizzBuzz (1 bis 15)"
type: code
difficulty: medium
tags: [for-schleife, if-else, kontrollfluss]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      1
      2
      Fizz
      4
      Buzz
      Fizz
      7
      8
      Fizz
      Buzz
      11
      Fizz
      13
      14
      FizzBuzz
hints:
  - "Zählen Sie mit einer `for`-Schleife von 1 bis 15."
  - "Prüfen Sie zuerst die Teilbarkeit durch **beide** Zahlen (3 und 5), erst danach die einzelnen Fälle."
  - "Die Bedingung `i % 3 == 0 && i % 5 == 0` erkennt eine Zahl, die durch 15 teilbar ist."
---

Geben Sie die Zahlen von 1 bis 15 aus, eine pro Zeile. Bei Zahlen, die durch 3 teilbar sind, geben Sie stattdessen `Fizz` aus, bei Zahlen, die durch 5 teilbar sind, `Buzz`, und bei Zahlen, die durch 3 **und** 5 teilbar sind, `FizzBuzz`.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
