---
id: 3.4
category: 04-operatoren-ausdruecke
title: Gerade oder ungerade?
type: code
difficulty: easy
tags: [operatoren, modulo, boolean, methoden]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: istGerade
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
  - "Eine Zahl ist genau dann gerade, wenn sie beim Teilen durch 2 den Rest 0 lässt."
  - "Das Prozentzeichen `%` liefert den Rest einer Division."
  - "Der Ausdruck `zahl % 2 == 0` ist bereits ein `boolean` – Sie können ihn direkt zurückgeben."
---

Vervollständigen Sie die Methode `istGerade`, die für eine ganze Zahl `zahl`
`true` zurückgibt, wenn sie gerade ist, und sonst `false`.

```java template
public class Main {
    // BEGIN EDIT
    public static boolean istGerade(int zahl) {
        // TODO: true zurückgeben, wenn zahl gerade ist
        return false;
    }
    // END EDIT

    public static void main(String[] args) {
    }
}
```
