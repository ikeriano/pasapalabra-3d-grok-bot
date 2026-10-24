// ======================================================================
//  ETAPAS 2011 · 2014 · 2017 · 2019 (Telecinco) — platós, cortinillas y pruebas
// ======================================================================
const ETAPAS={
 2007:{names:'La Escalera, El Pulsador, De Par en Par, La Palabra Imposible y El Rosco',pr:[['escalera',escalera],['pulsador',pulsador],['depar',depar],['imposible',imposible],['rosco',rosco]]},
 2011:{names:'Letra a letra, La Pista, Palabras Cruzadas, ¿Qué es Qué? y El Rosco',pr:[['letra',letraALetra],['pista',laPista],['cruzadas',palabrasCruzadas],['quees',queEsQue],['rosco',rosco]]},
 2014:{names:'Letra a letra, La Pista, Coco Loco, ¿Qué es Qué? y El Rosco',pr:[['letra',letraALetra],['pista',laPista],['coco',cocoLoco],['quees',queEsQue],['rosco',rosco]]},
 2017:{names:'Letra a letra, La Pista, Coco Loco, ¿Qué es Qué? y El Rosco',pr:[['letra',letraALetra],['pista',laPista],['coco',cocoLoco],['quees',queEsQue],['rosco',rosco]]},
 2019:{blue:1,names:'Una de Cuatro, La Pista musical, Sopa de Letras, ¿Dónde Están? y El Rosco',pr:[['u4',unaDeCuatro],['pista',laPista],['sopa',sopaDeLetras],['donde',dondeEstan],['rosco',rosco]],
  lines:{u4:'Comenzamos, primera prueba, <b>Una de Cuatro</b>',pista:'Seguimos jugando, <b>pista musical</b>',sopa:'Nos vamos a la <b>Sopa de Letras</b>',donde:'Última prueba, últimos segundos en juego, vamos a <b>¿Dónde Están?</b>',rosco:'Vamos al <b>Rosco</b> final de Pasapalabra'}}};

// ---------- utilidades ----------
function prep(){clearG();MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;TAP=null;setActs();}
function clockRun(st,tm,rid){st.on=true;anim(dt=>{if(!st.on||rid!==RUN)return false;st.t-=dt;tm.set(Math.max(0,Math.ceil(st.t)));return true;});}
async function soloEnd(ac,rid){say();setActs();TAP=null;chk(rid);sfx('winner');GAME.sec[0]+=ac*5;GAME.ac[0]+=ac;
 await rotulo(`AZUL: ${ac} ACIERTOS · +${ac*5} s`,COL.bl,rid);clearG();const c=await cpuTurn('Rival',COL.or,.6,rid);GAME.sec[1]+=c*5;await rotulo(`NARANJA: ${c} ACIERTOS · +${c*5} s`,COL.or,rid);clearG();}
// reloj de cada etapa
function yTimer(){const y=OPT.etapa;
 if(y==2014||y==2017){const g=new T.Group();const L=label(170,110,(c,cw,ch)=>{ftxt(c,String(g.v??''),cw/2,ch/2+6,ch*.9,'#ffd21a','center',cw,ch*.08);});g.add(L);g.set=v=>{if(v===g.v)return;g.v=v;L.set();};g.setC=()=>{};g.set(0);return g;}
 const g=timer(y==2019?COL.bl:COL.or);
 if(y==2011){const dg=new T.CircleGeometry(6,10);for(let i=0;i<11;i++){const a=PI*.1+i/10*PI*.8,d=new T.Mesh(dg,MB(i%2?0xffffff:0xd42020));d.position.set(Math.cos(a)*56/1.32,Math.sin(a)*56,12);g.add(d);}}
 return g;}
function acBox(col){const b=bar(70,46,col,'0',{fs:32});return b;}
// puntos de un texto dibujado (para cortinillas hechas de letras)
function textPts(str,n,w,h,fs){const c=document.createElement('canvas');c.width=w;c.height=h;const g=c.getContext('2d');g.fillStyle='#fff';g.font=`900 ${fs}px N,Arial`;g.textAlign='center';g.textBaseline='middle';g.fillText(str,w/2,h/2);const d=g.getImageData(0,0,w,h).data,pts=[];
 for(let k=0;k<n*40&&pts.length<n;k++){const x=Math.floor(Math.random()*w),y=Math.floor(Math.random()*h);if(d[(y*w+x)*4+3]>128)pts.push([x-w/2,h/2-y]);}return pts;}
function tubeArt(pts,rad,col){const cur=new T.CatmullRomCurve3(pts.map(p=>new T.Vector3(p[0],p[1],0)),false,'catmullrom',.1);const g=new T.TubeGeometry(cur,Math.max(40,pts.length*6),rad,5,false);const m=new T.Mesh(g,MB(col));m.total=g.index.count;m.prog=k=>g.setDrawRange(0,Math.floor(m.total*Math.max(0,Math.min(1,k))/6)*6);m.prog(0);return m;}

// ---------- ARTE DE CORTINILLAS (rojas 2011-2017, azules 2019) ----------
function artLetra(AW){const it=[{ch:'A',p:new T.Vector3(),s:430,r:0,c:0xb9bec9},{ch:'L',p:new T.Vector3(),s:280,r:0,c:0xe6e9ef}];const m=letterCloud(it,{op:.92});
 m.anim=t=>{const k=eout(Math.min(1,t/1.1));it[0].p.set(-AW*.27,-20-(1-k)*700,-80);const k2=eout(Math.min(1,Math.max(0,(t-.7)/1.3)));it[1].p.set(-AW*.27+150+AW*.8*(1-k2),-90,-40);it[1].r=(1-k2)*7;m.upd();};return m;}
function artPista(AW){const g=new T.Group(),cx=-AW*.27,cy=50,R=120,pts=[[cx+44,cy-R-40]];
 for(let i=0;i<=36;i++){const a=-PI/3+i/36*(PI*5/3);pts.push([cx+Math.cos(a)*R,cy+Math.sin(a)*R]);}pts.push([cx-44,cy-R-40]);
 const bulb=tubeArt(pts,6,0xffffff);g.add(bulb);const fil=tubeArt([[cx-30,cy-30],[cx-15,cy+10],[cx,cy-30],[cx+15,cy+10],[cx+30,cy-30]],4,0xffffff);g.add(fil);
 const sc=[];for(let i=0;i<3;i++){const s=tubeArt([[cx-46,cy-R-50-i*20],[cx+46,cy-R-50-i*20]],5,0xffffff);g.add(s);sc.push(s);}
 const rays=[];for(let i=0;i<7;i++){const a=PI*.15+i*PI*.7/6,r=tubeArt([[cx+Math.cos(a)*(R+20),cy+Math.sin(a)*(R+20)],[cx+Math.cos(a)*(R+55),cy+Math.sin(a)*(R+55)]],4,0xfff3a0);g.add(r);rays.push(r);}
 g.anim=t=>{bulb.prog(t/1.5);fil.prog((t-1.3)/.6);sc.forEach((s,i)=>s.prog((t-1.4-i*.15)/.4));rays.forEach(r=>r.prog(t>2.1?(Math.sin(t*8)>-.3?1:0):0));};return g;}
