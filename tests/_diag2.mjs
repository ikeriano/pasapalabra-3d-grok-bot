import {open,sleep} from './lib.mjs';
const T=await open({w:800,h:360,dpr:1});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
await ev(()=>{OPT.vozp=0;OPT.mute5=1;OPT.sfx=0;OPT.mus=0;window.SPEED=12;OPT.bote=60000;});
await ev(js=>{eval(js)},process.argv[2]);
let stuck=0;
for(let i=0;i<500;i++){await sleep(150);
 const st=await ev(()=>({m:MODE.menu,t:document.body.innerText.slice(0,70).replace(/\n/g,' '),n:[...document.querySelectorAll('.mbtn')].filter(e=>e.offsetParent&&e.onpointerdown).length}));
 if(i>5&&st.m){console.log('FIN',i);break;}
 // jugador: solo pulsa y responde cuando hay botones (como una persona)
 if(st.n){ if(/turno pasa/.test(st.t))stuck++; else stuck=0;
   if(stuck<6) await ev(()=>{const mb=[...document.querySelectorAll('.mbtn')].filter(e=>e.offsetParent&&e.onpointerdown);mb[Math.floor(Math.random()*mb.length)].onpointerdown({preventDefault(){},stopPropagation(){}});});
   else {console.log('STUCK',i,st.t);console.log(JSON.stringify(await ev(()=>{const out=[];const e=[...document.querySelectorAll('.mbtn')].filter(e=>e.offsetParent&&e.onpointerdown);for(const b of e){let r;try{b.onpointerdown({preventDefault(){},stopPropagation(){}});r='click '+b.textContent}catch(x){r=String(x)}out.push(r);}return out;})));await sleep(2000);console.log('después:',JSON.stringify(await ev(()=>document.body.innerText.slice(0,100))));break;}}
 else stuck=0;
 await ev(()=>{try{askEnd('xx');}catch(e){}});}
await T.close();process.exit(0);
