---
id: 4
category: 10-vererbung
title: Ist ein Book ein LibraryItem?
type: choice
difficulty: easy
tags:
  - vererbung
  - substitutionsprinzip
  - liste
hints:
  - "Jedes `Book` ist ein `LibraryItem`. Ein `Book` darf deshalb überall stehen, wo ein `LibraryItem` verlangt ist."
  - "Die Gegenrichtung gilt nicht von selbst. Ein `LibraryItem` ist nicht unbedingt ein `Book`."
multiple: true
shuffle: true
options:
  - text: "`LibraryItem item = new Book(\"Faust\", \"L 100\", \"Goethe\");`"
    correct: true
  - text: "`items.add(new Book(\"Faust\", \"L 100\", \"Goethe\"));`"
    correct: true
  - text: "`items.add(new Magazine(\"c't\", \"Z 20\", 14));`"
    correct: true
  - text: "`Book book = new LibraryItem(\"Faust\", \"L 100\");`"
    correct: false
---

`Book` erbt von `LibraryItem`. Jedes `Book` ist damit auch ein `LibraryItem`. Ein `Book` darf deshalb überall stehen, wo ein `LibraryItem` verlangt ist. Dasselbe gilt für `Magazine`. So passen Bücher und Zeitschriften in dieselbe Liste.

In `main` steht:

```java
List<LibraryItem> items = new ArrayList<>();
```

Welche Zeilen übersetzen? Wählen Sie alle aus, die übersetzen.
