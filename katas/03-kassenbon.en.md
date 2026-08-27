---
id: "2.2"
category: 03-ein-ausgabe
title: Receipt with printf
type: code
difficulty: medium
tags: [output, printf]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      Item: Coffee
      Quantity: 3
      Total: 7.50 Euro
hints:
  - "Use `%s` for the item name, `%d` for the quantity, and `%.2f` for the total price."
  - "The total price is `quantity * unitPrice` — the calculation may be passed directly to `printf`."
  - "End every line with `%n`, otherwise everything sticks together on one line. Note: this kata runs with a fixed locale, so `%.2f` produces a **point** (`7.50`), not a comma."
---

Create the variables `String item = "Coffee";`, `int quantity = 3;` and `double unitPrice = 2.5;`. Using `printf` and the placeholders `%s`, `%d` and `%.2f`, print the following receipt (ending each line with `%n`). The total price must be computed from `quantity` and `unitPrice`:

```
Item: Coffee
Quantity: 3
Total: 7.50 Euro
```

Note: regardless of language settings, this kata always uses a **point** as the decimal separator, even where you might otherwise expect a comma.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
