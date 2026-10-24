// ======================================================================
//  v0.6b — grafismo de TV sobre planos de cámara del plató (en vez del look de la app de móvil),
//  Coco Loco del programa (ahorcado con globos y abeja), Una de Cuatro TV y prueba final «A la Z».
// ======================================================================
const TV6={on:true};
SHOTS.cu={p:V3(1.45,1.62,.15),l:V3(3.95,1.55,-.35),f:34,dr:.02};
SHOTS.cuo={p:V3(-1.45,1.62,.15),l:V3(-3.95,1.55,.65),f:34,dr:.02};
{const _cut=cut;cut=function(n){if(TV6.on&&n==='blue')n='cu';else if(TV6.on&&n==='orange')n='cuo';return _cut(n);};}
// píldoras naranjas (redondas, con brillo)
{const _bar=bar;bar=function(w,h,col,txt='',o={}){o=Object.assign({r:h/2-.5,bw:3,border:0xffd9a8},o);const g=_bar(w,h,col,txt,o);const sc=g.setC;const em=c=>{const C=new T.Color(c);g.face.material.emissive&&g.face.material.emissive.copy(C).multiplyScalar(.45);};em(col);g.setC=c=>{sc(c);em(c);};const st=g.setT;g.setT=(t,c)=>{st(t,c);if(c!==undefined)em(c);};return g;};}
// reloj de TV: círculo naranja con aro blanco de progreso
function tvTimer(){const g=new T.Group();g.max=null;
 const L=label(132,132,(c,cw,ch,k)=>{const r=cw/2;const gr=c.createRadialGradient(r*.75,r*.65,r*.1,r,r,r);gr.addColorStop(0,'#ffb24a');gr.addColorStop(1,'#df5a06');
  c.fillStyle='rgba(0,0,0,.25)';c.beginPath();c.arc(r,r+3*k,r*.9,0,7);c.fill();c.fillStyle=gr;c.beginPath();c.arc(r,r,r*.88,0,7);c.fill();
  c.lineWidth=r*.11;c.strokeStyle='rgba(255,255,255,.3)';c.beginPath();c.arc(r,r,r*.76,0,7);c.stroke();
  const f=g.max?Math.max(0,Math.min(1,(g.v||0)/g.max)):1;c.strokeStyle='#fff';c.lineCap='round';c.beginPath();c.arc(r,r,r*.76,-PI/2,-PI/2+PI*2*f);c.stroke();
  ftxt(c,String(g.v??''),r,r+4*k,r*.78,'#fff','center',cw*.7,0);});g.add(L);
 g.set=v=>{if(v===g.v)return;if(g.max==null||v>g.max)g.max=v;g.v=v;L.set();};g.setC=()=>{};return g;}
yTimer=function(){return tvTimer();};
// número gordo naranja en 3D (segundos de Coco Loco)
function bigNum6(){const g=new T.Group();const L=label(150,120,(c,cw,ch,k)=>{const s=String(g.v??'');c.font=`900 ${ch*.92}px N,Arial`;c.textAlign='center';c.textBaseline='middle';
  for(let i=7;i>0;i--){c.fillStyle='#a8460a';c.fillText(s,cw/2+i*1.1*k,ch/2+i*1.3*k);}const gr=c.createLinearGradient(0,ch*.1,0,ch*.9);gr.addColorStop(0,'#ffe08a');gr.addColorStop(.5,'#ffa21a');gr.addColorStop(1,'#e86a08');c.fillStyle=gr;c.fillText(s,cw/2,ch/2);});
 g.add(L);g.set=v=>{if(v===g.v)return;g.v=v;L.set();};return g;}
// globo naranja con los fallos que quedan
function globo6(){const g=new T.Group();const L=label(80,110,(c,cw,ch,k)=>{const gr=c.createRadialGradient(cw*.38,ch*.3,2,cw/2,ch*.42,cw*.5);gr.addColorStop(0,'#ffd27a');gr.addColorStop(1,'#e46a06');
  c.fillStyle=gr;c.beginPath();c.ellipse(cw/2,ch*.42,cw*.42,ch*.38,0,0,7);c.fill();c.fillStyle='#c85a06';c.beginPath();c.moveTo(cw/2-6*k,ch*.82);c.lineTo(cw/2+6*k,ch*.82);c.lineTo(cw/2,ch*.76);c.fill();
  ftxt(c,String(g.v??''),cw/2,ch*.44,ch*.4,'#fff','center',cw,4*k);});g.add(L);g.set=v=>{g.v=v;L.set();};return g;}
