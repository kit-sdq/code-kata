---
id: 3.3
category: 05-kontrollfluss-schleifen
title: "Countdown"
type: code
difficulty: easy
tags: [schleifen, kontrollfluss]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      5
      4
      3
      2
      1
      Start!
hints:
  - "Zählen Sie mit einer Schleife von 5 rückwärts bis 1 herunter, z. B. mit `i--`."
  - "Nach dem Ende der Schleife geben Sie noch einmal `Start!` aus."
---

Geben Sie mit einer Schleife die Zahlen 5, 4, 3, 2, 1 herunterzählend aus, jede auf einer eigenen Zeile, und danach `Start!` auf einer weiteren Zeile.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
