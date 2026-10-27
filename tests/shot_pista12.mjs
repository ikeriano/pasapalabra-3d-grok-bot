import {open,sleep} from './lib.mjs';
const y=process.argv[2];
const T=await open({w:800,h:360,dpr:2});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
await ev(()=>{OPT.vozp=0;OPT.mute5=1;OPT.sfx=0;OPT.mus=0;window.SPEED=12;OPT.bote=60000;});
await ev(js=>{eval(js)},`DBG.go12("a12:play:${y}")`);
let n=0;
for(let i=0;i<900&&n<2;i++){await sleep(150);
 const st=await ev(()=>({t:document.body.innerText,cab:!!(P.cab12&&P.cab12.visible)}));
 if(/PULSAR|turno pasa/.test(st.t)){await p.screenshot({path:`/workspace/pasa3d_12/shots/v12_pista_${y}_${n}.jpg`,type:'jpeg',quality:84});console.log(y,'pista musical captura',n,'cabinas visibles:',st.cab);n++;await sleep(3000);}
 await ev(()=>{const mb=[...document.querySelectorAll('.mbtn')].filter(e=>e.offsetParent&&e.onpointerdown);if(mb.length)mb[Math.floor(Math.random()*mb.length)].onpointerdown({preventDefault(){},stopPropagation(){}});});}
console.log(y,'listo',n);await T.close();process.exit(0);
