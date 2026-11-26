// ===== v0.28 · SOPA DE LETRAS y UNA DE CUATRO tal cual Telecinco 2018-2019 (prueba15.mp4 / prueba14.mp4) =====
(()=>{
const TC=bl=>bl?{a:'#1a78f0',d:'#0b3a9c',lt:'#9fd4ff',hx:0x1a78f0}:{a:'#ff8a12',d:'#e05a00',lt:'#ffd23a',hx:0xff8a12};
const SOPA18=[['EN EL ESTUCHE',['LAPIZ','GOMA','REGLA']],['MANERAS DE LLAMAR A FRANCISCO',['PACO','FRAN','CURRO']],['COLORES',['VERDE','AZUL','ROJO']],['LOS PICAPIEDRA',['PABLO','DINO','VILMA']],['PAÍSES DE AMÉRICA',['CUBA','PERU','CHILE']],['PASAPALABRA',['ROSCO','BOTE','LETRA']],['MIEMBROS DE LA FAMILIA',['PADRE','MADRE','TIO']],['EN LA BARAJA ESPAÑOLA',['REY','SOTA','ORO']],['HORÓSCOPO',['LEO','ARIES','TAURO']],['NÚMEROS',['UNO','DOS','TRES']],['FRUTAS',['PERA','KIWI','UVA']],['ANIMALES',['GATO','LEON','OSO']]];
const DIRS=[[0,1],[1,0],[1,1],[-1,1]];
function grid18(ws){for(let tr=0;tr<400;tr++){const g=Array(25).fill(null),pos={};let ok=true;
 for(const w of ws){let placed=false;for(let k=0;k<60&&!placed;k++){const [dr,dc]=DIRS[Math.floor(Math.random()*4)];const r0=Math.floor(Math.random()*5),c0=Math.floor(Math.random()*5);const ix=[];
  for(let i=0;i<w.length;i++){const r=r0+dr*i,c=c0+dc*i;if(r<0||r>4||c<0||c>4){ix.length=0;break;}const j=r*5+c;if(g[j]&&g[j]!==w[i]){ix.length=0;break;}ix.push(j);}
  if(ix.length===w.length){ix.forEach((j,i)=>g[j]=w[i]);pos[w]=ix;placed=true;}}if(!placed){ok=false;break;}}
 if(ok){const A='ABCDEFGHIJKLMNOPQRSTUVWXYZ';return {g:g.map(x=>x||A[Math.floor(Math.random()*26)]),pos};}}return null;}
function foot(c,bl,txt,right){// rodapié: círculo con cuenta atrás a la izquierda, barra del tema, cuadrado blanco a la derecha
 const W=Math.min(GW*.62,640);const L=label(W,70,(g,cw,ch,k)=>{const C=TC(c.bl);const r=ch/2-2*k;
  g.fillStyle='#fff';g.beginPath();g.roundRect(ch*.7,ch*.18,cw-ch*.7-ch*.1,ch*.64,ch*.1);g.fill();const gr=g.createLinearGradient(0,ch*.2,0,ch*.8);gr.addColorStop(0,C.a);gr.addColorStop(1,C.d);g.fillStyle=gr;g.fillRect(ch*.7,ch*.24,cw-ch*.7-ch*1.0,ch*.52);
  ftxt(g,c.txt,(ch*.7+cw-ch*1.0)/2+ch*.2,ch/2+2*k,ch*.3,'#fff','center',cw-ch*2.4,0);
  g.fillStyle='#fff';g.beginPath();g.roundRect(cw-ch*.95,ch*.1,ch*.85,ch*.8,ch*.12);g.fill();ftxt(g,String(c.right),cw-ch*.525,ch/2+2*k,ch*.55,C.d,'center',ch,0);
  g.fillStyle='#fff';g.beginPath();g.arc(ch/2,ch/2,r,0,7);g.fill();g.fillStyle=C.a;g.beginPath();g.arc(ch/2,ch/2,r-4*k,0,7);g.fill();ftxt(g,String(c.t),ch/2,ch/2+2*k,ch*.48,'#fff','center',ch,0);});
 return L;}
async function sopa18(rid){prep();const bl=OPT.eq25!==1,C=TC(bl);const names=['Jugador 1','Jugador 2','Jugador 3'];let who=0;
 cut('host');hostSay('<b>Sopa de Letras</b>: en cada panel hay <b>tres palabras</b> del tema (horizontal, vertical o diagonal). Toca la primera y la última letra. Si fallas o dices <b>pasapalabra</b>, juega tu compañero. Podéis pasar palabra o fallar cuatro veces. A la quinta, el panel se retira y colocamos uno nuevo. Panel completo = <b>+5 segundos</b>. 90 segundos por equipo.');await wait(4,rid);
 cut({p:V3(1.6,1.75,-.6),l:V3(4.6,1.5,.9),f:30,dr:.04});
 const st={t:90};let secs=0,found=0;const sets=shuffle(SOPA18.slice());let si=0;const fc={bl,txt:'',t:90,right:5};const F=foot(fc);F.position.set(0,-270,20);G.add(F);
 let cells=[],S,first=null,fails=0,done;const fx=bl?GW*.22:-GW*.22;
 const cellL=(ch,i)=>{const o={st:'w'};const L=label(58,58,(g,cw,chh,k)=>{g.fillStyle=o.st=='g'?'#2fbf2f':o.st=='s'?C.lt:'#fff';g.beginPath();g.roundRect(3*k,3*k,cw-6*k,chh-6*k,5*k);g.fill();ftxt(g,ch,cw/2,chh/2+2*k,34*k,o.st=='g'?'#fff':C.a,'center',cw,0);});L.o=o;L.position.set(fx+(i%5-2)*62,95-Math.floor(i/5)*62+0,5);L.userData.tap=i;return L;};
 let frame;const newPanel=()=>{cells.forEach(c=>G.remove(c));if(frame)G.remove(frame);const [th,ws]=sets[si++%sets.length];S=grid18(ws);S.ws=ws;S.found=new Set();fails=0;first=null;fc.txt=th;fc.right=5;F.set();
  frame=label(330,330,(g,cw,ch,k)=>{g.fillStyle=C.a;g.beginPath();g.roundRect(0,0,cw,ch,14*k);g.fill();g.strokeStyle=C.lt;g.lineWidth=4*k;g.stroke();});frame.position.set(fx,95-124+124-124,0);frame.position.y=95-124;G.add(frame);
  cells=S.g.map((ch,i)=>{const c=cellL(ch,i);G.add(c);return c;});sfx('ok');};
 const fail=async()=>{fails++;fc.right=5-fails;F.set();sfx('error');who=(who+1)%3;say(`Turno de <b>${names[who]}</b>`);if(fails>=5){sfx('j12_timeover');say('Quinto fallo: el panel se retira y colocamos uno nuevo');await wait(.8,rid);newPanel();}};
 newPanel();anim(dt=>{if(rid!==RUN||st.t<=0)return false;st.t-=dt;const v=Math.max(0,Math.ceil(st.t));if(v!==fc.t){fc.t=v;F.set();}return true;});
 setActs([{t:'Pasapalabra',ic:'➜',cb:()=>{if(first!==null){cells[first].o.st='w';cells[first].set();first=null;}fail();}}]);
 TAP=async id=>{if(typeof id!=='number'||st.t<=0)return;if(first===null){first=id;cells[id].o.st='s';cells[id].set();return;}const a=first,b=id;first=null;cells[a].o.st='w';cells[a].set();
  const w=S.ws.find(w=>!S.found.has(w)&&((S.pos[w][0]===a&&S.pos[w].at(-1)===b)||(S.pos[w][0]===b&&S.pos[w].at(-1)===a)));
  if(w){S.found.add(w);found++;S.pos[w].forEach(i=>{cells[i].o.st='g';cells[i].set();});sfx('ok');say(`¡<b>${w}</b>!`);if(S.found.size>=3){secs+=5;const b5=bar(60,60,C.hx,'5',{fs:40,r:8});b5.position.set(fx+(bl?-210:210),95,30);G.add(b5);sfx('winner');await wait(.9,rid);G.remove(b5);newPanel();}}else await fail();};
 await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN){r();return false;}return true;}));chk(rid);TAP=null;setActs();sfx('j12_timeover');await wait(1,rid);clearG();
 GAME.sec[0]+=secs;GAME.ac[0]+=found;await rotulo(`${bl?'AZUL':'NARANJA'}: ${secs/5} PANELES · +${secs} s`,C.hx,rid);clearG();
 const cp=Math.round(rnd(1,4));GAME.sec[1]+=cp*5;GAME.ac[1]+=cp*3;await rotulo(`${bl?'NARANJA':'AZUL'}: ${cp} PANELES · +${cp*5} s`,bl?0xff8a12:0x1a78f0,rid);clearG();}
