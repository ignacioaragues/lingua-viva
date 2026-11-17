/* Lengua Viva · capítulo 2 de Duff: complemento ORIGINAL al PDF privado.
   Inventario de formas gramaticales y ejemplos nuevos (no son respuestas
   ni reproducciones de los ejercicios del manual). La secuencia de temas
   corresponde a las páginas físicas 50–65 del PDF autorizado.
   Las cinco citas bíblicas breves con edición independiente se cargan
   por john1-extended.js; aquí solo hay ejemplos didácticos redactados
   para Lengua Viva. No corregir las producciones del estudiante.
*/
(function(){
'use strict';
var reader=window.GREEK_READER;if(!reader)return;
var lex={},items=[];
function key(s){return String(s||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/ς/g,'σ').toLowerCase().replace(/[.,;··?!«»()[\]]/g,'');}
function add(form,lemma,cat,morph,gloss){
 var entry={lemma:lemma,cat:cat,morph:morph,gloss:gloss};
 lex[key(form)]=entry;
}
var pers=['1.ª persona singular','2.ª persona singular','3.ª persona singular','1.ª persona plural','2.ª persona plural','3.ª persona plural'];
function verb(lemma,forms,meanings){
 forms.forEach(function(form,i){add(form,lemma,'V-', 'Presente de indicativo · voz activa · '+pers[i],meanings[i]);});
 add(lemma,lemma,'V-','Lema del verbo (1.ª persona singular de presente, forma de diccionario)',meanings[0]);
}
function noun(lemma,forms,gloss){
 var traits=['Nominativo singular masculino','Acusativo singular masculino','Nominativo plural masculino','Acusativo plural masculino'];
 forms.forEach(function(form,i){add(form,lemma,'N-',traits[i],gloss);});
}
verb('λύω',['λύω','λύεις','λύει','λύομεν','λύετε','λύουσιν'],['desato','desatás','desata','desatamos','desatan / desatáis','desatan']);
add('λύουσι','λύω','V-','Presente · indicativo · activo · 3.ª persona plural, sin -ν móvil','desatan');
verb('λέγω',['λέγω','λέγεις','λέγει','λέγομεν','λέγετε','λέγουσιν'],['digo','decís','dice','decimos','dicen / decís','dicen']);
verb('βλέπω',['βλέπω','βλέπεις','βλέπει','βλέπομεν','βλέπετε','βλέπουσιν'],['veo','ves','ve','vemos','ven / veis','ven']);
verb('φιλέω',['φιλῶ','φιλεῖς','φιλεῖ','φιλοῦμεν','φιλεῖτε','φιλοῦσιν'],['amo','amás','ama','amamos','aman / amáis','aman']);
verb('ποιέω',['ποιῶ','ποιεῖς','ποιεῖ','ποιοῦμεν','ποιεῖτε','ποιοῦσιν'],['hago','hacés','hace','hacemos','hacen / hacéis','hacen']);
verb('λαλέω',['λαλῶ','λαλεῖς','λαλεῖ','λαλοῦμεν','λαλεῖτε','λαλοῦσιν'],['hablo','hablás','habla','hablamos','hablan / habláis','hablan']);
verb('ζητέω',['ζητῶ','ζητεῖς','ζητεῖ','ζητοῦμεν','ζητεῖτε','ζητοῦσιν'],['busco','buscás','busca','buscamos','buscan / buscáis','buscan']);
verb('καλέω',['καλῶ','καλεῖς','καλεῖ','καλοῦμεν','καλεῖτε','καλοῦσιν'],['llamo','llamás','llama','llamamos','llaman / llamáis','llaman']);
verb('τηρέω',['τηρῶ','τηρεῖς','τηρεῖ','τηροῦμεν','τηρεῖτε','τηροῦσιν'],['guardo','guardás','guarda','guardamos','guardan / guardáis','guardan']);
verb('ἔχω',['ἔχω','ἔχεις','ἔχει','ἔχομεν','ἔχετε','ἔχουσιν'],['tengo','tenés','tiene','tenemos','tienen / tenéis','tienen']);
verb('ἀκούω',['ἀκούω','ἀκούεις','ἀκούει','ἀκούομεν','ἀκούετε','ἀκούουσιν'],['oigo','oís','oye','oímos','oyen / oís','oyen']);
verb('διδάσκω',['διδάσκω','διδάσκεις','διδάσκει','διδάσκομεν','διδάσκετε','διδάσκουσιν'],['enseño','enseñás','enseña','enseñamos','enseñan / enseñáis','enseñan']);
verb('ἄγω',['ἄγω','ἄγεις','ἄγει','ἄγομεν','ἄγετε','ἄγουσιν'],['conduzco','conducís','conduce','conducimos','conducen / conducís','conducen']);
verb('βάλλω',['βάλλω','βάλλεις','βάλλει','βάλλομεν','βάλλετε','βάλλουσιν'],['arrojo','arrojás','arroja','arrojamos','arrojan / arrojáis','arrojan']);
verb('λαμβάνω',['λαμβάνω','λαμβάνεις','λαμβάνει','λαμβάνομεν','λαμβάνετε','λαμβάνουσιν'],['recibo','recibís','recibe','recibimos','reciben / recibís','reciben']);
noun('λόγος',['λόγος','λόγον','λόγοι','λόγους'],'palabra, mensaje');
noun('ἄγγελος',['ἄγγελος','ἄγγελον','ἄγγελοι','ἀγγέλους'],'mensajero, ángel');
noun('ἀδελφός',['ἀδελφός','ἀδελφόν','ἀδελφοί','ἀδελφούς'],'hermano');
noun('κύριος',['κύριος','κύριον','κύριοι','κυρίους'],'señor');
noun('δοῦλος',['δοῦλος','δοῦλον','δοῦλοι','δούλους'],'esclavo, siervo');
noun('ἄρτος',['ἄρτος','ἄρτον','ἄρτοι','ἄρτους'],'pan');
noun('θεός',['θεός','θεόν','θεοί','θεούς'],'Dios, dios');
noun('κόσμος',['κόσμος','κόσμον','κόσμοι','κόσμους'],'mundo');
noun('οὐρανός',['οὐρανός','οὐρανόν','οὐρανοί','οὐρανούς'],'cielo');
noun('οἶκος',['οἶκος','οἶκον','οἶκοι','οἴκους'],'casa, familia');
noun('νόμος',['νόμος','νόμον','νόμοι','νόμους'],'ley');
noun('ὄχλος',['ὄχλος','ὄχλον','ὄχλοι','ὄχλους'],'multitud');
noun('υἱός',['υἱός','υἱόν','υἱοί','υἱούς'],'hijo');
noun('ἄνθρωπος',['ἄνθρωπος','ἄνθρωπον','ἄνθρωποι','ἀνθρώπους'],'ser humano, persona');
noun('λαός',['λαός','λαόν','λαοί','λαούς'],'pueblo, nación');
noun('Χριστός',['Χριστός','Χριστόν','Χριστοί','Χριστούς'],'Cristo, Mesías');
[['ὁ','Nominativo singular masculino','el'],['τὸν','Acusativo singular masculino','el / al'],['οἱ','Nominativo plural masculino','los'],['τοὺς','Acusativo plural masculino','los / a los']].forEach(function(a){add(a[0],'ὁ','RA',a[1],a[2]);});
add('καί','καί','C-','Conjunción coordinante','y');
add('ἀμήν','ἀμήν','I-','Interjección indeclinable','amén, ciertamente');
add('Δαυίδ','Δαυίδ','N-','Nombre propio de origen semítico, indeclinable','David');
function row(page,ref,theme,source,greek,translation,kind){
 var words=greek.split(/\s+/).filter(Boolean).map(function(raw){
  var morph=lex[key(raw)];
  if(!morph)throw Error('Falta análisis: '+raw+' en '+ref);
  return {form:raw,lemma:morph.lemma,cat:morph.cat,morph:morph.morph,gloss:morph.gloss};
 });
 items.push({page:page,ref:ref,theme:theme,source:source||'ejemplo original',kind:kind||'frase',words:words,translation:translation});
}
row(50,'LV 2.1 · λύω','Las seis personas del presente','paradigma','λύω λύεις λύει λύομεν λύετε λύουσιν','Desato · desatás · desata · desatamos · desatan · desatan','paradigma');
row(50,'LV 2.1 · modelo','Ejemplo complementario','ejemplo original','ὁ δοῦλος λύει.','El siervo desata.');
row(51,'LV 2.1 · ν móvil','Dos variantes de la tercera persona plural','paradigma','λύουσι λύουσιν','Dos grafías del presente plural «desatan»; la segunda incorpora ν móvil.','paradigma');
row(51,'LV 2.1 · plural','Presente y concordancia','ejemplo original','οἱ δοῦλοι λύουσιν.','Los siervos desatan.');
row(52,'LV 2.1 · λέγω','Conjugación: decir','paradigma','λέγω λέγεις λέγει λέγομεν λέγετε λέγουσιν','Digo · decís · dice · decimos · dicen · dicen','paradigma');
row(52,'LV 2.1 · βλέπω','Conjugación: ver','paradigma','βλέπω βλέπεις βλέπει βλέπομεν βλέπετε βλέπουσιν','Veo · ves · ve · vemos · ven · ven','paradigma');
row(53,'LV 2.1 · frase 1','Primera persona plural','ejemplo original','διδάσκομεν.','Enseñamos.');
row(53,'LV 2.1 · frase 2','Tercera persona singular','ejemplo original','ἄγγελος βλέπει.','Un ángel ve.');
row(54,'LV 2.2 · infinitivo léxico','Raíz en -έω','forma de diccionario','φιλέω','Forma de diccionario: amar / querer.','paradigma');
row(54,'LV 2.2 · contracción','Presente contracto','ejemplo original','ὁ κύριος ποιεῖ.','El señor hace.');
row(55,'LV 2.2 · φιλέω','Las seis formas contractas','paradigma','φιλῶ φιλεῖς φιλεῖ φιλοῦμεν φιλεῖτε φιλοῦσιν','Amo · amás · ama · amamos · aman · aman','paradigma');
row(55,'LV 2.2 · hablar','Forma contracta plural','ejemplo original','οἱ ἀδελφοὶ λαλοῦσιν.','Los hermanos hablan.');
row(56,'LV 2.3 · λόγος','Nominativo y acusativo; singular y plural','paradigma','λόγος λόγον λόγοι λόγους','Palabra (sujeto singular) · palabra (objeto singular) · palabras (sujeto plural) · palabras (objeto plural)','paradigma');
row(57,'LV 2.3 · ἀδελφός','Flexión del sustantivo «hermano»','paradigma','ἀδελφός ἀδελφόν ἀδελφοί ἀδελφούς','Nominativo singular · acusativo singular · nominativo plural · acusativo plural','paradigma');
row(57,'LV 2.3 · κύριος','Flexión del sustantivo «señor»','paradigma','κύριος κύριον κύριοι κυρίους','Nominativo singular · acusativo singular · nominativo plural · acusativo plural','paradigma');
row(58,'LV 2.3 · orden A','Casos y orden sintáctico','ejemplo original','ὁ ἄγγελος βλέπει τὸν κύριον.','El ángel ve al señor.');
row(58,'LV 2.3 · orden B','Mismo sentido; énfasis distinto','ejemplo original','τὸν κύριον βλέπει ὁ ἄγγελος.','Al señor lo ve el ángel.');
row(59,'LV 2.3 · concordancia 1','Sujeto singular','ejemplo original','ὁ δοῦλος ἀκούει.','El siervo oye.');
row(59,'LV 2.3 · concordancia 2','Sujeto plural','ejemplo original','οἱ δοῦλοι ἀκούουσιν.','Los siervos oyen.');
row(59,'LV 2.3 · sujeto y objeto','Concordancia y caso','ejemplo original','ὁ κύριος βλέπει τὸν ἄγγελον.','El señor ve al ángel.');
row(60,'LV 2.3 · posición A','La flexión marca las funciones','ejemplo original','ἄγγελος βλέπει δοῦλον.','Un ángel ve a un siervo.');
row(60,'LV 2.3 · posición B','El objeto puede preceder al verbo','ejemplo original','δοῦλον βλέπει ἄγγελος.','A un siervo lo ve un ángel.');
row(61,'LV 2.4 · artículos','Artículo definido masculino','paradigma','ὁ τὸν οἱ τοὺς','Nominativo singular · acusativo singular · nominativo plural · acusativo plural','paradigma');
row(61,'LV 2.4 · artículo y nombre','Concordancia','paradigma','ὁ λόγος','La palabra en nominativo singular.','paradigma');
row(61,'LV 2.4 · acusativo plural','Concordancia','paradigma','τοὺς λόγους','Las palabras en acusativo plural.','paradigma');
row(61,'LV 2.4 · oración','Artículo, sujeto y objeto','ejemplo original','ὁ ἄγγελος βλέπει τὸν λόγον.','El ángel ve la palabra.');
row(62,'LV 2.5 · nombre propio','Artículo con nombre propio','ejemplo de uso','ὁ Δαυίδ','David (el artículo no se traduce delante del nombre propio).');
row(62,'LV 2.5 · Dios','Artículo con θεός','ejemplo de uso','ὁ θεός','Dios (en contexto monoteísta).');
row(62,'LV 2.5 · abstracto','Artículo con sustantivo general','ejemplo de uso','ὁ νόμος','La ley.');
row(62,'LV 2.5 · frase','Artículo y presente','ejemplo original','ὁ κύριος ἀκούει.','El señor escucha.');
row(63,'LV 2 · léxico no contracto','Verbos en presente','inventario de lemas','ἄγω ἀκούω βάλλω βλέπω διδάσκω ἔχω λαμβάνω λέγω λύω','Conducir · escuchar · arrojar · ver · enseñar · tener · recibir · decir · desatar','lexico');
row(63,'LV 2 · léxico contracto','Verbos con raíz en -ε','inventario de lemas','ζητέω καλέω λαλέω ποιέω τηρέω φιλέω','Buscar · llamar · hablar · hacer · guardar · amar','lexico');
row(63,'LV 2 · léxico nominal A','Sustantivos masculinos de segunda declinación','inventario de lemas','ἄγγελος ἀδελφός ἄρτος δοῦλος θεός κόσμος κύριος λόγος','Ángel · hermano · pan · siervo · Dios · mundo · señor · palabra','lexico');
row(63,'LV 2 · léxico nominal B','Otros sustantivos de segunda declinación','inventario de lemas','νόμος οἶκος οὐρανός ὄχλος υἱός Χριστός ἄνθρωπος λαός','Ley · casa · cielo · multitud · hijo · Cristo · ser humano · pueblo','lexico');
row(64,'LV 2 · taller 1','Complemento de lectura original (no es ejercicio de Duff)','ejemplo original','ὁ ἀδελφὸς βλέπει τὸν κύριον.','El hermano ve al señor.');
row(64,'LV 2 · taller 2','Complemento de lectura original','ejemplo original','οἱ δοῦλοι ἀκούουσιν τὸν λόγον.','Los siervos escuchan la palabra.');
row(64,'LV 2 · taller 3','Complemento de lectura original','ejemplo original','ὁ θεὸς φιλεῖ τοὺς ἀνθρώπους.','Dios ama a los seres humanos.');
row(64,'LV 2 · taller 4','Complemento de lectura original','ejemplo original','οἱ ἄγγελοι λαλοῦσιν.','Los ángeles hablan.');
row(64,'LV 2 · taller 5','Complemento de lectura original','ejemplo original','τὸν ἄρτον ζητεῖ ὁ δοῦλος.','El siervo busca el pan.');
row(64,'LV 2 · taller 6','Complemento de lectura original','ejemplo original','διδάσκομεν τὸν νόμον.','Enseñamos la ley.');
row(64,'LV 2 · taller 7','Complemento de lectura original','ejemplo original','οἱ υἱοὶ ἔχουσιν οἶκον.','Los hijos tienen una casa.');
row(64,'LV 2 · taller 8','Complemento de lectura original','ejemplo original','ὁ κύριος ποιεῖ.','El señor hace.');
row(65,'LV 2 · recapitulación 1','Sujeto y verbo en plural','ejemplo original','οἱ ἄγγελοι διδάσκουσιν.','Los ángeles enseñan.');
row(65,'LV 2 · recapitulación 2','Objeto directo antepuesto','ejemplo original','τὸν λόγον ἀκούει ὁ δοῦλος.','La palabra la escucha el siervo.');
var pages=Array.from(new Set(items.map(function(i){return i.page;}))).sort(function(a,b){return a-b;});
reader.chapterTwoExtra=items;
reader.chapterTwoExtraMeta={
  pages:pages,
  source:'Ejemplos de elaboración propia y formas gramaticales derivadas de la materia del capítulo 2 (PDF pp. 50–65). No son las soluciones del manual.',
  notice:'El glosario revela las formas bajo demanda. Las respuestas de las prácticas y los ejercicios originales permanecen en el cuaderno privado, sin autocorrección.'
};
window.GREEK_READER=reader;
})();