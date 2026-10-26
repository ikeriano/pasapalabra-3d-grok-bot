'use strict';
// ===== v0.9 · bote hablado, acumulados, conversación, pruebas previas, extras, «Lo mejor», Silla Azul 2017, Juegos DVD =====
// Todo lo anterior (v0.1–v0.8) queda intacto: aquí solo se envuelven funciones con envoltorios.
Object.assign(OPT,{boteVoz:OPT.boteVoz===undefined?1:OPT.boteVoz,conversa:OPT.conversa||0,previas:OPT.previas||0,tomasIn:OPT.tomasIn||0,publiIn:OPT.publiIn||0});
const V9={a:null,n:0,hud:null};
const fmt9=n=>String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');
const key9=t=>String(t).replace(/<[^>]*>/g,'').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
const AMT9=n=>n>=60000&&n<=3000000&&n%6000==0||n==300000||n==25000;
function v9stop(){if(V9.a){try{V9.a.pause();}catch(e){}V9.a=null;}}
{const _s=V5.stop;V5.stop=function(){v9stop();return _s.apply(this,arguments);};}
function v9play(src){return new Promise(res=>{v9stop();if(OPT.vozp===0||OPT.mute5)return res(0);const a=new Audio('snd/'+src);a.volume=Math.min(1,Math.max(.05,OPT.vozp===undefined?1:OPT.vozp));V9.a=a;let d=false;const f=()=>{if(!d){d=true;res(1);}};a.onended=f;a.onerror=f;a.play().catch(f);setTimeout(f,14000);});}
async function v9seq(list,rid){for(const s of list){if(rid!==undefined&&rid!==RUN)throw new Stop();await v9play(s);}}
// frase con voz Piper es_ES (clips de v09voz.js): who H=presentador F/M/N=concursantes G=sharvard masculina
async function v9say(who,text,rid,name){say(`<b>${name||(who=='H'?'Presentador':'Concursante')}:</b> ${text}`);const c=typeof CLIPS9!=='undefined'&&CLIPS9[who+'|'+key9(text)];
 if(c&&OPT.vozp!==0&&!OPT.mute5){await v9play('p9/'+c[0]+'.ogg');}else await wait(Math.max(1.4,key9(text).length*.055),rid);
 if(rid!==undefined)chk(rid);}
// ---------- HUD: n.º de programa y acumulados (pantalla) ----------
function hud9(){if(!V9.hud){const d=document.createElement('div');d.id='hud9';d.style.cssText='position:fixed;top:4px;left:50%;transform:translateX(-50%);z-index:28;pointer-events:none;font:800 clamp(9px,2.6vh,15px) N,Arial,sans-serif;color:#fff;background:#0b2a7acc;border:2px solid #fff;border-radius:99px;padding:2px 14px;text-shadow:0 1px 3px #000;display:none;white-space:nowrap';document.body.appendChild(d);V9.hud=d;}
 const d=V9.hud;if(!document.body.classList.contains('ingame')||!OPT.progN||(window.V6&&V6.cur)){d.style.display='none';return;}
 const c=conc9();d.textContent=`${c.n} · programa nº ${OPT.progN} · acum. programa ${fmt9(GAME.acP||0)} € · acum. concursante ${fmt9((OPT.acC||0)+(GAME.acP||0))} €`;d.style.display='block';}
setInterval(()=>{try{hud9();}catch(e){}},700);
const conc9=()=>D9.conc[(OPT.concI||0)%D9.conc.length];
function acP9(){return Math.min(99900,Math.max(0,Math.round(((GAME.sec&&GAME.sec[0])||0)*100)));}
const noBote9=()=>!!((window.V6&&V6.cur)||(V5&&V5.noBote));
// ---------- bote en voz alta (ON por defecto) ----------
async function bAnnounce(kind,n,rid,delay){if(!OPT.boteVoz||OPT.vozp===0||OPT.mute5)return;if(delay)await wait(delay,rid);
 let seq=[];if(kind=='rosco'&&n==1542000)seq=['bote/real_rosco_1542000.ogg'];else if(kind=='sube'&&n==1488000)seq=['bote/real_sube_1488000.ogg'];
 else{if(!AMT9(n))return;if(kind!='inicio')seq.push('bote/pre_'+kind+'.ogg');seq.push('bote/a'+n+'.ogg');}
 await v9seq(seq,rid);}
