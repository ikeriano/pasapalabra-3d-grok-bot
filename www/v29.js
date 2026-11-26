'use strict';
// ===== v0.29 · arreglos de Pasapalabra (vídeos de Iker) + pruebas de los vídeos jugables =====
//  · Cortinillas: La Palabra Imposible con el ARO METÁLICO rojo que gira (prueba17) · Antes y Después con la LÍNEA ROJA de abajo (prueba08).
//  · Antes y Después: reloj AZUL para el equipo azul.
//  · Chapas (nombre en el pecho) del color del equipo: si juegas con el naranja, tu equipo lleva chapas naranjas.
//  · Coco Loco: si juegas con el naranja, tu turno sale NARANJA.
//  · El Pulsador y De Par en Par actualizados con los vídeos (prueba11 y el vídeo de Iker).
//  · Del tirón, He dicho, Con nueve basta, ¿Cómo se dice?, En pocas palabras, ¿Tú qué pintas? y Letra a letra: JUGABLES.
(()=>{
const INV='🆕 INVENTADO';
const HO=()=>OPT.eq25==1;// el jugador humano juega con el equipo naranja
const hcol=()=>HO()?COL.or:COL.bl, ocol=()=>HO()?COL.bl:COL.or;
const hcss=()=>HO()?['#ffb24a','#df5a06']:['#6ab4ff','#1a4fd0'];
const nrm=s=>String(s||'').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-Z0-9]/g,'');
// ---------- chapas del color del equipo ----------
function badges29(){try{const sw=false;const B=0x2a6af0,O=0xf07a1a;[P.ply,P.ply2,P.ply3].forEach(p=>{const m=p&&p.mats&&p.mats.badge;if(m)m.color.setHex(sw?O:B);});
 [P.cpu,P.cpu2,P.cpu3].forEach(p=>{const m=p&&p.mats&&p.mats.badge;if(m)m.color.setHex(sw?B:O);});if(P.rosc&&P.rosc.mats&&P.rosc.mats.badge)P.rosc.mats.badge.color.setHex(sw?O:B);}catch(e){console.error(e);}}
window.badges29=badges29;
// (v0.29: las chapas van por lado del plató: lado azul = chapa azul, lado naranja = chapa naranja; ver SIDE29)
// ---------- reloj redondo del color del equipo ----------
// (label().set redibuja; guardamos la original)
function clock29(cs){const S={v:''};const L=label(116,116,(c,cw,ch,k)=>{const r=cw/2;const gr=c.createRadialGradient(r*.75,r*.65,r*.1,r,r,r);gr.addColorStop(0,cs[0]);gr.addColorStop(1,cs[1]);
  c.fillStyle='#fff';c.beginPath();c.arc(r,r,r*.97,0,7);c.fill();c.fillStyle=gr;c.beginPath();c.arc(r,r,r*.86,0,7);c.fill();ftxt(c,String(S.v??''),r,r+4*k,r*.82,'#fff','center',cw*.8,0);});
 const redraw=L.set;L.set=v=>{if(v===S.v)return;S.v=v;redraw();};return L;}
// ---------- cortinillas ----------
// arte genérico para cortinillas que no tenían (antes daba error y salía sin cortinilla)
function artGen29(AW){const c=CORT[artGen29.id]||{};const s=(c.title||['PASAPALABRA']).join('').toUpperCase().replace(/[^A-ZÑÁÉÍÓÚ]/g,'')||'PASAPALABRA';const it=[];
 for(let i=0;i<46;i++)it.push({ch:s[i%s.length],base:new T.Vector3(rnd(-AW*.55,AW*.55),rnd(-330,330),rnd(-120,40)),p:new T.Vector3(),s:rnd(24,70),r:rnd(-.6,.6),c:0xffffff,v:rnd(30,90)});
 const art=letterCloud(it,{op:.55});art.anim=t=>{art.items.forEach(x=>{x.p.set(x.base.x,((x.base.y+t*x.v+330)%660)-330,x.base.z);});art.upd();};return art;}
['antes','tiron','hedicho','nueve','comosedice','pocas','pintas','una2','antes12','piramide'].forEach(k=>{if(CORT[k]&&!CORT[k].mk)CORT[k].mk=(AW,b)=>{artGen29.id=k;return artGen29(AW,b);};});
{const _mc=makeCort;makeCort=function(id,blue){const o=_mc.apply(this,arguments);if(blue||!(id=='imposible'||id=='antes'))return o;
 try{const bg=o.g.children[0],inner=o.g.children[1];
  if(id=='imposible'){// aro rojo grueso con canto metálico que entra girando (vídeo prueba17)
   bg.ring.geometry.dispose();bg.ring.geometry=new T.TorusGeometry(1,.12,18,96);bg.ring.material=new T.MeshPhongMaterial({color:0x8c0612,specular:0xffe0e0,shininess:160,emissive:0x220003});
   bg.ring2.geometry.dispose();bg.ring2.geometry=new T.TorusGeometry(1.0,.022,10,96);bg.ring2.material=new T.MeshPhongMaterial({color:0xd8dce6,specular:0xffffff,shininess:220,emissive:0x303038});
   const rim=new T.Mesh(new T.TorusGeometry(1.22,.024,10,96),bg.ring2.material);bg.ring.add(rim);
   const st=o.setT;o.setT=t=>{st(t);const inE=.9,ex=3.8;let ry=0,rx=0;if(t<inE){const k=t/inE;ry=.95*(1-k);rx=.35*(1-k);}else if(t>ex){const k=Math.min(1,(t-ex)/2);rx=.55*k;ry=-.25*k;}
    bg.ring.rotation.x=bg.ring2.rotation.x=rx;bg.ring.rotation.y=bg.ring2.rotation.y=ry;bg.ring2.scale.copy(bg.ring.scale).multiplyScalar(.885);};}
  if(id=='antes'){// línea roja/rosa en diagonal abajo con «antes y después» en letra pequeña (vídeo prueba08)
   const W=GW+40,H=720;let off=0;const L=label(W,H,(c,cw,ch,k)=>{const y0=ch*.88,y1=ch*.62;c.save();c.shadowColor='rgba(255,90,110,.95)';c.shadowBlur=14*k;c.strokeStyle='rgba(255,170,180,.95)';c.lineWidth=3*k;
     c.beginPath();c.moveTo(0,y0);c.quadraticCurveTo(cw*.5,ch*.78,cw,y1);c.stroke();c.restore();c.fillStyle='rgba(255,200,205,.85)';c.font=`600 ${15*k}px N,Arial`;
     const txt='antes y después   ';for(let i=0;i<40;i++){const u=((i*.07+off)%1+1)%1;const x=u*cw*1.05-cw*.025;const tt=x/cw;const y=(1-tt)*(1-tt)*y0+2*(1-tt)*tt*ch*.78+tt*tt*y1;const a=Math.atan2((y1-y0)*.9,cw);
      c.save();c.translate(x,y+14*k);c.rotate(a);c.fillText(txt,0,0);c.restore();}});
   L.position.set(0,0,60);inner.add(L);const st=o.setT;let last=-1;o.setT=t=>{st(t);L.material.opacity=Math.min(1,Math.max(0,(t-.9)/.5));const f=Math.floor(t*12);if(f!==last){last=f;off=-t*.06;L.set();}};}
 }catch(e){console.error(e);}return o;};}
