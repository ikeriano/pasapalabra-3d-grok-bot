'use strict';
// v0.24 · Pruebas de Telecinco que faltaban (Con nueve basta, Palabras dibujadas) dentro del Programa completo y del ENTRENAMIENTO,
// nuevas pruebas 🆕 INVENTADO en 3D (La letra fantasma, El eco) y escena 🆕 «Presentación de las familias» (equipos de 3).
// Opciones nuevas APAGADAS por defecto: OPT.t5x24 (Telecinco extra en Programa completo) y OPT.inv24 (🆕 en Programa completo).
(()=>{
if(OPT.t5x24===undefined)OPT.t5x24=0;if(OPT.inv24===undefined)OPT.inv24=0;
const INV='🆕 INVENTADO';const T5=[2007,2011,2014,2017,2019];
const X5={connueve:['Con nueve basta','9️⃣',()=>conNueve],dibujadas:['Palabras dibujadas','🖍',()=>palabrasDibujadas]};
const isT5=()=>!OPT.a3&&T5.includes(+OPT.etapa);
const efx=()=>OPT.efx!==0;
// ---------- utilidades 3D (mismo estilo que las inventadas de la v0.23) ----------
const POOL=()=>{const o=[];Object.values(ORIG.ROS).forEach(L=>L.forEach(x=>{const w=x[0][0];if(w&&w.length>=4&&w.length<=8&&!/[ ÑÜ]/.test(w))o.push([w,x[1]]);}));return o;};
let PL=null;const pool=()=>PL||(PL=POOL());
function mkOpts(list,y){return list.map((w,i)=>{const b=bar(300,52,COL.bl,w,{fs:24});b.position.set((i-(list.length-1)/2)*330,y,0);b.userData.tap=i;G.add(b);return b;});}
function q0(){const b=bar(Math.min(GW-200,1100),64,COL.or,'',{fs:22});b.position.set(0,-262,10);G.add(b);return b;}
function q(){let b=null;return {setT:t=>{if(!b||!b.parent)b=q0();b.setT(t);}};}
async function runQ(rid,secs,next){prep();cut('blue');const st={t:secs};const tm=yTimer();tm.position.set(-GW/2+90,262,20);G.add(tm);tm.set(secs);clockRun(st,tm,rid);let ac=0,busy=false,cur=null;
 const step=()=>{G.children.filter(o=>o.userData&&o.userData.tap!==undefined).forEach(o=>G.remove(o));cur=next();};step();
 TAP=async id=>{if(id===null||busy||!cur)return;busy=true;const ok=id===cur.ok;cur.b[id].setC(ok?COL.gr:COL.rd);if(!ok)cur.b[cur.ok].setC(COL.gr);sfx(ok?'ok':'error');if(ok)ac++;await wait(.6);step();busy=false;};
 await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN){r();return false;}return true;}));st.on=false;TAP=null;chk(rid);clearG();cut('host');sfx('winner');hostSay(`¡Tiempo! <b>${ac}</b> aciertos.`);await wait(2.6,rid);return ac;}
const ABC='ABCDEFGHIJLMNOPRSTUVZ';
const P24=[
 {id:'fantasma',n:'La letra fantasma',d:'A cada palabra le falta una letra (el «fantasma»). Toca la letra que falta. 2 segundos por acierto. 45 segundos.',f:async rid=>{const qb=q();
   return await runQ(rid,45,()=>{const [w,d]=pick(pool());const i=Math.floor(Math.random()*w.length);const g=w[i];const o=[g];while(o.length<3){const c=pick(ABC.split(''));if(!o.includes(c))o.push(c);}const s=shuffle(o);
     qb.setT(w.split('').map((c,k)=>k==i?'_':c).join(' ')+'  —  '+(d.length>48?d.slice(0,46)+'…':d).toUpperCase());return {ok:s.indexOf(g),b:mkOpts(s,40)};});}},
 {id:'eco',n:'El eco',d:'La palabra suena al revés, como un eco. Toca la palabra de verdad. 2 segundos por acierto. 45 segundos.',f:async rid=>{const qb=q();
   return await runQ(rid,45,()=>{const [w]=pick(pool());const o=[w];let g=0;while(o.length<3&&g++<200){const c=pick(pool())[0];if(!o.includes(c)&&c.length==w.length)o.push(c);}while(o.length<3){const c=pick(pool())[0];if(!o.includes(c))o.push(c);}const s=shuffle(o);
     qb.setT('🔊 '+w.split('').reverse().join('')+' … '+w.split('').reverse().join('').toLowerCase()+' …');return {ok:s.indexOf(w),b:mkOpts(s,40)};});}}];