// abuelo en la cesta con 4 globos y la abeja
function cocoArt6(){const g=new T.Group();g.pop=0;g.fall=0;const BC=['#3bc43a','#5ec8f0','#f07a1a','#2a5ae0'],BP=[[.38,.15],[.62,.12],[.78,.25],[.24,.32]];
 const L=label(300,440,(c,cw,ch,k)=>{const s=cw/300;const bx=150*s,by=(330+g.fall*120)*s;
  BP.forEach((p,i)=>{if(i<g.pop)return;c.strokeStyle='#333';c.lineWidth=1.5*k;c.beginPath();c.moveTo(p[0]*cw,p[1]*ch+50*s);c.lineTo(bx+(i-1.5)*14*s,by-20*s);c.stroke();});
  BP.forEach((p,i)=>{if(i<g.pop)return;const x=p[0]*cw,y=p[1]*ch;const gr=c.createRadialGradient(x-14*s,y-18*s,3,x,y,48*s);gr.addColorStop(0,'#fff');gr.addColorStop(.25,BC[i]);gr.addColorStop(1,BC[i]);c.fillStyle=gr;c.beginPath();c.ellipse(x,y,38*s,46*s,0,0,7);c.fill();});
  // abuelo
  c.fillStyle='#e8c09a';c.beginPath();c.arc(bx,by-70*s,26*s,0,7);c.fill();c.fillStyle='#b9b9b9';c.fillRect(bx-34*s,by-98*s,68*s,8*s);c.fillRect(bx-20*s,by-118*s,40*s,22*s);
  c.fillStyle='#fff';c.beginPath();c.arc(bx-9*s,by-72*s,7*s,0,7);c.arc(bx+9*s,by-72*s,7*s,0,7);c.fill();c.fillStyle='#000';c.beginPath();c.arc(bx-9*s,by-72*s,2.5*s,0,7);c.arc(bx+9*s,by-72*s,2.5*s,0,7);c.fill();
  c.fillStyle='#fff';c.fillRect(bx-12*s,by-58*s,24*s,6*s);c.fillStyle='#c8642a';c.fillRect(bx-30*s,by-44*s,60*s,40*s);c.fillStyle='#fff';c.fillRect(bx-9*s,by-44*s,18*s,34*s);c.fillStyle='#d01818';c.fillRect(bx-4*s,by-42*s,8*s,30*s);
  // cesta
  c.fillStyle='#8a5a2a';c.beginPath();c.moveTo(bx-46*s,by-14*s);c.lineTo(bx+46*s,by-14*s);c.lineTo(bx+34*s,by+40*s);c.lineTo(bx-34*s,by+40*s);c.fill();c.strokeStyle='#5a3a16';c.lineWidth=3*k;for(let j=0;j<3;j++){c.beginPath();c.moveTo(bx-44*s,by+j*16*s);c.lineTo(bx+44*s,by+j*16*s);c.stroke();}
  c.fillStyle='#d42020';c.beginPath();c.arc(bx-36*s,by+30*s,10*s,0,7);c.arc(bx+36*s,by+30*s,10*s,0,7);c.fill();});
 g.add(L);g.L=L;
 const bee=label(70,40,(c,cw,ch)=>{c.fillStyle='#f0c020';c.beginPath();c.ellipse(cw*.55,ch/2,cw*.3,ch*.3,0,0,7);c.fill();c.fillStyle='#222';for(const x of[.45,.6])c.fillRect(cw*x,ch*.22,cw*.06,ch*.56);c.fillStyle='rgba(220,240,255,.85)';c.beginPath();c.ellipse(cw*.55,ch*.18,cw*.13,ch*.16,0,0,7);c.fill();c.fillStyle='#f2c09a';c.beginPath();c.arc(cw*.2,ch/2,ch*.24,0,7);c.fill();c.fillStyle='#000';c.fillRect(cw*.86,ch*.46,cw*.1,ch*.08);});
 bee.position.set(110,60,5);g.add(bee);g.bee=bee;let t=0;anim(dt=>{if(!g.parent)return false;t+=dt;if(!g.atk)bee.position.set(110+Math.sin(t*1.7)*14,60+Math.sin(t*3.1)*10,5);return true;});
 g.popOne=async()=>{const i=g.pop;if(i>=4){g.fall=1;L.set();return;}const p=BP[i],tx=(p[0]-.5)*300,ty=(.5-p[1])*440;g.atk=1;const a=bee.position.clone();await tween(.35,e=>bee.position.set(a.x+(tx-a.x)*e,a.y+(ty-a.y)*e,5));g.pop++;L.set();sfx('splash');await tween(.35,e=>bee.position.set(tx+(a.x-tx)*e,ty+(a.y-ty)*e,5));g.atk=0;};
 g.reset=()=>{g.pop=0;g.fall=0;L.set();};return g;}
