---
id: "4.2"
category: 01-java-verwenden
title: "Hands-on: Compiling on your own machine"
type: text
difficulty: easy
tags: [hands-on, javac, terminal]
answers:
  - "Hallo.class"
hints:
  - "Create the file in any new folder and compile it there in the terminal with `javac Hallo.java`."
  - "`javac` creates a new file containing the bytecode from the source code — check the folder with `ls` (or `dir` on Windows)."
---

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
