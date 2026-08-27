---
id: "1.1"
category: 03-ein-ausgabe
title: print or println?
type: choice
difficulty: easy
tags: [output, println, print]
multiple: true
shuffle: true
options:
  - text: "`println` inserts a line break after the output, `print` does not."
    correct: true
  - text: "`print` and `println` differ only in name; the behavior is identical."
    correct: false
  - text: "`System.out.println()` with no argument produces an empty line."
    correct: true
  - text: "`print` inserts a line break before the output."
    correct: false
  - text: "Two consecutive `print` calls end up next to each other on the same line if no line break is printed in between."
    correct: true
hints:
  - "The name `println` comes from \"print line\"."
  - "Think about what happens on screen with two `print` calls in a row."
---

You already know `System.out.println`. There is also `System.out.print` — without the `ln` at the end.

Select **all** statements that correctly describe the difference between `print` and `println`.