function artCruz(AW){const g=new T.Group(),m=new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.6}),hs=[],vs=[];
 for(let i=0;i<7;i++){const l=new T.Mesh(new T.PlaneGeometry(AW*1.4,5),m);l.y0=-300+i*100;g.add(l);hs.push(l);}
 for(let i=0;i<11;i++){const l=new T.Mesh(new T.PlaneGeometry(5,900),m);l.x0=-AW*.6+i*AW*.12;g.add(l);vs.push(l);}
 const it=[];for(let i=0;i<24;i++)it.push({ch:pick([...AL]),p:new T.Vector3(),s:34,r:0,c:0xffffff,h:Math.floor(rnd(0,7)),v:Math.floor(rnd(0,11))});const lc=letterCloud(it,{op:.9});g.add(lc);
 g.anim=t=>{const k=eout(Math.min(1,t/1.2));hs.forEach((l,i)=>l.position.set((i%2?1:-1)*(1-k)*AW*1.4,l.y0,-20));vs.forEach((l,i)=>l.position.set(l.x0,(i%2?1:-1)*(1-k)*900,-20));
  const k2=Math.min(1,Math.max(0,(t-1)/1));it.forEach(x=>{x.p.set(-AW*.6+x.v*AW*.12,-300+x.h*100,-10);x.s=34*k2;});lc.upd();};return g;}
function artQuees(AW){const pts=textPts('¿   ?',340,1000,560,520);const it=pts.map(p=>({ch:pick([...AL]),p:new T.Vector3(),to:new T.Vector3(p[0]*1.1,p[1]*1.1,-60),fr:new T.Vector3(rnd(-1500,1500),rnd(-900,900),rnd(-800,300)),s:20,r:rnd(-.5,.5),c:0xffffff}));const m=letterCloud(it,{op:.7});
 m.anim=t=>{it.forEach((x,i)=>{const k=eout(Math.min(1,Math.max(0,(t-i/it.length*.5)/1.2)));x.p.lerpVectors(x.fr,x.to,k);});m.upd();};return m;}
function artCoco(AW,blue){const g=new T.Group(),pk=blue?'#bfe0ff':'#ffb3c6';
 const pl=label(330,420,(c,cw,ch,k)=>{c.strokeStyle=pk;c.lineCap='round';c.lineWidth=14*k;c.beginPath();c.moveTo(cw*.42,ch*.98);c.quadraticCurveTo(cw*.36,ch*.6,cw*.5,ch*.3);c.stroke();
  c.lineWidth=10*k;for(const [dx,dy] of [[-.32,.05],[-.28,-.1],[0,-.2],[.28,-.1],[.32,.06]]){c.beginPath();c.moveTo(cw*.5,ch*.3);c.quadraticCurveTo(cw*(.5+dx*.6),ch*(.3+dy-.12),cw*(.5+dx),ch*(.3+dy+.08));c.stroke();}
  c.fillStyle=pk;for(const dx of [-.04,.04])c.beginPath(),c.arc(cw*(.5+dx),ch*.34,12*k,0,PI*2),c.fill();
  // muñeco con globos
  c.lineWidth=6*k;c.beginPath();c.arc(cw*.8,ch*.78,14*k,0,PI*2);c.stroke();c.beginPath();c.moveTo(cw*.8,ch*.82);c.lineTo(cw*.8,ch*.92);c.moveTo(cw*.74,ch*.98);c.lineTo(cw*.8,ch*.92);c.lineTo(cw*.86,ch*.98);c.moveTo(cw*.72,ch*.85);c.lineTo(cw*.88,ch*.85);c.stroke();
  for(const [bx,by] of [[.7,.55],[.8,.5],[.9,.56]]){c.beginPath();c.moveTo(cw*.86,ch*.85);c.lineTo(cw*bx,ch*(by+.05));c.stroke();c.beginPath();c.ellipse(cw*bx,ch*by,14*k,18*k,0,0,PI*2);c.fill();}});
 pl.position.set(-AW*.27,-10,-30);g.add(pl);
 const o=new T.Mesh(new T.TorusGeometry(54,13,10,40),MP(0xffffff,120));o.position.set(AW*.36,-80,40);g.add(o);
 g.anim=t=>{const k=eback(Math.min(1,t/1));pl.scale.setScalar(Math.max(.01,k));o.rotation.y=t*3.2;o.rotation.x=.3;o.scale.setScalar(Math.max(.01,eback(Math.min(1,Math.max(0,(t-.5)/.8)))));};return g;}
// 2019
function ovalMesh(w,h,col){const m=new T.Mesh(ext(rrShape(w,h,h/2),6,3),MP(col,70));return m;}
function artU4(AW){const g=new T.Group(),ov=[];[[-1,1],[1,1],[-1,-1],[1,-1]].forEach(([sx,sy],i)=>{const o=new T.Group();o.add(ovalMesh(170,70,COL.or));const L=label(170,70,(c,cw,ch)=>ftxt(c,'?',cw/2,ch/2+3,ch*.8,'#fff'));L.position.z=12;o.add(L);o.position.set(-AW*.27+sx*100,sy*55,0);g.add(o);ov.push(o);});
 g.anim=t=>{ov.forEach((o,i)=>{const k=Math.min(1,Math.max(0,(t-i*.25)/.6));o.scale.setScalar(Math.max(.01,eback(k)));o.rotation.y=(1-k)*3+Math.sin(t*2+i)*.15;});};return g;}
function noteLabel(n){return label(80,110,(c,cw,ch)=>{c.fillStyle='#fff';c.strokeStyle='#fff';c.lineWidth=cw*.07;c.beginPath();c.ellipse(cw*.32,ch*.8,cw*.2,ch*.1,-.4,0,PI*2);c.fill();c.beginPath();c.moveTo(cw*.5,ch*.78);c.lineTo(cw*.5,ch*.1);c.stroke();
 if(n){c.beginPath();c.ellipse(cw*.78,ch*.7,cw*.18,ch*.09,-.4,0,PI*2);c.fill();c.beginPath();c.moveTo(cw*.94,ch*.68);c.lineTo(cw*.94,ch*.05);c.stroke();c.lineWidth=cw*.12;c.beginPath();c.moveTo(cw*.5,ch*.12);c.lineTo(cw*.94,ch*.06);c.stroke();}else{c.beginPath();c.moveTo(cw*.5,ch*.1);c.quadraticCurveTo(cw*.85,ch*.25,cw*.75,ch*.5);c.stroke();}});}
function artNotes(AW){const g=new T.Group(),m=new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.65}),ln=[];for(let i=0;i<5;i++){const l=new T.Mesh(new T.PlaneGeometry(AW*1.3,4),m);l.position.set(0,-200+i*26,-30);g.add(l);ln.push(l);}
 const ns=[];for(let i=0;i<9;i++){const n=noteLabel(i%2);n.x0=-AW*.7+i*AW*.17;n.y0=-215+((i*37)%5)*26+40;g.add(n);ns.push(n);}
 g.anim=t=>{ln.forEach(l=>l.scale.x=Math.max(.01,eout(Math.min(1,t/1))));ns.forEach((n,i)=>{n.position.set(n.x0-t*60,n.y0+Math.sin(t*3+i)*10,0);n.scale.setScalar(Math.max(.01,Math.min(1,(t-.4-i*.08)*3)));});};return g;}
