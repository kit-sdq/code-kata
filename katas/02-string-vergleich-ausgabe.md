---
id: "2.1"
category: 02-datentypen-variablen
title: "Ausgabe-Vorhersage: String-Vergleich mit =="
type: text
difficulty: medium
tags: [string, vergleich, fallen]
answers: ["true"]
match:
  mode: normalized
  caseSensitive: false
hints:
  - "`String` ist kein primitiver Typ, sondern ein Referenztyp – die Variable speichert nur, wo der Text im Speicher liegt."
  - "Gleiche String-Literale wie hier landen im selben Speicherbereich, deshalb zeigen `a` und `b` zufällig auf denselben Ort."
  - "Das Ergebnis täuscht: Verlassen Sie sich für Textvergleiche trotzdem nie auf `==`, sondern immer auf `equals`."
---

Was gibt die folgende Zeile aus?

```java
String a = "Hallo";
String b = "Hallo";
System.out.println(a == b);
```
