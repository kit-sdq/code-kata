---
id: "2.1"
category: 03-ein-ausgabe
title: printf-Platzhalter
type: choice
difficulty: easy
tags: [ausgabe, printf]
multiple: false
shuffle: true
options:
  - text: "`%d` gibt eine ganze Zahl aus, `%s` einen Text und `%.2f` eine Kommazahl mit genau zwei Nachkommastellen."
    correct: true
  - text: "`%d` gibt eine Kommazahl aus, `%f` einen Text."
    correct: false
  - text: "`printf` fügt nach jeder Ausgabe automatisch einen Zeilenumbruch ein, genau wie `println`."
    correct: false
  - text: "`%s` kann nur für Zahlen verwendet werden, nicht für Text."
    correct: false
hints:
  - "Der Buchstabe hinter dem Prozentzeichen verrät den erwarteten Typ: d wie decimal, s wie String, f wie float/Kommazahl."
  - "Anders als `println` fügt `printf` von sich aus **keinen** Zeilenumbruch ein – dafür gibt es den Platzhalter `%n`."
---

`printf` erlaubt formatierte Ausgaben über Platzhalter in einer Vorlage.

Welche Aussage zu den `printf`-Platzhaltern ist korrekt?
