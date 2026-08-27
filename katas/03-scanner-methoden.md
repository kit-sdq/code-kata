---
id: "3.3"
category: 03-ein-ausgabe
title:
  de: Scanner-Methoden
  en: Scanner Methods
type: choice
difficulty: medium
tags:
  de:
    - eingabe
    - scanner
  en:
    - input
    - scanner
hints:
  de:
    - "`next()` liest nur ein einzelnes Wort, bis zum nächsten Leerzeichen."
    - Der Zeilenumbruch nach einer mit `nextInt()` gelesenen Zahl bleibt stehen und wird erst vom nächsten `nextLine()`-Aufruf konsumiert.
  en:
    - "`next()` only reads a single word, up to the next whitespace."
    - The line break after a number read with `nextInt()` is left behind and only consumed by the next `nextLine()` call.
multiple: true
shuffle: true
options:
  - text:
      de: "`nextInt()` liest eine ganze Zahl."
      en: "`nextInt()` reads a whole number."
    correct: true
  - text:
      de: "`nextDouble()` liest eine Kommazahl."
      en: "`nextDouble()` reads a decimal number."
    correct: true
  - text:
      de: "`nextLine()` liest die gesamte restliche Zeile, auch mit Leerzeichen darin."
      en: "`nextLine()` reads the entire rest of the line, including spaces in it."
    correct: true
  - text:
      de: "`next()` liest wie `nextLine()` die gesamte restliche Zeile inklusive Leerzeichen."
      en: "`next()` reads the entire rest of the line including spaces, just like `nextLine()`."
    correct: false
  - text:
      de: "`nextInt()` liest automatisch auch den Zeilenumbruch nach der Zahl mit ein."
      en: "`nextInt()` automatically also consumes the line break after the number."
    correct: false
---

<!-- de -->
Der `Scanner` bietet mehrere Methoden zum Einlesen von Werten.

Wählen Sie **alle** zutreffenden Aussagen aus.

<!-- en -->
`Scanner` offers several methods for reading values.

Select **all** statements that are correct.
