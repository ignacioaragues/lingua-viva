/* Lengua Viva · Jeremy Duff — private PDF, authenticated workbook. No book text or PDF in GitHub. */
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
48:[['Ejercicios · 2','text','Juan 1:15–23: escribir el pasaje en griego',1]],
53:[['2.1 · griego → español','text','Práctica 2.1: traducir las seis formas griegas al español, según el PDF privado',6],['2.1 · español → griego','text','Práctica 2.1: escribir en griego las tres formas solicitadas en español, según el PDF privado',3]],
55:[['2.2 · griego → español','text','Práctica 2.2: seis traducciones de formas verbales contractas',6],['2.2 · español → griego','text','Práctica 2.2: tres formas verbales que escribir en griego',3]],
57:[['2.3.1','case-number','Práctica 2.3.1: identificá caso y número de ocho formas nominales',8]],
60:[['2.3.3 · griego → español','text','Práctica 2.3.3: traducí seis oraciones del griego al español',6],['2.3.3 · español → griego','text','Práctica 2.3.3: escribí cuatro oraciones en griego',4]],
62:[['2.4–2.5 · griego → español','text','Prácticas 2.4 y 2.5: cinco traducciones del griego al español',5],['2.4–2.5 · español → griego','text','Prácticas 2.4 y 2.5: tres traducciones del español al griego',3]],
64:[['Final · A · griego → español','text','Sección A: traducí ocho oraciones del griego al español',8],['Final · A · español → griego','text','Sección A: escribí cuatro oraciones en griego',4],['Final · B · griego → español','text','Sección B: traducí ocho oraciones del griego al español',8],['Final · B · español → griego','text','Sección B: escribí cuatro oraciones en griego',4]]
};
var timer=null;
var state={user:null,page:33,bookUrl:null,bookError:'',uploading:false,notes:{},reviews:{},done:{},questions:[],pron:7,greekTranslation:true,greekInterlinear:false,vocabCards:[],vocabMessage:'',authMessage:'',loading:true,saveTimers:{},saveStatus:'',ready:false,lastInput:null,pdfDocument:null,pdfLoading:false,pdfError:'',pdfPageCount:522,pdfZoom:1,pdfRenderTask:null,pdfRenderTicket:0,workOpen:!(window.matchMedia&&window.matchMedia('(max-width:1050px)').matches),workTab:'notes',phoneticsOpen:false,phoneticsGroup:'letters',phoneticsIndex:7};
var answerKeys={'1.5':['no','sí','no','no','sí'],'1.6':['sí','no','no','sí','no']};
function h(v){return String(v==null?'':v).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});}
function chFor(p){var n=0;chapters.forEach(function(c,i){if(p>=c[1])n=i;});return n;}
function chapterId(i){return 'duff-ch'+(i+1);}
function current(){return chFor(state.page);}
function note(p){if(!state.notes[p])state.notes[p]={general:'',answers:{}};return state.notes[p];}
function header(){return '<header class="duff-header"><div class="duff-head-inner"><a class="brand" href="../">Lengua <em>Viva</em></a><span class="duff-crumb">Griego bíblico · Jeremy Duff · Curso privado</span><div class="duff-head-actions"><a class="btn btn-small" href="../">Mis idiomas</a>'+(state.user?'<button class="btn btn-small" data-do="logout">Salir de la cuenta</button>':'')+'</div></div></header>';}
function auth(){return header()+'<main class="duff-auth"><div class="eyebrow">Biblioteca personal</div><h1 class="duff-title">Tu curso de griego bíblico</h1><p>Ingresá con la misma cuenta que usás en Lengua Viva. El libro y las respuestas solo están disponibles para tu cuenta autorizada.</p><form id="duff-login"><label for="duff-email">Correo electrónico</label><input id="duff-email" type="email" autocomplete="email" required><label for="duff-password">Contraseña</label><input id="duff-password" type="password" autocomplete="current-password" required><button class="btn btn-primary" type="submit">Iniciar sesión</button></form><p class="duff-message" role="status">'+h(state.authMessage)+'</p><p class="note">Si ya tenés la sesión iniciada en francés, se reconoce automáticamente.</p></main>';}
function blocked(){return header()+'<main class="duff-auth"><h1 class="duff-title">Acceso privado</h1><p>Este curso está reservado para una cuenta concreta de Lengua Viva. La sesión actual no tiene permiso.</p><button class="btn" data-do="logout">Cambiar de cuenta</button></main>';}
function nav(){return '<aside class="duff-nav"><small>ÍNDICE DEL MANUAL</small><div class="duff-nav-list">'+chapters.map(function(c,i){return '<button class="duff-chapter '+(i===current()?'active':'')+'" data-do="page" data-page="'+c[1]+'"><span class="duff-num">'+(i+1)+'.</span><span>'+h(c[0])+(state.done[chapterId(i)]?' ✓':'')+'</span></button>';}).join('')+'</div></aside>';}
function uploadPanel(){return '<div class="duff-no-book"><h2>Conectar tu ejemplar</h2><p>El cuaderno está preparado, pero todavía no hay ningún PDF en tu biblioteca privada. Elegí el archivo de <b>Jeremy Duff · Curso de griego bíblico</b> desde este dispositivo <b>una sola vez</b>. Se guardará en un espacio de Supabase con acceso restringido a tu cuenta; <b>no se sube a GitHub</b>.</p><label for="duff-upload" class="btn btn-primary">Seleccionar PDF</label><input id="duff-upload" type="file" accept="application/pdf,.pdf" style="display:block"><p class="duff-message">'+h(state.bookError)+'</p></div>';}
function pdf(){
 if(!state.bookUrl)return uploadPanel();
 var status=state.pdfError?'<div class="duff-pdf-failure"><h3>No se pudo mostrar esta página</h3><p>'+h(state.pdfError)+'</p><p>Podés abrir el archivo original desde «Abrir libro» o reintentar.</p><button class="btn btn-small" data-do="retry-pdf">Reintentar visor</button></div>':state.pdfLoading?'<div class="duff-pdf-progress" role="status">Preparando las páginas del PDF…</div>':'';
 return '<div class="duff-pdf-frame" id="duff-pdf-frame" role="region" aria-label="Visor privado del manual">'+status+'<canvas id="duff-pdf-canvas" aria-label="Página '+state.page+' del libro" '+(state.pdfDocument?'':'hidden')+'></canvas><div class="duff-pdf-progress duff-page-progress" id="duff-page-progress" aria-live="polite"></div></div>';
}
function cancelPdfRender(){
 state.pdfRenderTicket++;
 if(state.pdfRenderTask){try{state.pdfRenderTask.cancel();}catch(e){}state.pdfRenderTask=null;}
}
async function renderPdfPage(){
 if(!state.pdfDocument||!state.bookUrl)return;
 var frame=document.getElementById('duff-pdf-frame'),canvas=document.getElementById('duff-pdf-canvas');
 if(!frame||!canvas)return;
 cancelPdfRender();
 var ticket=state.pdfRenderTicket,pageNumber=state.page,status=document.getElementById('duff-page-progress');
 if(status)status.textContent='Cargando página '+pageNumber+'…';
 try{
  var page=await state.pdfDocument.getPage(pageNumber);
  if(ticket!==state.pdfRenderTicket||!document.contains(canvas))return;
  var base=page.getViewport({scale:1}),width=Math.max(280,frame.clientWidth-32);
  var viewport=page.getViewport({scale:width/base.width*state.pdfZoom});
  var ratio=Math.min(window.devicePixelRatio||1,2);
  canvas.width=Math.ceil(viewport.width*ratio);
  canvas.height=Math.ceil(viewport.height*ratio);
  canvas.style.width=Math.ceil(viewport.width)+'px';
  canvas.style.height=Math.ceil(viewport.height)+'px';
  var ctx=canvas.getContext('2d',{alpha:false});
  if(!ctx)throw Error('No se pudo iniciar el lienzo de páginas.');
  ctx.fillStyle='#fff';ctx.fillRect(0,0,canvas.width,canvas.height);
  var task=page.render({canvasContext:ctx,viewport:viewport,transform:ratio===1?null:[ratio,0,0,ratio,0,0]});
  state.pdfRenderTask=task;
  await task.promise;
  if(ticket===state.pdfRenderTicket&&document.contains(canvas)){
   if(status)status.textContent='Página '+pageNumber+' de '+state.pdfPageCount;
   canvas.hidden=false;
  }
 }catch(e){
  if(e&&e.name==='RenderingCancelledException')return;
  if(ticket===state.pdfRenderTicket&&document.contains(canvas)&&status)status.textContent='Error al dibujar la página: '+(e.message||String(e));
 }finally{if(ticket===state.pdfRenderTicket)state.pdfRenderTask=null;}
}
function toolbar(){
 return '<div class="duff-toolbar"><div class="duff-toolbar-top"><div class="duff-page-nav">'
 +'<button class="btn btn-small" data-do="prev" '+(state.page===1?'disabled':'')+' aria-label="Página anterior">←</button>'
 +'<label for="duff-page-input">Página del PDF</label><input id="duff-page-input" type="number" min="1" max="'+state.pdfPageCount+'" value="'+state.page+'">'
 +'<span class="micro">/ '+state.pdfPageCount+'</span>'
 +'<button class="btn btn-small" data-do="next" '+(state.page===state.pdfPageCount?'disabled':'')+' aria-label="Página siguiente">→</button>'
 +'</div>'+(timer?timer.html():'')+'</div><div class="duff-page-nav duff-toolbar-actions">'
 +(state.pdfDocument?'<button class="btn btn-small" data-do="pdf-zoom-out" title="Reducir zoom">−</button><span class="micro">'+Math.round(state.pdfZoom*100)+'%</span><button class="btn btn-small" data-do="pdf-zoom-in" title="Ampliar zoom">+</button><button class="btn btn-small" data-do="pdf-fit" title="Ajustar al ancho">Ajustar</button>':'')
 +(state.bookUrl?'<a class="btn btn-small" href="'+h(state.bookUrl)+'#page='+state.page+'" target="_blank" rel="noopener">Abrir libro ↗</a>':'')
 +'<button class="btn btn-small" data-do="phonetics-open">Pronunciación · AFI</button>'
 +'<button class="btn btn-small" data-do="toggle-work" aria-expanded="'+state.workOpen+'">'+(state.workOpen?'Ocultar cuaderno':'Abrir cuaderno')+'</button>'
 +'<button class="btn btn-small" data-do="complete">'+(state.done[chapterId(current())]?'✓ Capítulo terminado':'Marcar capítulo terminado')+'</button>'
 +'</div></div>';
}
function field(key,label,greek,multi){
 var val=note(state.page).answers[key]||'';
 return '<label for="field-'+h(key)+'">'+h(label)+'</label>'+(multi?'<textarea id="field-'+h(key)+'" '+(greek?'class="greek-answer" ':'')+'data-field="'+h(key)+'" rows="'+(multi===2?8:3)+'">'+h(val)+'</textarea>':'<input type="text" id="field-'+h(key)+'" '+(greek?'class="greek-answer" ':'')+'data-field="'+h(key)+'" value="'+h(val)+'">');
}