if(CORT.imposible)CORT.imposible.title=['La Palabra','imposible'];
// ---------- Antes y Después: reloj azul del equipo azul ----------
// Antes y Después y La Palabra Imposible: si Iker juega con el naranja, se ve a los concursantes naranjas (lado naranja del plató, chapas naranjas) y el reloj de su color
let SIDE29=0;{const _cut=cut;cut=function(n){if(SIDE29&&OPT.eq25==1&&n=='blue')n='orange';return _cut.call(this,n);};}
for(const y in ETAPAS){const E=ETAPAS[y];E.pr=E.pr.map(([k,f])=>{if(!(k=='antes'||k=='imposible')||f.r29)return [k,f];const nf=async function(){const old=window.TIMERC9;window.TIMERC9=hcss();SIDE29++;try{return await f.apply(this,arguments);}finally{SIDE29--;window.TIMERC9=old;}};nf.r29=1;return [k,nf];});}
// ---------- Coco Loco: el turno sale con el color del equipo de cada uno ----------
bigNum6=function(){const g=new T.Group();const L=label(150,120,(c,cw,ch,k)=>{const s=String(g.v??'');c.font=`900 ${ch*.92}px N,Arial`;c.textAlign='center';c.textBaseline='middle';const b=!!g.bl;
  for(let i=7;i>0;i--){c.fillStyle=b?'#0a2a8a':'#a8460a';c.fillText(s,cw/2+i*1.1*k,ch/2+i*1.3*k);}const gr=c.createLinearGradient(0,ch*.1,0,ch*.9);if(b){gr.addColorStop(0,'#cfe6ff');gr.addColorStop(.5,'#4a9aff');gr.addColorStop(1,'#1a56e0');}else{gr.addColorStop(0,'#ffe08a');gr.addColorStop(.5,'#ffa21a');gr.addColorStop(1,'#e86a08');}c.fillStyle=gr;c.fillText(s,cw/2,ch/2);});
 g.add(L);g.set=v=>{if(v===g.v)return;g.v=v;L.set();};return g;};// v0.29: reloj de Coco Loco azul o naranja según el equipo que tiene el turno
try{let s=cocoLoco.toString();const C="(OPT.eq25==1?(t==1):(t==0))";
 s=s.replace("(OPT.eq25==1?1:0);","0;").replace("cut(t?'orange':'blue');team.setT(t?'NARANJA':'AZUL',t?COL.or:COL.bl);try{b.setC(t?COL.or:COL.bl);}catch(_){}",
  `cut(${C}?'blue':'orange');team.setT(${C}?'AZUL':'NARANJA',${C}?COL.bl:COL.or);try{b.setC(${C}?COL.bl:COL.or);}catch(_){}num.bl=${C};num.v=null;`)
  .replace("Empieza el equipo <b>${turn?'naranja':'azul'}</b>","Empieza el equipo <b>${(OPT.eq25==1)!=(turn==1)?'naranja':'azul'}</b>");
 if(s.includes("?'AZUL':'NARANJA'")){const nf=(0,eval)('('+s+')');for(const y in ETAPAS)ETAPAS[y].pr.forEach(p=>{if(p[0]=='coco')p[1]=nf;});window.cocoLoco29=nf;}else console.warn('coco29: patrón no encontrado');}catch(e){console.error('coco29',e);}
