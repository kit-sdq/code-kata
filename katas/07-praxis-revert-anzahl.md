---
id: "4.4"
category: 07-git
title:
  de: "Praxis: Commits zählen nach einem Revert"
  en: "Hands-on: Counting commits after a revert"
type: text
difficulty: medium
tags:
  - praxis
  - git
  - revert
hints:
  de:
    - "`git revert` löscht keinen Commit, sondern fügt einen **neuen** Commit hinzu, der die Änderung aufhebt."
    - Vor dem Revert hatten Sie zwei Commits – danach kommt einer dazu.
  en:
    - "`git revert` doesn't delete a commit, it adds a **new** commit that undoes the change."
    - Before the revert you had two commits — afterwards one more is added.
answers:
  - "3"
---

<!-- de -->
**Praxisaufgabe – am eigenen Rechner ausführen.**

Falls noch nicht geschehen, legen Sie vorher einmal fest, wer committet, wie im Video gezeigt: `git config --global user.name "Ihr Name"`, `git config --global user.email "ihre@adresse"` und `git config --global init.defaultBranch main`.

Führen Sie nacheinander aus:

1. Erstellen Sie einen neuen Ordner `git-uebung-revert` und wechseln Sie hinein.
2. Machen Sie daraus mit `git init` ein Repository.
3. Erstellen Sie eine Datei `notizen.txt` mit dem Inhalt `erste Zeile`.
4. `git add notizen.txt`, dann `git commit -m "Erste Notizen angelegt"`.
5. Fügen Sie am Ende von `notizen.txt` die Zeile `Dieser Satz ist ein Fehler.` an.
6. `git add notizen.txt`, dann `git commit -m "Fehlerhafte Zeile eingebaut"`.
7. Suchen Sie mit `git log --oneline` die Kennung dieses letzten Commits heraus.
8. Machen Sie ihn rückgängig mit `git revert --no-edit <Kennung>`.
9. Führen Sie `git log --oneline` erneut aus.

Wie viele Commits zeigt `git log --oneline` jetzt insgesamt an? Antworten Sie nur mit der Zahl.

<!-- en -->
**Hands-on task – run this on your own machine.**

If you haven't done so yet, first set once who is committing, as shown in the video: `git config --global user.name "Your Name"`, `git config --global user.email "your@address"` and `git config --global init.defaultBranch main`.

Run the following in order:

1. Create a new folder `git-practice-revert` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. `git add notes.txt`, then `git commit -m "First notes created"`.
5. Append the line `This line is a mistake.` to the end of `notes.txt`.
6. `git add notes.txt`, then `git commit -m "Added a faulty line"`.
7. Use `git log --oneline` to find the identifier of this last commit.
8. Undo it with `git revert --no-edit <identifier>`.
9. Run `git log --oneline` again.

How many commits does `git log --oneline` now show in total? Answer with just the number.
