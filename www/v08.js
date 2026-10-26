'use strict';
// ======================================================================
//  v0.8 — CONTROL TÁCTIL NUEVO + FINAL DEL BOTE
//  Antes: todos los botones se activaban al APOYAR el dedo (pointerdown) y el
//  menú no se podía desplazar (touch-action:none), así que al empezar a
//  deslizar se pulsaba la opción que había debajo del dedo.
//  Ahora: (1) un toque se activa al LEVANTAR el dedo y solo si casi no se ha
//  movido; (2) cada deslizamiento mueve exactamente UNA opción; (3) cruceta
//  grande ▲ ◀ ✔ ▶ ▼ siempre visible en los menús; (4) la opción elegida va
//  resaltada; (5) como mucho 30 fotogramas por segundo (Redmi A2).
// ======================================================================
window.V8={SLOP:12,SW:40,log:[]};
// ---------- 1. toque al levantar el dedo, para TODOS los onpointerdown del juego ----------
(()=>{const D=Object.getOwnPropertyDescriptor(HTMLElement.prototype,'onpointerdown');
 function inst(el){if(el.__t8)return;el.__t8=1;let st=null;
  el.addEventListener('pointerdown',e=>{if(!e.isPrimary||e.button>0)return;st={id:e.pointerId,x:e.clientX,y:e.clientY};el.classList.add('pr8');if(e.pointerType!=='mouse'){try{el.releasePointerCapture(e.pointerId);}catch(x){}}});
  const mv=e=>{if(st&&e.pointerId===st.id&&Math.hypot(e.clientX-st.x,e.clientY-st.y)>V8.SLOP){st=null;el.classList.remove('pr8');}};
  // seguimos el dedo en todo el documento (sin captura implícita) para saber si se ha deslizado
  document.addEventListener('pointermove',mv,true);
  document.addEventListener('pointercancel',e=>{if(st&&e.pointerId===st.id){st=null;el.classList.remove('pr8');}},true);
  document.addEventListener('pointerup',e=>{if(!st||e.pointerId!==st.id)return;const s=st;st=null;el.classList.remove('pr8');
   if(!el.isConnected||Math.hypot(e.clientX-s.x,e.clientY-s.y)>V8.SLOP)return;
   const r=el.getBoundingClientRect();if(e.clientX<r.left-6||e.clientX>r.right+6||e.clientY<r.top-6||e.clientY>r.bottom+6)return;
   const now=performance.now();if(el.__l8&&now-el.__l8<250)return;el.__l8=now;
   const f=el.__f8;if(f){V8.log.push('tap:'+(el.dataset.go||el.dataset.e5||el.dataset.y||el.id||el.className));f.call(el,e);}},true);}
 Object.defineProperty(HTMLElement.prototype,'onpointerdown',{configurable:true,enumerable:true,
  get(){return this.__f8||null;},set(f){this.__f8=typeof f==='function'?f:null;if(this.__f8)inst(this);}});
 V8.nativePD=D;})();
// ---------- 2. 30 fps como máximo ----------
(()=>{const raf=window.requestAnimationFrame.bind(window);let q=[],armed=false,last=0;
 function drive(t){if(t-last<28){raf(drive);return;}last=t;armed=false;const c=q;q=[];for(const f of c){try{f(t);}catch(e){console.error(e);}}}
 window.requestAnimationFrame=f=>{q.push(f);if(!armed){armed=true;raf(drive);}return q.length;};})();