async function acum9(rid,withProg){if(!OPT.boteVoz||OPT.vozp===0||OPT.mute5)return;GAME.acP=acP9();hud9();const seq=[];
 if(withProg&&OPT.progN>=1&&OPT.progN<=400)seq.push('bote/pg'+OPT.progN+'.ogg');
 const p=GAME.acP,c=(OPT.acC||0)+p;if(p>=100)seq.push('bote/pre_acp.ogg','bote/c'+p+'.ogg');if(c>=100&&c<100000)seq.push('bote/pre_acc.ogg','bote/c'+c+'.ogg');
 await v9seq(seq,rid);}
{const _b=bote;bote=async function(rid,won){
  if(won===false&&OPT.boteVoz&&!noBote9()){OPT.progN=(OPT.progN||0)+1;GAME.acP=0;saveOpt();hud9();const n=OPT.bote||60000;const p=bAnnounce('inicio',n,rid,1.2).catch(e=>{if(!(e instanceof Stop))console.warn(e);});
   await _b.apply(this,arguments);await p;if(OPT.progN<=400&&OPT.boteVoz)await v9play('bote/pg'+OPT.progN+'.ogg');
   if(OPT.conversa&&OPT.progN==1)await convo9(rid);return;}
  if(won===false&&!noBote9()){OPT.progN=(OPT.progN||0)+1;GAME.acP=0;saveOpt();}
  return _b.apply(this,arguments);};}
{const _p8=premio8;premio8=async function(rid,o){o=o||{};const n=parseInt(String(o.amount||(OPT.bote||60000)).replace(/\D/g,''),10)||0;
  if(!o.noBoteVoz)await bAnnounce('gana',n,rid,0).catch(e=>{if(e instanceof Stop)throw e;});
  const r=await _p8.call(this,rid,o);
  if(!o.keep){OPT.progN=0;OPT.acC=0;OPT.concI=(OPT.concI||0)+1;saveOpt();}return r;};}
{const _pc=playCort;playCort=async function(id,rid){
  if(OPT.tomasIn&&id!='rosco'&&!/^prev_/.test(id)&&Math.random()<.5)await toma9(rid,'in');
  if(OPT.publiIn&&V9.n==1&&id!='rosco'){await publi9(rid,Math.floor(Math.random()*D9.publi.length),'in');}
  V9.n++;
  await _pc.apply(this,arguments);
  if(id=='rosco'&&!noBote9()&&OPT.boteVoz&&OPT.vozp!==0){cut('host');const n=OPT.bote||60000;GAME.acP=acP9();hud9();
   hostSay(`En juego, <b>${fmt9(n)} €</b>. Acumulado del programa: <b>${fmt9(GAME.acP)} €</b>`);try{await bAnnounce('rosco',n,rid,0);await acum9(rid,true);}catch(e){if(e instanceof Stop)throw e;}say();}};}
{const _d=despedida;despedida=async function(rid){const a=GAME.res||[0,0];GAME.acP=acP9()+100*(a[0]||0);
  if(!noBote9()&&!GAME.boteDone){OPT.acC=Math.min(99900,(OPT.acC||0)+GAME.acP);saveOpt();hud9();}
  if(OPT.boteVoz&&!noBote9()&&!GAME.boteDone&&a[0]<25&&OPT.vozp!==0){const n=(OPT.bote||60000)+6000;cut('front');hostSay(`El bote sube a <b>${fmt9(n)} €</b>`);
   try{await bAnnounce('sube',n,rid,.3);}catch(e){if(e instanceof Stop)throw e;}}
  return _d.apply(this,arguments);};}
{const _pg=programa;programa=function(){V9.n=0;syncPrev9();return _pg.apply(this,arguments);};}
// ---------- primer programa: presentación y conversación (concursantes FICTICIOS) ----------
async function convo9(rid){const c=conc9();cut('host');await wait(.3,rid);
 say(`<b>Concursante ficticio de esta partida:</b> ${c.n}, ${c.d}`);await wait(1.8,rid);
 for(const l of c.L){chk(rid);cut(l.w=='H'?'host':'blue');await v9say(l.w=='H'?'H':c.v,l.t,rid,l.w=='H'?'Presentador':c.n.split(' ')[0]);await wait(.25,rid);}
 say();}
// ---------- escenas de extras ----------
async function scene9(fn,o={}){const rid=++RUN;MODE.menu=false;menu.classList.add('hidden');$('#ver').classList.add('hidden');document.body.classList.add('ingame');setPeople(false);P.host.visible=true;MOSCA.visible=false;clearG();setActs();
 const sk=$('#skip');sk.classList.remove('hidden');if(o.banner)FX5.banner(o.banner);if(o.tint)FX5.tint(o.tint);if(o.music)music(o.music);
 try{await fn(rid);chk(rid);await wait(.4,rid);FX5.off();clearG();say();setActs();stopMusic();showMenu(o.back||'main');}catch(e){if(!(e instanceof Stop))console.error(e);}}
function emojiRain9(list,n,secs){const sp=[];for(let i=0;i<n;i++){const s=TH6.emoji(pick(list));s.scale.setScalar(rnd(40,80));s.position.set(rnd(-GW/2,GW/2),rnd(360,700),rnd(60,200));s.userData.v=rnd(150,320);G.add(s);sp.push(s);}
 let t=0;anim(dt=>{t+=dt;sp.forEach(s=>{s.position.y-=s.userData.v*dt;s.rotation.z+=dt;});return t<secs&&RUN>0;});return sp;}
async function claqueta9(rid,txt){const g=new T.Group();const body=bar(320,170,0x151515,txt||'TOMA 13',{fs:44});const top=new T.Group();const clap=bar(320,50,0x222222,'▰▱▰▱▰▱▰▱',{fs:34});clap.position.set(160,25,0);top.add(clap);top.position.set(-160,95,2);top.rotation.z=.75;g.add(body,top);g.position.set(0,40,120);g.scale.setScalar(.01);G.add(g);
 await tween(.5,e=>{g.scale.setScalar(.01+e*1.1);},eback||(x=>x));await tween(.18,e=>{top.rotation.z=.75*(1-e);});sfx('error');sfx('aplauso');await wait(.9,rid);return g;}
async function toma9(rid,mode,idx){prep();const t=idx===undefined?D9.tomas[Math.floor(Math.random()*D9.tomas.length)]:D9.tomas[idx];cut('host');
 const emos={lapsus:['😅','🙈','💬','🤪'],broma:['🎉','🦆','🍬','🎊'],corten:['🎬','🎥','🎞️','👏']}[t.k];
 if(t.k=='lapsus'){const b=bigTxt(560,150,'¡UY!',{grad:['#fff','#ffd0d0'],side:'#a01010',layers:9,glow:'#ff6060'});b.position.set(0,150,100);b.scale.setScalar(.01);G.add(b);sfx('error');tween(.5,e=>{b.scale.setScalar(.01+e);b.rotation.z=(1-e)*.8;});let q=0;anim(dt=>{q+=dt;b.rotation.z=Math.sin(q*9)*.07;return !!b.parent;});}
 if(t.k=='broma'){emojiRain9(emos,36,5);}
 if(t.k=='corten'){emojiRain9(emos,18,4);}
 say('<b>🎬 TOMA FALSA</b>');await v9say('H',t.t,rid,'Presentador');
 const g=await claqueta9(rid,t.k=='corten'?'¡CORTEN!':'TOMA '+(13+Math.floor(Math.random()*30)));clearG();say();}
