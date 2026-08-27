---
id: "3.3"
category: 02-datentypen-variablen
title: Steckbrief mit vier Variablen
type: code
difficulty: easy
tags: [variablen, datentypen]
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
hints:
  - "Wählen Sie für jeden Wert den passenden Typ: `int`, `double`, `boolean` und `char`."
  - "Ein `char`-Wert steht immer in einfachen Anführungszeichen, z. B. `'A'`."
  - "Geben Sie die vier Variablen in genau dieser Reihenfolge mit `System.out.println` aus."
---

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
