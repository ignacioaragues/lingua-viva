/* Reproducción de intervenciones francesas en los lectores de cómics.
   Usa la síntesis de voz local del navegador; no sube ni almacena transcripciones. */
(()=>{
  'use strict';
  const root=document.getElementById('prepared-translation');
  if(!root)return;
  const synth=window.speechSynthesis||null;
  const available=!!(synth&&window.SpeechSynthesisUtterance);
  let current=null;

  const style=document.createElement('style');
  style.textContent='#prepared-translation .comic-speech-line{display:flex;align-items:flex-start;gap:10px}'+
    '#prepared-translation .comic-speech-line>.transcript-fr{flex:1;min-width:0}'+
    '#prepared-translation .comic-speak{flex:none;display:inline-flex;align-items:center;justify-content:center;min-width:36px;min-height:36px;margin:2px 0 0;padding:6px 9px;border-radius:50%;background:#eef4f1;color:#315c67;border:1px solid #a9c2bb;line-height:1;font-size:.95rem}'+
    '#prepared-translation .comic-speak:hover:not(:disabled){background:#dfece8}'+
    '#prepared-translation .comic-speak:focus-visible{outline:3px solid #537f91;outline-offset:2px}'+
    '#prepared-translation .comic-speak[aria-pressed="true"]{background:#315c67;color:white;border-color:#315c67}'+
    '#prepared-translation .comic-speak:disabled{opacity:.45;cursor:not-allowed}';
  document.head.append(style);

  function setPlaying(button,playing){
    if(!button)return;
    button.textContent=playing?'■':'▶';
    button.setAttribute('aria-pressed',String(playing));
    button.setAttribute('aria-label',playing?'Detener la lectura en francés':'Escuchar en francés');
    button.title=playing?'Detener audio':'Escuchar este texto en francés';
  }
  function stop(){
    if(current){setPlaying(current.button,false);current=null}
    if(synth)synth.cancel();
  }
  function frenchVoice(){
    const voices=synth.getVoices();
    return voices.find(v=>v.lang.toLowerCase()==='fr-fr')||
           voices.find(v=>v.lang.toLowerCase().startsWith('fr'))||null;
  }
  function play(button){
    if(!available)return;
    if(current?.button===button){stop();return}
    const text=button.closest('.transcript-segment')?.querySelector('.transcript-fr')?.textContent?.trim();
    if(!text)return;
    stop();
    const utterance=new SpeechSynthesisUtterance(text);
    utterance.lang='fr-FR';
    utterance.rate=.92;
    const voice=frenchVoice();
    if(voice)utterance.voice=voice;
    current={button,utterance};
    setPlaying(button,true);
    const finish=()=>{
      if(current?.utterance===utterance){current=null;setPlaying(button,false)}
    };
    utterance.onend=finish;
    utterance.onerror=finish;
    try{synth.speak(utterance)}catch(_){finish()}
  }
  function decorate(){
    if(current&&!root.contains(current.button))stop();
    root.querySelectorAll('.transcript-segment').forEach(segment=>{
      const fr=segment.querySelector('.transcript-fr');
      if(!fr?.textContent?.trim()||segment.querySelector('.comic-speak'))return;
      const line=document.createElement('div');
      line.className='comic-speech-line';
      fr.replaceWith(line);
      line.append(fr);
      const button=document.createElement('button');
      button.type='button';
      button.className='comic-speak';
      if(!available){
        button.disabled=true;
        button.title='La reproducción de voz no está disponible en este navegador';
      }
      setPlaying(button,false);
      line.append(button);
    });
  }
  root.addEventListener('click',event=>{
    const button=event.target.closest('.comic-speak');
    if(button&&root.contains(button))play(button);
  });
  new MutationObserver(decorate).observe(root,{childList:true});
  document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
  window.addEventListener('pagehide',stop);
  decorate();
})();
