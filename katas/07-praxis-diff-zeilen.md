---
id: "3.7"
category: 07-git
title: "Praxis: Diff nach einer Änderung"
type: text
difficulty: medium
tags: [praxis, git, diff]
answers:
  - "2"
hints:
  - "`git diff` markiert jede neu hinzugefügte Zeile mit einem einzelnen `+` am Zeilenanfang."
  - "Die Zeile `+++ b/notizen.txt` ist eine Kopfzeile und zählt nicht mit – gemeint sind nur die Zeilen mit dem eigentlichen Inhalt."
---

**Praxisaufgabe – am eigenen Rechner ausführen.**

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

6. Führen Sie `git diff notizen.txt` aus.

Wie viele Zeilen im Ausgabetext beginnen mit einem einzelnen `+` und zeigen neu hinzugefügten Inhalt (die Kopfzeile `+++ b/notizen.txt` zählt nicht mit)? Antworten Sie nur mit der Zahl.
