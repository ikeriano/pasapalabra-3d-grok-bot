// ======================================================================
//  v0.6 — Final de programa con créditos, copiado de «¡Ahora Caigo!» 1.58
//  (dx()/Td.final/finCard): despedida del presentador con bocadillo,
//  créditos que suben en un panel a la derecha, «Saltar ⏭», y al final el
//  logo de Pasapalabra girando con confeti y «Una producción de Iker».
// ======================================================================
(()=>{const st=document.createElement('style');st.textContent=`
#cr6{position:fixed;right:2.5vw;top:6vh;bottom:6vh;width:min(40vw,360px);z-index:21;overflow:hidden;background:rgba(4,12,40,.62);border:1px solid #fff3;border-radius:14px;pointer-events:none;transition:opacity .8s;
 -webkit-mask-image:linear-gradient(transparent,#000 12%,#000 88%,transparent);mask-image:linear-gradient(transparent,#000 12%,#000 88%,transparent)}
#cr6.fadeout{opacity:0}#cr6 .in{position:absolute;left:0;right:0;top:100%;padding:0 16px;text-align:center;color:#fff;font:600 clamp(11px,1.9vw,15px)/1.45 N,Arial;text-shadow:0 2px 3px #000;will-change:transform}
#cr6 h5{margin:16px 0 3px;color:#ffd23a;font:900 clamp(11px,1.8vw,14px)/1.2 N,Arial;letter-spacing:1px;text-transform:uppercase}
#bb6{position:fixed;left:38%;top:16vh;transform:translateX(-50%);z-index:21;max-width:min(46vw,420px);background:#fff;color:#06164a;border-radius:18px;padding:8px 16px;font:700 clamp(12px,2vw,17px)/1.3 Arial;box-shadow:0 4px 14px #0008;pointer-events:none}
#bb6 b{display:block;color:#c8102e;font:900 12px Arial;letter-spacing:1px;text-transform:uppercase}
#bb6:after{content:'';position:absolute;left:46%;bottom:-14px;border:9px solid transparent;border-top:14px solid #fff;border-bottom:0}
#fin6{position:fixed;inset:0;z-index:22;pointer-events:none;perspective:900px}
#fin6 img{position:absolute;right:4vw;top:50%;height:58vh;transform:translate(130%,-50%);transition:transform .8s cubic-bezier(.2,1.3,.4,1)}
#fin6 img.in{transform:translate(0,-50%);animation:spin6 7s ease-in-out .8s infinite}
@keyframes spin6{from{transform:translate(0,-50%) rotateY(0)}to{transform:translate(0,-50%) rotateY(360deg)}}
#fin6 div{position:absolute;left:4vw;top:50%;color:#fff;font:900 clamp(18px,4vw,40px) N,Arial,sans-serif;text-shadow:0 0 14px #39c8ff,0 3px 4px #000;transform:translate(-130vw,-50%);transition:transform .8s cubic-bezier(.2,1.3,.4,1) .3s}
#fin6 div.in{transform:translate(0,-50%)}`;document.head.appendChild(st);})();
const C6={
 host:()=>({2007:'Christian Gálvez',2011:'Christian Gálvez',2014:'Christian Gálvez',2017:'Christian Gálvez',2019:'Christian Gálvez'})[OPT.etapa]||'Christian Gálvez',
 list(){const E=(typeof ETAPAS!=='undefined'&&ETAPAS[OPT.etapa])||{},N=E.names||{};const riv=V5.rivalN||'Equipo naranja';
  return [['Presentado por',[C6.host()+' (presentador virtual)']],
  ['Concursantes',['Equipo azul: tú y tus dos invitados famosos',riv+': el rival y sus dos invitados','Etapa '+OPT.etapa+(OPT.tema&&OPT.tema!='normal'?' · programa temático':'')]],
  ['Juego creado por',['Iker']],
  ['Basado en',['«Pasapalabra»','Telecinco (2007-2019) · Antena 3 (2000-2006 y desde 2020)']],
  ['Música y sonidos',['Sintonías, cabeceras, cortinillas y despedidas','de los programas originales','Juego de móvil Pasapalabra (2007)']],
  ['Voz del presentador',['Clips reales de Christian Gálvez','Piper TTS es_ES-davefx-medium (CC0)']],
  ['Público de las gradas',['Maniquíes virtuales con gorras','Aplausos del programa original']],
  ['Tipografía',['Keedy Sans']],
  ['Platós',['Recreados en 3D a partir de fotos: 2007, 2011, 2014, 2017 y 2019']],
  ['Pruebas y especiales',['Rosco, La pista, Letra a letra, Palabras cruzadas, ¿Dónde están?, Silla azul…','Especiales según Wikipedia']],
  ['Formato original',['«The Alphabet Game» (Reino Unido)']],
  ['Librerías',['Three.js (MIT)']],
  ['Agradecimientos',['A todos los concursantes de Pasapalabra','y a ti por jugar']]];},
 clip(k){if(OPT.vozp<=0||(OPT.mus<=0&&OPT.sfx<=0))return null;try{const a=new Audio('snd/p6/'+k+'.ogg');a.volume=Math.min(1,OPT.vozp||1);a.play().catch(()=>{});return a;}catch(e){return null;}},
 clean(){['cr6','bb6','fin6'].forEach(i=>{const e=document.getElementById(i);e&&e.remove();});if(C6.a){try{C6.a.pause();}catch(e){}C6.a=null;}C6.orb=0;}};
