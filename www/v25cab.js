'use strict';
// v0.25 · Cabeceras de las pruebas de Antena 3 (19/06/2026) recreadas EN 3D EN TIEMPO REAL, medidas fotograma a fotograma:
// Una de Cuatro, La Pista, Palabras Cruzadas, ¿Dónde Están? y A la Z (también antes de El Rosco). 4,9 s cada una:
// 0–0,35 s barrido azul desde el centro · 0,25–1,1 s entran las piezas y las letras del título una a una · reposo con deriva y
// lluvia de letras desenfocadas roja/blanca/azul · 3,6–4,4 s las piezas salen volando hacia cámara · 4,4–4,9 s barrido de salida.
// Audio: la sintonía real de cada cabecera (extraída del programa). Opción OPT.cab25 (APAGADA por defecto).
// Ligero para Redmi A2: 1 malla para toda la lluvia de letras (1 draw call), texturas de canvas pequeñas, sin sombras ni postproceso.
(()=>{
if(OPT.cab25===undefined)OPT.cab25=0;
const ON=()=>OPT.cab25&&[2020,2023,2026].includes(+OPT.a3)&&!(window.F16&&F16._want);
const MAP={u4:'u4',pista:'pista',cruz12:'cruz',cruzadas:'cruz',donde:'donde',rosco:'alaz',alaz:'alaz'};
const DUR=4.9,S=()=>Math.min(GW/1024,1.25),X=x=>(x-512)*S(),Y=y=>(288-y)*S();
const cl=(a,b,t)=>Math.max(a,Math.min(b,t)),seg=(t,a,b)=>cl(0,1,(t-a)/(b-a));
function ctex(w,h,draw){const c=document.createElement('canvas');c.width=w;c.height=h;draw(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);if(T.SRGBColorSpace)t.colorSpace=T.SRGBColorSpace;t.minFilter=T.LinearFilter;return t;}
function plane(w,h,tex,o={}){const m=new T.Mesh(new T.PlaneGeometry(w,h),new T.MeshBasicMaterial({map:tex,transparent:true,depthWrite:false,depthTest:false,color:o.color||0xffffff}));return m;}
const rr=(g,x,y,w,h,r)=>{g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath();};
// texto blanco con biselado gris (como el rótulo de la tele)
function txtTex(s,fs,col='#ffffff'){const pad=fs*.35;const c=document.createElement('canvas').getContext('2d');c.font=`800 ${fs}px N,Arial`;const w=Math.ceil(c.measureText(s).width+pad*2),h=Math.ceil(fs*1.45);
 return [ctex(w,h,(g)=>{g.font=`800 ${fs}px N,Arial`;g.textAlign='center';g.textBaseline='middle';g.shadowColor='rgba(0,30,110,.55)';g.shadowBlur=fs*.18;g.shadowOffsetY=fs*.06;
  g.fillStyle='#9aa6bd';g.fillText(s,w/2,h/2+fs*.05);g.shadowColor='transparent';const gr=g.createLinearGradient(0,h*.2,0,h*.8);gr.addColorStop(0,col);gr.addColorStop(1,col=='#ffffff'?'#e3e8f2':col);g.fillStyle=gr;g.fillText(s,w/2,h/2);}),w,h];}
let BGT=null,RAIN=null;
function bgTex(){return BGT||(BGT=ctex(512,288,(g,w,h)=>{const gr=g.createRadialGradient(w*.5,h*.5,20,w*.5,h*.5,w*.62);gr.addColorStop(0,'#2aa3ee');gr.addColorStop(.6,'#1688e0');gr.addColorStop(1,'#0a62c4');g.fillStyle=gr;g.fillRect(0,0,w,h);
 const s=g.createLinearGradient(0,0,w*.35,h*.25);s.addColorStop(0,'rgba(190,250,255,.85)');s.addColorStop(.35,'rgba(120,230,255,.25)');s.addColorStop(1,'rgba(120,230,255,0)');g.fillStyle=s;g.beginPath();g.moveTo(0,h*.12);g.lineTo(w*.42,h*.2);g.lineTo(w*.42,h*.26);g.lineTo(0,h*.32);g.fill();
 for(let i=0;i<900;i++){g.fillStyle=`rgba(${Math.random()<.5?'255,255,255':'10,60,170'},${Math.random()*.25})`;g.fillRect(Math.random()*w,Math.random()*h,1.5,1.5);}}));}
// lluvia de letras: un solo BufferGeometry con ~150 quads (atlas con letras nítidas y desenfocadas)
function rainMesh(){if(RAIN)return RAIN;const L='ABCDEFGHIJLMNOPQRSTUVXZ';const tex=ctex(1024,256,(g)=>{g.textAlign='center';g.textBaseline='middle';
  for(let i=0;i<32;i++){const x=(i%16)*64+32,y=Math.floor(i/16)*128+64;g.filter=i>=16?'blur(5px)':'none';g.font='900 56px N,Arial';g.fillStyle='#fff';g.fillText(L[i%L.length],x,y);}g.filter='none';});
 const N=150,pos=[],uv=[],col=[],idx=[];const C=[[1,.3,.28],[1,.3,.28],[1,1,1],[.12,.25,.75],[.12,.25,.75],[.6,.8,1]];
 for(let i=0;i<N;i++){const x=(Math.random()-.5)*1700,y=(Math.random()-.5)*900,z=-Math.random()*900+100,s=14+Math.random()*44;const a=Math.random()*6.28,ca=Math.cos(a)*s,sa=Math.sin(a)*s;
  const b=i*4;[[-1,-1],[1,-1],[1,1],[-1,1]].forEach(([u,v])=>{pos.push(x+u*ca-v*sa,y+u*sa+v*ca,z);});const k=Math.floor(Math.random()*32),u0=(k%16)/16,v0=1-Math.floor(k/16)/2;
  uv.push(u0,v0-.5,u0+1/16,v0-.5,u0+1/16,v0,u0,v0);const c=C[Math.floor(Math.random()*C.length)],al=.35+Math.random()*.6;for(let j=0;j<4;j++)col.push(c[0],c[1],c[2],al);idx.push(b,b+1,b+2,b,b+2,b+3);}
 const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(pos,3));g.setAttribute('uv',new T.Float32BufferAttribute(uv,2));g.setAttribute('color',new T.Float32BufferAttribute(col,4));g.setIndex(idx);
 const m=new T.Mesh(g,new T.MeshBasicMaterial({map:tex,transparent:true,vertexColors:true,depthWrite:false,depthTest:false}));return RAIN=m;}
// pieza que entra y sale volando: from → home → to con giro
function flyer(o,home,t0,dz=900){o.userData.h=home.clone();o.userData.f=new T.Vector3(home.x*1.8+(Math.random()-.5)*300,home.y*1.8+(Math.random()-.5)*200,-dz);o.userData.to=new T.Vector3(home.x*2.6,home.y*2.6,1500);o.userData.t0=t0;o.userData.r=(Math.random()-.5)*2.4;return o;}
function updFly(o,t){const u=o.userData,a=eout(seg(t,u.t0*.6,u.t0*.6+.45)),b=Math.pow(seg(t,3.25+u.t0*.3,3.9+u.t0*.3),2);
 o.position.lerpVectors(u.f,u.h,a);if(b>0)o.position.lerp(u.to,b);o.rotation.set(u.r*(1-a)*.6,u.r*(1-a),u.r*(1-a)*.4+b*u.r);o.visible=a>0.001&&b<.98;
 o.position.x+=Math.sin(t*.9+u.h.y)*4;o.position.y+=Math.cos(t*.8+u.h.x)*3;}
// título: letras una a una
function title(grp,s,fs,cx,cy,t0,list){const sc=S();const c=document.createElement('canvas').getContext('2d');c.font=`800 ${fs}px N,Arial`;const W=c.measureText(s).width;let x=-W/2;
 for(const ch of s){const w=c.measureText(ch).width;if(ch!==' '){const [tx,tw,th]=txtTex(ch,fs);const m=plane(tw*sc,th*sc,tx);grp.add(m);list.push(flyer(m,new T.Vector3(X(cx)+(x+w/2)*sc,Y(cy),0),t0+Math.random()*.35));}x+=w;}}
function qTile(){return ctex(128,160,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#1f4fa8');gr.addColorStop(1,'#0d2c74');g.fillStyle='rgba(255,255,255,.35)';rr(g,2,2,w-4,h-4,18);g.fill();g.fillStyle=gr;rr(g,6,6,w-12,h-12,15);g.fill();
 g.fillStyle='rgba(255,255,255,.12)';g.beginPath();g.moveTo(w*.62,6);g.lineTo(w-6,6);g.lineTo(w-6,h*.55);g.lineTo(w*.25,h-6);g.lineTo(w*.05,h-6);g.fill();g.font='900 92px N,Arial';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';g.fillText('?',w/2,h/2+4);});}
function line(grp,a,b,col,wd,t0,list){const d=Math.hypot(b[0]-a[0],b[1]-a[1])*S();const m=new T.Mesh(new T.PlaneGeometry(d,wd*S()),new T.MeshBasicMaterial({color:col,transparent:true,depthWrite:false,depthTest:false}));
 m.position.set((X(a[0])+X(b[0]))/2,(Y(a[1])+Y(b[1]))/2,-5);m.rotation.z=Math.atan2(Y(b[1])-Y(a[1]),X(b[0])-X(a[0]));m.userData.ln=[t0];grp.add(m);list.push(m);}
function pill(txt,c1,c2,w=96,h=34){return ctex(w*2,h*2,(g,W,H)=>{g.fillStyle='#fff';rr(g,0,0,W,H,H/2);g.fill();const gr=g.createLinearGradient(0,0,0,H);gr.addColorStop(0,c1);gr.addColorStop(1,c2);g.fillStyle=gr;rr(g,4,4,W-8,H-8,H/2-4);g.fill();
 g.font=`900 ${H*.62}px N,Arial`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';g.fillText(txt,W/2,H/2+2);});}
function note(ch,col,fs){return ctex(fs*1.3|0,fs*1.4|0,(g,w,h)=>{g.font=`${fs}px "Segoe UI Symbol","Noto Sans Symbols2","DejaVu Sans",sans-serif`;g.textAlign='center';g.textBaseline='middle';g.fillStyle=col;g.fillText(ch,w/2,h/2);});}
function letterTile(ch,big){return ctex(big?200:40,big?200:44,(g,w,h)=>{g.fillStyle='rgba(255,255,255,.55)';rr(g,0,0,w,h,w*.16);g.fill();const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,big?'#ffffff':'#e8eefc');gr.addColorStop(1,big?'#cdd8f0':'#b9c8ee');g.fillStyle=gr;rr(g,w*.06,w*.06,w*.88,h-w*.12,w*.12);g.fill();
 g.strokeStyle='#2a55c8';g.lineWidth=big?8:2;rr(g,w*.06,w*.06,w*.88,h-w*.12,w*.12);g.stroke();g.font=`900 ${h*.7}px N,Arial`;g.textAlign='center';g.textBaseline='middle';g.fillStyle='#2350c6';g.fillText(ch,w/2,h/2+h*.04);});}
// ---------- composición de cada cabecera (coordenadas medidas en el fotograma real de 1024×576) ----------
const BUILD={
 u4(g,L){const tx=qTile();[[220,155],[808,120],[275,465],[775,470]].forEach((p,i)=>{const m=plane(82*S(),104*S(),tx);g.add(m);L.push(flyer(m,new T.Vector3(X(p[0]),Y(p[1]),20),.15+i*.08));});
  line(g,[255,152],[775,120],0x0f2e7a,4,.5,L);line(g,[808,165],[780,420],0x0f2e7a,4,.55,L);line(g,[318,465],[735,468],0x0f2e7a,4,.6,L);line(g,[235,210],[268,420],0x0f2e7a,4,.65,L);
  title(g,'Una de Cuatro',70,528,290,.45,L);},
 pista(g,L){[['♫',80,'#14247a',470,90,40],['♫',90,'#14247a',360,95,45],['♫',50,'#14247a',650,105,40],['♪',36,'#14247a',35,180,30],['♪',36,'#14247a',985,180,30],['♪',30,'#ffffff',300,140,20],['♭',30,'#ffffff',320,195,20],['♫',30,'#ffffff',815,195,20],['♪',26,'#ffffff',580,200,20],['♬',32,'#ffffff',300,365,15],['♫',28,'#ffffff',470,365,15],['♪',26,'#ffffff',700,380,15],['♫',28,'#ffffff',870,395,15],['♬',30,'#14247a',380,405,15]]
   .forEach(([c,fs,col,x,y],i)=>{const t=note(c,col,fs*1.6);const m=plane(fs*1.6*1.3*S()*.9,fs*1.6*1.4*S()*.9,t);g.add(m);L.push(flyer(m,new T.Vector3(X(x),Y(y),10),.1+i*.04));});
  const big=ctex(160,220,(c,w,h)=>{c.strokeStyle='rgba(255,255,255,.95)';c.lineWidth=12;c.shadowColor='#bff';c.shadowBlur=14;c.beginPath();c.moveTo(40,210);c.lineTo(40,30);c.lineTo(140,15);c.lineTo(140,190);c.stroke();});
  const bm=plane(150*S(),205*S(),big);g.add(bm);L.push(flyer(bm,new T.Vector3(X(645),Y(470),30),.9));bm.userData.grow=1;
  title(g,'La Pista',74,500,290,.45,L);},
 cruz(g,L){const lp=[[700,145],[560,305],[565,430]],rp=[[895,165],[915,250],[910,435]];
  lp.forEach((p,i)=>{const [t,w,h]=txtTex('Palabras',46);const m=plane(w*S(),h*S(),t);g.add(m);L.push(flyer(m,new T.Vector3(X(p[0]-75),Y(p[1]),0),.2+i*.1));});
  rp.forEach((p,i)=>{const [t,w,h]=txtTex('Cruzadas',46);const m=plane(w*S(),h*S(),t);g.add(m);L.push(flyer(m,new T.Vector3(X(p[0]-0),Y(p[1]),0),.3+i*.1));});
  line(g,[712,148],[820,440],0x1440a8,3,.6,L);line(g,[715,312],[812,175],0x1440a8,3,.65,L);line(g,[722,432],[828,250],0x1440a8,3,.7,L);
  const dot=ctex(32,32,(c)=>{c.fillStyle='#1440a8';c.beginPath();c.arc(16,16,14,0,7);c.fill();});[[712,148],[820,440],[715,312],[812,175],[722,432],[828,250]].forEach((p,i)=>{const m=plane(14*S(),14*S(),dot);g.add(m);L.push(flyer(m,new T.Vector3(X(p[0]),Y(p[1]),5),.6+i*.03));});
  g.position.x=-X(735)*.95;},
 donde(g,L){const R=['1','?','3','4','5','?','?','8','9'],B=['1','2','3','?','5','6','7','?','9'];
  R.forEach((n,i)=>{const t=pill(n,'#ff4a35','#c4140c');const m=plane(104*S(),37*S(),t);g.add(m);L.push(flyer(m,new T.Vector3(X(400+(i%3)*112),Y(120+Math.floor(i/3)*40),10),.1+i*.04));});
  B.forEach((n,i)=>{const t=pill(n,'#2a73ff','#0b3cc8');const m=plane(104*S(),37*S(),t);g.add(m);L.push(flyer(m,new T.Vector3(X(400+(i%3)*112),Y(375+Math.floor(i/3)*40),10),.2+i*.04));});
  title(g,'¿Dónde Están?',64,512,290,.45,L);g.position.y=Y(0)*0;},
 alaz(g,L){const A=plane(118*S(),118*S(),letterTile('A',1)),Z=plane(118*S(),118*S(),letterTile('Z',1));g.add(A,Z);L.push(flyer(A,new T.Vector3(X(400),Y(240),40),.15),flyer(Z,new T.Vector3(X(618),Y(240),40),.25));A.userData.sw=1;Z.userData.sw=-1;
  const [lt,lw,lh]=txtTex('la',52);const la=plane(lw*S(),lh*S(),lt);g.add(la);L.push(flyer(la,new T.Vector3(X(510),Y(250),20),.35));
  const ar=c=>ctex(80,40,(g2)=>{g2.strokeStyle='#1f4fd0';g2.fillStyle='#1f4fd0';g2.lineWidth=6;g2.beginPath();g2.moveTo(c?75:5,20);g2.lineTo(c?15:65,20);g2.stroke();g2.beginPath();g2.moveTo(c?5:75,20);g2.lineTo(c?25:55,8);g2.lineTo(c?25:55,32);g2.fill();});
  const a1=plane(40*S(),20*S(),ar(1)),a2=plane(40*S(),20*S(),ar(0));g.add(a1,a2);L.push(flyer(a1,new T.Vector3(X(505),Y(195),20),.4),flyer(a2,new T.Vector3(X(515),Y(300),20),.45));
  'ABCDEFGHIJLMNÑOPQRSTUVXYZ'.split('').forEach((c,i)=>{const m=plane(17*S(),19*S(),letterTile(c,0));g.add(m);L.push(flyer(m,new T.Vector3(X(372+i*11.8),Y(345),15),.5+i*.015));});}};
function makeCab25(k){const g=new T.Group();G.add(g);const bg=plane(GW+40,760,bgTex());bg.position.z=-950;bg.scale.set(1.75,1.75,1);g.add(bg);const rain=rainMesh();g.add(rain);
 const inner=new T.Group();inner.scale.setScalar(1.35);g.add(inner);const L=[];BUILD[k](inner,L);const H=720;
 // barrido: dos máscaras (arriba y abajo) que se abren desde el centro y se cierran al final
 const mk=()=>{const m=new T.Mesh(new T.PlaneGeometry(GW*3,H),new T.MeshBasicMaterial({color:0x000000,transparent:true,opacity:0,depthWrite:false,depthTest:false}));m.renderOrder=99;return m;};
 const sw=[];for(let i=0;i<2;i++){const m=new T.Mesh(new T.PlaneGeometry(GW*3,H*.5),new T.MeshBasicMaterial({map:bgTex(),depthWrite:false,depthTest:false}));m.renderOrder=-1;sw.push(m);}
 const o={g,dur:DUR,setT(t){const open=eout(seg(t,0,.35)),close=eio(seg(t,4.45,4.9));const v=Math.max(.001,open*(1-close));g.scale.set(1,1,1);
   bg.scale.y=1.75*v;rain.scale.y=v;rain.position.z=t*60;rain.rotation.z=t*.02;rain.visible=v>.02;inner.visible=v>.02;
   for(const p of L){if(p.userData.ln){const a=seg(t,p.userData.ln[0],p.userData.ln[0]+.4),b=seg(t,3.25,3.6);p.scale.x=Math.max(.001,a);p.material.opacity=1-b;p.visible=a>0&&b<1;continue;}updFly(p,t);
    if(p.userData.grow){const s=.6+.5*seg(t,.9,3.4);p.scale.set(s,s,1);}
    if(p.userData.sw){const s1=seg(t,1.35,1.85),s2=seg(t,2.55,3.05);const sh=(eio(s1)-eio(s2));p.position.x+=p.userData.sw*sh*X(618)-p.userData.sw*sh*X(400)+0;p.position.x=p.userData.h.x+p.userData.sw*sh*(X(618)-X(400))*(p.userData.sw>0?1:1)*(1)+(p.position.x-p.userData.h.x)*0;p.rotation.y=Math.sin(Math.PI*(s1+s2))*.9;}}},
  free(){G.remove(g);g.traverse(x=>{if(x!==RAIN&&x.geometry)x.geometry.dispose();if(x.material&&x!==RAIN&&x!==bg){if(x.material.map&&x.material.map!==BGT)x.material.map.dispose();x.material.dispose();}});}};
 o.setT(0);return o;}
let AUD={};function playA(k){if(OPT.mus<=0)return null;try{const a=AUD[k]||(AUD[k]=new Audio('snd/c25_'+k+'.ogg'));a.currentTime=0;a.volume=OPT.mus;a.play().catch(()=>{});return a;}catch(e){return null;}}
async function play25(k,rid){say();stopMusic();const c=makeCab25(k);const a=playA(k);try{await tween(DUR,(e,kk)=>c.setT(kk*DUR),x=>x);}finally{c.free();if(a)a.pause();}chk(rid);}
{const _p=playCort;playCort=async function(id,rid){if(ON()&&MAP[id]){clearG();await play25(MAP[id],rid);if(id=='u4'&&OPT.a3==2026&&window.U4TV)U4TV.on();return;}return _p.apply(this,arguments);};}
window.CAB25={make:makeCab25,play:play25,MAP};
// opción (apagada por defecto)
{const _sm=showMenu;showMenu=function(s='main'){const r=_sm.apply(this,arguments);try{const col=menu.querySelector('.col');
  if(s=='opt'&&col&&!col.querySelector('[data-o25]')){const h=`<div class="orow"><label>Antena 3 (2020+): cabeceras de las pruebas en 3D como el 19/6/2026: <b class="v25">${OPT.cab25?'Sí':'No'}</b></label><input type="range" min="0" max="1" step="1" value="${OPT.cab25?1:0}" data-o25="1"></div>`;
   const rows=col.querySelectorAll('.orow');if(rows.length)rows[rows.length-1].insertAdjacentHTML('afterend',h);else col.insertAdjacentHTML('beforeend',h);
   col.querySelector('[data-o25]').oninput=e=>{OPT.cab25=+e.target.value;col.querySelector('.v25').textContent=OPT.cab25?'Sí':'No';saveOpt();};try{NAV.attach(s);}catch(e){}}}catch(e){console.error(e);}return r;};}
{const _sm=showMenu;showMenu=function(){const r=_sm.apply(this,arguments);try{$('#ver').textContent='v0.28';}catch(e){}return r;};}
})();
