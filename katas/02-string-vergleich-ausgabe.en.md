---
id: "2.1"
category: 02-datentypen-variablen
title: "Output Prediction: String Comparison with =="
type: text
difficulty: medium
tags: [string, comparison, pitfalls]
answers: ["true"]
match:
  mode: normalized
  caseSensitive: false
hints:
  - "`String` is not a primitive type but a reference type – the variable only stores where the text lives in memory."
  - "Identical string literals like these end up in the same memory location, which is why `a` and `b` happen to point to the same place."
  - "The result is misleading: never rely on `==` for text comparisons anyway, always use `equals`."
---

What does the following line print?

```java
String a = "Hello";
String b = "Hello";
System.out.println(a == b);
```