// ---------- 3. estilos ----------
{const st=document.createElement('style');st.textContent=`
:root{--pb:clamp(50px,15vh,84px)}
#menu,#menu *{touch-action:none!important}
#pad8{position:fixed;right:max(10px,1.6vw);top:50%;transform:translateY(-50%);z-index:36;display:none;grid-template-columns:repeat(3,var(--pb));grid-template-rows:repeat(3,var(--pb));gap:6px;touch-action:none}
#pad8.on{display:grid}
#pad8 .pb{border:3px solid #8fc4ff;border-radius:18px;background:linear-gradient(#3f7bff,#0a2fa8);color:#fff;font:900 calc(var(--pb)*.42)/1 N,Arial;box-shadow:0 5px 0 #061a5c,0 6px 14px #000a;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:0;gap:1px}
#pad8 .pb small{font-size:calc(var(--pb)*.15);font-weight:800;opacity:.95}
#pad8 .pb.ok{background:linear-gradient(#ffe36a,#ffb400);color:#3a2200;border-color:#fff3b0}
#pad8 .pb.dis{opacity:.3}
#pad8 .u{grid-area:1/2}#pad8 .l{grid-area:2/1}#pad8 .ok{grid-area:2/2}#pad8 .r{grid-area:2/3}#pad8 .d{grid-area:3/2}
.pr8{filter:brightness(1.25)}#pad8 .pb.pr8{transform:translateY(4px);box-shadow:0 1px 0 #061a5c}
#menu.np8 .mbox{padding-right:calc(3*var(--pb) + 12px + 4vw)}
#menu.np8 .col{padding:12px}
.fo8{outline:4px solid #fff!important;outline-offset:2px;box-shadow:0 0 0 9px #ff9d00,0 0 26px 10px rgba(255,170,0,.85)!important;position:relative;z-index:1}
.mbtn.fo8{transform:scale(1.03)}
.orow.fo8,.mtext.fo8{background:#0a2f8ae6}
`;document.head.appendChild(st);}
// ---------- 4. navegación de menús: foco, cruceta, un paso por gesto ----------
const NAV={screen:null,idx:0,items:[],page:false,mem:{},
 col(){return menu.querySelector('.col');},
 isVal(el){return !!el&&(el.querySelector('input[type=range]')||el.querySelector('.tbtn'));},
 scan(){const c=this.col();if(!c)return [];return [...c.querySelectorAll('.mbtn,.orow,.chip5,.mtext')].filter(e=>!e.classList.contains('mtext')||e.querySelector('.tbtn'));},
 attach(s){const c=this.col();this.items=this.scan();
  if(!c||!this.items.length||menu.classList.contains('hidden')||menu.querySelector('.title')){this.items=[];this.pad();return;}
  this.page=c.classList.contains('text')||!!c.querySelector('.mus5')||this.items.length<=1||s=='normas10';
  let i;if(s===this.screen&&this.keep)i=this.idx;else if(this.mem[s]!==undefined)i=this.mem[s];
  else{i=s=='opt'?0:this.items.findIndex(e=>e.classList.contains('mbtn'));}
  if(this.page)i=this.items.findIndex(e=>e.dataset.go=='main'||/Volver/.test(e.textContent));
  this.screen=s;this.keep=false;this.focus(Math.max(0,i),true);this.pad();},
 focus(i,first){if(!this.items.length)return;i=Math.max(0,Math.min(this.items.length-1,i));this.items.forEach(e=>e.classList.remove('fo8'));const el=this.items[i];this.idx=i;this.mem[this.screen]=i;el.classList.add('fo8');
  if(!this.page)el.scrollIntoView({block:first?'center':'nearest'});this.pad();},
 cur(){return this.items[this.idx];},
 move(d){if(this.page){const c=this.col();c.scrollTop+=d*c.clientHeight*.6;V8.log.push('page:'+d);return;}const n=Math.max(0,Math.min(this.items.length-1,this.idx+d));if(n!==this.idx){this.focus(n);sfx('splash');}V8.log.push('move:'+d+'→'+this.idx);},
 fire(el){const f=el&&el.__f8;if(f)f.call(el,{preventDefault(){},stopPropagation(){},clientX:0,clientY:0,isPrimary:true});},
 side(d){const el=this.cur();if(!el)return;const r=el.querySelector('input[type=range]');V8.log.push('side:'+d);
  if(r){const st=+r.step||.1,v=Math.round(Math.max(+r.min,Math.min(+r.max,+r.value+d*st))*100)/100;r.value=v;r.dispatchEvent(new Event('input',{bubbles:true}));r.dispatchEvent(new Event('change',{bubbles:true}));sfx('ok');return;}
  const bs=[...el.querySelectorAll('.tbtn')];if(!bs.length)return;let k=bs.findIndex(b=>b.classList.contains('on'));k=k<0?(d>0?0:bs.length-1):Math.max(0,Math.min(bs.length-1,k+d));
  if(bs[k].classList.contains('on'))return;this.keep=true;this.fire(bs[k]);},
 ok(){const el=this.cur();if(!el)return;V8.log.push('ok');
  if(this.page){this.fire(el);return;}
  if(el.querySelector('input[type=range]')){const r=el.querySelector('input[type=range]');r.value=+r.value>=+r.max?r.min:Math.min(+r.max,+r.value+(+r.step||.1));r.dispatchEvent(new Event('input',{bubbles:true}));sfx('ok');return;}
  const bs=[...el.querySelectorAll('.tbtn')];if(bs.length){let k=bs.findIndex(b=>b.classList.contains('on'));this.keep=true;this.fire(bs[(k+1)%bs.length]);return;}
  this.fire(el);},
 pad(){const p=$('#pad8');if(!p)return;const on=MODE.menu&&!menu.classList.contains('hidden')&&this.items.length>0&&!menu.querySelector('.title');
  p.classList.toggle('on',on);menu.classList.toggle('np8',on);if(!on)return;const v=!this.page&&this.isVal(this.cur());
  p.querySelector('.u').innerHTML=this.page?'▲<small>Subir</small>':'▲<small>Anterior</small>';p.querySelector('.d').innerHTML=this.page?'▼<small>Bajar</small>':'▼<small>Siguiente</small>';
  p.querySelector('.ok').innerHTML=this.page?'✔<small>Volver</small>':'✔<small>Elegir</small>';
  p.querySelector('.l').classList.toggle('dis',!v);p.querySelector('.r').classList.toggle('dis',!v);
  if(!this.page){p.querySelector('.u').classList.toggle('dis',this.idx<=0);p.querySelector('.d').classList.toggle('dis',this.idx>=this.items.length-1);}else{p.querySelector('.u').classList.remove('dis');p.querySelector('.d').classList.remove('dis');}}};