async function creditos6(rid){C6.clean();const myR=RUN;let skip=false;
 const sk=$('#skip'),old=[sk.textContent,sk.onpointerdown,sk.classList.contains('hidden')];sk.textContent='Saltar ⏭';sk.classList.remove('hidden');const ig=document.body.classList.contains('ingame');document.body.classList.add('ingame');
 sk.onpointerdown=e=>{e.preventDefault();skip=true;};
 const W=async s=>{const t=performance.now()+s*1000;while(performance.now()<t){if(skip||RUN!==myR)throw 'skip6';await new Promise(r=>setTimeout(r,80));}};
 try{clearG();MOSCA.visible=false;setPeople(false);P.host.visible=true;say();
  stopMusic();music(OPT.etapa==2007?'despedida':'desp'+OPT.etapa);
  // cámara que gira despacio alrededor del presentador (sin coste extra: solo mueve SHOT)
  const hp=P.host.getWorldPosition(V3(0,0,0));const orb={p:V3(0,2.2,9),l:V3(hp.x,hp.y+1.3,hp.z),f:40,dr:0};cut(orb);let t=0;C6.orb=1;anim(dt=>{if(!C6.orb)return false;t+=dt;const a=Math.sin(t*.12)*.5;orb.p.set(hp.x+Math.sin(a)*6.5-1.6,hp.y+2+Math.sin(t*.2)*.3,hp.z+Math.cos(a)*6.5);return true;});
  // créditos
  const cr=document.createElement('div');cr.id='cr6';cr.innerHTML='<div class="in">'+C6.list().map(([h,l])=>`<h5>${h}</h5>`+l.map(x=>`<div>${x}</div>`).join('')).join('')+'<h5>Una producción de Iker</h5><div style="height:20px"></div></div>';document.body.appendChild(cr);
  const inn=cr.firstChild,H=inn.offsetHeight+cr.offsetHeight,DUR=17;inn.style.transition=`transform ${DUR}s linear`;requestAnimationFrame(()=>requestAnimationFrame(()=>inn.style.transform=`translateY(${-H}px)`));
  clap(.8);sfx('aplauso');await W(1.2);
  // despedida con bocadillo (Piper davefx: no hay clip real de despedida de Christian en la app)
  const bb=document.createElement('div');bb.id='bb6';document.body.appendChild(bb);
  for(const [k,txt,d] of [['desp6a','¡Y esto ha sido todo por hoy! Muchas gracias por jugar con nosotros.',3.73],['desp6b','Mañana volvemos con un nuevo rosco y un bote todavía más grande. ¡Hasta mañana, y recordad: <span style="color:#c8102e">¡Pasapalabra!</span>',6.39]]){
   bb.innerHTML=`<b>${C6.host()}</b>${txt}`;C6.a=C6.clip(k);await W(d+.5);}
  bb.remove();clap(1);sfx('aplauso');await W(Math.max(1,DUR-12));
  cr.classList.add('fadeout');await W(.9);cr.remove();
  // logo final girando + confeti + «Una producción de Iker»
  cut({p:V3(0,4.5,13),l:V3(0,1.5,0),f:46,dr:0});C6.orb=0;
  const fin=document.createElement('div');fin.id='fin6';const img=new Image();img.src=logoURL(520,360);const tx=document.createElement('div');tx.textContent='Una producción de Iker';fin.append(img,tx);document.body.appendChild(fin);
  requestAnimationFrame(()=>requestAnimationFrame(()=>{img.classList.add('in');tx.classList.add('in');}));
  const BL=OPT.plato>=2014;FX5.conf(BL?['#2a6af0','#7fc8ff','#ffd23a','#fff']:['#c8102e','#ff6a8a','#ffd23a','#fff'],5);clap(1);sfx('aplauso');
  await W(5.5);}
 catch(e){if(e!=='skip6')throw e;}
 finally{C6.clean();stopMusic();FX5.off();sk.textContent=old[0];sk.onpointerdown=old[1];if(old[2])sk.classList.add('hidden');if(!ig)document.body.classList.remove('ingame');}
 if(RUN!==myR)throw new Stop();}
