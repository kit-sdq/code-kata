---
id: "1.1"
category: 03-ein-ausgabe
title:
  de: print oder println?
  en: print or println?
type: choice
difficulty: easy
tags:
  de:
    - ausgabe
    - println
    - print
  en:
    - output
    - println
    - print
hints:
  de:
    - Der Name `println` kommt von "print line" – Zeile drucken.
    - Überlegen Sie, was bei zwei `print`-Aufrufen hintereinander auf dem Bildschirm passiert.
  en:
    - The name `println` comes from "print line".
    - Think about what happens on screen with two `print` calls in a row.
multiple: true
shuffle: true
options:
  - text:
      de: "`println` fügt nach der Ausgabe einen Zeilenumbruch ein, `print` nicht."
      en: "`println` inserts a line break after the output, `print` does not."
    correct: true
  - text:
      de: "`print` und `println` unterscheiden sich nur im Namen, das Verhalten ist identisch."
      en: "`print` and `println` differ only in name; the behavior is identical."
    correct: false
  - text:
      de: "`System.out.println()` ohne Argument erzeugt eine Leerzeile."
      en: "`System.out.println()` with no argument produces an empty line."
    correct: true
  - text:
      de: "`print` erzeugt vor der Ausgabe einen Zeilenumbruch."
      en: "`print` inserts a line break before the output."
    correct: false
  - text:
      de: Zwei aufeinanderfolgende `print`-Aufrufe landen nebeneinander in derselben Zeile, wenn dazwischen kein Zeilenumbruch ausgegeben wird.
      en: Two consecutive `print` calls end up next to each other on the same line if no line break is printed in between.
    correct: true
---

<!-- de -->
Sie kennen bereits `System.out.println`. Daneben gibt es auch `System.out.print` – ohne das `ln` am Ende.

Wählen Sie **alle** zutreffenden Aussagen zum Unterschied zwischen `print` und `println` aus.

<!-- en -->
You already know `System.out.println`. There is also `System.out.print` — without the `ln` at the end.

Select **all** statements that correctly describe the difference between `print` and `println`.
