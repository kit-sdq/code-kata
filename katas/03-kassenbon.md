---
id: "2.2"
category: 03-ein-ausgabe
title:
  de: Kassenbon mit printf
  en: Receipt with printf
type: code
difficulty: medium
tags:
  de:
    - ausgabe
    - printf
  en:
    - output
    - printf
hints:
  de:
    - Verwenden Sie `%s` für den Artikelnamen, `%d` für die Anzahl und `%.2f` für den Gesamtpreis.
    - Der Gesamtpreis ist `anzahl * einzelpreis` – die Rechnung darf direkt an `printf` übergeben werden.
    - "Beenden Sie jede Zeile mit `%n`, sonst klebt alles in einer Zeile zusammen. Achtung: Diese Aufgabe wird mit fester Locale ausgeführt, `%.2f` liefert deshalb einen **Punkt** (`7.50`), kein Komma."
  en:
    - Use `%s` for the item name, `%d` for the quantity, and `%.2f` for the total price.
    - The total price is `quantity * unitPrice` — the calculation may be passed directly to `printf`.
    - "End every line with `%n`, otherwise everything sticks together on one line. Note: this kata runs with a fixed locale, so `%.2f` produces a **point** (`7.50`), not a comma."
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected:
      de: |
        Artikel: Kaffee
        Anzahl: 3
        Gesamt: 7.50 Euro
      en: |
        Item: Coffee
        Quantity: 3
        Total: 7.50 Euro
---

<!-- de -->
Legen Sie die Variablen `String artikel = "Kaffee";`, `int anzahl = 3;` und `double einzelpreis = 2.5;` an. Geben Sie mit `printf` und den Platzhaltern `%s`, `%d` und `%.2f` den folgenden Bon aus (jede Zeile mit `%n` abschließen). Der Gesamtpreis soll aus `anzahl` und `einzelpreis` berechnet werden:

```
Artikel: Kaffee
Anzahl: 3
Gesamt: 7.50 Euro
```

Hinweis: In diesem Kata wird unabhängig von Spracheinstellungen immer mit einem **Punkt** als Dezimaltrennzeichen gerechnet, auch wenn Sie im Deutschen ein Komma erwarten würden.

<!-- en -->
Create the variables `String item = "Coffee";`, `int quantity = 3;` and `double unitPrice = 2.5;`. Using `printf` and the placeholders `%s`, `%d` and `%.2f`, print the following receipt (ending each line with `%n`). The total price must be computed from `quantity` and `unitPrice`:

```
Item: Coffee
Quantity: 3
Total: 7.50 Euro
```

Note: regardless of language settings, this kata always uses a **point** as the decimal separator, even where you might otherwise expect a comma.

<!-- all -->

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
