---
id: 2.2
category: 04-operatoren-ausdruecke
title:
  de: Ausdruck mit mehreren Operatoren auswerten
  en: Evaluating an expression with several operators
type: text
difficulty: medium
tags:
  de:
    - operatoren
    - prioritaeten
    - string
  en:
    - operators
    - precedence
    - string
hints:
  de:
    - Java wertet `+` von links nach rechts aus, wenn keine anderen Operatoren dazwischenstehen.
    - "`1 + 2` sind beides `int`, das Ergebnis ist `3`."
    - Erst danach trifft dieses Ergebnis auf den String `"3"`, und `+` wird zur Verkettung.
  en:
    - Java evaluates `+` from left to right when no other operators are in between.
    - "`1 + 2` are both `int`, so the result is `3`."
    - Only after that does this result meet the string `"3"`, and `+` becomes concatenation.
answers:
  - "33"
---

<!-- de -->
Was gibt

```java
System.out.println(1 + 2 + "3");
```

aus?

<!-- en -->
What does

```java
System.out.println(1 + 2 + "3");
```

print?
