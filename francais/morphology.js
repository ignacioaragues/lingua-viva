/* Fichas morfológicas revisadas para la primera lectura francesa de Lingua Viva.
   Las formas se interpretan en su contexto; no son un analizador automático general. */
window.LINGUA_FR_MORPH = {
  "bonjour": {lemma:"bonjour",category:"Interjección",features:"Fórmula de saludo · invariable",meaning:"hola; buenos días",note:"Puede usarse durante el día en registros formales e informales."},
  "je": {lemma:"je",category:"Pronombre personal",features:"1.ª persona · singular · sujeto",meaning:"yo",note:"Ante vocal o h muda se elide: j’aime."},
  "m’appelle": {lemma:"s’appeler",category:"Verbo pronominal",features:"Presente de indicativo · 1.ª persona singular",meaning:"me llamo",note:"m’ es el pronombre reflexivo; appelle es la forma verbal. La forma de diccionario es s’appeler.",conjugation:"appeler"},
  "léa": {lemma:"Léa",category:"Nombre propio",features:"Antropónimo femenino · singular",meaning:"Léa",note:"En francés, é representa habitualmente una vocal anterior cerrada."},
  "suis": {lemma:"être",category:"Verbo",features:"Presente de indicativo · 1.ª persona singular",meaning:"soy / estoy",note:"El francés usa être tanto para identidad como para localización.",conjugation:"etre"},
  "à": {lemma:"à",category:"Preposición",features:"Invariable",meaning:"en / a",note:"En «à Lyon» indica localización. No confundir à con a (avoir)."},
  "lyon": {lemma:"Lyon",category:"Nombre propio",features:"Topónimo · ciudad",meaning:"Lyon",note:"Nombre de ciudad; generalmente no lleva artículo en este uso."},
  "mon": {lemma:"mon",category:"Determinante posesivo",features:"Masculino singular · poseedor de 1.ª persona",meaning:"mi",note:"Concuerda con el sustantivo poseído («nom»), no con el sexo del poseedor."},
  "nom": {lemma:"nom",category:"Sustantivo",features:"Masculino · singular",meaning:"nombre / apellido",note:"En «mon nom», funciona como núcleo del grupo nominal."},
  "s’écrit": {lemma:"s’écrire",category:"Verbo pronominal",features:"Presente de indicativo · 3.ª persona singular",meaning:"se escribe",note:"s’ es el pronombre reflexivo; écrit es la forma de écrire. En esta construcción, «s’écrire» expresa cómo se escribe una palabra.",conjugation:"ecrire"},
  "l": {lemma:"L",category:"Nombre de letra",features:"Letra del alfabeto",meaning:"ele",note:"Aquí se está deletreando un nombre, no usando un artículo."},
  "é": {lemma:"É",category:"Nombre de letra",features:"E con acento agudo",meaning:"e con acento agudo",note:"El acento distingue la grafía de e y suele indicar /e/."},
  "a": {lemma:"A",category:"Nombre de letra",features:"Letra del alfabeto",meaning:"a",note:"En esta frase es una letra deletreada; en otros contextos «a» puede ser «avoir», 3.ª persona singular."},
  "l’accueil": {lemma:"accueil",category:"Artículo + sustantivo",features:"Artículo definido elidido + sustantivo masculino singular",meaning:"la recepción",note:"l’ procede de le ante vocal. «À l’accueil» significa «en recepción»."},
  "un": {lemma:"un",category:"Artículo indefinido",features:"Masculino · singular",meaning:"un",note:"«Un homme» presenta una persona no identificada."},
  "homme": {lemma:"homme",category:"Sustantivo",features:"Masculino · singular",meaning:"hombre",note:"La h es muda: «un homme» admite enlace fonético entre las palabras."},
  "demande": {lemma:"demander",category:"Verbo",features:"Presente de indicativo · 3.ª persona singular",meaning:"pregunta",note:"En este contexto introduce una pregunta citada.",conjugation:"demander"},
  "comment": {lemma:"comment",category:"Adverbio interrogativo",features:"Invariable",meaning:"cómo",note:"Introduce una pregunta sobre el modo de escribir algo."},
  "ça": {lemma:"ça",category:"Pronombre demostrativo",features:"Invariable · registro corriente",meaning:"eso / esto",note:"Equivale a cela en muchos contextos. Se escribe con cedilla: ç."},
  "réponds": {lemma:"répondre",category:"Verbo",features:"Presente de indicativo · 1.ª persona singular",meaning:"respondo",note:"La -s final no se pronuncia normalmente.",conjugation:"repondre"},
  "il": {lemma:"il",category:"Pronombre personal",features:"3.ª persona · masculino singular · sujeto",meaning:"él",note:"Aquí remite a «un homme»."},
  "dit": {lemma:"dire",category:"Verbo",features:"Presente de indicativo · 3.ª persona singular",meaning:"dice",note:"Forma irregular de dire.",conjugation:"dire"},
  "merci": {lemma:"merci",category:"Interjección",features:"Fórmula de agradecimiento · invariable",meaning:"gracias",note:"Puede aparecer como enunciado independiente."}
};