---
id: 3.3
category: 04-operatoren-ausdruecke
title:
  de: Durchschnitt zweier ganzer Zahlen
  en: Average of two integers
type: code
difficulty: medium
tags:
  de:
    - typumwandlung
    - cast
    - methoden
  en:
    - type-conversion
    - cast
    - methods
hints:
  de:
    - "`a` und `b` sind beide `int`. Ohne Vorkehrung liefert `(a + b) / 2` eine Ganzzahldivision."
    - Sorgen Sie dafür, dass mindestens ein Operand des Divisionsausdrucks `double` ist.
    - Ein Cast auf einen der Operanden reicht, z. B. `(double) (a + b) / 2`, oder Sie teilen durch das Literal `2.0`.
  en:
    - "`a` and `b` are both `int`. Without precautions, `(a + b) / 2` produces integer division."
    - Make sure at least one operand of the division expression is `double`.
    - A cast on one operand is enough, e.g. `(double) (a + b) / 2`, or divide by the literal `2.0`.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: average
    cases:
      - args:
          - 3
          - 4
        expected: 3.5
      - args:
          - 1
          - 2
        expected: 1.5
      - args:
          - -3
          - 3
        expected: 0
      - args:
          - 7
          - 8
        expected: 7.5
      - args:
          - 10
          - 10
        expected: 10
---

<!-- de -->
Vervollständigen Sie die Methode `average`, die zu zwei `int`-Werten
`a` und `b` deren Durchschnitt als `double` zurückgibt.

Achtung: `a` und `b` sind `int` – ohne eine gezielte Typumwandlung würde die
Division vorzeitig als Ganzzahldivision berechnet und die Nachkommastelle
ginge verloren, bevor sie überhaupt in einen `double` gelangt.

```java template
public class Main {
    // BEGIN EDIT
    public static double average(int a, int b) {
        // TODO: Durchschnitt als double berechnen
        return 0.0;
    }
    // END EDIT

    public static void main(String[] args) {
    }
}
```

<!-- en -->
Complete the method `average`, which returns the average of two `int`
values `a` and `b` as a `double`.

Careful: `a` and `b` are `int` – without a deliberate type conversion, the
division would be computed as integer division prematurely, and the decimal
part would be lost before it ever reached a `double`.

```java template
public class Main {
    // BEGIN EDIT
    public static double average(int a, int b) {
        // TODO: compute the average as a double
        return 0.0;
    }
    // END EDIT

    public static void main(String[] args) {
    }
}
```
