---
id: "1.4"
category: 03-ein-ausgabe
title:
  de: Text und Werte kombinieren
  en: Combining Text and Values
type: code
difficulty: medium
tags:
  de:
    - ausgabe
    - konkatenation
    - operatoren
  en:
    - output
    - concatenation
    - operators
hints:
  de:
    - Das Pluszeichen verbindet Text und Zahlen von links nach rechts zu einem einzigen Text.
    - Sobald links von einem `+` bereits Text steht, wird rechts nur noch angehängt statt gerechnet.
    - Setzen Sie die Rechnung `aepfel + birnen` in Klammern, damit zuerst gerechnet und erst danach angehängt wird.
  en:
    - The plus sign joins text and numbers from left to right into a single piece of text.
    - Once there's already text to the left of a `+`, anything to the right just gets appended instead of computed.
    - Put the calculation `apples + pears` in parentheses so it is computed first and only then appended.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected:
      de: |
        4 Äpfel und 3 Birnen sind 7 Früchte.
      en: |
        4 apples and 3 pears are 7 fruits.
---

<!-- de -->
Legen Sie zwei Variablen `int aepfel = 4;` und `int birnen = 3;` an. Geben Sie mit **einem einzigen** `println`-Aufruf den folgenden Satz aus – die Gesamtzahl der Früchte soll dabei aus den Variablen **berechnet** werden, nicht fest im Text stehen:

```
4 Äpfel und 3 Birnen sind 7 Früchte.
```

Achten Sie auf Klammern: Ohne sie würde statt `7` etwas anderes erscheinen, weil Java den Ausdruck von links nach rechts liest und ein `+` neben Text nur noch aneinanderklebt statt zu rechnen.

<!-- en -->
Create two variables `int apples = 4;` and `int pears = 3;`. Using a **single** `println` call, print the following sentence — the total number of fruits must be **computed** from the variables, not hard-coded in the text:

```
4 apples and 3 pears are 7 fruits.
```

Watch out for parentheses: without them, something other than `7` would appear, because Java reads the expression from left to right and a `+` next to text just glues things together instead of computing.

<!-- all -->

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
