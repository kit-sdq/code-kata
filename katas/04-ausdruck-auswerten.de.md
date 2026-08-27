---
id: 2.2
category: 04-operatoren-ausdruecke
title: Ausdruck mit mehreren Operatoren auswerten
type: text
difficulty: medium
tags: [operatoren, prioritaeten, string]
answers:
  - "33"
hints:
  - "Java wertet `+` von links nach rechts aus, wenn keine anderen Operatoren dazwischenstehen."
  - "`1 + 2` sind beides `int`, das Ergebnis ist `3`."
  - "Erst danach trifft dieses Ergebnis auf den String `\"3\"`, und `+` wird zur Verkettung."
---

Was gibt

```java
System.out.println(1 + 2 + "3");
```

aus?
