---
id: 2.2
category: 05-kontrollfluss-schleifen
title:
  de: "Switch ohne break: was passiert?"
  en: "Switch without break: what happens?"
type: choice
difficulty: medium
tags:
  de:
    - switch
    - kontrollfluss
    - fallthrough
  en:
    - switch
    - control-flow
    - fallthrough
hints:
  de:
    - Java springt bei `switch (x)` direkt zum passenden `case`, nicht zum Anfang.
    - Ohne `break` läuft die Ausführung in den nächsten `case`-Block hinein, egal ob dessen Bedingung passt.
    - Erst das `break` in `case 3` stoppt die Ausführung – vor `default` wird also nicht mehr gesprungen.
  en:
    - Java jumps straight to the matching `case` in `switch (x)`, not to the beginning.
    - Without `break`, execution falls through into the next `case` block, regardless of whether its condition matches.
    - Only the `break` in `case 3` stops execution — so it never jumps to `default`.
multiple: false
shuffle: true
options:
  - text:
      de: |
        ```
        zwei
        drei
        ```
      en: |
        ```
        two
        three
        ```
    correct: true
  - text:
      de: |
        ```
        zwei
        ```
      en: |
        ```
        two
        ```
    correct: false
  - text:
      de: |
        ```
        eins
        zwei
        drei
        ```
      en: |
        ```
        one
        two
        three
        ```
    correct: false
  - text: |
      ```
      default
      ```
    correct: false
---

<!-- de -->
Was gibt das folgende Programm aus?

```java
int x = 2;
switch (x) {
    case 1:
        System.out.println("eins");
    case 2:
        System.out.println("zwei");
    case 3:
        System.out.println("drei");
        break;
    default:
        System.out.println("default");
}
```

<!-- en -->
What does the following program print?

```java
int x = 2;
switch (x) {
    case 1:
        System.out.println("one");
    case 2:
        System.out.println("two");
    case 3:
        System.out.println("three");
        break;
    default:
        System.out.println("default");
}
```
