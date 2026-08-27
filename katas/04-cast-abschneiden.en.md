---
id: 3.2
category: 04-operatoren-ausdruecke
title: What does a cast to int really do?
type: text
difficulty: medium
tags: [type-conversion, cast]
answers:
  - "3 -3"
  - "3, -3"
  - "3,-3"
hints:
  - "A cast to `int` doesn't round, it simply truncates the decimal places."
  - "That also applies to negative numbers: truncation happens towards zero."
  - "Give the result of `(int) 3.9` first, then of `(int) -3.9`."
---

What do

```java
System.out.println((int) 3.9);
System.out.println((int) -3.9);
```

print, in order? Give both values (e.g. `1 2`).
