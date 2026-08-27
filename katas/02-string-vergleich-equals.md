---
id: "2.3"
category: 02-datentypen-variablen
title: Texte richtig vergleichen
type: code
difficulty: easy
tags: [string, vergleich, equals]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      false
      true
hints:
  - "Texte vergleicht man mit `.equals(...)`, nicht mit `==`."
  - "`equals` unterscheidet Groß- und Kleinschreibung: \"geheim\" ist ungleich \"Geheim\"."
---

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
