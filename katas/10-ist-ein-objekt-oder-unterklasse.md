---
id: 1.5
category: 10-vererbung
title: Zwei Bedeutungen von „ist ein“
type: choice
difficulty: easy
tags:
  - vererbung
  - objekt
  - unterklasse
hints:
  - "Wenn vorne ein einzelnes Ding mit Namen steht, etwa „Faust“ oder „die c't Nr. 14“, geht es um ein Objekt. Das Objekt legt `new` an."
  - "Wenn vorne eine ganze Art steht, etwa „ein Buch“ oder „eine Zeitung“, geht es um eine Klasse. Dann beschreibt der Satz eine Unterklasse mit `extends`."
  - "„Faust“ ist ein einzelnes Buch. Dafür schreiben Sie `new Book(\"Faust\", \"L 100\", \"Goethe\")`. Eine Klasse `Faust` brauchen Sie dafür nicht."
multiple: true
shuffle: false
options:
  - text: "„Faust ist ein Buch.“ beschreibt ein Objekt der Klasse `Book`."
    correct: true
  - text: "„Ein Buch ist ein Medium.“ beschreibt die Unterklasse `Book` von `LibraryItem`."
    correct: true
  - text: "„Der Stadtanzeiger vom 25.11.2026 ist eine Zeitung.“ beschreibt eine Unterklasse von `Newspaper`."
    correct: false
  - text: "„Eine Zeitung ist ein Medium.“ beschreibt die Unterklasse `Newspaper` von `LibraryItem`."
    correct: true
  - text: "„Die c't Nr. 14 ist ein Heft.“ beschreibt ein Objekt der Klasse `Magazine`."
    correct: true
  - text: "`class Faust extends Book` ist ein guter Entwurf, weil Faust ein Buch ist."
    correct: false
---

Der Satz „A ist ein B“ kann in Java zwei verschiedene Dinge bedeuten.

- **Objekt einer Klasse:** „Faust ist ein Buch.“ Faust ist ein einzelnes Buch. In Java ist das ein Objekt der Klasse `Book`, angelegt mit `new Book("Faust", "L 100", "Goethe")`.
- **Unterklasse:** „Ein Buch ist ein Medium.“ Hier steht vorne eine ganze Art von Dingen. Jedes Buch ist ein Medium. In Java ist das die Unterklasse `class Book extends LibraryItem`.

```java
// Unterklasse: Jedes Buch ist ein Medium.
public class Book extends LibraryItem {
    // …
}

// Objekt: Faust ist ein Buch.
Book faust = new Book("Faust", "L 100", "Goethe");
```

Ordnen Sie jeden Satz zu. Welche Aussagen sind **richtig**?
