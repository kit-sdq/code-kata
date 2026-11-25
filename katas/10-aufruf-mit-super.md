---
id: 15
category: 10-vererbung
title: Aufruf mit super
type: text
difficulty: medium
tags:
  - vererbung
  - super
  - ueberschreiben
hints:
  - "`item` verweist auf ein `Newspaper`. Die Suche nach `shelfLabel()` beginnt deshalb in `Newspaper`."
  - "`super.shelfLabel()` ruft die Methode aus `LibraryItem` am selben Bezugsobjekt auf. Sie liefert `Regal Z 31`."
answers:
  - "Regal Z 31, Ausgabe vom 25.11.2026"
  - "\"Regal Z 31, Ausgabe vom 25.11.2026\""
  - "„Regal Z 31, Ausgabe vom 25.11.2026“"
match:
  mode: normalized
---

Eine überschreibende Methode kann mit `super.methodenName()` die Methode der Oberklasse aufrufen. Der Aufruf geht an dasselbe Bezugsobjekt. Die Suche nach der Methode beginnt in der Oberklasse der Klasse, in der der Aufruf steht. So kann die Unterklasse das Ergebnis der Oberklasse benutzen und etwas anhängen.

```java
public class LibraryItem {
    // … title, signature, Konstruktor und getTitle() wie bisher

    public String shelfLabel() {
        return "Regal " + signature;
    }
}

public class Newspaper extends LibraryItem {
    private final String date;
    // … Konstruktor wie bisher

    @Override
    public String shelfLabel() {
        return super.shelfLabel() + ", Ausgabe vom " + date;
    }
}
```

In `main` steht:

```java
LibraryItem item = new Newspaper("Stadtanzeiger", "Z 31", "25.11.2026");
System.out.println(item.shelfLabel());
```

Was gibt das Programm aus? Geben Sie die Ausgabezeile genau an.
