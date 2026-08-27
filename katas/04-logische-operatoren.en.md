---
id: 1.4
category: 04-operatoren-ausdruecke
title: Logical operators and short-circuit evaluation
type: choice
difficulty: medium
tags: [operators, boolean, short-circuit-evaluation]
multiple: true
shuffle: true
options:
  - text: "`&&` is `true` only when both sides are `true`."
    correct: true
  - text: "`||` is already `true` when at least one side is `true`."
    correct: true
  - text: "For `a && b`, Java always evaluates both sides, no matter what's on the left."
    correct: false
  - text: "If in `a || b` the left side `a` is already `true`, `b` is no longer evaluated."
    correct: true
  - text: "`!` inverts a `boolean` value: `true` becomes `false` and vice versa."
    correct: true
hints:
  - "Java evaluates logical expressions from left to right."
  - "As soon as the result is determined, the rest of the expression is no longer looked at."
  - "This is called short-circuit evaluation."
---

Select **all** of the statements below that are true about `&&`, `||`, and
`!` in Java.
