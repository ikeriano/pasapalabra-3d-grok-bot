// ======================================================================
//  v0.6c — decorado completo del plató por tema (como «Ahora Caigo» 1.58), especiales nuevos,
//  preguntas temáticas propias (rosco A-Z completo por especial) y Pasapalabra Niños.
// ======================================================================
window.V6=window.V6||{};
// ---------- decorado ----------
const TH6={tok:0,sv:null};
TH6.hat=function(type,d){const g=new T.Group(),M=c=>new T.MeshLambertMaterial({color:c});
 const cyl=(rt,rb,h,c,y)=>{const m=new T.Mesh(new T.CylinderGeometry(rt,rb,h,16),M(c));m.position.y=y;g.add(m);return m;};
 if(type=='bruja'){cyl(.36,.36,.02,0x151515,0);cyl(0,.17,.5,0x151515,.25);cyl(.175,.175,.05,0xff8a1a,.04);}
 else if(type=='papanoel'){cyl(.03,.17,.36,0xd01818,.18).rotation.z=.25;cyl(.18,.18,.07,0xffffff,0);const b=new T.Mesh(new T.SphereGeometry(.05,8,6),M(0xffffff));b.position.set(-.09,.36,0);g.add(b);}
 else if(type=='corona'){cyl(.15,.14,.12,0xffc21a,.06);for(let i=0;i<6;i++){const s=new T.Mesh(new T.ConeGeometry(.03,.08,4),M(0xffc21a));s.position.set(Math.cos(i)*.14,.15,Math.sin(i)*.14);g.add(s);}}
 else if(type=='chistera'){cyl(.27,.27,.02,0x111111,0);cyl(.15,.15,.3,0x111111,.15);cyl(.155,.155,.05,0xffd23a,.04);}
 else if(type=='paja'){cyl(.36,.36,.02,0xe8c860,0);cyl(.15,.16,.12,0xe8c860,.06);cyl(.165,.165,.035,0xd01818,.03);}
 else if(type=='fiesta'){cyl(0,.12,.32,0xff3c8c,.16);const b=new T.Mesh(new T.SphereGeometry(.04,8,6),M(0xffd23a));b.position.y=.33;g.add(b);}
 else if(type=='helice'){const c=new T.Mesh(new T.SphereGeometry(.17,14,8,0,PI*2,0,PI/2),[M(0xd01818)][0]);g.add(c);cyl(.01,.01,.08,0x333333,.2);const p=new T.Mesh(new T.BoxGeometry(.32,.01,.05),M(0x2a7bff));p.position.y=.24;g.add(p);g.prop=p;}
 else return null;return g;};
