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
const mkTtl=()=>cv(1024,256,(g,w,h)=>{g.save();g.shadowColor='rgba(0,30,90,.55)';g.shadowBlur=8;ftxt(g,'Pasapalabra',w/2,h/2,h,'#ffffff','center',671,0,700);g.restore();});
function montar(){
 if(!P.scr||P.ttl)return;
 // título delante
 const tt=mkTtl();
 P.ttl=new T.Mesh(new T.PlaneGeometry(13,3.25),new T.MeshBasicMaterial({map:tt,transparent:true,depthWrite:false}));P.ttl.position.set(0,3.6,-10.9);P.ttl.renderOrder=3;P.root.add(P.ttl);
 // esfera contenida detrás del título: gira continuamente (v0.9)
 const G=new T.Group();G.position.set(0,3.6,-10.95);G.scale.set(1,1,.1);P.root.add(G);P.root.remove(P.sphere);P.sphere=new T.Group();// el bucle antiguo gira este grupo vacío
 const it=sphereItems(260,2.1,()=>new T.Color(1,1,1));
 it.forEach(x=>{x.s=.34;x.b=x.p.clone();x.bn=x.n.clone();x.ax=new T.Vector3(rnd(-1,1),rnd(-1,1),rnd(-1,1)).normalize();x.w=rnd(.15,.45);x.ph=rnd(0,6.28);x.am=rnd(.25,.55);
  const k=Math.random();x.c=new T.Color().setHSL(k<.4?.54:.6,k<.4?.9:.8,k<.55?.88:.55);});
 const ball=letterCloud(it,{op:.92});ball.renderOrder=2;G.add(ball);P.ball=ball;P.ballG=G;
 // letras sueltas flotando SIEMPRE (deriva lenta multidireccional, sin giro ni parpadeo, tamaños variados)
 const fl=[];for(let i=0;i<64;i++){const big=Math.random()<.18,tiny=Math.random()<.22,sz=big?rnd(.8,1.3):tiny?rnd(.1,.18):rnd(.25,.55),a=rnd(0,6.28),v=rnd(.025,.07)*(big?.6:1);
  fl.push({ch:pick([...AL]),p:new T.Vector3(rnd(-6.3,6.3),rnd(-3.1,3.1),0),s:sz,r:rnd(-.5,.5),vx:Math.cos(a)*v,vy:Math.sin(a)*v,
   c:new T.Color().setHSL(Math.random()<.5?.55:.6,Math.random()<.5?.9:.5,big?.62:tiny?.78:.9)});}// grandes = tono sobre tono (efecto desenfoque)
 const fc=letterCloud(fl,{op:.85});fc.renderOrder=1;const FG=new T.Group();FG.position.set(0,3.6,-10.97);P.root.add(FG);FG.add(fc);P.flo=fc;
 P.ballT=0;
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
// animación continua barata: ~15 actualizaciones/s, solo con la pantalla visible
const q=new T.Quaternion(),tv=new T.Vector3();let last=performance.now(),tt=0;
setInterval(()=>{if(document.hidden||!P.flo||!P.root.visible)return;const n=performance.now(),dt=Math.min(.2,(n-last)/1e3);last=n;tt+=dt;
 for(const x of P.flo.items){x.p.x+=x.vx*dt;x.p.y+=x.vy*dt;if(x.p.x>6.6)x.p.x=-6.6;else if(x.p.x<-6.6)x.p.x=6.6;if(x.p.y>3.4)x.p.y=-3.4;else if(x.p.y<-3.4)x.p.y=3.4;}
 P.flo.upd();
 },66);
// v0.9: la bola GIRA de forma continua (medido en el programa real: ω=0,19 rad/s, 1 vuelta cada ~33 s), suave y constante:
// ángulo calculado con el reloj (sin acumular errores ni sacudidas), 30 actualizaciones/s como máximo;
// encima, el bamboleo lento de cada letra de la v0.8 (amplitud reducida)
const RV=0.19,qy=new T.Quaternion(),yax=new T.Vector3(0,1,0);window.BOLA9={periodo:2*Math.PI/RV,ang:0};
setInterval(()=>{if(document.hidden||!P.ball||!P.root.visible)return;const n=performance.now()/1e3,a=(n*RV)%(2*Math.PI);BOLA9.ang=a;
 if(P.ball9){P.ball9.rotation.y=Math.PI*.9+a;return;}qy.setFromAxisAngle(yax,a);
 for(const x of P.ball.items){q.setFromAxisAngle(x.ax,Math.sin(n*x.w+x.ph)*x.am*.5);x.p.copy(x.b).applyQuaternion(q).applyQuaternion(qy);x.n.copy(x.bn).applyQuaternion(q).applyQuaternion(qy);}
 P.ball.upd();},33);
// ---- tipografía Keedy Sans (font/keedy.ttf, local) en los rótulos
const ROT8=t=>typeof t=='string'&&t.length>=4&&t===t.toUpperCase()&&/[A-ZÁÉÍÓÚÑ]/.test(t)&&/[ :·!¡¿?+]/.test(t);window.ROT8=ROT8;
{let src=ftxt.toString().replace("const F=s==='Pasapalabra'?'K,N,Arial':'N,Arial';if(s==='Pasapalabra')w=400;","const K8=s==='Pasapalabra'||ROT8(s);const F=K8?'K,N,Arial':'N,Arial';if(K8)w=400;");
 if(src.includes('K8'))(0,eval)('ftxt='+src);else console.warn('v08b: ftxt no parcheado');}
const st=document.createElement('style');st.textContent='#sub,#toast,#premio8 .t1,#premio8 .t2,#menu h2,#menu .mtag,#menu .tsub,#menu .ttap{font-family:K,N,Arial,sans-serif!important;font-weight:400!important;letter-spacing:.02em}#premio8 .am{font-family:K,N,Arial,sans-serif!important;font-weight:400!important}';document.head.appendChild(st);
document.fonts.load('400 40px K').then(()=>{if(window.P&&P.fl)for(const k in PLC)delete PLC[k];if(P.fl){refrescar();if(P.ttl){P.ttl.material.map=mkTtl();P.ttl.material.needsUpdate=true;}}}).catch(()=>{});
window.V8b={refrescar};
})();
