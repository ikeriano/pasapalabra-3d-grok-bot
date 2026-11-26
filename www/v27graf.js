'use strict';
// v0.27 · Grafismos de la NUEVA ETAPA 2018 de Telecinco (sacados de la promo «Nueva temporada» 2018), para la etapa 2019 (Telecinco 2018-2019).
// Opción OPT.g27 «Grafismos 2018 (promo)» · APAGADA por defecto.
//  · Sopa de Letras: rejilla blanca de letras con marco del color del equipo; casillas encontradas en verde; barra del tema abajo con el reloj redondo a la izquierda y el contador a la derecha.
//  · Una de Cuatro: cuatro óvalos 2×2 con aro azul claro y la barra de la pregunta abajo con el reloj redondo a la izquierda.
//  · ¿Dónde Están?: ya es la rejilla 3×3 numerada del color del equipo (v0.26).
//  Mecánica de la Sopa: la de v0.25 (provisional). Cuando lleguen los vídeos de pruebas de Iker se ajusta aquí (sopa18()).
(()=>{if(OPT.g27===undefined)OPT.g27=0;
const on=()=>OPT.g27&&+OPT.etapa===2019;
const TM=()=>OPT.eq25?{c:0xf07a2a,css:'#f07a2a',lt:'#ffd2b0'}:{c:0x1a78f0,css:'#1a78f0',lt:'#cfe4ff'};
function cell(ch){const g=new T.Group();let st='w';const L=label(58,58,(c,cw,chh,k)=>{const tm=TM();c.fillStyle=st=='g'?'#2aa83a':st=='s'?tm.lt:'#ffffff';c.beginPath();c.roundRect(2*k,2*k,cw-4*k,chh-4*k,7*k);c.fill();
 ftxt(c,ch,cw/2,chh/2+2*k,36*k,st=='g'?'#ffffff':st=='x'?'#e04020':tm.css,'center',cw,0);});g.add(L);
 g.setC=col=>{st=col===COL.gr?'g':col===COL.or?(OPT.eq25?'x':'s'):'w';if(col===COL.or&&OPT.eq25)st='s';L.set();};g.setT=()=>{};return g;}
function wrap(fn,kind){const nf=async function(rid){if(!on())return fn.apply(this,arguments);let ON=1;const _b=bar,_y=yTimer,_a=G.add.bind(G);const tm=TM();let oi=0,fr=null;
 bar=function(w,h,col,txt,o){if(!ON)return _b.apply(this,arguments);
  if(kind=='sopa'){if(w==58&&h==58){const b=cell(txt);return b;}
   if(h==50&&w>300){const b=_b.call(this,5*68-40,46,tm.c,txt,{fs:20,r:23,border:0xffffff,bw:2});b._k='th';if(!fr){fr=_b.call(this,5*68+14,5*68+14,tm.c,'',{r:12,border:tm.c,bw:2});fr._k='fr';}return b;}
   if(w==70&&h==46){const b=_b.call(this,52,46,0xffffff,'',{fs:30,r:8,border:tm.c,bw:3});const st=b.setT;const L=label(52,46,(c,cw,chh,k)=>{ftxt(c,String(b._n??'0'),cw/2,chh/2+2*k,32*k,tm.css,'center',cw,0);});L.position.z=8;b.add(L);b.setT=s=>{b._n=s;L.set();};b._k='ac';return b;}}
  if(kind=='u4'){if((w==250&&h==46)||(h==60&&Math.abs(w-GW*.19)<1)){const b=_b.call(this,GW*.17,56,tm.c,txt,{fs:24,r:28,border:0xbfe8ff,bw:6});const sc=b.setC,st=b.setT;b.setC=c=>sc(c===COL.or?tm.c:c);b.setT=(s,c)=>st(s,c===COL.or?tm.c:c);b._k='ov';b._i=oi++;return b;}
   if((h==60&&w==Math.min(GW-280,1000))||(h==48&&Math.abs(w-GW*.42)<1)){const b=_b.call(this,GW*.5,46,tm.c,txt,{fs:22,r:23,border:0xffffff,bw:2});b._k='th';return b;}
   if(w==70&&h==46){const b=_b.call(this,60,46,tm.c,txt,{fs:30,r:10,border:0xffffff,bw:3});b._k='ac';return b;}}
  return _b.apply(this,arguments);};
 yTimer=function(){const t=window.G25?G25.rTimer('a3'):timer(TM().c);if(window.G25)t.scale.setScalar(G25.s()*.6);t._k='tm';return t;};
 const pos=o=>{const k=o._k;if(!k)return;
  if(kind=='sopa'){const cx=GW*.2,cy=60;if(k=='th'){o.position.set(cx,cy-3*68-14,10);if(fr&&!fr.parent){fr.position.set(cx,cy,-6);_a(fr);}}else if(k=='tm')o.position.set(cx-5*34-26,cy-3*68-14,20);else if(k=='ac')o.position.set(cx+5*34+8,cy-3*68-14,20);}
  else{if(k=='ov'){const i=typeof o.userData.tap=='number'?o.userData.tap:o._i;o.position.set((i%2?1:-1)*GW*.1,-60-Math.floor(i/2)*78,0);}else if(k=='th')o.position.set(GW*.02,-230,0);else if(k=='tm')o.position.set(-GW*.25,-230,20);else if(k=='ac')o.position.set(GW*.31,-230,20);}};
 G.add=(...a)=>{a.forEach(o=>{pos(o);Promise.resolve().then(()=>pos(o));setTimeout(()=>pos(o),0);});return _a(...a);};
 try{return await fn.apply(this,arguments);}finally{ON=0;bar=_b;yTimer=_y;G.add=_a;}};nf.r27=kind;return nf;}
const E=ETAPAS[2019];if(E&&E.pr)for(const p of E.pr){if(p[0]=='sopa'&&!p[1].r27)p[1]=wrap(p[1],'sopa');if(p[0]=='u4'&&!p[1].r27)p[1]=wrap(p[1],'u4');}
window.R27={wrap,on};
// opción en Opciones
{const _sm=showMenu;showMenu=function(sc){const r=_sm.apply(this,arguments);try{const col=menu.querySelector('.col');
  if(sc=='opt'&&col&&!col.querySelector('[data-o27]')){const h=`<div class="orow"><label>Grafismos 2018 de Telecinco (promo «Nueva temporada») en la etapa 2019: <b class="v27g">${OPT.g27?'Sí':'No'}</b></label><input type="range" min="0" max="1" step="1" value="${OPT.g27?1:0}" data-o27="1"></div>`;
   const ref=col.querySelector('[data-o25e]');const row=ref&&ref.closest('.orow');if(row)row.insertAdjacentHTML('afterend',h);else col.insertAdjacentHTML('afterbegin',h);
   col.querySelector('[data-o27]').oninput=e=>{OPT.g27=+e.target.value;col.querySelector('.v27g').textContent=OPT.g27?'Sí':'No';saveOpt();};try{NAV.attach(sc);}catch(e){}}}catch(e){console.error(e);}return r;};}
})();
