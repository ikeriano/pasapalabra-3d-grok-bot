// v0.12 · ETAPAS DE ANTENA 3: 2000-2006 (Jato / Romero / Cantizano) y 2020-2026 (Leal, «Palabras cruzadas» y «A la Z»)
// Técnica: «intercambio». OPT.a3 guarda la etapa elegida (2000/2002/2006/2020/2023/2026); OPT.etapa/OPT.plato siguen siendo años base
// (2007 ó 2019) para que todo el código anterior funcione igual. Al empezar el programa se sustituye ETAPAS[base] por la etapa real y se deshace al acabar.
const SW12={on:false,real:0,base:0,sv:null,prog:0};
const ST12={
 2000:{k:'jato',base:2007,n:'Silvia Jato',fechas:'24/7/2000 – 15/11/2002 y 8/1/2003 – 17/3/2006',tag:'aproximado (juego de PC = fiel a PASAP.EXE; plató aproximado)',suit:0x7a2a3a,hair:0xc8a060,long:true,bg:0x0a1a5c,frame:0xe8c030,lc:0xffd84a,gl:0xffd040},
 2002:{k:'romero',base:2007,n:'Constantino Romero',fechas:'18/11/2002 – 7/1/2003',tag:'🆕 INVENTADO (pruebas, plató y reglas)',suit:0x1a1c24,hair:0xb8b8c0,bg:0x1a1038,frame:0x9a50e0,lc:0xc080ff,gl:0xb070ff},
 2006:{k:'canti',base:2007,n:'Jaime Cantizano',fechas:'20/3/2006 – 9/6/2006',tag:'🆕 INVENTADO (pruebas, plató y reglas)',suit:0x2a3a5a,hair:0x2a1c12,bg:0x0a2a2a,frame:0x1a9a8a,lc:0x40e0c8,gl:0x30d0b8},
 2020:{k:'leal',base:2019,n:'Roberto Leal',fechas:'desde el 13/5/2020',tag:'aproximado (rosco de 85 s)',suit:0x20283a,hair:0x1a1410,bg:0x06123a,frame:0x1a3c9a,lc:0x2a7bff,gl:0x3a7bff},
 2023:{k:'leal',base:2019,n:'Roberto Leal',fechas:'desde diciembre de 2023',tag:'aproximado (palabras cruzadas en Opciones)',suit:0x20283a,hair:0x1a1410,bg:0x06123a,frame:0x1a3c9a,lc:0x2a7bff,gl:0x3a7bff},
 2026:{k:'a26',base:2019,n:'Roberto Leal',fechas:'junio de 2026 en adelante',tag:'aproximado (faltan imágenes del 19/6)',suit:0x20283a,hair:0x1a1410,bg:0x2f8fe8,frame:0x1a3c9a,lc:0x4ab0ff,gl:0x3a7bff,booths:true}};
const A3_ORD=[2000,2002,2006,2020,2023,2026];
OPT.a3=OPT.a3||0;if(OPT.cruz12===undefined)OPT.cruz12=0;
const esc12=s=>String(s).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c]));
// ---------- palabras cruzadas 2023/2026: 9 palabras, 75 s, +2 s por palabra (máx. 18 s) ----------
const CRUZ12={Cocina:[['PLA','TO','Recipiente plano donde se sirve la comida'],['VA','SO','Recipiente para beber agua'],['JAR','RRA','Recipiente con asa para servir líquidos'],['SAR','TÉN','Utensilio con mango para freír'],['HOR','NO','Aparato donde se asa el pollo'],['SO','PA','Plato líquido que se toma con cuchara'],['PIZ','ZA','Disco de masa con tomate y queso, de origen italiano'],['AR','ROZ','Cereal básico de la paella'],['TAR','TA','Dulce grande que se corta en porciones'],['CA','FÉ','Bebida oscura que se toma por la mañana'],['LE','CHE','Bebida blanca que dan las vacas'],['ME','SA','Mueble sobre el que se come'],['PE','RA','Fruta con forma de campana'],['CAL','DO','Líquido sabroso en el que se cuece la carne'],['MAN','TEL','Tela que cubre la mesa'],['HUE','VO','Lo pone la gallina y se come frito o cocido'],['A','JO','Bulbo de olor fuerte que se usa para sazonar'],['SAL','MÓN','Pez rosado que sube por los ríos']],
 Animales:[['GA','TO','Felino doméstico que maúlla'],['PE','RRO','Mejor amigo del hombre; ladra'],['VA','CA','Da leche y dice «mu»'],['LO','BO','Animal salvaje que aúlla a la luna'],['O','SO','Gran animal de pelo que hiberna'],['LI','NCE','Felino de orejas con pinceles'],['TI','GRE','Felino enorme con rayas'],['CI','SNE','Ave blanca de cuello largo'],['CER','DO','Animal que da jamón'],['PO','LLO','Cría de la gallina'],['RA','TA','Roedor de las alcantarillas'],['BÚ','HO','Ave nocturna de ojos grandes'],['CIER','VO','Animal con cuernos ramificados'],['MO','NO','Primate que trepa y come plátanos'],['LE','ÓN','El rey de la selva'],['TO','RO','Macho de la vaca; embiste el capote'],['CA','BRA','Hembra del macho cabrío; trepa montes'],['SA','PO','Anfibio parecido a la rana, pero más feo']],
 Ciudad:[['CA','LLE','Camino con casas a los lados'],['PUEN','TE','Lo cruzas para pasar un río'],['PLA','ZA','Espacio abierto rodeado de edificios'],['PAR','QUE','Jardín con árboles para pasear'],['BAN','CO','Lugar donde se guarda el dinero'],['ME','TRO','Tren subterráneo'],['CI','NE','Sala donde se ven películas'],['TIEN','DA','Local donde se compra'],['FA','RO','Torre con luz para guiar a los barcos'],['HO','TEL','Lugar donde duermes de viaje'],['BAR','RIO','Zona de una ciudad'],['SU','PER','Tienda grande de alimentación'],['TO','RRE','Edificio muy alto y estrecho'],['PUER','TO','Donde atracan los barcos'],['TA','XI','Coche que se para levantando la mano'],['PIS','TA','Camino llano de carreras o de aeropuerto'],['GRÚ','A','Máquina de las obras que levanta pesos'],['SO','LAR','Terreno sin edificar']]};
