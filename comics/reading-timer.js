/* Lengua Viva · tiempo activo de lectura de historietas.
   Compatible con lingua_study_sessions y las estadísticas generales de francés.
   Registro local de recuperación independiente, con sincronización al iniciar sesión. */
(() => {
  'use strict';
  const workspace = document.getElementById('workspace');
  const status = document.getElementById('status');
  const comic = document.body.dataset.comic;
  const books = {
    'asterix-cleopatre': { lesson: 'comics-asterix-cleopatre', title: 'Astérix et Cléopâtre' },
    'tintin-ile-noire': { lesson: 'comics-tintin-ile-noire', title: 'Tintin · L’Île Noire' }
  };
  const book = books[comic];
  if (!workspace || !status || !book) return;

  const STORAGE = 'lv:comicSessions';
  const IDLE_MS = 90000;
  const SUPABASE_URL = 'https://nzjdlqanbclsfwwstkwi.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_be96IsfN-3skQErkZtOtQQ_pK0OT1Y9';
  const client = window.supabase?.createClient?.(SUPABASE_URL, SUPABASE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
  }) || null;

  const localRead = () => {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE) || '[]');
      return Array.isArray(value) ? value.filter(s => s && typeof s.id === 'string' && s.language === 'francais' && Number(s.duration_seconds) > 0) : [];
    } catch (_) { return []; }
  };
  const merge = (rows) => {
    const map = new Map();
    rows.forEach(s => {
      if (!s?.id) return;
      const previous = map.get(s.id);
      if (!previous || Number(s.duration_seconds) > Number(previous.duration_seconds)) map.set(s.id, s);
    });
    return [...map.values()];
  };
  const save = () => {
    if (session.duration_seconds <= 0) return;
    try {
      const all = merge([...localRead(), {...session}]);
      localStorage.setItem(STORAGE, JSON.stringify(all));
    } catch (error) { console.warn('No se pudo conservar el tiempo de lectura', error); }
  };
  const uuid = () => crypto.randomUUID ? crypto.randomUUID() : Date.now() + '-' + Math.random().toString(36).slice(2);
  const newSession = () => ({
    id: uuid(), language: 'francais', lesson_id: book.lesson,
    duration_seconds: 0, started_at: new Date().toISOString()
  });
  const localDay = () => new Date().toLocaleDateString('en-CA');
  let startedDay = localDay();
  let session = newSession();
  let user = null, focused = document.hasFocus ? document.hasFocus() : true;
  let lastActivity = Date.now(), lastTick = Date.now();
  let paused = false, syncing = false;
  let remote = new Map();

  const bar = document.createElement('section');
  bar.className = 'comic-reading-timer hidden';
  bar.setAttribute('aria-label','Tiempo de lectura de este cómic');
  bar.innerHTML =
    '<span class="crt-label">LECTURA · FRANCÉS</span>' +
    '<span class="crt-status" id="crt-state">◌ En pausa</span>' +
    '<strong class="crt-clock" id="crt-clock">00:00</strong>' +
    '<span class="crt-total">Acumulado: <strong id="crt-total-value">0 min</strong></span>' +
    '<button type="button" id="crt-pause" aria-pressed="false">Pausar</button>' +
    '<a href="../../estadisticas/?idioma=francais" id="crt-stats">Mis tiempos ↗</a>';
  // Desde Astérix la ruta de estadísticas asciende dos niveles; desde Tintín también.
  status.parentNode.insertBefore(bar, workspace);
  const css = document.createElement('style');
  css.textContent =
    '.comic-reading-timer{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:14px 0;padding:11px 15px;border:1px solid #d4d9d5;border-radius:9px;background:#fff;font-size:.88rem;color:#526269}' +
    '.comic-reading-timer.hidden{display:none}' +
    '.crt-label{font-size:.66rem;font-weight:700;letter-spacing:.12em;color:#58717a}' +
    '.crt-status{font-size:.82rem;color:#44745c}.crt-status.paused{color:#7f7e72}' +
    '.crt-clock{font-variant-numeric:tabular-nums;font-size:1.12rem;color:#293b42}' +
    '.crt-total{margin-left:auto}.comic-reading-timer button{padding:5px 10px}' +
    '.comic-reading-timer a{font-weight:600;text-decoration:none;color:#315e6b}' +
    '.comic-reading-timer a:hover{text-decoration:underline}' +
    '@media(max-width:600px){.crt-total{margin-left:0}.comic-reading-timer{gap:9px}}';
  document.head.append(css);

  const clock = seconds => {
    seconds = Math.floor(Math.max(0, Number(seconds) || 0));
    return String(Math.floor(seconds / 60)).padStart(2,'0') + ':' + String(seconds % 60).padStart(2,'0');
  };
  const duration = seconds => {
    const n = Math.floor(seconds / 60);
    return n >= 60 ? Math.floor(n/60) + ' h ' + String(n%60).padStart(2,'0') + ' min' : n + ' min';
  };
  const visible = () => !workspace.classList.contains('hidden') && workspace.getClientRects().length > 0;
  const running = () => visible() && !document.hidden && focused && !paused && Date.now() - lastActivity < IDLE_MS;
  const total = () => merge([...remote.values(), ...localRead(), ...(session.duration_seconds ? [session] : [])])
    .filter(s => s.lesson_id === book.lesson).reduce((sum,s) => sum + Number(s.duration_seconds || 0),0);

  function update() {
    bar.classList.toggle('hidden', !visible());
    const active = running();
    const statusText = !visible() ? '◌ Abrí el PDF' : active ? '● Leyendo' : paused ? '◌ Pausa manual' : '◌ Pausa automática';
    const state = document.getElementById('crt-state');
    state.textContent = statusText;
    state.classList.toggle('paused', !active);
    document.getElementById('crt-clock').textContent = clock(session.duration_seconds);
    document.getElementById('crt-total-value').textContent = duration(total());
    const button = document.getElementById('crt-pause');
    button.textContent = paused ? 'Reanudar' : 'Pausar';
    button.setAttribute('aria-pressed',String(paused));
  }

  function markActivity() { lastActivity = Date.now(); update(); }
  function rotate() {
    save();
    sync();
    session = newSession();
    startedDay = localDay();
    lastTick = Date.now();
  }
  async function loadRemote() {
    if (!user || !client) { remote.clear(); update(); return; }
    const activeId = user.id;
    try {
      const result = await client.from('lingua_study_sessions')
        .select('id,language,lesson_id,duration_seconds,started_at')
        .eq('user_id', activeId).eq('language','francais').eq('lesson_id',book.lesson).limit(3000);
      if (result.error) throw result.error;
      if (user?.id !== activeId) return;
      remote = new Map((result.data || []).map(s => [s.id,s]));
      update();
      sync();
    } catch (error) { console.warn('No se pudo cargar el tiempo del cómic',error); }
  }
  async function sync() {
    save();
    if (!user || !client || syncing) return;
    syncing = true;
    try {
      const accountId = user.id;
      const rows = localRead().filter(s => Number(s.duration_seconds) > 0);
      // La misma clave local también contiene sesiones del otro cómic.
      // Sincronizarlas juntas impide que una pestaña borre registros pendientes de la otra.
      for (const row of rows) {
        if (user?.id !== accountId) break;
        const previous = remote.get(row.id);
        if (previous && Number(previous.duration_seconds) >= Number(row.duration_seconds)) continue;
        const result = await client.from('lingua_study_sessions').upsert(
          {...row, user_id:accountId,updated_at:new Date().toISOString()}, {onConflict:'id'});
        if (result.error) throw result.error;
        remote.set(row.id, {...row});
      }
      if (user?.id === accountId) {
        const safe = localRead().filter(row => {
          const prior = remote.get(row.id);
          return !prior || Number(row.duration_seconds) > Number(prior.duration_seconds);
        });
        localStorage.setItem(STORAGE,JSON.stringify(safe));
      }
    } catch (error) { console.warn('Tiempo de lectura pendiente de sincronización',error); }
    finally { syncing = false; update(); }
  }
  async function loadAuth() {
    if (!client) return;
    try {
      const {data,error} = await client.auth.getSession();
      if (error) throw error;
      const next = data?.session?.user || null;
      if (next?.id !== user?.id) {
        user = next;
        remote.clear();
        await loadRemote();
      }
    } catch (error) { console.warn('No se pudo verificar la cuenta para el contador', error); }
  }
  if (client) {
    loadAuth();
    client.auth.onAuthStateChange(() => { setTimeout(loadAuth,0); });
  }
  document.getElementById('crt-pause').addEventListener('click', () => {
    paused = !paused;
    if (paused) { save(); sync(); } else markActivity();
    update();
  });
  for (const event of ['pointerdown','keydown','scroll','touchstart','wheel'])
    window.addEventListener(event,markActivity,{passive:true,capture:event==='scroll'});
  window.addEventListener('focus',() => {focused=true;lastTick=Date.now();markActivity();});
  window.addEventListener('blur',() => {focused=false;lastTick=Date.now();save();sync();update();});
  document.addEventListener('visibilitychange',() => {
    lastTick=Date.now();
    if (document.hidden) {save();sync();} else markActivity();
    update();
  });
  window.addEventListener('pagehide',() => {save();sync();});
  new MutationObserver(update).observe(workspace,{attributes:true,attributeFilter:['class']});
  setInterval(() => {
    const now = Date.now();
    const elapsed = Math.min(2,Math.max(0,Math.round((now-lastTick)/1000)));
    lastTick = now;
    if (localDay() !== startedDay || session.duration_seconds >= 21600) rotate();
    if (running() && elapsed > 0) {
      session.duration_seconds += elapsed;
      if (session.duration_seconds % 5 < elapsed) save();
      if (session.duration_seconds % 30 < elapsed) sync();
    }
    update();
  },1000);
  update();
})();