import {open,sleep} from './lib.mjs';
const T=await open({w:800,h:360,dpr:2});const p=T.p;
await p.evaluate(()=>{OPT.etapa=OPT.plato=2019;MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');});
for(const f of ['pVF','pPares','pIntruso','pLetra','pFlash']){
 await p.evaluate(`setTimeout(()=>{DBG.${f}(++RUN).catch(()=>{})},0);0`);
 for(const s of [9,16]){await sleep(s==9?9000:7000);await p.screenshot({path:`/workspace/pasa3d_09/shots/x9_previa_${f}_${s}.jpg`,type:'jpeg',quality:84});}
 await p.evaluate(()=>{RUN++;});await sleep(500);}
console.log('errs',T.errs.length);await T.close();
