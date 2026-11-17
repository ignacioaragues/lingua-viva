/* Lengua Viva · Duff 5 · Los adjetivos · PDF privado pp.98–113.
   Paradigmas y ejemplos propios, citas bíblicas breves SBLGNT © 2010
   https://sblgnt.com/ ; glosas/traducciones propias.
   Sección C (Mt 12:35; 2 Co 13:13): NO se muestran soluciones. */
(function(){
'use strict';
var rd=window.GREEK_READER;if(!rd)return;
var all=[],ids=new Set(),cs=['nominativo','acusativo','genitivo','dativo','nominativo','acusativo','genitivo','dativo'],ns=['singular','singular','singular','singular','plural','plural','plural','plural'];
function t(form,lemma,cat,morph,gloss){return {form,lemma,cat,morph,gloss};}
function add(page,ref,kind,theme,words,translation,options){
 if(ids.has(ref))throw Error('Ref duplicada '+ref);ids.add(ref);
 if(page<98||page>113||!words.length||words.some(x=>!x.form||!x.lemma||!x.cat||!x.morph||!x.gloss))throw Error('Ficha inválida '+ref);
 all.push(Object.assign({page,ref,kind,theme,words,translation},options||{}));
}
function para(page,lemma,gender,forms,gloss){
 add(page,'Duff 5 · '+lemma+' · '+gender,'paradigm','Adjetivo: '+lemma+' · '+gender,forms.map((f,i)=>t(f,lemma,'A-',cs[i]+' '+ns[i]+' · '+gender,gloss)), 'Orden de los casos: nominativo, acusativo, genitivo y dativo; primero singular, luego plural.');
}
function triples(page,lemma,masc,fem,neut,gloss){para(page,lemma,'masculino',masc,gloss);para(page,lemma,'femenino',fem,gloss);para(page,lemma,'neutro',neut,gloss);}
function lemma(page,ref,items){add(page,ref,'lexicon','Vocabulario del capítulo',items.map(x=>t(x[0],x[0],x[2]||'A-','forma de diccionario',x[1])),null);}
function verse(page,ref,theme,words,translation,hide){
 add(page,ref,'biblical',theme,words.map(x=>t(x[0],x[1],x[2],x[3],x[4])),hide?null:translation,hide?{hideTranslation:true,readingNote:'Ejercicio final de traducción: no se revela la solución. Las fichas individuales están disponibles.'}:{readingNote:'Cita bíblica breve con análisis contextual y traducción propia.'});
}
function ex(page,ref,theme,words,translation){add(page,ref,'original',theme,words.map(x=>t(x[0],x[1],x[2],x[3],x[4])),translation);}
triples(98,'ἀγαθός',
 ['ἀγαθός','ἀγαθόν','ἀγαθοῦ','ἀγαθῷ','ἀγαθοί','ἀγαθούς','ἀγαθῶν','ἀγαθοῖς'],
 ['ἀγαθή','ἀγαθήν','ἀγαθῆς','ἀγαθῇ','ἀγαθαί','ἀγαθάς','ἀγαθῶν','ἀγαθαῖς'],
 ['ἀγαθόν','ἀγαθόν','ἀγαθοῦ','ἀγαθῷ','ἀγαθά','ἀγαθά','ἀγαθῶν','ἀγαθοῖς'],'bueno');
triples(99,'ἅγιος',
 ['ἅγιος','ἅγιον','ἁγίου','ἁγίῳ','ἅγιοι','ἁγίους','ἁγίων','ἁγίοις'],
 ['ἁγία','ἁγίαν','ἁγίας','ἁγίᾳ','ἅγιαι','ἁγίας','ἁγίων','ἁγίαις'],
 ['ἅγιον','ἅγιον','ἁγίου','ἁγίῳ','ἅγια','ἅγια','ἁγίων','ἁγίοις'],'santo');
ex(100,'LV 5 · adjetivo atributivo','Adjetivo dentro del sintagma nominal',[
 ['ἡ','ὁ','RA','nominativo singular femenino','la'],['καλή','καλός','A-','nominativo singular femenino','hermosa'],['γῆ','γῆ','N-','nominativo singular femenino','tierra']
],'La tierra hermosa.');
ex(100,'LV 5 · segundo artículo','Adjetivo pospuesto con artículo repetido',[
 ['ὁ','ὁ','RA','nominativo singular masculino','el'],['λόγος','λόγος','N-','nominativo singular masculino','mensaje'],['ὁ','ὁ','RA','nominativo singular masculino','el'],['ἀγαθός','ἀγαθός','A-','nominativo singular masculino','bueno']
],'El buen mensaje.');
add(101,'Duff 5 · εἰμί','paradigm','Presente de indicativo de εἰμί',[
 t('εἰμί','εἰμί','V-','presente indicativo · 1.ª singular','soy, estoy'),
 t('εἶ','εἰμί','V-','presente indicativo · 2.ª singular','sos, estás'),
 t('ἐστίν','εἰμί','V-','presente indicativo · 3.ª singular','es, está'),
 t('ἐσμέν','εἰμί','V-','presente indicativo · 1.ª plural','somos, estamos'),
 t('ἐστέ','εἰμί','V-','presente indicativo · 2.ª plural','son, están'),
 t('εἰσίν','εἰμί','V-','presente indicativo · 3.ª plural','son, están')
],'Formas personales del presente de εἰμί.');
ex(102,'LV 5 · predicativo','Adjetivo predicativo sin artículo',[
 ['ὁ','ὁ','RA','nominativo singular masculino','el'],['νόμος','νόμος','N-','nominativo singular masculino','ley'],['ἀγαθός','ἀγαθός','A-','nominativo singular masculino','bueno']
],'La ley es buena.');
ex(103,'LV 5 · verbo expreso','Adjetivo predicativo con cópula',[
 ['ὁ','ὁ','RA','nominativo singular masculino','el'],['κύριος','κύριος','N-','nominativo singular masculino','señor'],['ἐστίν','εἰμί','V-','presente indicativo · 3.ª singular','es'],['δίκαιος','δίκαιος','A-','nominativo singular masculino','justo']
],'El señor es justo.');
ex(104,'LV 5 · adjetivo sustantivado','El artículo permite sustantivar el adjetivo',[
 ['οἱ','ὁ','RA','nominativo plural masculino','los'],['ἀγαθοί','ἀγαθός','A-','nominativo plural masculino','buenos'],['εἰσίν','εἰμί','V-','presente indicativo · 3.ª plural','son'],['πιστοί','πιστός','A-','nominativo plural masculino','fieles']
],'Los buenos son fieles.');
ex(105,'LV 5 · artículo y adjetivo','Adjetivo sustantivado en femenino',[
 ['αἱ','ὁ','RA','nominativo plural femenino','las'],['ἅγιαι','ἅγιος','A-','nominativo plural femenino','santas']
],'Las santas.');
triples(105,'πολύς',
 ['πολύς','πολύν','πολλοῦ','πολλῷ','πολλοί','πολλούς','πολλῶν','πολλοῖς'],
 ['πολλή','πολλήν','πολλῆς','πολλῇ','πολλαί','πολλάς','πολλῶν','πολλαῖς'],
 ['πολύ','πολύ','πολλοῦ','πολλῷ','πολλά','πολλά','πολλῶν','πολλοῖς'],'mucho, numerosos');
triples(106,'μέγας',
 ['μέγας','μέγαν','μεγάλου','μεγάλῳ','μεγάλοι','μεγάλους','μεγάλων','μεγάλοις'],
 ['μεγάλη','μεγάλην','μεγάλης','μεγάλῃ','μεγάλαι','μεγάλας','μεγάλων','μεγάλαις'],
 ['μέγα','μέγα','μεγάλου','μεγάλῳ','μεγάλα','μεγάλα','μεγάλων','μεγάλοις'],'grande');
ex(107,'LV 5 · énfasis inicial','Orden flexible de los constituyentes',[
 ['τὸν','ὁ','RA','acusativo singular masculino','al'],['λόγον','λόγος','N-','acusativo singular masculino','mensaje'],
 ['ὁ','ὁ','RA','nominativo singular masculino','el'],['κύριος','κύριος','N-','nominativo singular masculino','señor'],['λέγει','λέγω','V-','presente indicativo activo · 3.ª singular','dice']
],'El señor dice el mensaje (con énfasis en «el mensaje»).');
ex(108,'LV 5 · existencial','εἰμί al principio de la oración',[
 ['ἔστιν','εἰμί','V-','presente indicativo · 3.ª singular','hay'],['ἄγγελος','ἄγγελος','N-','nominativo singular masculino','ángel'],
 ['ἐν','ἐν','P-','rige dativo','en'],['τῷ','ὁ','RA','dativo singular masculino','el'],['οὐρανῷ','οὐρανός','N-','dativo singular masculino','cielo']
],'Hay un ángel en el cielo.');
ex(109,'LV 5 · predicado nominal','Sujeto con artículo; predicado sin artículo',[
 ['κύριος','κύριος','N-','nominativo singular masculino · predicado','señor'],['ἐστίν','εἰμί','V-','presente indicativo · 3.ª singular','es'],['ὁ','ὁ','RA','nominativo singular masculino','el'],['υἱός','υἱός','N-','nominativo singular masculino · sujeto','hijo']
],'El hijo es señor.');
lemma(109,'Duff 5 · adjetivos I',[
 ['ἀγαθός','bueno'],['ἀγαπητός','amado'],['ἅγιος','santo'],['δίκαιος','justo'],['ἕκαστος','cada uno'],['ἕτερος','otro'],['ἴδιος','propio'],['Ἰουδαῖος','judío'],['κακός','malo'],['καλός','hermoso'],['καινός','nuevo']
]);
lemma(110,'Duff 5 · adjetivos II',[
 ['μακάριος','dichoso'],['μόνος','único'],['νεκρός','muerto'],['ὅσος','cuanto'],['πιστός','fiel'],['πονηρός','malvado'],['τυφλός','ciego'],['μέγας','grande'],['πολύς','mucho'],['αἰώνιος','eterno']
]);
lemma(110,'Duff 5 · conjunciones',[
 ['ἀλλά','pero','C-'],['ἤ','o','C-'],['εἰ','si','C-'],['ὡς','como','C-']
]);
lemma(110,'Duff 5 · sustantivos y verbo',[
 ['Γαλιλαία','Galilea','N-'],['κεφαλή','cabeza','N-'],['εἰρήνη','paz','N-'],['συναγωγή','sinagoga','N-'],['καιρός','ocasión','N-'],['εἰμί','ser, estar','V-']
]);
lemma(111,'Duff 5 · Jerusalén y eterno',[
 ['Ἱεροσόλυμα','Jerusalén (plural neutro)','N-'],['Ἰερουσαλήμ','Jerusalén (indeclinable)','N-'],['αἰώνιος','eterno (adjetivo de dos terminaciones)']
]);
ex(111,'LV 5 · eternidad','Adjetivo de dos terminaciones',[
 ['ἡ','ὁ','RA','nominativo singular femenino','la'],['αἰώνιος','αἰώνιος','A-','nominativo singular femenino · dos terminaciones','eterna'],['ζωή','ζωή','N-','nominativo singular femenino','vida']
],'La vida eterna.');
ex(113,'LV 5 · repaso','Sujeto y predicado con artículo y adjetivo',[
 ['ἡ','ὁ','RA','nominativo singular femenino','la'],['εἰρήνη','εἰρήνη','N-','nominativo singular femenino','paz'],['ἐστίν','εἰμί','V-','presente indicativo · 3.ª singular','es'],['ἀγαθή','ἀγαθός','A-','nominativo singular femenino','buena']
],'La paz es buena.');
verse(98,'Apocalipsis 21:1 · extracto','Adjetivos atributivos en acusativo',[
 ['εἶδον','ὁράω','V-','aoristo indicativo activo · 1.ª singular','vi'],['οὐρανὸν','οὐρανός','N-','acusativo singular masculino','cielo'],['καινὸν','καινός','A-','acusativo singular masculino','nuevo'],['καὶ','καί','C-','conjunción','y'],['γῆν','γῆ','N-','acusativo singular femenino','tierra'],['καινήν','καινός','A-','acusativo singular femenino','nueva']
],'Vi un cielo nuevo y una tierra nueva.');
verse(101,'Mateo 4:3 · extracto','εἰ (si) frente a εἶ (sos)',[
 ['εἰ','εἰ','C-','conjunción condicional','si'],['υἱὸς','υἱός','N-','nominativo singular masculino','hijo'],['εἶ','εἰμί','V-','presente indicativo · 2.ª singular','sos'],['τοῦ','ὁ','RA','genitivo singular masculino','de'],['θεοῦ','θεός','N-','genitivo singular masculino','Dios']
],'Si sos hijo de Dios.');
verse(103,'Romanos 7:12 · extracto','Adjetivo predicativo',[
 ['ὁ','ὁ','RA','nominativo singular masculino','la'],['νόμος','νόμος','N-','nominativo singular masculino','ley'],['ἅγιος','ἅγιος','A-','nominativo singular masculino','santa']
],'La ley es santa.');
verse(104,'Mateo 5:8 · extracto','Adjetivo sustantivado',[
 ['μακάριοι','μακάριος','A-','nominativo plural masculino','bienaventurados'],['οἱ','ὁ','RA','nominativo plural masculino','los'],['καθαροὶ','καθαρός','A-','nominativo plural masculino','limpios'],['τῇ','ὁ','RA','dativo singular femenino','de'],['καρδίᾳ','καρδία','N-','dativo singular femenino','corazón']
],'Dichosos los limpios de corazón.');
verse(105,'Marcos 1:34 · extracto','πολλούς y cantidad',[
 ['καὶ','καί','C-','conjunción','y'],['ἐθεράπευσεν','θεραπεύω','V-','aoristo indicativo activo · 3.ª singular','sanó'],['πολλοὺς','πολύς','A-','acusativo plural masculino','a muchos']
],'Y sanó a muchos.');
verse(105,'Marcos 1:26 · extracto','φωνῇ μεγάλῃ',[
 ['φωνῇ','φωνή','N-','dativo singular femenino','voz'],['μεγάλῃ','μέγας','A-','dativo singular femenino','grande']
],'Con gran voz.');
verse(109,'Marcos 2:28 · extracto','Sujeto y predicado nominal',[
 ['κύριός','κύριος','N-','nominativo singular masculino · predicado','señor'],['ἐστιν','εἰμί','V-','presente indicativo · 3.ª singular','es'],['ὁ','ὁ','RA','nominativo singular masculino','el'],['υἱὸς','υἱός','N-','nominativo singular masculino','hijo'],['τοῦ','ὁ','RA','genitivo singular masculino','del'],['ἀνθρώπου','ἄνθρωπος','N-','genitivo singular masculino','hombre']
],'El hijo del hombre es señor.');
verse(109,'Juan 1:1 · extracto','Predicado antepuesto sin artículo',[
 ['θεὸς','θεός','N-','nominativo singular masculino · predicado','Dios'],['ἦν','εἰμί','V-','imperfecto indicativo activo · 3.ª singular','era'],['ὁ','ὁ','RA','nominativo singular masculino','el'],['λόγος','λόγος','N-','nominativo singular masculino · sujeto','Verbo']
],'El Verbo era Dios.');
verse(112,'Mateo 12:35 · ejercicio C','Traducción reservada',[
 ['ὁ','ὁ','RA','nominativo singular masculino','el'],['ἀγαθὸς','ἀγαθός','A-','nominativo singular masculino','bueno'],['ἄνθρωπος','ἄνθρωπος','N-','nominativo singular masculino','hombre'],['ἐκ','ἐκ','P-','preposición con genitivo','de'],['τοῦ','ὁ','RA','genitivo singular masculino','del'],['ἀγαθοῦ','ἀγαθός','A-','genitivo singular masculino','bueno'],['θησαυροῦ','θησαυρός','N-','genitivo singular masculino','tesoro'],['ἐκβάλλει','ἐκβάλλω','V-','presente indicativo activo · 3.ª singular','saca'],['ἀγαθά','ἀγαθός','A-','acusativo plural neutro','cosas buenas']
],null,true);
verse(112,'2 Corintios 13:13 · ejercicio C','Traducción reservada',[
 ['ἡ','ὁ','RA','nominativo singular femenino','la'],['χάρις','χάρις','N-','nominativo singular femenino','gracia'],['τοῦ','ὁ','RA','genitivo singular masculino','del'],['κυρίου','κύριος','N-','genitivo singular masculino','señor'],['Ἰησοῦ','Ἰησοῦς','N-','genitivo singular masculino','Jesús'],['Χριστοῦ','Χριστός','N-','genitivo singular masculino','Cristo'],['καὶ','καί','C-','conjunción','y'],['ἡ','ὁ','RA','nominativo singular femenino','la'],['ἀγάπη','ἀγάπη','N-','nominativo singular femenino','amor'],['τοῦ','ὁ','RA','genitivo singular masculino','de'],['θεοῦ','θεός','N-','genitivo singular masculino','Dios']
],null,true);
rd.chapterFive=all;
rd.chapterFiveMeta={source:'Duff, cap. 5, PDF privado pp. 98–113; ejemplos propios y citas breves SBLGNT © 2010 (sblgnt.com).',notice:'Paradigmas y fichas contextualizadas. Las secciones finales de traducción no muestran soluciones.'};
})();