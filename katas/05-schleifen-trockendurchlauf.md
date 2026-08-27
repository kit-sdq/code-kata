---
id: 5.2
category: 05-kontrollfluss-schleifen
title: "Schleifen-Trockendurchlauf: break und continue"
type: text
difficulty: medium
tags: [break, continue, trockendurchlauf, kontrollfluss]
answers: ["7"]
match:
  mode: normalized
hints:
  - "Gehen Sie den Code Zeile für Zeile durch, ohne ihn auszuführen, und notieren Sie sich nach jedem Durchlauf den aktuellen Wert von `i`."
  - "Bei `i % 3 == 0` (also `i = 3` und `i = 6`) wird `i` erhöht und der Rest des Durchlaufs mit `continue` übersprungen."
  - "Bei `i == 7` beendet `break` die Schleife sofort, **bevor** `i` in dieser Runde erhöht wird."
---

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
