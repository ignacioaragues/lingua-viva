/* Lengua Viva · Duff 3 · los casos y el género
   Fuente de temas: PDF privado de Jeremy Duff, cap. 3, pp. 66–80.
   Lecturas didácticas y traducciones propias: no son las soluciones de Duff.
   Citas bíblicas cortas anotadas: Nuevo Testamento griego SBLGNT (Holmes, 2010),
   https://sblgnt.com/, conforme a su licencia de citas (SBLGNT EULA).
   Morfología cotejada con MorphGNT (James K. Tauber 6.12), CC BY-SA 3.0;
   https://github.com/morphgnt/sblgnt. Las glosas son de Lengua Viva.
   Marcos 1:1: se mantiene la variante υἱοῦ θεοῦ que trae el ejemplar
   de Duff, aunque SBLGNT omite esas dos palabras en su texto base.
   No mostrar la solución del ejercicio final. */
(function(){
'use strict';
var rd=window.GREEK_READER;if(!rd)return;
var all=[],seen=new Set(),dictionary=new Map(),cas=['nominativo','acusativo','genitivo','dativo','nominativo','acusativo','genitivo','dativo'];
var num=['singular','singular','singular','singular','plural','plural','plural','plural'];
function key(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u0344\u0346-\u036f]/g,'').replace(/ς/g,'σ').toLowerCase().replace(/[⸀⸁⸂⸃⸄⸅.,;··!?:()[\]«»]/g,'');}
function token(form,lemma,cat,morph,gloss){return {form:form,lemma:lemma,cat:cat,morph:morph,gloss:gloss};}
function put(form,lemma,cat,morph,gloss){var k=key(form);if(!dictionary.has(k))dictionary.set(k,token(form,lemma,cat,morph,gloss));}
function entry(page,ref,kind,theme,words,translation,opts){
 if(seen.has(ref))throw Error('Ref repetida '+ref);
 seen.add(ref);
 var w=words.map(function(x){return typeof x==='string'?make(x):x;});
 w.forEach(function(x){if(!x.form||!x.lemma||!x.cat||!x.morph||!x.gloss)throw Error('Falta ficha '+ref+' '+JSON.stringify(x));});
 all.push(Object.assign({page:page,ref:ref,kind:kind,theme:theme,words:w,translation:translation},opts||{}));
}
function make(form){var w=dictionary.get(key(form));if(!w)throw Error('Forma no registrada: '+form);return Object.assign({},w,{form:form});}
function parseWords(s){return s.split(/\s+/).filter(Boolean).map(make);}
function phrase(page,ref,text,translation,theme){entry(page,ref,'original',theme,parseWords(text),translation);}
function paradigm(page,ref,lemma,forms,gender,gloss,translation){
 var words=forms.map(function(form,i){
  var morph=cas[i]+' '+num[i]+(gender?' · '+gender:'');
  var tok=token(form,lemma,'N-',morph,gloss);
  put(form,lemma,'N-',morph,gloss);
  return tok;
 });
 entry(page,ref,'paradigm','Declinación: '+lemma,words,translation||'Orden: nom. sg. · ac. sg. · gen. sg. · dat. sg. · nom. pl. · ac. pl. · gen. pl. · dat. pl.');
}
function article(page,ref,forms,gender){
 var words=forms.map(function(form,i){
  var morph=cas[i]+' '+num[i]+' · '+gender;
  var tok=token(form,'ὁ','RA',morph,'artículo definido');
  put(form,'ὁ','RA',morph,'artículo definido');
  return tok;
 });
 entry(page,ref,'paradigm','Artículo definido · '+gender,words,'Orden: nom., ac., gen. y dat. en singular; luego los mismos casos en plural.');
}
function pronoun(page,ref,forms,gender){
 var words=forms.map(function(form,i){
  var morph=cas[i]+' '+num[i]+' · '+gender;
  var tok=token(form,'αὐτός','RP',morph,gender==='masculino'?'él, ellos / de él, a él':gender==='femenino'?'ella, ellas / de ella, a ella':'ello, ellos / de ello');
  put(form,'αὐτός','RP',morph,tok.gloss);
  return tok;
 });
 entry(page,ref,'paradigm','Pronombre αὐτός · '+gender,words,'Formas singulares y plurales del pronombre de tercera persona; el caso determina su función.');
}
function verb(lemma,forms,gloss){
 var person=['1.ª persona singular','2.ª persona singular','3.ª persona singular','1.ª persona plural','2.ª persona plural','3.ª persona plural'];
 forms.forEach(function(form,i){put(form,lemma,'V-','presente de indicativo activo · '+person[i],gloss);});
}
function vocab(page,ref,theme,list){
 var words=list.map(function(pair){
  var form=pair[0],lemma=pair[2]||form,cat=pair[3]||'N-',morph=pair[4]||'Forma de diccionario · nominativo singular',gloss=pair[1];
  var t=token(form,lemma,cat,morph,gloss);put(form,lemma,cat,morph,gloss);return t;
 });
 entry(page,ref,'lexicon',theme,words,'Lemas del capítulo; consultá cada palabra para estudiar su sentido y su género.');
}
// Primeros, lemas base que aparecen en ejemplos originales.
paradigm(66,'Duff 3 · λόγος (8 formas)','λόγος',['λόγος','λόγον','λόγου','λόγῳ','λόγοι','λόγους','λόγων','λόγοις'],'masculino','palabra, discurso');
article(66,'Duff 3 · artículo masculino',['ὁ','τόν','τοῦ','τῷ','οἱ','τούς','τῶν','τοῖς'],'masculino');
paradigm(66,'Duff 3 · θεός (8 formas)','θεός',['θεός','θεόν','θεοῦ','θεῷ','θεοί','θεούς','θεῶν','θεοῖς'],'masculino','Dios, dios');
paradigm(66,'Duff 3 · ἄγγελος (8 formas)','ἄγγελος',['ἄγγελος','ἄγγελον','ἀγγέλου','ἀγγέλῳ','ἄγγελοι','ἀγγέλους','ἀγγέλων','ἀγγέλοις'],'masculino','mensajero, ángel');
paradigm(66,'Duff 3 · δοῦλος (8 formas)','δοῦλος',['δοῦλος','δοῦλον','δούλου','δούλῳ','δοῦλοι','δούλους','δούλων','δούλοις'],'masculino','siervo, esclavo');
paradigm(66,'Duff 3 · κύριος (8 formas)','κύριος',['κύριος','κύριον','κυρίου','κυρίῳ','κύριοι','κυρίους','κυρίων','κυρίοις'],'masculino','señor');
paradigm(66,'Duff 3 · ἀδελφός (8 formas)','ἀδελφός',['ἀδελφός','ἀδελφόν','ἀδελφοῦ','ἀδελφῷ','ἀδελφοί','ἀδελφούς','ἀδελφῶν','ἀδελφοῖς'],'masculino','hermano');
paradigm(66,'Duff 3 · υἱός (8 formas)','υἱός',['υἱός','υἱόν','υἱοῦ','υἱῷ','υἱοί','υἱούς','υἱῶν','υἱοῖς'],'masculino','hijo');
verb('λέγω',['λέγω','λέγεις','λέγει','λέγομεν','λέγετε','λέγουσιν'],'decir, hablar');
verb('ἀκούω',['ἀκούω','ἀκούεις','ἀκούει','ἀκούομεν','ἀκούετε','ἀκούουσιν'],'oír, escuchar');
verb('βλέπω',['βλέπω','βλέπεις','βλέπει','βλέπομεν','βλέπετε','βλέπουσιν'],'ver, mirar');
verb('πιστεύω',['πιστεύω','πιστεύεις','πιστεύει','πιστεύομεν','πιστεύετε','πιστεύουσιν'],'creer, confiar');
verb('φιλέω',['φιλῶ','φιλεῖς','φιλεῖ','φιλοῦμεν','φιλεῖτε','φιλοῦσιν'],'amar');
verb('ἔχω',['ἔχω','ἔχεις','ἔχει','ἔχομεν','ἔχετε','ἔχουσιν'],'tener');
verb('ζητέω',['ζητῶ','ζητεῖς','ζητεῖ','ζητοῦμεν','ζητεῖτε','ζητοῦσιν'],'buscar');
verb('τηρέω',['τηρῶ','τηρεῖς','τηρεῖ','τηροῦμεν','τηρεῖτε','τηροῦσιν'],'guardar');
put('καί','καί','C-','conjunción coordinante','y');
put('οὐ','οὐ','D-','negación','no');
put('οὖν','οὖν','C-','conjunción ilativa','entonces, pues');
put('ἐν','ἐν','P-','preposición con dativo','en');
put('διὰ','διά','P-','preposición (ac.: por causa de; gen.: por medio de)','por medio de');
put('μου','ἐγώ','RP','genitivo singular · 1.ª persona','de mí, mi');
put('ὑμᾶς','σύ','RP','acusativo plural · 2.ª persona','a ustedes');
put('ἀδελφοί','ἀδελφός','N-','vocativo plural masculino','hermanos');
put('κύριε','κύριος','N-','vocativo singular masculino','señor');
phrase(66,'LV 3 · poseedor','ὁ ἄγγελος τοῦ θεοῦ λέγει τῷ δούλῳ','El ángel de Dios habla al siervo.','Genitivo de posesión y dativo del destinatario');
phrase(67,'LV 3 · dativo','ὁ κύριος λέγει τῷ ἀδελφῷ','El señor habla al hermano.','El destinatario del verbo λέγω');
phrase(68,'LV 3 · creer','πιστεύομεν τῷ θεῷ','Confiamos en Dios.','πιστεύω: complemento en dativo');
phrase(68,'LV 3 · escuchar','ἀκούω τοῦ ἀδελφοῦ','Escucho al hermano.','ἀκούω: persona en genitivo');
phrase(68,'LV 3 · contenido','ἀκούομεν τὸν λόγον','Escuchamos el mensaje.','ἀκούω: cosa oída en acusativo');
phrase(69,'LV 3 · plural','οἱ ἄγγελοι ἀκούουσιν τὸν λόγον','Los ángeles escuchan el mensaje.','Nominativo plural, acusativo singular');
// Géneros y primera/segunda declinación.
paradigm(70,'Duff 3 · ἀρχή (8 formas)','ἀρχή',['ἀρχή','ἀρχήν','ἀρχῆς','ἀρχῇ','ἀρχαί','ἀρχάς','ἀρχῶν','ἀρχαῖς'],'femenino','principio, comienzo');
paradigm(70,'Duff 3 · ἔργον (8 formas)','ἔργον',['ἔργον','ἔργον','ἔργου','ἔργῳ','ἔργα','ἔργα','ἔργων','ἔργοις'],'neutro','obra, acción');
paradigm(70,'Duff 3 · τέκνον (8 formas)','τέκνον',['τέκνον','τέκνον','τέκνου','τέκνῳ','τέκνα','τέκνα','τέκνων','τέκνοις'],'neutro','hijo, niño');
article(71,'Duff 3 · artículo femenino',['ἡ','τήν','τῆς','τῇ','αἱ','τάς','τῶν','ταῖς'],'femenino');
article(71,'Duff 3 · artículo neutro',['τό','τό','τοῦ','τῷ','τά','τά','τῶν','τοῖς'],'neutro');
phrase(71,'LV 3 · neutro plural','τὰ τέκνα βλέπει τὸν κύριον','Los niños ven al señor.','Sujeto neutro plural: el verbo aparece en singular');
paradigm(72,'Duff 3 · artículo neutro (repaso)','ὁ',['τό','τό','τοῦ','τῷ','τά','τά','τῶν','τοῖς'],'neutro','artículo definido','Orden de los casos: nom., ac., gen. y dat. en singular y plural.');
// Corregir categoría en la segunda presentación: son artículos, no sustantivos.
all[all.length-1].words.forEach(function(w,i){w.cat='RA';w.lemma='ὁ';w.gloss='artículo definido';});
paradigm(72,'Duff 3 · artículo femenino (repaso)','ὁ',['ἡ','τήν','τῆς','τῇ','αἱ','τάς','τῶν','ταῖς'],'femenino','artículo definido','Las formas del artículo deben concordar en caso, número y género.');
all[all.length-1].words.forEach(function(w){w.cat='RA';w.lemma='ὁ';w.gloss='artículo definido';});
paradigm(72,'Duff 3 · artículo masculino (repaso)','ὁ',['ὁ','τόν','τοῦ','τῷ','οἱ','τούς','τῶν','τοῖς'],'masculino','artículo definido','Tres géneros, cuatro casos, dos números.');
all[all.length-1].words.forEach(function(w){w.cat='RA';w.lemma='ὁ';w.gloss='artículo definido';});
paradigm(73,'Duff 3 · ἡμέρα (8 formas)','ἡμέρα',['ἡμέρα','ἡμέραν','ἡμέρας','ἡμέρᾳ','ἡμέραι','ἡμέρας','ἡμερῶν','ἡμέραις'],'femenino','día');
paradigm(73,'Duff 3 · δόξα (8 formas)','δόξα',['δόξα','δόξαν','δόξης','δόξῃ','δόξαι','δόξας','δοξῶν','δόξαις'],'femenino','gloria');
phrase(73,'LV 3 · femenino','ἡ δόξα τοῦ κυρίου','La gloria del señor.','Femenino de la primera declinación y genitivo');
// Vocativo.
entry(74,'LV 3 · invocación','original','Vocativo para dirigirse al interlocutor',[
  token('κύριε','κύριος','N-','vocativo singular masculino','señor'),
  token('ἀκούεις','ἀκούω','V-','presente indicativo activo · 2.ª singular','oís')
],'Señor, ¿escuchás?');
// Jesús: forma irregular en cinco casos.
entry(75,'Duff 3 · Ἰησοῦς (5 casos)','paradigm','Declinación irregular de Ἰησοῦς',[
 token('Ἰησοῦς','Ἰησοῦς','N-','nominativo singular masculino','Jesús'),
 token('Ἰησοῦν','Ἰησοῦς','N-','acusativo singular masculino','a Jesús'),
 token('Ἰησοῦ','Ἰησοῦς','N-','genitivo singular masculino','de Jesús'),
 token('Ἰησοῦ','Ἰησοῦς','N-','dativo singular masculino','a Jesús'),
 token('Ἰησοῦ','Ἰησοῦς','N-','vocativo singular masculino','Jesús (al dirigirse a él)')
],'Cinco casos: nominativo, acusativo, genitivo, dativo y vocativo.');
// Pronombre: seis series de singular/plural por género.
pronoun(76,'Duff 3 · αὐτός masculino',['αὐτός','αὐτόν','αὐτοῦ','αὐτῷ','αὐτοί','αὐτούς','αὐτῶν','αὐτοῖς'],'masculino');
pronoun(76,'Duff 3 · αὐτός femenino',['αὐτή','αὐτήν','αὐτῆς','αὐτῇ','αὐταί','αὐτάς','αὐτῶν','αὐταῖς'],'femenino');
pronoun(76,'Duff 3 · αὐτός neutro',['αὐτό','αὐτό','αὐτοῦ','αὐτῷ','αὐτά','αὐτά','αὐτῶν','αὐτοῖς'],'neutro');
entry(76,'LV 3 · posesivo αὐτοῦ','original','Genitivo de αὐτός en función posesiva',[
 token('ὁ','ὁ','RA','nominativo singular masculino','el'),
 token('λόγος','λόγος','N-','nominativo singular masculino','mensaje'),
 token('αὐτοῦ','αὐτός','RP','genitivo singular masculino/neutro','de él; su')
],'Su mensaje.');
// Vocabulario: lemas simples (sin soluciones a los ejercicios de pp. 77–79).
vocab(77,'Duff 3 · vocabulario femenino η','Sustantivos femeninos en -η',[
 ['ἀγάπη','amor'],['ἀδελφή','hermana'],['ἀρχή','comienzo'],['γῆ','tierra'],['ζωή','vida'],
 ['φωνή','voz'],['ψυχή','alma']
]);
vocab(77,'Duff 3 · vocabulario femenino α','Sustantivos femeninos en -α',[
 ['ἁμαρτία','pecado'],['βασιλεία','reino'],['ἐκκλησία','asamblea'],['καρδία','corazón'],
 ['ἡμέρα','día'],['οἰκία','casa'],['ὥρα','hora'],['δόξα','gloria'],['θάλασσα','mar']
]);
vocab(78,'Duff 3 · vocabulario neutro','Sustantivos neutros en -ον',[
 ['βιβλίον','libro'],['δαιμόνιον','demonio'],['ἔργον','obra'],['εὐαγγέλιον','evangelio'],
 ['ἱερόν','templo'],['τέκνον','niño'],['πλοῖον','barca'],['πρόσωπον','rostro'],
 ['σάββατον','sábado'],['σημεῖον','señal']
]);
vocab(78,'Duff 3 · nombres y verbo','Otros lemas del capítulo',[
 ['Ἰησοῦς','Jesús','Ἰησοῦς','N-','Nombre propio masculino · nominativo singular'],
 ['Παῦλος','Pablo','Παῦλος','N-','Nombre propio masculino · nominativo singular'],
 ['Πέτρος','Pedro','Πέτρος','N-','Nombre propio masculino · nominativo singular'],
 ['πιστεύω','creer, confiar','πιστεύω','V-','Presente de indicativo activo · 1.ª singular; rige dativo']
]);
entry(79,'LV 3 · Marcos 1:1','biblical','Sección C · texto final con variante textual',[
 token('Ἀρχὴ','ἀρχή','N-','nominativo singular femenino','comienzo'),
 token('τοῦ','ὁ','RA','genitivo singular neutro','del'),
 token('εὐαγγελίου','εὐαγγέλιον','N-','genitivo singular neutro','evangelio'),
 token('Ἰησοῦ','Ἰησοῦς','N-','genitivo singular masculino','de Jesús'),
 token('Χριστοῦ','Χριστός','N-','genitivo singular masculino','Cristo, Mesías'),
 token('υἱοῦ','υἱός','N-','genitivo singular masculino','de hijo'),
 token('θεοῦ','θεός','N-','genitivo singular masculino','de Dios')
],null,{hideTranslation:true,readingNote:'Sin traducción completa: esta es la Sección C del ejercicio final. El PDF de Duff incluye «υἱοῦ θεοῦ», expresión ausente del texto base de SBLGNT (variante textual).'});
phrase(80,'LV 3 · recapitulación','οἱ ἄγγελοι λέγουσιν τῷ κυρίῳ τὸν λόγον','Los ángeles dicen el mensaje al señor.','Nominativo, dativo y acusativo en una oración original');
// Citas breves de fuentes independientes, cada token con ficha contextual.
entry(66,'Apocalipsis 19:1 · cita','biblical','El genitivo marca una relación de pertenencia',[
 token('ἤκουσα','ἀκούω','V-','aoristo indicativo activo · 1.ª singular','oí'),
 token('ὡς','ὡς','C-','conjunción','como'),
 token('φωνὴν','φωνή','N-','acusativo singular femenino','voz'),
 token('μεγάλην','μέγας','A-','acusativo singular femenino','grande'),
 token('ὄχλου','ὄχλος','N-','genitivo singular masculino','de multitud'),
 token('πολλοῦ','πολύς','A-','genitivo singular masculino','numerosa')
],'Oí como una gran voz de una multitud numerosa.',{readingNote:'Fragmento de Apocalipsis 19:1; las palabras se toman del texto SBLGNT.'});
entry(66,'Mateo 23:1 · cita','biblical','El destinatario aparece en dativo',[
 token('ὁ','ὁ','RA','nominativo singular masculino','el'),
 token('Ἰησοῦς','Ἰησοῦς','N-','nominativo singular masculino','Jesús'),
 token('ἐλάλησεν','λαλέω','V-','aoristo indicativo activo · 3.ª singular','habló'),
 token('τοῖς','ὁ','RA','dativo plural masculino','a las'),
 token('ὄχλοις','ὄχλος','N-','dativo plural masculino','multitudes')
],'Jesús habló a las multitudes.',{readingNote:'Fragmento corto contextual; no reproduce una actividad del manual.'});
entry(69,'Marcos 13:31 · cita','biblical','Dos sujetos de distinto género',[
 token('ὁ','ὁ','RA','nominativo singular masculino','el'),
 token('οὐρανὸς','οὐρανός','N-','nominativo singular masculino','cielo'),
 token('καὶ','καί','C-','conjunción','y'),
 token('ἡ','ὁ','RA','nominativo singular femenino','la'),
 token('γῆ','γῆ','N-','nominativo singular femenino','tierra'),
 token('παρελεύσονται','παρέρχομαι','V-','futuro indicativo medio · 3.ª plural','pasarán')
],'El cielo y la tierra pasarán.',{readingNote:'Fragmento inicial de Marcos 13:31 según SBLGNT.'});
entry(74,'Juan 4:11 · cita','biblical','Vocativo singular',[
 token('λέγει','λέγω','V-','presente indicativo activo · 3.ª singular','dice'),
 token('αὐτῷ','αὐτός','RP','dativo singular masculino','a él'),
 token('ἡ','ὁ','RA','nominativo singular femenino','la'),
 token('γυνή','γυνή','N-','nominativo singular femenino','mujer'),
 token('Κύριε','κύριος','N-','vocativo singular masculino','señor'),
 token('οὔτε','οὔτε','C-','conjunción correlativa','ni'),
 token('ἄντλημα','ἄντλημα','N-','acusativo singular neutro','cubo para sacar agua'),
 token('ἔχεις','ἔχω','V-','presente indicativo activo · 2.ª singular','tenés')
],'La mujer le dice: «Señor, ni siquiera tenés con qué sacar agua».',{readingNote:'Comienzo de Juan 4:11; el vocativo no es el sujeto de la oración.'});
entry(74,'Romanos 12:1 · cita','biblical','Vocativo plural',[
 token('Παρακαλῶ','παρακαλέω','V-','presente indicativo activo · 1.ª singular','ruego, exhorto'),
 token('οὖν','οὖν','C-','conjunción','por tanto'),
 token('ὑμᾶς','σύ','RP','acusativo plural · 2.ª persona','a ustedes'),
 token('ἀδελφοί','ἀδελφός','N-','vocativo plural masculino','hermanos')
],'Por tanto, les ruego, hermanos.',{readingNote:'Fragmento inicial de Romanos 12:1.'});
entry(74,'Mateo 17:15 · cita','biblical','Vocativo e imperativo',[
 token('Κύριε','κύριος','N-','vocativo singular masculino','señor'),
 token('ἐλέησόν','ἐλεέω','V-','aoristo imperativo activo · 2.ª singular','ten misericordia'),
 token('μου','ἐγώ','RP','genitivo singular · 1.ª persona','de mí; mi'),
 token('τὸν','ὁ','RA','acusativo singular masculino','al'),
 token('υἱόν','υἱός','N-','acusativo singular masculino','hijo')
],'Señor, ten misericordia de mi hijo.',{readingNote:'Fragmento inicial de Mateo 17:15.'});
rd.chapterThree=all;
rd.chapterThreeMeta={
 pages:Array.from(new Set(all.map(function(x){return x.page;}))).sort(function(a,b){return a-b;}),
 source:'Duff, capítulo 3 (pp. 66–80), secuencia de temas cotejada. Citas breves del NT cotejadas con SBLGNT/MorphGNT o el extracto del manual; paradigmas y ejemplos de Lengua Viva.',
 notice:'Cada forma tiene lema, morfología y glosa; podés guardar el lema en tus tarjetas. Ejemplos originales; no corrigen ni muestran las soluciones de Duff.',
 citation:'SBLGNT © 2010; MorphGNT, James K. Tauber, CC BY-SA 3.0. El pasaje final Marcos 1:1 no ofrece la solución de la traducción.'
};
window.GREEK_READER=rd;
})();