async function publi9(rid,i,mode){prep();const p=D9.publi[i];cut('front');say('<b>📺 PUBLICIDAD</b>');
 const b=bigTxt(Math.min(GW-120,760),120,p.n.replace(/«|»/g,'').toUpperCase(),{grad:['#fff','#ffe680','#f0a000'],side:'#7a3c00',layers:8,glow:'#ffcf40'});b.position.set(0,170,100);b.scale.setScalar(.01);G.add(b);tween(.6,e=>b.scale.setScalar(.01+e));
 emojiRain9(['🛏️','🍪','⌚','☂️','⭐'],14,6);const c=bar(Math.min(GW-160,700),54,COL.rd,'ANUNCIO FICTICIO DE PASAPALABRA 3D',{fs:20});c.position.set(0,-250,0);G.add(c);
 await v9say('N',p.t,rid,p.n);clearG();say();}
async function fuera9(rid){prep();say('<b>🎥 FUERA DE CÁMARAS</b>');FX5.tint&&0;const sh=['wide','host','front','blue','orange'];let k=0;
 for(const l of D9.fuera){chk(rid);cut(sh[k++%sh.length]);await v9say(l.w,l.t,rid,{H:'Presentador',F:'Ayudante',M:'Técnico',N:'Público'}[l.w]);await wait(.2,rid);}clearG();}
async function camlibre9(rid){prep();const sh=['wide','wide2','host','hostc','front','blue','orange','team_b','team_o','rosco','aud','craneA','orbitR'].filter(k=>SHOTS[k]);const names={wide:'Plató general',wide2:'Plató abierto',host:'Presentador',hostc:'Presentador (cerca)',front:'Frontal',blue:'Equipo azul',orange:'Equipo naranja',team_b:'Concursante azul',team_o:'Concursante naranja',rosco:'Rosco',aud:'Público',craneA:'Grúa',orbitR:'Órbita'};
 say('<b>🎥 CÁMARA LIBRE</b> · elige un plano');for(;;){chk(rid);const k=await new Promise(r=>{setActs([...sh.map(s=>({t:names[s]||s,ic:'🎥',cls:'y',cb:()=>r(s)})),{t:'Salir',ic:'↩',cb:()=>r(null)}]);const ac=$('#acts');if(ac){ac.style.flexWrap='wrap';ac.style.maxHeight='88vh';ac.style.alignContent='flex-end';ac.style.justifyContent='flex-end';ac.style.gap='5px';ac.querySelectorAll('.mbtn').forEach(x=>{x.style.padding='4px 12px';x.style.fontSize='clamp(11px,2.9vh,16px)';});}});setActs();const ac2=$('#acts');if(ac2)ac2.style.cssText='';if(!k)break;cut(k);}clearG();}
// ---------- Pruebas previas del juego (INVENTADAS · opción OFF) ----------
const PREV9={2007:'prev_vf',2011:'prev_pares',2014:'prev_intruso',2017:'prev_letra',2019:'prev_flash'};
Object.assign(CORT,{prev_vf:{title:['Verdadero','o Falso'],tx:0,ty:0,fs:84},prev_pares:{title:['Parejas','de Memoria'],tx:0,ty:0,fs:80},prev_intruso:{title:['El','Intruso'],tx:0,ty:0,fs:96},prev_letra:{title:['Empieza','por…'],tx:0,ty:0,fs:90},prev_flash:{title:['Rosco','Relámpago'],tx:0,ty:0,fs:84}});
// Equipos de las pruebas previas (tonos medidos en Nochevieja 31-12-2018, fotogramas n_560/n_720: marco naranja #fa8804–#fc8908, marco azul #1269f4–#104df5)
const TEAM9={az:{n:'AZUL',c:0x1269f4,d:0x0b3fb0,t:['#5aa0ff','#0b3fb0'],tint:'rgba(18,105,244,.16)',i:0,shot:'blue'},na:{n:'NARANJA',c:0xfa8804,d:0xc86400,t:['#ffc060','#d86a00'],tint:'rgba(250,136,4,.16)',i:1,shot:'orange'}};
const PT9={team:null};
async function prevEnd9(ac,per,rid,st){st.on=false;say();setActs();TAP=null;chk(rid);sfx('winner');const tm=PT9.team||TEAM9.az;GAME.sec[tm.i]+=ac*per;
 await rotulo(`${tm.n}: ${ac} ACIERTOS · +${ac*per} s`,tm.c,rid);clearG();}
// cada prueba previa se juega por turnos: primero el AZUL y luego el NARANJA (nunca a la vez); los grafismos cambian de color con el equipo que juega
function turnos9(fn){return async function(rid){const sv={bl:COL.bl,blD:COL.blD,or:COL.or,orD:COL.orD};
 try{for(const k of ['az','na']){const tm=TEAM9[k];PT9.team=tm;PT9.turn=k=='az'?0:1;const o=TEAM9[k=='az'?'na':'az'];
   COL.bl=tm.c;COL.blD=tm.d;COL.or=o.c;COL.orD=o.d;window.TIMERC9=tm.t;try{FX5.tint(tm.tint);}catch(e){}
   await rotulo(`TURNO DEL EQUIPO ${tm.n}`,tm.c,rid,1.3);clearG();await fn(rid);chk(rid);}}
 finally{Object.assign(COL,sv);window.TIMERC9=null;PT9.team=null;try{FX5.tint('');}catch(e){}}};}
