---
id: 4
category: 10-vererbung
title: Private Attribute der Oberklasse
type: choice
difficulty: easy
tags:
  - vererbung
  - private
  - getter
hints:
  - "Ein `private`-Attribut darf nur im Code der Klasse benutzt werden, in der es deklariert ist. Das gilt auch für Unterklassen."
  - "`LibraryItem` bietet für den Titel die Methode `getTitle()` an. Diese Methode ist `public` und wird geerbt."
multiple: true
shuffle: true
options:
  - text: "Die Methode übersetzt nicht. Der Übersetzer meldet `title has private access in LibraryItem`."
    correct: true
  - text: "Mit `return getTitle() + \" von \" + author;` übersetzt die Methode."
    correct: true
  - text: "Ein `Book`-Objekt enthält das Attribut `title`, auch wenn `Book` es nicht mit Namen ansprechen darf."
    correct: true
  - text: "Die Methode übersetzt, weil `Book` das Attribut `title` von `LibraryItem` erbt."
    correct: false
  - text: "Mit `return super.title + \" von \" + author;` übersetzt die Methode."
    correct: false
---

Ein `Book`-Objekt enthält alle Attribute von `LibraryItem`, also auch `title` und `signature`. Diese Attribute sind in `LibraryItem` aber `private` deklariert. Auf ein `private`-Attribut darf nur der Code der Klasse `LibraryItem` selbst mit seinem Namen zugreifen. `Book` kommt an den Titel nur über eine Methode von `LibraryItem`, hier `getTitle()`.

```java
public class LibraryItem {
    private final String title;
    private final String signature;
    // … Konstruktor wie bisher

    public String getTitle() {
        return title;
    }
}

public class Book extends LibraryItem {
    private final String author;
    // … Konstruktor wie bisher

    public String getLabel() {
        return title + " von " + author;
    }
}
```

Welche Aussagen über die Methode `getLabel()` in `Book` sind **richtig**?
