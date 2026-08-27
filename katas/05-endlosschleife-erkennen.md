---
id: 3.6
category: 05-kontrollfluss-schleifen
title: "Endlosschleifen erkennen"
type: choice
difficulty: medium
tags: [schleifen, endlosschleife, kontrollfluss]
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
hints:
  - "Fragen Sie sich bei jeder Schleife: Verändert sich im Rumpf tatsächlich etwas, das die Bedingung irgendwann falsch werden lässt?"
  - "Bei einer `for`-Schleife zählt auch die Fortschaltung (der dritte Teil in den Klammern) – prüfen Sie, ob sie in die richtige Richtung läuft."
---

Welche der folgenden Schleifen sind **Endlosschleifen**? Wählen Sie alle zutreffenden aus.
