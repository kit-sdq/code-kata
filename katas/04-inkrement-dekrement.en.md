---
id: 1.5
category: 04-operatoren-ausdruecke
title: Before or after? Increment and decrement
type: text
difficulty: medium
tags: [operators, increment]
answers:
  - "9 10"
  - "9, 10"
  - "9,10"
hints:
  - "`a++` is the post-increment: the old value is used first."
  - "Only after the assignment to `c` is `a` actually incremented."
  - "Give the value of `c` first, then the value of `a`."
---

Given:

```java
int a = 9;
int c = a++;
System.out.println(c);
System.out.println(a);
```

Which two values are printed? Give the value for `c` first, then the value
for `a` (e.g. `1 2`).
