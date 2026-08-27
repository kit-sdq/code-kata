---
id: 3.4
category: 05-kontrollfluss-schleifen
title:
  de: FizzBuzz (1 bis 15)
  en: FizzBuzz (1 to 15)
type: code
difficulty: medium
tags:
  de:
    - for-schleife
    - if-else
    - kontrollfluss
  en:
    - for-loop
    - if-else
    - control-flow
hints:
  de:
    - Zählen Sie mit einer `for`-Schleife von 1 bis 15.
    - Prüfen Sie zuerst die Teilbarkeit durch **beide** Zahlen (3 und 5), erst danach die einzelnen Fälle.
    - Die Bedingung `i % 3 == 0 && i % 5 == 0` erkennt eine Zahl, die durch 15 teilbar ist.
  en:
    - Count from 1 to 15 with a `for` loop.
    - Check divisibility by **both** numbers (3 and 5) first, only then the individual cases.
    - The condition `i % 3 == 0 && i % 5 == 0` detects a number that is divisible by 15.
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
---

<!-- de -->
Geben Sie die Zahlen von 1 bis 15 aus, eine pro Zeile. Bei Zahlen, die durch 3 teilbar sind, geben Sie stattdessen `Fizz` aus, bei Zahlen, die durch 5 teilbar sind, `Buzz`, und bei Zahlen, die durch 3 **und** 5 teilbar sind, `FizzBuzz`.

<!-- en -->
Print the numbers from 1 to 15, one per line. For numbers divisible by 3, print `Fizz` instead of the number; for numbers divisible by 5, print `Buzz`; and for numbers divisible by both 3 **and** 5, print `FizzBuzz`.

<!-- all -->

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