window.NAV=NAV;
{const p=document.createElement('div');p.id='pad8';p.innerHTML='<button class="pb u"></button><button class="pb l">◀<small>Cambiar</small></button><button class="pb ok"></button><button class="pb r">▶<small>Cambiar</small></button><button class="pb d"></button>';document.body.appendChild(p);
 const b=(c,f)=>{p.querySelector(c).onpointerdown=e=>{e.preventDefault();e.stopPropagation();f();};};
 b('.u',()=>NAV.move(-1));b('.d',()=>NAV.move(1));b('.l',()=>NAV.side(-1));b('.r',()=>NAV.side(1));b('.ok',()=>NAV.ok());}
// gestos sobre el menú (fase de captura): un solo paso por deslizamiento; en páginas de texto, arrastre 1:1 sin inercia
(()=>{let g=null;
 menu.addEventListener('pointerdown',e=>{if(V8.native||!e.isPrimary||!NAV.items.length)return;const c=NAV.col();g={id:e.pointerId,x:e.clientX,y:e.clientY,fired:false,rng:!!(e.target.closest&&e.target.closest('input[type=range]')),st:c?c.scrollTop:0};},true);
 document.addEventListener('pointermove',e=>{if(!g||e.pointerId!==g.id)return;const dx=e.clientX-g.x,dy=e.clientY-g.y;
  if(NAV.page){if(Math.abs(dy)>V8.SLOP||g.drag){g.drag=true;const c=NAV.col();if(c)c.scrollTop=g.st-dy;}return;}
  if(g.fired||Math.max(Math.abs(dx),Math.abs(dy))<V8.SW)return;g.fired=true;
  if(Math.abs(dx)>Math.abs(dy)*1.2){if(!g.rng)NAV.side(dx>0?1:-1);}else NAV.move(dy<0?1:-1);},true);
 const end=e=>{if(g&&e.pointerId===g.id)g=null;};document.addEventListener('pointerup',end,true);document.addEventListener('pointercancel',end,true);
 // rueda del ratón: un paso por giro (con pausa) — evita el doble desplazamiento
 let wl=0;menu.addEventListener('wheel',e=>{if(V8.native)return;e.preventDefault();if(!NAV.items.length)return;const n=performance.now();if(n-wl<250)return;wl=n;NAV.move(e.deltaY>0?1:-1);},{passive:false});
 addEventListener('keydown',e=>{if(!MODE.menu||menu.classList.contains('hidden')||!NAV.items.length||document.activeElement===KB)return;
  const k={ArrowUp:()=>NAV.move(-1),ArrowDown:()=>NAV.move(1),ArrowLeft:()=>NAV.side(-1),ArrowRight:()=>NAV.side(1),Enter:()=>NAV.ok(),' ':()=>NAV.ok()}[e.key];if(k){e.preventDefault();if(!e.repeat)k();}});})();
