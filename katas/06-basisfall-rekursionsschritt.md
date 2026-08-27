---
id: 3.1
category: 06-funktionen-rekursion
title:
  de: Basisfall und Rekursionsschritt
  en: Base Case and Recursive Step
type: choice
difficulty: medium
tags:
  de:
    - rekursion
    - basisfall
  en:
    - recursion
    - base-case
hints:
  de:
    - "Denken Sie an die Matrjoschka-Puppe: Die kleinste Puppe, die sich nicht mehr öffnen lässt, ist der Basisfall."
    - Ruft sich eine Methode mit demselben Wert wieder auf, dreht sich die Rekursion im Kreis und erreicht nie den Basisfall.
  en:
    - "Think of a Matryoshka doll: the smallest doll, which can no longer be opened, is the base case."
    - If a method calls itself again with the same value, the recursion goes in circles and never reaches the base case.
multiple: true
shuffle: true
options:
  - text:
      de: Der Basisfall liefert ein Ergebnis, ohne die Methode noch einmal selbst aufzurufen.
      en: The base case produces a result without calling the method itself again.
    correct: true
  - text:
      de: Jeder rekursive Aufruf sollte mit einem kleineren bzw. einfacheren Problem arbeiten.
      en: Each recursive call should work on a smaller or simpler problem.
    correct: true
  - text:
      de: Fehlt der Basisfall oder wird er nie erreicht, kann ein `StackOverflowError` auftreten.
      en: If the base case is missing or never reached, a `StackOverflowError` can occur.
    correct: true
  - text:
      de: Eine rekursive Methode braucht keinen Basisfall, solange sie nur eine `if`-Abfrage enthält.
      en: A recursive method does not need a base case, as long as it contains just one `if` check.
    correct: false
  - text:
      de: Der Rekursionsschritt sollte die Methode möglichst mit genau denselben Argumenten erneut aufrufen.
      en: The recursive step should call the method again with exactly the same arguments whenever possible.
    correct: false
---

<!-- de -->
Welche der folgenden Aussagen über rekursive Methoden sind **richtig**?

<!-- en -->
Which of the following statements about recursive methods are **correct**?
