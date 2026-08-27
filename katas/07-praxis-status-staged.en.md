---
id: "2.6"
category: 07-git
title: "Hands-on: Status after staging"
type: choice
difficulty: easy
tags: [praxis, git, status, add]
multiple: false
shuffle: true
options:
  - text: "Staged changes — the file is now ready for the next commit"
    correct: true
  - text: "Untracked files — same as before, nothing has changed"
    correct: false
  - text: "Changes not staged"
    correct: false
  - text: "`git status` no longer shows the file"
    correct: false
hints:
  - "`git add` moves a file from \"untracked\" into a new category."
  - "This category describes files that will be included in the next `git commit`."
---

**Hands-on task – run this on your own machine.**

Run the following in order:

1. Create a new folder `git-practice-staged` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. Add the file with `git add notes.txt`.
5. Run `git status`.

In which of the following categories does `git status` now show the file `notes.txt`?