// ---------- UNA DE CUATRO 2018 ----------
const U418={FRUTAS:[['FRESA','Fruta roja con las semillas por fuera.'],['MANZANA','Fruta prohibida del paraíso.'],['PERA','Fruta que da nombre a la forma de algunas bombillas.'],['NARANJA','Cítrico del que se hace el zumo más popular del desayuno.'],['KIWI','Fruta peluda que comparte nombre con un ave de Nueva Zelanda.'],['MELOCOTÓN','Fruta de piel aterciopelada que se toma en almíbar.'],['UVA','Se toman doce en Nochevieja.'],['MANDARINA','Cítrico pequeño que se pela con los dedos.'],['CEREZA','Fruta roja que suele ir por parejas unidas por el rabo.'],['PLÁTANO','Fruta amarilla típica de Canarias.'],['SANDÍA','Fruta enorme, verde por fuera y roja por dentro.'],['LIMÓN','Cítrico ácido que acompaña al pescado.'],['PIÑA','Fruta tropical con corona de hojas.'],['MELÓN','Se dice que con él «no se sabe lo que sale».']],
 MAMÍFEROS:[['CAMELLO','Mamífero del desierto con dos jorobas.'],['KOALA','Mamífero australiano que come hojas de eucalipto.'],['HIPOPÓTAMO','Su nombre significa «caballo de río».'],['ELEFANTE','El mamífero terrestre más grande.'],['CANGURO','Mamífero que lleva a su cría en una bolsa.'],['OSO PANDA','Mamífero blanco y negro que come bambú.'],['RINOCERONTE','Mamífero con uno o dos cuernos en el hocico.'],['JIRAFA','El mamífero más alto.'],['MURCIÉLAGO','El único mamífero que vuela.'],['DROMEDARIO','Como el camello, pero con una sola joroba.'],['MUSARAÑA','Uno de los mamíferos más pequeños del mundo.'],['MAPACHE','Mamífero con antifaz que lava la comida.'],['PERRO','El mejor amigo del hombre.'],['OVEJA','Mamífero que da lana.'],['VACA','Mamífero que da leche y dice «mu».']]};