function artSopa(AW){const g=new T.Group(),rows=[];for(let r=0;r<5;r++){const L=label(330,64,(c,cw,ch,k)=>{for(let i=0;i<5;i++){const x=i*cw/5+4*k,w=cw/5-8*k;c.fillStyle=(r+i)%3==0?'#3fbf3f':'#ffffff';c.beginPath();c.roundRect(x,4*k,w,ch-8*k,10*k);c.fill();ftxt(c,pick([...AL]),x+w/2,ch/2+2*k,ch*.55,(r+i)%3==0?'#fff':'#1440b0');}});L.position.set(-AW*.27,130-r*66,0);g.add(L);rows.push(L);}
 g.anim=t=>{rows.forEach((L,i)=>{const k=Math.min(1,Math.max(0,(t-i*.15)/.5));L.rotation.x=(1-eout(k))*PI/2;L.visible=k>0;});};return g;}
function artDonde(AW){const g=new T.Group(),ov=[];for(let i=0;i<9;i++){const o=new T.Group();o.add(ovalMesh(110,52,COL.or));const L=label(110,52,(c,cw,ch)=>ftxt(c,String(i+1),cw/2,ch/2+3,ch*.75,'#fff'));L.position.z=12;o.add(L);o.position.set(-AW*.27+(i%3-1)*130,(1-Math.floor(i/3))*72,0);g.add(o);ov.push(o);}
 g.anim=t=>{ov.forEach((o,i)=>{const k=Math.min(1,Math.max(0,(t-i*.1)/.5));o.scale.setScalar(Math.max(.01,eback(k)));o.rotation.y=(1-k)*PI;});};return g;}
Object.assign(CORT,{
 letra:{title:['Letra','a letra'],tx:.1,ty:0,fs:76,al:'left',mk:artLetra},
 pista:{title:['La Pista'],tx:.1,ty:-.02,fs:80,al:'left',mk:artPista},
 pistaB:{title:['La Pista','musical'],tx:.1,ty:0,fs:76,al:'left',mk:artNotes},
 cruzadas:{title:['Palabras','Cruzadas'],tx:0,ty:0,fs:76},
 quees:{title:['¿Qué es','Qué?'],tx:0,ty:0,fs:84,mk:artQuees},
 coco:{title:['Coco Loco'],tx:.08,ty:0,fs:80,al:'left',mk:artCoco},
 u4:{title:['Una de','Cuatro'],tx:.1,ty:0,fs:80,al:'left',mk:artU4},
 sopa:{title:['Sopa de','Letras'],tx:.1,ty:0,fs:80,al:'left',mk:artSopa},
 donde:{title:['¿Dónde','Están?'],tx:.1,ty:0,fs:80,al:'left',mk:artDonde},
 roscoB:{title:['El','Rosco'],tx:0,ty:0,fs:100}});
CORT.cruzadas.mk=artCruz;

// ---------- PLATÓS ----------
const PLC={};
function radTex(stops){return cv(1024,1024,(g,w)=>{const c=w/2,gr=g.createRadialGradient(c,c,0,c,c,c);stops.forEach(([o,col])=>gr.addColorStop(o,col));g.fillStyle=gr;g.fillRect(0,0,w,w);});}
function scrTexY(y){return cv(1024,512,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,y>=2014?'#4aa0ff':'#3d8dfa');gr.addColorStop(1,y>=2019?'#0d3aa8':'#1f5fd8');g.fillStyle=gr;g.fillRect(0,0,w,h);
 g.globalAlpha=.22;for(let i=0;i<70;i++)ftxt(g,pick([...AL]),rnd(0,w),rnd(0,h),rnd(18,46),'#fff');g.globalAlpha=1;
 scrBall(g,w,h,y>=2014);});}
function wallTexY(y){return cv(512,256,(g,w,h)=>{const L=y==2011?'SSSS':'PASA';for(let i=0;i<4;i++){const x=i*128;const gr=g.createLinearGradient(x,0,x+128,h);
 if(y==2011){gr.addColorStop(0,'#e4e8ee');gr.addColorStop(1,'#9aa3b0');}else{gr.addColorStop(0,y>=2019?'#2f7cf5':'#4a98ff');gr.addColorStop(1,y>=2019?'#0d3aa8':'#1d5ed6');}
 g.fillStyle=gr;g.fillRect(x+4,4,120,h-8);ftxt(g,L[i],x+64,h/2,y==2011?150:110,y==2011?'#c8ced8':'rgba(255,255,255,.55)','center',120,0);if(y==2011){g.strokeStyle='#8f98a6';g.lineWidth=3;g.strokeText(L[i],x+64,h/2);}}});}
function applyPlato(y){if(!P.fl)return;if(!P.orig)P.orig={fl:P.fl.material.map,scr:P.scr.material.map,wall:P.walls[0].material.map,bg:S.background.getHex()};
 let c;if(y==2007)c={fl:P.orig.fl,scr:P.orig.scr,wall:P.orig.wall};
 else c=PLC[y]||(PLC[y]={fl:y==2011?radTex([[0,'#f2f4f8'],[.15,'#e6eaf0'],[.17,'#7fb2ff'],[.19,'#2f6cff'],[.21,'#d6dbe3'],[.3,'#b8bfca'],[.32,'#4a7ff0'],[.34,'#8c95a5'],[.6,'#5b6474'],[1,'#252b38']]):
   radTex([[0,'#f4f8ff'],[.15,'#e8f0ff'],[.17,'#8fc0ff'],[.19,'#1f6aff'],[.21,'#dfe9fb'],[.29,'#c6d6f2'],[.31,y>=2019?'#ff9a2a':'#3a8bff'],[.33,'#7f9fd8'],[.6,'#2f4f9a'],[1,'#0a1a48']]),
   scr:scrTexY(y),wall:(()=>{const t=wallTexY(y);t.wrapS=T.RepeatWrapping;t.repeat.set(-6,1);return t;})()});
 P.fl.material.map=c.fl;P.scr.material.map=c.scr;P.sideS.forEach(m=>m.material.map=c.scr);P.walls.forEach(m=>m.material.map=c.wall);[P.fl,P.scr,...P.sideS,...P.walls].forEach(m=>m.material.needsUpdate=true);
 P.frame.material.color.setHex(y==2011?0xc0141c:y>=2014?0x1a3c9a:0xd0d6e2);
 const lc=y==2011?0x6aa8ff:y>=2019?0x2a7bff:y>=2014?0x3f9bff:0x5aa0ff;[P.band,P.led,P.cring].forEach(m=>m.material.color.setHex(lc));P.glow.material.color.setHex(y>=2019?0xff8a1a:lc);
 const bg=y==2011?0x1a2232:y>=2019?0x06123a:y>=2014?0x0c2260:P.orig.bg;S.background.setHex(bg);S.fog.color.setHex(bg);
 if(!P.atr){P.atr=new T.Group();const tg=new T.TorusGeometry(.2,.035,6,20);for(const sx of[-1,1])for(let i=0;i<9;i++){const r=new T.Mesh(tg,MB(i%2?0xff8a1a:0x2a7bff));r.rotation.x=PI/2;r.position.set(sx*1.7,.15+i*.2,-5.1);P.atr.add(r);}P.root.add(P.atr);}
 P.atr.visible=y>=2019;}

