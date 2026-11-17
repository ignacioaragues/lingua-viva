/* Lengua Viva · Duff capítulo 6 · Los tiempos de los verbos · PDF privado pp.114–133.
   Paradigmas, fichas y ejemplos propios. Citas breves cotejadas con referencias del
   manual; SBLGNT ©2010 https://sblgnt.com/; MorphGNT CC BY-SA 3.0.
   No se reproduce el ejercicio final ni su solución. */
(function(){
'use strict';
const rd=window.GREEK_READER;if(!rd)return;
const all=[],refs=new Set(),people=['1.ª singular','2.ª singular','3.ª singular','1.ª plural','2.ª plural','3.ª plural'];
function t(form,lemma,cat,morph,gloss){return {form,lemma,cat,morph,gloss};}
function add(page,ref,kind,theme,words,translation,options){
 if(refs.has(ref)||page<114||page>133||!words.length||words.some(w=>!w.form||!w.lemma||!w.cat||!w.morph||!w.gloss))throw Error('Ficha inválida: '+ref);
 refs.add(ref);all.push(Object.assign({page,ref,kind,theme,words,translation},options||{}));
}
function verb(page,lemma,tense,forms,gloss){
 add(page,'Duff 6 · '+lemma+' · '+tense,'paradigm','Flexión verbal · '+tense,forms.map((f,i)=>t(f,lemma,'V-',tense+' indicativo activo · '+people[i],gloss)), 'Orden: yo, vos/tú, él/ella, nosotros, ustedes/vosotros, ellos.');
}
function lex(page,ref,items){add(page,ref,'lexicon','Lemas y formas del capítulo',items.map(x=>t(x[0],x[2]||x[0],x[3]||'V-',x[4]||'forma de diccionario',x[1])),null);}
function ex(page,ref,theme,items,translation){add(page,ref,'original',theme,items.map(x=>t(...x)),translation);}
function verse(page,ref,theme,items,translation,hidden){
 add(page,ref,'biblical',theme,items.map(x=>t(...x)),hidden?null:translation,hidden?{hideTranslation:true,readingNote:'Fragmento de la sección C: la traducción queda reservada para la práctica. Las fichas léxicas no constituyen una solución.'}:{readingNote:'Fragmento bíblico breve; glosas y traducción propias.'});
}
const p=[
 ['λύω','λύεις','λύει','λύομεν','λύετε','λύουσιν'],
 ['λύσω','λύσεις','λύσει','λύσομεν','λύσετε','λύσουσιν'],
 ['ἔλυον','ἔλυες','ἔλυε','ἐλύομεν','ἐλύετε','ἔλυον'],
 ['ἔλυσα','ἔλυσας','ἔλυσε','ἐλύσαμεν','ἐλύσατε','ἔλυσαν']
];
verb(114,'λύω','presente',p[0],'desatar');
verb(115,'λύω','futuro',p[1],'desatar');
verb(116,'λύω','imperfecto',p[2],'desatar');
verb(117,'λύω','aoristo',p[3],'desatar');
ex(118,'LV 6 · acción puntual','Aoristo: acción pasada vista globalmente',[
 ['ὁ','ὁ','RA','nominativo singular masculino','el'],['ἄγγελος','ἄγγελος','N-','nominativo singular masculino','mensajero'],
 ['ἔλυσε','λύω','V-','aoristo indicativo activo · 3.ª singular','desató'],['τὸν','ὁ','RA','acusativo singular masculino','al'],['δοῦλον','δοῦλος','N-','acusativo singular masculino','siervo']
],'El mensajero liberó al siervo.');
ex(119,'LV 6 · proceso','Imperfecto: acción en curso en el pasado',[
 ['ὁ','ὁ','RA','nominativo singular masculino','el'],['ἄγγελος','ἄγγελος','N-','nominativo singular masculino','mensajero'],
 ['ἔλυε','λύω','V-','imperfecto indicativo activo · 3.ª singular','desataba'],['τὸν','ὁ','RA','acusativo singular masculino','al'],['δοῦλον','δοῦλος','N-','acusativo singular masculino','siervo']
],'El mensajero estaba desatando al siervo.');
verb(120,'πέμπω','presente',['πέμπω','πέμπεις','πέμπει','πέμπομεν','πέμπετε','πέμπουσιν'],'enviar');
ex(121,'LV 6 · contraste temporal','Imperfecto y futuro en una frase propia',[
 ['τότε','τότε','D-','adverbio temporal','entonces'],['ἔπεμπον','πέμπω','V-','imperfecto indicativo activo · 3.ª plural','enviaban'],
 ['νῦν','νῦν','D-','adverbio temporal','ahora'],['πέμψουσιν','πέμπω','V-','futuro indicativo activo · 3.ª plural','enviarán']
],'Entonces enviaban; ahora enviarán.');
verb(122,'ἀκούω','imperfecto',['ἤκουον','ἤκουες','ἤκουε','ἠκούομεν','ἠκούετε','ἤκουον'],'oír');
verb(123,'ἀκούω','aoristo',['ἤκουσα','ἤκουσας','ἤκουσε','ἠκούσαμεν','ἠκούσατε','ἤκουσαν'],'oír');
ex(123,'LV 6 · aumento en compuesto','El aumento se sitúa después de la preposición',[
 ['ἀπέλυσα','ἀπολύω','V-','aoristo indicativo activo · 1.ª singular','liberé'],['τὸν','ὁ','RA','acusativo singular masculino','al'],['δοῦλον','δοῦλος','N-','acusativo singular masculino','siervo']
],'Liberé al siervo.');
verb(124,'βλέπω','futuro',['βλέψω','βλέψεις','βλέψει','βλέψομεν','βλέψετε','βλέψουσιν'],'ver');
verb(125,'γράφω','futuro',['γράψω','γράψεις','γράψει','γράψομεν','γράψετε','γράψουσιν'],'escribir');
verb(126,'γράφω','aoristo',['ἔγραψα','ἔγραψας','ἔγραψε','ἐγράψαμεν','ἐγράψατε','ἔγραψαν'],'escribir');
lex(127,'Duff 6 · irregulares',[
 ['ἔχω','tener'],['εἶχον','tenía','ἔχω','V-','imperfecto indicativo activo · 1.ª singular'],
 ['ἕξω','tendré','ἔχω','V-','futuro indicativo activo · 1.ª singular'],
 ['ἔσχον','tuve','ἔχω','V-','aoristo indicativo activo · 1.ª singular'],
 ['ἦγον','conducía','ἄγω','V-','imperfecto indicativo activo · 1.ª singular'],
 ['ἀνοίξω','abriré','ἀνοίγω','V-','futuro indicativo activo · 1.ª singular']
]);
verb(128,'φιλέω','presente',['φιλῶ','φιλεῖς','φιλεῖ','φιλοῦμεν','φιλεῖτε','φιλοῦσιν'],'amar');
verb(128,'φιλέω','futuro',['φιλήσω','φιλήσεις','φιλήσει','φιλήσομεν','φιλήσετε','φιλήσουσιν'],'amar');
verb(128,'φιλέω','imperfecto',['ἐφίλουν','ἐφίλεις','ἐφίλει','ἐφιλοῦμεν','ἐφιλεῖτε','ἐφίλουν'],'amar');
verb(128,'φιλέω','aoristo',['ἐφίλησα','ἐφίλησας','ἐφίλησε','ἐφιλήσαμεν','ἐφιλήσατε','ἐφίλησαν'],'amar');
lex(129,'Duff 6 · nuevos verbos',[
 ['ἀνοίγω','abrir'],['βαπτίζω','bautizar'],['γράφω','escribir'],['διώκω','perseguir'],
 ['δοξάζω','glorificar'],['κηρύσσω','proclamar'],['κράζω','gritar'],['πέμπω','enviar'],
 ['πείθω','persuadir'],['σῴζω','salvar'],['προσέχω','prestar atención'],['ὑπάρχω','existir'],
 ['ἀποκαλύπτω','revelar'],['αἰτέω','pedir'],['εὐλογέω','bendecir'],['εὐχαριστέω','agradecer'],['οἰκοδομέω','edificar']
]);
lex(130,'Duff 6 · adverbios temporales',[
 ['ἄρτι','ahora mismo','ἄρτι','D-'],['ἔτι','todavía','ἔτι','D-'],['ἤδη','ya','ἤδη','D-'],
 ['νῦν','ahora','νῦν','D-'],['σήμερον','hoy','σήμερον','D-'],['οὐκέτι','ya no','οὐκέτι','D-'],
 ['οὔπω','todavía no','οὔπω','D-'],['πάλιν','otra vez','πάλιν','D-'],
 ['πάντοτε','siempre','πάντοτε','D-'],['ποτέ','alguna vez','ποτέ','D-'],
 ['ὅτε','cuando','ὅτε','C-'],['τότε','entonces','τότε','D-']
]);
ex(131,'LV 6 · narración propia','Contraste entre aoristo y presente',[
 ['τότε','τότε','D-','adverbio temporal','entonces'],['ἔγραψα','γράφω','V-','aoristo indicativo activo · 1.ª singular','escribí'],
 ['νῦν','νῦν','D-','adverbio temporal','ahora'],['γράφω','γράφω','V-','presente indicativo activo · 1.ª singular','escribo']
],'Entonces escribí; ahora escribo.');
// Citas del manual: pasajes breves con análisis propio, no ejercicios resueltos.
verse(114,'Juan 14:1 · cita','Presente de πιστεύω',[
 ['πιστεύετε','πιστεύω','V-','presente indicativo activo · 2.ª plural','crean / creen'],
 ['εἰς','εἰς','P-','preposición con acusativo','en, hacia'],
 ['τὸν','ὁ','RA','acusativo singular masculino','al'],
 ['θεόν','θεός','N-','acusativo singular masculino','Dios']
],'Crean en Dios.');
verse(114,'Juan 11:48 · cita','Futuro de πιστεύω',[
 ['πάντες','πᾶς','A-','nominativo plural masculino','todos'],
 ['πιστεύσουσιν','πιστεύω','V-','futuro indicativo activo · 3.ª plural','creerán'],
 ['εἰς','εἰς','P-','preposición con acusativo','en'],
 ['αὐτόν','αὐτός','RP','acusativo singular masculino','él']
],'Todos creerán en él.');
verse(114,'Juan 7:5 · cita','Imperfecto de πιστεύω',[
 ['οὐδὲ','οὐδέ','C-','conjunción negativa','ni siquiera'],
 ['οἱ','ὁ','RA','nominativo plural masculino','los'],
 ['ἀδελφοὶ','ἀδελφός','N-','nominativo plural masculino','hermanos'],
 ['αὐτοῦ','αὐτός','RP','genitivo singular masculino','de él, sus'],
 ['ἐπίστευον','πιστεύω','V-','imperfecto indicativo activo · 3.ª plural','creían'],
 ['εἰς','εἰς','P-','preposición con acusativo','en'],
 ['αὐτόν','αὐτός','RP','acusativo singular masculino','él']
],'Ni siquiera sus hermanos creían en él.');
verse(114,'Juan 4:50 · cita','Aoristo de πιστεύω',[
 ['ἐπίστευσεν','πιστεύω','V-','aoristo indicativo activo · 3.ª singular','creyó'],
 ['ὁ','ὁ','RA','nominativo singular masculino','el'],
 ['ἄνθρωπος','ἄνθρωπος','N-','nominativo singular masculino','hombre'],
 ['τῷ','ὁ','RA','dativo singular masculino','a la'],
 ['λόγῳ','λόγος','N-','dativo singular masculino','palabra']
],'El hombre creyó en la palabra.');
verse(118,'Mateo 5:2 · cita','Aoristo e imperfecto narrativo',[
 ['ἀνοίξας','ἀνοίγω','V-','aoristo participio activo · nominativo singular masculino','habiendo abierto'],
 ['τὸ','ὁ','RA','acusativo singular neutro','la'],
 ['στόμα','στόμα','N-','acusativo singular neutro','boca'],
 ['αὐτοῦ','αὐτός','RP','genitivo singular masculino','su'],
 ['ἐδίδασκεν','διδάσκω','V-','imperfecto indicativo activo · 3.ª singular','enseñaba']
],'Abrió la boca y se puso a enseñar.');
// Juan 9:13–21 es el ejercicio final del capítulo. No se ofrece texto completo ni traducción.
// Dos extractos mínimos identifican el presente histórico y los tiempos, sin resolver el pasaje.
verse(131,'Juan 9:13 · sección C','Presente histórico; fragmento de consulta',[
 ['Ἄγουσιν','ἄγω','V-','presente indicativo activo · 3.ª plural','llevan'],
 ['αὐτὸν','αὐτός','RP','acusativo singular masculino','a él'],
 ['πρὸς','πρός','P-','preposición con acusativo','ante, hacia'],
 ['τοὺς','ὁ','RA','acusativo plural masculino','a los'],
 ['Φαρισαίους','Φαρισαῖος','N-','acusativo plural masculino','fariseos']
],null,true);
verse(132,'Juan 9:21 · sección C','Fragmento de consulta, traducción reservada',[
 ['πῶς','πῶς','D-','adverbio interrogativo','cómo'],
 ['δὲ','δέ','C-','conjunción','pero'],
 ['νῦν','νῦν','D-','adverbio temporal','ahora'],
 ['βλέπει','βλέπω','V-','presente indicativo activo · 3.ª singular','ve']
],null,true);
ex(133,'LV 6 · recapitulación','Ejemplo original: cuatro tiempos',[
 ['λύω','λύω','V-','presente indicativo activo · 1.ª singular','desato'],
 ['ἔλυον','λύω','V-','imperfecto indicativo activo · 1.ª singular','desataba'],
 ['ἔλυσα','λύω','V-','aoristo indicativo activo · 1.ª singular','desaté'],
 ['λύσω','λύω','V-','futuro indicativo activo · 1.ª singular','desataré']
],'Desato; desataba; desaté; desataré.');
rd.chapterSix=all;
rd.chapterSixMeta={source:'Duff, capítulo 6, PDF privado pp.114–133, cotejado. Paradigmas y ejemplos propios; citas breves del NT SBLGNT ©2010, sblgnt.com; análisis morfológico propio.',notice:'La sección C (Juan 9:13–21) conserva la actividad sin solución ni traducción completa; se ofrecen únicamente dos extractos de consulta.'};
})();