---
id: "6.1"
category: 01-java-verwenden
title: "Praxis: Syntaxfehler provozieren"
type: text
difficulty: medium
tags: [praxis, javac, fehler]
answers:
  - "1"
hints:
  - "Legen Sie die Datei genau wie unten angegeben an, auch mit der fehlenden Zeile."
  - "Übersetzen Sie mit `javac Fehler.java` und lesen Sie die letzte Zeile der Ausgabe – dort steht eine Anzahl."
---

**Praxisaufgabe – am eigenen Rechner ausführen.**

Legen Sie in einem neuen Ordner eine Datei `Fehler.java` mit genau folgendem Inhalt an (beachten Sie: nach der ersten `println`-Zeile fehlt absichtlich ein Semikolon):

```java
public class Fehler {
    public static void main(String[] args) {
        System.out.println("Erste Zeile")
        System.out.println("Zweite Zeile");
    }
}
```

Übersetzen Sie die Datei im Terminal mit:

```
javac Fehler.java
```

Wie viele Fehler meldet `javac`? Antworten Sie nur mit der Zahl.
