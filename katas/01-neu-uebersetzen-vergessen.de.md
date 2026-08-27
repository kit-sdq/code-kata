---
id: 7
category: 01-java-verwenden
title: "Änderung ohne neu zu übersetzen"
type: choice
difficulty: medium
tags: [javac, java, fehler]
multiple: false
shuffle: true
options:
  - text: "Das Programm zeigt weiterhin die alte Ausgabe, weil `HelloWorld.class` noch aus der vorherigen Übersetzung stammt."
    correct: true
  - text: "Java erkennt automatisch, dass sich der Quelltext geändert hat, und übersetzt ihn neu."
    correct: false
  - text: "Es erscheint eine Fehlermeldung, dass sich der Quelltext geändert hat."
    correct: false
  - text: "Das Programm zeigt sofort die neue Ausgabe."
    correct: false
hints:
  - "`java` schaut sich nur die vorhandene `.class`-Datei an, nicht den Quelltext."
  - "Nach jeder Änderung gilt: erst `javac`, dann `java`."
---

Sie ändern den Quelltext von `HelloWorld.java` und speichern die Datei. Anschließend führen Sie sofort wieder nur `java HelloWorld` aus – ohne vorher `javac` erneut aufzurufen. Was passiert?
