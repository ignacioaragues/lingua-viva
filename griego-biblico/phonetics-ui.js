/* Presentación del atlas fonético; el contenido histórico está en phonetics.js. */
(function(){
'use strict';
function render(state,letters,examples,resources,h){
 var atlas=window.LINGUA_GREEK_PHONETICS;if(!atlas)return '';
 var groups=[['letters','Letras (24)'],['combinations','Diptongos y vocales'],['clusters','Grupos consonánticos'],['signs','Espíritus y acentos']];
 var items=atlas[state.phoneticsGroup]||atlas.letters;
 var selected=items[Math.min(state.phoneticsIndex,items.length-1)]||items[0];
 var key=selected[0].split(' ')[0];
 var example=state.phoneticsGroup==='letters'?examples[key]:null;
 var duff=state.phoneticsGroup==='letters'?letters.find(function(x){return x[0]===key;}):null;
 return '<div class="duff-phonetics-overlay" id="duff-phonetics-overlay">'
 +'<div class="duff-phonetics-shade" data-do="phonetics-close"></div>'
 +'<section class="duff-phonetics-dialog" id="duff-phonetics-modal" role="dialog" aria-modal="true" aria-labelledby="duff-phonetics-title">'
 +'<header class="duff-phonetics-head"><div><div class="micro">LINGUA VIVA · FONÉTICA HISTÓRICA</div><h2 id="duff-phonetics-title">Pronunciación comparada · AFI / IPA</h2></div><button type="button" class="btn btn-small" data-do="phonetics-close" aria-label="Cerrar tabla de pronunciación">Cerrar ×</button></header>'
 +'<p class="duff-phonetics-intro">'+h(atlas.intro)+'</p>'
 +'<div class="duff-phonetics-audio"><div><b>Escuchar el alfabeto en griego moderno</b><p>Grabación humana alojada en Wikimedia Commons; no necesita una voz instalada en tu dispositivo.</p></div><audio controls preload="none" aria-label="Grabación del alfabeto griego moderno"><source src="'+h(atlas.modernAlphabetAudio)+'" type="audio/ogg">Tu navegador no reproduce este audio.</audio><a href="https://commons.wikimedia.org/wiki/File:Ell-AlphabitosUpload.ogg" target="_blank" rel="noopener noreferrer">Escuchar en Wikimedia ↗</a></div>'
 +'<div class="duff-phonetics-tabs" role="group" aria-label="Tipos de sonidos">'+groups.map(function(g){return '<button type="button" data-do="phonetics-group" data-group="'+g[0]+'" aria-pressed="'+(g[0]===state.phoneticsGroup)+'">'+g[1]+'</button>';}).join('')+'</div>'
 +'<div class="duff-phonetics-selected"><div class="duff-phonetics-symbol" lang="grc">'+h(selected[0])+'</div><div class="duff-phonetics-detail"><div class="micro">'+h(selected[1])+'</div><p>'+h(selected[5])+'</p>'
 +(duff?'<p><b>Convención didáctica de Duff:</b> <span class="ipa">'+h(duff[2])+'</span> · '+h(duff[3])+'</p>':'')
 +(example?'<p><b>Ejemplo:</b> <span lang="grc">'+h(example[0])+'</span> · '+h(example[1])+'</p>':'')
 +'</div></div>'
 +'<div class="duff-phonetics-table-wrap" role="region" aria-label="Tabla comparativa de sonidos" tabindex="0"><table class="duff-phonetics-table"><thead><tr><th>Grafía</th><th>Ático clásico</th><th>Koiné bíblica</th><th>Griego moderno</th></tr></thead><tbody>'
 +items.map(function(row,i){return '<tr class="'+(i===state.phoneticsIndex?'selected':'')+'"><th scope="row"><button type="button" data-do="phonetics-select" data-index="'+i+'" aria-pressed="'+(i===state.phoneticsIndex)+'" title="Ver detalle de '+h(row[1])+'"><span lang="grc">'+h(row[0])+'</span><small>'+h(row[1])+'</small></button></th><td class="ipa">'+h(row[2])+'</td><td class="ipa">'+h(row[3])+'</td><td class="ipa">'+h(row[4])+'</td></tr>';}).join('')
 +'</tbody></table></div>'
 +'<p class="duff-phonetics-foot">/ / = transcripción fonémica aproximada; [ ] = realización contextual; → = cambio histórico; ~ = variantes o análisis alternativos. No hubo una única pronunciación de la koiné para todos los siglos y regiones.</p>'
 +'<details class="duff-phonetics-sources"><summary>Fuentes y recursos de pronunciación</summary><ul>'+atlas.sources.map(function(src){return '<li><a href="'+h(src.url)+'" target="_blank" rel="noopener noreferrer">'+h(src.name)+'</a></li>';}).join('')+'</ul>'+resources()+'</details>'
 +'</section></div>';
}
window.LINGUA_GREEK_PHONETICS_UI={render:render};
})();