---
id: 10
category: 10-vererbung
title: Newspaper ohne eigenes describe()
type: text
difficulty: easy
tags:
  - vererbung
  - methodensuche
  - dynamische-bindung
hints:
  - "Die Suche nach `describe()` beginnt in `Newspaper`. Wenn sie dort nichts findet, geht sie eine Ebene nach oben."
  - "In `LibraryItem` liefert `describe()` den Titel und dahinter die Signatur in Klammern."
answers:
  - "Stadtanzeiger (Z 31)"
  - "\"Stadtanzeiger (Z 31)\""
  - "„Stadtanzeiger (Z 31)“"
match:
  mode: normalized
---

Bei einem Aufruf wie `item.describe()` sucht Java die Methode zuerst in der Klasse des Bezugsobjekts. Findet Java sie dort nicht, geht die Suche zur Oberklasse und von dort weiter nach oben, bis sie die Methode findet.

`Newspaper` erbt von `LibraryItem`. Die Klasse hat kein eigenes `describe()`:

```java
public class LibraryItem {
    // … title, signature, Konstruktor und getTitle() wie bisher

    public String describe() {
        return title + " (" + signature + ")";
    }
}

public class Newspaper extends LibraryItem {
    private final String date;

    public Newspaper(String title, String signature, String date) {
        super(title, signature);
        this.date = date;
    }
    // kein eigenes describe()
}
```

In `main` steht:

```java
LibraryItem item = new Newspaper("Stadtanzeiger", "Z 31", "25.11.2026");
System.out.println(item.describe());
```

Was gibt das Programm aus? Geben Sie die Ausgabezeile genau an.
