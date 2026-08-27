---
id: 8
category: 01-java-verwenden
title: "Hallo Welt"
type: code
difficulty: easy
tags: [hello-world, ausgabe]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      Hallo Welt!
hints:
  - "Verwenden Sie `System.out.println`, um Text auf dem Bildschirm auszugeben."
  - "Der auszugebende Text muss genau `Hallo Welt!` lauten, inklusive Ausrufezeichen."
---

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
