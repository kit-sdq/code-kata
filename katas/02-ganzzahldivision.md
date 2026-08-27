---
id: "1.3"
category: 02-datentypen-variablen
title:
  de: Ganzzahldivision und Kommadivision
  en: Integer Division and Floating-Point Division
type: code
difficulty: medium
tags:
  de:
    - datentypen
    - int
    - double
    - operatoren
  en:
    - data-types
    - int
    - double
    - operators
hints:
  de:
    - Bei der Division zweier `int`-Werte schneidet Java die Nachkommastellen ab.
    - Mit `%` erhalten Sie den Rest einer Ganzzahldivision.
    - Damit `17.0 / 5` mit Nachkommastellen gerechnet wird, muss mindestens einer der beiden Werte eine Kommazahl sein.
  en:
    - When dividing two `int` values, Java truncates the decimal places.
    - Use `%` to get the remainder of an integer division.
    - For `17.0 / 5` to be computed with decimal places, at least one of the two values must be a floating-point number.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      3
      2
      3.4
---

<!-- de -->
Legen Sie zwei `int`-Variablen `gesamt = 17` und `gruppen = 5` an und geben Sie in dieser Reihenfolge aus:

1. das Ergebnis von `gesamt / gruppen`
2. den Rest `gesamt % gruppen`
3. das Ergebnis von `17.0 / 5` in einer `double`-Variablen

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: gesamt, gruppen anlegen und die drei Werte ausgeben
    }
    // END EDIT
}
```

<!-- en -->
Create two `int` variables `total = 17` and `groups = 5` and print, in this order:

1. the result of `total / groups`
2. the remainder `total % groups`
3. the result of `17.0 / 5` stored in a `double` variable

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: create total, groups and print the three values
    }
    // END EDIT
}
```