TH6.emoji=function(e){const t=cv(96,96,(c,w,h)=>{c.clearRect(0,0,w,h);c.font='72px serif';c.textAlign='center';c.textBaseline='middle';c.fillText(e,w/2,h/2+4);});return new T.Sprite(new T.SpriteMaterial({map:t,transparent:true,depthWrite:false}));};
TH6.apply=function(id){TH6.clear();const d=(typeof DR6!=='undefined')&&DR6[id];if(!d||!P.root)return 0;const tok=++TH6.tok;const C=x=>new T.Color(x);
 const sv=TH6.sv={tok,mats:[],add:[],bg:S.background&&S.background.isColor?S.background.clone():null,fog:S.fog?S.fog.color.clone():null,lights:[],cap:null};
 const skip=new Set();[P.host,P.ply,P.ply2,P.ply3,P.cpu,P.cpu2,P.cpu3].concat(P.heads||[]).forEach(o=>o&&o.traverse&&o.traverse(m=>skip.add(m)));const AM=(window.V4&&V4.aud&&V4.aud.M)||{};Object.values(AM).forEach(m=>skip.add(m));
 const cache=new Map();const swap=(o,nc)=>{const mt=o.material;let cl=cache.get(mt);if(!cl){cl=mt.clone();cl.color.copy(nc);cache.set(mt,cl);}sv.mats.push([o,mt]);o.material=cl;};
 P.root.traverse(o=>{if(!o.isMesh||skip.has(o)||!o.material||Array.isArray(o.material)||!o.material.color)return;const mt=o.material,h={};mt.color.getHSL(h);let nc=null;
  if(mt.type=='MeshBasicMaterial'){if(!mt.map&&h.s>.45&&h.l>.25&&h.l<.85)nc=(h.h>.5&&h.h<.75)?C(d.glow):C(d.acc);}
  else if(mt.map){nc=C(0xffffff).lerp(C(d.wb),.35);}
  else if(h.h>.52&&h.h<.75&&h.s>.2&&h.l<.6)nc=C(h.l<.3?d.wa:d.wb);
  else if(h.l>.72)nc=mt.color.clone().lerp(C(d.wb),.2);
  if(nc)swap(o,nc);});
 // presentador: traje, camisa, corbata y sombrero
 P.host.traverse(o=>{if(!o.isMesh||!o.material||Array.isArray(o.material)||!o.material.color)return;const mt=o.material,h={};mt.color.getHSL(h);if(mt.emissive&&mt.emissive.getHex()==0x2a1408)return;
  let nc=null;if(h.l<.16&&h.s<.35)nc=C(d.suit);else if(h.l>.9)nc=C(d.shirt);else if((h.h<.05||h.h>.95)&&h.s>.6)nc=C(d.tie);if(nc)swap(o,nc);});
 if(d.hat){const hat=TH6.hat(d.hat,d);if(hat){const bb=new T.Box3().setFromObject(P.host);hat.position.set(0,bb.max.y-P.host.position.y-.12,0);P.host.add(hat);sv.add.push([P.host,hat]);if(hat.prop)anim(dt=>{if(!hat.parent)return false;hat.prop.rotation.y+=dt*9;return true;});}}
 // fondo, niebla y luces
 if(S.background&&S.background.isColor)S.background.set(d.bg);if(S.fog)S.fog.color.set(d.fog);
 S.traverse(o=>{if(o.isHemisphereLight){sv.lights.push([o,o.color.clone()]);o.color.lerp(C(d.glow),.3);}});
 // público: gorras del color del tema
 const cap=AM.cap;if(cap&&cap.instanceColor){sv.cap=cap.instanceColor.array.slice();const a=C(d.acc),b=C(d.glow);for(let i=0;i<cap.count;i++)cap.setColorAt(i,i%2?a:b);cap.instanceColor.needsUpdate=true;}
 // atrezo: emojis del tema alrededor del plató y en las gradas
 const em=[...new Intl.Segmenter('es',{granularity:'grapheme'}).segment(d.em||'⭐')].map(x=>x.segment);
 for(let i=0;i<16;i++){const s=TH6.emoji(em[i%em.length]);const a=i/16*PI*2+.2,r=i%2?8.6:7.2;s.position.set(Math.cos(a)*r,i%2?4.2+(i%4)*.4:1.1,Math.sin(a)*r-2);s.scale.setScalar(i%2?1.5:1.1);P.root.add(s);sv.add.push([P.root,s]);}
 // pantalla con rótulo del especial
 const T6=(V6.cur||{}),ban=(T6.banner||d.ban||'').toUpperCase();
 if(P.scr){const bt=cv(1024,160,(c,w,h)=>{const gr=c.createLinearGradient(0,0,w,0);gr.addColorStop(0,d.wa);gr.addColorStop(.5,d.wb);gr.addColorStop(1,d.wa);c.fillStyle=gr;c.fillRect(0,0,w,h);c.fillStyle=d.glow;c.fillRect(0,0,w,8);c.fillRect(0,h-8,w,8);
   c.font='92px serif';c.textAlign='center';c.textBaseline='middle';c.fillText(em[0],70,h/2+6);c.fillText(em[1%em.length],w-70,h/2+6);ftxt(c,ban||'PASAPALABRA',w/2,h/2+4,64,'#fff','center',w-200,6);});
  const pl=new T.Mesh(new T.PlaneGeometry(10,1.56),new T.MeshBasicMaterial({map:bt}));const w=new T.Vector3();P.scr.getWorldPosition(w);pl.position.set(w.x,w.y-2.3,w.z+.05);P.root.add(pl);sv.add.push([P.root,pl]);}
 return tok;};
