---
id: "3.5"
category: 07-git
title: "revert or reset --hard?"
type: choice
difficulty: hard
tags: [git, revert, reset, history]
multiple: false
shuffle: true
options:
  - text: "For Anna, `C1`, `C2`, and `C3` are all preserved, and two new commits undo the changes; for Ben, `C2` and `C3` disappear entirely from the history"
    correct: true
  - text: "Both approaches lead to an exactly identical history"
    correct: false
  - text: "For Anna, `C2` and `C3` disappear from the history, for Ben all commits are preserved"
    correct: false
  - text: "`git revert` permanently deletes the original commit, just like `git reset --hard`"
    correct: false
hints:
  - "`git revert` adds a new commit for each commit it undoes, instead of deleting anything."
  - "`git reset --hard` jumps back and makes later commits effectively unreachable."
---

A repository has three commits (`C1` → `C2` → `C3`), with `HEAD` and `main` pointing to `C3`. Anna runs `git revert C2` and `git revert C3`, while Ben instead runs `git reset --hard C1`. Which statement about the two resulting histories is correct?
