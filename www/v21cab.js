'use strict';
// v0.21 · Cabeceras ORIGINALES en 3D (Antena 3 2026 y En Familia). No copian la cabecera de la tele:
// túnel de rayos de luz azul/cian, partículas, aros naranjas, vuelo hasta nuestro plató y logo de la app.
(()=>{
const A26=()=>OPT.a3==2026;
const Y0=60; // la "sala" de la cabecera flota sobre el plató
function mk(fam){const g=new T.Group();g.position.y=Y0;S.add(g);
 const acc=fam?0xff8a1c:0xff6a00,c1=fam?0x35c8ff:0x22b4ff;
 // cúpula de fondo con degradado
 const cv=document.createElement('canvas');cv.width=8;cv.height=256;const x=cv.getContext('2d'),gr=x.createLinearGradient(0,0,0,256);
 gr.addColorStop(0,fam?'#0a3a8c':'#06215e');gr.addColorStop(.5,fam?'#1572d6':'#0b4fc0');gr.addColorStop(1,'#020a24');x.fillStyle=gr;x.fillRect(0,0,8,256);
 const tx=new T.CanvasTexture(cv);if(T.SRGBColorSpace)tx.colorSpace=T.SRGBColorSpace;else if(T.sRGBEncoding)tx.encoding=T.sRGBEncoding;const dm=new T.MeshBasicMaterial({map:tx,side:T.BackSide,depthWrite:false,depthTest:false,fog:false});
 const sbg=S.background,sfog=S.fog;S.background=new T.Color(fam?0x0b3c8e:0x062058);S.fog=null;
 // rayos de luz (túnel)
 const N=220,bm=new T.MeshBasicMaterial({color:0xffffff,transparent:true,blending:T.AdditiveBlending,depthWrite:false,fog:false});
 const st=new T.InstancedMesh(new T.BoxGeometry(.06,.06,4),bm,N);const sd=[],m4=new T.Matrix4(),col=new T.Color();
 for(let i=0;i<N;i++){const a=Math.random()*6.283,r=3+Math.random()*9;sd.push({a,r,z:-Math.random()*120,v:30+Math.random()*40,l:.6+Math.random()*1.6});
  st.setColorAt(i,col.setHex(i%9==0?acc:i%2?c1:0x9fe6ff));}
 g.add(st);
 // partículas
 const PN=500,pp=new Float32Array(PN*3);for(let i=0;i<PN;i++){pp[i*3]=(Math.random()-.5)*40;pp[i*3+1]=(Math.random()-.5)*24;pp[i*3+2]=-Math.random()*90;}
 const pg=new T.BufferGeometry();pg.setAttribute('position',new T.BufferAttribute(pp,3));
 const pts=new T.Points(pg,new T.PointsMaterial({color:0xbfefff,size:.18,transparent:true,blending:T.AdditiveBlending,depthWrite:false,fog:false}));g.add(pts);
 // aros naranjas y cian que barren
 const rings=[];for(let i=0;i<5;i++){const r=new T.Mesh(new T.TorusGeometry(4+i*1.3,.07,6,64),new T.MeshBasicMaterial({color:i%2?c1:acc,transparent:true,blending:T.AdditiveBlending,depthWrite:false,fog:false}));r.position.z=-40-i*10;g.add(r);rings.push(r);}
 // placas de cristal giratorias (formas 3D)
 const tiles=[];const tg=new T.CircleGeometry(.9,24);for(let i=0;i<14;i++){const m=new T.Mesh(tg,new T.MeshBasicMaterial({color:i%4==0?acc:0x5ad2ff,transparent:true,opacity:.35,side:T.DoubleSide,blending:T.AdditiveBlending,depthWrite:false,fog:false}));
  const a=i/14*6.283;m.userData={a,r:6.5};g.add(m);tiles.push(m);}
 return {g,set(t,D){const k=t/D;
  // fases: 0-.45 túnel · .45-.7 aros/órbita · .7-1 caída al plató
  for(let i=0;i<N;i++){const s=sd[i];let z=s.z+t*s.v*(k<.45?1:.6);z=((z%120)+120)%120-110;const sp=k<.45?1:Math.max(.2,1-(k-.45)*3);
   m4.makeScale(1,1,s.l*(.6+sp*1.6));m4.setPosition(Math.cos(s.a+t*.15)*s.r,Math.sin(s.a+t*.15)*s.r,z);st.setMatrixAt(i,m4);}
  st.instanceMatrix.needsUpdate=true;
  pts.rotation.z=t*.05;pts.position.z=(t*6)%30;
  rings.forEach((r,i)=>{r.rotation.z=t*(i%2?.6:-.5);r.rotation.x=Math.sin(t*.7+i)*.35;const s=1+Math.max(0,k-.35)*2.5;r.scale.setScalar(s);r.material.opacity=Math.min(1,Math.max(0,(k-.15)*4))*(1-Math.max(0,(k-.72)*4));});
  tiles.forEach((m,i)=>{const u=m.userData,a=u.a+t*.4;m.position.set(Math.cos(a)*u.r,Math.sin(a)*u.r*.6,-18+Math.sin(t+i)*2);m.rotation.set(t+i,t*.7,0);m.material.opacity=.35*Math.min(1,k*3)*(1-Math.max(0,(k-.7)*4));});
  const fade=1-Math.min(1,Math.max(0,(k-.68)/.14));if(fade<=0&&S.fog===null){S.background=sbg;S.fog=sfog;}bm.opacity=fade;pts.material.opacity=fade;g.visible=fade>0;},
  free(){if(S.fog===null){S.background=sbg;S.fog=sfog;}S.remove(g);g.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){if(o.material.map)o.material.map.dispose();o.material.dispose();}});}};}
