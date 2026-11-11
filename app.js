/* Lingua Viva — plain browser JS; GitHub Pages + optional Supabase account. */
(() => {
  'use strict';
  const URL_SUPABASE = 'https://nzjdlqanbclsfwwstkwi.supabase.co';
  const KEY_SUPABASE = 'sb_publishable_be96IsfN-3skQErkZtOtQQ_pK0OT1Y9';
  const root = document.body.dataset.root || './';
  const page = document.body.dataset.page || 'home';
  let isFrench = page === 'francais' || ((page === 'flashcards' || page === 'estadisticas') && new URLSearchParams(location.search).get('idioma') === 'francais');
  const C = window.LINGUA;
  const lessons = C.lessons;
  const $app = document.querySelector('#app');
  const h = str => String(str == null ? '' : str).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const link = path => root + path;
  const lessonById = id => lessons.find(x => x.id === id) || lessons[0];
  const params = new URLSearchParams(location.search);
  const t = (fr, es) => isFrench ? fr : es;
  const grammarExamples = text => [...new Set([...text.matchAll(/«([^»]+)»/g)].map(m=>m[1].trim()))].slice(0,9);
  function speechButton(text, label, lang='fr-FR', extra='') {
    return `<button type="button" class="speech-btn ${extra}" data-action="speak" data-speech-text="${h(text)}" data-speech-lang="${h(lang)}" aria-label="${h(label)}" title="${h(label)}"><span aria-hidden="true">🔊</span>${extra==='speech-compact'?'':`<span>${h(label)}</span>`}</button>`;
  }
  function speakText(text,lang='fr-FR'){
    const synth=window.speechSynthesis, Utterance=window.SpeechSynthesisUtterance;
    if(!synth || typeof Utterance!=='function'){toast(t('La lecture audio n’est pas disponible dans ce navigateur.','La lectura de audio no está disponible en este navegador.'),true);return;}
    synth.cancel();
    const utterance=new Utterance(text);
    utterance.lang=lang;
    utterance.rate=lang.startsWith('fr')?0.9:1;
    const voices=synth.getVoices?.()||[];
    const exact=lang.toLowerCase();
    utterance.voice=voices.find(v=>v.lang?.toLowerCase()===exact)||voices.find(v=>v.lang?.toLowerCase().startsWith(exact.slice(0,2)))||null;
    try{synth.speak(utterance);}catch{toast(t('Impossible de lire cet extrait.','No se pudo reproducir este fragmento.'),true);}
  }
  const localGet = (k, fallback) => { try { return JSON.parse(localStorage.getItem('lv:'+k)) ?? fallback; } catch { return fallback; } };
  const localPut = (k, value) => { try { localStorage.setItem('lv:'+k, JSON.stringify(value)); } catch {} };
  const state = {
    user:null, client:null, authModal:false, authMode:'login', authMessage:'', loading:true,
    sessions:[], progress:{}, attempts:{}, notes:{}, writings:[], cards:{},
    lessonId:lessonById(params.get('lecon') || localGet('lastLesson','d0-bonjour')).id,
    lastLessonSavedAt:localGet('lastLessonSavedAt',null),
    grammar:localGet('grammar','fr'), revealed:new Set(), readingParallel:localGet('readingParallel',true),
    lessonDraft:localGet('drafts',{}), dictationDraft:localGet('dictationDraft',{}),
    localSessions:localGet('sessions',[]), localProgress:localGet('progress',{}),
    localAttempts:localGet('attempts',{}), localCards:localGet('cards',{}),
    tabFocused:true,
    lastActivity:Date.now(), activeSession:null,
    flashLang:params.get('idioma') || 'francais', flashShow:false, flashId:null, flashFilter:'due', reviewedNow:new Set(),
    statsLang:params.get('idioma') || 'all'
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
    const combined = [...state.sessions, ...state.localSessions];
    const items = [...new Map(combined.map(s=>[s.id,s])).values()];
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
  const currentLessonLink = () => link('francais/?lecon='+encodeURIComponent(state.lessonId));

  function header(){
    const account = state.user ? `<button class="btn btn-small" data-action="auth">${h(state.user.email.split('@')[0])} · ${t('Compte','Cuenta')}</button>` : `<button class="btn btn-small" data-action="auth">${t('Se connecter','Mi cuenta')}</button>`;
    const pathToCourse=page==='francais'?'#lecon':currentLessonLink()+'#lecon';
    return `<header class="topbar"><div class="shell"><a class="brand" href="${root}">Lingua <em>Viva</em></a><nav class="topnav">${isFrench?`<a href="${pathToCourse}">Le parcours</a><a href="${link('flashcards/?idioma=francais')}">Cartes mémoire</a><a href="${link('estadisticas/?idioma=francais')}">Mon temps</a><a href="${link('')}">Langues</a>`:`<a href="${link('')}">Mis idiomas</a><a href="${link('flashcards/')}">Flashcards</a><a href="${link('estadisticas/')}">Mis tiempos</a>`}</nav><div class="toptools"><a class="btn btn-small btn-plain" href="${root}">${t('Toutes les langues','Inicio')}</a>${account}</div></div></header>`;
  }
  function footer(){return `<footer class="shell footer"><span>Lingua Viva · ${t('Un espace pour apprendre les langues.','Un lugar para estudiar lenguas.')}</span><span>${t('Parcours original · Repères : Alter Ego+ 1','Material original · Referencia: Alter Ego+ 1')} · <a href="${link('')}">Accueil / Inicio</a></span></footer>`;}

  function renderHome(){
    document.title = 'Lingua Viva · Centro de idiomas';
    const secs=statsTime(), french=statsTime('francais');
    $app.innerHTML=header()+`<main>
      <section class="hero"><div class="shell hero-grid"><div><div class="eyebrow">Tu espacio de aprendizaje</div><h1>Las lenguas<br><em>se viven.</em></h1><p>Un lugar para estudiar a tu ritmo, volver sobre las palabras y seguir el recorrido que vas construyendo. Cada idioma tiene sus lecciones, ejercicios, audios, tarjetas de repaso y registro de estudio.</p><div class="hero-actions"><a class="btn btn-primary" href="${currentLessonLink()}">Continuar francés <span>↗</span></a><a class="btn" href="${link('flashcards/')}">Repasar vocabulario</a></div></div><div class="hero-aside"><div class="micro">Tu recorrido, hasta hoy</div><div class="rule"></div><div class="metricrow"><div><div class="metricnum">${completed()}<span style="font-size:15px;color:var(--muted)">/8</span></div><div class="metriclabel">Lecciones</div></div><div><div class="metricnum">${Math.floor(secs/60)}</div><div class="metriclabel">Minutos</div></div><div><div class="metricnum">${Object.values(state.cards).filter(c=>new Date(c.due_at)>new Date()).length}</div><div class="metriclabel">Tarjetas repasadas</div></div></div><div class="rule"></div><p>El contador se pone en marcha cuando estudiás dentro de una lección y se pausa si dejás de interactuar o cambiás de pestaña.</p></div></div></section>
      <section class="section shell" id="idiomas"><div class="section-head"><div><div class="eyebrow">Biblioteca de lenguas</div><h2>Mis idiomas</h2></div><p class="section-note">Un mismo espacio, recorridos independientes. El francés A1 es el primer curso activo.</p></div><div class="language-grid">${languages.map(l=>`<a class="lang-card ${l.live?'':'muted'}" href="${link(l.slug+'/')}"><div class="micro">${l.live?'En curso':'Próximamente'}</div><div class="char" aria-hidden="true">${l.letter}</div><h3>${l.name}</h3><p>${l.desc}</p><div class="bottom"><span>${l.live?`${completed()} de 8 lecciones · ${fmtShort(french)}`:'Crear recorrido'}</span><span class="arrow">↗</span></div></a>`).join('')}</div></section>
      <section class="section shell" id="actividad"><div class="section-head"><div><div class="eyebrow">Registro personal</div><h2>Mi actividad</h2></div><span class="section-note">${state.user?'Sincronizado con tu cuenta.':'Sin iniciar sesión: guardado en este navegador. Iniciá sesión para sincronizar.'}</span></div><div class="activity-block"><div class="panel"><div class="micro">Últimos siete días</div><h3>Tiempo de estudio</h3>${weekBars()}<p class="note">${fmt(secs)} acumulados · El registro contabiliza el tiempo activo dentro de las lecciones.</p><a class="btn btn-small" href="${link('estadisticas/')}">Ver 14 días y semanas ↗</a></div><div class="panel"><div class="micro">Revisión</div><h3>Vocabulario aprendido</h3><div class="metricrow"><div><div class="metricnum">${unlockedCards('francais').length}</div><div class="metriclabel">Disponibles</div></div><div><div class="metricnum">${countDue('francais')}</div><div class="metriclabel">Por repasar</div></div><div><div class="metricnum">${completed()}</div><div class="metriclabel">Lecciones hechas</div></div></div><p class="note" style="margin-top:22px">Las flashcards se incorporan a tu mazo según avanzás de unidad. Las que olvidás vuelven antes.</p><a class="btn btn-small" href="${link('flashcards/?idioma=francais')}">Abrir flashcards ↗</a></div></div></section>
    </main>`+footer();
  }
  function lessonNav(){return `<aside class="sidenav" aria-label="Progression"><div class="side-title">Dossier 0 · Découverte</div>${lessons.filter(x=>x.dossier===0).map((l,i)=>navButton(l,i)).join('')}<div class="side-divider"></div><div class="side-title">Dossier 1 · Les uns, les autres</div>${lessons.filter(x=>x.dossier===1).map((l,i)=>navButton(l,i+3)).join('')}<div class="side-divider"></div><a href="${link('flashcards/?idioma=francais')}" class="btn btn-small" style="width:100%">↗ Cartes mémoire</a><a href="${link('estadisticas/?idioma=francais')}" class="btn btn-small" style="width:100%;margin-top:8px">↗ Mon temps d’étude</a></aside>`;}
  function navButton(l,i){return `<button class="lesson-link ${l.id===state.lessonId?'active':''}" data-action="lesson" data-id="${l.id}"><span class="index">${String(i+1).padStart(2,'0')}</span><span>${h(l.title)}</span>${progressOf(l.id)?'<span class="done">✓</span>':''}</button>`;}
  function renderAlphabet(l){
    if(!l.alphabet)return '';
    return `<section class="content-section" id="alphabet"><div class="grammar-head"><h3>Les 26 lettres · de A à Z</h3><span class="chip">Alphabet complet</span></div><p>Chaque case indique <b>le nom de la lettre</b>, sa transcription phonétique (API) et <b>un son possible dans un mot</b>. Écoutez puis répétez : le nom d’une lettre n’est pas toujours le son qu’elle représente.</p>
      <div class="alphabet-grid">${l.alphabet.map(([letter,name,ipa,example,sound])=>`<div class="letter-tile"><div class="letter-top"><span class="letter-glyph">${h(letter)}</span><div class="letter-name"><strong>${h(name)}</strong><span>${h(ipa)}</span></div>${speechButton(name,'Écouter la lettre '+letter,'fr-FR','speech-compact')}</div><div class="letter-example"><span>Dans un mot</span><b>${h(example)}</b> <span class="letter-sound">${h(sound)}</span> ${speechButton(example,'Écouter : '+example,'fr-FR','speech-compact')}</div></div>`).join('')}</div>
      <div class="alphabet-notes"><h4>À ne pas confondre</h4><ul><li><b>Le nom et le son :</b> C se dit « cé », mais dans <i>café</i> on entend /k/ et dans <i>cinéma</i> /s/.</li><li><b>U /y/ et OU /u/ :</b> comparez <i>tu</i> et <i>vous</i>. Le son /y/ demande des lèvres arrondies.</li><li><b>Les accents :</b> é (<i>café</i>), è (<i>père</i>), ê (<i>fête</i>), ë (<i>Noël</i>), ç (<i>français</i>). Pour les épeler, dites « e accent aigu », « e accent grave », « e accent circonflexe », « e tréma », « c cédille ».</li><li><b>Lettres finales :</b> elles sont souvent muettes, mais pas toujours. On écrit <i>Paris</i> avec S, même si on ne le prononce pas.</li></ul></div>
      <div class="alphabet-practice"><h4>Mini-dictée · écouter et écrire</h4><p>Écoutez le mot sans regarder la réponse, puis écrivez-le. Vous pouvez écouter autant de fois que nécessaire. Le bouton utilise la voix française de votre appareil.</p>${l.dictation.map((word,j)=>`<div class="dictation-row"><span class="dictation-number">${String(j+1).padStart(2,'0')}</span>${speechButton(word,'Écouter le mot '+(j+1),'fr-FR')}<input type="text" id="dictation-${j}" data-dictation="${j}" value="${h(state.dictationDraft[l.id+'-'+j]||'')}" autocomplete="off" spellcheck="false" placeholder="Écrivez le mot…" aria-label="Dictée ${j+1}"/><button class="btn btn-small" data-action="check-dictation" data-index="${j}">Vérifier</button><span class="dictation-feedback" id="dictation-feedback-${j}" role="status"></span></div>`).join('')}</div>
    </section>`;
  }
  function renderReading(l){
    if(!l.reading)return '';
    const r=l.reading;
    const annotate=sentence=>sentence.split(/(\s+|[«».,!?;:–])/u).map(token=>{
      const key=token.toLocaleLowerCase('fr');
      if(!r.glossary[key])return h(token);
      return `<button type="button" class="reading-word" data-action="reading-word" data-word="${h(key)}" aria-label="Consulter : ${h(token)}" aria-expanded="false">${h(token)}</button>`;
    }).join('');
    return `<section class="content-section" id="lecture"><div class="grammar-head"><div><span class="micro">Lecture graduée · texte original</span><h3>${h(r.title)}</h3></div><button type="button" class="btn btn-small" data-action="reading-mode" aria-pressed="${state.readingParallel}">${state.readingParallel?'Français + español':'Français seul'}</button></div><p>Un court texte original, avec traduction facultative. Touchez un mot français pour voir sa fiche, sa fonction et son sens. La traduction peut être masquée à tout moment.</p>
      <div class="parallel-reading">${r.sentences.map((s,j)=>`<div class="reading-pair"><div class="reading-fr" lang="fr"><span class="micro">${String(j+1).padStart(2,'0')}</span><div class="reading-sentence">${annotate(s.fr)}</div>${speechButton(s.fr,'Écouter la phrase '+(j+1),'fr-FR','speech-compact')}</div><div class="reading-translation" lang="es" ${state.readingParallel?'':'hidden'}>${h(s.es)}</div></div>`).join('')}</div><p class="reading-hint">Objectif : relisez le texte sans la traduction, puis répondez oralement à la question : « Comment s’écrit le prénom de Léa ? »</p>
    </section>`;
  }
  function renderCourse(){
    const l = lessonById(state.lessonId); const i=lessons.indexOf(l); const percent=Math.round(completed()/lessons.length*100);
    document.title=l.title+' · Français A1 · Lingua Viva';
    $app.innerHTML=header()+`<main><div class="shell"><section class="course-head"><div><div class="eyebrow">Français · Niveau A1</div><h1>Apprendre le <em>français.</em></h1><p>Un parcours autonome, construit autour des dossiers d’<i>Alter Ego+ 1</i>. Dialogues originaux, pratique de l’écrit et de l’oral, écoute et révisions.</p></div><div class="course-stat"><div class="micro">Progression du parcours</div><div class="metricnum">${percent}%</div><div class="track"><span style="width:${percent}%"></span></div></div></section>
    <div class="course-layout">${lessonNav()}
      <article class="lesson-main" id="lecon"><div class="lesson-kicker"><span class="micro">Dossier ${l.dossier} · ${String(i+1).padStart(2,'0')} / 08</span><span class="micro">Repère manuel : p. ${l.pages}</span></div><h2>${h(l.title)}</h2><div class="subtitle">${h(l.subtitle)}</div><div class="goal"><b>À la fin de cette leçon</b>${h(l.goal)}</div>
        <section class="content-section"><h3>En situation</h3><div class="dialogue">${l.example.map(line=>`<div>${h(line)}</div>`).join('')}</div><p style="margin-top:12px;font-size:12px">Lisez le dialogue à voix haute. Rejouez-le ensuite sans regarder.</p></section>
        <section class="content-section" id="grammaire"><div class="grammar-head"><h3>${h(l.grammarTitle)}</h3><div class="switch" aria-label="Langue des explications grammaticales"><button data-action="grammar" data-lang="fr" class="${state.grammar==='fr'?'active':''}" aria-pressed="${state.grammar==='fr'}">FR</button><button data-action="grammar" data-lang="es" class="${state.grammar==='es'?'active':''}" aria-pressed="${state.grammar==='es'}">ES</button></div></div><div class="grammar-copy" lang="${state.grammar}">${l.grammar[state.grammar].split(/\n\n+/).map(x=>`<p>${h(x)}</p>`).join('')}<div class="speech-toolbar">${speechButton(l.grammar[state.grammar],state.grammar==='fr'?'Écouter l’explication':'Escuchar la explicación',state.grammar==='fr'?'fr-FR':'es-ES')}</div><div class="grammar-speech-examples" lang="fr"><span class="micro">Écouter les mots et les exemples</span><div class="speech-examples">${grammarExamples(l.grammar.fr).map(x=>speechButton(x,x,'fr-FR','speech-example')).join('')}</div></div></div></section>
        ${renderAlphabet(l)}
        ${renderReading(l)}
        <section class="content-section"><div class="grammar-head"><h3>Mots à retenir</h3><a class="btn btn-small btn-plain" href="${link('flashcards/?idioma=francais')}">Réviser ↗</a></div><p>Cliquez sur un mot pour afficher ou cacher son sens.</p><div class="vocab-grid">${l.words.map(([a,b],j)=>`<div class="vocab-item"><button class="vocab" data-action="reveal" data-word="${j}"><b>${h(a)}</b><span>${state.revealed.has(j)?h(b):'Voir le sens ↗'}</span></button>${speechButton(a,'Écouter : '+a,'fr-FR','speech-compact')}</div>`).join('')}</div></section>
        <section class="content-section" id="exercices"><h3>À vous de jouer</h3><p>Choisissez une réponse. Vous pouvez recommencer autant de fois que vous voulez.</p>${l.exercises.map((ex,j)=>renderExercise(ex,j,l.exercises.length)).join('')}</section>
        <section class="content-section" id="ecriture"><h3>Écriture</h3><p>${h(l.writing)}</p><textarea id="writingDraft" class="textarea" placeholder="Écrivez ici en français…" aria-label="Votre texte">${h(state.lessonDraft[l.id]||'')}</textarea><div class="writing-actions"><button class="btn btn-primary" data-action="save-writing">${state.user?'Enregistrer le texte':'Enregistrer dans ce navigateur'}</button><span class="count" id="wordCount"></span></div><p class="hint">${state.user?'Vos textes sont conservés dans votre compte. Une correction pourra ensuite être ajoutée à cet endroit.':'Connectez-vous pour retrouver vos textes et leurs corrections sur vos différents appareils.'}</p><div id="writingsList">${renderWritings()}</div></section>
        <section class="content-section" id="oral"><h3>Parler en français</h3><p>Ouvrez une conversation vocale avec ChatGPT. Copiez la consigne, collez-la dans la conversation et activez le mode vocal.</p><div class="writing-actions"><button class="btn btn-primary" data-action="voice">Copier la consigne et ouvrir ChatGPT ↗</button><button class="btn" data-action="copy-voice">Copier seulement</button></div></section>
        <section class="content-section" id="ressources"><h3>Écouter, regarder, découvrir</h3><p>Ressources complémentaires et enregistrements externes.</p><div class="resources">${C.resources.filter(r=>r.lesson==='all'||r.lesson===l.id).map(resourceHTML).join('')}</div></section>
        <section class="content-section"><h3>Mon carnet</h3><p>Notez une difficulté, une phrase utile ou une question pour la prochaine séance.</p><textarea id="notesInput" class="textarea" style="min-height:90px" placeholder="Mes notes personnelles…">${h(state.notes[l.id]??localGet('notes',{})[l.id]??'')}</textarea><div class="writing-actions"><button class="btn" data-action="save-note">Sauvegarder les notes</button><span class="hint">Également accessible depuis votre compte.</span></div></section>
        <div class="lesson-nav"><button class="btn" data-action="lesson" data-id="${lessons[Math.max(i-1,0)].id}" ${i===0?'disabled':''}>← Leçon précédente</button><button class="btn btn-primary" data-action="complete">${progressOf(l.id)?'✓ Leçon terminée':'Marquer comme terminée'}</button><button class="btn" data-action="lesson" data-id="${lessons[Math.min(i+1,lessons.length-1)].id}" ${i===lessons.length-1?'disabled':''}>Suivante →</button></div>
      </article>
      <aside class="sidebar-right"><div class="mini-panel"><div class="micro">Temps d’étude actif</div><div class="bigtime" id="liveTime">00:00</div><div class="timer-state" id="timerState">● Suivi automatique</div><p>Le chronomètre s’arrête quand vous quittez l’onglet ou après 90 s sans activité.</p><button class="btn btn-small" data-action="timer-toggle" id="timerButton">Faire une pause</button></div><div class="mini-panel"><div class="micro">Votre parcours</div><div class="bigtime" id="courseTime">${fmt(statsTime('francais'))}</div><div class="micro">Total cumulé</div><div class="track"><span style="width:${percent}%"></span></div><p>${completed()} leçons terminées sur 8</p><a href="${link('estadisticas/?idioma=francais')}" class="btn btn-small">Voir mes temps ↗</a></div></aside>
    </div></div></main>`+footer();
    renderTimerUI(); renderWordCount();
  }
  function renderExercise(ex,j,total){
    const attempt=state.attempts[ex.id]??state.localAttempts[ex.id];
    return `<div class="exercise"><div class="qnum">QUESTION ${j+1} / ${total}</div><p>${h(ex.q)}</p><div class="options">${ex.opts.map((op,k)=>`<button data-action="answer" data-ex="${ex.id}" data-choice="${k}" class="option ${attempt?.selected_answer===k?'selected '+(attempt.correct?'correct':'incorrect'):''}">${h(op)}</button>`).join('')}</div>${attempt?`<p class="feedback ${attempt.correct?'':'error'}">${attempt.correct?'✓ Bonne réponse.':'Essayez encore.'} ${h(ex.why)}</p>`:''}</div>`;
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
      ${current?`<div class="flash-study"><div class="micro">${french?'Cliquez pour retourner la carte':'Tocá la tarjeta para darla vuelta'}</div><button class="flash-card ${state.flashShow?'flipped':''}" data-action="flip" aria-label="${french?'Retourner la carte':'Girar tarjeta'}"><span class="flash-card-flag">${h(lang.native)} · ${h(current.lesson_id.replace('d','Dossier ').replace('-',' / '))}</span><span class="flash-card-front">${h(state.flashShow?current.back:current.front)}</span><span class="flash-card-hint">${state.flashShow?(french?'Sens / explication':'Significado / explicación'):(french?'Voir le sens ↗':'Ver respuesta ↗')}</span></button><div class="flash-speech">${speechButton(current.front,french?'Écouter le mot':'Escuchar la palabra','fr-FR')}</div>${state.flashShow?`<div class="flash-review-actions"><button class="btn" data-action="flash-review" data-quality="again">↶ ${french?'À revoir':'Otra vez'}</button><button class="btn btn-primary" data-action="flash-review" data-quality="good">✓ ${french?'Je connais':'La recordé'}</button></div>`:`<p class="hint" style="text-align:center">${french?'Pensez à la signification avant de retourner la carte.':'Intentá recordar la respuesta antes de darla vuelta.'}</p>`}</div>`:`<div class="empty" style="padding:45px;margin-top:26px">${cards.length?(french?'Bravo ! Aucune carte à réviser pour le moment.':'¡Muy bien! No tenés tarjetas pendientes por ahora.'):(french?'Les cartes apparaîtront après les premières leçons.':'Las tarjetas aparecerán cuando empieces las lecciones de este idioma.')} ${french?'<a href="'+link('francais/')+'">Continuer le cours ↗</a>':''}</div>`}
      <div class="flash-help"><div><div class="micro">${french?'Votre progression':'Tu progreso'}</div><h3>${cards.length} ${french?'cartes disponibles':'tarjetas disponibles'}</h3><p>${due.length} ${french?'à réviser maintenant':'para repasar ahora'}. ${french?'Le parcours débloque progressivement votre vocabulaire.':'A medida que avancés, se desbloquea más vocabulario.'}</p></div><div><div class="micro">${french?'Répétition espacée':'Repaso espaciado'}</div><h3>${french?'Réviser au bon moment':'Repasar a tiempo'}</h3><p>${french?'Après une bonne réponse, la prochaine révision est programmée plus tard. Une erreur replace la carte dans les prochaines révisions.':'Si recordás la tarjeta, el próximo repaso se aleja. Si te cuesta, vuelve a aparecer pronto.'}</p></div></div>
    </section></main>`+footer();
  }

  function studyDays(count, end = new Date()){
    return Array.from({length:count},(_,i)=>{const d=new Date(end);d.setHours(12,0,0,0);d.setDate(d.getDate()-(count-1-i));return d;});
  }
  function studyBreakdown(entries, periodStart, periodEnd){
    const within=entries.filter(s=>{const d=new Date(s.started_at);return d>=periodStart && d<periodEnd;});
    return {seconds:totalSeconds(within), days:new Set(within.filter(s=>s.duration_seconds>0).map(s=>dayKey(s.started_at))).size, sessions:within.length};
  }
  const formatDate = (d,options)=>new Date(d).toLocaleDateString(isFrench?'fr-FR':'es-AR',options);
  const humanMinutes = sec => Math.round(sec/60)+' '+t('min','min');
  const languageName = slug => languages.find(l=>l.slug===slug)?.name || slug;
  function renderStats(){
    const entries=allSessions().filter(s=>s.duration_seconds>0 && (state.statsLang==='all'||s.language===state.statsLang));
    const days=studyDays(14);
    const perDay=days.map(d=>studyBreakdown(entries,new Date(d.getFullYear(),d.getMonth(),d.getDate()),new Date(d.getFullYear(),d.getMonth(),d.getDate()+1)));
    const total14=perDay.reduce((acc,d)=>acc+d.seconds,0);
    const maxDay=Math.max(900,...perDay.map(x=>x.seconds));
    const activeDays=perDay.filter(x=>x.seconds>0).length;
    const today=new Date();
    const monday=new Date(today.getFullYear(),today.getMonth(),today.getDate());monday.setDate(monday.getDate()-(monday.getDay()+6)%7);
    const weeks=Array.from({length:10},(_,i)=>{
      const start=new Date(monday);start.setDate(monday.getDate()-(9-i)*7);
      const end=new Date(start);end.setDate(start.getDate()+7);
      return {start,end,...studyBreakdown(entries,start,end)};
    }).reverse();
    const maxWeek=Math.max(3600,...weeks.map(w=>w.seconds));
    const total=totalSeconds(entries);
    const sessionCount=entries.length;
    const byLanguage=languages.map(l=>({language:l,seconds:totalSeconds(allSessions().filter(s=>s.language===l.slug))})).filter(x=>x.seconds>0);
    const maxLanguage=Math.max(60,...byLanguage.map(x=>x.seconds));
    const lastSessions=[...entries].sort((a,b)=>new Date(b.started_at)-new Date(a.started_at)).slice(0,15);
    document.title=t('Mon temps d’étude','Mis tiempos')+' · Lingua Viva';
    $app.innerHTML=header()+`<main class="shell"><section class="statistics-page">
      <div class="eyebrow">${t('Journal d’apprentissage','Registro de aprendizaje')}</div>
      <div class="stats-head"><div><h1>${t('Mon temps <em>d’étude.</em>','Mis tiempos <em>de estudio.</em>')}</h1><p>${t('Un aperçu de votre pratique, jour après jour et semaine après semaine.','Un registro de tu práctica, día por día y semana por semana.')}</p></div><label class="stats-filter">${t('Afficher','Mostrar')}<select id="statsLanguage"><option value="all" ${state.statsLang==='all'?'selected':''}>${t('Toutes les langues','Todos los idiomas')}</option>${languages.map(l=>`<option value="${l.slug}" ${l.slug===state.statsLang?'selected':''}>${h(l.name)}</option>`).join('')}</select></label></div>
      <div class="stats-numbers"><div class="stats-number"><span class="micro">${t('Temps total','Tiempo total')}</span><strong>${fmt(total)}</strong><span class="hint">${t('Toutes les sessions enregistrées','Todas las sesiones registradas')}</span></div><div class="stats-number"><span class="micro">${t('Ces 14 derniers jours','Últimos 14 días')}</span><strong>${fmt(total14)}</strong><span class="hint">${t('Temps d’étude actif','Tiempo de estudio activo')}</span></div><div class="stats-number"><span class="micro">${t('Jours actifs','Días con actividad')}</span><strong>${activeDays}<small>/14</small></strong><span class="hint">${t('Avec au moins une session','Con alguna sesión de estudio')}</span></div><div class="stats-number"><span class="micro">${t('Sessions','Sesiones')}</span><strong>${sessionCount}</strong><span class="hint">${t('Enregistrées dans le journal','Registradas en el historial')}</span></div></div>
      <section class="stats-panel" id="quatorze"><div class="stats-panel-heading"><div><div class="micro">01 / ${t('Derniers jours','Últimos días')}</div><h2>${t('Les 14 derniers jours','Los últimos 14 días')}</h2></div><span class="micro">${formatDate(days[0],{day:'numeric',month:'short'})} – ${formatDate(days[13],{day:'numeric',month:'short'})}</span></div>
      <div class="days-14" role="img" aria-label="${t('Temps quotidien sur 14 jours','Tiempo diario durante los últimos 14 días')}">${days.map((d,i)=>`<div class="day14" title="${formatDate(d,{weekday:'long',day:'numeric',month:'long'})} · ${humanMinutes(perDay[i].seconds)}"><span class="day14-value">${perDay[i].seconds?humanMinutes(perDay[i].seconds):''}</span><div class="day14-barwrap"><span class="day14-bar" style="height:${perDay[i].seconds?Math.max(4,perDay[i].seconds/maxDay*100):2}%;opacity:${perDay[i].seconds?1:.25}"></span></div><span class="day14-label">${formatDate(d,{day:'numeric',month:'numeric'})}</span></div>`).join('')}</div>
      <details class="day-details"><summary>${t('Détail jour par jour','Ver detalle día por día')}</summary><div class="day-detail-grid">${days.map((d,i)=>`<div><span>${formatDate(d,{weekday:'short',day:'numeric',month:'short'})}</span><b>${humanMinutes(perDay[i].seconds)}</b></div>`).join('')}</div></details></section>
      <section class="stats-panel" id="semaines"><div class="stats-panel-heading"><div><div class="micro">02 / ${t('Historique hebdomadaire','Historial semanal')}</div><h2>${t('Semaine après semaine','Semana por semana')}</h2></div><span class="micro">${t('10 semaines · lundi–dimanche','10 semanas · lunes–domingo')}</span></div>
      <div class="weekly-list">${weeks.map((w,i)=>`<div class="weekly-row"><div class="weekly-when"><b>${i===0?t('Cette semaine','Esta semana'):formatDate(w.start,{day:'numeric',month:'short'})+' – '+formatDate(new Date(w.end.getTime()-86400000),{day:'numeric',month:'short'})}</b><span>${w.days} ${t('jours actifs','días activos')}</span></div><div class="weekly-bar"><span style="width:${w.seconds?Math.max(1.8,w.seconds/maxWeek*100):0}%"></span></div><strong>${fmt(w.seconds)}</strong></div>`).join('')}</div></section>
      <div class="stats-bottom"><section class="stats-panel"><div class="micro">03 / ${t('Langues','Idiomas')}</div><h2>${t('Répartition par langue','Distribución por idioma')}</h2>${byLanguage.length?`<div class="language-times">${byLanguage.map(x=>`<div class="language-time"><div class="language-time-head"><span>${h(x.language.name)}</span><strong>${fmt(x.seconds)}</strong></div><div class="language-time-bar"><span class="color-${x.language.slug}" style="width:${Math.max(2,x.seconds/maxLanguage*100)}%"></span></div></div>`).join('')}</div>`:`<p class="note">${t('Les langues apparaîtront dès votre première session.','Los idiomas aparecerán cuando registres tus primeras sesiones.')}</p>`}</section>
      <section class="stats-panel"><div class="micro">04 / ${t('Dernières sessions','Últimas sesiones')}</div><h2>${t('Votre journal','Tu registro')}</h2>${lastSessions.length?`<div class="sessions-list">${lastSessions.map(s=>`<div class="session-item"><div><b>${h(languageName(s.language))}</b><span>${h(lessonById(s.lesson_id).title)} · ${formatDate(s.started_at,{day:'numeric',month:'short'})}</span></div><strong>${humanMinutes(s.duration_seconds)}</strong></div>`).join('')}</div>`:`<p class="note">${t('Aucune session pour le moment.','Todavía no hay sesiones registradas.')}</p>`}</section></div>
      <p class="stats-footnote">${t('Le temps est comptabilisé automatiquement quand la leçon est active. Les périodes sans activité et les onglets masqués ne sont pas comptés. Une session est attribuée au jour où elle a commencé.','El tiempo se registra automáticamente mientras la lección está activa. No se cuentan las pestañas ocultas ni los períodos sin interacción. Cada sesión se atribuye al día en que comenzó.')}</p>
      <a class="btn" href="${currentLessonLink()}">${t('← Retour au français','← Volver al francés')}</a>
    </section></main>`+footer();
  }

  function render(){
    if (page==='home')renderHome();else if(page==='francais')renderCourse();else if(page==='flashcards')renderFlashcards();else if(page==='estadisticas')renderStats();else renderComing();
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
    const names=['lingua_study_sessions','lingua_lesson_progress','lingua_exercise_attempts','lingua_writings','lingua_notes','lingua_flashcard_reviews','lingua_user_state'];
    const result=await Promise.all(names.map(table=>state.client.from(table).select('*').eq('user_id',state.user.id).limit(3000)));
    if(result.some(r=>r.error))console.warn('Lingua Viva: parte de los datos no se pudo cargar',result.filter(r=>r.error).map(r=>r.error.message));
    const data=result.map(r=>r.data||[]);
    state.sessions=data[0];state.progress=Object.fromEntries(data[1].map(r=>[r.lesson_id,r.completed]));state.attempts=Object.fromEntries(data[2].map(r=>[r.exercise_id,r]));state.writings=data[3];state.notes=Object.fromEntries(data[4].map(r=>[r.lesson_id,r.body]));state.cards=Object.fromEntries(data[5].map(r=>[r.language+':'+r.card_id,r]));
    const remoteBookmark=data[6][0];
    const localDate=new Date(state.lastLessonSavedAt||0).getTime();
    const remoteDate=new Date(remoteBookmark?.last_opened_at||0).getTime();
    if(!params.has('lecon') && remoteBookmark && remoteDate >= localDate && lessons.some(l=>l.id===remoteBookmark.current_lesson_id)){
      if(state.lessonId!==remoteBookmark.current_lesson_id){
        await flushSession();state.lessonId=remoteBookmark.current_lesson_id;
        if(page==='francais')startSession();
      }
      state.lastLessonSavedAt=remoteBookmark.last_opened_at;
      localPut('lastLesson',state.lessonId);localPut('lastLessonSavedAt',state.lastLessonSavedAt);
    }else if((!remoteBookmark || localDate>remoteDate || params.has('lecon')) && page==='francais'){
      await saveCurrentLesson(state.lessonId,params.has('lecon')?new Date().toISOString():state.lastLessonSavedAt||new Date().toISOString());
    }
    // Anonymous data are migrated using the same UUIDs, so a retry is safe.
    await migrateLocal();
    render();
  }
  let bookmarkQueue=Promise.resolve();
  function saveCurrentLesson(id,at=new Date().toISOString()){
    if(!lessons.some(l=>l.id===id))return Promise.resolve();
    state.lastLessonSavedAt=at;
    localPut('lastLesson',id);localPut('lastLessonSavedAt',at);
    if(!state.user||!state.client)return Promise.resolve();
    const userId=state.user.id;
    bookmarkQueue=bookmarkQueue.catch(()=>{}).then(async()=>{
      const {error}=await state.client.from('lingua_user_state').upsert({user_id:userId,current_lesson_id:id,last_opened_at:at},{onConflict:'user_id'});
      if(error)console.warn('Lingua Viva: signet de leçon non synchronisé',error.message);
    });
    return bookmarkQueue;
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
    window.speechSynthesis?.cancel();flushSession();state.lessonId=id;saveCurrentLesson(id);state.revealed.clear();
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
  function closeReadingPopover(){document.querySelector('.reading-popover')?.remove();document.querySelectorAll('.reading-word[aria-expanded="true"]').forEach(x=>x.setAttribute('aria-expanded','false'));}
  function showReadingPopover(button){
    const word=button.dataset.word, entry=lessonById(state.lessonId).reading?.glossary[word];
    const opened=button.getAttribute('aria-expanded')==='true';
    closeReadingPopover();if(opened||!entry)return;
    button.setAttribute('aria-expanded','true');
    const popup=document.createElement('div');popup.className='reading-popover';popup.setAttribute('role','status');
    popup.innerHTML=`<div class="micro">Fiche de vocabulaire</div><strong>${h(button.textContent)}</strong><span>${h(entry[0])}</span><small>${h(entry[1])}</small>${speechButton(button.textContent,'Écouter le mot '+button.textContent,'fr-FR','speech-compact')}`;
    document.body.append(popup);
    const rect=button.getBoundingClientRect(),w=popup.getBoundingClientRect().width,ph=popup.getBoundingClientRect().height;
    popup.style.left=Math.min(Math.max(12,rect.left),Math.max(12,window.innerWidth-w-12))+'px';
    popup.style.top=(rect.bottom+10+ph>window.innerHeight?Math.max(12,rect.top-ph-10):rect.bottom+10)+'px';
  }

  document.addEventListener('click',async e=>{
    const b=e.target.closest('[data-action]');if(!b){closeReadingPopover();return;}
    const a=b.dataset.action;markActive();
    if(a==='reading-word'){showReadingPopover(b);return;}
    if(a!=='speak')closeReadingPopover();
    if(a==='reading-mode'){
      state.readingParallel=!state.readingParallel;localPut('readingParallel',state.readingParallel);
      document.querySelectorAll('.reading-translation').forEach(node=>{node.hidden=!state.readingParallel;});
      b.textContent=state.readingParallel?'Français + español':'Français seul';b.setAttribute('aria-pressed',String(state.readingParallel));return;
    }
    if(a==='check-dictation'){
      const j=Number(b.dataset.index),input=document.getElementById('dictation-'+j),out=document.getElementById('dictation-feedback-'+j);
      const expected=lessonById(state.lessonId).dictation?.[j];if(!input||!out||!expected)return;
      const answer=input.value.trim().toLocaleLowerCase('fr');
      const correct=answer===expected.toLocaleLowerCase('fr');
      out.textContent=!answer?'Écrivez une réponse.':correct?'✓ Très bien !':'À revoir. Réponse : '+expected;
      out.classList.toggle('error',!correct);return;
    }
    if(a==='auth'){state.authModal=true;state.authMessage='';render();return;}
    if(a==='close-auth'){state.authModal=false;document.querySelector('.modal-backdrop')?.remove();return;}
    if(a==='auth-mode'){state.authMode=b.dataset.mode;state.authMessage='';showModal();return;}
    if(a==='signout'){await state.client?.auth.signOut();state.authModal=false;document.querySelector('.modal-backdrop')?.remove();return;}
    if(a==='speak'){speakText(b.dataset.speechText,b.dataset.speechLang);return;}
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
  document.addEventListener('input',e=>{
    if(e.target.id==='writingDraft'){state.lessonDraft[state.lessonId]=e.target.value;localPut('drafts',state.lessonDraft);renderWordCount();}
    if(e.target.dataset?.dictation!==undefined){state.dictationDraft[state.lessonId+'-'+e.target.dataset.dictation]=e.target.value;localPut('dictationDraft',state.dictationDraft);}
  });
  document.addEventListener('change',e=>{
    if(e.target.id==='flashLanguage'){state.flashLang=e.target.value;isFrench=state.flashLang==='francais';state.flashShow=false;state.flashId=null;state.reviewedNow.clear();history.replaceState(null,'','?idioma='+encodeURIComponent(state.flashLang));render();}
    if(e.target.id==='statsLanguage'){state.statsLang=e.target.value;isFrench=state.statsLang==='francais';history.replaceState(null,'',state.statsLang==='all'?location.pathname:'?idioma='+encodeURIComponent(state.statsLang));render();}
  });
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
    if(page==='francais' && params.has('lecon'))saveCurrentLesson(state.lessonId);
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
