---
id: 4.1
category: 05-kontrollfluss-schleifen
title: "Sternchen-Dreieck (verschachtelte Schleifen)"
type: code
difficulty: medium
tags: [verschachtelte-schleifen, for-schleife, kontrollfluss]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      *
      **
      ***
      ****
      *****
hints:
  - "Nutzen Sie zwei ineinander verschachtelte `for`-Schleifen: die äußere zählt die Zeile, die innere die Sterne in dieser Zeile."
  - "In Zeile `zeile` (von 1 bis 5) werden genau `zeile` viele Sterne gedruckt."
  - "Drucken Sie die Sterne mit `System.out.print(\"*\")` ohne Zeilenumbruch und erst am Ende jeder Zeile mit `System.out.println()` einen Umbruch."
---

Geben Sie mit zwei ineinander verschachtelten `for`-Schleifen das folgende Muster aus fünf Zeilen aus:

```
*
**
***
****
*****
```

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
