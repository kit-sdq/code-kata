---
id: 3.3
category: 04-operatoren-ausdruecke
title: Durchschnitt zweier ganzer Zahlen
type: code
difficulty: medium
tags: [typumwandlung, cast, methoden]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: durchschnitt
    cases:
      - args: [3, 4]
        expected: 3.5
      - args: [1, 2]
        expected: 1.5
      - args: [-3, 3]
        expected: 0.0
      - args: [7, 8]
        expected: 7.5
      - args: [10, 10]
        expected: 10.0
hints:
  - "`a` und `b` sind beide `int`. Ohne Vorkehrung liefert `(a + b) / 2` eine Ganzzahldivision."
  - "Sorgen Sie dafür, dass mindestens ein Operand des Divisionsausdrucks `double` ist."
  - "Ein Cast auf einen der Operanden reicht, z. B. `(double) (a + b) / 2`, oder Sie teilen durch das Literal `2.0`."
---

Vervollständigen Sie die Methode `durchschnitt`, die zu zwei `int`-Werten
`a` und `b` deren Durchschnitt als `double` zurückgibt.

Achtung: `a` und `b` sind `int` – ohne eine gezielte Typumwandlung würde die
Division vorzeitig als Ganzzahldivision berechnet und die Nachkommastelle
ginge verloren, bevor sie überhaupt in einen `double` gelangt.

```java template
public class Main {
    // BEGIN EDIT
    public static double durchschnitt(int a, int b) {
        // TODO: Durchschnitt als double berechnen
        return 0.0;
    }
    // END EDIT

    public static void main(String[] args) {
    }
}
```
