const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { randomUUID } = require('node:crypto');

const root = path.resolve(__dirname, '..');
const course = fs.readFileSync(path.join(root, 'content.js'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

function mount(page, query = '', cloudBookmark = null) {
  const element = { innerHTML: '' };
  const events = {};
  const storage = {};
  const location = { search: query, pathname: '/lingua-viva/'+(page==='home'?'':page+'/'), origin: 'https://ignacioaragues.github.io', href: 'https://ignacioaragues.github.io/lingua-viva/' };
  const document = {
    body: { dataset: { page, root: page === 'home' ? './' : '../' } },
    querySelector: selector => selector === '#app' ? element : null,
    addEventListener: (name, fn) => { events[name] = fn; },
    hidden: false
  };
  const spoken = [];
  const window = {
    addEventListener() {}, LINGUA: null, scrollTo() {},
    SpeechSynthesisUtterance: class { constructor(text){ this.text=text; } },
    speechSynthesis: {
      cancel() {}, getVoices: () => [{ lang:'fr-FR' },{ lang:'es-ES' }],
      speak: utterance => spoken.push({ text:utterance.text, lang:utterance.lang, rate:utterance.rate, voice:utterance.voice?.lang })
    }
  };
  if (cloudBookmark) {
    window.supabase = { createClient: () => ({
      auth: { getSession: async () => ({ data:{ session:{ user:{id:'test-user',email:'test@example.com'} } } }), onAuthStateChange() {} },
      from: table => ({
        select: () => ({eq: () => ({limit: async () => ({data:table==='lingua_user_state'?[{current_lesson_id:cloudBookmark,last_opened_at:'2026-11-10T05:00:00Z'}]:[],error:null})})}),
        upsert: async () => ({error:null})
      })
    }) };
  }
  const context = {
    window, document, location, history: { replaceState() {} }, navigator: {},
    URLSearchParams, URL, Date, Math, Object, String, Number,
    crypto: { randomUUID }, setInterval() {}, setTimeout() {}, console,
    localStorage: {
      getItem: k => storage[k] ?? null,
      setItem: (k,v) => { storage[k] = v; }
    }
  };
  vm.runInNewContext(course, context, { filename: 'content.js' });
  vm.runInNewContext(app, context, { filename: 'app.js' });
  return { get html() { return element.innerHTML; }, events, spoken };
}

(async () => {
  const home = mount('home');
  assert.match(home.html, /Las lenguas/);
  assert.match(home.html, /Mis idiomas/);
  assert.match(home.html, /Flashcards/);
  const french = mount('francais');
  assert.match(french.html, /Apprendre le/);
  assert.match(french.html, /href="#lecon">Le parcours/);
  assert.match(french.html, /Mon temps d’étude/);
  assert.match(french.html, /Langue des explications grammaticales/);
  assert.match(french.html, /Voir le sens/);
  assert.match(french.html, /data-action="speak" data-speech-text="Bonjour"/);
  assert.match(french.html, /Écouter l.explication/);
  await french.events.click({target:{closest:()=>({dataset:{action:'speak',speechText:'Bonjour',speechLang:'fr-FR'}})}});
  assert.deepEqual(french.spoken[0],{text:'Bonjour',lang:'fr-FR',rate:0.9,voice:'fr-FR'});
  await french.events.click({ target: { closest: () => ({ dataset: { action:'lesson', id:'d1-contacts' } }) } });
  assert.match(french.html, /Contacts/);
  assert.match(french.html, /class="lesson-link active" data-action="lesson" data-id="d1-contacts"/);
  await french.events.click({ target: { closest: () => ({ dataset: { action:'grammar', lang:'es' } }) } });
  assert.match(french.html, /Para presentarte usás verbos distintos/);
  assert.match(french.html, /lang="es"/);
  assert.match(french.html, /Escuchar la explicación/);
  await french.events.click({target:{closest:()=>({dataset:{action:'speak',speechText:'Para presentarte',speechLang:'es-ES'}})}});
  assert.equal(french.spoken[1].lang,'es-ES');
  const cards = mount('flashcards', '?idioma=francais');
  assert.match(cards.html, /Cartes mémoire/);
  assert.match(cards.html, /Bonjour/);
  assert.match(cards.html,/Écouter le mot/);
  await cards.events.click({target:{closest:()=>({dataset:{action:'speak',speechText:'Bonjour',speechLang:'fr-FR'}})}});
  assert.equal(cards.spoken[0].text,'Bonjour');
  await cards.events.click({ target: { closest: () => ({ dataset: { action:'flip' } }) } });
  assert.match(cards.html, /salutation de la journée/);
  const greek = mount('grec');
  assert.match(greek.html, /Griego antiguo/);
  assert.match(greek.html, /Mis flashcards/);
  const stats = mount('estadisticas');
  assert.match(stats.html, /Los últimos 14 días/);
  assert.match(stats.html, /Semana por semana/);
  assert.match(stats.html, /Distribución por idioma/);
  assert.equal((stats.html.match(/class="day14"/g)||[]).length,14);
  assert.equal((stats.html.match(/class="weekly-row"/g)||[]).length,10);
  const statsFr = mount('estadisticas','?idioma=francais');
  assert.match(statsFr.html, /Les 14 derniers jours/);
  for (const subpage of ['','francais/','flashcards/','estadisticas/','grec/','cantonais/','latin/']) {
    const html = fs.readFileSync(path.join(root,subpage,'index.html'),'utf8');
    assert.match(html,/app\.js\?v=\d{8}-\d+/,subpage+' must invalidate the old JavaScript cache');
    assert.match(html,/styles\.css\?v=\d{8}-\d+/,subpage+' must invalidate the old CSS cache');
  }
  const cloud = mount('francais','', 'd1-tv5');
  await new Promise(resolve=>setImmediate(resolve));
  await new Promise(resolve=>setImmediate(resolve));
  assert.match(cloud.html, /class="lesson-link active" data-action="lesson" data-id="d1-tv5"/);
  const explicit = mount('francais','?lecon=d0-alphabet','d1-tv5');
  await new Promise(resolve=>setImmediate(resolve));
  await new Promise(resolve=>setImmediate(resolve));
  assert.match(explicit.html, /class="lesson-link active" data-action="lesson" data-id="d0-alphabet"/);
  console.log('Smoke tests OK — hub, cours A1, audio FR/ES, flashcards parlantes, signet de leçon, historique 14 jours et 10 semaines.');
})().catch(e=>{console.error(e);process.exitCode=1;});
