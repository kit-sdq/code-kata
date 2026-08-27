---
id: "2.2"
category: 03-ein-ausgabe
title: Kassenbon mit printf
type: code
difficulty: medium
tags: [ausgabe, printf]
mainClass: Main
allowedImports: []
timeoutMs: 5000
checks:
  - type: stdout
    expected: |
      Artikel: Kaffee
      Anzahl: 3
      Gesamt: 7.50 Euro
hints:
  - "Verwenden Sie `%s` für den Artikelnamen, `%d` für die Anzahl und `%.2f` für den Gesamtpreis."
  - "Der Gesamtpreis ist `anzahl * einzelpreis` – die Rechnung darf direkt an `printf` übergeben werden."
  - "Beenden Sie jede Zeile mit `%n`, sonst klebt alles in einer Zeile zusammen. Achtung: Diese Aufgabe wird mit fester Locale ausgeführt, `%.2f` liefert deshalb einen **Punkt** (`7.50`), kein Komma."
---

Legen Sie die Variablen `String artikel = "Kaffee";`, `int anzahl = 3;` und `double einzelpreis = 2.5;` an. Geben Sie mit `printf` und den Platzhaltern `%s`, `%d` und `%.2f` den folgenden Bon aus (jede Zeile mit `%n` abschließen). Der Gesamtpreis soll aus `anzahl` und `einzelpreis` berechnet werden:

```
Artikel: Kaffee
Anzahl: 3
Gesamt: 7.50 Euro
```

Hinweis: In diesem Kata wird unabhängig von Spracheinstellungen immer mit einem **Punkt** als Dezimaltrennzeichen gerechnet, auch wenn Sie im Deutschen ein Komma erwarten würden.

```java template
public class Main {
    // BEGIN EDIT
    public static void main(String[] args) {
        // TODO
    }
    // END EDIT
}
```
