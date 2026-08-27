---
id: "3.4"
category: 07-git
title: "Hart zurücksetzen"
type: text
difficulty: medium
tags: [git, reset]
answers:
  - "git\\s+reset\\s+--hard\\s+a1b2c3d\\s*"
match:
  mode: regex
  caseSensitive: true
hints:
  - "Der Befehl heißt `git reset`, mit der Option `--hard`, gefolgt von der Ziel-Kennung."
  - "Anders als `revert` verschwinden dabei alle späteren Commits unwiderruflich aus der Historie."
---

Ben möchte seinen Projektstand kompromisslos auf den Commit `a1b2c3d` zurücksetzen, alle späteren Commits sollen dabei aus der Historie verschwinden. Welchen Befehl (inklusive Option) verwendet er? Geben Sie den vollständigen Befehl an.
