---
id: "3.1"
category: 07-git
title: "Eine Historie lesen"
type: choice
difficulty: medium
tags: [git, log, head, historie]
multiple: false
shuffle: true
options:
  - text: "Auf den neuesten Commit `a1b2c3d`"
    correct: true
  - text: "Auf den ältesten Commit `5c1a0b4`"
    correct: false
  - text: "Auf gar keinen Commit – `HEAD` ist zwischen zwei Commits"
    correct: false
  - text: "Auf den mittleren Commit `7f3e9d2`"
    correct: false
hints:
  - "Bei `git log` steht der neueste Commit immer ganz oben in der Ausgabe."
  - "HEAD wandert bei normaler Arbeit (ohne checkout) bei jedem neuen Commit automatisch mit."
---

Sie sehen bei einer Kommilitonin folgende Ausgabe:

```
$ git log --oneline
a1b2c3d Scanner robust gemacht
7f3e9d2 printf ergänzt
5c1a0b4 Erstes Hallo-Welt-Programm
```

Worauf zeigt `HEAD` bei normalem Arbeiten (ohne `checkout`) gerade?
