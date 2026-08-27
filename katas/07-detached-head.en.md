---
id: "1.3"
category: 07-git
title: "Detached HEAD"
type: choice
difficulty: medium
tags: [git, concept, head, checkout]
multiple: false
shuffle: true
options:
  - text: "`main` stays on the newest commit, `HEAD` detaches from the branch and points solely to the old commit"
    correct: true
  - text: "`main` and `HEAD` both immediately point to the old commit"
    correct: false
  - text: "`main` jumps to the old commit along with `HEAD`, losing the previously newest commit"
    correct: false
  - text: "`HEAD` stays on the newest commit, only `main` changes"
    correct: false
hints:
  - "HEAD normally points to the branch, which in turn points to the newest commit."
  - "Looking at an old state doesn't change the branches themselves — only HEAD points elsewhere."
---

You run `git checkout` with the identifier of an old commit. Git reports a "detached HEAD". What is the resulting state of `main` and `HEAD`?
