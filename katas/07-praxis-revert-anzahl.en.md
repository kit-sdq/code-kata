---
id: "4.4"
category: 07-git
title: "Hands-on: Counting commits after a revert"
type: text
difficulty: medium
tags: [praxis, git, revert]
answers:
  - "3"
hints:
  - "`git revert` doesn't delete a commit, it adds a **new** commit that undoes the change."
  - "Before the revert you had two commits — afterwards one more is added."
---

**Hands-on task – run this on your own machine.**

Run the following in order:

1. Create a new folder `git-practice-revert` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. `git add notes.txt`, then `git commit -m "First notes created"`.
5. Append the line `This line is a mistake.` to the end of `notes.txt`.
6. `git commit -am "Added a faulty line"`.
7. Use `git log --oneline` to find the identifier of this last commit.
8. Undo it with `git revert --no-edit <identifier>`.
9. Run `git log --oneline` again.

How many commits does `git log --oneline` now show in total? Answer with just the number.