// ---------- LETRA A LETRA (2011: barras naranjas · 2014-2017: bolas naranjas que suben) ----------
async function letraALetra(rid){prep();const old=OPT.etapa==2011,words=shuffle(D2.LAL);let wi=0,ac=0;const st={t:60};
 cut('host');hostSay('<b>Letra a letra</b>: las letras de la palabra aparecen una a una. ¡Escríbela en cuanto la sepas!');await wait(3.2,rid);
 cut('blue');const tm=yTimer();tm.position.set(-GW/2+130,-255,20);G.add(tm);tm.set(60);const acb=acBox(COL.or);acb.position.set(GW/2-90,-255,20);G.add(acb);
 const stack=new T.Group();G.add(stack);const balls=new T.Group();G.add(balls);const bg=new T.SphereGeometry(17,14,10),bm=MP(COL.or,90);
 clockRun(st,tm,rid);
 while(st.t>0&&wi<words.length){const [w,def]=words[wi++];const b=bar(Math.max(240,w.length*30+60),48,COL.or,'',{fs:28});
  if(old){if(stack.children.length>=6)stack.remove(stack.children[0]);stack.children.forEach((c,i)=>c.position.y=-170+i*60);b.position.set(-GW/2+280,-170+stack.children.length*60,0);stack.add(b);}
  else{b.position.set(-GW/2+300,-170,0);G.add(b);}
  let shown=1;b.hl=(c,cw,ch,k)=>{const sp=27*k,x0=cw/2-(w.length-1)*sp/2;for(let i=0;i<w.length;i++)ftxt(c,i<shown||b.all?w[i]:'_',x0+i*sp,ch/2+2*k,25*k,b.all&&i>=shown?'#8dff7a':'#fff');};b.L.set();
  b.scale.set(.01,1,1);tween(.3,e=>b.scale.x=e,eback);hostSay(`${def} <b>(${w.length} letras)</b>`);
  let tt=0;anim(dt=>{if(b.all||rid!==RUN)return false;tt+=dt;if(tt>2.4&&shown<w.length-1){tt=0;shown++;b.L.set();}return true;});
  const a=await ask(()=>st.t<=0||rid!==RUN);chk(rid);b.all=true;b.L.set();if(a===null)break;
  const ok=norm(a)===norm(w);sfx(ok?'ok':'error');
  if(ok){ac++;acb.setT(String(ac));if(!old){const s=new T.Mesh(bg,bm);s.position.set(-GW/2+60,-400,10);balls.add(s);const ty=-170+(balls.children.length-1)*40;tween(.5,e=>s.position.y=-400+(ty+400)*e,eback);}}
  else{b.setC(COL.rd);hostSay(`Era <b>${w}</b>. ¡A por la siguiente!`);await wait(1.1,rid);}
  if(!old){await wait(.4,rid);G.remove(b);}}
 st.on=false;await soloEnd(ac,rid);}

// ---------- LA PISTA (pantalla partida, bombillas) ----------
function bulbs(){for(const p of [P.ply,P.cpu]){if(p.bulb)continue;const g=new T.Group();const gl=new T.Mesh(new T.SphereGeometry(.15,14,10),new T.MeshPhongMaterial({color:p===P.ply?0x2a5ad8:0xd82a1a,shininess:120,transparent:true,opacity:.92}));gl.position.y=.2;gl.scale.y=1.2;
  const base=new T.Mesh(new T.CylinderGeometry(.07,.08,.12,10),MP(0xd8dde6,120));base.position.y=.04;g.add(gl,base);g.gl=gl;g.position.copy(p.pul.position);g.visible=false;P.root.add(g);p.bulb=g;}}
async function laPista(rid){prep();const mus=OPT.etapa==2019,items=shuffle(mus?D2.PISTAM:D2.PISTA).slice(0,4),sc=[0,0];
 cut('host');hostSay(mus?'<b>La Pista musical</b>: van saliendo pistas. ¡Pulsa en cuanto sepas la respuesta!':'<b>La Pista</b>: van saliendo pistas, cada una más fácil. ¡Pulsa antes que tu rival!');await wait(3,rid);
 bulbs();P.ply.bulb.visible=P.cpu.bulb.visible=true;MODE.split=true;
 const late=OPT.etapa>=2014,cL=late?0xf5c518:COL.or,cR=COL.bl;
 const mkFrame=(x0,col)=>{const w=GW/2-14,h=700,g=new T.Group(),th=10;[[0,h/2-th/2,w,th],[0,-h/2+th/2,w,th],[-w/2+th/2,0,th,h],[w/2-th/2,0,th,h]].forEach(([x,y,ww,hh])=>{const m=new T.Mesh(ext(rrShape(ww,hh,2),6,2),MP(col,70));m.position.set(x,y,0);g.add(m);});g.position.set(x0,0,0);G.add(g);};
 mkFrame(-GW/4,COL.or);mkFrame(GW/4,cR===COL.bl&&late?COL.bl:cR);
 const qb=bar(GW*.58,70,COL.pu,'',{fs:26});qb.position.set(0,-286,30);G.add(qb);qb.hl=(c,cw,ch,k)=>{c.strokeStyle='rgba(255,255,255,.35)';c.lineWidth=2*k;for(let i=0;i<5;i++){const y=ch*.18+i*ch*.16;c.beginPath();c.moveTo(10*k,y);c.lineTo(cw-10*k,y);c.stroke();}wrap(c,qb.q||'',cw/2,ch/2,cw-30*k,24*k);};
 const num=bar(56,46,COL.pu,'1',{fs:32});num.position.set(0,-222,40);G.add(num);
 const sb=[bar(60,46,COL.bl,'0',{fs:32}),bar(60,46,COL.or,'0',{fs:32})];sb[0].position.set(-GW*.33-30,-280,30);sb[1].position.set(GW*.33+30,-280,30);G.add(...sb);
 const light=(p,on)=>{p.bulb.gl.material.emissive=new T.Color(on?(p===P.ply?0x2a6aff:0xff3a1a):0);};
 for(const [ans,clues] of items){let k=0,who=-1,tt=0;const cpuAt=rnd(1.2,4.2);qb.q=clues[0].toUpperCase();qb.L.set();num.setT('1');qb.scale.y=.01;await tween(.3,e=>qb.scale.y=e,eback);
  TAP=(id,o,e)=>{if(who<0)who=0;};setActs([{t:'¡PULSAR!',ic:'💡',cls:'y',cb:()=>{if(who<0)who=0;}}]);
  await new Promise(r=>anim(dt=>{if(rid!==RUN){r();return false;}tt+=dt;const nk=Math.min(4,Math.floor(tt/3.2));if(nk!==k){k=nk;qb.q=clues[k].toUpperCase();qb.L.set();num.setT(String(k+1));}if(who<0&&tt/3.2>cpuAt)who=1;if(who>=0||tt>16){r();return false;}return true;}));chk(rid);setActs();TAP=null;
  if(who<0){say(`Era <b>${ans}</b>.`);await wait(1.6,rid);continue;}
  const solve=async p=>{light(p===0?P.ply:P.cpu,true);sfx('ok');if(p==0){say('<b>¡Has pulsado tú!</b> Escribe la respuesta.');let tl=12;const v=await ask(()=>(tl-=.016)<=0||rid!==RUN);chk(rid);light(P.ply,false);return v!==null&&norm(v)===norm(ans);}
   say('<b>Pulsa el equipo naranja…</b>');await wait(1.3,rid);const ok=Math.random()<.65;say(`Naranja responde: <b>${ok?ans:pick(items.filter(x=>x[0]!==ans))[0]}</b>`);await wait(1.3,rid);light(P.cpu,false);return ok;};
  const pts=Math.max(1,5-k);let ok=await solve(who);if(ok){sc[who]+=pts;sb[who].setT(String(sc[who]));sfx('ok');say(`¡<b>${ans}</b>! ${pts} ${pts>1?'puntos':'punto'} para el equipo ${who?'naranja':'azul'}.`);await wait(1.6,rid);continue;}
  sfx('error');const o=1-who;say('¡Rebote para el otro equipo!');await wait(.9,rid);ok=await solve(o);if(ok){sc[o]+=1;sb[o].setT(String(sc[o]));sfx('ok');}say(`La respuesta: <b>${ans}</b>.`);await wait(1.6,rid);}
 MODE.split=false;P.ply.bulb.visible=P.cpu.bulb.visible=false;say();clearG();GAME.sec[0]+=sc[0]*2;GAME.sec[1]+=sc[1]*2;GAME.ac[0]+=sc[0];sfx('winner');
 cut('wide');await rotulo(`AZUL ${sc[0]} · NARANJA ${sc[1]} · cada punto, +2 s`,COL.pu,rid);}

