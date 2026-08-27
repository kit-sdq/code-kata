---
id: 3.4
category: 04-operatoren-ausdruecke
title:
  de: Gerade oder ungerade?
  en: Even or odd?
type: code
difficulty: easy
tags:
  de:
    - operatoren
    - modulo
    - boolean
    - methoden
  en:
    - operators
    - modulo
    - boolean
    - methods
hints:
  de:
    - Eine Zahl ist genau dann gerade, wenn sie beim Teilen durch 2 den Rest 0 lässt.
    - Das Prozentzeichen `%` liefert den Rest einer Division.
    - Der Ausdruck `zahl % 2 == 0` ist bereits ein `boolean` – Sie können ihn direkt zurückgeben.
  en:
    - A number is even exactly when it leaves a remainder of 0 when divided by 2.
    - The percent sign `%` gives the remainder of a division.
    - The expression `number % 2 == 0` is already a `boolean` – you can return it directly.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: isEven
    cases:
      - args:
          - 4
        expected: true
      - args:
          - 7
        expected: false
      - args:
          - 0
        expected: true
      - args:
          - -4
        expected: true
      - args:
          - -3
        expected: false
---

<!-- de -->
Vervollständigen Sie die Methode `isEven`, die für eine ganze Zahl `zahl`
`true` zurückgibt, wenn sie gerade ist, und sonst `false`.

```java template
public class Main {
    // BEGIN EDIT
    public static boolean isEven(int zahl) {
        // TODO: true zurückgeben, wenn zahl gerade ist
        return false;
    }
    // END EDIT

    public static void main(String[] args) {
    }
}
```

<!-- en -->
Complete the method `isEven`, which returns `true` for an integer `number`
if it is even, and `false` otherwise.

```java template
public class Main {
    // BEGIN EDIT
    public static boolean isEven(int number) {
        // TODO: return true if number is even
        return false;
    }
    // END EDIT

    public static void main(String[] args) {
    }
}
```
