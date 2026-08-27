---
id: 7
category: 01-java-verwenden
title: "Change without recompiling"
type: choice
difficulty: medium
tags: [javac, java, error]
multiple: false
shuffle: true
options:
  - text: "The program still shows the old output, because `HelloWorld.class` still comes from the previous compilation."
    correct: true
  - text: "Java automatically detects that the source code changed and recompiles it."
    correct: false
  - text: "An error message appears saying that the source code has changed."
    correct: false
  - text: "The program immediately shows the new output."
    correct: false
hints:
  - "`java` only looks at the existing `.class` file, not at the source code."
  - "After every change, the rule is: first `javac`, then `java`."
---

You change the source code of `HelloWorld.java` and save the file. You then immediately run only `java HelloWorld` again — without calling `javac` first. What happens?
