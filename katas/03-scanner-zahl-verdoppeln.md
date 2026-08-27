---
id: "3.1"
category: 03-ein-ausgabe
title:
  de: "Scanner: Zahl verdoppeln"
  en: "Scanner: Doubling a Number"
type: code
difficulty: easy
tags:
  de:
    - eingabe
    - scanner
  en:
    - input
    - scanner
hints:
  de:
    - Legen Sie einen `Scanner` mit `new Scanner(System.in)` an – vergessen Sie den `import java.util.Scanner;` nicht.
    - Lesen Sie die Zahl mit `sc.nextInt()` ein.
    - Geben Sie nur das Doppelte der Zahl aus, sonst nichts weiter.
  en:
    - Create a `Scanner` with `new Scanner(System.in)` — don't forget `import java.util.Scanner;`.
    - Read the number with `sc.nextInt()`.
    - Print only the doubled number, nothing else.
mainClass: Main
allowedImports:
  - java.util.Scanner
timeoutMs: 5000
checks:
  - type: stdout
    stdin: |
      5
    expected: |
      10
    label:
      de: Eingabe 5
      en: Input 5
  - type: stdout
    stdin: |
      -3
    expected: |
      -6
    label:
      de: Eingabe -3
      en: Input -3
---

<!-- de -->
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

<!-- en -->
Use a `Scanner` to read a whole number from standard input and print its double.

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: read the number, print its double
    }
    // END EDIT
}
```
