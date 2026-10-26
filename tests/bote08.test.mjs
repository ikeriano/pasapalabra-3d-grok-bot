// Final del bote: completar el rosco gana el bote y TERMINA el programa (premio, aplausos, despedida, créditos, menú)
import {open,sleep,check} from './lib.mjs';
const SHOTS=process.env.SHOTS||'/workspace/pasa3d_08/shots';
const T=await open({w:640,h:288,dpr:1});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
await T.tap(...await T.center('#menu .title'));await sleep(900);
for(const y of (process.env.YS||'2019,2007,2014').split(',').map(Number)){
 await ev(y=>{OPT.etapa=y;OPT.plato=y;OPT.bote=123000;saveOpt();MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');GAME.res=[25,3];window.__rid=++RUN;window.__fin=0;window.__t0=performance.now();window.__log=[];
  const _f=sfx;bote(__rid,true).then(()=>{__fin=performance.now()-__t0;}).catch(e=>{__fin=-1;window.__err=String(e);});},y);
 await sleep(5500);
 const s1=await ev(()=>({on:!!document.querySelector('#premio8.on'),am:(document.querySelector('#premio8 .am')||{}).textContent,t1:(document.querySelector('#premio8 .t1')||{}).textContent}));
 check(`${y}: pantalla de premio con el importe`,s1.on&&/123\.000/.test(s1.am),JSON.stringify(s1));
 if(y==2019){await p.screenshot({path:SHOTS+'/bote_premio_2019.jpg',type:'jpeg',quality:80});}
 if(y==2007){await p.screenshot({path:SHOTS+'/bote_premio_2007.jpg',type:'jpeg',quality:80});}
 await p.waitForFunction('window.__fin!==0',{timeout:240000});
 const r=await ev(()=>({fin:__fin,err:window.__err,bote:OPT.bote,done:GAME.boteDone,el:!!document.querySelector('#premio8')}));
 check(`${y}: el bote termina, se reinicia a 60.000 € y queda marcado el fin de programa`,r.fin>0&&r.bote==60000&&r.done===true,JSON.stringify(r)+' · '+Math.round(r.fin/1000)+' s');
 // despedida: créditos y vuelta al menú, sin sumar bote
 await ev(()=>{window.__d=0;despedida(__rid).then(()=>{__d=1;}).catch(e=>{__d=2;window.__de=String(e&&e.stack||e).slice(0,300);});});
 await sleep(1500);await ev(()=>{const k=document.querySelector('#skip');if(k&&k.onpointerdown)k.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}));});
 await p.waitForFunction('window.__d!==0&&!document.querySelector("#menu").classList.contains("hidden")',{timeout:240000}).catch(()=>{});
 const d=await ev(()=>({d:__d,menu:!menu.classList.contains('hidden'),bote:OPT.bote,done:GAME.boteDone,de:window.__de}));
 check(`${y}: tras la despedida vuelve al menú, sin más programa y el bote sigue en 60.000 €`,d.menu&&d.bote==60000&&!d.done,JSON.stringify(d));
}
check('sin errores de JavaScript',T.errs.length==0,T.errs.join(' | '));
console.log(check.fail?`\n${check.fail} PRUEBAS FALLAN`:'\nTODAS LAS PRUEBAS PASAN');await T.close();process.exit(check.fail?1:0);
