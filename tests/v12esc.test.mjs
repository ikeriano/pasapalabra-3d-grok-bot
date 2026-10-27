// v0.12 · La Escalera de Telecinco alineada con la Pirámide (90 s, +1 s/palabra, fallo→compañero, empieza el naranja)
import {open,sleep,check} from './lib.mjs';
const SH='/workspace/pasa3d_12/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
await T.tap(...await T.center('#menu .title'));await sleep(900);
await ev(()=>{MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');
 OPT.etapa=OPT.plato=2007;applyPlato(2007);window.SPEED=1;const hs=hostSay;window.__hs=[];window.hostSay=function(h,...r){window.__hs.push(String(h));return hs(h,...r);};
 GAME.sec=[0,0];GAME.ac=[0,0];window.__t0=performance.now();window.__t=0;window.__r=0;
 window.__done=DBG.escalera(++RUN).then(()=>{window.__t=1;});});
const ESC=await ev(()=>ORIG.ESC);let shots=0,seen=new Set();
for(let i=0;i<400&&!(await ev(()=>window.__t));i++){
 await sleep(250);
 const st=await ev(()=>({ask:!!ASK,hs:window.__hs.slice(-1)[0]||''}));
 if(st.ask){
  const def=st.hs.replace(/<[^>]+>/g,'').replace(/\s*\(\d+ letras\)\s*$/,'');
  let w=null;for(const s of ESC)for(const e of s)if(def==e[2])w=e[0];
  const n=seen.size;seen.add(def);
  if(shots<3&&w){ if(shots==1)await p.screenshot({path:`${SH}/v12_escalera_${shots}.jpg`,type:'jpeg',quality:86}); if(shots==0)await p.screenshot({path:`${SH}/v12_escalera_0.jpg`,type:'jpeg',quality:86});shots++;}
  const wrong=seen.size%4==0;
  await ev((a)=>{askEnd(a)},w?(wrong?'zzz':w):'zzz');
  await sleep(200);
 }
 if(i>300)break;
}
await sleep(500);
const r=await ev(()=>({sec:GAME.sec.slice(),ac:GAME.ac.slice(),hs:window.__hs,done:window.__t}));
const first=r.hs.findIndex(h=>/ACIERTOS/.test(h));
check('La Escalera termina',r.done==1,JSON.stringify(r.sec));
check('el texto de apertura anuncia anagramas, 90 s y compañero',r.hs.some(h=>/anagrama/.test(h)&&/90 segundos/.test(h)&&/compañero/.test(h)),'');
check('un fallo pasa al compañero',r.hs.some(h=>/pasa a tu compañero/.test(h)),'');
check('segundos acumulados = 1 por palabra (no 5)',r.sec[0]==r.ac[0],JSON.stringify(r));
check('sin errores de JavaScript',T.errs.length==0,T.errs.join(' | '));
console.log(JSON.stringify(r.sec),JSON.stringify(r.ac));
console.log(check.fail?`\n${check.fail} FALLAN`:'\nTODAS PASAN');await T.close();process.exit(check.fail?1:0);
