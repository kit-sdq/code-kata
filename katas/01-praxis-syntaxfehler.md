---
id: "6.1"
category: 01-java-verwenden
title:
  de: "Praxis: Syntaxfehler provozieren"
  en: "Hands-on: Provoking a syntax error"
type: text
difficulty: medium
tags:
  de:
    - praxis
    - javac
    - fehler
  en:
    - hands-on
    - javac
    - error
hints:
  de:
    - Legen Sie die Datei genau wie unten angegeben an, auch mit der fehlenden Zeile.
    - Übersetzen Sie mit `javac Fehler.java` und lesen Sie die letzte Zeile der Ausgabe – dort steht eine Anzahl.
  en:
    - Create the file exactly as shown below, including the missing line.
    - Compile with `javac Fehler.java` and read the last line of the output — it states a count.
answers:
  - "1"
---

<!-- de -->
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

<!-- en -->
**Hands-on task – run this on your own machine.**

In a new folder, create a file `Fehler.java` with exactly the following content (note: a semicolon is deliberately missing after the first `println` line):

```java
public class Fehler {
    public static void main(String[] args) {
        System.out.println("First line")
        System.out.println("Second line");
    }
}
```

Compile the file in the terminal with:

```
javac Fehler.java
```

How many errors does `javac` report? Answer with just the number.
