---
id: 2.2
category: 06-funktionen-rekursion
title: "Methode groessterTeiler"
type: code
difficulty: medium
tags: [funktionen, parameter, rückgabewert, schleifen]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: groessterTeiler
    cases:
      - args: [2]
        expected: 1
      - args: [12]
        expected: 6
      - args: [17]
        expected: 1
      - args: [100]
        expected: 50
      - args: [9]
        expected: 3
hints:
  - "Gehen Sie mit einer Schleife alle Zahlen von `n - 1` abwärts bis `1` durch."
  - "Der erste Teiler, den Sie dabei finden (also der größte), ist bereits das gesuchte Ergebnis – geben Sie ihn sofort zurück."
  - "Eine Zahl `i` teilt `n` genau dann, wenn `n % i == 0` gilt."
---

Vervollständigen Sie die Methode `groessterTeiler`. Sie bekommt eine ganze Zahl `n` mit `n >= 2` als Parameter und gibt den größten Teiler von `n` zurück, der **nicht** `n` selbst ist. Für eine Primzahl wie `17` ist das Ergebnis also `1`. Die Signatur `public static int groessterTeiler(int n)` ist vorgegeben.

```java template
public class Main {
    // BEGIN EDIT
    public static int groessterTeiler(int n) {
        // TODO: größten Teiler von n zurückgeben, der nicht n selbst ist
        return 1;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(groessterTeiler(12));
    }
}
```
