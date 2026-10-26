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
 menu.addEventListener('pointerdown',e=>{if(!e.isPrimary||!NAV.items.length)return;const c=NAV.col();g={id:e.pointerId,x:e.clientX,y:e.clientY,fired:false,rng:!!(e.target.closest&&e.target.closest('input[type=range]')),st:c?c.scrollTop:0};},true);
 document.addEventListener('pointermove',e=>{if(!g||e.pointerId!==g.id)return;const dx=e.clientX-g.x,dy=e.clientY-g.y;
  if(NAV.page){if(Math.abs(dy)>V8.SLOP||g.drag){g.drag=true;const c=NAV.col();if(c)c.scrollTop=g.st-dy;}return;}
  if(g.fired||Math.max(Math.abs(dx),Math.abs(dy))<V8.SW)return;g.fired=true;
  if(Math.abs(dx)>Math.abs(dy)*1.2){if(!g.rng)NAV.side(dx>0?1:-1);}else NAV.move(dy<0?1:-1);},true);
 const end=e=>{if(g&&e.pointerId===g.id)g=null;};document.addEventListener('pointerup',end,true);document.addEventListener('pointercancel',end,true);
 // rueda del ratón: un paso por giro (con pausa) — evita el doble desplazamiento
 let wl=0;menu.addEventListener('wheel',e=>{e.preventDefault();if(!NAV.items.length)return;const n=performance.now();if(n-wl<250)return;wl=n;NAV.move(e.deltaY>0?1:-1);},{passive:false});
 addEventListener('keydown',e=>{if(!MODE.menu||menu.classList.contains('hidden')||!NAV.items.length||document.activeElement===KB)return;
  const k={ArrowUp:()=>NAV.move(-1),ArrowDown:()=>NAV.move(1),ArrowLeft:()=>NAV.side(-1),ArrowRight:()=>NAV.side(1),Enter:()=>NAV.ok(),' ':()=>NAV.ok()}[e.key];if(k){e.preventDefault();if(!e.repeat)k();}});})();
// al pintar cada pantalla del menú, enganchar la navegación
{const _sm=showMenu;showMenu=function(s='main'){const r=_sm.apply(this,arguments);try{NAV.attach(s);}catch(e){console.error(e);}return r;};}
new MutationObserver(()=>NAV.pad()).observe(menu,{attributes:true,attributeFilter:['class']});
// tocar una fila de opciones (fuera de sus botones) la selecciona
menu.addEventListener('click',e=>{const it=e.target.closest&&e.target.closest('.orow,.mtext');if(!it)return;const i=NAV.items.indexOf(it);if(i>=0&&i!==NAV.idx)NAV.focus(i);});
$('#ver').textContent='v0.8';
Object.assign(window.DBG||{},{NAV,V8});
