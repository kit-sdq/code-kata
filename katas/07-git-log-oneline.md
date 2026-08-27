---
id: "2.4"
category: 07-git
title:
  de: Historie kompakt ansehen
  en: View the history compactly
type: text
difficulty: easy
tags:
  de:
    - git
    - log
    - historie
  en:
    - git
    - log
    - history
hints:
  de:
    - "`git log` allein zeigt zu jedem Commit mehrere Zeilen mit Autor und Datum an – das reicht hier nicht."
    - Es gibt eine Option, die jeden Commit auf genau eine Zeile mit gekürzter Kennung und Beschreibung verkürzt.
  en:
    - "`git log` alone shows several lines per commit with author and date — that's more than you need here."
    - There's an option that shortens each commit to exactly one line with an abbreviated identifier and description.
answers:
  - git\s+log\s+--oneline\s*
match:
  mode: regex
  caseSensitive: true
---

<!-- de -->
Sie möchten die Historie Ihres Repositorys kompakt sehen: jeweils eine Zeile pro Commit, mit gekürzter Kennung und Beschreibung. Welchen Befehl verwenden Sie? Geben Sie den vollständigen Befehl an.

<!-- en -->
You want to see your repository's history compactly: one line per commit, with an abbreviated identifier and description. Which command do you use? Give the full command.
