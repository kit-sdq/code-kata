---
id: "2.1"
category: 02-datentypen-variablen
title:
  de: "Ausgabe-Vorhersage: String-Vergleich mit =="
  en: "Output Prediction: String Comparison with =="
type: text
difficulty: medium
tags:
  de:
    - string
    - vergleich
    - fallen
  en:
    - string
    - comparison
    - pitfalls
hints:
  de:
    - "`String` ist kein primitiver Typ, sondern ein Referenztyp – die Variable speichert nur, wo der Text im Speicher liegt."
    - Gleiche String-Literale wie hier landen im selben Speicherbereich, deshalb zeigen `a` und `b` zufällig auf denselben Ort.
    - "Das Ergebnis täuscht: Verlassen Sie sich für Textvergleiche trotzdem nie auf `==`, sondern immer auf `equals`."
  en:
    - "`String` is not a primitive type but a reference type – the variable only stores where the text lives in memory."
    - Identical string literals like these end up in the same memory location, which is why `a` and `b` happen to point to the same place.
    - "The result is misleading: never rely on `==` for text comparisons anyway, always use `equals`."
answers:
  - "true"
match:
  mode: normalized
  caseSensitive: false
---

<!-- de -->
Was gibt die folgende Zeile aus?

```java
String a = "Hallo";
String b = "Hallo";
System.out.println(a == b);
```

<!-- en -->
What does the following line print?

```java
String a = "Hello";
String b = "Hello";
System.out.println(a == b);
```
