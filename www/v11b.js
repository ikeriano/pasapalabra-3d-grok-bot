'use strict';
// ===== v0.11 · más contenido (todo lo inventado va marcado como inventado) =====
// pruebas previas nuevas · cámaras ocultas · fuera de cámaras · tomas falsas · lo mejor · copresentador sorpresa · menús
const NM11={H:'Presentador',F:'Ayudante',G:'Director',M:'Técnico',N:'Público'};
// ---------- datos: se añaden a las listas de la v0.9 (nada se borra) ----------
{
 const nb=D9.roscos.length;D9.botes.push(...D11.botes);D9.tomas.push(...D11.tomas);
 D9.roscos.push(...D11.roscos);D9.momentos.push(...D11.momentos);
 if(window.LM11){const rr={};D11.roscos.forEach((r,k)=>{if(r.rrec)rr[nb+k]=r.rrec;});Object.assign(LM11.RREC,rr);LM11.LV.push(...D11.lv);}
}
// ---------- escenas ----------
async function fuera11(rid,k){prep();const e=D11.fuera[k];const sh=['wide','host','front','blue','orange','wide2'];say(`<b>🎥 FUERA DE CÁMARAS · ${esc9(e.t)}</b>`);
 const tg=bar(380,34,COL.rd,'🎥 ESCENA INVENTADA',{fs:18});tg.position.set(0,-262,0);G.add(tg);let j=0;
 for(const l of e.L){chk(rid);cut(sh[j++%sh.length]);await v9say(l.w,l.t,rid,NM11[l.w]);await wait(.2,rid);}clearG();say();}
async function cam11(rid,k){prep();const c=D11.camaras[k];const rec=document.createElement('div');rec.className='rec11';rec.textContent='🔴 REC · CÁMARA OCULTA (INVENTADA)';document.body.appendChild(rec);
 let t=0,amp=0;const rz=P.host.rotation.z,ry=P.host.rotation.y;anim(dt=>{t+=dt;P.host.rotation.z=Math.sin(t*15)*.05*amp;P.host.rotation.y=Math.sin(t*9)*.12*amp;return !!rec.parentNode;});
 try{FX5.tint('rgba(40,255,90,.30)');cut('host');await v9say('H','Cámara oculta inventada: '+c.t+'.',rid,'Presentador');const sh=['host','hostc','wide','host'];let j=0;
  for(let i=0;i<c.L.length;i++){const l=c.L[i];chk(rid);cut(sh[j++%sh.length]);if(l.w=='H'&&i>0)amp=.35+Math.min(1,i/4)*.65;await v9say(l.w,l.t,rid,l.w=='H'?'Presentador (la víctima inventada)':NM11[l.w]);if(i==c.L.length-2)amp=0;}
  amp=0;FX5.tint('');rec.remove();cut('front');const b=bigTxt(Math.min(GW-100,720),150,'¡INOCENTE!',{grad:['#fff','#ffe680','#f0a000'],side:'#7a3c00',layers:9,glow:'#ffcf40'});b.position.set(0,120,100);b.scale.setScalar(.01);G.add(b);tween(.6,e=>b.scale.setScalar(.01+e));
  FX5.conf(['#ffd23a','#2a6af0','#fff'],4);sfx('aplauso');say('<b>📹 CÁMARA OCULTA INVENTADA</b> · nada de esto ha pasado');await wait(3.2,rid);clearG();say();
 }finally{amp=0;rec.remove();P.host.rotation.z=rz;P.host.rotation.y=ry;try{FX5.tint('');}catch(e){}}}
// ---------- pruebas previas nuevas (inventadas) ----------
const PV11={ids:Object.keys(D11.prev),
 CORT:{sinon:['Sinónimos','de hoy'],calc:['Cálculo','Mental'],orden:['Ordena el','Abecedario'],cuenta:['Cuenta los','Dibujos'],rima:['Rimas','al Vuelo']},
 sync(){for(const y in ETAPAS){const E=ETAPAS[y];if(E&&E.pr)E.pr=E.pr.filter(p=>!/^p11_/.test(p[0]));}
  if(!OPT.previas11)return;const E=ETAPAS[OPT.etapa];if(!E||!E.pr)return;const n=1+(Math.random()<.5?1:0);const ks=shuffle(PV11.ids.slice()).slice(0,n);E.lines=E.lines||{};
  for(const k of ks){const i=E.pr.findIndex(p=>p[0]=='rosco');E.pr.splice(i<0?E.pr.length:i,0,['p11_'+k,PV11.fn[k]]);E.lines['p11_'+k]=`Otra <b>prueba previa del juego</b>: ${esc9(D11.prev[k].t)} (inventada)`;}}};
