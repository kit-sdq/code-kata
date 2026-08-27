---
id: "6.2"
category: 01-java-verwenden
title:
  de: "Praxis: Klasse umbenennen ohne die Datei umzubenennen"
  en: "Hands-on: Renaming the class without renaming the file"
type: choice
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
    - Java verlangt, dass eine öffentliche (`public`) Klasse in einer Datei liegt, deren Name exakt zum Klassennamen passt.
    - Der Fehler tritt bereits beim Aufruf von `javac`, nicht erst bei `java`, auf.
  en:
    - Java requires a public (`public`) class to live in a file whose name exactly matches the class name.
    - The error occurs already when calling `javac`, not only at `java`.
multiple: false
shuffle: true
options:
  - text:
      de: Fehlermeldung beim Kompilieren
      en: Error message while compiling
    correct: true
  - text:
      de: Fehlermeldung beim Ausführen
      en: Error message while running
    correct: false
  - text:
      de: Das Programm übersetzt und läuft normal, ganz ohne Fehlermeldung
      en: The program compiles and runs normally, without any error message
    correct: false
  - text:
      de: Das Programm übersetzt normal, aber `java Hallo` gibt nichts aus
      en: The program compiles normally, but `java Hallo` prints nothing
    correct: false
---

<!-- de -->
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

<!-- en -->
**Hands-on task – run this on your own machine.**

In a new folder, create a file named `Hallo.java`, but with the following content (note: the class is called `Hallo2`, but the file remains `Hallo.java`):

```java
public class Hallo2 {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

Try to compile the file:

```
javac Hallo.java
```

What happens?
