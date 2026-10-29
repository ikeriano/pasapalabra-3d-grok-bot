'use strict';
// v0.22 · «Tal cual sale en la tele»: Antena 3 (junio 2026 en adelante) y Pasapalabra en familia.
// Cabeceras, cortinillas de cada prueba y créditos con los VÍDEOS REALES del programa (tv/*.mp4, resolución original,
// sin reescalar). Créditos de inicio de A3 que en la tele salen sobre el plató: rótulo recreado con el mismo texto y medidas.
(()=>{
const A26=()=>OPT.a3==2026&&!(window.F16&&F16._want);
const css=`#tv22{position:fixed;inset:0;z-index:60;background:#000;display:none}
#tv22 video{width:100%;height:100%;object-fit:contain;background:#000}
#tv22 .skip{position:absolute;right:2vw;bottom:2vh;color:#fff8;font:600 13px N,sans-serif}
#cr22{position:fixed;left:0;right:0;bottom:0;height:0;z-index:55;pointer-events:none}
#cr22 .p{position:fixed;left:50%;bottom:calc(var(--vh,1vh)*0);transform:translateX(-50%);width:min(69.3vw,123.3vh);height:min(6.15vw,10.9vh);
 bottom:min(10.6vh,5.97vw);border-radius:99px;border:2px solid #fff;background:linear-gradient(180deg,#1c6cff,#0d4fe0);color:#fff;text-align:center;
 font-family:N,sans-serif;display:flex;flex-direction:column;justify-content:center;opacity:0;transition:opacity .25s,transform .35s cubic-bezier(.2,.9,.3,1)}
#cr22 .p.on{opacity:1}
#cr22 .p i{font-style:normal;font-weight:700;font-size:min(1.25vw,2.2vh);letter-spacing:.02em;line-height:1.1}
#cr22 .p b{font-weight:900;font-size:min(2.15vw,3.8vh);line-height:1.1}`;
let root,vid,cr;
function build(){if(root)return;const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
 root=document.createElement('div');root.id='tv22';root.innerHTML='<video playsinline preload="auto"></video><div class="skip">toca para saltar</div>';document.body.appendChild(root);vid=root.querySelector('video');
 cr=document.createElement('div');cr.id='cr22';document.body.appendChild(cr);}
// reproduce un vídeo real a pantalla completa; termina al acabar, con un toque o si se corta el programa
function playTV(name,rid){build();return new Promise(res=>{let done=false;const fin=()=>{if(done)return;done=true;clearInterval(iv);vid.pause();root.style.display='none';root.onclick=null;vid.removeAttribute('src');vid.load();res();};
 try{stopMusic();}catch(e){}try{say();}catch(e){}
 vid.src='tv/'+name+'.mp4';vid.currentTime=0;vid.volume=Math.min(1,(OPT.mus??.8)+.2);root.style.display='block';
 vid.onended=fin;vid.onerror=fin;root.onclick=fin;const iv=setInterval(()=>{if(rid!==undefined&&rid!==RUN)fin();},200);
 const p=vid.play();if(p&&p.catch)p.catch(()=>{vid.muted=true;vid.play().catch(fin);});});}
window.TV22={playTV,pill(r,n){build();const d=document.createElement('div');d.className='p';d.innerHTML=`<i>${r}</i><b>${n}</b>`;cr.appendChild(d);void d.offsetWidth;d.classList.add('on');return new Promise(z=>setTimeout(()=>{d.classList.remove('on');setTimeout(()=>d.remove(),400);z();},1750));}};
// Créditos de inicio Antena 3 (19/6/2026): en la tele salen 5 rótulos de 1,75 s cada uno al final de la cabecera.
// Los 3 primeros van dentro del vídeo real; los 2 últimos salen sobre el plano del presentador y aquí van sobre el plató 3D.
const CR_A3=[['PRODUCTORA EJECUTIVA ATRESMEDIA','Cristina Azcárraga'],['REALIZACIÓN','Rocío Vidal']];
async function creditosA3(){build();for(const [r,n] of CR_A3){const d=document.createElement('div');d.className='p';d.innerHTML=`<i>${r}</i><b>${n}</b>`;cr.appendChild(d);
  void d.offsetWidth;d.classList.add('on');await new Promise(r=>setTimeout(r,1750));d.classList.remove('on');setTimeout(()=>d.remove(),400);}}
// ----- Antena 3 2026: cabecera real + créditos -----
{const _c=cabecera;cabecera=async function(rid){if(!A26())return _c.apply(this,arguments);await CAB22.cabA3(rid);};}
// ----- cortinillas reales de cada prueba (La Pista no tiene cortinilla en el programa del 19/6/2026: se entra directo) -----
const C26={u4:'c2026_u4',cruz12:'c2026_cruz12',donde:'c2026_donde',rosco:'c2026_rosco',alaz:'c2026_rosco'};
{const _p=playCort;playCort=async function(id,rid){if(A26()){if(C26[id]){await playTV(C26[id],rid);chk(rid);return;}if(id=='pista'){chk(rid);return;}}return _p.apply(this,arguments);};}
// ----- créditos finales reales (despedida de Roberto Leal + rótulos de créditos, 19/6/2026) -----
{const _cr=creditos6;creditos6=async function(rid){if(OPT.a3==2026&&!(window.F16&&F16._want)){await playTV('c2026_fin',rid);return;}return _cr.apply(this,arguments);};}
{const _d=despedida;despedida=async function(rid){if(!A26())return _d.apply(this,arguments);
  // resultado y bote como siempre (sin la grúa genérica), y cierre con el vídeo real
  clearG();stopMusic();setPeople(false);cut('front');const a=GAME.res||[0,0];
  hostSay(a[0]==25?'¡Completado! ¡Os lleváis el bote!':`¡Gran final, con <b>${a[0]}</b> aciertos! ¡Hasta mañana!`);if(a[0]<25){OPT.bote=(OPT.bote||60000)+6000;saveOpt();}
  await wait(3,rid);say();await playTV('c2026_fin',rid);MOSCA.visible=false;showMenu();};}
// ----- Pasapalabra en familia: cabecera, cortinillas y créditos finales reales -----
if(window.F16){const CF={he:'cfam_he',suena:'cfam_suena',donde:'cfam_donde',pinta:'cfam_pinta',ristra:'cfam_ristra',rosco:'cfam_rosco',desp:'cfam_fin'};
 F16.cab=async function(rid){try{stopMusic();}catch(e){}await CAB22.cabFam(rid);};
 const _v=F16.vid;F16.vid=async function(n,rid){if(CF[n]){await playTV(CF[n],rid);chk(rid);return;}return _v.apply(this,arguments);};
 const _pr=F16.prueba;F16.prueba=async function(id,rid){if(CF[id]){await playTV(CF[id],rid);chk(rid);try{document.querySelector('#f16 .f16sc').style.display='block';}catch(e){}return;}return _pr.apply(this,arguments);};}
{const _sm=showMenu;showMenu=function(){const r=_sm.apply(this,arguments);try{$('#ver').textContent='v0.22';}catch(e){}return r;};}
})();
