---
id: 3.2
category: 06-funktionen-rekursion
title: "Fakultät (rekursiv)"
type: code
difficulty: medium
tags: [rekursion, basisfall]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: fakultaet
    cases:
      - args: [0]
        expected: 1
      - args: [1]
        expected: 1
      - args: [5]
        expected: 120
      - args: [10]
        expected: 3628800
hints:
  - "Der Basisfall: Für `n <= 1` ist die Fakultät `1`."
  - "Der Rekursionsschritt: `fakultaet(n)` ist `n * fakultaet(n - 1)`."
  - "Implementieren Sie die Methode **rekursiv**, also mit einem Aufruf von `fakultaet` im eigenen Rumpf, nicht mit einer Schleife."
---

Implementieren Sie die Methode `fakultaet` **rekursiv**. Sie berechnet für eine nicht-negative ganze Zahl `n` die Fakultät `n! = n · (n-1) · … · 1`, mit `0! = 1`. Die Signatur `public static int fakultaet(int n)` ist vorgegeben.

Bleiben Sie bei kleinen Werten von `n` (bis `10`), damit das Ergebnis in einen `int` passt.

```java template
public class Main {
    // BEGIN EDIT
    public static int fakultaet(int n) {
        // TODO: rekursiv die Fakultät von n berechnen
        return 1;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(fakultaet(5));
    }
}
```