TH6.clear=function(tok){const sv=TH6.sv;if(!sv||(tok&&tok!==sv.tok))return;TH6.sv=null;
 sv.mats.forEach(([o,m])=>o.material=m);sv.add.forEach(([p,o])=>{p.remove(o);o.traverse(m=>{if(m.geometry)m.geometry.dispose();if(m.material){if(m.material.map)m.material.map.dispose();m.material.dispose();}});});
 if(sv.bg&&S.background&&S.background.isColor)S.background.copy(sv.bg);if(sv.fog&&S.fog)S.fog.color.copy(sv.fog);sv.lights.forEach(([l,c])=>l.color.copy(c));
 const cap=window.V4&&V4.aud&&V4.aud.M&&V4.aud.M.cap;if(sv.cap&&cap&&cap.instanceColor){cap.instanceColor.array.set(sv.cap);cap.instanceColor.needsUpdate=true;}};
// ---------- preguntas temáticas ----------
const Q6={sv:null,tok:0};
Q6.alias={especial300:'youtube',sub400ikeriano:'youtube',sub400marchelitos:'youtube',duelo:'copa',noche:'copa',granfinal:'copa',nochevieja:'findeano',edverano:'verano',programa1000:'mil',ninos2:'ninos',reyes2016:'reyes',nochevieja2018:'findeano',granfinal2019:'copa',dibujadasnav:'navidad'};
Q6.use=function(q){Q6.reset();const D=(typeof Q6D!=='undefined')&&(Q6D[q]||Q6D[Q6.alias[q]]);if(!D)return 0;const tok=++Q6.tok;
 const sv=Q6.sv={tok,ROS:ORIG.ROS,IMP:ORIG.IMP,PUL:ORIG.PUL,LAL:D2.LAL,COCO:D2.COCO,QEQ:D2.QEQ,SOPA:D2.SOPA,DONDE:D2.DONDE,CRUZ:D2.CRUZ,U4:D2.U4};
 const NAME=(q.toUpperCase()),deac=w=>w.replace(/Á/g,'A').replace(/É/g,'E').replace(/Í/g,'I').replace(/Ó/g,'O').replace(/[ÚÜ]/g,'U');
 ORIG.ROS=D.ros.map((r,i)=>r?[[r[0],r[1]]]:sv.ROS[i]);
 const W=shuffle(D.words.filter(w=>/^[A-ZÁÉÍÓÚÑÜ]{3,12}$/.test(w[0])).map(w=>[w[0],w[1]]));
 if(W.length>=8){D2.LAL=W.map(w=>[w[0],w[1]]);D2.COCO=W.map(w=>[w[0],w[1]]);
  const ch=(a,n)=>{const r=[];for(let i=0;i+n<=a.length;i+=n)r.push(a.slice(i,i+n));return r;};
  D2.QEQ=ch(W,5).slice(0,4);ORIG.IMP=ch(W,8).slice(0,4);ORIG.PUL=[[NAME,W.slice(0,10).map(w=>[w[1],w[0]])]];
  const sh=W.filter(w=>w[0].length<=6).map(w=>deac(w[0]));if(sh.length>=3)D2.SOPA=ch(sh,3).slice(0,4).map(s=>[NAME,s]);
  const md=W.filter(w=>w[0].length<=8).map(w=>w[0]);if(md.length>=9)D2.DONDE=[[NAME,md.slice(0,9)]];
  D2.CRUZ=W.filter(w=>w[0].length>=4&&w[0].length<=10).map(w=>{const h=Math.floor(w[0].length/2);return [w[0].slice(0,h),w[0].slice(h),w[1]];});
  D2.U4=ch(W,4).slice(0,3).map(s=>[NAME,s.map(w=>w[0]),s.map((w,i)=>[w[1],i])]);}
 return tok;};
