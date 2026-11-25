---
id: 8
category: 10-vererbung
title: describe() in Book überschreiben
type: code
difficulty: easy
tags:
  - vererbung
  - ueberschreiben
  - override
hints:
  - "Die Methode in `Book` muss denselben Namen und dieselben Parameter haben wie in `LibraryItem`: `public String describe()`."
  - "Schreiben Sie `@Override` direkt über die Methode. Dann prüft der Übersetzer, dass `LibraryItem` eine Methode `describe()` hat."
  - "Auf `title` darf `Book` nicht mit Namen zugreifen. Rufen Sie `getTitle()` auf: `return \"Buch: \" + getTitle() + \" von \" + author;`"
mainClass: Main
allowedImports: []
timeoutMs: 5000
requireOverride: true
checks:
  - type: stdout
    expected: |
      Buch: Faust von Goethe
---

Eine Methode der Unterklasse mit gleichem Namen und gleichen Parametern **überschreibt** die Methode der Oberklasse. Wird die Methode an einem `Book`-Objekt aufgerufen, läuft dann die Methode aus `Book`. Mit `@Override` über der Methode prüft der Übersetzer, dass eine Oberklasse die Methode wirklich hat.

`LibraryItem` beschreibt ein Medium mit Titel und Signatur, zum Beispiel „Faust (L 100)“. Ein Buch soll sich mit seinem Autor beschreiben.

**Aufgabe:** Überschreiben Sie in `Book` die Methode `describe()` mit `@Override`. Für `new Book("Faust", "L 100", "Goethe")` soll sie `Buch: Faust von Goethe` liefern.

**Hinweis zu `@Override`:** Java selbst verlangt `@Override` nicht. Ohne die Annotation übersetzt und läuft das Programm genauso. In diesem Kurs bekommt aber jede überschreibende Methode `@Override`, damit der Übersetzer einen Tippfehler im Methodennamen meldet. Diese Aufgabe prüft das. Fehlt `@Override` über einer überschreibenden Methode, meldet die Prüfung einen Übersetzungsfehler.

Hier stehen alle Klassen in einer Datei. Deshalb fehlt vor `class LibraryItem` und `class Book` das Wort `public`.

```java template
class LibraryItem {
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

class Book extends LibraryItem {
    private final String author;

    public Book(String title, String signature, String author) {
        super(title, signature);
        this.author = author;
    }

    // BEGIN EDIT
    // TODO: describe() mit @Override überschreiben
    // END EDIT
}

public class Main {
    public static void main(String[] args) {
        LibraryItem item = new Book("Faust", "L 100", "Goethe");
        System.out.println(item.describe());
    }
}
```