// Las prácticas del capítulo 2 se cotejaron con el PDF privado aportado,
// páginas físicas 50–65. Sólo publicamos estructura, tipos y casillas:
// NO transcribimos el texto protegido del manual ni autocorregimos respuestas.
function chapterTwoPractice(){
 var p=state.page,parts=exercises[p]||[];
 var jumping=[[53,'2.1'],[55,'2.2'],[57,'2.3.1'],[60,'2.3.3'],[62,'2.4–2.5'],[64,'Final A/B']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 2">'
  +jumping.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(p===54)out+='<p class="duff-ch2-note">La práctica 2.1 comienza en la página 53 y continúa en esta página. Todas sus respuestas se guardan juntas: <button type="button" class="btn btn-small" data-do="page" data-page="53">Abrir práctica 2.1 (p. 53)</button></p>';
 else if(p===63)out+='<p class="duff-ch2-note">El encabezado de los ejercicios finales aparece aquí; los 24 ítems de las secciones A y B están en la página siguiente. <button type="button" class="btn btn-small" data-do="page" data-page="64">Abrir ejercicios finales (p. 64)</button></p>';
 else if(!parts.length)out+='<p class="duff-ch2-note">Esta página corresponde a la explicación, las tablas o el vocabulario. Seleccioná una práctica arriba para escribir tus respuestas, o utilizá Apuntes para las notas libres.</p>';
 parts.forEach(function(ex,ix){
  var id=ex[0],type=ex[1],description=ex[2],count=ex[3];
  var greek=id.indexOf('español → griego')>=0;
  var savedCount=0;
  for(var i=1;i<=count;i++){if(type==='case-number'){if(String(note(p).answers[id+':'+i+':caso']||'').trim()||String(note(p).answers[id+':'+i+':numero']||'').trim())savedCount++;}else if(String(note(p).answers[id+':'+i]||'').trim())savedCount++;}
  out+='<details class="duff-exercise duff-ch2-group" '+(ix===0?'open':'')+'>'
    +'<summary>'+h(id)+' <span class="duff-ch2-count">'+count+' ítems'+(savedCount?' · '+savedCount+' con respuesta':'')+'</span></summary>'
    +'<p>'+h(description)+'. Consultá los enunciados en el PDF privado, a la izquierda. Las respuestas se guardan por página y no se corrigen hasta que lo pidas.</p>';
  if(type==='case-number'){
    for(var c=1;c<=count;c++){
      out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+c+'</div><div class="duff-answer-pair">'
        +'<div>'+field(id+':'+c+':caso','Caso (nominativo / acusativo)',false,false)+'</div>'
        +'<div>'+field(id+':'+c+':numero','Número (singular / plural)',false,false)+'</div>'
        +'</div></div>';
    }
  }else{
    for(var j=1;j<=count;j++){
      out+='<div class="duff-answer-row">'+field(id+':'+j,'Ítem '+j,greek,true)+'</div>';
    }
  }
  out+='</details>';
 });
 var legacy=Object.keys(note(p).answers).filter(function(k){return k.indexOf('ch2:free:')===0&&String(note(p).answers[k]||'').trim();});
 if(legacy.length||!parts.length){
   out+='<details class="duff-exercise duff-ch2-group"><summary>Cuaderno libre de esta página'+(legacy.length?' · '+legacy.length+' respuesta(s) anterior(es)':'')+'</summary><p>Casillas opcionales conservadas del cuaderno anterior. No se borraron ni se trasladaron respuestas. Para las prácticas numeradas, usá las secciones de arriba.</p>'
   +[1,2,3,4,5,6,7,8,9,10].map(function(n){return field('ch2:free:'+n,'Casilla libre '+n,true,true);}).join('')+'</details>';
 }
 return out+reviewPanel(p);
}

function practice(){
 if(current()===1)return chapterTwoPractice();
 var parts=exercises[state.page]||[];
 if(state.page===53||state.page===55){var legacy=note(state.page).answers;var saved=Object.keys(legacy).filter(function(k){return k.indexOf('ch2:free:')===0&&String(legacy[k]||'').trim();});if(saved.length){var warning='<details class="duff-exercise"><summary>Respuestas anteriores en casillas provisionales ('+saved.length+')</summary><p class="note">Conservadas sin cambios. Podés trasladarlas a las casillas específicas cuando quieras.</p>'+saved.map(function(k){return '<p><b>'+h(k)+'</b>: '+h(legacy[k])+'</p>';}).join('')+'</details>';return parts.map(function(ex){var id=ex[0],count=ex[3],out='<div class="duff-exercise"><h3>Práctica '+h(id)+'</h3><p>'+h(ex[2])+'. Consultá los enunciados en el PDF privado.</p>';for(var i=1;i<=count;i++)out+=field(id+':'+i,'Ítem '+i,/español → griego/.test(id),2);return out+'</div>';}).join('')+warning+reviewPanel(state.page);}}
 if(!parts.length){
  if(state.page>=50&&state.page<=65){
   return '<div class="duff-exercise"><h3>Cuaderno libre · capítulo 2 · página '+state.page+'</h3><p class="note">Campos provisionales para responder mirando tu PDF privado. Todavía no se verificaron los enunciados ni la cantidad de ítems de esta página; no son una transcripción del libro. Si la página es solo teoría, podés dejarlos vacíos.</p>'
    +field('ch2:free:1','Respuesta / ejercicio 1',true,2)
    +field('ch2:free:2','Respuesta / ejercicio 2',true,2)
    +field('ch2:free:3','Respuesta / ejercicio 3',true,2)
    +'<details class="duff-exercise"><summary>Más respuestas para esta página (4–10)</summary><p class="note">Usá estas casillas solo si la página tiene más apartados. Conservan el guardado privado por página.</p>'
    +[4,5,6,7,8,9,10].map(function(n){return field('ch2:free:'+n,'Respuesta / ejercicio '+n,true,2);}).join('')
    +'</details></div>';
  }
  return '<p class="note">En esta página podés tomar apuntes. Las prácticas numeradas tienen sus propias casillas en las páginas indicadas arriba.</p>';
 }
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
 }).join('')+reviewPanel(state.page);
}