// fin de cada programa: resultado y bote como antes, y después los créditos
despedida=async function(rid){clearG();stopMusic();setPeople(false);cut('front');const a=GAME.res||[0,0];const T=V5.tema();if(T.conf||a[0]>=a[1])FX5.conf(T.conf||['#ffd23a','#2a6af0','#fff'],4);
 hostSay(a[0]==25?'¡Rosco completo! ¡Enhorabuena, campeón!':a[0]>=a[1]?`¡Ganas el programa con <b>${a[0]}</b> aciertos! ¡Mañana vuelves a por el bote!`:`¡Gran rosco, con <b>${a[0]}</b> aciertos! ¡Mañana más y mejor!`);
 if(a[0]<25){OPT.bote=(OPT.bote||60000)+6000;saveOpt();}
 await wait(3,rid);say();await creditos6(rid);MOSCA.visible=false;showMenu();};
// fin de cada especial
(()=>{let src=especial.toString();const a="await wait(2.6,rid);FX5.off();MOSCA.visible=false;showMenu('esp');";
 if(!src.includes(a))console.warn('v06 especial');src=src.replace(a,"await wait(2.6,rid);say();FX5.off();await creditos6(rid);MOSCA.visible=false;showMenu('esp');");(0,eval)('especial='+src);})();
Object.assign(DBG,{creditos6,C6});
// ---------- v0.6: cortinillas 3D y voz real de Christian también en los especiales ----------
// Antes: especial() y playDuel() anunciaban la prueba con hostSay() y llamaban a la prueba
// directamente (sin playCort ni voz('_pre')), y la Silla azul no tenía cortinilla (CORT.silla
// no existía, así que el parche de v0.5 sobre playCort la saltaba).
CORT.silla=CORT.silla||{title:['La Silla','Azul'],tx:0,ty:0,fs:88};
async function pre6(id,html,rid){cut('host');stopMusic();say();
 if(!await voz(id+'_pre',rid)){hostSay(html);await wait(2.2,rid);say();}
 await playCort(id,rid);await voz(id+'_exp',rid);}
const id6=fn=>fn===pistaMusical?'pista':fn===letraALetra?'letra':fn===palabrasCruzadas?'cruzadas':fn===dondeEstan?'donde':fn===rosco?'rosco':'x';
(()=>{let s=especial.toString();const R=[
 ["hostSay(l);await wait(2,rid);await fn(rid);","await pre6(id6(fn),l,rid);await fn(rid);"],
 ["hostSay('Y ahora, ¡<b>El Rosco</b>!');await wait(1.6,rid);await rosco(rid);","await pre6('rosco','Y ahora, ¡<b>El Rosco</b>!',rid);await rosco(rid);"]];
 for(const [a,b] of R){if(!s.includes(a))console.warn('v06 esp',a.slice(0,30));s=s.split(a).join(b);}
 s=s.replace(/await rosco\(rid\);win=GAME\.res\[0\]==25/,"await pre6('rosco','Y ahora, ¡<b>El Rosco</b>!',rid);$&");(0,eval)('especial='+s);
 let d=playDuel.toString();const a="await wait(2.2,rid);await rosco(rid);";if(!d.includes(a))console.warn('v06 duel');
 d=d.replace(a,"await wait(2.2,rid);say();await pre6('rosco','Vamos al <b>Rosco</b> final de Pasapalabra.',rid);await rosco(rid);");(0,eval)('playDuel='+d);})();
Object.assign(DBG,{pre6});