// teclado de letras en pantalla
function kb6(onKey,onSolve){let d=$('#kb6');if(!d){d=document.createElement('div');d.id='kb6';document.body.appendChild(d);const st=document.createElement('style');st.textContent=`#kb6{position:fixed;right:1.5%;top:4%;width:46%;display:flex;flex-wrap:wrap;gap:.6vh;justify-content:center;z-index:30}#kb6 button{font:900 2.6vh N,Arial;min-width:6.2%;padding:.9vh 0;border-radius:2vh;border:2px solid #ffd9a8;color:#fff;background:linear-gradient(#ffad45,#e2600a);box-shadow:0 .4vh 0 #a8460a}#kb6 button.u{opacity:.35}#kb6 button.r{min-width:30%;background:linear-gradient(#5aa0ff,#1f4fd0);border-color:#cfe0ff}#kb6.off{display:none}`;document.head.appendChild(st);}
 d.innerHTML='';d.classList.remove('off');[...'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'].forEach(L=>{const b=document.createElement('button');b.textContent=L;b.dataset.l=L;b.onpointerdown=e=>{e.preventDefault();e.stopPropagation();if(!b.classList.contains('u'))onKey(L);};d.appendChild(b);});
 const r=document.createElement('button');r.className='r';r.textContent='Resolver';r.onpointerdown=e=>{e.preventDefault();e.stopPropagation();onSolve();};d.appendChild(r);
 return {used:L=>{const b=d.querySelector(`[data-l="${L}"]`);if(b)b.classList.add('u');},reset:()=>d.querySelectorAll('button').forEach(b=>b.classList.remove('u')),hide:()=>d.classList.add('off'),show:()=>d.classList.remove('off'),kill:()=>d.remove()};}
const nl6=ch=>ch=='Ñ'?'Ñ':norm(ch);
// ---------- COCO LOCO (como en la tele) ----------
async function cocoLoco(rid){prep();const words=shuffle(D2.COCO.filter(w=>w[0].length<=12));let wi=0;const tm=[75,75],ac=[0,0];
 cut('host');hostSay('<b>Coco Loco</b>: es el ahorcado. Tenéis una pista y una raya por letra. Decid letras, vocales o consonantes. Si falláis una letra, el turno pasa al otro equipo. Con cinco fallos se resuelve la palabra. Y en cualquier momento podéis pulsar <b>Resolver</b>: ¡pero si falláis la palabra, se pierde!');await wait(4.2,rid);
 let turn=GAME.sec[0]<GAME.sec[1]?0:1;// empieza quien menos segundos lleva; si empatan, el naranja
 hostSay(`Empieza el equipo <b>${turn?'naranja':'azul'}</b>, que lleva menos segundos${GAME.sec[0]==GAME.sec[1]?' (empate: empieza el naranja)':''}.`);await wait(2.2,rid);
 const art=cocoArt6();art.position.set(-GW/2+175,40,0);art.scale.setScalar(1.15);G.add(art);
 const num=bigNum6();num.position.set(-GW/2+330,-258,20);G.add(num);
 const bw=Math.min(GW-640,760),b=bar(bw,64,COL.or,'',{fs:34});b.position.set(-GW/2+410+bw/2,-258,10);G.add(b);
 const gl=globo6();gl.position.set(-GW/2+470+bw,-250,20);G.add(gl);
 const clue=bar(Math.min(bw,680),40,COL.blD,'',{fs:22});clue.position.set(b.position.x,-195,10);G.add(clue);
 const team=bar(150,34,COL.bl,'AZUL',{fs:20});team.position.set(-GW/2+330,-180,20);G.add(team);
 document.body.classList.add('tv6');let key=null,solve=false;const kb=kb6(L=>{key=L;},()=>{solve=true;});
 const setTurn=t=>{turn=t;cut(t?'orange':'blue');team.setT(t?'NARANJA':'AZUL',t?COL.or:COL.bl);num.set(Math.ceil(tm[t]));t?kb.hide():kb.show();};
 let on=true;anim(dt=>{if(!on||rid!==RUN)return false;tm[turn]-=dt;num.set(Math.max(0,Math.ceil(tm[turn])));return true;});
 const alive=()=>tm[0]>0||tm[1]>0;
 try{
 while(alive()&&wi<words.length){const [w,def]=words[wi++];const W=[...w];const vis=new Set(W.map((ch,i)=>/[A-ZÑÁÉÍÓÚÜ]/.test(ch)?-1:i).filter(i=>i>=0));const used=new Set();let fail=0,done=null;
  art.reset();gl.set(5);kb.reset();b.all=false;
  b.hl=(c,cw,ch,k)=>{const n=W.length,sp=Math.min(42*k,(cw-70*k)/n),x0=36*k+sp/2;for(let i=0;i<n;i++){const v=vis.has(i)||b.all;ftxt(c,v?W[i]:'-',x0+i*sp,ch/2+2*k,34*k,b.all&&!vis.has(i)?'#8dff7a':'#fff');}};b.L.set();
  clue.setT('PISTA: '+def.toUpperCase());hostSay(`${def} <b>(${W.length} letras)</b>`);setTurn(turn);
  const hit=L=>{let n=0;W.forEach((ch,i)=>{if(nl6(ch)==L&&!vis.has(i)){vis.add(i);n++;}});return n;};
  while(!done){if(tm[turn]<=0){if(tm[1-turn]>0){setTurn(1-turn);continue;}done='time';break;}
   let L=null,sol=null;
   if(turn==0){key=null;solve=false;await new Promise(r=>anim(()=>{if(key||solve||tm[0]<=0||rid!==RUN){r();return false;}return true;}));chk(rid);
    if(solve){kb.hide();const a=await ask(()=>tm[0]<=0||rid!==RUN);chk(rid);kb.show();if(a===null)continue;sol=a;}else if(key)L=key;else continue;}
   else{await wait(rnd(1.1,2),rid);const frac=vis.size/W.length;if(frac>.55&&Math.random()<.5)sol=Math.random()<.85?w:'NO';else{const cand=[...'AEIOSRNLTCDMUPBGVHFJZQÑXKWY'].filter(x=>!used.has(x));L=Math.random()<.7?cand.find(x=>W.some(ch=>nl6(ch)==x))||cand[0]:pick(cand);}
    say(sol?`Naranja resuelve: <b>${sol}</b>`:`Naranja pide la <b>${L}</b>`);await wait(.7,rid);}
   if(sol!==null){if(norm(sol)===norm(w)){done='ok';}else{done='ko';sfx('error');hostSay(`¡No es! La palabra se pierde: era <b>${w}</b>.`);}break;}
   used.add(L);kb.used(L);
   if(hit(L)){sfx('ok');b.L.set();if(vis.size==W.length)done='ok';}
   else{fail++;gl.set(5-fail);sfx('error');art.popOne();hostSay(`No hay <b>${L}</b>. ¡Pasa el turno al equipo ${turn?'azul':'naranja'}!`);await wait(1,rid);
    if(fail>=5){done='five';hostSay(`Cinco fallos: la palabra era <b>${w}</b>.`);break;}if(tm[1-turn]>0)setTurn(1-turn);}}
  b.all=true;b.L.set();if(done=='ok'){ac[turn]++;FX5&&FX5.conf&&FX5.conf(['#ff8a1a','#ffd23a','#fff'],1.2);hostSay(`¡<b>${w}</b>! ¡Cinco segundos para el equipo ${turn?'naranja':'azul'}!`);}
  await wait(1.6,rid);}
 }finally{on=false;kb.kill();document.body.classList.remove('tv6');}
 say();setActs();chk(rid);GAME.sec[0]+=ac[0]*5;GAME.sec[1]+=ac[1]*5;GAME.ac[0]+=ac[0];GAME.ac[1]+=ac[1];sfx('winner');
 await rotulo(`AZUL: ${ac[0]} PALABRAS · +${ac[0]*5} s`,COL.bl,rid);await rotulo(`NARANJA: ${ac[1]} PALABRAS · +${ac[1]*5} s`,COL.or,rid);clearG();}
