// v0.12: banco de escenas (6 tipos), pruebas previas por semilla, menús paginados y opciones apagadas
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_12/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
const cons=[];p.on('console',m=>{if(m.type()=='error')cons.push(m.text().slice(0,200));});
const shot=n=>p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:84});
await ev(()=>{OPT.vozp=0;OPT.mute5=1;OPT.sfx=0;OPT.mus=0;OPT.etapa=OPT.plato=2019;window.SPEED=10;});
const n=await ev(()=>Object.fromEntries(Object.entries(S12.T).map(([k,v])=>[k,v.length])));
check('600 escenas por tipo y 300 previas',n.mono==600&&n.cam==600&&n.fuera==600&&n.tomas==600&&n.mej==600&&n.prev==300,JSON.stringify(n));
const un=await ev(()=>Object.entries(S12.T).map(([k,v])=>[k,new Set(v.map(x=>x[1].join(',')+'|'+x[2].join(','))).size,v.length]));
check('todas las escenas son distintas (combinación de frases única)',un.every(([k,u,L])=>u==L),JSON.stringify(un));
// preguntas: exactamente una correcta
const bad=await ev(()=>{let b=0;for(let e=0;e<10;e++)for(let s=1;s<=30;s++)qg12(e,s).forEach(q=>{if(q.o.filter(o=>o[1]).length!=1||new Set(q.o.map(o=>o[0])).size!=q.o.length)b++;});return b;});
check('10 motores × 30 semillas: una sola respuesta correcta y sin opciones repetidas',bad==0,'malas='+bad);
const sinVoz=await ev(()=>S12.L.filter(([w,t])=>!CLIPS9[w+'|'+key9(t)]).length);
check('todas las frases tienen voz grabada',sinVoz==0,'sin voz='+sinVoz);
async function corre(nombre,js,shots=[],max=900){await p.evaluate(`void (${js})`);let ini=false,fin=false,k=0;
 for(let i=0;i<max&&!fin;i++){await sleep(250);const m=await ev(()=>MODE.menu);if(!ini){if(!m)ini=true;continue;}
  if(shots.includes(k))await shot('v12_'+nombre+'_'+k);k++;await ev(()=>{if(typeof TAP==='function')TAP(Math.floor(Math.random()*3));});fin=m;}
 check(nombre+': empieza y termina',ini&&fin,'ini='+ini+' fin='+fin);}
for(const t of ['mono','cam','fuera','tomas','mej'])for(const i of [0,333])await corre(t+i,`DBG.x9go('x12:${t}:${i}')`,[3,8,14,22]);
await corre('prev0',`DBG.x9go('x12:prev:0')`,[4,10]);await corre('prev7',`DBG.x9go('x12:prev:7')`,[4,10]);
await ev(()=>showMenu('s12_cam_3'));await sleep(400);const tx=await ev(()=>document.querySelector('#menu').innerText);check('menú paginado con 🆕 INVENTADA',/INVENTADA/.test(tx)&&/Cámaras ocultas/.test(tx));await shot('v12_menu_cam');
await ev(()=>showMenu('b12'));await sleep(300);await shot('v12_menu_banco');
const o=await ev(()=>({b:OPT.bank12,pv:OPT.previas12}));check('opciones del banco apagadas por defecto',!o.b&&!o.pv);
await ev(()=>showMenu('opt'));await sleep(300);check('filas de opciones del banco presentes',await ev(()=>!!document.querySelector('[data-o12=bank12]')));await shot('v12_opciones');
check('sin errores de página/consola',T.errs.length==0&&cons.length==0,(T.errs.concat(cons)).slice(0,3).join('|'));
process.exit(0);
