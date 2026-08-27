---
id: "3.1"
category: 02-datentypen-variablen
title: Erst deklarieren, dann zuweisen
type: code
difficulty: easy
tags: [variablen, deklaration, zuweisung]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      85
      92
hints:
  - "Deklarieren Sie `punkte` mit `int punkte;` – ohne Wert dahinter."
  - "Eine Zuweisung braucht keinen Typ mehr davor, nur noch `punkte = 85;`."
  - "Deklarieren Sie `punkte` nur ein einziges Mal in der ganzen Methode."
---

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
