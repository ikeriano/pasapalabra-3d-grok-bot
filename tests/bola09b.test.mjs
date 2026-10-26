// v0.9: la bola son letras individuales repartidas por igual (Fibonacci): 4 ángulos de giro sin manchas, JPG para comparar con el real.
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_09/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;
await p.evaluate(()=>{MODE.menu=false;menu.classList.add('hidden');document.body.classList.add('ingame');SHOTS.scr9={p:V3(0,3.6,-1.5),l:V3(0,3.6,-11),f:38,dr:0};setInterval(()=>cut('scr9'),200);
 const n0=performance.now.bind(performance);window.__off=0;performance.now=()=>n0()+window.__off;});
await sleep(1500);
const st=await p.evaluate(()=>({n:P.ballL9.length,tex:!!P.ball9.material.map,op:P.ball9.material.opacity}));
check('150 letras individuales y cuerpo sin textura (sin continentes)',st.n==150&&!st.tex,JSON.stringify(st));
// uniformidad: cuadrícula de 6 casquetes iguales (área igual): conteos de letras
const u=await p.evaluate(()=>{const c=new Array(12).fill(0);for(const q of P.ballL9){const n=q.userData.n;const i=Math.min(5,Math.floor((n.y+1)/2*6)),j=n.x>0?0:1;c[i*2+j]++;}return c;});
const mean=u.reduce((a,b)=>a+b)/u.length,dev=Math.max(...u.map(x=>Math.abs(x-mean)))/mean;
check('reparto uniforme por zonas (máx. desviación <20 %)',dev<.2,u.join(',')+' dev '+dev.toFixed(2));
const tam=await p.evaluate(()=>{const s=P.ballL9.map(q=>q.userData.sz);return [Math.min(...s),Math.max(...s)];});
check('mismo tamaño aproximado (±12 %)',tam[1]/tam[0]<1.25,tam.map(x=>x.toFixed(2)).join('–'));
for(let k=0;k<4;k++){const per=await p.evaluate(()=>BOLA9.periodo);await p.evaluate(o=>{window.__off=o;},k*per/4*1000);await sleep(500);await p.screenshot({path:`${OUT}/bola09_ang${k}.jpg`,type:'jpeg',quality:86});}
console.log('errs',T.errs);await T.close();process.exit(0);
