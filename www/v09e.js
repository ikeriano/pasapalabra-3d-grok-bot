'use strict';
// ======================================================================
//  v0.9 — CABECERAS 2019 rehechas a imagen de los fotogramas reales (ref1–5):
//   La Pista: fondo celeste, claves, sostenidos y corcheas en 3D flotando; confeti musical al empezar.
//   Una de Cuatro: signos de interrogación en 3D (grandes y de contorno) sobre azul.
//   Sopa de Letras: cubos con letras que vuelan hacia la cámara tras un círculo que se abre.
//   ¿Dónde Están?: números y letras 3D (naranja/blanco/azul) que salen en confeti de un aro.
//   El Rosco: esferas con letras girando en corona; la «O» final se acerca a cámara.
//  Solo cambian los gráficos 3D de las cortinillas 2019; la música (v08c.js) no se toca.
// ======================================================================
(function(){
const MAT={};
function mk3(kind,col){const k=kind+col;if(MAT[k])return MAT[k];
 const t=cv(160,160,(g,w)=>{g.fillStyle=col;g.strokeStyle=col;g.lineCap='round';g.lineJoin='round';
  if(kind=='q8'||kind=='q16'){g.lineWidth=7;g.beginPath();g.ellipse(46,118,24,15,-.45,0,PI*2);g.fill();g.beginPath();g.moveTo(68,114);g.lineTo(68,22);g.stroke();
   if(kind=='q16'){g.beginPath();g.ellipse(112,106,24,15,-.45,0,PI*2);g.fill();g.beginPath();g.moveTo(134,102);g.lineTo(134,14);g.stroke();g.lineWidth=16;g.beginPath();g.moveTo(68,26);g.lineTo(134,18);g.stroke();}else{g.lineWidth=7;g.beginPath();g.moveTo(68,22);g.quadraticCurveTo(110,38,98,84);g.stroke();}}
  else if(kind=='sharp'){g.lineWidth=8;g.beginPath();g.moveTo(62,30);g.lineTo(62,134);g.moveTo(98,24);g.lineTo(98,128);g.stroke();g.lineWidth=17;g.beginPath();g.moveTo(40,70);g.lineTo(120,50);g.moveTo(40,112);g.lineTo(120,92);g.stroke();}
  else if(kind=='flat'){g.lineWidth=8;g.beginPath();g.moveTo(58,16);g.lineTo(58,130);g.stroke();g.lineWidth=9;g.beginPath();g.moveTo(58,130);g.bezierCurveTo(130,100,128,52,58,82);g.stroke();}
  else if(kind=='clef'){g.lineWidth=8;g.beginPath();g.moveTo(80,150);g.bezierCurveTo(60,150,50,132,64,126);g.stroke();g.beginPath();g.moveTo(82,16);g.bezierCurveTo(110,40,96,70,74,100);g.bezierCurveTo(40,134,40,92,68,86);g.bezierCurveTo(100,80,110,116,80,128);g.bezierCurveTo(70,132,64,110,80,16);g.stroke();}
  else if(kind=='bass'){g.lineWidth=9;g.beginPath();g.arc(56,60,10,0,PI*2);g.fill();g.beginPath();g.moveTo(48,52);g.bezierCurveTo(60,30,110,34,106,70);g.bezierCurveTo(100,100,70,122,40,136);g.stroke();g.beginPath();g.arc(124,46,6,0,PI*2);g.arc(124,76,6,0,PI*2);g.fill();}
  else if(kind=='qo'){g.lineWidth=9;g.font='900 150px N,Arial';g.textAlign='center';g.strokeText('?',w/2,134);}
  else if(kind=='ques'){ftxt(g,'?',w/2,92,150,col,'center',w,0,1000);}
  else if(kind=='iques'){ftxt(g,'¿',w/2,92,150,col,'center',w,0,1000);}
  else ftxt(g,kind,w/2,92,150,col,'center',w,0,1000);});
 return MAT[k]=new T.MeshBasicMaterial({map:t,transparent:true,depthWrite:false,side:T.DoubleSide});}
const GP=new T.PlaneGeometry(1,1);
// símbolo con grosor (12 capas) y borde oscuro para que se lea como volumen al girar
function sym(kind,col,side,s,op=1){const g=new T.Group();for(let i=5;i>=0;i--){const m=new T.Mesh(GP,mk3(kind,i>1?side:col));m.scale.setScalar(s);m.position.z=-i*s*.016;if(op<1)m.material=m.material.clone(),m.material.opacity=op;g.add(m);}g.s=s;return g;}
// nube que viaja hacia la cámara
function swarm(AW,items,{zr=[-520,260],vz=[60,140]}={}){const g=new T.Group(),it=[];items.forEach(o=>{o.p0=new T.Vector3(rnd(-AW*.62,AW*.62),rnd(-330,330),rnd(zr[0],zr[1]));o.vz=rnd(vz[0],vz[1]);o.w=new T.Vector3(rnd(-1.2,1.2),rnd(-1.6,1.6),rnd(-.8,.8));g.add(o);it.push(o);});
 g.anim=t=>{it.forEach(o=>{const span=zr[1]-zr[0];let z=((o.p0.z-zr[0]+o.vz*t)%span)+zr[0];o.position.set(o.p0.x+Math.sin(t*.6+o.vz)*14,o.p0.y+Math.cos(t*.5+o.vz)*10,z);o.rotation.set(o.w.x*t,o.w.y*t,o.w.z*t);o.visible=true;});};g.items=it;return g;}
const LIGHT=['#ffffff','#dff0ff','#bcdcff'];
// ---- La Pista
function artPista9(AW){const kinds=['clef','bass','sharp','flat','q8','q16','q8','q16'],its=[];for(let i=0;i<30;i++){const k=kinds[i%kinds.length];its.push(sym(k,'#ffffff','#7fb2ee',rnd(80,200),rnd(.55,.9)));}
 const sw=swarm(AW,its,{zr:[-600,120],vz:[18,50]});
 // confeti musical de arranque: notas naranja, azules y blancas que salen y se desvanecen
 const cf=[];for(let i=0;i<26;i++){const o=sym(pick(['q8','q16','sharp','flat']),pick(['#f39a1e','#ffffff','#3d8dff']),'#8aa0c8',rnd(60,110));o.v=new T.Vector3(rnd(-420,420),rnd(-260,260),rnd(-100,200));o.w=new T.Vector3(rnd(-4,4),rnd(-4,4),rnd(-3,3));sw.add(o);cf.push(o);}
 const a0=sw.anim;sw.anim=t=>{a0(t);cf.forEach(o=>{const k=Math.min(1,t/2.2);o.position.set(o.v.x*eout(k),o.v.y*eout(k)-t*30,o.v.z);o.rotation.set(o.w.x*t,o.w.y*t,o.w.z*t);o.visible=t<2.4;o.scale.setScalar(Math.max(.01,1-Math.max(0,t-1.4)));});};return sw;}
// ---- Una de Cuatro
function artU49(AW){const its=[];for(let i=0;i<46;i++){const big=i%7==0,k=i%5==0?'qo':(i%3==0?'iques':'ques'),c=i%9==0?'#f39a1e':i%4==0?'#3d8dff':'#ffffff';its.push(sym(k,c,c=='#ffffff'?'#8fb2ea':'#a85a00',big?rnd(200,300):rnd(60,150),big?.85:.95));}
 const sw=swarm(AW,its,{zr:[-560,200],vz:[14,60]});const a0=sw.anim;sw.anim=t=>{a0(t);sw.items.forEach(o=>{o.rotation.set(Math.sin(t*.7+o.vz)*.9,Math.cos(t*.5+o.vz)*1.1,o.rotation.z*.2);});};return sw;}
// ---- Sopa de Letras
function cubeMat(ch,bg,fg){return new T.MeshBasicMaterial({map:cv(96,96,(g,w)=>{g.fillStyle=bg;g.fillRect(0,0,w,w);g.strokeStyle='rgba(20,60,160,.35)';g.lineWidth=5;g.strokeRect(2,2,w-4,w-4);ftxt(g,ch,w/2,54,70,fg,'center',w,0,900);})});}
function artSopa9(AW){const BG=new T.BoxGeometry(1,1,1),its=[];for(let i=0;i<64;i++){const o=i%4==0,b=i%7==3;const ch=pick([...AL]);const m=cubeMat(ch,o?'#f4a21c':b?'#2f6fe8':'#ffffff',o||b?'#ffffff':'#2a58b8');const c=new T.Mesh(BG,m);c.scale.setScalar(rnd(46,120));its.push(c);}
 const sw=swarm(AW,its,{zr:[-700,320],vz:[130,300]});
 const ring=new T.Mesh(new T.RingGeometry(.96,1,64),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.8,depthWrite:false}));ring.position.z=-300;sw.add(ring);
 const disc=new T.Mesh(new T.CircleGeometry(1,48),new T.MeshBasicMaterial({color:0x2f6fe8,transparent:true,opacity:.65,depthWrite:false}));disc.position.z=-310;sw.add(disc);
 const a0=sw.anim;sw.anim=t=>{a0(t);const k=eout(Math.min(1,t/1.3)),r=60+k*620;ring.scale.setScalar(r);disc.scale.setScalar(r);ring.material.opacity=disc.material.opacity=Math.max(0,.8-t*.5);ring.visible=disc.visible=t<1.7;};return sw;}