for(const k of PV11.ids)CORT['p11_'+k]={title:PV11.CORT[k],tx:0,ty:0,fs:78};
function inv11tag(){const tg=bar(360,30,COL.rd,'🧪 PRUEBA PREVIA INVENTADA',{fs:15});tg.position.set(130,-262,0);G.add(tg);}
function genQ11(k,pool){
 if(k=='sinon'||k=='rima'){const s=pool.pop();const [w,r,a,b]=s;const o=shuffle([[r,1],[a,0],[b,0]]);return {q:k=='sinon'?`Sinónimo de «${w}»`:`¿Qué palabra rima con «${w}»?`,o,fs:24};}
 if(k=='calc'){const op=pick(['+','−','×']);let a,b,r;if(op=='+'){a=rnd(12,89)|0;b=rnd(3,40)|0;r=a+b;}else if(op=='−'){a=rnd(30,99)|0;b=rnd(3,a-5)|0;r=a-b;}else{a=rnd(3,12)|0;b=rnd(3,12)|0;r=a*b;}
  const ws=new Set([r]);while(ws.size<3){const d=pick([-10,-3,-2,-1,1,2,3,10]);if(r+d>0)ws.add(r+d);}const o=shuffle([...ws].map(x=>[String(x),x===r?1:0]));return {q:`${a} ${op} ${b} = ?`,o,fs:44};}
 if(k=='cuenta'){const e=pick(['🍎','🐶','⭐','🚗','🎈','🌙','🍪']);const n=(rnd(3,9)|0);const ws=new Set([n]);while(ws.size<3){const d=pick([-2,-1,1,2]);if(n+d>1)ws.add(n+d);}return {q:'¿Cuántos hay?   '+Array(n).fill(e).join(' '),o:shuffle([...ws].map(x=>[String(x),x===n?1:0])),fs:30};}}
function pOpc11(kind){return async function(rid){prep();const per=2;await introPrev9(rid,D11.prev[kind].intro);cut((PT9.team||TEAM9.az).shot);const st=timerSetup9(40,rid);inv11tag();let ac=0;
 const pool=kind=='sinon'?shuffle(D11.sinon.slice()):kind=='rima'?shuffle(D11.rimas.slice()):null;
 for(let n=0;n<40;n++){if(st.t<=0)break;if(pool&&!pool.length)break;const g=genQ11(kind,pool);const qb=bar(Math.min(GW-80,800),110,COL.bl,g.q,{fs:g.fs});qb.position.set(0,170,0);G.add(qb);
  const bs=g.o.map(([x],i)=>{const b=bar(250,70,COL.or,x.toUpperCase(),{fs:26});b.position.set(-270+i*270,40,0);b.userData.tap=i;G.add(b);return b;});
  const a=await tapWait9(st,rid);chk(rid);if(a<0)break;const ok=g.o[a][1];bs[a].setC(ok?COL.gr:COL.rd);if(!ok)bs[g.o.findIndex(x=>x[1])].setC(COL.gr);sfx(ok?'ok':'error');if(ok)ac++;await wait(.8,rid);G.remove(qb);bs.forEach(b=>G.remove(b));}
 await prevEnd9(ac,per,rid,st);};}
async function pOrden11(rid){prep();await introPrev9(rid,D11.prev.orden.intro);cut((PT9.team||TEAM9.az).shot);const st=timerSetup9(45,rid);inv11tag();let ac=0;
 while(st.t>0){const ls=shuffle('ABCDEFGHIJLMNOPQRSTUVXYZ'.split('')).slice(0,4);const ord=ls.slice().sort();const qb=bar(Math.min(GW-80,800),90,COL.bl,'Toca las letras en orden alfabético',{fs:24});qb.position.set(0,170,0);G.add(qb);
  const bs=ls.map((x,i)=>{const b=bar(130,90,COL.or,x,{fs:56});b.position.set(-285+i*190,40,0);b.userData.tap=i;G.add(b);return b;});let k=0,bad=false;
  while(k<4&&st.t>0){const a=await tapWait9(st,rid);chk(rid);if(a<0)break;if(ls[a]===ord[k]){bs[a].setC(COL.gr);k++;sfx('ok');}else{bs[a].setC(COL.rd);sfx('error');bad=true;break;}}
  if(k==4&&!bad)ac++;await wait(.6,rid);G.remove(qb);bs.forEach(b=>G.remove(b));if(st.t<=0)break;}
 await prevEnd9(ac,3,rid,st);}
