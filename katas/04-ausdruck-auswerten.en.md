---
id: 2.2
category: 04-operatoren-ausdruecke
title: Evaluating an expression with several operators
type: text
difficulty: medium
tags: [operators, precedence, string]
answers:
  - "33"
hints:
  - "Java evaluates `+` from left to right when no other operators are in between."
  - "`1 + 2` are both `int`, so the result is `3`."
  - "Only after that does this result meet the string `\"3\"`, and `+` becomes concatenation."
---

What does

```java
System.out.println(1 + 2 + "3");
```

print?
