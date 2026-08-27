---
id: 1.4
category: 04-operatoren-ausdruecke
title:
  de: Logische Operatoren und Kurzschlussauswertung
  en: Logical operators and short-circuit evaluation
type: choice
difficulty: medium
tags:
  de:
    - operatoren
    - boolean
    - kurzschlussauswertung
  en:
    - operators
    - boolean
    - short-circuit-evaluation
hints:
  de:
    - Java wertet logische Ausdrücke von links nach rechts aus.
    - Sobald das Ergebnis feststeht, wird der Rest des Ausdrucks nicht mehr angeschaut.
    - Das nennt man Kurzschlussauswertung.
  en:
    - Java evaluates logical expressions from left to right.
    - As soon as the result is determined, the rest of the expression is no longer looked at.
    - This is called short-circuit evaluation.
multiple: true
shuffle: true
options:
  - text:
      de: "`&&` ist nur dann `true`, wenn beide Seiten `true` sind."
      en: "`&&` is `true` only when both sides are `true`."
    correct: true
  - text:
      de: "`||` ist bereits `true`, wenn mindestens eine Seite `true` ist."
      en: "`||` is already `true` when at least one side is `true`."
    correct: true
  - text:
      de: Bei `a && b` wertet Java immer beide Seiten aus, egal was links steht.
      en: For `a && b`, Java always evaluates both sides, no matter what's on the left.
    correct: false
  - text:
      de: Ist bei `a || b` die linke Seite `a` bereits `true`, wird `b` nicht mehr ausgewertet.
      en: If in `a || b` the left side `a` is already `true`, `b` is no longer evaluated.
    correct: true
  - text:
      de: "`!` dreht einen `boolean`-Wert um: aus `true` wird `false` und umgekehrt."
      en: "`!` inverts a `boolean` value: `true` becomes `false` and vice versa."
    correct: true
---

<!-- de -->
Wählen Sie **alle** zutreffenden Aussagen zu `&&`, `||` und `!` in Java aus.

<!-- en -->
Select **all** of the statements below that are true about `&&`, `||`, and
`!` in Java.
