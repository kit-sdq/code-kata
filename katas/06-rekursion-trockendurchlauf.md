---
id: 3.5
category: 06-funktionen-rekursion
title:
  de: Trockendurchlauf einer rekursiven Methode
  en: Dry-Running a Recursive Method
type: text
difficulty: medium
tags:
  de:
    - rekursion
    - trockendurchlauf
  en:
    - recursion
    - dry-run
hints:
  de:
    - "Gehen Sie die Aufrufe Schicht für Schicht durch: `mysteriumF(5)` ruft `mysteriumF(3)` auf, dieser ruft `mysteriumF(1)` auf, und so weiter."
    - Der Basisfall `n <= 0` liefert `1`. Beachten Sie, dass `n` dabei auch negativ werden kann.
  en:
    - "Go through the calls layer by layer: `mysteryF(5)` calls `mysteryF(3)`, which calls `mysteryF(1)`, and so on."
    - The base case `n <= 0` returns `1`. Note that `n` can also become negative.
answers:
  - "15"
match:
  mode: normalized
---

<!-- de -->
Gegeben ist die folgende Methode:

```java
public static int mysteriumF(int n) {
    if (n <= 0) {
        return 1;
    }
    return n * mysteriumF(n - 2);
}
```

Was liefert der Aufruf `mysteriumF(5)` zurück? Rechnen Sie den Aufruf **von Hand** durch, bevor Sie antworten.

<!-- en -->
Given the following method:

```java
public static int mysteryF(int n) {
    if (n <= 0) {
        return 1;
    }
    return n * mysteryF(n - 2);
}
```

What does the call `mysteryF(5)` return? Work through the call **by hand** before answering.
