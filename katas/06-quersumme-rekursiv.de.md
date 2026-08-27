---
id: 3.3
category: 06-funktionen-rekursion
title: "Quersumme (rekursiv)"
type: code
difficulty: medium
tags: [rekursion, basisfall]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: quersumme
    cases:
      - args: [7]
        expected: 7
      - args: [1234]
        expected: 10
      - args: [999]
        expected: 27
      - args: [100]
        expected: 1
      - args: [50000]
        expected: 5
hints:
  - "`n % 10` liefert die letzte Ziffer von `n`, `n / 10` schneidet diese letzte Ziffer ab."
  - "Der Basisfall ist erreicht, wenn die Zahl nur noch eine Ziffer hat, also `n < 10` gilt – dann ist die Quersumme die Zahl selbst."
  - "Implementieren Sie die Methode **rekursiv**: `quersumme(n)` ist die letzte Ziffer plus `quersumme` des Rests."
---

Implementieren Sie die Methode `quersumme` **rekursiv**. Sie berechnet die Quersumme einer nicht-negativen ganzen Zahl `n`, also die Summe ihrer Ziffern. Die Quersumme von `1234` ist zum Beispiel `1 + 2 + 3 + 4 = 10`. Die Signatur `public static int quersumme(int n)` ist vorgegeben.

```java template
public class Main {
    // BEGIN EDIT
    public static int quersumme(int n) {
        // TODO: rekursiv die Quersumme von n berechnen
        return n;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(quersumme(1234));
    }
}
```
