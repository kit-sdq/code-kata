---
id: 4.1
category: 05-kontrollfluss-schleifen
title:
  de: Sternchen-Dreieck (verschachtelte Schleifen)
  en: Star triangle (nested loops)
type: code
difficulty: medium
tags:
  de:
    - verschachtelte-schleifen
    - for-schleife
    - kontrollfluss
  en:
    - nested-loops
    - for-loop
    - control-flow
hints:
  de:
    - "Nutzen Sie zwei ineinander verschachtelte `for`-Schleifen: die äußere zählt die Zeile, die innere die Sterne in dieser Zeile."
    - In Zeile `zeile` (von 1 bis 5) werden genau `zeile` viele Sterne gedruckt.
    - Drucken Sie die Sterne mit `System.out.print("*")` ohne Zeilenumbruch und erst am Ende jeder Zeile mit `System.out.println()` einen Umbruch.
  en:
    - "Use two nested `for` loops: the outer one counts the row, the inner one the stars in that row."
    - In row `row` (from 1 to 5), exactly `row` stars are printed.
    - Print the stars with `System.out.print("*")` without a line break, and only print a line break with `System.out.println()` at the end of each row.
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
---

<!-- de -->
Geben Sie mit zwei ineinander verschachtelten `for`-Schleifen das folgende Muster aus fünf Zeilen aus:

```
*
**
***
****
*****
```

<!-- en -->
Using two nested `for` loops, print the following pattern of five lines:

```
*
**
***
****
*****
```

<!-- all -->

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
