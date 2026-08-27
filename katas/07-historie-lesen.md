---
id: "3.1"
category: 07-git
title:
  de: Eine Historie lesen
  en: Reading a history
type: choice
difficulty: medium
tags:
  de:
    - git
    - log
    - head
    - historie
  en:
    - git
    - log
    - head
    - history
hints:
  de:
    - Bei `git log` steht der neueste Commit immer ganz oben in der Ausgabe.
    - HEAD wandert bei normaler Arbeit (ohne checkout) bei jedem neuen Commit automatisch mit.
  en:
    - With `git log`, the newest commit is always shown at the very top of the output.
    - During normal work (without checkout), HEAD automatically moves along with every new commit.
multiple: false
shuffle: true
options:
  - text:
      de: Auf den neuesten Commit `a1b2c3d`
      en: The newest commit `a1b2c3d`
    correct: true
  - text:
      de: Auf den ältesten Commit `5c1a0b4`
      en: The oldest commit `5c1a0b4`
    correct: false
  - text:
      de: Auf gar keinen Commit – `HEAD` ist zwischen zwei Commits
      en: No commit at all — `HEAD` is between two commits
    correct: false
  - text:
      de: Auf den mittleren Commit `7f3e9d2`
      en: The middle commit `7f3e9d2`
    correct: false
---

<!-- de -->
Sie sehen bei einer Kommilitonin folgende Ausgabe:

```
$ git log --oneline
a1b2c3d Scanner robust gemacht
7f3e9d2 printf ergänzt
5c1a0b4 Erstes Hallo-Welt-Programm
```

Worauf zeigt `HEAD` bei normalem Arbeiten (ohne `checkout`) gerade?

<!-- en -->
You see the following output on a classmate's machine:

```
$ git log --oneline
a1b2c3d Made the scanner more robust
7f3e9d2 Added printf
5c1a0b4 First hello-world program
```

What does `HEAD` currently point to during normal work (without `checkout`)?
