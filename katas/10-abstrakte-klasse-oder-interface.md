---
id: 13
category: 10-vererbung
title: Abstrakte Klasse oder Interface
type: choice
difficulty: medium
tags:
  - vererbung
  - abstrakte-klasse
  - interface
hints:
  - "Gemeinsamer Zustand, also gemeinsame Attribute, gehört in eine Klasse. Ein Interface kann keine Attribute eines Objekts halten."
  - "Was nur manche Medien können, gehört in ein Interface, das nur diese Klassen implementieren. Eine Unterklasse muss jede geerbte Methode sinnvoll erfüllen."
multiple: true
shuffle: true
options:
  - text: "Titel und Signatur haben alle Medien. Diese Attribute gehören in die abstrakte Klasse `LibraryItem`."
    correct: true
  - text: "Ausleihen können nur Bücher. Deshalb soll `Book` das Interface `Loanable` implementieren, und `LibraryItem` bekommt keine Methode `lend(Member)`."
    correct: true
  - text: "`Book` kann von `LibraryItem` erben und zusätzlich `Loanable` und `Describable` implementieren."
    correct: true
  - text: "Wenn `item` den statischen Typ `LibraryItem` hat, übersetzt `item.lend(member)` auch dann nicht, wenn `item` auf ein `Book` verweist."
    correct: true
  - text: "`lend(Member)` soll in `LibraryItem` stehen. `Magazine` überschreibt die Methode dann so, dass sie nichts tut."
    correct: false
  - text: "Titel und Signatur sollen in das Interface `Loanable`, damit alle Medien sie haben."
    correct: false
---

Eine **abstrakte Klasse** kann Attribute, Konstruktoren und Methoden für alle ihre Unterklassen halten. Eine Klasse kann höchstens eine Oberklasse haben. Ein **Interface** legt eine Fähigkeit fest, also Methoden, die eine Klasse anbieten muss. Ein Interface kann keine Attribute eines Objekts halten. Eine Klasse kann mehrere Interfaces implementieren.

In der Bibliothek dürfen nur Bücher ausgeliehen werden. Für das Ausleihen gibt es das Interface `Loanable`. `Member` ist die Klasse für Mitglieder der Bibliothek.

```java
public interface Loanable {
    void lend(Member member);

    void returnItem();

    boolean isLent();
}

public class Book extends LibraryItem implements Loanable {
    // … author, Konstruktor und describe() wie bisher
    // … lend(Member), returnItem() und isLent() mit @Override
}
```

`LibraryItem` ist eine abstrakte Klasse mit den Attributen `title` und `signature` und der abstrakten Methode `describe()`.

Welche Aussagen sind **richtig**?
