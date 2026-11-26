// ===== v0.28 · LA ESCALERA tal cual Telecinco (prueba01.mp4): 5 peldaños 7→3 letras, de ABAJO a ARRIBA =====
(()=>{
const ESC28=[[['TRIUNFO','Empieza por T: victoria, éxito.'],['FORTÍN','Sin la U: fuerte pequeño.'],['TIRÓN','Sin la F: acción de tirar con fuerza.'],['TRÍO','Sin la N: conjunto de tres.'],['TÍO','Sin la R: hermano de tu padre.']],
 [['ESTRENO','Empieza por E: primera vez que se proyecta una película.'],['ENTERO','Sin la S: completo, sin que le falte nada.'],['NORTE','Sin la E: punto cardinal opuesto al sur.'],['RETO','Sin la N: desafío.'],['REO','Sin la T: persona acusada de un delito.']],
 [['MARINOS','Empieza por M: hombres que trabajan en los barcos.'],['MARINO','Sin la S: color azul oscuro, como el de los uniformes de la Armada.'],['RAMÓN','Sin la I: nombre de varón; de él viene «Ramoncín».'],['ROMA','Sin la N: capital de Italia.'],['AMO','Sin la R: dueño de un perro.']],
 [['PLÁTANO','Empieza por P: fruta amarilla típica de Canarias.'],['PLANTA','Sin la O: ser vivo con raíces, tallo y hojas.'],['PLATA','Sin la N: metal de la segunda medalla.'],['PALA','Sin la T: herramienta para cavar.'],['ALA','Sin la P: la mueve el pájaro para volar.']],
 [['CARTERO','Empieza por C: reparte las cartas.'],['CORTAR','Sin la E: lo que se hace con tijeras.'],['CARRO','Sin la T: vehículo tirado por caballos.'],['CARO','Sin una R: que cuesta mucho dinero.'],['ARO','Sin la C: anillo, argolla.']]];
const nrm=s=>String(s||'').toUpperCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^A-ZÑ]/g,'');
async function escalera28(rid){clearG();MODE.split=false;P.ply.pul.visible=P.cpu.pul.visible=false;const bl=OPT.eq25!==1;
 const C=bl?{f:0x0d2f86,b:'#0d2f86',r:'#38d6ff',t:0x0d2f86}:{f:0xd8401a,b:'#ff8a12',r:'#d42020',t:0xff8a12};
 cut('host');hostSay('<b>La Escalera</b>: cinco peldaños. La primera palabra tiene 7 letras; cada una de las siguientes tiene <b>una letra menos</b> («sin la U»…). Si aciertas, sigues; si fallas o pasas, tu compañero intenta la misma palabra. 90 segundos.');await wait(4,rid);
 cut('blue');let t=90,full=0,part=0;const players=['Jugador 1','Jugador 2'];let who=0;
 const tm=label(110,110,(g,cw,ch)=>{g.fillStyle=bl?'#38d6ff':'#d42020';g.beginPath();g.arc(cw/2,ch/2,cw/2-2,0,7);g.fill();g.fillStyle=bl?'#0d2f86':'#ff8a12';g.beginPath();g.arc(cw/2,ch/2,cw/2-12,0,7);g.fill();ftxt(g,String(Math.max(0,Math.ceil(t))),cw/2,ch/2+3,ch*.42,'#fff');});
 tm.position.set(-GW/2+250,-260,20);G.add(tm);let lt=-1;
 let run=true;anim(dt=>{if(!run||rid!==RUN)return false;if(!ASK)return true;t-=dt;const v=Math.ceil(t);if(v!==lt){lt=v;tm.set();}return true;});
 const sets=shuffle(ESC28.slice());let si=0;const st=new T.Group();G.add(st);
 while(t>0){const L=sets[si++%sets.length];while(st.children.length)st.remove(st.children[0]);let k=0;
  for(;k<5&&t>0;k++){const [w,def]=L[k];const W=nrm(w),sz=40;const row=new T.Group();const y=-170+k*50;
   const cubes=[...W].map((ch,i)=>{const b=bar(sz,sz,C.f,'',{fs:28,r:3});b.position.set((i-(W.length-1)/2)*(sz+6),0,0);row.add(b);b.scale.set(.01,.01,1);return b;});row.position.set(-GW/2+250,y,0);st.add(row);
   cubes.forEach((b,i)=>tween(.25+i*.04,e=>b.scale.set(e,e,1),eback));
   let solved=false;while(!solved&&t>0){hostSay(`<b>${players[who]}</b> · ${def} <b>(${W.length} letras)</b>`);const a=await ask(()=>t<=0||rid!==RUN);chk(rid);if(a===null)break;
    if(nrm(a)===W){solved=true;sfx('ok');cubes.forEach((b,i)=>b.setT(W[i]));}else{sfx('error');who=1-who;say(`Pasa a <b>${players[who]}</b>, misma palabra`);}}
   if(!solved)break;}
  if(k>=5){full++;sfx('winner');await wait(.6,rid);}else part=k;if(t<=0)break;}
 run=false;say();chk(rid);const ac=full*5+part;sfx('j12_timeover');GAME.sec[0]+=ac;GAME.ac[0]+=ac;
 await rotulo(`${bl?'AZUL':'NARANJA'}: ${full} ESCALERAS + ${part} PALABRAS · +${ac} s`,C.t,rid);
 clearG();const c=await cpuTurn('Rival',bl?COL.or:COL.bl,.65,rid);GAME.sec[1]+=c;await rotulo(`${bl?'NARANJA':'AZUL'}: ${c} PALABRAS · +${c} s`,bl?COL.or:COL.bl,rid);clearG();}
ETAPAS[2007].pr=ETAPAS[2007].pr.map(([k,f])=>k=='escalera'?[k,escalera28]:[k,f]);
DBG.escalera28=escalera28;
})();