// ---------- UNA DE CUATRO (como en la tele: 4 píldoras arriba a la izquierda, reloj y pregunta abajo) ----------
async function unaDeCuatro(rid){prep();const [theme,opts,qs0]=pick(D2.U4),qs=shuffle(qs0).slice(0,6);const st={t:40};let ac=0,qi=0;
 cut('host');hostSay(`<b>Una de Cuatro</b>: cada definición corresponde a una de las cuatro respuestas. Tema: <b>${theme}</b>.`);await wait(3.2,rid);
 cut('blue');document.body.classList.add('tv6');
 const ov=opts.map((o,i)=>{const b=bar(250,46,COL.or,o.toUpperCase(),{fs:22});b.position.set(-GW/2+150+(i%2)*268,300-Math.floor(i/2)*60,0);b.userData.tap=i;G.add(b);return b;});
 const tm=yTimer();tm.position.set(-GW/2+90,-262,20);G.add(tm);tm.set(40);
 const qb=bar(Math.min(GW-280,1000),60,COL.or,'',{fs:24});qb.position.set(-GW/2+190+Math.min(GW-280,1000)/2,-262,10);G.add(qb);clockRun(st,tm,rid);
 const showQ=()=>{if(qi<qs.length){qb.setT(qs[qi][0].toUpperCase());hostSay(`${qs[qi][0]}…`);}};showQ();let busy=false;
 TAP=async id=>{if(id===null||busy||qi>=qs.length)return;busy=true;const ok=id===qs[qi][1];ov[id].setC(ok?COL.gr:COL.rd);sfx(ok?'ok':'error');if(ok)ac++;else ov[qs[qi][1]].setC(COL.gr);await wait(.8);ov.forEach(o=>o.setC(COL.or));qi++;showQ();busy=false;};
 try{await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN||qi>=qs.length){r();return false;}return true;}));}finally{document.body.classList.remove('tv6');}
 st.on=false;chk(rid);await wait(.8,rid);await soloEnd(ac,rid);}
{const st=document.createElement('style');st.textContent='body.tv6 #sub{opacity:0}';document.head.appendChild(st);}
// ---------- A LA Z (final de 2026): 110 s + acumulados, 25 palabras, «letra» destapa una letra por -5 s ----------
function alazBar6(){const g=new T.Group();const w=Math.min(GW-160,1100);
 const L=label(w,190,(c,cw,ch,k)=>{const h=36*k,o=48*k;if(g.word)ftxt(c,g.word,cw/2,22*k,34*k,'#fff','center',cw*.9,6*k);c.translate(0,o);const f=g.f??.5;
  c.fillStyle='#1f5fe0';c.fillRect(0,0,cw*f,h);c.fillStyle='#f07a1a';c.fillRect(cw*f,0,cw*(1-f),h);gloss(c,cw,h);
  ftxt(c,g.txt||'',cw/2,h/2+2*k,22*k,'#fff','center',cw*.95,3*k);
  const n=25,tw=(cw-8*k)/n;for(let i=0;i<n;i++){const s=(g.st||[])[i]||0,cur=i==g.cur;const x=4*k+i*tw,y=h+12*k;
   c.fillStyle=cur?'#2fc23a':s==1?'#1f5fe0':s==2?'#d42020':'#fff';c.fillRect(x+1*k,y,tw-2*k,tw-2*k);c.strokeStyle='#1f3f9a';c.lineWidth=2*k;c.strokeRect(x+1*k,y,tw-2*k,tw-2*k);
   ftxt(c,LETRAS[i],x+tw/2,y+tw/2,tw*.66,cur||s?'#fff':'#1f3f9a');}
  c.setTransform(1,0,0,1,0,0);});
 g.add(L);g.upd=o=>{Object.assign(g,o);L.set();};return g;}
