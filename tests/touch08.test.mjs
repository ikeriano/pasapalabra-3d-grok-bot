// Prueba del control táctil v0.8 (actualizada en v0.9: scroll con el dedo): Chrome headless con viewport de móvil (Redmi A2: 720x1600 px físicos = 360x800 CSS,
// que en horizontal son 800x360 CSS a DPR 2) y eventos táctiles reales (CDP Input.dispatchTouchEvent).
// Uso:  node tests/touch08.test.mjs      (necesita puppeteer-core y Google Chrome; CHROME=/ruta/chrome)
// Con WWW=/ruta/a/otra/carpeta se puede probar otra versión (la v0.7 FALLA estas pruebas: así se vio el fallo).
import {open,check,sleep} from './lib.mjs';
const T=await open({w:800,h:360,dpr:2});const {p}=T;
const ev=(f,...a)=>p.evaluate(f,...a);
const screenName=()=>ev(()=>{const h=document.querySelector('#menu h2');return h?h.textContent:(document.querySelector('#menu .title')?'title':'main');});
const state=()=>ev(()=>({idx:NAV.idx,n:NAV.items.length,scr:NAV.screen,page:NAV.page,fo:[...document.querySelectorAll('.fo8')].length,menu:MODE.menu,focusTxt:(NAV.cur()||{}).textContent&&NAV.cur().textContent.trim().slice(0,24)}));
const SZ=(await ev(()=>({w:innerWidth,h:innerHeight,dpr:devicePixelRatio})));
check('viewport móvil 800x360 CSS @2x (=1600x720 px)',SZ.w==800&&SZ.h==360&&SZ.dpr==2,JSON.stringify(SZ));
// ---- título: un toque entra al menú a la primera
let t0=Date.now();await T.tap(400,180);await p.waitForFunction('NAV.items.length>0',{timeout:3000}).catch(()=>{});
check('toque en el título → menú a la primera',(await screenName())=='main',(Date.now()-t0)+' ms');
let s=await state();check('menú principal: 1 sola opción resaltada (fo8) y es «Jugar»',s.fo==1&&/Jugar/.test(s.focusTxt),JSON.stringify(s));
// ---- cruceta grande y visible
const pad=await ev(()=>{const r=[...document.querySelectorAll('#pad8 .pb')].map(b=>{const q=b.getBoundingClientRect();return [q.width,q.height,q.left>0&&q.right<=innerWidth&&q.top>=0&&q.bottom<=innerHeight];});return {on:document.querySelector('#pad8').classList.contains('on'),r};});
check('cruceta visible con 5 botones ≥ 44×44 px CSS dentro de la pantalla',pad.on&&pad.r.length==5&&pad.r.every(x=>x[0]>=44&&x[1]>=44&&x[2]),JSON.stringify(pad.r.map(x=>x.map(v=>typeof v=='number'?Math.round(v):v))));
// ---- un deslizamiento = UNA opción (rápido, lento, corto, largo, empezando sobre un botón)
const btnPos=async i=>ev(i=>{const e=NAV.items[i];const r=e.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];},i);
const IX=async d=>ev(d=>NAV.items.findIndex(e=>e.dataset.go==d||e.dataset.e5==d),d);
console.log(await ev(()=>NAV.items.map(e=>(e.dataset.go||'')+'|'+e.textContent.trim().slice(0,18)).join(' ; ')));
// v0.9: los menús se desplazan con el dedo (scroll nativo con inercia); un arrastre empezando sobre un botón desplaza y NO lo pulsa
const sc=()=>ev(()=>{const c=document.querySelector('#menu .col');return c?c.scrollTop:0;});
const seq=[['lento 60px',-60,10,30],['rápido 60px',-60,3,4],['largo 150px',-150,12,16]];
for(const [name,dy,n,st] of seq){await ev(()=>{document.querySelector('#menu .col').scrollTop=0;});await sleep(150);const sc0=await screenName();await ev(()=>{window.__ev.length=0;});
 await T.swipe(300,Math.min(300,220-dy/2),0,dy,n,{step:st});await sleep(700);
 const s1=await sc(),cl=await ev(()=>window.__ev.filter(e=>e=='click').length);check(`deslizar arriba (${name}) → desplaza el menú, no activa nada`,s1>20&&(await screenName())==sc0&&cl==0,`scrollTop 0→${Math.round(s1)} · pantalla ${await screenName()} · clics ${cl}`);}
{const a=await sc();await T.swipe(300,120,0,110,8,{step:16});await sleep(600);const b=await sc();check('deslizar abajo → el menú vuelve hacia arriba',b<a-20||a<25,`${Math.round(a)}→${Math.round(b)}`);}
await ev(()=>{document.querySelector('#menu .col').scrollTop=0;});
// ---- toques
await ev(()=>NAV.focus(0));
{const ie=await IX('esp');const [x,y]=await btnPos(ie);await ev(()=>{window.__t0=performance.now();});await T.touch([[x,y],[x+5,y+4],[x+7,y+3]],{step:10,wait:20});await sleep(100);check('toque con temblor de 8 px sobre «Programas especiales» → responde a la primera',(await screenName()).includes('Programas especiales'),await screenName());}
await ev(()=>showMenu('main'));await sleep(200);
{const ie=await IX('esp');const [x,y]=await btnPos(ie);await T.touch([[x,y],[x+5,y+25]],{step:10,wait:20});await sleep(150);check('arrastre de 25 px que empieza sobre un botón → NO lo pulsa',(await screenName())=='main');}
await ev(()=>showMenu('main'));await sleep(200);
{const [x,y]=await btnPos(0);await ev(()=>{window.__lat=null;const o=window.startGame;});
 // latencia: el toque a «Programas especiales» cambia de pantalla en el mismo instante en que se levanta el dedo
 await ev(()=>{window.__up=0;window.__sw=0;window.addEventListener('pointerup',()=>{window.__up=performance.now();},true);new MutationObserver(()=>{if(!window.__sw&&window.__up&&document.querySelector('#menu h2'))window.__sw=performance.now();}).observe(document.querySelector('#menu'),{childList:true,subtree:true});});
 const [x2,y2]=await btnPos(await IX('esp'));await T.tap(x2,y2);await p.waitForFunction('window.__sw',{timeout:3000});const ms=Math.round(await ev(()=>window.__sw-window.__up));check('latencia: del levantar el dedo al cambio de pantalla (medida en la página)',ms<250,ms+' ms');}
