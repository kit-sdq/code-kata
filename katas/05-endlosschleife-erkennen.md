---
id: 3.6
category: 05-kontrollfluss-schleifen
title:
  de: Endlosschleifen erkennen
  en: Spotting infinite loops
type: choice
difficulty: medium
tags:
  de:
    - schleifen
    - endlosschleife
    - kontrollfluss
  en:
    - loops
    - infinite-loop
    - control-flow
hints:
  de:
    - "Fragen Sie sich bei jeder Schleife: Verändert sich im Rumpf tatsächlich etwas, das die Bedingung irgendwann falsch werden lässt?"
    - Bei einer `for`-Schleife zählt auch die Fortschaltung (der dritte Teil in den Klammern) – prüfen Sie, ob sie in die richtige Richtung läuft.
  en:
    - "For each loop, ask yourself: does something in the body actually change that will eventually make the condition false?"
    - For a `for` loop, the increment (the third part in the parentheses) counts too — check whether it runs in the right direction.
multiple: true
shuffle: true
options:
  - text: |
      ```java
      int i = 0;
      while (i < 5) {
          i++;
      }
      ```
    correct: false
  - text: |
      ```java
      int i = 0;
      while (i < 5) {
          System.out.println(i);
      }
      ```
    correct: true
  - text: |
      ```java
      for (int i = 10; i > 0; i++) {
          System.out.println(i);
      }
      ```
    correct: true
  - text: |
      ```java
      int i = 0;
      do {
          i++;
      } while (i < 3);
      ```
    correct: false
---

<!-- de -->
Welche der folgenden Schleifen sind **Endlosschleifen**? Wählen Sie alle zutreffenden aus.

<!-- en -->
Which of the following loops are **infinite loops**? Select all that apply.
