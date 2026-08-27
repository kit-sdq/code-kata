---
id: "3.4"
category: 03-ein-ausgabe
title:
  de: "Scanner: Robuste Eingabe prüfen"
  en: "Scanner: Checking Input Robustly"
type: code
difficulty: medium
tags:
  de:
    - eingabe
    - scanner
  en:
    - input
    - scanner
hints:
  de:
    - "`sc.hasNextInt()` prüft, ob als Nächstes eine ganze Zahl bereitsteht, ohne sie einzulesen."
    - Das Ergebnis von `hasNextInt()` ist ein `boolean` – speichern Sie es in einer Variablen.
    - Lesen Sie die Zahl hier noch nicht ein, geben Sie nur das Prüfergebnis aus.
  en:
    - "`sc.hasNextInt()` checks whether a whole number comes next, without reading it."
    - The result of `hasNextInt()` is a `boolean` — store it in a variable.
    - Don't read the number yet, just print the result of the check.
mainClass: Main
allowedImports:
  - java.util.Scanner
timeoutMs: 5000
checks:
  - type: stdout
    stdin: |
      21
    expected:
      de: |
        Wie alt sind Sie?
        Eingabe ist eine ganze Zahl: true
      en: |
        How old are you?
        Input is a whole number: true
    label:
      de: Eingabe 21
      en: Input 21
  - type: stdout
    stdin: |
      abc
    expected:
      de: |
        Wie alt sind Sie?
        Eingabe ist eine ganze Zahl: false
      en: |
        How old are you?
        Input is a whole number: false
    label:
      de: "Eingabe „abc\""
      en: 'Input "abc"'
---

<!-- de -->
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

<!-- en -->
Write a program that prints `How old are you?` to ask for the age and, **before** actually reading it, uses `sc.hasNextInt()` to check whether a whole number is really there. Store the result in a `boolean` variable and print it:

```
How old are you?
Input is a whole number: true
```

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: use hasNextInt() to check whether a whole number is next
    }
    // END EDIT
}
```
