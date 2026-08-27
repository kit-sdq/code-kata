---
id: 2.1
category: 04-operatoren-ausdruecke
title: Operator precedence
type: choice
difficulty: medium
tags: [operators, precedence]
multiple: true
shuffle: true
options:
  - text: "`a + b * c` computes `b * c` first and then adds `a` (multiplication before addition)."
    correct: true
  - text: "`*`, `/`, and `%` bind more strongly than `+` and `-`."
    correct: true
  - text: "Comparisons like `<` or `==` bind more strongly than `&&` and `||`."
    correct: true
  - text: "In Java, evaluation is always strictly left to right, regardless of the operator."
    correct: false
  - text: "Parentheses `(...)` bind most strongly and can override any other precedence."
    correct: true
  - text: "`a < b && c > d` must be parenthesized as `(a < b) && (c > d)`, otherwise the result is different."
    correct: false
hints:
  - "The precedence rules essentially work like in mathematics: multiplication before addition."
  - "Comparisons bind more weakly than arithmetic operators, but more strongly than `&&` and `||`."
  - "Parentheses override the order and make the intent unambiguous – extra parentheses never hurt, though."
---

Select **all** of the statements below that are true about operator
precedence in Java.
