---
id: "3.7"
category: 07-git
title: "Hands-on: Diff after a change"
type: text
difficulty: medium
tags: [praxis, git, diff]
answers:
  - "2"
hints:
  - "`git diff` marks every newly added line with a single `+` at the start of the line."
  - "The line `+++ b/notes.txt` is a header and doesn't count — only the lines with actual content matter."
---

**Hands-on task – run this on your own machine.**

Run the following in order:

1. Create a new folder `git-practice-diff` and change into it.
2. Turn it into a repository with `git init`.
3. Create a file `notes.txt` with the content `first line`.
4. `git add notes.txt`, then `git commit -m "First notes created"`.
5. Append exactly these two new lines to the end of `notes.txt`:

```
third line
fourth line
```

6. Run `git diff notes.txt`.

How many lines in the output start with a single `+` and show newly added content (the header line `+++ b/notes.txt` doesn't count)? Answer with just the number.
