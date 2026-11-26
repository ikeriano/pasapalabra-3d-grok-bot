'use strict';
// v0.25 · Reglas revisadas con los programas reales (Antena 3 19/06/2026) y lo que pide Iker:
//  · Una de Cuatro: una pregunta tras otra, sin tope, hasta que se acaba el tiempo (si se agota el tema, entra otro tema con sus 4 respuestas).
//  · ¿Dónde Están?: primero salen DOS temas en la pantalla del presentador y el concursante elige; luego el grafismo destapa las
//    palabras unos segundos, se tapan y empieza el reloj. Si se completa el panel, sale otro (reloj parado mientras se destapa).
//  · Sopa de letras: 8 paneles, una palabra por panel, 5 segundos por palabra (las 8 = 40 s). Se juegan paneles hasta que se acaba el tiempo.
(()=>{
const geval=s=>(0,eval)('('+s+')');
// ---------- Una de Cuatro ----------
function fixU4(fn){let s=String(fn);if(!/qs=shuffle\(qs0\)\.slice\(0,6\)/.test(s)||!/qi\+\+;showQ\(\);/.test(s))return null;
 s=s.replace('const [theme,opts,qs0]=pick(D2.U4),qs=shuffle(qs0).slice(0,6);','let [theme,opts,qs0]=pick(D2.U4),qs=shuffle(qs0);')
  .replace('qi++;showQ();','qi++;if(qi>=qs.length){[theme,opts,qs0]=pick(D2.U4);qs=shuffle(qs0);qi=0;ov.forEach((o,i)=>o.setT(String(opts[i]).toUpperCase()));hostSay(`Nuevo tema: <b>${theme}</b>.`);}showQ();')
  .replace(/^async function unaDeCuatro/,'async function').replace(/^async function\s*\(/,'async function(');
 try{const f=geval(s);f.r25=1;return f;}catch(e){console.error('u4 v25',e);return null;}}
// ---------- ¿Dónde Están? ----------
async function donde25(rid){prep();const st={t:45};let ac=0;// Telecinco: hasta 2017 caja naranja con la lista (t5o); finales de 2018-2019 rejilla 3×3 de pastillas del color del equipo con reloj redondo.
 const g5=window.G25,a3=OPT.etapa>=2020,t5=!a3&&!!g5,TC=g5?g5.TEAM().c:COL.bl;
 const tm=g5&&OPT.etapa!=2026?g5.rTimer(t5&&OPT.etapa<2018?'t5':'a3'):yTimer(),acb=acBox(TC);let lb=null;
 // 1) dos temas en la pantalla del presentador
 const [A,B]=shuffle(D2.DONDE.slice()).slice(0,2);cut('host');hostSay(`<b>¿Dónde Están?</b> Elige tema: <b>${A[0]}</b> o <b>${B[0]}</b>.`);
 const ch=[A,B].map((t,i)=>{const b=a3?bar(150,150,0xf07000,t[0].toUpperCase(),{fs:20,r:6,border:0xffffff,bw:3}):bar(250,52,COL.bl,t[0].toUpperCase(),{fs:24,r:26});if(a3)b.position.set(-GW*.32+i*175,170,0);else b.position.set(-GW/2+190+i*280,250,0);b.userData.tap=i;G.add(b);return b;});
 let pickT=await new Promise(r=>{let tt=0;TAP=i=>{if(i===null)return;TAP=null;r(i);};anim(dt=>{if(rid!==RUN){r(0);return false;}tt+=dt;if(tt>8&&TAP){TAP=null;r(Math.random()<.5?0:1);return false;}return TAP!=null;});});chk(rid);
 ch[pickT].setC(a3?0x0a6cf0:COL.or);sfx('ok');await wait(.8,rid);ch.forEach(b=>G.remove(b));let cur=[A,B][pickT],used=new Set([cur[0]]);
 cut('blue');if(t5&&OPT.etapa>=2018){tm.position.set(g5.X(708),g5.Y(478),20);tm.scale.setScalar(g5.s()*110/150);acb.position.set(GW/2-80,-300,20);}else if(t5){tm.position.set(-GW*.375,-215,20);tm.scale.setScalar(.9);acb.position.set(GW/2-80,-300,20);}else if(g5){tm.position.set(g5.X(144),g5.Y(488),20);tm.scale.setScalar(g5.s()*115/150);acb.position.set(g5.X(144)+110,g5.Y(488),20);}else{tm.position.set(GW*.2,-110,20);acb.position.set(GW*.2+150,-110,20);}G.add(tm);tm.set(45);G.add(acb);
 while(st.t>0){const t5o=false;// (v0.26 corrección Iker) en Telecinco ¿Dónde Están? siempre es la rejilla 3×3; la caja naranja es ¿Qué es Qué?
const words=shuffle(cur[1]).slice(0,t5o?5:9);const asks=shuffle(words.map((w,i)=>i));let qi=0;
  const T5P=[[.46,.79],[.73,.79],[.33,.9],[.6,.9],[.86,.9]];
  const ov=words.map((w,i)=>{let b;if(t5&&!t5o){b=g5.pillA3(150,46,w.toUpperCase(),TC);b.position.set(g5.X(445+(i%3)*177),g5.Y(110+Math.floor(i/3)*90),10);}else if(t5){b=g5.pillT5(GW*.2,44,w.toUpperCase());b.position.set((T5P[i][0]-.5)*GW-14,(.5-T5P[i][1])*720,0);}else if(g5){b=g5.pillA3(170,46,w.toUpperCase(),TC);b.position.set(GW*.2+(i%3-1)*185,170-Math.floor(i/3)*62,0);}else{b=bar(160,52,COL.gr,w,{fs:24,r:26});b.position.set(GW*.2+(i%3-1)*180,150-Math.floor(i/3)*70,0);}b.userData.tap=i;G.add(b);return b;});
  if(t5o){if(lb)G.remove(lb);lb=g5.listBox(words);lb.position.set(-GW/2+GW*.125,720*(.5-.41),5);lb.scale.setScalar(.9);G.add(lb);}
  hostSay(`Tema: <b>${cur[0]}</b>. ¡Memoriza dónde está cada palabra! 👀`);await wait(5,rid);
  ov.forEach((b,i)=>b.setT(String(i+1),t5o?0xf08a10:g5?TC:COL.or));sfx('splash');clockRun(st,tm,rid);
  const showQ=()=>{if(qi<words.length)hostSay(`¿Dónde está <b>${words[asks[qi]]}</b>?`);};showQ();let busy=false;
  TAP=async id=>{if(id===null||busy||qi>=words.length)return;busy=true;const t=asks[qi],ok=id===t;ov[t].setT(words[t],ok?COL.gr:COL.rd);sfx(ok?'ok':'error');if(ok){ac++;acb.setT(String(ac));if(lb){lb.done.add(words[t]);lb.upd();}}await wait(.7);qi++;showQ();busy=false;};
  await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN||qi>=words.length){r();return false;}return true;}));st.on=false;TAP=null;chk(rid);
  await wait(.8,rid);ov.forEach(b=>G.remove(b));if(st.t<=0){if(lb)G.remove(lb);break;}
  const rest=D2.DONDE.filter(t=>!used.has(t[0]));cur=pick(rest.length?rest:D2.DONDE);used.add(cur[0]);hostSay('¡Panel completo! Otro panel…');await wait(1,rid);}
 await soloEnd(ac,rid);}