// ---------- EL PULSADOR (prueba11, Telecinco 2007-2009) ----------
// Pantalla partida: marco naranja a la izquierda y azul a la derecha, barra morada con el TEMA y luego cada pregunta;
// marcadores en las esquinas de abajo con la tira amarilla de tiempo de respuesta que se vacía en el lado que pulsa. Dos temas (10 preguntas).
async function pulsador29(rid){clearG();const sets=shuffle(ORIG.PUL.slice()).slice(0,2);const qs=[];sets.forEach(s=>shuffle(s[1].slice()).forEach(q=>qs.push([q[0],q[1],s[0]])));
 const hs=HO()?0:1;const sc=[0,0];// lado 0 = naranja (izquierda), 1 = azul (derecha)
 cut('host');hostSay(`<b>El Pulsador</b>: dos temas, ${qs.length} preguntas. Pulsa antes que tu rival y acierta. Si fallas, rebota al otro equipo.`);await wait(3.2,rid);
 P.ply.pul.visible=P.cpu.pul.visible=true;MODE.split=true;
 const mkFrame=(x0,col)=>{const w=GW/2-14,h=700;const g=new T.Group();const th=10;[[0,h/2-th/2,w,th],[0,-h/2+th/2,w,th],[-w/2+th/2,0,th,h],[w/2-th/2,0,th,h]].forEach(([x,y,ww,hh])=>{const m=new T.Mesh(ext(rrShape(ww,hh,2),6,2),MP(col,70));m.position.set(x,y,0);g.add(m);});g.position.set(x0,0,0);G.add(g);return g;};
 mkFrame(-GW/4,COL.or);mkFrame(GW/4,COL.bl);
 const qb=bar(GW*.6,74,COL.pu,'',{fs:26});qb.position.set(0,-286,30);G.add(qb);qb.hl=(c,cw,ch,k)=>{wrap(c,qb.q||'',cw/2,ch/2,cw-30*k,24*k);};
 const sb=[bar(56,42,COL.or,'0',{fs:30}),bar(56,42,COL.bl,'0',{fs:30})];sb[0].position.set(-GW*.31-40,-268,30);sb[1].position.set(GW*.31+40,-268,30);G.add(...sb);
 const strip=[bar(56,12,0xf2d21a,''),bar(56,12,0xf2d21a,'')];strip[0].position.set(-GW*.31-40,-300,30);strip[1].position.set(GW*.31+40,-300,30);strip.forEach(s=>{s.visible=false;G.add(s);});
 const drain=(side,secs,stop)=>{const s=strip[side];s.visible=true;let t=0;anim(dt=>{t+=dt;s.scale.x=Math.max(.02,1-t/secs);if(t>=secs||stop()||rid!==RUN){s.visible=false;s.scale.x=1;return false;}return true;});};
 const pp=side=>side==hs?P.ply:P.cpu;const flash=(p,c)=>{p.pul.children.forEach(m=>{m.material.emissive=new T.Color(c);});setTimeout(()=>p.pul.children.forEach(m=>m.material.emissive=new T.Color(0)),900);};
 const showQ=async s=>{qb.q=s;qb.L.set();qb.scale.y=.01;await tween(.3,e=>qb.scale.y=e,eback);};
 let topic=null;
 for(let qi=0;qi<qs.length;qi++){const [q,a,tp]=qs[qi];if(tp!==topic){topic=tp;await showQ('TEMA: '+tp);hostSay(`Tema: <b>${tp}</b>`);await wait(2,rid);}
  await showQ(q.toUpperCase());hostSay(q);
  let who=-1;const cpuAt=rnd(2.6,6.5);let tt=0;TAP=()=>{if(who<0)who=hs;};setActs([{t:'¡PULSAR!',ic:'●',cls:'y',cb:()=>{if(who<0)who=hs;}}]);
  await new Promise(r=>anim(dt=>{if(rid!==RUN){r();return false;}tt+=dt;if(who<0&&tt>cpuAt)who=1-hs;if(who>=0||tt>9){r();return false;}return true;}));chk(rid);setActs();TAP=null;
  const solve=async(side,reb)=>{flash(pp(side),side?0x2a6af0:0xf07a1a);sfx('ok');let fin=false;
   if(side==hs){say('<b>¡Has pulsado tú!</b> Escribe la respuesta.');drain(side,10,()=>fin);let tl=10;const v=await ask(()=>(tl-=.016)<=0||rid!==RUN);fin=true;chk(rid);return v!==null&&norm(v)===norm(a);}
   say(`<b>Pulsa el equipo ${side?'azul':'naranja'}…</b>`);drain(side,1.6,()=>fin);await wait(1.5,rid);fin=true;const ok=Math.random()<(reb?.5:.66);say(`Responde: <b>${ok?a.toUpperCase():pick(qs.filter(x=>x[1]!==a))[1].toUpperCase()}</b>`);await wait(1.2,rid);return ok;};
  if(who<0){say(`La respuesta era <b>${a.toUpperCase()}</b>.`);sfx('error');await wait(1.6,rid);continue;}
  let ok=await solve(who,false);if(ok){sc[who]++;sb[who].setT(String(sc[who]));sfx('ok');say(`¡<b>${a.toUpperCase()}</b>! Punto para el equipo ${who?'azul':'naranja'}.`);await wait(1.5,rid);continue;}
  sfx('error');const o=1-who;say('¡Rebote para el otro equipo!');await wait(1,rid);ok=await solve(o,true);if(ok){sc[o]++;sb[o].setT(String(sc[o]));sfx('ok');}say(`La respuesta: <b>${a.toUpperCase()}</b>.`);await wait(1.5,rid);}
 MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;say();clearG();GAME.sec[0]+=sc[hs]*5;GAME.sec[1]+=sc[1-hs]*5;GAME.ac[0]+=sc[hs];sfx('winner');
 cut('wide');await rotulo(`NARANJA ${sc[0]} · AZUL ${sc[1]}`,COL.pu,rid);}
// ---------- DE PAR EN PAR (vídeo de Iker, Telecinco 2007-2009) ----------
// 9 nombres en columna (azul: a la derecha · naranja: a la izquierda). Abajo: reloj redondo del equipo, barra con el dato y contador de segundos ganados.
// Acierto: la barra se pone VERDE y se queda vacía y corta. Fallo o «Pasapalabra»: juega el compañero. 60 s. +2 s por pareja (lo que marca el contador del vídeo).
async function depar29(rid){prep();const set=pick(ORIG.PAR),items=set[1],names=shuffle(items.map(x=>x[0])),queue=shuffle(items.slice());const bl=!HO(),hc=hcol();
 const pl=['Jugador 1','Jugador 2','Jugador 3'];let who=0,t=60,ac=0;
 cut('host');hostSay(`<b>De Par en Par</b>: <b>${set[0]}</b>. Te leo un dato y tocas el nombre que forma pareja. Si fallas o pasas, juega tu compañero. ¡60 segundos!`);await wait(3.5,rid);cut(bl?'blue':'orange');
 const X=bl?GW/2-200:-GW/2+200,bw=300;const bars=names.map((n,i)=>{const b=bar(bw,32,hc,n.toUpperCase(),{fs:19,r:2});b.position.set(X,250-i*42,0);b.userData.tap=i;G.add(b);return b;});
 bars.forEach((b,i)=>{const x0=b.position.x;b.position.x+=bl?600:-600;tween(.5+i*.05,e=>b.position.x=x0+(bl?600:-600)*(1-e),eout);});
 const cw=Math.min(GW*.5,560);const clue=bar(cw,44,hc,'',{fs:22});clue.position.set(bl?40:-40,-285,0);
 const cnt=bar(60,44,hc,'0',{fs:28});cnt.position.set(bl?40+cw/2+52:-40-cw/2-52,-285,0);
 const tm=clock29(hcss());tm.position.set(bl?40-cw/2-70:-40+cw/2+70,-285,20);tm.set(t);G.add(clue,cnt,tm);
 let run=true;anim(dt=>{if(!run||rid!==RUN)return false;t-=dt;tm.set(Math.max(0,Math.ceil(t)));return true;});
 const done=new Set();let pass=false;setActs([{t:'Pasapalabra',ic:'➜',cb:()=>{pass=true;}}]);
 while(t>0&&queue.length){const [n,c]=queue[0];clue.setT(c.toUpperCase());hostSay(`<b>${pl[who]}</b> · ${c}`);pass=false;
  const pi=await new Promise(r=>{TAP=i=>{if(typeof i=='number'&&!done.has(i))r(i);};anim(()=>{if(t<=0||rid!==RUN){r(-1);return false;}if(pass){r(-2);return false;}return TAP!==null;});});TAP=null;chk(rid);if(pi==-1)break;
  if(pi==-2){queue.push(queue.shift());sfx('error');who=(who+1)%3;say(`Pasapalabra: juega <b>${pl[who]}</b>`);continue;}
  const ok=names[pi]===n,b=bars[pi];if(ok){sfx('ok');b.setC(COL.gr);ac++;cnt.setT(String(ac*2));done.add(pi);queue.shift();await wait(.55,rid);b.setT('',hc);const x0=b.position.x;tween(.25,e=>{b.scale.x=1-.55*e;b.position.x=x0+(bl?1:-1)*bw*.275*e;});}
  else{sfx('error');b.setC(COL.rd);await wait(.45,rid);b.setC(hc);queue.push(queue.shift());who=(who+1)%3;say(`¡No! Juega <b>${pl[who]}</b>`);}}
 run=false;TAP=null;setActs();chk(rid);sfx('winner');GAME.sec[0]+=ac*2;GAME.ac[0]+=ac;await rotulo(`${bl?'AZUL':'NARANJA'}: ${ac} PAREJAS · +${ac*2} s`,hc,rid);clearG();
 const c=await cpuTurn('Rival',ocol(),.6,rid);GAME.sec[1]+=c*2;await rotulo(`${bl?'NARANJA':'AZUL'}: ${c} PAREJAS · +${c*2} s`,ocol(),rid);clearG();}
{const E=ETAPAS[2007];if(E)E.pr=E.pr.map(([k,f])=>k=='pulsador'?[k,pulsador29]:k=='depar'?[k,depar29]:[k,f]);}

