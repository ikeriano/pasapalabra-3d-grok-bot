// Captura la pantalla del plató (bola de letras + título) en varias etapas y planos. Uso: node shot_bola.mjs <sufijo>
import {open,sleep} from './lib.mjs';
const suf=process.argv[2]||'despues',OUT=process.env.SHOTS||'/workspace/pasa3d_08/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;
await p.evaluate(()=>{MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');});
for(const y of [2007,2011,2014,2019]){for(const sh of ['rosco','wide']){
 await p.evaluate((y,sh)=>{OPT.etapa=OPT.plato=y;applyPlato(y);cut(sh);},y,sh);await sleep(1500);
 await p.screenshot({path:`${OUT}/bola_${suf}_${y}_${sh}.jpg`,type:'jpeg',quality:82});}}
console.log('errs',T.errs);await T.close();
