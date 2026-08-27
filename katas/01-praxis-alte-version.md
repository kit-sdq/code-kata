---
id: "8.1"
category: 01-java-verwenden
title:
  de: "Praxis: Änderung ohne Neuübersetzen"
  en: "Hands-on: Change without recompiling"
type: text
difficulty: medium
tags:
  de:
    - praxis
    - javac
    - java
    - fehler
  en:
    - hands-on
    - javac
    - java
    - error
hints:
  de:
    - Übersetzen und Ausführen sind zwei getrennte Schritte – `java` liest nur die vorhandene `.class`-Datei, nicht den Quelltext.
    - Nach der Änderung wurde kein `javac` mehr aufgerufen, bevor `java Gruss` erneut lief.
  en:
    - Compiling and running are two separate steps — `java` only reads the existing `.class` file, not the source code.
    - After the change, `javac` was not called again before `java Gruss` ran again.
answers:
  de:
    - Alte Version
  en:
    - Old version
---

<!-- de -->
**Praxisaufgabe – am eigenen Rechner ausführen.**

Legen Sie in einem neuen Ordner eine Datei `Gruss.java` an:

```java
public class Gruss {
    public static void main(String[] args) {
        System.out.println("Alte Version");
    }
}
```

Übersetzen und ausführen Sie sie:

```
javac Gruss.java
java Gruss
```

Ändern Sie nun den Text in der Datei auf `"Neue Version"` und speichern Sie:

```java
public class Gruss {
    public static void main(String[] args) {
        System.out.println("Neue Version");
    }
}
```

Führen Sie das Programm **sofort** erneut aus, ohne vorher `javac` aufzurufen:

```
java Gruss
```

Was gibt dieser letzte Aufruf aus?

<!-- en -->
**Hands-on task – run this on your own machine.**

In a new folder, create a file `Gruss.java`:

```java
public class Gruss {
    public static void main(String[] args) {
        System.out.println("Old version");
    }
}
```

Compile and run it:

```
javac Gruss.java
java Gruss
```

Now change the text in the file to `"New version"` and save it:

```java
public class Gruss {
    public static void main(String[] args) {
        System.out.println("New version");
    }
}
```

Run the program again **immediately**, without calling `javac` first:

```
java Gruss
```

What does this last call print?
