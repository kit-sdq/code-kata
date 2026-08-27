---
id: 1.5
category: 04-operatoren-ausdruecke
title: Vorher oder nachher? Inkrement und Dekrement
type: text
difficulty: medium
tags: [operatoren, inkrement]
answers:
  - "9 10"
  - "9, 10"
  - "9,10"
hints:
  - "`a++` ist das nachgestellte Inkrement: der alte Wert wird zuerst verwendet."
  - "Erst nach der Zuweisung an `c` wird `a` tatsächlich erhöht."
  - "Geben Sie zuerst den Wert von `c`, dann den von `a` an."
---

Gegeben ist:

```java
int a = 9;
int c = a++;
System.out.println(c);
System.out.println(a);
```

Welche zwei Werte werden ausgegeben? Geben Sie zuerst den Wert für `c`, dann
den für `a` an (z. B. `1 2`).
