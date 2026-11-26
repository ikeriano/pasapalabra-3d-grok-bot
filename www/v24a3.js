'use strict';
// v0.24 · Antena 3 (2020 en adelante, Roberto Leal): logo blanco «pasapalabra» y fondo animado en 3D en tiempo real
// (anillos concéntricos azules girando, letras A-Z orbitando, círculos naranjas y fichas del rosco). Ligero: 1 malla por anillo,
// letras en un solo atlas, 30 fps, pixelRatio 1 y se apaga cuando no está en pantalla.
(()=>{
const A3L=()=>OPT.a3==2020||OPT.a3==2023;const SRC='a3logo2020.png';
{const _l=logoURL;logoURL=function(w,h,y){if(y===undefined&&A3L())return SRC;return _l.apply(this,arguments);};}
try{if(A3L())LOGO=SRC;}catch(e){}
const st=document.createElement('style');st.textContent=`.a3bg24{position:absolute;inset:0;width:100%;height:100%;z-index:-1;display:block}
#menu .title.a3t24{background:none;isolation:isolate}#menu .title.a3t24 .tlogo{height:auto;width:min(82vw,1000px);filter:drop-shadow(0 0 22px rgba(120,170,255,.6))}
.logo.a3m24{position:relative;isolation:isolate;overflow:hidden;border-radius:18px}.logo.a3m24 .mlogo{max-height:30vh;width:92%}`;document.head.appendChild(st);
let R=null,S,C,root,parts=[],raf=0,last=0,host=null;
function letterTex(){const c=document.createElement('canvas');c.width=1024;c.height=128;const g=c.getContext('2d');const L='ABCDEFGHIJLMNÑOPQRSTUVXYZ'.split('');
 g.font='bold 96px Arial, sans-serif';g.textAlign='center';g.textBaseline='middle';g.fillStyle='#fff';L.forEach((l,i)=>{const x=(i%8)*128+64,y=0;});
 // atlas 8x4 de 128px
 c.height=512;g.font='bold 92px Arial, sans-serif';g.textAlign='center';g.textBaseline='middle';
 L.forEach((l,i)=>{const x=(i%8)*128+64,y=Math.floor(i/8)*128+64;g.fillStyle='#ffffff';g.fillText(l,x,y);});
 const t=new T.CanvasTexture(c);t.minFilter=T.LinearFilter;return {t,L};}
function discTex(){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const gr=g.createRadialGradient(54,50,8,64,64,60);gr.addColorStop(0,'#5fb2ff');gr.addColorStop(1,'#0b4fc4');
 g.fillStyle='#ff7a2a';g.beginPath();g.arc(64,64,62,0,7);g.fill();g.fillStyle=gr;g.beginPath();g.arc(64,64,52,0,7);g.fill();return new T.CanvasTexture(c);}
function quadUV(geo,i){const u0=(i%8)/8,v1=1-Math.floor(i/8)/4,u1=u0+1/8,v0=v1-1/4;const uv=geo.attributes.uv;uv.setXY(0,u0,v1);uv.setXY(1,u1,v1);uv.setXY(2,u0,v0);uv.setXY(3,u1,v0);uv.needsUpdate=true;}
function build(){R=new T.WebGLRenderer({antialias:false,alpha:false,powerPreference:'low-power'});R.setPixelRatio(1);R.domElement.className='a3bg24';
 S=new T.Scene();S.background=new T.Color(0x0640a8);C=new T.PerspectiveCamera(50,16/9,.1,100);C.position.set(0,0,10);root=new T.Group();root.rotation.x=-.12;S.add(root);
 const {t:LT,L}=letterTex(),DT=discTex();const lm=new T.MeshBasicMaterial({map:LT,transparent:true,depthWrite:false});
 // anillos concéntricos (bandas alternas claras/oscuras con un filo sombreado = profundidad)
 for(let i=0;i<11;i++){const r0=.55+i*.78;const col=new T.Color().setHSL(.6,.85,i%2?.27:.33);
  const m=new T.Mesh(new T.RingGeometry(r0,r0+.78,72,1),new T.MeshBasicMaterial({color:col}));m.position.z=-i*.22;root.add(m);
  const e=new T.Mesh(new T.RingGeometry(r0+.7,r0+.78,72,1),new T.MeshBasicMaterial({color:0x053a9a,transparent:true,opacity:.55}));e.position.z=-i*.22+.01;root.add(e);}
 // anillos de letras A-Z que giran en sentidos distintos
 [[3.2,-.18,1],[4.75,.12,1.25],[6.3,-.08,1.4]].forEach(([r,sp,s],k)=>{const g=new T.Group();g.position.z=-1.2*k*.3+.1;L.forEach((l,i)=>{const geo=new T.PlaneGeometry(.42*s,.42*s);quadUV(geo,i);const m=new T.Mesh(geo,lm);
   const a=Math.PI/2-i/L.length*Math.PI*2;m.position.set(Math.cos(a)*r,Math.sin(a)*r,0);m.userData.a=a;g.add(m);});g.userData.sp=sp;root.add(g);parts.push(g);});
 // rosco pequeño de fichas (centro) y grande (borde)
 [[1.85,.25,.3],[8.4,-.06,.75]].forEach(([r,sp,s])=>{const g=new T.Group();L.forEach((l,i)=>{const a=Math.PI/2-i/L.length*Math.PI*2;const d=new T.Mesh(new T.PlaneGeometry(s,s),new T.MeshBasicMaterial({map:DT,transparent:true,depthWrite:false}));
   d.position.set(Math.cos(a)*r,Math.sin(a)*r,.05);g.add(d);const geo=new T.PlaneGeometry(s*.62,s*.62);quadUV(geo,i);const m=new T.Mesh(geo,lm);m.position.set(d.position.x,d.position.y,.06);g.add(m);});g.userData.sp=sp;g.position.z=.2;root.add(g);parts.push(g);});
 // círculos naranjas finos que se desplazan
 [[2.3,0],[3.6,1.7],[9.6,3]].forEach(([r,ph])=>{const m=new T.Mesh(new T.RingGeometry(r,r+.04,96,1),new T.MeshBasicMaterial({color:0xff7a3a}));m.position.z=.3;m.userData.or=[r,ph];root.add(m);parts.push(m);});}
function frame(ts){raf=requestAnimationFrame(frame);if(!host||!host.isConnected){stop();return;}if(ts-last<33)return;const dt=Math.min(.1,(ts-last)/1000||.03);last=ts;const t=ts/1000;
 for(const p of parts){if(p.userData.sp!==undefined){p.rotation.z+=p.userData.sp*dt;p.children.forEach(c=>{if(c.geometry.type=='PlaneGeometry')c.rotation.z=-p.rotation.z;});}
  else if(p.userData.or){const [r,ph]=p.userData.or;p.position.x=Math.sin(t*.35+ph)*.9;p.position.y=Math.cos(t*.27+ph)*.6;}}
 root.rotation.y=Math.sin(t*.2)*.06;root.rotation.x=-.12+Math.cos(t*.17)*.04;
 const w=host.clientWidth||1,h=host.clientHeight||1;const cv=R.domElement;if(cv.width!==w||cv.height!==h){R.setSize(w,h,false);C.aspect=w/h;C.updateProjectionMatrix();C.position.z=w/h<1.2?14:9.5;}R.render(S,C);}
function stop(){cancelAnimationFrame(raf);raf=0;if(R&&R.domElement.parentNode)R.domElement.remove();host=null;}
function attach(el){if(!R)build();stop();host=el;el.insertBefore(R.domElement,el.firstChild);last=0;raf=requestAnimationFrame(frame);}
window.A3BG24={attach,stop,on:A3L};
{const _sm=showMenu;showMenu=function(s='main'){if(A3L())LOGO=SRC;const r=_sm.apply(this,arguments);try{
  if(!A3L()){stop();return r;}const t=menu.querySelector('.title');const lg=menu.querySelector('.logo');
  if(t){t.classList.add('a3t24');attach(t);}else if(lg){lg.classList.add('a3m24');attach(lg);}else stop();}catch(e){console.error(e);}return r;};}
})();
