---
id: 3.4
category: 04-operatoren-ausdruecke
title: Even or odd?
type: code
difficulty: easy
tags: [operators, modulo, boolean, methods]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: isEven
    cases:
      - args: [4]
        expected: true
      - args: [7]
        expected: false
      - args: [0]
        expected: true
      - args: [-4]
        expected: true
      - args: [-3]
        expected: false
hints:
  - "A number is even exactly when it leaves a remainder of 0 when divided by 2."
  - "The percent sign `%` gives the remainder of a division."
  - "The expression `number % 2 == 0` is already a `boolean` – you can return it directly."
---

Complete the method `isEven`, which returns `true` for an integer `number`
if it is even, and `false` otherwise.

```java template
public class Main {
    // BEGIN EDIT
    public static boolean isEven(int number) {
        // TODO: return true if number is even
        return false;
    }
    // END EDIT

    public static void main(String[] args) {
    }
}
```
