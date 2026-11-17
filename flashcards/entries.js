/* Single source for future cross-course card entries and deck memberships.
   Do not edit existing IDs: review history uses language + ':' + ID.
   Reuse an existing card in another deck with e.g.
   {language:'francais',id:'d0-bonjour-0',decks:['alter-ego-a1','alter-ego-a1-d0']}
   (no new front/back; the existing card and review schedule are shared).
   Add a genuinely new sense with its own unique stable ID, front, back,
   course, lesson_id and decks. Avoid automatic merging by spelling alone.
   Private/user-selected cards must remain in private authenticated storage. */
window.LV_FLASHCARD_ENTRIES = window.LV_FLASHCARD_ENTRIES || [];
