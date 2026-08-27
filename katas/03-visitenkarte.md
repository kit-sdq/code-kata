---
id: "1.2"
category: 03-ein-ausgabe
title: Visitenkarte
type: code
difficulty: easy
tags: [ausgabe, println]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      Erika Musterfrau
      Informatik

      Lieblingszahl: 7
hints:
  - "Jeder `println`-Aufruf springt danach automatisch in eine neue Zeile."
  - "Ein `println()` ganz ohne Klammerinhalt erzeugt genau eine Leerzeile."
  - "Sie brauchen genau vier `println`-Aufrufe."
---

Schreiben Sie ein Programm, das mit `println`-Aufrufen Namen, Studiengang und Lieblingszahl untereinander ausgibt. Zwischen Studiengang und Lieblingszahl soll mit einem leeren `println()` eine Leerzeile stehen.

Erzeugen Sie exakt diese Ausgabe:

```
Erika Musterfrau
Informatik

Lieblingszahl: 7
```

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
