---
id: 5.2
category: 05-kontrollfluss-schleifen
title: "Loop dry run: break and continue"
type: text
difficulty: medium
tags: [break, continue, dry-run, control-flow]
answers: ["7"]
match:
  mode: normalized
hints:
  - "Go through the code line by line, without running it, and note down the current value of `i` after each pass."
  - "When `i % 3 == 0` (i.e. `i = 3` and `i = 6`), `i` is incremented and the rest of that pass is skipped with `continue`."
  - "When `i == 7`, `break` ends the loop immediately, **before** `i` is incremented in that round."
---

Read through the following code carefully, **without** running it:

```java
int i = 1;
while (i <= 8) {
    if (i % 3 == 0) {
        i = i + 1;
        continue;
    }
    if (i == 7) {
        break;
    }
    System.out.println(i);
    i = i + 1;
}
System.out.println("End at i = " + i);
```

What is the value of the variable `i` when the last line `System.out.println("End at i = " + i);` is executed? Give only the number.
