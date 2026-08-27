---
id: "3.1"
category: 07-git
title: "Reading a history"
type: choice
difficulty: medium
tags: [git, log, head, history]
multiple: false
shuffle: true
options:
  - text: "The newest commit `a1b2c3d`"
    correct: true
  - text: "The oldest commit `5c1a0b4`"
    correct: false
  - text: "No commit at all — `HEAD` is between two commits"
    correct: false
  - text: "The middle commit `7f3e9d2`"
    correct: false
hints:
  - "With `git log`, the newest commit is always shown at the very top of the output."
  - "During normal work (without checkout), HEAD automatically moves along with every new commit."
---

You see the following output on a classmate's machine:

```
$ git log --oneline
a1b2c3d Made the scanner more robust
7f3e9d2 Added printf
5c1a0b4 First hello-world program
```

What does `HEAD` currently point to during normal work (without `checkout`)?
