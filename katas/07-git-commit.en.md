---
id: "2.3"
category: 07-git
title: "Create the first commit"
type: text
difficulty: easy
tags: [git, commit]
answers:
  - "git\\s+commit\\s+-m\\s+(\"First notes created\"|'First notes created')\\s*"
match:
  mode: regex
  caseSensitive: true
hints:
  - "The command is `git commit`, the description follows the `-m` option."
  - "The description must be in quotes, either single or double quotes are allowed."
  - "Use the description exactly: \"First notes created\"."
---

You've already added `notes.txt` to the staging area with `git add`. Which command creates a commit now with exactly the description `First notes created`? Give the full command.
