---
id: "2.1"
category: 03-ein-ausgabe
title:
  de: printf-Platzhalter
  en: printf Placeholders
type: choice
difficulty: easy
tags:
  de:
    - ausgabe
    - printf
  en:
    - output
    - printf
hints:
  de:
    - "Der Buchstabe hinter dem Prozentzeichen verrät den erwarteten Typ: d wie decimal, s wie String, f wie float/Kommazahl."
    - Anders als `println` fügt `printf` von sich aus **keinen** Zeilenumbruch ein – dafür gibt es den Platzhalter `%n`.
  en:
    - "The letter after the percent sign reveals the expected type: d for decimal, s for String, f for float/decimal number."
    - Unlike `println`, `printf` does **not** insert a line break on its own — that's what the `%n` placeholder is for.
multiple: false
shuffle: true
options:
  - text:
      de: "`%d` gibt eine ganze Zahl aus, `%s` einen Text und `%.2f` eine Kommazahl mit genau zwei Nachkommastellen."
      en: "`%d` prints a whole number, `%s` a piece of text, and `%.2f` a decimal number with exactly two decimal places."
    correct: true
  - text:
      de: "`%d` gibt eine Kommazahl aus, `%f` einen Text."
      en: "`%d` prints a decimal number, `%f` a piece of text."
    correct: false
  - text:
      de: "`printf` fügt nach jeder Ausgabe automatisch einen Zeilenumbruch ein, genau wie `println`."
      en: "`printf` automatically inserts a line break after every output, just like `println`."
    correct: false
  - text:
      de: "`%s` kann nur für Zahlen verwendet werden, nicht für Text."
      en: "`%s` can only be used for numbers, not for text."
    correct: false
---

<!-- de -->
`printf` erlaubt formatierte Ausgaben über Platzhalter in einer Vorlage.

Welche Aussage zu den `printf`-Platzhaltern ist korrekt?

<!-- en -->
`printf` allows formatted output via placeholders in a template.

Which statement about the `printf` placeholders is correct?
