---
id: "3.6"
category: 07-git
title:
  de: "Praxis: Commits zählen"
  en: "Hands-on: Counting commits"
type: text
difficulty: easy
tags:
  - praxis
  - git
  - log
  - commit
hints:
  de:
    - Jede Zeile in `git log --oneline` entspricht genau einem Commit.
    - Sie haben in dieser Übung genau zweimal `git commit` ausgeführt.
  en:
    - Every line in `git log --oneline` corresponds to exactly one commit.
    - In this exercise, you ran `git commit` exactly twice.
answers:
  - "2"
---

<!-- de -->
**Praxisaufgabe – am eigenen Rechner ausführen.**

Falls noch nicht geschehen, legen Sie vorher einmal fest, wer committet, wie im Video gezeigt: `git config --global user.name "Ihr Name"`, `git config --global user.email "ihre@adresse"` und `git config --global init.defaultBranch main`.

Führen Sie nacheinander aus:

1. Erstellen Sie einen neuen Ordner `git-uebung-log` und wechseln Sie hinein.
2. Machen Sie daraus mit `git init` ein Repository.
3. Erstellen Sie eine Datei `notizen.txt` mit dem Inhalt `erste Zeile`.
4. `git add notizen.txt`, dann `git commit -m "Erste Notizen angelegt"`.
5. Erstellen Sie eine Datei `ideen.txt` mit dem Inhalt `Einkaufsliste`.
6. `git add ideen.txt`, dann `git commit -m "Ideen ergänzt"`.
7. Führen Sie `git log --oneline` aus.

Wie viele Zeilen zeigt `git log --oneline` an? Antworten Sie nur mit der Zahl.

<!-- en -->
**Hands-on task – run this on your own machine.**

If you haven't done so yet, first set once who is committing, as shown in the video: `git config --global user.name "Your Name"`, `git config --global user.email "your@address"` and `git config --global init.defaultBranch main`.

Run the following in order:

1. Create a new folder `git-practice-log` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. `git add notes.txt`, then `git commit -m "First notes created"`.
5. Create a file `ideas.txt` with the content `Shopping list`.
6. `git add ideas.txt`, then `git commit -m "Added ideas"`.
7. Run `git log --oneline`.

How many lines does `git log --oneline` show? Answer with just the number.
