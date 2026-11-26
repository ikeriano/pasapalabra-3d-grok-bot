/* v0.29 · 📺 AntenaPlayStation dentro de Pasapalabra 3D (🆕 INVENTADO). Usa el módulo reutilizable aps/antenaps.js */
(function(){'use strict';
let res=null;
const vids=()=>(window.VID27||[]).length;
AntenaPS.init({base:'aps/',game:'Pasapalabra 3D',hooks:{
 canPlay:p=>!!(p.rec&&window.VP27&&p.rec.some(i=>i<vids())),
 play:p=>new Promise(r=>{const ok=p.rec.filter(i=>i<vids());const i=ok[(p._n||0)%ok.length];res=r;try{VP27.rec(i);}catch(e){res=null;r();}}),
 stop:()=>{const s=document.getElementById('skip');if(s&&s.onpointerdown)s.onpointerdown(new PointerEvent('pointerdown'));},
 onClose:()=>{try{showMenu('main');}catch(e){}}}});
// cuando la recreación termina (o se pulsa Volver) el juego llama a showMenu: si estamos en la tele, volvemos a la tele
{const _sm=showMenu;showMenu=function(){if(res&&AntenaPS.isOpen()){const r=res;res=null;try{RUN++;}catch(e){}try{document.querySelectorAll('#vp27').forEach(e=>e.remove());}catch(e){}
  try{clearG();say();setActs();FX5.off();stopMusic();}catch(e){}try{menu.classList.add('hidden');document.getElementById('skip').classList.add('hidden');}catch(e){}r();return;}
 const out=_sm.apply(this,arguments);try{const s=arguments[0]||'main';const col=menu.querySelector('.col');if(s=='main'&&col&&!col.querySelector('[data-go=aps29]')){
  const h=mb9('aps29','📺','ANTENAPLAYSTATION · LA TELE DEL JUEGO','🆕 INVENTADO · programación con horarios de la TDT, mosca, hashtag, autopromos y animaciones');
  const ref=col.querySelector('[data-go=pr29]')||col.querySelector('[data-go=vp27]');if(ref)ref.insertAdjacentHTML('afterend',h);else col.insertAdjacentHTML('beforeend',h);
  col.querySelectorAll('[data-go=aps29]').forEach(b=>{b.onpointerdown=ev=>{ev.preventDefault();ev.stopPropagation();try{sfx('ok');}catch(e){}menu.classList.add('hidden');AntenaPS.open();};});try{NAV.attach(s);}catch(e){}}}catch(e){console.error(e);}return out;};}
{const s=document.getElementById('skip');if(s)s.addEventListener('pointerdown',()=>{if(AntenaPS.is3D())AntenaPS.markStopped();},true);}
})();
