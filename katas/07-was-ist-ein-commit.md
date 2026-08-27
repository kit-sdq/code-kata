---
id: "1.2"
category: 07-git
title:
  de: Was ist ein Commit?
  en: What is a commit?
type: choice
difficulty: easy
tags:
  de:
    - git
    - konzept
    - commit
  en:
    - git
    - concept
    - commit
hints:
  de:
    - Vergleichen Sie es mit einem Speicherpunkt in einem Videospiel.
    - Ein Commit ist zunächst nur lokal auf Ihrem Rechner gespeichert – für den Server brauchen Sie noch einen weiteren Schritt.
  en:
    - Compare it to a save point in a video game.
    - A commit is initially only stored locally on your machine — for the server, you need one more step.
multiple: false
shuffle: true
options:
  - text:
      de: Ein Schnappschuss des Projekts zu einem bestimmten Zeitpunkt, gespeichert mit eindeutiger Kennung, Zeitstempel, Autor und Beschreibung
      en: A snapshot of the project at a specific point in time, stored with a unique identifier, timestamp, author, and description
    correct: true
  - text:
      de: Eine Kopie des gesamten Projekts, die automatisch auf einem entfernten Server landet
      en: A copy of the entire project that automatically ends up on a remote server
    correct: false
  - text:
      de: Der Ordner, den Git auf Änderungen überwacht
      en: The folder that Git watches for changes
    correct: false
  - text:
      de: Eine Warnmeldung, die Git beim Ansehen eines alten Standes anzeigt
      en: A warning message Git shows when you view an old state
    correct: false
---

<!-- de -->
Sie schreiben eine Funktion, sie funktioniert, und Sie sichern diesen Stand mit `git commit`. Was ist ein Commit dabei genau?

<!-- en -->
You write a function, it works, and you save this state with `git commit`. What exactly is a commit here?
