---
id: 3
category: 10-vererbung
title: Konstruktor ohne super(…)
type: choice
difficulty: easy
tags:
  - vererbung
  - super
  - konstruktor
hints:
  - "Steht im Konstruktor weder `super(…)` noch `this(…)`, ergänzt Java als erste Anweisung `super()` ohne Argumente."
  - "Schauen Sie nach, welche Konstruktoren `LibraryItem` hat. Gibt es einen ohne Parameter?"
multiple: false
shuffle: true
options:
  - text: "Der Konstruktor übersetzt nicht. Java ergänzt `super()` ohne Argumente, und `LibraryItem` hat keinen Konstruktor ohne Parameter."
    correct: true
  - text: "Der Konstruktor übersetzt. Titel und Signatur bleiben `null`."
    correct: false
  - text: "Der Konstruktor übersetzt. Java gibt `title` und `signature` von selbst an den Konstruktor von `LibraryItem` weiter."
    correct: false
  - text: "Der Konstruktor übersetzt nicht, weil `Book` die Attribute `title` und `signature` selbst deklarieren muss."
    correct: false
---

Konstruktoren werden nicht geerbt. Der Konstruktor einer Unterklasse ruft deshalb mit `super(…)` zuerst den Konstruktor der Oberklasse auf. `super(…)` muss die erste Anweisung im Konstruktor sein. Steht weder `super(…)` noch `this(…)` da, ergänzt Java den Aufruf `super()` ohne Argumente.

`LibraryItem` hat genau einen Konstruktor:

```java
public LibraryItem(String title, String signature) {
    this.title = title;
    this.signature = signature;
}
```

In `Book` fehlt der Aufruf von `super(…)`:

```java
public class Book extends LibraryItem {
    private final String author;

    public Book(String title, String signature, String author) {
        this.author = author;
    }
}
```

Was passiert, wenn Sie diesen Code übersetzen?
