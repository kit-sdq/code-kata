---
id: "1.3"
category: 02-datentypen-variablen
title: Ganzzahldivision und Kommadivision
type: code
difficulty: medium
tags: [datentypen, int, double, operatoren]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      3
      2
      3.4
hints:
  - "Bei der Division zweier `int`-Werte schneidet Java die Nachkommastellen ab."
  - "Mit `%` erhalten Sie den Rest einer Ganzzahldivision."
  - "Damit `17.0 / 5` mit Nachkommastellen gerechnet wird, muss mindestens einer der beiden Werte eine Kommazahl sein."
---

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
