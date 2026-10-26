// v0.9: deslizar con el dedo para desplazar menús/listas (CDP Input.dispatchTouchEvent), sin disparar clic; tocar elige.
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_09/shots';
const T=await open({w:800,h:360,dpr:2});const {p}=T;const ev=(f,...a)=>p.evaluate(f,...a);
await T.tap(400,180);await p.waitForFunction('NAV.items.length>0',{timeout:4000});
const info=()=>ev(()=>{const c=document.querySelector('#menu .col');return c?{st:c.scrollTop,sh:c.scrollHeight,ch:c.clientHeight,h2:(document.querySelector('#menu h2')||{}).textContent||'main',ta:getComputedStyle(c).touchAction,ov:getComputedStyle(c).overflowY}:null;});
const SCR=process.env.SCR?process.env.SCR.split(','):['main','opt','esp','mejor','mejor_botes','mejor_roscos','mejor_momentos','extras9','tomas9','publi9','hist','cred','how','museo','mono','normas10','promos'];
let n=0;
for(const s of SCR){await ev(s=>showMenu(s),s);await sleep(350);const i0=await info();if(!i0){check('pantalla '+s+' existe',false);continue;}
 const sc=i0.h2;
 if(i0.sh<=i0.ch+4){check(`${s} (${sc}): cabe sin scroll`,true,`${i0.sh}/${i0.ch}`);continue;}
 await ev(()=>{window.__ev.length=0;});
 // empieza el dedo SOBRE un botón de la columna y arrastra hacia arriba
 const r=await ev(()=>{const c=document.querySelector('#menu .col');const b=c.querySelector('.mbtn,.orow,.mtext')||c;const q=b.getBoundingClientRect();return [Math.min(q.left+q.width/2,520),Math.max(60,Math.min(q.top+q.height/2,280))];});
 await T.swipe(r[0],Math.min(r[1],300),0,-150,10,{step:16});await sleep(900);
 const i1=await info();const clicks=await ev(()=>window.__ev.filter(e=>e=='click').length);
 check(`${s} (${sc}): arrastrar con el dedo desplaza la lista`,i1.st>i0.st+30&&i1.h2==i0.h2,`scrollTop ${Math.round(i0.st)}→${Math.round(i1.st)} de ${i1.sh-i1.ch} · touch-action ${i1.ta} · clics ${clicks}`);
 check(`${s}: el arrastre no activa ni cambia de pantalla`,i1.h2==i0.h2&&clicks==0);
 // inercia: el CDP headless no genera 'fling'; se comprueba lo que la hace posible en el WebView Android (scroll nativo sin preventDefault)
 await ev(()=>{document.querySelector('#menu .col').scrollTop=0;window.__dp=[];document.addEventListener('touchmove',e=>__dp.push(e.defaultPrevented),{passive:true});});await sleep(200);
 await T.swipe(r[0],Math.min(r[1],300),0,-90,6,{step:8});await sleep(300);const dp=await ev(()=>window.__dp.slice());const cs=await ev(()=>{const c=document.querySelector('#menu .col'),k=getComputedStyle(c);return k.overflowY+'/'+k.touchAction;});
 check(`${s}: scroll nativo (inercia del WebView): ningún touchmove con preventDefault`,dp.length>0&&dp.every(x=>!x)&&/auto|scroll/.test(cs),`${dp.length} touchmove · ${cs} (la inercia en sí no se puede medir en Chromium headless)`);
 // hacia abajo
 const c=(await info()).st;
 await T.swipe(r[0],Math.min(r[1],200),0,120,8,{step:16});await sleep(700);const d=(await info()).st;check(`${s}: arrastrar hacia abajo devuelve la lista`,d<c-20||c<25,`${Math.round(c)}→${Math.round(d)}`);
 n++;
 if(['mejor_botes','opt','main'].includes(s)){await ev(()=>{document.querySelector('#menu .col').scrollTop=60;});await sleep(150);await p.screenshot({path:`${OUT}/touch09_${s}.jpg`,type:'jpeg',quality:82});}
}
// tocar sigue funcionando (al levantar el dedo)
await ev(()=>showMenu('main'));await sleep(300);
{const [x,y]=await T.center('[data-go=opt]').then(c=>c||[0,0]);await ev(()=>document.querySelector('[data-go=opt]').scrollIntoView({block:'center'}));await sleep(200);const c2=await T.center('[data-go=opt]');await T.tap(...c2);await sleep(300);check('tocar «Opciones» abre Opciones',(await info()).h2=='Opciones',(await info()).h2);}
check('arrastrar la lista empezando sobre un deslizador NO cambia su valor',await ev(()=>OPT.pad8)==1);
// slider: arrastrar horizontalmente sobre el control cambia el valor, vertical desplaza
await ev(()=>{const c=document.querySelector('#menu .col');c.scrollTop=0;});await sleep(200);
{const q=await ev(()=>{const i=document.querySelector('[data-o9=conversa]');if(i)i.scrollIntoView({block:'center'});const r=(i||document.querySelector('input[type=range]')).getBoundingClientRect();return [r.left,r.top+r.height/2,r.width];});await sleep(200);
 const q2=await ev(()=>{const r=document.querySelector('[data-o9=conversa]').getBoundingClientRect();return [r.left,r.top+r.height/2,r.width];});
 const v0=await ev(()=>document.querySelector('[data-o9=conversa]').value);await T.swipe(q2[0]+4,q2[1],q2[2]-8,0,8,{step:16});await sleep(250);const v1=await ev(()=>document.querySelector('[data-o9=conversa]').value);
 check('deslizador: arrastrar en horizontal cambia el valor',v0!=v1,`${v0}→${v1}`);}
// cruceta (alternativa) sigue funcionando
{const st0=(await ev(()=>NAV.idx));await T.tap(...await T.center('#pad8 .d'));await sleep(150);const st1=await ev(()=>NAV.idx);check('cruceta ▼ sigue funcionando',st1!=st0,st0+'→'+st1+' de '+await ev(()=>NAV.items.length));}
// ocultar la cruceta desde Opciones
await ev(()=>{const i=document.querySelector('[data-o9=pad8]');i.value=0;i.dispatchEvent(new Event('input',{bubbles:true}));});await sleep(150);
check('opción «Cruceta de botones» No → cruceta oculta',await ev(()=>getComputedStyle(document.querySelector('#pad8')).display=='none'));
await ev(()=>{const i=document.querySelector('[data-o9=pad8]');i.value=1;i.dispatchEvent(new Event('input',{bubbles:true}));});
console.log('errs',T.errs);await T.close();process.exit(check.fail?1:0);
