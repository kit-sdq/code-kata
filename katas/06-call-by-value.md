---
id: 2.3
category: 06-methoden
title:
  de: Call-by-Value bei primitiven Parametern
  en: Call-by-Value for Primitive Parameters
type: text
difficulty: medium
tags:
  de:
    - funktionen
    - parameter
    - call-by-value
  en:
    - functions
    - parameters
    - call-by-value
hints:
  de:
    - Bei einfachen Typen wie `int` bekommt die Methode nur eine Kopie des Wertes von `zahl`.
    - Was innerhalb von `addiereFuenf` mit dem Parameter `x` passiert, wirkt sich nicht auf die Variable `zahl` in `main` aus.
  en:
    - For simple types like `int`, the method only receives a copy of the value of `zahl`.
    - Whatever happens to the parameter `x` inside `addFive` has no effect on the variable `zahl` in `main`.
answers:
  - "10"
match:
  mode: normalized
---

<!-- de -->
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

<!-- en -->
Consider the following code:

```java
public class Beispiel {

    public static void addFive(int x) {
        x = x + 5;
    }

    public static void main(String[] args) {
        int zahl = 10;
        addFive(zahl);
        System.out.println(zahl);
    }
}
```

What value does `System.out.println(zahl);` print at the end of `main`?
