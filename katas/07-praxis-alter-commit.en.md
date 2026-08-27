---
id: "3.8"
category: 07-git
title: "Hands-on: Viewing an old commit"
type: text
difficulty: medium
tags: [praxis, git, checkout]
answers:
  - "first line"
hints:
  - "Use `git log --oneline` to find the identifier of the **oldest** (bottom) commit."
  - "`git checkout <identifier>` resets the folder content to the state of that commit."
---

**Hands-on task – run this on your own machine.**

Run the following in order:

1. Create a new folder `git-practice-checkout` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. `git add notes.txt`, then `git commit -m "First notes created"`.
5. Create a file `ideas.txt` with the content `Shopping list`.
6. `git add ideas.txt`, then `git commit -m "Added ideas"`.
7. Use `git log --oneline` to find the identifier of the oldest commit (bottom line) and switch to it with `git checkout <identifier>`.
8. Open `notes.txt`.

What content does `notes.txt` show now? Give the text exactly.

Afterwards, return to the current state with `git checkout -`.
