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
  const window = { addEventListener() {}, LINGUA: null, scrollTo() {} };
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
  return { get html() { return element.innerHTML; }, events };
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
  await french.events.click({ target: { closest: () => ({ dataset: { action:'lesson', id:'d1-contacts' } }) } });
  assert.match(french.html, /Contacts/);
  assert.match(french.html, /class="lesson-link active" data-action="lesson" data-id="d1-contacts"/);
  await french.events.click({ target: { closest: () => ({ dataset: { action:'grammar', lang:'es' } }) } });
  assert.match(french.html, /Para presentarte usás verbos distintos/);
  assert.match(french.html, /lang="es"/);
  const cards = mount('flashcards', '?idioma=francais');
  assert.match(cards.html, /Cartes mémoire/);
  assert.match(cards.html, /Bonjour/);
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
  const cloud = mount('francais','', 'd1-tv5');
  await new Promise(resolve=>setImmediate(resolve));
  await new Promise(resolve=>setImmediate(resolve));
  assert.match(cloud.html, /class="lesson-link active" data-action="lesson" data-id="d1-tv5"/);
  const explicit = mount('francais','?lecon=d0-alphabet','d1-tv5');
  await new Promise(resolve=>setImmediate(resolve));
  await new Promise(resolve=>setImmediate(resolve));
  assert.match(explicit.html, /class="lesson-link active" data-action="lesson" data-id="d0-alphabet"/);
  console.log('Smoke tests OK — hub, cours A1, signet de leçon, grammaire FR/ES, flashcards, historique 14 jours et 10 semaines.');
})().catch(e=>{console.error(e);process.exitCode=1;});
