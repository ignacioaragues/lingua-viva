/* Lengua Viva · shared flashcard catalogue.
   Vocabulary definitions are public; review history stays private in the existing
   Supabase/local state. A deck is a VIEW of card IDs, never a card copy. */
(function () {
  'use strict';
  const DECKS = {
    francais: [
      {id:'all',label:'Toutes les cartes'},
      {id:'curso-anterior',label:'Curso anterior · Todas'},
      {id:'curso-anterior-d0',label:'Curso anterior · Dossier 0'},
      {id:'curso-anterior-d1',label:'Curso anterior · Dossier 1'},
      {id:'alter-ego-a1',label:'Alter Ego A1 · Todas'},
      {id:'alter-ego-a1-d0',label:'Alter Ego A1 · Dossier 0'},
      {id:'alter-ego-a1-d1',label:'Alter Ego A1 · Dossier 1'}
    ],
    'griego-biblico': [
      {id:'all',label:'Todas las tarjetas'},
      {id:'duff',label:'Duff · Todas'},
      {id:'duff-ch1',label:'Duff · Capítulo 1'},
      {id:'juan1',label:'Juan 1:1–23'},
      {id:'duff-ch2',label:'Duff · Capítulo 2'},
      {id:'duff-ch3',label:'Duff · Capítulo 3'},
      {id:'duff-ch4',label:'Duff · Capítulo 4'},
      {id:'duff-ch5',label:'Duff · Capítulo 5'}
    ]
  };
  function all(language, legacyLessons) {
    const shared = new Map();
    const insert = item => {
      if (!item || !item.id || !item.language) return;
      const key = item.language + ':' + item.id;
      const previous = shared.get(key);
      const memberships = Array.isArray(item.decks) ? item.decks : [];
      if (previous) {
        previous.decks = [...new Set([...previous.decks,...memberships])];
        return; // Preserve canonical text, IDs and original review identity.
      }
      if (typeof item.front !== 'string' || typeof item.back !== 'string') return;
      shared.set(key,{...item,decks:[...new Set(memberships)]});
    };
    (legacyLessons || []).forEach((lesson,order) => {
      (lesson.words || []).forEach(([front,back],index) => insert({
        language:'francais',
        id:lesson.id+'-'+index, // DO NOT change: existing Supabase reviews use it.
        lesson_id:lesson.id,
        order,
        front,back,
        course:'curso-anterior',
        decks:['curso-anterior','curso-anterior-d'+lesson.dossier]
      }));
    });
    (window.LV_FLASHCARD_ENTRIES || []).forEach(insert);
    return [...shared.values()].filter(card => card.language === language);
  }
  function decks(language) { return DECKS[language] || [{id:'all',label:'Todas las tarjetas'}]; }
  function inDeck(card,deckId) { return deckId==='all' || !deckId || (card.decks || []).includes(deckId); }
  window.LV_FLASHCARD_REPOSITORY = Object.freeze({all,decks,inDeck});
})();
