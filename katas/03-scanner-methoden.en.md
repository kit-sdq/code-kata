---
id: "3.3"
category: 03-ein-ausgabe
title: Scanner Methods
type: choice
difficulty: medium
tags: [input, scanner]
multiple: true
shuffle: true
options:
  - text: "`nextInt()` reads a whole number."
    correct: true
  - text: "`nextDouble()` reads a decimal number."
    correct: true
  - text: "`nextLine()` reads the entire rest of the line, including spaces in it."
    correct: true
  - text: "`next()` reads the entire rest of the line including spaces, just like `nextLine()`."
    correct: false
  - text: "`nextInt()` automatically also consumes the line break after the number."
    correct: false
hints:
  - "`next()` only reads a single word, up to the next whitespace."
  - "The line break after a number read with `nextInt()` is left behind and only consumed by the next `nextLine()` call."
---

`Scanner` offers several methods for reading values.

Select **all** statements that are correct.
