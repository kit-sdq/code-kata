---
id: 3.1
category: 04-operatoren-ausdruecke
title: Erweiterung und Cast
type: choice
difficulty: medium
tags: [typumwandlung, cast]
multiple: true
shuffle: true
options:
  - text: "Ein `int` wird automatisch zu `double`, ohne dass man etwas dafür tun muss (Erweiterung)."
    correct: true
  - text: "Ein `double` wird automatisch zu `int`, sobald man es einer `int`-Variablen zuweist."
    correct: false
  - text: "Um aus einem `double` ein `int` zu machen, braucht man einen expliziten Cast, z. B. `(int) wert`."
    correct: true
  - text: "`(int) 3.9` ergibt `4`, weil gerundet wird."
    correct: false
  - text: "`(int) 3.9` ergibt `3`, weil der Cast abschneidet, nicht rundet."
    correct: true
  - text: "Wer wirklich runden möchte, sollte `Math.round(...)` verwenden."
    correct: true
hints:
  - "Die Reihenfolge der Typen ist: byte, short, int, long, float, double – von links nach rechts geht die Umwandlung automatisch."
  - "Von rechts nach links (der 'verengenden' Richtung) verlangt Java einen expliziten Cast."
  - "Ein Cast schneidet die Nachkommastellen einfach ab, er rundet nicht."
---

Wählen Sie **alle** zutreffenden Aussagen zu impliziter Typerweiterung und
explizitem Cast in Java aus.
