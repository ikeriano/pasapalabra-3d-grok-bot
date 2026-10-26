// v0.9: la bola de letras gira de forma continua (~1 vuelta/7 s). Mide el ángulo y saca 2 capturas JPG separadas 1 s.
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_09/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;
await p.evaluate(()=>{MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');SHOTS.scr9={p:V3(0,3.6,-1.5),l:V3(0,3.6,-11),f:38,dr:0};setInterval(()=>cut('scr9'),200);});
await sleep(1500);
const ang=()=>p.evaluate(()=>BOLA9.ang);
const pos=()=>p.evaluate(()=>{const it=P.ball.items;return it.slice(0,6).map(x=>[x.p.x,x.p.z]);});
const a0=await ang(),p0=await pos();await p.screenshot({path:OUT+'/bola09_t0.jpg',type:'jpeg',quality:84});
await sleep(1000);const a1=await ang(),p1=await pos();await p.screenshot({path:OUT+'/bola09_t1.jpg',type:'jpeg',quality:84});
let d=(a1-a0+2*Math.PI)%(2*Math.PI);
console.log('ángulo',a0.toFixed(3),a1.toFixed(3),'Δ',(d*180/Math.PI).toFixed(1),'° (capturas separadas ≈1,3 s por el coste del screenshot)');
check('la bola gira (Δ≥10°)',d>.17);
// velocidad medida sin capturas: 2 s
const b0=await ang();await sleep(2000);const b1=await ang();const dd=(b1-b0+2*Math.PI)%(2*Math.PI);
check('velocidad ≈ 10,9°/s (ω=0,19 rad/s medido en el programa real: 1 vuelta/33 s)',Math.abs(dd/2*180/Math.PI-10.9)<2,(dd/2*180/Math.PI).toFixed(1)+'°/s');
// regularidad: 20 muestras cada 100 ms
const xs=[];for(let i=0;i<15;i++){xs.push(await ang());await sleep(100);}
const df=xs.slice(1).map((v,i)=>((v-xs[i]+2*Math.PI)%(2*Math.PI))*180/Math.PI);
check('giro regular (sin sacudidas): paso de 100 ms entre 0,5 y 2,5°',df.every(v=>v>.5&&v<2.5),df.map(v=>v.toFixed(1)).join(' '));
console.log('errs',T.errs);await T.close();process.exit(check.fail?1:0);
