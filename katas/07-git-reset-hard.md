---
id: "3.4"
category: 07-git
title:
  de: Hart zurücksetzen
  en: Reset hard
type: text
difficulty: medium
tags:
  - git
  - reset
hints:
  de:
    - Der Befehl heißt `git reset`, mit der Option `--hard`, gefolgt von der Ziel-Kennung.
    - Anders als `revert` verschwinden dabei alle späteren Commits unwiderruflich aus der Historie.
  en:
    - The command is `git reset`, with the `--hard` option, followed by the target identifier.
    - Unlike `revert`, all later commits disappear from the history irrevocably.
answers:
  - git\s+reset\s+--hard\s+a1b2c3d\s*
match:
  mode: regex
  caseSensitive: true
---

<!-- de -->
Ben möchte seinen Projektstand kompromisslos auf den Commit `a1b2c3d` zurücksetzen, alle späteren Commits sollen dabei aus der Historie verschwinden. Welchen Befehl (inklusive Option) verwendet er? Geben Sie den vollständigen Befehl an.

<!-- en -->
Ben wants to reset his project state uncompromisingly to the commit `a1b2c3d`, with all later commits disappearing from the history. Which command (including the option) does he use? Give the full command.
