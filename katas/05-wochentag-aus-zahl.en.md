---
id: 2.1
category: 05-kontrollfluss-schleifen
title: "Weekday from number (switch)"
type: code
difficulty: easy
tags: [switch, control-flow]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: weekdayFromNumber
    cases:
      - args: [1]
        expected: "Monday"
      - args: [4]
        expected: "Thursday"
      - args: [7]
        expected: "Sunday"
      - args: [0]
        expected: "invalid"
      - args: [8]
        expected: "invalid"
hints:
  - "Use a `switch` on the parameter `day` with one `case` per weekday (1 to 7)."
  - "Don't forget the `break` in every `case` — otherwise several cases fall through."
  - "The `default` branch catches all numbers outside 1 to 7."
---

Write a method `weekdayFromNumber` that takes an integer `day` from 1 (Monday) to 7 (Sunday) and returns the matching English weekday name. For all other numbers, return `"invalid"`.

Use a `switch` for this.

```java template
public class Main {
    // BEGIN EDIT
    public static String weekdayFromNumber(int day) {
        // TODO
        return "";
    }
    // END EDIT
}
```
