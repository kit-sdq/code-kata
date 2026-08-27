---
id: "2.5"
category: 07-git
title:
  de: "Praxis: Status einer neuen Datei"
  en: "Hands-on: Status of a new file"
type: choice
difficulty: easy
tags:
  - praxis
  - git
  - status
hints:
  de:
    - Sie haben die Datei gerade erst angelegt, aber noch keinen `git add` ausgeführt.
    - Git unterscheidet zwischen Dateien, die es noch nie gesehen hat, und Dateien, die bereits einmal committet wurden.
  en:
    - You've just created the file, but haven't run `git add` yet.
    - Git distinguishes between files it has never seen and files that have already been committed once.
multiple: false
shuffle: true
options:
  - text:
      de: Unversionierte Dateien (untracked files) – Git kennt die Datei noch gar nicht
      en: Untracked files — Git doesn't know the file at all yet
    correct: true
  - text:
      de: Zum Commit vorgemerkte Änderungen (staged) – die Datei ist bereits bereit für den nächsten Commit
      en: Staged changes — the file is already ready for the next commit
    correct: false
  - text:
      de: Nicht vorgemerkte Änderungen (not staged) – Git kennt die Datei, aber es gibt eine Änderung
      en: Changes not staged — Git knows the file, but there's a change
    correct: false
  - text:
      de: "`git status` zeigt die Datei überhaupt nicht an"
      en: "`git status` doesn't show the file at all"
    correct: false
---

<!-- de -->
**Praxisaufgabe – am eigenen Rechner ausführen.**

Führen Sie nacheinander aus:

1. Erstellen Sie einen neuen Ordner `git-uebung-status` und wechseln Sie hinein.
2. Machen Sie daraus mit `git init` ein Repository.
3. Erstellen Sie eine Datei `notizen.txt` mit dem Inhalt `erste Zeile`.
4. Führen Sie `git status` aus.

In welcher der folgenden Kategorien zeigt `git status` die Datei `notizen.txt` an?

<!-- en -->
**Hands-on task – run this on your own machine.**

Run the following in order:

1. Create a new folder `git-practice-status` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. Run `git status`.

In which of the following categories does `git status` show the file `notes.txt`?