// ---------- Sopa de letras: 8 paneles, una palabra en cada uno ----------
async function sopa25(rid){prep();const set=pick(D2.SOPA);let words=shuffle([...new Set(D2.SOPA.flatMap(s=>s[1]))].filter(w=>w.length<=5));
 const mine=set[1].filter(w=>w.length<=5);words=shuffle([...mine,...words.filter(w=>!mine.includes(w))]).slice(0,8);
 const st={t:50};let ac=0;cut('host');hostSay(`<b>Sopa de Letras</b>: ocho paneles, una palabra escondida en cada uno. Toca la primera y la última letra. Cada palabra, <b>5 segundos</b>; las ocho, ¡40!`);await wait(3.6,rid);
 cut({p:V3(1.6,1.75,-.6),l:V3(4.6,1.5,.9),f:30,dr:.04});const cx=GW*.2,cy=60;
 const cl=bar(GW*.4,50,COL.or,'',{fs:26});cl.position.set(-GW*.15,-270,10);G.add(cl);
 const tm=yTimer();tm.position.set(-GW/2+90,-270,20);G.add(tm);tm.set(50);const acb=acBox(COL.bl);acb.position.set(GW/2-80,-270,20);G.add(acb);let started=false;
 for(let p=0;p<8&&st.t>0;p++){const w=words[p];let S5=null;for(let k=0;k<20&&!S5;k++)S5=makeSopa([w]);if(!S5)continue;let first=null,done=false;
  cl.setT(`PANEL ${p+1} DE 8 · ${w.length} LETRAS`);
  const TCs=window.G25&&OPT.etapa>=2020?G25.TEAM().c:COL.bl;const tiles=S5.g.map((c,i)=>{const b=bar(58,58,TCs,c,{fs:36,r:29});b.position.set(cx+(i%5-2)*68,cy+(2-Math.floor(i/5))*68,0);b.userData.tap=i;G.add(b);return b;});
  if(!started){clockRun(st,tm,rid);started=true;}const P=S5.pos[w],a0=P[0],a1=P[P.length-1];
  TAP=id=>{if(id===null||done)return;if(first===null){first=id;sfx('ok');tiles[id].setC(COL.or);return;}const a=first,b=id;first=null;
   if((a===a0&&b===a1)||(a===a1&&b===a0)){done=true;ac++;acb.setT(String(ac));sfx('ok');P.forEach(i=>tiles[i].setC(COL.gr));say(`¡<b>${w}</b>! +5 s`);}else{sfx('error');tiles.forEach(t=>t.setC(TCs));}};
  await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN||done){r();return false;}return true;}));chk(rid);
  if(!done)P.forEach(i=>tiles[i].setC(COL.or));await wait(done?.6:1.2,rid);tiles.forEach(t=>G.remove(t));}
 st.on=false;TAP=null;say(ac>=8?'¡Los ocho paneles! <b>40 segundos</b>.':`<b>${ac}</b> de 8 palabras · <b>+${ac*5} s</b>`);await wait(1.4,rid);await soloEnd(ac,rid);}