// pulsar sobre la cruceta
await ev(()=>showMenu('main'));await sleep(200);
{const c=await T.center('#pad8 .d');const b0=(await state()).idx;await T.tap(...c);await sleep(120);check('cruceta ▼ un toque = 1 opción',(await state()).idx==b0+1,JSON.stringify(await state()));
 await T.tap(...c);await sleep(120);await T.tap(...await T.center('#pad8 .u'));await sleep(120);check('▼ ▼ ▲ → +1 en total (1+1-1)',(await state()).idx==b0+1,JSON.stringify(await state()));
 await ev(i=>NAV.focus(i),await IX('opt'));
 // ✔ elige
 await T.tap(...await T.center('#pad8 .ok'));await sleep(200);check('✔ activa la opción resaltada (Opciones)',(await screenName())=='Opciones',await screenName());}
// ---- Opciones: plató y etapa
{const s0=await state();const k=await ev(()=>NAV.items.findIndex(e=>e.querySelector('label')&&/PLATÓ/.test(e.textContent)));await ev(k=>NAV.focus(k),k);
 const yr=()=>ev(()=>OPT.plato);const y0=await yr();
 const [x,y]=await btnPos(k);await T.swipe(Math.min(x,520)-60,y,120,0,8,{step:14});await sleep(450);
 const y1=await yr();const YEARS=[2007,2011,2014,2017,2019];check('deslizar en horizontal sobre PLATÓ cambia exactamente 1 año',YEARS.indexOf(y1)-YEARS.indexOf(y0)==1,y0+' → '+y1);
 check('tras cambiarlo el foco sigue en la misma fila',(await state()).idx==k,JSON.stringify(await state()));
 await T.tap(...await T.center('#pad8 .r'));await sleep(450);const y2=await yr();check('◀ ▶ de la cruceta: ▶ pasa al año siguiente',YEARS.indexOf(y2)-YEARS.indexOf(y1)==1,y1+' → '+y2);
 await T.tap(...await T.center('#pad8 .l'));await sleep(450);check('◀ vuelve',(await yr())==y1,await yr());
 // tocar directamente un año
 const chip=await ev(()=>{const b=[...NAV.cur().querySelectorAll('.tbtn')].find(b=>+b.dataset.y==2014);const r=b.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];});await T.tap(...chip);await sleep(350);check('tocar el año 2014 → plató 2014 a la primera',(await yr())==2014,await yr());
 // volver a 2007 para el resto
 await ev(()=>{OPT.plato=OPT.etapa=2007;saveOpt();applyPlato(2007);showMenu('opt');});await sleep(300);
 // deslizar verticalmente sobre los chips del plató NO los pulsa
 const k2=await ev(()=>NAV.items.findIndex(e=>e.querySelector('label')&&/PLATÓ/.test(e.textContent)));await ev(k=>NAV.focus(k),k2);
 const chip2=await ev(()=>{const b=[...NAV.cur().querySelectorAll('.tbtn')].find(b=>+b.dataset.y==2017);const r=b.getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2];});
 await T.swipe(chip2[0],chip2[1],0,-60,6,{step:14});await sleep(300);check('deslizar sobre un chip de año → no lo pulsa (plató sigue en 2007)',(await ev(()=>OPT.plato))==2007);}
