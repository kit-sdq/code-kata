---
id: "3.2"
category: 03-ein-ausgabe
title: "Scanner: Die nextInt-Falle"
type: code
difficulty: hard
tags: [eingabe, scanner, stolperfalle]
mainClass: Main
allowedImports: [java.util.Scanner]
timeoutMs: 5000
checks:
  - type: stdout
    label: "Eingabe 42 / Am Fasanengarten"
    stdin: "42\nAm Fasanengarten\n"
    expected: |
      Hausnummer:
      Straße:
      Adresse: Am Fasanengarten 42
  - type: stdout
    label: "Eingabe 7 / Hauptstraße"
    stdin: "7\nHauptstraße\n"
    expected: |
      Hausnummer:
      Straße:
      Adresse: Hauptstraße 7
hints:
  - "Lesen Sie die Hausnummer mit `sc.nextInt()` und den Straßennamen mit `sc.nextLine()`."
  - "`nextInt()` liest nur die Ziffern – der Zeilenumbruch der Eingabetaste bleibt danach übrig."
  - "Rufen Sie direkt nach `sc.nextInt()` noch ein zusätzliches `sc.nextLine()` auf, das nur diesen übrig gebliebenen Zeilenumbruch wegliest. Sonst liest das folgende `sc.nextLine()` für die Straße sofort eine leere Zeile."
---

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