async function u418(rid){prep();const bl=OPT.eq25!==1,C=TC(bl);const th=bl?'MAMÍFEROS':'FRUTAS',pool=shuffle(U418[th].slice());
 cut('host');hostSay(`<b>Una de Cuatro</b>: tema <b>${th}</b>. Te leo una definición: toca la palabra correcta de las cuatro. Acierte o falle, solo la correcta se cambia por otra nueva. Si fallas, juega tu compañero. 90 segundos.`);await wait(4,rid);
 cut({p:V3(1.6,1.75,-.6),l:V3(4.6,1.5,.9),f:30,dr:.04});
 const st={t:90};let ac=0,qi=0;let board=pool.splice(0,4);let tv=90,Q=th;
 const pill=(i)=>{const o={w:''};const L=label(230,52,(g,cw,ch,k)=>{if(!o.w)return;g.fillStyle=bl?'#9fd4ff':'#ff7a00';g.beginPath();g.roundRect(0,0,cw,ch,ch/2);g.fill();g.fillStyle=o.c||(bl?'#0b2f86':'#ffc21a');g.beginPath();g.roundRect(4*k,4*k,cw-8*k,ch-8*k,ch/2-4*k);g.fill();ftxt(g,o.w,cw/2,ch/2+2*k,ch*.42,'#fff','center',cw-24*k,bl?0:3*k);});L.o=o;L.position.set(-GW/2+170+(i%2)*245,150-Math.floor(i/2)*66,5);L.userData.tap=i;G.add(L);return L;};
 const P=[0,1,2,3].map(pill);const draw=()=>P.forEach((p,i)=>{p.o.w=board[i]?board[i][0]:'';p.set();});draw();
 const W=Math.min(GW*.78,900);const QB=label(W,74,(g,cw,ch,k)=>{const r=ch/2-2*k;g.fillStyle=bl?'#9fd4ff':'#ff7a00';g.beginPath();g.roundRect(ch*.6,ch*.14,cw-ch*.6,ch*.72,ch*.36);g.fill();g.fillStyle='#fff';g.beginPath();g.roundRect(ch*.6+4*k,ch*.14+4*k,cw-ch*.6-8*k,ch*.72-8*k,ch*.36-4*k);g.fill();wrap2(g,Q,(cw+ch*.6)/2+ch*.2,ch/2,cw-ch*1.6,ch*.24);
  g.fillStyle=bl?'#9fd4ff':'#ff7a00';g.beginPath();g.arc(ch/2,ch/2,r,0,7);g.fill();g.fillStyle=bl?'#0b2f86':'#ffc21a';g.beginPath();g.arc(ch/2,ch/2,r-5*k,0,7);g.fill();ftxt(g,String(tv),ch/2,ch/2+2*k,ch*.44,'#fff','center',ch,bl?0:3*k);});QB.position.set(0,-268,20);G.add(QB);
 const ask=()=>{const live=board.filter(Boolean);if(!live.length)return false;qi=board.indexOf(pick(live));Q=board[qi][1].toUpperCase();QB.set();return true;};ask();
 anim(dt=>{if(rid!==RUN||st.t<=0)return false;st.t-=dt;const v=Math.max(0,Math.ceil(st.t));if(v!==tv){tv=v;QB.set();}return true;});let busy=false;
 TAP=async id=>{if(typeof id!=='number'||busy||st.t<=0||!board[id])return;busy=true;const ok=id===qi;P[id].o.c=ok?'#2fbf2f':'#d42020';P[id].set();if(!ok){P[qi].o.c='#2fbf2f';P[qi].set();}sfx(ok?'ok':'error');if(ok)ac++;else say('Fallo: juega tu compañero');
  await wait(.8,rid);P.forEach(p=>p.o.c=null);board[qi]=pool.shift()||null;draw();ask()||(st.t=0);busy=false;};
 await new Promise(r=>anim(()=>{if(st.t<=0||rid!==RUN){r();return false;}return true;}));chk(rid);TAP=null;sfx('j12_timeover');await wait(1,rid);clearG();
 GAME.sec[0]+=ac*5;GAME.ac[0]+=ac;await rotulo(`${bl?'AZUL':'NARANJA'}: ${ac} ACIERTOS · +${ac*5} s`,C.hx,rid);clearG();const c=await cpuTurn('Rival',bl?COL.or:COL.bl,.6,rid);GAME.sec[1]+=c*5;await rotulo(`${bl?'NARANJA':'AZUL'}: ${c} ACIERTOS · +${c*5} s`,bl?COL.or:COL.bl,rid);clearG();}
function wrap2(g,s,x,y,maxw,fs){g.font=`900 ${fs}px N,Arial`;const ws=s.split(' ');const L=[];let cur='';ws.forEach(w=>{const t=cur?cur+' '+w:w;if(g.measureText(t).width>maxw&&cur){L.push(cur);cur=w;}else cur=t;});L.push(cur);g.fillStyle='#111';g.textAlign='center';g.textBaseline='middle';L.forEach((l,i)=>g.fillText(l,x,y+(i-(L.length-1)/2)*fs*1.1));}
ETAPAS[2019].pr=ETAPAS[2019].pr.map(([k,f])=>k=='sopa'?[k,sopa18]:k=='u4'?[k,u418]:[k,f]);
Object.assign(DBG,{sopa18,u418});
})();
