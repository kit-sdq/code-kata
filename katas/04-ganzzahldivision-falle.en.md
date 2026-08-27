---
id: 1.2
category: 04-operatoren-ausdruecke
title: The integer division trap
type: text
difficulty: medium
tags: [operators, division, type-conversion]
answers:
  - "80.0"
hints:
  - "Java fully evaluates `(k1 + k2 + k3) / 3` with `int` operands first."
  - "Only after that is the `int` result assigned to the `double` variable."
  - "Answer with the decimal place, i.e. `80.0`, not `80`."
---

Given the three `int` variables `k1 = 71`, `k2 = 80` and `k3 = 90`, the
following is executed:

```java
double average = (k1 + k2 + k3) / 3;
System.out.println(average);
```

What does `System.out.println(average)` print?

Give the exact value, including the decimal place (e.g. `80.0`), because
whether or not there is a decimal place makes the crucial difference here.
