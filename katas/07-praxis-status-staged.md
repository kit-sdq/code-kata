---
id: "2.6"
category: 07-git
title:
  de: "Praxis: Status nach dem Stagen"
  en: "Hands-on: Status after staging"
type: choice
difficulty: easy
tags:
  - praxis
  - git
  - status
  - add
hints:
  de:
    - "`git add` verschiebt eine Datei von \"unversioniert\" in eine neue Kategorie."
    - Diese Kategorie beschreibt Dateien, die beim nächsten `git commit` mit aufgenommen werden.
  en:
    - "`git add` moves a file from \"untracked\" into a new category."
    - This category describes files that will be included in the next `git commit`.
multiple: false
shuffle: true
options:
  - text:
      de: Zum Commit vorgemerkte Änderungen (staged) – die Datei ist jetzt bereit für den nächsten Commit
      en: Staged changes — the file is now ready for the next commit
    correct: true
  - text:
      de: Unversionierte Dateien (untracked files) – wie vorher, es hat sich nichts geändert
      en: Untracked files — same as before, nothing has changed
    correct: false
  - text:
      de: Nicht vorgemerkte Änderungen (not staged)
      en: Changes not staged
    correct: false
  - text:
      de: "`git status` zeigt die Datei jetzt nicht mehr an"
      en: "`git status` no longer shows the file"
    correct: false
---

<!-- de -->
**Praxisaufgabe – am eigenen Rechner ausführen.**

Führen Sie nacheinander aus:

1. Erstellen Sie einen neuen Ordner `git-uebung-staged` und wechseln Sie hinein.
2. Machen Sie daraus mit `git init` ein Repository.
3. Erstellen Sie eine Datei `notizen.txt` mit dem Inhalt `erste Zeile`.
4. Fügen Sie die Datei mit `git add notizen.txt` hinzu.
5. Führen Sie `git status` aus.

In welcher der folgenden Kategorien zeigt `git status` die Datei `notizen.txt` jetzt an?

<!-- en -->
**Hands-on task – run this on your own machine.**

Run the following in order:

1. Create a new folder `git-practice-staged` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. Add the file with `git add notes.txt`.
5. Run `git status`.

In which of the following categories does `git status` now show the file `notes.txt`?
