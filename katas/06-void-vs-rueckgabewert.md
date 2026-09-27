---
id: 1.2
category: 06-methoden
title:
  de: void oder Rückgabewert?
  en: void or Return Value?
type: choice
difficulty: easy
tags:
  de:
    - funktionen
    - void
    - return
  en:
    - functions
    - void
    - return
hints:
  de:
    - Eine void-Methode tut etwas (z. B. eine Ausgabe), liefert aber keinen Wert an die Aufrufstelle zurück.
    - "`void` ist kein Wert und auch nicht `null` – es bedeutet 'kein Rückgabewert'."
    - Der Compiler prüft bei nicht-void-Methoden, dass wirklich jeder Pfad durch den Rumpf bei einem return endet.
  en:
    - A void method does something (e.g. prints output), but does not return a value to the call site.
    - "`void` is not a value and not `null` either — it means 'no return value'."
    - The compiler checks, for non-void methods, that every path through the body really ends with a return.
multiple: true
shuffle: true
options:
  - text:
      de: Eine `void`-Methode braucht kein `return`, um korrekt zu sein.
      en: A `void` method does not need a `return` to be correct.
    correct: true
  - text:
      de: Man kann das Ergebnis eines Aufrufs einer `void`-Methode in einer Variablen auffangen.
      en: You can capture the result of a call to a `void` method in a variable.
    correct: false
  - text:
      de: Eine Methode mit Rückgabetyp `int` muss auf jedem möglichen Ausführungsweg mit einem `return` enden.
      en: A method with return type `int` must end with a `return` on every possible execution path.
    correct: true
  - text:
      de: "`void` bedeutet, dass die Methode immer `null` zurückgibt."
      en: "`void` means the method always returns `null`."
    correct: false
  - text:
      de: "`return` beendet die Methode sofort, auch wenn danach noch Code im Rumpf steht."
      en: "`return` ends the method immediately, even if there is more code in the body afterwards."
    correct: true
---

<!-- de -->
Welche der folgenden Aussagen über `void`-Methoden und Methoden mit Rückgabewert sind **richtig**?

<!-- en -->
Which of the following statements about `void` methods and methods with a return value are **correct**?
