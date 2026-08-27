---
id: "6.2"
category: 01-java-verwenden
title: "Praxis: Klasse umbenennen ohne die Datei umzubenennen"
type: choice
difficulty: medium
tags: [praxis, javac, fehler]
multiple: false
shuffle: true
options:
  - text: "Fehlermeldung beim Kompilieren"
    correct: true
  - text: "Fehlermeldung beim Ausführen"
    correct: false
  - text: "Das Programm übersetzt und läuft normal, ganz ohne Fehlermeldung"
    correct: false
  - text: "Das Programm übersetzt normal, aber `java Hallo` gibt nichts aus"
    correct: false
hints:
  - "Java verlangt, dass eine öffentliche (`public`) Klasse in einer Datei liegt, deren Name exakt zum Klassennamen passt."
  - "Der Fehler tritt bereits beim Aufruf von `javac`, nicht erst bei `java`, auf."
---

**Praxisaufgabe – am eigenen Rechner ausführen.**

Legen Sie in einem neuen Ordner eine Datei mit dem Namen `Hallo.java` an, aber mit folgendem Inhalt (beachten Sie: die Klasse heißt `Hallo2`, die Datei aber weiterhin `Hallo.java`):

```java
public class Hallo2 {
    public static void main(String[] args) {
        System.out.println("Hallo Welt!");
    }
}
```

Versuchen Sie, die Datei zu übersetzen:

```
javac Hallo.java
```

Was passiert?