Q6.reset=function(tok){const sv=Q6.sv;if(!sv||(tok&&tok!==sv.tok))return;Q6.sv=null;ORIG.ROS=sv.ROS;ORIG.IMP=sv.IMP;ORIG.PUL=sv.PUL;Object.assign(D2,{LAL:sv.LAL,COCO:sv.COCO,QEQ:sv.QEQ,SOPA:sv.SOPA,DONDE:sv.DONDE,CRUZ:sv.CRUZ,U4:sv.U4});};
// ---------- pruebas nuevas de los especiales ----------
CORT.connueve={title:['Con nueve','basta'],fs:88};CORT.dibujadas={title:['Palabras','dibujadas'],fs:88};
async function conNueve(rid){prep();const words=shuffle(D2.COCO.map(w=>w[0]).filter(w=>w.length<=9)).slice(0,9);while(words.length<9)words.push(pick(['SOL','MAR','LUNA','CASA','PERRO','GATO','FLOR','LIBRO','TREN'][words.length]));
 cut('host');hostSay('<b>Con nueve basta</b>: se iluminan palabras en orden. Repite la serie tocándolas igual. Cada serie acertada suma <b>2 segundos</b>. ¡Con nueve basta!');await wait(3.6,rid);
 cut('blue');const pills=words.map((w,i)=>{const b=bar(220,48,COL.gr,w,{fs:22});b.position.set(-GW/2+150+(i%3)*236,290-Math.floor(i/3)*60,0);b.userData.tap=i;G.add(b);return b;});
 const tm=yTimer();tm.position.set(-GW/2+90,-262,20);G.add(tm);const st={t:75};tm.set(75);clockRun(st,tm,rid);let ac=0,k=1;
 while(st.t>0){const seq=Array.from({length:k},()=>Math.floor(Math.random()*9));hostSay(`Serie de <b>${k}</b>: ¡atento!`);
  for(const i of seq){chk(rid);pills[i].setC(COL.or);sfx('ok');await wait(.6,rid);pills[i].setC(COL.gr);await wait(.15,rid);}
  hostSay('¡Ahora tú!');let p=0,ok=true;
  await new Promise(r=>{TAP=i=>{if(i===null)return;pills[i].setC(i===seq[p]?COL.or:COL.rd);setTimeout(()=>pills[i].setC(COL.gr),250);if(i!==seq[p]){ok=false;TAP=null;r();return;}p++;if(p>=seq.length){TAP=null;r();}};anim(()=>{if(st.t<=0||rid!==RUN){TAP=null;r();return false;}return TAP!==null;});});
  chk(rid);if(st.t<=0)break;if(ok){ac++;sfx('ok');hostSay('¡Bien! <b>+2 segundos</b>.');k=Math.min(9,k+1);}else{sfx('error');hostSay('¡Fallo! Volvemos a empezar con una serie más corta.');k=Math.max(1,k-1);}await wait(1,rid);}
 st.on=false;say();TAP=null;chk(rid);sfx('winner');GAME.sec[0]+=ac*2;GAME.ac[0]+=ac;await rotulo(`AZUL: ${ac} SERIES · +${ac*2} s`,COL.bl,rid);clearG();
 const c=Math.floor(rnd(3,8));GAME.sec[1]+=c*2;await rotulo(`NARANJA: ${c} SERIES · +${c*2} s`,COL.or,rid);clearG();}
const DIB6={verano:[['🍉','SANDÍA'],['🏖️','PLAYA'],['🍦','HELADO'],['🦀','CANGREJO'],['🕶️','GAFAS'],['⛱️','SOMBRILLA'],['🐬','DELFÍN'],['🌴','PALMERA'],['🏄','SURF'],['🐚','CONCHA'],['☀️','SOL'],['🚤','LANCHA']],
 navidad:[['🎄','ÁRBOL'],['🎁','REGALO'],['⛄','MUÑECO'],['🔔','CAMPANA'],['⭐','ESTRELLA'],['🦌','RENO'],['🕯️','VELA'],['🧦','CALCETÍN'],['🍪','GALLETA'],['❄️','COPO'],['🎅','PAPÁ NOEL'],['🛷','TRINEO']]};
