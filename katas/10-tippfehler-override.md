---
id: 9
category: 10-vererbung
title: Tippfehler mit und ohne @Override
type: choice
difficulty: medium
tags:
  - vererbung
  - override
  - ueberschreiben
hints:
  - "Eine Methode überschreibt nur, wenn Name und Parameter genau gleich sind. `describ()` ist ein anderer Name als `describe()`."
  - "`@Override` sagt dem Übersetzer, dass hier eine Methode der Oberklasse überschrieben werden soll. Wenn es keine solche Methode gibt, meldet er einen Fehler."
multiple: true
shuffle: true
options:
  - text: "Ohne `@Override` übersetzt Fassung A, und das Programm gibt `Faust (L 100)` aus."
    correct: true
  - text: "Ohne `@Override` ist `describ()` eine neue, zusätzliche Methode von `Book`."
    correct: true
  - text: "Mit `@Override` übersetzt Fassung B nicht. Der Übersetzer meldet `method does not override or implement a method from a supertype`."
    correct: true
  - text: "Ohne `@Override` gibt das Programm `Buch: Faust von Goethe` aus, weil Java den Tippfehler von selbst korrigiert."
    correct: false
  - text: "Ohne `@Override` übersetzt Fassung A nicht, weil `Book` dann zwei Methoden hat, die etwas beschreiben."
    correct: false
---

Eine Methode überschreibt die Methode der Oberklasse nur, wenn Name und Parameter genau gleich sind. Steht `@Override` über der Methode, prüft der Übersetzer das für Sie.

In `Book` sollte `describe()` überschrieben werden. Beim Schreiben ist ein Tippfehler passiert. Die Methode heißt `describ()`.

Fassung A, ohne `@Override`:

```java
public class Book extends LibraryItem {
    // … author und Konstruktor wie bisher

    public String describ() {
        return "Buch: " + getTitle() + " von " + author;
    }
}
```

Fassung B, mit `@Override`:

```java
public class Book extends LibraryItem {
    // … author und Konstruktor wie bisher

    @Override
    public String describ() {
        return "Buch: " + getTitle() + " von " + author;
    }
}
```

`LibraryItem` hat wie bisher die Methode `describe()`, die `title + " (" + signature + ")"` liefert. In `main` steht:

```java
LibraryItem item = new Book("Faust", "L 100", "Goethe");
System.out.println(item.describe());
```

Welche Aussagen sind **richtig**?
