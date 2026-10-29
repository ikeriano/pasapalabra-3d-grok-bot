'use strict';
// v0.23 · Una de Cuatro (Antena 3 2026) con la maqueta de la tele: casillas a media altura (izq.), reloj cuadrado y barra de pregunta.
// Por qué no salía en v0.22: la etapa 2026 guarda una referencia a la función original (P19 en v12.js), así que reasignar
// unaDeCuatro no tenía efecto. Ahora se engancha a las piezas (bar / yTimer / G.add) solo durante el arranque de la prueba.
(()=>{let ON=0;
function tvBox(){const g=new T.Group();const L=label(148,148,(c,cw,ch,k)=>{const r=26*k,b=9*k;
  const rr=(x,y,w,h,r)=>{c.beginPath();c.moveTo(x+r,y);c.arcTo(x+w,y,x+w,y+h,r);c.arcTo(x+w,y+h,x,y+h,r);c.arcTo(x,y+h,x,y,r);c.arcTo(x,y,x+w,y,r);c.closePath();};
  c.fillStyle='rgba(255,255,255,.5)';rr(0,0,cw,ch,r);c.fill();c.fillStyle='#fff';rr(b*.4,b*.4,cw-b*.8,ch-b*.8,r*.9);c.fill();
  const gr=c.createLinearGradient(0,b,0,ch-b);gr.addColorStop(0,'#ff9a1e');gr.addColorStop(1,'#f05a00');c.fillStyle=gr;rr(b,b,cw-2*b,ch-2*b,r*.7);c.fill();
  ftxt(c,String(g.v??''),cw/2,ch/2+4*k,ch*.42,'#fff','center',cw*.8,0);});
 g.add(L);g.set=v=>{v=Math.max(0,Math.ceil(v));if(v===g.v)return;g.v=v;L.set();};g.setC=()=>{};g.set(40);return g;}
const s=()=>Math.min(1.25,GW/1024),X=x=>(x-512)*s(),Y=y=>(288-y)*s();
const OR=0xff5200;const fix=b=>{const sc=b.setC,st=b.setT;b.setC=c=>sc(c===COL.or?OR:c);b.setT=(t,c)=>st(t,c===COL.or?OR:c);return b;};
const _b=bar;bar=function(w,h,col,txt,o){if(ON){if(col===COL.or)col=OR;if(w==250&&h==46)return fix(_b.call(this,197*s(),40*s(),col,txt,Object.assign({},o,{fs:17*s(),border:0xffffff,bw:3})));
  if(h==60&&w==Math.min(GW-280,1000)){ON=2;return fix(_b.call(this,625*s(),64*s(),col,txt,Object.assign({},o,{fs:21*s(),border:0xffffff,bw:3})));}}return _b.apply(this,arguments);};
const _y=yTimer;yTimer=function(){if(ON){const t=tvBox();t.scale.setScalar(s()*118/148);t._tv=1;return t;}return _y.apply(this,arguments);};
const _a=G.add.bind(G);G.add=function(...a){if(ON)a.forEach(o=>{const t=o.userData&&o.userData.tap;
  if(typeof t=='number'&&t>=0&&t<4&&o.setC)o.position.set(X(t%2?399.5:191.5),Y(t<2?190:257.5),0);
  else if(o._tv)o.position.set(X(147),Y(481),20);
  else if(ON==2&&o.setT){o.position.set(X(553.5),Y(481.5),10);ON=0;}});return _a(...a);};
const _p=playCort;playCort=async function(id,rid){const r=await _p.apply(this,arguments);if(OPT.a3==2026&&!(window.F16&&F16._want)&&id=='u4')ON=1;return r;};
window.U4TV={on:()=>ON=1};})();