// al pintar cada pantalla del menú, enganchar la navegación
{const _sm=showMenu;showMenu=function(s='main'){const r=_sm.apply(this,arguments);try{NAV.attach(s);}catch(e){console.error(e);}return r;};}
new MutationObserver(()=>NAV.pad()).observe(menu,{attributes:true,attributeFilter:['class']});
// tocar una fila de opciones (fuera de sus botones) la selecciona
menu.addEventListener('click',e=>{const it=e.target.closest&&e.target.closest('.orow,.mtext');if(!it)return;const i=NAV.items.indexOf(it);if(i>=0&&i!==NAV.idx)NAV.focus(i);});
$('#ver').textContent='v0.8';
Object.assign(window.DBG||{},{NAV,V8});

// ======================================================================
//  v0.8 · FINAL DEL BOTE: completar el rosco (25 aciertos) gana el bote y TERMINA el programa
//  pantalla de premio con importe + confeti + aplausos + despedida del presentador + créditos + menú
//  (en 2019 el sonido es el REAL del programa de Fran del 22-01-2019: celebración y despedida de Christian)
// ======================================================================
{const st=document.createElement('style');st.textContent=`
#premio8{position:fixed;inset:0;z-index:37;display:flex;flex-direction:column;align-items:center;justify-content:center;pointer-events:none;font-family:N,Arial,sans-serif;text-align:center;
 background:radial-gradient(ellipse at 50% 55%,#ffb40055 0%,#8a520099 55%,#1a0d00cc 100%);opacity:0;transition:opacity .8s}
#premio8.on{opacity:1}
#premio8 .t1{font-size:clamp(18px,6vh,44px);font-weight:900;color:#fff;letter-spacing:.06em;text-shadow:0 3px 0 #8a5200,0 0 24px #ffcf40;transform:translateY(-30px) scale(.8);opacity:0;transition:all .7s .2s cubic-bezier(.2,1.6,.4,1)}
#premio8.on .t1{transform:none;opacity:1}
#premio8 .am{font-size:clamp(34px,17vh,140px);font-weight:900;line-height:1.05;margin:.1em 0;background:linear-gradient(#fff6b0,#ffd23a 45%,#f0a000 55%,#ffe680);-webkit-background-clip:text;background-clip:text;color:transparent;
 filter:drop-shadow(0 4px 0 #8a5200) drop-shadow(0 0 18px #ffcf40);transform:scale(.2);opacity:0;transition:all .9s .5s cubic-bezier(.2,1.5,.4,1)}
#premio8.on .am{transform:none;opacity:1;animation:pm8 1.6s 1.6s ease-in-out infinite alternate}
@keyframes pm8{to{transform:scale(1.045)}}
#premio8 .t2{font-size:clamp(13px,4vh,28px);color:#fff;font-weight:800;text-shadow:0 2px 6px #000a;margin-top:.2em;opacity:0;transition:opacity .8s 1.3s}
#premio8.on .t2{opacity:1}
#premio8 .t3{font-size:clamp(12px,3.4vh,24px);color:#ffe9a0;font-weight:700;margin-top:.5em;max-width:80vw;opacity:0;transition:opacity .8s 1.8s;text-shadow:0 2px 6px #000a}
#premio8.on .t3{opacity:1}`;document.head.appendChild(st);}
const GOLD8=['#ffd23a','#fff6b0','#f0a000','#ffffff','#ff8a00'];
const FAREWELL8={2007:'¡Enhorabuena, campeón! Has completado el rosco y te llevas el bote. ¡Gracias por jugar a Pasapalabra!',
 default:'¡Enhorabuena, campeón! Has completado el rosco y te llevas el bote. Seguimos jugando en Telecinco, en Pasapalabra. ¡Hasta pronto!'};