// ---- ¿Dónde Están?
function artDonde9(AW){const its=[],cs=[['#ffffff','#8fb2ea'],['#f39a1e','#a85a00'],['#3d8dff','#1a4aa8'],['#ffffff','#8fb2ea']];for(let i=0;i<54;i++){const [c,s]=cs[i%4],ch=i%3==0?pick([...AL]):String(1+i%9);its.push(sym(ch,c,s,rnd(60,170),.95));}
 const sw=swarm(AW,its,{zr:[-560,160],vz:[16,46]});
 const ring=new T.Mesh(new T.RingGeometry(.97,1,72),new T.MeshBasicMaterial({color:0xffffff,transparent:true,opacity:.7,depthWrite:false}));ring.position.z=-120;sw.add(ring);
 const bur=[];for(let i=0;i<46;i++){const [c,s]=cs[i%3],o=sym(i%2?String(1+i%9):pick([...AL]),c,s,rnd(50,120));const a=rnd(0,PI*2),r=rnd(200,620);o.v=new T.Vector3(Math.cos(a)*r*1.5,Math.sin(a)*r*.8,rnd(-60,260));o.w=new T.Vector3(rnd(-5,5),rnd(-5,5),rnd(-4,4));sw.add(o);bur.push(o);}
 const a0=sw.anim;sw.anim=t=>{a0(t);const k=eout(Math.min(1,t/1.6));ring.scale.setScalar(120+k*560);ring.material.opacity=Math.max(0,.7-t*.35);ring.visible=t<2;
  bur.forEach(o=>{o.position.set(o.v.x*k,o.v.y*k-t*24,o.v.z);o.rotation.set(o.w.x*t,o.w.y*t,o.w.z*t);o.visible=t<3;o.scale.setScalar(Math.max(.01,Math.min(1,(3-t)*.9)));});};return sw;}