// ---------- sustituir en todas las etapas (y en las tablas de Antena 3) ----------
sopa25.r25=donde25.r25=1;const ids={u4:1,sopa:1,donde:1};let u4new=null;const mapF=new Map();
function rep(id,fn){if(!fn||fn.r25)return fn;if(mapF.has(fn))return mapF.get(fn);let n=null;
 if(id=='u4'){n=fixU4(fn);if(!n)return fn;}else if(id=='sopa')n=sopa25;else if(id=='donde')n=donde25;mapF.set(fn,n);return n;}
const fixArr=a=>{if(a)for(const p of a)if(ids[p[0]]){const s=String(p[1]);if(/grua\(rid\)/.test(s))continue;p[1]=rep(p[0],p[1]);}};
for(const y in ETAPAS)fixArr(ETAPAS[y]&&ETAPAS[y].pr);try{fixArr(P19);}catch(e){}
// etapas 2026: envolver de nuevo con la grúa de Antena 3
const U4=(ETAPAS[2019].pr.find(p=>p[0]=='u4')||[])[1];
for(const y in ETAPAS){const E=ETAPAS[y];if(!E||!E.pr)continue;for(const p of E.pr)if(ids[p[0]]&&/grua\(rid\)/.test(String(p[1]))){const nf=p[0]=='u4'?U4:p[0]=='sopa'?sopa25:donde25;if(nf)p[1]=async rid=>{await grua(rid);return nf(rid);};p[1].r25=1;}}
// mkE12 reconstruye las etapas de A3 desde P19 al empezar el programa: volver a aplicar
if(typeof mkE12=='function'){const _m=mkE12;mkE12=function(){const r=_m.apply(this,arguments);try{fixArr(r&&r.pr);}catch(e){}return r;};}
sopa25.r25=donde25.r25=1;window.R25={donde25,sopa25,U4};
})();