PV11.fn={sinon:turnos9(pOpc11('sinon')),calc:turnos9(pOpc11('calc')),cuenta:turnos9(pOpc11('cuenta')),rima:turnos9(pOpc11('rima')),orden:turnos9(pOrden11)};
window.PV11=PV11;
// ---------- copresentador sorpresa (personaje INVENTADO) ----------
const CO11={on:false,c:null,p:null,first:true,n:0,last:null,
 begin(){CO11.on=false;CO11.first=true;CO11.n=0;if(!OPT.copro11)return;CO11.c=pick(D11.copro);CO11.on=true;},
 end(){CO11.on=false;if(CO11.p)CO11.p.visible=false;const t=document.querySelector('.inv11');if(t)t.remove();},
 make(){const c=CO11.c;if(CO11.p){CO11.root.remove(CO11.p);P.heads=(P.heads||[]).filter(h=>h!==CO11.p);}
  const f=['gema','lidia','pepa'].includes(c.id);const p=person({shirt:c.shirt,hair:f?0x3a2418:0x2a2218,long:f,pants:0x20232c,skin:f?0xe8b898:0xd9a47e,badge:0xc0262d});p.position.set(1.05,0,-4.3);p.rotation.y=-.18;root.add(p);P.heads.push(p);CO11.p=p;CO11.root=root;return p;},
 async say(who,text,rid){const c=CO11.c;let t=document.querySelector('.inv11');if(!t){t=document.createElement('div');t.className='inv11';document.body.appendChild(t);}
  t.textContent=`🎭 ${c.nombre} · copresentador/a sorpresa INVENTADO/A`;if(who=='H')await v9say('H',text,rid,'Presentador');else await v9say(c.v,text,rid,c.nombre+' (inventado/a)');},
 async quita(){const t=document.querySelector('.inv11');if(t)t.remove();},
 async llega(rid){const c=CO11.c;cut('host');const p=CO11.make();p.visible=true;p.scale.setScalar(.01);tween(.7,e=>p.scale.setScalar(.01+.99*e));sfx('aplauso');await CO11.say('H',c.llega,rid);for(const l of c.intro){cut('host');await CO11.say('c',l,rid);}await CO11.quita();say();},
 async linea(kind,rid){if(!CO11.on||!CO11.c)return;const c=CO11.c;let t;if(kind=='prueba'||kind=='rosco'){const l=c[kind];t=l[CO11.n++%l.length];}else t=c[kind];if(!t)return;cut('host');await CO11.say('c',t,rid);await CO11.quita();say();}};
