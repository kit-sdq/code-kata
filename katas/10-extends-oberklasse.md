---
id: 1
category: 10-vererbung
title: Oberklasse und Unterklasse erkennen
type: choice
difficulty: easy
tags:
  - vererbung
  - extends
  - oberklasse
hints:
  - "Die Klasse vor `extends` ist die neue Klasse. Die Klasse hinter `extends` ist die Klasse, von der sie erbt."
  - "Die Klasse, von der geerbt wird, heißt Oberklasse."
multiple: false
shuffle: true
options:
  - text: "`LibraryItem` ist die Oberklasse, `Book` ist die Unterklasse."
    correct: true
  - text: "`Book` ist die Oberklasse, `LibraryItem` ist die Unterklasse."
    correct: false
  - text: "Beide Klassen sind Oberklassen."
    correct: false
---

Eine Bibliothek hat Bücher und Zeitschriften. Beide haben einen Titel und eine Signatur. Diese gemeinsamen Teile stehen einmal in der Klasse `LibraryItem`. Die Klasse `Book` erweitert `LibraryItem` mit `extends`:

```java
public class Book extends LibraryItem {
    // …
}
```

Die Klasse hinter `extends` heißt **Oberklasse**. Die Klasse mit `extends` im Kopf heißt **Unterklasse**.

Welche Klasse ist hier die Oberklasse und welche die Unterklasse?
