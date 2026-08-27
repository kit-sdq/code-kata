---
id: "3.1"
category: 02-datentypen-variablen
title:
  de: Erst deklarieren, dann zuweisen
  en: First Declare, Then Assign
type: code
difficulty: easy
tags:
  de:
    - variablen
    - deklaration
    - zuweisung
  en:
    - variables
    - declaration
    - assignment
hints:
  de:
    - Deklarieren Sie `punkte` mit `int punkte;` – ohne Wert dahinter.
    - Eine Zuweisung braucht keinen Typ mehr davor, nur noch `punkte = 85;`.
    - Deklarieren Sie `punkte` nur ein einziges Mal in der ganzen Methode.
  en:
    - Declare `points` with `int points;` – without a value after it.
    - An assignment no longer needs a type before it, just `points = 85;`.
    - Declare `points` only once in the whole method.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      85
      92
---

<!-- de -->
Deklarieren Sie eine Variable `punkte` vom Typ `int` zunächst **ohne** Wert. Weisen Sie ihr danach den Wert `85` zu und geben Sie sie aus. Weisen Sie ihr anschließend den Wert `92` zu und geben Sie sie erneut aus. Deklarieren Sie `punkte` dabei nur ein einziges Mal.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: punkte deklarieren, auf 85 setzen und ausgeben, dann auf 92 setzen und ausgeben
    }
    // END EDIT
}
```

<!-- en -->
Declare a variable `points` of type `int`, initially **without** a value. Then assign it the value `85` and print it. After that, assign it the value `92` and print it again. Declare `points` only once.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: declare points, set it to 85 and print it, then set it to 92 and print it
    }
    // END EDIT
}
```
