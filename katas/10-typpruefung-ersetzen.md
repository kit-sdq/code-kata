---
id: 14
category: 10-vererbung
title: Eine instanceof-Kette durch Überschreiben ersetzen
type: code
difficulty: medium
tags:
  - vererbung
  - dynamische-bindung
  - instanceof
  - override
hints:
  - "Die Schleife in `main` ruft `item.describe()` auf. Damit für jedes Medium die passende Beschreibung kommt, muss jede Unterklasse `describe()` überschreiben."
  - "Benennen Sie `describeBook()`, `describeMagazine()` und `describeNewspaper()` in `describe()` um und schreiben Sie `@Override` darüber."
  - "Ohne Überschreiben findet die Methodensuche `describe()` erst in `LibraryItem`. Dann erscheinen Titel und Signatur in Klammern, zum Beispiel `Faust (L 100)`."
mainClass: Main
allowedImports:
  - java.util.*
timeoutMs: 5000
requireOverride: true
checks:
  - type: stdout
    expected: |
      Buch: Faust von Goethe
      Heft: c't Nr. 14
      Zeitung: Stadtanzeiger vom 25.11.2026
---

Ohne dynamische Bindung müsste die Schleife bei jedem Medium prüfen, zu welcher Klasse es gehört:

```java
for (LibraryItem item : items) {
    if (item instanceof Book book) {
        System.out.println(book.describeBook());
    } else if (item instanceof Magazine magazine) {
        System.out.println(magazine.describeMagazine());
    } else if (item instanceof Newspaper newspaper) {
        System.out.println(newspaper.describeNewspaper());
    }
}
```

Mit jeder neuen Unterklasse müsste diese Kette um eine Prüfung länger werden, und zwar an jeder Stelle, an der sie vorkommt. Mit dynamischer Bindung reicht ein Aufruf:

```java
for (LibraryItem item : items) {
    System.out.println(item.describe());
}
```

Welche Methode `describe()` läuft, entscheidet dann die Klasse des Bezugsobjekts. Eine neue Unterklasse bringt ihr eigenes `describe()` mit, und die Schleife bleibt, wie sie ist. Auf den Übungsblättern muss Verhalten, das je nach Klasse verschieden ist, deshalb als überschriebene Methode in der Klasse stehen.

**Aufgabe:** Die Schleife in `main` ist schon umgestellt. Die Unterklassen haben aber noch die alten Methoden `describeBook()`, `describeMagazine()` und `describeNewspaper()`. Ändern Sie die Unterklassen so, dass jede `describe()` aus `LibraryItem` überschreibt. Das Programm soll dann diese drei Zeilen ausgeben:

```text
Buch: Faust von Goethe
Heft: c't Nr. 14
Zeitung: Stadtanzeiger vom 25.11.2026
```

**Hinweis zu `@Override`:** Java selbst verlangt `@Override` nicht. Ohne die Annotation übersetzt und läuft das Programm genauso. In diesem Kurs bekommt aber jede überschreibende Methode `@Override`, damit der Übersetzer einen Tippfehler im Methodennamen meldet. Diese Aufgabe prüft das. Fehlt `@Override` über einer überschreibenden Methode, meldet die Prüfung einen Übersetzungsfehler.

Hier stehen alle Klassen in einer Datei. Deshalb fehlt vor den Klassen außer `Main` das Wort `public`.

```java template
import java.util.ArrayList;
import java.util.List;

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
    public String describeBook() {
        return "Buch: " + getTitle() + " von " + author;
    }
    // END EDIT
}

class Magazine extends LibraryItem {
    private final int issue;

    public Magazine(String title, String signature, int issue) {
        super(title, signature);
        this.issue = issue;
    }

    // BEGIN EDIT
    public String describeMagazine() {
        return "Heft: " + getTitle() + " Nr. " + issue;
    }
    // END EDIT
}

class Newspaper extends LibraryItem {
    private final String date;

    public Newspaper(String title, String signature, String date) {
        super(title, signature);
        this.date = date;
    }

    // BEGIN EDIT
    public String describeNewspaper() {
        return "Zeitung: " + getTitle() + " vom " + date;
    }
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
