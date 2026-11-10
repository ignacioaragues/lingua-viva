const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { randomUUID } = require('node:crypto');

const root = path.resolve(__dirname, '..');
const course = fs.readFileSync(path.join(root, 'content.js'), 'utf8');
const app = fs.readFileSync(path.join(root, 'app.js'), 'utf8');

function mount(page, query = '') {
  const element = { innerHTML: '' };
  const events = {};
  const storage = {};
  const location = { search: query, origin: 'https://ignacioaragues.github.io', href: 'https://ignacioaragues.github.io/lingua-viva/' };
  const document = {
    body: { dataset: { page, root: page === 'home' ? './' : '../' } },
    querySelector: selector => selector === '#app' ? element : null,
    addEventListener: (name, fn) => { events[name] = fn; },
    hidden: false
  };
  const window = { addEventListener() {}, LINGUA: null, scrollTo() {} };
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
  assert.match(french.html, /Langue des explications grammaticales/);
  assert.match(french.html, /Voir le sens/);
  await french.events.click({ target: { closest: () => ({ dataset: { action:'grammar', lang:'es' } }) } });
  assert.match(french.html, /En francés, «tu» se usa/);
  assert.match(french.html, /lang="es"/);
  const cards = mount('flashcards', '?idioma=francais');
  assert.match(cards.html, /Cartes mémoire/);
  assert.match(cards.html, /Bonjour/);
  await cards.events.click({ target: { closest: () => ({ dataset: { action:'flip' } }) } });
  assert.match(cards.html, /salutation de la journée/);
  const greek = mount('grec');
  assert.match(greek.html, /Griego antiguo/);
  assert.match(greek.html, /Mis flashcards/);
  console.log('Smoke tests OK — hub, cours A1, grammaire FR/ES, flashcards, autres langues.');
})().catch(e=>{console.error(e);process.exitCode=1;});
