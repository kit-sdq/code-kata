---
id: "3.1"
category: 03-ein-ausgabe
title: "Scanner: Zahl verdoppeln"
type: code
difficulty: easy
tags: [eingabe, scanner]
mainClass: Main
allowedImports: [java.util.Scanner]
timeoutMs: 5000
checks:
  - type: stdout
    label: "Eingabe 5"
    stdin: "5\n"
    expected: |
      10
  - type: stdout
    label: "Eingabe -3"
    stdin: "-3\n"
    expected: |
      -6
hints:
  - "Legen Sie einen `Scanner` mit `new Scanner(System.in)` an – vergessen Sie den `import java.util.Scanner;` nicht."
  - "Lesen Sie die Zahl mit `sc.nextInt()` ein."
  - "Geben Sie nur das Doppelte der Zahl aus, sonst nichts weiter."
---

Lesen Sie mit einem `Scanner` eine ganze Zahl von der Standardeingabe ein und geben Sie ihr Doppeltes aus.

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: Zahl einlesen, Doppeltes ausgeben
    }
    // END EDIT
}
```
