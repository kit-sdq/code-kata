---
id: "3.3"
category: 07-git
title:
  de: Sauber rückgängig machen
  en: Undo cleanly
type: text
difficulty: medium
tags:
  - git
  - revert
hints:
  de:
    - Der Befehl heißt `git revert`, gefolgt von der Kennung des Commits, der rückgängig gemacht werden soll.
    - Er erzeugt einen neuen Commit, der die alte Änderung aufhebt, ohne die Historie zu verändern.
  en:
    - The command is `git revert`, followed by the identifier of the commit to undo.
    - It creates a new commit that undoes the old change, without altering the history.
answers:
  - git\s+revert\s+d4e5f6a\s*
match:
  mode: regex
  caseSensitive: true
---

<!-- de -->
Sie haben mit dem Commit `d4e5f6a` versehentlich eine fehlerhafte Zeile in `notizen.txt` eingebaut. Sie möchten genau diese Änderung rückgängig machen, ohne die bisherige Historie zu verändern. Welchen Befehl verwenden Sie? Geben Sie den vollständigen Befehl an.

<!-- en -->
With the commit `d4e5f6a` you accidentally introduced a faulty line into `notes.txt`. You want to undo exactly this change, without altering the existing history. Which command do you use? Give the full command.
