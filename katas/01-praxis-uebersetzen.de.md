---
id: "4.2"
category: 01-java-verwenden
title: "Praxis: Übersetzen am eigenen Rechner"
type: text
difficulty: easy
tags: [praxis, javac, terminal]
answers:
  - "Hallo.class"
hints:
  - "Legen Sie die Datei in einem beliebigen neuen Ordner an und übersetzen Sie sie dort im Terminal mit `javac Hallo.java`."
  - "`javac` erzeugt aus dem Quelltext eine neue Datei mit dem Bytecode – schauen Sie mit `ls` (bzw. `dir` unter Windows) in den Ordner."
---

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