// ================= PRUEBAS DE LOS VÍDEOS, AHORA JUGABLES =================
const POOL=()=>{const o=[];Object.values(ORIG.ROS).forEach(L=>L.forEach(x=>{const w=x[0][0];if(w&&w.length>=3&&w.length<=11&&!/ /.test(w))o.push([w,x[1]]);}));return o;};let PL=null;const pool=()=>PL||(PL=POOL());
const pl3=['Jugador 1','Jugador 2','Jugador 3'];
function hud(secs,o={}){const hc=hcol();const tm=clock29(hcss());tm.position.set(o.tx??(-GW/2+110),o.ty??-280,20);tm.set(secs);G.add(tm);const st={t:secs,on:true};anim(dt=>{if(!st.on)return false;st.t-=dt;tm.set(Math.max(0,Math.ceil(st.t)));return st.t>0;});st.tm=tm;return st;}
function qbar(w,y,col){const b=bar(w,56,col??hcol(),'',{fs:22});b.position.set(0,y??-280,10);b.hl=(c,cw,ch,k)=>{if(b.q)wrap(c,b.q,cw/2,ch/2,cw-30*k,21*k);};b.Q=s=>{b.q=s;b.txt='';b.L.set();};G.add(b);return b;}
function column(n,x,y0,w,col,dy=40){return [...Array(n)].map((_,i)=>{const b=bar(w,30,col,'',{fs:18,r:2});b.position.set(x,y0+i*dy,0);G.add(b);return b;});}
async function endSolo(rid,ac,secs,name){say();setActs();TAP=null;chk(rid);sfx('winner');GAME.sec[0]+=secs;GAME.ac[0]+=ac;clearG();await rotulo(`${name}: ${ac} ACIERTOS · +${secs} s`,hcol(),rid);clearG();}
// ask con «Pasapalabra»
async function askP(stop){let p=false;setActs([{t:'Pasapalabra',ic:'➜',cb:()=>{p=true;askEnd('');}}]);const v=await ask(()=>stop()||p);setActs();return p?'':v;}
// --- DEL TIRÓN (prueba13): 10 seguidas. Si fallas o pasas, la columna se vacía y vuelve a empezar desde la primera (las mismas preguntas), con tu compañero. 90 s.
async function delTiron29(rid){prep();const qs=shuffle(pool().slice()).slice(0,10);cut('host');hostSay('<b>Del tirón</b>: diez preguntas. Hay que acertarlas <b>todas seguidas</b>. Si fallas o pasas, se vacía la columna y tu compañero empieza otra vez desde la primera. ¡90 segundos!');await wait(4,rid);
 cut(HO()?'orange':'blue');const col=column(10,HO()?-GW/2+190:GW/2-190,-200,260,hcol());const st=hud(90);const q=qbar(Math.min(GW*.55,620),-280);let i=0,best=0,who=0;
 while(st.t>0&&i<10){const [w,d]=qs[i];q.Q(d.toUpperCase());hostSay(`<b>${pl3[who]}</b> · ${d}`);const v=await askP(()=>st.t<=0||rid!==RUN);chk(rid);if(v===null||st.t<=0)break;
  if(nrm(v)===nrm(w)){col[i].setT(w.toUpperCase(),COL.gr);sfx('ok');i++;best=Math.max(best,i);}else{sfx('error');say(`Era <b>${w}</b>. ¡Vuelta a empezar!`);await wait(.8,rid);col.forEach(b=>b.setT('',hcol()));i=0;who=(who+1)%3;}}
 st.on=false;if(i>=10){FX5&&FX5.conf&&FX5.conf(['#37c23a','#fff']);}await endSolo(rid,best,i>=10?30:best*2,i>=10?'¡DEL TIRÓN!':'DEL TIRÓN');}
