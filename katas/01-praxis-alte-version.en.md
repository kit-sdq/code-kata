---
id: "8.1"
category: 01-java-verwenden
title: "Hands-on: Change without recompiling"
type: text
difficulty: medium
tags: [hands-on, javac, java, error]
answers:
  - "Old version"
hints:
  - "Compiling and running are two separate steps — `java` only reads the existing `.class` file, not the source code."
  - "After the change, `javac` was not called again before `java Gruss` ran again."
---

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
