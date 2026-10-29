'use strict';
// v0.23 · ENTRENAMIENTO dentro de cada etapa + 🆕 INVENTADO: pruebas y escenas nuevas (desactivadas por defecto en Opciones)
(()=>{
if(OPT.inv23===undefined)OPT.inv23=0;
const INV='🆕 INVENTADO';
const NOM={escalera:'La escalera',pulsador:'El pulsador',depar:'De par en par',imposible:'La palabra imposible',rosco:'El rosco',letra:'Letra a letra',pista:'La pista',cruzadas:'Palabras cruzadas',quees:'¿Qué es qué?',coco:'Coco loco',silla:'La silla azul',u4:'Una de cuatro',sopa:'Sopa de letras',donde:'¿Dónde están?',cruz12:'Palabras cruzadas',una2:'Una de dos',piramide:'La pirámide',antes12:'Antes y después',j1:'De la A a la Z',j2:'La palabra incompleta',j3:'Famosos con pista',j4:'La pirámide',j5:'La palabra imposible'};
const ICO={rosco:'🔵',u4:'4️⃣',pista:'🎵',sopa:'🔠',donde:'🔢',silla:'💺',cruz12:'🔡',cruzadas:'🔡',letra:'🔤',coco:'🐝',quees:'❓',escalera:'🪜',pulsador:'🔴',depar:'🚪',imposible:'🚫',una2:'2️⃣',piramide:'🔺',antes12:'↔️'};
const ETS=[[2007,'T5 2007'],[2011,'T5 2011'],[2014,'T5 2014'],[2017,'T5 2017'],[2019,'T5 2019'],['a2000','A3 Jato 2000'],['a2002','A3 Romero 2002'],['a2006','A3 Cantizano 2006'],['a2020','A3 Leal 2020'],['a2023','A3 Leal 2023'],['a2026','A3 A la Z 2026']];
const curK=()=>OPT.a3?'a'+OPT.a3:OPT.etapa;
const curN=()=>{const k=curK();const e=ETS.find(x=>x[0]==k);return e?e[1]:String(k);};
const nom=(id)=>id=='rosco'&&OPT.a3==2026?'A la Z (final)':(NOM[id]||id);
function setEt(k){if(typeof k=='string'&&k[0]=='a'){setA3(+k.slice(1));}else{OPT.a3=0;OPT.etapa=OPT.plato=+k;try{applyPlato(+k);}catch(e){}OPT.final='rosco';}saveOpt();}
// ---------- pantalla ENTRENAMIENTO ----------
SCR9.ent23=()=>{const E=ETAPAS[OPT.etapa]||ETAPAS[2007];
 return `<h2>🎯 Entrenamiento · ${curN()}</h2><div class="mtext">Practica una prueba suelta o el rosco de esta etapa, sin programa completo. Cambia de etapa aquí abajo.</div>
 <div class="orow"><span class="a3w">${ETS.map(([k,n])=>`<button class="tbtn ${curK()==k?'on':''}" data-e23="${k}">${n}</button>`).join('')}</span></div>`+
 E.pr.map(([id],i)=>mb9('x23:tr:'+i,ICO[id]||'🎮',nom(id),id=='rosco'?'Rosco completo de entrenamiento':'Prueba suelta de la etapa '+curN())).join('')+
 (OPT.inv23?PRU.map((p,i)=>mb9('x23:inv:'+i,'🆕',`${INV} · ${p.n}`,p.d)).join(''):'')+back9('main');};
SCR9.inv23=()=>`<h2>${INV} · Pasapalabra</h2><div class="mtext"><b>Todo lo de esta pantalla es INVENTADO</b>: no existe en el programa real. Se puede desactivar en Opciones.</div>`+
 PRU.map((p,i)=>mb9('x23:inv:'+i,'🆕',`${INV} · Prueba: ${p.n}`,p.d)).join('')+ESC.map((e,i)=>mb9('x23:esc:'+i,e.ic,`${INV} · ${e.n}`,e.d)).join('')+back9('main');
function go23(g){const [,k,a]=g.split(':');
 if(k=='tr'){const E=ETAPAS[OPT.etapa]||ETAPAS[2007];const [id,fn]=E.pr[+a];return scene9(async rid=>{GAME.sec=[0,0];GAME.ac=[0,0];GAME.res=null;MOSCA.visible=true;
   cut('host');hostSay(`Entrenamiento: <b>${nom(id)}</b>. ¡Vamos allá!`);await wait(2,rid);say();await playCort(id,rid);await fn(rid);chk(rid);clearG();
   cut('host');const r=GAME.res;hostSay(id=='rosco'&&r?`Fin del entrenamiento: <b>${r[0]}</b> aciertos en el rosco.`:`Fin del entrenamiento: <b>${GAME.ac[0]}</b> aciertos y <b>${GAME.sec[0]}</b> segundos ganados.`);await wait(3,rid);},{back:'ent23',banner:'🎯 ENTRENAMIENTO · '+nom(id)});}
 if(k=='inv'){const p=PRU[+a];return scene9(async rid=>{MOSCA.visible=true;cut('host');hostSay(`${INV}. Prueba nueva: <b>${p.n}</b>. ${p.d}`);await wait(3.2,rid);say();await p.f(rid);},{back:OPT.inv23?'inv23':'main',banner:INV+' · '+p.n});}
 if(k=='esc'){const e=ESC[+a];return scene9(async rid=>{await e.f(rid);},{back:'inv23',banner:INV+' · '+e.n});}}
// ---------- utilidades para las pruebas inventadas ----------
const POOL=()=>{const o=[];Object.values(ORIG.ROS).forEach(L=>L.forEach(x=>{const w=x[0][0];if(w&&w.length<=11&&!/ /.test(w))o.push([w,x[1]]);}));return o;};
let PL=null;const pool=()=>PL||(PL=POOL());
function opts(n,good,filt){const P=pool();const o=[good];let g=0;while(o.length<n&&g++<500){const c=pick(P)[0];if(!o.includes(c)&&(!filt||filt(c)))o.push(c);}return shuffle(o);}
function mkOpts(list,y){return list.map((w,i)=>{const b=bar(300,52,COL.bl,w,{fs:24});b.position.set((i-(list.length-1)/2)*330,y,0);b.userData.tap=i;G.add(b);return b;});}
function q(w){const b=bar(Math.min(GW-200,1100),64,COL.or,'',{fs:22});b.position.set(0,-262,10);G.add(b);if(w)b.setT(w);return b;}
async function runQ(rid,secs,next){prep();cut('blue');const st={t:secs};const tm=yTimer();tm.position.set(-GW/2+90,262,20);G.add(tm);tm.set(secs);clockRun(st,tm,rid);let ac=0,busy=false,cur=null;
 const step=()=>{G.children.filter(o=>o.userData&&o.userData.tap!==undefined).forEach(o=>G.remove(o));cur=next();};step();
 TAP=async id=>{if(id===null||busy||!cur)return;busy=true;const ok=id===cur.ok;cur.b[id].setC(ok?COL.gr:COL.rd);if(!ok)cur.b[cur.ok].setC(COL.gr);sfx(ok?'ok':'error');if(ok)ac++;await wait(.6);if(cur.done)cur.done(ok);step();busy=false;};
 await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN){r();return false;}return true;}));st.on=false;TAP=null;chk(rid);clearG();cut('host');sfx('winner');hostSay(`¡Tiempo! Has conseguido <b>${ac}</b> aciertos.`);await wait(3,rid);return ac;}
