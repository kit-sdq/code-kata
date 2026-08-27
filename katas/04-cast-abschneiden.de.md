---
id: 3.2
category: 04-operatoren-ausdruecke
title: Was macht ein Cast auf int wirklich?
type: text
difficulty: medium
tags: [typumwandlung, cast]
answers:
  - "3 -3"
  - "3, -3"
  - "3,-3"
hints:
  - "Ein Cast auf `int` rundet nicht, er schneidet die Nachkommastellen einfach ab."
  - "Das gilt auch bei negativen Zahlen: es wird in Richtung Null abgeschnitten."
  - "Geben Sie zuerst das Ergebnis von `(int) 3.9`, dann von `(int) -3.9` an."
---

Was geben

```java
System.out.println((int) 3.9);
System.out.println((int) -3.9);
```

der Reihe nach aus? Geben Sie beide Werte an (z. B. `1 2`).
