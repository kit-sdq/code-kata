---
id: 2.3
category: 06-funktionen-rekursion
title: "Call-by-Value bei primitiven Parametern"
type: text
difficulty: medium
tags: [funktionen, parameter, call-by-value]
answers: ["10"]
match:
  mode: normalized
hints:
  - "Bei einfachen Typen wie `int` bekommt die Methode nur eine Kopie des Wertes von `zahl`."
  - "Was innerhalb von `addiereFuenf` mit dem Parameter `x` passiert, wirkt sich nicht auf die Variable `zahl` in `main` aus."
---

Betrachten Sie folgenden Code:

```java
public class Beispiel {

    public static void addiereFuenf(int x) {
        x = x + 5;
    }

    public static void main(String[] args) {
        int zahl = 10;
        addiereFuenf(zahl);
        System.out.println(zahl);
    }
}
```

Welchen Wert gibt `System.out.println(zahl);` am Ende von `main` aus?
