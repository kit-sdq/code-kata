---
id: "2.5"
category: 07-git
title: "Praxis: Status einer neuen Datei"
type: choice
difficulty: easy
tags: [praxis, git, status]
multiple: false
shuffle: true
options:
  - text: "Unversionierte Dateien (untracked files) – Git kennt die Datei noch gar nicht"
    correct: true
  - text: "Zum Commit vorgemerkte Änderungen (staged) – die Datei ist bereits bereit für den nächsten Commit"
    correct: false
  - text: "Nicht vorgemerkte Änderungen (not staged) – Git kennt die Datei, aber es gibt eine Änderung"
    correct: false
  - text: "`git status` zeigt die Datei überhaupt nicht an"
    correct: false
hints:
  - "Sie haben die Datei gerade erst angelegt, aber noch keinen `git add` ausgeführt."
  - "Git unterscheidet zwischen Dateien, die es noch nie gesehen hat, und Dateien, die bereits einmal committet wurden."
---

**Praxisaufgabe – am eigenen Rechner ausführen.**

Führen Sie nacheinander aus:

1. Erstellen Sie einen neuen Ordner `git-uebung-status` und wechseln Sie hinein.
2. Machen Sie daraus mit `git init` ein Repository.
3. Erstellen Sie eine Datei `notizen.txt` mit dem Inhalt `erste Zeile`.
4. Führen Sie `git status` aus.

In welcher der folgenden Kategorien zeigt `git status` die Datei `notizen.txt` an?
