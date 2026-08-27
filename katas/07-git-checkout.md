---
id: "3.2"
category: 07-git
title:
  de: Zeitreise mit checkout
  en: Time travel with checkout
type: text
difficulty: medium
tags:
  - git
  - checkout
  - head
hints:
  de:
    - Der Befehl heißt `git checkout`, gefolgt von der Commit-Kennung.
    - Sie wollen sich den Stand nur ansehen, nicht dauerhaft verändern – dafür reicht die Kennung als Argument.
  en:
    - The command is `git checkout`, followed by the commit identifier.
    - You only want to look at the state, not change anything permanently — the identifier as an argument is enough for that.
answers:
  - git\s+checkout\s+a1b2c3d\s*
match:
  mode: regex
  caseSensitive: true
---

<!-- de -->
Ihr allererster Commit hat die Kennung `a1b2c3d`. Sie möchten sich kurz ansehen, wie Ihr Projekt zu diesem Zeitpunkt aussah, ohne etwas zu verändern. Welchen Befehl verwenden Sie? Geben Sie den vollständigen Befehl an.

<!-- en -->
Your very first commit has the identifier `a1b2c3d`. You want to briefly look at what your project looked like at that point, without changing anything. Which command do you use? Give the full command.
