---
id: 2.3
category: 06-funktionen-rekursion
title: "Call-by-Value for Primitive Parameters"
type: text
difficulty: medium
tags: [functions, parameters, call-by-value]
answers: ["10"]
match:
  mode: normalized
hints:
  - "For simple types like `int`, the method only receives a copy of the value of `zahl`."
  - "Whatever happens to the parameter `x` inside `addFive` has no effect on the variable `zahl` in `main`."
---

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
