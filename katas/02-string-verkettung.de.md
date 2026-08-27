---
id: "2.2"
category: 02-datentypen-variablen
title: Begrüßung verketten
type: code
difficulty: easy
tags: [string, verkettung]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      Hallo Anna aus Karlsruhe!
      4
hints:
  - "Mit `+` können Sie mehrere Strings (und die Variablen dazwischen) aneinanderhängen."
  - "`vorname.length()` liefert die Anzahl der Zeichen des Strings."
---

Legen Sie eine `String`-Variable `vorname = "Anna"` und eine `String`-Variable `stadt = "Karlsruhe"` an. Bilden Sie daraus mit `+` eine Variable `satz`, die genau `Hallo Anna aus Karlsruhe!` enthält, und geben Sie sie aus. Geben Sie danach die Länge von `vorname` aus.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: vorname, stadt und satz anlegen, dann beides ausgeben
    }
    // END EDIT
}
```
