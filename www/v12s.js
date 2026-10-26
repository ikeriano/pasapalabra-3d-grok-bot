'use strict';
// ===== v0.12 · BANCO DE ESCENAS (todo INVENTADO): monólogos · cámaras ocultas · fuera de cámaras · tomas falsas · mejores momentos · pruebas previas =====
// Las escenas se COMBINAN a partir de piezas escritas a mano (tools/v12/gen12.py, determinista); cada pieza tiene voz Piper es_ES.
const NM12={H:'Presentador',F:'Ayudante',G:'Director',M:'Técnico',N:'Público'};
const TY12={mono:['🎤','Monólogos','Monólogo del presentador'],cam:['📹','Cámaras ocultas','Cámara oculta'],fuera:['🎥','Fuera de cámaras','Fuera de cámaras'],tomas:['🎬','Tomas falsas','Tomas falsas'],mej:['⭐','Mejores momentos','Mejores momentos'],prev:['🧪','Pruebas previas','Prueba previa']};
const SH12=['host','hostc','wide','front','host','wide2','blue','orange'];
const R12={recent:{}};
function mul12(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const ln12=(s,k)=>S12.L[s.L[k]];
async function sy12(rid,s,k,nm){const [w,t]=ln12(s,k);await v9say(w,t,rid,nm||NM12[w]);}
function tag12(t,col){const tg=bar(Math.min(GW-40,470),30,col||COL.rd,t,{fs:15});tg.position.set(0,-262,0);G.add(tg);return tg;}
async function card12(rid,txt,sub,secs){const b=bigTxt(Math.min(GW-100,760),150,txt,{grad:['#fff','#ffe680','#f0a000'],side:'#7a3c00',layers:9,glow:'#ffcf40'});b.position.set(0,110,100);b.scale.setScalar(.01);G.add(b);
 await tween(.5,e=>b.scale.setScalar(.01+e));if(sub)say(sub);await wait(secs||1.3,rid);G.remove(b);}
// ---------- monólogo ----------
async function mono12(rid,s,n){prep();FX5.tint('rgba(150,70,220,.16)');cut('host');say(`<b>🎤 ${esc9(s.t)}</b>`);tag12('🎤 MONÓLOGO · 🆕 INVENTADO');
 await card12(rid,'MONÓLOGO '+n,`<b>${esc9(s.m.length?s.t:'')}</b>`,1.2);
 for(let k=0;k<s.L.length;k++){chk(rid);cut(SH12[(k+n)%SH12.length]);await sy12(rid,s,k,'Presentador');if(k==2||k==5||k==6){sfx('aplauso');if(k!=6)emojiRain9(['😂','👏','🤣'],6,1.6);}}
 FX5.conf(['#c58bff','#ffd23a','#fff'],3);await wait(.6,rid);FX5.tint('');clearG();say();}
// ---------- cámara oculta ----------
const CT12={};
async function cam12(rid,s,n){prep();const cat=s.m[0];const rec=document.createElement('div');rec.className='rec11';rec.textContent='🔴 REC · CÁMARA OCULTA · 🆕 INVENTADA';document.body.appendChild(rec);
 let t=0,amp=0;const rz=P.host.rotation.z,ry=P.host.rotation.y;anim(dt=>{t+=dt;P.host.rotation.z=Math.sin(t*15)*.05*amp;P.host.rotation.y=Math.sin(t*9)*.12*amp;return !!rec.parentNode;});
 try{FX5.tint('rgba(40,255,90,.28)');cut('host');say(`<b>📹 ${esc9(s.t)}</b>`);await sy12(rid,s,0);
  const sh=['hostc','wide','host','front','hostc','wide'];
  for(let k=1;k<s.L.length;k++){chk(rid);cut(sh[k%sh.length]);const w=ln12(s,k)[0];if(k>=2&&k<=4)amp=.3+(k-1)*.25;if(k==5)amp=0;
   await sy12(rid,s,k,w=='H'?(k<5?'Presentador (la víctima inventada)':'Presentador'):null);}
  amp=0;FX5.tint('');rec.remove();cut('front');await card12(rid,'¡INOCENTE!','<b>📹 CÁMARA OCULTA INVENTADA</b> · '+esc9(cat)+' · nada de esto ha pasado',2.2);FX5.conf(['#ffd23a','#2a6af0','#fff'],4);sfx('aplauso');
 }finally{amp=0;rec.remove();P.host.rotation.z=rz;P.host.rotation.y=ry;try{FX5.tint('');}catch(e){}clearG();say();}}
// ---------- fuera de cámaras ----------
async function fuera12(rid,s,n){prep();FX5.tint('rgba(0,0,0,.22)');const pl=S12.PL[s.m[0]];say(`<b>🎥 FUERA DE CÁMARAS · ${esc9(pl)}</b>`);tag12('🎥 FUERA DE CÁMARAS · 🆕 INVENTADO',0x3a3a48);
 cut('wide');await card12(rid,pl.toUpperCase().slice(0,22),`<b>🎥 ${esc9(s.t)}</b>`,1.4);
 for(let k=0;k<s.L.length;k++){chk(rid);cut(SH12[(k*3+n)%SH12.length]);await sy12(rid,s,k);await wait(.15,rid);}
 sfx('ok');await wait(.4,rid);FX5.tint('');clearG();say();}
// ---------- tomas falsas ----------
async function tomas12(rid,s,n){prep();say(`<b>🎬 ${esc9(s.t)}</b>`);const per=5,nt=s.m[0];
 for(let t=0;t<nt;t++){chk(rid);cut('host');const b=t*per;const g=await claqueta9(rid,'TOMA '+(((n*7+t*5)%23)+2));G.remove(g);
  await sy12(rid,s,b);cut('host');await sy12(rid,s,b+1);cut(SH12[(n+t)%SH12.length]);await sy12(rid,s,b+2);cut('hostc');await sy12(rid,s,b+3);
  cut('wide');FX5.tint('rgba(255,40,40,.22)');sfx('error');await sy12(rid,s,b+4);FX5.tint('');}
 cut('front');FX5.conf(['#ffd23a','#ff6a8a','#fff'],4);sfx('aplauso');await sy12(rid,s,nt*per);await wait(.5,rid);tag12('🎬 TOMAS FALSAS · 🆕 INVENTADAS');await wait(.9,rid);clearG();say();}
// ---------- mejores momentos ----------
async function mej12(rid,s,n){prep();FX5.tint('rgba(220,170,60,.2)');tag12('⭐ MEJORES MOMENTOS · 🆕 INVENTADOS',0x7a5a10);cut('host');say(`<b>⭐ ${esc9(s.t)}</b>`);
 await sy12(rid,s,0);
 for(let m=0;m<3;m++){chk(rid);cut(SH12[(n+m*2)%SH12.length]);await card12(rid,'MOMENTO '+(m+1),'<b>⭐ '+esc9(s.m[m])+'</b>',1.1);cut(SH12[(n+m*3+1)%SH12.length]);await sy12(rid,s,1+m*2);
  cut('front');sfx('aplauso');await sy12(rid,s,2+m*2);}
 cut('host');await sy12(rid,s,7);FX5.conf(['#ffd23a','#fff','#2a6af0'],4);sfx('aplauso');await wait(.6,rid);FX5.tint('');clearG();say();}
// ---------- pruebas previas: 10 motores con preguntas generadas por semilla ----------
const AZ12='ABCDEFGHIJLMNÑOPQRSTUVXYZ'.split('');
const nrm12=x=>x.normalize('NFD').replace(/[\u0300-\u036f]/g,'');
function qg12(e,seed){const r=mul12(seed*7919+e*104729+13),pk=a=>a[Math.floor(r()*a.length)],sh=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(r()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 const Q=[],id=S12.ENG[e][0];
 const three=(q,ok,pool,fs)=>{const bad=sh(pool.filter(x=>x!==ok)).slice(0,2);return {q,fs:fs||22,o:sh([[ok,1],[bad[0],0],[bad[1],0]])};};
 for(let n=0;n<70;n++){
  if(id=='refran'){const [a,b]=pk(Q12.ref);Q.push(three(a+' …',b,Q12.ref.map(x=>x[1]),24));}
  else if(id=='vf'){const [t,v]=pk(Q12.vf);Q.push({q:t,fs:22,o:[['VERDADERO',v],['FALSO',1-v]]});}
  else if(id=='intruso'){const c=sh(Q12.cat),a=c[0],b=c[1],w=sh(a[1]).slice(0,3),x=pk(b[1]);Q.push({q:'¿Cuál es el intruso?',fs:26,o:sh([...w.map(y=>[y,0]),[x,1]]),g:4});}
  else if(id=='anagrama'){const w=pk(Q12.ana),ls=sh(nrm12(w).split('')).join('·');Q.push(three('Ordena: '+ls,w,Q12.ana,26));}
  else if(id=='capital'){const [p,c]=pk(Q12.cap);Q.push(three('Capital de '+p,c,Q12.cap.map(x=>x[1]),26));}
  else if(id=='serie'){const k=Math.floor(r()*4);let s=[],nx;const a=1+Math.floor(r()*9),d=2+Math.floor(r()*7);
   if(k==0){s=[0,1,2,3].map(i=>a+d*i);nx=a+d*4;}else if(k==1){const m=2+Math.floor(r()*2);s=[1,2,3].map(i=>a*Math.pow(m,i-1));nx=a*Math.pow(m,3);s.push(nx/1);s=s.slice(0,3);}
   else if(k==2){s=[1,2,3,4].map(i=>i*i);nx=25;}else{s=[0,1,2,3].map(i=>a*(i+1)*(i+1)-a*i);nx=a*25-a*4;s=[0,1,2,3].map(i=>a*(i+1)*(i+1)-a*i);}
   const ws=new Set([nx]);while(ws.size<3)ws.add(nx+pk([-6,-4,-3,-2,-1,1,2,3,4,6,10]));Q.push({q:s.join(' , ')+' , ?',fs:30,o:sh([...ws].map(x=>[String(x),x===nx?1:0]))});}
  else if(id=='mayor'){const mk=()=>{const op=pk(['+','−','×']);let a,b,v;if(op=='+'){a=10+Math.floor(r()*80);b=3+Math.floor(r()*60);v=a+b;}else if(op=='−'){a=40+Math.floor(r()*60);b=3+Math.floor(r()*35);v=a-b;}else{a=3+Math.floor(r()*10);b=3+Math.floor(r()*10);v=a*b;}return [`${a} ${op} ${b}`,v];};
   let c;do{c=[mk(),mk(),mk()];}while(new Set(c.map(x=>x[1])).size<3);const mx=Math.max(...c.map(x=>x[1]));Q.push({q:'¿Cuál da el resultado MAYOR?',fs:24,o:c.map(x=>[x[0],x[1]===mx?1:0])});}
  else if(id=='contar'){const w=pk(Q12.ana),W=nrm12(w);const L=pk(W.split(''));const k=W.split('').filter(x=>x===L).length;const ws=new Set([k]);while(ws.size<3)ws.add(Math.max(0,k+pk([-2,-1,1,2])));Q.push({q:`¿Cuántas «${L}» hay en ${W}?`,fs:24,o:sh([...ws].map(x=>[String(x),x===k?1:0]))});}
  else if(id=='antonimo'){const [a,b]=pk(Q12.ant);Q.push(three('Contrario de «'+a+'»',b,Q12.ant.map(x=>x[1]),26));}
  else if(id=='abc'){const i=1+Math.floor(r()*23),aft=r()<.5,L=AZ12[i],ok=AZ12[i+(aft?1:-1)];const ws=new Set([ok]);while(ws.size<3)ws.add(pk(AZ12));Q.push({q:`¿Qué letra va ${aft?'DESPUÉS':'ANTES'} de la ${L}?`,fs:24,o:sh([...ws].map(x=>[x,x===ok?1:0]))});}}
 return Q;}
function pChoice12(e,seed,intro){return async function(rid){prep();cut('host');if(!PT9.turn)await v9say('H',intro,rid,'Presentador');hostSay(`<b>${esc9(S12.ENG[e][1])}</b>: ${esc9(S12.ENG[e][2])} Cada acierto, <b>2 segundos</b>.`);await wait(PT9.turn?1.8:2.6,rid);say();
 cut((PT9.team||TEAM9.az).shot);const st=timerSetup9(45,rid);tag12('🧪 PRUEBA PREVIA · 🆕 INVENTADA');let ac=0;const Q=qg12(e,seed);
 for(const q of Q){if(st.t<=0)break;const qb=bar(Math.min(GW-80,800),100,COL.bl,q.q,{fs:q.fs});qb.position.set(0,170,0);G.add(qb);const no=q.o.length;
  const bs=q.o.map(([x],i)=>{const w=no==4?330:no==2?300:250;const b=bar(w,64,COL.or,String(x).toUpperCase(),{fs:no==4?24:24});if(no==4)b.position.set(-175+(i%2)*350,50-Math.floor(i/2)*84,0);else if(no==2)b.position.set(-170+i*340,40,0);else b.position.set(-270+i*270,40,0);b.userData.tap=i;G.add(b);return b;});
  const a=await tapWait9(st,rid);chk(rid);if(a<0)break;const ok=q.o[a][1];bs[a].setC(ok?COL.gr:COL.rd);if(!ok)bs[q.o.findIndex(x=>x[1])].setC(COL.gr);sfx(ok?'ok':'error');if(ok)ac++;await wait(.7,rid);G.remove(qb);bs.forEach(b=>G.remove(b));}
 await prevEnd9(ac,2,rid,st);};}
async function prev12(rid,s){GAME.sec=GAME.sec||[0,0];const [e,seed]=s.m;await turnos9(pChoice12(e,seed,ln12(s,0)[1]))(rid);}
const F12={mono:mono12,cam:cam12,fuera:fuera12,tomas:tomas12,mej:mej12,prev:prev12};
function sc12(type,i){const a=S12.T[type][i];return {t:a[0],L:a[1],m:a[2]};}
function play12(rid,type,i){return F12[type](rid,sc12(type,i),i+1);}
function nxt12(type){const n=S12.T[type].length;R12.recent[type]=R12.recent[type]||[];let i,g=0;do{i=Math.floor(Math.random()*n);}while(R12.recent[type].includes(i)&&++g<50);R12.recent[type].push(i);if(R12.recent[type].length>Math.min(40,n>>1))R12.recent[type].shift();return i;}
const CNT12=S12.T;
// ---------- menús ----------
const PG12=40;
function list12(type,pg){const T=S12.T[type],n=T.length,np=Math.ceil(n/PG12);pg=Math.max(0,Math.min(np-1,pg));const ic=TY12[type][0];
 const jumps=Array.from({length:np},(_,k)=>`<button class="tbtn ${k==pg?'on':''}" data-go="s12_${type}_${k}">${k*PG12+1}</button>`).join('');
 return `<h2>${ic} ${TY12[type][1]} · ${n} escenas</h2><div class="mtext">Todas INVENTADAS (🆕), combinadas con piezas escritas a mano y voces Piper es_ES. Elige una, una al azar o una maratón de 10 sin repetir.</div>
 ${mb9('x12:'+type+':rand','🎲','Una al azar','')}${mb9('x12:'+type+':mar','▶','Maratón de 10 escenas','Sin repetir')}
 <div class="mtext">Ir a la página: ${jumps}</div>
 ${T.slice(pg*PG12,pg*PG12+PG12).map((x,k)=>mb9('x12:'+type+':'+(pg*PG12+k),ic,esc9(x[0]),'🆕 INVENTADA')).join('')}${back9('b12')}`;}
for(const ty of Object.keys(F12)){const np=Math.ceil(S12.T[ty].length/PG12);for(let k=0;k<np;k++)SCR9['s12_'+ty+'_'+k]=()=>list12(ty,k);}
SCR9.b12=()=>`<h2>🆕 Banco de escenas (v0.12)</h2><div class="mtext">Todo es INVENTADO para este juego. Las escenas se montan combinando piezas escritas a mano (presentador, ayudantes, plató…); hay ${Object.values(S12.T).reduce((a,b)=>a+b.length,0)} escenas en total.</div>
 ${Object.keys(F12).map(t=>mb9('s12_'+t+'_0',TY12[t][0],TY12[t][1],S12.T[t].length+' escenas inventadas')).join('')}${mb9('x12:all:mar','🎲','Maratón mezclada','Una escena de cada tipo, al azar')}${back9('extras9')}`;
{const _e=SCR9.extras9;SCR9.extras9=()=>{const h=_e(),b=back9();const add=mb9('b12','🆕','Banco de escenas (v0.12)',`${Object.values(S12.T).reduce((a,b)=>a+b.length,0)} escenas inventadas: monólogos, cámaras ocultas, fuera de cámaras, tomas falsas, mejores momentos y pruebas previas`);const i=h.lastIndexOf(b);return i<0?h+add:h.slice(0,i)+add+h.slice(i);};}
{const _x=x9go;x9go=function(g){const [,k,a]=g.split(':');
  if(k=='all')return scene9(async rid=>{for(const t of Object.keys(F12)){chk(rid);await play12(rid,t,nxt12(t));}},{back:'b12',banner:'🆕 BANCO DE ESCENAS · INVENTADO'});
  if(F12[k]){const ty=k;return scene9(async rid=>{if(a=='mar'){const used=[];for(let j=0;j<10;j++){let i;do{i=nxt12(ty);}while(used.includes(i));used.push(i);await play12(rid,ty,i);}}else await play12(rid,ty,a=='rand'?nxt12(ty):+a);},{back:'s12_'+ty+'_'+(a=='rand'||a=='mar'?0:Math.floor(+a/PG12)),banner:TY12[ty][0]+' '+TY12[ty][2].toUpperCase()+' · 🆕 INVENTADO'});}
  return _x.apply(this,arguments);};}
// ---------- opciones (apagadas por defecto) ----------
{const R=[['bank12','🆕','Escenas del banco entre pruebas (inventadas)'],['previas12','🧪','Pruebas previas del banco (inventadas)']];
 const _sm=showMenu;showMenu=function(s='main'){const r=_sm.apply(this,arguments);
  if(s=='opt'){const col=menu.querySelector('.col');if(col&&!col.querySelector('[data-o12]')){const last=[...col.querySelectorAll('[data-o11]')].pop();const row=last&&last.closest('.orow');
   const html=R.map(([k,ic,t])=>`<div class="orow"><label>${ic} ${t}: <b class="v9">${OPT[k]?'Sí':'No'}</b></label><input type="range" min="0" max="1" step="1" value="${OPT[k]?1:0}" data-o12="${k}"></div>`).join('');
   if(row)row.insertAdjacentHTML('afterend',html);else col.querySelector('h2').insertAdjacentHTML('afterend',html);
   col.querySelectorAll('[data-o12]').forEach(i=>i.oninput=()=>{OPT[i.dataset.o12]=+i.value;i.parentNode.querySelector('.v9').textContent=+i.value?'Sí':'No';saveOpt();});
   const t0=NAV.screen==s&&NAV.cur()?NAV.cur().textContent:null;try{NAV.attach(s);if(t0!==null){const k=NAV.items.findIndex(e=>e.textContent===t0);if(k>=0&&k!==NAV.idx)NAV.focus(k,true);}}catch(e){}}}
  return r;};}
// ---------- en el programa: pruebas previas y escenas entre pruebas ----------
const PV12={CORT:{refran:['Refranes','al Vuelo'],vf:['Verdadero','o Falso'],intruso:['El','Intruso'],anagrama:['Letras','Revueltas'],capital:['Las','Capitales'],serie:['Series','de Números'],mayor:['Mayor','o Menor'],contar:['Cuenta','las Letras'],antonimo:['Los','Antónimos'],abc:['Antes y','Después']},
 W:{refran:'REFRANESALVUELO',vf:'VERDADEROOFALSO',intruso:'ELINTRUSO',anagrama:'LETRASREVUELTAS',capital:'LASCAPITALES',serie:'SERIESDENUMEROS',mayor:'MAYOROMENOR',contar:'CUENTALASLETRAS',antonimo:'LOSANTONIMOS',abc:'ANTESYDESPUES'},
 sync(){for(const y in ETAPAS){const E=ETAPAS[y];if(E&&E.pr)E.pr=E.pr.filter(p=>!/^p12_/.test(p[0]));}
  if(!OPT.previas12)return;const E=ETAPAS[OPT.etapa];if(!E||!E.pr)return;const n=1+(Math.random()<.5?1:0);E.lines=E.lines||{};const T=S12.T.prev;const used=new Set();
  for(let k=0;k<n;k++){let i,g=0;do{i=nxt12('prev');}while(used.has(S12.ENG_OF(i))&&++g<30);const sc=sc12('prev',i);used.add(sc.m[0]);const id=S12.ENG[sc.m[0]][0];const key='p12_'+id+'_'+i;
   const p=E.pr.findIndex(q=>q[0]=='rosco'||q[0]=='alaz');E.pr.splice(p<0?E.pr.length:p,0,[key,async rid=>{await prev12(rid,sc);}]);CORT[key]=CORT['p12_'+id];E.lines[key]=`Otra <b>prueba previa del banco</b>: ${esc9(S12.ENG[sc.m[0]][1])} (inventada)`;}}};
S12.ENG_OF=i=>S12.T.prev[i][2][0];
{const mkW=w=>(AW,blue)=>{const it=[];const s=w.replace(/ /g,'');for(let r=0;r<7;r++)for(let i=0;i<14;i++)it.push({ch:s[(i+r*3)%s.length],base:new T.Vector3(-AW*.5+i*AW/13,-260+r*90,-40+(i%3)*30),p:new T.Vector3(),s:r==3?70:34,r:rnd(-.3,.3),c:0xffffff,row:r,d:(i+r)*.03});
 const art=letterCloud(it,{op:.85});art.anim=t=>{art.items.forEach(x=>{const k=Math.min(1,Math.max(0,(t-x.d)*1.4));x.p.set(x.base.x,x.base.y+(1-eout(k))*600,x.base.z);});art.upd();};return art;};
 for(const e of S12.ENG){const k=e[0];CORT['p12_'+k]={title:PV12.CORT[k],tx:0,ty:0,fs:78,mk:mkW(PV12.W[k])};}}
{const _pg=programa;programa=async function(){try{PV12.sync();}catch(e){console.error(e);}return _pg.apply(this,arguments);};}
{const _pc=playCort;playCort=async function(id,rid){
  if(OPT.bank12&&id!='rosco'&&id!='alaz'&&!/^p12_/.test(id)&&Math.random()<.6){try{const ts=['mono','fuera','tomas','mej','cam'];const t=pick(ts);cut('host');await play12(rid,t,nxt12(t));}catch(e){if(!(e instanceof Stop))console.error(e);else throw e;}}
  return _pc.apply(this,arguments);};}
$('#ver').textContent='v0.12';
Object.assign(window.DBG||{},{S12,play12,qg12,sc12,PV12,x9go,mono12,cam12,fuera12,tomas12,mej12,prev12});
