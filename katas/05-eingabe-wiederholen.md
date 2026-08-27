---
id: 3.5
category: 05-kontrollfluss-schleifen
title: "Eingabe wiederholen (do-while)"
type: code
difficulty: medium
tags: [do-while, scanner, kontrollfluss]
mainClass: Main
allowedImports: [java.util.Scanner]
timeoutMs: 5000
checks:
  - type: stdout
    label: "gültige Zahl beim ersten Versuch"
    stdin: "5\n"
    expected: |
      Bitte eine Zahl von 1 bis 10 eingeben:
      Ihre Zahl: 5
  - type: stdout
    label: "eine ungültige Eingabe davor"
    stdin: "15\n3\n"
    expected: |
      Bitte eine Zahl von 1 bis 10 eingeben:
      Bitte eine Zahl von 1 bis 10 eingeben:
      Ihre Zahl: 3
  - type: stdout
    label: "zwei ungültige Eingaben davor"
    stdin: "0\n-5\n10\n"
    expected: |
      Bitte eine Zahl von 1 bis 10 eingeben:
      Bitte eine Zahl von 1 bis 10 eingeben:
      Bitte eine Zahl von 1 bis 10 eingeben:
      Ihre Zahl: 10
hints:
  - "Die Eingabe muss mindestens einmal gelesen werden, bevor Sie sie überhaupt prüfen können – das spricht für `do-while` statt `while`."
  - "Geben Sie vor jedem Lesen die Zeile `Bitte eine Zahl von 1 bis 10 eingeben:` aus und lesen Sie danach mit `scanner.nextInt()`."
  - "Wiederholen Sie den Rumpf, solange die gelesene Zahl kleiner als 1 oder größer als 10 ist."
---

Schreiben Sie ein Programm, das mit `Scanner` so lange eine ganze Zahl einliest, bis eine Zahl zwischen 1 und 10 (einschließlich) eingegeben wurde. Geben Sie vor **jedem** Lesevorgang die Zeile

```
Bitte eine Zahl von 1 bis 10 eingeben:
```

aus. Sobald eine gültige Zahl eingegeben wurde, geben Sie abschließend `Ihre Zahl: ` gefolgt von der Zahl aus (keine weitere Aufforderung mehr).

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
