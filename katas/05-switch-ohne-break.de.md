---
id: 2.2
category: 05-kontrollfluss-schleifen
title: "Switch ohne break: was passiert?"
type: choice
difficulty: medium
tags: [switch, kontrollfluss, fallthrough]
multiple: false
shuffle: true
options:
  - text: |
      ```
      zwei
      drei
      ```
    correct: true
  - text: |
      ```
      zwei
      ```
    correct: false
  - text: |
      ```
      eins
      zwei
      drei
      ```
    correct: false
  - text: |
      ```
      default
      ```
    correct: false
hints:
  - "Java springt bei `switch (x)` direkt zum passenden `case`, nicht zum Anfang."
  - "Ohne `break` läuft die Ausführung in den nächsten `case`-Block hinein, egal ob dessen Bedingung passt."
  - "Erst das `break` in `case 3` stoppt die Ausführung – vor `default` wird also nicht mehr gesprungen."
---

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
