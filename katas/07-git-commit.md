---
id: "2.3"
category: 07-git
title:
  de: Ersten Commit erstellen
  en: Create the first commit
type: text
difficulty: easy
tags:
  - git
  - commit
hints:
  de:
    - Der Befehl heißt `git commit`, die Beschreibung folgt nach der Option `-m`.
    - Die Beschreibung muss in Anführungszeichen stehen, einfache oder doppelte sind beide erlaubt.
    - "Übernehmen Sie die Beschreibung exakt: \"Erste Notizen angelegt\"."
  en:
    - The command is `git commit`, the description follows the `-m` option.
    - The description must be in quotes, either single or double quotes are allowed.
    - "Use the description exactly: \"First notes created\"."
answers:
  de:
    - git\s+commit\s+-m\s+("Erste Notizen angelegt"|'Erste Notizen angelegt')\s*
  en:
    - git\s+commit\s+-m\s+("First notes created"|'First notes created')\s*
match:
  mode: regex
  caseSensitive: true
---

<!-- de -->
Sie haben `notizen.txt` bereits mit `git add` zur Staging Area hinzugefügt. Mit welchem Befehl erstellen Sie nun einen Commit mit genau der Beschreibung `Erste Notizen angelegt`? Geben Sie den vollständigen Befehl an.

<!-- en -->
You've already added `notes.txt` to the staging area with `git add`. Which command creates a commit now with exactly the description `First notes created`? Give the full command.
