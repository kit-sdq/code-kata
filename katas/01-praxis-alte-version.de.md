---
id: "8.1"
category: 01-java-verwenden
title: "Praxis: Änderung ohne Neuübersetzen"
type: text
difficulty: medium
tags: [praxis, javac, java, fehler]
answers:
  - "Alte Version"
hints:
  - "Übersetzen und Ausführen sind zwei getrennte Schritte – `java` liest nur die vorhandene `.class`-Datei, nicht den Quelltext."
  - "Nach der Änderung wurde kein `javac` mehr aufgerufen, bevor `java Gruss` erneut lief."
---

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
