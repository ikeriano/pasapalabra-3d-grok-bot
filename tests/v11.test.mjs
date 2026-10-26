// v0.11: datos, voces, opciones apagadas, escenas nuevas (fuera de cámaras, cámaras ocultas, pruebas previas, lo mejor 3D, tomas), normas, copresentador
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_11/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
const cons=[];p.on('console',m=>{if(m.type()=='error')cons.push(m.text().slice(0,200));});
const shot=n=>p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:84});
await ev(()=>{OPT.vozp=0;OPT.mute5=1;OPT.sfx=0;OPT.mus=0;OPT.etapa=OPT.plato=2019;window.SPEED=12;});
// --- opciones nuevas apagadas por defecto
check('opciones nuevas OFF por defecto',await ev(()=>!OPT.normas11&&!OPT.previas11&&!OPT.copro11));
// --- datos
const d=await ev(()=>({n:D11.normas.length,ids:new Set(D11.normas.map(n=>n.id)).size,cat:D11.normas.reduce((a,n)=>(a[n.c]=(a[n.c]||0)+1,a),{}),prev:Object.keys(D11.prev).length,f:D11.fuera.length,c:D11.camaras.length,t:D11.tomas.length,co:D11.copro.length}));
check('30 normas únicas, 5 categorías',d.n==30&&d.ids==30&&Object.keys(d.cat).length==5,JSON.stringify(d.cat));
check('contenido nuevo: 5 pruebas previas, 4 fuera de cámaras, 6 cámaras ocultas, 12 tomas, 5 copresentadores',d.prev==5&&d.f==4&&d.c==6&&d.t==12&&d.co==5,JSON.stringify(d));
const falta=await ev(()=>{const m=[];const q=(w,t)=>{if(!CLIPS9[w+'|'+key9(t)])m.push(w+'|'+t.slice(0,40));};
 D11.fuera.forEach(e=>e.L.forEach(l=>q(l.w,l.t)));D11.camaras.forEach(c=>c.L.forEach(l=>q(l.w,l.t)));q('H',D11.nsIntro);q('H',D11.nsFin);D11.normas.forEach(n=>q('H',n.n+'. '+n.d));
 D11.copro.forEach(c=>{q('H',c.llega);c.intro.forEach(l=>q(c.v,l));[].concat(c.prueba,c.rosco,c.gana,c.pierde,c.bote,c.adios).forEach(l=>l&&q(c.v,l));});return m;});
check('todas las frases nuevas tienen voz Piper es_ES',falta.length==0,falta.slice(0,5).join(' | ')+' ('+falta.length+')');
check('sin voces es_MX',!(await ev(()=>/es_MX/.test(JSON.stringify(CLIPS9)))));
const marc=await ev(()=>({n:D11.normas.every(n=>n.n&&n.d),mk:/INVENTAD/.test(document.documentElement.innerHTML)||true}));
// --- menú extras
await ev(()=>showMenu('extras9'));await sleep(300);
const ex=await ev(()=>document.querySelector('#menu').innerText);
check('Extras: fuera de cámaras, cámaras ocultas y normas',/Más fuera de cámaras/.test(ex)&&/Cámaras ocultas/.test(ex)&&/Normas sorpresa/.test(ex));await shot('v11_extras');
await ev(()=>showMenu('normas11s'));await sleep(300);check('pantalla de las 30 normas inventadas',(await ev(()=>document.querySelector('#menu').innerText.match(/INVENTAD/g)||[])).length>=1);await shot('v11_normas_lista');
await ev(()=>showMenu('opt'));await sleep(400);await ev(()=>document.querySelector('[data-o11]').scrollIntoView({block:'center'}));await sleep(200);
check('Opciones: 3 interruptores nuevos en «No»',await ev(()=>[...document.querySelectorAll('[data-o11]')].length==3&&[...document.querySelectorAll('[data-o11]')].every(i=>i.value=='0')));await shot('v11_opciones');
// --- escenas
async function escena(nombre,fn,{max=240,mid=[6],cls}={}){await ev(f=>{window.__e=null;window.__r=Promise.resolve().then(f).then(()=>'ok',e=>String(e));},fn);let k=0,fin=false;
 for(let i=0;i<max&&!fin;i++){await sleep(250);if(mid.includes(i))await shot('v11_'+nombre+'_'+i);fin=await ev(()=>MODE.menu||document.querySelector('#menu:not(.hidden)')!=null&&MODE.menu);}
 return fin;}
for(const [k,nm] of [[0,'fuera0'],[2,'fuera2']]){await ev(i=>window.x9go('x9:f11:'+i),k);await sleep(2500);await shot('v11_'+nm+'_a');await sleep(1500);await shot('v11_'+nm+'_b');
 let ok=false;for(let i=0;i<160&&!ok;i++){await sleep(300);ok=await ev(()=>MODE.menu);}check('escena fuera de cámaras '+k+' termina y vuelve al menú',ok);}
for(const k of [0,3]){await ev(i=>window.x9go('x9:c11:'+i),k);await sleep(3000);await shot('v11_cam'+k+'_a');await sleep(3000);await shot('v11_cam'+k+'_b');
 let ok=false;for(let i=0;i<160&&!ok;i++){await sleep(300);ok=await ev(()=>MODE.menu);}check('cámara oculta '+k+' termina y vuelve al menú',ok);
 check('sin restos de REC/tinte tras la cámara oculta',await ev(()=>!document.querySelector('.rec11')));}
// todas las cámaras/fuera
await ev(()=>window.x9go('x9:c11:all'));let ok=false;for(let i=0;i<500&&!ok;i++){await sleep(300);ok=await ev(()=>MODE.menu);}check('«Ver todas» cámaras ocultas',ok);
await ev(()=>window.x9go('x9:f11:all'));ok=false;for(let i=0;i<500&&!ok;i++){await sleep(300);ok=await ev(()=>MODE.menu);}check('«Ver todas» fuera de cámaras',ok);
// pruebas previas nuevas: CPU toca al azar
for(const k of ['sinon','calc','orden','cuenta','rima']){
 await ev(kk=>{window.__pv=scene9(async rid=>{await PV11.fn[kk](rid);},{back:'extras9'}).then(()=>1,e=>String(e));},k);
 let seen=0,fin=false,fails=0;for(let i=0;i<400&&!fin;i++){await sleep(250);
  await ev(()=>{if(typeof TAP==='function')TAP(Math.floor(Math.random()*3));});
  if(i==22||i==40)await shot('v11_prev_'+k+'_'+i);
  fin=await ev(()=>MODE.menu);}
 check('prueba previa inventada «'+k+'» se juega completa',fin);}
check('sin errores de página/consola',T.errs.length==0&&cons.length==0,(T.errs.concat(cons)).slice(0,3).join('|'));
await T.close();process.exit(check.fail?1:0);
