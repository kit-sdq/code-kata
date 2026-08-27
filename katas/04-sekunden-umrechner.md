---
id: 1.6
category: 04-operatoren-ausdruecke
title:
  de: Sekunden-Umrechner
  en: Seconds converter
type: code
difficulty: medium
tags:
  de:
    - operatoren
    - division
    - modulo
    - scanner
  en:
    - operators
    - division
    - modulo
    - scanner
hints:
  de:
    - Lesen Sie die Sekundenzahl mit `Scanner` ein.
    - Ganzzahldivision `/` liefert hier genau die vollen Einheiten, `%` den jeweiligen Rest.
    - "Stunden = gesamt / 3600. Rechnen Sie dann mit dem Rest weiter: Minuten = Rest / 60, Sekunden = Rest % 60."
  en:
    - Read the number of seconds with `Scanner`.
    - Integer division `/` gives exactly the whole units here, `%` the respective remainder.
    - "Hours = total / 3600. Then keep computing with the remainder: minutes = remainder / 60, seconds = remainder % 60."
mainClass: Main
allowedImports:
  - java.util.Scanner
timeoutMs: 5000
checks:
  - type: stdout
    stdin: |
      7384
    expected:
      de: |
        7384 Sekunden sind 2 Stunden, 3 Minuten und 4 Sekunden.
      en: |
        7384 seconds are 2 hours, 3 minutes and 4 seconds.
    label:
      de: 7384 Sekunden
      en: 7384 seconds
  - type: stdout
    stdin: |
      59
    expected:
      de: |
        59 Sekunden sind 0 Stunden, 0 Minuten und 59 Sekunden.
      en: |
        59 seconds are 0 hours, 0 minutes and 59 seconds.
    label:
      de: 59 Sekunden
      en: 59 seconds
  - type: stdout
    stdin: |
      3600
    expected:
      de: |
        3600 Sekunden sind 1 Stunden, 0 Minuten und 0 Sekunden.
      en: |
        3600 seconds are 1 hours, 0 minutes and 0 seconds.
    label:
      de: genau eine Stunde
      en: exactly one hour
---

<!-- de -->
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

<!-- en -->
Write a program that reads a number of seconds with `Scanner` and breaks
it down into hours, minutes, and seconds.

Print the breakdown in exactly this format (even if a value is `0`):

```text
<total> seconds are <hours> hours, <minutes> minutes and <seconds> seconds.
```

Example for the input `7384`:

```text
7384 seconds are 2 hours, 3 minutes and 4 seconds.
```

Here, truncating the decimal places with integer division is, for once,
exactly what you want.

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: read seconds and break them down into hours, minutes, seconds
    }
    // END EDIT
}
```