// ---- El Rosco
const SPH=cv(128,128,(g,w)=>{const r=g.createRadialGradient(42,38,4,64,64,62);r.addColorStop(0,'#ffffff');r.addColorStop(.3,'#8cc8ff');r.addColorStop(.8,'#2a6af0');r.addColorStop(1,'#123fb8');g.fillStyle=r;g.beginPath();g.arc(64,64,62,0,PI*2);g.fill();});
function artRosco9(AW){const g=new T.Group(),n=25,sm=new T.MeshBasicMaterial({map:SPH,transparent:true,depthWrite:false}),sp=[];const AZ=[...'ABCDEFGHIJKLMNÑOPQRSTUVXYZ'].slice(0,n);
 for(let i=0;i<n;i++){const o=new T.Group(),b=new T.Mesh(GP,sm);b.scale.setScalar(120);o.add(b);const L=new T.Mesh(GP,mk3(AZ[i],'#ffffff'));L.scale.setScalar(78);L.position.z=6;o.add(L);o.a=PI/2-i/n*PI*2;o.i=i;g.add(o);sp.push(o);}
 const fin=sp[AZ.indexOf('O')];// «O»
 // fondo de esferitas pequeñas sin letra
 const bk=[];for(let i=0;i<70;i++){const b=new T.Mesh(GP,sm);b.scale.setScalar(rnd(10,38));b.position.set(rnd(-AW*.55,AW*.55),rnd(-330,330),rnd(-300,-100));g.add(b);bk.push(b);}
 g.anim=t=>{const k=eout(Math.min(1,t/1.2));sp.forEach(o=>{const a=o.a-t*.35;const R=330*k;o.position.set(Math.cos(a)*R*1.35,Math.sin(a)*R*.9,0);o.scale.setScalar(Math.max(.01,k)*(1-.25*Math.sin(a)));o.visible=true;});
  // la «O» final sale del aro y se acerca a cámara
  const z=Math.max(0,Math.min(1,(t-1.1)/1.2)),ez=eio(z);fin.position.lerp(new T.Vector3(0,0,0),ez);fin.position.z=ez*260;fin.scale.setScalar(Math.max(.01,k)*(1+ez*5.5));fin.visible=t<2.6;fin.children.forEach(c=>{c.material=c.material;});
  sp.forEach(o=>{if(o!==fin)o.visible=t<2.9;});
  bk.forEach((b,i)=>{b.position.y=((b.position.y+330+(8+i%5*4)*.016*60*.2)%660)-330;b.visible=true;});};return g;}
