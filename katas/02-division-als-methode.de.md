---
id: "1.4"
category: 02-datentypen-variablen
title: Quotient und Rest als Methode
type: code
difficulty: medium
tags: [datentypen, int, methoden]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: divisionUndRest
    cases:
      - args: [17, 5]
        expected: [3, 2]
      - args: [20, 4]
        expected: [5, 0]
      - args: [7, 2]
        expected: [3, 1]
hints:
  - "Legen Sie in der Methode zwei `int`-Variablen für Quotient und Rest an."
  - "`gesamt / gruppen` liefert den Quotienten, `gesamt % gruppen` den Rest."
  - "Geben Sie beide Werte als `int[]` mit `new int[] {quotient, rest}` zurück."
---

Vervollständigen Sie die statische Methode `divisionUndRest`. Sie erhält zwei `int`-Parameter `gesamt` und `gruppen` und soll ein `int[]` mit genau zwei Werten zurückgeben: zuerst den Quotienten `gesamt / gruppen`, dann den Rest `gesamt % gruppen`.

```java template
public class Main {
    // BEGIN EDIT
    public static int[] divisionUndRest(int gesamt, int gruppen) {
        // TODO: Quotient und Rest berechnen und als int[] zurückgeben
        return null;
    }
    // END EDIT
}
```
