---
id: "3.2"
category: 03-ein-ausgabe
title:
  de: "Scanner: Die nextInt-Falle"
  en: "Scanner: The nextInt Trap"
type: code
difficulty: hard
tags:
  de:
    - eingabe
    - scanner
    - stolperfalle
  en:
    - input
    - scanner
    - pitfall
hints:
  de:
    - Lesen Sie die Hausnummer mit `sc.nextInt()` und den Straßennamen mit `sc.nextLine()`.
    - "`nextInt()` liest nur die Ziffern – der Zeilenumbruch der Eingabetaste bleibt danach übrig."
    - Rufen Sie direkt nach `sc.nextInt()` noch ein zusätzliches `sc.nextLine()` auf, das nur diesen übrig gebliebenen Zeilenumbruch wegliest. Sonst liest das folgende `sc.nextLine()` für die Straße sofort eine leere Zeile.
  en:
    - Read the house number with `sc.nextInt()` and the street name with `sc.nextLine()`.
    - "`nextInt()` only reads the digits — the line break from pressing Enter is left behind afterward."
    - Call an extra `sc.nextLine()` right after `sc.nextInt()` to consume just that leftover line break. Otherwise the following `sc.nextLine()` for the street immediately reads an empty line.
mainClass: Main
allowedImports:
  - java.util.Scanner
timeoutMs: 5000
checks:
  - type: stdout
    stdin: |
      42
      Am Fasanengarten
    expected:
      de: |
        Hausnummer:
        Straße:
        Adresse: Am Fasanengarten 42
      en: |
        House number:
        Street:
        Address: Am Fasanengarten 42
    label:
      de: Eingabe 42 / Am Fasanengarten
      en: Input 42 / Am Fasanengarten
  - type: stdout
    stdin: |
      7
      Hauptstraße
    expected:
      de: |
        Hausnummer:
        Straße:
        Adresse: Hauptstraße 7
      en: |
        House number:
        Street:
        Address: Hauptstraße 7
    label:
      de: Eingabe 7 / Hauptstraße
      en: Input 7 / Hauptstraße
---

<!-- de -->
Schreiben Sie ein Programm, das zunächst mit der Ausgabe `Hausnummer:` nach einer Hausnummer fragt und sie mit `sc.nextInt()` einliest, danach mit der Ausgabe `Straße:` nach einem Straßennamen fragt und ihn mit `sc.nextLine()` einliest. Geben Sie anschließend die vollständige Adresse aus.

Beispielablauf für die Eingaben `42` und `Am Fasanengarten`:

```
Hausnummer:
Straße:
Adresse: Am Fasanengarten 42
```

Vorsicht, hier lauert die berühmteste Scanner-Stolperfalle: Ohne eine zusätzliche Maßnahme wird die Straße scheinbar übersprungen und bleibt leer.

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: Hausnummer und Straße einlesen, Adresse ausgeben
    }
    // END EDIT
}
```

<!-- en -->
Write a program that first prints `House number:` to ask for a house number and reads it with `sc.nextInt()`, then prints `Street:` to ask for a street name and reads it with `sc.nextLine()`. Then print the full address.

Example run for the inputs `42` and `Am Fasanengarten`:

```
House number:
Street:
Address: Am Fasanengarten 42
```

Watch out — this is where the most famous Scanner pitfall lurks: without an extra measure, the street appears to be skipped and stays empty.

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: read house number and street, print the address
    }
    // END EDIT
}
```
