'use strict';
// ===== v0.10 · PASAPALABRA EN FAMILIA (juego propio) =====
// Mecánica: Wikipedia (Telecinco 2018). Dos familias de 3 (naranja = ganadora anterior, azul = la que entra), pruebas que dan segundos,
// rosco de 25 palabras con 85 s + segundos, 2 jugadores por familia (A–Ñ y O–Z), por turnos, 1.200 € / bote de 6.000 € que sube. Contenido de las pruebas: INVENTADO.
{
const GOLD=0xffd23a,GREY=0x5a6272;
const S=()=>{const d={n:1,bote:6000,mode:'cpu',or:'me',c:0,pr:3,famN:'',mem:['','',''],wins:0,jug:0,ganado:0};
 if(!OPT.fam10)OPT.fam10=d;else for(const k in d)if(OPT.fam10[k]===undefined)OPT.fam10[k]=d[k];return OPT.fam10;};
const eur=n=>String(n).replace(/\B(?=(\d{3})+(?!\d))/g,'.')+' €';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
// ---------- reglas (función pura, probada aparte) ----------
function resolve10(hn,mn,ha,ma,bote){ // hn/mn: aciertos/fallos del naranja; ha/ma: del azul
 let w=null;if(hn!==ha)w=hn>ha?'na':'az';else if(mn!==ma)w=mn<ma?'na':'az';
 const full=[];if(hn===25)full.push('na');if(ha===25)full.push('az');
 const prize={na:0,az:0},bt={na:0,az:0};
 if(full.length){full.forEach(k=>bt[k]=bote/full.length);}
 else if(w)prize[w]=1200;else{prize.na=600;prize.az=600;}
 return {w,tie:!w,full,prize,bote:bt,boteNext:full.length?6000:bote+6000,returns:w?[w]:['na','az']};}
// ---------- equipos ----------
function mkTeams(){const s=S();
 const me=()=>({id:'me',name:s.famN?'Familia '+s.famN:'Vuestra familia',mem:s.mem.map((m,i)=>(m||'').trim()||'Jugador '+(i+1)),_c:false});
 const fm=F10D.fam[s.c%F10D.fam.length];const cp=()=>({id:'cpu',name:'Familia '+fm[0],mem:fm.slice(1),_c:true,line:F10D.famLine[s.c%F10D.fam.length]});
 let a,b;
 if(s.mode=='cpu'){a=s.or=='me'?me():cp();b=s.or=='me'?cp():me();}
 else{const A={id:'A',name:'Familia A',mem:['Jugador A1','Jugador A2','Jugador A3'],_c:false},B={id:'B',name:'Familia B',mem:['Jugador B1','Jugador B2','Jugador B3'],_c:false};a=s.or=='B'?B:A;b=s.or=='B'?A:B;}
 const mk=(t,k)=>{Object.assign(t,{k,tm:TEAM9[k],sec:0,hits:0,miss:0,pr:{}});Object.defineProperty(t,'cpu',{get:()=>t._c||!!window.F10AUTO});return t;};return {na:mk(a,'na'),az:mk(b,'az')};}
// ---------- utilidades ----------
let SV=null;
const colSave=()=>{SV={bl:COL.bl,blD:COL.blD,or:COL.or,orD:COL.orD};};
const colRest=()=>{if(SV)Object.assign(COL,SV);SV=null;window.TIMERC9=null;try{FX5.tint('');}catch(e){}};
function setTeam(t){const tm=t.tm,o=TEAM9[t.k=='na'?'az':'na'];COL.bl=tm.c;COL.blD=tm.d;COL.or=o.c;COL.orD=o.d;window.TIMERC9=tm.t;if(window.F16)F16.team(t.k);try{FX5.tint(tm.tint);}catch(e){}}
async function hs(rid,t,extra=0){hostSay(t);const c=VOZ5[t];await wait((c?c[1]+.3:Math.max(1.2,t.length*.05))+extra,rid);chk(rid);}
async function clip(rid,f){await v9play(f);chk(rid);await wait(.15,rid);}
const secF=n=>n>60?'p10/sm.ogg':'p10/s'+Math.max(0,n)+'.ogg';
const monF=n=>(n>=100&&n<=99900&&n%100==0)?`bote/c${n}.ogg`:(n>=60000&&n<=3000000&&n%6000==0)?`bote/a${n}.ogg`:null;
async function money(rid,n){const f=monF(n);if(f)await clip(rid,f);}
async function moneyBig(rid,n,secs=1.6){const b=bigTxt(560,130,eur(n),{grad:['#fff6b0','#ffd23a','#f0a000','#ffe680'],side:'#8a5200',layers:9,glow:'#ffcf40'});b.position.set(0,-230,100);b.scale.setScalar(.01);G.add(b);
 await tween(.6,e=>{b.scale.setScalar(.01+e);b.rotation.y=(1-e)*1.4;});let t=0;anim(dt=>{t+=dt;b.rotation.y=Math.sin(t*1.6)*.12;return !!b.parent;});
 await money(rid,n);await wait(secs,rid);G.remove(b);}
function nameBar(t,extra){const b=bar(Math.min(GW*.6,620),40,t.tm.c,(t.name+(extra?' · '+extra:'')).toUpperCase(),{fs:22});b.position.set(0,-290,0);G.add(b);return b;}
function gate(rid,t){if(S().mode!='two'||t.cpu)return Promise.resolve();
 return new Promise(r=>{say(`<b>📱 Pasad el móvil a ${esc(t.name)}</b> (equipo ${t.tm.n.toLowerCase()})`);setActs([{t:`¡Listo! · ${t.name}`,ic:'▶',cls:'y',cb:()=>{setActs();say();r();}}]);});}
function evt(st,rid,reg){return new Promise(res=>{let d=false;const f=v=>{if(!d){d=true;res(v);}};reg(f);anim(()=>{if(d)return false;if(st.t<=0||rid!==RUN){f('time');return false;}return true;});});}
// elige entre n opciones: persona = toque; CPU = espera y acierta con probabilidad p
async function sel(st,rid,t,right,n,p){
 if(!t.cpu){const a=await tapWait9(st,rid);chk(rid);return a;}
 await wait(rnd(1.2,2.5),rid);if(st.t<=0)return -1;if(Math.random()<p)return right;let w;do{w=Math.floor(Math.random()*n);}while(w===right);return w;}
const flash=async(b,c,secs,rid,back)=>{b.setC(c);await wait(secs,rid);if(back!==undefined)b.setC(back);};
// turno de un equipo en una prueba
async function turnoEq(rid,t,secs,per,body,unit){
 await gate(rid,t);chk(rid);setTeam(t);clearG();cut(t.tm.shot);hostSay(t.k=='na'?T10.tnaranja:T10.tazul);await rotulo(`TURNO DEL EQUIPO ${t.tm.n}`,t.tm.c,rid,1.2);cut('host');
 nameBar(t);const st=timerSetup9(secs,rid);let h=0;try{h=await body(st);}finally{st.on=false;}
 chk(rid);TAP=null;setActs();sfx('winner');const gan=unit?h:h*per;t.sec+=gan;
 await rotulo(unit?`${t.tm.n}: +${gan} s`:`${t.tm.n}: ${h} ACIERTOS · +${gan} s`,t.tm.c,rid);clearG();return h;}
const half=(arr,j,n)=>arr.slice(j*n,j*n+n);
// ===== PRUEBA 1 · HE DICHO =====
async function pHe(rid,T){const qs=shuffle(F10D.he);
 for(const [j,t] of [T.na,T.az].entries())await turnoEq(rid,t,45,2,async st=>{let hits=0;const w=Math.min(GW*.82,980);
  const who=bar(Math.min(GW*.6,560),36,t.tm.c,'',{fs:20}),q=bar(w,84,t.tm.c,'',{fs:28});who.position.set(0,235,0);q.position.set(0,150,0);G.add(who,q);
  const opts=[0,1,2,3].map(i=>{const b=bar(Math.min(GW*.4,400),54,t.tm.c,'',{fs:26});b.position.set(i%2?GW*.12+210:-GW*.12-210,25-Math.floor(i/2)*76,0);b.userData.tap=i;G.add(b);return b;});
  for(const [ch,fr,ans,dec] of half(qs,j,7)){if(st.t<=0)break;const o=shuffle([ans,...dec]),r=o.indexOf(ans);
   who.setT((ch+' dice:').toUpperCase(),t.tm.c);q.setT(fr.replace('___','_____'),t.tm.c);opts.forEach((b,i)=>b.setT(o[i].toUpperCase(),t.tm.c));
   const a=await sel(st,rid,t,r,4,.72);if(a<0)break;const ok=a===r;sfx(ok?'ok':'error');opts[a].setC(ok?COL.gr:COL.rd);if(!ok)opts[r].setC(COL.gr);else hits++;
   q.setT(fr.replace('___',ans.toUpperCase()),ok?COL.gr:t.tm.c);await wait(.8,rid);}
  return hits;});}
// ===== PRUEBA 2 · PALABRAS CRUZADAS =====
async function pCruz(rid,T){const ws=shuffle(F10D.cruz);
 for(const [j,t] of [T.na,T.az].entries())await turnoEq(rid,t,50,3,async st=>{let hits=0;const mine=half(ws,j,6);
  const df=bar(Math.min(GW*.84,1000),56,t.tm.c,'',{fs:26});df.position.set(0,215,0);const mid=bar(300,62,t.tm.c,'… + …',{fs:30});mid.position.set(0,60,0);G.add(df,mid);
  const mk=(i,x)=>{const b=bar(Math.min(GW*.26,330),54,t.tm.c,'',{fs:28});b.position.set(x,[130,60,-10,-80][i%3]-(i%3==0?20:0),0);b.userData.tap=i;G.add(b);return b;};
  const LB=[0,1,2].map(i=>mk(i,-GW*.27)),RB=[3,4,5].map(i=>mk(i,GW*.27));LB.forEach((b,i)=>b.position.y=[120,50,-20][i]);RB.forEach((b,i)=>b.position.y=[120,50,-20][i]);
  for(const [d,a,b] of mine){if(st.t<=0)break;const decA=shuffle(ws.filter(x=>x[1]!==a).map(x=>x[1])).slice(0,2),decB=shuffle(ws.filter(x=>x[2]!==b).map(x=>x[2])).slice(0,2);
   const lo=shuffle([a,...decA]),ro=shuffle([b,...decB]);df.setT(d.toUpperCase(),t.tm.c);mid.setT('… + …',t.tm.c);LB.forEach((x,i)=>x.setT(lo[i],t.tm.c));RB.forEach((x,i)=>x.setT(ro[i],t.tm.c));
   let li=-1,ri=-1;
   if(t.cpu){await wait(rnd(2,3.8),rid);if(st.t<=0)break;if(Math.random()<.7){li=lo.indexOf(a);ri=ro.indexOf(b);}else{li=Math.floor(Math.random()*3);ri=Math.floor(Math.random()*3);}}
   else while(li<0||ri<0){const x=await tapWait9(st,rid);chk(rid);if(x<0)break;if(x<3){li=x;}else ri=x-3;LB.forEach((y,i)=>y.setC(i==li?GOLD:t.tm.c));RB.forEach((y,i)=>y.setC(i==ri?GOLD:t.tm.c));mid.setT(`${li>=0?lo[li]:'…'} + ${ri>=0?ro[ri]:'…'}`,t.tm.c);}
   if(li<0||ri<0)break;const ok=lo[li]===a&&ro[ri]===b;sfx(ok?'ok':'error');if(ok)hits++;mid.setT(`${lo[li]}${ro[ri]}`.toUpperCase()+(ok?'':' ✗'),ok?COL.gr:COL.rd);LB[li].setC(ok?COL.gr:COL.rd);RB[ri].setC(ok?COL.gr:COL.rd);
   if(!ok){mid.setT(`${a}${b}`.toUpperCase(),COL.gr);}await wait(.9,rid);}
  return hits;});}
// ===== PRUEBA 3 · ¿DÓNDE ESTÁN? (panel compartido; turnos; un fallo tapa todo y pasa el turno) =====
async function pDonde(rid,T){clearG();const words=shuffle(pick(F10D.donde).slice());const order=[T.na,T.az];let cur=order[0];setTeam(cur);cut('host');
 const tiles=words.map((w,i)=>{const b=bar(Math.min(GW*.2,200),78,cur.tm.c,w,{fs:30});b.position.set((i%3-1)*Math.min(GW*.22,215),150-Math.floor(i/3)*92,0);b.userData.tap=i;G.add(b);return b;});
 const prompt=bar(Math.min(GW*.7,760),50,cur.tm.c,'',{fs:28});prompt.position.set(0,260,0);G.add(prompt);const pn=nameBar(cur);
 hostSay(T10.memo);prompt.setT('MEMORIZAD LAS PALABRAS');await wait(1.8,rid);for(let k=6;k>0;k--){prompt.setT('MEMORIZAD · '+k);await wait(1,rid);}
 tiles.forEach((b,i)=>b.setT(String(i+1),cur.tm.c));sfx('splash');
 const st={t:75,on:true};let tmr=null;const mkTm=()=>{if(tmr)G.remove(tmr);tmr=yTimer();tmr.position.set(-GW/2+90,-262,20);G.add(tmr);tmr.set(Math.max(0,Math.ceil(st.t)));};
 mkTm();anim(dt=>{if(!st.on||rid!==RUN)return false;st.t-=dt;tmr.set(Math.max(0,Math.ceil(st.t)));return true;});
 const found=new Set();let ti=0;
 while(st.t>0&&found.size<9){const t=order[ti%2];if(t!==cur||ti==0){}if(t!==cur){cur=t;await gate(rid,t);setTeam(t);cut(t.tm.shot);await wait(.5,rid);cut('host');tiles.forEach(b=>b.setC(t.tm.c));prompt.setC(t.tm.c);mkTm();if(pn.parent)G.remove(pn);nameBar(t);}
  const rest=words.map((w,i)=>i).filter(i=>!found.has(i));const target=pick(rest);prompt.setT(`${t.tm.n} · ¿DÓNDE ESTÁ «${words[target]}»?`,t.tm.c);
  const a=await sel(st,rid,t,target,9,.5);if(a<0)break;
  if(a===target){found.add(a);tiles[a].setT(words[a],COL.gr);sfx('ok');t.sec+=3;t.pr.donde=(t.pr.donde||0)+1;await wait(.7,rid);tiles[a].setT(String(a+1),t.tm.c);tiles[a].setC(t.tm.c);}
  else{sfx('error');tiles[a].setT(words[a],COL.rd);prompt.setT('¡FALLO! SE TAPA TODO · PASA EL TURNO',COL.rd);await wait(1.1,rid);tiles.forEach((b,i)=>b.setT(String(i+1),t.tm.c));ti++;}}
 st.on=false;chk(rid);setActs();sfx('winner');hostSay(T10.tiempo);
 await rotulo(`NARANJA +${(T.na.pr.donde||0)*3} s · AZUL +${(T.az.pr.donde||0)*3} s`,GOLD,rid,2);clearG();}
// ===== PRUEBA 4 · ¿TÚ QUÉ PINTAS? =====
function strokePrim(g,p,f){const k=p[0];g.beginPath();
 if(k=='c')g.arc(p[1],p[2],p[3],0,Math.PI*2*f);else if(k=='e')g.ellipse(p[1],p[2],p[3],p[4],0,0,Math.PI*2*f);
 else if(k=='a'){const a0=p[4]*Math.PI/180,a1=p[5]*Math.PI/180;g.arc(p[1],p[2],p[3],a0,a0+(a1-a0)*f);}
 else{const pts=[];for(let i=1;i+1<p.length;i+=2)pts.push([p[i],p[i+1]]);let tot=0;const ls=[];for(let i=1;i<pts.length;i++){const l=Math.hypot(pts[i][0]-pts[i-1][0],pts[i][1]-pts[i-1][1]);ls.push(l);tot+=l;}
  let want=tot*f;g.moveTo(...pts[0]);for(let i=1;i<pts.length&&want>0;i++){const l=ls[i-1],u=Math.min(1,want/l);g.lineTo(pts[i-1][0]+(pts[i][0]-pts[i-1][0])*u,pts[i-1][1]+(pts[i][1]-pts[i-1][1])*u);want-=l;}}
 g.stroke();}
async function pPinta(rid,T){const topics=shuffle(F10D.pinta.flatMap(([tp,ws])=>ws.map(w=>[tp,w])));const cpuW=topics.filter(x=>F10D.icons[x[1]]);let ti=0,ci=0;
 for(const t of [T.na,T.az])await turnoEq(rid,t,60,3,async st=>{let hits=0;const BW=560,BH=330;
  const frame=bar(BW+24,BH+24,0xf4f4f4,'',{bw:6});frame.position.set(0,40,0);G.add(frame);
  const cvs=document.createElement('canvas');cvs.width=BW;cvs.height=BH;const g=cvs.getContext('2d');g.lineCap='round';g.lineJoin='round';g.lineWidth=7;
  const tex=new THREE.CanvasTexture(cvs);const board=new THREE.Mesh(new THREE.PlaneGeometry(BW,BH),new THREE.MeshBasicMaterial({map:tex}));board.position.set(0,40,12);G.add(board);
  const clr=()=>{g.fillStyle='#fffdf4';g.fillRect(0,0,BW,BH);tex.needsUpdate=true;};clr();
  const tb=bar(Math.min(GW*.6,600),40,t.tm.c,'',{fs:22});tb.position.set(0,262,0);G.add(tb);
  let drawing=false,dn=false,last=null;const el=$('#c');
  const pos=e=>{mv.set(e.clientX/W*2-1,-(e.clientY/H)*2+1);ray.setFromCamera(mv,gcam);const h=ray.intersectObject(board,false)[0];return h&&h.uv?[h.uv.x*BW,(1-h.uv.y)*BH]:null;};
  const pd=e=>{if(!dn)return;const p=pos(e);if(!p)return;drawing=true;last=p;g.strokeStyle=t.k=='na'?'#c86400':'#0b3fb0';g.beginPath();g.moveTo(p[0],p[1]);g.lineTo(p[0]+.1,p[1]);g.stroke();tex.needsUpdate=true;};
  const pm=e=>{if(!drawing)return;const p=pos(e);if(!p)return;g.beginPath();g.moveTo(last[0],last[1]);g.lineTo(p[0],p[1]);g.stroke();last=p;tex.needsUpdate=true;};
  const pu=()=>{drawing=false;};el.addEventListener('pointerdown',pd);el.addEventListener('pointermove',pm);addEventListener('pointerup',pu);addEventListener('pointercancel',pu);
  try{
   while(st.t>0){
    if(!t.cpu){const [tp,w]=topics[ti++%topics.length];clr();dn=false;V13.draw=false;tb.setT('TEMA: '+tp.toUpperCase(),t.tm.c);hostSay('Dibuja una persona; los demás adivinan. Toca «Ver la palabra» solo si te toca dibujar.');
     const v=await evt(st,rid,f=>setActs([{t:'Ver la palabra',ic:'👁',cls:'y',cb:()=>f('see')}]));setActs();if(v=='time')break;
     const wb=bar(Math.min(GW*.5,480),70,GOLD,w,{fs:44});wb.position.set(0,40,40);G.add(wb);say('<b>¡Que nadie más la vea!</b>');await wait(3,rid);G.remove(wb);say();
     dn=true;V13.draw=true;const r=await evt(st,rid,f=>setActs([{t:'¡Acertamos! +3 s',ic:'✔',cls:'y',cb:()=>f('ok')},{t:'Pasar',ic:'⟳',cb:()=>f('pass')}]));setActs();dn=false;V13.draw=false;
     if(r=='time')break;if(r=='ok'){hits++;sfx('ok');tb.setT('¡ACERTADO! '+w,COL.gr);await wait(.9,rid);}else{sfx('splash');}
    }else{const [tp,w]=cpuW[ci++%cpuW.length];clr();tb.setT('TEMA: '+tp.toUpperCase()+' · DIBUJA LA CPU',t.tm.c);hostSay('Dibuja un miembro de la familia y los demás adivinan…');
     g.strokeStyle=t.k=='na'?'#c86400':'#0b3fb0';const sc=BH/100*.92,ox=(BW-100*sc)/2,oy=BH*.04;g.save();g.translate(ox,oy);g.scale(sc,sc);g.lineWidth=7/sc;
     const pr=F10D.icons[w];let broke=false;for(const p of pr){if(st.t<=0){broke=true;break;}const d=Math.max(.35,Math.min(.9,4.2/pr.length));await tween(d,(e)=>{strokePrim(g,p,e);tex.needsUpdate=true;},x=>x);chk(rid);}
     g.restore();if(broke)break;await wait(.8,rid);chk(rid);if(st.t<=0)break;
     if(Math.random()<.62){hits++;sfx('ok');tb.setT('¡ACERTADO! '+w,COL.gr);}else{sfx('error');tb.setT('NO LO ADIVINAN · ERA '+w,COL.rd);}await wait(1.2,rid);}
    chk(rid);}
  }finally{dn=false;V13.draw=false;el.removeEventListener('pointerdown',pd);el.removeEventListener('pointermove',pm);removeEventListener('pointerup',pu);removeEventListener('pointercancel',pu);setActs();say();tex.dispose();}
  return hits;});}
// ===== PRUEBA 5 · ESTO ME SUENA =====
async function pSuena(rid,T){const songs=shuffle(F10D.suena);
 for(const [j,t] of [T.na,T.az].entries())await turnoEq(rid,t,8,1,async st=>{let tot=0;
  const slots=[0,1,2,3,4].map(i=>{const b=bar(Math.min(GW*.8,860),40,GREY,'',{fs:20,al:'l'});b.position.set(0,235-i*46,0);G.add(b);return b;});
  const opts=[0,1,2,3].map(i=>{const b=bar(Math.min(GW*.4,400),52,t.tm.c,'',{fs:26});b.position.set(i%2?GW*.12+210:-GW*.12-210,-45-Math.floor(i/2)*66,0);b.userData.tap=i;G.add(b);return b;});
  for(const [ti,[title,cl]] of half(songs,j,3).entries()){if(st.t<=0&&ti>0)break;
   const dec=shuffle(songs.filter(x=>x[0]!==title).map(x=>x[0])).slice(0,3),o=shuffle([title,...dec]),r=o.indexOf(title);const dis=[0,0,0,0];
   slots.forEach(b=>b.setT('',GREY));opts.forEach((b,i)=>b.setT(o[i].toUpperCase(),t.tm.c));let got=0;
   for(let k=0;k<5&&!got;k++){slots[k].setT(`🎵 PISTA ${k+1}: ${cl[k]}`.toUpperCase(),0x3a4a80);sfx('splash');st.t=8;
    if(t.cpu){await wait(rnd(1.4,2.6),rid);if(Math.random()<[.1,.25,.45,.7,.9][k]){got=5-k;opts[r].setC(COL.gr);}else if(k==4){}}
    else for(;;){const a=await tapWait9(st,rid);chk(rid);if(a<0)break;if(dis[a])continue;if(a===r){got=5-k;opts[a].setC(COL.gr);break;}dis[a]=1;opts[a].setC(COL.rd);sfx('error');break;}
    chk(rid);}
   if(got){sfx('ok');tot+=got;slots[0].setT(`✔ ${title.toUpperCase()} · +${got} s`,COL.gr);}else{sfx('error');opts[r].setC(COL.gr);slots[0].setT(`ERA: ${title.toUpperCase()}`,COL.rd);}
   await wait(1.1,rid);opts.forEach(b=>b.setC(t.tm.c));}
  return tot;},true);}
// ===== PRUEBA 6 · LA RISTRA (compartida; el primer fallo termina la prueba) =====
async function pRistra(rid,T){clearG();const words=shuffle(pick(F10D.ristra).slice());const order=[T.na,T.az];let cur=order[0];setTeam(cur);cut('host');
 const tiles=words.map((w,i)=>{const b=bar(Math.min(GW*.2,200),70,cur.tm.c,w,{fs:30});b.position.set((i%3-1)*Math.min(GW*.22,215),135-Math.floor(i/3)*84,0);b.userData.tap=i;G.add(b);return b;});
 const prompt=bar(Math.min(GW*.8,880),50,cur.tm.c,'',{fs:26});prompt.position.set(0,250,0);const info=bar(Math.min(GW*.6,620),36,GREY,'',{fs:22});info.position.set(0,-262,0);G.add(prompt,info);
 const chain=[];let ti=0,over=false;const st={t:25,on:true};let tmr=null;const mkTm=()=>{if(tmr)G.remove(tmr);tmr=yTimer();tmr.position.set(-GW/2+90,-262,20);G.add(tmr);};mkTm();tmr.set(25);
 anim(dt=>{if(!st.on||rid!==RUN)return false;if(!st.hold){st.t-=dt;tmr.set(Math.max(0,Math.ceil(st.t)));}return true;});
 while(!over&&chain.length<8){const t=order[ti%2];if(t!==cur){cur=t;}await gate(rid,t);setTeam(t);tiles.forEach(b=>b.setC(t.tm.c));prompt.setC(t.tm.c);mkTm();
  const L=chain.length;prompt.setT(`${t.tm.n} · ${L?`REPITE LAS ${L} PALABRAS Y AÑADE UNA`:'ELIGE LA PRIMERA PALABRA'}`.toUpperCase(),t.tm.c);info.setT(L?`ÚLTIMA AÑADIDA: ${words[chain[L-1]]} · ${'●'.repeat(L)}`:'LA RISTRA EMPIEZA AQUÍ',GREY);
  let ok=true;for(let k=0;k<L&&ok;k++){st.t=25;const a=await sel(st,rid,t,chain[k],9,Math.max(.8,.99-.025*L));chk(rid);
   if(a!==chain[k]){ok=false;if(a>=0)tiles[a].setC(COL.rd);tiles[chain[k]].setC(COL.gr);sfx('error');await wait(1.2,rid);}else{sfx('ok');await flash(tiles[a],COL.gr,.25,rid,t.tm.c);}}
  if(!ok){over=true;prompt.setT(`${t.tm.n} SE EQUIVOCA · FIN DE LA RISTRA`,COL.rd);await wait(1.2,rid);break;}
  st.t=25;let a;if(t.cpu){await wait(rnd(1,2),rid);do{a=Math.floor(Math.random()*9);}while(L&&a===chain[L-1]);}else{a=await tapWait9(st,rid);chk(rid);if(a<0){over=true;break;}}
  chain.push(a);sfx('ok');t.sec+=2;t.pr.ristra=(t.pr.ristra||0)+1;await flash(tiles[a],GOLD,.5,rid,t.tm.c);ti++;}
 st.on=false;chk(rid);setActs();sfx('winner');hostSay(over?T10.tiempo:T10.tiempo);
 await rotulo(`NARANJA +${(T.na.pr.ristra||0)*2} s · AZUL +${(T.az.pr.ristra||0)*2} s`,GOLD,rid,2);clearG();}
const PRUEBAS={he:pHe,cruz:pCruz,donde:pDonde,pinta:pPinta,suena:pSuena,ristra:pRistra};
const ALL6=['he','cruz','donde','pinta','suena','ristra'];
// ===== ROSCO · 85 s + segundos · 2 jugadores por familia: A–Ñ y O–Z · por turnos =====
async function rosco10(rid,T){clearG();MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;
 const TT=[T.na,T.az];const mkItems=()=>ORIG.ROS.map(a=>{const x=shuffle(a);return x[0];});
 const items={na:mkItems(),az:mkItems()};
 // mismos huecos para las dos familias pero preguntas distintas cuando hay donde elegir
 const R={};for(const t of TT){R[t.k]={st:Array(25).fill(0),pos:0,tm:85+t.sec,seg:0,said:[0,0],ply:shuffle(t.mem.map((m,i)=>i))};}
 const seg=(k)=>{const r=R[k];const lo=r.seg?14:0,hi=r.seg?24:13;return [lo,hi];};
 const pending=(k,lo,hi)=>{for(let i=lo;i<=hi;i++)if(R[k].st[i]==0)return true;return false;};
 const alive=k=>{const r=R[k];if(r.tm<=0)return false;if(r.seg==0&&!pending(k,0,13))r.seg=1;return pending(k,seg(k)[0],seg(k)[1]);};
 const next=k=>{const r=R[k],[lo,hi]=seg(k),n=hi-lo+1;let p=r.pos;if(p<lo||p>hi)p=lo;for(let q=0;q<n;q++){const i=lo+((p-lo+q)%n);if(r.st[i]==0)return i;}return -1;};
 const cnt=(k,v)=>R[k].st.filter(x=>x==v).length;
 if(window.F16)await F16.vid('rosco',rid);cut('host');await hs(rid,T10.roscoIni);
 hostSay(T10.conNa);await wait(1.7,rid);await clip(rid,secF(85+T.na.sec));hostSay(T10.conAz);await wait(1.7,rid);await clip(rid,secF(85+T.az.sec));
 let cur=T.na.sec>=T.az.sec?T.na:T.az;if(T.na.sec===T.az.sec)cur=T.na;
 await hs(rid,T.na.sec===T.az.sec?T10.empEmp:cur.k=='na'?T10.empNa:T10.empAz);
 setPeople(true);const g=roscoGraf();if(window.F16)F16.rosco(g,T);let nb=null;
 const show=async()=>{const k=cur.k;await gate(rid,cur);setTeam(cur);roscoPerson(cur.tm.i);cut('rosco');g.team(cur.tm.c);R[k].st.forEach((s,i)=>g.state(i,s));g.tm.set(Math.ceil(R[k].tm));g.ac.setT(String(cnt(k,1)));
  if(nb)G.remove(nb);const pl=R[k].seg,who=cur.mem[R[k].ply[pl]];nb=bar(Math.min(GW*.5,480),36,cur.tm.c,`${who} · ${pl?'O→Z':'A→Ñ'} · ${cur.tm.n}`.toUpperCase(),{fs:21});nb.position.set(0,328,0);G.add(nb);if(window.F16){F16.seg(pl);nb.visible=false;}
  await g.fly(1.1);chk(rid);if(!R[k].said[pl]){R[k].said[pl]=1;await hs(rid,pl?T10.j2:T10.j1);}};
 await show();let tl=0;anim(dt=>{if(rid!==RUN||!g.parent)return false;tl+=dt;g.tick(tl);return true;});
 while(alive('na')||alive('az')){chk(rid);const k=cur.k,o=cur.k=='na'?T.az:T.na;
  if(!alive(k)){cur=o;await show();continue;}
  const r=R[k],i=next(k);if(i<0){cur=o;continue;}r.pos=i;g.setAct(i);const [ans,def]=items[k][i],L=LETRAS[i],starts=norm(ans[0]).startsWith(L);
  hostSay(`<b>${starts?'Empieza por':'Contiene la'} ${L}:</b> ${def.charAt(0)+def.slice(1).toLowerCase()}`);
  let res;
  if(!cur.cpu){let pasa=false;setActs([{t:'Pasapalabra',ic:'⟳',cls:'y',cb:()=>{pasa=true;askEnd('');}}]);
   let on=true;anim(dt=>{if(!on||rid!==RUN)return false;r.tm-=dt;g.tm.set(Math.max(0,Math.ceil(r.tm)));return true;});
   const v=await ask(()=>r.tm<=0||rid!==RUN);on=false;setActs();chk(rid);
   res=v===null?'time':pasa||!norm(v)?'pasa':ans.some(a=>norm(a)===norm(v))?'ok':'ko';}
  else{const d=rnd(1.3,2.4);await tween(d,()=>{},x=>x);r.tm-=d;g.tm.set(Math.max(0,Math.ceil(r.tm)));chk(rid);const q=Math.random();res=r.tm<=0?'time':q<.72?'ok':q<.82?'pasa':'ko';
   say(res=='pasa'?'<b>«¡Pasapalabra!»</b>':`${esc(cur.name)} responde: <b>${res=='ok'?ans[0]:'…'}</b>`);await wait(.6,rid);}
  if(res=='ok'){if(!cur.cpu)V5.doReact(1);r.st[i]=1;g.state(i,1);sfx('ok');g.ac.setT(String(cnt(k,1)));r.pos=i+1;continue;}
  if(res=='ko'){r.st[i]=2;g.state(i,2);sfx('error');say(`La respuesta correcta: <b>${ans[0]}</b>`);await wait(1.6,rid);}
  if(res=='pasa'){sfx('splash');r.pos=i+1;}
  g.setAct(-1);if(alive(o.k)){cur=o;await show();chk(rid);}else if(res=='pasa'||res=='ko'){continue;}}
 say();setActs();g.setAct(-1);
 T.na.hits=cnt('na',1);T.na.miss=cnt('na',2);T.az.hits=cnt('az',1);T.az.miss=cnt('az',2);
 if(window.F16)await F16.roscoEnd(rid,R,T);return g;}
// ===== resultados =====
async function results10(rid,T,g){const s=S();
 hostSay(T10.fin);await wait(1.4,rid);
 hostSay(T10.hitsNa);await wait(1.7,rid);await clip(rid,`p10/h${T.na.hits}.ogg`);hostSay(T10.hitsAz);await wait(1.7,rid);await clip(rid,`p10/h${T.az.hits}.ogg`);
 const r=resolve10(T.na.hits,T.na.miss,T.az.hits,T.az.miss,s.bote);
 if(window.LM11)for(const k of r.full)if(!T[k]._c&&(r.bote[k]||0)>0)LM11.fama({n:T[k].name,b:r.bote[k],t:'bote'});
 if(T.na.hits===T.az.hits&&T.na.miss!==T.az.miss){await hs(rid,T10.empFal);}
 say(`<b>Naranja: ${T.na.hits} aciertos, ${T.na.miss} fallos — Azul: ${T.az.hits} aciertos, ${T.az.miss} fallos</b>`);await wait(1.2,rid);
 if(g)g.parent&&G.remove(g);clearG();setPeople(false);cut('front');
 const fx=(c)=>{try{FX5.conf(c,5);}catch(e){}sfx('aplauso');};
 if(r.full.length){
  if(r.full.length==2){await hs(rid,T10.boteDos);fx(['#ffd23a','#fa8804','#1269f4']);await moneyBig(rid,r.bote.na,2);}
  else{const k=r.full[0];await hs(rid,k=='na'?T10.boteNa:T10.boteAz);fx(k=='na'?['#fa8804','#ffd23a','#fff']:['#1269f4','#ffd23a','#fff']);await moneyBig(rid,r.bote[k],2.4);}
  await hs(rid,T10.baja);}
 else if(r.w){await hs(rid,r.w=='na'?T10.gNa:T10.gAz);fx(r.w=='na'?['#fa8804','#ffd23a','#fff']:['#1269f4','#ffd23a','#fff']);await hs(rid,T10.g12);
  await hs(rid,T10.sube);await moneyBig(rid,r.boteNext,2);}
 else{await hs(rid,T10.empTot);fx(['#ffd23a','#fa8804','#1269f4']);await hs(rid,T10.sube);await moneyBig(rid,r.boteNext,2);}
 // memoria del programa
 const me=T.na._c===false&&s.mode=='cpu'?T.na:T.az._c===false&&s.mode=='cpu'?T.az:null;
 s.n++;s.bote=r.boteNext;s.jug++;
 if(s.mode=='cpu'){const mk=me.k;const won=r.returns.includes(mk)&&!r.tie;
  if(me){s.ganado+=(r.prize[mk]||0)+(r.bote[mk]||0);if(won)s.wins++;}
  if(!r.tie){const wk=r.w;const winnerIsMe=wk==mk;s.or=winnerIsMe?'me':'cpu';if(winnerIsMe)s.c++;}}
 else if(!r.tie)s.or=r.w=='na'?s.or:(s.or=='A'?'B':'A');
 saveOpt();
 await hs(rid,T10.adios);if(window.F16)await F16.vid('desp',rid);}
// ===== presentación =====
async function famPres(rid,T,k){const t=T[k],tm=t.tm;cut(tm.shot);await hs(rid,k=='na'?T10.naranja:T10.azul);cut(k=='na'?'team_o':'team_b');const nb=nameBar(t);
 if(t._c&&t.line)await hs(rid,t.line);else{hostSay(`La familia ${esc(t.name.replace(/^Familia /,''))}: ${t.mem.slice(0,2).map(esc).join(', ')} y ${esc(t.mem[2])}.`);await wait(3,rid);}
 if(S().mode=='cpu'&&!t._c)await hs(rid,k=='na'?T10.meNa:T10.meAz);G.remove(nb);}
async function explain10(rid,full){let skip=false;setActs([{t:'Saltar explicación',ic:'⏭',cb:()=>{skip=true;}}]);cut('host');
 const L=full?['e1','e2','e3','e5','e6','e7','e8','e9','e10','e11','e12','e13']:['recuerdo'];
 for(const k of L){if(skip)break;hostSay(T10[k]);const c=VOZ5[T10[k]];let t=0;const need=(c?c[1]+.4:3);while(t<need&&!skip){await wait(.2,rid);t+=.2;}chk(rid);}
 setActs();say();}
async function intro10(rid,T){const s=S();FX5.banner('PASAPALABRA EN FAMILIA');await (window.F16?F16.cab(rid,cabecera):cabecera(rid));chk(rid);cut('host');await hs(rid,T10.hola);
 say(`<b>Programa número ${s.n}</b>`);if(s.n<=400)await clip(rid,`bote/pg${s.n}.ogg`);
 await hs(rid,T10.dos);
 await famPres(rid,T,'na');await famPres(rid,T,'az');
 if(s.mode=='two')await hs(rid,T10.dosHum);
 cut('wide');hostSay(T10.bote);await wait(1.4,rid);await moneyBig(rid,s.bote,1.2);
 await explain10(rid,s.n===1||s.how);s.how=0;
 say('<i>Las frases, definiciones, dibujos y canciones de las pruebas son contenido inventado para este juego.</i>');await wait(2.4,rid);say();}
function pickPruebas(){const s=S();return s.pr>=6?ALL6.slice():shuffle(ALL6).slice(0,3);}
async function programa10(rid){try{if(window.NS11)await NS11.empieza(true);}catch(e){console.error(e);}try{return await programa10i(rid);}finally{if(window.NS11)NS11.termina();}}
async function programa10i(rid){const s=S();const T=mkTeams();colSave();let g=null;if(window.F16)F16.start(T);
 try{await intro10(rid,T);
  const ps=pickPruebas();const ORD=['ord1','ord2','ord3','ord4','ord5','ord6'];
  for(const [i,id] of ps.entries()){cut('host');await hs(rid,T10[ORD[ps.length>=6||i<2||ps.length>3?i:i]]);await hs(rid,T10[id],.2);const s0f=[T.az.sec,T.na.sec];if(window.F16)await F16.prueba(id,rid);await PRUEBAS[id](rid,T);chk(rid);if(window.NS11)NS11.famPr(T,s0f,i,ps.length);}
  if(window.NS11)NS11.fam(T);colRest();cut('host');
  hostSay(T10.sumaNa);await wait(1.7,rid);await clip(rid,secF(T.na.sec));hostSay(T10.sumaAz);await wait(1.7,rid);await clip(rid,secF(T.az.sec));
  say(`<b>Segundos para el rosco — Naranja: ${T.na.sec} s — Azul: ${T.az.sec} s</b>`);await wait(1.6,rid);
  g=await rosco10(rid,T);colRest();await results10(rid,T,g);
  FX5.off();clearG();say();setActs();stopMusic();showMenu('fam10');
 }catch(e){if(!(e instanceof Stop))console.error(e);}finally{colRest();if(window.F16)F16.end();}}
function scene10(fn){const rid=++RUN;MODE.menu=false;menu.classList.add('hidden');$('#ver').classList.add('hidden');document.body.classList.add('ingame');
 const sk=$('#skip');sk.textContent='Menú ☰';sk.classList.remove('hidden');sk.onpointerdown=e=>{e.preventDefault();V5.stop();FX5.off();colRest();showMenu('fam10');};
 setPeople(false);P.host.visible=true;MOSCA.visible=true;clearG();setActs();GAME.sec=[0,0];GAME.ac=[0,0];GAME.res=null;V5.onTurn=null;V5.rivalN=null;V5.noBote=false;V5.cpuP=.7;
 return fn(rid);}
function play10(){return scene10(programa10);}
function how10(){return scene10(async rid=>{try{FX5.banner('PASAPALABRA EN FAMILIA');cut('host');await hs(rid,T10.hola);await explain10(rid,true);FX5.off();showMenu('fam10');}catch(e){if(!(e instanceof Stop))console.error(e);}});}
// ===== menús =====
const mb=(go,ic,t,sub)=>mb9(go,ic,t,sub);
SCR9.fam10=()=>{const s=S(),T=mkTeams();const cpu=s.mode=='cpu';
 return `<h2>👨‍👩‍👦 Pasapalabra en familia</h2><div class="mtext">Dos familias de <b>tres</b>: <b style="color:#fa8804">naranja</b> (ganó el programa anterior) y <b style="color:#4a8dff">azul</b> (la que entra). Pruebas para ganar <b>segundos</b> y rosco final de 25 palabras con 85 s + segundos: un jugador de cada familia juega de la <b>A a la Ñ</b> y otro de la <b>O a la Z</b>, por turnos. Gana quien más acierta: 1.200 € y vuelve. Si acierta las 25, se lleva el <b>bote</b> (+6.000 € cada programa que nadie lo gana).<br><b>Programa nº ${s.n} · bote ${eur(s.bote)}</b><br><i>Contenido de las pruebas inventado.</i></div>`
 +mb('f10:play','▶',`Jugar el programa nº ${s.n}`,cpu?`${esc(T.na.name)} (naranja) contra ${esc(T.az.name)} (azul)`:'Dos familias, un solo móvil')
 +mb('f10:how','📖','Cómo se juega','Christian lo cuenta con sus palabras')
 +mb('f10:mode','👥',cpu?'Modo: mi familia contra la CPU':'Modo: dos familias, pasaos el móvil','Toca para cambiar')
 +mb('f10:pr','🧩',s.pr>=6?'Pruebas: las 6':'Pruebas: 3 al azar de las 6','He dicho, Palabras cruzadas, ¿Dónde están?, ¿Tú qué pintas?, Esto me suena y La ristra')
 +(cpu?mb('fam10n','✏️','Nombres de tu familia',esc((T.na._c?T.az:T.na).name+': '+(T.na._c?T.az:T.na).mem.join(', '))):'')
 +(s.jug?`<div class="mtext">Programas jugados: ${s.jug} · victorias: ${s.wins} · ganado: ${eur(s.ganado)}</div>`:'')
 +mb('f10:reset','🔄','Empezar de cero',s.rs?'Toca otra vez para confirmar':'Programa 1 y bote de 6.000 €')+back9('esp');};
SCR9.fam10n=()=>{const s=S();const inp=(i,v,ph)=>`<input class="n10" data-i="${i}" maxlength="18" value="${esc(v)}" placeholder="${ph}" style="width:100%;box-sizing:border-box;margin:5px 0;padding:11px 14px;border-radius:14px;border:3px solid #2f6cff;font:900 20px N,Arial,sans-serif;background:#fff;color:#0b1a55">`;
 return `<h2>✏️ Tu familia</h2><div class="mtext">Escribe el apellido de tu familia y el nombre de sus tres miembros. En el rosco, dos de los tres juegan: uno de la A a la Ñ y otro de la O a la Z (los elige el sorteo).</div>${inp(-1,s.famN,'Apellido de la familia')}${inp(0,s.mem[0],'Miembro 1')}${inp(1,s.mem[1],'Miembro 2')}${inp(2,s.mem[2],'Miembro 3')}${back9('fam10')}`;};
{const _sm=showMenu;showMenu=function(s='main'){
  if(typeof s=='string'&&s.startsWith('f10:')){const a=s.slice(4),st=S();
   if(a=='play')return play10();if(a=='how')return how10();
   if(a=='mode'){st.mode=st.mode=='cpu'?'two':'cpu';st.or=st.mode=='cpu'?'me':'A';st.rs=0;saveOpt();}
   if(a=='pr'){st.pr=st.pr>=6?3:6;saveOpt();}
   if(a=='reset'){if(st.rs){OPT.fam10=null;S();saveOpt();}else st.rs=1;}
   return showMenu('fam10');}
  if(s!='fam10'&&OPT.fam10&&OPT.fam10.rs)OPT.fam10.rs=0;
  const r=_sm(s);
  if(s=='main'){const col=menu.querySelector('.col');if(col&&!col.querySelector('[data-go=fam10]')){const a=col.querySelector('[data-go=esp]')||col.querySelector('[data-go=mejor]')||col.querySelector('[data-go=opt]');
    if(a){a.insertAdjacentHTML('beforebegin',mb('fam10','👨‍👩‍👦','Pasapalabra en familia','Dos familias de tres · pruebas de segundos · rosco A–Ñ / O–Z · bote'));bind9(col,['fam10']);try{NAV.attach(s);}catch(e){}}}}
  if(s=='tema'){const col=menu.querySelector('.col');if(col&&!col.querySelector('[data-go=fam10]')){col.insertAdjacentHTML('beforeend',mb('fam10','👨‍👩‍👦','Pasapalabra en familia','Programa temático con juego propio: dos familias de tres'));bind9(col,['fam10']);try{NAV.attach(s);}catch(e){}}}
  if(s=='fam10n'){menu.querySelectorAll('input.n10').forEach(i=>{i.addEventListener('keydown',e=>e.stopPropagation());i.addEventListener('keyup',e=>e.stopPropagation());
    i.oninput=()=>{const st=S(),k=+i.dataset.i;if(k<0)st.famN=i.value;else st.mem[k]=i.value;saveOpt();};});}
  return r;};}
{const _e=especial;especial=function(id){if(id=='familia')return showMenu('fam10');return _e.apply(this,arguments);};}
try{L5.ESP.familia.sub='Juego propio: dos familias de tres, pruebas de segundos, rosco A–Ñ / O–Z y bote';}catch(e){}
$('#ver').textContent='v0.11';
window.F10={S,mkTeams,resolve10,play:play10,how:how10,programa:programa10,rosco:rosco10,pruebas:PRUEBAS,pickPruebas,eur,secF,monF};
}
