---
id: "2.6"
category: 07-git
title: "Praxis: Status nach dem Stagen"
type: choice
difficulty: easy
tags: [praxis, git, status, add]
multiple: false
shuffle: true
options:
  - text: "Zum Commit vorgemerkte Änderungen (staged) – die Datei ist jetzt bereit für den nächsten Commit"
    correct: true
  - text: "Unversionierte Dateien (untracked files) – wie vorher, es hat sich nichts geändert"
    correct: false
  - text: "Nicht vorgemerkte Änderungen (not staged)"
    correct: false
  - text: "`git status` zeigt die Datei jetzt nicht mehr an"
    correct: false
hints:
  - "`git add` verschiebt eine Datei von \"unversioniert\" in eine neue Kategorie."
  - "Diese Kategorie beschreibt Dateien, die beim nächsten `git commit` mit aufgenommen werden."
---

**Praxisaufgabe – am eigenen Rechner ausführen.**

Führen Sie nacheinander aus:

1. Erstellen Sie einen neuen Ordner `git-uebung-staged` und wechseln Sie hinein.
2. Machen Sie daraus mit `git init` ein Repository.
3. Erstellen Sie eine Datei `notizen.txt` mit dem Inhalt `erste Zeile`.
4. Fügen Sie die Datei mit `git add notizen.txt` hinzu.
5. Führen Sie `git status` aus.

In welcher der folgenden Kategorien zeigt `git status` die Datei `notizen.txt` jetzt an?
