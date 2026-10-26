// v0.11: Lo mejor (botes/roscos/momentos nuevos en 3D), rosco famoso, tomas falsas, programa con las 3 opciones
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_11/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
const cons=[];p.on('console',m=>{if(m.type()=='error')cons.push(m.text().slice(0,200));});
const shot=n=>p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:84});
await ev(()=>{OPT.vozp=0;OPT.mute5=1;OPT.sfx=0;OPT.mus=0;OPT.etapa=OPT.plato=2019;window.SPEED=12;});
const n=await ev(()=>({b:D9.botes.length,r:D9.roscos.length,m:D9.momentos.length,t:D9.tomas.length,lv:LM11.LV.length}));
check('contenido ampliado: botes≥26, roscos≥10, momentos≥20, tomas≥12, 7 niveles',n.b>=26&&n.r>=10&&n.m>=20&&n.t>=12&&n.lv>=7,JSON.stringify(n));
async function corre(nombre,js,shots=[],max=700){await p.evaluate(`void (${js})`);let ini=false,fin=false,k=0;
 for(let i=0;i<max&&!fin;i++){await sleep(250);const m=await ev(()=>MODE.menu);if(!ini){if(!m)ini=true;continue;}
  if(shots.includes(k))await shot('v11_'+nombre+'_'+k);k++;await ev(()=>{if(typeof TAP==='function')TAP(Math.floor(Math.random()*3));});fin=m;}
 check(nombre+': empieza y termina',ini&&fin,'ini='+ini+' fin='+fin);}
await ev(()=>{window.SPEED=6;});
const nb=await ev(()=>D9.botes.length),nr=await ev(()=>D9.roscos.length),nm=await ev(()=>D9.momentos.length);
for(const i of [nb-1,nb-5,nb-12])await corre('bote'+i,`LM11.go('b:${i}')`,[8,20]);
for(const i of [nr-1,nr-3])await corre('rosco'+i,`LM11.go('r:${i}')`,[8,20]);
for(const i of [nm-1,nm-4,nm-9,nm-14])await corre('momento'+i,`LM11.go('m:${i}')`,[6,14,24]);
await corre('especial_completo',`LM11.go('todo')`,[]);
for(let i=4;i<7;i++)await corre('jugar'+i,`LM11.jugar(${i})`,[],1500);
// tomas falsas
const nt=await ev(()=>D9.tomas.length);for(const i of [nt-1,nt-6,nt-12])await corre('toma'+i,`DBG.x9go('x9:toma:${i}')`,[6,14]);
await ev(()=>showMenu('tomas9'));await sleep(300);
const tx=await ev(()=>document.querySelector('#menu').innerText);check('menú de tomas falsas con aviso de inventadas',/INVENTADAS/.test(tx));await shot('v11_tomas_menu');
check('sin errores de página/consola',T.errs.length==0&&cons.length==0,(T.errs.concat(cons)).slice(0,3).join('|'));
process.exit(0);
