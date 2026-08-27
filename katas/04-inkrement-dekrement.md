---
id: 1.5
category: 04-operatoren-ausdruecke
title:
  de: Vorher oder nachher? Inkrement und Dekrement
  en: Before or after? Increment and decrement
type: text
difficulty: medium
tags:
  de:
    - operatoren
    - inkrement
  en:
    - operators
    - increment
hints:
  de:
    - "`a++` ist das nachgestellte Inkrement: der alte Wert wird zuerst verwendet."
    - Erst nach der Zuweisung an `c` wird `a` tatsächlich erhöht.
    - Geben Sie zuerst den Wert von `c`, dann den von `a` an.
  en:
    - "`a++` is the post-increment: the old value is used first."
    - Only after the assignment to `c` is `a` actually incremented.
    - Give the value of `c` first, then the value of `a`.
answers:
  - 9 10
  - 9, 10
  - 9,10
---

<!-- de -->
Gegeben ist:

```java
int a = 9;
int c = a++;
System.out.println(c);
System.out.println(a);
```

Welche zwei Werte werden ausgegeben? Geben Sie zuerst den Wert für `c`, dann
den für `a` an (z. B. `1 2`).

<!-- en -->
Given:

```java
int a = 9;
int c = a++;
System.out.println(c);
System.out.println(a);
```

Which two values are printed? Give the value for `c` first, then the value
for `a` (e.g. `1 2`).