function timerSetup9(secs,rid){const st={t:secs};const tm=yTimer();tm.position.set(-GW/2+90,-262,20);G.add(tm);tm.set(secs);clockRun(st,tm,rid);return st;}
function tapWait9(st,rid){return new Promise(r=>{TAP=i=>{if(i===null)return;TAP=null;r(i);};anim(()=>{if(st.t<=0||rid!==RUN){TAP=null;r(-1);return false;}return TAP!==null;});});}
const introPrev9=async(rid,t,extra)=>{cut('host');if(!PT9.turn)await v9say('H','Esta es una prueba previa del juego, inventada para este Pasapalabra 3D. Juegan dos equipos, el azul y el naranja, por turnos.',rid);hostSay(t);await wait(PT9.turn?1.8:3,rid);say();};
async function pVF(rid){prep();await introPrev9(rid,'<b>Verdadero o falso</b>: toca el botón. Cada acierto suma <b>2 segundos</b>.');cut((PT9.team||TEAM9.az).shot);const st=timerSetup9(40,rid);let ac=0;const qs=shuffle(D9.vf.slice());
 const w=Math.min(GW-100,780);const qb=bar(w,90,COL.bl,'',{fs:24});qb.position.set(0,150,0);G.add(qb);
 const bv=bar(250,70,COL.gr,'VERDADERO',{fs:26}),bf=bar(250,70,COL.rd,'FALSO',{fs:26});bv.position.set(-160,-20,0);bf.position.set(160,-20,0);bv.userData.tap=1;bf.userData.tap=0;G.add(bv,bf);
 for(const q of qs){if(st.t<=0)break;qb.setT(q.t);const a=await tapWait9(st,rid);chk(rid);if(a<0)break;const ok=a===q.v;if(ok){ac++;sfx('ok');}else sfx('error');(a?bv:bf).setC(ok?COL.or:0x7a1010);await wait(.5,rid);bv.setC(COL.gr);bf.setC(COL.rd);}
 await prevEnd9(ac,2,rid,st);}
async function pPares(rid){prep();await introPrev9(rid,'<b>Parejas de memoria</b>: toca dos cartas para encontrar las iguales. Cada pareja, <b>3 segundos</b>.');cut((PT9.team||TEAM9.az).shot);const st=timerSetup9(60,rid);
 const em=shuffle(['🍎','🐶','⭐','🚗','🎈','🌙']);const deck=shuffle([...em,...em]);const cards=deck.map((e,i)=>{const b=bar(150,84,COL.bl,'?',{fs:44});b.position.set(-285+(i%4)*190,200-Math.floor(i/4)*110,0);b.userData.tap=i;G.add(b);return b;});
 let ac=0,done=new Set();while(st.t>0&&ac<6){const a=await tapWait9(st,rid);if(a<0)break;if(done.has(a))continue;cards[a].setT(deck[a],COL.or);sfx('ok');let b;do{b=await tapWait9(st,rid);}while(b===a||done.has(b));if(b<0)break;cards[b].setT(deck[b],COL.or);await wait(.7,rid);
  if(deck[a]===deck[b]){ac++;done.add(a);done.add(b);cards[a].setC(COL.gr);cards[b].setC(COL.gr);sfx('winner');}else{sfx('error');cards[a].setT('?',COL.bl);cards[b].setT('?',COL.bl);}}
 await prevEnd9(ac,3,rid,st);}
async function pIntruso(rid){prep();await introPrev9(rid,'<b>El intruso</b>: de cuatro palabras, una no pertenece al grupo. ¡Tócala! Cada acierto, <b>2 segundos</b>.');cut((PT9.team||TEAM9.az).shot);const st=timerSetup9(40,rid);let ac=0;
 for(const s of shuffle(D9.intr.slice())){if(st.t<=0)break;const ws=s.w.map((x,i)=>[x,i===s.i]);const sh=shuffle(ws);const bs=sh.map(([x],i)=>{const b=bar(300,70,COL.bl,x.toUpperCase(),{fs:28});b.position.set(-165+(i%2)*330,150-Math.floor(i/2)*90,0);b.userData.tap=i;G.add(b);return b;});
  const a=await tapWait9(st,rid);chk(rid);if(a<0)break;const ok=sh[a][1];bs[a].setC(ok?COL.gr:COL.rd);if(!ok)bs[sh.findIndex(x=>x[1])].setC(COL.gr);sfx(ok?'ok':'error');if(ok)ac++;await wait(.7,rid);bs.forEach(b=>G.remove(b));}
 await prevEnd9(ac,2,rid,st);}
async function pLetra(rid){prep();await introPrev9(rid,'<b>Empieza por…</b>: toca las tres palabras que empiezan por la letra. Cada ronda completa, <b>3 segundos</b>.');cut((PT9.team||TEAM9.az).shot);const st=timerSetup9(45,rid);let ac=0;
 for(const s of shuffle(D9.let.slice())){if(st.t<=0)break;const L=s.l;const big=bigTxt(220,200,L,{grad:['#fff','#ffe680','#f0a000'],side:'#7a3c00',layers:8,glow:'#ffcf40'});big.position.set(-GW/2+200,60,60);G.add(big);
  const ws=shuffle(s.w.slice());const bs=ws.map((x,i)=>{const b=bar(250,62,COL.bl,x.toUpperCase(),{fs:26});b.position.set(-20+(i%2)*270,170-Math.floor(i/2)*78,0);b.userData.tap=i;G.add(b);return b;});
  const isOk=x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'')[0].toUpperCase()===L;let need=ws.filter(isOk).length,got=0,bad=false;
  while(got<need&&st.t>0){const a=await tapWait9(st,rid);chk(rid);if(a<0)break;if(isOk(ws[a])){bs[a].setC(COL.gr);got++;sfx('ok');}else{bs[a].setC(COL.rd);sfx('error');bad=true;break;}}
  if(!bad&&got==need)ac++;await wait(.6,rid);G.remove(big);bs.forEach(b=>G.remove(b));}
 await prevEnd9(ac,3,rid,st);}
