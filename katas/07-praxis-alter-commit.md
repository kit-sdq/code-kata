---
id: "3.8"
category: 07-git
title:
  de: "Praxis: Alten Commit ansehen"
  en: "Hands-on: Viewing an old commit"
type: text
difficulty: medium
tags:
  - praxis
  - git
  - checkout
hints:
  de:
    - Suchen Sie sich mit `git log --oneline` die Kennung des **ältesten** (untersten) Commits heraus.
    - "`git checkout <Kennung>` versetzt den Ordnerinhalt in den Stand dieses Commits zurück."
  en:
    - Use `git log --oneline` to find the identifier of the **oldest** (bottom) commit.
    - "`git checkout <identifier>` resets the folder content to the state of that commit."
answers:
  de:
    - erste Zeile
  en:
    - first line
---

<!-- de -->
**Praxisaufgabe – am eigenen Rechner ausführen.**

Falls noch nicht geschehen, legen Sie vorher einmal fest, wer committet, wie im Video gezeigt: `git config --global user.name "Ihr Name"`, `git config --global user.email "ihre@adresse"` und `git config --global init.defaultBranch main`.

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

Kehren Sie anschließend mit `git checkout main` wieder zum aktuellen Stand zurück.

<!-- en -->
**Hands-on task – run this on your own machine.**

If you haven't done so yet, first set once who is committing, as shown in the video: `git config --global user.name "Your Name"`, `git config --global user.email "your@address"` and `git config --global init.defaultBranch main`.

Run the following in order:

1. Create a new folder `git-practice-checkout` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. `git add notes.txt`, then `git commit -m "First notes created"`.
5. Create a file `ideas.txt` with the content `Shopping list`.
6. `git add ideas.txt`, then `git commit -m "Added ideas"`.
7. Use `git log --oneline` to find the identifier of the oldest commit (bottom line) and switch to it with `git checkout <identifier>`.
8. Open `notes.txt`.

What content does `notes.txt` show now? Give the text exactly.

Afterwards, return to the current state with `git checkout main`.
