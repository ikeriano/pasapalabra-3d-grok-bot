// v0.9: Juegos DVD dentro de Pasapalabra 3D — entrar con el dedo, jugar un poco, Pausa → Salir → menú 3D, sin errores y con fluidez.
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_09/shots';
const T=await open({w:800,h:360,dpr:2});const {p}=T;const ev=(f,...a)=>p.evaluate(f,...a);
const shot=n=>p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:82});
const fps=ms=>ev(ms=>new Promise(r=>{let n=0,t0=performance.now();const f=t=>{n++;if(t-t0<ms)requestAnimationFrame(f);else r(n*1000/(t-t0));};requestAnimationFrame(f);}),ms);
const L=()=>ev(()=>[...document.querySelectorAll('#cls button,#cls .hs')].filter(b=>!b.classList.contains('hide')).map(b=>[(b.textContent||'').trim(),Math.round(b.getBoundingClientRect().left+b.getBoundingClientRect().width/2),Math.round(b.getBoundingClientRect().top+b.getBoundingClientRect().height/2)]));
const tapT=async t=>{const l=await L();const b=l.find(x=>x[0]==t);if(!b)throw new Error('sin botón '+t+' en '+JSON.stringify(l));await T.tap(b[1],b[2]);};
await T.tap(400,180);await p.waitForFunction('NAV.items.length>0',{timeout:4000});await sleep(800);
const f0=await fps(2000);check('3D: fluido antes de entrar',f0>8,f0.toFixed(1)+' fps (swiftshader)');
await ev(()=>document.querySelector('[data-go=dvd9]').scrollIntoView({block:'center'}));await sleep(300);await shot('v09_menu_juegos_dvd');
const c=await T.center('[data-go=dvd9]');await T.tap(c[0],c[1]);
await p.waitForSelector('#cls .hs',{timeout:8000});await sleep(2500);
check('abre el modo clásico con un toque',await ev(()=>!!document.querySelector('#cls')&&window.DVD9==1));
check('el 3D queda parado (sin render)',await ev(()=>getComputedStyle(document.querySelector('#c')).visibility=='hidden'));
await shot('v09_dvd_clasico_menu');
let l=await L();await T.tap(l[0][1],l[0][2]);await sleep(1500);await shot('v09_dvd_clasico_juegos');
await tapT('El Pulsador');await sleep(1200);await tapT('Equipo Naranja');await sleep(4500);await shot('v09_dvd_clasico_pulsador');
await tapT('');await sleep(9000);await shot('v09_dvd_clasico_pregunta');
const mid=await L();console.log('botones en juego',JSON.stringify(mid));
// Pausa → Salir al menú del DVD → Volver → Salir
await tapT('Pausa');await sleep(600);await shot('v09_dvd_clasico_pausa');
const pb=await ev(()=>[...document.querySelectorAll('#cpa [data-p]')].map(b=>[b.dataset.p,Math.round(b.getBoundingClientRect().left+b.getBoundingClientRect().width/2),Math.round(b.getBoundingClientRect().top+b.getBoundingClientRect().height/2)]));
const s=pb.find(x=>x[0]=='s');check('menú de pausa con «Salir al menú del DVD»',!!s);await T.tap(s[1],s[2]);await sleep(2500);
l=await L();check('vuelve al menú del DVD',l.some(x=>x[0]=='Salir'),JSON.stringify(l));
await tapT('Salir');await sleep(2500);
check('vuelve al menú de Pasapalabra 3D',await ev(()=>!document.querySelector('#cls')&&!document.querySelector('#dvdhost9')&&window.DVD9==0&&!document.querySelector('#menu').classList.contains('hidden')&&getComputedStyle(document.querySelector('#c')).visibility!='hidden'));
await shot('v09_dvd_vuelta_menu');
const f1=await fps(2000);check('3D: sigue fluido tras salir',f1>f0*0.6,f1.toFixed(1)+' vs '+f0.toFixed(1)+' fps');
check('el audio del DVD está parado',await ev(()=>[...document.querySelectorAll('audio')].every(a=>a.paused)));
// segunda entrada y salida directa (botón Salir del menú) y botón Atrás de Android
await ev(()=>document.querySelector('[data-go=dvd9]').scrollIntoView({block:'center'}));await sleep(200);let c2=await T.center('[data-go=dvd9]');await T.tap(c2[0],c2[1]);await p.waitForSelector('#cls .hs',{timeout:8000});await sleep(1500);
await ev(()=>window.onBack());await sleep(1500);
check('Atrás de Android sale del DVD',await ev(()=>!document.querySelector('#cls')&&window.DVD9==0));
// 3D sigue jugable: lanza una escena
await ev(()=>{setTimeout(()=>x9go('x9:toma:0'),0);return 0;});await sleep(3000);check('el 3D arranca una escena tras volver',await ev(()=>!MODE.menu));
check('sin errores JS',T.errs.length==0,T.errs.join(' | '));
await T.close();process.exit(check.fail?1:0);
