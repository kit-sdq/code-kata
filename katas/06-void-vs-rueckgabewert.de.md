---
id: 1.2
category: 06-funktionen-rekursion
title: "void oder Rückgabewert?"
type: choice
difficulty: easy
tags: [funktionen, void, return]
multiple: true
shuffle: true
options:
  - text: "Eine `void`-Methode braucht kein `return`, um korrekt zu sein."
    correct: true
  - text: "Man kann das Ergebnis eines Aufrufs einer `void`-Methode in einer Variablen auffangen."
    correct: false
  - text: "Eine Methode mit Rückgabetyp `int` muss auf jedem möglichen Ausführungsweg mit einem `return` enden."
    correct: true
  - text: "`void` bedeutet, dass die Methode immer `null` zurückgibt."
    correct: false
  - text: "`return` beendet die Methode sofort, auch wenn danach noch Code im Rumpf steht."
    correct: true
hints:
  - "Eine void-Methode tut etwas (z. B. eine Ausgabe), liefert aber keinen Wert an die Aufrufstelle zurück."
  - "`void` ist kein Wert und auch nicht `null` – es bedeutet 'kein Rückgabewert'."
  - "Der Compiler prüft bei nicht-void-Methoden, dass wirklich jeder Pfad durch den Rumpf bei einem return endet."
---

Welche der folgenden Aussagen über `void`-Methoden und Methoden mit Rückgabewert sind **richtig**?
