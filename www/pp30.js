'use strict';
/* ===== v0.30 · Paquete «Ahora Caigo 1.69» en Pasapalabra 3D (🆕 INVENTADO) =====
   Making of (plató del juego, sin cambios) + «Plató real» (opción, apagada) · Entresijos · Entrenamientos · Fuera de cámaras ·
   Cámara oculta · Tomas falsas («¡Vamos otra vez!» + sello TOMA FALSA, nunca «corten») · La historia contada por el presentador ·
   Estudio de TV (estudio/) · Cabecera 3D de los 2000.
   Motor de escenas: TODA entrada de menú sale de MODES30 y tiene manejador (si no, no se pinta). Las voces nunca bloquean:
   si el audio no puede sonar (antes del primer toque), la escena sigue con el tiempo de la frase. */
(()=>{
const INV='🆕 INVENTADO';
const esc=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
if(OPT.real30===undefined)OPT.real30=0;   // Plató real (apagado por defecto)
if(OPT.cab30===undefined)OPT.cab30=0;     // Cabecera 3D 2000 al jugar etapas Jato/Romero/Cantizano (apagado por defecto)
if(OPT.rep30===undefined)OPT.rep30=1;     // recuadro de reportaje dentro de las escenas nuevas
// ---------- voces Piper (pp30/voz/<fnv>.ogg) ----------
function fnv(t){t=String(t).normalize('NFC').trim();let h=2166136261;for(let i=0;i<t.length;i++){h^=t.charCodeAt(i);h=Math.imul(h,16777619)>>>0;}return ('0000000'+h.toString(16)).slice(-8);}
let VA=null;const stopV=()=>{if(VA){try{VA.pause();}catch(e){}VA=null;}};
function speak(who,text,rid){const h=fnv(who+'|'+text),d=(window.VOZ30||{})[h];const est=Math.max(1.4,text.length*.06);
 return new Promise((res,rej)=>{stopV();let a=null,on=false,t=0;
  if(d&&OPT.vozp!==0&&!OPT.mute5){try{a=new Audio('pp30/voz/'+h+'.ogg');a.volume=Math.min(1,Math.max(.05,OPT.vozp===undefined?1:OPT.vozp));VA=a;const p=a.play();if(p&&p.then)p.then(()=>{on=true;}).catch(()=>{});else on=true;}catch(e){a=null;}}
  const dur=d||est;
  anim(dt=>{if(rid!==undefined&&rid!==RUN){if(a)a.pause();rej(new Stop());return false;}t+=dt;
   const fin=(a&&on&&a.ended&&t>.3)||t>=dur+(on?.9:.15);// el subtítulo nunca espera más de duración+0,9 s
   if(fin){if(a&&VA===a)stopV();res();return false;}return true;});});}
// ---------- personajes del equipo (se crean al usarse) ----------
const CR={};let ROOMG=null;
function crew(id){const c=CAST30[id];if(!c||c.seat||id=='pres'||id=='off')return null;if(!CR[id]){const p=person({shirt:c.shirt,hair:c.hair,long:!!c.long,skin:c.skin||0xe8b896});p.visible=false;P.root.add(p);CR[id]=p;}return CR[id];}
function actor(id){const c=CAST30[id]||{};if(id=='pres')return P.host;if(c.seat=='ply')return P.ply;if(c.seat=='cpu')return P.cpu;return CR[id]||null;}
const SPOTS=[[-2.2,2.6],[2.2,2.6],[0,3.4],[-1.1,4.2],[1.1,4.2]];
function stage(sc){Object.values(CR).forEach(p=>p.visible=false);const ids=[...new Set(sc.L.map(l=>l[0]))].filter(i=>crew(i));
 ids.forEach((id,i)=>{const p=CR[id],[x,z]=SPOTS[i%SPOTS.length];p.position.set(x,0,z);p.lookAt(x*.4,0,z+6);p.visible=true;});room(sc.lugar);}
function shotOf(id){const a=actor(id);if(!a||a===P.host)return 'host';const c=CAST30[id];if(c.seat=='ply')return 'blue';if(c.seat=='cpu')return 'orange';
 const p=a.position;return {p:V3(p.x+.5,1.72,p.z+2.6),l:V3(p.x,1.55,p.z),f:32,dr:.03};}
let talkA=null;function talk(id){talkA=actor(id);}
anim(dt=>{if(talkA&&talkA.head){talkA.head.rotation.x=Math.sin(performance.now()/110)*.06;}return true;});
// ---------- salas fuera del plató: pared con dibujo detrás del equipo ----------
const ROOMS={recepcion:['RECEPCIÓN','#1a3c9a','#ffd23a'],maquillaje:['MAQUILLAJE','#5a2a4a','#ffe0a0'],redaccion:['REDACCIÓN DE PREGUNTAS','#2a3a2a','#bfe8a0'],espera:['SALA DE ESPERA DE CONCURSANTES','#2a2a5a','#a0c0ff'],
 control:['SALA DE CONTROL','#101820','#5ad1ff'],cafeteria:['CAFETERÍA','#5a3a1a','#ffcf80'],pasillo:['PASILLO DE LOS PLATÓS','#2a2a3a','#ff8a00'],camerinos:['CAMERINOS','#3a1a3a','#ffd0f0']};
function roomTex(k){const [n,bg,ac]=ROOMS[k];return cv(1024,512,(g,w,h)=>{g.fillStyle=bg;g.fillRect(0,0,w,h);g.fillStyle='rgba(255,255,255,.06)';for(let x=0;x<w;x+=64)g.fillRect(x,0,2,h);
 if(k=='maquillaje'||k=='camerinos')for(let i=0;i<3;i++){const x=120+i*300;g.fillStyle='#cfe6f0';g.fillRect(x,120,200,200);for(let j=0;j<8;j++){g.fillStyle='#fff6c0';g.beginPath();g.arc(x+(j<4?-14:214),140+(j%4)*55,10,0,7);g.fill();}}
 if(k=='control'){for(let r=0;r<3;r++)for(let c=0;c<6;c++){g.fillStyle=(r+c)%3?'#0a3a7a':'#1a6ae8';g.fillRect(40+c*160,60+r*110,140,90);g.fillStyle='#ffd23a';g.fillRect(40+c*160,60+r*110,30,10);}}
 if(k=='redaccion'||k=='recepcion'){for(let i=0;i<5;i++){g.fillStyle='#e8eef4';g.fillRect(60+i*190,300,150,90);g.fillStyle='#333';g.fillRect(90+i*190,230,90,70);}}
 if(k=='cafeteria'){g.fillStyle='#8a5a2a';g.fillRect(0,330,w,180);for(let i=0;i<7;i++){g.fillStyle='#fff';g.fillRect(70+i*130,290,40,40);}}
 if(k=='pasillo'||k=='espera'){for(let i=0;i<4;i++){g.fillStyle=['#1e6aff','#ff8a00','#2ecc71','#c03ad0'][i];g.fillRect(70+i*240,90,180,240);g.fillStyle='#fff';g.font='900 26px Arial';g.textAlign='center';g.fillText(['PASAPALABRA','SHOWTIME TV','¡AHORA CAIGO!','PLATÓ 5'][i],160+i*240,215);}}
 g.fillStyle=ac;g.fillRect(0,h-40,w,8);g.font='900 44px Arial';g.textAlign='center';g.fillText(n,w/2,52);});}
function room(k){if(ROOMG){P.root.remove(ROOMG);ROOMG.traverse(m=>{m.geometry&&m.geometry.dispose();m.material&&(m.material.map&&m.material.map.dispose(),m.material.dispose());});ROOMG=null;}
 if(!k||!ROOMS[k])return;ROOMG=new T.Group();const w=new T.Mesh(new T.PlaneGeometry(12,5),new T.MeshBasicMaterial({map:roomTex(k)}));w.position.set(0,2.5,1.4);ROOMG.add(w);
 const f=new T.Mesh(new T.PlaneGeometry(12,6),new T.MeshLambertMaterial({color:0x8a8f9a}));f.rotation.x=-Math.PI/2;f.position.set(0,.02,4.4);ROOMG.add(f);P.root.add(ROOMG);}
// ---------- foco sobre quien se elige ----------
let SP=null;
function spot(id){const a=id&&actor(id);if(!a){if(SP)SP.g.visible=false;return;}
 if(!SP){const g=new T.Group();const cone=new T.Mesh(new T.CylinderGeometry(.12,1.05,6.4,20,1,true),new T.MeshBasicMaterial({color:0xfff2c0,transparent:true,opacity:.2,blending:T.AdditiveBlending,depthWrite:false,side:T.DoubleSide}));cone.position.y=3.2;g.add(cone);
  const disc=new T.Mesh(new T.CircleGeometry(1.05,28),new T.MeshBasicMaterial({color:0xfff2c0,transparent:true,opacity:.35,blending:T.AdditiveBlending,depthWrite:false}));disc.rotation.x=-Math.PI/2;disc.position.y=.04;g.add(disc);
  const L=new T.SpotLight(0xfff2d0,40,14,.35,.5,1.2);L.position.set(0,6.6,0);const tg=new T.Object3D();g.add(tg);L.target=tg;g.add(L);S.add(g);SP={g,cone,disc,to:new T.Vector3()};
  anim(dt=>{if(SP.g.visible){SP.g.position.lerp(SP.to,Math.min(1,dt*5));SP.cone.material.opacity=.16+Math.sin(performance.now()/300)*.04;}return true;});}
 const wp=new T.Vector3();a.getWorldPosition(wp);SP.to.set(wp.x,0,wp.z);if(!SP.g.visible){SP.g.position.copy(SP.to);}SP.g.visible=true;sfx('ok');}
// ---------- sello TOMA FALSA ----------
function stamp(){const d=document.createElement('div');d.className='stamp30';d.textContent='TOMA FALSA';document.body.appendChild(d);setTimeout(()=>d.remove(),2400);}
// ---------- rótulo «categoría · título · 🆕 INVENTADO» (sin «MOMENTO 1/2») ----------
function rot(sc){let r=document.getElementById('rot30');if(!r){r=document.createElement('div');r.id='rot30';document.body.appendChild(r);}r.innerHTML=`<b>${esc(sc.cat)}</b> · ${esc(sc.t)} · <i>${sc.real?'datos reales':INV}</i>`;r.style.display='block';}
const rotOff=()=>{const r=document.getElementById('rot30');if(r)r.style.display='none';};
// ---------- reportaje (estudio/reportaje.js) ----------
function rep(text,who){if(!OPT.rep30||!window.REPORTAJE)return;try{REPORTAJE.linea(text,who);}catch(e){}}
// ---------- plató real (réplica de las fotos de Iker: ref/platos_reales/pasapalabra) ----------
let RG=null,HID=[];
function realOn(on){if(!on){if(RG){P.root.remove(RG);RG.traverse(m=>{m.geometry&&m.geometry.dispose();if(m.material){m.material.map&&m.material.map.dispose();m.material.dispose();}});RG=null;}HID.forEach(o=>o.visible=true);HID=[];return;}
 if(RG)return;if(!window.PLATOREAL30)return;const keep=new Set(Object.values(P).filter(x=>x&&x.isObject3D));
 const bx=new T.Box3(),sz=new T.Vector3();P.root.children.forEach(o=>{if(keep.has(o)||!o.visible||o===ROOMG||Object.values(CR).includes(o))return;bx.setFromObject(o);bx.getSize(sz);if(Math.max(sz.x,sz.z)>5.5||sz.y>3.2){o.visible=false;HID.push(o);}});
 RG=PLATOREAL30(T);P.root.add(RG);}
window.REAL30=realOn;
// ---------- escena ----------
async function play(rid,sc,mode){stage(sc);rot(sc);cut(sc.lugar=='plato'?'wide':shotOf(sc.L.find(l=>crew(l[0]))?.[0]||'pres'));FX5.tint(mode=='oculta'?'rgba(40,255,90,.22)':mode=='fuera'?'rgba(0,0,0,.2)':'');
 const card=bigTxt(Math.min(GW-100,760),120,sc.t.toUpperCase().slice(0,26),{grad:['#fff','#ffe680','#f0a000'],side:'#7a3c00',layers:7,glow:'#ffcf40'});card.position.set(0,140,100);card.scale.setScalar(.01);G.add(card);
 await tween(.45,e=>card.scale.setScalar(.01+e));await wait(1.1,rid);G.remove(card);
 let k=0;for(const [who,text,act] of sc.L){chk(rid);const c=CAST30[who];
  if(act&&act.startsWith('spot:')){spot(act.slice(5));cut(shotOf(act.slice(5)));}else if(act=='off')spot(null);
  if(act&&act.startsWith('cam:'))cut(act.slice(4));else if(!(act&&act.startsWith('spot:')))cut(who=='off'?(k%2?'wide':'front'):shotOf(who));
  if(who!=='off')talk(who);rep(text,c.n);say(`<b>${esc(c.n)}:</b> ${esc(text)}`);
  if(act=='falsa'){stamp();sfx('error');FX5.tint('rgba(255,40,40,.2)');}
  await speak(who,text,rid);talk(null);
  if(act=='falsa')FX5.tint('');if(act=='aplauso'){sfx('aplauso');}if(act=='conf'){FX5.conf(['#ffd23a','#2a6af0','#fff','#ff8a1a'],3);sfx('aplauso');}
  await wait(.12,rid);k++;}
 spot(null);await wait(.3,rid);}
function clean(){spot(null);talk(null);stopV();rotOff();room(null);Object.values(CR).forEach(p=>p.visible=false);if(!OPT.real30)realOn(false);try{REPORTAJE.ocultar();}catch(e){}FX5.tint('');}
function runList(mode,list,o={}){return scene9(async rid=>{const tema0=OPT.tema;if(o.hw)OPT.tema='halloween';try{if(o.real||OPT.real30)realOn(true);for(const sc of list){await play(rid,sc,mode);}}finally{clean();if(o.hw)OPT.tema=tema0;if(o.real&&!OPT.real30)realOn(false);}},{back:'pp30',banner:o.banner});}
// ---------- tabla de modos: cada entrada del menú = un manejador ----------
const B='🎬 DETRÁS DE LAS CÁMARAS · '+INV;
const MODES30=[
 {id:'making',ic:'🎬',t:'Making of · plató del juego',s:'Así se hace Pasapalabra 3D, en su propio plató · '+INV,run:()=>runList('making',S30.making,{banner:B})},
 {id:'makreal',ic:'🏟',t:'Making of · Plató real',s:'El mismo making of en la réplica del plató real (fotos de Iker) · '+INV,run:()=>runList('making',S30.making,{banner:'🏟 PLATÓ REAL · '+INV,real:true})},
 {id:'entresijos',ic:'🔍',t:'Entresijos',s:'Preguntas, casting, decorado, control y regidor',run:()=>runList('entresijos',S30.entresijos,{banner:'🔍 ENTRESIJOS · '+INV})},
 {id:'entrenamientos',ic:'🏋',t:'Entrenamientos',s:'Ensayos con los concursantes y el público',run:()=>runList('entrenamientos',S30.entrenamientos,{banner:'🏋 ENTRENAMIENTOS · '+INV})},
 {id:'fuera',ic:'🎥',t:'Fuera de cámaras',s:'Cafetería, pasillos, camerinos y el final del día',run:()=>runList('fuera',S30.fuera,{banner:'🎥 FUERA DE CÁMARAS · '+INV})},
 {id:'oculta',ic:'📹',t:'Cámara oculta',s:'Sorpresas bonitas para el equipo',run:()=>runList('oculta',S30.oculta,{banner:'📹 CÁMARA OCULTA · '+INV})},
 {id:'tomas',ic:'😂',t:'Tomas falsas',s:'Lapsus y risas · «¡Vamos otra vez!»',run:()=>runList('tomas',S30.tomas,{banner:'😂 TOMAS FALSAS · '+INV})},
 {id:'hw_making',ic:'🎃',t:'Making of de Halloween',s:'Decoramos el plató: calabazas, telarañas y luces · '+INV,run:()=>runList('making',S30.hw_making,{banner:'🎃 MAKING OF HALLOWEEN · '+INV,hw:1})},
 {id:'hw_entresijos',ic:'🎃',t:'Entresijos de Halloween',s:'Disfraces en maquillaje y vestuario · '+INV,run:()=>runList('entresijos',S30.hw_entresijos,{banner:'🎃 ENTRESIJOS HALLOWEEN · '+INV,hw:1})},
 {id:'hw_fuera',ic:'🎃',t:'Fuera de cámaras de Halloween',s:'Bromas de miedo… ¡de risa! · '+INV,run:()=>runList('fuera',S30.hw_fuera,{banner:'🎃 FUERA DE CÁMARAS HALLOWEEN · '+INV,hw:1})},
 {id:'historia',ic:'📜',t:'La historia del programa',s:'El presentador cuenta la historia de Pasapalabra (datos reales)',run:()=>runList('historia',S30.historia,{banner:'📜 LA HISTORIA DE PASAPALABRA'})},
 {id:'cab2000',ic:'🌐',t:'Cabecera de los 2000 en 3D',s:'Recreación de la cabecera de Antena 3 (2000-2006) con su música original · «Dirección»: nombre '+INV,run:()=>scene9(async rid=>{await CAB2000_30(rid);},{back:'pp30'})},
 {id:'edificio',ic:'🏢',t:'Paseo por el estudio de TV',s:'Recepción, maquillaje, peluquería, vestuario, control… estilo Record TV · '+INV,run:()=>{location.href='estudio/index.html?sala=exterior&show=pasapalabra';}},
 {id:'edfuera',ic:'🏢',t:'Fuera de cámaras en el edificio',s:'Escenas en las salas del estudio de TV · '+INV,run:()=>{location.href='estudio/index.html?modo=fuera&show=pasapalabra';}},
 {id:'edtomas',ic:'🏢',t:'Tomas falsas en el estudio',s:'Lapsus en los platós del edificio · '+INV,run:()=>{location.href='estudio/index.html?modo=tomasfalsas&show=pasapalabra';}}
].filter(m=>{if(typeof m.run!=='function'){console.error('pp30: modo sin manejador',m.id);return false;}return true;});
window.PP30={MODES:MODES30,fnv,check:()=>MODES30.every(m=>typeof m.run=='function')&&Object.keys(S30).every(k=>S30[k].length)};
SCR9.pp30=()=>`<h2>🎬 Detrás de las cámaras</h2><div class="mtext">Paquete del estudio (como «¡Ahora Caigo!» 1.69): todo es ${INV} salvo la historia. Cada frase tiene voz grabada y un recuadro de reportaje con vídeos e imágenes.</div>${MODES30.map(m=>mb9('x30:'+m.id,m.ic,m.t,m.s)).join('')}
${mb9('x30:logos','🏷','Rótulos de TV y logos','Mosca de la cadena por etapa, pantallas del plató con los logos de Iker')}
 <div class="orow" style="margin:8px 0"><label>🏟 PLATÓ REAL en las escenas (${INV}): <b>${OPT.real30?'Sí':'No'}</b></label> <button class="tbtn ${OPT.real30?'on':''}" data-go="x30:optreal">${OPT.real30?'Apagar':'Encender'}</button></div>
 <div class="orow" style="margin:8px 0"><label>🌐 CABECERA 3D 2000 al jugar con Jato/Romero/Cantizano: <b>${OPT.cab30?'Sí':'No'}</b></label> <button class="tbtn ${OPT.cab30?'on':''}" data-go="x30:optcab">${OPT.cab30?'Apagar':'Encender'}</button></div>
 <div class="orow" style="margin:8px 0"><label>📺 RECUADRO DE REPORTAJE: <b>${OPT.rep30?'Sí':'No'}</b></label> <button class="tbtn ${OPT.rep30?'on':''}" data-go="x30:optrep">${OPT.rep30?'Apagar':'Encender'}</button></div>${back9()}`;
function go30(g){const id=g.slice(4);if(id=='optreal'){OPT.real30=OPT.real30?0:1;saveOpt();realOn(!!OPT.real30);return showMenu('pp30');}
 if(id=='optcab'){OPT.cab30=OPT.cab30?0:1;saveOpt();return showMenu('pp30');}if(id=='optrep'){OPT.rep30=OPT.rep30?0:1;saveOpt();return showMenu('pp30');}
 const m=MODES30.find(x=>x.id==id);if(!m){console.error('pp30: sin manejador',id);return showMenu('pp30');}return m.run();}
window.go30=go30;
{const _sm=showMenu;showMenu=function(s){if(typeof s=='string'&&s.startsWith('x30:'))return window.go30(s);clean();const r=_sm.apply(this,arguments);
 try{if((s||'main')=='main'){const col=menu.querySelector('.col');if(col&&!col.querySelector('[data-go=pp30]')){const ref=col.querySelector('[data-go=extras9]')||col.querySelector('[data-go=opt]');
  const h=mb9('pp30','🎬','DETRÁS DE LAS CÁMARAS · ESTUDIO DE TV','Making of, plató real, entresijos, entrenamientos, fuera de cámaras, cámara oculta, tomas falsas e historia · '+INV);
  if(ref)ref.insertAdjacentHTML('beforebegin',h);else col.insertAdjacentHTML('beforeend',h);bind9(col,['pp30']);try{NAV.attach('main');}catch(e){}}
  // el botón antiguo de tomas falsas decía «¡Corten!»: ahora «¡Vamos otra vez!»
  col&&col.querySelectorAll('[data-go=tomas] small, [data-go=tomas] .ms, [data-go=tomas] span').forEach(e=>{if(e.childElementCount==0&&/corten/i.test(e.textContent))e.textContent=e.textContent.replace(/¡?corten!?/i,'¡Vamos otra vez!');});}}catch(e){console.error(e);}
 try{$('#ver').textContent='v0.31';}catch(e){}
 return r;};}
setTimeout(()=>{try{if(OPT.real30)realOn(true);}catch(e){}},1500);
{const d=new Date(),hw=d.getMonth()==9&&d.getDate()==31;if(localStorage.getItem('pp30_hw_auto')=='1'&&!hw){if(OPT.tema=='halloween'){OPT.tema='normal';try{saveOpt();}catch(e){}}localStorage.removeItem('pp30_hw_auto');}if(hw&&(!OPT.tema||OPT.tema=='normal')){localStorage.setItem('pp30_hw_auto','1');OPT.tema='halloween';}}
// ---------- Navidad: árbol con luces y regalos en las ediciones navideñas ----------
let TREE=null,tt=0;anim(dt=>{tt+=dt;if(tt<.5)return true;tt=0;const want=/navidad|findeano|reyes|nochebuena|mayores/.test(OPT.tema||'');
 if(want&&!TREE&&window.EstudioNavidad){TREE=new T.Group();TREE.add(EstudioNavidad.add(T,TREE,{x:-6.2,y:0,z:-3.6,escala:1.5,regalos:6}));TREE.add(EstudioNavidad.add(T,TREE,{x:6.2,y:0,z:-3.6,escala:1.5,regalos:6,seed:7}));P.root.add(TREE);}
 else if(!want&&TREE){EstudioNavidad.free(TREE);TREE=null;}if(TREE)EstudioNavidad.tickAll(TREE);return true;});
// ---------- reanudar audio con el primer toque (nunca bloquea) ----------
addEventListener('pointerdown',()=>{if(VA&&VA.paused){VA.play().catch(()=>{});}},true);
// ---------- cabecera 2000 en las etapas de Antena 3 2000-2006 (opción) ----------
try{const _c=cabecera;cabecera=async function(rid){if(OPT.cab30&&[2000,2002,2006].includes(+OPT.a3)&&window.CAB2000_30)return CAB2000_30(rid,true);return _c.apply(this,arguments);};}catch(e){console.error('pp30 cab',e);}
})();
