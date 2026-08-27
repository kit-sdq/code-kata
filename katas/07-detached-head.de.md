---
id: "1.3"
category: 07-git
title: "Detached HEAD"
type: choice
difficulty: medium
tags: [git, konzept, head, checkout]
multiple: false
shuffle: true
options:
  - text: "`main` bleibt beim neuesten Commit stehen, `HEAD` löst sich vom Branch und zeigt allein auf den alten Commit"
    correct: true
  - text: "`main` und `HEAD` zeigen beide sofort auf den alten Commit"
    correct: false
  - text: "`main` springt mit `HEAD` zum alten Commit, der bisher neueste Commit geht dabei verloren"
    correct: false
  - text: "`HEAD` bleibt beim neuesten Commit stehen, nur `main` ändert sich"
    correct: false
hints:
  - "HEAD zeigt normalerweise auf den Branch, der wiederum auf den neuesten Commit zeigt."
  - "Beim Ansehen eines alten Standes verändert sich nichts an den Branches selbst – nur HEAD zeigt woanders hin."
---

Sie führen `git checkout` mit der Kennung eines alten Commits aus. Git meldet daraufhin einen „detached HEAD“. Was ist danach der Zustand von `main` und `HEAD`?
