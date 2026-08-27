---
id: "3.4"
category: 07-git
title: "Reset hard"
type: text
difficulty: medium
tags: [git, reset]
answers:
  - "git\\s+reset\\s+--hard\\s+a1b2c3d\\s*"
match:
  mode: regex
  caseSensitive: true
hints:
  - "The command is `git reset`, with the `--hard` option, followed by the target identifier."
  - "Unlike `revert`, all later commits disappear from the history irrevocably."
---

Ben wants to reset his project state uncompromisingly to the commit `a1b2c3d`, with all later commits disappearing from the history. Which command (including the option) does he use? Give the full command.
