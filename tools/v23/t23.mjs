import {open,sleep} from './lib.mjs';import fs from 'fs';
const OUT=process.argv[2];fs.mkdirSync(OUT,{recursive:true});let n=0;
const T=await open({w:1600,h:720});const p=T.p;const shot=async(l)=>{await p.screenshot({path:`${OUT}/${String(n++).padStart(3,'0')}_${l}.jpg`,type:'jpeg',quality:70});};
await p.evaluate(()=>showMenu('main'));await sleep(800);await shot('main_off');
await p.evaluate(()=>showMenu('opt'));await sleep(800);await shot('opt');
await p.evaluate(()=>{OPT.inv23=1;showMenu('main');});await sleep(800);await shot('main_on');
await p.evaluate(()=>showMenu('ent23'));await sleep(800);await shot('ent');
await p.evaluate(()=>{setA3(2026);showMenu('ent23');});await sleep(800);await shot('ent2026');
await p.evaluate(()=>showMenu('inv23'));await sleep(800);await shot('inv');
// entrenamiento: Una de cuatro 2026
await p.evaluate(()=>{E23.go23('x23:tr:0');});for(let i=0;i<8;i++){await sleep(2500);await shot('tr_u4');}
for(const k of ['x23:inv:0','x23:inv:1','x23:inv:2','x23:esc:0','x23:esc:1','x23:esc:2','x23:esc:3']){await p.evaluate(k=>{E23.go23(k);},k);for(let i=0;i<4;i++){await sleep(3000);await shot(k.replace(/:/g,'_'));}}
console.log('errs',JSON.stringify(T.errs.slice(0,8)));await T.close();process.exit(0);
