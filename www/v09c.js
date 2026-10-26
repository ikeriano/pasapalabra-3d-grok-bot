'use strict';
// ======================================================================
//  v0.9 — FINAL DORADO (programa de Fran, Telecinco 22-01-2019, bote 1.542.000 €)
//  Al ganar el bote / completar el rosco el plató se vuelve dorado de forma suave (1,6 s):
//  pantalla grande en marrón-naranja con rayos de luz dorados y destellos que suben, la bola de letras del logo
//  dorada (letras blancas/crema sobre cuerpo marrón anaranjado), pantallas laterales en discos naranjas con la bola,
//  luces y niebla cálidas. Al terminar vuelve al azul. Colores medidos en los fotogramas del programa real:
//  fondo oscuro #644447…#8c6b4c, rayos #dab676…#e0b47c, centro de los rayos #e5b257, pantalla superior azul→#78681d.
//  Opción «Plató dorado al ganar» (por defecto Sí).
// ======================================================================
(function(){
OPT.dorado=OPT.dorado===undefined?1:OPT.dorado;
const GOLD9={k:0,to:0,on:false};window.GOLD9=GOLD9;
function rng(s){return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
// fondo: gradiente marrón → naranja con resplandor y haces verticales
function bgTex(){return cv(1024,512,(g,w,h)=>{const r=rng(1542000);
 const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#5c3a40');gr.addColorStop(.55,'#7a4b3e');gr.addColorStop(1,'#9a6a3a');g.fillStyle=gr;g.fillRect(0,0,w,h);
 const rg=g.createRadialGradient(w*.82,h*.45,10,w*.82,h*.45,w*.5);rg.addColorStop(0,'rgba(240,190,90,.85)');rg.addColorStop(1,'rgba(240,190,90,0)');g.fillStyle=rg;g.fillRect(0,0,w,h);
 const rg2=g.createRadialGradient(w*.5,h*.4,10,w*.5,h*.4,w*.35);rg2.addColorStop(0,'rgba(229,178,87,.55)');rg2.addColorStop(1,'rgba(229,178,87,0)');g.fillStyle=rg2;g.fillRect(0,0,w,h);});}
// haces de luz y destellos (aditivo, se desplaza hacia arriba)
function raysTex(){const t=cv(512,512,(g,w,h)=>{const r=rng(22012019);g.clearRect(0,0,w,h);
 for(let i=0;i<46;i++){const x=r()*w,ww=2+r()*(r()<.3?16:6),y=r()*h,hh=h*(.25+r()*.6),a=.12+r()*.45;
  for(const dy of[0,-h,h]){const gr=g.createLinearGradient(0,y+dy,0,y+dy+hh);gr.addColorStop(0,'rgba(255,215,120,0)');gr.addColorStop(.5,`rgba(255,${200+r()*40|0},${100+r()*60|0},${a})`);gr.addColorStop(1,'rgba(255,215,120,0)');g.fillStyle=gr;g.fillRect(x,y+dy,ww,hh);}}
 for(let i=0;i<140;i++){const x=r()*w,y=r()*h,s=1+r()*3;g.fillStyle=`rgba(255,${230+r()*25|0},${150+r()*80|0},${.4+r()*.5})`;g.beginPath();g.arc(x,y,s,0,6.2832);g.fill();}});
 t.wrapS=t.wrapT=T.RepeatWrapping;return t;}
// pantalla lateral dorada: disco naranja con la bola de letras blanca (como en las pantallas laterales del programa)
function sideTex(){return cv(1024,512,(g,w,h)=>{g.fillStyle='#c98a1e';g.fillRect(0,0,w,h);const gr=g.createRadialGradient(w/2,h/2,10,w/2,h/2,h*.55);gr.addColorStop(0,'#ffd23a');gr.addColorStop(1,'#f09a00');g.fillStyle=gr;g.beginPath();g.arc(w/2,h/2,h*.46,0,6.2832);g.fill();
 const r=rng(5);for(let i=0;i<260;i++){const y=1-2*(i+.5)/260,rr=Math.sqrt(1-y*y),th=i*2.39996,zz=(Math.sin(th)*rr+1)/2;g.globalAlpha=.35+zz*.6;ftxt(g,AL[Math.floor(r()*AL.length)],w/2+Math.cos(th)*rr*h*.33,h/2-y*h*.33,10+zz*14,'#ffffff','center',1e9,0,700);}g.globalAlpha=1;});}
// suelo dorado: mismo dibujo del suelo del plató con los azules pasados a ámbar/crema (se funde encima del suelo azul)
function floorGoldTex(){return cv(1024,1024,(g,w)=>{const c=w/2;const gr=g.createRadialGradient(c,c,0,c,c,c);[[0,'#f7ead2'],[.14,'#f1dfbf'],[.17,'#f5cf8a'],[.185,'#e8962a'],[.205,'#eddcc0'],[.27,'#dcc8a0'],[.3,'#df9a38'],[.315,'#bba684'],[.6,'#8a6a46'],[1,'#3b2a1a']].forEach(a=>gr.addColorStop(a[0],a[1]));g.fillStyle=gr;g.fillRect(0,0,w,w);});}
let X=null;
function build(){if(X||!P.scr||!P.ball9||!window.V9b)return !!X;
 const bg=new T.Mesh(new T.PlaneGeometry(13,6.5),new T.MeshBasicMaterial({map:bgTex(),transparent:true,opacity:0,depthWrite:false}));bg.position.set(0,3.6,-10.99);bg.renderOrder=.5;bg.visible=false;P.root.add(bg);
 const rt=raysTex(),ry=new T.Mesh(new T.PlaneGeometry(13,6.5),new T.MeshBasicMaterial({map:rt,transparent:true,opacity:0,depthWrite:false,blending:T.AdditiveBlending}));ry.position.set(0,3.6,-10.985);ry.renderOrder=.6;ry.visible=false;P.root.add(ry);
 const gm=new T.Mesh(P.ball9.geometry,new T.MeshBasicMaterial({color:0x8a4a1e,transparent:true,opacity:0,depthWrite:false}));gm.scale.setScalar(1.01);gm.renderOrder=.95;gm.visible=false;P.ball9.add(gm);
 const fg=new T.Mesh(P.fl.geometry,new T.MeshBasicMaterial({map:floorGoldTex(),transparent:true,opacity:0,depthWrite:false}));fg.rotation.copy(P.fl.rotation);fg.position.copy(P.fl.position);fg.position.y+=.004;fg.visible=false;P.fl.parent.add(fg);
 X={fg,bg,ry,rt,gm,side:sideTex(),lights:[],bgc:null,fogc:null,side0:null};return true;}
const WARM=new T.Color(0xffb25a),DARKW=new T.Color(0x3a1c08),cA=new T.Color(),FL=new T.Color(1,.78,.5);
function apply(k){if(!build())return;const on=k>.001;
 X.bg.visible=X.ry.visible=X.gm.visible=X.fg.visible=on;X.fg.material.opacity=k;P.ball9.material.color.setRGB(.165,.44,.886).lerp(new T.Color(.5,.25,.1),k);try{V9b.setLooks(P.ball9.userData.blur,k>.5);}catch(e){}X.bg.material.opacity=k;X.ry.material.opacity=k*.85;X.gm.material.opacity=k*.9;
 // luces cálidas, niebla y fondo
 if(!X.lights.length){S.traverse(o=>{if(o.isHemisphereLight||o.isDirectionalLight)X.lights.push([o,o.color.clone()]);});X.bgc=S.background&&S.background.isColor?S.background.clone():null;X.fogc=S.fog?S.fog.color.clone():null;}
 for(const [l,c0] of X.lights){l.color.copy(c0).lerp(WARM,k*.55);}
 if(X.bgc)S.background.copy(X.bgc).lerp(DARKW,k*.8);if(X.fogc)S.fog.color.copy(X.fogc).lerp(DARKW,k*.8);
 if(P.flo)P.flo.material.color.setRGB(1,1,1).lerp(FL,k);
 if(P.ballG9){P.ballG9.children.forEach(o=>{if(o.renderOrder==2.5&&o.material)o.material.color.setRGB(1,1,1).lerp(new T.Color(1,.42,.1),k);});}
 // suelo, estructuras y focos azules → naranja dorado
 if(!X.mats){X.mats=[];const seen=new Set(),h={};P.root.traverse(o=>{if(!o.isMesh||o===X.bg||o===X.ry||o===X.gm||o===X.fg||o===P.scr||o===P.ball9||o.parent===P.ball9)return;for(const m of[].concat(o.material)){if(!m||!m.color||seen.has(m))continue;seen.add(m);m.color.getHSL(h);if(h.h>.5&&h.h<.74&&h.s>.15&&h.l>.12){const c=new T.Color().setHSL(.085,Math.min(.85,h.s*(h.l>.8?2.2:1.1)),h.l>.8?h.l*.92:Math.min(.62,h.l*1.05));X.mats.push([m,m.color.clone(),c]);}}});}
 for(const [m,a,b] of X.mats)m.color.copy(a).lerp(b,k);
 // pantallas laterales: disco naranja con la bola (cambio a mitad de la transición)
 if(P.sideS){const gold=k>.5;if(gold&&!X.side0){X.side0=P.sideS.map(m=>m.material.map);P.sideS.forEach(m=>{m.material.map=X.side;m.material.needsUpdate=true;});}
  else if(!gold&&X.side0){P.sideS.forEach((m,i)=>{m.material.map=X.side0[i];m.material.needsUpdate=true;});X.side0=null;}}}
let last=performance.now();
setInterval(()=>{const n=performance.now(),dt=Math.min(.2,(n-last)/1e3);last=n;
 if(GOLD9.k!==GOLD9.to){const st=dt/(GOLD9.to>GOLD9.k?1.6:1.2);GOLD9.k=GOLD9.to>GOLD9.k?Math.min(GOLD9.to,GOLD9.k+st):Math.max(GOLD9.to,GOLD9.k-st);const e=GOLD9.k*GOLD9.k*(3-2*GOLD9.k);GOLD9.e=e;apply(e);}
 if(GOLD9.k>0&&X){X.rt.offset.y=(X.rt.offset.y+dt*.12)%1;X.rt.offset.x=Math.sin(n/2600)*.02;}},33);
window.gold9=on=>{GOLD9.to=on?1:0;};
// al ganar el bote o el rosco: plató dorado desde el principio hasta el final de la celebración
{const _p=premio8;premio8=async function(rid,o){if(OPT.dorado){try{build();gold9(true);}catch(e){console.error(e);}}
 try{return await _p.apply(this,arguments);}finally{gold9(false);}};}
// fila en Opciones (junto a las de v0.9)
{const _sm=showMenu;showMenu=function(s){const r=_sm.apply(this,arguments);if(s=='opt'){const col=menu.querySelector('.col');if(col&&!col.querySelector('[data-o9=dorado]')){const a=col.querySelector('[data-o9=pad8]');const row=document.createElement('div');row.className='orow';row.innerHTML=`<label>✨ Plató dorado al ganar el bote: <b class="v9">${OPT.dorado?'Sí':'No'}</b></label><input type="range" min="0" max="1" step="1" value="${OPT.dorado?1:0}" data-o9="dorado">`;
  if(a&&a.parentNode)a.parentNode.after(row);else col.appendChild(row);const i=row.querySelector('input');i.oninput=()=>{OPT.dorado=+i.value;row.querySelector('.v9').textContent=+i.value?'Sí':'No';saveOpt();};try{NAV.attach(s);}catch(e){}}}return r;};}
window.V9c={apply,build};
})();
