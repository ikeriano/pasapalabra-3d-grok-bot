// Cabeceras: la música de cada cabecera suena ENTERA (el programa no avanza hasta que termina)
import {open,sleep,check} from './lib.mjs';
const T=await open({w:640,h:288,dpr:1});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
await T.tap(...await T.center('#menu .title'));await sleep(900);
await ev(()=>{MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');});
const cases=(process.env.CASES||'2019:u4:9,2019:rosco:4,2007:escalera:6.5,2014:u4:5.5').split(',').map(x=>x.split(':'));
for(const [y,id,min] of cases){
 await ev((y,id)=>{OPT.etapa=OPT.plato=+y;applyPlato(+y);window.__t=performance.now();window.__d=0;const c=[];window.__a=[];const A=Audio.prototype.play;if(!window.__pp){window.__pp=1;Audio.prototype.play=function(){window.__cur=this;return A.apply(this,arguments);};}
  playCort(id,++RUN).then(()=>{__d=performance.now()-__t;}).catch(()=>{__d=-1;});},y,id);
 await sleep(1500);const pl=await ev(()=>({src:window.__cur&&window.__cur.src.split('/').pop(),paused:window.__cur&&window.__cur.paused}));
 await p.waitForFunction('window.__d!==0',{timeout:120000});
 const r=await ev(()=>({d:__d,ended:__cur?__cur.ended||__cur.paused:null,dur:__cur&&__cur.duration}));
 check(`${y} ${id}: suena ${pl.src} y el programa espera a que termine (≥${min} s)`,pl.paused===false&&r.d/1000>=+min-.3,`${(r.d/1000).toFixed(1)} s, duración audio ${r.dur}`);
}
check('sin errores de JavaScript',T.errs.length==0,T.errs.join(' | '));
console.log(check.fail?`\n${check.fail} FALLAN`:'\nTODAS PASAN');await T.close();process.exit(check.fail?1:0);
