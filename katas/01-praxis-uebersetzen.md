---
id: "4.2"
category: 01-java-verwenden
title:
  de: "Praxis: Übersetzen am eigenen Rechner"
  en: "Hands-on: Compiling on your own machine"
type: text
difficulty: easy
tags:
  de:
    - praxis
    - javac
    - terminal
  en:
    - hands-on
    - javac
    - terminal
hints:
  de:
    - Legen Sie die Datei in einem beliebigen neuen Ordner an und übersetzen Sie sie dort im Terminal mit `javac Hallo.java`.
    - "`javac` erzeugt aus dem Quelltext eine neue Datei mit dem Bytecode – schauen Sie mit `ls` (bzw. `dir` unter Windows) in den Ordner."
  en:
    - Create the file in any new folder and compile it there in the terminal with `javac Hallo.java`.
    - "`javac` creates a new file containing the bytecode from the source code — check the folder with `ls` (or `dir` on Windows)."
answers:
  - Hallo.class
---

<!-- de -->
**Praxisaufgabe – am eigenen Rechner ausführen.**

Legen Sie in einem neuen Ordner eine Datei `Hallo.java` mit genau folgendem Inhalt an:

```java
public class Hallo {
    public static void main(String[] args) {
        System.out.println("Hallo Welt!");
    }
}
```

Übersetzen Sie die Datei im Terminal mit:

```
javac Hallo.java
```

Sehen Sie sich anschließend den Inhalt des Ordners an. Welche Datei ist durch den Befehl zusätzlich entstanden? Antworten Sie nur mit dem Dateinamen (inklusive Endung).

<!-- en -->
**Hands-on task – run this on your own machine.**

In a new folder, create a file `Hallo.java` with exactly the following content:

```java
public class Hallo {
    public static void main(String[] args) {
        System.out.println("Hello World!");
    }
}
```

Compile the file in the terminal with:

```
javac Hallo.java
```

Then look at the contents of the folder. Which additional file was created by the command? Answer with just the file name (including its extension).