// ---- páginas de texto: arrastre 1:1, sin pulsar «Volver»
await ev(()=>showMenu('how'));await sleep(250);
{const s1=await state();check('pantalla de texto = modo página',s1.page,JSON.stringify(s1));
 const m=await ev(()=>{const c=NAV.col();return [c.scrollHeight,c.clientHeight,c.scrollTop];});
 const btn=await ev(()=>{const r=document.querySelector('#menu .col .mbtn').getBoundingClientRect();return [r.left+r.width/2,r.top+r.height/2,r.top];});
 const y0=Math.min(Math.max(btn[1],40),320);await T.swipe(400,200,0,-80,8,{step:14});await sleep(250);
 const m2=await ev(()=>NAV.col().scrollTop);check('arrastrar 80 px desplaza 55–90 px (80 menos la holgura táctil del navegador) el texto (sin inercia) y no sale de la pantalla',m[0]>m[1]?(m2>=55&&m2<=90):true,`scrollTop ${m[2]}→${m2} (alto ${m[0]}/${m[1]})`);
 check('sigue en «Cómo se juega»',(await screenName())=='Cómo se juega',await screenName());
 await T.tap(...await T.center('#pad8 .ok'));await sleep(250);check('✔ (Volver) regresa al menú principal',(await screenName())=='main');}
// ---- el tablero 3D: tocar vale, deslizar no
await ev(()=>{MODE.menu=false;menu.classList.add('hidden');window.__tp=0;(0,eval)('TAP=(v)=>{window.__tp=(window.__tp||0)+1;}');});
await T.swipe(400,200,0,-120,10,{step:14});await sleep(150);check('lienzo 3D: deslizar no dispara toques',(await ev(()=>window.__tp))==0,'toques '+await ev(()=>window.__tp));
await T.tap(400,200);await sleep(150);check('lienzo 3D: un toque cuenta 1 vez',(await ev(()=>window.__tp))==1,'toques '+await ev(()=>window.__tp));
// ---- 30 fps
const fps=await ev(()=>new Promise(r=>{let n=0;const t0=performance.now();(function f(){n++;if(performance.now()-t0<2000)requestAnimationFrame(f);else r(n/2);})();}));
check('límite de 30 fotogramas/s',fps<=31,fps.toFixed(1)+' fps');
check('sin errores de JavaScript',T.errs.length==0,T.errs.join(' | '));
await T.close();
console.log(check.fail?`\n${check.fail} PRUEBAS FALLAN`:'\nTODAS LAS PRUEBAS PASAN');process.exit(check.fail?1:0);