const PRU=[
 {n:'Contrarreloj de definiciones',d:'30 segundos: lee la definición y toca la palabra correcta entre tres. Encadena todas las que puedas.',f:async rid=>{const qb=q();
   await runQ(rid,30,()=>{const [w,d]=pick(pool());const o=opts(3,w);qb.setT(d.toUpperCase());return {ok:o.indexOf(w),b:mkOpts(o,40)};});}},
 {n:'La palabra que se escapa',d:'La palabra se va destapando letra a letra: acierta su definición antes de que se vea entera. 40 segundos.',f:async rid=>{const qb=q();let iv=null;
   await runQ(rid,40,()=>{clearInterval(iv);const [w,d]=pick(pool());const P=pool();const ds=[d];let g=0;while(ds.length<3&&g++<99){const x=pick(P)[1];if(!ds.includes(x))ds.push(x);}const o=shuffle(ds);let n=1;
     const sh=()=>qb.setT(w.split('').map((c,i)=>i<n?c:'·').join(' '));sh();iv=setInterval(()=>{if(n<w.length){n++;sh();}},900);
     const b=o.map((x,i)=>{const bb=bar(Math.min(GW-240,1000),48,COL.bl,x.length>70?x.slice(0,68)+'…':x,{fs:17});bb.position.set(0,150-i*62,0);bb.userData.tap=i;G.add(bb);return bb;});return {ok:o.indexOf(d),b,done:()=>clearInterval(iv)};});clearInterval(iv);}},
 {n:'Cadena de palabras',d:'Encadena palabras: la siguiente tiene que empezar por la última letra de la anterior. 40 segundos.',f:async rid=>{const qb=q();let cur=pick(pool())[0];
   await runQ(rid,40,()=>{const L=cur.slice(-1);const P=pool().filter(x=>x[0][0]==L&&x[0]!=cur);const good=P.length?pick(P)[0]:pick(pool())[0];const o=opts(3,good,c=>c[0]!=L);qb.setT(`${cur} → ¿…${L}?`);const r={ok:o.indexOf(good),b:mkOpts(o,40),done:ok=>{if(ok)cur=good;else cur=pick(pool())[0];}};return r;});}}];
