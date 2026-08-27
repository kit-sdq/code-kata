---
id: "3.6"
category: 07-git
title: "Praxis: Commits zählen"
type: text
difficulty: easy
tags: [praxis, git, log, commit]
answers:
  - "2"
hints:
  - "Jede Zeile in `git log --oneline` entspricht genau einem Commit."
  - "Sie haben in dieser Übung genau zweimal `git commit` ausgeführt."
---

**Praxisaufgabe – am eigenen Rechner ausführen.**

Führen Sie nacheinander aus:

1. Erstellen Sie einen neuen Ordner `git-uebung-log` und wechseln Sie hinein.
2. Machen Sie daraus mit `git init` ein Repository.
3. Erstellen Sie eine Datei `notizen.txt` mit dem Inhalt `erste Zeile`.
4. `git add notizen.txt`, dann `git commit -m "Erste Notizen angelegt"`.
5. Erstellen Sie eine Datei `ideen.txt` mit dem Inhalt `Einkaufsliste`.
6. `git add ideen.txt`, dann `git commit -m "Ideen ergänzt"`.
7. Führen Sie `git log --oneline` aus.

Wie viele Zeilen zeigt `git log --oneline` an? Antworten Sie nur mit der Zahl.
