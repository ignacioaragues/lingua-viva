/* Lengua Viva · Duff 4 · Las preposiciones · páginas físicas 81–97.
   PDF original privado cotejado; no se reproducen prácticas ni soluciones.
   Citas bíblicas breves: SBLGNT © 2010, https://sblgnt.com/;
   análisis contrastado con MorphGNT, James K. Tauber, CC BY-SA 3.0.
   Ejemplos de práctica y glosas son originales de Lengua Viva. */
(function(){
'use strict';
var rd=window.GREEK_READER;if(!rd)return;
var all=[],ids=new Set(),lex=new Map();
function token(form,lemma,cat,morph,gloss){return {form:form,lemma:lemma,cat:cat,morph:morph,gloss:gloss};}
function add(page,ref,kind,theme,words,translation,opts){
 if(ids.has(ref))throw Error('Referencia duplicada '+ref);
 ids.add(ref);
 if(!words.length||words.some(w=>!w.form||!w.lemma||!w.cat||!w.morph||!w.gloss))throw Error('Ficha incompleta '+ref);
 all.push(Object.assign({page:page,ref:ref,kind:kind,theme:theme,words:words,translation:translation},opts||{}));
}
function w(form,lemma,cat,morph,gloss){return token(form,lemma,cat,morph,gloss);}
function prep(page,ref,forms,theme){
 add(page,ref,'paradigm',theme,forms.map(function(p){return w(p[0],p[1]||p[0],'P-','preposición · rige '+p[2],p[3]);}),null);
}
function vocab(page,ref,theme,forms){
 add(page,ref,'lexicon',theme,forms.map(function(p){return w(p[0],p[1]||p[0],p[2]||'V-','forma de diccionario; '+(p[2]==='P-'?'preposición':p[2]==='D-'?'adverbio o negación':'presente indicativo activo, 1.ª singular'),p[3]);}),null);
}
function ex(page,ref,theme,words,translation){add(page,ref,'original',theme,words,translation);}
var article=(form,morph,gloss)=>w(form,'ὁ','RA',morph,gloss);
var noun=(form,lemma,morph,gloss)=>w(form,lemma,'N-',morph,gloss);
var verb=(form,lemma,morph,gloss)=>w(form,lemma,'V-',morph,gloss);
var pre=(form,lemma,cas,gloss)=>w(form,lemma,'P-','rige '+cas,gloss);
var con=(form,lemma,gloss)=>w(form,lemma,'C-','conjunción',gloss);
var adv=(form,lemma,gloss)=>w(form,lemma,'D-','adverbio / partícula',gloss);
prep(82,'Duff 4 · preposiciones básicas',[
 ['εἰς','εἰς','acusativo','a, hacia dentro de'],['πρός','πρός','acusativo','hacia, a'],
 ['ἀπό','ἀπό','genitivo','desde, alejándose de'],['ἐκ','ἐκ','genitivo','fuera de, desde dentro de'],
 ['ἐν','ἐν','dativo','en, dentro de']
],'Cinco preposiciones básicas y el caso que rigen');
ex(82,'LV 4 · movimiento hacia','εἰς + acusativo: destino',[
 article('ὁ','nominativo singular masculino','el'),noun('ἄγγελος','ἄγγελος','nominativo singular masculino','mensajero'),
 verb('ἄγει','ἄγω','presente indicativo activo · 3.ª singular','conduce'),
 article('τὸν','acusativo singular masculino','al'),noun('δοῦλον','δοῦλος','acusativo singular masculino','siervo'),
 pre('εἰς','εἰς','acusativo','hacia dentro de'),article('τὸν','acusativo singular masculino','el'),
 noun('οἶκον','οἶκος','acusativo singular masculino','hogar')
],'El mensajero conduce al siervo al interior de la casa.');
ex(83,'LV 4 · origen','ἐκ + genitivo: punto de partida',[
 article('ὁ','nominativo singular masculino','el'),noun('δοῦλος','δοῦλος','nominativo singular masculino','siervo'),
 verb('ἄγει','ἄγω','presente indicativo activo · 3.ª singular','conduce'),
 article('τὸν','acusativo singular masculino','al'),noun('ἄγγελον','ἄγγελος','acusativo singular masculino','mensajero'),
 pre('ἐκ','ἐκ','genitivo','fuera de'),article('τῆς','genitivo singular femenino','de la'),
 noun('οἰκίας','οἰκία','genitivo singular femenino','casa')
],'El siervo conduce al mensajero fuera de la casa.');
add(81,'Marcos 12:41 · cita','biblical','εἰς + acusativo: destino',[
 article('ὁ','nominativo singular masculino','la'),noun('ὄχλος','ὄχλος','nominativo singular masculino','multitud'),
 verb('βάλλει','βάλλω','presente indicativo activo · 3.ª singular','echa'),
 noun('χαλκὸν','χαλκός','acusativo singular masculino','dinero de cobre'),
 pre('εἰς','εἰς','acusativo','en, hacia dentro de'),article('τὸ','acusativo singular neutro','el'),
 noun('γαζοφυλάκιον','γαζοφυλάκιον','acusativo singular neutro','tesoro del templo')
],'La multitud echa monedas en el tesoro del templo.',{readingNote:'Extracto breve de Marcos 12:41, cotejado con MorphGNT/SBLGNT.'});
add(81,'Juan 18:28 · cita','biblical','ἀπό + genitivo / εἰς + acusativo',[
 verb('Ἄγουσιν','ἄγω','presente indicativo activo · 3.ª plural','conducen'),
 article('τὸν','acusativo singular masculino','a'),noun('Ἰησοῦν','Ἰησοῦς','acusativo singular masculino','Jesús'),
 pre('ἀπὸ','ἀπό','genitivo','desde'),article('τοῦ','genitivo singular masculino','de'),
 noun('Καϊάφα','Καϊάφας','genitivo singular masculino','Caifás'),
 pre('εἰς','εἰς','acusativo','hacia'),article('τὸ','acusativo singular neutro','el'),
 noun('πραιτώριον','πραιτώριον','acusativo singular neutro','pretorio')
],'Conducen a Jesús desde Caifás hasta el pretorio.',{readingNote:'Extracto discontinuo de Juan 18:28: se omite οὖν para centrarse en las preposiciones.'});
prep(84,'Duff 4 · tres casos παρά',[
 ['παρά','παρά','acusativo','junto a, hacia el lado de'],['παρά','παρά','genitivo','de parte de, desde junto a'],['παρά','παρά','dativo','junto a, al lado de']
],'παρά: tres casos y tres relaciones');
prep(85,'Duff 4 · tres casos ἐπί',[
 ['ἐπί','ἐπί','acusativo','hacia encima de'],['ἐπί','ἐπί','genitivo','sobre, en tiempos de'],
 ['ἐπί','ἐπί','dativo','sobre, en, a base de']
],'ἐπί: tres casos');
prep(85,'Duff 4 · dos casos',[
 ['διά','διά','acusativo','por causa de'],['διά','διά','genitivo','por medio de, a través de'],
 ['κατά','κατά','acusativo','según'],['κατά','κατά','genitivo','contra'],
 ['μετά','μετά','acusativo','después de'],['μετά','μετά','genitivo','con, en compañía de'],
 ['περί','περί','acusativo','alrededor de'],['περί','περί','genitivo','acerca de'],
 ['ὑπέρ','ὑπέρ','acusativo','por encima de'],['ὑπέρ','ὑπέρ','genitivo','en favor de, por'],
 ['ὑπό','ὑπό','acusativo','debajo de'],['ὑπό','ὑπό','genitivo','por acción de']
],'Seis preposiciones que rigen dos casos');
prep(86,'Duff 4 · preposiciones de un caso',[
 ['ἐνώπιον','ἐνώπιον','genitivo','ante, en presencia de'],['ἔξω','ἔξω','genitivo','fuera de'],
 ['ἕως','ἕως','genitivo','hasta'],['πρό','πρό','genitivo','antes de'],
 ['σύν','σύν','dativo','con, junto con']
],'Preposiciones complementarias');
add(83,'Mateo 10:24 · cita','biblical','ὑπέρ + acusativo',[
 adv('οὐκ','οὐ','no'),verb('ἔστιν','εἰμί','presente indicativo activo · 3.ª singular','es'),
 noun('δοῦλος','δοῦλος','nominativo singular masculino','siervo'),
 pre('ὑπὲρ','ὑπέρ','acusativo','por encima de'),article('τὸν','acusativo singular masculino','el'),
 noun('κύριον','κύριος','acusativo singular masculino','amo'),
 w('αὐτοῦ','αὐτός','RP','genitivo singular masculino','suyo')
],'Un siervo no está por encima de su amo.',{readingNote:'Extracto de Mateo 10:24; se omite la primera cláusula.'});
add(83,'1 Corintios 15:3 · cita','biblical','ὑπέρ + genitivo',[
 noun('Χριστὸς','Χριστός','nominativo singular masculino','Cristo'),
 verb('ἀπέθανεν','ἀποθνῄσκω','aoristo indicativo activo · 3.ª singular','murió'),
 pre('ὑπὲρ','ὑπέρ','genitivo','por, en favor de'),article('τῶν','genitivo plural femenino','los'),
 noun('ἁμαρτιῶν','ἁμαρτία','genitivo plural femenino','pecados'),
 w('ἡμῶν','ἐγώ','RP','genitivo plural · 1.ª persona','nuestros')
],'Cristo murió por nuestros pecados.',{readingNote:'Extracto de 1 Corintios 15:3, cotejado con MorphGNT/SBLGNT.'});
ex(84,'LV 4 · μετά y caso','Contraste entre μετά + genitivo y acusativo',[
 pre('μετὰ','μετά','genitivo','con'),article('τοῦ','genitivo singular masculino','del'),
 noun('ἀδελφοῦ','ἀδελφός','genitivo singular masculino','hermano'),
 con('καὶ','καί','y'),
 pre('μετὰ','μετά','acusativo','después de'),article('τὴν','acusativo singular femenino','la'),
 noun('ἡμέραν','ἡμέρα','acusativo singular femenino','jornada')
],'Con el hermano y después de la jornada.');
ex(85,'LV 4 · ὑπό','Agente en genitivo frente a posición en acusativo',[
 pre('ὑπὸ','ὑπό','genitivo','por acción de'),article('τοῦ','genitivo singular masculino','del'),
 noun('ἀγγέλου','ἄγγελος','genitivo singular masculino','mensajero'),
 con('καὶ','καί','y'),pre('ὑπὸ','ὑπό','acusativo','debajo de'),article('τὸν','acusativo singular masculino','el'),
 noun('οὐρανόν','οὐρανός','acusativo singular masculino','cielo')
],'Por el mensajero y bajo el cielo.');
ex(86,'LV 4 · σύν','σύν + dativo, compañía',[
 pre('σὺν','σύν','dativo','junto con'),article('τοῖς','dativo plural masculino','los'),
 noun('ἀδελφοῖς','ἀδελφός','dativo plural masculino','hermanos')
],'Junto con los hermanos.');
add(87,'LV 4 · elisión','paradigm','Elisión ante vocal y cambio ἐκ → ἐξ',[
 pre('ἀπ’','ἀπό','genitivo','desde'),pre('δι’','διά','genitivo','a través de'),
 pre('ἐπ’','ἐπί','acusativo, genitivo o dativo','sobre'),pre('κατ’','κατά','acusativo o genitivo','según / contra'),
 pre('μετ’','μετά','acusativo o genitivo','después de / con'),
 pre('παρ’','παρά','acusativo, genitivo o dativo','junto a / desde'),
 pre('ὑπ’','ὑπό','acusativo o genitivo','debajo de / por'),
 pre('ἐξ','ἐκ','genitivo ante vocal','desde dentro de')
],null,{readingNote:'Se muestra el fenómeno fonológico, no una tabla de equivalencias unívocas.'});
ex(87,'LV 4 · elisión contextual','ἐξ ante vocal',[
 pre('ἐξ','ἐκ','genitivo','fuera de'),noun('οἰκίας','οἰκία','genitivo singular femenino','casa')
],'Fuera de una casa.');
ex(88,'LV 4 · orientación','πρός + acusativo: orientación',[
 verb('λέγομεν','λέγω','presente indicativo activo · 1.ª plural','hablamos'),
 pre('πρὸς','πρός','acusativo','hacia'),article('τὸν','acusativo singular masculino','el'),
 noun('κύριον','κύριος','acusativo singular masculino','señor')
],'Hablamos hacia el señor (dirigiéndonos a él).');
add(89,'LV 4 · dativo instrumental','original','Instrumento inanimado sin preposición',[
 article('ὁ','nominativo singular masculino','el'),noun('ἄγγελος','ἄγγελος','nominativo singular masculino','mensajero'),
 verb('ποιεῖ','ποιέω','presente indicativo activo · 3.ª singular','hace'),
 article('τὸ','acusativo singular neutro','el'),noun('ἔργον','ἔργον','acusativo singular neutro','trabajo'),
 noun('λόγῳ','λόγος','dativo singular masculino · instrumental','con una palabra')
],'El mensajero hace el trabajo mediante una palabra.');
ex(89,'LV 4 · compañía','μετά + genitivo: compañía, no instrumento',[
 verb('περιπατῶ','περιπατέω','presente indicativo activo · 1.ª singular','camino'),
 pre('μετὰ','μετά','genitivo','con'),article('τοῦ','genitivo singular masculino','el'),
 noun('ἀδελφοῦ','ἀδελφός','genitivo singular masculino','hermano')
],'Camino con el hermano.');
vocab(90,'Duff 4 · verbos compuestos I','Verbos compuestos: raíz y prefijo',[
 ['ἀναβλέπω','ἀναβλέπω','V-','alzar la mirada, recobrar la vista'],
 ['ἀπολύω','ἀπολύω','V-','dejar libre, despedir'],
 ['ἐκβάλλω','ἐκβάλλω','V-','expulsar, echar fuera'],
 ['ἐπικαλέω','ἐπικαλέω','V-','invocar, llamar'],
 ['κατοικέω','κατοικέω','V-','habitar'],
 ['παρακαλέω','παρακαλέω','V-','exhortar, consolar']
]);
vocab(90,'Duff 4 · verbos compuestos II','Más verbos compuestos',[
 ['παραλαμβάνω','παραλαμβάνω','V-','recibir, tomar consigo'],
 ['περιπατέω','περιπατέω','V-','caminar, vivir'],
 ['προσκυνέω','προσκυνέω','V-','adorar; rige dativo'],
 ['συνάγω','συνάγω','V-','reunir, congregar'],
 ['ὑπάγω','ὑπάγω','V-','marcharse, irse']
]);
ex(91,'LV 4 · verbo compuesto','ἐκβάλλω y complemento de origen',[
 article('ὁ','nominativo singular masculino','el'),noun('κύριος','κύριος','nominativo singular masculino','señor'),
 verb('ἐκβάλλει','ἐκβάλλω','presente indicativo activo · 3.ª singular','expulsa'),
 article('τὸν','acusativo singular masculino','al'),noun('δοῦλον','δοῦλος','acusativo singular masculino','siervo'),
 pre('ἐκ','ἐκ','genitivo','fuera de'),article('τοῦ','genitivo singular masculino','el'),
 noun('οἴκου','οἶκος','genitivo singular masculino','hogar')
],'El señor expulsa al siervo de la casa.');
vocab(91,'Duff 4 · interrogativos','Interrogación',[
 ['πῶς','πῶς','D-','cómo'],['ποῦ','ποῦ','D-','dónde']
]);
ex(91,'LV 4 · interrogación','Interrogación con πῶς',[
 adv('πῶς','πῶς','cómo'),verb('βλέπεις','βλέπω','presente indicativo activo · 2.ª singular','ves'),
 article('τὸν','acusativo singular masculino','a'),noun('ἄγγελον','ἄγγελος','acusativo singular masculino','mensajero')
],'¿Cómo ves al mensajero?');
vocab(92,'Duff 4 · negación','Negación ante consonante, vocal suave y vocal áspera',[
 ['οὐ','οὐ','D-','no (ante consonante)'],
 ['οὐκ','οὐ','D-','no (ante vocal de espíritu suave)'],
 ['οὐχ','οὐ','D-','no (ante vocal de espíritu áspero)']
]);
ex(92,'LV 4 · negación','οὐκ ante vocal de espíritu suave',[
 adv('οὐκ','οὐ','no'),verb('ἀκούω','ἀκούω','presente indicativo activo · 1.ª singular','oigo')
],'No oigo.');
prep(93,'Duff 4 · repaso de regímenes',[
 ['εἰς','εἰς','acusativo','hacia dentro de'],['ἐκ','ἐκ','genitivo','fuera de'],
 ['διά','διά','acusativo','por causa de'],['διά','διά','genitivo','a través de'],
 ['μετά','μετά','acusativo','después de'],['μετά','μετά','genitivo','junto con'],
 ['ὑπό','ὑπό','acusativo','bajo'],['ὑπό','ὑπό','genitivo','por acción de']
],'Repaso: una misma preposición puede cambiar de sentido');
ex(94,'LV 4 · repaso','Preposición con genitivo y dativo',[
 article('ὁ','nominativo singular masculino','el'),noun('ἀδελφός','ἀδελφός','nominativo singular masculino','hermano'),
 verb('περιπατεῖ','περιπατέω','presente indicativo activo · 3.ª singular','camina'),
 pre('ἐν','ἐν','dativo','en'),article('τῇ','dativo singular femenino','la'),
 noun('οἰκίᾳ','οἰκία','dativo singular femenino','casa'),
 pre('μετὰ','μετά','genitivo','con'),article('τοῦ','genitivo singular masculino','el'),
 noun('δούλου','δοῦλος','genitivo singular masculino','siervo')
],'El hermano camina dentro de la casa con el siervo.');
ex(95,'LV 4 · síntesis','Interrogativo, negación y régimen',[
 adv('ποῦ','ποῦ','dónde'),verb('περιπατεῖ','περιπατέω','presente indicativo activo · 3.ª singular','camina'),
 article('ὁ','nominativo singular masculino','el'),noun('κύριος','κύριος','nominativo singular masculino','señor')
],'¿Dónde camina el señor?');
add(95,'Juan 1:1–4 · sección C','biblical','Ejercicio final: Juan 1:1–4; sin solución',[
 pre('Ἐν','ἐν','dativo','en'),
 noun('ἀρχῇ','ἀρχή','dativo singular femenino','principio'),
 verb('ἦν','εἰμί','imperfecto indicativo activo · 3.ª singular','era, existía'),
 article('ὁ','nominativo singular masculino','el'),
 noun('λόγος','λόγος','nominativo singular masculino','palabra'),
 con('καὶ','καί','y'),
 article('ὁ','nominativo singular masculino','el'),
 noun('λόγος','λόγος','nominativo singular masculino','palabra'),
 verb('ἦν','εἰμί','imperfecto indicativo activo · 3.ª singular','estaba'),
 pre('πρὸς','πρός','acusativo','hacia, junto a'),
 article('τὸν','acusativo singular masculino','a'),
 noun('θεόν','θεός','acusativo singular masculino','Dios'),
 con('καὶ','καί','y'),
 noun('θεὸς','θεός','nominativo singular masculino','Dios'),
 verb('ἦν','εἰμί','imperfecto indicativo activo · 3.ª singular','era'),
 article('ὁ','nominativo singular masculino','el'),
 noun('λόγος','λόγος','nominativo singular masculino','palabra'),
 w('οὗτος','οὗτος','RD','nominativo singular masculino · demostrativo','este'),
 verb('ἦν','εἰμί','imperfecto indicativo activo · 3.ª singular','estaba'),
 pre('ἐν','ἐν','dativo','en'),
 noun('ἀρχῇ','ἀρχή','dativo singular femenino','principio'),
 pre('πρὸς','πρός','acusativo','junto a'),
 article('τὸν','acusativo singular masculino','a'),
 noun('θεόν','θεός','acusativo singular masculino','Dios'),
 pre('ἐν','ἐν','dativo','en'),
 w('αὐτῷ','αὐτός','RP','dativo singular masculino','él'),
 noun('ζωὴ','ζωή','nominativo singular femenino','vida'),
 verb('ἦν','εἰμί','imperfecto indicativo activo · 3.ª singular','existía'),
 con('καὶ','καί','y'),
 article('ἡ','nominativo singular femenino','la'),
 noun('ζωὴ','ζωή','nominativo singular femenino','vida'),
 verb('ἦν','εἰμί','imperfecto indicativo activo · 3.ª singular','era'),
 article('τὸ','nominativo singular neutro','la'),
 noun('φῶς','φῶς','nominativo singular neutro','luz'),
 article('τῶν','genitivo plural masculino','de los'),
 noun('ἀνθρώπων','ἄνθρωπος','genitivo plural masculino','seres humanos')
],null,{hideTranslation:true,readingNote:'El manual ofrece extractos de Juan 1:1–4 con una omisión indicada. Esta ficha es material de consulta; la traducción completa permanece oculta por tratarse del ejercicio final.'});
ex(96,'LV 4 · separación','Genitivo de origen frente a acusativo de destino',[
 pre('ἀπὸ','ἀπό','genitivo','desde'),article('τοῦ','genitivo singular neutro','el'),
 noun('ἱεροῦ','ἱερόν','genitivo singular neutro','templo'),
 pre('εἰς','εἰς','acusativo','hacia dentro de'),article('τὴν','acusativo singular femenino','la'),
 noun('οἰκίαν','οἰκία','acusativo singular femenino','casa')
],'Desde el templo hacia el interior de la casa.');
ex(97,'LV 4 · cierre','Preposición ante vocal; la elisión no siempre es obligatoria en el NT',[
 pre('παρὰ','παρά','genitivo','de parte de'),noun('ἀνθρώπων','ἄνθρωπος','genitivo plural masculino','personas')
],'De parte de las personas.');
rd.chapterFour=all;
rd.chapterFourMeta={
 source:'Duff, cap. 4, pp. 81–97; cotejo del PDF privado. Citas breves del NT: SBLGNT © 2010; análisis MorphGNT CC BY-SA 3.0; glosas propias.',
 notice:'Las tablas y ejemplos son material de estudio original. Los ejercicios guardados no se corrigen automáticamente.',
 pages:Array.from(new Set(all.map(x=>x.page))).sort((a,b)=>a-b)
};
window.GREEK_READER=rd;
})();