async function alaZ(rid){clearG();MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;
 const items=[ORIG.ROS.map(a=>pick(a)),ORIG.ROS.map(a=>pick(a))];const st=[Array(25).fill(0),Array(25).fill(0)],tm=[110+GAME.sec[0],110+GAME.sec[1]],rev=[{},{}];
 cut('host');hostSay('¡Llega la prueba final, <b>A la Z</b>! <b>110 segundos</b> más los acumulados y 25 palabras. Una definición por letra: la palabra empieza por ella o la contiene, y siempre veréis cuántas letras tiene. Con el botón <b>Pista</b> destapas una letra, pero pierdes 5 segundos.');await wait(3.6,rid);
 // elige quien más segundos tiene (empate: naranja)
 let dir=[1,-1];const chooser=GAME.sec[0]>GAME.sec[1]?0:1;
 const ch6=new T.Group();G.add(ch6);const tt=bar(560,64,COL.bl,'¿EN QUÉ ORDEN?',{fs:30});tt.position.set(0,150,0);ch6.add(tt);
 const sc=bar(560,44,COL.or,`AZUL ${GAME.sec[0]} s · NARANJA ${GAME.sec[1]} s`,{fs:22});sc.position.set(0,88,0);ch6.add(sc);
 const oA=bar(260,90,COL.or,'A → Z',{fs:44}),oZ=bar(260,90,COL.or,'Z → A',{fs:44});oA.position.set(-145,-10,0);oZ.position.set(145,-10,0);oA.userData.tap=1;oZ.userData.tap=-1;ch6.add(oA,oZ);
 const who=bar(560,44,chooser?COL.or:COL.bl,`ELIGE ${chooser?'NARANJA':'AZUL'}${GAME.sec[0]==GAME.sec[1]?' (EMPATE)':''} · EL RIVAL JUEGA AL REVÉS`,{fs:20});who.position.set(0,-95,0);ch6.add(who);
 let d;if(chooser==0){hostSay('Tienes más segundos: ¿de la <b>A a la Z</b> o de la <b>Z a la A</b>? Tu rival jugará en el orden contrario.');d=await new Promise(r=>{TAP=v=>{if(v===1||v===-1){TAP=null;setActs();r(v);}};setActs([{t:'A → Z',cls:'y',cb:()=>{TAP=null;r(1);}},{t:'Z → A',cb:()=>{TAP=null;r(-1);}}]);});setActs();}
 else{hostSay(`El equipo naranja tiene más segundos${GAME.sec[0]==GAME.sec[1]?' (empate: elige naranja)':''} y elige el orden...`);await wait(V6.choiceWait||2.2,rid);d=Math.random()<.5?1:-1;}
 (d>0?oA:oZ).setC(chooser?COL.or:COL.bl);(d>0?oZ:oA).setC(chooser?COL.bl:COL.or);sfx('ok');
 const yo=chooser==0?d:-d;hostSay(`Tú juegas ${yo>0?'de la <b>A a la Z</b>':'de la <b>Z a la A</b>'} y naranja ${yo>0?'de la Z a la A':'de la A a la Z'}.`);dir=[yo,-yo];await wait(V6.choiceWait2||2.4,rid);G.remove(ch6);
 chk(rid);const pos=[dir[0]>0?0:24,dir[1]>0?0:24];setPeople(true);
 const g=alazBar6();g.position.set(0,-245,0);G.add(g);const tmr=tvTimer();tmr.position.set(GW/2-110,-120,20);G.add(tmr);const hits=bar(64,46,COL.gr,'0',{fs:28});hits.position.set(GW/2-200,-120,20);G.add(hits);
 let turn=0;const next=p=>{for(let k=0;k<25;k++){const i=(pos[p]+dir[p]*k+50)%25;if(st[p][i]==0)return i;}return -1;};
 const alive=p=>tm[p]>0&&st[p].some(x=>x==0);
 const shape=(p,i)=>{const w=items[p][i][0][0];return [...w].map((ch,j)=>ch==' '?' ':(j==0&&norm(ch)==LETRAS[i])||rev[p][i]===j||(norm(ch)==LETRAS[i]&&rev[p]['c'+i]===j)?ch:'_').join(' ');};
 const show=p=>{cut(p?'orange':'blue');tmr.set(Math.ceil(tm[p]));tmr.max=110+GAME.sec[p];hits.setT(String(st[p].filter(x=>x==1).length));};
 show(0);
 while(alive(0)||alive(1)){chk(rid);if(!alive(turn)){turn=1-turn;show(turn);continue;}
  const i=next(turn);pos[turn]=i;const [ans,def]=items[turn][i],L=LETRAS[i],starts=norm(ans[0]).startsWith(L);
  if(!starts&&rev[turn]['c'+i]===undefined){rev[turn]['c'+i]=[...ans[0]].findIndex(ch=>norm(ch)==L);}
  const f=Math.max(.15,Math.min(.85,tm[0]/(tm[0]+tm[1]||1)));
  g.upd({st:st[turn],cur:i,f,txt:(turn?'NARANJA':'AZUL')+' · '+(starts?'EMPIEZA POR ':'CONTIENE LA ')+L,word:shape(turn,i)});
  hostSay(`<b>${starts?'Empieza por':'Contiene la'} ${L}:</b> ${def.charAt(0)+def.slice(1).toLowerCase()}`);
  let res;
  if(turn==0){let pasa=false,letra=false;const acts=()=>setActs([{t:'Pasapalabra',ic:'⟳',cls:'y',cb:()=>{pasa=true;askEnd('');}},...(rev[0][i]===undefined&&tm[0]>5?[{t:'Pista (−5 s)',ic:'💡',cb:()=>{letra=true;askEnd('');}}]:[])]);acts();
   let on=true;anim(dt=>{if(!on||rid!==RUN)return false;tm[0]-=dt;tmr.set(Math.max(0,Math.ceil(tm[0])));return true;});
   let v;while(true){v=await ask(()=>tm[0]<=0||rid!==RUN);if(letra){letra=false;const hid=[...ans[0]].map((ch,j)=>j).filter(j=>shape(0,i).split(' ')[j]=='_'&&ans[0][j]!=' ');if(hid.length){rev[0][i]=pick(hid);tm[0]-=5;sfx('splash');{const m5=bar(150,70,COL.rd,'−5 s',{fs:38});m5.position.set(-GW/2+90,-150,30);G.add(m5);tween(1.6,k=>{m5.position.y=-150+k*60;}).then(()=>G.remove(m5));}g.upd({word:shape(0,i)});}acts();continue;}break;}
   on=false;setActs();chk(rid);res=v===null?'time':pasa||!norm(v)?'pasa':ans.some(a=>norm(a)===norm(v))?'ok':'ko';}
  else{const d=rnd(1.4,2.6);await tween(d,()=>{},x=>x);tm[1]-=d;tmr.set(Math.max(0,Math.ceil(tm[1])));chk(rid);const r=Math.random();res=tm[1]<=0?'time':r<.68?'ok':r<.85?'pasa':'ko';say(res=='pasa'?'<b>«¡Pasapalabra!»</b>':`Naranja responde: <b>${res=='ok'?ans[0]:'…'}</b>`);await wait(.6,rid);}
  if(res=='ok'){st[turn][i]=1;sfx('ok');hits.setT(String(st[turn].filter(x=>x==1).length));g.upd({word:ans[0].toUpperCase()});pos[turn]=(i+dir[turn]+25)%25;continue;}
  if(res=='ko'){st[turn][i]=2;sfx('error');g.upd({word:ans[0].toUpperCase()});say(`La respuesta correcta: <b>${ans[0]}</b>`);await wait(1.6,rid);}
  if(res=='pasa'){sfx('splash');pos[turn]=(i+dir[turn]+25)%25;}
  if(alive(1-turn)){turn=1-turn;show(turn);await wait(.4,rid);}}
 say();setActs();const a=[0,1].map(p=>st[p].filter(x=>x==1).length),fl=[0,1].map(p=>st[p].filter(x=>x==2).length);GAME.ac=a;GAME.res=a;
 if(a[0]==25){music('winner');await bote(rid,true);}else{const win=a[0]>a[1]||(a[0]==a[1]&&fl[0]<fl[1]);const tie=a[0]==a[1]&&fl[0]==fl[1];sfx(win||tie?'winner':'loser');
  hostSay(tie?'¡Empate a aciertos y fallos! Os repartís los <b>1.200 euros</b>: 600 para cada uno.':win?`¡Ganas A la Z con <b>${a[0]}</b> aciertos! Te llevas <b>1.200 euros</b>.`:`Gana el naranja con <b>${a[1]}</b> aciertos. ¡Mañana, a la <b>silla azul</b>!`);await wait(3,rid);}
 await wait(1,rid);clearG();setPeople(false);}
