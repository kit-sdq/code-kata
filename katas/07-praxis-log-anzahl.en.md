---
id: "3.6"
category: 07-git
title: "Hands-on: Counting commits"
type: text
difficulty: easy
tags: [praxis, git, log, commit]
answers:
  - "2"
hints:
  - "Every line in `git log --oneline` corresponds to exactly one commit."
  - "In this exercise, you ran `git commit` exactly twice."
---

**Hands-on task – run this on your own machine.**

Run the following in order:

1. Create a new folder `git-practice-log` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. `git add notes.txt`, then `git commit -m "First notes created"`.
5. Create a file `ideas.txt` with the content `Shopping list`.
6. `git add ideas.txt`, then `git commit -m "Added ideas"`.
7. Run `git log --oneline`.

How many lines does `git log --oneline` show? Answer with just the number.
