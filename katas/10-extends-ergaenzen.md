---
id: 2
category: 10-vererbung
title: extends ergänzen
type: text
difficulty: easy
tags:
  - vererbung
  - extends
hints:
  - "Das Schlüsselwort steht im Klassenkopf zwischen dem Namen der Unterklasse und dem Namen der Oberklasse."
  - "Es ist dasselbe Schlüsselwort wie in `class Book … LibraryItem`."
answers:
  - "extends"
  - "extends LibraryItem"
  - "class Magazine extends LibraryItem"
  - "class Magazine extends LibraryItem {"
match:
  mode: normalized
---

Mit `extends` im Klassenkopf legen Sie fest, von welcher Oberklasse eine Klasse erbt. So steht es bei `Book`:

```java
class Book extends LibraryItem {
    // …
}
```

Auch `Magazine` soll von `LibraryItem` erben. Im Klassenkopf fehlt ein Wort:

```java
class Magazine ______ LibraryItem {
    // …
}
```

Welches Wort gehört an die Stelle von `______`?
