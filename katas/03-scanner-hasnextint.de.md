---
id: "3.4"
category: 03-ein-ausgabe
title: "Scanner: Robuste Eingabe prüfen"
type: code
difficulty: medium
tags: [eingabe, scanner]
mainClass: Main
allowedImports: [java.util.Scanner]
timeoutMs: 5000
checks:
  - type: stdout
    label: "Eingabe 21"
    stdin: "21\n"
    expected: |
      Wie alt sind Sie?
      Eingabe ist eine ganze Zahl: true
  - type: stdout
    label: "Eingabe einundzwanzig"
    stdin: "einundzwanzig\n"
    expected: |
      Wie alt sind Sie?
      Eingabe ist eine ganze Zahl: false
hints:
  - "`sc.hasNextInt()` prüft, ob als Nächstes eine ganze Zahl bereitsteht, ohne sie einzulesen."
  - "Das Ergebnis von `hasNextInt()` ist ein `boolean` – speichern Sie es in einer Variablen."
  - "Lesen Sie die Zahl hier noch nicht ein, geben Sie nur das Prüfergebnis aus."
---

Schreiben Sie ein Programm, das mit der Ausgabe `Wie alt sind Sie?` nach dem Alter fragt und **vor** dem eigentlichen Einlesen mit `sc.hasNextInt()` prüft, ob wirklich eine ganze Zahl bereitsteht. Speichern Sie das Ergebnis in einer `boolean`-Variablen und geben Sie es aus:

```
Wie alt sind Sie?
Eingabe ist eine ganze Zahl: true
```

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: mit hasNextInt() prüfen, ob eine ganze Zahl bereitsteht
    }
    // END EDIT
}
```
