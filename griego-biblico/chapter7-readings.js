/* Lengua Viva · Duff 7 «Los modos de los verbos», PDF privado pp.134–148.
   Paradigmas, glosas y ejemplos originales; citas breves identificadas en Duff.
   SBLGNT ©2010 https://sblgnt.com/; MorphGNT (Tauber) CC BY-SA 3.0.
   1 Juan 3:4–10 es el ejercicio final: no se publica su traducción ni una solución. */
(function(){
'use strict';
const rd=window.GREEK_READER;if(!rd)return;
const rows=[],refs=new Set();
function t(form,lemma,cat,morph,gloss){return {form,lemma,cat,morph,gloss};}
function add(page,ref,kind,theme,words,translation,options){
 if(page<134||page>148||refs.has(ref)||!words.length||words.some(w=>!w.form||!w.lemma||!w.cat||!w.morph||!w.gloss))throw Error('Ficha incompleta '+ref);
 refs.add(ref);rows.push(Object.assign({page,ref,kind,theme,words,translation},options||{}));
}
function paradigm(page,ref,theme,forms,lemma,gloss,morphs){
 add(page,ref,'paradigm',theme,forms.map((f,i)=>t(f,lemma,'V-',morphs[i],gloss)),null);
}
function lex(page,ref,theme,items){add(page,ref,'lexicon',theme,items.map(x=>t(x[0],x[2]||x[0],x[3]||'N-',x[4]||'nominativo singular · lema',x[1])),null);}
function ex(page,ref,theme,words,translation){add(page,ref,'original',theme,words.map(w=>t(...w)),translation);}
function verse(page,ref,theme,words,translation,hide){
 add(page,ref,'biblical',theme,words.map(w=>t(...w)),hide?null:translation,hide?{hideTranslation:true,readingNote:'Fragmento de la sección final: traducción completa reservada para tu ejercicio.'}:{readingNote:'Fragmento bíblico breve con traducción y análisis propios; consultar variantes textuales en una edición crítica.'});
}
const L={
article:['ὁ','RA','nominativo singular masculino','el'],
god:['θεός','N-','acusativo singular masculino','Dios'],
word:['λόγος','N-','acusativo singular masculino','palabra'],
and:['καί','C-','conjunción','y']
};
const g=(form,lemma,cat,morph,gloss)=>[form,lemma,cat,morph,gloss];
const moods=['imperativo presente activo · 2.ª singular','imperativo presente activo · 2.ª plural','imperativo aoristo activo · 2.ª singular','imperativo aoristo activo · 2.ª plural'];
paradigm(135,'Duff 7 · λύω · imperativo','Presente y aoristo; singular y plural',['λῦε','λύετε','λῦσον','λύσατε'],'λύω','desatar',moods);
paradigm(136,'Duff 7 · φιλέω · imperativo','Verbo contracto en -έω',['φίλει','φιλεῖτε','φίλησον','φιλήσατε'],'φιλέω','amar',moods);
ex(134,'LV 7 · negación modal','El imperativo usa μή, no οὐ',[
 g('μὴ','μή','D-','partícula de negación no indicativa','no'),g('λύετε','λύω','V-',moods[1],'desaten')
],'No desaten.');
verse(135,'Hechos 16:31 · cita','Imperativo aoristo',[
 g('Πίστευσον','πιστεύω','V-',moods[2],'cree'),g('ἐπὶ','ἐπί','P-','preposición con acusativo','en'),g('τὸν','ὁ','RA','acusativo singular masculino','el'),g('κύριον','κύριος','N-','acusativo singular masculino','Señor'),g('Ἰησοῦν','Ἰησοῦς','N-','acusativo singular masculino','Jesús')
],'Cree en el Señor Jesús.');
verse(136,'Mateo 27:42 · cita','Futuro indicativo frente a imperativo',[
 g('πιστεύσομεν','πιστεύω','V-','futuro indicativo activo · 1.ª plural','creeremos'),g('ἐπ','ἐπί','P-','preposición elidida con acusativo','en'),g('αὐτόν','αὐτός','RP','acusativo singular masculino','él')
],'Creeremos en él.');
ex(137,'LV 7 · contraste imperativo','Aspecto: proceso y acción no delimitada',[
 g('κήρυσσε','κηρύσσω','V-',moods[0],'proclamá continuamente'),g('καὶ','καί','C-','conjunción','y'),g('γράψον','γράφω','V-',moods[2],'escribí')
],'Seguí proclamando y escribí.');
paradigm(137,'Duff 7 · λύω · infinitivo','Infinitivo: presente y aoristo',['λύειν','λῦσαι'],'λύω','desatar',['infinitivo presente activo','infinitivo aoristo activo']);
paradigm(138,'Duff 7 · φιλέω · infinitivo','Infinitivo contracto',['φιλεῖν','φιλῆσαι'],'φιλέω','amar',['infinitivo presente activo','infinitivo aoristo activo']);
verse(137,'Juan 16:12 · cita','Infinitivo con verbo principal',[
 g('Πολλὰ','πολύς','A-','acusativo plural neutro','muchas cosas'),g('ἔχω','ἔχω','V-','presente indicativo activo · 1.ª singular','tengo'),g('ὑμῖν','σύ','RP','dativo plural · 2.ª persona','a ustedes'),g('λέγειν','λέγω','V-','infinitivo presente activo','decir')
],'Tengo muchas cosas que decirles.');
verse(138,'Marcos 3:14–15 · cita','Infinitivos de propósito',[
 g('ἔχειν','ἔχω','V-','infinitivo presente activo','tener'),g('ἐξουσίαν','ἐξουσία','N-','acusativo singular femenino','autoridad'),g('ἐκβάλλειν','ἐκβάλλω','V-','infinitivo presente activo','expulsar'),g('τὰ','ὁ','RA','acusativo plural neutro','los'),g('δαιμόνια','δαιμόνιον','N-','acusativo plural neutro','demonios')
],'Tener autoridad para expulsar demonios.');
ex(138,'LV 7 · infinitivo de propósito','Ejemplo original con θέλω',[
 g('θέλω','θέλω','V-','presente indicativo activo · 1.ª singular','quiero'),g('γράψαι','γράφω','V-','infinitivo aoristo activo','escribir'),g('τὸ','ὁ','RA','acusativo singular neutro','el'),g('βιβλίον','βιβλίον','N-','acusativo singular neutro','libro')
],'Quiero escribir el libro.');
ex(139,'LV 7 · impersonal','δεῖ con infinitivo',[
 g('δεῖ','δεῖ','V-','presente indicativo activo · 3.ª singular impersonal','es necesario'),g('ἀκούειν','ἀκούω','V-','infinitivo presente activo','escuchar')
],'Es necesario escuchar.');
const participle=['participio presente activo · nominativo singular masculino','participio presente activo · nominativo plural masculino','participio aoristo activo · nominativo singular masculino','participio aoristo activo · nominativo plural masculino'];
paradigm(140,'Duff 7 · λύω · participio','Masculino nominativo; presente y aoristo',['λύων','λύοντες','λύσας','λύσαντες'],'λύω','desatar',participle);
paradigm(141,'Duff 7 · φιλέω · participio','Participios del verbo contracto',['φιλῶν','φιλοῦντες','φιλήσας','φιλήσαντες'],'φιλέω','amar',participle);
verse(139,'Filemón 4–5 · cita','Participio presente de simultaneidad',[
 g('Εὐχαριστῶ','εὐχαριστέω','V-','presente indicativo activo · 1.ª singular','doy gracias'),g('τῷ','ὁ','RA','dativo singular masculino','a'),g('θεῷ','θεός','N-','dativo singular masculino','Dios'),g('ἀκούων','ἀκούω','V-',participle[0],'oyendo'),g('σου','σύ','RP','genitivo singular · 2.ª persona','de vos'),g('τὴν','ὁ','RA','acusativo singular femenino','el'),g('ἀγάπην','ἀγάπη','N-','acusativo singular femenino','amor')
],'Doy gracias a Dios al enterarme de tu amor.');
verse(139,'Hechos 18:8 · cita','Participio presente nominativo plural',[
 g('πολλοὶ','πολύς','A-','nominativo plural masculino','muchos'),g('τῶν','ὁ','RA','genitivo plural masculino','de los'),g('Κορινθίων','Κορίνθιος','N-','genitivo plural masculino','corintios'),g('ἀκούοντες','ἀκούω','V-',participle[1],'oyendo'),g('ἐπίστευον','πιστεύω','V-','imperfecto indicativo activo · 3.ª plural','creían')
],'Muchos de los corintios escuchaban y creían.');
ex(140,'LV 7 · participio presente','Ejemplo original de simultaneidad',[
 g('ὁ','ὁ','RA','nominativo singular masculino','el'),g('μαθητὴς','μαθητής','N-','nominativo singular masculino','discípulo'),g('ἀκούων','ἀκούω','V-',participle[0],'escuchando'),g('γράφει','γράφω','V-','presente indicativo activo · 3.ª singular','escribe')
],'El discípulo escribe mientras escucha.');
ex(141,'LV 7 · participio aoristo','Ejemplo original de anterioridad',[
 g('λύσας','λύω','V-',participle[2],'habiendo desatado'),g('ὁ','ὁ','RA','nominativo singular masculino','el'),g('δοῦλος','δοῦλος','N-','nominativo singular masculino','siervo'),g('ἔφυγεν','φεύγω','V-','aoristo indicativo activo · 3.ª singular','huyó')
],'Después de desatar, el siervo huyó.');
verse(142,'Mateo 4:18 · cita','Participio presente con complemento',[
 g('Περιπατῶν','περιπατέω','V-',participle[0],'caminando'),g('παρὰ','παρά','P-','preposición con acusativo','junto a'),g('τὴν','ὁ','RA','acusativo singular femenino','el'),g('θάλασσαν','θάλασσα','N-','acusativo singular femenino','mar'),g('τῆς','ὁ','RA','genitivo singular femenino','de'),g('Γαλιλαίας','Γαλιλαία','N-','genitivo singular femenino','Galilea'),g('εἶδεν','ὁράω','V-','aoristo indicativo activo · 3.ª singular','vio'),g('δύο','δύο','A-','numeral indeclinable','dos'),g('ἀδελφούς','ἀδελφός','N-','acusativo plural masculino','hermanos')
],'Mientras caminaba junto al mar de Galilea, vio a dos hermanos.');
verse(142,'Marcos 6:16 · cita','Participio aoristo: secuencia',[
 g('ἀκούσας','ἀκούω','V-',participle[2],'habiendo oído'),g('δὲ','δέ','C-','conjunción','pero'),g('ὁ','ὁ','RA','nominativo singular masculino','el'),g('Ἡρῴδης','Ἡρῴδης','N-','nominativo singular masculino','Herodes'),g('ἔλεγεν','λέγω','V-','imperfecto indicativo activo · 3.ª singular','decía')
],'Pero Herodes, al oírlo, decía…');
ex(143,'LV 7 · objeto del participio','El participio rige un objeto directo',[
 g('ἀκούσας','ἀκούω','V-',participle[2],'tras escuchar'),g('τὸν','ὁ','RA','acusativo singular masculino','el'),g('λόγον','λόγος','N-','acusativo singular masculino','mensaje'),g('ὁ','ὁ','RA','nominativo singular masculino','el'),g('μαθητὴς','μαθητής','N-','nominativo singular masculino','discípulo'),g('ἔγραψεν','γράφω','V-','aoristo indicativo activo · 3.ª singular','escribió')
],'Tras escuchar el mensaje, el discípulo escribió.');
verse(144,'Marcos 4:14 · cita','Participio sustantivado',[
 g('ὁ','ὁ','RA','nominativo singular masculino','el'),g('σπείρων','σπείρω','V-',participle[0],'el que siembra'),g('τὸν','ὁ','RA','acusativo singular masculino','el'),g('λόγον','λόγος','N-','acusativo singular masculino','mensaje'),g('σπείρει','σπείρω','V-','presente indicativo activo · 3.ª singular','siembra')
],'El sembrador siembra el mensaje.');
verse(144,'Marcos 4:18 · cita','Participio sustantivado en plural',[
 g('οὗτοί','οὗτος','RD','nominativo plural masculino','estos'),g('εἰσιν','εἰμί','V-','presente indicativo activo · 3.ª plural','son'),g('οἱ','ὁ','RA','nominativo plural masculino','los'),g('τὸν','ὁ','RA','acusativo singular masculino','el'),g('λόγον','λόγος','N-','acusativo singular masculino','mensaje'),g('ἀκούσαντες','ἀκούω','V-',participle[3],'quienes escucharon')
],'Estos son los que escucharon el mensaje.');
lex(145,'Duff 7 · sustantivos','Sustantivos del vocabulario',[
 ['δικαιοσύνη','justicia'],['ἐντολή','mandamiento'],['ἐξουσία','autoridad'],['παραβολή','parábola'],['παρρησία','franqueza'],['χαρά','alegría'],
 ['ἀπόστολος','apóstol'],['θάνατος','muerte'],['ὀφθαλμός','ojo'],['Φαρισαῖος','fariseo'],['θηρίον','fiera'],['ἱμάτιον','manto'],['μνημεῖον','sepulcro'],['πρόβατον','oveja']
]);
lex(145,'Duff 7 · verbos','Verbos del vocabulario',[
 ['ἀκολουθέω','seguir','ἀκολουθέω','V-','presente indicativo activo · 1.ª singular; dativo'],
 ['ἀνάγω','hacer subir','ἀνάγω','V-','presente indicativo activo · 1.ª singular'],
 ['δέω','atar','δέω','V-','presente indicativo activo · 1.ª singular'],
 ['δοκέω','parecer','δοκέω','V-','presente indicativo activo · 1.ª singular'],
 ['ἐλεέω','tener compasión','ἐλεέω','V-','presente indicativo activo · 1.ª singular'],
 ['θέλω','querer','θέλω','V-','presente indicativo activo · 1.ª singular'],
 ['θεωρέω','contemplar','θεωρέω','V-','presente indicativo activo · 1.ª singular'],
 ['καταργέω','invalidar','καταργέω','V-','presente indicativo activo · 1.ª singular'],
 ['μαρτυρέω','testificar','μαρτυρέω','V-','presente indicativo activo · 1.ª singular'],
 ['μέλλω','estar por','μέλλω','V-','presente indicativo activo · 1.ª singular'],
 ['μετανοέω','arrepentirse','μετανοέω','V-','presente indicativo activo · 1.ª singular'],
 ['δεῖ','es necesario','δεῖ','V-','impersonal presente indicativo activo · 3.ª singular'],
 ['ἔξεστιν','está permitido','ἔξεστιν','V-','impersonal presente indicativo activo · 3.ª singular']
]);
lex(146,'Duff 7 · negativos','Negación no indicativa y preposición',[
 ['μή','no','μή','D-','negación no indicativa'],['μηδέ','ni','μηδέ','C-','conjunción negativa'],
 ['μηκέτι','ya no','μηκέτι','D-','adverbio negativo'],['μήτε','ni','μήτε','C-','conjunción negativa'],
 ['ὀπίσω','detrás de','ὀπίσω','P-','preposición con genitivo']
]);
ex(146,'LV 7 · exhortación','Ejemplo original: imperativo y dativo',[
 g('ἀκολούθει','ἀκολουθέω','V-','imperativo presente activo · 2.ª singular','seguí'),g('τῷ','ὁ','RA','dativo singular masculino','al'),g('κυρίῳ','κύριος','N-','dativo singular masculino','Señor')
],'Seguí al Señor.');
ex(147,'LV 7 · participio sustantivado','Ejemplo original: testimonio',[
 g('οἱ','ὁ','RA','nominativo plural masculino','los'),g('μαρτυροῦντες','μαρτυρέω','V-',participle[1],'que dan testimonio'),g('λέγουσιν','λέγω','V-','presente indicativo activo · 3.ª plural','dicen'),g('τὸν','ὁ','RA','acusativo singular masculino','el'),g('λόγον','λόγος','N-','acusativo singular masculino','mensaje')
],'Los que dan testimonio anuncian el mensaje.');
// La lectura final no es una traducción modelo. Solo un inventario morfológico de consulta.
verse(147,'1 Juan 3:4–10 · referencia final','Sección C: fragmento de consulta, sin traducción',[
 g('πᾶς','πᾶς','A-','nominativo singular masculino','todo'),g('ὁ','ὁ','RA','nominativo singular masculino','el'),
 g('ποιῶν','ποιέω','V-',participle[0],'que hace'),g('τὴν','ὁ','RA','acusativo singular femenino','la'),
 g('ἁμαρτίαν','ἁμαρτία','N-','acusativo singular femenino','pecado')
],null,true);
ex(148,'LV 7 · recapitulación','Tres modos en una secuencia original',[
 g('ἀκούειν','ἀκούω','V-','infinitivo presente activo','escuchar'),g('θέλω','θέλω','V-','presente indicativo activo · 1.ª singular','quiero'),
 g('ἀκούσας','ἀκούω','V-',participle[2],'tras escuchar'),g('γράψον','γράφω','V-',moods[2],'escribí')
],'Quiero escuchar; después de escuchar, escribí.');
rd.chapterSeven=rows;
rd.chapterSevenMeta={source:'Jeremy Duff, capítulo 7, PDF privado pp.134–148 cotejado; paradigmas y ejemplos de Lengua Viva. Citas bíblicas breves de referencia (SBLGNT ©2010; MorphGNT CC BY-SA 3.0).',notice:'Las glosas y traducciones son orientativas para las lecturas complementarias. La sección C, 1 Juan 3:4–10, no incluye traducción completa ni solución.'};
})();