async function palabrasDibujadas(rid){prep();const L=DIB6[(V6.cur&&/nav/.test(V6.cur.id))?'navidad':'verano'],items=shuffle(L.slice());let ac=0,qi=0;const st={t:45};
 cut('host');hostSay('<b>Palabras dibujadas</b>: un dibujo aparece poco a poco. Elige qué palabra es entre las cuatro. Cada acierto, <b>5 segundos</b>.');await wait(3.2,rid);
 cut('blue');document.body.classList.add('tv6');const tm=yTimer();tm.position.set(-GW/2+90,-262,20);G.add(tm);tm.set(45);clockRun(st,tm,rid);
 const qb=bar(Math.min(GW-280,800),60,COL.or,'¿QUÉ PALABRA ES?',{fs:26});qb.position.set(-GW/2+190+Math.min(GW-280,800)/2,-262,10);G.add(qb);
 try{while(st.t>0&&qi<items.length){const [e,w]=items[qi++];let rev=0;const pic=label(300,300,(c,cw,ch)=>{c.fillStyle='#fff';c.beginPath();c.roundRect(0,0,cw,ch,30);c.fill();c.save();c.beginPath();c.rect(0,0,cw,ch*rev);c.clip();c.font=`${cw*.62}px serif`;c.textAlign='center';c.textBaseline='middle';c.fillText(e,cw/2,ch/2+10);c.restore();c.strokeStyle='#ec7a16';c.lineWidth=12;c.strokeRect(6,6,cw-12,ch-12);});
   pic.position.set(-GW/2+600,90,0);G.add(pic);const opts=shuffle([w,...shuffle(L.filter(x=>x[1]!==w)).slice(0,3).map(x=>x[1])]);
   const ov=opts.map((o,i)=>{const b=bar(250,46,COL.or,o,{fs:22});b.position.set(-GW/2+150+(i%2)*268,300-Math.floor(i/2)*60,0);b.userData.tap=i;G.add(b);return b;});
   let ans=-1,on=true;anim(dt=>{if(!on)return false;rev=Math.min(1,rev+dt*.25);pic.set();return true;});
   await new Promise(r=>{TAP=i=>{if(i===null)return;ans=i;TAP=null;r();};anim(()=>{if(st.t<=0||rid!==RUN){TAP=null;r();return false;}return TAP!==null;});});on=false;chk(rid);if(ans<0)break;
   const ok=opts[ans]===w;ov[ans].setC(ok?COL.gr:COL.rd);sfx(ok?'ok':'error');if(ok)ac++;else ov[opts.indexOf(w)].setC(COL.gr);rev=1;pic.set();await wait(.9,rid);ov.forEach(o=>G.remove(o));G.remove(pic);}}
 finally{document.body.classList.remove('tv6');}
 st.on=false;TAP=null;chk(rid);await soloEnd(ac,rid);}
// ---------- registro de temas y especiales ----------
if(typeof TEMA6!=='undefined')TEMA6.forEach(T=>{if(L5.TEMAS.some(x=>x.id==T.id))return;const d=DR6[T.id]||{};L5.TEMAS.push(Object.assign({tint:'',conf:[d.glow||'#ffd23a',d.acc||'#fff','#fff']},T));});
L5.TEMAS.forEach(T=>{if(!T.intro&&TEMA6){const t=TEMA6.find(x=>x.id==T.id);}});
if(typeof ESP6!=='undefined'){for(const [k,E] of Object.entries(ESP6)){const d=DR6[E.dr]||{};const e=Object.assign({tint:'',conf:[d.glow||'#ffd23a',d.acc||'#fff','#fff'],prog:!E.torneo},E);if(E.torneo)Object.assign(e,E.torneo);L5.ESP[k]=e;}
 for(const [k,E] of Object.entries(ACP6)){const d=DR6[E.dr]||{};L5.ESP[k]=Object.assign({tint:'',conf:[d.glow||'#ffd23a',d.acc||'#fff','#fff'],prog:true,ac:true},E);}}
