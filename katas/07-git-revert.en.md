---
id: "3.3"
category: 07-git
title: "Undo cleanly"
type: text
difficulty: medium
tags: [git, revert]
answers:
  - "git\\s+revert\\s+d4e5f6a\\s*"
match:
  mode: regex
  caseSensitive: true
hints:
  - "The command is `git revert`, followed by the identifier of the commit to undo."
  - "It creates a new commit that undoes the old change, without altering the history."
---

With the commit `d4e5f6a` you accidentally introduced a faulty line into `notes.txt`. You want to undo exactly this change, without altering the existing history. Which command do you use? Give the full command.
