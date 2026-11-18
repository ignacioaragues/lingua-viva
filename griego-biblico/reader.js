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


/* Duff, capítulo 3: 106 consignas cotejadas directamente con el PDF
   físico, páginas 66–80. Los ítems se identifican por sección y número;
   el enunciado íntegro queda en el libro privado y nunca se publica aquí.
   Las respuestas NO se califican ni se autocorrigen. */
var chapterThreeExercises={
 67:[
  {id:'3-1-casos',label:'Práctica 3.1 · determinar el caso',type:'case',start:1,count:8,description:'Para cada oración, indicá el caso de la palabra subrayada en el PDF.'},
  {id:'3-1-morfologia',label:'Práctica 3.1 · caso y número',type:'case-number',start:9,count:8,description:'Para cada forma griega, indicá caso y número.'}
 ],
 69:[
  {id:'3-2-gr-es',label:'Práctica 3.2 · griego → español',type:'translation',start:1,count:4,description:'Traducción de los cuatro primeros ítems al español.'},
  {id:'3-2-es-gr',label:'Práctica 3.2 · español → griego',type:'greek',start:5,count:2,description:'Escritura en griego de los ítems 5 y 6.'},
  {id:'mitad-gr-es',label:'Práctica a mitad de camino · griego → español',type:'translation',start:1,count:8,description:'Primera parte de la práctica intermedia.'},
  {id:'mitad-es-gr',label:'Práctica a mitad de camino · español → griego',type:'greek',start:9,count:4,description:'Últimos cuatro ítems de la práctica intermedia.'}
 ],
 71:[
  {id:'3-3-2-morfologia',label:'Práctica 3.3.2 · caso y número',type:'case-number',start:1,count:8,description:'Clasificá las ocho formas nominales por caso y número.'}
 ],
 72:[
  {id:'3-3-3-articulo',label:'Práctica 3.3.3 · artículo definido',type:'greek',start:1,count:8,description:'Escribí la forma griega del artículo que concuerda con cada palabra.'}
 ],
 74:[
  {id:'3-3-4-5-analisis',label:'Prácticas 3.3.4 y 3.3.5 · análisis de formas',type:'analysis',start:1,count:9,description:'Explicá la forma de cada sustantivo o artículo (caso, número y, cuando corresponda, género).'},
  {id:'3-3-4-5-concordancia',label:'Prácticas 3.3.4 y 3.3.5 · concordancia',type:'yesno',start:10,count:9,description:'Decidí si la concordancia entre artículo y sustantivo es correcta (sin autocorrección).'}
 ],
 75:[
  {id:'3-4-vocativo',label:'Práctica 3.4 · formas vocativas',type:'yesno',start:1,count:5,description:'Indicá si cada forma griega podría funcionar como vocativo.'}
 ],
 77:[
  {id:'3-6-gr-es',label:'Práctica 3.6 · griego → español',type:'translation',start:1,count:5,description:'Traducí las primeras cinco oraciones del griego al español.'},
  {id:'3-6-es-gr',label:'Práctica 3.6 · español → griego',type:'greek',start:6,count:3,description:'Traducí las últimas tres oraciones al griego.'}
 ],
 78:[
  {id:'finalA-gr-es',label:'Ejercicios finales · Sección A, griego → español',type:'translation',start:1,count:8,description:'Sección A, ítems 1–8 (griego → español).'},
  {id:'finalA-es-gr',label:'Ejercicios finales · Sección A, español → griego',type:'greek',start:9,count:4,description:'Sección A, ítems 9–12 (los ítems 11–12 aparecen al inicio de la página 79).'}
 ],
 79:[
  {id:'finalB-gr-es',label:'Ejercicios finales · Sección B, griego → español',type:'translation',start:1,count:8,description:'Sección B, ítems 1–8.'},
  {id:'finalB-es-gr',label:'Ejercicios finales · Sección B, español → griego',type:'greek',start:9,count:4,description:'Sección B, ítems 9–12.'},
  {id:'finalC-marcos1-1',label:'Ejercicios finales · Sección C, Marcos 1:1',type:'translation',start:1,count:1,description:'Traducí el versículo bíblico presentado en el PDF, sin anticipar una solución.'}
 ]
};
/* Duff, capítulo 4 · Las preposiciones (PDF privado pp. 81–97).
   Consignas cotejadas con el ejemplar del usuario; no reproducir enunciados.
   Las claves duff-ch4 son nuevas: las respuestas anteriores no se alteran. */
