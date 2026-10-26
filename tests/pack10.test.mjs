// v0.10: los clips empaquetados (snd/pk/*.bin) suenan igual que los sueltos. Usar con WWW=<copia de preparación del APK>.
import {open,check,sleep} from './lib.mjs';
const T=await open({w:800,h:360});const p=T.p;
check('el índice de clips empaquetados está activo',await p.evaluate(()=>!!window.PK10&&Object.keys(PK10).length>=3));
const r=await p.evaluate(async()=>{const out=[];for(const d of Object.keys(PK10)){const n=PK10[d].n.split(',');for(const nm of [n[0],n[Math.floor(n.length/2)],n[n.length-1]]){
  const a=new Audio(d+nm+'.ogg');const meta=new Promise(res=>{a.onloadedmetadata=()=>res(a.duration);a.onerror=()=>res(-1);setTimeout(()=>res(-2),6000);});a.muted=true;a.play().catch(()=>{});const du=await meta;
  const t0=Date.now();while(a.currentTime<=0&&Date.now()-t0<3000)await new Promise(r=>setTimeout(r,50));out.push([d+nm,du,a.currentTime>0,a.src.startsWith('blob:')]);a.pause();}}return out;});
for(const [k,du,pl,bl] of r)check('suena '+k,du>0.3&&du<30&&pl&&bl,`dur ${du?.toFixed?.(2)} s`);
check('sin errores de página',T.errs.length==0,T.errs.join('|'));
await T.close();process.exit(check.fail?1:0);
