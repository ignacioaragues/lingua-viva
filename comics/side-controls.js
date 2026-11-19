/* Controles independientes para el panel de transcripción de los cómics.
   La barra se ubica fuera de la grilla para que no se desplace mientras se arrastra. */
(()=>{'use strict';
const workspace=document.getElementById('workspace');
if(!workspace)return;
const comic=document.body.dataset.comic||'asterix-cleopatre';
const key='lv:comics:'+comic+':sidebar:';
function stored(name,fallback){try{const n=Number(localStorage.getItem(key+name));return Number.isFinite(n)&&n>0?n:fallback}catch(_){return fallback}}
const toolbar=document.createElement('section');
toolbar.className='comic-side-toolbar';
toolbar.setAttribute('aria-label','Controles del panel de transcripción');
toolbar.innerHTML='<div class="comic-control"><label for="comic-side-width">Ancho del panel lateral</label><input id="comic-side-width" type="range" min="28" max="65" step="1" aria-label="Ancho de transcripción y traducción"><output id="comic-side-width-value" for="comic-side-width"></output></div><div class="comic-control"><label for="comic-side-font">Tamaño de la transcripción</label><input id="comic-side-font" type="range" min="80" max="160" step="5" aria-label="Tamaño del texto francés y español"><output id="comic-side-font-value" for="comic-side-font"></output></div><button type="button" class="comic-side-reset">Restablecer panel</button>';
workspace.parentNode.insertBefore(toolbar,workspace);
const css=document.createElement('style');
css.textContent=`.comic-side-toolbar{display:flex;gap:20px;align-items:center;flex-wrap:wrap;padding:12px 16px;margin:12px 0;border:1px solid #d4d9d5;border-radius:10px;background:#fff}.comic-control{display:flex;align-items:center;flex-wrap:wrap;gap:10px;font-size:.89rem}.comic-control label{display:inline;margin:0;font-weight:600}.comic-control input[type=range]{width:150px;min-width:110px;cursor:ew-resize;accent-color:#3d6b79;touch-action:none}.comic-control output{min-width:3.6em;font-variant-numeric:tabular-nums;color:#44616a}.comic-side-reset{margin-left:auto}#workspace.layout:not(.no-notes){grid-template-columns:minmax(0,1fr) minmax(320px,var(--comic-sidebar-width,42%))}#workspace.layout>aside{min-width:0;max-height:calc(100vh - 135px);overflow-y:auto;overscroll-behavior:contain;scrollbar-gutter:stable}#workspace .transcript-fr{font-size:calc(1.08rem * var(--comic-sidebar-font,1))}#workspace .transcript-es{font-size:calc(1rem * var(--comic-sidebar-font,1))}@media(max-width:980px){#workspace.layout:not(.no-notes){grid-template-columns:minmax(0,1fr)}#workspace.layout>aside{max-height:75vh;overflow-y:auto}.comic-side-toolbar{gap:12px}.comic-side-reset{margin-left:0}}@media(max-width:560px){.comic-control{width:100%;justify-content:space-between}.comic-control input[type=range]{flex:1;width:auto}.comic-side-toolbar{padding:12px}}`;
document.head.append(css);
const width=toolbar.querySelector('#comic-side-width');
const font=toolbar.querySelector('#comic-side-font');
function apply(){workspace.style.setProperty('--comic-sidebar-width',width.value+'%');workspace.style.setProperty('--comic-sidebar-font',String(Number(font.value)/100));toolbar.querySelector('#comic-side-width-value').textContent=width.value+' %';toolbar.querySelector('#comic-side-font-value').textContent=font.value+' %';try{localStorage.setItem(key+'width',width.value);localStorage.setItem(key+'font',font.value)}catch(_){}}
width.value=Math.max(28,Math.min(65,stored('width',42)));
font.value=Math.round(Math.max(80,Math.min(160,stored('font',100)))/5)*5;
width.addEventListener('input',apply);font.addEventListener('input',apply);
toolbar.querySelector('.comic-side-reset').addEventListener('click',()=>{width.value=42;font.value=100;apply()});
apply();
})();