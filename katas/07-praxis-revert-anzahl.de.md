---
id: "4.4"
category: 07-git
title: "Praxis: Commits zählen nach einem Revert"
type: text
difficulty: medium
tags: [praxis, git, revert]
answers:
  - "3"
hints:
  - "`git revert` löscht keinen Commit, sondern fügt einen **neuen** Commit hinzu, der die Änderung aufhebt."
  - "Vor dem Revert hatten Sie zwei Commits – danach kommt einer dazu."
---

**Praxisaufgabe – am eigenen Rechner ausführen.**

Führen Sie nacheinander aus:

1. Erstellen Sie einen neuen Ordner `git-uebung-revert` und wechseln Sie hinein.
2. Machen Sie daraus mit `git init` ein Repository.
3. Erstellen Sie eine Datei `notizen.txt` mit dem Inhalt `erste Zeile`.
4. `git add notizen.txt`, dann `git commit -m "Erste Notizen angelegt"`.
5. Fügen Sie am Ende von `notizen.txt` die Zeile `Dieser Satz ist ein Fehler.` an.
6. `git commit -am "Fehlerhafte Zeile eingebaut"`.
7. Suchen Sie mit `git log --oneline` die Kennung dieses letzten Commits heraus.
8. Machen Sie ihn rückgängig mit `git revert --no-edit <Kennung>`.
9. Führen Sie `git log --oneline` erneut aus.

Wie viele Commits zeigt `git log --oneline` jetzt insgesamt an? Antworten Sie nur mit der Zahl.