// ---------- PALABRAS CRUZADAS ----------
async function palabrasCruzadas(rid){prep();const set=shuffle(D2.CRUZ).slice(0,6);const L=shuffle(set.map((x,i)=>[x[0],i])),Rr=shuffle(set.map((x,i)=>[x[1],i]));const st={t:50};let ac=0,cur=0,sel=null;const done=new Set();
 cut('host');hostSay('<b>Palabras Cruzadas</b>: toca una sílaba de la izquierda y otra de la derecha para formar la palabra de la definición.');await wait(3.4,rid);
 cut({p:V3(1.6,1.75,-.6),l:V3(4.6,1.5,.9),f:30,dr:.04});
 const lb=L.map(([s,i],j)=>{const b=bar(120,46,COL.bl,s,{fs:28});b.position.set(-GW/2+90,215-j*62,0);b.userData.tap='L'+j;b.i=i;G.add(b);return b;});
 const rb=Rr.map(([s,i],j)=>{const b=bar(140,46,COL.bl,s,{fs:28});b.position.set(GW/2-100,215-j*62,0);b.userData.tap='R'+j;b.i=i;G.add(b);return b;});
 const df=bar(GW*.56,62,COL.bl,'',{fs:26});df.position.set(0,-275,10);df.hl=(c,cw,ch,k)=>wrap(c,df.q||'',cw/2,ch/2,cw-30*k,24*k);G.add(df);
 const tm=yTimer();tm.position.set(-GW/2+120,-270,20);G.add(tm);tm.set(50);const acb=acBox(COL.bl);acb.position.set(GW/2-90,-275,20);G.add(acb);
 const show=()=>{while(done.has(cur)&&cur<6)cur++;if(cur<6){df.q=set[cur][2].toUpperCase();df.L.set();}};show();clockRun(st,tm,rid);
 let finish;const end=new Promise(r=>finish=r);let busy=false;
 TAP=async(id,o)=>{if(!id||busy||cur>=6)return;const side=id[0],j=+id.slice(1);const b=side=='L'?lb[j]:rb[j];if(done.has(b.i)&&b.used)return;
  if(!sel||sel.side==side){if(sel)sel.b.setC(COL.bl);sel={side,b};b.setC(COL.or);sfx('ok');return;}
  const a=sel.b,bb=b;sel=null;busy=true;
  if(a.i===cur&&bb.i===cur){a.setC(COL.gr);bb.setC(COL.gr);a.used=bb.used=true;done.add(cur);ac++;acb.setT(String(ac));sfx('ok');say(`¡<b>${set[cur][0]}${set[cur][1]}</b>!`);show();if(done.size>=6)finish();}
  else{a.setC(COL.rd);bb.setC(COL.rd);sfx('error');await wait(.5);if(!a.used)a.setC(COL.bl);if(!bb.used)bb.setC(COL.bl);}busy=false;};
 setActs([{t:'Siguiente',ic:'➜',cb:()=>{let n=cur;for(let k=1;k<=6;k++){const c=(cur+k)%6;if(!done.has(c)){n=c;break;}}cur=n;show();}}]);
 await new Promise(r=>{end.then(r);anim(()=>{if(st.t<=0||rid!==RUN){r();return false;}return done.size<6;});});st.on=false;chk(rid);await wait(.8,rid);await soloEnd(ac,rid);}

// ---------- ¿QUÉ ES QUÉ? ----------
async function queEsQue(rid){prep();const set=pick(D2.QEQ),words=shuffle(set.map((x,i)=>[x[0],i])),defs=shuffle(set.map((x,i)=>[x[1],i]));const st={t:45};let ac=0,di=0;
 cut('host');hostSay('<b>¿Qué es Qué?</b>: cinco palabras curiosas. Toca la palabra que corresponde al significado iluminado.');await wait(3.4,rid);
 cut({p:V3(1.6,1.75,-.6),l:V3(4.6,1.5,.9),f:30,dr:.04});const late=OPT.etapa>=2014,pc=late?COL.or:COL.bl;
 const panel=bar(250,350,pc,'',{bw:6});panel.position.set(GW/2-160,90,-10);G.add(panel);
 const wb=words.map(([w,i],j)=>{const b=bar(220,50,late?COL.orD:COL.blD,w,{fs:26});b.position.set(GW/2-160,225-j*66,10);b.userData.tap=j;b.i=i;G.add(b);return b;});
 const db=defs.map(([d,i],j)=>{const b=bar(GW*.5,40,COL.bl,d.toUpperCase(),{fs:20});b.position.set(-GW*.14,-110-j*50,0);b.i=i;G.add(b);return b;});
 const tm=yTimer();tm.position.set(GW/2-110,-260,20);G.add(tm);tm.set(45);
 const hl=()=>db.forEach((b,j)=>b.setC(j==di?COL.or:b.res==1?COL.gr:b.res==2?COL.rd:COL.bl));hl();clockRun(st,tm,rid);let busy=false;
 TAP=async(id)=>{if(id===null||busy||di>=5)return;busy=true;const b=wb[id],d=db[di];if(b.i===d.i){d.res=1;b.setC(COL.gr);ac++;sfx('ok');}else{d.res=2;b.setC(COL.rd);sfx('error');say(`Era <b>${set[d.i][0]}</b>.`);await wait(.8);b.setC(late?COL.orD:COL.blD);}
  d.setT(`${set[d.i][0]}: ${set[d.i][1].toUpperCase()}`);di++;hl();busy=false;};
 await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN||di>=5){r();return false;}return true;}));st.on=false;chk(rid);await wait(1,rid);await soloEnd(ac,rid);}

// ---------- COCO LOCO (globos y letras ocultas) ----------
function doll(){const g=new T.Group();const sk=MP(0xf0c8a0),sh=MP(0xe23a3a);const b=new T.Mesh(new T.CylinderGeometry(22,30,70,12),sh);b.position.y=-40;const h=new T.Mesh(new T.SphereGeometry(24,14,10),sk);h.position.y=15;const hat=new T.Mesh(new T.ConeGeometry(18,34,10),MP(0x2a6af0));hat.position.y=48;g.add(b,h,hat);
 for(const ex of[-8,8]){const e=new T.Mesh(new T.SphereGeometry(3,6,4),MB(0x1a1410));e.position.set(ex,18,22);g.add(e);}
 g.bal=[];const cols=[0xff3a3a,0x3aa0ff,0x3fd23f,0xffd21a,0xff8a1a,0xc04ad8,0xff6ab0];cols.forEach((c,i)=>{const a=-PI*.35+i/(cols.length-1)*PI*.7,bb=new T.Group();const s=new T.Mesh(new T.SphereGeometry(22,12,10),MP(c,120));s.scale.y=1.2;s.position.set(Math.sin(a)*90,130+Math.cos(a)*50,0);
  const str=new T.Mesh(new T.CylinderGeometry(.8,.8,1,4),MB(0xffffff));const from=new T.Vector3(18,-10,0),to=s.position.clone();str.position.copy(from).lerp(to,.5);str.scale.y=from.distanceTo(to);str.lookAt(to);str.rotateX(PI/2);bb.add(s,str);g.add(bb);g.bal.push(bb);});return g;}
