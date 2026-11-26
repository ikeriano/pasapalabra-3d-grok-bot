'use strict';
/* v0.30 · Cabecera de Pasapalabra de los 2000 (Antena 3) recreada en 3D plano a plano sobre pasapalabra_cabecera2000/original.mp4
   (cartel del arco → globo de alambre → anillo de letras doradas sobre peana azul → letras que caen sobre la mesa → mesa vista desde arriba
   con el emblema → emblema translúcido sobre el público), con la MÚSICA ORIGINAL (snd/cab2000_30.m4a, sin recodificar).
   Sin moscas de Pack TV ni de Antena 3. «Dirección» con nombre 🆕 INVENTADO. */
window.CAB2000_30=async function(rid){
 const PI=Math.PI,root2=new T.Group();G.add(root2);root2.scale.setScalar(1);
 const cvt=(w,h,f)=>{const c=document.createElement('canvas');c.width=w;c.height=h;f(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.colorSpace=T.SRGBColorSpace;return t;};
 const lam=(c,o)=>new T.MeshLambertMaterial(Object.assign({color:c},o||{})),bas=o=>new T.MeshBasicMaterial(o);
 const clamp=(a,b,x)=>Math.max(a,Math.min(b,x)),seg=(t,a,b)=>clamp(0,1,(t-a)/(b-a)),ease=x=>x<.5?2*x*x:1-Math.pow(-2*x+2,2)/2,lerp=(a,b,x)=>a+(b-a)*x;
 const GOLD={grad:['#fff4b0','#ffd84a','#e2a400','#9a5c00'],side:'#6e4200',layers:14,glow:'#ffd040'};
 const L1='PASAPALABRA'.split('');
 // ---------- fondos ----------
 const studioT=cvt(2048,1024,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h*.45);g.addColorStop(0,'#1a2cc8');g.addColorStop(1,'#2a3ee0');c.fillStyle=g;c.fillRect(0,0,w,h*.45);
  c.fillStyle='#ff7a12';for(let i=0;i<9;i++){c.beginPath();c.ellipse(80+i*250,h*.06+(i%3)*30,170,90,(i%2?.3:-.2),0,7);c.fill();}
  c.fillStyle='#ff9a1a';for(let i=0;i<6;i++){c.beginPath();c.ellipse(200+i*360,h*.2,120,60,.4,0,7);c.fill();}
  for(let i=0;i<5;i++){c.fillStyle='#fff';c.beginPath();c.ellipse(180+i*420,h*.13,95,70,0,0,7);c.fill();c.fillStyle='#2a6ae8';c.beginPath();c.ellipse(180+i*420,h*.13,70,48,0,0,7);c.fill();}
  c.fillStyle='#ff8a14';for(let i=0;i<6;i++){c.beginPath();c.roundRect(i*360-60,h*.18,260,130,60);c.fill();}
  c.fillStyle='rgba(200,225,255,.95)';c.font='900 150px Arial';c.textAlign='center';['S','A','L','P','B'].forEach((x,i)=>c.fillText(x,260+i*400,h*.2));
  c.fillStyle='#2a2238';c.fillRect(0,h*.3,w,h*.27);
  const cols=['#d33','#eee','#58c','#eb4','#c69','#6a5','#e85','#bbb','#333'];for(let r=0;r<6;r++)for(let i=0;i<110;i++){const x=i*19+(r%2)*9,y=h*.32+r*38;c.fillStyle=cols[(i*7+r*5)%9];c.fillRect(x-8,y+8,16,22);c.fillStyle=['#e8b896','#c99572','#f0c8a8'][(i+r)%3];c.beginPath();c.arc(x,y+2,7,0,7);c.fill();}
  c.fillStyle='#ffd21a';c.fillRect(0,h*.565,w,34);c.fillStyle='#e8a800';c.fillRect(0,h*.598,w,8);
  const f=c.createLinearGradient(0,h*.6,0,h);f.addColorStop(0,'#8a96b0');f.addColorStop(.4,'#c8d0e0');f.addColorStop(1,'#6e7ea8');c.fillStyle=f;c.fillRect(0,h*.6,w,h*.4);
  c.fillStyle='rgba(255,255,255,.45)';for(let i=0;i<7;i++){c.beginPath();c.ellipse(150+i*300,h*.82,90,22,0,0,7);c.fill();}
  c.fillStyle='rgba(30,60,200,.7)';c.beginPath();c.ellipse(w*.5,h*.9,520,70,0,0,7);c.fill();
  c.filter='blur(6px)';c.drawImage(c.canvas,0,0);});
 const starsT=cvt(1024,512,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#0a1490');g.addColorStop(1,'#1a2cd0');c.fillStyle=g;c.fillRect(0,0,w,h);
  for(let i=0;i<260;i++){c.fillStyle='rgba(255,255,255,'+(.3+.7*((i*37)%10)/10)+')';c.fillRect((i*131)%w,(i*71)%h,2+i%3,2+i%3);}
  c.fillStyle='#ff8a10';c.fillRect(0,0,w,40);});
 const bg=new T.Mesh(new T.PlaneGeometry(2700,1520),bas({map:starsT,depthWrite:false}));bg.position.z=-1200;root2.add(bg);
 // ---------- v0.30b · fondo real del plató: planchas texturizadas sacadas de los fotogramas de original.mp4 (15 por segundo, sin el globo ni las moscas) ----------
 const PL=window.__pl30meta||null,PZ=-700,PK=(GZ-PZ)/GZ,NPL=270;
 const plG=new T.PlaneGeometry(1,1,3,1);{const W2=Math.max(GW,960)/2,xs=[-W2,-480,480,W2],us=[0,160/1280,1120/1280,1],pa=plG.attributes.position,ua=plG.attributes.uv;for(let i=0;i<pa.count;i++){const c=i%4;pa.setX(i,xs[c]*PK);pa.setY(i,pa.getY(i)*720*PK);ua.setX(i,us[c]);}pa.needsUpdate=ua.needsUpdate=true;}
 const plM=[0,1].map(k=>bas({transparent:k==1,opacity:1,depthWrite:false,depthTest:false}));const plA=new T.Mesh(plG,plM[0]),plB=new T.Mesh(plG,plM[1]);[plA,plB].forEach((m,k)=>{m.position.z=PZ+k;m.renderOrder=-10+k;root2.add(m);});
 const plC=new Map(),plL=new Set();const plLoad=i=>{if(i<0||i>=NPL||plC.has(i)||plL.has(i))return;plL.add(i);const im=new Image();im.decoding='async';im.onload=()=>{plL.delete(i);const tx=new T.Texture(im);tx.colorSpace=T.SRGBColorSpace;tx.minFilter=T.LinearFilter;tx.generateMipmaps=false;tx.needsUpdate=true;plC.set(i,tx);};im.src='cab2000/p'+String(i).padStart(3,'0')+'.jpg';};
 let plLast=-1;const plSet=t=>{const f=Math.max(0,Math.min(NPL-1,t*15)),i=Math.floor(f),u=f-i;for(let k=-1;k<8;k++)plLoad(i+k);
  const a=plC.get(i)||plC.get(plLast),b=plC.get(i+1);if(a){plM[0].map=a;plM[0].needsUpdate=true;if(plC.get(i))plLast=i;}if(b&&u>0){plM[1].map=b;plM[1].opacity=u;plM[1].needsUpdate=true;plB.visible=true;}else plB.visible=false;
  for(const [k,tx] of plC)if(k<i-2||k>i+12){tx.dispose();plC.delete(k);}};
 for(let k=0;k<10;k++)plLoad(k);
 const trk=t=>{const K=[[2.95,-200,410,350],[3.2,60,400,332],[3.5,262,385,316],[3.8,414,375,293],[4.1,537,360,266],[4.4,603,354,249],[4.7,634,351,243],[12.45,634,351,243]];if(t<K[0][0]||t>K[K.length-1][0])return null;for(let j=0;j<K.length-1;j++){const A=K[j],B=K[j+1];if(t<=B[0]){const u=(t-A[0])/(B[0]-A[0]);return [A[1]+(B[1]-A[1])*u,A[2]+(B[2]-A[2])*u,A[3]+(B[3]-A[3])*u];}}return null;};

 // ---------- A · cartel del arco (0-3,1 s) ----------
 const sign=new T.Group();root2.add(sign);
 const curve=new T.QuadraticBezierCurve3(new T.Vector3(-760,-330,0),new T.Vector3(-150,330,0),new T.Vector3(820,170,0));
 sign.add(new T.Mesh(new T.TubeGeometry(curve,64,70,10),lam(0xffb81a,{emissive:0x553000})));
 const c2=new T.QuadraticBezierCurve3(new T.Vector3(-800,-250,-20),new T.Vector3(-150,430,-20),new T.Vector3(860,260,-20));
 sign.add(new T.Mesh(new T.TubeGeometry(c2,64,46,8),lam(0xff7010,{emissive:0x401400})));
 const c3=new T.QuadraticBezierCurve3(new T.Vector3(-720,-420,30),new T.Vector3(-150,220,30),new T.Vector3(780,70,30));
 sign.add(new T.Mesh(new T.TubeGeometry(c3,64,30,8),lam(0x1a3ad8,{emissive:0x081a60})));
 const doorT=cvt(512,256,(c,w,h)=>{const g=c.createLinearGradient(0,0,0,h);g.addColorStop(0,'#3a3060');g.addColorStop(1,'#8a5a70');c.fillStyle=g;c.fillRect(0,0,w,h);c.fillStyle='rgba(255,200,230,.55)';for(let i=0;i<6;i++){c.beginPath();c.ellipse(40+i*85,h*.6,18,60,0,0,7);c.fill();}c.strokeStyle='#1a3ad8';c.lineWidth=14;c.strokeRect(0,0,w,h);c.filter='blur(3px)';c.drawImage(c.canvas,0,0);});const door=new T.Mesh(new T.PlaneGeometry(900,420),bas({map:doorT}));door.position.set(120,-330,-60);sign.add(door);
 L1.forEach((ch,i)=>{const u=.12+i*.075,p=curve.getPoint(u),tg=curve.getTangent(u);const l=bigTxt(210,240,ch,GOLD);l.position.set(p.x,p.y+110,60);l.rotation.z=Math.atan2(tg.y,tg.x);l.rotation.y=-.25;sign.add(l);});
 const spotT=cvt(128,128,(c,w)=>{const g=c.createRadialGradient(64,64,0,64,64,64);g.addColorStop(0,'rgba(255,255,255,1)');g.addColorStop(.25,'rgba(255,250,220,.6)');g.addColorStop(1,'rgba(255,220,120,0)');c.fillStyle=g;c.fillRect(0,0,w,w);});
 const spots=[[-300,330],[150,360],[520,330],[-650,200]].map(([x,y],i)=>{const s=new T.Sprite(new T.SpriteMaterial({map:spotT,blending:T.AdditiveBlending,depthWrite:false,transparent:true}));s.position.set(x,y,-100);s.scale.setScalar(60+i*10);sign.add(s);return s;});
 // ---------- B · globo de alambre plateado transparente ----------
 const globe=new T.Group();root2.add(globe);globe.visible=false;const R=285;
 const wm=new T.MeshPhongMaterial({color:0x8d939b,specular:0xbbbbbb,shininess:40,emissive:0x0c0d0f,transparent:true,opacity:.3});
 for(let k=1;k<14;k++){const la=-PI/2+k*PI/14,r=R*Math.cos(la);const m=new T.Mesh(new T.TorusGeometry(r,2.1,5,56),wm);m.rotation.x=PI/2;m.position.y=R*Math.sin(la);globe.add(m);}
 for(let k=0;k<12;k++){const m=new T.Mesh(new T.TorusGeometry(R,2.0,5,72),wm);m.rotation.y=k/12*PI;globe.add(m);}
 globe.add(new T.Mesh(new T.SphereGeometry(R*.985,36,24),new T.MeshBasicMaterial({color:0x34373b,transparent:true,opacity:0,depthWrite:false})));
 const arc=new T.Mesh(new T.TorusGeometry(R*1.08,4,6,64,PI*1.3),lam(0x9aa4b4));arc.rotation.set(0,PI/2,-PI*.15);/* v0.30b: el original no lleva arco */
 // anillo de letras doradas sobre banda azul
 const ring=new T.Group();ring.rotation.order='ZXY';ring.rotation.z=.17;ring.rotation.x=.12;ring.position.y=5;const rh=new T.Group();globe.add(rh);rh.add(ring);{const hs=new T.Mesh(new T.SphereGeometry(R*.97,48,32),new T.MeshPhongMaterial({color:0x9aa0a8,specular:0xffffff,shininess:90,transparent:true,opacity:0,depthWrite:false}));globe.add(hs);const hb=new T.Mesh(new T.TorusGeometry(R*.62,2.5,6,64),new T.MeshPhongMaterial({color:0x8d939b,specular:0xffffff,shininess:80,transparent:true,opacity:0}));hb.rotation.set(.9,.3,0);globe.add(hb);const hb2=hb.clone();hb2.rotation.set(-.7,1.2,.4);globe.add(hb2);}
 const band=new T.Mesh(new T.CylinderGeometry(R*1.5,R*1.46,140,96,1,true),new T.MeshPhongMaterial({color:0x2f5fe0,emissive:0x1636a0,specular:0x8fb4ff,shininess:22,side:T.FrontSide,transparent:false,opacity:1}));ring.add(band);{const bin=new T.Mesh(new T.CylinderGeometry(R*1.497,R*1.457,140,96,1,true),lam(0x173a9a,{side:T.BackSide,emissive:0x0a1c58}));band.add(bin);}
 const gb1=new T.Mesh(new T.TorusGeometry(R*1.5,4.5,6,96),new T.MeshPhongMaterial({color:0x3a68e8,emissive:0x1a3ab0,specular:0x6080c0,shininess:30}));gb1.rotation.x=PI/2;gb1.position.y=70;ring.add(gb1);const gb2=new T.Mesh(new T.TorusGeometry(R*1.46,4.5,6,96),lam(0x14328c,{emissive:0x0a1e60}));gb2.rotation.x=PI/2;gb2.position.y=-70;ring.add(gb2);
 const thinL=(ch,dark)=>{const c=document.createElement('canvas');c.width=160;c.height=192;const x=c.getContext('2d');x.translate(80,96);x.scale(.98,1);x.font='900 180px "Arial Black",Arial,Helvetica,sans-serif';x.textAlign='center';x.textBaseline='middle';x.lineJoin='miter';
 if(dark){x.lineWidth=14;x.strokeStyle='#3a2200';x.strokeText(ch,0,8);x.fillStyle='#7a4800';x.fillText(ch,0,8);}else{
 const g=x.createLinearGradient(0,-75,0,80);g.addColorStop(0,'#e8c870');g.addColorStop(.25,'#d4a834');g.addColorStop(.5,'#a87810');g.addColorStop(.8,'#6a4204');g.addColorStop(1,'#c08a20');
 x.lineWidth=12;x.strokeStyle='#2a1800';x.strokeText(ch,0,8);x.fillStyle=g;x.fillText(ch,0,8);
 x.save();x.globalCompositeOperation='source-atop';x.lineWidth=7;x.strokeStyle='rgba(255,250,200,.85)';x.strokeText(ch,-3,5);x.strokeStyle='rgba(90,50,0,.8)';x.strokeText(ch,3,11);x.fillStyle=g;x.fillText(ch,0,8);
 const sh=x.createLinearGradient(-70,-90,70,40);sh.addColorStop(.36,'rgba(255,255,255,0)');sh.addColorStop(.48,'rgba(255,255,235,.6)');sh.addColorStop(.6,'rgba(255,255,255,0)');x.fillStyle=sh;x.fillRect(-100,-100,200,200);x.restore();}
 const tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;tx.anisotropy=4;const c2=document.createElement('canvas');c2.width=160;c2.height=192;const x2=c2.getContext('2d');const c3=document.createElement('canvas');c3.width=20;c3.height=24;const x3=c3.getContext('2d');x3.imageSmoothingQuality='high';x3.drawImage(c,0,0,20,24);x2.imageSmoothingEnabled=true;x2.imageSmoothingQuality='high';for(const[dx,dy]of[[0,0],[-3,0],[3,0],[0,-3],[0,3]]){x2.globalAlpha=.35;x2.drawImage(c3,dx,dy,160,192);}x2.globalAlpha=1;const tb=new T.CanvasTexture(c2);tb.colorSpace=T.SRGBColorSpace;const m=new T.Mesh(new T.PlaneGeometry(124,156*192/160*.84),new T.MeshBasicMaterial({map:tx,transparent:true,depthWrite:false,alphaTest:.05,side:T.DoubleSide}));if(!dark){m.userData.ta=tx;m.userData.tb=tb;}return m;};
 const LDK={},_v33=new T.Vector3();const letters=[];[...L1,'•',...L1,'•'].forEach((ch,i)=>{if(ch=='•')return;const a=(i-5)*(2*PI/24);for(let k=3;k>=1;k--){if(!LDK[ch])LDK[ch]=thinL(ch,1);const e=LDK[ch].clone();const rr=R*1.505+k*0;e.position.set((R*1.515+(3-k)*3)*Math.sin(a)-Math.cos(a)*k*2.2,-k*2.2,(R*1.515+(3-k)*3)*Math.cos(a)+Math.sin(a)*k*2.2);e.rotation.y=a;e.renderOrder=2;e.userData.lt=1;ring.add(e);}const l=thinL(ch);l.position.set((R*1.515+10)*Math.sin(a),0,(R*1.515+10)*Math.cos(a));l.rotation.y=a;l.renderOrder=3;l.userData.lt=1;ring.add(l);letters.push(l);});for(const k of[11,23]){const aa=(k-5)*(2*PI/24);const dt=new T.Mesh(new T.SphereGeometry(16,12,8),lam(0xff8a10,{emissive:0x803000}));dt.position.set(R*1.54*Math.sin(aa),0,R*1.54*Math.cos(aa));dt.userData.lt=1;ring.add(dt);}
 const ped=new T.Group();root2.add(ped);ped.visible=false;
 ped.add(new T.Mesh(new T.CylinderGeometry(300,320,70,64,1,true),lam(0x1838c8,{side:T.DoubleSide,emissive:0x081860})));const pt=new T.Mesh(new T.TorusGeometry(300,12,8,64),lam(0x2a50e8));pt.rotation.x=PI/2;pt.position.y=35;ped.add(pt);
 // ---------- C · letras que caen sobre la mesa ----------
 const falls=[];
 // ---------- D · mesa: arriba roja, abajo azul, sillas rojas, emblema amarillo con letras ----------
 const desk=new T.Group();root2.add(desk);desk.visible=false;
 const tri=new T.Shape();tri.moveTo(-420,-170);tri.lineTo(420,-170);tri.quadraticCurveTo(470,-170,430,-110);tri.lineTo(40,230);tri.quadraticCurveTo(0,262,-40,230);tri.lineTo(-430,-110);tri.quadraticCurveTo(-470,-170,-420,-170);
 const redS=new T.Shape();redS.moveTo(-281,20);redS.lineTo(-40,230);redS.quadraticCurveTo(0,262,40,230);redS.lineTo(281,20);redS.lineTo(-281,20);
 const bluS=new T.Shape();bluS.moveTo(-281,20);bluS.lineTo(281,20);bluS.lineTo(430,-110);bluS.quadraticCurveTo(470,-170,420,-170);bluS.lineTo(-420,-170);bluS.quadraticCurveTo(-470,-170,-430,-110);bluS.lineTo(-281,20);
 for(const [sh,col] of [[redS,0xf04a68],[bluS,0x2a58e0]]){const m=new T.Mesh(new T.ExtrudeGeometry(sh,{depth:22,bevelEnabled:true,bevelThickness:6,bevelSize:6,bevelSegments:2}),lam(col));m.rotation.x=-PI/2;m.position.y=40;desk.add(m);}
 const lowM=new T.Mesh(new T.ExtrudeGeometry(tri,{depth:60,bevelEnabled:true,bevelThickness:8,bevelSize:10,bevelSegments:2}),lam(0x2a58e0));lowM.rotation.x=-PI/2;lowM.position.y=-30;lowM.scale.set(1.04,1.04,1);desk.add(lowM);const low2=new T.Mesh(new T.ExtrudeGeometry(tri,{depth:40,bevelEnabled:false}),lam(0x7aa8ff));low2.rotation.x=-PI/2;low2.position.y=-75;low2.scale.set(1.0,1.0,1);desk.add(low2);
 for(const sx of[-1,1])for(let i=0;i<3;i++){const x=sx*(140+i*95),z=-235;const ch=new T.Group();ch.add(new T.Mesh(new T.BoxGeometry(60,10,52),lam(0xd81a24)).translateY(70));ch.add(new T.Mesh(new T.BoxGeometry(60,62,10),lam(0xd81a24)).translateY(108).translateZ(-24));ch.add(new T.Mesh(new T.CylinderGeometry(4,4,150,6),lam(0x111111)).translateY(-5));ch.position.set(x,0,z);desk.add(ch);
  const mic=new T.Group();mic.add(new T.Mesh(new T.CylinderGeometry(2.4,2.4,70,6),lam(0x222222)).translateY(35));mic.add(new T.Mesh(new T.SphereGeometry(7,8,6),lam(0x111111)).translateY(72));mic.position.set(x+sx*20,62,-150);mic.rotation.x=-.4;desk.add(mic);}
 const embT=cvt(512,512,(c,w)=>{c.translate(w/2,w/2);c.fillStyle='#f6eccc';c.beginPath();c.arc(0,0,250,0,7);c.fill();c.fillStyle='#fffaf0';c.beginPath();c.arc(0,0,236,0,7);c.fill();c.fillStyle='#f3e6c0';c.beginPath();c.arc(0,0,226,0,7);c.fill();
  c.fillStyle='#d8b860';c.font='900 64px Arial';c.textAlign='center';c.textBaseline='middle';L1.forEach((ch,i)=>{c.save();c.rotate(i/L1.length*2*PI);c.fillText(ch,0,-180);c.restore();});
  c.fillStyle='#fff6c0';c.beginPath();c.arc(0,0,128,0,7);c.fill();c.fillStyle='#ff8aa0';c.beginPath();c.arc(0,0,116,PI/2,-PI/2);c.fill();c.fillStyle='#7ab0ff';c.beginPath();c.arc(0,0,116,-PI/2,PI/2);c.fill();
  c.fillStyle='#ff8aa0';c.beginPath();c.arc(0,58,58,-PI/2,PI/2);c.fill();c.fillStyle='#7ab0ff';c.beginPath();c.arc(0,-58,58,PI/2,-PI/2);c.fill();});
 const emb=new T.Mesh(new T.CircleGeometry(150,64),lam(0xffffff,{map:embT,emissive:0x303030}));emb.rotation.x=-PI/2;emb.position.set(0,75,-10);desk.add(emb);
 const embRim=new T.Mesh(new T.TorusGeometry(152,9,8,64),lam(0xf4ead0,{emissive:0x403a30}));embRim.rotation.x=-PI/2;embRim.position.set(0,76,-10);desk.add(embRim);
 const ghost=new T.Mesh(new T.CircleGeometry(330,64),bas({map:embT,transparent:true,opacity:0,depthTest:false}));ghost.position.z=300;ghost.renderOrder=8;root2.add(ghost);
 const XMAS=window.EstudioNavidad&&OPT&&/navidad|findeano|reyes|nochebuena|mayores/.test(OPT.tema||'');const trees=[];
 if(XMAS){for(const [x,y,z,e,sd] of [[-560,-330,-200,120,3],[560,-330,-200,120,9]]){const tg=new T.Group();root2.add(tg);EstudioNavidad.add(T,tg,{x:0,y:0,z:0,escala:e,regalos:6,seed:sd});tg.position.set(x,y,z);tg.userData.base=[x,y,z];trees.push(tg);}}
 if(window.DECO30&&DECO30.special(OPT.tema)){for(const [x,y,z,sd] of [[-560,-330,-200,-1],[560,-330,-200,1]]){const tg=DECO30.cluster(OPT.tema,120,sd);root2.add(tg);tg.position.set(x,y,z);tg.userData.base=[x,y,z];tg.userData.d30=1;trees.push(tg);}}
 const fade=new T.Mesh(new T.PlaneGeometry(3000,2000),bas({color:0x000000,transparent:true,opacity:0,depthTest:false}));fade.position.z=600;fade.renderOrder=9;root2.add(fade);
 const flash=new T.Mesh(new T.PlaneGeometry(3000,2000),bas({color:0xffffff,transparent:true,opacity:1,depthTest:false}));flash.position.z=610;flash.renderOrder=10;root2.add(flash);
 const cred=document.createElement('div');cred.className='cred30';cred.innerHTML='<b>Dirección</b><span>BEGOÑA LARRAÑETA SOLER</span>';document.body.appendChild(cred);
 let studioOn=false;const toStudio=()=>{if(studioOn)return;studioOn=true;bg.material.map=studioT;bg.material.needsUpdate=true;};
 try{stopMusic();}catch(e){}let au=null,on=false;if(OPT.mus>0){try{au=new Audio('snd/cab2000_30.m4a');au.volume=Math.max(.3,OPT.mus);const p=au.play();p&&p.then&&p.then(()=>on=true).catch(()=>{});}catch(e){}}
 let clock=0;const DUR=18.05;window.__cab30t=0;
 try{await new Promise((res,rej)=>{anim(dt=>{if(rid!==undefined&&rid!==RUN){rej(new Stop());return false;}clock+=dt;const t=(window.__cab30fix!==undefined)?window.__cab30fix:(on&&au&&!au.paused&&au.currentTime>0)?au.currentTime:clock;window.__cab30t=t;if(t>=DUR||clock>DUR+1.5&&window.__cab30fix===undefined){res();return false;}
  // 0-0,45 s blanco
  flash.material.opacity=t<.3?1:t<.6?1-seg(t,.3,.6):(t>=11.9&&t<12.3?.6*(1-seg(t,11.9,12.3)):0);
  // A · cartel: encuadre cerrado sobre las letras, barrido lento a la izquierda y ligero giro
  const a=seg(t,.2,3.4);sign.visible=t<5.9;sign.scale.setScalar(lerp(.9,.82,a));sign.position.set(lerp(200,0,a),lerp(-120,-80,a),0);sign.rotation.set(-.05,lerp(.12,-.1,a),lerp(.04,0,a));
  spots.forEach((s,i)=>s.material.opacity=.6+.4*Math.sin(t*5+i*2));
  if(t>=3.1&&t<5.9){sign.scale.setScalar(lerp(.95,.8,ease(seg(t,3.1,4.6))));sign.position.set(lerp(80,-200,ease(seg(t,3.1,5.8))),lerp(-90,200,ease(seg(t,3.1,4.6))),-300);}
  // B · el globo entra por la izquierda (3,1-4,6), el anillo dorado aparece (5,0-6,0); a las 5,9 s pasamos al plató con público
  if(t>=5.9)toStudio();
  globe.visible=t>=3.0&&t<12.4;
  if(globe.visible){const e=ease(seg(t,3.0,4.6));let gx=lerp(-1000,0,e),gy=lerp(40,20,e),gs=1;
   if(t>=5.9){gx=lerp(-60,20,seg(t,5.9,11));gy=lerp(-10,0,seg(t,5.9,11));gs=lerp(.95,1.0,seg(t,5.9,11));}
   if(t>=11.1){const m=ease(seg(t,11.1,12.0));gx=lerp(40,820,m);gy=lerp(60,160,m);gs=lerp(1.0,1.5,m);}
   globe.position.set(gx,gy,0);globe.scale.setScalar(gs);globe.rotation.y=t*.5;globe.rotation.x=.08;globe.rotation.z=.02;
   ring.visible=t>=5.1;ring.scale.setScalar(lerp(.96,.92,ease(seg(t,5.1,6.1)))+.08*ease(seg(t,6.1,6.8)));ring.position.y=lerp(330,.3*R,ease(seg(t,5.05,5.35)))-.24*R*ease(seg(t,6.2,6.8));{const e=1+.3*(1-ease(seg(t,6.1,6.8)));band.scale.y=e;}rh.quaternion.copy(globe.quaternion).invert();ring.rotation.y=-(t-8.5)*1.08-PI/2+.34+1.3*(1-ease(seg(t,5.9,6.75)))-.3*(1-ease(seg(t,6.4,8.0)));{const lv=1-ease(seg(t,10.3,10.75));band.material.emissive.setHex(t<6.4?0x1638a8:0x1636a0);band.material.color.setHex(t<6.4?0x2a5ae8:0x2f5fe0);ring.rotation.z=.23*lv-.33*(1-ease(seg(t,5.3,6.6)));ring.rotation.x=.12*lv-.12*(1-ease(seg(t,5.1,6.2)));}{const bo=-R*.95*ease(seg(t,10.6,11.0)),lo=R*.82*ease(seg(t,10.9,11.6))+R*1.3*ease(seg(t,11.6,12.1));band.position.y=bo;gb1.position.y=70+bo;gb2.position.y=-70+bo;band.visible=gb1.visible=gb2.visible=t<11.0;ring.children.forEach(c=>{if(c.userData.lt){c.position.y=lo;if(c.userData.ta||c.material.map){const ud=(c.userData.ta&&c.userData.ta.isTexture)?c.userData:null;if(ud){const so=t>=10.95;const mp=so?ud.tb:ud.ta;if(c.material.map!==mp){c.material.map=mp;c.material.needsUpdate=true;}c.material.opacity=so?.55:1;}else{c.material.opacity=t>=10.95?0:1;}c.scale.setScalar(1-.22*ease(seg(t,10.9,11.4)));}c.visible=t>=5.9;if(c.visible&&t>=10.85&&t<11.8){c.getWorldPosition(_v33);if(_v33.z<globe.position.z)c.visible=false;}if(c.visible&&t<7.0){c.getWorldPosition(_v33);c.visible=_v33.x>globe.position.x+R*globe.scale.x*(1.3-3.4*ease(seg(t,5.9,7.0)));}}});}}
  ped.visible=t>=10.3&&t<12.4;if(ped.visible){ped.position.set(globe.position.x,globe.position.y-R*globe.scale.x*.62,40);ped.scale.setScalar(globe.scale.x*lerp(.5,1,ease(seg(t,10.3,10.9))));ped.rotation.x=.3;}
  bg.position.x=studioOn?lerp(120,-180,seg(t,5.9,12)):0;if(studioOn){bg.position.y=-40;bg.rotation.z=-.1;}bg.scale.setScalar(studioOn?lerp(1,1.15,seg(t,5.9,12)):1);
  // C · 12-14,2 s: la mesa en tres cuartos y las letras doradas caen y rebotan
  if(t>=11.9&&!falls.length){L1.forEach((ch,i)=>{const l=bigTxt(110,130,ch,GOLD);l.userData={x:(i-5)*78,z:150,d:i*.08,r:(i%2?1:-1)*(.8+i*.1)};root2.add(l);falls.push(l);});}
  desk.visible=t>=11.9;
  if(desk.visible&&t<14.3){const d=ease(seg(t,11.9,14.2));desk.position.set(lerp(40,-20,d),lerp(-110,-60,d),lerp(-200,-60,d));desk.rotation.set(lerp(.4,.5,d),lerp(.5,.35,d),0);desk.scale.setScalar(lerp(.9,1.0,d));}
  falls.forEach(l=>{const u=l.userData,k=clamp(0,1.4,t-12.0-u.d);l.visible=t<14.4&&k>0;const y=420-900*k*k;l.position.set(u.x+desk.position.x,Math.max(y,desk.position.y+60+(k>.75?40*Math.abs(Math.sin(k*9))*Math.exp(-(k-.75)*4):0)),u.z+80);const sp=clamp(0,1,k/.75);l.rotation.z=u.r*(1-sp)*2;l.rotation.x=-.5*sp;});
  // D · 14,3-17 s: vista cenital acercándonos al emblema; «Dirección» abajo en el centro
  if(t>=14.3){const d=ease(seg(t,14.3,17));desk.position.set(lerp(-20,10,d),lerp(-80,-130,d),lerp(250,420,d));desk.rotation.set(lerp(1.0,1.1,d),lerp(.25,.2,d),lerp(-.4,-.46,d));desk.scale.setScalar(lerp(1.35,1.5,d));}
  emb.rotation.z=embRim.rotation.z=0;
  cred.classList.toggle('on',t>=15.0&&t<16.9);
  // final 17-18 s: emblema dorado translúcido sobre el público
  if(t>=16.9){desk.visible=false;ghost.material.opacity=.55*seg(t,16.9,17.3);ghost.rotation.z=-(t-16.9)*.4;bg.position.set(0,-120,0);bg.scale.setScalar(1.35);}
  trees.forEach((tg,i)=>{tg.visible=t>=5.9;try{if(tg.userData.d30)DECO30.tick(tg,t);else EstudioNavidad.tickAll(tg);}catch(e){}if(t>=11.9&&t<16.9){tg.position.set((i?1:-1)*520,desk.position.y-150,desk.position.z-260);}else tg.position.set(...tg.userData.base);});
  // v0.30b: el plató real va en las planchas; en 3D quedan el globo plateado y el anillo de letras, colocados con el seguimiento del original
  plSet(t);bg.visible=false;sign.visible=false;desk.visible=false;ped.visible=false;ghost.visible=false;flash.material.opacity=0;falls.forEach(l=>l.visible=false);cred.style.visibility='hidden';
  {const g=trk(t);globe.visible=!!g;wm.opacity=.22*seg(t,4.7,5.1);if(g){const sc=g[2]/R/1.0098;globe.position.set(g[0]-640,360-g[1],0);globe.scale.setScalar(sc);}}
  fade.material.opacity=seg(t,17.75,18.05);return true;});});}
 finally{cred.remove();trees.forEach(tg=>{try{if(tg.userData.d30)DECO30.free(tg);else EstudioNavidad.free(tg);}catch(e){}});if(au){au.pause();}G.remove(root2);falls.forEach(l=>root2.remove(l));root2.traverse(m=>{m.geometry&&m.geometry.dispose();if(m.material){m.material.map&&m.material.map!==ATLAS&&m.material.map.dispose();m.material.dispose();}});studioT.dispose();starsT.dispose();}
};
