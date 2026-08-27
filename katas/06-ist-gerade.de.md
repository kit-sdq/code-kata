---
id: 2.1
category: 06-funktionen-rekursion
title: "Methode istGerade"
type: code
difficulty: easy
tags: [funktionen, parameter, rückgabewert, boolean]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: istGerade
    cases:
      - args: [0]
        expected: true
      - args: [1]
        expected: false
      - args: [4]
        expected: true
      - args: [7]
        expected: false
      - args: [-4]
        expected: true
      - args: [-3]
        expected: false
hints:
  - "Der Modulo-Operator `%` liefert den Rest einer Division."
  - "Eine Zahl ist genau dann gerade, wenn der Rest bei Division durch 2 gleich 0 ist."
  - "Denken Sie auch an negative Zahlen: `-4 % 2` ist in Java `0`."
---

Vervollständigen Sie die Methode `istGerade`. Sie bekommt eine ganze Zahl als Parameter und gibt genau dann `true` zurück, wenn diese Zahl gerade ist. Die Signatur `public static boolean istGerade(int zahl)` ist vorgegeben.

```java template
public class Main {
    // BEGIN EDIT
    public static boolean istGerade(int zahl) {
        // TODO: true, falls zahl gerade ist, sonst false
        return false;
    }
    // END EDIT

    public static void main(String[] args) {
        System.out.println(istGerade(4));
    }
}
```
