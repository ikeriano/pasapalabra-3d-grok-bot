import {open,sleep} from './lib.mjs';
const T=await open({w:800,h:360,dpr:1});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
await ev(()=>{OPT.vozp=0;OPT.mute5=1;OPT.sfx=0;OPT.mus=0;window.SPEED=12;OPT.bote=60000;});
await ev(js=>{eval(js)},process.argv[2]);
let last='';const t0=Date.now();
for(let i=0;i<340;i++){await sleep(120);const m=await ev(()=>MODE.menu);if(i>5&&m){console.log('FIN',i);break;}
 await ev(()=>{try{askEnd(Math.random()<.5?'pasapalabra':'xx');}catch(e){}if(typeof TAP==='function')try{TAP(Math.floor(Math.random()*3));}catch(e){}const mb=[...document.querySelectorAll('.mbtn')].filter(e=>e.offsetParent&&e.onpointerdown);if(mb.length)try{mb[Math.floor(Math.random()*mb.length)].onpointerdown({preventDefault(){}});}catch(e){}});
 if(i>=170&&i%40==0){console.log(i,JSON.stringify(await ev(()=>({t:document.body.innerText.replace(/\n/g,' | ').slice(0,260),b:[...document.querySelectorAll('.mbtn')].map(e=>e.textContent+':'+!!e.offsetParent),pt:typeof TAP,rid:typeof RUN!=='undefined'?RUN:null}))));if(i==280){console.log('CLICK',JSON.stringify(await ev(()=>{const e=[...document.querySelectorAll('.mbtn')][1];let r;try{e.onpointerdown({preventDefault(){},stopPropagation(){}});r='ok'}catch(x){r=String(x)}return [r,String(e.onpointerdown).slice(0,200)]})));}if(i==330)await p.screenshot({path:'/workspace/pasa3d_12/logs/stuck.jpg'});}
 if(0){const s=await ev(()=>(document.querySelector('#say,.say,#hostsay')||{}).textContent||document.body.innerText.slice(-120));const k=s.slice(0,90);if(k!=last){console.log(i,((Date.now()-t0)/1000|0)+'s',k.replace(/\n/g,' '));last=k;}}}
await T.close();process.exit(0);
