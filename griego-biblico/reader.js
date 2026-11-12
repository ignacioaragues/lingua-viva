/* Lingua Viva · Jeremy Duff — private PDF, authenticated workbook. No book text or PDF in GitHub. */
(function(){
'use strict';
var URL='https://nzjdlqanbclsfwwstkwi.supabase.co';
var KEY='sb_publishable_be96IsfN-3skQErkZtOtQQ_pK0OT1Y9';
var OWNER='1f7ce59b-bd9e-4a22-89f5-984ed85bbab5';
var BUCKET='lingua-duff-private';
var PATH=OWNER+'/duff-griego-biblico.pdf';
var client=window.supabase && window.supabase.createClient(URL,KEY,{auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
var app=document.getElementById('duff-app');
var chapters=[
['El alfabeto',33],['Oraciones básicas',50],['Los casos y el género',66],['Las preposiciones',81],
['Los adjetivos',98],['Los tiempos de los verbos',114],['Los modos de los verbos',134],
['Otros patrones de sustantivos y verbos',149],['Pronombres y conjunciones',162],
['Oraciones compuestas',177],['Verbos especiales',193],['La tercera declinación · I',210],
['La tercera declinación · II',224],['Los participios',237],['La voz pasiva y la voz media',252],
['El perfecto',267],['El subjuntivo',282],['Más sobre los verbos',298],
['Verbos adicionales',318],['Puntos finales',332]
];
var letters=[
['α','alfa','/a/','Como a en casa.'],['β','beta','/b/','B oclusiva, no una v inglesa.'],
['γ','gama','/g/','G fuerte como en gato; γγ suele sonar /ŋg/.'],
['δ','delta','/d/','D oclusiva como en «diente», no la d relajada entre vocales en español.'],
['ε','épsilon','/e/','E breve.'],['ζ','zeta','/z/','S sonora, como z inglesa de zoo; no equivale a z castellana ni a s rioplatense.'],
['η','eta','/eː/','E larga en el sistema del manual; una sola vocal prolongada, no dos es.'],
['θ','theta','/θ/','Como th de think en inglés o z castellana de zapato. En Argentina no corresponde a nuestra s.'],
['ι','iota','/i/','I como en cinco.'],['κ','kapa','/k/','C de casa, siempre velar.'],
['λ','lambda','/l/','L como en luna.'],['μ','mu','/m/','M como en mamá.'],
['ν','nu','/n/','N como en nada. Ojo: ν se parece a la v latina.'],
['ξ','xi','/ks/','Como ks en taxi.'],['ο','ómicron','/o/','O breve.'],
['π','pi','/p/','P como en papá.'],['ρ','rho','/r/','R vibrante; al principio suele llevar espíritu áspero.'],
['σ','sigma','/s/','S sorda; al final de palabra se escribe ς.'],['τ','tau','/t/','T como en toma.'],
['υ','ípsilon','/u/','Duff propone u española por conveniencia. En otras reconstrucciones se oye /y/, como u francesa.'],
['φ','fi','/f/','F en la pronunciación didáctica del manual; en época clásica era aspirada /pʰ/.'],
['χ','ji','/x/','J de jabón, fricativa velar; no la ch de chico. La jota puede ser más suave según el dialecto.'],
['ψ','psi','/ps/','Como ps de psicología si se pronuncian ambos sonidos.'],
['ω','omega','/oː/','O larga en el sistema del manual; una sola vocal prolongada.']
];
var exercises={
39:[['1.1 · A','text','Alfabeto griego en orden, con equivalentes españoles',1],['1.1 · B','text','Alfabeto español y equivalentes griegos',1],['1.1 · C','pair','Pronunciación en letras españolas / significado',9],['1.1 · D','pair','Escritura griega / significado',9]],
41:[['1.2','choice','Detectá los errores de respiración: sí / no',5]],
43:[['1.3–1.4 · A','text','Nombres griegos en letras españolas',8],['1.3–1.4 · B','text','Nombres españoles en letras griegas',8],['1.3–1.4 · C','text','Padre Nuestro: transcripción fonética',1]],
45:[['1.5','choice','Respiración suave: sí / no',5],['1.6','choice','¿Es una pregunta?: sí / no',5]],
46:[['Ejercicios · 1','text','Juan 1:1–14: transcripción en letras españolas (continúa en la página siguiente)',1]],
48:[['Ejercicios · 2','text','Juan 1:15–23: escribir el pasaje en griego',1]]
};
var state={user:null,page:33,bookUrl:null,bookError:'',uploading:false,notes:{},done:{},questions:[],pron:7,greekTranslation:true,authMessage:'',loading:true,saveTimers:{},saveStatus:'',ready:false,lastInput:null};
var answerKeys={'1.5':['no','sí','no','no','sí'],'1.6':['sí','no','no','sí','no']};
function h(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function chFor(p){var n=0;chapters.forEach(function(c,i){if(p>=c[1])n=i;});return n;}
function chapterId(i){return 'duff-ch'+(i+1);}
function current(){return chFor(state.page);}
function note(p){if(!state.notes[p])state.notes[p]={general:'',answers:{}};return state.notes[p];}
function header(){return '<header class="duff-header"><div class="duff-head-inner"><a class="brand" href="../">Lingua <em>Viva</em></a><span class="duff-crumb">Griego bíblico · Jeremy Duff · Curso privado</span><div class="duff-head-actions"><a class="btn btn-small" href="../">Mis idiomas</a>'+(state.user?'<button class="btn btn-small" data-do="logout">Salir de la cuenta</button>':'')+'</div></div></header>';}
function auth(){return header()+'<main class="duff-auth"><div class="eyebrow">Biblioteca personal</div><h1 class="duff-title">Tu curso de griego bíblico</h1><p>Ingresá con la misma cuenta que usás en Lingua Viva. El libro y las respuestas solo están disponibles para tu cuenta autorizada.</p><form id="duff-login"><label for="duff-email">Correo electrónico</label><input id="duff-email" type="email" autocomplete="email" required><label for="duff-password">Contraseña</label><input id="duff-password" type="password" autocomplete="current-password" required><button class="btn btn-primary" type="submit">Iniciar sesión</button></form><p class="duff-message" role="status">'+h(state.authMessage)+'</p><p class="note">Si ya tenés la sesión iniciada en francés, se reconoce automáticamente.</p></main>';}
function blocked(){return header()+'<main class="duff-auth"><h1 class="duff-title">Acceso privado</h1><p>Este curso está reservado para una cuenta concreta de Lingua Viva. La sesión actual no tiene permiso.</p><button class="btn" data-do="logout">Cambiar de cuenta</button></main>';}
function nav(){return '<aside class="duff-nav"><small>ÍNDICE DEL MANUAL</small><div class="duff-nav-list">'+chapters.map(function(c,i){return '<button class="duff-chapter '+(i===current()?'active':'')+'" data-do="page" data-page="'+c[1]+'"><span class="duff-num">'+(i+1)+'.</span><span>'+h(c[0])+(state.done[chapterId(i)]?' ✓':'')+'</span></button>';}).join('')+'</div></aside>';}
function uploadPanel(){return '<div class="duff-no-book"><h2>Conectar tu ejemplar</h2><p>El cuaderno está preparado, pero todavía no hay ningún PDF en tu biblioteca privada. Elegí el archivo de <b>Jeremy Duff · Curso de griego bíblico</b> desde este dispositivo <b>una sola vez</b>. Se guardará en un espacio de Supabase con acceso restringido a tu cuenta; <b>no se sube a GitHub</b>.</p><label for="duff-upload" class="btn btn-primary">Seleccionar PDF</label><input id="duff-upload" type="file" accept="application/pdf,.pdf" style="display:block"><p class="duff-message">'+h(state.bookError)+'</p></div>';}
function pdf(){return state.bookUrl?'<div class="duff-pdf-frame"><iframe title="Manual de Jeremy Duff, página '+state.page+'" src="'+h(state.bookUrl)+'#page='+state.page+'&zoom=page-width"></iframe></div>':uploadPanel();}
function toolbar(){return '<div class="duff-toolbar"><div class="duff-page-nav"><button class="btn btn-small" data-do="prev" '+(state.page===1?'disabled':'')+' aria-label="Página anterior">←</button><label for="duff-page-input">Página del PDF</label><input id="duff-page-input" type="number" min="1" max="522" value="'+state.page+'"><span class="micro">/ 522</span><button class="btn btn-small" data-do="next" '+(state.page===522?'disabled':'')+' aria-label="Página siguiente">→</button></div><div class="duff-page-nav">'+(state.bookUrl?'<a class="btn btn-small" href="'+h(state.bookUrl)+'#page='+state.page+'" target="_blank" rel="noopener">Abrir libro ↗</a>':'')+'<button class="btn btn-small" data-do="complete">'+(state.done[chapterId(current())]?'✓ Capítulo terminado':'Marcar capítulo terminado')+'</button></div></div>';}
function field(key,label,greek,multi){
 var val=note(state.page).answers[key]||'';
 return '<label for="field-'+h(key)+'">'+h(label)+'</label>'+(multi?'<textarea id="field-'+h(key)+'" '+(greek?'class="greek-answer" ':'')+'data-field="'+h(key)+'" rows="'+(multi===2?8:3)+'">'+h(val)+'</textarea>':'<input type="text" id="field-'+h(key)+'" '+(greek?'class="greek-answer" ':'')+'data-field="'+h(key)+'" value="'+h(val)+'">');
}
function practice(){
 var parts=exercises[state.page]||[];
 if(!parts.length)return '<p class="note">En esta página podés tomar apuntes. Las prácticas numeradas tienen sus propias casillas en las páginas indicadas arriba.</p>';
 return parts.map(function(ex){
 var id=ex[0],type=ex[1],description=ex[2],count=ex[3],out='<div class="duff-exercise"><h3>Práctica '+h(id)+'</h3><p>'+h(description)+'. Leé el enunciado completo en la página del libro.</p>';
 if(type==='text'){
   for(var i=1;i<=count;i++)out+=field(id+':'+i,count===1?'Tu respuesta':'Ítem '+i,/griegas|en griego/i.test(description),count===1?2:false);
 }else if(type==='pair'){
   for(var j=1;j<=count;j++)out+='<div class="duff-answer-row"><div class="duff-answer-label">'+j+'.</div><div class="duff-answer-pair"><div>'+field(id+':'+j+':a','Forma',/griega/i.test(description),false)+'</div><div>'+field(id+':'+j+':b','Significado',false,false)+'</div></div></div>';
 }else if(type==='choice'){
   for(var k=1;k<=count;k++){
     var key=id+':'+k,v=note(state.page).answers[key]||'';
     out+='<div class="duff-answer-row"><label>Ítem '+k+'</label><div class="duff-toggle"><button type="button" data-do="choice" data-key="'+h(key)+'" data-value="sí" aria-pressed="'+(v==='sí')+'">Sí</button><button type="button" data-do="choice" data-key="'+h(key)+'" data-value="no" aria-pressed="'+(v==='no')+'">No</button></div></div>';
   }
 }
 if(type==='choice'&&answerKeys[id])out+='<button class="btn btn-small" data-do="check" data-ex="'+h(id)+'">Comprobar respuestas</button><div class="duff-status" id="check-'+h(id)+'"></div>';
 return out+'</div>';
 }).join('');
}

var letterExamples={
 'α':['ἀγάπη','amor'],'β':['βιβλίον','libro'],'γ':['γῆ','tierra'],'δ':['δόξα','gloria'],'ε':['ἐγώ','yo'],'ζ':['ζωή','vida'],
 'η':['ἀλήθεια','verdad'],'θ':['θεός','Dios'],'ι':['ἰχθύς','pez'],'κ':['καρδία','corazón'],'λ':['λόγος','palabra'],
 'μ':['μαθητής','discípulo'],'ν':['νόμος','ley'],'ξ':['ξένος','extranjero'],'ο':['ὄνομα','nombre'],'π':['πίστις','fe'],
 'ρ':['ῥῆμα','palabra, dicho'],'σ':['σοφία','sabiduría'],'τ':['τέκνον','hijo, niño'],'υ':['υἱός','hijo'],
 'φ':['φῶς','luz'],'χ':['χάρις','gracia'],'ψ':['ψυχή','alma'],'ω':['ὥρα','hora']
};
var letterContrasts={
 'θ':'θ en θεός frente a τ en τέκνον: fricativa /θ/ frente a oclusiva /t/.',
 'ζ':'ζ en ζωή frente a σ en σοφία: /z/ sonora frente a /s/ sorda.',
 'χ':'χ en χάρις frente a κ en καρδία: fricativa /x/ frente a oclusiva /k/.',
 'υ':'La υ de υἱός se aproxima a /u/ en la convención didáctica; en otras reconstrucciones difiere.',
 'η':'η en ἀλήθεια frente a ε en ἐγώ: el manual distingue longitud.',
 'ω':'ω en ὥρα frente a ο en ὄνομα: el manual distingue longitud.'
};
function speakModernGreek(text){
 var synth=window.speechSynthesis,Utterance=window.SpeechSynthesisUtterance;
 if(!synth||!Utterance){alert('Este navegador no ofrece síntesis de voz.');return;}
 var voices=synth.getVoices()||[],voice=voices.find(function(v){return /^el(-|$)/i.test(v.lang||'');});
 if(!voice){alert('No hay una voz de griego moderno en este dispositivo. Consultá los recursos externos.');return;}
 synth.cancel();var u=new Utterance(text);u.lang='el-GR';u.voice=voice;u.rate=.82;synth.speak(u);
}
function pronunciation(){
 var item=letters[state.pron], extra='',sample=letterExamples[item[0]],contrast=letterContrasts[item[0]];
 if(item[0]==='θ')extra='En rioplatense, la z de «zapato» se pronuncia /s/, así que NO sirve como modelo para θ. Probá la th inglesa de think: punta de la lengua entre los dientes, sin vibración.';
 if(item[0]==='χ')extra='El manual propone la j castellana. En Argentina la jota puede sonar más suave en algunos hablantes; procurá una fricación velar /x/ para diferenciarla de κ /k/.';
 if(item[0]==='ζ')extra='Para producir /z/, pronunciá una s y activá la vibración de las cuerdas vocales; como la z inglesa de zoo.';
 if(item[0]==='η'||item[0]==='ω')extra='La longitud vocálica es una convención pedagógica del manual; en el griego koiné las pronunciaciones evolucionaron y no existe una única reconstrucción válida para todo el período.';
 if(item[0]==='υ')extra='No confundas la u didáctica del libro con el sonido reconstruido para épocas anteriores o con el griego moderno, que suele pronunciar esta letra /i/.';
 return '<section class="duff-exercise" id="pron"><h3>Pronunciación · capítulo 1</h3><p>Modelo de lectura del manual, con aclaraciones para hispanohablantes rioplatenses. No es la pronunciación moderna.</p><div class="duff-letters">'+letters.map(function(l,i){return '<button type="button" class="duff-letter '+(i===state.pron?'active':'')+'" data-do="letter" data-letter="'+i+'" title="'+h(l[1])+'">'+l[0]+'</button>';}).join('')+'</div><div class="duff-pron-note"><b>'+item[0]+' · '+h(item[1])+'</b> <span class="ipa">'+h(item[2])+'</span><p>'+h(item[3])+'</p>'+ (extra?'<p>'+h(extra)+'</p>':'')+(sample?'<p><b>Ejemplo:</b> <span lang="grc" class="greek-example">'+h(sample[0])+'</span> · '+h(sample[1])+'</p><button type="button" class="btn btn-small" data-do="greek-audio" data-text="'+h(sample[0])+'">🔊 Voz moderna (comparación)</button>':'')+(contrast?'<p class="duff-contrast">'+h(contrast)+'</p>':'')+'</div><p class="note">Los sonidos son una convención didáctica. Evitamos reproducir audio de voces griegas modernas como si fuera la pronunciación de Duff.</p></section>';
}
function questionPanel(){
 var recent=state.questions.filter(function(q){return q.lesson_id===chapterId(current());}).slice(0,4);
 return '<section class="duff-question"><h3>¿Una pregunta sobre esta parte?</h3><p class="note">La pregunta se guarda en tu cuenta para revisión del tutor; no llega como mensaje en tiempo real a este chat.</p><textarea id="duff-question-text" placeholder="Por ejemplo: ¿por qué θ no se pronuncia como la z argentina?"></textarea><button class="btn btn-small" data-do="question">Enviar pregunta</button><div id="duff-question-msg" class="duff-message"></div>'+recent.map(function(q){return '<div class="duff-reply"><b>'+h(q.status==='reviewed'?'Respondida':'Pendiente')+'</b><p>'+h(q.body)+'</p>'+(q.feedback?'<p><b>Respuesta:</b> '+h(q.feedback)+'</p>':'')+'</div>';}).join('')+'</section>';
}
function keyboard(){return '<section class="duff-exercise"><h3>Teclado griego</h3><p>Seleccioná una casilla de respuesta y pulsá las letras. Los espíritus y acentos se añaden después de la vocal.</p><div class="duff-keyboard">'+letters.map(function(l){return '<button type="button" data-do="insert" data-char="'+l[0]+'">'+l[0]+'</button>';}).join('')+'<button data-do="insert" data-char="ς">ς</button><button data-do="insert" data-cp="0313" title="Espíritu suave">᾿</button><button data-do="insert" data-cp="0314" title="Espíritu áspero">῾</button><button data-do="insert" data-cp="0301" title="Acento agudo">´</button><button data-do="insert" data-cp="0342" title="Circunflejo">῀</button><button data-do="insert" data-cp="0345" title="Iota suscrita">ͅ</button><button data-do="insert" data-char=" ">espacio</button></div></section>';}

function greekResources(){
 return '<section class="duff-exercise" id="greek-resources"><h3>Recursos para escuchar y analizar</h3>'
  +'<div class="duff-resource"><b>Koine Foundations · Pronunciación del alfabeto</b><p>Escuchá las letras y compará θ, ζ y χ con las explicaciones de arriba. El modelo de pronunciación puede diferir del empleado por Duff.</p><a href="https://koinefoundations.com/instructor-videos/" target="_blank" rel="noopener noreferrer">Vídeos de pronunciación ↗</a></div>'
  +'<div class="duff-resource"><b>STEP Bible · Análisis del NT</b><p>Buscá Juan 1:1 y compará el lema y el análisis de ἦν, λόγος y θεόν con las fichas de Lingua Viva.</p><a href="https://www.stepbible.org/" target="_blank" rel="noopener noreferrer">Abrir STEP Bible ↗</a></div></section>';
}
function closeGreekCard(){
 document.querySelector('.greek-card')?.remove();
 document.querySelectorAll('.greek-word[aria-expanded="true"]').forEach(function(x){x.setAttribute('aria-expanded','false');});
}
function showGreekCard(button){
 var data=window.GREEK_READER,word=button.dataset.form,entry=data&&data.lexicon[word],opened=button.getAttribute('aria-expanded')==='true';
 closeGreekCard();if(opened||!entry)return;
 button.setAttribute('aria-expanded','true');
 var pop=document.createElement('div');pop.className='greek-card';pop.setAttribute('role','dialog');pop.setAttribute('aria-label','Análisis de '+word);
 pop.innerHTML='<div class="micro">FICHA MORFOLÓGICA · JUAN</div><strong lang="grc">'+h(word)+'</strong>'
   +'<div class="greek-card-row"><b>Lema</b><span lang="grc">'+h(entry.lemma)+'</span></div>'
   +'<div class="greek-card-row"><b>Categoría</b><span>'+h(entry.category)+'</span></div>'
   +'<div class="greek-card-row"><b>Morfología</b><span>'+h(entry.morph)+'</span></div>'
   +'<div class="greek-card-row"><b>Sentido</b><span>'+h(entry.gloss)+'</span></div>'
   +'<p>'+h(entry.note)+'</p>'
   +'<a href="https://www.stepbible.org/" target="_blank" rel="noopener noreferrer">Consultar en STEP Bible ↗</a>'
   +'<button type="button" class="duff-close" data-do="close-card" aria-label="Cerrar ficha">×</button>';
 document.body.append(pop);
 var rect=button.getBoundingClientRect(),w=pop.getBoundingClientRect().width,ph=pop.getBoundingClientRect().height;
 pop.style.left=Math.min(Math.max(12,rect.left),Math.max(12,window.innerWidth-w-12))+'px';
 pop.style.top=(rect.bottom+10+ph>window.innerHeight?Math.max(12,rect.top-ph-10):rect.bottom+10)+'px';
}
function readingPanel(){
 if(state.page<46||state.page>48)return '';
 var data=window.GREEK_READER;if(!data)return '';
 return '<section class="duff-greek-reader" id="lectura-juan"><div class="grammar-head"><div><div class="micro">LECTURA FILOLÓGICA · EVANGELIO SEGÚN JUAN</div><h2>Juan 1:1–2 · texto anotado</h2></div><button type="button" class="btn btn-small" data-do="greek-translation" aria-pressed="'+state.greekTranslation+'">'+(state.greekTranslation?'Ocultar traducción':'Mostrar traducción')+'</button></div>'
   +'<p>Seleccioná cualquier palabra griega para ver su lema, función y análisis morfológico. Esta es una lectura complementaria: no reemplaza los ejercicios de Duff.</p>'
   +data.verses.map(function(v){
      return '<div class="greek-verse"><span class="micro">'+h(v.ref)+'</span><div class="greek-verse-text" lang="grc">'+v.tokens.map(function(raw){
        var form=raw.replace(/[.,·;]$/u,''),punct=raw.slice(form.length);
        return '<button type="button" class="greek-word" data-do="greek-word" data-form="'+h(form)+'" aria-expanded="false">'+h(form)+'</button>'+h(punct)+' ';
      }).join('')+'</div>'+(state.greekTranslation?'<div class="greek-translation" lang="es">'+h(v.translation)+'</div>':'')+'</div>';
    }).join('')
   +'<p class="note">'+h(data.notice)+'</p></section>';
}

function workbook(){
 return '<aside class="duff-work"><div class="micro">CUADERNO PERSONAL</div><h2>Capítulo '+(current()+1)+' · pág. '+state.page+'</h2><p class="note">Leé el libro a la izquierda y escribí acá. Cada página conserva sus respuestas por separado, sincronizadas con tu cuenta.</p><div class="duff-index"><button data-do="page" data-page="39">1.1</button><button data-do="page" data-page="41">1.2</button><button data-do="page" data-page="43">1.3–1.4</button><button data-do="page" data-page="45">1.5–1.6</button><button data-do="page" data-page="46">Ej. 1</button><button data-do="page" data-page="48">Ej. 2</button></div>'+practice()+'<div class="duff-exercise"><h3>Mis apuntes · página '+state.page+'</h3><textarea id="duff-general" rows="5" placeholder="Anotá dudas, traducciones, ejercicios o lo que quieras…">'+h(note(state.page).general)+'</textarea><div id="duff-save-status" class="duff-status">'+h(state.saveStatus||'Los cambios se guardan automáticamente.')+'</div><button class="btn btn-small" data-do="save">Guardar ahora</button></div>'+keyboard()+pronunciation()+greekResources()+questionPanel()+'</aside>';
}
function render(){
 if(state.loading){app.innerHTML='<div class="duff-loading">Comprobando la sesión…</div>';return;}
 if(!state.user){app.innerHTML=auth();return;}
 if(state.user.id!==OWNER){app.innerHTML=blocked();return;}
 var c=current();
 app.innerHTML=header()+'<div class="duff-banner"><div class="duff-banner-inner"><div><div class="eyebrow">Jeremy Duff · Editorial CLIE · edición española</div><h1 class="duff-title">Capítulo '+(c+1)+'. '+h(chapters[c][0])+'</h1><p class="duff-subtitle">Secuencia original del manual · 20 capítulos · PDF de 522 páginas</p></div><span class="chip">Solo tu cuenta</span></div></div><div class="duff-shell">'+nav()+'<main class="duff-reader"><p class="note">El original se lee en su formato íntegro; el cuaderno de ejercicios está separado y se guarda en privado.</p>'+toolbar()+pdf()+readingPanel()+'</main>'+workbook()+'</div><div class="duff-privacy">El archivo del libro no se publica en GitHub Pages: se descarga únicamente tras iniciar sesión y superar las reglas de acceso del almacenamiento privado. Las respuestas se guardan en tu cuenta.</div>';
}
async function savePage(p){
 if(!state.user||state.user.id!==OWNER)return;
 var payload=JSON.stringify(note(p));
 var res=await client.from('lingua_notes').upsert({user_id:OWNER,lesson_id:'duff:p:'+p,body:payload,updated_at:new Date().toISOString()},{onConflict:'user_id,lesson_id'});
 var status=document.getElementById('duff-save-status');
 if(res.error){state.saveStatus='No se pudo guardar: '+res.error.message;}
 else state.saveStatus='✓ Guardado en tu cuenta · '+new Date().toLocaleTimeString();
 if(status&&p===state.page)status.textContent=state.saveStatus;
}
function scheduleSave(p){clearTimeout(state.saveTimers[p]);state.saveTimers[p]=setTimeout(function(){savePage(p);},900);var el=document.getElementById('duff-save-status');if(el)el.textContent='Guardando…';}
async function bookmark(p){await client.from('lingua_notes').upsert({user_id:OWNER,lesson_id:'duff:bookmark',body:JSON.stringify({page:p}),updated_at:new Date().toISOString()},{onConflict:'user_id,lesson_id'});}
function go(p){closeGreekCard();if(!state.user||state.user.id!==OWNER)return;p=Number(p);if(!Number.isFinite(p)||p<1||p>522)return;state.page=Math.floor(p);state.saveStatus='';render();bookmark(state.page);history.replaceState(null,'','#pagina='+state.page);}
async function loadData(){
 var notes=await client.from('lingua_notes').select('lesson_id,body').eq('user_id',OWNER).like('lesson_id','duff:%').limit(1000);
 if(notes.error)state.bookError='No se pudieron cargar los apuntes: '+notes.error.message;
 (notes.data||[]).forEach(function(r){
  if(r.lesson_id==='duff:bookmark'&&!location.hash){try{state.page=JSON.parse(r.body).page||33;}catch(e){}}
  else if(r.lesson_id.indexOf('duff:p:')===0){try{state.notes[Number(r.lesson_id.slice(7))]=JSON.parse(r.body);}catch(e){}}
 });
 var prog=await client.from('lingua_lesson_progress').select('lesson_id,completed').eq('user_id',OWNER).like('lesson_id','duff-ch%');
 (prog.data||[]).forEach(function(r){state.done[r.lesson_id]=r.completed;});
 var qs=await client.from('lingua_writings').select('id,lesson_id,body,feedback,status,created_at').eq('user_id',OWNER).like('prompt','QUESTION_LV:grec-duff:%').order('created_at',{ascending:false}).limit(100);
 state.questions=qs.data||[];
 if(location.hash.indexOf('#pagina=')===0){var x=Number(location.hash.slice(8));if(x>=1&&x<=522)state.page=x;}
}
async function loadBook(){
 var res=await client.storage.from(BUCKET).download(PATH);
 if(res.error){state.bookError='Todavía no se encontró tu ejemplar privado. Seleccionalo abajo para subirlo una sola vez.';render();return;}
 if(state.bookUrl)window.URL.revokeObjectURL(state.bookUrl);
 state.bookUrl=window.URL.createObjectURL(res.data);
 state.bookError='';render();
}
async function init(){
 if(!client){state.loading=false;state.authMessage='No se pudo cargar el sistema de acceso. Revisá tu conexión.';render();return;}
 var sess=await client.auth.getSession();
 state.user=sess.data&&sess.data.session?sess.data.session.user:null;
 state.loading=false;render();
 if(state.user&&state.user.id===OWNER){await loadData();render();await loadBook();}
 client.auth.onAuthStateChange(function(event,session){
  var uid=session&&session.user?session.user.id:null;
  if(uid!==(state.user&&state.user.id)){state.user=session?session.user:null;if(!state.user&&state.bookUrl){window.URL.revokeObjectURL(state.bookUrl);state.bookUrl=null;}render();if(uid===OWNER){loadData().then(function(){render();loadBook();});}}
 });
}
app.addEventListener('submit',async function(e){
 if(e.target.id!=='duff-login')return;
 e.preventDefault();var email=document.getElementById('duff-email').value;var pass=document.getElementById('duff-password').value;
 state.authMessage='Ingresando…';var res=await client.auth.signInWithPassword({email:email,password:pass});
 if(res.error){state.authMessage='No se pudo iniciar sesión: '+res.error.message;render();}
});
app.addEventListener('focusin',function(e){if(e.target.matches('#duff-general,[data-field]'))state.lastInput=e.target;});
app.addEventListener('input',function(e){
 if(e.target.id==='duff-general'){note(state.page).general=e.target.value;scheduleSave(state.page);}
 if(e.target.dataset.field){note(state.page).answers[e.target.dataset.field]=e.target.value;scheduleSave(state.page);}
});
app.addEventListener('change',async function(e){
 if(e.target.id==='duff-page-input')go(e.target.value);
 if(e.target.id==='duff-upload'){
  var f=e.target.files&&e.target.files[0];if(!f)return;
  if(!/\.pdf$/i.test(f.name)||f.size>10485760){state.bookError='Elegí un PDF de hasta 10 MB.';render();return;}
  state.bookError='Subiendo tu ejemplar a la biblioteca privada…';var msg=document.querySelector('.duff-no-book .duff-message');if(msg)msg.textContent=state.bookError;
  var res=await client.storage.from(BUCKET).upload(PATH,f,{contentType:'application/pdf',upsert:true});
  if(res.error){state.bookError='No se pudo subir el PDF: '+res.error.message;render();return;}
  await loadBook();
 }
});
app.addEventListener('click',async function(e){
 var b=e.target.closest('[data-do]');if(!b)return;var act=b.dataset.do;
 if(act==='greek-word'){showGreekCard(b);return;}
 if(act==='close-card'){closeGreekCard();return;}
 if(act==='greek-translation'){state.greekTranslation=!state.greekTranslation;closeGreekCard();render();return;}
 if(act==='greek-audio'){speakModernGreek(b.dataset.text);return;}
 if(act==='logout'){await client.auth.signOut();return;}
 if(act==='page')go(b.dataset.page);
 if(act==='prev')go(state.page-1);
 if(act==='next')go(state.page+1);
 if(act==='letter'){state.pron=Number(b.dataset.letter);render();}
 if(act==='save')savePage(state.page);
 if(act==='insert'){
  var input=state.lastInput;
  if(!input||!document.contains(input)){input=document.querySelector('[data-field],#duff-general');}
  if(input){var ch=b.dataset.cp?String.fromCodePoint(parseInt(b.dataset.cp,16)):b.dataset.char;input.focus();var a=input.selectionStart||0,z=input.selectionEnd||a;input.setRangeText(ch,a,z,'end');input.dispatchEvent(new Event('input',{bubbles:true}));}
 }
 if(act==='check'){
  var id=b.dataset.ex,key=answerKeys[id],values=key.map(function(x,i){return note(state.page).answers[id+':'+(i+1)]||'';}),el=document.getElementById('check-'+id);
  if(values.some(function(x){return !x;})){el.textContent='Respondé los cinco ítems antes de comprobar.';return;}
  var score=values.filter(function(x,i){return x===key[i];}).length;
  el.textContent=score+'/5 correctas. '+(score===5?'¡Muy bien!':'Revisá los ítems '+values.map(function(x,i){return x===key[i]?'':i+1;}).filter(Boolean).join(', ')+'.');
 }
 if(act==='choice'){
  note(state.page).answers[b.dataset.key]=b.dataset.value;scheduleSave(state.page);render();
 }
 if(act==='complete'){
  var id=chapterId(current()),val=!state.done[id];
  var res=await client.from('lingua_lesson_progress').upsert({user_id:OWNER,lesson_id:id,completed:val,updated_at:new Date().toISOString()},{onConflict:'user_id,lesson_id'});
  if(!res.error){state.done[id]=val;render();}
 }
 if(act==='question'){
  var textarea=document.getElementById('duff-question-text'),msg=document.getElementById('duff-question-msg'),body=textarea.value.trim();
  if(!body){msg.textContent='Escribí tu pregunta primero.';return;}
  b.disabled=true;var id=chapterId(current()),c=chapters[current()][0];
  var res=await client.from('lingua_writings').insert({user_id:OWNER,lesson_id:id,prompt:'QUESTION_LV:grec-duff:p'+state.page+':'+c,body:body,status:'pending'}).select('id,lesson_id,body,feedback,status,created_at').single();
  if(res.error){msg.textContent='No se pudo enviar: '+res.error.message;b.disabled=false;return;}
  state.questions.unshift(res.data);render();
 }
});
document.addEventListener('click',function(e){if(e.target.closest('.duff-close')){closeGreekCard();return;}if(!e.target.closest('[data-do="greek-word"],.greek-card'))closeGreekCard();});
window.addEventListener('scroll',closeGreekCard,{passive:true});
document.addEventListener('keydown',function(e){if(e.key==='Escape')closeGreekCard();if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;if(e.key==='ArrowRight')go(state.page+1);if(e.key==='ArrowLeft')go(state.page-1);});
window.addEventListener('pagehide',function(){if(state.user&&state.user.id===OWNER)savePage(state.page);if(state.bookUrl)window.URL.revokeObjectURL(state.bookUrl);});
init();
})();