// --- HE DICHO (prueba04, Pasapalabra en familia): frase con una palabra que falta y su inicial; cada acierto sube a la columna y mueve una bola. 100 s.
const HD=[['Más vale pájaro en mano que ciento ___','VOLANDO'],['A quien madruga, Dios le ___','AYUDA'],['No por mucho madrugar amanece más ___','TEMPRANO'],['En boca cerrada no entran ___','MOSCAS'],['Perro ladrador, poco ___','MORDEDOR'],['Al mal tiempo, buena ___','CARA'],['Ojos que no ven, corazón que no ___','SIENTE'],['Dime con quién andas y te diré quién ___','ERES'],['Cría cuervos y te sacarán los ___','OJOS'],['A caballo regalado no le mires el ___','DIENTE'],['Más vale tarde que ___','NUNCA'],['Quien tiene un amigo tiene un ___','TESORO'],['El que la sigue la ___','CONSIGUE'],['Donde fueres, haz lo que ___','VIERES'],['Camarón que se duerme se lo lleva la ___','CORRIENTE'],['Agua que no has de beber, déjala ___','CORRER'],['Hablando del rey de Roma, por la puerta ___','ASOMA'],['No hay mal que por bien no ___','VENGA'],['Cada loco con su ___','TEMA'],['A lo hecho, ___','PECHO'],['Zapatero, a tus ___','ZAPATOS'],['Poco a poco se va ___','LEJOS']];
async function heDicho29(rid){prep();const qs=shuffle(HD.slice());cut('host');hostSay(`<b>He dicho</b>: te digo una frase y falta una palabra; te doy su inicial. Si aciertas, sube a la columna. Si fallas o pasas, juega tu compañero. ¡100 segundos! <i>(frases: refranes populares, ${INV} en lugar de las declaraciones de famosos del programa)</i>`);await wait(4.5,rid);
 cut(HO()?'orange':'blue');const st=hud(100);const q=qbar(Math.min(GW*.62,700),-280);const X=HO()?GW/2-230:-GW/2+230;const stack=[];const balls=[];const bg=new T.SphereGeometry(13,12,8),bm=MP(hcol(),90);
 for(let i=0;i<10;i++){const s=new T.Mesh(bg,bm);s.position.set(X-150,-210+i*44,0);G.add(s);balls.push(s);}let ac=0,qi=0,who=0;
 while(st.t>0&&qi<qs.length*2){const [f,w]=qs[qi%qs.length];if(qs[qi%qs.length].ok){qi++;continue;}q.Q(`${f.replace('___','…')} (${w[0]})`.toUpperCase());hostSay(`<b>${pl3[who]}</b> · ${f.replace('___','…')} <b>(${w[0]})</b>`);
  const v=await askP(()=>st.t<=0||rid!==RUN);chk(rid);if(v===null||st.t<=0)break;
  if(nrm(v)===nrm(w)){qs[qi%qs.length].ok=1;sfx('ok');const b=bar(220,30,hcol(),w,{fs:18,r:2});b.position.set(X,-210+(ac%10)*44,0);G.add(b);stack.push(b);if(balls[ac%10])balls[ac%10].material=MP(COL.gr,90);ac++;}
  else{sfx('error');say(`Era <b>${w}</b>. Juega <b>${pl3[(who+1)%3]}</b>`);who=(who+1)%3;await wait(.7,rid);}qi++;}
 st.on=false;await endSolo(rid,ac,ac*5,'HE DICHO');}
// --- CON NUEVE BASTA (prueba09): un tema y la «vela» de 9 barras. Di cosas del tema: cada respuesta válida llena una barra. ¡Con nueve basta! 70 s.
const C9=[['COLORES',['ROJO','AZUL','VERDE','AMARILLO','NARANJA','MORADO','ROSA','NEGRO','BLANCO','GRIS','MARRON','VIOLETA','AÑIL','BEIS','GRANATE','TURQUESA','CELESTE','LILA','DORADO','PLATEADO']],
 ['FRUTAS',['MANZANA','PERA','PLATANO','NARANJA','FRESA','UVA','MELON','SANDIA','KIWI','PIÑA','CEREZA','MELOCOTON','LIMON','MANDARINA','CIRUELA','MANGO','HIGO','PAPAYA','FRAMBUESA','ALBARICOQUE','COCO','GRANADA','MORA','NISPERO','CAQUI']],
 ['PAÍSES DE EUROPA',['ESPAÑA','FRANCIA','ITALIA','PORTUGAL','ALEMANIA','GRECIA','BELGICA','HOLANDA','PAISESBAJOS','SUIZA','AUSTRIA','POLONIA','SUECIA','NORUEGA','FINLANDIA','DINAMARCA','IRLANDA','REINOUNIDO','INGLATERRA','ESCOCIA','RUMANIA','HUNGRIA','CROACIA','UCRANIA','RUSIA','ANDORRA','MONACO','MALTA','ISLANDIA','LUXEMBURGO','BULGARIA','SERBIA','ALBANIA','ESLOVENIA','ESLOVAQUIA','CHEQUIA','ESTONIA','LETONIA','LITUANIA']],
 ['ANIMALES DE GRANJA',['VACA','CERDO','OVEJA','CABRA','GALLINA','GALLO','CABALLO','BURRO','PATO','CONEJO','PAVO','OCA','TORO','BUEY','POLLO','MULA','CORDERO','TERNERO','PERRO','GATO']],
 ['COSAS DE LA COCINA',['NEVERA','HORNO','SARTEN','OLLA','CUCHARA','TENEDOR','CUCHILLO','PLATO','VASO','TAZA','MICROONDAS','FREGADERO','CAZO','BATIDORA','TOSTADORA','CAFETERA','ESPUMADERA','RALLADOR','COLADOR','JARRA','MANTEL','SERVILLETA','LAVAVAJILLAS','CONGELADOR','TAPER']],
 ['DEPORTES',['FUTBOL','BALONCESTO','TENIS','NATACION','CICLISMO','ATLETISMO','BALONMANO','VOLEIBOL','GOLF','BOXEO','JUDO','KARATE','ESQUI','RUGBY','HOCKEY','PADEL','REMO','VELA','SURF','GIMNASIA','ESGRIMA','BEISBOL','TRIATLON','WATERPOLO','PIRAGUISMO','HALTEROFILIA']]];
async function conNueve29(rid){prep();const [tema,ok]=pick(C9);cut('host');hostSay(`<b>Con nueve basta</b>: el tema es <b>${tema}</b>. Escribe cosas del tema, una cada vez. Cada respuesta buena llena una barra de la vela. ¡Con nueve basta! 70 segundos. Si fallas o repites, juega tu compañero.`);await wait(4.2,rid);
 cut(HO()?'orange':'blue');const st=hud(70);const q=qbar(Math.min(GW*.5,520),-280);q.Q('TEMA: '+tema);const X=HO()?GW/2-240:-GW/2+260;
 const bars=[...Array(9)].map((_,i)=>{const w=120+i*16;const b=bar(w,30,hcol(),'',{fs:18,r:3});b.position.set(X,-210+(8-i)*44,0);G.add(b);return b;}).reverse();// abajo la más ancha (vela)
 const used=new Set();let ac=0,who=0;
 while(st.t>0&&ac<9){hostSay(`<b>${pl3[who]}</b> · Dime algo de <b>${tema}</b> (${ac}/9)`);const v=await askP(()=>st.t<=0||rid!==RUN);chk(rid);if(v===null||st.t<=0)break;const n=nrm(v);
  if(n&&ok.map(nrm).includes(n)&&!used.has(n)){used.add(n);bars[ac].setT(v.toUpperCase(),COL.gr);sfx('ok');ac++;}else{sfx('error');say(used.has(n)?'¡Esa ya está! Juega tu compañero.':'¡Esa no vale! Juega tu compañero.');who=(who+1)%3;await wait(.6,rid);}}
 st.on=false;await endSolo(rid,ac,ac>=9?30:ac*2,ac>=9?'¡CON NUEVE BASTA!':'CON NUEVE BASTA');}