// intro de cada tema/especial y frase de presentación para las pruebas sin clip
(()=>{let src=programa.toString();const a="if(T.conf){FX5.conf(T.conf,5);sfx('aplauso');}}";
 if(src.includes(a))src=src.replace(a,a+"{const T6=V5.tema();if(T6.intro)for(const l of T6.intro){cut(pick(['host','wide','front']));hostSay(l);await wait(2.4,rid);}}");else console.warn('v06c intro');
 src=src.replace("else await wait(.6,rid);}","else{const c=CORT[id];hostSay('Vamos con la siguiente prueba: <b>'+(c?c.title.join(' '):id)+'</b>.');await wait(2.2,rid);say();}}");
 (0,eval)('programa='+src);})();
{const _vt=V5.tema;V5.tema=()=>V6.cur||_vt();}
{const _p=programa;programa=async function(){const T=V5.tema();let a=0,b=0;if(T&&T.id&&T.id!='normal'&&!V6.cur){a=TH6.apply(T.id);b=Q6.use(T.q||T.id);}
 try{return await _p();}finally{if(a)TH6.clear(a);if(b)Q6.reset(b);}};}
async function espProg6(id,E){const sv={etapa:OPT.etapa,plato:OPT.plato,final:OPT.final};const y=E.etapa||OPT.etapa;let prSv=null,kids=null;
 try{if(y!==OPT.etapa){OPT.etapa=OPT.plato=y;applyPlato(y);LOGO=logoURL();}
  V6.cur={id,name:E.name,emoji:E.emoji,banner:E.banner,saludo:E.intro[0],intro:E.intro.slice(1),conf:E.conf,tint:E.tint||''};
  if(E.alaz)OPT.final='alaz';
  if(E.add){const pr=ETAPAS[y].pr;prSv=pr;const np=pr.slice();const [nid,before]=E.add;const fn={connueve:conNueve,dibujadas:palabrasDibujadas}[nid];const bi=np.findIndex(p=>p[0]==before);np.splice(bi<0?np.length-1:bi,0,[nid,fn]);ETAPAS[y].pr=np;}
  if(E.kids){kids=[P.ply,P.ply2,P.ply3,P.cpu,P.cpu2,P.cpu3].filter(Boolean).map(p=>[p,p.scale.clone()]);kids.forEach(([p])=>p.scale.multiplyScalar(.82));V5.rivalN=E.rivalN||null;}
  const a=TH6.apply(E.dr||id),b=Q6.use(E.q||id);
  menu.classList.add('hidden');$('#ver').classList.add('hidden');MODE.menu=false;document.body.classList.add('ingame');$('#skip').classList.remove('hidden');
  try{await programa();}finally{TH6.clear(a);Q6.reset(b);}}
 finally{V6.cur=null;if(prSv)ETAPAS[y].pr=prSv;if(kids)kids.forEach(([p,s])=>p.scale.copy(s));V5.rivalN=null;OPT.final=sv.final;
  if(sv.etapa!==OPT.etapa){OPT.etapa=sv.etapa;OPT.plato=sv.plato;applyPlato(OPT.plato);LOGO=logoURL();}}}
{const _e=especial;especial=async function(id){const E=L5.ESP[id];if(E&&E.prog)return espProg6(id,E);
 const sv={etapa:OPT.etapa,plato:OPT.plato};const y=E&&E.etapa;if(y&&y!==OPT.etapa){OPT.etapa=OPT.plato=y;applyPlato(y);LOGO=logoURL();}
 const a=TH6.apply(id),b=Q6.use((E&&E.q)||id);try{return await _e(id);}finally{TH6.clear(a);Q6.reset(b);if(sv.etapa!==OPT.etapa){OPT.etapa=sv.etapa;OPT.plato=sv.plato;applyPlato(OPT.plato);LOGO=logoURL();}}};}
// menú de especiales con secciones
{const _sm=showMenu;showMenu=function(s='main'){const r=_sm(s);if(s=='esp'){const bs=[...menu.querySelectorAll('[data-e5]')];const first=k=>bs.find(b=>b.dataset.e5==k);
  const hdr=t=>{const h=document.createElement('div');h.className='mtext';h.innerHTML='<b style="color:#ffd23a">'+t+'</b>';return h;};
  const f1=first('connueve'),f2=bs.find(b=>/^ac_/.test(b.dataset.e5));if(f1)f1.parentNode.insertBefore(hdr('Especiales de verdad de Pasapalabra'),f1);if(f2)f2.parentNode.insertBefore(hdr('Especiales de «¡Ahora Caigo!» adaptados'),f2);}return r;};}
Object.assign(window.DBG||{},{TH6,Q6,conNueve,palabrasDibujadas,espProg6});
