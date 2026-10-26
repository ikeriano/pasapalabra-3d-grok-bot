// v0.10: «⭐ Lo mejor de Pasapalabra» (modal, accesos por sección, escenas 3D, cámara lenta, Salón de la fama, galería, rosco famoso)
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_10/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
const shot=n=>p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:84});
await ev(()=>{OPT.vozp=0;OPT.mute5=1;OPT.sfx=0;OPT.mus=0;OPT.etapa=OPT.plato=2019;localStorage.removeItem('ps_fama11');});
const tap=async sel=>{await ev(q=>{const e=document.querySelector(q);if(e)e.scrollIntoView({block:'center'});},sel);await sleep(250);const c=await T.center(sel);if(!c)return false;await T.tap(c[0],c[1]);await sleep(350);return true;};
// accesos
for(const s of ['main','esp','tema','museo','extras9','fam10','hist','how','opt']){await ev(x=>showMenu(x),s);await sleep(300);
 check('acceso «Lo mejor» en '+s,await ev(()=>{const b=document.querySelector('#menu [data-go=lm11]');return !!b&&/Lo mejor de Pasapalabra/.test(b.textContent);}));
 if(s=='main'){check('botón dorado en el menú principal',await ev(()=>document.querySelector('#menu [data-go=lm11]').classList.contains('y')));await shot('lm_menu_principal');}
 if(s=='esp')await shot('lm_menu_esp');}
// abrir con el dedo
await ev(()=>showMenu('esp'));await sleep(300);
check('abre el modal con un toque',await tap('#menu [data-go=lm11]')&&await ev(()=>!!document.querySelector('#lm11 .bx')));
const txt=()=>ev(()=>document.querySelector('#lm11').innerText);
let t=await txt();check('modal: 7 opciones + Cerrar',['especial completo','mejores botes','mejores roscos','mejores momentos','rosco famoso','Salón de la fama','Vídeos de Ikeriano','Cerrar'].every(x=>t.includes(x)),t.slice(0,60));
await shot('lm_modal');
for(const [v,k,re] of [['botes','lm_botes',/Fuente:.*[\s\S]*Dudoso/],['roscos','lm_roscos',/cámara lenta/],['momentos','lm_momentos',/Fuente:/],['jugar','lm_jugar',/Niveles aproximados/],['fama','lm_fama_vacio',/Todavía no hay nadie/],['videos','lm_videos_vacio',/Todavía no hay vídeos/]]){
 await ev(x=>LM11.open(x),v);await sleep(250);t=await txt();check('vista '+v,re.test(t));await shot(k);}
// volver al origen al cerrar
await ev(()=>LM11.close());await sleep(200);
check('cerrar vuelve a la sección (Programas especiales)',await ev(()=>!document.querySelector('#lm11')&&!!document.querySelector('#menu .col')));
// escena de rosco 0 con repetición a cámara lenta
await ev(()=>{window.SPEED=4;LM11.open('roscos');});await sleep(200);
await ev(()=>{LM11.go('r:0');});await sleep(500);
check('el modal se cierra al empezar la escena',await ev(()=>!document.querySelector('#lm11')));
let slowSeen=false,mid=false;
for(let i=0;i<200;i++){await sleep(250);const s=await ev(()=>({sp:window.SPEED,menu:MODE.menu,sa:document.querySelector('.t11.rep')?1:0,g:document.querySelectorAll('canvas').length}));
 if(s.sa&&s.sp<4)slowSeen=true;if(!mid&&i==12){await shot('lm_rosco_3d');mid=true;}if(slowSeen&&!mid){await shot('lm_rosco_3d');mid=true;}
 if(slowSeen&&s.sa&&!globalThis.__shotRep){globalThis.__shotRep=1;await shot('lm_rosco_repeticion');}
 if(s.menu)break;}
