---
id: 3.1
category: 06-funktionen-rekursion
title: "Basisfall und Rekursionsschritt"
type: choice
difficulty: medium
tags: [rekursion, basisfall]
multiple: true
shuffle: true
options:
  - text: "Der Basisfall liefert ein Ergebnis, ohne die Methode noch einmal selbst aufzurufen."
    correct: true
  - text: "Jeder rekursive Aufruf sollte mit einem kleineren bzw. einfacheren Problem arbeiten."
    correct: true
  - text: "Fehlt der Basisfall oder wird er nie erreicht, kann ein `StackOverflowError` auftreten."
    correct: true
  - text: "Eine rekursive Methode braucht keinen Basisfall, solange sie nur eine `if`-Abfrage enthält."
    correct: false
  - text: "Der Rekursionsschritt sollte die Methode möglichst mit genau denselben Argumenten erneut aufrufen."
    correct: false
hints:
  - "Denken Sie an die Matrjoschka-Puppe: Die kleinste Puppe, die sich nicht mehr öffnen lässt, ist der Basisfall."
  - "Ruft sich eine Methode mit demselben Wert wieder auf, dreht sich die Rekursion im Kreis und erreicht nie den Basisfall."
---

Welche der folgenden Aussagen über rekursive Methoden sind **richtig**?
