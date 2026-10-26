// Captura cada cortinilla de 2019 a varios tiempos. Uso: node shot_cort.mjs <sufijo> [ids]
import {open,sleep} from './lib.mjs';
const suf=process.argv[2]||'a',ids=(process.argv[3]||'pistaB,u4,sopa,donde,roscoB').split(','),OUT=process.env.SHOTS||'/workspace/pasa3d_09/hdr';
const TS=(process.env.TS||'0.4,1.0,1.8,2.8,3.8,4.6').split(',').map(Number);
const T=await open({w:640,h:288,dpr:1});const p=T.p;
await p.evaluate(()=>{MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');OPT.etapa=OPT.plato=2019;applyPlato(2019);cut('wide');});
await sleep(1200);
for(const id of ids){
 await p.evaluate(id=>{window.__c=makeCort(id,true);window.__c.setT(0);},id);
 for(const t of TS){await p.evaluate(t=>__c.setT(t),t);await sleep(250);await p.screenshot({path:`${OUT}/${suf}_${id}_${t}.jpg`,type:'jpeg',quality:80});}
 await p.evaluate(()=>__c.free());}
console.log('errs',T.errs);await T.close();