async function pFlash(rid){prep();await introPrev9(rid,'<b>Rosco relámpago</b>: una definición y tres respuestas. ¡Toca la correcta! Cada acierto, <b>3 segundos</b>.');cut((PT9.team||TEAM9.az).shot);const st=timerSetup9(40,rid);let ac=0;
 const idx=shuffle([...Array(25).keys()]);for(const i of idx){if(st.t<=0)break;const e=pick(ORIG.ROS[i]);if(!e)continue;const L=LETRAS[i];const right=e[0][0];const others=shuffle(idx.filter(j=>j!==i)).slice(0,2).map(j=>pick(ORIG.ROS[j])[0][0]);
  const sh=shuffle([[right,1],[others[0],0],[others[1],0]]);const qb=bar(Math.min(GW-80,800),110,COL.bl,`Empieza por ${L}: ${e[1]}`,{fs:20});qb.position.set(0,170,0);G.add(qb);
  const bs=sh.map(([x],k)=>{const b=bar(250,62,COL.or,x.toUpperCase(),{fs:24});b.position.set(-270+k*270,40,0);b.userData.tap=k;G.add(b);return b;});
  const a=await tapWait9(st,rid);chk(rid);if(a<0)break;const ok=sh[a][1];bs[a].setC(ok?COL.gr:COL.rd);if(!ok)bs[sh.findIndex(x=>x[1])].setC(COL.gr);sfx(ok?'ok':'error');if(ok)ac++;await wait(.8,rid);G.remove(qb);bs.forEach(b=>G.remove(b));}
 await prevEnd9(ac,3,rid,st);}
const PREVFN9={prev_vf:turnos9(pVF),prev_pares:turnos9(pPares),prev_intruso:turnos9(pIntruso),prev_letra:turnos9(pLetra),prev_flash:turnos9(pFlash)};
function syncPrev9(){for(const y of Object.keys(PREV9)){const E=ETAPAS[y];if(!E)continue;E.pr=E.pr.filter(p=>!/^prev_/.test(p[0]));
  if(OPT.previas){const id=PREV9[y];const i=E.pr.findIndex(p=>p[0]=='rosco');E.pr.splice(i<0?E.pr.length:i,0,[id,PREVFN9[id]]);E.lines=E.lines||{};E.lines[id]='Antes del rosco, una <b>prueba previa del juego</b> (inventada)';}}}
// ---------- La Silla Azul en 2017 (según el programa de Telecinco del 14-03-2017) ----------
async function sillaAzul17(rid){prep();cut('host');
 await v9say('H','Vamos con la Silla Azul. Aquí tenemos al concursante veterano y al aspirante que ocupa la silla azul.',rid);
 hostSay('<b>La Silla Azul</b> (2017): se muestran dos letras, una para cada concursante. Preguntas alternas, empieza el veterano. ¡Dos fallos y eliminado!');await wait(3.6,rid);say();
 const LET='ABCDEFGHIJLMNOPRSTUVZ';const pool=[];ORIG.ROS.forEach((a,i)=>{const L=LETRAS[i];if(!LET.includes(L))return;a.forEach(([ans,def])=>{if(norm(ans[0]).startsWith(L))pool.push([L,ans,def]);});});
 const ls=shuffle([...new Set(pool.map(q=>q[0]))]).slice(0,2);const mine=ls[0],his=ls[1];S9.show(['TÚ','VETERANO'],[mine,his]);
 const tiles=[mine,his].map((L,k)=>{const b=bigTxt(150,150,L,{grad:['#fff','#bcd8ff','#2a6af0'],side:'#0b2a7a',layers:8,glow:k?'#ffb050':'#60a0ff'});b.position.set(k?170:-170,60,80);b.scale.setScalar(.01);b.visible=false;G.add(b);return b;});
 sfx('ok');await tween(.6,e=>tiles.forEach(t=>t.scale.setScalar(.01+e)));hostSay(`La <b>${mine}</b> para ti y la <b>${his}</b> para el veterano.`);await wait(2.4,rid);
 const f=[0,0],letter=[mine,his];let turn=1,used=new Set(),n=0;
 while(f[0]<2&&f[1]<2&&n<8){chk(rid);n++;cut(turn?'orange':'blue');S9.turn(turn);const L=letter[turn];const q=pick(pool.filter(x=>x[0]==L&&!used.has(x[2])));if(!q)break;used.add(q[2]);
  hostSay(`<b>Empieza por ${L}:</b> ${q[2].charAt(0)+q[2].slice(1).toLowerCase()}`);let ok;
  if(turn==0){let tl=15;const v=await ask(()=>(tl-=.016)<=0||rid!==RUN);chk(rid);ok=v!==null&&q[1].some(a=>norm(a)===norm(v));}
  else{await wait(Math.max(2,V5.left()+.5),rid);ok=Math.random()<.7;say(`El veterano responde: <b>${ok?q[1][0]:'…'}</b>`);await wait(1.2,rid);}
  sfx(ok?'ok':'error');if(ok){if(turn==0)V5.doReact(1);await wait(1.2,rid);}
  else{f[turn]++;S9.fail(turn);say(`La respuesta correcta: <b>${q[1][0]}</b>`);await wait(1.2,rid);if(f[turn]==1){cut('host');await v9say('H','Primero fallito, ¿vale?',rid);}}
  turn=1-turn;}
 clearG();say();S9.hide();const w=f[0]<f[1]?0:f[1]<f[0]?1:-1;
 hostSay(w==0?'¡El veterano queda eliminado! Te quedas en la <b>Silla Azul</b> y sigues jugando.':w==1?'¡Quedas eliminado de la silla! Pero sigues jugando, ¡ánimo!':'¡Empate! Seguimos los dos.');sfx(w==1?'loser':'winner');await wait(2.6,rid);say();clearG();}
