---
id: "2.3"
category: 02-datentypen-variablen
title:
  de: Texte richtig vergleichen
  en: Comparing Text Correctly
type: code
difficulty: easy
tags:
  de:
    - string
    - vergleich
    - equals
  en:
    - string
    - comparison
    - equals
hints:
  de:
    - Texte vergleicht man mit `.equals(...)`, nicht mit `==`.
    - "`equals` unterscheidet Groß- und Kleinschreibung: \"geheim\" ist ungleich \"Geheim\"."
  en:
    - Compare text with `.equals(...)`, not with `==`.
    - "`equals` is case-sensitive: \"secret\" is not equal to \"Secret\"."
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      false
      true
---

<!-- de -->
Legen Sie zwei `String`-Variablen `passwort1 = "geheim"` und `passwort2 = "Geheim"` an. Prüfen Sie mit `equals`, ob `passwort1` und `passwort2` gleich sind, speichern Sie das Ergebnis in einer `boolean`-Variablen und geben Sie es aus. Prüfen Sie danach genauso, ob `passwort1` gleich `"geheim"` ist, und geben Sie auch dieses Ergebnis aus.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO: passwort1, passwort2 anlegen und beide Vergleiche mit equals ausgeben
    }
    // END EDIT
}
```

<!-- en -->
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
