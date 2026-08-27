---
id: "3.2"
category: 07-git
title: "Time travel with checkout"
type: text
difficulty: medium
tags: [git, checkout, head]
answers:
  - "git\\s+checkout\\s+a1b2c3d\\s*"
match:
  mode: regex
  caseSensitive: true
hints:
  - "The command is `git checkout`, followed by the commit identifier."
  - "You only want to look at the state, not change anything permanently — the identifier as an argument is enough for that."
---

Your very first commit has the identifier `a1b2c3d`. You want to briefly look at what your project looked like at that point, without changing anything. Which command do you use? Give the full command.