if(ETAPAS[2017]&&!ETAPAS[2017].pr.some(p=>p[0]=='silla')){ETAPAS[2017].pr.unshift(['silla',sillaAzul17]);ETAPAS[2017].lines=ETAPAS[2017].lines||{};ETAPAS[2017].lines.silla='Empezamos con la <b>Silla Azul</b>';ETAPAS[2017].names='Silla Azul, '+ETAPAS[2017].names;}
// ---------- menús ----------
const mb9=(go,ic,t,s)=>`<div class="mbtn" data-go="${go}"><span class="ic">${ic}</span><div>${t}${s?`<small>${s}</small>`:''}</div></div>`;
const esc9=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const back9=to=>mb9(to||'main','⟵','Volver','');
function lmItem9(kind,i,x){const dud=x.dud?`<br><b style="color:#ffd23a">⚠ Dudoso: ${esc9(x.dud)}</b>`:'';
 if(kind=='bote')return mb9('x9:bote:'+i,'🏆',`${esc9(x.n)} · ${fmt9(x.imp)} €`,`${esc9(x.f)} · ${esc9(x.c)}${x.nota?'<br>'+esc9(x.nota):''}<br><i>Fuente: ${esc9(x.src)}</i>${dud}`);
 return mb9('x9:'+kind+':'+i,kind=='rosco'?'🎯':'📺',esc9(x.t),`${esc9(x.d)}<br><i>Fuente: ${esc9(x.src)}</i>${dud}`);}
const SCR9={
 mejor:()=>`<h2>⭐ Lo mejor de Pasapalabra</h2><div class="mtext">Datos reales de la prensa y Wikipedia. Lo dudoso está marcado con ⚠. Toca un elemento para ver la recreación.</div>${mb9('mejor_botes','🏆','Mejores botes','12 botes más 318.000 € de Escartín')}${mb9('mejor_roscos','🎯','Mejores roscos y récords','')}${mb9('mejor_momentos','📺','Momentos','')}${back9()}`,
 mejor_botes:()=>`<h2>🏆 Mejores botes</h2>${D9.botes.map((x,i)=>lmItem9('bote',i,x)).join('')}${back9('mejor')}`,
 mejor_roscos:()=>`<h2>🎯 Mejores roscos y récords</h2>${D9.roscos.map((x,i)=>lmItem9('rosco',i,x)).join('')}${back9('mejor')}`,
 mejor_momentos:()=>`<h2>📺 Momentos</h2>${D9.momentos.map((x,i)=>lmItem9('momento',i,x)).join('')}${back9('mejor')}`,
 extras9:()=>`<h2>🎁 Extras</h2>${mb9('tomas9','🎬','Tomas falsas','Lapsus, bromas y «¡Corten!» con animaciones 3D')}${mb9('x9:fuera','🎥','Fuera de cámaras','Diálogos de plató con voces')}${mb9('publi9','📺','Publicidad','Anuncios ficticios del programa')}${mb9('promos','📣','Promos','')}${mb9('x9:cam','🎥','Cámara libre','Elige el plano de cámara')}${back9()}`,
 tomas9:()=>`<h2>🎬 Tomas falsas</h2>${mb9('x9:toma:all','▶','Ver todas','')}${D9.tomas.map((x,i)=>mb9('x9:toma:'+i,{lapsus:'😅',broma:'🎉',corten:'🎬'}[x.k],x.k=='lapsus'?'Lapsus':x.k=='broma'?'Broma':'¡Corten!',esc9(x.t))).join('')}${back9('extras9')}`,
 publi9:()=>`<h2>📺 Publicidad</h2><div class="mtext">Anuncios ficticios, creados para este juego.</div>${D9.publi.map((x,i)=>mb9('x9:publi:'+i,'📺',esc9(x.n),'')).join('')}${back9('extras9')}`};
const NEWMAIN9=[['mejor','⭐','Lo mejor de Pasapalabra','Mejores botes, roscos y momentos'],['extras9','🎁','Extras','Tomas falsas, fuera de cámaras, publicidad, promos y cámara libre'],['dvd9','🎲','Juegos DVD','El Pasapalabra clásico del DVD, con grafismos y vídeos originales']];
function bind9(col,only){col.querySelectorAll('[data-go]').forEach(b=>{const g=b.dataset.go;if(only&&!only.includes(g))return;b.onpointerdown=ev=>{ev.preventDefault();sfx('ok');if(g=='dvd9')return dvdGo9();if(g.startsWith('x9:'))return x9go(g);showMenu(g);};});}
{const _sm=showMenu;showMenu=function(s='main'){
  if(s=='dvd9'){dvdGo9();return;}
  if(SCR9[s]){_sm('cred');const col=menu.querySelector('.col');col.className='col';col.innerHTML=SCR9[s]();bind9(col);try{NAV.attach(s);}catch(e){console.error(e);}return;}
  const r=_sm(s);
  if(s=='main'){const col=menu.querySelector('.col'),opt=col&&col.querySelector('[data-go=opt]');if(opt&&!col.querySelector('[data-go=mejor]')){opt.insertAdjacentHTML('beforebegin',NEWMAIN9.map(x=>mb9(x[0],x[1],x[2],x[3])).join(''));bind9(col,['mejor','extras9','dvd9']);try{NAV.attach(s);}catch(e){}}}
  if(s=='opt'){const col=menu.querySelector('.col'),anchor=col&&col.querySelector('h2');if(anchor&&!col.querySelector('[data-o9]')){const rows=[['boteVoz','🎙️','Christian dice el bote'],['conversa','💬','Charla del 1.er programa (concursante ficticio)'],['previas','🧩','Pruebas previas del juego (inventadas)'],['tomasIn','🎬','Tomas falsas entre pruebas'],['publiIn','📺','Publicidad entre pruebas'],['pad8','🕹️','Cruceta de botones (alternativa a deslizar con el dedo)']];
    anchor.insertAdjacentHTML('afterend',rows.map(([k,ic,t])=>`<div class="orow"><label>${ic} ${t}: <b class="v9">${OPT[k]?'Sí':'No'}</b></label><input type="range" min="0" max="1" step="1" value="${OPT[k]?1:0}" data-o9="${k}"></div>`).join(''));
    col.querySelectorAll('[data-o9]').forEach(i=>i.oninput=()=>{OPT[i.dataset.o9]=+i.value;i.parentNode.querySelector('.v9').textContent=+i.value?'Sí':'No';saveOpt();if(i.dataset.o9=='pad8')try{NAV.pad();}catch(e){}});const t0=NAV.screen==s&&NAV.cur()?NAV.cur().textContent:null;try{NAV.attach(s);if(t0!==null){const k=NAV.items.findIndex(e=>e.textContent===t0);if(k>=0&&k!==NAV.idx)NAV.focus(k,true);}}catch(e){}}}
  return r;};}
