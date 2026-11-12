/* Lingua Viva · tiempo de estudio del griego bíblico.
   Reutiliza lingua_study_sessions y el slug griego-biblico del panel general.
   Se guarda un registro de recuperación local independiente para no sobrescribir
   las sesiones del francés si se abren ambos cursos en distintas pestañas. */
(function(){
'use strict';
var STORAGE_KEY='lv:greekSessions';
var LANGUAGE='griego-biblico';
var IDLE_MS=90000;
var MAX_SESSION_SECONDS=21600;
function loadPending(){
 try{
  var rows=JSON.parse(localStorage.getItem(STORAGE_KEY)||'[]');
  return Array.isArray(rows)?rows.filter(function(s){return s&&s.id&&s.language===LANGUAGE&&Number(s.duration_seconds)>0;}):[];
 }catch(e){return [];}
}
function savePending(map){
 try{localStorage.setItem(STORAGE_KEY,JSON.stringify(Array.from(map.values())));}catch(e){}
}
function pad(n){return String(n).padStart(2,'0');}
function clock(seconds){
 seconds=Math.floor(Number(seconds)||0);
 return pad(Math.floor(seconds/3600))+':'+pad(Math.floor((seconds%3600)/60))+':'+pad(seconds%60);
}
function cumulative(seconds){
 seconds=Math.floor(Number(seconds)||0);
 return Math.floor(seconds/3600)+' h '+pad(Math.floor((seconds%3600)/60))+' min';
}
function create(config){
 if(!config||!config.client||!config.userId||!config.lessonId)throw Error('El contador necesita una sesión autorizada y una lección.');
 var client=config.client,userId=config.userId,history=new Map(),pending=new Map(loadPending().map(function(s){return [s.id,s];}));
 var alive=true,paused=false,focused=typeof document.hasFocus==='function'?document.hasFocus():true;
 var lastActivity=Date.now(),lastTick=Date.now(),ticks=0,flushing=false,loaded=false;
 function newSession(lessonId){
  return {id:crypto.randomUUID(),language:LANGUAGE,lesson_id:lessonId,duration_seconds:0,started_at:new Date().toISOString()};
 }
 var session=newSession(config.lessonId);
 function isRunning(){
  return alive&&!paused&&!document.hidden&&focused&&Date.now()-lastActivity<IDLE_MS;
 }
 function putSession(s){
  if(!s||s.duration_seconds<=0)return;
  var old=pending.get(s.id);
  if(!old||old.duration_seconds<=s.duration_seconds)pending.set(s.id,{...s});
  savePending(pending);
 }
 function totalSeconds(){
  var merged=new Map(history);
  pending.forEach(function(s,id){var old=merged.get(id);if(!old||old.duration_seconds<s.duration_seconds)merged.set(id,s);});
  if(session&&session.duration_seconds>0){var old=merged.get(session.id);if(!old||old.duration_seconds<session.duration_seconds)merged.set(session.id,session);}
  return Array.from(merged.values()).reduce(function(n,s){return n+(Number(s.duration_seconds)||0);},0);
 }
 function updateUI(){
  var t=document.getElementById('duff-timer-live'),total=document.getElementById('duff-timer-total'),status=document.getElementById('duff-timer-state'),button=document.getElementById('duff-timer-toggle');
  if(t)t.textContent=clock(session.duration_seconds);
  if(total)total.textContent=cumulative(totalSeconds());
  var running=isRunning();
  if(status){
   status.textContent=running?'●':'◌';
   status.title=running?'Estudiando':paused?'Pausa manual':'Pausa automática';
   status.classList.toggle('paused',!running);
  }
  if(button){button.textContent=paused?'Reanudar':'Pausar';button.setAttribute('aria-pressed',String(paused));}
 }
 async function persist(){
  if(flushing||!alive&&pending.size===0)return;
  flushing=true;var hadError=false;
  try{
   for(var entry of Array.from(pending.entries())){
    var id=entry[0],record=entry[1];
    if(!record||!record.duration_seconds){pending.delete(id);continue;}
    if(history.get(id)&&Number(history.get(id).duration_seconds)>=Number(record.duration_seconds)){pending.delete(id);savePending(pending);continue;}
    var payload={...record,user_id:userId,updated_at:new Date().toISOString()};
    var result=await client.from('lingua_study_sessions').upsert(payload,{onConflict:'id'});
    if(result.error){hadError=true;console.warn('Lingua Viva: no se pudo sincronizar el tiempo griego',result.error.message);break;}
    var previous=history.get(id);
    if(!previous||previous.duration_seconds<=record.duration_seconds)history.set(id,record);
    var newer=pending.get(id);
    if(!newer||newer.duration_seconds<=record.duration_seconds)pending.delete(id);
    savePending(pending);
   }
  }catch(e){hadError=true;console.warn('Lingua Viva: sincronización de tiempo pendiente',e);}
  finally{flushing=false;updateUI();if(!hadError&&pending.size)Promise.resolve().then(persist);}
 }
 function flush(){putSession(session);return persist();}
 async function load(){
  if(loaded)return;
  loaded=true;
  try{
   var result=await client.from('lingua_study_sessions').select('id,language,lesson_id,duration_seconds,started_at').eq('user_id',userId).eq('language',LANGUAGE).limit(3000);
   if(result.error)console.warn('Lingua Viva: no se pudo cargar el tiempo griego',result.error.message);
   else{
    (result.data||[]).forEach(function(s){var old=history.get(s.id);if(!old||old.duration_seconds<s.duration_seconds)history.set(s.id,s);});
    pending.forEach(function(s,id){var remote=history.get(id);if(remote&&Number(remote.duration_seconds)>=Number(s.duration_seconds))pending.delete(id);});
    savePending(pending);
   }
  }catch(e){console.warn('Lingua Viva: tiempo acumulado no disponible',e);}
  updateUI();return persist();
 }
 function markActivity(){if(!alive)return;lastActivity=Date.now();updateUI();}
 function focus(){focused=true;lastTick=Date.now();markActivity();}
 function blur(){focused=false;lastTick=Date.now();flush();updateUI();}
 function visibility(){
  lastTick=Date.now();
  if(document.hidden)flush();else markActivity();
  updateUI();
 }
 function tick(){
  if(!alive)return;
  var now=Date.now(),elapsed=Math.max(0,now-lastTick);lastTick=now;
  if(isRunning()){
   session.duration_seconds+=Math.min(2,Math.round(elapsed/1000));
   ticks++;
   if(ticks%5===0)putSession(session);
   if(ticks%20===0)flush();
   if(session.duration_seconds>=MAX_SESSION_SECONDS||new Date(session.started_at).toDateString()!==new Date().toDateString())setLesson(session.lesson_id,true);
  }
  updateUI();
 }
 function setLesson(lessonId,force){
  if(!alive||!force&&session.lesson_id===lessonId)return;
  flush();session=newSession(lessonId);ticks=0;lastTick=Date.now();updateUI();
 }
 function togglePause(){
  paused=!paused;
  if(paused)flush();else markActivity();
  updateUI();
 }
 function stop(){
  if(!alive)return;
  flush();alive=false;clearInterval(interval);
  ['pointerdown','keydown','scroll','touchstart','wheel'].forEach(function(event){window.removeEventListener(event,markActivity,event==='scroll');});
  window.removeEventListener('focus',focus);window.removeEventListener('blur',blur);
  document.removeEventListener('visibilitychange',visibility);
  window.removeEventListener('pagehide',flush);
 }
 function html(){
  return '<details class="duff-timer" aria-label="Tiempo de estudio del griego">'
   +'<summary class="duff-timer-trigger" title="Ver tiempo de estudio y opciones del contador">'
   +'<span class="duff-timer-state" id="duff-timer-state" aria-hidden="true">●</span>'
   +'<span class="duff-timer-live" id="duff-timer-live">'+clock(session.duration_seconds)+'</span>'
   +'<span class="duff-timer-caret" aria-hidden="true">⌄</span></summary>'
   +'<div class="duff-timer-popover"><div class="micro">CONTADOR DE ESTUDIO</div>'
   +'<p class="duff-timer-label">Griego bíblico · acumulado</p>'
   +'<strong class="duff-timer-total" id="duff-timer-total">'+cumulative(totalSeconds())+'</strong>'
   +'<div class="duff-timer-links"><button type="button" class="btn btn-small" id="duff-timer-toggle" data-do="timer-toggle" aria-pressed="false">Pausar</button>'
   +'<a href="../estadisticas/?idioma=griego-biblico">Mis tiempos ↗</a></div>'
   +'<small>Se pausa al cambiar de pestaña o tras 90 s sin actividad.</small>'
   +'</div></details>';
 }
 ['pointerdown','keydown','scroll','touchstart','wheel'].forEach(function(event){window.addEventListener(event,markActivity,event==='scroll'?{capture:true,passive:true}:{passive:true});});
 window.addEventListener('focus',focus);window.addEventListener('blur',blur);
 document.addEventListener('visibilitychange',visibility);
 window.addEventListener('pagehide',flush);
 var interval=setInterval(tick,1000);
 return {html:html,load:load,flush:flush,stop:stop,setLesson:setLesson,togglePause:togglePause,updateUI:updateUI,totalSeconds:totalSeconds,
  getSession:function(){return {...session};},isRunning:isRunning};
}
window.LINGUA_GREEK_TIMER={create:create,clock:clock};
})();