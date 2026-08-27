---
id: 1.1
category: 05-kontrollfluss-schleifen
title:
  de: Maximum von zwei Zahlen
  en: Maximum of two numbers
type: code
difficulty: easy
tags:
  de:
    - if-else
    - kontrollfluss
  en:
    - if-else
    - control-flow
hints:
  de:
    - Eine einzige `if`-Bedingung mit `else` genügt hier bereits.
    - Bei Gleichheit ist beide Zahlen zurückzugeben erlaubt – geben Sie einfach eine der beiden aus.
  en:
    - A single `if` condition with `else` is already enough here.
    - If both are equal, returning either one is fine — just return one of the two.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: maxOfTwo
    cases:
      - args:
          - 3
          - 5
        expected: 5
      - args:
          - 5
          - 3
        expected: 5
      - args:
          - 4
          - 4
        expected: 4
      - args:
          - -2
          - -7
        expected: -2
      - args:
          - 0
          - -1
        expected: 0
---

<!-- de -->
Schreiben Sie eine Methode `maxOfTwo`, die zwei ganze Zahlen `a` und `b` entgegennimmt und die größere der beiden zurückgibt. Sind beide gleich, geben Sie diesen Wert zurück.

<!-- en -->
Write a method `maxOfTwo` that takes two integers `a` and `b` and returns the larger of the two. If they are equal, return that value.

<!-- all -->

```java template
public class Main {
    // BEGIN EDIT
    public static int maxOfTwo(int a, int b) {
        // TODO
        return 0;
    }
    // END EDIT
}
```
