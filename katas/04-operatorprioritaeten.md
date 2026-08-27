---
id: 2.1
category: 04-operatoren-ausdruecke
title:
  de: Operatorprioritäten
  en: Operator precedence
type: choice
difficulty: medium
tags:
  de:
    - operatoren
    - prioritaeten
  en:
    - operators
    - precedence
hints:
  de:
    - "Die Prioritäten funktionieren im Kern wie in der Mathematik: Punkt vor Strich."
    - Vergleiche binden schwächer als Rechenoperatoren, aber stärker als `&&` und `||`.
    - Klammern setzen die Reihenfolge außer Kraft und machen die Absicht eindeutig – zusätzliche Klammern schaden aber nie.
  en:
    - "The precedence rules essentially work like in mathematics: multiplication before addition."
    - Comparisons bind more weakly than arithmetic operators, but more strongly than `&&` and `||`.
    - Parentheses override the order and make the intent unambiguous – extra parentheses never hurt, though.
multiple: true
shuffle: true
options:
  - text:
      de: "`a + b * c` rechnet zuerst `b * c` und addiert danach `a` (Punkt vor Strich)."
      en: "`a + b * c` computes `b * c` first and then adds `a` (multiplication before addition)."
    correct: true
  - text:
      de: "`*`, `/` und `%` binden stärker als `+` und `-`."
      en: "`*`, `/`, and `%` bind more strongly than `+` and `-`."
    correct: true
  - text:
      de: Vergleiche wie `<` oder `==` binden stärker als `&&` und `||`.
      en: Comparisons like `<` or `==` bind more strongly than `&&` and `||`.
    correct: true
  - text:
      de: In Java wird immer strikt von links nach rechts gerechnet, unabhängig vom Operator.
      en: In Java, evaluation is always strictly left to right, regardless of the operator.
    correct: false
  - text:
      de: Klammern `(...)` binden am stärksten und können jede andere Priorität überstimmen.
      en: Parentheses `(...)` bind most strongly and can override any other precedence.
    correct: true
  - text:
      de: "`a < b && c > d` muss man klammern als `(a < b) && (c > d)`, sonst ist das Ergebnis anders."
      en: "`a < b && c > d` must be parenthesized as `(a < b) && (c > d)`, otherwise the result is different."
    correct: false
---

<!-- de -->
Wählen Sie **alle** zutreffenden Aussagen zu Operatorprioritäten in Java aus.

<!-- en -->
Select **all** of the statements below that are true about operator
precedence in Java.
