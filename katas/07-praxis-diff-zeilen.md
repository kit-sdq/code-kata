---
id: "3.7"
category: 07-git
title:
  de: "Praxis: Diff nach einer Änderung"
  en: "Hands-on: Diff after a change"
type: text
difficulty: medium
tags:
  - praxis
  - git
  - diff
hints:
  de:
    - "`git diff` markiert jede neu hinzugefügte Zeile mit einem einzelnen `+` am Zeilenanfang."
    - Die Zeile `+++ b/notizen.txt` ist eine Kopfzeile und zählt nicht mit – gemeint sind nur die Zeilen mit dem eigentlichen Inhalt.
  en:
    - "`git diff` marks every newly added line with a single `+` at the start of the line."
    - The line `+++ b/notes.txt` is a header and doesn't count — only the lines with actual content matter.
answers:
  - "2"
---

<!-- de -->
**Praxisaufgabe – am eigenen Rechner ausführen.**

Falls noch nicht geschehen, legen Sie vorher einmal fest, wer committet, wie im Video gezeigt: `git config --global user.name "Ihr Name"`, `git config --global user.email "ihre@adresse"` und `git config --global init.defaultBranch main`.

Führen Sie nacheinander aus:

1. Erstellen Sie einen neuen Ordner `git-uebung-diff` und wechseln Sie hinein.
2. Machen Sie daraus mit `git init` ein Repository.
3. Erstellen Sie eine Datei `notizen.txt` mit dem Inhalt `erste Zeile`.
4. `git add notizen.txt`, dann `git commit -m "Erste Notizen angelegt"`.
5. Fügen Sie am Ende von `notizen.txt` genau diese zwei neuen Zeilen an:

```
dritte Zeile
vierte Zeile
```

6. Führen Sie `git diff notizen.txt` aus. Der Befehl zeigt, was sich in der Datei seit dem letzten Commit geändert hat.

Wie viele Zeilen im Ausgabetext beginnen mit einem einzelnen `+` und zeigen neu hinzugefügten Inhalt (die Kopfzeile `+++ b/notizen.txt` zählt nicht mit)? Antworten Sie nur mit der Zahl.

<!-- en -->
**Hands-on task – run this on your own machine.**

If you haven't done so yet, first set once who is committing, as shown in the video: `git config --global user.name "Your Name"`, `git config --global user.email "your@address"` and `git config --global init.defaultBranch main`.

Run the following in order:

1. Create a new folder `git-practice-diff` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. `git add notes.txt`, then `git commit -m "First notes created"`.
5. Append exactly these two new lines to the end of `notes.txt`:

```
third line
fourth line
```

6. Run `git diff notes.txt`. The command shows what has changed in the file since the last commit.

How many lines in the output start with a single `+` and show newly added content (the header line `+++ b/notes.txt` doesn't count)? Answer with just the number.
