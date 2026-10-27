import {open,sleep} from './lib.mjs';
const OUT='/workspace/pasa3d_12/shots';
const T=await open({w:960,h:720,dpr:1});const p=T.p;
const g=+process.argv[2];const tag=process.argv[3]||'clasico';const sp=+process.argv[4]||1;
await p.evaluate(sp=>{OPT.vozp=0;OPT.sfx=0;OPT.mus=0;window.SPEED=sp;},sp);
await p.evaluate(g=>{scene9(async rid=>{PC12.newTeams();GAME.sec=[0,0];await PC12.juego(rid,g);},{back:'main'});},g);
const times=(process.argv[5]||'3000,5000,8000,12000,16000').split(',').map(Number);let t0=0;
for(const [k,t] of times.entries()){await sleep(t-t0);t0=t;
 if(k%2==1)await p.evaluate(()=>{try{askEnd('xx');}catch(e){}});
 await p.screenshot({path:`${OUT}/v12_${tag}_j${g}_${k}.jpg`,type:'jpeg',quality:86});}
console.log(T.errs);await T.close();
