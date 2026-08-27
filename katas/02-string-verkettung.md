---
id: "2.2"
category: 02-datentypen-variablen
title:
  de: Begrüßung verketten
  en: Concatenating a Greeting
type: code
difficulty: easy
tags:
  de:
    - string
    - verkettung
  en:
    - string
    - concatenation
hints:
  de:
    - Mit `+` können Sie mehrere Strings (und die Variablen dazwischen) aneinanderhängen.
    - "`vorname.length()` liefert die Anzahl der Zeichen des Strings."
  en:
    - Use `+` to join several strings (and the variables between them).
    - "`firstName.length()` gives you the number of characters in the string."
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected:
      de: |
        Hallo Anna aus Karlsruhe!
        4
      en: |
        Hello Anna from Karlsruhe!
        4
---

<!-- de -->
Legen Sie eine `String`-Variable `vorname = "Anna"` und eine `String`-Variable `stadt = "Karlsruhe"` an. Bilden Sie daraus mit `+` eine Variable `satz`, die genau `Hallo Anna aus Karlsruhe!` enthält, und geben Sie sie aus. Geben Sie danach die Länge von `vorname` aus.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: vorname, stadt und satz anlegen, dann beides ausgeben
    }
    // END EDIT
}
```

<!-- en -->
Create a `String` variable `firstName = "Anna"` and a `String` variable `city = "Karlsruhe"`. Use `+` to build a variable `sentence` that contains exactly `Hello Anna from Karlsruhe!`, and print it. Then print the length of `firstName`.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: create firstName, city and sentence, then print both
    }
    // END EDIT
}
```
