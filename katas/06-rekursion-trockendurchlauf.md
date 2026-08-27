---
id: 3.5
category: 06-funktionen-rekursion
title: "Trockendurchlauf einer rekursiven Methode"
type: text
difficulty: medium
tags: [rekursion, trockendurchlauf]
answers: ["15"]
match:
  mode: normalized
hints:
  - "Gehen Sie die Aufrufe Schicht für Schicht durch: `mysteriumF(5)` ruft `mysteriumF(3)` auf, dieser ruft `mysteriumF(1)` auf, und so weiter."
  - "Der Basisfall `n <= 0` liefert `1`. Beachten Sie, dass `n` dabei auch negativ werden kann."
---

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