async function cocoLoco(rid){prep();const words=shuffle(D2.COCO);let wi=0,ac=0;const st={t:60};
 cut('host');hostSay('<b>Coco Loco</b>: la palabra está escondida. Cada vez que explota un globo aparece una letra. ¡Adivínala cuanto antes!');await wait(3.4,rid);
 cut('blue');const tm=yTimer();tm.position.set(-GW/2+120,-255,20);G.add(tm);tm.set(60);const acb=acBox(COL.or);acb.position.set(GW/2-90,-255,20);G.add(acb);clockRun(st,tm,rid);
 while(st.t>0&&wi<words.length){const [w,def]=words[wi++];const d=doll();d.position.set(GW/2-200,-40,0);G.add(d);
  const b=bar(Math.max(260,w.length*34+60),54,COL.or,'',{fs:30});b.position.set(-40,-255,10);G.add(b);const order=shuffle([...Array(w.length).keys()]);const vis=new Set();
  b.hl=(c,cw,ch,k)=>{const sp=31*k,x0=cw/2-(w.length-1)*sp/2;for(let i=0;i<w.length;i++)ftxt(c,vis.has(i)||b.all?w[i]:'_',x0+i*sp,ch/2+2*k,28*k,b.all&&!vis.has(i)?'#8dff7a':'#fff');};b.L.set();
  hostSay(`${def} <b>(${w.length} letras)</b>`);let tt=0,bi=0;
  anim(dt=>{if(b.all||rid!==RUN)return false;tt+=dt;if(tt>2.2&&vis.size<w.length-1){tt=0;vis.add(order[vis.size]);b.L.set();const bb=d.bal[bi++%d.bal.length];sfx('splash');tween(.2,e=>bb.scale.setScalar(Math.max(.01,1+e*.5-(e>.6?e*1.5:0)))).then(()=>bb.visible=false);}return true;});
  const a=await ask(()=>st.t<=0||rid!==RUN);chk(rid);b.all=true;b.L.set();if(a===null)break;const ok=norm(a)===norm(w);sfx(ok?'ok':'error');
  if(ok){ac++;acb.setT(String(ac));hostSay(`¡<b>${w}</b>!`);}else{b.setC(COL.rd);hostSay(`Era <b>${w}</b>. ¡Vamos con otra!`);}await wait(1,rid);G.remove(d);G.remove(b);}
 st.on=false;await soloEnd(ac,rid);}

// ---------- UNA DE CUATRO (2019) ----------
async function unaDeCuatro(rid){prep();const [theme,opts,qs0]=pick(D2.U4),qs=shuffle(qs0).slice(0,6);const st={t:40};let ac=0,qi=0;
 cut('host');hostSay(`<b>Una de Cuatro</b>: cada definición corresponde a una de las cuatro respuestas. Tema: <b>${theme}</b>.`);await wait(3.2,rid);
 cut('blue');const th=bar(GW*.42,48,COL.bl,theme,{fs:28});th.position.set(0,-150,0);G.add(th);
 const ov=opts.map((o,i)=>{const b=bar(GW*.19,60,COL.or,o,{fs:26,r:30});b.position.set((i-1.5)*GW*.215,-240,0);b.userData.tap=i;G.add(b);return b;});
 const tm=yTimer();tm.position.set(-GW/2+90,-150,20);G.add(tm);tm.set(40);const acb=acBox(COL.bl);acb.position.set(GW/2-80,-150,20);G.add(acb);clockRun(st,tm,rid);
 const showQ=()=>{if(qi<qs.length)hostSay(`${qs[qi][0]}…`);};showQ();let busy=false;
 TAP=async id=>{if(id===null||busy||qi>=qs.length)return;busy=true;const ok=id===qs[qi][1];ov[id].setC(ok?COL.gr:COL.rd);sfx(ok?'ok':'error');if(ok){ac++;acb.setT(String(ac));}else{ov[qs[qi][1]].setC(COL.gr);}await wait(.8);ov.forEach(o=>o.setC(COL.or));qi++;showQ();busy=false;};
 await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN||qi>=qs.length){r();return false;}return true;}));st.on=false;chk(rid);await wait(.8,rid);await soloEnd(ac,rid);}

// ---------- SOPA DE LETRAS (2019) ----------
function makeSopa(words){for(let tr=0;tr<200;tr++){const g=Array(25).fill(''),pos={};let okAll=true;
  for(const w of words){let placed=false;for(let k=0;k<60&&!placed;k++){const hz=Math.random()<.5,r=Math.floor(Math.random()*(hz?5:6-w.length)),c=Math.floor(Math.random()*(hz?6-w.length:5));const cells=[...w].map((_,i)=>hz?r*5+c+i:(r+i)*5+c);
    if(cells.every((x,i)=>!g[x]||g[x]===w[i])){cells.forEach((x,i)=>g[x]=w[i]);pos[w]=cells;placed=true;}}if(!placed){okAll=false;break;}}
  if(okAll){for(let i=0;i<25;i++)if(!g[i])g[i]=pick([...'ABCDEFGHIJLMNOPRSTUVZ']);return {g,pos};}}return null;}
async function sopaDeLetras(rid){prep();let set,S5;do{set=pick(D2.SOPA);S5=makeSopa(set[1]);}while(!S5);const st={t:50};let ac=0,first=null;const found=new Set();
 cut('host');hostSay(`<b>Sopa de Letras</b>: busca las palabras del tema <b>${set[0]}</b>. Toca la primera y la última letra de cada una.`);await wait(3.4,rid);
 cut({p:V3(1.6,1.75,-.6),l:V3(4.6,1.5,.9),f:30,dr:.04});const cx=GW*.2,cy=60;
 const tiles=S5.g.map((ch,i)=>{const b=bar(58,58,COL.bl,ch,{fs:36,r:8});b.position.set(cx+(i%5-2)*68,cy+(2-Math.floor(i/5))*68,0);b.userData.tap=i;G.add(b);return b;});
 const cl=bar(GW*.4,50,COL.or,'',{fs:26});cl.position.set(-GW*.15,-270,10);G.add(cl);const upd=()=>cl.setT(`${set[0]} · QUEDAN ${set[1].length-found.size}`);upd();
 const tm=yTimer();tm.position.set(-GW/2+90,-270,20);G.add(tm);tm.set(50);const acb=acBox(COL.bl);acb.position.set(GW/2-80,-270,20);G.add(acb);clockRun(st,tm,rid);
 const paint=()=>tiles.forEach((t,i)=>t.setC([...found].some(w=>S5.pos[w].includes(i))?COL.gr:i===first?COL.or:COL.bl));
 TAP=id=>{if(id===null)return;if(first===null){first=id;sfx('ok');paint();return;}const a=first,b=id;first=null;
  const w=set[1].find(w=>!found.has(w)&&((S5.pos[w][0]===a&&S5.pos[w][S5.pos[w].length-1]===b)||(S5.pos[w][0]===b&&S5.pos[w][S5.pos[w].length-1]===a)));
  if(w){found.add(w);ac++;acb.setT(String(ac));sfx('ok');say(`¡<b>${w}</b>!`);upd();}else sfx('error');paint();};
 await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN||found.size>=set[1].length){r();return false;}return true;}));st.on=false;chk(rid);
 set[1].forEach(w=>{if(!found.has(w))S5.pos[w].forEach(i=>tiles[i].setC(COL.or));});say(found.size<set[1].length?`Estaban: <b>${set[1].filter(w=>!found.has(w)).join(', ')}</b>`:'¡Todas encontradas!');await wait(1.6,rid);await soloEnd(ac,rid);}

