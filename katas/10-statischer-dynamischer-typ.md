---
id: 11
category: 10-vererbung
title: Statischer und dynamischer Typ
type: choice
difficulty: medium
tags:
  - vererbung
  - statischer-typ
  - dynamischer-typ
  - dynamische-bindung
hints:
  - "Der statische Typ steht in der Deklaration der Variablen. Der dynamische Typ ist die Klasse des Objekts, das `new` angelegt hat."
  - "Ob ein Aufruf übersetzt, prüft der Übersetzer am statischen Typ. Welche Methode läuft, hängt vom dynamischen Typ ab."
multiple: true
shuffle: true
options:
  - text: "Der statische Typ von `item` ist `LibraryItem`."
    correct: true
  - text: "Der dynamische Typ von `item` ist `Magazine`."
    correct: true
  - text: "`item.describe()` liefert `Heft: c't Nr. 14`."
    correct: true
  - text: "`item.getIssue()` übersetzt nicht, weil `LibraryItem` keine Methode `getIssue()` hat."
    correct: true
  - text: "`item.describe()` liefert `c't (Z 20)`, weil die Variable den Typ `LibraryItem` hat."
    correct: false
  - text: "Die Zuweisung an `item` macht aus dem `Magazine`-Objekt ein `LibraryItem`-Objekt."
    correct: false
---

Jede Variable hat einen **statischen Typ**. Das ist der Typ in ihrer Deklaration. Das Objekt, auf das die Variable verweist, hat einen **dynamischen Typ**. Das ist die Klasse des Objekts zur Laufzeit.

Die beiden Typen haben verschiedene Aufgaben:

- Ob ein Aufruf übersetzt, prüft der Übersetzer am statischen Typ. Er lässt nur Methoden zu, die dieser Typ kennt.
- Welche überschriebene Methode läuft, entscheidet zur Laufzeit der dynamische Typ, also die Klasse des Bezugsobjekts.

`Magazine` erbt von `LibraryItem`, hat die Methode `getIssue()` und überschreibt `describe()`:

```java
public class Magazine extends LibraryItem {
    private final int issue;
    // … Konstruktor wie bisher

    public int getIssue() {
        return issue;
    }

    @Override
    public String describe() {
        return "Heft: " + getTitle() + " Nr. " + issue;
    }
}
```

In `main` steht:

```java
LibraryItem item = new Magazine("c't", "Z 20", 14);
```

Welche Aussagen sind **richtig**?