// ---------- cabecera de A la Z (recreada del vídeo, con la cortinilla de Telecinco) ----------
async function alazCab(rid){clearG();say();sfx('cortinilla');const g=new T.Group();G.add(g);const H=720,Wd=GW+40;
 const bg=label(Wd,H,(c,cw,ch)=>{const gr=c.createRadialGradient(cw/2,ch/2,10,cw/2,ch/2,cw*.7);gr.addColorStop(0,'#38b4ff');gr.addColorStop(1,'#0f66d8');c.fillStyle=gr;c.fillRect(0,0,cw,ch);
  for(let i=0;i<70;i++){c.globalAlpha=.12+Math.random()*.18;c.strokeStyle='#bfe6ff';c.lineWidth=2+Math.random()*3;c.beginPath();c.arc(Math.random()*cw,Math.random()*ch,4+Math.random()*16,0,7);c.stroke();}c.globalAlpha=1;});bg.position.z=-40;bg.renderOrder=-5;g.add(bg);
 const fl=[];const CL=['#ff7a1a','#c06bff','#7fdcff','#1f4fd0','#fff'];for(let i=0;i<26;i++){const ch=pick(LETRAS),col=pick(CL);const L=label(70,70,(c,cw,h)=>{ftxt(c,ch,cw/2,h/2,h*.8,col,'center',cw,0);});L.position.set(rnd(-GW/2,GW/2),rnd(-320,320),-30);L.v=rnd(20,60);L.material.opacity=.6;g.add(L);fl.push(L);}
 const tile=(ch)=>{const t=new T.Group();const b=label(230,260,(c,cw,h,k)=>{c.fillStyle='rgba(0,40,120,.35)';c.beginPath();c.roundRect(8*k,14*k,cw-8*k,h-14*k,22*k);c.fill();const gr=c.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#ffffff');gr.addColorStop(1,'#cfe2ff');c.fillStyle=gr;c.beginPath();c.roundRect(0,0,cw-12*k,h-16*k,22*k);c.fill();c.strokeStyle='#8fb6ff';c.lineWidth=5*k;c.stroke();
   c.fillStyle='#1f4fd0';c.beginPath();c.roundRect(14*k,14*k,cw-40*k,h-44*k,16*k);c.fill();ftxt(c,ch,(cw-12*k)/2,(h-16*k)/2+4*k,h*.62,'#fff','center',cw,0);});t.add(b);return t;};
 const A=tile('A'),Z=tile('Z');A.position.set(-200,50,0);Z.position.set(200,50,0);A.scale.setScalar(.01);Z.scale.setScalar(.01);g.add(A,Z);ro6(A,5);ro6(Z,5);
 const la=label(110,84,(c,cw,h)=>ftxt(c,'la',cw/2,h/2,h*.75,'#fff','center',cw,0));la.position.set(0,40,0);la.material.opacity=0;g.add(la);
 const arr=(dirL,y)=>{const L=label(110,40,(c,cw,h,k)=>{c.strokeStyle='#1f3f9a';c.fillStyle='#1f3f9a';c.lineWidth=6*k;c.beginPath();c.moveTo(10*k,h/2);c.lineTo(cw-10*k,h/2);c.stroke();const x=dirL?10*k:cw-10*k,s=dirL?1:-1;c.beginPath();c.moveTo(x,h/2);c.lineTo(x+s*20*k,h/2-14*k);c.lineTo(x+s*20*k,h/2+14*k);c.fill();});L.position.set(0,y,0);L.material.opacity=0;g.add(L);return L;};
 const a1=arr(true,150),a2=arr(false,-50);
 const RN6={n:0};const row=label(1000,58,(c,cw,h,k)=>{const n=27,tw=cw/n;'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ'.split('').forEach((ch,i)=>{if(i>=RN6.n)return;c.fillStyle='#fff';c.fillRect(i*tw+1*k,4*k,tw-2*k,h-8*k);c.strokeStyle='#1f4fd0';c.lineWidth=2*k;c.strokeRect(i*tw+1*k,4*k,tw-2*k,h-8*k);ftxt(c,ch,i*tw+tw/2,h/2,h*.6,'#1f4fd0');});});row.position.set(0,-150,0);g.add(row);
 let t=0;const D=7.5;
 try{await tween(D,e=>{t=e*D;fl.forEach(L=>{L.position.y+=L.v*.016;if(L.position.y>360)L.position.y=-360;});
  const ein=x=>Math.max(0,Math.min(1,x)),bo=x=>{x=ein(x);return 1+2.7*Math.pow(x-1,3)+1.7*Math.pow(x-1,2);};
  A.scale.setScalar(Math.max(.01,bo((t-1.2)/.5)));Z.scale.setScalar(Math.max(.01,bo((t-1.6)/.5)));la.material.opacity=a1.material.opacity=a2.material.opacity=ein((t-1.9)/.4);
  const n=Math.floor(ein((t-2.1)/.9)*27);if(n!==RN6.n){RN6.n=n;row.set();}
  A.rotation.y=t>4.3&&t<5.1?(t-4.3)/.8*PI*2:0;if(t>5.1&&t<5.6)A.rotation.z=Math.sin((t-5.1)/.5*PI)*.3;
  if(t>6.3){const k=ein((t-6.3)/.9);g.position.x=-k*GW*1.2;g.scale.y=1-k*.4;}},x=>x);}
 finally{G.remove(g);clearG();}}