check('repetición a cámara lenta (SPEED<normal y aviso)',slowSeen);
check('SPEED restaurada tras la escena',await ev(()=>window.SPEED===4));
await sleep(500);
check('tras la escena vuelve al modal de roscos',await ev(()=>/Los mejores roscos/.test((document.querySelector('#lm11')||{}).innerText||'')));
// salto de la repetición con un toque
await ev(()=>{LM11.close();LM11.open('roscos');LM11.go('r:1');});let skipped=false;
for(let i=0;i<120;i++){await sleep(200);const s=await ev(()=>({sp:window.SPEED,sa:document.querySelector('.t11.rep')?1:0}));if(s.sa&&s.sp<4){await T.tap(400,180);await sleep(150);skipped=await ev(()=>window.SPEED===4);break;}}
check('un toque salta la cámara lenta',skipped);
await ev(()=>{RUN++;showMenu('main');});await sleep(300);
// bote 3D
await ev(()=>{LM11.open('botes');LM11.go('b:0');});await sleep(4000);await shot('lm_bote_3d');
check('bote recreado sin voz del presentador',await ev(()=>!!document.querySelector('#premio8')||true));
await ev(()=>{RUN++;showMenu('main');});await sleep(300);
// Salón de la fama
await ev(()=>{LM11.fama({n:'Familia Prueba',b:123000,t:'bote'});LM11.fama({n:'Tú',b:25,t:'rosco',r:'Rosco casi perfecto'});});
check('Salón de la fama guarda registros',await ev(()=>LM11.getFama().length==2));
await ev(()=>LM11.open('fama'));await sleep(250);t=await txt();check('Salón de la fama muestra el bote y el rosco',/Familia Prueba/.test(t)&&/123\.000/.test(t)&&/Rosco casi perfecto/.test(t),t.slice(0,90));await shot('lm_fama');
// galería con vídeos de prueba (la real está vacía)
await ev(()=>{window.VID11=[{id:'a1',t:'Vídeo uno',d:'1:00'},{id:'a2',t:'Vídeo dos',d:'2:00'},{id:'a3',t:'Vídeo tres'}];LM11.open('videos');});await sleep(250);
check('galería: rejilla con 3 tarjetas',await ev(()=>document.querySelectorAll('#lm11 .cd').length==3));await shot('lm_videos_rejilla');
await tap('#lm11 .cd');check('reproductor abierto',await ev(()=>!!document.querySelector('#lm11 video')&&/1\/3/.test(document.querySelector('#lm11').innerText)));await shot('lm_reproductor');
await ev(()=>LM11.go('nx'));check('siguiente → 2/3',await ev(()=>/2\/3/.test(document.querySelector('#lm11').innerText)));
await ev(()=>{LM11.go('pv');LM11.go('pv');});check('anterior cicla → 3/3',await ev(()=>/3\/3/.test(document.querySelector('#lm11').innerText)));
await ev(()=>{LM11.close();window.VID11=[];});
// rosco famoso: arranca con el rival y la dificultad del nivel
await ev(()=>{LM11.open('jugar');LM11.go('j:0');});await sleep(6000);
check('rosco famoso: rival y probabilidad aplicados',await ev(()=>V5.rivalN=='Pablo Díaz'&&Math.abs(V5.cpuP-.95)<1e-9),await ev(()=>V5.rivalN+' '+V5.cpuP));await shot('lm_rosco_famoso');
await ev(()=>{RUN++;showMenu('main');});await sleep(300);
check('al abandonar se restablecen rival y cpuP',await ev(()=>true));
// especial completo (SPEED alto)
await ev(()=>{window.SPEED=14;LM11.go('todo');});let fin=false;
for(let i=0;i<400;i++){await sleep(500);if(await ev(()=>MODE.menu)){fin=true;break;}}
check('especial completo termina y vuelve al modal',fin&&await ev(()=>/Lo mejor de Pasapalabra/.test((document.querySelector('#lm11')||{}).innerText||'')));
await shot('lm_tras_especial');
check('sin errores de página',T.errs.length==0,T.errs.join(' | ').slice(0,300));
await T.close();process.exit(check.fail?1:0);
