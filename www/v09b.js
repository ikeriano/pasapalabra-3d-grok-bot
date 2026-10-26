'use strict';
// ======================================================================
//  v0.9 — BOLA DE LETRAS COMO EN EL PROGRAMA REAL (Telecinco 22-01-2019, Fran, cabecera, 640x360)
//  MEDIDO en 24 fotogramas a 10 fps (correlación por parches): diámetro de la esfera = 0,62 × el ancho
//  del título, centrada con él (mismo x e y); gira alrededor de un eje casi vertical (inclinado ~16°),
//  la cara visible se mueve de izquierda a derecha a ω ≈ 0,19 rad/s (≈ 11 °/s, 1 vuelta cada ~33 s), constante.
//  Esfera densa de letras 3D (cara blanca, laterales azules) pegadas a la superficie, orientadas con ella,
//  sin continentes (eso era del vídeo de IA, descartado). 2007: la cámara la desenfoca (ref. del programa 2007).
//  150 letras individuales repartidas en espiral de Fibonacci (densidad uniforme, sin continentes ni manchas).
// ======================================================================
(function(){
function rng(s){return()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296;};}
// Letras individuales (cara + grosor), cuatro tonos como en el programa real; variante dorada para el final
const AL9='ABCDEFGHIJKLMNÑOPQRSTUVWXYZ',FACE=['#ffffff','#cfe6ff','#8fc1ff','#173f9f'],FACEG=['#fff6e0','#ffe2a0','#f2b04a','#5a2a0c'];
const ATL={};
function glyph(ch,ci,gold,blur){const key=ch+ci+(gold?'g':'n')+(blur?'b':'');if(ATL[key])return ATL[key];
 const t=cv(96,96,(g,w,h)=>{g.textAlign='center';g.textBaseline='middle';g.font='900 78px N,Arial';
  g.fillStyle=gold?'#4a2008':'#143f9e';g.fillText(ch,w/2+6,h/2+8);g.fillStyle=gold?'#6a3410':'#1c52c4';g.fillText(ch,w/2+3,h/2+4);g.fillStyle=(gold?FACEG:FACE)[ci];g.fillText(ch,w/2,h/2);
  if(blur){const c2=document.createElement('canvas');c2.width=w;c2.height=h;c2.getContext('2d').drawImage(g.canvas,0,0);g.clearRect(0,0,w,h);g.filter=`blur(${blur}px)`;g.drawImage(c2,0,0);g.filter='none';}});
 t.minFilter=T.LinearMipmapLinearFilter;t.anisotropy=2;return ATL[key]=t;}
const NL=150;
function montar(){
 if(!P.scr||!P.ttl)return;
 const bl=OPT.plato<=2007;
 if(!P.ball9){
 // diámetro 0,62 × ancho del título (medido en el programa real); el título visible mide ≈ 9,3 u de los 13 del plano
 const R=2.9;
 const G=new T.Group();G.position.set(0,3.6,-10.93);G.scale.set(1,1,.02);P.root.add(G);
 const tilt=new T.Group();tilt.rotation.z=16*Math.PI/180;G.add(tilt); // eje inclinado ~16° (medido)
 // cuerpo: velo azul muy tenue (sin mapa, sin manchas) que da volumen
 const m=new T.Mesh(new T.SphereGeometry(R*.985,40,28),new T.MeshBasicMaterial({color:0x2a70e2,transparent:true,opacity:.2,depthWrite:false}));m.renderOrder=.9;m.rotation.y=Math.PI*.9;tilt.add(m);
 // letras: puntos de Fibonacci (reparto uniforme sobre toda la esfera), mismo tamaño, orientaciones variadas
 const r=rng(20190122),geo=new T.PlaneGeometry(1,1),L=[],ph=Math.PI*(3-Math.sqrt(5));
 for(let i=0;i<NL;i++){const y=1-2*(i+.5)/NL,rr=Math.sqrt(1-y*y),th=i*ph,n=new T.Vector3(Math.cos(th)*rr,y,Math.sin(th)*rr);
  const ch=AL9[Math.floor(r()*AL9.length)],k=r(),ci=k<.62?0:k<.84?1:k<.93?2:3;
  const mat=new T.MeshBasicMaterial({map:glyph(ch,ci,false,bl),transparent:true,depthWrite:false,side:T.DoubleSide});
  const q=new T.Mesh(geo,mat);q.position.copy(n).multiplyScalar(R);
  q.quaternion.setFromUnitVectors(new T.Vector3(0,0,1),n).multiply(new T.Quaternion().setFromAxisAngle(new T.Vector3(0,0,1),(r()-.5)*3.6));
  const sz=.84*(.92+r()*.2);q.scale.set(sz,sz,1);q.userData={n,ch,ci,sz};m.add(q);L.push(q);}
 // volumen: velo de sombra en los bordes (no gira)
 const sh=cv(256,256,(g,w,h)=>{const gr=g.createRadialGradient(w*.4,h*.36,w*.05,w/2,h/2,w/2);gr.addColorStop(0,'rgba(255,255,255,.18)');gr.addColorStop(.5,'rgba(255,255,255,0)');gr.addColorStop(.86,'rgba(8,40,140,.08)');gr.addColorStop(1,'rgba(6,30,120,.32)');g.fillStyle=gr;g.beginPath();g.arc(w/2,h/2,w/2,0,6.2832);g.fill();});
 const v=new T.Mesh(new T.PlaneGeometry(R*2.02,R*2.02),new T.MeshBasicMaterial({map:sh,transparent:true,depthWrite:false}));v.position.z=R*1.0;v.renderOrder=2.5;G.add(v);
 P.ball9=m;P.ballG9=G;P.ballL9=L;P.ball9.userData.blur=bl;P.ball9.userData.gold=false;
 if(P.ball){P.ball.visible=false;} // la nube de letras antigua se oculta (la esfera nueva la sustituye)
 }
 setLooks(bl,P.ball9.userData.gold);
}
// mapas de las letras según desenfoque (2007) y versión dorada
function setLooks(bl,gold){const b=P.ball9;if(!b||!P.ballL9)return;if(b.userData.blur===bl&&b.userData.gold===gold&&b.userData.set)return;
 for(const q of P.ballL9){q.material.map=glyph(q.userData.ch,q.userData.ci,gold,bl);q.material.needsUpdate=true;}b.userData.blur=bl;b.userData.gold=gold;b.userData.set=1;}
// profundidad: delante grandes y nítidas, atrás pequeñas y tenues; orden de pintado por profundidad
setInterval(()=>{if(document.hidden||!P.ball9||!P.ballL9||!P.root.visible)return;const a=P.ball9.rotation.y,ca=Math.cos(a),sa=Math.sin(a);
 for(const q of P.ballL9){const n=q.userData.n,z=-n.x*sa+n.z*ca,f=(z+1)/2;q.material.opacity=.28+.72*Math.pow(f,.8);q.renderOrder=1+f*1.4;const k=.78+.22*f;q.scale.set(q.userData.sz*k,q.userData.sz*k,1);}},66);
const _ap=applyPlato;applyPlato=function(y){const r=_ap.apply(this,arguments);try{montar();}catch(e){console.error(e);}return r;};
if(window.DBG)DBG.applyPlato=applyPlato;
document.fonts.load('900 40px N').catch(()=>{}).then(()=>{try{for(const k in TEX)delete TEX[k];if(P.ball9){montar();}}catch(e){}});
try{montar();}catch(e){console.error(e);}
window.V9b={montar,setLooks};
})();
