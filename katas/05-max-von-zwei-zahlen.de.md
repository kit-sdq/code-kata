---
id: 1.1
category: 05-kontrollfluss-schleifen
title: "Maximum von zwei Zahlen"
type: code
difficulty: easy
tags: [if-else, kontrollfluss]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: maxVonZwei
    cases:
      - args: [3, 5]
        expected: 5
      - args: [5, 3]
        expected: 5
      - args: [4, 4]
        expected: 4
      - args: [-2, -7]
        expected: -2
      - args: [0, -1]
        expected: 0
hints:
  - "Eine einzige `if`-Bedingung mit `else` genügt hier bereits."
  - "Bei Gleichheit ist beide Zahlen zurückzugeben erlaubt – geben Sie einfach eine der beiden aus."
---

Schreiben Sie eine Methode `maxVonZwei`, die zwei ganze Zahlen `a` und `b` entgegennimmt und die größere der beiden zurückgibt. Sind beide gleich, geben Sie diesen Wert zurück.

```java template
public class Main {
    // BEGIN EDIT
    public static int maxVonZwei(int a, int b) {
        // TODO
        return 0;
    }
    // END EDIT
}
```
