---
id: 1.3
category: 06-funktionen-rekursion
title: "Methode quadrat"
type: code
difficulty: easy
tags: [funktionen, parameter, rückgabewert]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: quadrat
    cases:
      - args: [0]
        expected: 0
      - args: [1]
        expected: 1
      - args: [3]
        expected: 9
      - args: [-4]
        expected: 16
      - args: [12]
        expected: 144
hints:
  - "Der Rumpf braucht nur eine einzige `return`-Anweisung."
  - "Das Quadrat einer Zahl ist die Zahl multipliziert mit sich selbst."
  - "Achten Sie darauf, dass die Signatur bereits vorgegeben ist – ändern Sie nur den Rumpf."
---

Vervollständigen Sie die Methode `quadrat`. Sie bekommt eine ganze Zahl als Parameter und gibt deren Quadrat zurück. Die Signatur `public static int quadrat(int zahl)` ist bereits vorgegeben und darf nicht verändert werden.

```java template
public class Main {
    // BEGIN EDIT
    public static int quadrat(int zahl) {
        // TODO: Quadrat von zahl zurückgeben
        return 0;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(quadrat(5));
    }
}
```
