---
id: 3
category: 10-vererbung
title: Welche Methoden hat ein Book?
type: choice
difficulty: easy
tags:
  - vererbung
  - methoden
hints:
  - "`Book` erbt die Methoden `getTitle()` und `describe()` von `LibraryItem` und hat zusätzlich `getAuthor()`."
  - "`getIssue()` steht nur in `Magazine`. Ein `Book` ist kein `Magazine`."
multiple: true
shuffle: true
options:
  - text: "`faust.getTitle()`"
    correct: true
  - text: "`faust.describe()`"
    correct: true
  - text: "`faust.getAuthor()`"
    correct: true
  - text: "`faust.getIssue()`"
    correct: false
---

Eine Unterklasse erbt die öffentlichen Methoden ihrer Oberklasse. An einem `Book`-Objekt können Sie deshalb die öffentlichen Methoden von `LibraryItem` aufrufen und dazu die Methoden, die `Book` selbst hat.

- `LibraryItem` hat die Methoden `getTitle()` und `describe()`.
- `Book extends LibraryItem` hat zusätzlich die Methode `getAuthor()`.
- `Magazine extends LibraryItem` hat zusätzlich die Methode `getIssue()`.

In `main` steht:

```java
Book faust = new Book("Faust", "L 100", "Goethe");
```

Welche Aufrufe übersetzen? Wählen Sie alle aus, die übersetzen.
