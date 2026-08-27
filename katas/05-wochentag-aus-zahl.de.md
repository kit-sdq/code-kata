---
id: 2.1
category: 05-kontrollfluss-schleifen
title: "Wochentag aus Zahl (switch)"
type: code
difficulty: easy
tags: [switch, kontrollfluss]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: return
    method: wochentag
    cases:
      - args: [1]
        expected: "Montag"
      - args: [4]
        expected: "Donnerstag"
      - args: [7]
        expected: "Sonntag"
      - args: [0]
        expected: "ungueltig"
      - args: [8]
        expected: "ungueltig"
hints:
  - "Nutzen Sie ein `switch` über den Parameter `tag` mit einem `case` je Wochentag (1 bis 7)."
  - "Vergessen Sie in keinem `case` das `break` – sonst fallen mehrere Fälle durch."
  - "Der `default`-Zweig fängt alle Zahlen außerhalb von 1 bis 7 ab."
---

Schreiben Sie eine Methode `wochentag`, die eine ganze Zahl `tag` von 1 (Montag) bis 7 (Sonntag) entgegennimmt und den passenden deutschen Wochentagsnamen zurückgibt. Für alle anderen Zahlen geben Sie `"ungueltig"` zurück.

Setzen Sie dafür ein `switch` ein.

```java template
public class Main {
    // BEGIN EDIT
    public static String wochentag(int tag) {
        // TODO
        return "";
    }
    // END EDIT
}
```