// --- ¿CÓMO SE DICE? (prueba03): un invitado dice una frase en su idioma; ¿qué idioma es? Toca uno de los cuatro. 60 s.
const CSD=[['BUONGIORNO, COME STAI?','ITALIANO'],['GUTEN MORGEN, WIE GEHT ES DIR?','ALEMÁN'],['BONJOUR, COMMENT ÇA VA?','FRANCÉS'],['GOOD MORNING, HOW ARE YOU?','INGLÉS'],['BOM DIA, COMO ESTÁS?','PORTUGUÉS'],['GOEDEMORGEN, HOE GAAT HET?','NEERLANDÉS'],['DZIEŃ DOBRY, JAK SIĘ MASZ?','POLACO'],['GOD MORGON, HUR MÅR DU?','SUECO'],['BON DIA, COM ESTÀS?','CATALÁN'],['EGUNON, ZER MODUZ?','EUSKERA'],['BOS DÍAS, COMO ESTÁS?','GALLEGO'],['DOBRÓYE ÚTRO, KAK DELÁ?','RUSO'],['KALIMÉRA, TI KÁNEIS?','GRIEGO'],['BUNĂ DIMINEAȚA, CE FACI?','RUMANO'],['HYVÄÄ HUOMENTA, MITÄ KUULUU?','FINÉS'],['GÜNAYDIN, NASILSIN?','TURCO'],['DOBRO JUTRO, KAKO SI?','CROATA'],['JÓ REGGELT, HOGY VAGY?','HÚNGARO']];
async function comoSeDice29(rid){prep();cut('host');hostSay(`<b>¿Cómo se dice?</b>: nuestros invitados dicen una frase en su idioma. ¿Qué idioma es? Toca la respuesta. ¡60 segundos! <i>(frases escritas para el juego · ${INV})</i>`);await wait(3.8,rid);
 cut('host');const st=hud(60);const q=bar(Math.min(GW*.7,760),60,COL.pu,'',{fs:26});q.position.set(0,-170,10);G.add(q);const all=[...new Set(CSD.map(x=>x[1]))];const qs=shuffle(CSD.slice());let ac=0,qi=0;const acb=acBox(hcol());acb.position.set(GW/2-100,-280,20);G.add(acb);
 while(st.t>0&&qi<qs.length){const [f,l]=qs[qi++];q.setT(f);hostSay(`Invitado: «${f.toLowerCase()}»`);const op=shuffle([l,...shuffle(all.filter(x=>x!=l)).slice(0,3)]);
  const bs=op.map((o,i)=>{const b=bar(230,48,hcol(),o,{fs:22});b.position.set((i-1.5)*250,-270,10);b.userData.tap=i;G.add(b);return b;});
  const pi=await new Promise(r=>{TAP=i=>{if(typeof i=='number')r(i);};anim(()=>{if(st.t<=0||rid!==RUN){r(-1);return false;}return TAP!==null;});});TAP=null;chk(rid);
  if(pi>=0){const ok=op[pi]==l;bs[pi].setC(ok?COL.gr:COL.rd);if(!ok)bs[op.indexOf(l)].setC(COL.gr);sfx(ok?'ok':'error');if(ok){ac++;acb.setT(String(ac));}await wait(.8,rid);}bs.forEach(b=>G.remove(b));if(pi<0)break;}
 st.on=false;await endSolo(rid,ac,ac*5,'¿CÓMO SE DICE?');}
// --- EN POCAS PALABRAS (prueba06): categoría abajo (UNA ACTRIZ, UN CUADRO…) y pistas de UNA palabra que van saliendo en la columna.
//     Cuantas menos pistas necesites, más segundos (8 pistas como máximo). 3 rondas.
const EPP=[['UN CUADRO','LAS MENINAS',['VELÁZQUEZ','PRADO','INFANTA','PINTOR','ESPEJO','PERRO','CORTE','BARROCO']],['UN CUADRO','LA GIOCONDA',['LEONARDO','SONRISA','LOUVRE','PARÍS','MUJER','RENACIMIENTO','MISTERIO','ITALIA']],['UN CUADRO','EL GUERNICA',['PICASSO','BOMBARDEO','REINA SOFÍA','GRIS','CABALLO','TORO','GUERRA','CUBISMO']],['UN CUADRO','LA MAJA DESNUDA',['GOYA','PRADO','MUJER','TUMBADA','VESTIDA','PAREJA','DIVÁN','CÉLEBRE']],['UN ANIMAL','JIRAFA',['ÁFRICA','CUELLO','ALTA','MANCHAS','HOJAS','SABANA','PATAS','AMARILLA']],['UN ANIMAL','PINGÜINO',['FRÍO','HIELO','PATO','NEGRO','BLANCO','NADAR','ANTÁRTIDA','PESCADO']],['UNA CIUDAD','PARÍS',['FRANCIA','TORRE','EIFFEL','SENA','LOUVRE','CAPITAL','AMOR','BAGUETTE']],['UNA CIUDAD','ROMA',['ITALIA','COLISEO','PAPA','CAPITAL','PIZZA','IMPERIO','FONTANA','VATICANO']],['UN DEPORTE','TENIS',['RAQUETA','PELOTA','RED','NADAL','PISTA','SAQUE','SET','WIMBLEDON']],['UNA COMIDA','PAELLA',['ARROZ','VALENCIA','AZAFRÁN','MARISCO','SARTÉN','DOMINGO','AMARILLA','POLLO']]];
async function enPocas29(rid){prep();cut('host');hostSay(`<b>En pocas palabras</b>: tu compañero lleva gafas y no ve nada… ¡te toca adivinar! Te doy pistas de <b>una sola palabra</b>. Cuantas menos pistas uses, más segundos ganas. <i>(pistas escritas para el juego · ${INV})</i>`);await wait(4.2,rid);
 let tot=0,ac=0;const rounds=shuffle(EPP.slice()).slice(0,3);
 for(const [cat,ans,cl] of rounds){prep();cut(HO()?'orange':'blue');const X=HO()?-GW/2+190:GW/2-190;const col=column(8,X,230,240,hcol(),-40);const cb=bar(320,44,hcol(),cat,{fs:22});cb.position.set(0,-280,10);G.add(cb);
  let n=0,got=false,stop=false;const st=hud(40);
  const reveal=()=>{if(n<8){col[n].setT(cl[n],COL.gr);n++;sfx('ok');}};reveal();
  while(!got&&!stop&&st.t>0){hostSay(`<b>${cat}</b> · ${n} pista${n>1?'s':''}. Escribe la respuesta o pide otra pista.`);let more=false;setActs([{t:'Otra pista',ic:'➕',cb:()=>{more=true;askEnd('');}}]);
   const v=await ask(()=>st.t<=0||rid!==RUN||more);setActs();chk(rid);if(more){if(n<8)reveal();else stop=true;continue;}if(v===null)break;
   if(nrm(v)===nrm(ans)||nrm(ans).replace(/^(EL|LA|LAS|LOS)/,'')===nrm(v)){got=true;sfx('winner');}else{sfx('error');if(n<8)reveal();else stop=true;}}
  st.on=false;const s=got?Math.max(1,9-n)*2:0;if(got){ac++;tot+=s;}cb.setT(ans,got?COL.gr:COL.rd);await wait(1.4,rid);await rotulo(got?`¡${ans}! con ${n} pista${n>1?'s':''} · +${s} s`:`ERA: ${ans}`,got?COL.gr:COL.rd,rid,1.6);}
 await endSolo(rid,ac,tot,'EN POCAS PALABRAS');}
