---
id: "1.3"
category: 03-ein-ausgabe
title:
  de: Alles in einer Zeile
  en: Everything on One Line
type: code
difficulty: easy
tags:
  de:
    - ausgabe
    - print
    - println
  en:
    - output
    - print
    - println
hints:
  de:
    - "`print` springt anders als `println` nicht in die nächste Zeile."
    - Verwenden Sie mindestens drei `print`-Aufrufe, die zusammen den Satz ergeben.
    - Schließen Sie mit einem `println()` ohne Inhalt ab, damit die Zeile sauber endet.
  en:
    - Unlike `println`, `print` does not move to the next line.
    - Use at least three `print` calls that together form the sentence.
    - Finish with a single `println()` with no content so the line ends cleanly.
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected:
      de: |
        Java macht Spaß!
      en: |
        Java is fun!
---

<!-- de -->
Erzeugen Sie die folgende Ausgabe **ausschließlich** mit `System.out.print` – verwenden Sie dafür mindestens drei `print`-Aufrufe, die zusammen den Satz ergeben. Schließen Sie danach mit einem einzigen `println()` ohne Inhalt ab.

```
Java macht Spaß!
```

<!-- en -->
Produce the following output using **only** `System.out.print` — use at least three `print` calls that together form the sentence. Then finish with a single `println()` with no content.

```
Java is fun!
```

<!-- all -->

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
