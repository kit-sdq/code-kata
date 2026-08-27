---
id: "6.2"
category: 01-java-verwenden
title: "Hands-on: Renaming the class without renaming the file"
type: choice
difficulty: medium
tags: [hands-on, javac, error]
multiple: false
shuffle: true
options:
  - text: "Error message while compiling"
    correct: true
  - text: "Error message while running"
    correct: false
  - text: "The program compiles and runs normally, without any error message"
    correct: false
  - text: "The program compiles normally, but `java Hallo` prints nothing"
    correct: false
hints:
  - "Java requires a public (`public`) class to live in a file whose name exactly matches the class name."
  - "The error occurs already when calling `javac`, not only at `java`."
---

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