// ---------- ¿DÓNDE ESTÁN? (2019) ----------
async function dondeEstan(rid){prep();const [theme,ws]=pick(D2.DONDE),words=shuffle(ws);const st={t:45};let ac=0,qi=0;const asks=shuffle(words.map((w,i)=>i));
 cut('host');hostSay(`<b>¿Dónde Están?</b>: memoriza las nueve palabras de <b>${theme}</b>. Luego se esconden tras los números: ¡toca dónde está cada una!`);await wait(3.6,rid);
 cut('blue');const ov=words.map((w,i)=>{const b=bar(160,52,COL.bl,w,{fs:24,r:26});b.position.set(GW*.2+(i%3-1)*180,150-Math.floor(i/3)*70,0);b.userData.tap=i;G.add(b);return b;});
 const tm=yTimer();tm.position.set(GW*.2,-110,20);G.add(tm);tm.set(45);const acb=acBox(COL.bl);acb.position.set(GW*.2+150,-110,20);G.add(acb);
 say('¡Memoriza! 👀');await wait(6,rid);ov.forEach((b,i)=>{b.setT(String(i+1),COL.or);});sfx('splash');clockRun(st,tm,rid);
 const showQ=()=>{if(qi<9)hostSay(`¿Dónde está <b>${words[asks[qi]]}</b>?`);};showQ();let busy=false;
 TAP=async id=>{if(id===null||busy||qi>=9)return;busy=true;const t=asks[qi],ok=id===t;ov[t].setT(words[t],ok?COL.gr:COL.rd);sfx(ok?'ok':'error');if(ok){ac++;acb.setT(String(ac));}await wait(.7);qi++;showQ();busy=false;};
 await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN||qi>=9){r();return false;}return true;}));st.on=false;chk(rid);await wait(.8,rid);await soloEnd(ac,rid);}

// textos del menú
TEXTS.how=`<p>Juegas con el equipo <b>azul</b> contra el equipo <b>naranja</b> (el rival lo maneja el móvil). Los aciertos en las pruebas suman segundos para El Rosco. En Opciones eliges plató y etapa.</p>
<p><b>2007:</b> 🪜 La Escalera · 🔘 El Pulsador · 👫 De Par en Par · 📖 La Palabra Imposible.</p>
<p><b>2011-2017:</b> 🔤 <b>Letra a letra</b> (las letras salen una a una: escribe la palabra) · 💡 <b>La Pista</b> (pulsa cuando sepas la respuesta: cuantas menos pistas, más puntos) · ✖ <b>Palabras Cruzadas</b> (une una sílaba de la izquierda con otra de la derecha) · 🎈 <b>Coco Loco</b> (cada globo que explota destapa una letra) · ❓ <b>¿Qué es Qué?</b> (toca la palabra del significado iluminado).</p>
<p><b>2019:</b> 4️⃣ <b>Una de Cuatro</b> (toca la respuesta correcta) · 🎵 <b>La Pista musical</b> · 🔠 <b>Sopa de Letras</b> (toca la primera y la última letra) · 🔢 <b>¿Dónde Están?</b> (memoriza y toca el número).</p>
<p>🔵 <b>El Rosco:</b> 25 letras. Escribe la palabra o toca <b>Pasapalabra</b> para volver a ella luego. ¡Con las 25 te llevas el bote!</p>`;
TEXTS.cred=`<p><b>Pasapalabra 3D · El juego</b> — versión 0.2: platós y etapas de 2007, 2011, 2014, 2017 y 2019.</p><p>Idea, referencias y dirección: <b>Iker</b>.</p><p>Programación y 3D: <b>Grok Bot</b> con three.js.</p><p>Preguntas del juego original de móvil Pasapalabra (2007) y preguntas nuevas para las pruebas de 2011 a 2019. Sonidos de cabecera, cortinilla y despedida de los programas de cada etapa.</p><p class="small">Proyecto de aficionado, hecho con cariño. Pasapalabra es una marca de sus propietarios.</p>`;
Object.assign(DBG,{applyPlato,letraALetra,laPista,palabrasCruzadas,queEsQue,cocoLoco,unaDeCuatro,sopaDeLetras,dondeEstan,yTimer});
// ===== Cortinillas 2019 (copiadas de los fotogramas c2019_*): fondo azul, título blanco centrado, objetos 3D que caen girando =====
const GLY={};function glyMat(ch,col){const k=ch+col;if(!GLY[k]){const t=cv(128,128,g=>{if(ch=='♪'||ch=='♫'){g.fillStyle=col;g.strokeStyle=col;g.lineWidth=9;g.beginPath();g.ellipse(46,100,22,14,-.4,0,PI*2);g.fill();g.beginPath();g.moveTo(66,98);g.lineTo(66,14);g.quadraticCurveTo(100,30,92,60);g.stroke();}else ftxt(g,ch,64,70,118,col,'center',128,0,1000);});GLY[k]=new T.MeshBasicMaterial({map:t,transparent:true,depthWrite:false,side:T.DoubleSide});}return GLY[k];}
const GPL=new T.PlaneGeometry(1,1);
function glyph(ch,col,side,s){const g=new T.Group();for(let i=3;i>=0;i--){const m=new T.Mesh(GPL,glyMat(ch,i?side:col));m.scale.setScalar(s);m.position.set(i*s*.012,-i*s*.015,-i*s*.03);g.add(m);}return g;}
function tumbler(AW,n,mk){const g=new T.Group(),it=[];for(let i=0;i<n;i++){const o=mk(i);o.p0=new T.Vector3(rnd(-AW*.6,AW*.6),rnd(-400,400),rnd(-150,200));o.v=new T.Vector3(rnd(-40,40),rnd(-170,-70),rnd(-20,40));o.w=new T.Vector3(rnd(-2.5,2.5),rnd(-2.5,2.5),rnd(-1.5,1.5));g.add(o);it.push(o);}
 g.anim=t=>{it.forEach(o=>{o.position.copy(o.p0).addScaledVector(o.v,t);o.position.y=((o.position.y+460)%920+920)%920-460;o.rotation.set(o.w.x*t,o.w.y*t,o.w.z*t);});};return g;}
