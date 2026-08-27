---
id: "3.3"
category: 02-datentypen-variablen
title:
  de: Steckbrief mit vier Variablen
  en: Profile with Four Variables
type: code
difficulty: easy
tags:
  de:
    - variablen
    - datentypen
  en:
    - variables
    - data-types
hints:
  de:
    - "Wählen Sie für jeden Wert den passenden Typ: `int`, `double`, `boolean` und `char`."
    - Ein `char`-Wert steht immer in einfachen Anführungszeichen, z. B. `'A'`.
    - Geben Sie die vier Variablen in genau dieser Reihenfolge mit `System.out.println` aus.
  en:
    - "Choose the matching type for each value: `int`, `double`, `boolean` and `char`."
    - A `char` value always stands in single quotes, e.g. `'A'`.
    - Print the four variables in exactly this order with `System.out.println`.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      19
      1.75
      true
      A
---

<!-- de -->
Deklarieren und initialisieren Sie in `main` vier Variablen mit sprechenden Namen in camelCase:

- ein Alter von `19` (ganze Zahl)
- eine Körpergröße von `1.75` Metern (Kommazahl)
- den Wert `true` für "ist Studierende bzw. Studierender" (Wahrheitswert)
- den Anfangsbuchstaben `'A'` eines Vornamens (einzelnes Zeichen)

Geben Sie alle vier Variablen in dieser Reihenfolge mit `System.out.println` aus.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: die vier Variablen anlegen und ausgeben
    }
    // END EDIT
}
```

<!-- en -->
Declare and initialize four variables with descriptive camelCase names in `main`:

- an age of `19` (whole number)
- a height of `1.75` meters (floating-point number)
- the value `true` for "is a student" (boolean)
- the initial letter `'A'` of a first name (single character)

Print all four variables in this order with `System.out.println`.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: create the four variables and print them
    }
    // END EDIT
}
```
