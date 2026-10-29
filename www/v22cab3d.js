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

// v0.23: tipografía EXTRUIDA de verdad (contornos de Nunito Black, avances reales de cada letra)
const GC={};
function gshapes(ch){if(GC[ch])return GC[ch];const F=window.N900;const d=F&&F.g[ch];if(!d)return null;const sp=new T.ShapePath();const u=1/F.upm;let st=null;
 for(const c of d[1]){const o=c[0],a=c.slice(1).map(v=>v*u);
  if(o=='m'){sp.moveTo(a[0],a[1]);st=[a[0],a[1]];}else if(o=='l')sp.lineTo(a[0],a[1]);
  else if(o=='q'){const n=a.length/2;for(let i=0;i<n-1;i++){const cx=a[i*2],cy=a[i*2+1];let ex,ey;if(i<n-2){ex=(cx+a[i*2+2])/2;ey=(cy+a[i*2+3])/2;}else{ex=a[i*2+2];ey=a[i*2+3];}sp.quadraticCurveTo(cx,cy,ex,ey);}}
  else if(o=='c'&&st){sp.lineTo(st[0],st[1]);}}
 const P=sp.subPaths.map(p=>p.getPoints(4)),A=P.map(p=>T.ShapeUtils.area(p));let big=0;A.forEach((a,i)=>{if(Math.abs(a)>Math.abs(A[big]))big=i;});const sg=Math.sign(A[big]);
 const bb=p=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9;p.forEach(v=>{x0=Math.min(x0,v.x);y0=Math.min(y0,v.y);x1=Math.max(x1,v.x);y1=Math.max(y1,v.y);});return [x0,y0,x1,y1];};
 const outs=[],sh=[];P.forEach((p,i)=>{if(Math.sign(A[i])==sg){const s=new T.Shape(p);s._b=bb(p);outs.push(s);sh.push(s);}});
 P.forEach((p,i)=>{if(Math.sign(A[i])!=sg){const b=bb(p);const o=outs.find(s=>s._b[0]<=b[0]&&s._b[1]<=b[1]&&s._b[2]>=b[2]&&s._b[3]>=b[3])||outs[0];o.holes.push(new T.Path(p));}});
 return GC[ch]=[sh,d[0]*u];}
const GEO={};
function ggeo(ch,dep){const k=ch+dep;if(GEO[k])return GEO[k];const r=gshapes(ch);if(!r)return null;
 const g=new T.ExtrudeGeometry(r[0],{depth:dep,curveSegments:4,bevelEnabled:true,bevelThickness:.025,bevelSize:.018,bevelSegments:1});g.computeBoundingBox();const b=g.boundingBox;g.translate(-(b.max.x+b.min.x)/2,-.36,-dep);return GEO[k]=[g,r[1]];}
function glyphX(ch,col,side,sz,dep=.28){const r=ggeo(ch,dep);if(!r)return null;const m=new T.Mesh(r[0],[new T.MeshLambertMaterial({color:col,emissive:col,emissiveIntensity:.35}),new T.MeshLambertMaterial({color:side,emissive:side,emissiveIntensity:.2})]);
 const g=new T.Group();m.scale.setScalar(sz*1.25);g.add(m);g.adv=r[1]*sz*1.25;return g;}
const PG=new T.PlaneGeometry(1,1);
// letra 3D: cara + capas de grosor (barato para Redmi A2)
function glyph(ch,col,side,sz,lay=7,mode){if(mode!='o'&&lay>0){const x=glyphX(ch,col,side,sz,lay>4?.3:.14);if(x)return x;}const g=new T.Group();const t=gtex(ch,mode||'f');
 for(let i=lay;i>=0;i--){const m=new T.Mesh(PG,new T.MeshBasicMaterial({map:t,color:i?side:col,transparent:true,alphaTest:.4,side:T.DoubleSide,fog:false,depthWrite:true}));
  m.scale.setScalar(sz);m.position.z=-i*sz*.022;g.add(m);}return g;}
function word(s,col,side,sz,lay){const g=new T.Group();const L=[...s].map((ch,i)=>glyph(ch,typeof col=='function'?col(i):col,side,sz,lay||1));const tr=.93;let tot=L.reduce((a,l)=>a+(l.adv||sz*.56)*tr,0),x=-tot/2;L.forEach(l=>{const a=(l.adv||sz*.56)*tr;l.position.x=x+a/2;x+=a;g.add(l);});return g;}
function bgGrad(a,b){const c=document.createElement('canvas');c.width=4;c.height=256;const x=c.getContext('2d'),gr=x.createLinearGradient(0,0,0,256);gr.addColorStop(0,a);gr.addColorStop(1,b);x.fillStyle=gr;x.fillRect(0,0,4,256);
 const t=new T.CanvasTexture(c);if(T.SRGBColorSpace)t.colorSpace=T.SRGBColorSpace;return t;}
