---
id: 1.3
category: 04-operatoren-ausdruecke
title: Comparison and equality
type: choice
difficulty: easy
tags: [operators, comparison, boolean]
multiple: true
shuffle: true
options:
  - text: "Every comparison (e.g. `a > b`) yields a value of type `boolean`."
    correct: true
  - text: "Equality is checked with `==`, not with a single `=`."
    correct: true
  - text: "`int a = 5; boolean b = (a = 6);` is a comparison and yields `false`."
    correct: false
  - text: "A single `=` is an assignment; the compiler always reports a confusion with `==` as an error, regardless of the variables' type."
    correct: false
  - text: "`5 != 3` yields `true`."
    correct: true
hints:
  - "A single equals sign assigns, a double one compares."
  - "With `boolean` variables, confusing `=` and `==` is especially treacherous."
  - "`a = 6` as an expression yields the assigned value `6`, not a truth value."
---

Select **all** of the statements below that are true about comparison and
equality in Java.