CRUZ12.pick=n=>{const k=pick(Object.keys(CRUZ12).filter(x=>Array.isArray(CRUZ12[x])));return shuffle(CRUZ12[k].slice()).slice(0,n);};
CRUZ12.total=Object.values(CRUZ12).reduce((a,b)=>a+(Array.isArray(b)?b.length:0),0);
async function end12cruz(ac,rid){say();setActs();TAP=null;chk(rid);sfx('winner');const g=Math.min(18,ac*2);GAME.sec[0]+=g;GAME.ac[0]+=ac;
 await rotulo(`AZUL: ${ac} DE 9 · +${g} s`,COL.bl,rid);clearG();const c=Math.max(0,Math.min(9,Math.round(rnd(3,7.4))));const g2=Math.min(18,c*2);GAME.sec[1]+=g2;GAME.ac[1]+=c;await rotulo(`NARANJA: ${c} DE 9 · +${g2} s`,COL.or,rid);clearG();}
let cruz12=null;
{const src=typeof palabrasCruzadas==='function'?palabrasCruzadas.toString():'';
 if(src.includes('D2.CRUZ')&&src.includes('soloEnd')){
  let s=src.replace('shuffle(D2.CRUZ).slice(0,6)','CRUZ12.pick(9)').replace('{t:50}','{t:75}').replace('tm.set(50)','tm.set(75)').replace(/cur<6/g,'cur<9').replace(/done\.size>=6/g,'done.size>=9').replace(/done\.size<6/g,'done.size<9').replace('k<=6','k<=9').replace('(cur+k)%6','(cur+k)%9').replace(/215-j\*62/g,'222-j*46').replace('bar(120,46,','bar(120,38,').replace('bar(140,46,','bar(140,38,').replace('await soloEnd(ac,rid)','await end12cruz(ac,rid)').replace(/palabrasCruzadas/,'cruz12f')
   .replace(/hostSay\('<b>Palabras Cruzadas<\/b>:[^']*'\)/,"hostSay('<b>Palabras Cruzadas</b> (🆕 inventadas): nueve palabras en <b>75 segundos</b>. Toca una sílaba de la izquierda y otra de la derecha para formar la palabra de la definición. Cada acierto suma <b>2 segundos</b> al rosco, con un máximo de 18.')");
  try{cruz12=(0,eval)('('+s+')');}catch(e){console.error('cruz12',e);}}
 if(!cruz12)cruz12=async rid=>{await palabrasCruzadas(rid);};}
CORT.cruz12={title:['Palabras','Cruzadas'],tx:0,ty:0,fs:78,mk:null};
// ---------- una de dos / antes y después (motor 2D de v12p, INVENTADOS) ----------
const PCX=()=>PC12;
async function dos12(rid,titulo,sub,qs,pAI=.62){const P=PCX();if(!P.TMS)P.newTeams();P.setTag('🆕 INVENTADO · '+titulo);
 try{const o=P.ord();for(let k=0;k<qs.length;k++){chk(rid);const tm=o[k%2],q=qs[k];P.open(null);P.head(titulo.toUpperCase(),sub);P.hud();P.tag();
  P.add('a txt',esc12(q.q),{top:'96px',left:'20px',width:'600px'});let pick2=-1;
  const bs=q.o.map((t,i)=>{const b=P.add('a pcb',esc12(t),{top:(210+i*70)+'px',left:'90px',width:'460px',minHeight:'54px'});return b;});
  P.add('a shape',tm.n,{top:'170px',font:'800 16px N,Arial'});
  const r=await new Promise(res=>{if(tm.cpu){wait(rnd(1.3,2.8),rid).then(()=>res(Math.random()<pAI?q.ok:1-q.ok));}else bs.forEach((b,i)=>b.onpointerdown=e=>{e.preventDefault();sfx('j12_click');res(i);});anim(()=>{if(rid!==RUN){res(-1);return false;}return !!b0(bs);});});
  chk(rid);bs[q.ok].style.background='#1f9a3a';if(r>=0&&r!==q.ok)bs[r].style.background='#c02020';
  const ok=r===q.ok;if(ok)P.gain(tm,1,2);await P.fb(rid,ok,q.o[q.ok]);}}
 finally{P.close();P.setTag();}}
const b0=bs=>bs[0]&&bs[0].isConnected;
async function una2(rid){const R=shuffle(Q12.ref.slice()).slice(0,3),V=shuffle(Q12.vf.slice()).slice(0,3);const qs=[];
 for(const [a,b] of R){const w=pick(Q12.ref.filter(x=>x[1]!==b))[1];const sw=Math.random()<.5;qs.push({q:'Completa el refrán: «'+a+'…»',o:sw?[b,w]:[w,b],ok:sw?0:1});}
 for(const [t,v] of V){const sw=Math.random()<.5,o=sw?['Verdadero','Falso']:['Falso','Verdadero'];qs.push({q:t,o,ok:o.indexOf(v?'Verdadero':'Falso')});}
 await dos12(rid,'Una de dos','Dos respuestas, solo una es la buena · 1 punto y 2 s',shuffle(qs));}
async function antes12(rid){const P=PCX();if(!P.TMS)P.newTeams();P.setTag('🆕 INVENTADO · Antes y después');
 try{const pool=[];for(const e of JQ12)for(const [w,d] of e[1])if(w.length>=5&&w.length<=9&&!/ /.test(w))pool.push([w,d]);const set=shuffle(pool).slice(0,6);const o=P.ord();
  for(let k=0;k<set.length;k++){chk(rid);const tm=o[k%2],[w,d]=set[k];P.open(null);P.head('ANTES Y DESPUÉS','Elige ver el principio o el final de la palabra');P.hud();P.tag();
   P.add('a txt',esc12(d),{top:'96px',left:'20px',width:'600px'});P.add('a shape',tm.n,{top:'170px',font:'800 16px N,Arial'});
   const half=Math.ceil(w.length/2);const side=await new Promise(res=>{const b1=P.add('a pcb','Ver el PRINCIPIO',{top:'230px',left:'90px',width:'220px'}),b2=P.add('a pcb','Ver el FINAL',{top:'230px',left:'330px',width:'220px'});
    if(tm.cpu)wait(1.4,rid).then(()=>res(Math.random()<.5?0:1));else{b1.onpointerdown=e=>{e.preventDefault();res(0);};b2.onpointerdown=e=>{e.preventDefault();res(1);};}anim(()=>{if(rid!==RUN){res(0);return false;}return b1.isConnected;});});
   chk(rid);const sh=[...w].map((ch,i)=>(side==0?i<half:i>=w.length-half)?ch:'_').join(' ');
   P.open(null);P.head('ANTES Y DESPUÉS',side==0?'Principio de la palabra':'Final de la palabra');P.hud();P.tag();P.add('a txt',esc12(d),{top:'96px',left:'20px',width:'600px'});P.add('a shape',sh+'<br><small>'+tm.n+'</small>',{top:'200px',font:'800 30px N,Arial',letterSpacing:'6px'});
   const r=await P.respond(rid,tm,[w],{p:.5});if(r.ok)P.gain(tm,1,2);await P.fb(rid,r.ok,w);}}
 finally{P.close();P.setTag();}}
async function pirami12(rid){const P=PCX();if(!P.TMS)P.newTeams();P.setTag('🆕 INVENTADO · Pirámide (datos del juego de PC)');try{await P.J4(rid);}finally{P.close();P.setTag();}}
CORT.una2={title:['Una','de Dos'],tx:0,ty:0,fs:78,mk:null};CORT.antes12={title:['Antes y','Después'],tx:0,ty:0,fs:78,mk:null};CORT.piramide={title:['La','Pirámide'],tx:0,ty:0,fs:78,mk:null};
for(const [i,t] of [[1,['De la','A a la Z']],[2,['La Palabra','Incompleta']],[3,['Famosos','con Pista']],[4,['La','Pirámide']],[5,['La Palabra','Imposible']]])CORT['j'+i]={title:t,tx:0,ty:0,fs:78,mk:null};
{const mkW=w=>(AW,blue)=>{const it=[];const s=w.replace(/ /g,'');for(let r=0;r<7;r++)for(let i=0;i<14;i++)it.push({ch:s[(i+r*3)%s.length],base:new T.Vector3(-AW*.5+i*AW/13,-260+r*90,-40+(i%3)*30),p:new T.Vector3(),s:r==3?70:34,r:rnd(-.3,.3),c:0xffffff,row:r,d:(i+r)*.03});
 const art=letterCloud(it,{op:.85});art.anim=t=>{art.items.forEach(x=>{const k=Math.min(1,Math.max(0,(t-x.d)*1.4));x.p.set(x.base.x,x.base.y+(1-eout(k))*600,x.base.z);});art.upd();};return art;};
 const W={cruz12:'PALABRASCRUZADAS',una2:'UNADEDOS',antes12:'ANTESYDESPUES',piramide:'LAPIRAMIDE',j1:'DELAAALAZ',j2:'PALABRAINCOMPLETA',j3:'FAMOSOSCONPISTA',j4:'LAPIRAMIDE',j5:'LAPALABRAIMPOSIBLE'};
 for(const k in W)CORT[k].mk=mkW(W[k]);}
// ---------- A la Z de 2026: una sola respuesta válida y cabinas individuales ----------
let alaZ12=null;{const _a=alaZ,src=_a.toString();
 if(src.includes('ans.some(a=>norm(a)===norm(v))')){let s=src.replace('ans.some(a=>norm(a)===norm(v))','norm(ans[0])===norm(v)').replace('Una definición por letra:','Cada concursante juega en su <b>cabina individual</b>. Una definición por letra:').replace('Con el botón <b>Pista</b>','Solo vale la respuesta exacta. Con el botón <b>Pista</b>').replace('async function alaZ(','async function alaZ12x(');
  try{alaZ12=(0,eval)('('+s+')');}catch(e){console.error('alaZ12',e);}}
 alaZ=async function(rid){if(SW12.on&&SW12.real==2026&&alaZ12){try{if(await voz('alaz_dir',rid)){}}catch(e){if(e instanceof Stop)throw e;}const o26=ST12[2026],F=P.frame&&P.frame.material,G0=P.glow&&P.glow.material;const sf=F&&F.color.getHex(),sg=G0&&G0.color.getHex();try{if(F)F.color.setHex(0xff7a1a);if(G0)G0.color.setHex(0xff7a1a);cabinas12(true);return await alaZ12(rid);}finally{cabinas12(false);if(F)F.color.setHex(sf);if(G0)G0.color.setHex(sg);}}return _a.apply(this,arguments);};}
// ---------- cabinas 3D (2026) ----------
function cabinas12(on){if(!P.root)return;if(!P.cab12){const g=new T.Group();const pm=new T.MeshBasicMaterial({color:0xff7a1a}),gm=new T.MeshBasicMaterial({color:0x7fd0ff,transparent:true,opacity:.18,side:T.DoubleSide});
  for(const [x,sg] of [[3.95,1],[-3.95,-1]]){const c=new T.Group();c.position.set(x,0,.5);
   for(const px of[-.6,.6])for(const pz of[-.75,.75]){const p=new T.Mesh(new T.BoxGeometry(.07,2.5,.07),pm);p.position.set(px,1.25,pz);c.add(p);}
   const top=new T.Mesh(new T.BoxGeometry(1.35,.08,1.6),pm);top.position.y=2.5;c.add(top);
   const back=new T.Mesh(new T.BoxGeometry(.04,2.4,1.5),gm);back.position.set(sg*.62,1.25,0);c.add(back);
   for(const pz of[-.75,.75]){const s=new T.Mesh(new T.BoxGeometry(1.2,2.4,.04),gm);s.position.set(0,1.25,pz);c.add(s);}
   const lt=new T.Mesh(new T.BoxGeometry(.5,.12,.04),new T.MeshBasicMaterial({color:sg>0?0x2a6af0:0xf07a1a}));lt.position.set(0,2.35,sg*0+.0+.78*0);lt.position.z=.0;c.add(lt);g.add(c);}
  P.root.add(g);P.cab12=g;}
 P.cab12.visible=!!on;}
// ---------- aspecto de cada plató y del presentador ----------
const HL12={sv:null,long:null};
function look12(y){const o=ST12[y];if(!P.root||!P.host)return;
 if(o){const c=P.frame&&P.frame.material;if(c)c.color.setHex(o.frame);[P.band,P.led,P.cring].forEach(m=>m&&m.material.color.setHex(o.lc));if(P.glow)P.glow.material.color.setHex(o.gl);S.background.setHex(o.bg);S.fog.color.setHex(o.bg);}
 const h=P.host;if(h){if(!HL12.su){HL12.su=[];HL12.ha=[];h.traverse(m=>{if(!m.isMesh||!m.material.color)return;const x=m.material.color.getHex();if(x==0x17171b||x==0x1a1d26)HL12.su.push(m);else if(x==0x4a2c16)HL12.ha.push(m);});HL12.su.concat(HL12.ha).forEach(m=>m.userData.c12=m.material.color.getHex());}
  [...HL12.su].forEach(m=>{if(!m.userData.own){m.material=m.material.clone();m.userData.own=1;}m.material.color.setHex(o?o.suit:m.userData.c12);});
  HL12.ha.forEach(m=>{if(!m.userData.own){m.material=m.material.clone();m.userData.own=1;}m.material.color.setHex(o?o.hair:m.userData.c12);});
  const hm=HL12.ha[0];if(hm){if(!HL12.long){HL12.long=new T.Mesh(new T.CylinderGeometry(.15,.17,.34,12,1,true,PI*.3,PI*1.4),hm.material);HL12.long.position.set(0,-.12,-.03);hm.parent.add(HL12.long);}HL12.long.visible=!!(o&&o.long);}}
 cabinas12(false);}
{const _ap=applyPlato;applyPlato=function(y){const r=_ap.apply(this,arguments);try{look12(OPT.a3);}catch(e){console.error(e);}return r;};if(window.DBG)DBG.applyPlato=applyPlato;}
function setA3(y){const o=ST12[y];OPT.a3=o?y:0;if(o){OPT.etapa=OPT.plato=o.base;}saveOpt();applyPlato(OPT.plato);LOGO=logoURL();}
// ---------- tablas de pruebas de cada etapa ----------
const P07=Object.fromEntries(ETAPAS[2007].pr.map(x=>[x[0],x[1]])),P19=ETAPAS[2019].pr.map(x=>x.slice());
const roscoOff=(fn,off)=>async rid=>{GAME.sec[0]-=off;GAME.sec[1]-=off;try{await fn(rid);}finally{GAME.sec[0]+=off;GAME.sec[1]+=off;}};
const pcj=n=>async rid=>{await PCX().juego(rid,n);};
function mkE12(y){const S=ST12[y],E19=ETAPAS[2019];let pr,names,blue=false,lines={};
 if(y==2000){pr=[['j1',pcj(1)],['j2',pcj(2)],['j3',pcj(3)],['j4',pcj(4)],['j5',pcj(5)],['rosco',pcj(6)]];names='De la A a la Z, La palabra incompleta, Famosos con pista, La pirámide, La palabra imposible y El rosco de 28 letras (juego de PC)';}
 else if(y==2002){pr=[['una2',una2],['pulsador',P07.pulsador],['depar',P07.depar],['piramide',pirami12],['antes12',antes12],['imposible',P07.imposible],['rosco',roscoOff(P07.rosco,30)]];names='Una de dos, El pulsador, De par en par, La pirámide, Antes y después, La palabra imposible y El rosco de 25 letras y 90 s (🆕 INVENTADO)';}
 else if(y==2006){pr=[['una2',una2],['pulsador',P07.pulsador],['depar',P07.depar],['piramide',pirami12],['imposible',P07.imposible],['rosco',roscoOff(P07.rosco,30)]];names='Una de dos, El pulsador, De par en par, La pirámide, La palabra imposible y El rosco de 25 letras y 90 s (🆕 INVENTADO)';}
 else{blue=true;lines=Object.assign({},E19.lines);const m=Object.fromEntries(P19.map(x=>[x[0],x[1]]));const cr=['cruz12',cruz12];
  if(y==2020){pr=[['silla',m.silla],['u4',m.u4],['pista',m.pista],['sopa',m.sopa],['donde',m.donde],['rosco',roscoOff(m.rosco,35)]];names='Silla azul, Una de cuatro, La pista, Sopa de letras, ¿Dónde están? y El rosco de 85 s';}
  else if(y==2023){pr=[['silla',m.silla],['u4',m.u4],['pista',m.pista],OPT.cruz12?cr:['sopa',m.sopa],['donde',m.donde],['rosco',roscoOff(m.rosco,35)]];names='Silla azul, Una de cuatro, La pista, '+(OPT.cruz12?'Palabras cruzadas (9 palabras, 75 s)':'Sopa de letras')+', ¿Dónde están? y El rosco de 85 s';}
  else{pr=[['silla',m.silla],['u4',m.u4],['pista',m.pista],cr,['donde',m.donde],['rosco',m.rosco]];names='Silla azul, Una de cuatro, La pista, Palabras cruzadas, ¿Dónde están? y «A la Z» (orden aproximado)';}}
 return {names,pr,blue,lines};}
for(const y of A3_ORD)ETAPAS[y]=mkE12(y);
// ---------- swap ----------
function sw12(y){const S=ST12[y];if(!S||SW12.on)return false;SW12.sv={e:OPT.etapa,p:OPT.plato,f:OPT.final,E:ETAPAS[S.base]};SW12.on=true;SW12.real=y;SW12.base=S.base;
 ETAPAS[y]=mkE12(y);ETAPAS[S.base]=ETAPAS[y];OPT.etapa=OPT.plato=S.base;OPT.final=y==2026?'alaz':'rosco';return true;}
function unsw12(){if(!SW12.on)return;ETAPAS[SW12.base]=SW12.sv.E;OPT.etapa=SW12.sv.e;OPT.plato=SW12.sv.p;OPT.final=SW12.sv.f;SW12.on=false;}
{const _p=programa;programa=async function(){const y=OPT.a3&&ST12[OPT.a3]?OPT.a3:0;if(!y)return _p.apply(this,arguments);
  const pb=SW12.prog?OPT.bote:null;sw12(y);if(y==2000||y==2002||y==2006){PCX().newTeams();PCX().setProg(Math.floor(Math.random()*JQ12.length));}
  if(y==2000)PCX().setTag();try{toast12(y);return await _p.apply(this,arguments);}finally{unsw12();if(SW12.prog){OPT.bote=SW12.bote0;SW12.prog=0;saveOpt();}}};}
function toast12(y){const o=ST12[y];toast('📺 Antena 3 · '+o.n+' · '+o.fechas+' · '+o.tag,5200);}
// voz: solo las frases de la etapa (nunca las de Christian Gálvez)
{const _v=voz;const AL={piramide_pre:'escalera_pre',antes12_pre:'antes_pre'};
 voz=async function(k,rid){if(!SW12.on)return _v.apply(this,arguments);const o=ST12[SW12.real],L=SL12[o.k]||{};const t=L[AL[k]||k];if(!t)return false;
  cut('host');stopMusic();try{await v9say(L.R,t,rid,L.N);}finally{say();}return true;};}
{const _c=V5.clip;V5.clip=function(h){return SW12.on?null:_c.apply(this,arguments);};}
{const _h=C6.host;C6.host=()=>OPT.a3&&ST12[OPT.a3]?ST12[OPT.a3].n:_h();const _l=C6.list;C6.list=function(){const r=_l.apply(C6,arguments);if(!(OPT.a3&&ST12[OPT.a3]))return r;const m=x=>Array.isArray(x)?x.map(m):typeof x==='string'?x.replace(/Etapa \d+/,'Antena 3 · etapa '+OPT.a3).replace('Christian Gálvez',ST12[OPT.a3].n):x;return m(r);};}
// bote en pesetas en la etapa 2000-2002 (1 millón por programa; 6.000 € ≈ 1.000.000 ptas)
{const _b=boteTxt;boteTxt=function(){if(SW12.on&&SW12.real==2000&&!SW12.eur){const p=Math.round(((OPT.bote||60000)/6000)*1000000);return String(p).replace(/\B(?=(\d{3})+(?!\d))/g,'.')+' pts';}return _b.apply(this,arguments);};}
// ---------- menús ----------
const T26=['Una de cuatro','La pista','Palabras cruzadas','¿Dónde están?','A la Z'];
SCR9.a12hub=()=>`<h2>📺 Antena 3 · 2000-2006 y 2020-2026</h2><div class="mtext">Presentadores: <b>Silvia Jato</b> (24/7/2000–15/11/2002 y 8/1/2003–17/3/2006), <b>Constantino Romero</b> (18/11/2002–7/1/2003) y <b>Jaime Cantizano</b> (20/3–9/6/2006); después <b>Roberto Leal</b> (desde el 13/5/2020). Elige una etapa para jugar el programa completo. Lo que está marcado <b>aproximado</b> o <b>🆕 INVENTADO</b> no es fiel.</div>
 ${mb9('a12:play:2000','▶','Silvia Jato · 2000-2006','Seis juegos como el juego de PC (PASAP.EXE) y rosco de 28 letras / 100 s · bote en pesetas · aproximado')}
 ${mb9('a12:pc','🖥','El juego de PC de Silvia Jato','Menú, juegos, ayuda y museo recompuestos con los gráficos del ISO · aproximado')}
 ${mb9('a12:play:2002','▶','Constantino Romero · 2002-2003','🆕 INVENTADO · rosco de 25 letras y 90 s')}
 ${mb9('a12:play:2006','▶','Jaime Cantizano · 2006','🆕 INVENTADO · rosco de 25 letras y 90 s')}
 ${mb9('a12:play:2020','▶','Roberto Leal · desde 2020','Rosco de 85 s · aproximado')}
 ${mb9('a12:play:2023','▶','Roberto Leal · desde diciembre de 2023',OPT.cruz12?'Con palabras cruzadas en lugar de la sopa de letras':'Sopa de letras (activa «Palabras cruzadas» en Opciones)')}
 ${mb9('a12s26','📅','JUNIO 2026 EN ADELANTE','Todos los programas con la nueva prueba «A la Z»')}
 ${mb9('a12info','ℹ','Qué es real y qué es inventado','Notas de esta versión')}${back9()}`;
SCR9.a12s26=()=>`<h2>📅 JUNIO 2026 EN ADELANTE · «A la Z»</h2><div class="mtext">Nueva prueba final de Roberto Leal. Primer duelo: <b>David contra Javier</b> con un bote de <b>658.000 €</b> (19/6/2026). Pruebas del programa (orden sin confirmar): ${T26.join(', ')}. Sin Rosco.</div>
 ${mb9('a12:play:2026','▶','Programa completo 2026','Cuatro pruebas y «A la Z»')}
 ${mb9('a12:alaz','🔤','Solo «A la Z»','110 s + acumulados · cabinas individuales · una única respuesta válida')}
 ${mb9('a12:cab','🎞','Cabecera de «A la Z»','Recreada del vídeo oficial')}
 ${mb9('a12reg','📖','Reglas de «A la Z»','Quien tiene más segundos elige el sentido')}
 ${Array.from({length:12},(_,i)=>mb9('a12:prog:'+(i+1),'🎙','Programa '+(i+1)+(i==0?' · 19/6/2026':''),i==0?'David contra Javier · bote 658.000 € (dato real; lo demás aproximado)':'Bote '+fmt9(658000+i*6000)+' € · 🆕 INVENTADO (si nadie gana el bote)')).join('')}${back9('a12hub')}`;
SCR9.a12reg=()=>`<h2>📖 Reglas de «A la Z»</h2><div class="mtext">• El jugador con <b>más segundos</b> elige el sentido (A→Z o Z→A); el rival juega <b>al revés</b>.<br>• <b>110 segundos</b> más los acumulados. 25 palabras, una por letra.<br>• Se ven los huecos: <b>cada raya es una letra</b>. Cada pista (letra) cuesta <b>5 s</b>; solo una letra por palabra, al azar.<br>• <b>Una única respuesta válida</b>. Se mantiene el pasapalabra.<br>• Cada concursante, en su <b>cabina individual</b>; interfaz lineal.<br>• 25 aciertos → <b>bote</b>. Si no: +6.000 € al bote y el ganador se lleva <b>1.200 €</b> (empate: menos fallos; empate total: 600 € cada uno). El perdedor, a la <b>silla azul</b>.<br><br><b>Aproximado:</b> pistas de 2026 vistas solo en capturas; falta el vídeo del 19/6.</div>${back9('a12s26')}`;
SCR9.a12info=()=>`<h2>ℹ Qué es real y qué es inventado</h2><div class="mtext"><b>REAL (referencia: ISO con el juego de PC de Antena 3, PASAP.EXE):</b> gráficos, fuentes, menús, pantallas, definiciones y reglas de los 6 juegos de la etapa Jato. Como PASAP.EXE no se ha podido ejecutar, las pantallas están <b>recompuestas</b> con sus propios recursos (aproximado).<br><br><b>REAL (Wikipedia):</b> presentadores y fechas, rosco de 28 letras y 100 s (luego 25 y 90 s), 110 s en las eliminatorias de 2003, bote +1 millón de pesetas por programa, 200.000 pesetas sin bote, pirámide en 4.º lugar, empieza el que tiene menos segundos.<br><br><b>🆕 INVENTADO:</b> pruebas, platós, pistas y textos de Romero y Cantizano (2002-2006); «Una de dos» y «Antes y después»; plató y 3D de todas las etapas; las ${CRUZ12.total} parejas de sílabas de las palabras cruzadas; los programas 2-12 de 2026.<br><br><b>Aproximado:</b> orden de las pruebas de 2026, rosco de 85 s, plató de Leal, logos y música.</div>${back9('a12hub')}`;
{const _m=SCR9.main9;}
let CAB12=null;
function go12(g){const [,k,a]=g.split(':');
 if(k=='play'){setA3(+a);return startGame();}
 if(k=='prog'){setA3(2026);SW12.bote0=OPT.bote;SW12.prog=+a;OPT.bote=658000+(+a-1)*6000;return startGame();}
 if((k=='pc'||k=='pcm')&&window.SJ13&&SJ13.disponible())return SJ13.abrir(k=='pcm'?'main':'a12hub');
 if(k=='pc'||k=='pcm')return scene9(async rid=>{PCX().setTag();PCX().newTeams();await PCX().pcMenu(rid);},{back:k=='pcm'?'main':'a12hub',banner:'🖥 MODO CLÁSICO · JUEGO DE PC DE SILVIA JATO (2000-2002) · aproximado'});
 if(k=='cab')return scene9(async rid=>{sw12(2026);try{await alazCab(rid);}finally{unsw12();}},{back:'a12s26',banner:'🎞 CABECERA «A LA Z»'});
 if(k=='alaz')return scene9(async rid=>{sw12(2026);GAME.sec=[Math.round(rnd(8,30)),Math.round(rnd(8,30))];GAME.ac=[0,0];try{await voz('alaz_cab',rid);await alaZ(rid);}finally{unsw12();}},{back:'a12s26',banner:'🔤 A LA Z · 2026'});}
{const _sm=showMenu;showMenu=function(s='main'){
  if(typeof s=='string'&&s.startsWith('x12:'))return x9go(s);
  if(typeof s=='string'&&s.startsWith('a12:'))return go12(s);
  const r=_sm.apply(this,arguments);
  if(s=='main'){const col=menu.querySelector('.col'),opt=col&&(col.querySelector('[data-go=fam10]')||col.querySelector('[data-go=opt]'));if(opt&&!col.querySelector('[data-go=a12hub]')){opt.insertAdjacentHTML('beforebegin',mb9('a12:pcm','🖥','Modo clásico · juego de PC de Silvia Jato (2000-2002)','Los 6 juegos de PASAP.EXE en 2D: A-Z, Palabra incompleta, Famosos, Pirámide, Palabra imposible y Rosco de 28 · 52 programas')+mb9('a12hub','📺','Antena 3 · 2000-2006 y 2020-2026','Jato, Romero, Cantizano, Leal, palabras cruzadas y «A la Z» de junio de 2026'));bind9(col,['a12hub','a12:pcm']);try{NAV.attach(s);}catch(e){}}}
  if(s=='opt'){const col=menu.querySelector('.col');if(col&&!col.querySelector('[data-a3]')){
   col.querySelectorAll('.tbtn').forEach(b=>{b.addEventListener('pointerdown',()=>{OPT.a3=0;},true);if(OPT.a3)b.classList.remove('on');});
   const rows=col.querySelectorAll('.orow');const last=rows.length?rows[Math.min(rows.length-1,[...rows].findIndex(r=>r.textContent.includes('ETAPA')))]:null;
   const html=`<div class="orow"><label>📺 PLATÓ Y ETAPA DE ANTENA 3</label><span class="a3w">${A3_ORD.map(y=>`<button class="tbtn ${OPT.a3==y?'on':''}" data-a3="${y}">${y==2000?'Jato 2000':y==2002?'Romero 2002':y==2006?'Cantizano 2006':y==2020?'Leal 2020':y==2023?'Leal 2023':'A la Z 2026'}</button>`).join('')}</span></div>
    <div class="orow"><label>🔡 PALABRAS CRUZADAS (en 2023, en lugar de la sopa de letras): <b class="v9">${OPT.cruz12?'Sí':'No'}</b></label><input type="range" min="0" max="1" step="1" value="${OPT.cruz12?1:0}" data-o12c="cruz12"></div>`;
   if(last)last.insertAdjacentHTML('afterend',html);else col.querySelector('h2').insertAdjacentHTML('afterend',html);
   col.querySelectorAll('[data-a3]').forEach(b=>b.onpointerdown=e=>{e.preventDefault();sfx('ok');setA3(+b.dataset.a3);showMenu('opt');});
   col.querySelectorAll('[data-o12c]').forEach(i=>i.oninput=()=>{OPT.cruz12=+i.value;i.parentNode.querySelector('.v9').textContent=+i.value?'Sí':'No';saveOpt();});
   const t0=NAV.screen==s&&NAV.cur()?NAV.cur().textContent:null;try{NAV.attach(s);if(t0!==null){const k=NAV.items.findIndex(e=>e.textContent===t0);if(k>=0&&k!==NAV.idx)NAV.focus(k,true);}}catch(e){}}}
  return r;};}
{const st=document.createElement('style');st.textContent='.a3w{display:flex;flex-wrap:wrap;gap:6px}.a3w .tbtn{flex:0 0 auto}';document.head.appendChild(st);}
// al arrancar: si hay etapa elegida, aplica su aspecto
try{if(OPT.a3&&ST12[OPT.a3]){OPT.etapa=OPT.plato=ST12[OPT.a3].base;applyPlato(OPT.plato);LOGO=logoURL();}}catch(e){console.error(e);}

// ===== v0.12 · LA ESCALERA (Telecinco) alineada con la «Pirámide» del Modo clásico / Wikipedia =====
// Antes: 65 s, +5 s por acierto, sin compañero y empezaba el azul. Ahora: 90 s, +1 s por palabra acertada, un fallo pasa al compañero y empieza el equipo naranja.
try{const f=escalera;let src=f.toString();const rep=[
 ['t=65,ac=0;','t=90,ac=0;'],
 ["P.cpu.pul.visible=false;","P.cpu.pul.visible=false;{const c0=await cpuTurn('Rival',COL.or,.65,rid);GAME.sec[1]+=c0;GAME.ac[1]+=c0;await rotulo(`NARANJA (empieza): ${c0} ACIERTOS · +${c0} s`,COL.or,rid);clearG();}"],
 ["hostSay(`Era <b>${w}</b>.`);await wait(1,rid);","hostSay('Fallo: el turno pasa a tu compañero…');await wait(1.2,rid);if(Math.random()<.55){ac++;b.setC(COL.bl);b.L.set();sfx('ok');hostSay(`¡Tu compañero acierta: <b>${w}</b>!`);}else hostSay(`Era <b>${w}</b>.`);await wait(1,rid);"],
 ["GAME.sec[0]+=ac*5;","GAME.sec[0]+=ac;"],
 ["+${ac*5} s`,COL.bl,rid);","+${ac} s`,COL.bl,rid);"],
 ["clearG();const c=await cpuTurn('Rival',COL.or,.65,rid);GAME.sec[1]+=c*5;await rotulo(`NARANJA: ${c} ACIERTOS · +${c*5} s`,COL.or,rid);clearG();}","clearG();}"],
 ['empezamos con 7 letras y cada palabra tiene una letra menos. ¡Baja la escalera!','empezamos con 7 letras y cada palabra es un anagrama de la anterior con una letra menos. 90 segundos, 1 más por palabra; si fallas, pasa a tu compañero. ¡Baja la escalera!']];
for(const [a,b] of rep){if(!src.includes(a))console.warn('v12 escalera parche',a.slice(0,50));src=src.split(a).join(b);}
const nf=(0,eval)('('+src+')');window.__v12esc=nf;(0,eval)('escalera=window.__v12esc');
Object.values(ETAPAS).forEach(E=>E.pr&&E.pr.forEach(p=>{if(p[1]===f)p[1]=nf;else if(p[0]=='escalera'&&p[1].v3)p[1]=Object.assign(async function(rid){cut('orbitR');return nf(rid);},{v3:1});}));
if(window.DBG)DBG.escalera=nf;}catch(e){console.error('escalera12',e);}
$('#ver').textContent='v0.12';
Object.assign(window.DBG||{},{ST12,SW12,sw12,unsw12,setA3,go12,una2,antes12,pirami12,cruz12:()=>cruz12,alaZ12:()=>alaZ12,CRUZ12,look12,cabinas12});
