'use strict';
// v0.25 · Grafismos de las pruebas copiados de la tele + color por EQUIPO.
// Equipo azul → grafismos azules; equipo naranja → naranjas (misma maqueta). El Rosco siempre azul.
// Colores medidos en el programa de Antena 3 del 19/6/2026: naranja #f07000, azul #0070f0 (reloj y piezas del mismo color que el equipo;
// en el último segundo el reloj naranja pasa a #f05020). En ese programa NO se aprecia un color distinto de reloj para el veterano
// (se midió el reloj de cada concursante en Una de Cuatro, Palabras Cruzadas, ¿Dónde Están? y El Rosco): por eso el reloj sigue al equipo.
// Opción OPT.eq25 «Tu equipo»: 0 azul (por defecto, como siempre) · 1 naranja.
(()=>{if(OPT.eq25===undefined)OPT.eq25=0;
const A3=()=>[2020,2023,2026].includes(+OPT.a3)&&!(window.F16&&F16._want);
const TEAM=()=>OPT.eq25?{c:0xf07000,a:'#ff9a1e',b:'#f05a00',css:'#f07000'}:{c:0x0a6cf0,a:'#2a8cff',b:'#0054d8',css:'#0070f0'};
const s=()=>Math.min(1.25,GW/1024),X=x=>(x-512)*s(),Y=y=>(288-y)*s();
// reloj redondo (Antena 3 2020-2023 / Telecinco): disco del color del equipo, aro blanco con progreso
const TP=t=>t&&!OPT.eq25?{f:0x1a78f0,bd:0x0a48a8,bl:0x3a9aff,em:0x0a3a8a,g0:'#6ab8ff',g1:'#1a78f0',bc:'#0a48a8',sh:'#063a7a'}:{f:0xf08a10,bd:0xb85a08,bl:0xf5a020,em:0x8a4a00,g0:'#ffb43a',g1:'#f08a10',bc:'#b85a08',sh:'#9a5a00'};
function rTimer(style){const g=new T.Group();let max=null;const L=label(150,150,(c,cw,ch,k)=>{const v=g.v??0,R=cw/2;const tm=TEAM();
  if(style=='t5'||style=='t5e'){const P=TP(style=='t5e'),tg=style=='t5e'&&!OPT.eq25;c.font=`900 ${ch*.8}px N,Arial`;c.textAlign='center';c.textBaseline='middle';for(let i=6;i>0;i--){c.fillStyle=P.sh;c.fillText(String(v),cw/2+i,ch/2+i);}
   const gr=c.createLinearGradient(0,ch*.15,0,ch*.85);gr.addColorStop(0,tg?'#8ad0ff':'#ffd34a');gr.addColorStop(1,tg?'#1a70e8':'#f08a00');c.fillStyle=gr;c.fillText(String(v),cw/2,ch/2);return;}
  c.fillStyle='rgba(255,255,255,.55)';c.beginPath();c.arc(R,R,R-1,0,7);c.fill();c.fillStyle='#ffffff';c.beginPath();c.arc(R,R,R*.93,0,7);c.fill();
  c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=R*.1;c.beginPath();c.arc(R,R,R*.86,0,7);c.stroke();
  const f=max?Math.max(0,Math.min(1,v/max)):1;c.strokeStyle='#ffffff';c.beginPath();c.arc(R,R,R*.86,-Math.PI/2,-Math.PI/2+f*Math.PI*2);c.stroke();
  const gr=c.createRadialGradient(R*.8,R*.7,R*.1,R,R,R*.8);gr.addColorStop(0,style=='t5q'?'#3a8cff':tm.a);gr.addColorStop(1,style=='t5q'?'#0a3cc0':tm.b);c.fillStyle=gr;c.beginPath();c.arc(R,R,R*.78,0,7);c.fill();
  ftxt(c,String(v),cw/2,ch/2+4*k,ch*.42,'#fff','center',cw*.8,0);});
 g.add(L);g.set=v=>{v=Math.max(0,Math.ceil(v));if(max===null||v>max)max=v;if(v===g.v)return;g.v=v;L.set();};g.setC=()=>{};g.set(0);return g;}
// barra/pastilla con borde blanco fino (Antena 3) o pastilla naranja con bola a la derecha (Telecinco ¿Dónde Están?)
function pillA3(w,h,txt,col){return bar(w,h,col??TEAM().c,txt,{fs:h*.42,r:h/2-2,border:0xffffff,bw:2.5});}
function pillT5(w,h,txt,tc){const P=TP(tc);const b=bar(w,h,P.f,txt,{fs:h*.5,r:8,border:P.bd,bw:3});const ball=new T.Mesh(new T.SphereGeometry(h*.42,16,12),new T.MeshLambertMaterial({color:P.bl,emissive:P.em}));ball.position.set(w/2+h*.1,-h*.12,12);b.add(ball);return b;}
function listBox(words,tc){const P=TP(tc);const b=new T.Group();const L=label(250,330,(c,cw,ch,k)=>{const r=18*k;c.fillStyle=P.bc;c.beginPath();c.roundRect(0,0,cw,ch,r);c.fill();const gr=c.createLinearGradient(0,0,0,ch);gr.addColorStop(0,P.g0);gr.addColorStop(1,P.g1);c.fillStyle=gr;c.beginPath();c.roundRect(6*k,6*k,cw-12*k,ch-12*k,r*.8);c.fill();
  const W=b.w||[];const n=W.length;W.forEach((w,i)=>ftxt(c,w.toUpperCase(),cw/2,ch*(i+1)/(n+1),Math.min(34*k,ch/(n+1)*.7),b.done&&b.done.has(w)?'rgba(255,255,255,.35)':'#fff','center',cw*.9,0));});b.add(L);b.w=words;b.done=new Set();b.upd=()=>L.set();L.set();return b;}
window.G25={A3,TEAM,s,X,Y,rTimer,pillA3,pillT5,listBox};
// ---- Una de Cuatro · Antena 3 2020/2023: 4 pastillas 2×2 a la derecha, reloj redondo abajo a la izquierda y barra de pregunta larga ----
{let ON=0;const _b=bar;bar=function(w,h,col,txt,o){if(ON){const tc=TEAM().c;if(col===COL.or||col===COL.bl)col=tc;
   if(w==250&&h==46)return _b.call(this,198*s(),45*s(),col,txt,Object.assign({},o,{fs:17*s(),r:21*s(),border:0xffffff,bw:2.5}));
   if(h==60&&w==Math.min(GW-280,1000)){ON=2;return _b.call(this,632*s(),64*s(),col,txt,Object.assign({},o,{fs:21*s(),r:30*s(),border:0xffffff,bw:2.5}));}}return _b.apply(this,arguments);};
 const _y=yTimer;yTimer=function(){if(ON){const t=rTimer('a3');t.scale.setScalar(s()*115/150);t._tv=1;return t;}return _y.apply(this,arguments);};
 const _a=G.add.bind(G);G.add=function(...a){if(ON)a.forEach(o=>{const t=o.userData&&o.userData.tap;
   if(typeof t=='number'&&t>=0&&t<4&&o.setC)o.position.set(X(t%2?832:624),Y(t<2?190:258),0);
   else if(o._tv)o.position.set(X(144),Y(488),20);
   else if(ON==2&&o.setT){o.position.set(X(552),Y(488),10);ON=0;}});return _a(...a);};
 const _p=playCort;playCort=async function(id,rid){const r=await _p.apply(this,arguments);if([2020,2023].includes(+OPT.a3)&&A3()&&id=='u4')ON=1;return r;};}
// ---- ¿Qué es Qué? · Telecinco (Iker, 30/10): caja con la lista de palabras a la izquierda, número grande del reloj y pastillas con bola abajo; en el color de tu equipo (naranja/azul) ----
{const _q=queEsQue;const nq=async function(rid){if(OPT.etapa>=2020)return _q.call(this,rid);let ON=1;const _b=bar,_y=yTimer;let lb=null,W=[],di26=0,P5=[[.46,.79],[.73,.79],[.33,.9],[.6,.9],[.86,.9]],wi=0;
  bar=function(w,h,col,txt,o){if(!ON)return _b.apply(this,arguments);
   if(w==250&&h==350){lb=listBox(W,1);lb.position.set(-GW/2+GW*.125,720*(.5-.41),5);lb.scale.setScalar(.9);return lb;}
   if(h==40&&w>300){const b=_b.apply(this,arguments);b._qd=di26++;return b;}if(w==220&&h==50){W.push(txt);const j=wi++;const b=pillT5(GW*.2,44,String(txt).toUpperCase(),1);const P=TP(1);const sc=b.setC;b.setC=c=>{sc&&sc.call(b,c===COL.orD||c===COL.blD?P.f:c);};b._qp=j;if(lb)lb.upd();return b;}
   return _b.apply(this,arguments);};
  yTimer=function(){const t=rTimer('t5e');t._qt=1;return t;};
  const _a=G.add.bind(G);G.add=(...a)=>{a.forEach(o=>{if(typeof o._qp=='number'){const p=P5[o._qp]||P5[4];o.position.set((p[0]-.5)*GW-14,(.5-p[1])*720,10);}else if(o._qt)o.position.set(GW/2-130,720*(.5-.2),20);else if(typeof o._qd=='number')o.position.set(GW*.08,720*(.5-(.22+o._qd*.08)),0);else if(o===lb)o.position.set(-GW/2+GW*.125,720*(.5-.41),5);});return _a(...a);};
  try{const p=_q.call(this,rid);return await p;}finally{ON=0;bar=_b;yTimer=_y;G.add=_a;}};
 nq.r26q=1;queEsQue=nq;const fix=a=>{if(a)for(const p of a)if(p[0]=='quees'&&p[1]===_q)p[1]=nq;};for(const y in ETAPAS)fix(ETAPAS[y]&&ETAPAS[y].pr);}
// ---- opción «Tu equipo» ----
{const _sm=showMenu;showMenu=function(sc='main'){const r=_sm.apply(this,arguments);try{const col=menu.querySelector('.col');
  if(sc=='opt'&&col&&!col.querySelector('[data-o25e]')){const h=`<div class="orow"><label>Tu equipo (grafismos de las pruebas de su color): <b class="v25e">${OPT.eq25?'Naranja':'Azul'}</b></label><input type="range" min="0" max="1" step="1" value="${OPT.eq25?1:0}" data-o25e="1"></div>`;
   const rows=col.querySelectorAll('.orow');if(rows.length)rows[rows.length-1].insertAdjacentHTML('afterend',h);else col.insertAdjacentHTML('beforeend',h);
   col.querySelector('[data-o25e]').oninput=e=>{OPT.eq25=+e.target.value;col.querySelector('.v25e').textContent=OPT.eq25?'Naranja':'Azul';saveOpt();};try{NAV.attach(sc);}catch(e){}}}catch(e){console.error(e);}return r;};}
})();
