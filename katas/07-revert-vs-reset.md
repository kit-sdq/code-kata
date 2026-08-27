---
id: "3.5"
category: 07-git
title:
  de: revert oder reset --hard?
  en: revert or reset --hard?
type: choice
difficulty: hard
tags:
  de:
    - git
    - revert
    - reset
    - historie
  en:
    - git
    - revert
    - reset
    - history
hints:
  de:
    - "`git revert` fügt für jeden rückgängig gemachten Commit einen neuen Commit hinzu, statt etwas zu löschen."
    - "`git reset --hard` springt zurück und macht spätere Commits praktisch unerreichbar."
  en:
    - "`git revert` adds a new commit for each commit it undoes, instead of deleting anything."
    - "`git reset --hard` jumps back and makes later commits effectively unreachable."
multiple: false
shuffle: true
options:
  - text:
      de: Bei Anna bleiben `C1`, `C2` und `C3` erhalten, zwei neue Commits heben die Änderungen auf; bei Ben verschwinden `C2` und `C3` vollständig aus der Historie
      en: For Anna, `C1`, `C2`, and `C3` are all preserved, and two new commits undo the changes; for Ben, `C2` and `C3` disappear entirely from the history
    correct: true
  - text:
      de: Beide Vorgehen führen zu einer exakt identischen Historie
      en: Both approaches lead to an exactly identical history
    correct: false
  - text:
      de: Bei Anna verschwinden `C2` und `C3` aus der Historie, bei Ben bleiben alle Commits erhalten
      en: For Anna, `C2` and `C3` disappear from the history, for Ben all commits are preserved
    correct: false
  - text:
      de: "`git revert` löscht den ursprünglichen Commit dauerhaft, so wie `git reset --hard`"
      en: "`git revert` permanently deletes the original commit, just like `git reset --hard`"
    correct: false
---

<!-- de -->
Ein Repository hat drei Commits (`C1` → `C2` → `C3`), `HEAD` und `main` zeigen auf `C3`. Anna führt `git revert C2` und `git revert C3` aus, Ben führt stattdessen `git reset --hard C1` aus. Welche Aussage über die beiden Historien danach trifft zu?

<!-- en -->
A repository has three commits (`C1` → `C2` → `C3`), with `HEAD` and `main` pointing to `C3`. Anna runs `git revert C2` and `git revert C3`, while Ben instead runs `git reset --hard C1`. Which statement about the two resulting histories is correct?
