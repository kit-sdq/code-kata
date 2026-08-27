---
id: "3.8"
category: 07-git
title: "Praxis: Alten Commit ansehen"
type: text
difficulty: medium
tags: [praxis, git, checkout]
answers:
  - "erste Zeile"
hints:
  - "Suchen Sie sich mit `git log --oneline` die Kennung des **ältesten** (untersten) Commits heraus."
  - "`git checkout <Kennung>` versetzt den Ordnerinhalt in den Stand dieses Commits zurück."
---

**Praxisaufgabe – am eigenen Rechner ausführen.**

Führen Sie nacheinander aus:

1. Erstellen Sie einen neuen Ordner `git-uebung-checkout` und wechseln Sie hinein.
2. Machen Sie daraus mit `git init` ein Repository.
3. Erstellen Sie eine Datei `notizen.txt` mit dem Inhalt `erste Zeile`.
4. `git add notizen.txt`, dann `git commit -m "Erste Notizen angelegt"`.
5. Erstellen Sie eine Datei `ideen.txt` mit dem Inhalt `Einkaufsliste`.
6. `git add ideen.txt`, dann `git commit -m "Ideen ergänzt"`.
7. Lassen Sie sich mit `git log --oneline` die Kennung des ältesten Commits (unterste Zeile) anzeigen und wechseln Sie mit `git checkout <Kennung>` dorthin.
8. Öffnen Sie `notizen.txt`.

Welchen Inhalt zeigt `notizen.txt` jetzt? Geben Sie den Text genau so an.

Kehren Sie anschließend mit `git checkout -` wieder zum aktuellen Stand zurück.
