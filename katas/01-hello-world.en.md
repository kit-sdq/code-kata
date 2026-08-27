---
id: 8
category: 01-java-verwenden
title: "Hello World"
type: code
difficulty: easy
tags: [hello-world, output]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      Hello World!
hints:
  - "Use `System.out.println` to print text to the screen."
  - "The text to print must be exactly `Hello World!`, including the exclamation mark."
---

Write a program that prints the text `Hello World!` to the screen.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: print "Hello World!"
    }
    // END EDIT
}
```
