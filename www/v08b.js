'use strict';
// ======================================================================
//  v0.8 — BOLA DE LETRAS DE LA PANTALLA DEL PLATÓ
//  Antes: un remolino 3D grande de letras claras delante de la pantalla (se salía
//  por todos lados en los planos cercanos), ~260 letras grandes de fondo y una bola
//  rosa/naranja en 2007 superpuesta a otra bola.
//  Ahora (como en el plató real de 2007/2019 y en el juego de DVD): UNA esfera
//  contenida, DETRÁS del título «Pasapalabra» y centrada con él (el título la cruza
//  por el medio), letras mezcladas y finas, azul sobre fondo azul.
// ======================================================================
(function(){
const BLUE=(z,a)=>`hsla(212,78%,${52+z*22}%,${a})`;
// bola en 2D (solo para las pantallitas laterales y como textura de respaldo)
scrBall=function(g,w,h,bl,noTitle,noBall){const cx=w/2,cy=h/2,r=h*.34;
 if(!noBall)for(let i=0;i<360;i++){const y=1-2*(i+.5)/360,rr=Math.sqrt(1-y*y),th=i*2.39996,z=(Math.sin(th)*rr+1)/2;g.globalAlpha=1;ftxt(g,pick([...AL]),cx+Math.cos(th)*rr*r,cy-y*r,7+z*9,BLUE(z,.3+z*.4),'center',1e9,0,500);}
 g.globalAlpha=1;if(!noTitle){g.save();g.shadowColor='rgba(0,30,90,.55)';g.shadowBlur=8;ftxt(g,'Pasapalabra',cx,cy,h*.5,'#ffffff','center',r*3.5,0,700);g.restore();}};
// fondo: pocas letras pequeñas y muy tenues (tono sobre tono)
function fondo(g,w,h,top,bot){const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,top);gr.addColorStop(1,bot);g.fillStyle=gr;g.fillRect(0,0,w,h);
 for(let i=0;i<70;i++){g.globalAlpha=rnd(.05,.13);ftxt(g,pick([...AL]),rnd(0,w),rnd(0,h),rnd(12,26),'#b5d6ff','center',1e9,0,500);}g.globalAlpha=1;}
screenTex=function(){return cv(1024,512,(g,w,h)=>{fondo(g,w,h,'#3d8dfa','#1f5fd8');scrBall(g,w,h,1);});};
scrTexY=function(y){return cv(1024,512,(g,w,h)=>{fondo(g,w,h,y>=2014?'#4aa0ff':'#3d8dfa',y>=2019?'#0d3aa8':'#1f5fd8');scrBall(g,w,h,1);});};
// pantalla grande: solo fondo (la bola es 3D y va detrás del título; el título es otro plano delante)
const MAIN={};const mainTex=y=>MAIN[y]||(MAIN[y]=cv(1024,512,(g,w,h)=>fondo(g,w,h,y>=2014?'#4aa0ff':'#3d8dfa',y>=2019?'#0d3aa8':'#1f5fd8')));
function montar(){
 if(!P.scr||P.ttl)return;
 // título delante
 const tt=cv(1024,256,(g,w,h)=>{g.save();g.shadowColor='rgba(0,30,90,.55)';g.shadowBlur=8;ftxt(g,'Pasapalabra',w/2,h/2,h,'#ffffff','center',671,0,700);g.restore();});
 P.ttl=new T.Mesh(new T.PlaneGeometry(13,3.25),new T.MeshBasicMaterial({map:tt,transparent:true,depthWrite:false}));P.ttl.position.set(0,3.6,-10.9);P.ttl.renderOrder=3;P.root.add(P.ttl);
 // esfera contenida, aplanada en z (para que no atraviese pantalla ni título), azul y fina
 const sp=P.sphere,G=new T.Group();G.position.set(0,3.6,-10.95);G.scale.set(1,1,.1);P.root.add(G);P.root.remove(sp);G.add(sp);sp.position.set(0,0,0);P.ballG=G;
 sp.items.forEach(it=>{it.p.setLength(2.1);it.s=.42;it.c=new T.Color().setHSL(.6,.8,Math.random()<.45?.86:.4+.1*it.n.y);});
 // recolorear: vertexColors
 const col=sp.geometry.attributes.color;sp.items.forEach((it,i)=>{for(let j=0;j<4;j++)col.setXYZ(i*4+j,it.c.r,it.c.g,it.c.b);});col.needsUpdate=true;
 sp.upd();sp.material.opacity=.9;sp.renderOrder=2;P.scr.renderOrder=0;
}
function refrescar(){if(!P.fl)return;
 for(const k in PLC)delete PLC[k];
 if(P.orig)P.orig.scr=screenTex();
 P.sideS.forEach(m=>{m.material.map=screenTex();m.material.needsUpdate=true;});
 montar();aplicar(OPT.plato);}
function aplicar(y){if(!P.scr||!P.ttl)return;P.scr.material.map=mainTex(y);P.scr.material.needsUpdate=true;}
const _ap=applyPlato;applyPlato=function(y){const r=_ap.apply(this,arguments);montar();aplicar(y);return r;};
if(window.DBG)DBG.applyPlato=applyPlato;
refrescar();
window.V8b={refrescar};
})();
