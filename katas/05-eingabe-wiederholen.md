---
id: 3.5
category: 05-kontrollfluss-schleifen
title:
  de: Eingabe wiederholen (do-while)
  en: Repeat input (do-while)
type: code
difficulty: medium
tags:
  de:
    - do-while
    - scanner
    - kontrollfluss
  en:
    - do-while
    - scanner
    - control-flow
hints:
  de:
    - Die Eingabe muss mindestens einmal gelesen werden, bevor Sie sie überhaupt prüfen können – das spricht für `do-while` statt `while`.
    - Geben Sie vor jedem Lesen die Zeile `Bitte eine Zahl von 1 bis 10 eingeben:` aus und lesen Sie danach mit `scanner.nextInt()`.
    - Wiederholen Sie den Rumpf, solange die gelesene Zahl kleiner als 1 oder größer als 10 ist.
  en:
    - The input must be read at least once before you can even check it — that argues for `do-while` instead of `while`.
    - Before each read, print the line `Please enter a number from 1 to 10:` and then read with `scanner.nextInt()`.
    - Repeat the body as long as the number read is less than 1 or greater than 10.
mainClass: Main
allowedImports:
  - java.util.Scanner
timeoutMs: 5000
checks:
  - type: stdout
    stdin: |
      5
    expected:
      de: |
        Bitte eine Zahl von 1 bis 10 eingeben:
        Ihre Zahl: 5
      en: |
        Please enter a number from 1 to 10:
        Your number: 5
    label:
      de: gültige Zahl beim ersten Versuch
      en: valid number on the first try
  - type: stdout
    stdin: |
      15
      3
    expected:
      de: |
        Bitte eine Zahl von 1 bis 10 eingeben:
        Bitte eine Zahl von 1 bis 10 eingeben:
        Ihre Zahl: 3
      en: |
        Please enter a number from 1 to 10:
        Please enter a number from 1 to 10:
        Your number: 3
    label:
      de: eine ungültige Eingabe davor
      en: one invalid input before
  - type: stdout
    stdin: |
      0
      -5
      10
    expected:
      de: |
        Bitte eine Zahl von 1 bis 10 eingeben:
        Bitte eine Zahl von 1 bis 10 eingeben:
        Bitte eine Zahl von 1 bis 10 eingeben:
        Ihre Zahl: 10
      en: |
        Please enter a number from 1 to 10:
        Please enter a number from 1 to 10:
        Please enter a number from 1 to 10:
        Your number: 10
    label:
      de: zwei ungültige Eingaben davor
      en: two invalid inputs before
---

<!-- de -->
Schreiben Sie ein Programm, das mit `Scanner` so lange eine ganze Zahl einliest, bis eine Zahl zwischen 1 und 10 (einschließlich) eingegeben wurde. Geben Sie vor **jedem** Lesevorgang die Zeile

```
Bitte eine Zahl von 1 bis 10 eingeben:
```

aus. Sobald eine gültige Zahl eingegeben wurde, geben Sie abschließend `Ihre Zahl: ` gefolgt von der Zahl aus (keine weitere Aufforderung mehr).

<!-- en -->
Write a program that uses `Scanner` to keep reading an integer until a number between 1 and 10 (inclusive) has been entered. Before **each** read, print the line

```
Please enter a number from 1 to 10:
```

Once a valid number has been entered, finally print `Your number: ` followed by the number (no further prompt).

<!-- all -->

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
