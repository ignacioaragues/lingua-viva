/* Lingua Viva: contextual Greek keyboard, independent of the private PDF reader. */
(function(){
'use strict';
const chars='α β γ δ ε ζ η θ ι κ λ μ ν ξ ο π ρ σ τ υ φ χ ψ ω ς'.split(' ');
const extras=[['᾿','\u0313'],['῾','\u0314'],['´','\u0301'],['῀','\u0342'],['ͅ','\u0345'],['espacio',' ']];
let target=null;
const panel=document.createElement('section');
panel.id='lv-greek-floating';
panel.setAttribute('aria-label','Teclado griego flotante');
panel.hidden=true;
panel.innerHTML='<div class="lv-greek-head"><strong>Teclado griego</strong><button type="button" data-close aria-label="Cerrar teclado">×</button></div><div class="lv-greek-keys"></div>';
const keys=panel.querySelector('.lv-greek-keys');
[...chars.map(c=>[c,c]),...extras].forEach(([label,value])=>{
 const b=document.createElement('button');b.type='button';b.textContent=label;b.dataset.value=value;keys.append(b);
});
const style=document.createElement('style');
style.textContent='#lv-greek-floating{position:fixed;z-index:10050;box-sizing:border-box;width:min(390px,calc(100vw - 20px));max-height:42vh;overflow:auto;padding:10px;background:var(--paper,#fff);color:var(--ink,#222);border:1px solid #999;border-radius:12px;box-shadow:0 8px 35px #0003}#lv-greek-floating[hidden]{display:none!important}.lv-greek-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}.lv-greek-head button{border:0;background:transparent;font-size:22px;cursor:pointer}.lv-greek-keys{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:4px}.lv-greek-keys button{padding:8px 2px;min-width:0;border:1px solid #bbb;border-radius:5px;background:transparent;color:inherit;font-size:19px;cursor:pointer}.lv-greek-keys button:last-child{grid-column:span 2;font-size:12px}@media(max-width:650px){#lv-greek-floating{left:8px!important;right:8px;bottom:8px;top:auto!important;width:auto;max-height:34vh}.lv-greek-keys{grid-template-columns:repeat(7,minmax(0,1fr))}}';
document.head.append(style);document.body.append(panel);
function place(){
 if(!target||!target.isConnected){panel.hidden=true;return;}
 if(matchMedia('(max-width:650px)').matches)return;
 const r=target.getBoundingClientRect(),w=panel.offsetWidth,h=panel.offsetHeight;
 panel.style.left=Math.max(8,Math.min(r.left,innerWidth-w-8))+'px';
 panel.style.top=Math.max(8,Math.min(r.bottom+8,innerHeight-h-8))+'px';
}
document.addEventListener('focusin',e=>{
 if(e.target.matches&&e.target.matches('#duff-app .greek-answer')){
 target=e.target;panel.hidden=false;place();
 }
});
panel.addEventListener('pointerdown',e=>{if(e.target.closest('[data-value]'))e.preventDefault();});
panel.addEventListener('click',e=>{
 if(e.target.closest('[data-close]')){panel.hidden=true;return;}
 const b=e.target.closest('[data-value]');if(!b||!target||!target.isConnected)return;
 const a=target.selectionStart??target.value.length,z=target.selectionEnd??a;
 target.setRangeText(b.dataset.value,a,z,'end');
 target.dispatchEvent(new Event('input',{bubbles:true}));
 place();
});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!panel.hidden)panel.hidden=true;});
window.addEventListener('resize',place);
})();