function room(){const g=new T.Group();g.position.y=Y0;S.add(g);const dl=new T.DirectionalLight(0xffffff,1.1);dl.position.set(3,5,8);g.add(dl,new T.HemisphereLight(0xdff2ff,0x2a5aa0,.9));const sb=S.background,sf=S.fog;S.fog=null;
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
 const fall=confetti(g,100,24,[0xffffff,0xffffff,0xe8422a,0x123c9a]);
 const big=[glyph('p',0xffffff,0x9fb4c8,8),glyph('a',0xe8422a,0x9a2010,8),glyph('s',0xffffff,0x9fb4c8,7),glyph('a',0xffffff,0x9fb4c8,7)];big.forEach(b=>g.add(b));
 const logo=word('pasapalabra',i=>i>8?0xe8422a:0xffffff,0x8aa4c0,2.8,6);g.add(logo);logo.visible=false;
 const flat=word('pasapalabra',0xffffff,0xffffff,1.25,0);g.add(flat);flat.visible=false;
 const blur=[['R',0xe8422a],['E',0xdde6f0],['P',0xe8422a],['V',0x123c9a],['S',0xdde6f0]].map(([c,k],i)=>{const l=glyph(c,k,c=='E'||c=='S'?0x8a98a8:0x7a1a10,2.4,5);l.position.set([-1.6,-6.2,2.2,-3.2,-7.5][i],[-2.4,-1.2,-3.6,3.6,-2.8][i],-1);l.visible=false;g.add(l);return l;});
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
 // v0.23: máquinas detalladas como en la tele (tubos con bolas con letra, tolva con aletas, red de tubos con engranajes, espiral con rayos, ciudad con agujas, tarros sobre la máquina rayada)
 const btex=ch=>{const c=document.createElement('canvas');c.width=128;c.height=64;const x=c.getContext('2d');x.fillStyle='#f4f6f8';x.fillRect(0,0,128,64);x.fillStyle='#1d4fb8';x.font='900 40px N,Arial';x.textAlign='center';x.textBaseline='middle';x.fillText(ch,32,34);x.fillText(ch,96,34);const t=new T.CanvasTexture(c);if(T.SRGBColorSpace)t.colorSpace=T.SRGBColorSpace;return t;};
 const LB='ABCDEFGHIJLMNOPRSTUVZ'.split('');const lbm=LB.map(ch=>new T.MeshLambertMaterial({map:btex(ch),emissive:0x666a70}));
 const glass=new T.MeshLambertMaterial({color:0xcfefff,transparent:true,opacity:.28,emissive:0x447788,depthWrite:false});
 const chrome=new T.MeshLambertMaterial({color:0xdde8f0,emissive:0x5a6a78});
 const s1=add(new T.Group());{const per=LB.length,rows=12;LB.forEach((ch,k)=>{const m=new T.InstancedMesh(SG,lbm[k],rows);const o=new T.Object3D();for(let r=0;r<rows;r++){o.position.set((k%11-5)*.82,r*.68-6,-Math.floor(k/11)*1.3);o.rotation.y=-.3;o.updateMatrix();m.setMatrixAt(r,o.matrix);}s1.add(m);});
  for(let k=0;k<22;k++){const c=new T.Mesh(new T.CylinderGeometry(.38,.38,9,12,1,true),glass);c.position.set((k%11-5)*.82,-1.5,-Math.floor(k/11)*1.3);s1.add(c);}}
 const s2=add(new T.Group());{const ye=new T.MeshLambertMaterial({color:0xf5c518,emissive:0x7a5200});const sh=new T.Shape();sh.moveTo(-3.4,1.6);sh.lineTo(3.4,1.6);sh.lineTo(1.4,-1.6);sh.lineTo(-1.4,-1.6);sh.closePath();
  const hop=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:3,bevelEnabled:true,bevelSize:.25,bevelThickness:.25,bevelSegments:2,curveSegments:2}),ye);hop.position.z=-1.5;s2.add(hop);
  [[-1.6,0xe2338a],[1.6,0x2a6ad8]].forEach(([x,c])=>{const f=new T.Mesh(new T.BoxGeometry(1.4,.25,2.4),new T.MeshLambertMaterial({color:c,emissive:c,emissiveIntensity:.3}));f.position.set(x,1.9,0);f.rotation.z=x>0?-.4:.4;s2.add(f);});
  s2.add(mkBalls(70,(i,o)=>o.position.set((Math.random()-.5)*5.5,1.9+Math.random()*1.4,(Math.random()-.5)*2.6)));
  const gear=new T.Mesh(new T.TorusGeometry(1.6,.35,6,12),new T.MeshLambertMaterial({color:0x2ab8b0,emissive:0x0a5550}));gear.position.set(4.6,2.5,-2);s2.add(gear);s2.userData.gear=gear;}
 const s3=add(new T.Group());{for(let i=0;i<16;i++){const c=new T.Mesh(new T.CylinderGeometry(.2,.2,7,10,1,true),glass);c.position.set((i%8-3.5)*1.3,0,-(i>>3)*2.2);if(i%3==0)c.rotation.z=Math.PI/2;s3.add(c);
   const r=new T.Mesh(new T.TorusGeometry(.26,.05,6,16),chrome);r.position.copy(c.position);r.position.y=(i%4)-1.5;r.rotation.x=Math.PI/2;s3.add(r);}
  s3.add(mkBalls(36,(i,o)=>o.position.set((i%8-3.5)*1.3,((i*7)%36)/36*7-3.5,-((i>>3)%2)*2.2)));
  const fr=new T.Mesh(new T.TorusGeometry(2.4,.12,6,4),new T.MeshBasicMaterial({color:0xffffff}));fr.position.set(3,1.5,1);s3.add(fr);}
 const s4=add(new T.Group());{s4.add(new T.Mesh(new T.CylinderGeometry(2.2,2.6,1.2,28),new T.MeshLambertMaterial({color:0xe2338a,emissive:0x5a0a30})));
  const hx=[];for(let i=0;i<=120;i++){const a=i/120*6.283*4;hx.push(V3(Math.cos(a)*(1.3-i/300),.7+i/120*4,Math.sin(a)*(1.3-i/300)));}
  s4.add(new T.Mesh(new T.TubeGeometry(new T.CatmullRomCurve3(hx),240,.08,6),chrome));const ax=new T.Mesh(new T.CylinderGeometry(.12,.12,5,8),chrome);ax.position.y=2.8;s4.add(ax);
  const zz=new T.Shape();[[0,0],[.5,.6],[.25,.6],[.7,1.3],[.05,.55],[.3,.55]].forEach((p,i)=>i?zz.lineTo(p[0],p[1]):zz.moveTo(p[0],p[1]));const zg=new T.ExtrudeGeometry(zz,{depth:.12,bevelEnabled:false});
  const zm=new T.MeshBasicMaterial({color:0xd46bff});for(let i=0;i<9;i++){const b=new T.Mesh(zg,zm);const a=i/9*6.283;b.position.set(Math.cos(a)*3.4,1+((i*5)%9)/3,Math.sin(a)*2.4);b.scale.setScalar(1.4);b.rotation.z=a;s4.add(b);}}
 const s5=add(new T.Group());{const cm=[0xffc21a,0xff9a1a,0xf5d21a,0xffb000].map(c=>new T.MeshLambertMaterial({color:c,emissive:c,emissiveIntensity:.25}));const bg5=new T.BoxGeometry(.9,1,.9),cg=new T.ConeGeometry(.45,1.6,8);
  for(let i=0;i<80;i++){const h=1+Math.random()*5;const b=new T.Mesh(bg5,cm[i%4]);b.scale.y=h;b.position.set((i%10-4.5)*1.1,h/2-3,-Math.floor(i/10)*1.3);s5.add(b);
   if(i%4==1){const c=new T.Mesh(cg,chrome);c.position.set(b.position.x,h-3+.8,b.position.z);s5.add(c);}}
  const wc=document.createElement('canvas');wc.width=512;wc.height=128;const wx=wc.getContext('2d');wx.fillStyle='#1f4fd0';wx.fillRect(0,0,512,128);wx.fillStyle='#8ab8ff';wx.font='900 30px N,Arial';for(let i=0;i<40;i++)wx.fillText('ABCDEFGHIJKLMNOPQRSTUVZ'[i%23],(i*53)%512,20+((i*37)%110));
  const wt=new T.CanvasTexture(wc);const w=new T.Mesh(new T.PlaneGeometry(26,7),new T.MeshBasicMaterial({map:wt}));w.position.set(0,1,-12);s5.add(w);}
 const s6=add(new T.Group());{const sc6=document.createElement('canvas');sc6.width=256;sc6.height=32;const sx=sc6.getContext('2d');for(let i=0;i<16;i++){sx.fillStyle=i%2?'#e2338a':'#2fb8c0';sx.beginPath();sx.moveTo(i*16,0);sx.lineTo(i*16+16,0);sx.lineTo(i*16+4,32);sx.lineTo(i*16-12,32);sx.fill();}
  const stt=new T.CanvasTexture(sc6);stt.wrapS=T.RepeatWrapping;stt.repeat.set(3,1);
  for(let i=0;i<7;i++){const j=new T.Mesh(new T.CylinderGeometry(.5,.55,1.3,16,1,true),glass);j.position.set((i-3)*1.5,0,0);s6.add(j);
   const lid=new T.Mesh(new T.CylinderGeometry(.56,.56,.25,16),new T.MeshLambertMaterial({color:0xe2338a,emissive:0x5a0a30}));lid.position.set((i-3)*1.5,.75,0);s6.add(lid);
   const k=new T.Mesh(new T.SphereGeometry(.16,8,6),chrome);k.position.set((i-3)*1.5,.98,0);s6.add(k);
   const bl=new T.Mesh(SG,lbm[i]);bl.position.set((i-3)*1.5,-.3,0);s6.add(bl);}
  const st=new T.Mesh(new T.BoxGeometry(12,.9,1.6),[new T.MeshLambertMaterial({color:0xe2338a,emissive:0x5a0a30}),new T.MeshLambertMaterial({color:0xe2338a,emissive:0x5a0a30}),new T.MeshLambertMaterial({color:0xe2338a}),new T.MeshLambertMaterial({color:0xe2338a}),new T.MeshBasicMaterial({map:stt}),new T.MeshBasicMaterial({map:stt})]);st.position.y=-1.1;s6.add(st);
 }
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
