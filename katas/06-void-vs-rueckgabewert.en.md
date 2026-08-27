---
id: 1.2
category: 06-funktionen-rekursion
title: "void or Return Value?"
type: choice
difficulty: easy
tags: [functions, void, return]
multiple: true
shuffle: true
options:
  - text: "A `void` method does not need a `return` to be correct."
    correct: true
  - text: "You can capture the result of a call to a `void` method in a variable."
    correct: false
  - text: "A method with return type `int` must end with a `return` on every possible execution path."
    correct: true
  - text: "`void` means the method always returns `null`."
    correct: false
  - text: "`return` ends the method immediately, even if there is more code in the body afterwards."
    correct: true
hints:
  - "A void method does something (e.g. prints output), but does not return a value to the call site."
  - "`void` is not a value and not `null` either — it means 'no return value'."
  - "The compiler checks, for non-void methods, that every path through the body really ends with a return."
---

Which of the following statements about `void` methods and methods with a return value are **correct**?
