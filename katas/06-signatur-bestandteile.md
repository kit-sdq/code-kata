---
id: 1.1
category: 06-funktionen-rekursion
title: "Bestandteile einer Methodensignatur"
type: choice
difficulty: easy
tags: [funktionen, signatur]
multiple: true
shuffle: true
options:
  - text: "Der Rückgabetyp der Methode ist `int`."
    correct: true
  - text: "Der Name der Methode ist `verdoppleUndAddiere`."
    correct: true
  - text: "Die Methode hat zwei Parameter, `zahl` und `summand`, beide vom Typ `int`."
    correct: true
  - text: "`zahl` und `summand` sind Argumente der Methode."
    correct: false
  - text: "`static` ist der Rückgabetyp der Methode."
    correct: false
hints:
  - "Der Kopf einer Methode besteht aus Rückgabetyp, Name und Parameterliste – in dieser Reihenfolge."
  - "Parameter sind die Platzhalter in der Methodendefinition. Argumente sind die konkreten Werte, die beim Aufruf übergeben werden."
---

Gegeben ist die folgende Methodensignatur:

```java
public static int verdoppleUndAddiere(int zahl, int summand)
```

Welche der folgenden Aussagen über diese Signatur sind **richtig**?
