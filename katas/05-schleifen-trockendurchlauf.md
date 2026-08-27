---
id: 5.2
category: 05-kontrollfluss-schleifen
title:
  de: "Schleifen-Trockendurchlauf: break und continue"
  en: "Loop dry run: break and continue"
type: text
difficulty: medium
tags:
  de:
    - break
    - continue
    - trockendurchlauf
    - kontrollfluss
  en:
    - break
    - continue
    - dry-run
    - control-flow
hints:
  de:
    - Gehen Sie den Code Zeile für Zeile durch, ohne ihn auszuführen, und notieren Sie sich nach jedem Durchlauf den aktuellen Wert von `i`.
    - Bei `i % 3 == 0` (also `i = 3` und `i = 6`) wird `i` erhöht und der Rest des Durchlaufs mit `continue` übersprungen.
    - Bei `i == 7` beendet `break` die Schleife sofort, **bevor** `i` in dieser Runde erhöht wird.
  en:
    - Go through the code line by line, without running it, and note down the current value of `i` after each pass.
    - When `i % 3 == 0` (i.e. `i = 3` and `i = 6`), `i` is incremented and the rest of that pass is skipped with `continue`.
    - When `i == 7`, `break` ends the loop immediately, **before** `i` is incremented in that round.
answers:
  - "7"
match:
  mode: normalized
---

<!-- de -->
Lesen Sie den folgenden Code sorgfältig durch, **ohne** ihn auszuführen:

```java
int i = 1;
while (i <= 8) {
    if (i % 3 == 0) {
        i = i + 1;
        continue;
    }
    if (i == 7) {
        break;
    }
    System.out.println(i);
    i = i + 1;
}
System.out.println("Ende bei i = " + i);
```

Welchen Wert hat die Variable `i`, wenn die letzte Zeile `System.out.println("Ende bei i = " + i);` ausgeführt wird? Geben Sie nur die Zahl an.

<!-- en -->
Read through the following code carefully, **without** running it:

```java
int i = 1;
while (i <= 8) {
    if (i % 3 == 0) {
        i = i + 1;
        continue;
    }
    if (i == 7) {
        break;
    }
    System.out.println(i);
    i = i + 1;
}
System.out.println("End at i = " + i);
```

What is the value of the variable `i` when the last line `System.out.println("End at i = " + i);` is executed? Give only the number.
