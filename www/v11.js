'use strict';
// ===== v0.11 · Normas sorpresa INVENTADAS (motor) · como en Ahora Caigo, adaptado a Pasapalabra =====
// Todas las normas son inventadas para este juego y se marcan como INVENTADAS. Opción «normas11» (apagada por defecto).
Object.assign(OPT,{normas11:OPT.normas11||0,previas11:OPT.previas11||0,copro11:OPT.copro11||0});
// si la app se cerró en mitad de un programa con bote modificado, se recupera el bote original
if(OPT.n11bote){OPT.bote=OPT.n11bote;OPT.n11bote=0;saveOpt();}
const NS11={on:false,act:new Set(),ids:[],gold:-1,perd:[0,0],pg:[0,0],cpu0:null,bote0:0,won:false,univ:false,b0:0,patched:false,warn:[]};
window.NS11=NS11;
{
const N=D11.normas,BY=Object.fromEntries(N.map(n=>[n.id,n])),ICO={rosco:'🔤',segundos:'⏱️',bote:'💰',pruebas:'🧩',turnos:'🔄'};
const nap=ms=>new Promise(r=>setTimeout(r,ms/(window.SPEED||1)));
NS11.fx=id=>NS11.on&&NS11.act.has(id);
NS11.meta=()=>(NS11.fx('b_24')&&!V5.noBote)?24:25;
// ---------- sorteo: 10 normas por partida ----------
NS11.sortea=function(univ,sinBote){const cats=['rosco','segundos','bote','pruebas','turnos'].filter(c=>!(sinBote&&c=='bote'));
  const pool=N.filter(n=>(!univ||n.u)&&!(sinBote&&n.c=='bote'));const res=[],bad=new Set();
  const ok=n=>!bad.has(n.id)&&!res.includes(n.id);const take=n=>{res.push(n.id);(n.x||[]).forEach(x=>bad.add(x));};
  if(!univ)for(const c of cats)for(let k=0;k<2;k++){const cand=pool.filter(n=>n.c==c&&ok(n));if(cand.length)take(pick(cand));}
  while(res.length<10){const cand=pool.filter(ok);if(!cand.length)break;take(pick(cand));}
  return res;};
// ---------- avisos en pantalla ----------
const css=document.createElement('style');css.textContent=`
.nsov{position:fixed;inset:0;z-index:95;background:rgba(6,8,22,.93);display:flex;flex-direction:column;align-items:center;padding:2.2vh 2vw;color:#fff;font-family:inherit;overflow:hidden;touch-action:manipulation}
.nsov .nsh{font:900 clamp(20px,4.6vh,38px)/1.1 inherit;color:#ffd24a;text-shadow:0 2px 8px #000;letter-spacing:.04em;text-align:center}
.nsov .nss{font:700 clamp(11px,2.2vh,16px)/1.2 inherit;color:#ffb0b0;margin:.5vh 0 1.2vh;text-align:center}
.nsov .nsg{flex:1;min-height:0;width:min(98vw,1100px);display:grid;grid-template-columns:repeat(auto-fit,minmax(clamp(150px,22vw,250px),1fr));gap:1vh 1vw;align-content:start;overflow:hidden}
.nsov .nsc{background:linear-gradient(160deg,#16306e,#0b1a44);border:2px solid #3a5fb8;border-radius:12px;padding:.8vh 1vw;opacity:.4;transform:scale(.97);transition:all .25s;position:relative}
.nsov .nsc.on{opacity:1;transform:scale(1.03);border-color:#ffd24a;box-shadow:0 0 16px #ffd24a88}.nsov .nsc.hecho{opacity:.9;transform:none}
.nsov .nsc b{display:block;font:800 clamp(12px,2.3vh,17px)/1.15 inherit;color:#ffe08a}.nsov .nsc span{display:block;font:600 clamp(10px,1.9vh,14px)/1.2 inherit;color:#dbe6ff;margin-top:.3vh}
.nsov .nsc i{position:absolute;top:3px;right:6px;font:900 9px/1 inherit;color:#fff;background:#c0262d;border-radius:5px;padding:2px 4px;font-style:normal;letter-spacing:.03em}
.nsov .nsb{margin-top:1vh;background:#ffd24a;color:#3b2500;border:0;border-radius:14px;font:900 clamp(15px,3.2vh,24px) inherit;padding:1vh 5vw;box-shadow:0 4px 0 #b88500}
.nsbadge{position:fixed;top:44px;right:6px;z-index:27;background:#16306eee;border:2px solid #ffd24a;color:#ffe08a;border-radius:16px;padding:3px 9px;font:800 13px inherit;display:none}
.n11t{position:fixed;top:14%;left:50%;transform:translateX(-50%);z-index:60;background:#0b1a44ee;border:2px solid #ffd24a;color:#fff;border-radius:14px;padding:6px 14px;font:800 clamp(13px,2.6vh,19px) inherit;pointer-events:none;text-align:center;max-width:92vw;box-shadow:0 4px 14px #000a}
.n11t small{display:block;color:#ff9aa0;font-size:.62em;font-weight:700}
.rec11{position:fixed;top:8px;left:8px;z-index:60;background:#000b;color:#ff4040;border:2px solid #ff4040;border-radius:8px;padding:3px 9px;font:900 clamp(11px,2.2vh,16px) monospace;pointer-events:none;animation:rec11 1s steps(2) infinite}
@keyframes rec11{50%{opacity:.35}}
.inv11{position:fixed;left:50%;bottom:7%;transform:translateX(-50%);z-index:58;background:#c0262dee;color:#fff;border-radius:10px;padding:3px 12px;font:900 clamp(11px,2.2vh,16px) inherit;pointer-events:none;letter-spacing:.05em}
`;document.head.appendChild(css);
NS11.toastN=function(t){if(!NS11.on)return;let e=document.querySelector('.n11t');if(!e){e=document.createElement('div');e.className='n11t';document.body.appendChild(e);}
  e.innerHTML=`📜 ${t}<small>Norma INVENTADA</small>`;e.style.display='block';clearTimeout(NS11._tt);NS11._tt=setTimeout(()=>{e.style.display='none';},2600);};
function card(n){return `<div class="nsc" data-id="${n.id}"><i>INVENTADA</i><b>${ICO[n.c]} ${esc9(n.n)}</b><span>${esc9(n.d)}</span></div>`;}
NS11.lista=function(){const ids=NS11.ids;if(!ids.length||document.querySelector('.nsov'))return;const ov=document.createElement('div');ov.className='nsov';
  ov.innerHTML=`<div class="nsh">📜 NORMAS DE HOY</div><div class="nss">Las 10 normas son INVENTADAS · no son del programa real</div><div class="nsg">${ids.map(i=>card(BY[i])).join('')}</div><button class="nsb">Cerrar</button>`;
  ov.querySelectorAll('.nsc').forEach(c=>c.classList.add('hecho'));ov.querySelector('.nsb').onclick=()=>ov.remove();document.body.appendChild(ov);};
NS11.badge=function(show){let b=document.querySelector('.nsbadge');if(!b){b=document.createElement('div');b.className='nsbadge';b.onclick=()=>NS11.lista();document.body.appendChild(b);}
  b.textContent=`📜 ${NS11.ids.length} normas inventadas`;b.style.display=show&&document.body.classList.contains('ingame')?'block':'none';};
setInterval(()=>{const b=document.querySelector('.nsbadge');if(b)b.style.display=(NS11.on&&document.body.classList.contains('ingame'))?'block':'none';},700);
// ---------- anuncio de las normas ----------
NS11.anuncio=function(ids){return new Promise(async done=>{const ov=document.createElement('div');ov.className='nsov';
  ov.innerHTML=`<div class="nsh">📜 NORMAS SORPRESA</div><div class="nss">Inventadas para este Pasapalabra 3D · no son del programa real</div><div class="nsg">${ids.map(i=>card(BY[i])).join('')}</div><button class="nsb">¡A jugar!</button>`;
  document.body.appendChild(ov);let fin=false;const stop=()=>{if(fin)return;fin=true;v9stop();ov.remove();done();};ov.querySelector('.nsb').onclick=stop;
  const mudo=OPT.vozp===0||OPT.mute5;const dec=async(t)=>{if(fin)return;const c=CLIPS9['H|'+key9(t)];if(c&&!mudo){await Promise.race([v9play('p9/'+c[0]+'.ogg'),new Promise(r=>{const iv=setInterval(()=>{if(fin){clearInterval(iv);r();}},120);})]);}else await nap(mudo?2200:1400);};
  try{await dec(D11.nsIntro);for(const id of ids){if(fin)return;const el=ov.querySelector(`[data-id="${id}"]`);if(el){el.classList.add('on');try{el.scrollIntoView({block:'nearest'});}catch(e){}}await dec(BY[id].n+'. '+BY[id].d);if(el){el.classList.remove('on');el.classList.add('hecho');}}
    await dec(D11.nsFin);}catch(e){console.error(e);}stop();});};
// ---------- ciclo de un programa ----------
NS11.empieza=async function(fam){NS11.on=false;NS11.won=false;NS11.act=new Set();NS11.ids=[];NS11.cpu0=null;if(!OPT.normas11)return;
  const univ=!!fam||OPT.final=='alaz';const sinBote=!!fam||!!((window.V6&&V6.cur)||V5.noBote);NS11.univ=univ;
  const ids=NS11.sortea(univ,sinBote);NS11.ids=ids;NS11.act=new Set(ids);NS11.on=true;
  if(!sinBote){const o=OPT.bote||60000;let nv=o;if(NS11.fx('b_x2'))nv=o*2;else if(NS11.fx('b_x15'))nv=Math.round(o*1.5/6000)*6000;else if(NS11.fx('b_mas30'))nv=o+30000;else if(NS11.fx('b_mas60'))nv=o+60000;
    if(nv!==o){OPT.n11bote=o;OPT.bote=nv;NS11.b0=nv;saveOpt();}}
  try{await NS11.anuncio(ids);}catch(e){console.error(e);}NS11.badge(true);};
NS11.termina=function(){if(NS11.cpu0!==null){V5.cpuP=NS11.cpu0;NS11.cpu0=null;}
  if(OPT.n11bote){if(!NS11.won)OPT.bote=OPT.n11bote+((OPT.bote||0)-NS11.b0);OPT.n11bote=0;saveOpt();}
  NS11.on=false;NS11.ids=[];NS11.act=new Set();const b=document.querySelector('.nsbadge');if(b)b.style.display='none';const t=document.querySelector('.n11t');if(t)t.style.display='none';};
// ---------- segundos antes del rosco ----------
NS11.segundos=function(){if(!NS11.on)return;let [a,b]=GAME.sec;const o=[a,b],t=[];
  if(NS11.fx('s_igual')){const m=Math.round((a+b)/2);a=b=m;t.push('tiempos igualados');}
  if(NS11.fx('s_mas10')){a+=10;t.push('azul +10 s');}if(NS11.fx('s_mas20')){a+=20;t.push('azul +20 s');}
  if(NS11.fx('s_rival10')){b-=10;t.push('naranja −10 s');}if(NS11.fx('s_ambos15')){a+=15;b+=15;t.push('ambos +15 s');}
  b=Math.max(b,-100);a=Math.max(a,-100);GAME.sec=[a,b];if(a!==o[0]||b!==o[1])NS11.toastN('⏱️ '+t.join(' · '));};
// ---------- pruebas previas ----------
NS11.prueba=function(s0,id,E){if(!NS11.on)return;const ids=(ETAPAS[OPT.etapa]||E).pr.map(p=>p[0]).filter(x=>x!='rosco');NS11._pr(s0,ids[ids.length-1]==id);};
// pruebas del juego en familia: azul = GAME.sec[0], naranja = GAME.sec[1]
NS11.famPr=function(T,s0,i,n){if(!NS11.on)return;GAME.sec=[T.az.sec,T.na.sec];NS11._pr(s0,i==n-1);T.az.sec=GAME.sec[0];T.na.sec=GAME.sec[1];};
NS11.fam=function(T){if(!NS11.on)return;GAME.sec=[T.az.sec,T.na.sec];NS11.segundos();T.az.sec=Math.max(GAME.sec[0],-65);T.na.sec=Math.max(GAME.sec[1],-65);};
NS11._pr=function(s0,last){const d=[GAME.sec[0]-s0[0],GAME.sec[1]-s0[1]];const t=[];
  const dob=()=>{GAME.sec[0]+=d[0];GAME.sec[1]+=d[1];};
  if(NS11.fx('p_doble')){dob();t.push('puntúa doble');}
  if(NS11.fx('p_ultima_doble')&&last){dob();t.push('última prueba a doble');}
  if(NS11.fx('p_naranja_mitad')&&d[1]>0){const m=Math.floor(d[1]/2);GAME.sec[1]-=d[1]-m;t.push('naranja a la mitad');}
  if(NS11.fx('p_azul_mas2')){GAME.sec[0]+=2;t.push('azul +2 s');}
  if(NS11.fx('p_minimo3')){for(const k of[0,1]){const g=GAME.sec[k]-s0[k];if(g<3)GAME.sec[k]+=3-g;}t.push('mínimo de 3 s');}
  if(NS11.fx('p_ganador3')&&d[0]!==d[1]){GAME.sec[d[0]>d[1]?0:1]+=3;t.push((d[0]>d[1]?'azul':'naranja')+' +3 s');}
  if(t.length)NS11.toastN('🧩 '+t.join(' · '));};
// ---------- rosco ----------
NS11.pre=function(st,tm,pos){NS11.perd=[0,0];NS11.pg=[0,0];NS11.gold=-1;if(!NS11.on)return;const t=[];
  if(NS11.fx('r_oro'))NS11.gold=1+Math.floor(Math.random()*24);
  if(NS11.fx('t_regalo_a')){st[0][0]=1;t.push('letra A regalada al azul');}if(NS11.fx('t_regalo_n')){st[1][0]=1;t.push('letra A regalada al naranja');}
  if(NS11.fx('r_rival')){if(NS11.cpu0===null)NS11.cpu0=V5.cpuP;V5.cpuP=Math.max(.2,(V5.cpuP||.7)-.25);t.push('naranja despistado');}
  if(NS11.gold>0)t.push('hay una letra de oro');if(t.length)NS11.toastN('🔤 '+t.join(' · '));};
NS11.post=function(){if(NS11.cpu0!==null){V5.cpuP=NS11.cpu0;NS11.cpu0=null;}};
NS11.pista=function(ans,i){if(!NS11.on)return '';let s='';if(NS11.fx('r_pista')){const n=String(ans[0]).replace(/[^A-Za-zÁÉÍÓÚÜÑáéíóúüñ]/g,'').length;s+=` <i>(${n} letras)</i>`;}
  if(i===NS11.gold)s+=' ⭐ <b>¡Letra de oro!</b>';return s;};
NS11.res=function(res,turn,i,tm,g){if(!NS11.on||res!=='ko')return null;const allow=NS11.fx('r_perdon2')?2:NS11.fx('r_perdon')?1:0;
  if(NS11.perd[turn]<allow){NS11.perd[turn]++;NS11.toastN('🙏 Perdón: el fallo no cuenta, pasa a pasapalabra');return 'pasa';}return null;};
NS11.ok=function(turn,i,tm,g){if(!NS11.on)return;const t=[];if(i===NS11.gold){NS11.gold=-1;tm[turn]+=10;t.push('⭐ Letra de oro: +10 s');}
  if(NS11.fx('r_racha')&&V5.R.run[turn]>0&&V5.R.run[turn]%3==0){tm[turn]+=3;t.push('🔥 Racha de tres: +3 s');}
  if(t.length){NS11.toastN(t.join(' · '));try{sfx('winner');g.tm.set(Math.ceil(tm[turn]));}catch(e){}}};
NS11.pasa=function(turn,tm,g){if(!NS11.fx('s_pasa')||NS11.pg[turn]>=10)return;NS11.pg[turn]+=2;tm[turn]+=2;try{g.tm.set(Math.ceil(tm[turn]));}catch(e){}NS11.toastN('⏩ Pasapalabra con premio: +2 s');};
NS11.lim=function(turn){if(!NS11.on)return 0;if(NS11.fx('t_lim8'))return 8;if(NS11.fx('t_lim5')&&turn==0)return 5;if(NS11.fx('t_lim3n')&&turn==1)return 3;return 0;};
NS11.ini=function(){return NS11.fx('t_ini_n')?1:0;};
// ---------- parche del rosco real (fuente de window.__v5f) ----------
const REP=[
 ['let turn=0;V5.R={','let turn=NS11.ini();V5.R={'],
 ['await show();chk(rid);let tl=0;','NS11.segundos();tm[0]=120+GAME.sec[0];tm[1]=120+GAME.sec[1];NS11.pre(st,tm,pos);await show();chk(rid);let tl=0;'],
 ["toLowerCase()}`);","toLowerCase()}`+NS11.pista(ans,i));"],
 ["if(res=='ok'){V5.R.run[turn]++","res=NS11.res(res,turn,i,tm,g)||res;if(res=='ok'){V5.R.run[turn]++"],
 ["st[turn][i]=1;g.state(i,1);sfx('ok');","st[turn][i]=1;g.state(i,1);sfx('ok');V5.R.run[turn]>0&&NS11.ok(turn,i,tm,g);"],
 ['pos[turn]=(i+1)%25;continue;}',"pos[turn]=(i+1)%25;{const L=NS11.lim(turn);if(L&&V5.R.run[turn]>=L&&alive(1-turn)&&st[0].filter(x=>x==1).length<NS11.meta()){V5.R.run[turn]=0;NS11.toastN('🔄 Relevo: cede el turno');g.setAct(-1);turn=1-turn;await show();chk(rid);}}continue;}"],
 ["if(res=='pasa'){sfx('splash');","if(res=='pasa'){sfx('splash');NS11.pasa(turn,tm,g);"],
 ['st[0].filter(x=>x==1).length<25){chk(rid)','st[0].filter(x=>x==1).length<NS11.meta()){chk(rid)'],
 ['if(a[0]==25&&!V5.noBote)','if(a[0]>=NS11.meta()&&!V5.noBote)'],
 ['say();setActs();const a=[0,1].map','NS11.post();say();setActs();const a=[0,1].map']];
NS11.parchea=function(){const f=window.__v5f;if(typeof f!=='function')return null;let src=f.toString();NS11.warn=[];
  for(const [a,b] of REP){if(!src.includes(a)){NS11.warn.push(a);console.warn('NS11: ancla del rosco no encontrada:',a);}else src=src.replace(a,()=>b);}
  if(NS11.warn.length)return null;try{const nf=(0,eval)('('+src+')');NS11.patched=true;return nf;}catch(e){console.error('NS11 parche',e);NS11.warn.push('eval');return null;}};
NS11.rosco0=window.__v5f;NS11.rosco1=NS11.parchea();
// el rosco que se juega: el parcheado (o el original si faltara algún ancla); A la Z siempre que se elija
NS11.rosco=async function(rid){if(OPT.final=='alaz')return alaZ(rid);return (NS11.rosco1||NS11.rosco0)(rid);};
const mkRosco=()=>Object.assign(async function(rid){cut('orbitR');return NS11.rosco(rid);},{v3:1,n11:1});
// ---------- enganches en las etapas ----------
NS11.wrapPr=function(){for(const y in ETAPAS){const E=ETAPAS[y];if(!E||!E.pr)continue;
  for(const p of E.pr){if(!p[1]||p[1].n11)continue;if(p[0]=='rosco'){p[1]=mkRosco();continue;}
    const f=p[1],id=p[0];const w=Object.assign(async function(rid){const s0=GAME.sec.slice();const r=await f.apply(this,arguments);NS11.prueba(s0,id,E);return r;},{n11:1,v3:f.v3,orig:f});p[1]=w;}}};
{const _sp=syncPrev9;syncPrev9=function(){_sp.apply(this,arguments);try{if(window.PV11)PV11.sync();NS11.wrapPr();}catch(e){console.error(e);}};}
// programa: normas al empezar y al terminar
{const _pg=programa;programa=async function(){try{await NS11.empieza();}catch(e){console.error(e);}try{return await _pg.apply(this,arguments);}finally{NS11.termina();}};}
// bote: ganar (premio8 sin keep) y subida de doce mil
{const _p=premio8;premio8=async function(rid,o){if(!(o&&o.keep))NS11.won=true;return _p.apply(this,arguments);};}
{const _d=despedida;despedida=async function(){try{if(NS11.fx('b_sube12')&&!GAME.boteDone&&!noBote9()&&GAME.res&&GAME.res[0]<NS11.meta()){OPT.bote=(OPT.bote||60000)+6000;NS11.toastN('💰 El bote sube doce mil');}}catch(e){console.error(e);}return _d.apply(this,arguments);};}
Object.assign(window.DBG||{},{NS11});
}
