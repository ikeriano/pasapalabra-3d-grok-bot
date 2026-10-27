// v0.12: etapas Antena 3 (Jato PC, Romero, Cantizano, Leal 2020/2023, A la Z 2026)
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_12/shots';
const ONLY=(process.env.ONLY||'').split(',').filter(Boolean);
const T=await open({w:800,h:360,dpr:2});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
const cons=[];p.on('console',m=>{if(m.type()=='error')cons.push(m.text().slice(0,300));});
const shot=n=>p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:84});
await ev(()=>{OPT.vozp=0;OPT.mute5=1;OPT.sfx=0;OPT.mus=0;window.SPEED=12;OPT.bank12=0;OPT.previas12=0;});
const run=(n)=>ONLY.length==0||ONLY.includes(n);
if(run('menu')){
check('cruzadas y A la Z parcheadas',await ev(()=>!!DBG.cruz12()&&!!DBG.alaZ12()&&CRUZ12.total==54),'pares='+await ev(()=>CRUZ12.total));
await ev(()=>showMenu('main'));await sleep(500);check('botón Antena 3 en el menú',await ev(()=>!!document.querySelector('[data-go=a12hub]')));await shot('v12_menu_principal');
for(const s of ['a12hub','a12s26','a12reg','a12info']){await ev(s=>showMenu(s),s);await sleep(400);await shot('v12_menu_'+s);}
await ev(()=>showMenu('opt'));await sleep(500);check('fila de etapas Antena 3 y cruzadas en Opciones',await ev(()=>!!document.querySelector('[data-a3]')&&!!document.querySelector('[data-o12c=cruz12]')));
check('cruzadas apagadas por defecto',await ev(()=>!OPT.cruz12));await shot('v12_opciones_antena3');
await ev(()=>showMenu('x12:b12'));}
async function juega(nombre,js,shots=[],max=1400,quick){await ev(js=>{eval(js);},js);let ini=false,fin=false,k=0;
 for(let i=0;i<max&&!fin;i++){await sleep(120);const m=await ev(()=>MODE.menu);if(!ini){if(!m)ini=true;continue;}
  if(shots.includes(k))await shot('v12_'+nombre+'_'+k);k++;
  await ev(()=>{try{askEnd(Math.random()<.5?'pasapalabra':'xx');}catch(e){}if(typeof TAP==='function')try{TAP(Math.floor(Math.random()*3));}catch(e){}const mb=[...document.querySelectorAll('.mbtn')].filter(e=>e.offsetParent&&e.onpointerdown);if(mb.length)try{mb[Math.floor(Math.random()*mb.length)].onpointerdown({preventDefault(){}});}catch(e){}const b=document.querySelector('#pc12 .pcb,#pc12 .opt:not(.ok):not(.no)');if(b&&b.onpointerdown)try{b.onpointerdown({preventDefault(){}});}catch(e){}});
  fin=m;}
 check(nombre+': empieza y termina',ini&&fin,'ini='+ini+' fin='+fin+' pasos='+k);return k;}
const ST={jato:'DBG.go12("a12:play:2000")',romero:'DBG.go12("a12:play:2002")',canti:'DBG.go12("a12:play:2006")',leal20:'DBG.go12("a12:play:2020")',leal23:'DBG.go12("a12:play:2023")',a26:'DBG.go12("a12:play:2026")'};
for(const [n,js] of Object.entries(ST)){if(!run(n))continue;await ev(()=>{OPT.bote=60000;});
 if(n=='leal23')await ev(()=>{OPT.cruz12=1;});
 const k=await juega(n,js,[2,10,25,45,70,100,140,200,260,330,420,520,640,800,1000]);
 const o=await ev(()=>({e:OPT.etapa,p:OPT.plato,a3:OPT.a3,f:OPT.final,sw:SW12.on,bote:OPT.bote}));check(n+': swap deshecho',!o.sw&&(o.e==2007||o.e==2019),JSON.stringify(o));}
if(run('alaz')){await juega('alaz','DBG.go12("a12:alaz")',[3,12,30,60,100,160,240,320]);}
if(run('cab')){await juega('cab','DBG.go12("a12:cab")',[],300);}
check('sin errores de página/consola',T.errs.length==0&&cons.length==0,(T.errs.concat(cons)).slice(0,4).join(' | '));
process.exit(0);