// la versión para Programa completo suma segundos y juega también el rival (CPU)
const asPrueba=p=>async rid=>{const ac=await p.f(rid);GAME.sec[0]+=ac*2;GAME.ac[0]+=ac;await rotulo(`AZUL: ${ac} ACIERTOS · +${ac*2} s`,COL.bl,rid);clearG();
 const c=Math.floor(rnd(3,9));GAME.sec[1]+=c*2;await rotulo(`NARANJA: ${c} ACIERTOS · +${c*2} s`,COL.or,rid);clearG();};
CORT.x24_fantasma=CORT.x24_fantasma||{title:['La letra','fantasma'],fs:88};CORT.x24_eco=CORT.x24_eco||{title:['El','eco'],fs:96};
// ---------- escena: presentación de las familias (3 miembros por equipo) ----------
const lines=async(rid,L)=>{for(const [sh,t,s] of L){if(sh)cut(sh);hostSay(t);await wait(s||3,rid);}say();};
const famS=()=>{const f=OPT.fam10||{};const m=(f.mem||[]).map(x=>(x||'').trim());const N=(f.famN||'').trim();return {N:N||'Tu familia',m:[m[0]||'Abuela',m[1]||'Papá',m[2]||'Hija']};};
const ESC24={n:'Presentación de las familias',ic:'👨‍👩‍👧',d:'El presentador presenta a los dos equipos de tres de «Pasapalabra en familia», atril por atril.',f:async rid=>{const F=famS();
 await lines(rid,[['wide','¡Esta noche, Pasapalabra en familia! Dos equipos de tres.',3.2],['team_b',`Equipo azul: la familia <b>${esc9(F.N)}</b>.`,3],
  ['team_b',`Con <b>${esc9(F.m[0])}</b>, <b>${esc9(F.m[1])}</b> y <b>${esc9(F.m[2])}</b>. ¡Un aplauso!`,3.4],['team_o','Y enfrente, el equipo naranja: <b>Abuelo</b>, <b>Mamá</b> e <b>Hijo</b>.',3.4],
  ['host','Recordad: en el rosco juegan dos de los tres. Uno de la A a la Ñ y otro de la O a la Z.',3.6]]);
 if(efx()){try{FX5.conf(['#ffd23a','#4a8dff','#fa8804']);}catch(e){}}await lines(rid,[['wide','¡Que empiece el juego!',2.4]]);}};
// registrar en la pantalla 🆕 INVENTADO de la v0.23
try{for(const p of P24)E23.PRU.push({n:p.n,d:p.d,f:p.f});E23.ESC.push(ESC24);}catch(e){console.error(e);}
// ---------- Programa completo: insertar antes del rosco solo si la opción está activada ----------
function sync24(){for(const y in ETAPAS){const E=ETAPAS[y];if(E&&E.pr)E.pr=E.pr.filter(p=>!/^x24_/.test(p[0])&&!(p[2]=='x24'));}
 const E=ETAPAS[OPT.etapa];if(!E||!E.pr)return;E.lines=E.lines||{};const ins=(id,fn,l)=>{const i=E.pr.findIndex(p=>p[0]=='rosco');const e=[id,fn,'x24'];E.pr.splice(i<0?E.pr.length:i,0,e);if(l)E.lines[id]=l;};
 if(OPT.t5x24&&isT5()){const have=E.pr.map(p=>p[0]);for(const k of Object.keys(X5))if(!have.includes(k))ins(k,X5[k][2]());}
 if(OPT.inv24){const p=pick(P24);ins('x24_'+p.id,asPrueba(p),`Y ahora, una prueba <b>${INV}</b> (no existe en la tele): <b>${p.n}</b>. ${p.d}`);}}
