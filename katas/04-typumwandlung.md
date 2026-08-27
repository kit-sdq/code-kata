---
id: 3.1
category: 04-operatoren-ausdruecke
title:
  de: Erweiterung und Cast
  en: Widening and casting
type: choice
difficulty: medium
tags:
  de:
    - typumwandlung
    - cast
  en:
    - type-conversion
    - cast
hints:
  de:
    - "Die Reihenfolge der Typen ist: byte, short, int, long, float, double – von links nach rechts geht die Umwandlung automatisch."
    - Von rechts nach links (der 'verengenden' Richtung) verlangt Java einen expliziten Cast.
    - Ein Cast schneidet die Nachkommastellen einfach ab, er rundet nicht.
  en:
    - "The order of the types is: byte, short, int, long, float, double – conversion happens automatically from left to right."
    - From right to left (the 'narrowing' direction), Java requires an explicit cast.
    - A cast simply truncates the decimal places, it doesn't round.
multiple: true
shuffle: true
options:
  - text:
      de: Ein `int` wird automatisch zu `double`, ohne dass man etwas dafür tun muss (Erweiterung).
      en: An `int` is automatically converted to `double`, without needing to do anything for it (widening).
    correct: true
  - text:
      de: Ein `double` wird automatisch zu `int`, sobald man es einer `int`-Variablen zuweist.
      en: A `double` is automatically converted to `int` as soon as it is assigned to an `int` variable.
    correct: false
  - text:
      de: Um aus einem `double` ein `int` zu machen, braucht man einen expliziten Cast, z. B. `(int) wert`.
      en: To turn a `double` into an `int`, you need an explicit cast, e.g. `(int) value`.
    correct: true
  - text:
      de: "`(int) 3.9` ergibt `4`, weil gerundet wird."
      en: "`(int) 3.9` yields `4`, because it rounds."
    correct: false
  - text:
      de: "`(int) 3.9` ergibt `3`, weil der Cast abschneidet, nicht rundet."
      en: "`(int) 3.9` yields `3`, because the cast truncates rather than rounds."
    correct: true
  - text:
      de: Wer wirklich runden möchte, sollte `Math.round(...)` verwenden.
      en: Anyone who really wants to round should use `Math.round(...)`.
    correct: true
---

<!-- de -->
Wählen Sie **alle** zutreffenden Aussagen zu impliziter Typerweiterung und
explizitem Cast in Java aus.

<!-- en -->
Select **all** of the statements below that are true about implicit type
widening and explicit casting in Java.
