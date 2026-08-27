---
id: "1.1"
category: 03-ein-ausgabe
title: print oder println?
type: choice
difficulty: easy
tags: [ausgabe, println, print]
multiple: true
shuffle: true
options:
  - text: "`println` fügt nach der Ausgabe einen Zeilenumbruch ein, `print` nicht."
    correct: true
  - text: "`print` und `println` unterscheiden sich nur im Namen, das Verhalten ist identisch."
    correct: false
  - text: "`System.out.println()` ohne Argument erzeugt eine Leerzeile."
    correct: true
  - text: "`print` erzeugt vor der Ausgabe einen Zeilenumbruch."
    correct: false
  - text: "Zwei aufeinanderfolgende `print`-Aufrufe landen nebeneinander in derselben Zeile, wenn dazwischen kein Zeilenumbruch ausgegeben wird."
    correct: true
hints:
  - "Der Name `println` kommt von \"print line\" – Zeile drucken."
  - "Überlegen Sie, was bei zwei `print`-Aufrufen hintereinander auf dem Bildschirm passiert."
---

Sie kennen bereits `System.out.println`. Daneben gibt es auch `System.out.print` – ohne das `ln` am Ende.

Wählen Sie **alle** zutreffenden Aussagen zum Unterschied zwischen `print` und `println` aus.
