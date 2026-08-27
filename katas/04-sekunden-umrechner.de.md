---
id: 1.6
category: 04-operatoren-ausdruecke
title: Sekunden-Umrechner
type: code
difficulty: medium
tags: [operatoren, division, modulo, scanner]
mainClass: Main
allowedImports: [java.util.Scanner]
timeoutMs: 5000
checks:
  - type: stdout
    label: "7384 Sekunden"
    stdin: "7384\n"
    expected: |
      7384 Sekunden sind 2 Stunden, 3 Minuten und 4 Sekunden.
  - type: stdout
    label: "59 Sekunden"
    stdin: "59\n"
    expected: |
      59 Sekunden sind 0 Stunden, 0 Minuten und 59 Sekunden.
  - type: stdout
    label: "genau eine Stunde"
    stdin: "3600\n"
    expected: |
      3600 Sekunden sind 1 Stunden, 0 Minuten und 0 Sekunden.
hints:
  - "Lesen Sie die Sekundenzahl mit `Scanner` ein."
  - "Ganzzahldivision `/` liefert hier genau die vollen Einheiten, `%` den jeweiligen Rest."
  - "Stunden = gesamt / 3600. Rechnen Sie dann mit dem Rest weiter: Minuten = Rest / 60, Sekunden = Rest % 60."
---

Schreiben Sie ein Programm, das mit dem `Scanner` eine Anzahl von Sekunden
einliest und diese in Stunden, Minuten und Sekunden zerlegt.

Geben Sie die Zerlegung genau in diesem Format aus (auch wenn ein Wert `0`
ist):

```text
<gesamt> Sekunden sind <stunden> Stunden, <minuten> Minuten und <sekunden> Sekunden.
```

Beispiel für die Eingabe `7384`:

```text
7384 Sekunden sind 2 Stunden, 3 Minuten und 4 Sekunden.
```

Hier ist das Abschneiden der Nachkommastellen bei der Ganzzahldivision
ausnahmsweise genau das, was Sie wollen.

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: Sekunden einlesen und in Stunden, Minuten, Sekunden zerlegen
    }
    // END EDIT
}
```
