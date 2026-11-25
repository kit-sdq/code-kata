---
id: 2
category: 10-vererbung
title: Unterklasse Magazine schreiben
type: code
difficulty: easy
tags:
  - vererbung
  - extends
  - super
  - konstruktor
hints:
  - "Der Klassenkopf lautet `class Magazine extends LibraryItem`. Dazu kommt das Attribut `private final int issue;`."
  - "Der Konstruktor bekommt drei Parameter: `Magazine(String title, String signature, int issue)`."
  - "Die erste Anweisung im Konstruktor muss `super(title, signature);` sein. Danach setzen Sie `this.issue = issue;`."
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      c't Nr. 14
      c't (Z 20)
---

Eine Unterklasse schreiben Sie mit `extends`: `class Magazine extends LibraryItem`. Ein `Magazine`-Objekt enthält dann `title` und `signature` aus `LibraryItem` und dazu eigene Attribute.

Konstruktoren werden nicht geerbt. Jede Unterklasse braucht deshalb einen eigenen Konstruktor. Der Konstruktor von `Magazine` muss als **erste Anweisung** mit `super(title, signature)` den Konstruktor von `LibraryItem` aufrufen. So setzt `LibraryItem` seine eigenen Attribute selbst. Danach setzt `Magazine` sein Attribut `issue`.

**Aufgabe:** Schreiben Sie die Klasse `Magazine`. Ein Heft hat zusätzlich das Attribut `issue` (Heftnummer, `int`). Schreiben Sie den Konstruktor `Magazine(String title, String signature, int issue)` und die Methode `getIssue()`, die die Heftnummer liefert.

Hier stehen alle Klassen in einer Datei. Deshalb fehlt vor `class LibraryItem` und `class Magazine` das Wort `public`. Die Methode `describe()` schreiben Sie in dieser Aufgabe nicht selbst. `Magazine` erbt sie von `LibraryItem`.

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

// BEGIN EDIT
class Magazine extends LibraryItem {
    // TODO: Attribut issue, Konstruktor mit super(…) und getIssue()
}
// END EDIT

public class Main {
    public static void main(String[] args) {
        Magazine magazine = new Magazine("c't", "Z 20", 14);
        System.out.println(magazine.getTitle() + " Nr. " + magazine.getIssue());
        System.out.println(magazine.describe());
    }
}
```