function reviewPanel(p){
 var review=state.reviews[p];
 if(review&&state.workTab==='exercise'&&state.page===p){try{localStorage.setItem('lv:duff:review-seen:'+p,String(review.reviewed_at));}catch(e){}}
 if(!review)return '<section class="duff-review" aria-label="Corrección del tutor"><h3>Corrección del tutor</h3><p>Esta página todavía no tiene una devolución guardada.</p><button type="button" class="btn btn-small" data-do="refresh-review">Buscar corrección</button></section>';
 var sections=review.sections||{};
 var items=Object.keys(sections).map(function(key){
  var val=sections[key];
  return '<div class="duff-review-part"><b>Sección '+h(key)+'</b>'+(Array.isArray(val)?'<ol>'+val.map(function(line){return '<li>'+h(line)+'</li>';}).join('')+'</ol>':'<p>'+h(val)+'</p>')+'</div>';
 }).join('');
 return '<section class="duff-review" aria-label="Corrección del tutor"><h3>Corrección del tutor · '+h(review.practice||'página '+p)+'</h3><p class="duff-review-date">Revisión: '+h(review.reviewed_at||'fecha no indicada')+'</p><p>'+h(review.summary||'')+'</p>'+items+'<p class="note">Tus respuestas originales se conservan. Una variante de transliteración válida no es un error.</p><button type="button" class="btn btn-small" data-do="refresh-review">Actualizar corrección</button></section>';
}
async function refreshReview(){
 if(!state.user||state.user.id!==OWNER)return;
 var p=state.page,button=document.querySelector('[data-do="refresh-review"]');
 if(button){button.disabled=true;button.textContent='Consultando…';}
 var res=await client.from('lingua_notes').select('body').eq('user_id',OWNER).eq('lesson_id','duff:review:p:'+p).maybeSingle();
 if(res.error){if(button){button.disabled=false;button.textContent='No se pudo consultar · Reintentar';}return;}
 if(res.data){try{state.reviews[p]=JSON.parse(res.data.body);}catch(e){}}
 if(p===state.page){var work=document.getElementById('duff-work');if(work)work.outerHTML=workbook();}
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

function phoneticsModal(){return window.LINGUA_GREEK_PHONETICS_UI?window.LINGUA_GREEK_PHONETICS_UI.render(state,letters,letterExamples,greekResources,h):'';}
function openPhonetics(){
 if(state.phoneticsOpen)return;
 closeGreekCard();state.phoneticsOpen=true;app.insertAdjacentHTML('beforeend',phoneticsModal());
 var close=app.querySelector('[data-do="phonetics-close"]');if(close)close.focus();
}
function closePhonetics(){
 if(!state.phoneticsOpen)return;
 state.phoneticsOpen=false;
 var el=document.getElementById('duff-phonetics-overlay');if(el)el.remove();
 var btn=app.querySelector('[data-do="phonetics-open"]');if(btn)btn.focus();
}
function updatePhoneticsModal(){
 var el=document.getElementById('duff-phonetics-overlay');if(!el)return;
 var template=document.createElement('template');template.innerHTML=phoneticsModal();
 var next=template.content.querySelector('#duff-phonetics-overlay');if(!next)return;
 ['.duff-phonetics-selected','.duff-phonetics-table-wrap','.duff-phonetics-tabs'].forEach(function(selector){
  var oldNode=el.querySelector(selector),newNode=next.querySelector(selector);
  if(oldNode&&newNode){if(selector==='.duff-phonetics-table-wrap')newNode.scrollLeft=oldNode.scrollLeft;oldNode.replaceWith(newNode);}
 });
}
function setWorkTab(tab){
 if(['exercise','notes','vocab','questions'].indexOf(tab)<0)return;
 state.workTab=tab;
 var work=document.getElementById('duff-work');if(work)work.outerHTML=workbook();
}

function questionPanel(){
 var recent=state.questions.filter(function(q){return q.lesson_id===chapterId(current());}).slice(0,4);
 return '<section class="duff-question"><h3>¿Una pregunta sobre esta parte?</h3><p class="note">La pregunta se guarda en tu cuenta para revisión del tutor; no llega como mensaje en tiempo real a este chat.</p><textarea id="duff-question-text" placeholder="Por ejemplo: ¿por qué θ no se pronuncia como la z argentina?"></textarea><button class="btn btn-small" data-do="question">Enviar pregunta</button><div id="duff-question-msg" class="duff-message"></div>'+recent.map(function(q){return '<div class="duff-reply"><b>'+h(q.status==='reviewed'?'Respondida':'Pendiente')+'</b><p>'+h(q.body)+'</p>'+(q.feedback?'<p><b>Respuesta:</b> '+h(q.feedback)+'</p>':'')+'</div>';}).join('')+'</section>';
}
function keyboard(){
 return '<details class="duff-exercise duff-keyboard-details"><summary>Teclado griego</summary><p>Seleccioná una casilla y pulsá las letras. Añadí espíritus y acentos después de la vocal.</p><div class="duff-keyboard">'
 +letters.map(function(l){return '<button type="button" data-do="insert" data-char="'+l[0]+'">'+l[0]+'</button>';}).join('')
 +'<button type="button" data-do="insert" data-char="ς">ς</button>'
 +'<button type="button" data-do="insert" data-cp="0313" title="Espíritu suave">᾿</button>'
 +'<button type="button" data-do="insert" data-cp="0314" title="Espíritu áspero">῾</button>'
 +'<button type="button" data-do="insert" data-cp="0301" title="Acento agudo">´</button>'
 +'<button type="button" data-do="insert" data-cp="0342" title="Circunflejo">῀</button>'
 +'<button type="button" data-do="insert" data-cp="0345" title="Iota suscrita">ͅ</button>'
 +'<button type="button" data-do="insert" data-char=" ">espacio</button></div></details>';
}
function greekResources(){
 return '<section class="duff-exercise" id="greek-resources"><h3>Recursos para escuchar y analizar</h3>'
  +'<div class="duff-resource"><b>Koine Foundations · Pronunciación del alfabeto</b><p>Escuchá las letras y compará θ, ζ y χ con las explicaciones de arriba. El modelo de pronunciación puede diferir del empleado por Duff.</p><a href="https://koinefoundations.com/instructor-videos/" target="_blank" rel="noopener noreferrer">Vídeos de pronunciación ↗</a></div>'
  +'<div class="duff-resource"><b>STEP Bible · Análisis del NT</b><p>Buscá Juan 1:1 y compará el lema y el análisis de ἦν, λόγος y θεόν con las fichas de Lengua Viva.</p><a href="https://www.stepbible.org/" target="_blank" rel="noopener noreferrer">Abrir STEP Bible ↗</a></div></section>';
}
function closeGreekCard(){
 document.querySelector('.greek-card')?.remove();
 document.querySelectorAll('.greek-word[aria-expanded="true"]').forEach(function(x){x.setAttribute('aria-expanded','false');});
}

function morphologyES(entry){
 if(!entry)return 'Análisis todavía no disponible';
 if(entry.morph)return entry.morph;
 var codes=entry.parse||'--------',cat=entry.cat||'';
 var casa={N:'nominativo',G:'genitivo',D:'dativo',A:'acusativo',V:'vocativo'};
 var generos={M:'masculino',F:'femenino',N:'neutro'};
 var numero={S:'singular',P:'plural'};
 var tiempos={P:'presente',I:'imperfecto',F:'futuro',A:'aoristo',X:'perfecto',Y:'pluscuamperfecto'};
 var voces={A:'activa',M:'media',P:'pasiva'};
 var modos={I:'indicativo',D:'imperativo',S:'subjuntivo',O:'optativo',N:'infinitivo',P:'participio'};
 if(cat==='V-'){
  var p=[];
  if(tiempos[codes[1]])p.push(tiempos[codes[1]]);
  if(voces[codes[2]])p.push('voz '+voces[codes[2]]);
  if(modos[codes[3]])p.push(modos[codes[3]]);
  if(/[123]/.test(codes[0]))p.push(codes[0]+'.ª persona');
  if(numero[codes[5]])p.push(numero[codes[5]]);
  if(casa[codes[4]])p.push(casa[codes[4]]);
  if(generos[codes[6]])p.push(generos[codes[6]]);
  return p.join(' · ')||'Verbo · forma sin desambiguar';
 }
 var p=[];
 if(casa[codes[4]])p.push(casa[codes[4]]);
 if(numero[codes[5]])p.push(numero[codes[5]]);
 if(generos[codes[6]])p.push(generos[codes[6]]);
 return p.join(' · ')||'Invariable';
}
function categoriaES(code){
 return ({'A-':'Adjetivo','C-':'Conjunción','D-':'Adverbio','I-':'Interjección','N-':'Sustantivo','P-':'Preposición',
 'RA':'Artículo definido','RD':'Pronombre demostrativo','RI':'Pronombre interrogativo/indefinido','RP':'Pronombre personal',
 'RR':'Pronombre relativo','V-':'Verbo','X-':'Partícula'})[code]||'Palabra griega';
}
function greekToken(entry,ref,index){
 var raw=entry.form||'',form=raw.replace(/[.,·;:!?()«»]+$/u,''),punct=raw.slice(form.length),display=entry.gloss||'';
 return '<span class="greek-token"><button type="button" class="greek-word" data-do="greek-word" data-ref="'+h(ref)+'" data-index="'+index+'" data-form="'+h(form)+'" aria-expanded="false" title="Ver lema y morfología">'+h(form)+'</button>'+h(punct)
  +(state.greekInterlinear?'<span class="greek-token-gloss" lang="es">'+h(display)+'</span>':'')+'</span> ';
}
function greekVerseRow(v,small){
 return '<div class="greek-verse'+(small?' duff-nt-excerpt':'')+'"><span class="micro">'+h(v.ref)+'</span>'
   +(v.theme?'<span class="duff-excerpt-theme">'+h(v.theme)+'</span>':'')
   +'<div class="greek-verse-text'+(state.greekInterlinear?' greek-verse-interlinear':'')+'" lang="grc">'+v.words.map(function(w,i){return greekToken(w,v.ref,i);}).join('')+'</div>'
   +(state.greekTranslation?'<div class="greek-translation" lang="es">'+h(v.translation)+'</div>':'')+'</div>';
}
function readingLookup(button){
 var data=window.GREEK_READER;
 if(!data)return null;
 var v=(data.verses||[]).concat(data.chapterTwo||[]).find(function(row){return row.ref===button.dataset.ref;});
 return v&&v.words ? v.words[Number(button.dataset.index)] : null;
}
function showGreekCard(button){
 var word=button.dataset.form,entry=readingLookup(button);
 var data=window.GREEK_READER,opened=button.getAttribute('aria-expanded')==='true';
 if(!entry)entry=data&&data.lexicon&&data.lexicon[word];
 closeGreekCard();if(opened||!entry)return;
 button.setAttribute('aria-expanded','true');
 var noteOld=data&&data.lexicon&&data.lexicon[word],noteText=noteOld&&noteOld.note||'';
 var lemma=entry.lemma||word,category=entry.category||categoriaES(entry.cat),morph=morphologyES(entry);
 var already=vocabCards().some(function(card){return greekLemmaKey(card.lemma||card.form)===greekLemmaKey(lemma);});
 var pop=document.createElement('div');pop.className='greek-card';pop.setAttribute('role','dialog');pop.setAttribute('aria-label','Análisis de '+word);
 pop.innerHTML='<div class="micro">FICHA MORFOLÓGICA · '+h(button.dataset.ref||'JUAN')+'</div><strong lang="grc">'+h(word)+'</strong>'
   +'<div class="greek-card-row"><b>Lema</b><span lang="grc">'+h(lemma)+'</span></div>'
   +'<div class="greek-card-row"><b>Categoría</b><span>'+h(category)+'</span></div>'
   +'<div class="greek-card-row"><b>Morfología</b><span>'+h(morph)+'</span></div>'
   +'<div class="greek-card-row"><b>Sentido</b><span>'+h(entry.gloss||'Pendiente')+'</span></div>'
   +(noteText?'<p>'+h(noteText)+'</p>':'')
   +'<button type="button" class="btn btn-small greek-add-lemma" data-do="add-greek-lemma" data-lemma="'+h(lemma)+'" data-gloss="'+h(entry.gloss||'')+'" data-form="'+h(word)+'" data-category="'+h(category)+'" '+(already?'disabled':'')+'>'+(already?'✓ Lema en mis tarjetas':'＋ Añadir lema a mis tarjetas')+'</button>'
   +'<a href="https://www.stepbible.org/" target="_blank" rel="noopener noreferrer">Consultar en STEP Bible ↗</a>'
   +'<button type="button" class="duff-close" data-do="close-card" aria-label="Cerrar ficha">×</button>';
 document.body.append(pop);
 var rect=button.getBoundingClientRect(),w=pop.getBoundingClientRect().width,ph=pop.getBoundingClientRect().height;
 pop.style.left=Math.min(Math.max(12,rect.left),Math.max(12,window.innerWidth-w-12))+'px';
 pop.style.top=(rect.bottom+10+ph>window.innerHeight?Math.max(12,rect.top-ph-10):rect.bottom+10)+'px';
}
function readingPanel(){
 var data=window.GREEK_READER;
 if(!data)return '';
 var john=state.page>=46&&state.page<=48;
 var excerpts=(data.chapterTwo||[]).filter(function(v){return v.page===state.page;});
 if(!john&&!excerpts.length)return '';
 var head=john?'Juan 1:1–23 · lectura anotada':'Citas del Nuevo Testamento · capítulo 2';
 var out='<section class="duff-greek-reader" id="lectura-juan"><div class="grammar-head"><div><div class="micro">LECTURA FILOLÓGICA · '+(john?'EVANGELIO SEGÚN JUAN':'PASAJES CITADOS POR DUFF')+'</div><h2>'+head+'</h2></div></div>'
 +'<p>Seleccioná una palabra para leer su traducción, lema y morfología; podés añadir el lema a tus tarjetas sin duplicarlo. El texto griego es de una edición independiente del libro.</p>'
 +'<div class="duff-reading-actions"><button type="button" class="btn btn-small" data-do="greek-translation" aria-pressed="'+state.greekTranslation+'">'+(state.greekTranslation?'Ocultar traducción':'Mostrar traducción')+'</button>'
 +'<button type="button" class="btn btn-small" data-do="greek-interlinear" aria-pressed="'+state.greekInterlinear+'">'+(state.greekInterlinear?'Ocultar glosas':'Ver glosas palabra por palabra')+'</button></div>';
 if(john){
  var groups=[[1,7],[8,14],[15,19],[20,23]];
  groups.forEach(function(g){
    var shouldOpen=state.page===46?g[0]===1:state.page===47?g[0]===8: g[0]===20;
    out+='<details class="duff-reading-group" '+(shouldOpen?'open':'')+'><summary>Juan 1:'+g[0]+'–'+g[1]+' <span>('+ (g[1]-g[0]+1)+' versículos)</span></summary>';
    out+=data.verses.filter(function(v){return v.n>=g[0]&&v.n<=g[1];}).map(function(v){return greekVerseRow(v,false);}).join('');
    out+='</details>';
  });
  out+='<p class="note">En el ejercicio 1, Duff imprime Juan 1:1–14 (PDF pp. 46–47). En el ejercicio 2 propone reconstruir Juan 1:15–23 desde su transcripción fonética (PDF pp. 47–48). El texto griego de consulta se ofrece por separado y se puede ocultar la traducción.</p>';
 }else out+=excerpts.map(function(v){return greekVerseRow(v,true);}).join('');
 out+='<p class="note">'+h(data.notice)+'</p></section>';
 return out;
}

function unreadReviews(){return Object.keys(state.reviews).filter(function(p){var r=state.reviews[p];try{return r&&r.reviewed_at&&localStorage.getItem('lv:duff:review-seen:'+p)!==String(r.reviewed_at);}catch(e){return false;}});}

function greekLemmaKey(lemma){
 return String(lemma||'').normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/ς/g,'σ').trim();
}
function vocabCards(){
 var local=[];try{local=JSON.parse(localStorage.getItem('lv:duff:vocab:'+OWNER)||'[]');}catch(e){}
 var remote=Array.isArray(state.vocabCards)?state.vocabCards:[];
 var ids={};return remote.concat(local).filter(function(c){
   if(!c||!c.id||ids[c.id])return false;
   ids[c.id]=true;return true;
 });
}
function persistVocabCards(cards){
 if(!state.user||state.user.id!==OWNER||!client)return Promise.resolve({error:'No hay una sesión autorizada.'});
 return client.from('lingua_notes').upsert({
  user_id:OWNER,lesson_id:'duff:cards',body:JSON.stringify(cards),updated_at:new Date().toISOString()
 },{onConflict:'user_id,lesson_id'}).then(function(result){
  if(result.error)return {error:result.error.message};
  state.vocabCards=cards;
  try{localStorage.setItem('lv:duff:vocab:'+OWNER,JSON.stringify(cards));}catch(e){}
  return {error:null};
 });
}
function greekCardId(lemma){
 return 'lemma-'+Array.from(greekLemmaKey(lemma)).map(function(ch){return ch.codePointAt(0).toString(16);}).join('-');
}
async function addGreekLemma(lemma,form,gloss,category){
 if(!lemma)return {error:'No se pudo determinar el lema.'};
 var cards=vocabCards(),key=greekLemmaKey(lemma);
 var existing=cards.find(function(c){return greekLemmaKey(c.lemma||c.form)===key;});
 var bookDeck='duff-ch'+(current()+1),pageRef=state.page>=46&&state.page<=48?'juan1':'duff-ch2';
 var decks=['duff',bookDeck,pageRef];
 if(existing){
  var nextDecks=[...new Set((existing.decks||[]).concat(decks))];
  if(nextDecks.length===(existing.decks||[]).length)return {already:true,error:null};
  cards=cards.map(function(c){return c.id===existing.id?Object.assign({},c,{decks:nextDecks}):c;});
 }else{
  cards.push({id:greekCardId(lemma),language:'griego-biblico',lemma:lemma,form:form||lemma,meaning:gloss||'Sin glosa',category:category||'',chapter:current()+1,page:state.page,decks:decks});
 }
 var result=await persistVocabCards(cards);
 return result.error?result:{already:Boolean(existing),error:null};
}