window.CO11=CO11;
{const _pc=playCort;playCort=async function(id,rid){const r=await _pc.apply(this,arguments);
  if(CO11.on){try{if(CO11.first){CO11.first=false;if(id!='rosco'){await CO11.llega(rid);if(Math.random()<.5)await CO11.linea('prueba',rid);return r;}await CO11.llega(rid);return r;}
   if(id=='rosco'){setPeople(false);await CO11.linea('rosco',rid);}else if(Math.random()<.65)await CO11.linea('prueba',rid);}catch(e){if(!(e instanceof Stop))console.error(e);throw e;}}
  return r;};}
{const _sp=setPeople;setPeople=function(r){_sp.apply(this,arguments);if(CO11.p)CO11.p.visible=!!CO11.on&&!r;};}
{const _pg=programa;programa=async function(){CO11.begin();try{return await _pg.apply(this,arguments);}finally{CO11.end();}};}
{const _d=despedida;despedida=async function(rid){if(CO11.on&&CO11.c){try{setPeople(false);const won=!!(GAME.res&&GAME.res[0]>=NS11.meta());await CO11.linea(won?'gana':'pierde',rid);if(!noBote9())await CO11.linea('bote',rid);await CO11.linea('adios',rid);}catch(e){if(!(e instanceof Stop))console.error(e);throw e;}}return _d.apply(this,arguments);};}
// ---------- menús: Opciones (apagadas por defecto), Extras y pantallas nuevas ----------
{
 const sub=(c,t)=>`<div class="mtext">${t}</div>`;
 SCR9.fuera11s=()=>`<h2>🎥 Más fuera de cámaras</h2><div class="mtext">Escenas de plató INVENTADAS para este juego, con voces.</div>${mb9('x9:f11:all','▶','Ver todas','')}${D11.fuera.map((x,i)=>mb9('x9:f11:'+i,'🎥',esc9(x.t),'Escena inventada')).join('')}${back9('extras9')}`;
 SCR9.cam11s=()=>`<h2>📹 Cámaras ocultas</h2><div class="mtext">Sketches INVENTADOS: el presentador es la víctima. Nada de esto ha pasado en el programa real.</div>${mb9('x9:c11:all','▶','Ver todas','')}${D11.camaras.map((x,i)=>mb9('x9:c11:'+i,'📹',esc9(x.t),'Cámara oculta inventada')).join('')}${back9('extras9')}`;
 SCR9.normas11s=()=>`<h2>📜 Normas sorpresa</h2><div class="mtext">Las ${D11.normas.length} normas son INVENTADAS. Si activas «Normas sorpresa» en Opciones, cada partida sortea 10 (en A la Z y en Pasapalabra en familia, solo las de segundos y pruebas).</div>${Object.keys(D11.cat).map(c=>`<h3 style="margin:8px 0 2px;color:#ffd24a">${D11.cat[c]}</h3>`+D11.normas.filter(n=>n.c==c).map(n=>`<div class="mtext"><b>${esc9(n.n)}</b> · ${esc9(n.d)} <i style="color:#ff9aa0">INVENTADA</i></div>`).join('')).join('')}${back9('extras9')}`;
 {const _e=SCR9.extras9;SCR9.extras9=()=>{const h=_e(),b=back9();const add=mb9('fuera11s','🎥','Más fuera de cámaras',`${D11.fuera.length} escenas inventadas`)+mb9('cam11s','📹','Cámaras ocultas',`${D11.camaras.length} sketches inventados`)+mb9('normas11s','📜','Normas sorpresa','Las 30 normas inventadas');const i=h.lastIndexOf(b);return i<0?h+add:h.slice(0,i)+add+h.slice(i);};}
 {const _t=SCR9.tomas9;SCR9.tomas9=()=>_t().replace('</h2>','</h2><div class="mtext">Las tomas nuevas (v0.11) son INVENTADAS.</div>');}
 {const _m=SCR9.mejor;SCR9.mejor=()=>_m().replace('12 botes más 318.000 € de Escartín',`${D9.botes.length} botes (Wikipedia y prensa)`);}
 {const _x=x9go;x9go=function(g){const [,k,a]=g.split(':');
   if(k=='f11')return scene9(async rid=>{if(a=='all'){for(let i=0;i<D11.fuera.length;i++)await fuera11(rid,i);}else await fuera11(rid,+a);},{back:'fuera11s',banner:'🎥 FUERA DE CÁMARAS · ESCENA INVENTADA'});
   if(k=='c11')return scene9(async rid=>{if(a=='all'){for(let i=0;i<D11.camaras.length;i++)await cam11(rid,i);}else await cam11(rid,+a);},{back:'cam11s',banner:'📹 CÁMARA OCULTA · INVENTADA'});
   return _x.apply(this,arguments);};}
 const ROWS=[['normas11','📜','Normas sorpresa inventadas (10 por partida)'],['previas11','🧪','Más pruebas previas (inventadas)'],['copro11','🎭','Copresentador sorpresa (inventado)']];
 {const _sm=showMenu;showMenu=function(s='main'){const r=_sm.apply(this,arguments);
   if(s=='opt'){const col=menu.querySelector('.col');if(col&&!col.querySelector('[data-o11]')){const last=[...col.querySelectorAll('[data-o9]')].pop();const row=last&&last.closest('.orow');const html=ROWS.map(([k,ic,t])=>`<div class="orow"><label>${ic} ${t}: <b class="v9">${OPT[k]?'Sí':'No'}</b></label><input type="range" min="0" max="1" step="1" value="${OPT[k]?1:0}" data-o11="${k}"></div>`).join('');
     if(row)row.insertAdjacentHTML('afterend',html);else col.querySelector('h2').insertAdjacentHTML('afterend',html);
     col.querySelectorAll('[data-o11]').forEach(i=>i.oninput=()=>{OPT[i.dataset.o11]=+i.value;i.parentNode.querySelector('.v9').textContent=+i.value?'Sí':'No';saveOpt();});
     const t0=NAV.screen==s&&NAV.cur()?NAV.cur().textContent:null;try{NAV.attach(s);if(t0!==null){const k=NAV.items.findIndex(e=>e.textContent===t0);if(k>=0&&k!==NAV.idx)NAV.focus(k,true);}}catch(e){}}}
   return r;};}
}
$('#ver').textContent='v0.11';
Object.assign(window.DBG||{},{x9go,fuera11,cam11,pOpc11,pOrden11,PV11,CO11,D11});