// logo final (el que ya usa la app) con destello
function logoOn(src){let d=document.getElementById('cab21');if(!d){d=document.createElement('div');d.id='cab21';document.body.appendChild(d);
  const s=document.createElement('style');s.textContent=`#cab21{position:fixed;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:40;opacity:0;transition:opacity .25s}
#cab21.on{opacity:1}#cab21 img{width:62vw;max-height:46vh;object-fit:contain;transform:scale(.2) rotateY(70deg);filter:drop-shadow(0 0 2vh #6fd8ff)}
#cab21.on img{animation:c21 1.1s cubic-bezier(.2,1.6,.4,1) forwards}#cab21 i{position:absolute;width:140vw;height:1.2vh;background:linear-gradient(90deg,transparent,#fff,#ff8a1c,transparent);left:-140vw;top:50%}
#cab21.on i{animation:c21b .9s ease-out .15s forwards}@keyframes c21{to{transform:scale(1) rotateY(0)}}@keyframes c21b{to{left:100vw}}`;document.head.appendChild(s);}
 d.innerHTML=`<i></i><img src="${src}">`;void d.offsetWidth;d.classList.add('on');return ()=>d.classList.remove('on');}
async function cab21(rid,fam,D){const c=mk(fam);const W=SHOTS.wide;const sh={p:V3(0,Y0,8),l:V3(0,Y0,-20),f:60,dr:0};cut(sh);let off=null;
 const pEnd=W.p.clone(),lEnd=(W.l||V3(0,.6,-2)).clone(),pTop=V3(-6,14,16);
 try{await tween(D,(e,k)=>{const t=k*D;c.set(t,D);
  if(k<.45){sh.p.set(Math.sin(t*.6)*.8,Y0+Math.cos(t*.5)*.5,8);sh.l.set(Math.sin(t*.3)*2,Y0,-20);sh.f=60-k*16;}
  else if(k<.7){const u=(k-.45)/.25,a=u*1.6;sh.p.set(Math.sin(a)*2.2,Y0+u*1.5,8-u*3);sh.l.set(0,Y0,-14);sh.f=46;}
  else{const u=Math.min(1,(k-.7)/.22),e2=u<.5?2*u*u:1-Math.pow(-2*u+2,2)/2;
   if(u<.5){sh.p.lerpVectors(V3(Math.sin(1.6)*2.2,Y0+1.5,5),pTop,e2*2>1?1:e2*2);sh.l.lerpVectors(V3(0,Y0,-14),V3(0,.6,-2),e2*2>1?1:e2*2);}
   else{sh.p.lerpVectors(pTop,pEnd,(e2-.5)*2);sh.l.copy(lEnd);}sh.f=46-u*4;}
  if(k>.82&&!off)off=logoOn(fam?'f16v/logo.png':LOGO);},x=>x);}
 finally{c.free();if(off)setTimeout(off,900);}chk(rid);cut('wide');}
window.CAB21=cab21;
// Antena 3 2026: misma música de siempre, ~11,5 s (como antes)
{const _c=cabecera;cabecera=async function(rid){if(!A26()||(window.F16&&F16._want))return _c.apply(this,arguments);music('cab'+OPT.etapa);await cab21(rid,false,11.5);};}
// En Familia: misma música de siempre (f16), ~5 s; la bola de letras sigue oculta
if(window.F16){F16.cab=async function(rid){try{stopMusic();}catch(e){}music('f16/rosco');await cab21(rid,true,5.2);try{stopMusic();}catch(e){}chk(rid);};}
})();
