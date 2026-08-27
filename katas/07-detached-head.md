---
id: "1.3"
category: 07-git
title: Detached HEAD
type: choice
difficulty: medium
tags:
  de:
    - git
    - konzept
    - head
    - checkout
  en:
    - git
    - concept
    - head
    - checkout
hints:
  de:
    - HEAD zeigt normalerweise auf den Branch, der wiederum auf den neuesten Commit zeigt.
    - Beim Ansehen eines alten Standes verändert sich nichts an den Branches selbst – nur HEAD zeigt woanders hin.
  en:
    - HEAD normally points to the branch, which in turn points to the newest commit.
    - Looking at an old state doesn't change the branches themselves — only HEAD points elsewhere.
multiple: false
shuffle: true
options:
  - text:
      de: "`main` bleibt beim neuesten Commit stehen, `HEAD` löst sich vom Branch und zeigt allein auf den alten Commit"
      en: "`main` stays on the newest commit, `HEAD` detaches from the branch and points solely to the old commit"
    correct: true
  - text:
      de: "`main` und `HEAD` zeigen beide sofort auf den alten Commit"
      en: "`main` and `HEAD` both immediately point to the old commit"
    correct: false
  - text:
      de: "`main` springt mit `HEAD` zum alten Commit, der bisher neueste Commit geht dabei verloren"
      en: "`main` jumps to the old commit along with `HEAD`, losing the previously newest commit"
    correct: false
  - text:
      de: "`HEAD` bleibt beim neuesten Commit stehen, nur `main` ändert sich"
      en: "`HEAD` stays on the newest commit, only `main` changes"
    correct: false
---

<!-- de -->
Sie führen `git checkout` mit der Kennung eines alten Commits aus. Git meldet daraufhin einen „detached HEAD“. Was ist danach der Zustand von `main` und `HEAD`?

<!-- en -->
You run `git checkout` with the identifier of an old commit. Git reports a "detached HEAD". What is the resulting state of `main` and `HEAD`?
