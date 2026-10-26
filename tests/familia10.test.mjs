// v0.10: «Pasapalabra en familia» (reglas puras, menús, nombres, programa completo en modo CPU, equipos de 3)
import {open,check,sleep} from './lib.mjs';
const OUT=process.env.SHOTS||'/workspace/pasa3d_10/shots';
const T=await open({w:800,h:360,dpr:2});const p=T.p;const ev=(f,...a)=>p.evaluate(f,...a);
const shot=n=>p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:82});
await ev(()=>{OPT.vozp=0;OPT.mute5=1;OPT.sfx=0;OPT.mus=0;OPT.etapa=OPT.plato=2019;OPT.fam10=null;});
check('versión v0.11',await ev(()=>document.querySelector('#ver').textContent)=='v0.11');
// ---- reglas puras
const R=(...a)=>ev((...x)=>F10.resolve10(...x),...a);
let r=await R(20,3,15,1,6000);check('más aciertos gana: 1.200 €, vuelve y el bote sube 6.000',r.w=='na'&&r.prize.na==1200&&r.prize.az==0&&r.boteNext==12000&&r.returns.join()=='na');
r=await R(10,2,18,5,6000);check('gana el azul con más aciertos',r.w=='az'&&r.prize.az==1200);
r=await R(18,4,18,2,6000);check('empate a aciertos: menos fallos gana',r.w=='az'&&r.prize.az==1200);
r=await R(18,2,18,2,6000);check('empate total: 600 € cada una y vuelven las dos',r.tie&&r.prize.na==600&&r.prize.az==600&&r.returns.length==2);
r=await R(25,0,12,3,18000);check('25 aciertos se llevan el bote y el bote vuelve a 6.000',r.full.join()=='na'&&r.bote.na==18000&&r.boteNext==6000);
r=await R(25,0,25,1,18000);check('dos roscos perfectos reparten el bote',r.full.length==2&&r.bote.na==9000&&r.bote.az==9000);
// ---- menús
for(const s of ['main','tema']){await ev(x=>showMenu(x),s);await sleep(250);check('entrada «Pasapalabra en familia» en '+s,await ev(()=>!!document.querySelector('#menu [data-go=fam10]')));}
await ev(()=>showMenu('esp'));await sleep(250);check('«familia» de especiales abre el juego propio',await ev(()=>{especial('familia');return /Pasapalabra en familia/.test(document.querySelector('#menu').innerText)&&!!document.querySelector('#menu [data-go="f10:play"]');}));
await shot('fam_menu');
// ---- equipos
const tm=await ev(()=>{const t=F10.mkTeams();return {na:t.na.mem.length,az:t.az.mem.length,k:[t.na.k,t.az.k]};});
check('equipos de 3 personas (naranja y azul)',tm.na==3&&tm.az==3,JSON.stringify(tm));
await ev(()=>{F10.S().mode='two';F10.S().or='A';});const tm2=await ev(()=>{const t=F10.mkTeams();return [t.na.mem.length,t.az.mem.length];});
check('modo dos familias: 3 y 3',tm2.join()=='3,3');await ev(()=>{F10.S().mode='cpu';F10.S().or='me';});
// ---- nombres
await ev(()=>showMenu('fam10n'));await sleep(300);await shot('fam_nombres');
check('pantalla de nombres con 4 campos (apellido + 3 miembros)',await ev(()=>document.querySelectorAll('input.n10').length==4));
await ev(()=>{const i=document.querySelectorAll('input.n10');i[0].value='Pérez';i[0].oninput();i[1].value='Ana';i[1].oninput();i[2].value='Luis';i[2].oninput();i[3].value='Marta';i[3].oninput();});
const t2=await ev(()=>{const t=F10.mkTeams();const me=t.na._c?t.az:t.na;return me.name+':'+me.mem.join(',');});
check('nombres propios usados',t2=='Familia Pérez:Ana,Luis,Marta',t2);
// ---- programa completo CPU (AUTO), SPEED alto
await ev(()=>{window.SPEED=7;window.F10AUTO=true;window.__letters=[];window.__hs=[];const h=hostSay;hostSay=function(t){try{const m=/(?:Empieza por|Contiene la) ([A-ZÑ])/.exec(String(t));if(m)__letters.push(m[1]);__hs.push(String(t).slice(0,60));}catch(e){}return h.apply(this,arguments);};});
await ev(()=>{F10.play();});
let fin=false,n=0,seen={};const stage=()=>ev(()=>({m:MODE.menu,s:(document.querySelector('#sub')||{textContent:''}).textContent.slice(0,40),g:G.children.length,vis:[P.ply,P.ply2,P.ply3,P.cpu,P.cpu2,P.cpu3].map(x=>x&&x.visible?1:0).join('')}));
for(let i=0;i<900;i++){await sleep(1000);const s=await stage();if(s.m){fin=true;break;}if(i%5==0&&n<30){await shot('fam_prog_'+String(n++).padStart(2,'0'));}}
check('el programa completo termina y vuelve al menú de familia',fin&&await ev(()=>!!document.querySelector('#menu [data-go="f10:play"]')));
const st=await ev(()=>({n:F10.S().n,bote:F10.S().bote,jug:F10.S().jug}));
check('programa contado (n=2, jugados=1) y bote actualizado',st.n==2&&st.jug==1&&st.bote>=6000,JSON.stringify(st));
const L=await ev(()=>__letters);const LET='ABCDEFGHIJLMNÑOPQRSTUVXYZ';
check('el rosco pregunta letras válidas, empezando por la A',L.length>20&&L[0]=='A'&&L.every(x=>LET.includes(x)),L.slice(0,8).join(''));
check('hay pruebas y rosco narrados',await ev(()=>__hs.length>30));
check('sin errores de página',T.errs.length==0,T.errs.join(' | ').slice(0,300));
await T.close();process.exit(check.fail?1:0);
