---
id: 3.5
category: 06-funktionen-rekursion
title: "Dry-Running a Recursive Method"
type: text
difficulty: medium
tags: [recursion, dry-run]
answers: ["15"]
match:
  mode: normalized
hints:
  - "Go through the calls layer by layer: `mysteryF(5)` calls `mysteryF(3)`, which calls `mysteryF(1)`, and so on."
  - "The base case `n <= 0` returns `1`. Note that `n` can also become negative."
---

Given the following method:

```java
public static int mysteryF(int n) {
    if (n <= 0) {
        return 1;
    }
    return n * mysteryF(n - 2);
}
```

What does the call `mysteryF(5)` return? Work through the call **by hand** before answering.
