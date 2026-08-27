---
id: 1.6
category: 04-operatoren-ausdruecke
title: Seconds converter
type: code
difficulty: medium
tags: [operators, division, modulo, scanner]
mainClass: Main
allowedImports: [java.util.Scanner]
timeoutMs: 5000
checks:
  - type: stdout
    label: "7384 seconds"
    stdin: "7384\n"
    expected: |
      7384 seconds are 2 hours, 3 minutes and 4 seconds.
  - type: stdout
    label: "59 seconds"
    stdin: "59\n"
    expected: |
      59 seconds are 0 hours, 0 minutes and 59 seconds.
  - type: stdout
    label: "exactly one hour"
    stdin: "3600\n"
    expected: |
      3600 seconds are 1 hours, 0 minutes and 0 seconds.
hints:
  - "Read the number of seconds with `Scanner`."
  - "Integer division `/` gives exactly the whole units here, `%` the respective remainder."
  - "Hours = total / 3600. Then keep computing with the remainder: minutes = remainder / 60, seconds = remainder % 60."
---

Write a program that reads a number of seconds with `Scanner` and breaks
it down into hours, minutes, and seconds.

Print the breakdown in exactly this format (even if a value is `0`):

```text
<total> seconds are <hours> hours, <minutes> minutes and <seconds> seconds.
```

Example for the input `7384`:

```text
7384 seconds are 2 hours, 3 minutes and 4 seconds.
```

Here, truncating the decimal places with integer division is, for once,
exactly what you want.

```java template
import java.util.Scanner;

public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: read seconds and break them down into hours, minutes, seconds
    }
    // END EDIT
}
```
