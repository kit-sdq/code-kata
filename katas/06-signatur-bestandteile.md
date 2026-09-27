---
id: 1.1
category: 06-methoden
title:
  de: Bestandteile einer Methodensignatur
  en: Parts of a Method Signature
type: choice
difficulty: easy
tags:
  de:
    - methoden
    - signatur
  en:
    - methods
    - signature
hints:
  de:
    - Der Kopf einer Methode besteht aus Rückgabetyp, Name und Parameterliste – in dieser Reihenfolge.
    - Parameter sind die Platzhalter in der Methodendefinition. Argumente sind die konkreten Werte, die beim Aufruf übergeben werden.
  en:
    - The header of a method consists of return type, name, and parameter list — in that order.
    - Parameters are the placeholders in the method definition. Arguments are the concrete values passed at the call site.
multiple: true
shuffle: true
options:
  - text:
      de: Der Rückgabetyp der Methode ist `int`.
      en: The return type of the method is `int`.
    correct: true
  - text:
      de: Der Name der Methode ist `verdoppleUndAddiere`.
      en: The name of the method is `doubleAndAdd`.
    correct: true
  - text:
      de: Die Methode hat zwei Parameter, `zahl` und `summand`, beide vom Typ `int`.
      en: The method has two parameters, `zahl` and `summand`, both of type `int`.
    correct: true
  - text:
      de: "`zahl` und `summand` sind Argumente der Methode."
      en: "`zahl` and `summand` are arguments of the method."
    correct: false
  - text:
      de: "`static` ist der Rückgabetyp der Methode."
      en: "`static` is the return type of the method."
    correct: false
---

<!-- de -->
Gegeben ist die folgende Methodensignatur:

```java
public static int verdoppleUndAddiere(int zahl, int summand)
```

Welche der folgenden Aussagen über diese Signatur sind **richtig**?

<!-- en -->
Given the following method signature:

```java
public static int doubleAndAdd(int zahl, int summand)
```

Which of the following statements about this signature are **correct**?
