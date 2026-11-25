---
id: 1
category: 10-vererbung
title: Oberklasse und Unterklasse mit extends
type: choice
difficulty: easy
tags:
  - vererbung
  - extends
  - oberklasse
hints:
  - "Mit `extends` erbt `Book` alle Attribute und Methoden von `LibraryItem`. Ein `Book`-Objekt enthält also auch `title` und `signature`."
  - "Konstruktoren werden nicht geerbt. In Java kann eine Klasse höchstens eine Oberklasse haben."
multiple: true
shuffle: true
options:
  - text: "Ein `Book`-Objekt enthält die Attribute `title`, `signature` und `author`."
    correct: true
  - text: "`Book` kann die Methode `getTitle()` aufrufen, obwohl sie nur in `LibraryItem` steht."
    correct: true
  - text: "`LibraryItem` ist die Oberklasse, `Book` und `Magazine` sind Unterklassen."
    correct: true
  - text: "`Book` erbt den Konstruktor `LibraryItem(String title, String signature)` und braucht deshalb keinen eigenen."
    correct: false
  - text: "`Book` kann zusätzlich mit `extends` von einer zweiten Klasse erben, zum Beispiel `class Book extends LibraryItem, Member`."
    correct: false
---

Eine Bibliothek hat Bücher und Zeitschriften. Beide haben einen Titel und eine Signatur. Damit diese Attribute nur einmal im Code stehen, kommen sie in eine gemeinsame **Oberklasse** `LibraryItem`. Die **Unterklassen** `Book` und `Magazine` erben mit `extends` von `LibraryItem` und erweitern sie um das, was nur sie haben: `Book` um einen Autor, `Magazine` um eine Heftnummer.

```java
public class LibraryItem {
    private final String title;
    private final String signature;

    public LibraryItem(String title, String signature) {
        this.title = title;
        this.signature = signature;
    }

    public String getTitle() {
        return title;
    }

    public String describe() {
        return title + " (" + signature + ")";
    }
}

public class Book extends LibraryItem {
    private final String author;
    // … Konstruktor und getAuthor()
}
```

Welche der folgenden Aussagen sind **richtig**?
