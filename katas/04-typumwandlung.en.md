---
id: 3.1
category: 04-operatoren-ausdruecke
title: Widening and casting
type: choice
difficulty: medium
tags: [type-conversion, cast]
multiple: true
shuffle: true
options:
  - text: "An `int` is automatically converted to `double`, without needing to do anything for it (widening)."
    correct: true
  - text: "A `double` is automatically converted to `int` as soon as it is assigned to an `int` variable."
    correct: false
  - text: "To turn a `double` into an `int`, you need an explicit cast, e.g. `(int) value`."
    correct: true
  - text: "`(int) 3.9` yields `4`, because it rounds."
    correct: false
  - text: "`(int) 3.9` yields `3`, because the cast truncates rather than rounds."
    correct: true
  - text: "Anyone who really wants to round should use `Math.round(...)`."
    correct: true
hints:
  - "The order of the types is: byte, short, int, long, float, double – conversion happens automatically from left to right."
  - "From right to left (the 'narrowing' direction), Java requires an explicit cast."
  - "A cast simply truncates the decimal places, it doesn't round."
---

Select **all** of the statements below that are true about implicit type
widening and explicit casting in Java.
