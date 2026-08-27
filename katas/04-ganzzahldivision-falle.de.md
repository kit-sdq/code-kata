---
id: 1.2
category: 04-operatoren-ausdruecke
title: Die Falle der Ganzzahldivision
type: text
difficulty: medium
tags: [operatoren, division, typumwandlung]
answers:
  - "80.0"
hints:
  - "Java wertet `(k1 + k2 + k3) / 3` zuerst komplett mit `int`-Operanden aus."
  - "Erst danach wird das `int`-Ergebnis der `double`-Variablen zugewiesen."
  - "Antworten Sie mit der Nachkommastelle, also `80.0`, nicht `80`."
---

Gegeben sind drei `int`-Variablen `k1 = 71`, `k2 = 80` und `k3 = 90`. Nun wird

```java
double schnitt = (k1 + k2 + k3) / 3;
System.out.println(schnitt);
```

ausgeführt. Was gibt `System.out.println(schnitt)` aus?

Geben Sie den exakten Wert an, inklusive Nachkommastelle (z. B. `80.0`), denn
ob eine Nachkommastelle steht oder nicht, macht hier den entscheidenden
Unterschied.
