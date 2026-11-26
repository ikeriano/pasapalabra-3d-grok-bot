'use strict';
// v0.25 · Cabecera de Pasapalabra en Antena 3 (2020) recreada en 3D (8 s, audio original del vídeo):
// 1) 0–1,5 s túnel azul acanalado con letras 3D volando y una P naranja en primer plano · 2) 1,5–3 s anillos escalonados hacia un pozo
// blanco, remolino de letras y aros naranjas de neón · 3) 3–5 s anillos llenos de fichas del rosco, plano holandés bajo en órbita ·
// 4) 5–8 s vista cenital del rosco de varias capas y entra «pasapalabra» blanco 3D en minúsculas con rebote.
// Para las etapas Antena 3 2020 y 2023 con OPT.cab25 (apagada por defecto). Sin marcas de agua ni logos de cadena.
(()=>{const Y0=60;
let TT={};function tileTex(ch,col){const k=ch+col;if(TT[k])return TT[k];const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');
 const gr=g.createRadialGradient(54,48,6,64,64,64);gr.addColorStop(0,col=='b'?'#3f8cff':col=='r'?'#ff5a4a':'#5ce05a');gr.addColorStop(1,col=='b'?'#0b3bb8':col=='r'?'#b8160c':'#1f8a1c');
 g.fillStyle='#fff';g.beginPath();g.arc(64,64,63,0,7);g.fill();g.fillStyle=gr;g.beginPath();g.arc(64,64,54,0,7);g.fill();g.font='900 70px N,Arial';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';g.fillText(ch,64,68);
 const t=new T.CanvasTexture(c);if(T.SRGBColorSpace)t.colorSpace=T.SRGBColorSpace;return TT[k]=t;}
const ABC='ABCDEFGHIJLMNÑOPQRSTUVXYZ'.split('');
async function cab2020(rid){try{stopMusic();}catch(e){}const C=CAB22,R=C.room(),g=R.g;S.background=C.bgGrad('#2f8cff','#0640b8');
 let au=null;if(OPT.mus>0){au=new Audio('snd/c25_open2020.ogg');au.volume=Math.min(1,OPT.mus+.2);au.play().catch(()=>{});}
 const sh={p:V3(0,Y0,10),l:V3(0,Y0,0),f:55,dr:0};cut(sh);
 const blue=new T.MeshLambertMaterial({color:0x1f6cf0,emissive:0x0a3aa0,emissiveIntensity:.5}),blue2=new T.MeshLambertMaterial({color:0x3d90ff,emissive:0x1050c0,emissiveIntensity:.45}),
  neon=new T.MeshBasicMaterial({color:0xff6a1a}),white=new T.MeshBasicMaterial({color:0xffffff});
 // 1 · túnel acanalado
 const tun=new T.Group();g.add(tun);const tg=new T.TorusGeometry(5,.32,6,40);for(let i=0;i<26;i++){const r=new T.Mesh(tg,i%2?blue:blue2);r.position.z=-i*2.4;tun.add(r);}
 const tcyl=new T.Mesh(new T.CylinderGeometry(5.3,5.3,64,40,1,true),new T.MeshLambertMaterial({color:0x0d4fd0,emissive:0x0636a0,side:T.BackSide}));tcyl.rotation.x=Math.PI/2;tcyl.position.z=-30;tun.add(tcyl);
 const nr=new T.Mesh(new T.TorusGeometry(4.6,.05,4,60),neon);nr.position.z=-8;tun.add(nr);
 const fly=[];const cols=[[0xffffff,0x9fb4c8],[0xff6a1a,0xa83a08],[0x1f5ad8,0x0a2a6a]];
 for(let i=0;i<22;i++){const k=cols[i%3];const l=C.glyph('ABCDEFGHIJLMNOPRSTUVZ'[i%21],k[0],k[1],.8+Math.random()*.9,3);l.position.set((Math.random()-.5)*6,(Math.random()-.5)*5,-6-Math.random()*50);l.userData.r=V3(Math.random()*3,Math.random()*3,Math.random()*2);tun.add(l);fly.push(l);}
 const bigP=C.glyph('P',0xff6a1a,0xa83a08,3,6);bigP.position.set(1.6,-1.6,2);tun.add(bigP);const bigR=C.glyph('R',0xeef2f8,0x9fb4c8,3,6);bigR.position.set(-1.2,.6,-14);tun.add(bigR);
 // 2-4 · anillos escalonados del rosco
 const pit=new T.Group();g.add(pit);pit.visible=false;
 for(let i=0;i<7;i++){const r0=1.2+i*1.15;const ring=new T.Mesh(new T.CylinderGeometry(r0+1.15,r0+1.15,.5,56,1,true),i%2?blue:blue2);ring.position.y=-3+i*.55;pit.add(ring);
  const top=new T.Mesh(new T.RingGeometry(r0,r0+1.15,56),i%2?blue2:blue);top.rotation.x=-Math.PI/2;top.position.y=-2.75+i*.55;pit.add(top);}
 const floor=new T.Mesh(new T.CircleGeometry(60,48),new T.MeshBasicMaterial({color:0x0a4fd0}));floor.rotation.x=-Math.PI/2;floor.position.y=-3.3;pit.add(floor);
 const glow=new T.Mesh(new T.CircleGeometry(1.2,32),white);glow.rotation.x=-Math.PI/2;glow.position.y=-3.2;pit.add(glow);
 const neons=[0,1,2].map(i=>{const n=new T.Mesh(new T.TorusGeometry(4+i*2.3,.045,4,90),neon);n.rotation.x=Math.PI/2+.25*(i-1);n.position.y=1+i*.4;pit.add(n);return n;});
 const tiles=[],pg=new T.CylinderGeometry(.42,.42,.22,24);const side=new T.MeshLambertMaterial({color:0xe9eef8});
 [[3.1,25,-1.9],[5.4,25,-.8],[7.7,25,.3]].forEach(([rad,n,y],ri)=>ABC.slice(0,n).forEach((ch,i)=>{const col=(ri==2&&i%9==3)?'r':(ri==1&&i%11==5)?'g':'b';
  const m=new T.Mesh(pg,[side,new T.MeshBasicMaterial({map:tileTex(ch,col)}),side]);const a=-Math.PI/2+i/n*Math.PI*2;m.userData.h=V3(Math.cos(a)*rad,y+.3,Math.sin(a)*rad);m.position.copy(m.userData.h);m.rotation.y=-Math.PI/2;pit.add(m);tiles.push(m);}));
 const swarm=[];for(let i=0;i<26;i++){const l=C.glyph('abcdefghijlmnopqrstuvz'[i%22],i%4?0xffffff:0xff6a1a,0x8aa4c0,.5+Math.random()*.4,2);l.userData.a=Math.random()*6.28;l.userData.r=4+Math.random()*7;pit.add(l);swarm.push(l);}
 const logo=C.word('pasapalabra',0xffffff,0xa9b6c8,1.7,6);logo.rotation.x=-Math.PI/2;logo.position.y=1.2;logo.visible=false;pit.add(logo);
 const shadow=new T.Mesh(new T.PlaneGeometry(11,1.6),new T.MeshBasicMaterial({color:0x001040,transparent:true,opacity:.35,depthWrite:false}));shadow.rotation.x=-Math.PI/2;shadow.position.set(.25,.9,.25);shadow.visible=false;pit.add(shadow);
 let last=0;const D=8;const sv=P.sphere&&P.sphere.visible;if(P.sphere)P.sphere.visible=false;
 try{await tween(D,(e,k)=>{const t=k*D,dt=t-last;last=t;
  if(t<1.5){const u=t/1.5;tun.visible=true;pit.visible=false;sh.p.set(Math.sin(u*3)*.4,Y0+Math.cos(u*2)*.3,8-u*34);sh.l.set(0,Y0,sh.p.z-10);sh.l.y=Y0;sh.f=62;
   fly.forEach(l=>{l.rotation.x+=l.userData.r.x*dt;l.rotation.y+=l.userData.r.y*dt;l.position.z+=dt*6;});bigP.position.set(1.6-u,-1.6+u*.4,2-u*30);bigP.rotation.set(.2,-.5+u*.8,.1);bigP.position.z=sh.p.z-9+u*9;bigR.rotation.y=u*2;}
  else{tun.visible=false;pit.visible=true;tiles.forEach(m=>m.visible=t>=2.9);
   neons.forEach((n,i)=>{n.rotation.z=t*(.6+i*.3)*(i%2?-1:1);});
   swarm.forEach(l=>{const a=l.userData.a+t*2.4,r=Math.max(.3,l.userData.r*(1-seg01(t,1.5,3.2)));l.position.set(Math.cos(a)*r,-2.5+r*.4,Math.sin(a)*r);l.rotation.y=-a;l.visible=t<3.3;});
   if(t<3){const u=(t-1.5)/1.5;const a=u*1.4;sh.p.set(Math.sin(a)*14,Y0+12-u*5,Math.cos(a)*14);sh.l.set(0,Y0-2.5,0);sh.f=55;}
   else if(t<5){const u=(t-3)/2;const a=1.4+u*1.8;sh.p.set(Math.sin(a)*9,Y0+2.2-u*.6,Math.cos(a)*9);sh.l.set(0,Y0-.8,0);sh.f=50;
    // plano holandés: inclinación por el vector up de la cámara
    if(typeof cam!=="undefined")cam.up.set(Math.sin(.35),Math.cos(.35),0);}
   else{if(typeof cam!=="undefined")cam.up.set(0,0,-1);const u=Math.min(1,(t-5)/1.4),ee=1-Math.pow(1-u,3);sh.p.set(0,Y0+20-ee*10,.001);sh.l.set(0,Y0,0);sh.f=55;pit.rotation.y=(1-ee)*.8;
    neons.forEach((n,i)=>{n.rotation.x=Math.PI/2+.25*(i-1)*(1-ee);});
    const lu=Math.max(0,(t-5.4)/.7);logo.visible=shadow.visible=t>5.4;const sc=lu<1?Math.sin(lu*Math.PI*.5)*1.15:1+.15*Math.max(0,Math.sin((lu-1)*9))*Math.exp(-(lu-1)*5);logo.scale.setScalar(Math.max(.01,sc));shadow.scale.setScalar(Math.max(.01,sc));}
  }},x=>x);}finally{if(P.sphere)P.sphere.visible=sv;if(typeof cam!=="undefined")cam.up.set(0,1,0);R.free();if(au)au.pause();}chk(rid);}
function seg01(t,a,b){return Math.max(0,Math.min(1,(t-a)/(b-a)));}
{const _c=cabecera;cabecera=async function(rid){if(OPT.cab25&&[2020,2023].includes(+OPT.a3)&&!(window.F16&&F16._want))return cab2020(rid);return _c.apply(this,arguments);};}
window.CAB25O={cab2020};
})();