// --- ¿TÚ QUÉ PINTAS? (prueba07): un dibujo se va trazando en la pizarra blanca, con su categoría (EN UNA BODA…). Adivínalo antes de que acabe el tiempo. 6 dibujos.
// Los dibujos son trazos sencillos hechos para el juego (${INV}).
const C=(cx,cy,r,a0=0,a1=6.283)=>{const p=[];for(let i=0;i<=24;i++){const a=a0+(a1-a0)*i/24;p.push([cx+Math.cos(a)*r,cy+Math.sin(a)*r]);}return p;};
const DIB=[['EN UNA BODA','TARTA',[[[30,80],[70,80],[70,60],[30,60],[30,80]],[[36,60],[36,44],[64,44],[64,60]],[[42,44],[42,32],[58,32],[58,44]],[[50,32],[50,24]],C(50,22,2)]],
 ['EN UNA BODA','ANILLO',[C(50,58,18),C(50,58,13),[[42,40],[50,30],[58,40],[50,44],[42,40]]]],
 ['EN UNA BODA','CORBATA',[[[42,20],[58,20],[54,30],[46,30],[42,20]],[[46,30],[38,74],[50,86],[62,74],[54,30]]]],
 ['EN UNA BODA','COPA',[[[34,24],[66,24],[60,50],[50,56],[40,50],[34,24]],[[50,56],[50,78]],[[38,80],[62,80]]]],
 ['EL TIEMPO','PARAGUAS',[C(50,46,30,Math.PI,2*Math.PI),[[20,46],[80,46]],[[50,46],[50,80],[44,84],[40,80]]]],
 ['EL TIEMPO','RAYO',[[[56,14],[38,50],[52,50],[42,86],[66,42],[52,42],[60,14],[56,14]]]],
 ['EL TIEMPO','NUBE',[C(38,56,12,Math.PI*.5,Math.PI*1.6),C(52,44,16,Math.PI*1.1,Math.PI*1.95),C(66,54,12,Math.PI*1.4,Math.PI*2.5),[[38,68],[66,66]]]],
 ['EN LA PLAYA','SOMBRILLA',[C(50,40,26,Math.PI,2*Math.PI),[[24,40],[76,40]],[[50,40],[46,86]],[[20,88],[84,88]]]],
 ['EN LA PLAYA','PEZ',[[[24,50],[46,36],[64,44],[78,34],[78,66],[64,56],[46,64],[24,50]],C(36,48,2)]],
 ['EN LA PLAYA','SOL',[C(50,50,14),[[50,22],[50,30]],[[50,70],[50,78]],[[22,50],[30,50]],[[70,50],[78,50]],[[30,30],[36,36]],[[70,30],[64,36]],[[30,70],[36,64]],[[70,70],[64,64]]]],
 ['EN CASA','CASA',[[[24,84],[24,46],[50,22],[76,46],[76,84],[24,84]],[[44,84],[44,64],[56,64],[56,84]],[[30,52],[40,52],[40,60],[30,60],[30,52]]]],
 ['EN CASA','VELA',[[[42,84],[42,40],[58,40],[58,84],[42,84]],[[50,40],[50,32]],[[50,32],[44,24],[50,12],[56,24],[50,32]]]],
 ['EN LA CALLE','COCHE',[[[16,66],[16,52],[30,50],[40,36],[64,36],[74,50],[86,54],[86,66],[16,66]],C(32,68,7),C(70,68,7)]],
 ['EN LA CALLE','ÁRBOL',[[[46,86],[46,56],[54,56],[54,86]],C(50,40,20)]]];
async function tuQuePintas29(rid){prep();cut('host');hostSay(`<b>¿Tú qué pintas?</b>: en la pizarra se va haciendo un dibujo. Te digo dónde lo encontrarías. ¡Toca qué es antes de que se acabe! <i>(dibujos hechos para el juego · ${INV})</i>`);await wait(3.8,rid);
 const rounds=shuffle(DIB.slice()).slice(0,6);const allW=DIB.map(d=>d[1]);let ac=0,tot=0;const st=hud(90,{tx:-GW/2+110,ty:-270});G.remove(st.tm);
 for(const [cat,ans,strokes] of rounds){if(st.t<=0)break;prep();cut('host');G.add(st.tm);const S=360;let prog=0;
  const pz=label(S,S,(c,cw,ch,k)=>{c.fillStyle='#fff';c.fillRect(0,0,cw,ch);c.strokeStyle='#7fd0ff';c.lineWidth=8*k;c.strokeRect(0,0,cw,ch);c.strokeStyle='#222';c.lineWidth=4*k;c.lineCap=c.lineJoin='round';
   const tot=strokes.reduce((a,s)=>a+s.length-1,0);let left=prog*tot;for(const s of strokes){c.beginPath();c.moveTo(s[0][0]/100*cw,s[0][1]/100*ch);for(let i=1;i<s.length&&left>0;i++,left--){const f=Math.min(1,left);const [x0,y0]=s[i-1],[x1,y1]=s[i];c.lineTo((x0+(x1-x0)*f)/100*cw,(y0+(y1-y0)*f)/100*ch);}c.stroke();if(left<=0)break;}});
  pz.position.set(GW*.22,60,5);G.add(pz);const cb=bar(S,40,hcol(),cat,{fs:22});cb.position.set(GW*.22,-140,8);G.add(cb);
  const op=shuffle([ans,...shuffle(allW.filter(x=>x!=ans)).slice(0,3)]);const bs=op.map((o,i)=>{const b=bar(220,48,hcol(),o,{fs:22});b.position.set(-GW*.22,140-i*64,10);b.userData.tap=i;G.add(b);return b;});
  let lt=-1;anim(dt=>{if(prog>=1||!pz.parent)return false;prog=Math.min(1,prog+dt/8);const f=Math.floor(prog*40);if(f!==lt){lt=f;pz.set();}return true;});hostSay(`<b>${cat}</b>…`);
  const pi=await new Promise(r=>{TAP=i=>{if(typeof i=='number')r(i);};anim(()=>{if(st.t<=0||rid!==RUN){r(-1);return false;}return TAP!==null;});});TAP=null;chk(rid);
  if(pi>=0){const ok=op[pi]==ans;bs[pi].setC(ok?COL.gr:COL.rd);if(!ok)bs[op.indexOf(ans)].setC(COL.gr);sfx(ok?'ok':'error');if(ok){ac++;tot+=prog<.5?5:3;}prog=1;pz.set();await wait(1,rid);}}
 st.on=false;await endSolo(rid,ac,tot,'¿TÚ QUÉ PINTAS?');}
