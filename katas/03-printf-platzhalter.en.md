---
id: "2.1"
category: 03-ein-ausgabe
title: printf Placeholders
type: choice
difficulty: easy
tags: [output, printf]
multiple: false
shuffle: true
options:
  - text: "`%d` prints a whole number, `%s` a piece of text, and `%.2f` a decimal number with exactly two decimal places."
    correct: true
  - text: "`%d` prints a decimal number, `%f` a piece of text."
    correct: false
  - text: "`printf` automatically inserts a line break after every output, just like `println`."
    correct: false
  - text: "`%s` can only be used for numbers, not for text."
    correct: false
hints:
  - "The letter after the percent sign reveals the expected type: d for decimal, s for String, f for float/decimal number."
  - "Unlike `println`, `printf` does **not** insert a line break on its own — that's what the `%n` placeholder is for."
---

`printf` allows formatted output via placeholders in a template.

Which statement about the `printf` placeholders is correct?
