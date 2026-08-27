---
id: "2.5"
category: 07-git
title: "Hands-on: Status of a new file"
type: choice
difficulty: easy
tags: [praxis, git, status]
multiple: false
shuffle: true
options:
  - text: "Untracked files — Git doesn't know the file at all yet"
    correct: true
  - text: "Staged changes — the file is already ready for the next commit"
    correct: false
  - text: "Changes not staged — Git knows the file, but there's a change"
    correct: false
  - text: "`git status` doesn't show the file at all"
    correct: false
hints:
  - "You've just created the file, but haven't run `git add` yet."
  - "Git distinguishes between files it has never seen and files that have already been committed once."
---

**Hands-on task – run this on your own machine.**

Run the following in order:

1. Create a new folder `git-practice-status` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. Run `git status`.

In which of the following categories does `git status` show the file `notes.txt`?
