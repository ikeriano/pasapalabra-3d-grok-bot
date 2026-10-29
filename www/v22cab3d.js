'use strict';
// v0.22 · Cabeceras recreadas EN 3D EN TIEMPO REAL, plano a plano según la emisión real
// (Antena 3 19/06/2026 y «Pasapalabra en familia», primer programa). Audio: la sintonía real de cada cabecera.
(()=>{
const Y0=60,TX={};
function gtex(ch,mode){const k=ch+mode;if(TX[k])return TX[k];const c=document.createElement('canvas');c.width=c.height=256;const x=c.getContext('2d');
 x.font='900 210px N,Arial';x.textAlign='center';x.textBaseline='middle';
 if(mode=='o'){x.lineWidth=16;x.strokeStyle='#cfe6ff';x.shadowColor='#7fc8ff';x.shadowBlur=18;x.strokeText(ch,128,140);x.lineWidth=6;x.strokeStyle='#fff';x.strokeText(ch,128,140);}
 else{x.fillStyle='#fff';x.fillText(ch,128,140);}
 const t=new T.CanvasTexture(c);if(T.SRGBColorSpace)t.colorSpace=T.SRGBColorSpace;return TX[k]=t;}
const PG=new T.PlaneGeometry(1,1);
// letra 3D: cara + capas de grosor (barato para Redmi A2)
function glyph(ch,col,side,sz,lay=7,mode){const g=new T.Group();const t=gtex(ch,mode||'f');
 for(let i=lay;i>=0;i--){const m=new T.Mesh(PG,new T.MeshBasicMaterial({map:t,color:i?side:col,transparent:true,alphaTest:.4,side:T.DoubleSide,fog:false,depthWrite:true}));
  m.scale.setScalar(sz);m.position.z=-i*sz*.022;g.add(m);}return g;}
function word(s,col,side,sz,lay){const g=new T.Group();const w=sz*.56;[...s].forEach((ch,i)=>{const l=glyph(ch,typeof col=='function'?col(i):col,side,sz,lay);l.position.x=(i-(s.length-1)/2)*w;g.add(l);});return g;}
function bgGrad(a,b){const c=document.createElement('canvas');c.width=4;c.height=256;const x=c.getContext('2d'),gr=x.createLinearGradient(0,0,0,256);gr.addColorStop(0,a);gr.addColorStop(1,b);x.fillStyle=gr;x.fillRect(0,0,4,256);
 const t=new T.CanvasTexture(c);if(T.SRGBColorSpace)t.colorSpace=T.SRGBColorSpace;return t;}
function room(){const g=new T.Group();g.position.y=Y0;S.add(g);const sb=S.background,sf=S.fog;S.fog=null;
 return {g,sb,free(){S.remove(g);S.background=sb;S.fog=sf;}};}
function audio(n){const a=new Audio('tv/'+n+'.ogg');a.volume=Math.min(1,(OPT.mus??.8)+.2);a.play().catch(()=>{});return a;}
const LET='abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPRSTUVZ';
function confetti(g,n,spread,cols){const a=[];for(let i=0;i<n;i++){const l=glyph(LET[i%LET.length],cols[i%cols.length],0x0a2a6a,.35+Math.random()*.5,2);
 l.position.set((Math.random()-.5)*spread,(Math.random()-.5)*spread*.6,-Math.random()*spread);l.userData={r:V3(Math.random(),Math.random(),Math.random()).multiplyScalar(3),v:.5+Math.random()};g.add(l);a.push(l);}
 return (dt)=>a.forEach(l=>{l.rotation.x+=l.userData.r.x*dt;l.rotation.y+=l.userData.r.y*dt;l.position.y-=l.userData.v*dt;});}
const CRED=[['PRODUCCIÓN EJECUTIVA','Mª Luisa Desantes Real'],['DIRECCIÓN','Miguel Aparicio · Anabel Verdín'],['PRODUCCIÓN','Javier Anel'],['PRODUCTORA EJECUTIVA ATRESMEDIA','Cristina Azcárraga'],['REALIZACIÓN','Rocío Vidal']];
// ---------- ANTENA 3 2026 (13,6 s) ----------
async function cabA3(rid){try{stopMusic();}catch(e){}const R=room(),g=R.g;const bg=bgGrad('#4cc2ff','#0a62d6');S.background=bg;const au=audio('c2026_cab');
 const sh={p:V3(0,Y0,10),l:V3(0,Y0,0),f:50,dr:0};cut(sh);
 const fall=confetti(g,70,24,[0xffffff,0xffffff,0xe8422a,0x123c9a]);
 const big=[glyph('p',0xffffff,0x9fb4c8,8),glyph('a',0xe8422a,0x9a2010,8),glyph('s',0xffffff,0x9fb4c8,7),glyph('a',0xffffff,0x9fb4c8,7)];big.forEach(b=>g.add(b));
 const logo=word('pasapalabra',i=>i>8?0xe8422a:0xffffff,0x8aa4c0,2.8,6);g.add(logo);logo.visible=false;
 const flat=word('pasapalabra',0xffffff,0xffffff,1.25,0);g.add(flat);flat.visible=false;
 const blur=[['R',0xe8422a],['E',0xdde6f0],['P',0xe8422a],['V',0x123c9a],['S',0xdde6f0]].map(([c,k],i)=>{const l=glyph(c,k,0x6a1a10,3.2,5);l.position.set([-1.5,-6,1.5,-3,-7][i],[-2.6,-1,-4,3.5,-3][i],3);l.visible=false;g.add(l);return l;});
 const dark=new T.Group();g.add(dark);dark.visible=false;const dbg=bgGrad('#1450b0','#020b2e');
 const oP=glyph('P',0xffffff,0x3a7ad8,9,3,'o'),ob=glyph('b',0xffffff,0x3a7ad8,7,3,'o');oP.position.set(2,-1.5,0);ob.position.set(-3,1.6,-2);dark.add(oP,ob);
 const dfall=confetti(dark,40,22,[0xffffff,0x9fd0ff,0x5aa0ff]);
 let crd=false,last=0;const W=SHOTS.wide;const r0=Math.hypot(W.p.x,W.p.z)||12;
 try{await tween(13.0,(e,k)=>{const t=k*13,dt=t-last;last=t;fall(dt);
  if(t<2.0){// letras gigantes que pasan girando (p blanca, a roja)
   const u=t/2;big[0].position.set(-2+u*1.5,.2,-8+u*14);big[0].rotation.set(.2,-.6+u*.9,.15);big[1].position.set(2.5-u,0,-10+u*13);big[1].rotation.set(-.1,.5-u*.8,-.1);
   big[2].position.set(-6+u*3,-.5,-14+u*8);big[3].position.set(5,1,-16+u*6);sh.p.set(Math.sin(u*2)*.6,Y0+.2,10);sh.l.set(0,Y0,0);sh.f=50;}
  else if(t<3.0){big.forEach(b=>b.visible=false);logo.visible=true;const u=t-2;// logo 3D en escorzo
   logo.rotation.set(-.15,-.75+u*.35,.18);logo.position.set(-1+u,-.3,-3);sh.p.set(-2+u*2,Y0+.6,9-u*2);sh.l.set(0,Y0,-3);sh.f=48;}
  else if(t<4.0){const u=t-3;logo.rotation.set(-.2,.9-u*.4,.1);logo.position.set(1,0,2-u);sh.p.set(3.5-u*2,Y0,6);sh.l.set(2,Y0,0);sh.f=44;}
  else if(t<7.8){logo.visible=false;flat.visible=true;blur.forEach(b=>b.visible=true);const u=(t-4)/3.8;// logo plano centrado, letras grandes desenfocadas
   flat.position.set(0,1.2,0);blur.forEach((b,i)=>{b.position.y+=dt*(.25+i*.05);b.rotation.y+=dt*.3*(i%2?1:-1);});sh.p.set(u*.4,Y0,9.5-u*.6);sh.l.set(0,Y0+.6,0);sh.f=50;
   if(t>7.3){flat.children.slice(4).forEach((c,i)=>c.position.y+=dt*(4+i));}}
  else if(t<10.0){flat.visible=false;blur.forEach(b=>b.visible=false);g.children.forEach(o=>{if(o.isGroup&&o!==dark&&o!==logo&&o!==flat&&!blur.includes(o)&&!big.includes(o))o.visible=false;});
   dark.visible=true;S.background=dbg;const u=(t-7.8)/2.2;dfall(dt);oP.rotation.set(-.5,-.4+u*.3,.3);ob.rotation.set(-.4,.3-u*.2,.2);sh.p.set(-1+u*2,Y0+3-u,9);sh.l.set(0,Y0-.5,0);sh.f=56;
   if(t>8.8&&!crd){crd=true;creds();}}
  else{// vuelo por el plató 3D (cámara alta que gira alrededor de la mesa)
   if(g.visible){g.visible=false;S.background=R.sb;S.fog=null;}const u=(t-10)/3,a=-1.1+u*1.2;sh.p.set(Math.sin(a)*r0*1.1,W.p.y*1.5-u*2,Math.cos(a)*r0*1.1);sh.l.set(0,.8,0);sh.f=52-u*6;}
 },x=>x);}finally{R.free();}
 chk(rid);cut('host');}
async function creds(){const P=window.TV22&&TV22.pill;for(const [r,n] of CRED){if(P)await P(r,n);}}
// ---------- EN FAMILIA (26,8 s) ----------
async function cabFam(rid){const R=room(),g=R.g;S.background=bgGrad('#3fb4d8','#13506e');const au=audio('cfam_cab');
 const sh={p:V3(0,Y0,10),l:V3(0,Y0,0),f:50,dr:0};cut(sh);
 const SG=new T.SphereGeometry(.32,12,8),wm=new T.MeshLambertMaterial({color:0xf2f4f6,emissive:0x8a9aa8});g.add(new T.HemisphereLight(0xffffff,0x335566,1.4));
 const mkBalls=(n,f)=>{const m=new T.InstancedMesh(SG,wm,n);const o=new T.Object3D();for(let i=0;i<n;i++){f(i,o);o.updateMatrix();m.setMatrixAt(i,o.matrix);}return m;};
 const sc=[];const add=(o)=>{o.visible=false;g.add(o);sc.push(o);return o;};
 // 1) columnas de bolas  2) tolva amarilla  3) tubos de cristal  4) máquina rosa con rayos  5) ciudad de bloques naranjas  6) tarros rosas  7) aro de bolas + logo
 const s1=add(mkBalls(220,(i,o)=>o.position.set((i%11-5)*.8,Math.floor(i/11)*.72-7,-Math.floor(i/55)*1.2)));
 const s2=add(new T.Group());s2.add(new T.Mesh(new T.BoxGeometry(6,3,3),new T.MeshLambertMaterial({color:0xf2c21a,emissive:0x6a4a00})));s2.add(mkBalls(60,(i,o)=>o.position.set((Math.random()-.5)*5,1.6+Math.random()*1.2,(Math.random()-.5)*2.4)));
 const s3=add(new T.Group());const tm=new T.MeshBasicMaterial({color:0xdff6ff,transparent:true,opacity:.45});for(let i=0;i<14;i++){const c=new T.Mesh(new T.CylinderGeometry(.18,.18,6,10,1,true),tm);c.position.set((i%7-3)*1.4,0,-(i>>3)*2);c.rotation.z=i%3?0:Math.PI/2;s3.add(c);}s3.add(mkBalls(30,(i,o)=>o.position.set((i%7-3)*1.4,(i/30)*6-3,0)));
 const s4=add(new T.Group());s4.add(new T.Mesh(new T.CylinderGeometry(2.2,2.6,1.4,24),new T.MeshLambertMaterial({color:0xe2338a,emissive:0x5a0a30})));for(let i=0;i<6;i++){const b=glyph('⚡',0xd04aff,0x5a1aa0,1.4,2);b.position.set(Math.cos(i)*3,1.5+Math.sin(i*2),Math.sin(i)*2);s4.add(b);}
 const s5=add(new T.Group());for(let i=0;i<60;i++){const h=1+Math.random()*5;const b=new T.Mesh(new T.BoxGeometry(.9,h,.9),new T.MeshLambertMaterial({color:[0xffb21a,0xff8a1a,0xf2d21a][i%3],emissive:0x6a3000}));b.position.set((i%10-4.5)*1.1,h/2-3,-Math.floor(i/10)*1.4);s5.add(b);}
 const s6=add(new T.Group());for(let i=0;i<7;i++){const j=new T.Mesh(new T.CylinderGeometry(.5,.6,1.3,16),new T.MeshLambertMaterial({color:0xf7f2ea,emissive:0x555048}));j.position.set((i-3)*1.5,0,0);s6.add(j);}
  const st=new T.Mesh(new T.BoxGeometry(12,.5,1.4),new T.MeshLambertMaterial({color:0xe2338a,emissive:0x5a0a30}));st.position.y=-.9;s6.add(st);
 const s7=add(new T.Group());s7.add(mkBalls(27,(i,o)=>{const a=i/27*6.283;o.position.set(Math.cos(a)*3.6,Math.sin(a)*3.6,0);o.scale.setScalar(1.25);}));
  const ring=new T.Mesh(new T.TorusGeometry(4.3,.12,8,64),new T.MeshLambertMaterial({color:0xf2c21a,emissive:0x8a6a00}));s7.add(ring);
  const lt=new T.TextureLoader().load('f16v/logo.png');if(T.SRGBColorSpace)lt.colorSpace=T.SRGBColorSpace;const lg=new T.Mesh(new T.PlaneGeometry(6.4,3.2),new T.MeshBasicMaterial({map:lt,transparent:true,fog:false}));lg.position.z=.4;s7.add(lg);
 const show=n=>sc.forEach((o,i)=>o.visible=i==n);const W=SHOTS.wide;const r0=Math.hypot(W.p.x,W.p.z)||12;
 const B=[0,1.5,4,8,10,13,17,22,26.8];
 try{await tween(26.8,(e,k)=>{const t=k*26.8;let i=B.findIndex((b,j)=>t>=b&&t<B[j+1]);const u=(t-B[i])/(B[i+1]-B[i]);
  if(i<6){show(i);}
  if(i==0){sh.p.set(-1+u*2,Y0+u*3-2,6);sh.l.set(0,Y0+u*3-2,0);sh.f=50;}
  else if(i==1){s2.rotation.y=-.4+u*.6;sh.p.set(3-u*4,Y0+3,7);sh.l.set(0,Y0,0);}
  else if(i==2){s3.rotation.y=u*.8;sh.p.set(0,Y0,8-u*3);sh.l.set(0,Y0,0);}
  else if(i==3){s4.rotation.y=u*1.5;sh.p.set(-4+u*3,Y0+2,7);sh.l.set(0,Y0,0);}
  else if(i==4){sh.p.set(-5+u*8,Y0+4-u*3,6-u*3);sh.l.set(0,Y0-1,-3);}
  else if(i==5){sh.p.set(-6+u*10,Y0+.5,5);sh.l.set(-2+u*6,Y0,0);s5.visible=false;}
  else if(i==6){show(6);s7.rotation.z=-u*.5;s7.children[0].rotation.z=u*2;sh.p.set(-3+Math.min(1,u*2)*3,Y0-1+Math.min(1,u*2),5+u*3);sh.l.set(0,Y0,0);sh.f=55;}
  else{if(g.visible){g.visible=false;S.background=R.sb;}const a=1.2-u*1.3;sh.p.set(Math.sin(a)*r0*1.2,W.p.y*1.7-u*3,Math.cos(a)*r0*1.2);sh.l.set(0,.8,0);sh.f=55-u*8;}
 },x=>x);}finally{R.free();au.pause();}chk(rid);}
window.CAB22={cabA3,cabFam};
})();