const C19=['#ffffff','#f39a1e','#3d8dff','#9fd0ff'],S19=c=>c=='#ffffff'?'#9ab0d8':c=='#f39a1e'?'#a85a00':'#1a4aa8';
function artU4B(AW){const g=tumbler(AW,70,i=>{const c=C19[i%4];return glyph(i%3?'?':'¿',c,S19(c),rnd(70,160));});const glow=new T.Mesh(new T.CircleGeometry(170,40),new T.MeshBasicMaterial({color:0xcfe6ff,transparent:true,opacity:.35,depthWrite:false}));glow.position.set(-AW*.1,-30,-200);g.add(glow);return g;}
function artDondeB(AW){return tumbler(AW,70,i=>{const c=C19[i%3];return glyph(String(1+i%9),c,S19(c),rnd(70,150));});}
function artPistaB(AW){return tumbler(AW,60,i=>{const c=C19[i%4];return glyph(['♪','♫','#','♪'][i%4],c,S19(c),rnd(70,140));});}
function artSopaB(AW){const bg=new T.BoxGeometry(1,1,1);return tumbler(AW,60,i=>{const blue=i%3==0;const lab=new T.MeshBasicMaterial({map:cv(64,64,g=>{g.fillStyle=blue?'#2a6af0':'#ffffff';g.fillRect(0,0,64,64);ftxt(g,pick([...AL]),32,35,48,blue?'#fff':'#1440b0');})});const side=new T.MeshLambertMaterial({color:blue?0x1a4ad0:0xdfe8f8});const m=new T.Mesh(bg,[side,side,side,side,lab,lab]);m.scale.setScalar(rnd(40,85));return m;});}
function artRoscoB(AW){const g=new T.Group(),sg=new T.PlaneGeometry(2,2),sm=new T.MeshBasicMaterial({transparent:true,depthWrite:false,map:cv(64,64,g=>{const r=g.createRadialGradient(24,22,2,32,32,31);r.addColorStop(0,'#ffffff');r.addColorStop(.35,'#7cc4ff');r.addColorStop(.85,'#1a5ee8');r.addColorStop(1,'rgba(10,40,160,0)');g.fillStyle=r;g.beginPath();g.arc(32,32,31,0,PI*2);g.fill();})}),it=[];for(let i=0;i<140;i++){const a=i*2.39996,r=60+Math.sqrt(i)*42;const b=new T.Mesh(sg,sm);const s=rnd(6,14);b.scale.setScalar(s);b.a=a;b.r=r;b.s=s;g.add(b);it.push(b);
 if(i%6==0){const L=glyph(pick([...AL]),'#ffffff','#1a4aa8',s*2.6);b.L=L;g.add(L);}}
 g.anim=t=>{it.forEach((b,i)=>{const k=eout(Math.min(1,Math.max(0,(t-i*.004)/1.4))),a=b.a+t*.3,r=b.r*k*1.15;b.position.set(Math.cos(a)*r*1.5,Math.sin(a)*r,-60);if(b.L)b.L.position.set(b.position.x,b.position.y+b.s*2.4,-50);});};return g;}
Object.assign(CORT,{
 u4:{title:['Una de Cuatro'],tx:0,ty:0,fs:96,mk:artU4B},
 pistaB:{title:['La Pista'],tx:0,ty:0,fs:100,mk:artPistaB},
 sopa:{title:['Sopa de Letras'],tx:0,ty:0,fs:96,mk:artSopaB},
 donde:{title:['¿Dónde Están?'],tx:0,ty:0,fs:96,mk:artDondeB},
 roscoB:{title:['El Rosco'],tx:0,ty:0,fs:110,mk:artRoscoB}});
// ---------- VOZ REAL de Christian Gálvez (recortes de los vídeos originales de Iker) ----------
const VOZ={};(()=>{const L={
2007:{escalera_pre:[3.4,'Pues vamos a jugar: primera prueba, <b>La Escalera</b>.'],
 depar_pre:[4.2,'¡Seguimos jugando ahora con <b>De Par en Par</b>!'],
 depar_exp:[12.4,'Y toca jugar a <b>De Par en Par</b>, compañeros. Os explico rápidamente la prueba: aparece un panel con nueve palabras. Tenéis que emparejarlas; las palabras que acertéis desaparecen.'],
 imposible_exp:[8,'¡Y vamos a jugar con <b>La Palabra Imposible</b>! Las ocho palabras más raritas que vas a ver esta tarde… Vamos a verlas.'],
 rosco_pre:[7.2,'Bueno, vamos a jugar la última prueba del programa: <b>Rosco final</b> de Pasapalabra.']},
2011:{letra_pre:[4.1,'Y ahora sí, ha llegado el momento de jugar con las propias palabras: comenzamos <b>Letra a Letra</b>.'],
 pista_pre:[3.3,'Pues vamos a nuestras <b>pistas musicales</b>.'],
 cruzadas_pre:[7,'Y nos vamos a la siguiente prueba: <b>Palabras Cruzadas</b>.'],
 quees_exp:[7.6,'Venga, tema común de vuestros tres paneles en <b>¿Qué es Qué?</b>: cosas que hemos encontrado en estos mil programas de Pasapalabra.'],
 rosco_pre:[5,'Vamos al último recuento de marcadores… ¡y al <b>Rosco</b>!']},
2014:{pista_exp:[8,'Vamos a ello. Tengo una canción para vosotras. La ponemos en pantalla, porque hay muchos niños esperando a los Reyes, pero también viendo este programa de Pasapalabra.'],
 coco_pre:[2.2,'Bueno, nos vamos al <b>Coco Loco</b>.'],
 quees_pre:[5.4,'Venga, nosotros, mientras todos cogen regalos, nos vamos a la siguiente prueba: <b>¿Qué es Qué?</b>'],
 rosco_pre:[4.3,'Y ahora, dicho esto, nos vamos… ¿a dónde va a ser? ¡Al <b>Rosco final</b>!']},
2017:{letra_pre:[2.9,'Me voy a mi sitio. Comenzamos primera prueba: <b>Letra a Letra</b>.'],
 letra_exp:[6,'Pues venga, vamos a por ello: colocamos el panel y colocamos las letras.'],
 pista_pre:[3.2,'¡Seguimos jugando! ¡Vamos a descubrir la música en <b>La Pista</b>!'],
 quees_pre:[4.2,'La última prueba. Últimos segundos en juego: nos vamos a <b>¿Qué es Qué?</b>'],
 quees_exp:[2.4,'Confitería es el tema, vuestro último…'],
 rosco_pre:[6.2,'Con ese mensaje de esperanza, nos vamos al <b>Rosco final</b> de Pasapalabra.'],
 rosco_exp:[3.2,'Con Pablo, que tiene más segundos acumulados en el marcador. Comenzamos con él.']},
2019:{u4_pre:[6,'Comenzamos, primera prueba: <b>Una de Cuatro</b>.'],
 pista_pre:[5.5,'Seguimos jugando: <b>Pista musical</b>.'],
 pista_exp:[16.8,'Vamos con este último duelo, duelo musical. Y vamos a por ello: año de la canción, lo colocamos en pantalla… 1980 es el año de la canción. Y por cinco segundos esto suena así.'],
 sopa_pre:[5,'Nos vamos a la <b>Sopa de Letras</b>.'],
 sopa_exp:[12.5,'Vamos jugando, vamos con la <b>Sopa de Letras</b>. Así que colocamos la primera, vamos a por ello. Y vais a comenzar jugando con cosas que encontramos en la cara.'],
 donde_pre:[8,'Última prueba, últimos segundos en juego: vamos a <b>¿Dónde Están?</b>'],
 donde_exp:[18.9,'Última prueba en esta final, en este duelo de maestros. Vamos a ver la pantalla: tenemos, por un lado, conchas, y por otro, cáscaras; es decir, alimentos con cáscara o corteza, o animales con concha o caparazón.'],
 rosco_pre:[11.5,'Vamos al <b>Rosco final</b> de Pasapalabra.']}};
for(const y in L){VOZ[y]={};for(const k in L[y])VOZ[y][k]={f:`${y}_${k}.ogg`,d:L[y][k][0],t:L[y][k][1]};}})();
Object.assign(DBG,{VOZ,voz});
