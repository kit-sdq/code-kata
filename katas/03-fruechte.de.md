---
id: "1.4"
category: 03-ein-ausgabe
title: Text und Werte kombinieren
type: code
difficulty: medium
tags: [ausgabe, konkatenation, operatoren]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      4 Äpfel und 3 Birnen sind 7 Früchte.
hints:
  - "Das Pluszeichen verbindet Text und Zahlen von links nach rechts zu einem einzigen Text."
  - "Sobald links von einem `+` bereits Text steht, wird rechts nur noch angehängt statt gerechnet."
  - "Setzen Sie die Rechnung `aepfel + birnen` in Klammern, damit zuerst gerechnet und erst danach angehängt wird."
---

Legen Sie zwei Variablen `int aepfel = 4;` und `int birnen = 3;` an. Geben Sie mit **einem einzigen** `println`-Aufruf den folgenden Satz aus – die Gesamtzahl der Früchte soll dabei aus den Variablen **berechnet** werden, nicht fest im Text stehen:

```
4 Äpfel und 3 Birnen sind 7 Früchte.
```

Achten Sie auf Klammern: Ohne sie würde statt `7` etwas anderes erscheinen, weil Java den Ausdruck von links nach rechts liest und ein `+` neben Text nur noch aneinanderklebt statt zu rechnen.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
