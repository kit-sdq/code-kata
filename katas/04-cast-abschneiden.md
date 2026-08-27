---
id: 3.2
category: 04-operatoren-ausdruecke
title:
  de: Was macht ein Cast auf int wirklich?
  en: What does a cast to int really do?
type: text
difficulty: medium
tags:
  de:
    - typumwandlung
    - cast
  en:
    - type-conversion
    - cast
hints:
  de:
    - Ein Cast auf `int` rundet nicht, er schneidet die Nachkommastellen einfach ab.
    - "Das gilt auch bei negativen Zahlen: es wird in Richtung Null abgeschnitten."
    - Geben Sie zuerst das Ergebnis von `(int) 3.9`, dann von `(int) -3.9` an.
  en:
    - A cast to `int` doesn't round, it simply truncates the decimal places.
    - "That also applies to negative numbers: truncation happens towards zero."
    - Give the result of `(int) 3.9` first, then of `(int) -3.9`.
answers:
  - 3 -3
  - 3, -3
  - 3,-3
---

<!-- de -->
Was geben

```java
System.out.println((int) 3.9);
System.out.println((int) -3.9);
```

der Reihe nach aus? Geben Sie beide Werte an (z. B. `1 2`).

<!-- en -->
What do

```java
System.out.println((int) 3.9);
System.out.println((int) -3.9);
```

print, in order? Give both values (e.g. `1 2`).
