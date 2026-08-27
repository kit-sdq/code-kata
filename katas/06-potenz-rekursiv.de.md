---
id: 3.4
category: 06-funktionen-rekursion
title: "Potenz (rekursiv)"
type: code
difficulty: medium
tags: [rekursion, basisfall]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: potenz
    cases:
      - args: [2, 0]
        expected: 1
      - args: [2, 10]
        expected: 1024
      - args: [3, 4]
        expected: 81
      - args: [5, 3]
        expected: 125
      - args: [10, 0]
        expected: 1
hints:
  - "Der Basisfall: `basis` hoch `0` ist immer `1`."
  - "Der Rekursionsschritt: `basis` hoch `exponent` ist `basis * (basis hoch (exponent - 1))`."
  - "Implementieren Sie die Methode **rekursiv**, ohne Schleife."
---

Implementieren Sie die Methode `potenz` **rekursiv**. Sie berechnet `basis` hoch `exponent` für einen nicht-negativen Exponenten. Die Signatur `public static int potenz(int basis, int exponent)` ist vorgegeben.

```java template
public class Main {
    // BEGIN EDIT
    public static int potenz(int basis, int exponent) {
        // TODO: rekursiv basis hoch exponent berechnen
        return 1;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(potenz(2, 10));
    }
}
```
