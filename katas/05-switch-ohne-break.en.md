---
id: 2.2
category: 05-kontrollfluss-schleifen
title: "Switch without break: what happens?"
type: choice
difficulty: medium
tags: [switch, control-flow, fallthrough]
multiple: false
shuffle: true
options:
  - text: |
      ```
      two
      three
      ```
    correct: true
  - text: |
      ```
      two
      ```
    correct: false
  - text: |
      ```
      one
      two
      three
      ```
    correct: false
  - text: |
      ```
      default
      ```
    correct: false
hints:
  - "Java jumps straight to the matching `case` in `switch (x)`, not to the beginning."
  - "Without `break`, execution falls through into the next `case` block, regardless of whether its condition matches."
  - "Only the `break` in `case 3` stops execution — so it never jumps to `default`."
---

What does the following program print?

```java
int x = 2;
switch (x) {
    case 1:
        System.out.println("one");
    case 2:
        System.out.println("two");
    case 3:
        System.out.println("three");
        break;
    default:
        System.out.println("default");
}
```