let CL9=null;
function dvdGo9(){if(CL9)return;
 if(!window.montarClasico||!window.DVD_DATA){toast('El juego del DVD no se ha podido cargar');return;}
 RUN++;stopMusic();window.DVD9=1;menu.classList.add('hidden');$('#ver').classList.add('hidden');$('#c').style.visibility='hidden';
 const host=document.createElement('div');host.id='dvdhost9';host.style.cssText='position:fixed;inset:0;z-index:80;background:#000;touch-action:manipulation';document.body.appendChild(host);
 const opc={mus:1,voz:1,sfx:1,musVol:Math.max(.3,Math.min(1,OPT.mus||.8)),vozVol:1,extra:0,saltar:0};
 const salir=()=>{if(!CL9)return;const c=CL9;CL9=null;try{c.destruir();}catch(e){console.error(e);}host.remove();window.DVD9=0;$('#c').style.visibility='';last=performance.now();showMenu('main');};
 try{const c=montarClasico(host,{base:'dvdc/',data:window.DVD_DATA,opc,salir});CL9=c;c.salir9=salir;}catch(e){console.error(e);CL9=null;host.remove();window.DVD9=0;$('#c').style.visibility='';showMenu('main');}}
window.dvdGo9=dvdGo9;
{const ob=window.onBack;window.onBack=function(){if(CL9){CL9.salir9();return;}return ob&&ob.apply(this,arguments);};}
function x9go(g){const [,k,a]=g.split(':');
 if(k=='bote'){const b=D9.botes[+a];return scene9(async rid=>{cut('host');await v9say('H',b.say,rid);hostSay(`${b.n}: <b>${fmt9(b.imp)} €</b>${b.dud?' (⚠ dato dudoso, ver la lista)':''}`);
   const sv=OPT.etapa;if(b.n=='Fran González')OPT.etapa=2019;try{await premio8(rid,{amount:fmt9(b.imp)+' €',title:b.n.toUpperCase(),sub:b.f+' · '+b.c,keep:true,noBoteVoz:true,noClip:b.n!='Fran González'});}finally{OPT.etapa=sv;}},{back:'mejor_botes',banner:'⭐ LO MEJOR DE PASAPALABRA'});}
 if(k=='rosco'||k=='momento'){const x=(k=='rosco'?D9.roscos:D9.momentos)[+a];return scene9(async rid=>{cut('host');say(`<b>${esc9(x.t)}</b><br>${esc9(x.d)}`);FX5.conf(['#ffd23a','#2a6af0','#fff'],3);await v9say('H',x.say,rid);say(`<b>${esc9(x.t)}</b><br>${esc9(x.d)}`);await wait(4,rid);},{back:k=='rosco'?'mejor_roscos':'mejor_momentos',banner:'⭐ LO MEJOR DE PASAPALABRA'});}
 if(k=='toma'){return scene9(async rid=>{if(a=='all'){for(let i=0;i<D9.tomas.length;i++){await toma9(rid,'x',i);}}else await toma9(rid,'x',+a);},{back:'tomas9',banner:'🎬 TOMAS FALSAS'});}
 if(k=='fuera')return scene9(fuera9,{back:'extras9',banner:'🎥 FUERA DE CÁMARAS'});
 if(k=='publi')return scene9(rid=>publi9(rid,+a),{back:'publi9'});
 if(k=='cam')return scene9(camlibre9,{back:'extras9'});}