Object.assign(CORT,{pistaB:{title:['La Pista'],tx:0,ty:0,fs:100,mk:artPista9},u4:{title:['Una de Cuatro'],tx:0,ty:0,fs:96,mk:artU49},sopa:{title:['Sopa de Letras'],tx:0,ty:0,fs:96,mk:artSopa9},donde:{title:['¿Dónde Están?'],tx:0,ty:0,fs:96,mk:artDonde9},roscoB:{title:['El Rosco'],tx:0,ty:0,fs:110,mk:artRosco9}});
// fondo de la cortinilla 2019: degradado celeste suave (sin la cuadrícula de la 2007) con el tono de cada cabecera
const TONE={pistaB:[[.52,.78,1.],[.14,.42,.93]],u4:[[.30,.58,.98],[.07,.25,.80]],sopa:[[.38,.66,1.],[.08,.30,.86]],donde:[[.40,.68,1.],[.08,.30,.86]],roscoB:[[.34,.60,1.],[.06,.22,.78]]};
const _mc=makeCort;
makeCort=function(id,blue){const o=_mc.apply(this,arguments);try{const t=TONE[id];if(blue&&t&&OPT.etapa==2019){const m=o.g.children[0].pl.material;const f=x=>x.toFixed(2);
 m.fragmentShader=m.fragmentShader.replace('vec3(.42,.72,1.),vec3(.08,.3,.85)',`vec3(${t[0].map(f)}),vec3(${t[1].map(f)})`).replace('c+=.03*sin(p.x*40.+t)*sin(p.y*30.-t);','');m.needsUpdate=true;}}catch(e){}return o;};
window.V9e={artPista9,artU49,artSopa9,artDonde9,artRosco9};
})();

// v0.9 · un deslizamiento VERTICAL que empieza sobre un deslizador (para desplazar la lista) no debe cambiar su valor:
// Chrome mueve el control al tocar la pista; si el gesto resulta ser scroll vertical, se restaura el valor anterior.
(()=>{let s=null;
 menu.addEventListener('pointerdown',e=>{const r=e.target&&e.target.closest&&e.target.closest('input[type=range]');s=(r&&e.isPrimary)?{id:e.pointerId,x:e.clientX,y:e.clientY,lx:e.clientX,ly:e.clientY,r,v:r.value}:null;},true);
 document.addEventListener('pointermove',e=>{if(s&&e.pointerId===s.id){s.lx=e.clientX;s.ly=e.clientY;}},true);
 const fin=e=>{if(!s||e.pointerId!==s.id)return;const q=s;s=null;if(e.clientX||e.clientY){q.lx=e.clientX;q.ly=e.clientY;}
  const dx=Math.abs(q.lx-q.x),dy=Math.abs(q.ly-q.y);
  if(dy>=10&&dy>dx*1.2&&q.r.value!==q.v){q.r.value=q.v;q.r.dispatchEvent(new Event('input',{bubbles:true}));}};
 document.addEventListener('pointerup',fin,true);document.addEventListener('pointercancel',fin,true);})();
