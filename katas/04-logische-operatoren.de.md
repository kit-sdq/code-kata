---
id: 1.4
category: 04-operatoren-ausdruecke
title: Logische Operatoren und Kurzschlussauswertung
type: choice
difficulty: medium
tags: [operatoren, boolean, kurzschlussauswertung]
multiple: true
shuffle: true
options:
  - text: "`&&` ist nur dann `true`, wenn beide Seiten `true` sind."
    correct: true
  - text: "`||` ist bereits `true`, wenn mindestens eine Seite `true` ist."
    correct: true
  - text: "Bei `a && b` wertet Java immer beide Seiten aus, egal was links steht."
    correct: false
  - text: "Ist bei `a || b` die linke Seite `a` bereits `true`, wird `b` nicht mehr ausgewertet."
    correct: true
  - text: "`!` dreht einen `boolean`-Wert um: aus `true` wird `false` und umgekehrt."
    correct: true
hints:
  - "Java wertet logische Ausdrücke von links nach rechts aus."
  - "Sobald das Ergebnis feststeht, wird der Rest des Ausdrucks nicht mehr angeschaut."
  - "Das nennt man Kurzschlussauswertung."
---

Wählen Sie **alle** zutreffenden Aussagen zu `&&`, `||` und `!` in Java aus.
