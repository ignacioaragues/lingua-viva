/* Lectura bíblica anotada de Lingua Viva. Jn 1:1–2, formulación griega de tradición textual común.
   Traducción y fichas morfológicas propias; no reproduce la edición de Duff. */
window.GREEK_READER = {
  source:"Evangelio según Juan 1:1–2",
  notice:"Texto griego de tradición común; puntuación y traducción españolas propias. Las etiquetas morfológicas describen estas formas en su contexto, no sustituyen un análisis de todas las variantes textuales.",
  verses:[
    {ref:"Juan 1:1",tokens:["Ἐν","ἀρχῇ","ἦν","ὁ","λόγος,","καὶ","ὁ","λόγος","ἦν","πρὸς","τὸν","θεόν,","καὶ","θεὸς","ἦν","ὁ","λόγος."],translation:"En el principio existía la Palabra, y la Palabra estaba junto a Dios, y la Palabra era Dios."},
    {ref:"Juan 1:2",tokens:["οὗτος","ἦν","ἐν","ἀρχῇ","πρὸς","τὸν","θεόν."],translation:"Esta estaba en el principio junto a Dios."}
  ],
  lexicon:{
    "Ἐν":{lemma:"ἐν",category:"Preposición",morph:"Rige dativo",gloss:"en",note:"Introducción de un complemento temporal o espacial; aquí «en el principio»."},
    "ἐν":{lemma:"ἐν",category:"Preposición",morph:"Rige dativo",gloss:"en",note:"La misma preposición que en el versículo 1."},
    "ἀρχῇ":{lemma:"ἀρχή",category:"Sustantivo",morph:"Dativo singular femenino · 1.ª declinación",gloss:"principio, comienzo",note:"Dativo exigido por ἐν. La iota suscrita pertenece a la desinencia."},
    "ἦν":{lemma:"εἰμί",category:"Verbo",morph:"Imperfecto de indicativo · activo · 3.ª persona singular",gloss:"era, existía, estaba",note:"Imperfecto de εἰμί («ser/estar»); indica una situación pasada durativa."},
    "ὁ":{lemma:"ὁ",category:"Artículo definido",morph:"Nominativo singular masculino",gloss:"el",note:"Concuerda con λόγος en caso, género y número."},
    "λόγος":{lemma:"λόγος",category:"Sustantivo",morph:"Nominativo singular masculino · 2.ª declinación",gloss:"palabra, discurso; aquí «la Palabra»",note:"Núcleo del sujeto. En Juan 1 tiene un sentido teológico específico."},
    "καὶ":{lemma:"καί",category:"Conjunción",morph:"Coordinante · invariable",gloss:"y; también",note:"Aquí enlaza proposiciones."},
    "πρὸς":{lemma:"πρός",category:"Preposición",morph:"Con acusativo",gloss:"hacia, junto a, con",note:"En este contexto expresa relación o cercanía: «junto a Dios»."},
    "τὸν":{lemma:"ὁ",category:"Artículo definido",morph:"Acusativo singular masculino",gloss:"el",note:"Concuerda con θεόν; el acusativo viene exigido por πρός."},
    "θεόν":{lemma:"θεός",category:"Sustantivo",morph:"Acusativo singular masculino · 2.ª declinación",gloss:"Dios",note:"Complemento de πρός. La terminación -όν marca aquí el acusativo singular."},
    "θεὸς":{lemma:"θεός",category:"Sustantivo",morph:"Nominativo singular masculino · 2.ª declinación",gloss:"Dios",note:"Predicativo nominativo sin artículo en esta oración. No es acusativo; el acento grave es una variante contextual del agudo."},
    "οὗτος":{lemma:"οὗτος",category:"Pronombre demostrativo",morph:"Nominativo singular masculino",gloss:"este",note:"Remite a ὁ λόγος del versículo anterior; funciona como sujeto de ἦν."}
  }
};