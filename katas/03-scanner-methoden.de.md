---
id: "3.3"
category: 03-ein-ausgabe
title: Scanner-Methoden
type: choice
difficulty: medium
tags: [eingabe, scanner]
multiple: true
shuffle: true
options:
  - text: "`nextInt()` liest eine ganze Zahl."
    correct: true
  - text: "`nextDouble()` liest eine Kommazahl."
    correct: true
  - text: "`nextLine()` liest die gesamte restliche Zeile, auch mit Leerzeichen darin."
    correct: true
  - text: "`next()` liest wie `nextLine()` die gesamte restliche Zeile inklusive Leerzeichen."
    correct: false
  - text: "`nextInt()` liest automatisch auch den Zeilenumbruch nach der Zahl mit ein."
    correct: false
hints:
  - "`next()` liest nur ein einzelnes Wort, bis zum nächsten Leerzeichen."
  - "Der Zeilenumbruch nach einer mit `nextInt()` gelesenen Zahl bleibt stehen und wird erst vom nächsten `nextLine()`-Aufruf konsumiert."
---

Der `Scanner` bietet mehrere Methoden zum Einlesen von Werten.

Wählen Sie **alle** zutreffenden Aussagen aus.