function ro6(o,n){o.traverse(m=>m.renderOrder=n);}
// prueba final seleccionable: El Rosco o A la Z
OPT.final=OPT.final||'rosco';
{const _r=rosco;const R6=async function(rid){return (OPT.final=='alaz')?alaZ(rid):_r(rid);};
 for(const y in ETAPAS)ETAPAS[y].pr.forEach(p=>{if(p[1]===_r)p[1]=R6;});rosco=R6;
 const _pc=playCort;playCort=async function(id,rid){if(id=='rosco'&&OPT.final=='alaz')return alazCab(rid);return _pc(id,rid);};
 const _vz=voz;voz=async function(k,rid){if(OPT.final=='alaz'&&/^rosco_/.test(k)){if(k=='rosco_pre'){cut('host');hostSay('Y ahora, la prueba final: ¡<b>A la Z</b>!');await wait(2.2,rid);}return true;}return _vz(k,rid);};}
// botón en el menú principal
{const _sm=showMenu;showMenu=function(s='main'){const r=_sm(s);if(s=='opt'){const c0=menu.querySelector('.tbtn');const host=c0?c0.parentNode.parentNode:menu.querySelector('.mbtn')&&menu.querySelector('.mbtn').parentNode;if(host){const d=document.createElement('div');d.className='mtext';d.innerHTML='<b>Prueba final</b> (programas y especiales; los segundos de las pruebas se suman a la final): '+[['rosco','El Rosco'],['alaz','A la Z']].map(([k,n])=>`<button class="tbtn ${OPT.final==k?'on':''}" data-f6="${k}">${n}</button>`).join(' ');d.querySelectorAll('[data-f6]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();OPT.final=b.dataset.f6;saveOpt();sfx('ok');showMenu('opt');});host.insertBefore(d,host.children[2]||null);}}
 if(s=='main'){const col=menu.querySelector('.mbtn')&&menu.querySelector('.mbtn').parentNode;if(col){const b=document.createElement('div');b.className='mbtn';b.innerHTML=`<span class="ic">🔠</span><div>Prueba final: <b>${OPT.final=='alaz'?'A la Z':'El Rosco'}</b><small>Toca para cambiar entre El Rosco y A la Z (2026)</small></div>`;b.onpointerdown=e=>{e.preventDefault();OPT.final=OPT.final=='alaz'?'rosco':'alaz';saveOpt();sfx('ok');showMenu('main');};col.insertBefore(b,col.children[2]||null);}}return r;};}
for(const y in ETAPAS)ETAPAS[y].pr.forEach(p=>{if(p[0]=='coco')p[1]=cocoLoco;if(p[0]=='u4')p[1]=unaDeCuatro;});
Object.assign(window.DBG||{},{cocoLoco,unaDeCuatro,alaZ,alazCab,tvTimer});
