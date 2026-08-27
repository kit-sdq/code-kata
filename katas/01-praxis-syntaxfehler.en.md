---
id: "6.1"
category: 01-java-verwenden
title: "Hands-on: Provoking a syntax error"
type: text
difficulty: medium
tags: [hands-on, javac, error]
answers:
  - "1"
hints:
  - "Create the file exactly as shown below, including the missing line."
  - "Compile with `javac Fehler.java` and read the last line of the output — it states a count."
---

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