$('#ver').textContent='v0.9';
Object.assign(window.DBG||{},{V9,D9,toma9,publi9,fuera9,camlibre9,pVF,pPares,pIntruso,pLetra,pFlash,sillaAzul17,convo9,syncPrev9,scene9,x9go});
// ======================================================================
//  v0.9 · TÁCTIL NATURAL: deslizar con el dedo para desplazar menús y listas (inercia nativa del WebView),
//  tocar (al levantar el dedo, sin haberse movido) para elegir. La cruceta ▲◀✔▶▼ queda como alternativa.
//  En juego: deslizar para mover la selección entre opciones y tocar en un hueco para confirmar.
// ======================================================================
V8.native=true;
{const st=document.createElement('style');st.textContent=`
#menu .col,#menu .col *{touch-action:pan-y!important}
#menu .col{overflow-y:auto;-webkit-overflow-scrolling:touch;overscroll-behavior:contain;scroll-behavior:auto}
#menu input[type=range]{touch-action:pan-y!important}
.mcard,.mcard *{touch-action:pan-y!important}.mcard{-webkit-overflow-scrolling:touch;overscroll-behavior:contain}
#acts{touch-action:pan-x pan-y;overflow-x:auto}
#pad8{opacity:.78}#pad8.off9{display:none!important}
#sw9hint{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 4px);transform:translateX(-50%);z-index:29;pointer-events:none;font:800 clamp(9px,2.4vh,14px) N,Arial,sans-serif;color:#fff;background:#0b2a7acc;border-radius:99px;padding:2px 12px;display:none}
.mbtn.sw9{outline:4px solid #fff;box-shadow:0 0 0 8px #ff9d00,0 0 22px 8px rgba(255,170,0,.8);transform:scale(1.04)}
`;document.head.appendChild(st);}
// la cruceta se puede ocultar desde Opciones (por defecto visible: no se quita nada)
{const _pad=NAV.pad.bind(NAV);NAV.pad=function(){_pad();const p=$('#pad8');if(p)p.classList.toggle('off9',OPT.pad8===0);};}
OPT.pad8=OPT.pad8===undefined?1:OPT.pad8;
// deslizar en horizontal sobre una fila de Opciones (años, selectores): cambia al valor anterior/siguiente; en vertical se desplaza la lista
(()=>{let g=null;menu.addEventListener('pointerdown',e=>{if(!e.isPrimary)return;const r=e.target.closest&&e.target.closest('.orow');g=r&&!e.target.closest('input[type=range]')?{id:e.pointerId,x:e.clientX,y:e.clientY,r}:null;},true);
 menu.addEventListener('pointerup',e=>{if(!g||e.pointerId!==g.id)return;const dx=e.clientX-g.x,dy=e.clientY-g.y,r=g.r;g=null;
  if(Math.abs(dx)>=40&&Math.abs(dx)>Math.abs(dy)*1.5){const i=NAV.items.indexOf(r);if(i>=0){NAV.focus(i);NAV.side(dx>0?1:-1);e.stopImmediatePropagation();e.preventDefault();}}},true);
 menu.addEventListener('pointercancel',()=>{g=null;},true);})();
// selección por deslizamiento en juego
(()=>{const c=$('#c');const S={id:null,x:0,y:0,sel:-1,list:[],kind:null,hit:false};
 const cands=()=>{const a=[...document.querySelectorAll('#acts .mbtn')];if(a.length)return{kind:'acts',list:a};
  if(!TAP)return{kind:null,list:[]};const t=[];G.traverse(o=>{if(o.userData&&o.userData.tap!==undefined&&o.userData.tap!==null&&o.visible)t.push(o);});
  t.sort((p,q)=>{const a=new T.Vector3(),b=new T.Vector3();p.getWorldPosition(a);q.getWorldPosition(b);return Math.abs(b.y-a.y)>20?b.y-a.y:a.x-b.x;});return{kind:'3d',list:t};};
 const clear=()=>{document.querySelectorAll('.sw9').forEach(e=>e.classList.remove('sw9'));S.list.forEach(o=>{if(o.scale&&o.userData.sw9s){o.scale.setScalar(o.userData.sw9s);delete o.userData.sw9s;}});S.sel=-1;};
 const mark=()=>{const o=S.list[S.sel];if(!o)return;if(S.kind=='acts'){o.classList.add('sw9');o.scrollIntoView({inline:'nearest',block:'nearest'});}else{if(!o.userData.sw9s)o.userData.sw9s=o.scale.x;o.scale.setScalar(o.userData.sw9s*1.14);}};
 const hint=t=>{let h=$('#sw9hint');if(!h){h=document.createElement('div');h.id='sw9hint';document.body.appendChild(h);}h.textContent=t||'';h.style.display=t?'block':'none';};
 c.addEventListener('pointerdown',e=>{if(!e.isPrimary||MODE.menu)return;S.id=e.pointerId;S.x=e.clientX;S.y=e.clientY;},true);
 c.addEventListener('pointerup',e=>{if(e.pointerId!==S.id||MODE.menu)return;S.id=null;const dx=e.clientX-S.x,dy=e.clientY-S.y,d=Math.hypot(dx,dy);
  if(d>=40){const k=cands();if(!k.list.length)return;if(k.kind!==S.kind||k.list.length!==S.list.length||S.list[0]!==k.list[0]){clear();}S.kind=k.kind;S.list=k.list;
   const dir=Math.abs(dx)>Math.abs(dy)?(dx>0?1:-1):(dy>0?1:-1);const old=S.sel;clear();S.sel=old<0?(dir>0?0:S.list.length-1):(old+dir+S.list.length)%S.list.length;mark();sfx('splash');hint('Toca un hueco para confirmar');V9.swSel=S.sel;
   e.stopImmediatePropagation();return;}
  if(d<12&&S.sel>=0&&S.list.length){ // toque: si no cae sobre un objeto táctil, confirma la selección
   const o=S.list[S.sel];const kind=S.kind;
   if(kind=='acts'){if(o&&o.isConnected){const f=o.__f8;clear();hint('');if(f)f.call(o,{preventDefault(){},stopPropagation(){},clientX:0,clientY:0,isPrimary:true});}return;}
   if(kind=='3d'&&TAP&&o){mv.set(e.clientX/W*2-1,-(e.clientY/H)*2+1);ray.setFromCamera(mv,gcam);const h=ray.intersectObjects(G.children,true).find(x=>{let q=x.object;while(q&&q.userData.tap===undefined)q=q.parent;return !!q;});
    if(!h){const v=o.userData.tap;clear();hint('');sfx('ok');TAP(v,o);}else{clear();hint('');}}}
 },true);
 // al cambiar de prueba se limpia la selección
 setInterval(()=>{if(MODE.menu&&S.sel>=0){clear();hint('');}if(S.sel>=0&&S.kind=='3d'&&!TAP){clear();hint('');}if(S.sel>=0&&S.kind=='acts'&&!document.querySelector('#acts .mbtn')){clear();hint('');}},500);
 V9.sw=S;})();
