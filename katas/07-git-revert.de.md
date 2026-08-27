---
id: "3.3"
category: 07-git
title: "Sauber rückgängig machen"
type: text
difficulty: medium
tags: [git, revert]
answers:
  - "git\\s+revert\\s+d4e5f6a\\s*"
match:
  mode: regex
  caseSensitive: true
hints:
  - "Der Befehl heißt `git revert`, gefolgt von der Kennung des Commits, der rückgängig gemacht werden soll."
  - "Er erzeugt einen neuen Commit, der die alte Änderung aufhebt, ohne die Historie zu verändern."
---

Sie haben mit dem Commit `d4e5f6a` versehentlich eine fehlerhafte Zeile in `notizen.txt` eingebaut. Sie möchten genau diese Änderung rückgängig machen, ohne die bisherige Historie zu verändern. Welchen Befehl verwenden Sie? Geben Sie den vollständigen Befehl an.
