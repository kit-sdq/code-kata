---
id: 13
category: 10-vererbung
title: LibraryItem als abstrakte Klasse
type: code
difficulty: medium
tags:
  - vererbung
  - abstrakte-klasse
  - override
hints:
  - "Der Übersetzer meldet für `Magazine` und `Newspaper`: `is not abstract and does not override abstract method describe() in LibraryItem`. Jede der beiden Klassen braucht also ein eigenes `describe()`."
  - "Schreiben Sie die Methoden wie in `Book`, mit `@Override` und `public String describe()`."
  - "`Magazine` liefert `\"Heft: \" + getTitle() + \" Nr. \" + issue`, `Newspaper` liefert `\"Zeitung: \" + getTitle() + \" vom \" + date`."
mainClass: Main
allowedImports:
  - java.util.*
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      Buch: Faust von Goethe
      Heft: c't Nr. 14
      Zeitung: Stadtanzeiger vom 25.11.2026
---

Ein Objekt nur der Klasse `LibraryItem` braucht die Bibliothek nicht. Jedes Medium ist ein Buch, ein Heft oder eine Zeitung. Deshalb wird `LibraryItem` eine **abstrakte Klasse**:

```java
public abstract class LibraryItem {
    // … Attribute, Konstruktor, getTitle() wie bisher
    public abstract String describe();
}
```

Für eine abstrakte Klasse gelten diese Regeln:

- Mit `new` kann man kein Objekt einer abstrakten Klasse anlegen. `new LibraryItem("Faust", "L 100")` meldet der Übersetzer als Fehler: `LibraryItem is abstract; cannot be instantiated`.
- Eine abstrakte Klasse kann Attribute, Konstruktoren und fertige Methoden haben. Die Unterklassen rufen ihren Konstruktor mit `super(…)` auf.
- Eine abstrakte Methode hat keinen Rumpf. Jede nicht abstrakte Unterklasse muss sie überschreiben.

**Aufgabe:** Nach der Änderung übersetzt das Programm unten nicht mehr. `Book` hat schon ein eigenes `describe()`. Ergänzen Sie `describe()` in `Magazine` und `Newspaper`, sodass das Programm diese drei Zeilen ausgibt:

```text
Buch: Faust von Goethe
Heft: c't Nr. 14
Zeitung: Stadtanzeiger vom 25.11.2026
```

**Hinweis zu `@Override`:** Die Prüfung dieser Aufgabe vergleicht nur die Ausgabe Ihres Programms. Ob über einer Methode `@Override` steht, kann sie nicht sehen. Java verlangt die Annotation auch nicht. Ohne `@Override` übersetzt und läuft das Programm genauso. In diesem Kurs schreiben Sie aber über jede überschreibende Methode `@Override`, damit der Übersetzer einen Tippfehler im Methodennamen meldet. Prüfen Sie deshalb selbst, ob über jedem `describe()` in Ihrer Lösung `@Override` steht.

Hier stehen alle Klassen in einer Datei. Deshalb fehlt vor den Klassen außer `Main` das Wort `public`.

```java template
import java.util.ArrayList;
import java.util.List;

abstract class LibraryItem {
    private final String title;
    private final String signature;

    public LibraryItem(String title, String signature) {
        this.title = title;
        this.signature = signature;
    }

    public String getTitle() {
        return title;
    }

    public abstract String describe();
}

class Book extends LibraryItem {
    private final String author;

    public Book(String title, String signature, String author) {
        super(title, signature);
        this.author = author;
    }

    @Override
    public String describe() {
        return "Buch: " + getTitle() + " von " + author;
    }
}

class Magazine extends LibraryItem {
    private final int issue;

    public Magazine(String title, String signature, int issue) {
        super(title, signature);
        this.issue = issue;
    }

    // BEGIN EDIT
    // TODO: describe() überschreiben
    // END EDIT
}

class Newspaper extends LibraryItem {
    private final String date;

    public Newspaper(String title, String signature, String date) {
        super(title, signature);
        this.date = date;
    }

    // BEGIN EDIT
    // TODO: describe() überschreiben
    // END EDIT
}

public class Main {
    public static void main(String[] args) {
        List<LibraryItem> items = new ArrayList<>();
        items.add(new Book("Faust", "L 100", "Goethe"));
        items.add(new Magazine("c't", "Z 20", 14));
        items.add(new Newspaper("Stadtanzeiger", "Z 31", "25.11.2026"));
        for (LibraryItem item : items) {
            System.out.println(item.describe());
        }
    }
}
```
