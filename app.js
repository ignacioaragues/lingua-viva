/* Lingua Viva — plain browser JS; GitHub Pages + optional Supabase account. */
(() => {
  'use strict';
  const URL_SUPABASE = 'https://nzjdlqanbclsfwwstkwi.supabase.co';
  const KEY_SUPABASE = 'sb_publishable_be96IsfN-3skQErkZtOtQQ_pK0OT1Y9';
  const root = document.body.dataset.root || './';
  const page = document.body.dataset.page || 'home';
  let isFrench = page === 'francais' || (page === 'flashcards' && (!new URLSearchParams(location.search).get('idioma') || new URLSearchParams(location.search).get('idioma') === 'francais'));
  const C = window.LINGUA;
  const lessons = C.lessons;
  const $app = document.querySelector('#app');
  const h = str => String(str == null ? '' : str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const link = path => root + path;
  const lessonById = id => lessons.find(x => x.id === id) || lessons[0];
  const params = new URLSearchParams(location.search);
  const t = (fr, es) => isFrench ? fr : es;
  const localGet = (k, fallback) => { try { return JSON.parse(localStorage.getItem('lv:'+k)) ?? fallback; } catch { return fallback; } };
  const localPut = (k, value) => { try { localStorage.setItem('lv:'+k, JSON.stringify(value)); } catch {} };
  const state = {
    user:null, client:null, authModal:false, authMode:'login', authMessage:'', loading:true,
    sessions:[], progress:{}, attempts:{}, notes:{}, writings:[], cards:{},
    lessonId:lessonById(params.get('lecon') || localGet('lastLesson','d0-bonjour')).id,
    grammar:localGet('grammar','fr'), revealed:new Set(),
    lessonDraft:localGet('drafts',{}),
    localSessions:localGet('sessions',[]), localProgress:localGet('progress',{}),
    localAttempts:localGet('attempts',{}), localCards:localGet('cards',{}),
    tabFocused:true,
    lastActivity:Date.now(), activeSession:null,
    flashLang:params.get('idioma') || 'francais', flashShow:false, flashId:null, flashFilter:'due', reviewedNow:new Set()
  };
  const languages = [
    {slug:'francais',name:'Francés',native:'Français',letter:'F',desc:'A1 · Alter Ego+ 1 · Dossiers 0 y 1',live:true},
    {slug:'grec',name:'Griego antiguo',native:'Ἑλληνική',letter:'α',desc:'From Alpha to Omega · Por preparar',live:false},
    {slug:'cantonais',name:'Cantonés',native:'廣東話',letter:'粵',desc:'Hong Kong · Por preparar',live:false},
    {slug:'latin',name:'Latín',native:'Latina',letter:'L',desc:'Lectura y repaso · Por preparar',live:false}
  ];

  function maybeCreateClient() {
    if (window.supabase?.createClient) state.client = window.supabase.createClient(URL_SUPABASE, KEY_SUPABASE, {auth:{persistSession:true,autoRefreshToken:true,detectSessionInUrl:true}});
  }

  function totalSeconds(sessions) { return sessions.reduce((a,x)=>a+(Number(x.duration_seconds)||0),0); }
  function allSessions() {
    const items = [...state.sessions, ...state.localSessions];
    const a = state.activeSession;
    if (a) {
      const index = items.findIndex(s=>s.id===a.id);
      if (index>=0) items[index] = {...items[index],...a}; else items.push(a);
    }
    return items;
  }
  const fmt = sec => `${Math.floor(sec/3600)}h ${String(Math.floor((sec%3600)/60)).padStart(2,'0')}m`;
  const fmtShort = sec => `${Math.floor(sec/60)} min`;
  const dayKey = d => { const x=new Date(d);return x.getFullYear()+'-'+String(x.getMonth()+1).padStart(2,'0')+'-'+String(x.getDate()).padStart(2,'0'); };
  function weekBars(language=null) {
    const days = Array.from({length:7},(_,i)=>{const d = new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()-(6-i));return d;});
    const entries=allSessions().filter(s=>!language||s.language===language);
    const secs=days.map(d=>entries.filter(s=>dayKey(s.started_at)===dayKey(d)).reduce((acc,s)=>acc+(s.duration_seconds||0),0));
    const max=Math.max(...secs,300);
    const names=isFrench?['dim.','lun.','mar.','mer.','jeu.','ven.','sam.']:['dom','lun','mar','mié','jue','vie','sáb'];
    return `<div class="graph" aria-label="${t('Temps d’étude sur sept jours','Tiempo de estudio de los últimos siete días')}">${days.map((d,i)=>`<div class="bar-slot"><div title="${fmtShort(secs[i])}" class="bar ${i===6?'current':''}" style="height:${Math.max(3,secs[i]/max*95)}px"></div><span class="bar-label">${names[d.getDay()]}</span></div>`).join('')}</div>`;
  }
  function progressOf(id){return state.progress[id] ?? state.localProgress[id] ?? false;}
  const completed = () => lessons.filter(l=>progressOf(l.id)).length;
  const statsTime = language=>totalSeconds(allSessions().filter(s=>!language||s.language===language));

  function header(){
    const account = state.user ? `<button class="btn btn-small" data-action="auth">${h(state.user.email.split('@')[0])} · ${t('Compte','Cuenta')}</button>` : `<button class="btn btn-small" data-action="auth">${t('Se connecter','Mi cuenta')}</button>`;
    return `<header class="topbar"><div class="shell"><a class="brand" href="${root}">Lingua <em>Viva</em></a><nav class="topnav">${isFrench?`<a href="${link('francais/')}">Le parcours</a><a href="${link('flashcards/?idioma=francais')}">Cartes mémoire</a><a href="${link('')}">Langues</a>`:`<a href="${link('')}">Mis idiomas</a><a href="${link('flashcards/')}">Flashcards</a><a href="${link('')}#actividad">Mi actividad</a>`}</nav><div class="toptools"><a class="btn btn-small btn-plain" href="${root}">${t('Toutes les langues','Inicio')}</a>${account}</div></div></header>`;
  }
  function footer(){return `<footer class="shell footer"><span>Lingua Viva · ${t('Un espace pour apprendre les langues.','Un lugar para estudiar lenguas.')}</span><span>${t('Parcours original · Repères : Alter Ego+ 1','Material original · Referencia: Alter Ego+ 1')} · <a href="${link('')}">Accueil / Inicio</a></span></footer>`;}

  function renderHome(){
    document.title = 'Lingua Viva · Centro de idiomas';
    const secs=statsTime(), french=statsTime('francais');
    $app.innerHTML=header()+`<main>
      <section class="hero"><div class="shell hero-grid"><div><div class="eyebrow">Tu espacio de aprendizaje</div><h1>Las lenguas<br><em>se viven.</em></h1><p>Un lugar para estudiar a tu ritmo, volver sobre las palabras y seguir el recorrido que vas construyendo. Cada idioma tiene sus lecciones, ejercicios, audios, tarjetas de repaso y registro de estudio.</p><div class="hero-actions"><a class="btn btn-primary" href="${link('francais/')}">Continuar francés <span>↗</span></a><a class="btn" href="${link('flashcards/')}">Repasar vocabulario</a></div></div><div class="hero-aside"><div class="micro">Tu recorrido, hasta hoy</div><div class="rule"></div><div class="metricrow"><div><div class="metricnum">${completed()}<span style="font-size:15px;color:var(--muted)">/8</span></div><div class="metriclabel">Lecciones</div></div><div><div class="metricnum">${Math.floor(secs/60)}</div><div class="metriclabel">Minutos</div></div><div><div class="metricnum">${Object.values(state.cards).filter(c=>new Date(c.due_at)>new Date()).length}</div><div class="metriclabel">Tarjetas repasadas</div></div></div><div class="rule"></div><p>El contador se pone en marcha cuando estudiás dentro de una lección y se pausa si dejás de interactuar o cambiás de pestaña.</p></div></div></section>
      <section class="section shell" id="idiomas"><div class="section-head"><div><div class="eyebrow">Biblioteca de lenguas</div><h2>Mis idiomas</h2></div><p class="section-note">Un mismo espacio, recorridos independientes. El francés A1 es el primer curso activo.</p></div><div class="language-grid">${languages.map(l=>`<a class="lang-card ${l.live?'':'muted'}" href="${link(l.slug+'/')}"><div class="micro">${l.live?'En curso':'Próximamente'}</div><div class="char" aria-hidden="true">${l.letter}</div><h3>${l.name}</h3><p>${l.desc}</p><div class="bottom"><span>${l.live?`${completed()} de 8 lecciones · ${fmtShort(french)}`:'Crear recorrido'}</span><span class="arrow">↗</span></div></a>`).join('')}</div></section>
      <section class="section shell" id="actividad"><div class="section-head"><div><div class="eyebrow">Registro personal</div><h2>Mi actividad</h2></div><span class="section-note">${state.user?'Sincronizado con tu cuenta.':'Sin iniciar sesión: guardado en este navegador. Iniciá sesión para sincronizar.'}</span></div><div class="activity-block"><div class="panel"><div class="micro">Últimos siete días</div><h3>Tiempo de estudio</h3>${weekBars()}<p class="note">${fmt(secs)} acumulados · El registro contabiliza el tiempo activo dentro de las lecciones.</p></div><div class="panel"><div class="micro">Revisión</div><h3>Vocabulario aprendido</h3><div class="metricrow"><div><div class="metricnum">${unlockedCards('francais').length}</div><div class="metriclabel">Disponibles</div></div><div><div class="metricnum">${countDue('francais')}</div><div class="metriclabel">Por repasar</div></div><div><div class="metricnum">${completed()}</div><div class="metriclabel">Lecciones hechas</div></div></div><p class="note" style="margin-top:22px">Las flashcards se incorporan a tu mazo según avanzás de unidad. Las que olvidás vuelven antes.</p><a class="btn btn-small" href="${link('flashcards/?idioma=francais')}">Abrir flashcards ↗</a></div></div></section>
    </main>`+footer();
  }
  function lessonNav(){return `<aside class="sidenav" aria-label="Progression"><div class="side-title">Dossier 0 · Découverte</div>${lessons.filter(x=>x.dossier===0).map((l,i)=>navButton(l,i)).join('')}<div class="side-divider"></div><div class="side-title">Dossier 1 · Les uns, les autres</div>${lessons.filter(x=>x.dossier===1).map((l,i)=>navButton(l,i+3)).join('')}<div class="side-divider"></div><a href="${link('flashcards/?idioma=francais')}" class="btn btn-small" style="width:100%">↗ Cartes mémoire</a></aside>`;}
  function navButton(l,i){return `<button class="lesson-link ${l.id===state.lessonId?'active':''}" data-action="lesson" data-id="${l.id}"><span class="index">${String(i+1).padStart(2,'0')}</span><span>${h(l.title)}</span>${progressOf(l.id)?'<span class="done">✓</span>':''}</button>`;}
  function renderCourse(){
    const l = lessonById(state.lessonId); const i=lessons.indexOf(l); const percent=Math.round(completed()/lessons.length*100);
    document.title=l.title+' · Français A1 · Lingua Viva';
    $app.innerHTML=header()+`<main><div class="shell"><section class="course-head"><div><div class="eyebrow">Français · Niveau A1</div><h1>Apprendre le <em>français.</em></h1><p>Un parcours autonome, construit autour des dossiers d’<i>Alter Ego+ 1</i>. Dialogues originaux, pratique de l’écrit et de l’oral, écoute et révisions.</p></div><div class="course-stat"><div class="micro">Progression du parcours</div><div class="metricnum">${percent}%</div><div class="track"><span style="width:${percent}%"></span></div></div></section>
    <div class="course-layout">${lessonNav()}
      <article class="lesson-main" id="lecon"><div class="lesson-kicker"><span class="micro">Dossier ${l.dossier} · ${String(i+1).padStart(2,'0')} / 08</span><span class="micro">Repère manuel : p. ${l.pages}</span></div><h2>${h(l.title)}</h2><div class="subtitle">${h(l.subtitle)}</div><div class="goal"><b>À la fin de cette leçon</b>${h(l.goal)}</div>
        <section class="content-section"><h3>En situation</h3><div class="dialogue">${l.example.map(line=>`<div>${h(line)}</div>`).join('')}</div><p style="margin-top:12px;font-size:12px">Lisez le dialogue à voix haute. Rejouez-le ensuite sans regarder.</p></section>
        <section class="content-section" id="grammaire"><div class="grammar-head"><h3>${h(l.grammarTitle)}</h3><div class="switch" aria-label="Langue des explications grammaticales"><button data-action="grammar" data-lang="fr" class="${state.grammar==='fr'?'active':''}" aria-pressed="${state.grammar==='fr'}">FR</button><button data-action="grammar" data-lang="es" class="${state.grammar==='es'?'active':''}" aria-pressed="${state.grammar==='es'}">ES</button></div></div><div class="grammar-copy" lang="${state.grammar}"><p>${h(l.grammar[state.grammar])}</p></div></section>
        <section class="content-section"><div class="grammar-head"><h3>Mots à retenir</h3><a class="btn btn-small btn-plain" href="${link('flashcards/?idioma=francais')}">Réviser ↗</a></div><p>Cliquez sur un mot pour afficher ou cacher son sens.</p><div class="vocab-grid">${l.words.map(([a,b],j)=>`<button class="vocab" data-action="reveal" data-word="${j}"><b>${h(a)}</b><span>${state.revealed.has(j)?h(b):'Voir le sens ↗'}</span></button>`).join('')}</div></section>
        <section class="content-section" id="exercices"><h3>À vous de jouer</h3><p>Choisissez une réponse. Vous pouvez recommencer autant de fois que vous voulez.</p>${l.exercises.map((ex,j)=>renderExercise(ex,j)).join('')}</section>
        <section class="content-section" id="ecriture"><h3>Écriture</h3><p>${h(l.writing)}</p><textarea id="writingDraft" class="textarea" placeholder="Écrivez ici en français…" aria-label="Votre texte">${h(state.lessonDraft[l.id]||'')}</textarea><div class="writing-actions"><button class="btn btn-primary" data-action="save-writing">${state.user?'Enregistrer le texte':'Enregistrer dans ce navigateur'}</button><span class="count" id="wordCount"></span></div><p class="hint">${state.user?'Vos textes sont conservés dans votre compte. Une correction pourra ensuite être ajoutée à cet endroit.':'Connectez-vous pour retrouver vos textes et leurs corrections sur vos différents appareils.'}</p><div id="writingsList">${renderWritings()}</div></section>
        <section class="content-section" id="oral"><h3>Parler en français</h3><p>Ouvrez une conversation vocale avec ChatGPT. Copiez la consigne, collez-la dans la conversation et activez le mode vocal.</p><div class="writing-actions"><button class="btn btn-primary" data-action="voice">Copier la consigne et ouvrir ChatGPT ↗</button><button class="btn" data-action="copy-voice">Copier seulement</button></div></section>
        <section class="content-section" id="ressources"><h3>Écouter, regarder, découvrir</h3><p>Ressources complémentaires et enregistrements externes.</p><div class="resources">${C.resources.filter(r=>r.lesson==='all'||r.lesson===l.id).map(resourceHTML).join('')}</div></section>
        <section class="content-section"><h3>Mon carnet</h3><p>Notez une difficulté, une phrase utile ou une question pour la prochaine séance.</p><textarea id="notesInput" class="textarea" style="min-height:90px" placeholder="Mes notes personnelles…">${h(state.notes[l.id]??localGet('notes',{})[l.id]??'')}</textarea><div class="writing-actions"><button class="btn" data-action="save-note">Sauvegarder les notes</button><span class="hint">Également accessible depuis votre compte.</span></div></section>
        <div class="lesson-nav"><button class="btn" data-action="lesson" data-id="${lessons[Math.max(i-1,0)].id}" ${i===0?'disabled':''}>← Leçon précédente</button><button class="btn btn-primary" data-action="complete">${progressOf(l.id)?'✓ Leçon terminée':'Marquer comme terminée'}</button><button class="btn" data-action="lesson" data-id="${lessons[Math.min(i+1,lessons.length-1)].id}" ${i===lessons.length-1?'disabled':''}>Suivante →</button></div>
      </article>
      <aside class="sidebar-right"><div class="mini-panel"><div class="micro">Temps d’étude actif</div><div class="bigtime" id="liveTime">00:00</div><div class="timer-state" id="timerState">● Suivi automatique</div><p>Le chronomètre s’arrête quand vous quittez l’onglet ou après 90 s sans activité.</p><button class="btn btn-small" data-action="timer-toggle" id="timerButton">Faire une pause</button></div><div class="mini-panel"><div class="micro">Votre parcours</div><div class="bigtime" id="courseTime">${fmt(statsTime('francais'))}</div><div class="micro">Total cumulé</div><div class="track"><span style="width:${percent}%"></span></div><p>${completed()} leçons terminées sur 8</p><a href="${link('flashcards/?idioma=francais')}" class="btn btn-small">Cartes mémoire ↗</a></div></aside>
    </div></div></main>`+footer();
    renderTimerUI(); renderWordCount();
  }
  function renderExercise(ex,j){
    const attempt=state.attempts[ex.id]??state.localAttempts[ex.id];
    return `<div class="exercise"><div class="qnum">QUESTION ${j+1} / 3</div><p>${h(ex.q)}</p><div class="options">${ex.opts.map((op,k)=>`<button data-action="answer" data-ex="${ex.id}" data-choice="${k}" class="option ${attempt?.selected_answer===k?'selected '+(attempt.correct?'correct':'incorrect'):''}">${h(op)}</button>`).join('')}</div>${attempt?`<p class="feedback ${attempt.correct?'':'error'}">${attempt.correct?'✓ Bonne réponse.':'Essayez encore.'} ${h(ex.why)}</p>`:''}</div>`;
  }
  function renderWritings(){
    const a=state.writings.filter(w=>w.lesson_id===state.lessonId).sort((x,y)=>new Date(y.created_at)-new Date(x.created_at));
    const local=localGet('writings',[]).filter(w=>w.lesson_id===state.lessonId);
    return [...a,...local].slice(0,5).map(w=>`<div class="writing-entry"><div class="micro">${new Date(w.created_at).toLocaleDateString('fr-FR')} · ${w.status==='reviewed'?'Corrigé':'Texte enregistré'}</div><p>${h(w.body)}</p>${w.feedback?`<div class="review"><div class="micro">Retour et corrections</div><p>${h(w.feedback)}</p>${w.corrected_text?`<p><b>Proposition corrigée :</b> ${h(w.corrected_text)}</p>`:''}</div>`:''}<button class="btn btn-small" data-action="copy-writing" data-writing="${h(w.id)}">Demander une correction ↗</button></div>`).join('');
  }
  function resourceHTML(r){return `<a class="resource" href="${h(r.url)}" target="_blank" rel="noopener noreferrer"><div><div class="micro">${h(r.type)}</div><h4>${h(r.title)}</h4><p>${h(r.desc)}</p></div><span class="launch">↗</span></a>`;}

  function renderComing(){
    const l=languages.find(x=>x.slug===page)||languages[1];
    $app.innerHTML=header()+`<main class="shell"><section class="coming"><div class="eyebrow">Biblioteca de lenguas / ${h(l.native)}</div><h1>${h(l.name)}<br><em style="color:var(--green)">en preparación.</em></h1><p>Este idioma ya tiene su propio espacio en Lingua Viva. Cuando incorporemos el curso, acá aparecerán las lecciones, los ejercicios, el estudio automático y tus tarjetas de vocabulario.</p><div class="placeholder-lessons"><span>Curso y unidades</span><span>Ejercicios</span><span>Audio y vídeo</span><span>Flashcards</span><span>Registro de estudio</span></div><div class="hero-actions"><a class="btn btn-primary" href="${link('flashcards/?idioma='+l.slug)}">Mis flashcards ↗</a><a class="btn" href="${root}">← Volver a todos los idiomas</a></div></section></main>`+footer();
  }

  function allFlashcards(language){
    if(language!=='francais') return [];
    return lessons.flatMap((l,idx)=>l.words.map(([front,back],n)=>({id:l.id+'-'+n,lesson_id:l.id,order:idx,front,back})));
  }
  function unlockedCards(language){
    const cards=allFlashcards(language);
    if(language!=='francais') return [];
    const lastCompleted=lessons.reduce((a,l,i)=>progressOf(l.id)?Math.max(a,i):-1,-1);
    const currentIdx=lessons.findIndex(l=>l.id===state.lessonId);
    const maxIndex=Math.max(lastCompleted, currentIdx, 0);
    return cards.filter(c=>c.order<=maxIndex);
  }
  function dueCards(language){return unlockedCards(language).filter(c=>{const review=state.cards[language+':'+c.id]??state.localCards[language+':'+c.id];return !review||new Date(review.due_at)<=new Date();});}
  function countDue(language){return dueCards(language).length;}
  function currentFlashCard(){
    const all=(state.flashFilter==='all'?unlockedCards(state.flashLang):dueCards(state.flashLang)).filter(c=>!state.reviewedNow.has(c.id));
    if (!all.length) return null;
    return all.find(c=>c.id===state.flashId)||all[0];
  }
  function renderFlashcards(){
    const lang=languages.find(l=>l.slug===state.flashLang)||languages[0];
    const french=state.flashLang==='francais';
    const cards=unlockedCards(state.flashLang), due=dueCards(state.flashLang), current=currentFlashCard();
    document.title=(french?'Cartes mémoire':'Flashcards')+' · Lingua Viva';
    $app.innerHTML=header()+`<main class="shell"><section class="flash-page"><div class="eyebrow">${french?'Révision du vocabulaire':'Repaso de vocabulario'}</div><h1>${french?'Cartes <em>mémoire.</em>':'Mis <em>flashcards.</em>'}</h1><p class="flash-intro">${french?'Les mots de vos leçons, prêts à être révisés à votre rythme. Les mots difficiles reviendront plus tôt.':'Repasá las palabras que ya encontraste en tus unidades. Las difíciles vuelven antes; las que recordás se espacian.'}</p>
      <div class="flash-toolbar"><label>${french?'Langue':'Idioma'} <select id="flashLanguage">${languages.map(l=>`<option value="${l.slug}" ${l.slug===state.flashLang?'selected':''}>${h(l.name)}</option>`).join('')}</select></label><div class="switch"><button data-action="flash-filter" data-filter="due" class="${state.flashFilter==='due'?'active':''}">${french?'À réviser':'Pendientes'} (${due.length})</button><button data-action="flash-filter" data-filter="all" class="${state.flashFilter==='all'?'active':''}">${french?'Tous':'Todos'} (${cards.length})</button></div><a class="btn btn-small" href="${link(lang.slug+'/')}">${french?'← Le cours':'← Volver al curso'}</a></div>
      ${current?`<div class="flash-study"><div class="micro">${french?'Cliquez pour retourner la carte':'Tocá la tarjeta para darla vuelta'}</div><button class="flash-card ${state.flashShow?'flipped':''}" data-action="flip" aria-label="${french?'Retourner la carte':'Girar tarjeta'}"><span class="flash-card-flag">${h(lang.native)} · ${h(current.lesson_id.replace('d','Dossier ').replace('-',' / '))}</span><span class="flash-card-front">${h(state.flashShow?current.back:current.front)}</span><span class="flash-card-hint">${state.flashShow?(french?'Sens / explication':'Significado / explicación'):(french?'Voir le sens ↗':'Ver respuesta ↗')}</span></button>${state.flashShow?`<div class="flash-review-actions"><button class="btn" data-action="flash-review" data-quality="again">↶ ${french?'À revoir':'Otra vez'}</button><button class="btn btn-primary" data-action="flash-review" data-quality="good">✓ ${french?'Je connais':'La recordé'}</button></div>`:`<p class="hint" style="text-align:center">${french?'Pensez à la signification avant de retourner la carte.':'Intentá recordar la respuesta antes de darla vuelta.'}</p>`}</div>`:`<div class="empty" style="padding:45px;margin-top:26px">${cards.length?(french?'Bravo ! Aucune carte à réviser pour le moment.':'¡Muy bien! No tenés tarjetas pendientes por ahora.'):(french?'Les cartes apparaîtront après les premières leçons.':'Las tarjetas aparecerán cuando empieces las lecciones de este idioma.')} ${french?'<a href="'+link('francais/')+'">Continuer le cours ↗</a>':''}</div>`}
      <div class="flash-help"><div><div class="micro">${french?'Votre progression':'Tu progreso'}</div><h3>${cards.length} ${french?'cartes disponibles':'tarjetas disponibles'}</h3><p>${due.length} ${french?'à réviser maintenant':'para repasar ahora'}. ${french?'Le parcours débloque progressivement votre vocabulaire.':'A medida que avancés, se desbloquea más vocabulario.'}</p></div><div><div class="micro">${french?'Répétition espacée':'Repaso espaciado'}</div><h3>${french?'Réviser au bon moment':'Repasar a tiempo'}</h3><p>${french?'Après une bonne réponse, la prochaine révision est programmée plus tard. Une erreur replace la carte dans les prochaines révisions.':'Si recordás la tarjeta, el próximo repaso se aleja. Si te cuesta, vuelve a aparecer pronto.'}</p></div></div>
    </section></main>`+footer();
  }

  function render(){
    if (page==='home')renderHome();else if(page==='francais')renderCourse();else if(page==='flashcards')renderFlashcards();else renderComing();
    if(state.authModal)showModal();
  }

  function showModal(){
    document.querySelector('.modal-backdrop')?.remove();
    const auth=state.authMode;
    const guest=state.user;
    const subtitle=guest?`${t('Connecté avec','Sesión de')} ${h(guest.email)}`:t('La même identité que dans Édition Viva.','La misma cuenta que en Edición Viva.');
    document.body.insertAdjacentHTML('beforeend',`<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-label="${t('Mon compte','Mi cuenta')}"><div class="modal-head"><div><div class="eyebrow">Lingua Viva</div><h2>${t('Mon compte','Mi cuenta')}</h2></div><button class="close" aria-label="Fermer" data-action="close-auth">×</button></div><p style="font-size:13px;color:var(--muted)">${subtitle}</p>${guest?`<button class="btn" data-action="signout">${t('Se déconnecter','Cerrar sesión')}</button>`:`<div class="auth-tabs"><button class="btn btn-small ${auth==='login'?'btn-primary':''}" data-action="auth-mode" data-mode="login">${t('Connexion','Ingresar')}</button><button class="btn btn-small ${auth==='signup'?'btn-primary':''}" data-action="auth-mode" data-mode="signup">${t('Créer un compte','Crear cuenta')}</button><button class="btn btn-small ${auth==='reset'?'btn-primary':''}" data-action="auth-mode" data-mode="reset">${t('Mot de passe','Contraseña')}</button></div><form id="authForm"><div class="field"><label for="authEmail">Email</label><input id="authEmail" name="email" type="email" required autocomplete="email"></div>${auth!=='reset'?`<div class="field"><label for="authPassword">${t('Mot de passe','Contraseña')}</label><input id="authPassword" name="password" type="password" required minlength="6" autocomplete="${auth==='signup'?'new-password':'current-password'}"></div>`:''}<button type="submit" class="btn btn-primary" style="width:100%">${auth==='login'?t('Se connecter','Ingresar'):auth==='signup'?t('Créer le compte','Crear cuenta'):t('Recevoir un lien','Enviar enlace')}</button></form>`}${state.authMessage?`<p class="notice ${state.authMessage.startsWith('⚠')?'error':''}">${h(state.authMessage)}</p>`:''}<p class="hint" style="margin-top:22px">${t('Les données de progression sont privées. Le compte est facultatif, mais nécessaire pour la synchronisation entre appareils.','Tus datos son privados. La cuenta es opcional, pero necesaria para sincronizar entre dispositivos.')}</p></div></div>`);
    document.getElementById('authForm')?.addEventListener('submit',submitAuth);
  }
  async function submitAuth(e){
    e.preventDefault();state.authMessage='';
    if(!state.client){state.authMessage='⚠ '+t('Le service de connexion est indisponible.','El servicio de cuentas no está disponible.');showModal();return;}
    const email=e.target.elements.email.value.trim();const password=e.target.elements.password?.value;
    let result;
    try{
      if(state.authMode==='signup')result=await state.client.auth.signUp({email,password,options:{emailRedirectTo:location.href.split('?')[0]}});
      else if(state.authMode==='reset')result=await state.client.auth.resetPasswordForEmail(email,{redirectTo:location.href.split('?')[0]});
      else result=await state.client.auth.signInWithPassword({email,password});
      state.authMessage=result.error?'⚠ '+result.error.message:(state.authMode==='signup'?t('Vérifiez votre boîte mail si la confirmation est demandée.','Revisá tu correo si se requiere confirmación.'):state.authMode==='reset'?t('Si cette adresse existe, un e-mail de récupération a été envoyé.','Si el correo existe, se envió un enlace de recuperación.'):t('Connexion réussie.','Ingresaste correctamente.'));
      if(result.error)showModal();else if(state.authMode!=='login')showModal();
    } catch(err){state.authMessage='⚠ '+err.message;showModal();}
  }
  async function syncFromCloud(){
    if(!state.client||!state.user)return;
    const names=['lingua_study_sessions','lingua_lesson_progress','lingua_exercise_attempts','lingua_writings','lingua_notes','lingua_flashcard_reviews'];
    const result=await Promise.all(names.map(table=>state.client.from(table).select('*').eq('user_id',state.user.id).limit(3000)));
    if(result.some(r=>r.error))console.warn('Lingua Viva: parte de los datos no se pudo cargar',result.filter(r=>r.error).map(r=>r.error.message));
    const data=result.map(r=>r.data||[]);
    state.sessions=data[0];state.progress=Object.fromEntries(data[1].map(r=>[r.lesson_id,r.completed]));state.attempts=Object.fromEntries(data[2].map(r=>[r.exercise_id,r]));state.writings=data[3];state.notes=Object.fromEntries(data[4].map(r=>[r.lesson_id,r.body]));state.cards=Object.fromEntries(data[5].map(r=>[r.language+':'+r.card_id,r]));
    // Anonymous data are migrated using the same UUIDs, so a retry is safe.
    await migrateLocal();
    render();
  }
  async function migrateLocal(){
    if(!state.user||!state.client)return;
    const id=state.user.id;
    const localSessions=state.localSessions.filter(s=>s.duration_seconds>0).map(s=>({...s,user_id:id}));
    if(localSessions.length){const{error}=await state.client.from('lingua_study_sessions').upsert(localSessions,{onConflict:'id'});if(!error){state.sessions=[...state.sessions.filter(s=>!localSessions.some(x=>x.id===s.id)),...localSessions];state.localSessions=[];localPut('sessions',[]);}}
    const p=Object.entries(state.localProgress).map(([lesson_id,completed])=>({user_id:id,lesson_id,completed,updated_at:new Date().toISOString()}));
    if(p.length){const{error}=await state.client.from('lingua_lesson_progress').upsert(p,{onConflict:'user_id,lesson_id'});if(!error){Object.assign(state.progress,state.localProgress);state.localProgress={};localPut('progress',{});}}
    const a=Object.entries(state.localAttempts).map(([exercise_id,entry])=>({user_id:id,exercise_id,lesson_id:entry.lesson_id,selected_answer:entry.selected_answer,correct:entry.correct,updated_at:new Date().toISOString()}));
    if(a.length){const{error}=await state.client.from('lingua_exercise_attempts').upsert(a,{onConflict:'user_id,exercise_id'});if(!error){Object.assign(state.attempts,state.localAttempts);state.localAttempts={};localPut('attempts',{});}}
    const fc=Object.values(state.localCards).map(r=>({...r,user_id:id}));
    if(fc.length){const{error}=await state.client.from('lingua_flashcard_reviews').upsert(fc,{onConflict:'user_id,language,card_id'});if(!error){state.localCards={};localPut('cards',{});}}
  }

  async function flushSession(){
    const s=state.activeSession;if(!s||!s.duration_seconds)return;
    if(state.user&&state.client){
      const payload={...s,user_id:state.user.id,updated_at:new Date().toISOString()};
      const{error}=await state.client.from('lingua_study_sessions').upsert(payload,{onConflict:'id'});
      if(!error){state.sessions=state.sessions.filter(x=>x.id!==s.id).concat(payload);return;}
    }
    state.localSessions=state.localSessions.filter(x=>x.id!==s.id).concat({...s});localPut('sessions',state.localSessions);
  }
  function startSession(){
    if(page!=='francais')return;
    state.activeSession={id:crypto.randomUUID(),language:'francais',lesson_id:state.lessonId,duration_seconds:0,started_at:new Date().toISOString()};
    state.lastActivity=Date.now();state.tabFocused=true;state.userPaused=false;
    renderTimerUI();
  }
  function timerRunning(){return page==='francais' && !!state.activeSession && !state.userPaused && !document.hidden && state.tabFocused && Date.now()-state.lastActivity<90000;}
  let tickCount=0;
  function tick(){
    if(!state.activeSession)return;
    if(timerRunning())state.activeSession.duration_seconds++;
    renderTimerUI();
    if(++tickCount%20===0)flushSession();
  }
  function renderTimerUI(){
    const e=document.querySelector('#liveTime');if(!e)return;
    const n=state.activeSession?.duration_seconds||0;
    e.textContent=`${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`;
    const running=timerRunning();
    const status=document.querySelector('#timerState');if(status){status.textContent=running?'● Étude en cours':state.userPaused?'◌ Pause manuelle':'◌ Pause automatique';status.classList.toggle('paused',!running);}
    const b=document.querySelector('#timerButton');if(b)b.textContent=state.userPaused?'Reprendre':'Faire une pause';
    const total=document.querySelector('#courseTime');if(total)total.textContent=fmt(statsTime('francais'));
  }
  function markActive(){state.lastActivity=Date.now();if(!document.hidden)state.tabFocused=true;}
  function nextLesson(id){
    if(id===state.lessonId)return;
    flushSession();state.lessonId=id;localPut('lastLesson',id);state.revealed.clear();
    history.replaceState(null,'','?lecon='+encodeURIComponent(id));
    startSession();render();window.scrollTo({top:0,behavior:'smooth'});
  }

  async function persistProgress(id,completed){
    if(state.user&&state.client){const{error}=await state.client.from('lingua_lesson_progress').upsert({user_id:state.user.id,lesson_id:id,completed,updated_at:new Date().toISOString()},{onConflict:'user_id,lesson_id'});if(!error)state.progress[id]=completed;else toast(error.message,true);}
    else{state.localProgress[id]=completed;localPut('progress',state.localProgress);}
    render();
  }
  async function answer(exId,selected){
    const l=lessonById(state.lessonId);const ex=l.exercises.find(x=>x.id===exId);if(!ex)return;
    const record={lesson_id:l.id,exercise_id:exId,selected_answer:selected,correct:selected===ex.answer,updated_at:new Date().toISOString()};
    state.attempts[exId]=record;render();
    if(state.user&&state.client){const{error}=await state.client.from('lingua_exercise_attempts').upsert({...record,user_id:state.user.id},{onConflict:'user_id,exercise_id'});if(error)toast(error.message,true);}
    else{state.localAttempts[exId]=record;localPut('attempts',state.localAttempts);}
  }
  async function saveWriting(){
    const el=document.querySelector('#writingDraft');const body=el?.value.trim();if(!body){toast('Écrivez quelques phrases avant de sauvegarder.',true);return;}
    const l=lessonById(state.lessonId);
    const rec={id:crypto.randomUUID(),lesson_id:l.id,prompt:l.writing,body,status:'pending',created_at:new Date().toISOString()};
    if(state.user&&state.client){const{data,error}=await state.client.from('lingua_writings').insert({lesson_id:l.id,prompt:l.writing,body,user_id:state.user.id}).select().single();if(error){toast(error.message,true);return;}state.writings.unshift(data);}
    else{const old=localGet('writings',[]);old.unshift(rec);localPut('writings',old);}
    state.lessonDraft[l.id]='';localPut('drafts',state.lessonDraft);render();toast('Texte enregistré.');
  }
  async function saveNote(){
    const body=document.querySelector('#notesInput')?.value||'';const id=state.lessonId;
    if(state.user&&state.client){const{error}=await state.client.from('lingua_notes').upsert({user_id:state.user.id,lesson_id:id,body,updated_at:new Date().toISOString()},{onConflict:'user_id,lesson_id'});if(error){toast(error.message,true);return;}state.notes[id]=body;}
    else{const notes=localGet('notes',{});notes[id]=body;localPut('notes',notes);}
    toast('Notes sauvegardées.');
  }
  function reviewFlashCard(quality){
    const card=currentFlashCard();if(!card)return;
    const key=state.flashLang+':'+card.id;
    const previous=state.cards[key]??state.localCards[key];
    const repetitions=quality==='again'?0:(previous?.repetitions||0)+1;
    const interval=quality==='again'?0:repetitions===1?1:repetitions===2?3:Math.min(60,(previous?.interval_days||3)*2);
    const due=new Date(Date.now()+(quality==='again'?3*60*1000:interval*86400000));
    const record={language:state.flashLang,card_id:card.id,repetitions,interval_days:interval,due_at:due.toISOString(),last_reviewed_at:new Date().toISOString(),updated_at:new Date().toISOString()};
    state.reviewedNow.add(card.id);
    state.cards[key]=record;
    if(state.user&&state.client){state.client.from('lingua_flashcard_reviews').upsert({...record,user_id:state.user.id},{onConflict:'user_id,language,card_id'}).then(({error})=>{if(error)toast(error.message,true);});}
    else{state.localCards[key]=record;localPut('cards',state.localCards);}
    state.flashShow=false;state.flashId=null;render();
  }
  async function copyText(value){try{await navigator.clipboard.writeText(value);toast(t('Consigne copiée.','Consigna copiada.'));}catch{prompt(t('Copiez cette consigne :','Copiá esta consigna:'),value);}}
  function toast(message,error=false){document.querySelector('.toast')?.remove();const node=document.createElement('div');node.className='toast';node.style.background=error?'#9b6856':'';node.textContent=message;document.body.append(node);setTimeout(()=>node.remove(),4000);}

  document.addEventListener('click',async e=>{
    const b=e.target.closest('[data-action]');if(!b)return;
    const a=b.dataset.action;markActive();
    if(a==='auth'){state.authModal=true;state.authMessage='';render();return;}
    if(a==='close-auth'){state.authModal=false;document.querySelector('.modal-backdrop')?.remove();return;}
    if(a==='auth-mode'){state.authMode=b.dataset.mode;state.authMessage='';showModal();return;}
    if(a==='signout'){await state.client?.auth.signOut();state.authModal=false;document.querySelector('.modal-backdrop')?.remove();return;}
    if(a==='lesson'){nextLesson(b.dataset.id);return;}
    if(a==='grammar'){state.grammar=b.dataset.lang;localPut('grammar',state.grammar);render();return;}
    if(a==='reveal'){const key=Number(b.dataset.word);state.revealed.has(key)?state.revealed.delete(key):state.revealed.add(key);render();return;}
    if(a==='answer'){await answer(b.dataset.ex,Number(b.dataset.choice));return;}
    if(a==='timer-toggle'){state.userPaused=!state.userPaused;markActive();renderTimerUI();return;}
    if(a==='complete'){await persistProgress(state.lessonId,!progressOf(state.lessonId));return;}
    if(a==='save-writing'){await saveWriting();return;}
    if(a==='save-note'){await saveNote();return;}
    if(a==='voice'||a==='copy-voice'){await copyText(lessonById(state.lessonId).speaking);if(a==='voice')window.open('https://chatgpt.com/','_blank','noopener');return;}
    if(a==='copy-writing'){
      const w=[...state.writings,...localGet('writings',[])].find(x=>x.id===b.dataset.writing);
      if(w){await copyText(`Soy estudiante de francés A1. Corregí este texto que escribí como actividad de ${lessonById(w.lesson_id).title}. Quiero: 1) una versión corregida, 2) explicación breve de mis errores, 3) dos consejos concretos. Mantené mi estilo y mi nivel.\n\nConsigna: ${w.prompt}\n\nMi texto:\n${w.body}`);window.open('https://chatgpt.com/','_blank','noopener');}return;
    }
    if(a==='flash-filter'){state.flashFilter=b.dataset.filter;state.flashId=null;state.flashShow=false;state.reviewedNow.clear();render();return;}
    if(a==='flip'){state.flashShow=!state.flashShow;render();return;}
    if(a==='flash-review'){reviewFlashCard(b.dataset.quality);return;}
  });
  document.addEventListener('input',e=>{if(e.target.id==='writingDraft'){state.lessonDraft[state.lessonId]=e.target.value;localPut('drafts',state.lessonDraft);renderWordCount();}});
  document.addEventListener('change',e=>{if(e.target.id==='flashLanguage'){state.flashLang=e.target.value;isFrench=state.flashLang==='francais';state.flashShow=false;state.flashId=null;state.reviewedNow.clear();history.replaceState(null,'','?idioma='+encodeURIComponent(state.flashLang));render();}});
  function renderWordCount(){const n=document.querySelector('#wordCount');const v=document.querySelector('#writingDraft');if(n&&v)n.textContent=v.value.trim()?v.value.trim().split(/\s+/).length+' mots':'0 mot';}
  for(const event of ['pointerdown','keydown','scroll','touchstart'])window.addEventListener(event,markActive,{passive:true});
  window.addEventListener('blur',()=>{state.tabFocused=false;flushSession();renderTimerUI();});
  window.addEventListener('focus',()=>{state.tabFocused=true;markActive();renderTimerUI();});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)flushSession();else markActive();renderTimerUI();});
  window.addEventListener('pagehide',()=>{
    // The last successful periodic update is durable; keep a local recovery copy of the active session.
    if(state.activeSession?.duration_seconds){state.localSessions=state.localSessions.filter(x=>x.id!==state.activeSession.id).concat({...state.activeSession});localPut('sessions',state.localSessions);flushSession();}
  });

  async function init(){
    maybeCreateClient();
    if(page==='francais')startSession();
    render();
    if(state.client){
      const{data}=await state.client.auth.getSession();
      if(data?.session?.user){state.user=data.session.user;await syncFromCloud();}
      state.client.auth.onAuthStateChange((event,session)=>{
        const old=state.user?.id;state.user=session?.user||null;
        if(event==='SIGNED_IN'&&state.user&&old!==state.user.id)syncFromCloud();
        else if(event==='SIGNED_OUT'){state.sessions=[];state.progress={};state.attempts={};state.notes={};state.writings=[];state.cards={};render();}
      });
    }
    setInterval(tick,1000);
  }
  init();
})();
