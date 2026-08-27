---
id: 2.1
category: 04-operatoren-ausdruecke
title: Operatorprioritäten
type: choice
difficulty: medium
tags: [operatoren, prioritaeten]
multiple: true
shuffle: true
options:
  - text: "`a + b * c` rechnet zuerst `b * c` und addiert danach `a` (Punkt vor Strich)."
    correct: true
  - text: "`*`, `/` und `%` binden stärker als `+` und `-`."
    correct: true
  - text: "Vergleiche wie `<` oder `==` binden stärker als `&&` und `||`."
    correct: true
  - text: "In Java wird immer strikt von links nach rechts gerechnet, unabhängig vom Operator."
    correct: false
  - text: "Klammern `(...)` binden am stärksten und können jede andere Priorität überstimmen."
    correct: true
  - text: "`a < b && c > d` muss man klammern als `(a < b) && (c > d)`, sonst ist das Ergebnis anders."
    correct: false
hints:
  - "Die Prioritäten funktionieren im Kern wie in der Mathematik: Punkt vor Strich."
  - "Vergleiche binden schwächer als Rechenoperatoren, aber stärker als `&&` und `||`."
  - "Klammern setzen die Reihenfolge außer Kraft und machen die Absicht eindeutig – zusätzliche Klammern schaden aber nie."
---

Wählen Sie **alle** zutreffenden Aussagen zu Operatorprioritäten in Java aus.