// ---------- escenas inventadas (plató 3D, presentador y público) ----------
const lines=async(rid,L)=>{for(const [sh,t,s] of L){if(sh)cut(sh);hostSay(t);await wait(s||3,rid);}say();};
const ESC=[
 {n:'Cámara oculta',ic:'🎥',d:'El presentador gasta una broma al público con un rosco «trucado».',f:async rid=>{FX5.tint('rgba(0,0,0,.55)');
   await lines(rid,[['wide','Silencio… las cámaras están escondidas. El público no sabe nada.',3.4],['host','Hoy el rosco tiene una sola letra: ¡la A! A ver quién se da cuenta.',3.6],['team_b','Nadie lo ha notado… ¡qué cara de concentración!',3]]);
   FX5.tint('');FX5.conf(['#ffd23a','#4a8dff','#fa8804']);await lines(rid,[['host','¡Era una cámara oculta! ¡Un aplauso para nuestro público!',3.4]]);}},
 {n:'Tomas falsas',ic:'🎬',d:'Errores, risas y repeticiones de la grabación.',f:async rid=>{for(const [n,t] of [['TOMA 1','¡Bienvenidos a Pasatiempo! Perdón… ¡a Pasapalabra!'],['TOMA 2','Empieza por la… ¿dónde está la ficha? ¡Se me ha caído!'],['TOMA 3','¡Rosco completo! Ah, no, que todavía no hemos empezado.']]){clearG();try{await claqueta9(rid,n);}catch(e){if(e instanceof Stop)throw e;}cut('host');hostSay(t);await wait(3.2,rid);cut('wide');sfx('error');hostSay('¡Corten! Vamos otra vez…');await wait(1.8,rid);}say();}},
 {n:'Detrás de las cámaras',ic:'🎞',d:'Un paseo por el plató 3D antes de grabar.',f:async rid=>{const W=SHOTS.wide;const r0=Math.hypot(W.p.x,W.p.z)||12;const sh={p:V3(0,W.p.y*2,r0),l:V3(0,.8,0),f:55,dr:0};cut(sh);
   hostSay('Esto es lo que no se ve: el plató antes de encender las luces de directo.');await tween(7,(e,k)=>{const a=k*3.6;sh.p.set(Math.sin(a)*r0*1.1,W.p.y*(2-k),Math.cos(a)*r0*1.1);},x=>x);
   await lines(rid,[['host','Aquí ensayamos las preguntas, probamos el rosco y el reloj.',3.2],['team_o','Y aquí calentamos antes de entrar en directo.',3]]);}},
 {n:'Mejores momentos',ic:'⭐',d:'Resumen inventado de los momentos más emocionantes de la temporada.',f:async rid=>{FX5.conf(['#ffd23a','#fff','#4a8dff']);
   await lines(rid,[['wide','Los mejores momentos de la temporada…',3],['team_b','¡El rosco que se resolvió en el último segundo!',3],['team_o','¡La remontada en Una de cuatro!',3],['host','¡Y el bote más grande de nuestra historia inventada!',3.2]]);FX5.conf(['#ffd23a','#fa8804']);}}];
window.E23={PRU,ESC,go23};
// ---------- menús ----------
{const _bind=bind9;bind9=function(col,only){_bind.apply(this,arguments);col.querySelectorAll('[data-go^="x23:"]').forEach(b=>{b.onpointerdown=ev=>{ev.preventDefault();sfx('ok');go23(b.dataset.go);};});
  col.querySelectorAll('[data-e23]').forEach(b=>b.onpointerdown=ev=>{ev.preventDefault();sfx('ok');setEt(b.dataset.e23);showMenu('ent23');});};}
{const _sm=showMenu;showMenu=function(s='main'){const r=_sm.apply(this,arguments);try{const col=menu.querySelector('.col');
  if(s=='main'&&col&&!col.querySelector('[data-go=ent23]')){const opt=col.querySelector('[data-go=opt]');const h=mb9('ent23','🎯','ENTRENAMIENTO · '+curN(),'Practica las pruebas y el rosco de la etapa elegida')+(OPT.inv23?mb9('inv23','🆕',INV+' · Pruebas y escenas nuevas','Cámara oculta, tomas falsas, detrás de las cámaras, mejores momentos y 3 pruebas nuevas'):'');
   if(opt)opt.insertAdjacentHTML('beforebegin',h);else col.insertAdjacentHTML('beforeend',h);bind9(col,['ent23','inv23']);try{NAV.attach(s);}catch(e){}}
  if(s=='opt'&&col&&!col.querySelector('[data-o23]')){const h=`<div class="orow"><label>${INV} · pruebas y escenas nuevas (no salen en la tele): <b class="v23">${OPT.inv23?'Sí':'No'}</b></label><input type="range" min="0" max="1" step="1" value="${OPT.inv23?1:0}" data-o23="1"></div>`;
   const rows=col.querySelectorAll('.orow');if(rows.length)rows[rows.length-1].insertAdjacentHTML('afterend',h);else col.insertAdjacentHTML('beforeend',h);
   col.querySelector('[data-o23]').oninput=e=>{OPT.inv23=+e.target.value;col.querySelector('.v23').textContent=OPT.inv23?'Sí':'No';saveOpt();};try{NAV.attach(s);}catch(e){}}}catch(e){console.error(e);}return r;};}
})();
{const _sm=showMenu;showMenu=function(){const r=_sm.apply(this,arguments);try{$('#ver').textContent='v0.23';}catch(e){}return r;};}
