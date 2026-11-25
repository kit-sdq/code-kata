---
id: 6
category: 10-vererbung
title: Dynamische Bindung in einer Schleife
type: choice
difficulty: easy
tags:
  - vererbung
  - dynamische-bindung
  - polymorphie
hints:
  - "Die Variable `item` hat in jedem Durchlauf den Typ `LibraryItem`. Entscheidend ist, auf welches Objekt sie gerade verweist."
  - "Im ersten Durchlauf verweist `item` auf das `Magazine`. Die Suche nach `describe()` beginnt deshalb in `Magazine`."
multiple: false
shuffle: true
options:
  - text: "Zuerst `Heft: c't Nr. 14`, dann `Buch: Faust von Goethe`"
    correct: true
  - text: "Zuerst `c't (Z 20)`, dann `Faust (L 100)`"
    correct: false
  - text: "Zuerst `Buch: Faust von Goethe`, dann `Heft: c't Nr. 14`"
    correct: false
  - text: "Ein Übersetzungsfehler, weil `LibraryItem` nicht weiß, dass es `Book` und `Magazine` gibt"
    correct: false
---

Eine Variable vom Typ `LibraryItem` kann auf ein `Book` oder ein `Magazine` verweisen, weil jedes `Book` und jedes `Magazine` ein `LibraryItem` ist. Deshalb passen beide in eine `List<LibraryItem>`.

Welche Methode bei einem Aufruf läuft, entscheidet die Klasse des **Bezugsobjekts**, also des Objekts, an dem die Methode aufgerufen wird. Java wählt die Methode erst zur Laufzeit. Das heißt **dynamische Bindung**.

`describe()` steht in allen drei Klassen:

```java
// in LibraryItem:
public String describe() {
    return title + " (" + signature + ")";
}

// in Book, überschreibt describe():
@Override
public String describe() {
    return "Buch: " + getTitle() + " von " + author;
}

// in Magazine, überschreibt describe():
@Override
public String describe() {
    return "Heft: " + getTitle() + " Nr. " + issue;
}
```

In `main` steht:

```java
List<LibraryItem> items = new ArrayList<>();
items.add(new Magazine("c't", "Z 20", 14));
items.add(new Book("Faust", "L 100", "Goethe"));
for (LibraryItem item : items) {
    System.out.println(item.describe());
}
```

Was gibt die Schleife aus?