// --- LETRA A LETRA (prueba05): la prueba ya era jugable en las etapas 2014 y 2017 (las letras salen una a una y sube una bola por acierto).
const letra29=rid=>letraALetra(rid);
const PR29=[['tiron','Del tirón','🔗',delTiron29,13,'10 preguntas seguidas; si fallas, vuelta a empezar'],['hedicho','He dicho','💬',heDicho29,4,'Completa la frase con la inicial'],['nueve','Con nueve basta','⛵',conNueve29,9,'Di 9 cosas del tema'],
 ['comosedice','¿Cómo se dice?','🌍',comoSeDice29,3,'¿En qué idioma habla el invitado?'],['pocas','En pocas palabras','🕶️',enPocas29,6,'Adivina con pistas de una palabra'],['pintas','¿Tú qué pintas?','🎨',tuQuePintas29,7,'Adivina el dibujo'],['letra','Letra a letra','🔤',letra29,5,'Las letras salen una a una']];
Object.assign(CORT,{tiron:{title:['Del tirón'],tx:0,ty:0,fs:96},hedicho:{title:['He dicho'],tx:0,ty:0,fs:100},nueve:CORT.nueve||{title:['Con nueve','basta'],fs:88,tx:0,ty:0},comosedice:{title:['¿Cómo','se dice?'],tx:0,ty:0,fs:84},pocas:{title:['En pocas','palabras'],tx:0,ty:0,fs:84},pintas:{title:['¿Tú qué','pintas?'],tx:0,ty:0,fs:88}});
['tiron','hedicho','nueve','comosedice','pocas','pintas'].forEach(k=>{if(CORT[k]&&!CORT[k].mk)CORT[k].mk=(AW,bl)=>{artGen29.id=k;return artGen29(AW,bl);};});
function play29(i){const [id,n,ic,fn]=PR29[i];return scene9(async rid=>{GAME.sec=[0,0];GAME.ac=[0,0];GAME.res=null;MOSCA.visible=true;badges29();
  cut('host');hostSay(`¡Vamos a jugar a <b>${n}</b>, como en el vídeo!`);await wait(2,rid);say();try{await playCort(id,rid);}catch(e){if(e instanceof Stop)throw e;}await fn(rid);chk(rid);clearG();
  cut('host');hostSay(`¡Muy bien! <b>${GAME.ac[0]}</b> aciertos y <b>${GAME.sec[0]}</b> segundos ganados.`);await wait(3,rid);},{back:'pr29',banner:'🎮 '+n});}
SCR9.pr29=()=>`<h2>🎮 Pruebas de los vídeos · ¡a jugar!</h2><div class="mtext">Las pruebas que antes solo se veían en la recreación 3D, ahora se juegan con su mecánica del programa. Las preguntas nuevas van marcadas ${INV}.</div>`+
 PR29.map((p,i)=>mb9('x29:'+i,p[2],p[1],p[5]+' · vídeo prueba'+String(p[4]).padStart(2,'0'))).join('')+back9('main');
window.PR29={list:PR29,play:play29,pulsador29,depar29};
{const _b=bind9;bind9=function(col){_b.apply(this,arguments);col.querySelectorAll('[data-go^="x29:"]').forEach(b=>{b.onpointerdown=ev=>{ev.preventDefault();sfx('ok');play29(+b.dataset.go.slice(4));};});};}
{const _sm=showMenu;showMenu=function(s='main'){const r=_sm.apply(this,arguments);try{const col=menu.querySelector('.col');if(s=='main'&&col&&!col.querySelector('[data-go=pr29]')){const ref=col.querySelector('[data-go=vp27]');
  const h=mb9('pr29','🎮','PRUEBAS DE LOS VÍDEOS · ¡A JUGAR!','Del tirón, He dicho, Con nueve basta, ¿Cómo se dice?, En pocas palabras, ¿Tú qué pintas? y Letra a letra');
  if(ref)ref.insertAdjacentHTML('afterend',h);else col.insertAdjacentHTML('beforeend',h);bind9(col,['pr29']);try{NAV.attach(s);}catch(e){}}}catch(e){console.error(e);}return r;};}
// botón «🎮 Jugar» en la lista de vídeos
{const K={13:0,4:1,9:2,3:3,6:4,7:5,5:6};const obs=new MutationObserver(()=>{const e=document.getElementById('vp27');if(!e||e.dataset.p29)return;e.dataset.p29=1;
  e.querySelectorAll('[data-a^="r:"]').forEach(b=>{const i=+b.dataset.a.slice(2);const x=(window.VID27||[])[i];if(!x||!x.m)return;const k=K[x.m.n];if(k===undefined)return;const j=document.createElement('button');j.textContent='🎮 Jugar';j.style.background='#2aa83a';
   j.onclick=ev=>{ev.stopPropagation();const v=e.querySelector('video');if(v)try{v.pause();}catch(_){}e.remove();play29(k);};b.after(j);});});obs.observe(document.body,{childList:true});}
{const _sm=showMenu;showMenu=function(){const r=_sm.apply(this,arguments);try{$('#ver').textContent='v0.29';}catch(e){}return r;};}
})();
