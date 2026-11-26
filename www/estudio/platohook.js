/* platohook.js · 🆕 INVENTADO — se inyecta en la copia del juego original que vive dentro del estudio.
   Abre automáticamente el modo de paseo/explorar del plató original y añade «⟵ Volver al estudio». */
(function(){
 if(window.top===window)return; // solo dentro del estudio
 var cfg={};try{cfg=JSON.parse(decodeURIComponent((location.hash.match(/plato=([^&]+)/)||[])[1]||'{}'));}catch(e){}
 var pasos=cfg.auto||[],teclas=cfg.teclas||0,i=0,t0=Date.now();
 function vis(e){return e&&e.offsetParent!==null;}
 function txt(e){return (e.innerText||e.textContent||'').replace(/\s+/g,' ').trim();}
 function busca(p){var L=document.querySelectorAll('button,a,[role=button],.btn,.mbtn,div[onclick],li');for(var k=0;k<L.length;k++){var t=txt(L[k]);if(vis(L[k])&&t&&t.length<120&&t.toLowerCase().indexOf(p.toLowerCase())===0)return L[k];}for(k=0;k<L.length;k++){t=txt(L[k]);if(vis(L[k])&&t.length<120&&t.toLowerCase().indexOf(p.toLowerCase())>=0)return L[k];}return null;}
 function tick(){if(i>=pasos.length||Date.now()-t0>40000)return;var p=pasos[i];
  if(p.charAt(0)==='@'){var el=document.querySelector(p.slice(1));if(el){el.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));el.dispatchEvent(new PointerEvent('pointerup',{bubbles:true}));el.click&&el.click();i++;}}
  else if(p==='ENTER'){document.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',keyCode:13,bubbles:true}));window.dispatchEvent(new KeyboardEvent('keydown',{key:'Enter',code:'Enter',keyCode:13,bubbles:true}));document.body.dispatchEvent(new PointerEvent('pointerup',{bubbles:true}));i++;}
  else if(p.indexOf('WAIT')===0){i++;setTimeout(tick,+p.slice(4)||1000);return;}
  else{var b=busca(p);if(b){b.click();i++;}}
  setTimeout(tick,700);}
 function volver(){var b=document.createElement('button');b.textContent='⟵ Volver al estudio';b.style.cssText='position:fixed;right:10px;top:10px;z-index:2147483647;background:#ff8a00;color:#1a1446;font:900 15px system-ui;border:0;border-radius:12px;padding:9px 14px;box-shadow:0 2px 8px #0008';b.onclick=function(e){e.stopPropagation();parent.postMessage({estudio:'cerrar'},'*');};document.body.appendChild(b);
  var c=document.createElement('div');c.textContent='🏢 Plató original · '+(cfg.n||document.title);c.style.cssText='position:fixed;left:50%;transform:translateX(-50%);top:10px;z-index:2147483646;background:#1a1446d0;color:#ffd400;font:800 13px system-ui;padding:5px 10px;border-radius:8px;pointer-events:none';document.body.appendChild(c);}
 function go(){volver();setTimeout(tick,1200);}
 if(document.readyState==='complete')go();else addEventListener('load',go);
})();