var chapterFourExercises={
 83:[
  {id:'4-1-gr-es',label:'Práctica 4.1 · griego → español',type:'translation',start:1,count:6,description:'Seis sintagmas preposicionales griegos: traducí al español.'},
  {id:'4-1-es-gr',label:'Práctica 4.1 · español → griego',type:'greek',start:7,count:3,description:'Tres sintagmas españoles: escribí la preposición y la forma griega correspondiente.'}
 ],
 87:[
  {id:'4-2-gr-es',label:'Práctica 4.2 · griego → español',type:'translation',start:1,count:6,description:'Seis sintagmas con preposiciones y distintos casos; traducí al español.'},
  {id:'4-2-es-gr',label:'Práctica 4.2 · español → griego',type:'greek',start:7,count:3,description:'Tres sintagmas españoles: traducí al griego respetando el caso exigido.'},
  {id:'mitad-gr-es',label:'Práctica a mitad de camino · griego → español',type:'translation',start:1,count:8,description:'Ocho oraciones griegas, ítems 1–3 al final de la página 87 y 4–8 en la página 88.'},
  {id:'mitad-es-gr',label:'Práctica a mitad de camino · español → griego',type:'greek',start:9,count:4,description:'Cuatro oraciones españolas de la página 88, ítems 9–12.'}
 ],
 89:[
  {id:'4-3-instrumental',label:'Práctica 4.3 · dativo instrumental',type:'yesno',start:1,count:4,description:'Para cada una de las cuatro oraciones, indicá si se emplearía dativo instrumental en griego.'}
 ],
 92:[
  {id:'4-5-6-gr-es',label:'Prácticas 4.5 y 4.6 · griego → español',type:'translation',start:1,count:6,description:'Seis oraciones griegas: preguntas y negaciones. Traducí cada una al español.'}
 ],
 94:[
  {id:'finalA-gr-es',label:'Ejercicios finales · Sección A, griego → español',type:'translation',start:1,count:8,description:'Ocho oraciones griegas de la Sección A.'},
  {id:'finalA-es-gr',label:'Ejercicios finales · Sección A, español → griego',type:'greek',start:9,count:4,description:'Cuatro oraciones españolas de la Sección A.'}
 ],
 95:[
  {id:'finalB-gr-es',label:'Ejercicios finales · Sección B, griego → español',type:'translation',start:1,count:8,description:'Ocho oraciones griegas de la Sección B.'},
  {id:'finalB-es-gr',label:'Ejercicios finales · Sección B, español → griego',type:'greek',start:9,count:4,description:'Cuatro oraciones españolas de la Sección B.'},
  {id:'finalC-juan1-1-4',label:'Ejercicios finales · Sección C, Juan 1:1–4',type:'translation',start:1,count:1,description:'Traducción del extracto de Juan 1:1–4 que aparece en el PDF. No se muestra ninguna solución.'}
 ]
};
function chapterFourPractice(){
 var p=state.page,parts=chapterFourExercises[p]||[];
 var nav=[[83,'4.1'],[87,'4.2 + mitad'],[89,'4.3'],[92,'4.5–4.6'],[94,'Final A'],[95,'Final B/C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 4">'
 +nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(p===88)out+='<p class="duff-ch2-note">La práctica a mitad de camino continúa aquí (ítems 4–12); sus casillas están reunidas en la página 87. <button class="btn btn-small" type="button" data-do="page" data-page="87">Responder práctica intermedia</button></p>';
 else if(!parts.length)out+='<p class="duff-ch2-note">Esta página contiene explicación, ejemplos, paradigmas, vocabulario o notas. Elegí una práctica en el índice.</p>';
 parts.forEach(function(ex,groupIndex){
  var answered=0;
  for(var n=ex.start;n<ex.start+ex.count;n++)if(String(note(p).answers['duff-ch4:'+ex.id+':'+n]||'').trim())answered++;
  out+='<details class="duff-exercise duff-ch2-group" '+(groupIndex===0?'open':'')+'>'
  +'<summary>'+h(ex.label)+' <span class="duff-ch2-count">'+ex.count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary>'
  +'<p>'+h(ex.description)+' Consultá el texto íntegro en el PDF privado; no se califican las respuestas.</p>';
  for(var i=ex.start;i<ex.start+ex.count;i++){
   var itemKey='duff-ch4:'+ex.id+':'+i;
   out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+i+'</div>';
   if(ex.type==='yesno'){
    var selected=note(p).answers[itemKey]||'';
    out+='<div class="duff-toggle" role="group" aria-label="Dativo instrumental en el ítem '+i+'">'
    +['sí','no'].map(function(v){return '<button type="button" data-do="choice" data-key="'+h(itemKey)+'" data-value="'+v+'" aria-pressed="'+(selected===v)+'">'+(v==='sí'?'Sí':'No')+'</button>';}).join('')+'</div>';
   }else out+=field(itemKey,ex.type==='greek'?'Tu traducción al griego':'Tu traducción al español',ex.type==='greek',2);
   out+='</div>';
  }
  out+='</details>';
 });
 return out+reviewPanel(p);
}

function chapterThreePractice(){
 var p=state.page,parts=chapterThreeExercises[p]||[];
 var nav=[[67,'3.1'],[69,'3.2 + mitad'],[71,'3.3.2'],[72,'3.3.3'],[74,'3.3.4–5'],[75,'3.4'],[77,'3.6'],[78,'Final A'],[79,'Final B/C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 3">'
  +nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(p===73)out+='<p class="duff-ch2-note">Las prácticas 3.3.4–3.3.5 empiezan al final de esta página y sus 18 ítems aparecen en la página 74. <button class="btn btn-small" type="button" data-do="page" data-page="74">Responder esas prácticas (p. 74)</button></p>';
 else if(p===79)out+='<p class="duff-ch2-note">La Sección A comenzó en la página 78 y sus dos últimos ítems siguen aquí. <button class="btn btn-small" type="button" data-do="page" data-page="78">Abrir Sección A (p. 78)</button></p>';
 else if(!parts.length)out+='<p class="duff-ch2-note">Esta página contiene explicación, paradigmas o vocabulario. Elegí una práctica en el índice o usá la pestaña Apuntes.</p>';
 parts.forEach(function(ex,groupIndex){
  var answered=0;
  for(var n=ex.start;n<ex.start+ex.count;n++){
    var key='duff-ch3:'+ex.id+':'+n;
    if(ex.type==='case-number'){
      if(String(note(p).answers[key+':caso']||'').trim()||String(note(p).answers[key+':numero']||'').trim())answered++;
    }else if(String(note(p).answers[key]||'').trim())answered++;
  }
  out+='<details class="duff-exercise duff-ch2-group" '+(groupIndex===0?'open':'')+'>'
   +'<summary>'+h(ex.label)+' <span class="duff-ch2-count">'+ex.count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary>'
   +'<p>'+h(ex.description)+' Consultá el enunciado íntegro en el PDF privado; las respuestas se guardan sin revisión automática.</p>';
  for(var i=ex.start;i<ex.start+ex.count;i++){
   var itemKey='duff-ch3:'+ex.id+':'+i;
   out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+i+'</div>';
   if(ex.type==='case-number'){
     out+='<div class="duff-answer-pair"><div>'+field(itemKey+':caso','Caso',false,false)+'</div><div>'+field(itemKey+':numero','Número',false,false)+'</div></div>';
   }else if(ex.type==='yesno'){
     var selected=note(p).answers[itemKey]||'';
     out+='<div class="duff-toggle" role="group" aria-label="Respuesta para ítem '+i+'">'
     +['sí','no'].map(function(v){return '<button type="button" data-do="choice" data-key="'+h(itemKey)+'" data-value="'+v+'" aria-pressed="'+(selected===v)+'">'+(v==='sí'?'Sí':'No')+'</button>';}).join('')+'</div>';
   }else{
     var label=ex.type==='case'?'Caso de la palabra subrayada':ex.type==='analysis'?'Análisis gramatical':ex.type==='greek'?'Tu traducción al griego':'Tu traducción al español';
     out+=field(itemKey,label,ex.type==='greek',ex.type==='translation'||ex.type==='greek'?2:false);
   }
   out+='</div>';
  }
  out+='</details>';
 });
 return out+reviewPanel(p);
}


/* Duff capítulo 5 · Los adjetivos · PDF privado, pp. 98–113.
   El capítulo 6 comienza en la página física 114.
   Los números y sentidos de cada consigna se cotejaron directamente con el PDF.
   No se publican enunciados, respuestas ni traducciones del libro. */
var chapterFiveExercises={
 99:[
  {id:'5-1-morfologia',label:'Práctica 5.1 · análisis morfológico de adjetivos',type:'adjective-analysis',start:1,count:8,description:'Para cada forma adjetival, identificá género, caso y número; anotá las alternativas posibles cuando la forma sea ambigua.'}
 ],
 100:[
  {id:'5-2-gr-es',label:'Práctica 5.2 · griego → español',type:'translation',start:1,count:7,description:'Traducí las siete primeras oraciones al español; prestá atención a los adjetivos atributivos.'},
  {id:'5-2-es-gr',label:'Práctica 5.2 · español → griego',type:'greek',start:8,count:3,description:'Traducí al griego los ítems 8–10, con concordancia de adjetivo y sustantivo.'}
 ],
 101:[
  {id:'5-3-eimi',label:'Práctica 5.3 · formas de εἰμί',type:'translation',start:1,count:5,description:'Traducí al español cinco formas del presente de εἰμί.'}
 ],
 103:[
  {id:'5-4-gr-es',label:'Práctica 5.4 · griego → español',type:'translation',start:1,count:5,description:'Traducí los ítems 1–5, incluidos adjetivos predicativos y oraciones interrogativas.'},
  {id:'5-4-es-gr',label:'Práctica 5.4 · español → griego',type:'greek',start:6,count:3,description:'Traducí al griego los ítems 6–8.'},
  {id:'mitad-gr-es',label:'Práctica a mitad de camino · griego → español',type:'translation',start:1,count:8,description:'Ítems 1–5 en la página 103 y 6–8 en la página 104.'},
  {id:'mitad-es-gr',label:'Práctica a mitad de camino · español → griego',type:'greek',start:9,count:4,description:'Ítems 9–12 en la página 104.'}
 ],
 105:[
  {id:'5-5-sustantivacion',label:'Práctica 5.5 · adjetivos sustantivados',type:'translation',start:1,count:4,description:'Traducí al español cuatro oraciones con adjetivos sustantivados.'}
 ],
 106:[
  {id:'5-6-polys',label:'Práctica 5.6 · concordancia con πολύς',type:'greek-form',start:1,count:5,description:'Escribí la forma de πολύς que concuerda con cada uno de los cinco sustantivos del PDF.'},
  {id:'5-6-megas',label:'Práctica 5.6 · concordancia con μέγας',type:'greek-form',start:6,count:5,description:'Escribí la forma de μέγας que concuerda con cada uno de los cinco sustantivos del PDF.'}
 ],
 109:[
  {id:'5-7-8',label:'Práctica 5.7 y 5.8 · orden y εἰμί',type:'translation',start:1,count:4,description:'Traducí las cuatro oraciones griegas al español; prestá atención a la posición de los constituyentes.'}
 ],
 111:[
  {id:'finalA-gr-es',label:'Ejercicios finales · Sección A, griego → español',type:'translation',start:1,count:8,description:'Ocho oraciones griegas, ítems 1–8; el texto está únicamente en el PDF privado.'},
  {id:'finalA-es-gr',label:'Ejercicios finales · Sección A, español → griego',type:'greek',start:9,count:4,description:'Ítems 9–10 en la página 111 y 11–12 en la 112.'}
 ],
 112:[
  {id:'finalB-gr-es',label:'Ejercicios finales · Sección B, griego → español',type:'translation',start:1,count:8,description:'Ocho oraciones griegas de la Sección B.'},
  {id:'finalB-es-gr',label:'Ejercicios finales · Sección B, español → griego',type:'greek',start:9,count:4,description:'Cuatro oraciones españolas de la Sección B.'},
  {id:'finalC-mt12-35',label:'Ejercicios finales · Sección C, Mateo 12:35',type:'translation',start:1,count:1,description:'Traducí el pasaje bíblico de Mateo 12:35, sin anticipar la solución.'},
  {id:'finalC-2co13-13',label:'Ejercicios finales · Sección C, 2 Corintios 13:13',type:'translation',start:2,count:1,description:'Traducí el pasaje bíblico de 2 Corintios 13:13, sin anticipar la solución.'}
 ]
};
function chapterFivePractice(){
 var p=state.page,parts=chapterFiveExercises[p]||[];
 var nav=[[99,'5.1'],[100,'5.2'],[101,'5.3'],[103,'5.4 + mitad'],[105,'5.5'],[106,'5.6'],[109,'5.7–5.8'],[111,'Final A'],[112,'Final B/C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 5">'
 +nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(p===104)out+='<p class="duff-ch2-note">La práctica a mitad de camino continúa aquí (ítems 6–12). Sus respuestas están agrupadas con el comienzo de la práctica. <button class="btn btn-small" type="button" data-do="page" data-page="103">Responder práctica intermedia</button></p>';
 else if(p===112)out+='<p class="duff-ch2-note">La Sección A continúa aquí (ítems 11 y 12). <button class="btn btn-small" type="button" data-do="page" data-page="111">Responder Sección A</button></p>';
 else if(!parts.length)out+='<p class="duff-ch2-note">Esta página contiene explicación, paradigmas, ejemplos, vocabulario o notas. Elegí una práctica en el índice.</p>';
 parts.forEach(function(ex,groupIndex){
  var answered=0;
  for(var n=ex.start;n<ex.start+ex.count;n++){
   var k='duff-ch5:'+ex.id+':'+n;
   if(ex.type==='adjective-analysis'){
    if(['genero','caso','numero','observaciones'].some(function(suffix){return String(note(p).answers[k+':'+suffix]||'').trim();}))answered++;
   }else if(String(note(p).answers[k]||'').trim())answered++;
  }
  out+='<details class="duff-exercise duff-ch2-group" '+(groupIndex===0?'open':'')+'>'
   +'<summary>'+h(ex.label)+' <span class="duff-ch2-count">'+ex.count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary>'
   +'<p>'+h(ex.description)+' Consultá el PDF privado para ver los enunciados. Las respuestas no se califican ni autocorrigen.</p>';
  for(var i=ex.start;i<ex.start+ex.count;i++){
   var key='duff-ch5:'+ex.id+':'+i;
   out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+i+'</div>';
   if(ex.type==='adjective-analysis'){
    out+='<div class="duff-answer-pair"><div>'+field(key+':genero','Género',false,false)+'</div>'
      +'<div>'+field(key+':caso','Caso',false,false)+'</div>'
      +'<div>'+field(key+':numero','Número',false,false)+'</div></div>'
      +field(key+':observaciones','Otras lecturas posibles (si corresponde)',false,false);
   }else{
    var greek=ex.type==='greek'||ex.type==='greek-form';
    var label=ex.type==='greek-form'?'Forma griega concordante':greek?'Tu traducción al griego':'Tu traducción al español';
    out+=field(key,label,greek,ex.type==='translation'||ex.type==='greek'?2:false);
   }
   out+='</div>';
  }
  out+='</details>';
 });
 return out+reviewPanel(p);
}


/* Duff capítulo 6, páginas físicas 114–133: inventario de consignas cotejado con el PDF privado.
   Solo metadatos; no se publican enunciados ni soluciones. */
var chapterSixExercises={"116":[{"id":"6-2-identificar","label":"Práctica 6.2 · reconocer tiempo","type":"tense","start":1,"count":6,"description":"Identificá el tiempo de cada verbo."}],"119":[{"id":"6-3-equivalencias","label":"Práctica 6.3 · equivalencias castellanas","type":"tense","start":1,"count":6,"description":"Indicá el tiempo griego correspondiente a cada expresión castellana."},{"id":"6-3-traduccion","label":"Práctica 6.3 · traducción","type":"translation","start":1,"count":6,"description":"Traducí las seis formas griegas al español."}],"120":[{"id":"6-4-gr-es","label":"Práctica 6.4 · griego → español","type":"translation","start":1,"count":6,"description":"Traducí las seis formas griegas."},{"id":"6-4-es-gr","label":"Práctica 6.4 · español → griego","type":"greek","start":7,"count":3,"description":"Escribí las formas griegas de los ítems 7–9."}],"121":[{"id":"mitad-gr-es","label":"Práctica intermedia · griego → español","type":"translation","start":1,"count":8,"description":"Traducí las oraciones 1–8."},{"id":"mitad-es-gr","label":"Práctica intermedia · español → griego","type":"greek","start":9,"count":4,"description":"Traducí las oraciones 9–12."}],"124":[{"id":"6-5-imperfecto","label":"Práctica 6.5 · formar imperfecto","type":"greek-form","start":1,"count":8,"description":"Transformá cada verbo en imperfecto activo, primera persona singular."}],"126":[{"id":"6-6-aoristo","label":"Práctica 6.6 · formar aoristo","type":"greek-form","start":1,"count":8,"description":"Transformá cada verbo en aoristo activo, primera persona singular."}],"127":[{"id":"6-7-identificar","label":"Práctica 6.7 · identificar tiempos","type":"tense","start":1,"count":8,"description":"Identificá el tiempo de cada forma, considerando aumentos y sufijos."}],"128":[{"id":"6-8-traduccion","label":"Práctica 6.8 · verbos en -έω","type":"translation","start":1,"count":8,"description":"Traducí las ocho formas verbales."}],"130":[{"id":"finalA-gr-es","label":"Ejercicios finales · A, griego → español","type":"translation","start":1,"count":8,"description":"Traducí los ítems 1–8; el octavo continúa en la página 131."},{"id":"finalA-es-gr","label":"Ejercicios finales · A, español → griego","type":"greek","start":9,"count":4,"description":"Traducí los ítems 9–12, situados en la página 131."}],"131":[{"id":"finalB-gr-es","label":"Ejercicios finales · B, griego → español","type":"translation","start":1,"count":8,"description":"Traducí los ítems 1–8."},{"id":"finalB-es-gr","label":"Ejercicios finales · B, español → griego","type":"greek","start":9,"count":4,"description":"Traducí los ítems 9–12."},{"id":"finalC-juan9","label":"Ejercicios finales · C, Juan 9:13–21","type":"translation","start":1,"count":1,"description":"Traducí el pasaje seleccionado de Juan 9:13–21, que continúa en la página 132."}]};
function chapterSixPractice(){
 var p=state.page,parts=chapterSixExercises[p]||[];
 var nav=[[116,'6.2'],[119,'6.3'],[120,'6.4'],[121,'Mitad'],[124,'6.5'],[126,'6.6'],[127,'6.7'],[128,'6.8'],[130,'Final A'],[131,'Final B/C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 6">'+nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(p===132)out+='<p class="duff-ch2-note">El pasaje de Juan 9:13–21 continúa aquí. <button type="button" class="btn btn-small" data-do="page" data-page="131">Responder Sección C</button></p>';
 else if(!parts.length)out+='<p class="duff-ch2-note">Página de teoría, ejemplos, vocabulario o notas. Elegí una práctica en el índice.</p>';
 parts.forEach(function(ex,i){
  var answered=0;
  for(var n=ex.start;n<ex.start+ex.count;n++)if(String(note(p).answers['duff-ch6:'+ex.id+':'+n]||'').trim())answered++;
  out+='<details class="duff-exercise duff-ch2-group" '+(i===0?'open':'')+'><summary>'+h(ex.label)+' <span class="duff-ch2-count">'+ex.count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary><p>'+h(ex.description)+' Consultá los enunciados en el PDF privado. Sin autocorrección.</p>';
  for(var n=ex.start;n<ex.start+ex.count;n++){
   var greek=ex.type==='greek'||ex.type==='greek-form';
   var label=ex.type==='tense'?'Tiempo griego':ex.type==='greek-form'?'Forma griega solicitada':greek?'Tu traducción al griego':'Tu traducción al español';
   out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+n+'</div>'+field('duff-ch6:'+ex.id+':'+n,label,greek,ex.type==='translation'||ex.type==='greek'?2:false)+'</div>';
  }
  out+='</details>';
 });
 return out+reviewPanel(p);
}

/* Duff capítulo 7 · «Los modos de los verbos» · páginas físicas PDF 134–148.
   Inventario cotejado directamente con el PDF privado el 17-11-2026.
   Solo metadatos de consigna; el libro, los enunciados y las respuestas permanecen privados.
   No hay autocorrección ni soluciones. */
var chapterSevenExercises={"137":[["7-2-gr-es","Práctica 7.2 · griego → español","translation",1,7,"Traducí las formas y oraciones 1–7, distinguiendo imperativo e indicativo."],["7-2-es-gr","Práctica 7.2 · español → griego","greek",8,3,"Escribí las órdenes 8–10 en griego; conservá el aspecto solicitado."]],"139":[["7-3-gr-es","Práctica 7.3 · griego → español","translation",1,4,"Traducí las cuatro oraciones con infinitivo."],["7-3-es-gr","Práctica 7.3 · español → griego","greek",5,2,"Traducí las dos oraciones al griego con infinitivo."],["mitad-gr-es","Práctica intermedia · griego → español","translation",1,8,"Traducí las ocho oraciones de la práctica intermedia."],["mitad-es-gr","Práctica intermedia · español → griego","greek",9,4,"Traducí las oraciones 9–12 al griego, incluyendo negación y aspecto cuando corresponda."]],"141":[["7-4-1-morfologia","Práctica 7.4.1 · análisis de participios","participle-analysis",1,8,"Para cada forma, indicá tiempo, género, caso y número."]],"142":[["7-4-2-gr-es","Práctica 7.4.2 · participios en contexto","translation",1,6,"Traducí las seis oraciones, respetando la relación temporal entre participio y verbo principal."]],"143":[["7-4-3-gr-es","Práctica 7.4.3 · participios con complemento","translation",1,3,"Traducí las tres oraciones griegas con participios y complementos."],["7-4-3-es-gr","Práctica 7.4.3 · español → griego","greek",4,1,"Traducí al griego la oración 4."]],"144":[["7-5-gr-es","Práctica 7.5 · participios sustantivados","translation",1,4,"Traducí las cuatro oraciones con participios sustantivados."]],"146":[["finalA-gr-es","Ejercicios finales · Sección A, griego → español","translation",1,8,"Traducí los ocho primeros ítems; conservá las construcciones de modo y participio."],["finalA-es-gr","Ejercicios finales · Sección A, español → griego","greek",9,4,"Traducí al griego los ítems 9–12."]],"147":[["finalB-gr-es","Ejercicios finales · Sección B, griego → español","translation",1,8,"Traducí los ocho primeros ítems de la sección B."],["finalB-es-gr","Ejercicios finales · Sección B, español → griego","greek",9,4,"Traducí al griego los ítems 9–12."],["finalC-1juan3","Ejercicios finales · Sección C, 1 Juan 3:4–10","translation",1,1,"Traducí el pasaje griego completo del ejercicio final. Es una sola tarea de traducción; las glosas del libro están en el PDF privado."]]};
function chapterSevenPractice(){
 var p=state.page,raw=chapterSevenExercises[p]||[],nav=[[137,'7.2'],[139,'7.3 / Mitad'],[141,'7.4.1'],[142,'7.4.2'],[143,'7.4.3'],[144,'7.5'],[146,'Final A'],[147,'Final B/C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 7">'+nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(!raw.length)out+='<p class="duff-ch2-note">Esta página contiene teoría, ejemplos, vocabulario o notas. Elegí una práctica en el índice.</p>';
 raw.forEach(function(a,index){
  var id=a[0],label=a[1],type=a[2],start=a[3],count=a[4],description=a[5],answered=0;
  for(var n=start;n<start+count;n++){
   var key='duff-ch7:'+id+':'+n;
   if(type==='participle-analysis'){
    if(['tiempo','genero','caso','numero'].some(function(part){return String(note(p).answers[key+':'+part]||'').trim();}))answered++;
   }else if(String(note(p).answers[key]||'').trim())answered++;
  }
  out+='<details class="duff-exercise duff-ch2-group" '+(index===0?'open':'')+'><summary>'+h(label)+' <span class="duff-ch2-count">'+count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary><p>'+h(description)+' Consultá los enunciados en el PDF privado. No hay autocorrección.</p>';
  for(var n=start;n<start+count;n++){
   var key='duff-ch7:'+id+':'+n,greek=type==='greek';
   out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+n+'</div>';
   if(type==='participle-analysis'){
    out+='<div class="duff-answer-pair"><div>'+field(key+':tiempo','Tiempo (presente / aoristo)',false,false)+'</div><div>'+field(key+':genero','Género',false,false)+'</div><div>'+field(key+':caso','Caso',false,false)+'</div><div>'+field(key+':numero','Número',false,false)+'</div></div>';
   }else out+=field(key,greek?'Tu traducción al griego':'Tu traducción al español',greek,type==='translation'||greek?2:false);
   out+='</div>';
  }
  out+='</details>';
 });
 return out+reviewPanel(p);
}
/* Duff, cap. 8 (PDF físico pp. 149–161): ejercicios cotejados contra el PDF privado.
   Se publican solamente metadatos; las consignas y soluciones quedan en el libro privado. */
var chapterEightExercises={
 "151":[["8-1-1-morf","Práctica 8.1.1 · análisis morfológico","verb-analysis",1,9,"Analizá las nueve formas deponentes: lema, tiempo, modo, persona y número; para participios, género, caso y número."]],
 "152":[["8-1-3-formas","Práctica 8.1.3 · formación verbal","greek-form",1,10,"Escribí la forma verbal griega pedida para cada uno de los diez lemas y rasgos del PDF."]],
 "153":[["mitad-gr-es","Práctica a mitad de camino · griego → español","translation",1,8,"Traducí los ítems 1–8 del griego al español."],["mitad-es-gr","Práctica a mitad de camino · español → griego","greek",9,4,"Traducí los ítems 9–12 al griego."]],
 "154":[["8-2-gr-es","Práctica 8.2 · griego → español","translation",1,5,"Traducí los ítems 1–5, prestando atención a εἰμί."],["8-2-es-gr","Práctica 8.2 · español → griego","greek",6,3,"Traducí los ítems 6–8 al griego."]],
 "157":[["8-3-gr-es","Práctica 8.3 · griego → español","translation",1,4,"Traducí los ítems 1–4 con sustantivos de género no predecible por su terminación."],["8-3-es-gr","Práctica 8.3 · español → griego","greek",5,2,"Traducí los ítems 5–6 al griego, cuidando la concordancia."]],
 "159":[["finalA-gr-es","Ejercicios finales · A · griego → español","translation",1,4,"Traducí los ítems 1–4 de la sección A."]],
 "160":[["finalA-gr-es-cont","Ejercicios finales · A · griego → español (continuación)","translation",5,4,"Traducí los ítems 5–8 de la sección A."],["finalA-es-gr","Ejercicios finales · A · español → griego","greek",9,4,"Traducí los ítems 9–12 de la sección A."],["finalB-gr-es","Ejercicios finales · B · griego → español","translation",1,8,"Traducí los ítems 1–8 de la sección B."]],
 "161":[["finalB-es-gr","Ejercicios finales · B · español → griego","greek",9,4,"Traducí los ítems 9–12 de la sección B."],["finalC-marcos4","Ejercicios finales · C · Marcos 4:1–2","translation",1,1,"Traducí el pasaje de Marcos 4:1–2 que aparece en el PDF; conservá las ayudas impresas en el libro como referencia."]]
};
function chapterEightPractice(){
 var p=state.page,raw=chapterEightExercises[p]||[];
 var nav=[[151,'8.1.1'],[152,'8.1.3'],[153,'Mitad'],[154,'8.2'],[157,'8.3'],[159,'Final A'],[160,'Final A/B'],[161,'Final B/C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 8">'+nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(!raw.length)out+='<p class="duff-ch2-note">Esta página contiene teoría, paradigmas, ejemplos o vocabulario. Elegí una práctica en el índice.</p>';
 raw.forEach(function(a,index){
  var id=a[0],label=a[1],type=a[2],start=a[3],count=a[4],description=a[5],answered=0;
  for(var n=start;n<start+count;n++){
   var key='duff-ch8:'+id+':'+n;
   if(type==='verb-analysis'){
    if(['lema','tiempo','modo','persona','numero','genero','caso'].some(function(part){return String(note(p).answers[key+':'+part]||'').trim();}))answered++;
   }else if(String(note(p).answers[key]||'').trim())answered++;
  }
  out+='<details class="duff-exercise duff-ch2-group" '+(index===0?'open':'')+'><summary>'+h(label)+' <span class="duff-ch2-count">'+count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary><p>'+h(description)+' Consultá las consignas originales en el PDF privado. No hay autocorrección.</p>';
  for(var n=start;n<start+count;n++){
   var key='duff-ch8:'+id+':'+n,greek=type==='greek'||type==='greek-form';
   out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+n+'</div>';
   if(type==='verb-analysis'){
    out+='<div class="duff-answer-pair"><div>'+field(key+':lema','Lema (griego)',true,false)+'</div><div>'+field(key+':tiempo','Tiempo',false,false)+'</div><div>'+field(key+':modo','Modo / forma no personal',false,false)+'</div><div>'+field(key+':persona','Persona (si corresponde)',false,false)+'</div><div>'+field(key+':numero','Número',false,false)+'</div><div>'+field(key+':genero','Género (si corresponde)',false,false)+'</div><div>'+field(key+':caso','Caso (si corresponde)',false,false)+'</div></div>';
   }else out+=field(key,type==='greek-form'?'Forma verbal griega':greek?'Tu traducción al griego':'Tu traducción al español',greek,type==='translation'||type==='greek'?2:false);
   out+='</div>';
  }
  out+='</details>';
 });
 return out+reviewPanel(p);
}

/* Duff cap. 9 · Pronombres y conjunciones, PDF físico pp. 162–176.
   Ejercicios cotejados directamente: solo metadatos y casillas privadas. */
var chapterNineExercises={
 163:[['9-1-1-analysis','Práctica 9.1.1 · análisis de demostrativos','pronoun-analysis',1,8,'Analizá ocho formas: lema, género, caso y número; registrá las ambigüedades.']],
 164:[['9-1-2-gr-es','Práctica 9.1.2 · griego → español','translation',1,6,'Seis oraciones; el sexto ítem continúa en la página 165.']],
 166:[['mitad-gr-es','Práctica a mitad de camino · griego → español','translation',1,8,'Los ocho primeros ítems aparecen en la página 167.'],['mitad-es-gr','Práctica a mitad de camino · español → griego','greek',9,4,'Ítems 9–12 de la página 167.']],
 169:[['9-3-gr-es','Práctica 9.3 · griego → español','translation',1,4,'Primeras cuatro oraciones con pronombres personales.'],['9-3-es-gr','Práctica 9.3 · español → griego','greek',5,2,'Ítems 5–6.']],
 171:[['9-4-gr-es','Práctica 9.4 · griego → español','translation',1,5,'Primeros cinco ítems con conjunciones y pospositivas.'],['9-4-es-gr','Práctica 9.4 · español → griego','greek',6,1,'El sexto ítem continúa en la página 172.']],
 173:[['finalA-gr-es','Ejercicios finales · A · griego → español','translation',1,8,'Ítems 1–8; los dos últimos continúan en la página 174.'],['finalA-es-gr','Ejercicios finales · A · español → griego','greek',9,4,'Ítems 9–12 de la página 174.']],
 174:[['finalB-gr-es','Ejercicios finales · B · griego → español','translation',1,8,'Ítems 1–8.'],['finalB-es-gr','Ejercicios finales · B · español → griego','greek',9,4,'Ítems 9–12.']],
 175:[['finalC-mateo16','Ejercicios finales · C · Mateo 16:13–18','translation',1,1,'Traducción personal del pasaje final, sin soluciones ni autocorrección.']]
};
function chapterNinePractice(){
 var p=state.page,raw=chapterNineExercises[p]||[];
 var nav=[[163,'9.1.1'],[164,'9.1.2'],[166,'Mitad'],[169,'9.3'],[171,'9.4'],[173,'Final A'],[174,'Final B'],[175,'Final C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 9">'+nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if([165,167,172].indexOf(p)!==-1)out+='<p class="duff-ch2-note">Esta página continúa una práctica anterior; abrí la práctica desde el índice para responder sin duplicar claves.</p>';
 else if(!raw.length)out+='<p class="duff-ch2-note">Teoría, ejemplos, paradigmas o vocabulario. Elegí una práctica en el índice.</p>';
 raw.forEach(function(a,index){
  var id=a[0],label=a[1],type=a[2],start=a[3],count=a[4],description=a[5],answered=0;
  for(var n=start;n<start+count;n++){
   var key='duff-ch9:'+id+':'+n;
   if(type==='pronoun-analysis'){
    if(['lema','genero','caso','numero'].some(function(part){return String(note(p).answers[key+':'+part]||'').trim();}))answered++;
   }else if(String(note(p).answers[key]||'').trim())answered++;
  }
  out+='<details class="duff-exercise duff-ch2-group" '+(index===0?'open':'')+'><summary>'+h(label)+' <span class="duff-ch2-count">'+count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary><p>'+h(description)+' Consultá el original en el PDF privado. Las respuestas no se califican.</p>';
  for(var n=start;n<start+count;n++){
   var key='duff-ch9:'+id+':'+n,greek=type==='greek';
   out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+n+'</div>';
   if(type==='pronoun-analysis')out+='<div class="duff-answer-pair"><div>'+field(key+':lema','Lema (griego)',true,false)+'</div><div>'+field(key+':genero','Género',false,false)+'</div><div>'+field(key+':caso','Caso',false,false)+'</div><div>'+field(key+':numero','Número',false,false)+'</div></div>';
   else out+=field(key,greek?'Tu traducción al griego':'Tu traducción al español',greek,2);
   out+='</div>';
  }
  out+='</details>';
 });
 return out+reviewPanel(p);
}


/* Duff 10, PDF pp. 177–192: 69 ítems cotejados, sin enunciados ni soluciones. */
var chapterTenExercises={"179":[["10-1-1","10.1.1 · dos oraciones y antecedente","clause",6]],"180":[["10-1-2","10.1.2 · análisis morfológico","relative",10]],"182":[["mid-gr-es","Mitad · griego → español","translation",8],["mid-es-gr","Mitad · español → griego","greek",4,9]],"184":[["10-2","10.2 · preguntas retóricas","translation",4]],"187":[["10-3","10.3 · estilo directo e indirecto","speech",6]],"188":[["10-4","10.4 · casos temporales","time",6]],"190":[["finalA-gr-es","Final A · griego → español","translation",8],["finalA-es-gr","Final A · español → griego","greek",4,9]],"191":[["finalB-gr-es","Final B · griego → español","translation",8],["finalB-es-gr","Final B · español → griego","greek",4,9],["finalC-mark","Final C · Marcos 6:3–6","translation",1]]};
function chapterTenPractice(){
 var p=state.page,raw=chapterTenExercises[p]||[];
 var nav=[[179,'10.1.1'],[180,'10.1.2'],[182,'Mitad'],[184,'10.2'],[187,'10.3'],[188,'10.4'],[190,'Final A'],[191,'Final B/C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 10">'+nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(!raw.length)out+='<p class="duff-ch2-note">Teoría o continuación de una práctica anterior. Abrí el ejercicio desde el índice.</p>';
 raw.forEach(function(a,index){
  var id=a[0],label=a[1],type=a[2],count=a[3],start=a[4]||1;
  var parts=type==='clause'?['oracion1','oracion2','antecedente']:type==='relative'?['lema','genero','caso','numero','ambiguedad']:type==='speech'?['estilo','tiempo']:type==='time'?['caso']:null;
  var labels={oracion1:'Primera oración básica',oracion2:'Segunda oración básica',antecedente:'Antecedente',lema:'Lema griego',genero:'Género',caso:'Caso',numero:'Número',ambiguedad:'Ambigüedades',estilo:'Directo / indirecto',tiempo:'Tiempo verbal griego'};
  var answered=0;
  for(var n=start;n<start+count;n++){var key='duff-ch10:'+id+':'+n;if(parts?parts.some(function(part){return String(note(p).answers[key+':'+part]||'').trim();}):String(note(p).answers[key]||'').trim())answered++;}
  out+='<details class="duff-exercise duff-ch2-group" '+(index===0?'open':'')+'><summary>'+h(label)+' <span class="duff-ch2-count">'+count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary><p>Consultá los enunciados en el PDF privado. No hay autocorrección.</p>';
  for(var n=start;n<start+count;n++){
   var key='duff-ch10:'+id+':'+n;out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+n+'</div>';
   if(parts)out+='<div class="duff-answer-pair">'+parts.map(function(part){return '<div>'+field(key+':'+part,labels[part]||'Caso temporal',part==='lema',part==='oracion1'||part==='oracion2'?2:false)+'</div>';}).join('')+'</div>';
   else out+=field(key,type==='greek'?'Tu traducción al griego':'Tu traducción al español',type==='greek',2);
   out+='</div>';
  }out+='</details>';
 });
 return out+reviewPanel(p);
}

/* Duff 11, PDF físico pp. 193–209. Solo metadatos de ejercicios y respuestas privadas. */
var chapterElevenExercises={"198":[["11-1-4","Práctica 11.1.4 · traducción","translation",8]],"199":[["11-1-5","Práctica 11.1.5 · morfología","morphology",8]],"201":[["11-1-6","Práctica 11.1.6 · traducción","translation",5],["mid-gr-es","Mitad · griego a español","translation",8],["mid-es-gr","Mitad · español a griego","greek",4,9]],"204":[["11-2-2-gr-es","Práctica 11.2.2 · griego a español","translation",8],["11-2-2-es-gr","Práctica 11.2.2 · español a griego","greek",4,9]],"206":[["finalA-gr-es","Final A · griego a español","translation",8],["finalA-es-gr","Final A · español a griego","greek",4,9]],"207":[["finalB-gr-es","Final B · griego a español","translation",8],["finalB-es-gr","Final B · español a griego","greek",4,9],["finalC-apoc","Final C · Apocalipsis 1:1–19","translation",1]]};
function chapterElevenPractice(){
 var p=state.page,raw=chapterElevenExercises[p]||[];
 var nav=[[198,'11.1.4'],[199,'11.1.5'],[201,'11.1.6 / Mitad'],[204,'11.2.2'],[206,'Final A'],[207,'Final B/C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 11">'+nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(p===208)out+='<p class="duff-ch2-note">La lectura final continúa aquí; respondé desde la sección C de la página 207.</p>';
 else if(!raw.length)out+='<p class="duff-ch2-note">Teoría o vocabulario. Elegí una práctica en el índice.</p>';
 raw.forEach(function(a,index){
  var id=a[0],label=a[1],type=a[2],count=a[3],start=a[4]||1;
  var parts=type==='morphology'?['lema','tiempo','voz','modo','persona','numero','caso','genero']:null;
  var labels={lema:'Lema griego',tiempo:'Tiempo / aspecto',voz:'Voz',modo:'Modo',persona:'Persona',numero:'Número',caso:'Caso (si corresponde)',genero:'Género (si corresponde)'};
  var answered=0;
  for(var n=start;n<start+count;n++){var key='duff-ch11:'+id+':'+n;if(parts?parts.some(function(part){return String(note(p).answers[key+':'+part]||'').trim();}):String(note(p).answers[key]||'').trim())answered++;}
  out+='<details class="duff-exercise duff-ch2-group" '+(index===0?'open':'')+'><summary>'+h(label)+' <span class="duff-ch2-count">'+count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary><p>Consultá el PDF privado. Sin soluciones ni autocorrección.</p>';
  for(var n=start;n<start+count;n++){var key='duff-ch11:'+id+':'+n;out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+n+'</div>';
   if(parts)out+='<div class="duff-answer-pair">'+parts.map(function(part){return '<div>'+field(key+':'+part,labels[part],part==='lema',false)+'</div>';}).join('')+'</div>';
   else out+=field(key,type==='greek'?'Tu traducción al griego':'Tu traducción al español',type==='greek',2);
   out+='</div>';
  }out+='</details>';
 });
 return out+reviewPanel(p);
}

/* Duff 12, PDF físico pp. 210–223. Índice cotejado; sin enunciados ni soluciones. */
var chapterTwelveExercises={"213":[["12-2-morph","12.2 · análisis morfológico","morphology",8]],"214":[["12-2-form","12.2 · formar casos","form",8,9]],"215":[["12-3-morph","12.3 · análisis morfológico","morphology",4],["12-3-form","12.3 · formar casos","form",4,5],["mid-gr-es","Mitad · griego a español","translation",8],["mid-es-gr","Mitad · español a griego","greek",4,9]],"216":[["12-4","12.4 · traducción","translation",2]],"217":[["12-4-cont","12.4 · traducción (continuación)","translation",2,3]],"219":[["12-5-gr-es","12.5 · griego a español","translation",6],["12-5-es-gr","12.5 · español a griego","greek",4,7]],"221":[["finalA-gr-es","Final A · griego a español","translation",8],["finalA-es-gr","Final A · español a griego","greek",1,9]],"222":[["finalA-es-gr-cont","Final A · español a griego (continuación)","greek",3,10],["finalB-gr-es","Final B · griego a español","translation",8],["finalB-es-gr","Final B · español a griego","greek",4,9]],"223":[["finalC-marcos","Final C · Marcos 3:32–35","translation",1]]};
function chapterTwelvePractice(){
 var p=state.page,raw=chapterTwelveExercises[p]||[];
 var nav=[[213,'12.2'],[215,'12.3 / Mitad'],[216,'12.4'],[219,'12.5'],[221,'Final A'],[222,'Final A/B'],[223,'Final C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 12">'+nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(!raw.length)out+='<p class="duff-ch2-note">Teoría o vocabulario. Elegí una práctica en el índice.</p>';
 raw.forEach(function(a,index){
  var id=a[0],label=a[1],type=a[2],count=a[3],start=a[4]||1;
  var parts=type==='morphology'?['lema','caso','numero','genero']:type==='form'?['forma']:null;
  var labels={lema:'Lema griego',caso:'Caso',numero:'Número',genero:'Género',forma:'Forma griega solicitada'};
  var answered=0;
  for(var n=start;n<start+count;n++){var key='duff-ch12:'+id+':'+n;if(parts?parts.some(function(part){return String(note(p).answers[key+':'+part]||'').trim();}):String(note(p).answers[key]||'').trim())answered++;}
  out+='<details class="duff-exercise duff-ch2-group" '+(index===0?'open':'')+'><summary>'+h(label)+' <span class="duff-ch2-count">'+count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary><p>Consultá el PDF privado. Sin soluciones ni autocorrección.</p>';
  for(var n=start;n<start+count;n++){var key='duff-ch12:'+id+':'+n;out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+n+'</div>';
   if(parts)out+='<div class="duff-answer-pair">'+parts.map(function(part){return '<div>'+field(key+':'+part,labels[part],part==='lema'||part==='forma',false)+'</div>';}).join('')+'</div>';
   else out+=field(key,type==='greek'?'Tu traducción al griego':'Tu traducción al español',type==='greek',2);
   out+='</div>';
  }out+='</details>';
 });
 return out+reviewPanel(p);
}


/* Duff 14 · Participios · PDF físico pp. 237–251. Enunciados en PDF privado. */
var chapterFourteenExercises={"240":[["14-1","14.1 · formar participios","form",6]],"242":[["14-2-morph","14.2 · análisis morfológico","morphology",9],["14-2-form","14.2 · formar participios","form",6,10]],"245":[["mid-gr-es","Mitad · griego a español","translation",8],["mid-es-gr","Mitad · español a griego","greek",4,9]],"247":[["14-4-gr-es","14.4 · griego a español","translation",4],["14-4-es-gr","14.4 · español a griego","greek",2,5]],"249":[["finalA-gr-es","Final A · griego a español","translation",8],["finalA-es-gr","Final A · español a griego","greek",4,9]],"250":[["finalB-gr-es","Final B · griego a español","translation",8],["finalB-es-gr","Final B · español a griego","greek",4,9],["finalC-marcos","Final C · Marcos 1:7–10 (inicio)","translation",1]]};
function chapterFourteenPractice(){
 var p=state.page,raw=chapterFourteenExercises[p]||[];
 var nav=[[240,'14.1'],[242,'14.2'],[245,'Mitad'],[247,'14.4'],[249,'Final A'],[250,'Final B/C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 14">'+nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(p===251)out+='<p class="duff-ch2-note">La lectura final continúa aquí; respondé desde la sección C de la página 250.</p>';
 else if(!raw.length)out+='<p class="duff-ch2-note">Teoría o vocabulario. Elegí una práctica en el índice.</p>';
 raw.forEach(function(a,index){var id=a[0],label=a[1],type=a[2],count=a[3],start=a[4]||1;
 var parts=type==='morphology'?['lema','tiempo','voz','modo','caso','numero','genero']:type==='form'?['forma']:null;
 var labels={lema:'Lema griego',tiempo:'Tiempo / aspecto',voz:'Voz',modo:'Modo',caso:'Caso',numero:'Número',genero:'Género',forma:'Participio griego solicitado'};
 var answered=0;for(var n=start;n<start+count;n++){var key='duff-ch14:'+id+':'+n;if(parts?parts.some(function(part){return String(note(p).answers[key+':'+part]||'').trim();}):String(note(p).answers[key]||'').trim())answered++;}
 out+='<details class="duff-exercise duff-ch2-group" '+(index===0?'open':'')+'><summary>'+h(label)+' <span class="duff-ch2-count">'+count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary><p>Consultá el PDF privado. Sin soluciones ni autocorrección.</p>';
 for(var n=start;n<start+count;n++){var key='duff-ch14:'+id+':'+n;out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+n+'</div>';
 if(parts)out+='<div class="duff-answer-pair">'+parts.map(function(part){return '<div>'+field(key+':'+part,labels[part],part==='lema'||part==='forma',false)+'</div>';}).join('')+'</div>';
 else out+=field(key,type==='greek'?'Tu traducción al griego':'Tu traducción al español',type==='greek',2);
 out+='</div>'; }out+='</details>';});return out+reviewPanel(p);
}


/* Duff 15 · Voz pasiva y media · PDF físico pp. 252–266. Enunciados solo en PDF privado. */
var chapterFifteenExercises={"254":[["15-3","15.3 · tiempos, voces y modo","alternatives",8]],"257":[["15-5-1-2","15.5.1–2 · análisis morfológico","morphology",6]],"258":[["15-5-3","15.5.3 · pasivos irregulares: morfología","morphology",6],["mid-gr-es","Mitad · griego a español","translation",8]],"259":[["mid-es-gr","Mitad · español a griego","greek",4,9]],"262":[["15-7","15.7 · traducción","translation",4]],"263":[["finalA-gr-es","Final A · griego a español (inicio)","translation",1]],"264":[["finalA-gr-es-cont","Final A · griego a español (continuación)","translation",7,2],["finalA-es-gr","Final A · español a griego","greek",4,9],["finalB-gr-es","Final B · griego a español (inicio)","translation",3]],"265":[["finalB-gr-es-cont","Final B · griego a español (continuación)","translation",5,4],["finalB-es-gr","Final B · español a griego","greek",4,9],["finalC-mateo","Final C · Mateo 11:2–5","translation",1]]};
function chapterFifteenPractice(){
 var p=state.page,raw=chapterFifteenExercises[p]||[];
 var nav=[[254,'15.3'],[257,'15.5.1–2'],[258,'15.5.3 / Mitad'],[259,'Mitad · continuación'],[262,'15.7'],[263,'Final A'],[264,'Final A/B'],[265,'Final B/C']];
 var out='<nav class="duff-index duff-ch2-index" aria-label="Prácticas del capítulo 15">'+nav.map(function(x){return '<button type="button" data-do="page" data-page="'+x[0]+'" aria-current="'+(p===x[0]?'page':'false')+'">'+h(x[1])+'</button>';}).join('')+'</nav>';
 if(!raw.length)out+='<p class="duff-ch2-note">Teoría o vocabulario. Elegí una práctica en el índice.</p>';
 raw.forEach(function(a,index){var id=a[0],label=a[1],type=a[2],count=a[3],start=a[4]||1;
 var parts=type==='morphology'?['lema','tiempo','voz','modo','persona','numero','caso','genero']:type==='alternatives'?['tiempos_posibles','voces_posibles','modo']:null;
 var labels={lema:'Lema griego',tiempo:'Tiempo / aspecto',voz:'Voz',modo:'Modo (indicativo u otros modos)',persona:'Persona (si corresponde)',numero:'Número',caso:'Caso (si corresponde)',genero:'Género (si corresponde)',tiempos_posibles:'Todos los tiempos posibles',voces_posibles:'Todas las voces posibles'};
 var answered=0;for(var n=start;n<start+count;n++){var key='duff-ch15:'+id+':'+n;if(parts?parts.some(function(part){return String(note(p).answers[key+':'+part]||'').trim();}):String(note(p).answers[key]||'').trim())answered++;}
 out+='<details class="duff-exercise duff-ch2-group" '+(index===0?'open':'')+'><summary>'+h(label)+' <span class="duff-ch2-count">'+count+' ítems'+(answered?' · '+answered+' contestados':'')+'</span></summary><p>Consultá el PDF privado. Sin soluciones ni autocorrección.</p>';
 for(var n=start;n<start+count;n++){var key='duff-ch15:'+id+':'+n;out+='<div class="duff-answer-row"><div class="duff-answer-label">Ítem '+n+'</div>';
 if(parts)out+='<div class="duff-answer-pair">'+parts.map(function(part){return '<div>'+field(key+':'+part,labels[part],part==='lema',false)+'</div>';}).join('')+'</div>';
 else out+=field(key,type==='greek'?'Tu traducción al griego':'Tu traducción al español',type==='greek',2);
 out+='</div>'; }out+='</details>';});return out+reviewPanel(p);
}

function practice(){
 if(current()===14)return chapterFifteenPractice();
 if(current()===13)return chapterFourteenPractice();
 if(current()===11)return chapterTwelvePractice();
 if(current()===10)return chapterElevenPractice();
 if(current()===9)return chapterTenPractice();
 if(current()===8)return chapterNinePractice();
 if(current()===7)return chapterEightPractice();
 if(current()===6)return chapterSevenPractice();
 if(current()===5)return chapterSixPractice();
 if(current()===4)return chapterFivePractice();
 if(current()===3)return chapterFourPractice();
 if(current()===2)return chapterThreePractice();
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
   +(v.hideTranslation?'<p class="duff-ch3-solution-note">'+h(v.readingNote||'Esta lectura corresponde a un ejercicio pendiente: se reserva la traducción completa.')+'</p>':(state.greekTranslation&&v.translation?'<div class="greek-translation" lang="es">'+h(v.translation)+'</div>':''))
   +(!v.hideTranslation&&v.readingNote?'<p class="duff-reading-source-note">'+h(v.readingNote)+'</p>':'')+'</div>';
}
function readingLookup(button){
 var data=window.GREEK_READER;
 if(!data)return null;
 var v=(data.verses||[]).concat(data.chapterTwo||[],data.chapterTwoExtra||[],data.chapterThree||[],data.chapterFour||[],data.chapterFive||[],data.chapterSix||[],data.chapterSeven||[],data.chapterEight||[],data.chapterNine||[],data.chapterTen||[],data.chapterEleven||[],data.chapterTwelve||[],data.chapterThirteen||[],data.chapterFourteen||[],data.chapterFifteen||[]).find(function(row){return row.ref===button.dataset.ref;});
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
 var supplemental=(data.chapterTwoExtra||[]).filter(function(v){return v.page===state.page;});
 var chapterThree=(data.chapterThree||[]).filter(function(v){return v.page===state.page;});
 var isThird=state.page>=66&&state.page<=80;
 var isFourth=state.page>=81&&state.page<=97;
 var isFifth=state.page>=98&&state.page<=113;
 var isSixth=state.page>=114&&state.page<=133;
 var isSeventh=state.page>=134&&state.page<=148;
 var isEighth=state.page>=149&&state.page<=161;
 var isNinth=state.page>=162&&state.page<=176;
 var isTenth=state.page>=177&&state.page<=192;
  var isFifteenth=state.page>=252&&state.page<=266;
  var chapterFifteen=(data.chapterFifteen||[]).filter(function(v){return v.page===state.page;});
  var isFourteenth=state.page>=237&&state.page<=251;
  var chapterFourteen=(data.chapterFourteen||[]).filter(function(v){return v.page===state.page;});
  var isThirteenth=state.page>=224&&state.page<=236;
  var chapterThirteen=(data.chapterThirteen||[]).filter(function(v){return v.page===state.page;});
  var isTwelfth=state.page>=210&&state.page<=223;
  var chapterTwelve=(data.chapterTwelve||[]).filter(function(v){return v.page===state.page;});
  var isEleventh=state.page>=193&&state.page<=209;
  var chapterEleven=(data.chapterEleven||[]).filter(function(v){return v.page===state.page;});
 var chapterTen=(data.chapterTen||[]).filter(function(v){return v.page===state.page;});
 var chapterNine=(data.chapterNine||[]).filter(function(v){return v.page===state.page;});
 var chapterEight=(data.chapterEight||[]).filter(function(v){return v.page===state.page;});
 var chapterSeven=(data.chapterSeven||[]).filter(function(v){return v.page===state.page;});
 var chapterFive=(data.chapterFive||[]).filter(function(v){return v.page===state.page;});
 var chapterSix=(data.chapterSix||[]).filter(function(v){return v.page===state.page;});
 var chapterFour=(data.chapterFour||[]).filter(function(v){return v.page===state.page;});
 if(!john&&!excerpts.length&&!supplemental.length&&!chapterThree.length&&!chapterFour.length&&!chapterFive.length&&!chapterSix.length&&!chapterSeven.length&&!chapterEight.length&&!chapterNine.length&&!chapterTen.length&&!chapterEleven.length&&!chapterTwelve.length&&!chapterThirteen.length&&!chapterFourteen.length&&!chapterFifteen.length)return '';
 var head=john?'Juan 1:1–23 · lectura anotada':isThird?'Griego del capítulo 3 · lectura anotada':isFourth?'Griego del capítulo 4 · lectura anotada':isFifth?'Griego del capítulo 5 · lectura anotada':isSixth?'Griego del capítulo 6 · lectura anotada':isSeventh?'Griego del capítulo 7 · lectura anotada':isEighth?'Griego del capítulo 8 · lectura anotada':isNinth?'Griego del capítulo 9 · lectura anotada':isTenth?'Griego del capítulo 10 · lectura anotada':isEleventh?'Griego del capítulo 11 · lectura anotada':isTwelfth?'Griego del capítulo 12 · lectura anotada':isThirteenth?'Griego del capítulo 13 · lectura anotada':isFourteenth?'Griego del capítulo 14 · lectura anotada':isFifteenth?'Griego del capítulo 15 · lectura anotada':'Griego del capítulo 2 · lectura anotada';
 var out='<section class="duff-greek-reader" id="lectura-juan"><div class="grammar-head"><div><div class="micro">LECTURA FILOLÓGICA · '+(john?'EVANGELIO SEGÚN JUAN':'FORMAS, EJEMPLOS Y CITAS DEL CAPÍTULO')+'</div><h2>'+head+'</h2></div></div>'
 +'<p>Seleccioná una palabra para ver su glosa, lema y análisis morfológico. Podés guardar el lema en tus flashcards sin duplicarlo. Las explicaciones y lecturas complementarias no modifican tus respuestas.</p>'
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
 }else if(isFifteenth){
    [['biblical','Fragmentos bíblicos breves'],['paradigm','Paradigmas de pasiva y media'],['lexicon','Raíces irregulares'],['original','Ejemplos originales']].forEach(function(section){var selected=chapterFifteen.filter(function(v){return v.kind===section[0];});if(!selected.length)return;out+='<details class="duff-reading-group" open><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');out+='</details>';});
    out+='<p class="note">'+h(data.chapterFifteenMeta?.source||'')+' '+h(data.chapterFifteenMeta?.notice||'')+'</p>';
  }else if(isFourteenth){
    [['paradigm','Paradigmas de participios',true],['lexicon','Vocabulario',true],['original','Ejemplos originales',true],['biblical','Fragmentos bíblicos breves',true]].forEach(function(section){var selected=chapterFourteen.filter(function(v){return v.kind===section[0];});if(!selected.length)return;out+='<details class="duff-reading-group" open><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');out+='</details>';});
    out+='<p class="note">'+h(data.chapterFourteenMeta?.source||'')+' '+h(data.chapterFourteenMeta?.notice||'')+'</p>';
  }else if(isThirteenth){
    [['biblical','Fragmentos bíblicos breves',true],['paradigm','Paradigmas de tercera declinación',true],['lexicon','Vocabulario',true],['original','Ejemplos originales',true]].forEach(function(section){var selected=chapterThirteen.filter(function(v){return v.kind===section[0];});if(!selected.length)return;out+='<details class="duff-reading-group" open><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');out+='</details>';});
    out+='<p class="note">'+h(data.chapterThirteenMeta?.source||'')+' '+h(data.chapterThirteenMeta?.notice||'')+'</p>';
  }else if(isTwelfth){
    [['paradigm','Paradigmas de tercera declinación',true],['lexicon','Vocabulario',true],['original','Ejemplos originales',true]].forEach(function(section){var selected=chapterTwelve.filter(function(v){return v.kind===section[0];});if(!selected.length)return;out+='<details class="duff-reading-group" open><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');out+='</details>';});
    out+='<p class="note">'+h(data.chapterTwelveMeta?.source||'')+' '+h(data.chapterTwelveMeta?.notice||'')+'</p>';
  }else if(isEleventh){
    [['biblical','Fragmentos bíblicos breves',true],['paradigm','Paradigmas de verbos especiales',true],['lexicon','Vocabulario',true],['original','Ejemplos originales',true]].forEach(function(section){var selected=chapterEleven.filter(function(v){return v.kind===section[0];});if(!selected.length)return;out+='<details class="duff-reading-group" '+(section[2]?'open':'')+'><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');out+='</details>';});
    out+='<p class="note">'+h(data.chapterElevenMeta?.source||'')+' '+h(data.chapterElevenMeta?.notice||'')+'</p>';
  }else if(isTenth){
    [['paradigm','Paradigmas y formas',true],['lexicon','Vocabulario del capítulo',true],['original','Ejemplos originales',true]].forEach(function(section){var selected=chapterTen.filter(function(v){return v.kind===section[0];});if(!selected.length)return;out+='<details class="duff-reading-group" '+(section[2]?'open':'')+'><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');out+='</details>';});
    out+='<p class="note">'+h(data.chapterTenMeta?.source||'')+' '+h(data.chapterTenMeta?.notice||'')+'</p>';
  }else if(isNinth){
   [['biblical','Referencia bíblica · consulta parcial',true],['paradigm','Paradigmas pronominales',true],['lexicon','Léxico y conjunciones',true],['original','Ejemplos propios',true]].forEach(function(section){
     var selected=chapterNine.filter(function(v){return v.kind===section[0];});if(!selected.length)return;
     out+='<details class="duff-reading-group" '+(section[2]?'open':'')+'><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';
     out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');out+='</details>';
   });
   out+='<p class="note">'+h(data.chapterNineMeta?.source||'')+' '+h(data.chapterNineMeta?.notice||'')+'</p>';
 }else if(isEighth){
   var sections8=[['biblical','Citas bíblicas y ejercicio final',true],['paradigm','Deponentes, εἰμί y declinaciones',true],['lexicon','Vocabulario del capítulo',false],['original','Ejemplos originales',true]];
   sections8.forEach(function(section){
     var selected=chapterEight.filter(function(v){return v.kind===section[0];});
     if(!selected.length)return;
     out+='<details class="duff-reading-group" '+(section[2]?'open':'')+'><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';
     out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');
     out+='</details>';
   });
   out+='<p class="note">'+h(data.chapterEightMeta?.source||'Lecturas complementarias.')+' '+h(data.chapterEightMeta?.notice||'')+'</p>';
 }else if(isSeventh){
   var sections7=[
     ['biblical','Citas bíblicas y texto final',true],
     ['paradigm','Imperativo, infinitivo y participio',true],
     ['lexicon','Vocabulario y lemas',false],
     ['original','Ejemplos originales',true]
   ];
   sections7.forEach(function(section){
     var selected=chapterSeven.filter(function(v){return v.kind===section[0];});
     if(!selected.length)return;
     out+='<details class="duff-reading-group" '+(section[2]?'open':'')+'><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';
     out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');
     out+='</details>';
   });
   out+='<p class="note">'+h(data.chapterSevenMeta?.source||'Lecturas complementarias.')+' '+h(data.chapterSevenMeta?.notice||'')+'</p>';
 }else if(isSixth){
   var sections6=[
     ['biblical','Citas bíblicas y texto final',true],
     ['paradigm','Paradigmas de los cuatro tiempos',true],
     ['lexicon','Verbos y adverbios temporales',false],
     ['original','Ejemplos originales',true]
   ];
   sections6.forEach(function(section){
     var selected=chapterSix.filter(function(v){return v.kind===section[0];});
     if(!selected.length)return;
     out+='<details class="duff-reading-group" '+(section[2]?'open':'')+'><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';
     out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');
     out+='</details>';
   });
   out+='<p class="note">'+h(data.chapterSixMeta?.source||'Lecturas complementarias.')+' '+h(data.chapterSixMeta?.notice||'')+'</p>';
 }else if(isFifth){
   var sections5=[
     ['biblical','Citas bíblicas y ejercicios finales',true],
     ['paradigm','Paradigmas y formas',true],
     ['lexicon','Vocabulario y lemas',false],
     ['original','Ejemplos originales',true]
   ];
   sections5.forEach(function(section){
      var selected=chapterFive.filter(function(v){return v.kind===section[0];});
      if(!selected.length)return;
      out+='<details class="duff-reading-group" '+(section[2]?'open':'')+'><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';
      out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');
      out+='</details>';
   });
   out+='<p class="note">'+h(data.chapterFiveMeta?.source||'Lecturas complementarias.')+' '+h(data.chapterFiveMeta?.notice||'')+'</p>';
 }else if(isFourth){
   var sections4=[
     ['biblical','Citas bíblicas y texto final',true],
     ['paradigm','Preposiciones, regímenes y elisión',true],
     ['lexicon','Verbos compuestos y vocabulario',false],
     ['original','Ejemplos originales',true]
   ];
   sections4.forEach(function(section){
      var selected=chapterFour.filter(function(v){return v.kind===section[0];});
      if(!selected.length)return;
      out+='<details class="duff-reading-group" '+(section[2]?'open':'')+'><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';
      out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');
      out+='</details>';
   });
   out+='<p class="note">'+h(data.chapterFourMeta?.source||'Lecturas complementarias.')+' '+h(data.chapterFourMeta?.notice||'')+'</p>';
 }else if(isThird){
   var sections=[
     ['biblical','Textos bíblicos',true],
     ['paradigm','Paradigmas y flexión',false],
     ['lexicon','Vocabulario y lemas',false],
     ['original','Ejemplos originales',true]
   ];
   sections.forEach(function(section){
      var selected=chapterThree.filter(function(v){return v.kind===section[0];});
      if(!selected.length)return;
      var startOpen=section[2]||(!chapterThree.some(function(v){return v.kind==='biblical'||v.kind==='original';})&&section[0]==='paradigm')
       ||(section[0]==='lexicon'&&!chapterThree.some(function(v){return v.kind!=='lexicon';}));
      out+='<details class="duff-reading-group" '+(startOpen?'open':'')+'><summary>'+h(section[1])+' <span>('+selected.length+')</span></summary>';
      out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');
      out+='</details>';
   });
   out+='<p class="note">'+h(data.chapterThreeMeta?.source||'Lecturas griegas complementarias.')+' '+h(data.chapterThreeMeta?.notice||'')+'</p>';
 }else{
   if(excerpts.length){
     out+='<details class="duff-reading-group" open><summary>Citas bíblicas breves <span>('+excerpts.length+')</span></summary>';
     out+=excerpts.map(function(v){return greekVerseRow(v,true);}).join('');
     out+='</details>';
   }
   if(supplemental.length){
     var sequence=[
       ['paradigma','Formas y paradigmas'],
       ['lexico','Lemas y vocabulario'],
       ['frase','Frases modelo y ejemplos originales']
     ];
     sequence.forEach(function(g){
       var selected=supplemental.filter(function(v){return g[0]==='frase'?v.kind!=='paradigma'&&v.kind!=='lexico':v.kind===g[0];});
       if(!selected.length)return;
       out+='<details class="duff-reading-group" '+(g[0]==='frase'||(!excerpts.length&&g[0]==='paradigma')?'open':'')+'><summary>'+h(g[1])+' <span>('+selected.length+')</span></summary>';
       out+=selected.map(function(v){return greekVerseRow(v,true);}).join('');
       out+='</details>';
     });
   }
   out+='<p class="note">'+h(data.chapterTwoExtraMeta?.source||'Ejemplos complementarios originales.')+' '+h(data.chapterTwoExtraMeta?.notice||'')+'</p>';
 }
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
 var bookDeck='duff-ch'+(current()+1),pageRef=state.page>=46&&state.page<=48?'juan1':bookDeck;
 var decks=[...new Set(['duff',bookDeck,pageRef])];
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
function go(p){closeGreekCard();if(!state.user||state.user.id!==OWNER)return;p=Number(p);if(!Number.isFinite(p)||p<1||p>state.pdfPageCount)return;var oldChapter=current();state.page=Math.floor(p);if(timer&&current()!==oldChapter)timer.setLesson(chapterId(current()));state.workTab=(exercises[state.page]||(state.page>=50&&state.page<=65)||(state.page>=66&&state.page<=80))?'exercise':'notes';state.lastInput=null;state.saveStatus='';render();bookmark(state.page);history.replaceState(null,'','#pagina='+state.page);}
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