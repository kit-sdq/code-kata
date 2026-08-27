---
id: 7
category: 01-java-verwenden
title:
  de: Änderung ohne neu zu übersetzen
  en: Change without recompiling
type: choice
difficulty: medium
tags:
  de:
    - javac
    - java
    - fehler
  en:
    - javac
    - java
    - error
hints:
  de:
    - "`java` schaut sich nur die vorhandene `.class`-Datei an, nicht den Quelltext."
    - "Nach jeder Änderung gilt: erst `javac`, dann `java`."
  en:
    - "`java` only looks at the existing `.class` file, not at the source code."
    - "After every change, the rule is: first `javac`, then `java`."
multiple: false
shuffle: true
options:
  - text:
      de: Das Programm zeigt weiterhin die alte Ausgabe, weil `HelloWorld.class` noch aus der vorherigen Übersetzung stammt.
      en: The program still shows the old output, because `HelloWorld.class` still comes from the previous compilation.
    correct: true
  - text:
      de: Java erkennt automatisch, dass sich der Quelltext geändert hat, und übersetzt ihn neu.
      en: Java automatically detects that the source code changed and recompiles it.
    correct: false
  - text:
      de: Es erscheint eine Fehlermeldung, dass sich der Quelltext geändert hat.
      en: An error message appears saying that the source code has changed.
    correct: false
  - text:
      de: Das Programm zeigt sofort die neue Ausgabe.
      en: The program immediately shows the new output.
    correct: false
---

<!-- de -->
Sie ändern den Quelltext von `HelloWorld.java` und speichern die Datei. Anschließend führen Sie sofort wieder nur `java HelloWorld` aus – ohne vorher `javac` erneut aufzurufen. Was passiert?

<!-- en -->
You change the source code of `HelloWorld.java` and save the file. You then immediately run only `java HelloWorld` again — without calling `javac` first. What happens?