function vocabPanel(){
 var cards=vocabCards();
 return '<section class="duff-exercise"><h3>Mis tarjetas · '+cards.length+'</h3><p class="note">Escribí o pegá palabras que encontrás en el PDF. Las tarjetas se guardan de forma privada en tu cuenta de Lengua Viva y se pueden repasar en el mazo común. Los lemas no se duplican al encontrarlos en diferentes pasajes.</p><form id="duff-vocab-form"><label>Palabra griega<input name="form" lang="grc" required placeholder="λόγος"></label><label>Significado<input name="meaning" required placeholder="palabra, discurso"></label><label>Lema (opcional)<input name="lemma" lang="grc" placeholder="λόγος"></label><button type="submit" class="btn btn-small">Agregar tarjeta</button></form><p id="duff-vocab-message" role="status"></p><div class="duff-vocab-list">'+cards.map(function(c){return '<div class="duff-exercise"><b lang="grc">'+h(c.form)+'</b> · '+h(c.meaning)+'<p class="note">Lema: '+h(c.lemma||c.form)+' · Cap. '+c.chapter+' · pág. '+c.page+'</p><button type="button" class="btn btn-small" data-do="vocab-remove" data-id="'+h(c.id)+'">Quitar</button></div>';}).join('')+'</div></section>';
}
function workbook(){
 if(!state.workOpen)return '';
 var tabs=[['exercise','Ejercicios'],['notes','Apuntes'],['vocab','Tarjetas'],['questions','Preguntas']];
 var body=state.workTab==='exercise'
  ?(current()===0?'<div class="duff-index" aria-label="Ir a prácticas del capítulo 1"><button data-do="page" data-page="39">1.1</button><button data-do="page" data-page="41">1.2</button><button data-do="page" data-page="43">1.3–1.4</button><button data-do="page" data-page="45">1.5–1.6</button><button data-do="page" data-page="46">Ej. 1</button><button data-do="page" data-page="48">Ej. 2</button></div>':'')+practice()+keyboard()+'<div class="duff-save-actions"><button type="button" class="btn btn-small" data-do="save">Guardar ejercicios ahora</button><span id="duff-save-status" class="duff-status" role="status">'+h(state.saveStatus||'Guardado automático activado')+'</span></div>'
  :state.workTab==='notes'
  ?'<div class="duff-exercise"><h3>Mis apuntes · página '+state.page+'</h3><textarea id="duff-general" rows="7" placeholder="Anotá dudas, traducciones o lo que quieras…">'+h(note(state.page).general)+'</textarea><div id="duff-save-status" class="duff-status">'+h(state.saveStatus||'Los cambios se guardan automáticamente.')+'</div><button class="btn btn-small" data-do="save">Guardar ahora</button></div>'+keyboard()
  :state.workTab==='vocab'?vocabPanel():questionPanel();
 return '<aside class="duff-work" id="duff-work" aria-label="Cuaderno personal"><div class="duff-work-head"><div><div class="micro">CUADERNO PERSONAL</div><h2>Capítulo '+(current()+1)+' · pág. '+state.page+'</h2></div><button type="button" class="btn btn-small" data-do="toggle-work" aria-label="Cerrar cuaderno">Ocultar ×</button></div>'
  +(unreadReviews().length?'<button type="button" class="btn btn-small duff-new-reviews" data-do="show-new-reviews">● '+unreadReviews().length+' corrección(es) nueva(s)</button>':'')+'<div class="duff-work-tabs" role="group" aria-label="Secciones del cuaderno">'+tabs.map(function(t){return '<button type="button" data-do="work-tab" data-tab="'+t[0]+'" aria-pressed="'+(t[0]===state.workTab)+'">'+t[1]+'</button>';}).join('')+'</div>'
  +'<div class="duff-work-scroll">'+body+'</div></aside>';
}
function ensureTimer(){
 if(timer||!state.user||state.user.id!==OWNER||!window.LINGUA_GREEK_TIMER)return;
 timer=window.LINGUA_GREEK_TIMER.create({client:client,userId:OWNER,lessonId:chapterId(current())});
 timer.load().then(function(){if(timer)timer.updateUI();});
}
function render(){
 if(state.loading){app.innerHTML='<div class="duff-loading">Comprobando la sesión…</div>';return;}
 if(!state.user){app.innerHTML=auth();return;}
 if(state.user.id!==OWNER){app.innerHTML=blocked();return;}
 var c=current();
 app.innerHTML=header()+'<div class="duff-banner"><div class="duff-banner-inner"><div><div class="eyebrow">Jeremy Duff · Editorial CLIE · edición española</div><h1 class="duff-title">Capítulo '+(c+1)+'. '+h(chapters[c][0])+'</h1><p class="duff-subtitle">Secuencia original del manual · 20 capítulos · PDF de 522 páginas</p></div><span class="chip">Solo tu cuenta</span></div></div><div class="duff-shell '+(state.workOpen?'':'work-collapsed')+'">'+nav()+'<main class="duff-reader"><p class="note">El original se lee en su formato íntegro; el cuaderno de ejercicios está separado y se guarda en privado.</p>'+toolbar()+pdf()+readingPanel()+'</main>'+workbook()+'</div>'+(state.phoneticsOpen?phoneticsModal():'')+'<div class="duff-privacy">El archivo del libro no se publica en GitHub Pages: se descarga únicamente tras iniciar sesión y superar las reglas de acceso del almacenamiento privado. Las respuestas se guardan en tu cuenta.</div>';
 if(timer)timer.updateUI();
 if(state.pdfDocument)window.requestAnimationFrame(renderPdfPage);
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
function go(p){closeGreekCard();if(!state.user||state.user.id!==OWNER)return;p=Number(p);if(!Number.isFinite(p)||p<1||p>state.pdfPageCount)return;var oldChapter=current();state.page=Math.floor(p);if(timer&&current()!==oldChapter)timer.setLesson(chapterId(current()));state.workTab=(exercises[state.page]||(state.page>=50&&state.page<=65))?'exercise':'notes';state.lastInput=null;state.saveStatus='';render();bookmark(state.page);history.replaceState(null,'','#pagina='+state.page);}
async function loadData(){
 var notes=await client.from('lingua_notes').select('lesson_id,body').eq('user_id',OWNER).like('lesson_id','duff:%').limit(1000);
 if(notes.error)state.bookError='No se pudieron cargar los apuntes: '+notes.error.message;
 (notes.data||[]).forEach(function(r){
  if(r.lesson_id==='duff:bookmark'&&!location.hash){try{state.page=JSON.parse(r.body).page||33;}catch(e){}}
  else if(r.lesson_id==='duff:cards'){try{var parsed=JSON.parse(r.body);if(Array.isArray(parsed))state.vocabCards=parsed;}catch(e){}}
  else if(r.lesson_id.indexOf('duff:review:p:')===0){try{state.reviews[Number(r.lesson_id.slice('duff:review:p:'.length))]=JSON.parse(r.body);}catch(e){}}
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
 cancelPdfRender();
 if(state.pdfDocument){try{await state.pdfDocument.destroy();}catch(e){}state.pdfDocument=null;}
 if(state.bookUrl)window.URL.revokeObjectURL(state.bookUrl);
 state.bookUrl=window.URL.createObjectURL(res.data);
 state.bookError='';state.pdfError='';state.pdfLoading=true;render();
 try{
  if(!window.pdfjsLib)throw Error('No se cargó PDF.js. Revisá tu conexión o los bloqueadores de scripts.');
  window.pdfjsLib.GlobalWorkerOptions.workerSrc='https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/build/pdf.worker.min.js';
  var bytes=await res.data.arrayBuffer();
  if(new TextDecoder('ascii').decode(bytes.slice(0,5))!=='%PDF-')throw Error('El archivo descargado no tiene una cabecera PDF válida.');
  var task=window.pdfjsLib.getDocument({data:new Uint8Array(bytes)});
  state.pdfDocument=await task.promise;
  state.pdfPageCount=state.pdfDocument.numPages;
  if(state.page>state.pdfPageCount)state.page=state.pdfPageCount;
 }catch(e){
  state.pdfError=e&&e.message?e.message:String(e);
  console.error('Lengua Viva PDF viewer:',e);
 }finally{state.pdfLoading=false;render();}
}
async function init(){
 if(!client){state.loading=false;state.authMessage='No se pudo cargar el sistema de acceso. Revisá tu conexión.';render();return;}
 var sess=await client.auth.getSession();
 state.user=sess.data&&sess.data.session?sess.data.session.user:null;
 state.loading=false;render();
 if(state.user&&state.user.id===OWNER){await loadData();ensureTimer();render();await loadBook();}
 client.auth.onAuthStateChange(function(event,session){
  var uid=session&&session.user?session.user.id:null;
  if(uid!==(state.user&&state.user.id)){if(timer){timer.stop();timer=null;}state.user=session?session.user:null;if(!state.user&&state.bookUrl){cancelPdfRender();if(state.pdfDocument){state.pdfDocument.destroy();state.pdfDocument=null;}window.URL.revokeObjectURL(state.bookUrl);state.bookUrl=null;}render();if(uid===OWNER){loadData().then(function(){ensureTimer();render();loadBook();});}}
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
app.addEventListener('submit',async function(e){
 if(e.target.id!=='duff-vocab-form')return;
 e.preventDefault();
 var data=new FormData(e.target),form=String(data.get('form')||'').trim(),meaning=String(data.get('meaning')||'').trim(),lemma=String(data.get('lemma')||'').trim();
 if(!form||!meaning)return;
 var response=await addGreekLemma(lemma||form,form,meaning,'Vocabulario personal');
 if(response.error){var msg=document.getElementById('duff-vocab-message');if(msg)msg.textContent='No se guardó en la cuenta: '+response.error;return;}
 if(response.already){var msg=document.getElementById('duff-vocab-message');if(msg)msg.textContent='Ese lema ya está en tus tarjetas; no se duplicó.';return;}
 setWorkTab('vocab');
});
app.addEventListener('click',async function(e){
 var b=e.target.closest('[data-do]');if(!b)return;var act=b.dataset.do;
 if(act==='greek-word'){showGreekCard(b);return;}
 if(act==='close-card'){closeGreekCard();return;}
 if(act==='greek-translation'){state.greekTranslation=!state.greekTranslation;closeGreekCard();render();return;}
 if(act==='greek-interlinear'){state.greekInterlinear=!state.greekInterlinear;closeGreekCard();render();return;}
 if(act==='phonetics-open'){openPhonetics();return;}
 if(act==='phonetics-close'){closePhonetics();return;}
 if(act==='phonetics-group'){state.phoneticsGroup=b.dataset.group;state.phoneticsIndex=0;updatePhoneticsModal();return;}
 if(act==='phonetics-select'){state.phoneticsIndex=Number(b.dataset.index);updatePhoneticsModal();return;}
 if(act==='work-tab'){setWorkTab(b.dataset.tab);return;}
 if(act==='vocab-remove'){var next=vocabCards().filter(function(c){return c.id!==b.dataset.id;});var outcome=await persistVocabCards(next);if(outcome.error){alert('No se pudo quitar la tarjeta: '+outcome.error);return;}setWorkTab('vocab');return;}
 if(act==='refresh-review'){await refreshReview();return;}
 if(act==='show-new-reviews'){var pages=unreadReviews();if(pages.length){go(Number(pages[0]));state.workTab='exercise';render();}return;}
 if(act==='toggle-work'){state.workOpen=!state.workOpen;render();return;}
 if(act==='timer-toggle'){if(timer)timer.togglePause();return;}
 if(act==='logout'){await client.auth.signOut();return;}
 if(act==='page')go(b.dataset.page);
 if(act==='prev')go(state.page-1);
 if(act==='pdf-zoom-in'){state.pdfZoom=Math.min(2.5,Math.round((state.pdfZoom+.2)*10)/10);render();}
 if(act==='pdf-zoom-out'){state.pdfZoom=Math.max(.6,Math.round((state.pdfZoom-.2)*10)/10);render();}
 if(act==='pdf-fit'){state.pdfZoom=1;render();}
 if(act==='retry-pdf'){loadBook();}
 if(act==='next')go(state.page+1);
 if(act==='save'){clearTimeout(state.saveTimers[state.page]);await savePage(state.page);return;}
 if(act==='insert'){
  var input=state.lastInput;
  if(!input||!document.contains(input)){input=document.querySelector('[data-field],#duff-general');}
  if(input){var ch=b.dataset.cp?String.fromCodePoint(parseInt(b.dataset.cp,16)):b.dataset.char;var a=input.selectionStart||0,z=input.selectionEnd||a;input.setRangeText(ch,a,z,'end');input.focus({preventScroll:true});input.dispatchEvent(new Event('input',{bubbles:true}));}
 }
 if(act==='check'){
  var id=b.dataset.ex,key=answerKeys[id],values=key.map(function(x,i){return note(state.page).answers[id+':'+(i+1)]||'';}),el=document.getElementById('check-'+id);
  if(values.some(function(x){return !x;})){el.textContent='Respondé los cinco ítems antes de comprobar.';return;}
  var score=values.filter(function(x,i){return x===key[i];}).length;
  el.textContent=score+'/5 correctas. '+(score===5?'¡Muy bien!':'Revisá los ítems '+values.map(function(x,i){return x===key[i]?'':i+1;}).filter(Boolean).join(', ')+'.');
 }
 if(act==='choice'){
  note(state.page).answers[b.dataset.key]=b.dataset.value;scheduleSave(state.page);
  app.querySelectorAll('[data-do="choice"]').forEach(function(x){if(x.dataset.key===b.dataset.key)x.setAttribute('aria-pressed',String(x.dataset.value===b.dataset.value));});
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
document.addEventListener('click',async function(e){var add=e.target.closest('[data-do="add-greek-lemma"]');if(add){add.disabled=true;add.textContent='Guardando…';var result=await addGreekLemma(add.dataset.lemma,add.dataset.form,add.dataset.gloss,add.dataset.category);if(result.error){add.disabled=false;add.textContent='Error: '+result.error+' · Reintentar';}else{add.textContent=result.already?'✓ Lema ya guardado':'✓ Lema añadido a mis tarjetas';add.disabled=true;}return;}if(e.target.closest('.duff-close')){closeGreekCard();return;}if(!e.target.closest('[data-do="greek-word"],.greek-card'))closeGreekCard();});
window.addEventListener('scroll',closeGreekCard,{passive:true});
document.addEventListener('keydown',function(e){if(e.key==='Escape'){if(state.phoneticsOpen){closePhonetics();return;}closeGreekCard();}if(e.target.tagName==='INPUT'||e.target.tagName==='TEXTAREA')return;if(e.key==='ArrowRight')go(state.page+1);if(e.key==='ArrowLeft')go(state.page-1);});
window.addEventListener('resize',function(){if(state.pdfDocument&&state.user&&state.user.id===OWNER)renderPdfPage();});
window.addEventListener('pagehide',function(){cancelPdfRender();if(state.user&&state.user.id===OWNER)savePage(state.page);if(state.bookUrl)window.URL.revokeObjectURL(state.bookUrl);});
init();
})();