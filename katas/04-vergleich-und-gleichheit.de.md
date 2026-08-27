---
id: 1.3
category: 04-operatoren-ausdruecke
title: Vergleich und Gleichheit
type: choice
difficulty: easy
tags: [operatoren, vergleich, boolean]
multiple: true
shuffle: true
options:
  - text: "Jeder Vergleich (z. B. `a > b`) liefert einen Wert vom Typ `boolean`."
    correct: true
  - text: "Gleichheit prüft man mit `==`, nicht mit einem einzelnen `=`."
    correct: true
  - text: "`int a = 5; boolean b = (a = 6);` ist ein Vergleich und liefert `false`."
    correct: false
  - text: "Ein einzelnes `=` ist eine Zuweisung; der Compiler meldet eine Verwechslung mit `==` immer als Fehler, egal welchen Typ die Variablen haben."
    correct: false
  - text: "`5 != 3` liefert `true`."
    correct: true
hints:
  - "Ein einzelnes Gleichheitszeichen weist zu, ein doppeltes vergleicht."
  - "Bei `boolean`-Variablen fällt die Verwechslung von `=` und `==` besonders tückisch aus."
  - "`a = 6` liefert als Ausdruck den zugewiesenen Wert `6`, keinen Wahrheitswert."
---

Wählen Sie **alle** zutreffenden Aussagen zu Vergleichen und Gleichheit in Java aus.
