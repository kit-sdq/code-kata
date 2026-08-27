---
id: 1.2
category: 04-operatoren-ausdruecke
title:
  de: Die Falle der Ganzzahldivision
  en: The integer division trap
type: text
difficulty: medium
tags:
  de:
    - operatoren
    - division
    - typumwandlung
  en:
    - operators
    - division
    - type-conversion
hints:
  de:
    - Java wertet `(k1 + k2 + k3) / 3` zuerst komplett mit `int`-Operanden aus.
    - Erst danach wird das `int`-Ergebnis der `double`-Variablen zugewiesen.
    - Antworten Sie mit der Nachkommastelle, also `80.0`, nicht `80`.
  en:
    - Java fully evaluates `(k1 + k2 + k3) / 3` with `int` operands first.
    - Only after that is the `int` result assigned to the `double` variable.
    - Answer with the decimal place, i.e. `80.0`, not `80`.
answers:
  - "80.0"
---

<!-- de -->
Gegeben sind drei `int`-Variablen `k1 = 71`, `k2 = 80` und `k3 = 90`. Nun wird

```java
double schnitt = (k1 + k2 + k3) / 3;
System.out.println(schnitt);
```

ausgeführt. Was gibt `System.out.println(schnitt)` aus?

Geben Sie den exakten Wert an, inklusive Nachkommastelle (z. B. `80.0`), denn
ob eine Nachkommastelle steht oder nicht, macht hier den entscheidenden
Unterschied.

<!-- en -->
Given the three `int` variables `k1 = 71`, `k2 = 80` and `k3 = 90`, the
following is executed:

```java
double average = (k1 + k2 + k3) / 3;
System.out.println(average);
```

What does `System.out.println(average)` print?

Give the exact value, including the decimal place (e.g. `80.0`), because
whether or not there is a decimal place makes the crucial difference here.
