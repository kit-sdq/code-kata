---
id: 3.1
category: 06-funktionen-rekursion
title: "Base Case and Recursive Step"
type: choice
difficulty: medium
tags: [recursion, base-case]
multiple: true
shuffle: true
options:
  - text: "The base case produces a result without calling the method itself again."
    correct: true
  - text: "Each recursive call should work on a smaller or simpler problem."
    correct: true
  - text: "If the base case is missing or never reached, a `StackOverflowError` can occur."
    correct: true
  - text: "A recursive method does not need a base case, as long as it contains just one `if` check."
    correct: false
  - text: "The recursive step should call the method again with exactly the same arguments whenever possible."
    correct: false
hints:
  - "Think of a Matryoshka doll: the smallest doll, which can no longer be opened, is the base case."
  - "If a method calls itself again with the same value, the recursion goes in circles and never reaches the base case."
---

Which of the following statements about recursive methods are **correct**?
