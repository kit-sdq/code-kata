---
id: "2.3"
category: 02-datentypen-variablen
title: Comparing Text Correctly
type: code
difficulty: easy
tags: [string, comparison, equals]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      false
      true
hints:
  - "Compare text with `.equals(...)`, not with `==`."
  - "`equals` is case-sensitive: \"secret\" is not equal to \"Secret\"."
---

Create two `String` variables `password1 = "secret"` and `password2 = "Secret"`. Use `equals` to check whether `password1` and `password2` are equal, store the result in a `boolean` variable and print it. Then check in the same way whether `password1` equals `"secret"`, and print that result as well.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: create password1, password2 and print both equals comparisons
    }
    // END EDIT
}
```