// frase real de Christian Gálvez al despedir el programa (22-01-2019), tal como suena en el clip
const DESP2019_TXT='«Seguimos jugando en Telecinco, en Pasapalabra. Y como siempre solemos decir: ojo, cuidado, que lo mejor está por llegar. No se pierda el próximo Pasapalabra.»';
let clip8=null;
function playClip8(f,vol){stopClip8();if(OPT.sfx<=0&&OPT.mus<=0)return null;try{clip8=new Audio('snd/'+f);clip8.volume=Math.min(1,vol||Math.max(OPT.sfx,OPT.mus,.7));clip8.play().catch(()=>{});}catch(e){}return clip8;}
function stopClip8(){if(clip8){try{clip8.pause();}catch(e){}clip8=null;}}
async function premio8(rid,o){o=o||{};const E=ETAPAS[OPT.etapa]||{};const amount=o.amount||boteTxt();
 const el=document.createElement('div');el.id='premio8';
 el.innerHTML=`<div class="t1">🏆 ¡${o.title||'ROSCO COMPLETADO'}! 🏆</div><div class="am">${amount}</div><div class="t2">${o.sub||'¡Has ganado el bote!'}</div><div class="t3"></div>`;document.body.appendChild(el);
 try{
  say();setActs&&setActs();stopMusic();V5&&V5.stop&&V5.stop();
  const y=OPT.etapa,real=(y==2019&&!o.noClip);
  cut('front');FX5.tint('#ffa000aa');FX5.conf(GOLD8,9);
  if(real){playClip8('bote2019.ogg',1);}else{music('winner');sfx('aplauso');}
  hostSay('<b>¡¡'+(o.title||'ROSCO COMPLETADO')+'!!</b> '+amount);
  requestAnimationFrame(()=>requestAnimationFrame(()=>el.classList.add('on')));
  await wait(2.2,rid);if(!real)sfx('aplauso');
  cut('wide');FX5.conf(GOLD8,7);await wait(3.2,rid);cut('host');
  if(!real){sfx('aplauso');}await wait(4,rid);
  FX5.conf(GOLD8,6);cut('front');await wait(real?5:3,rid);
  // despedida del presentador
  el.querySelector('.t3').textContent=real?DESP2019_TXT:(FAREWELL8[y]||FAREWELL8.default);
  say();cut('host');hostSay(real?DESP2019_TXT:(FAREWELL8[y]||FAREWELL8.default));
  if(real){stopClip8();playClip8('desp_bote2019.ogg',1);await wait(11.6,rid);}else{music(y==2007?'despedida':'desp'+y);await wait(6,rid);}
  stopClip8();
 }finally{stopClip8();el.classList.remove('on');setTimeout(()=>el.remove(),900);FX5.tint('');}
 if(!o.keep){GAME.boteDone=true;OPT.bote=60000;saveOpt();}}
{const _b=bote;bote=async function(rid,won){if(won===true){const c=arguments[2]||{};return premio8(rid,c);}return _b.apply(this,arguments);};}
// tras el bote: sin más programa: créditos y menú (no vuelve a sumar bote ni repite la despedida)
{const _d=despedida;despedida=async function(rid){if(GAME.boteDone){GAME.boteDone=false;clearG();stopMusic();stopClip8();setPeople(false);cut('front');say();FX5.off();
  if(typeof creditos6=='function')await creditos6(rid);MOSCA.visible=false;showMenu();return;}return _d.apply(this,arguments);};}
// especiales: primetime (300.000 €), torneo (premio del especial); copa/duelo no tienen importe → no se inventa
(()=>{let src=especial.toString();let n=0;
 const rp=(a,b)=>{if(src.includes(a)){src=src.replace(a,b);n++;}else console.warn('v08 especial: no encuentro',a.slice(0,50));};
 rp("if(win){FX5.conf(E.conf,6);hostSay(L5.ESPL[8]);await wait(3,rid);}","if(win){await premio8(rid,{amount:'300.000 €',title:'ROSCO COMPLETADO',sub:'Has completado el rosco: ¡300.000 euros!',noClip:true,keep:1});}");
 rp("if(win){FX5.conf(E.conf,7);sfx('aplauso');music('winner');hostSay(L5.ESPL[7]+(E.prize?' <b>'+E.prize+'</b>':''));await wait(3.4,rid);}","if(win){if(E.prize)await premio8(rid,{amount:E.prize,title:'CAMPEÓN DEL TORNEO',sub:'¡Eres el campeón!',noClip:true,keep:1});else{FX5.conf(E.conf,7);sfx('aplauso');music('winner');hostSay(L5.ESPL[7]);await wait(3.4,rid);}}");
 rp("hostSay(L5.ESPL[win?11:12]);","hostSay(GAME.boteDone?'¡Rosco completo!':L5.ESPL[win?11:12]);");
 (0,eval)('especial='+src);})();
{const _e=especial;especial=function(){GAME.boteDone=false;return _e.apply(this,arguments);};
 const _p=programa;programa=function(){GAME.boteDone=false;return _p.apply(this,arguments);};}
