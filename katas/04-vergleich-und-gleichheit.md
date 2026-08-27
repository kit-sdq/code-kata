---
id: 1.3
category: 04-operatoren-ausdruecke
title:
  de: Vergleich und Gleichheit
  en: Comparison and equality
type: choice
difficulty: easy
tags:
  de:
    - operatoren
    - vergleich
    - boolean
  en:
    - operators
    - comparison
    - boolean
hints:
  de:
    - Ein einzelnes Gleichheitszeichen weist zu, ein doppeltes vergleicht.
    - Bei `boolean`-Variablen fällt die Verwechslung von `=` und `==` besonders tückisch aus.
    - "`a = 6` liefert als Ausdruck den zugewiesenen Wert `6`, keinen Wahrheitswert."
  en:
    - A single equals sign assigns, a double one compares.
    - With `boolean` variables, confusing `=` and `==` is especially treacherous.
    - "`a = 6` as an expression yields the assigned value `6`, not a truth value."
multiple: true
shuffle: true
options:
  - text:
      de: Jeder Vergleich (z. B. `a > b`) liefert einen Wert vom Typ `boolean`.
      en: Every comparison (e.g. `a > b`) yields a value of type `boolean`.
    correct: true
  - text:
      de: Gleichheit prüft man mit `==`, nicht mit einem einzelnen `=`.
      en: Equality is checked with `==`, not with a single `=`.
    correct: true
  - text:
      de: "`int a = 5; boolean b = (a = 6);` ist ein Vergleich und liefert `false`."
      en: "`int a = 5; boolean b = (a = 6);` is a comparison and yields `false`."
    correct: false
  - text:
      de: Ein einzelnes `=` ist eine Zuweisung; der Compiler meldet eine Verwechslung mit `==` immer als Fehler, egal welchen Typ die Variablen haben.
      en: A single `=` is an assignment; the compiler always reports a confusion with `==` as an error, regardless of the variables' type.
    correct: false
  - text:
      de: "`5 != 3` liefert `true`."
      en: "`5 != 3` yields `true`."
    correct: true
---

<!-- de -->
Wählen Sie **alle** zutreffenden Aussagen zu Vergleichen und Gleichheit in Java aus.

<!-- en -->
Select **all** of the statements below that are true about comparison and
equality in Java.
