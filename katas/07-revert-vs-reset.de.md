---
id: "3.5"
category: 07-git
title: "revert oder reset --hard?"
type: choice
difficulty: hard
tags: [git, revert, reset, historie]
multiple: false
shuffle: true
options:
  - text: "Bei Anna bleiben `C1`, `C2` und `C3` erhalten, zwei neue Commits heben die Änderungen auf; bei Ben verschwinden `C2` und `C3` vollständig aus der Historie"
    correct: true
  - text: "Beide Vorgehen führen zu einer exakt identischen Historie"
    correct: false
  - text: "Bei Anna verschwinden `C2` und `C3` aus der Historie, bei Ben bleiben alle Commits erhalten"
    correct: false
  - text: "`git revert` löscht den ursprünglichen Commit dauerhaft, so wie `git reset --hard`"
    correct: false
hints:
  - "`git revert` fügt für jeden rückgängig gemachten Commit einen neuen Commit hinzu, statt etwas zu löschen."
  - "`git reset --hard` springt zurück und macht spätere Commits praktisch unerreichbar."
---

Ein Repository hat drei Commits (`C1` → `C2` → `C3`), `HEAD` und `main` zeigen auf `C3`. Anna führt `git revert C2` und `git revert C3` aus, Ben führt stattdessen `git reset --hard C1` aus. Welche Aussage über die beiden Historien danach trifft zu?
