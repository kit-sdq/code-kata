---
id: "2.4"
category: 07-git
title: "View the history compactly"
type: text
difficulty: easy
tags: [git, log, history]
answers:
  - "git\\s+log\\s+--oneline\\s*"
match:
  mode: regex
  caseSensitive: true
hints:
  - "`git log` alone shows several lines per commit with author and date — that's more than you need here."
  - "There's an option that shortens each commit to exactly one line with an abbreviated identifier and description."
---

You want to see your repository's history compactly: one line per commit, with an abbreviated identifier and description. Which command do you use? Give the full command.