window.sync24=sync24;window.go24=g=>go24(g);
{const _pg=programa;programa=async function(){try{sync24();}catch(e){console.error(e);}try{return await _pg.apply(this,arguments);}finally{try{for(const y in ETAPAS){const E=ETAPAS[y];if(E&&E.pr)E.pr=E.pr.filter(p=>p[2]!='x24');}}catch(e){}}};}
// ---------- ENTRENAMIENTO: las pruebas Telecinco que faltaban ----------
function go24(g){const [,k,a]=g.split(':');
 const run=(nm,fn,cid)=>scene9(async rid=>{GAME.sec=[0,0];GAME.ac=[0,0];GAME.res=null;MOSCA.visible=true;cut('host');hostSay(`Entrenamiento: <b>${nm}</b>. ¡Vamos allá!`);await wait(2,rid);say();
   await playCort(cid||a,rid);await fn(rid);chk(rid);clearG();cut('host');hostSay(`Fin del entrenamiento: <b>${GAME.ac[0]}</b> aciertos y <b>${GAME.sec[0]}</b> segundos ganados.`);await wait(3,rid);},{back:'ent23',banner:'🎯 ENTRENAMIENTO · '+nm});
 if(k=='tr'&&X5[a])return run(X5[a][0],X5[a][2]());
 if(k=='ti'){const p=P24.find(x=>x.id==a);if(p)return run(INV+' · '+p.n,asPrueba(p),'x24_'+p.id);}}
{const _e=SCR9.ent23;SCR9.ent23=()=>{let h=_e();const E=ETAPAS[OPT.etapa]||ETAPAS[2007];const have=E.pr.map(p=>p[0]);let x='';
  if(isT5())for(const k of Object.keys(X5))if(!have.includes(k))x+=mb9('x24:tr:'+k,X5[k][1],X5[k][0]+' (Telecinco)','Prueba de la etapa Telecinco que no sale en este Programa completo');
  if(OPT.inv23||OPT.inv24)for(const p of P24)x+=mb9('x24:ti:'+p.id,'🆕',INV+' · '+p.n,p.d);
  const i=h.lastIndexOf('<button');return x&&i>0?h.slice(0,i)+x+h.slice(i):h+x;};}
{const _bind=bind9;bind9=function(col){_bind.apply(this,arguments);col.querySelectorAll('[data-go^="x24:"]').forEach(b=>{b.onpointerdown=ev=>{ev.preventDefault();sfx('ok');go24(b.dataset.go);};});};}
// ---------- Opciones (apagadas por defecto) ----------
{const _sm=showMenu;showMenu=function(s='main'){const r=_sm.apply(this,arguments);try{const col=menu.querySelector('.col');
  if(s=='opt'&&col&&!col.querySelector('[data-o24]')){const row=(k,t)=>`<div class="orow"><label>${t}: <b class="v24${k}">${OPT[k]?'Sí':'No'}</b></label><input type="range" min="0" max="1" step="1" value="${OPT[k]?1:0}" data-o24="${k}"></div>`;
   const h=row('t5x24','Programa completo · Telecinco: añadir Con nueve basta y Palabras dibujadas')+row('inv24',`Programa completo · añadir una prueba ${INV} (letra fantasma / eco)`);
   const rows=col.querySelectorAll('.orow');if(rows.length)rows[rows.length-1].insertAdjacentHTML('afterend',h);else col.insertAdjacentHTML('beforeend',h);
   col.querySelectorAll('[data-o24]').forEach(i=>i.oninput=e=>{const k=e.target.dataset.o24;OPT[k]=+e.target.value;col.querySelector('.v24'+k).textContent=OPT[k]?'Sí':'No';saveOpt();});try{NAV.attach(s);}catch(e){}}}catch(e){console.error(e);}return r;};}
})();
{const _sm=showMenu;showMenu=function(){const r=_sm.apply(this,arguments);try{$('#ver').textContent='v0.24';}catch(e){}return r;};}
