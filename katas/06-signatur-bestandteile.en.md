---
id: 1.1
category: 06-funktionen-rekursion
title: "Parts of a Method Signature"
type: choice
difficulty: easy
tags: [functions, signature]
multiple: true
shuffle: true
options:
  - text: "The return type of the method is `int`."
    correct: true
  - text: "The name of the method is `doubleAndAdd`."
    correct: true
  - text: "The method has two parameters, `zahl` and `summand`, both of type `int`."
    correct: true
  - text: "`zahl` and `summand` are arguments of the method."
    correct: false
  - text: "`static` is the return type of the method."
    correct: false
hints:
  - "The header of a method consists of return type, name, and parameter list — in that order."
  - "Parameters are the placeholders in the method definition. Arguments are the concrete values passed at the call site."
---

Given the following method signature:

```java
public static int doubleAndAdd(int zahl, int summand)
```

Which of the following statements about this signature are **correct**?
