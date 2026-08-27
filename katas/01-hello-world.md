---
id: 8
category: 01-java-verwenden
title:
  de: Hallo Welt
  en: Hello World
type: code
difficulty: easy
tags:
  de:
    - hello-world
    - ausgabe
  en:
    - hello-world
    - output
hints:
  de:
    - Verwenden Sie `System.out.println`, um Text auf dem Bildschirm auszugeben.
    - Der auszugebende Text muss genau `Hallo Welt!` lauten, inklusive Ausrufezeichen.
  en:
    - Use `System.out.println` to print text to the screen.
    - The text to print must be exactly `Hello World!`, including the exclamation mark.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected:
      de: |
        Hallo Welt!
      en: |
        Hello World!
---

<!-- de -->
Schreiben Sie ein Programm, das den Text `Hallo Welt!` auf dem Bildschirm ausgibt.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: geben Sie "Hallo Welt!" aus
    }
    // END EDIT
}
```

<!-- en -->
Write a program that prints the text `Hello World!` to the screen.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: print "Hello World!"
    }
    // END EDIT
}
```
