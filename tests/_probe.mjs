import {open,sleep} from './lib.mjs';
const T=await open({w:800,h:360,dpr:2});const p=T.p;
await p.evaluate(()=>{OPT.vozp=0;OPT.sfx=0;OPT.mus=0;window.SPEED=12;OPT.bote=60000;DBG.go12('a12:play:2026');});
let last='';
for(let i=0;i<900;i++){await sleep(120);
 const r=await p.evaluate(()=>{const mb=[...document.querySelectorAll('.mbtn')].filter(e=>e.offsetParent);const s=mb.map(e=>e.textContent+(e.onpointerdown?'*':'-')).join('|')+' TAP='+typeof TAP+' menu='+MODE.menu;
  try{askEnd('xx');}catch(e){}
  const m=mb.filter(e=>e.onpointerdown);if(m.length)try{m[Math.floor(Math.random()*m.length)].onpointerdown({preventDefault(){},stopPropagation(){}});}catch(e){}
  if(typeof TAP==='function')try{TAP(Math.floor(Math.random()*3));}catch(e){}return s;});
 if(r!==last&&i%10==0){console.log(i,r);last=r;}}
await p.screenshot({path:'/tmp/pp.jpg'});console.log(T.errs);await T.close();
